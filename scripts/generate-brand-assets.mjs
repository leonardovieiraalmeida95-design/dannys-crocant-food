import { createRequire } from "node:module";
import { dirname } from "node:path";
import { readFile, writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve("next/package.json"))] }));
const logo = await readFile("assets/danny-logo.svg");
const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#260d10"/>
  <circle cx="1060" cy="510" r="360" fill="#481519"/>
  <path d="M72 108H1128" stroke="#ffc928" stroke-opacity=".35"/>
  <g font-family="Arial,sans-serif" fill="#fff3dc">
    <text x="72" y="78" fill="#ffc928" font-size="19" letter-spacing="3">DEMONSTRAÇÃO INDEPENDENTE</text>
    <text x="72" y="228" font-size="58" font-weight="700">Proposta de site</text>
    <text x="72" y="306" font-size="58" font-weight="700">para Danny’s</text>
    <text x="72" y="382" font-size="27">História, unidades e acesso ao cardápio.</text>
    <text x="72" y="531" font-size="21" fill="#d5bda8">Protótipo para apresentação.</text>
    <text x="72" y="565" font-size="21" fill="#d5bda8">Não é um canal oficial da empresa.</text>
  </g>
</svg>`);
const mark = await sharp(logo).resize(280, 280).png().toBuffer();
await sharp(background).composite([{ input: mark, top: 176, left: 835 }]).png({ compressionLevel: 9 }).toFile("assets/compartilhamento.png");
await sharp(logo).resize(180, 180).png({ compressionLevel: 9 }).toFile("assets/apple-touch-icon.png");
await writeFile("assets/README.md", "# Identidade e fontes\n\nA logo SVG foi reconstruída a partir da referência fornecida para esta demonstração. A marca pertence aos seus titulares; a autorização para uso e lançamento oficial ainda está pendente.\n\nAs fontes locais foram obtidas do Google Fonts. Cada família inclui sua licença OFL em fonts/. Os arquivos WOFF2 cobrem os conjuntos Latin e Latin Extended.\n\nPara refazer a imagem de compartilhamento e o ícone Apple: node scripts/generate-brand-assets.mjs.\n");
console.log("Generated 1200×630 sharing image and 180×180 Apple icon.");
