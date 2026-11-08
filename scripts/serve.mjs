import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../out/', import.meta.url));
const prefix = '/' + path.basename(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.txt':'text/plain; charset=utf-8', '.xml':'application/xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.ico':'image/x-icon', '.mp4':'video/mp4' };
createServer(async (req, res) => {
  try {
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === prefix || pathname.startsWith(prefix + '/')) pathname = pathname.slice(prefix.length);
    let target = path.resolve(root, '.' + (pathname || '/'));
    if (target !== path.resolve(root) && !target.startsWith(path.resolve(root) + path.sep)) { res.writeHead(403).end(); return; }
    if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    const body = await readFile(target);
    const headers = { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Accept-Ranges': 'bytes' };
    if (req.headers.range) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      let start = range?.[1] ? Number(range[1]) : Math.max(0, body.length - Number(range?.[2]));
      let end = range?.[1] && range?.[2] ? Number(range[2]) : body.length - 1;
      if (!range || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= body.length || end < start) {
        res.writeHead(416, { 'Content-Range': `bytes */${body.length}` }).end(); return;
      }
      end = Math.min(end, body.length - 1);
      res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${body.length}`, 'Content-Length': end - start + 1 });
      res.end(req.method === 'HEAD' ? undefined : body.subarray(start, end + 1));
    } else {
      res.writeHead(200, { ...headers, 'Content-Length': body.length });
      res.end(req.method === 'HEAD' ? undefined : body);
    }
  } catch {
    const fallback = await readFile(path.join(root, '404.html')).catch(() => Buffer.from('Página não encontrada.'));
    res.writeHead(404, { 'Content-Type':'text/html; charset=utf-8' }).end(req.method === 'HEAD' ? undefined : fallback);
  }
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log('Site disponível em http://localhost:' + (process.env.PORT || 3000)));
