// Task 29 — probe the custom gateways to learn how zai-web-search / zai-web-reader
// are meant to be called ("Use the appropriate /v1/* endpoint" per the 400 body).
import { createDecipheriv } from 'node:crypto';
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/home/z/my-project/freellmapi/package.json');
const Database = require('better-sqlite3');

const env = fs.readFileSync('freellmapi/.env', 'utf8');
const ENCRYPTION_KEY = /ENCRYPTION_KEY=(\w+)/.exec(env)?.[1];
if (!ENCRYPTION_KEY) throw new Error('no ENCRYPTION_KEY');
const keyBuf = Buffer.from(ENCRYPTION_KEY, 'hex');

function decrypt(row) {
  try {
    const d = createDecipheriv('aes-256-gcm', keyBuf, Buffer.from(row.iv, 'hex'));
    d.setAuthTag(Buffer.from(row.auth_tag, 'hex'));
    return Buffer.concat([d.update(Buffer.from(row.encrypted_key, 'hex')), d.final()]).toString('utf8');
  } catch (e) {
    return `<<decrypt-fail: ${e.message}>>`;
  }
}

const db = new Database('freellmapi/server/data/freeapi.db', { readonly: true });
const rows = db.prepare("SELECT id,label,base_url,encrypted_key,iv,auth_tag FROM api_keys WHERE platform='custom' AND enabled=1").all();
db.close();

const targets = rows.map((r) => ({ id: r.id, label: r.label, base: r.base_url, key: decrypt(r) }));
for (const t of targets) console.log(`key#${t.id} ${t.label} base=${t.base} keyLen=${t.key.length} preview=${t.key.slice(0, 8)}…`);

async function tryFetch(name, url, opts) {
  try {
    const res = await fetch(url, { ...opts, signal: AbortSignal.timeout(15000) });
    const text = await res.text();
    console.log(`  [${name}] ${res.status} ${text.slice(0, 400)}`);
    return { status: res.status, text };
  } catch (e) {
    console.log(`  [${name}] TRANSPORT ${e.message}`);
    return { status: 0, text: e.message };
  }
}

for (const t of targets) {
  if (t.key.startsWith('<<') || t.key === 'no-key') { console.log(`\n== ${t.base}: skip (no real key)`); continue; }
  const auth = { Authorization: `Bearer ${t.key}`, 'Content-Type': 'application/json' };
  console.log(`\n== ${t.base} (${t.label})`);
  await tryFetch('GET /models', `${t.base}/models`, { headers: auth });
  await tryFetch('POST /chat/completions zai-llm', `${t.base}/chat/completions`, { method: 'POST', headers: auth, body: JSON.stringify({ model: 'zai-llm', messages: [{ role: 'user', content: 'hi' }], max_tokens: 20 }) });
  await tryFetch('POST /web_search', `${t.base}/web_search`, { method: 'POST', headers: auth, body: JSON.stringify({ query: 'anemia treatment guidelines', num: 3 }) });
  await tryFetch('POST /web_reader', `${t.base}/web_reader`, { method: 'POST', headers: auth, body: JSON.stringify({ url: 'https://example.com' }) });
}
