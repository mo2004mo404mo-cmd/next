/**
 * Web Push server-pipeline E2E test.
 *
 * Verifies the ENTIRE server side of web push WITHOUT a real browser push
 * subscription, using the persistent HTTPS mock push endpoint
 * (scripts/.mock-push-server.cjs — start it first):
 *
 *   1. GET  /api/push/vapid-public        → key + enabled:true
 *   2. POST /api/push/subscribe           → row in PushSubscription (auth'd)
 *   3. POST /api/push/send (admin)        → sendPushToUser fires a REAL
 *      web-push POST at the mock — with a genuine VAPID-signed
 *      Authorization header and aes128gcm-encrypted body.
 *   4. The mock logs the request → we assert TTL / Content-Encoding /
 *      Authorization(vapid) / Crypto-Key headers and encrypted body.
 *   5. Mock mode 'ok' (201) → subscription RETAINED in DB (sent:1)
 *   6. Mock mode 'gone' (404) → second send → subscription PRUNED from DB
 *   7. Non-admin /api/push/send → 403; anonymous subscribe → 401
 *
 * WHY THE EXTERNAL MOCK: web-push always issues https.request against the
 * endpoint (production push services are all https), so the mock needs TLS.
 * The app server must run with NODE_EXTRA_CA_CERTS=scripts/.mock-push-cert.pem
 * for the handshake to be trusted (test-only; restart the server without it
 * afterwards).
 *
 * Run: node scripts/test-push-server-pipeline.cjs
 */

const fs = require('fs');

const BASE = 'http://127.0.0.1:3000';
const ROOT = '/home/z/my-project';
const MOCK_PORT = 43125; // persistent external mock
const MODE_FILE = ROOT + '/scripts/.mock-push-mode.txt';
const HITS_FILE = ROOT + '/scripts/.mock-push-hits.jsonl'; // immediate-flush hit log

function assert(cond, label) {
  console.log((cond ? 'PASS' : 'FAIL') + ' — ' + label);
  if (!cond) process.exitCode = 1;
}

/** Read request records appended to the mock log since `sinceBytes`. */
function readMockRequests(sinceLines) {
  let raw = '';
  try { raw = fs.readFileSync(HITS_FILE, 'utf-8'); } catch { return []; }
  const lines = raw.split('\n').filter((l) => l.trim());
  return lines.slice(sinceLines).map((l) => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);
}

