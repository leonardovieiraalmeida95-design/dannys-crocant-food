import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const routes = ["index.html", "privacidade/index.html", "termos/index.html", "404.html"];
const documents = await Promise.all(routes.map(async (route) => ({ route, html: await readFile(`out/${route}`, "utf8") })));

test("Every public demonstration page has its own title, description and noindex", () => {
  const titles = new Set();
  for (const { route, html } of documents) {
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title, route);
    titles.add(title);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<meta name="robots" content="[^"]*noindex/);
    assert.match(html, /Demonstração independente/);
  }
  assert.equal(titles.size, routes.length);
});

test("Initial HTML does not automatically embed external services or load remote fonts/scripts", async () => {
  for (const { html } of documents) {
    assert.doesNotMatch(html, /<iframe\b/i);
    assert.doesNotMatch(html, /<(?:script|img)\b[^>]*src="https?:/i);
    assert.doesNotMatch(html, /<link\b[^>]*href="https?:/i);
    assert.doesNotMatch(html, /<form\b/i);
    assert.match(html, /Content-Security-Policy/);
  }
  const fonts = await readFile("out/assets/fonts/fonts.css", "utf8");
  assert.doesNotMatch(fonts, /https?:\/\//);
  assert.match(fonts, /font-display:\s*swap/);
});

test("Internal file links and local font references resolve in the static export", async () => {
  for (const { html } of documents) {
    for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
      const href = match[1];
      if (/^(?:https?:|mailto:|tel:|#)/.test(href)) continue;
      let file = decodeURIComponent(href.split(/[?#]/)[0]).replace(/^\/dannys-crocant-food(?=\/|$)/, "").replace(/^\//, "");
      if (!file || file.endsWith("/")) file += "index.html";
      assert.ok((await stat(path.join("out", file))).isFile(), href);
    }
  }
  const fonts = await readFile("out/assets/fonts/fonts.css", "utf8");
  for (const [, file] of fonts.matchAll(/url\(\.\/([^)]+)\)/g)) {
    assert.ok((await stat(`out/assets/fonts/${file}`)).isFile(), file);
  }
});

test("Images have alternate text and new-tab links protect the originating page", () => {
  for (const { html } of documents) {
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) assert.match(tag, /\balt="[^"]*"/);
    for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert.match(tag, /\brel="[^"]*noopener/);
      assert.match(tag, /\brel="[^"]*noreferrer/);
    }
  }
});

test("The demonstration contains no hardcoded prices and uses a real SVG logo", async () => {
  assert.doesNotMatch(documents[0].html, /R\$\s*\d/);
  assert.match(documents[0].html, /<svg class="brand-logo-large"/);
  const svg = await readFile("out/assets/danny-logo.svg", "utf8");
  assert.doesNotMatch(svg, /<image\b|data:image/);
  assert.ok((await stat("out/assets/compartilhamento.png")).size < 150000);
  assert.ok((await stat("out/assets/apple-touch-icon.png")).isFile());
  assert.ok((await stat("out/robots.txt")).isFile());
});

test("Optional local HTTP smoke check: home, information pages, assets and genuine 404", { skip: !process.env.AUDIT_BASE_URL }, async () => {
  const base = process.env.AUDIT_BASE_URL.replace(/\/$/, "");
  for (const route of ["/", "/privacidade/", "/termos/", "/robots.txt", "/assets/fonts/fonts.css", "/assets/compartilhamento.png"]) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, route);
    await response.arrayBuffer();
  }
  const missing = await fetch(`${base}/pagina-que-nao-existe/`);
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /Essa página saiu da mesa/);
});
