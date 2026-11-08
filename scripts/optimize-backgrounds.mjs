import { createRequire } from "node:module";
import { dirname } from "node:path";
import { mkdir, stat } from "node:fs/promises";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve("next/package.json"))] }));
const [hero, story] = process.argv.slice(2);
if (!hero || !story) throw new Error("Supply the generated hero and content image paths.");
await mkdir("assets/backgrounds", { recursive: true });
for (const [name, source] of [["golden-folds", hero], ["amber-ribbons", story]]) {
  for (const [variant, width, quality] of [["wide", 1536, 80], ["mobile", 900, 76]]) {
    const output = `assets/backgrounds/${name}-${variant}.webp`;
    await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(output);
    console.log(`${output}: ${(await stat(output)).size} bytes`);
  }
}
