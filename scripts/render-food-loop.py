"""Compose a seamless illustrative food loop from original generated image layers.

Offline preparation only: Pillow, numpy and imageio-ffmpeg. No runtime Python.
Optional arguments: scene.png bite.png tender.png splash.png.
"""
from pathlib import Path
import functools
import math
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".tools" / "video"))
import imageio_ffmpeg

OUT = ROOT / "assets" / "backgrounds"
LAYERS = OUT / "food-layers"
LAYERS.mkdir(parents=True, exist_ok=True)
WIDTH, HEIGHT, FPS, DURATION = 1280, 854, 30, 12
FALL = 1.65

if len(sys.argv) == 5:
    for name, source in zip(["scene", "bite", "tender", "splash"], sys.argv[1:]):
        image = Image.open(source).convert("RGB" if name == "scene" else "RGBA")
        if name != "scene":
            bounds = image.getchannel("A").point(lambda a: 255 if a > 10 else 0).getbbox()
            if bounds:
                image = image.crop(bounds)
            image.thumbnail((720, 720), Image.Resampling.LANCZOS)
        image.save(LAYERS / f"{name}.webp", quality=94, method=6)

base = Image.open(LAYERS / "scene.webp").convert("RGB").resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
sprites = [Image.open(LAYERS / f"{name}.webp").convert("RGBA") for name in ["bite", "tender"]]
splash = Image.open(LAYERS / "splash.webp").convert("RGBA")

# The displacement field is periodic in time and only affects the sauce surface.
xs = np.linspace(0, WIDTH, 33)
ys = np.linspace(0, HEIGHT, 25)
gx, gy = np.meshgrid(xs, ys)
mask = np.clip(1 - ((gx / WIDTH - .8) / .31) ** 2 - ((gy / HEIGHT - .79) / .17) ** 2, 0, 1) ** 1.7

def background(t):
    phase = 2 * math.pi * (t % DURATION) / DURATION
    sx = gx + (2.8 * np.sin(gy / HEIGHT * 5 - phase) + 1.5 * np.cos(gx / WIDTH * 6 + 2 * phase)) * mask
    sy = gy + (1.2 * np.cos(gx / WIDTH * 5 - phase) + .8 * np.sin(gy / HEIGHT * 9 - 2 * phase)) * mask
    mesh = []
    for y in range(len(ys) - 1):
        for x in range(len(xs) - 1):
            mesh.append(((round(xs[x]), round(ys[y]), round(xs[x + 1]), round(ys[y + 1])), (
                sx[y, x], sy[y, x], sx[y + 1, x], sy[y + 1, x],
                sx[y + 1, x + 1], sy[y + 1, x + 1], sx[y, x + 1], sy[y, x + 1],
            )))
    return base.transform((WIDTH, HEIGHT), Image.Transform.MESH, mesh, Image.Resampling.BICUBIC)

@functools.lru_cache(maxsize=512)
def rotated_piece(index, width, angle):
    sprite = sprites[index]
    sized = sprite.resize((width, round(width * sprite.height / sprite.width)), Image.Resampling.LANCZOS)
    return sized.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)

def paste(frame, layer, x, y, opacity=1):
    if opacity < 1:
        layer = layer.copy()
        layer.putalpha(layer.getchannel("A").point(lambda a: round(a * max(0, opacity))))
    frame.paste(layer, (round(x - layer.width / 2), round(y - layer.height / 2)), layer)

