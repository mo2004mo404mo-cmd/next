// Controlled comparison: direct gateway call vs app-path call, back to back,
// twice each, with timings — to determine whether the app path is
// systematically broken or the gateway is per-request flaky.
import { readFileSync } from 'node:fs';

process.env.ENCRYPTION_KEY = readFileSync('/home/z/my-project/freellmapi/.env', 'utf8')
  .match(/^ENCRYPTION_KEY=(.+)$/m)[1].trim().replace(/^["']|["']$/g, '');
const { decrypt, initEncryptionKey } = await import('/home/z/my-project/freellmapi/server/dist/lib/crypto.js');
initEncryptionKey(null);
const Database = ((await import('/home/z/my-project/freellmapi/node_modules/better-sqlite3/lib/index.js'))).default;
const db = new Database('/home/z/my-project/freellmapi/server/data/freeapi.db', { readonly: true });
const row = db.prepare('SELECT encrypted_key, iv, auth_tag FROM api_keys WHERE id = 1').get();
const gatewayKey = decrypt(row.encrypted_key, row.iv, row.auth_tag);

const ORIGIN = 'http://127.0.0.1:3000';
const bridge = JSON.parse(readFileSync('/home/z/my-project/freellmapi/server/data/medq-bridge.json', 'utf8'));
const { token } = await (await fetch(`${ORIGIN}/freellmapi/api/auth/login`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: bridge.email, password: bridge.password }),
})).json();
const { apiKey } = await (await fetch(`${ORIGIN}/freellmapi/api/settings/api-key`, { headers: { Authorization: `Bearer ${token}` } })).json();

const GW = 'https://ollama2.space-z.ai/v1/images/generations';
const PROMPT = 'a simple teal circle on white background, minimal';

async function attempt(label, url, authKey) {
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authKey}` },
      body: JSON.stringify({ model: 'cogview-4', prompt: PROMPT, size: '1024x1024', n: 1 }),
      signal: AbortSignal.timeout(200000),
    });
    const ms = Date.now() - t0;
    if (res.ok) {
      const j = await res.json();
      console.log(`${label}: 200 in ${(ms / 1000).toFixed(1)}s b64=${(j.data?.[0]?.b64_json?.length ?? 0) > 1000 ? 'yes' : 'NO'}`);
    } else {
      console.log(`${label}: ${res.status} in ${(ms / 1000).toFixed(1)}s`);
    }
  } catch (e) {
    console.log(`${label}: ERR ${e.message} (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
  }
}

await attempt('direct  #1', GW, gatewayKey);
await attempt('app     #1', `${ORIGIN}/v1/images/generations`, apiKey);
await attempt('direct  #2', GW, gatewayKey);
await attempt('app     #2', `${ORIGIN}/v1/images/generations`, apiKey);
