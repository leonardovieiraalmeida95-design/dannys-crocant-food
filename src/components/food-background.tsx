"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = { desktopSrc: string; mobileSrc: string; poster: string };

export default function FoodBackground({ desktopSrc, mobileSrc, poster }: Props) {
  const [hosts, setHosts] = useState<{ background: HTMLElement; control: HTMLElement } | null>(null);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const pausedRef = useRef(false);
  const syncRef = useRef<(() => void) | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const background = document.querySelector<HTMLElement>(".abstract-hero");
    const control = document.getElementById("background-motion-control");
    if (background && control) setHosts({ background, control });
  }, []);

  useEffect(() => {
    if (!hosts || !videoRef.current) return;
    const video = videoRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 650px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const events = new AbortController();
    let inView = false;
    let active = true;

    const sync = () => {
      setAvailable(!reduced.matches && !connection?.saveData);
      if (reduced.matches || connection?.saveData) {
        video.pause();
        video.removeAttribute("data-ready");
        if (video.hasAttribute("src")) { video.removeAttribute("src"); video.load(); }
        return;
      }
      if (pausedRef.current || document.hidden || !inView) { video.pause(); return; }
      const source = small.matches ? mobileSrc : desktopSrc;
      if (video.getAttribute("src") !== source) {
        video.removeAttribute("data-ready");
        video.src = source;
      }
      video.muted = true;
      void video.play().catch(() => {
        if (active) video.removeAttribute("data-ready");
      });
    };
    syncRef.current = sync;
    video.addEventListener("playing", () => { if (active) video.setAttribute("data-ready", "true"); }, { signal: events.signal });
    video.addEventListener("error", () => video.removeAttribute("data-ready"), { signal: events.signal });
    document.addEventListener("visibilitychange", sync, { signal: events.signal });
    reduced.addEventListener("change", sync, { signal: events.signal });
    small.addEventListener("change", sync, { signal: events.signal });
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { rootMargin: "80px" });
    observer.observe(hosts.background);
    sync();
    return () => {
      active = false;
      syncRef.current = null;
      events.abort();
      observer.disconnect();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [hosts, desktopSrc, mobileSrc]);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current?.();
  }, [paused]);

  if (!hosts) return null;
  return <>
    {createPortal(<video ref={videoRef} className="food-background-video" muted playsInline loop preload="none" poster={poster} disablePictureInPicture aria-hidden="true" tabIndex={-1} />, hosts.background)}
    {createPortal(<div className="food-motion-ui">
      <span>Composição ilustrativa</span>
      <button type="button" hidden={!available} onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> {paused ? "Animar fundo" : "Pausar fundo"}
      </button>
    </div>, hosts.control)}
  </>;
}