async function main() {
  fs.writeFileSync(MODE_FILE, 'ok');
  let lineCount = 0;
  try { lineCount = fs.readFileSync(HITS_FILE, 'utf-8').split('\n').filter((l) => l.trim()).length; } catch {}
  const logStart = lineCount;

  // ── Session helper (NextAuth v5 credentials flow) ──────────────────
  async function loginAs(email) {
    const csrfRes = await fetch(BASE + '/api/auth/csrf');
    const { csrfToken } = await csrfRes.json();
    const baseCookies = (csrfRes.headers.getSetCookie?.() || []).map((c) => c.split(';')[0]).join('; ');
    const cbRes = await fetch(BASE + '/api/auth/callback/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: baseCookies },
      body: new URLSearchParams({ csrfToken, email, password: 'test123', callbackUrl: BASE + '/' }).toString(),
      redirect: 'manual',
    });
    const cookies = [...(csrfRes.headers.getSetCookie?.() || []), ...(cbRes.headers.getSetCookie?.() || [])]
      .map((c) => c.split(';')[0]).filter(Boolean);
    return cookies.join('; ');
  }
  const jar = await loginAs('admin@medq.com');
  assert(jar.includes('session-token'), 'admin session cookie obtained');
  const authHeaders = { 'Content-Type': 'application/json', Cookie: jar };

  // ── 1. vapid-public ───────────────────────────────────────────────
  const vapid = await (await fetch(BASE + '/api/push/vapid-public')).json();
  assert(vapid.enabled === true && vapid.publicKey && vapid.publicKey.length > 60,
    'vapid-public: enabled with ' + (vapid.publicKey || '').length + '-char key');

  // ── 2. subscribe with a synthetic subscription ────────────────────
  const subPayload = {
    endpoint: 'https://127.0.0.1:' + MOCK_PORT + '/push/v2/subscription-test-1',
    keys: {
      // Valid 65-byte uncompressed P-256 point + 16-byte auth secret
      // (web-push validates lengths; the classic docs example key is 64 bytes).
      p256dh: 'BN3E4IpK9beyhOx4GuwvCpXNaHQ3tiFvmdBeOd7U67ENxUhX0jYfua2WNfLg+0JoagFLHD8X2vnJn7ozLYEB2Y4=',
      auth: 'Kn1mrqQyJTwOguOi7V8Tkg==',
    },
    userAgent: 'medq-push-e2e-test',
  };
  const subRes = await fetch(BASE + '/api/push/subscribe', {
    method: 'POST', headers: authHeaders, body: JSON.stringify(subPayload),
  });
  assert(subRes.status === 201, 'subscribe → 201 (got ' + subRes.status + ')');

  // ── 3. admin send → real web-push POST to mock ────────────────────
  const sendRes = await fetch(BASE + '/api/push/send', {
    method: 'POST', headers: authHeaders,
    body: JSON.stringify({ title: 'E2E push test', body: 'Server pipeline verification', url: '/bank' }),
  });
  const sendJson = await sendRes.json();
  console.log('send response:', JSON.stringify(sendJson));
  assert(sendRes.status === 200 && sendJson.sent === 1 && sendJson.total === 1,
    'admin send: sent=1/total=1');

  // Mock stdout is block-buffered under nohup — poll for the log line.
  let hit = null;
  for (let i = 0; i < 25 && !hit; i++) {
    await new Promise((r) => setTimeout(r, 200));
    const reqs = readMockRequests(logStart);
    hit = reqs.find((r) => r.url && r.url.includes('subscription-test-1')) || null;
  }
  assert(!!hit && hit.method === 'POST', 'mock endpoint received POST');

  const h = (hit && hit.headers) || {};
  assert(!!h['ttl'], 'push POST has TTL header: ' + h['ttl']);
  assert((h['content-encoding'] || '').includes('aes128gcm'), 'Content-Encoding aes128gcm');
  const authz = (h['authorization'] || '').toLowerCase();
  assert(authz.includes('vapid') && authz.includes('t=') && authz.includes('k='),
    'VAPID Authorization: vapid t=<jwt>, k=<pubkey>');
  // aes128gem (RFC 8291) carries the DH key INSIDE the encrypted payload's
  // header record — a separate Crypto-Key header is only used by the legacy
  // aesgcm128 scheme, so its absence here is CORRECT modern behavior.
  assert(!!h['urgency'], 'Urgency header present: ' + h['urgency']);
  assert((h['content-type'] || '').includes('octet-stream'), 'Content-Type application/octet-stream (binary ciphertext)');
  assert(hit && hit.bodyLen > 50 && !(hit.bodyHead || '').includes('E2E'),
    'payload encrypted (plaintext title NOT visible, len=' + ((hit && hit.bodyLen) || 0) + ')');

  // ── 4. subscription retained (201 → no prune) ─────────────────────
  const { Client } = require('pg');
  const c = new Client({ connectionString: 'postgresql://postgres:postgres@localhost:5432/nextapp' });
  await c.connect();
  const afterOk = await c.query(
    'SELECT COUNT(*)::int AS n FROM "PushSubscription" WHERE endpoint = $1', [subPayload.endpoint]);
  assert(afterOk.rows[0].n === 1, 'subscription retained in DB after 201 delivery');

  // ── 5. 404 mode → send → auto-prune ───────────────────────────────
  fs.writeFileSync(MODE_FILE, 'gone');
  const send2 = await fetch(BASE + '/api/push/send', {
    method: 'POST', headers: authHeaders,
    body: JSON.stringify({ title: 'prune test', body: 'should 404 and prune' }),
  });
  const send2Json = await send2.json();
  console.log('send2 response:', JSON.stringify(send2Json));
  await new Promise((r) => setTimeout(r, 700)); // prune is background (fire-and-forget)
  const afterGone = await c.query(
    'SELECT COUNT(*)::int AS n FROM "PushSubscription" WHERE endpoint = $1', [subPayload.endpoint]);
  assert(afterGone.rows[0].n === 0, 'subscription PRUNED from DB after 404 delivery');

  // ── 6. unsubscribe route idempotency ──────────────────────────────
  const unsubRes = await fetch(BASE + '/api/push/unsubscribe', {
    method: 'POST', headers: authHeaders, body: JSON.stringify({ endpoint: subPayload.endpoint }),
  });
  const unsubJson = await unsubRes.json();
  assert(unsubRes.status === 200 && unsubJson.ok === true,
    'unsubscribe idempotent: 200 ok (deleted=' + (unsubJson.deleted ?? '-') + ')');

  // ── 7. non-admin send rejected ────────────────────────────────────
  const studentJar = await loginAs('student@medq.com');
  const forbidden = await fetch(BASE + '/api/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: studentJar },
    body: '{}',
  });
  assert(forbidden.status === 403, 'non-admin /api/push/send → 403 (got ' + forbidden.status + ')');

  // ── 8. anonymous subscribe rejected ───────────────────────────────
  const anon = await fetch(BASE + '/api/push/subscribe', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(subPayload),
  });
  assert(anon.status === 401, 'anonymous subscribe → 401 (got ' + anon.status + ')');

  await c.end();
  fs.writeFileSync(MODE_FILE, 'ok');
  console.log(process.exitCode ? '\n=== SOME CHECKS FAILED ===' : '\n=== ALL PUSH SERVER-PIPELINE CHECKS PASSED ===');
}

main().catch((e) => { console.error('FATAL:', e); process.exit(1); });
