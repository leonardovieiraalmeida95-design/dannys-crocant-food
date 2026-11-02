"use strict";

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = __dirname;
const routes = {
  "/": ["index.html", "text/html; charset=utf-8"],
  "/index.html": ["index.html", "text/html; charset=utf-8"],
  "/assets/danny-logo-transparent.png": ["assets/danny-logo-transparent.png", "image/png"],
};
const port = Number(process.env.PORT || 4173);

http.createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405);
    response.end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const route = routes[pathname];
  if (!route) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const filePath = path.join(root, route[0]);
  fs.readFile(filePath, (error, contents) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": route[1], "Cache-Control": "no-store" });
    response.end(request.method === "HEAD" ? undefined : contents);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Danny's Crocant Food disponível em http://127.0.0.1:${port}`);
});
