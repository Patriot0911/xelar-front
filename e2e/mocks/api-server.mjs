// Minimal stand-in for the `api` service. Server components fetch from the Next server process,
// so `page.route` can't intercept them — they hit this server instead (see playwright.config.ts).
import http from 'node:http';
import { readFileSync } from 'node:fs';

const port = Number(process.env.MOCK_API_PORT ?? 4599);
const fixture = (name) => JSON.parse(readFileSync(new URL(`../fixtures/${name}.json`, import.meta.url), 'utf8'));

const routes = {
  '/api/public/streamers/showcase': () => ({ status: true, data: fixture('streamers-showcase') }),
};

http.createServer((req, res) => {
  const path = (req.url ?? '').split('?')[0];
  const handler = routes[path];
  res.setHeader('content-type', 'application/json');

  if (path === '/health') return res.end('{"ok":true}');
  if (!handler) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ status: false, message: `Cannot ${req.method} ${path}` }));
  }
  res.end(JSON.stringify(handler()));
}).listen(port, () => console.log(`[mock-api] listening on :${port}`));
