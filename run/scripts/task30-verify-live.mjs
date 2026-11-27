// Task 30 — live verification of the vision/tools metadata fix on the router.
//  1. Tool models still refused fast (model_not_chat), 0 attempts burned.
//  2. zai-llm plain chat still 200.
//  3. zai-llm WITH tools → 200 + real tool_calls (supports_tools=1 truthful).
//  4. IMAGE-bearing request → zai-vision must 200 (previously: vision rows had
//     supports_vision=0, so a vision pick could never serve an image request).
//  5. /v1/models flags: zai-vision chat_capable=true, zai-web-search false.
import { createDecipheriv, createHash } from 'node:crypto';
import { Client } from 'pg';
import fs from 'node:fs';

const envText = fs.readFileSync('.env', 'utf8');
let secret = /NEXTAUTH_SECRET="?([^"\s]+)"?/.exec(envText)?.[1];
if (!secret) { for (const f of ['.env', '.env.local', '.env.production']) { try { const t = fs.readFileSync(f, 'utf8'); const m = /NEXTAUTH_SECRET=(\S+)/.exec(t); if (m) { secret = m[1]; break; } } catch {} } }

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

const BASE = 'http://127.0.0.1:3000/v1';
const auth = { 'Content-Type': 'application/json', Authorization: `Bearer ${bridgeKey}` };

async function chat(label, body) {
  const t = Date.now();
  const res = await fetch(`${BASE}/chat/completions`, { method: 'POST', headers: auth, body: JSON.stringify(body), signal: AbortSignal.timeout(45000) });
  const json = await res.json().catch(() => ({}));
  const msg = json?.choices?.[0]?.message;
  console.log(`[${label}] HTTP ${res.status} in ${Date.now() - t}ms | finish=${json?.choices?.[0]?.finish_reason ?? json?.error?.code ?? '?'} | tool_calls=${Array.isArray(msg?.tool_calls) ? msg.tool_calls.length : 0}`);
  if (json?.error) console.log('   err:', String(json.error.message).slice(0, 200));
  else console.log('   content:', String(msg?.content ?? '').slice(0, 100).replace(/\n/g, ' '));
  return res.status;
}

// 1. tool models still refused instantly
await chat('zai-web-search (tool model)', { model: 'zai-web-search', messages: [{ role: 'user', content: 'hi' }] });

// 2. plain chat on the chat model
await chat('zai-llm plain', { model: 'zai-llm', messages: [{ role: 'user', content: 'Reply with exactly: OK' }], max_tokens: 20 });

// 3. tools on the chat model
await chat('zai-llm + tools', {
  model: 'zai-llm',
  messages: [{ role: 'user', content: 'What is the weather in Cairo? Use the tool.' }],
  tools: [{ type: 'function', function: { name: 'get_weather', description: 'Get current weather', parameters: { type: 'object', properties: { city: { type: 'string' } }, required: ['city'] } } }],
  tool_choice: 'auto',
  max_tokens: 200,
});

// 4. THE FIX: image request routed to a vision-capable model
const IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII=';
await chat('zai-vision + image', {
  model: 'zai-vision',
  messages: [{ role: 'user', content: [{ type: 'text', text: 'What color dominates this tiny image? One word.' }, { type: 'image_url', image_url: { url: IMG } }] }],
  max_tokens: 30,
});

// 5. /v1/models flags
const lm = await fetch(`${BASE}/models`, { headers: auth, signal: AbortSignal.timeout(15000) });
const lj = await lm.json();
for (const id of ['zai-llm', 'zai-vision', 'zai-web-search', 'zai-web-reader']) {
  const m = lj?.data?.find(x => x.id === id);
  console.log(`/v1/models ${id}: chat_capable=${m?.chat_capable} supports_vision_flag=${m?.supported_parameters?.includes?.('vision') ?? m?.supports_vision ?? '?'}`);
}
