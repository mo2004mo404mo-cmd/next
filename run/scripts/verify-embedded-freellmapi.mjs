/**
 * E2E verification of the #MEDQ-embedded FreeLLM API AI Router.
 *
 * Everything goes through the MedQ origin on port 3000 ONLY — the embedded
 * in-process Express app must answer with no standalone sidecar running:
 *   1. MedQ login → /api/freellmapi-bridge → dashboard token
 *   2. (idempotent) add the real ollama2.space-z.ai provider + 8 zai models
 *   3. fetch the unified API key
 *   4. GET  /v1/models                     (Bearer unified key)
 *   5. POST /v1/chat/completions (stream)  → SSE deltas through the proxy
 *
 * Run: bun scripts/verify-embedded-freellmapi.mjs
 */
import { $ } from 'bun';

const B = 'http://127.0.0.1:3000';
const JAR = '/tmp/medq-embedded.jar';
const email = 'admin@medq.com';
const password = 'test123';

const ZAI_MODELS = [
  'zai-llm', 'zai-vision', 'zai-web-search', 'zai-web-reader',
  'zai-image-gen', 'zai-image-edit', 'zai-tts', 'zai-asr',
];

const results = [];
const check = (name, ok, detail = '') => {
  results.push([name, !!ok]);
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  [${detail}]` : ''}`);
};

let cookieHeader = '';
async function api(path, init = {}) {
  const headers = { ...(init.headers ?? {}) };
  if (cookieHeader) headers.cookie = cookieHeader;
  const res = await fetch(`${B}${path}`, { ...init, headers });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* raw */ }
  return { status: res.status, json, text };
}

// ── 0. no standalone sidecar on 3002 ──────────────────────────────────────
const listeners = (await $`ss -ltn`.text());
check('no standalone sidecar listener on :3002', !/(^|\s)127\.0\.0\.1:3002\s/.test(listeners));

// ── 1. MedQ login → bridge token ─────────────────────────────────────────
await $`rm -f ${JAR}`.quiet();
const csrfToken = JSON.parse((await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text())).csrfToken;
await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrfToken} --data-urlencode email=${email} --data-urlencode password=${password} --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
cookieHeader = (await $`cat ${JAR}`.text()).split('\n')
  .filter((l) => l.includes('\t'))
  .map((l) => { const p = l.split('\t'); return `${p[5]}=${p[6]}`; })
  .filter((c) => !c.startsWith('csrfToken='))
  .join('; ');
const bridge = (await api('/api/freellmapi-bridge', { method: 'POST' })).json;
check('bridge mints a dashboard token', !!bridge?.token, bridge?.email ?? String(bridge).slice(0, 80));
const AUTH = { Authorization: `Bearer ${bridge.token}`, 'Content-Type': 'application/json' };

// ── 2. provider (idempotent) ─────────────────────────────────────────────
const keysRes = (await api('/freellmapi/api/keys', { headers: AUTH })).json;
const allKeys = keysRes?.keys ?? keysRes ?? [];
const hasProvider = (Array.isArray(allKeys) ? allKeys : []).some((k) =>
  String(k.baseUrl ?? '').includes('ollama2.space-z.ai'));
if (!hasProvider) {
  const add = await api('/freellmapi/api/keys/custom', {
    method: 'POST', headers: AUTH,
    body: JSON.stringify({
      baseUrl: 'https://ollama2.space-z.ai/v1',
      label: 'Z.AI Gateway (ollama2)',
      models: ZAI_MODELS,
    }),
  });
  console.log(`  (added ollama2 provider: ${add.status} ${add.text.slice(0, 100)})`);
} else {
  console.log('  (ollama2 provider already present)');
}

// ── 3. unified key ───────────────────────────────────────────────────────
const uk = (await api('/freellmapi/api/settings/api-key', { headers: AUTH })).json;
const ukey = uk?.apiKey ?? '';
check('unified API key available', !!ukey, ukey ? `${ukey.slice(0, 6)}… (${ukey.length} chars)` : JSON.stringify(uk).slice(0, 80));

// ── 4. GET /v1/models through the MedQ origin ────────────────────────────
const modelsRes = await fetch(`${B}/v1/models`, { headers: { Authorization: `Bearer ${ukey}` } });
const modelsJson = await modelsRes.json().catch(() => null);
const modelIds = (modelsJson?.data ?? []).map((m) => m.id);
check('/v1/models answers 200', modelsRes.status === 200, `HTTP ${modelsRes.status}`);
check('/v1/models lists zai-llm', modelIds.includes('zai-llm'), `${modelIds.length} models`);

// ── 5. streaming chat completion through the embedded router ─────────────
let sseFrames = 0;
let contentChars = 0;
let finishReason = null;
let streamError = null;
try {
  const res = await fetch(`${B}/v1/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${ukey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'zai-llm',
      stream: true,
      max_tokens: 80,
      messages: [
        { role: 'system', content: 'You are a terse medical tutor. One short sentence.' },
        { role: 'user', content: 'What electrolyte disturbance causes Chvostek sign?' },
      ],
    }),
  });
  check('chat/completions answers 200', res.status === 200, `HTTP ${res.status}`);
  if (res.ok && res.body) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, idx).trim();
        buf = buf.slice(idx + 1);
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (payload === '[DONE]') continue;
        try {
          const ev = JSON.parse(payload);
          const delta = ev.choices?.[0]?.delta ?? {};
          if (typeof delta.content === 'string') contentChars += delta.content.length;
          if (ev.choices?.[0]?.finish_reason) finishReason = ev.choices[0].finish_reason;
          sseFrames++;
        } catch { /* keep partial line in buf */ }
      }
    }
  } else {
    streamError = (await res.text()).slice(0, 200);
  }
} catch (err) {
  streamError = String(err?.message ?? err);
}
check('SSE stream delivered frames through port 3000', sseFrames > 0, `${sseFrames} frames`);
check('stream carried answer tokens', contentChars > 0, `${contentChars} content chars`);
if (finishReason) console.log(`  (finish_reason: ${finishReason})`);
if (streamError) console.log(`  (stream note: ${streamError})`);

const failed = results.filter(([, ok]) => !ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) { console.log('FAILED:', failed.map(([n]) => n).join(' | ')); process.exit(1); }
