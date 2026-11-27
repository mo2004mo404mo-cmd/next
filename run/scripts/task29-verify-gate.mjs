// Task 29 — e2e verification of the capability gate on the LIVE router.
import { createDecipheriv, createHash } from 'node:crypto';
import { Client } from 'pg';
import fs from 'node:fs';

// 1. Bridge key: UserApiKey row 'medq-router', app-level crypto = AES-256-GCM
//    keyed SHA256(NEXTAUTH_SECRET), base64 ct/iv/tag (byok-crypto.ts).
const envText = fs.readFileSync('.env', 'utf8');
let secret = /NEXTAUTH_SECRET="?([^"\s]+)"?/.exec(envText)?.[1];
if (!secret) { for (const f of ['.env', '.env.local', '.env.production']) { try { const t = fs.readFileSync(f, 'utf8'); const m = /NEXTAUTH_SECRET=(\S+)/.exec(t); if (m) { secret = m[1]; break; } } catch {} } }
if (!secret) throw new Error('no NEXTAUTH_SECRET found');

const pg = new Client({ host: '127.0.0.1', port: 5432, user: 'postgres', password: 'postgres', database: 'nextapp' });
await pg.connect();
const row = (await pg.query("SELECT \"encryptedKey\", iv, \"authTag\" FROM \"UserApiKey\" WHERE \"providerId\"='medq-router' LIMIT 1")).rows[0];
await pg.end();

function decryptAppLevel(encB64, ivB64, tagB64) {
  const key = createHash('sha256').update(secret).digest();
  const d = createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64'));
  d.setAuthTag(Buffer.from(tagB64, 'base64'));
  return Buffer.concat([d.update(Buffer.from(encB64, 'base64')), d.final()]).toString('utf8');
}
const bridgeKey = decryptAppLevel(row.encryptedKey, row.iv, row.authTag);
console.log('bridge key decrypted, len', bridgeKey.length);

const BASE = 'http://127.0.0.1:3000/v1';
const auth = { 'Content-Type': 'application/json', Authorization: `Bearer ${bridgeKey}` };

// 2. Refused model → immediate 400 model_not_chat, no dispatch.
const t0 = Date.now();
const r1 = await fetch(`${BASE}/chat/completions`, { method: 'POST', headers: auth, body: JSON.stringify({ model: 'zai-web-search', messages: [{ role: 'user', content: 'anemia' }] }), signal: AbortSignal.timeout(20000) });
const b1 = await r1.json();
console.log(`\n[zai-web-search] ${r1.status} in ${Date.now() - t0}ms code=${b1.error?.code}`);
console.log('  message:', b1.error?.message?.slice(0, 220));

const t1 = Date.now();
const r2 = await fetch(`${BASE}/chat/completions`, { method: 'POST', headers: auth, body: JSON.stringify({ model: 'zai-web-reader', messages: [{ role: 'user', content: 'hi' }] }), signal: AbortSignal.timeout(20000) });
const b2 = await r2.json();
console.log(`[zai-web-reader] ${r2.status} in ${Date.now() - t1}ms code=${b2.error?.code}`);

// 3. Chat model still works end-to-end.
const t2 = Date.now();
const r3 = await fetch(`${BASE}/chat/completions`, { method: 'POST', headers: auth, body: JSON.stringify({ model: 'zai-llm', messages: [{ role: 'user', content: 'Reply with exactly: OK' }], max_tokens: 10 }), signal: AbortSignal.timeout(45000) });
const b3 = await r3.json();
console.log(`[zai-llm] ${r3.status} in ${Date.now() - t2}ms → ${b3.choices?.[0]?.message?.content?.slice(0, 40) ?? JSON.stringify(b3).slice(0, 120)}`);

// 4. /v1/models capability flags.
const r4 = await fetch(`${BASE}/models`, { headers: auth, signal: AbortSignal.timeout(20000) });
const b4 = await r4.json();
const flagged = (b4.data ?? []).filter(m => m.chat_capable === false).map(m => m.id);
const chatOk = (b4.data ?? []).filter(m => ['zai-llm', 'glm-4.6'].includes(m.id)).map(m => m.id);
console.log(`\n[/v1/models] chat_capable=false: ${flagged.join(', ') || '(none)'}`);
console.log(`[/v1/models] chat models present: ${chatOk.join(', ') || '(none)'}`);
