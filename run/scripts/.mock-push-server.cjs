/**
 * Persistent mock Web Push endpoint (HTTPS, self-signed).
 * Start: ( setsid nohup node scripts/.mock-push-server.cjs > scripts/.mock-push-server.log 2>&1 & )
 *
 * Behavior per request is controlled by scripts/.mock-push-mode.txt:
 *   'ok'   → 201 (delivery success — subscription stays healthy)
 *   'gone' → 404 (dead endpoint — server should prune the subscription)
 *
 * Requests are appended IMMEDIATELY (fs.appendFileSync — no stdout block
 * buffering) to scripts/.mock-push-hits.jsonl, one JSON object per line.
 */
const https = require('https');
const fs = require('fs');
const MODE_FILE = '/home/z/my-project/scripts/.mock-push-mode.txt';
const HITS_FILE = '/home/z/my-project/scripts/.mock-push-hits.jsonl';
try { fs.writeFileSync(MODE_FILE, 'ok'); } catch {}

const srv = https.createServer(
  {
    key: fs.readFileSync('/home/z/my-project/scripts/.mock-push-key.pem'),
    cert: fs.readFileSync('/home/z/my-project/scripts/.mock-push-cert.pem'),
  },
  (req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      let mode = 'ok';
      try { mode = fs.readFileSync(MODE_FILE, 'utf-8').trim(); } catch {}
      const record = {
        at: Date.now(), method: req.method, url: req.url,
        headers: req.headers,
        bodyLen: Buffer.byteLength(body, 'binary'),
        bodyHead: Buffer.from(body, 'binary').slice(0, 24).toString('base64'),
      };
      try { fs.appendFileSync(HITS_FILE, JSON.stringify(record) + '\n'); } catch {}
      res.writeHead(mode === 'ok' ? 201 : 404, {});
      res.end();
    });
  },
);
srv.listen(43125, '127.0.0.1', () => console.log('mock push listening on 43125'));
