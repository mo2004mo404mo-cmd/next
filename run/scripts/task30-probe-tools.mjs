// Task 30 — probe: does a custom gateway's CHAT model accept OpenAI-style
// `tools` on /v1/chat/completions? Decides whether supports_tools=1 (the
// custom-row default) is truthful for the zai-* chat/vision rows.
import { createDecipheriv } from 'node:crypto';
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/home/z/my-project/freellmapi/package.json');
const Database = require('better-sqlite3');

const env = fs.readFileSync('freellmapi/.env', 'utf8');
const ENCRYPTION_KEY = /ENCRYPTION_KEY=(\w+)/.exec(env)?.[1];
const keyBuf = Buffer.from(ENCRYPTION_KEY, 'hex');

function decryptKey(row) {
  try {
    const d = createDecipheriv('aes-256-gcm', keyBuf, Buffer.from(row.iv, 'hex'));
    d.setAuthTag(Buffer.from(row.auth_tag, 'hex'));
    return Buffer.concat([d.update(Buffer.from(row.encrypted_key, 'hex')), d.final()]).toString('utf8');
  } catch {
    return null;
  }
}

const db = new Database('freellmapi/server/data/freeapi.db', { readonly: true });
const endpoints = db.prepare("SELECT DISTINCT k.base_url, k.id AS key_id FROM api_keys k WHERE k.platform='custom' AND k.enabled=1 AND k.base_url IS NOT NULL").all();

const TOOLS = [{
  type: 'function',
  function: {
    name: 'get_weather',
    description: 'Get current weather for a city',
    parameters: { type: 'object', properties: { city: { type: 'string' } }, required: ['city'] },
  },
}];

for (const ep of endpoints.slice(0, 2)) {
  const base = /\/v1$/.test(ep.base_url.replace(/\/$/, '')) ? ep.base_url.replace(/\/$/, '') : `${ep.base_url.replace(/\/$/, '')}/v1`;
  const keyRow = db.prepare('SELECT * FROM api_keys WHERE id = ?').get(ep.key_id);
  const secret = decryptKey(keyRow);
  const headers = { 'Content-Type': 'application/json' };
  if (secret && secret !== 'no-key') headers.Authorization = `Bearer ${secret}`;
  for (const model of ['zai-llm', 'zai-vision']) {
    const t0 = Date.now();
    try {
      const res = await fetch(`${base}/chat/completions`, {
        method: 'POST', headers,
        body: JSON.stringify({ model, messages: [{ role: 'user', content: 'What is the weather in Cairo? Use the tool.' }], tools: TOOLS, tool_choice: 'auto', max_tokens: 200 }),
      });
      const body = await res.json().catch(() => ({}));
      const msg = body?.choices?.[0]?.message;
      console.log(`${ep.base_url} | ${model} | HTTP ${res.status} in ${Date.now() - t0}ms | finish=${body?.choices?.[0]?.finish_reason ?? body?.error?.code ?? '?'} | tool_calls=${Array.isArray(msg?.tool_calls) ? msg.tool_calls.length : 0} | ${String(body?.error?.message ?? msg?.content ?? '').slice(0, 120).replace(/\n/g, ' ')}`);
    } catch (err) {
      console.log(`${ep.base_url} | ${model} | FETCH FAIL: ${err.message}`);
    }
  }
}