def render(t):
    frame = background(t)
    for i, (phase, hit_x, hit_y, size, a0, a1) in enumerate([
        (0, .88, .785, 164, -24, 18),
        (3, .95, .82, 182, 20, -18),
        (6, .81, .79, 154, -16, 23),
        (9, .91, .765, 172, 23, -12),
    ]):
        age = (t - phase) % DURATION
        if age > FALL + 1.15:
            continue
        x, surface = WIDTH * hit_x, HEIGHT * hit_y
        progress = min(age / FALL, 1)
        angle = round(a0 + (a1 - a0) * progress)
        piece = rotated_piece(i % 2, size, angle)
        sink = max(0, (age - FALL) / .65)
        if sink < 1:
            y = -piece.height + (surface - piece.height * .26 + piece.height) * progress ** 1.6
            drift = (1 - progress) * (24 if i % 2 else -26)
            if age > FALL:
                y += sink * piece.height * .8
                piece = piece.copy()
                alpha = np.asarray(piece.getchannel("A"), dtype=np.float32)
                world_y = y - piece.height / 2 + np.arange(piece.height)
                immersion = np.clip((surface + 4 - world_y) / 8, 0, 1)[:, None]
                piece.putalpha(Image.fromarray(np.uint8(alpha * immersion * (1 - .3 * sink))))
            paste(frame, piece, x + drift, y, min(age / .16, 1))

        after = age - FALL
        if 0 < after < 1.1:
            p = after / 1.1
            width = round(WIDTH * .245 * (.64 + .36 * math.sin(math.pi * p)))
            liquid = splash.resize((width, round(width * splash.height / splash.width)), Image.Resampling.LANCZOS)
            paste(frame, liquid, x, surface + 16 - liquid.height / 2, math.sin(math.pi * p) ** .65 * .94)
            ripples = Image.new("RGBA", frame.size)
            draw = ImageDraw.Draw(ripples)
            radius = 25 + 135 * p
            draw.ellipse((x - radius, surface - radius * .19, x + radius, surface + radius * .19), outline=(211, 121, 53, round(38 * (1 - p))), width=2)
            ripples = ripples.filter(ImageFilter.GaussianBlur(1.1))
            frame.paste(ripples, (0, 0), ripples)
    return frame

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
video = OUT / "chicken-barbecue-loop.mp4"
log_path = ROOT / ".tools" / "food-video-encoding.log"
with log_path.open("w") as log:
    encoder = subprocess.Popen([
        ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-f", "rawvideo", "-vcodec", "rawvideo",
        "-pix_fmt", "rgb24", "-s", f"{WIDTH}x{HEIGHT}", "-r", str(FPS), "-i", "-",
        "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "22", "-pix_fmt", "yuv420p",
        "-g", "60", "-movflags", "+faststart", str(video),
    ], stdin=subprocess.PIPE, stderr=log)
    for number in range(FPS * DURATION):
        encoder.stdin.write(render(number / FPS).tobytes())
        if number % FPS == 0:
            print(f"Rendering {number // FPS}/{DURATION}s", flush=True)
    encoder.stdin.close()
    if encoder.wait() != 0:
        raise RuntimeError(log_path.read_text())

subprocess.run([
    ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-i", str(video), "-an", "-vf", "scale=720:-2,fps=24",
    "-frames:v", str(DURATION * 24), "-t", str(DURATION), "-c:v", "libx264", "-preset", "medium", "-crf", "24", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", str(OUT / "chicken-barbecue-loop-mobile.mp4"),
], check=True)

poster = render(1.47)
poster.save(OUT / "barbecue-poster-wide.webp", quality=87, method=6)
poster.resize((900, 600), Image.Resampling.LANCZOS).save(OUT / "barbecue-poster-mobile.webp", quality=82, method=6)

contact = Image.new("RGB", (1280, 854), "#260d10")
for index, time in enumerate([.55, 1.25, 1.82, 2.35]):
    contact.paste(render(time).resize((640, 427), Image.Resampling.LANCZOS), ((index % 2) * 640, (index // 2) * 427))
contact.save(ROOT / ".tools" / "food-video-contact-sheet.jpg", quality=94)

seam = np.abs(np.asarray(render(0), dtype=np.int16) - np.asarray(render(DURATION), dtype=np.int16))
assert float(seam.mean()) < .01, "Non-periodic loop boundary"
print(f"Loop boundary mean error: {seam.mean():.6f}", flush=True)
for file in [video, OUT / "chicken-barbecue-loop-mobile.mp4"]:
    print(f"{file.name}: {file.stat().st_size:,} bytes", flush=True)
