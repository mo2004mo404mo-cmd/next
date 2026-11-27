/**
 * Rewire MedQ + FreeLLM onto the REAL ollama2.space-z.ai gateway.
 *
 * Before: MedQ chat hit ollama2 DIRECTLY (env bypass); FreeLLM's playground
 *         answered from the LOCAL MOCK (127.0.0.1:11434). Two bypasses.
 * After:  everything flows through the FreeLLM router —
 *         MedQ → /v1 (unified key) → sidecar router → ollama2.space-z.ai.
 *
 * Steps:
 *  1. MedQ login → bridge token (auto-claims sidecar account)
 *  2. Sidecar: delete the mock provider row (127.0.0.1:11434)
 *  3. Sidecar: add https://ollama2.space-z.ai/v1 with the 8 real zai models
 *  4. Sidecar: fetch the unified API key
 *  5. MedQ DB: medq-router row modelsConfig → 8 real zai models
 *  6. MedQ DB: user's dead "local Ollama" BYOK row → repoint at ollama2
 *  7. MedQ DB: admin defaultModel → medq-router:zai-llm (through FreeLLM)
 *  8. .env: DEFAULT_MODEL + MEDQ_AGENT_* → FreeLLM /v1 with unified key
 *  9. Kill the mock Ollama process on :11434
 */
import { $ } from 'bun';
import { db } from '../src/lib/db';

const B = 'http://127.0.0.1:3000';
const JAR = '/tmp/medq-rewire.jar';
const email = 'admin@medq.com';
const password = 'test123';

const ZAI_MODELS = [
  { id: 'zai-llm', name: 'zai-llm' },
  { id: 'zai-vision', name: 'zai-vision' },
  { id: 'zai-web-search', name: 'zai-web-search' },
  { id: 'zai-web-reader', name: 'zai-web-reader' },
  { id: 'zai-image-gen', name: 'zai-image-gen' },
  { id: 'zai-image-edit', name: 'zai-image-edit' },
  { id: 'zai-tts', name: 'zai-tts' },
  { id: 'zai-asr', name: 'zai-asr' },
];

async function api(path, init = {}) {
  const headers = { ...(init.headers ?? {}) };
  if (cookieHeader) headers.cookie = cookieHeader;
  const res = await fetch(`${B}${path}`, { ...init, headers });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* raw */ }
  return { status: res.status, json, text };
}

let cookieHeader = '';

// ── 1. MedQ login → bridge token ─────────────────────────────────────────
await $`rm -f ${JAR}`;
const csrf = (await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text());
const csrfToken = JSON.parse(csrf).csrfToken;
await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrfToken} --data-urlencode email=${email} --data-urlencode password=${password} --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
// load the session cookie from the curl jar into our fetch helper
const jarText = await $`cat ${JAR}`.text();
cookieHeader = jarText.split('\n')
  .filter((l) => l.includes('\t'))
  .map((l) => { const p = l.split('\t'); return `${p[5]}=${p[6]}`; })
  .filter((c) => !c.startsWith('csrfToken='))
  .join('; ');
console.log('[login] cookie loaded (' + cookieHeader.split('; ').length + ' cookies)');
const bridge = (await api('/api/freellmapi-bridge', { method: 'POST' })).json;
if (!bridge?.token) throw new Error('bridge failed: ' + JSON.stringify(bridge).slice(0, 200));;
console.log('[1] bridge token OK (account ' + (bridge.email ?? bridge.account ?? '?') + ')');
const AUTH = { Authorization: `Bearer ${bridge.token}`, 'Content-Type': 'application/json' };

// ── 2. Sidecar: delete mock provider rows ────────────────────────────────
const keys = (await api('/freellmapi/api/keys', { headers: AUTH })).json;
const allKeys = keys?.keys ?? keys ?? [];
const mockRows = (Array.isArray(allKeys) ? allKeys : []).filter((k) =>
  String(k.baseUrl ?? '').includes('127.0.0.1:11434') || /mock/i.test(String(k.label ?? '')));
for (const row of mockRows) {
  const del = await api(`/freellmapi/api/keys/${row.id}`, { method: 'DELETE', headers: AUTH });
  console.log(`[2] deleted sidecar row ${row.id} (${row.label ?? row.baseUrl}) -> ${del.status}`);
}
if (!mockRows.length) console.log('[2] no mock rows found (already clean)');

// ── 3. Sidecar: add the REAL ollama2.space-z.ai provider ─────────────────
const existing = (Array.isArray(allKeys) ? allKeys : []).some((k) =>
  String(k.baseUrl ?? '').includes('ollama2.space-z.ai'));
if (!existing) {
  const add = await api('/freellmapi/api/keys/custom', {
    method: 'POST', headers: AUTH,
    body: JSON.stringify({
      baseUrl: 'https://ollama2.space-z.ai/v1',
      label: 'Z.AI Gateway (ollama2)',
      models: ZAI_MODELS.map((m) => m.id),
    }),
  });
  console.log('[3] added ollama2.space-z.ai provider -> ' + add.status + ' ' + (add.text ?? '').slice(0, 120));
} else {
  console.log('[3] ollama2.space-z.ai provider already present');
}

// ── 4. Unified key ───────────────────────────────────────────────────────
const uk = (await api('/freellmapi/api/settings/api-key', { headers: AUTH })).json;
const ukey = uk?.apiKey ?? '';
if (!ukey) throw new Error('no unified key: ' + JSON.stringify(uk).slice(0, 200));
console.log('[4] unified key OK (' + ukey.slice(0, 6) + '…, ' + ukey.length + ' chars)');

// ── 5. MedQ DB: medq-router models → real zai models ─────────────────────
await db.userApiKey.updateMany({
  where: { providerId: 'medq-router' },
  data: { modelsConfig: JSON.stringify(ZAI_MODELS), baseUrl: `${B}/v1` },
});
console.log('[5] medq-router row → 8 real zai models, baseUrl /v1');

// ── 6. MedQ DB: repoint dead local-Ollama BYOK row at ollama2 ────────────
const fixed = await db.userApiKey.updateMany({
  where: { baseUrl: { contains: '127.0.0.1:11434' } },
  data: { baseUrl: 'https://ollama2.space-z.ai', label: 'Z.AI Ollama Gateway (direct)' },
});
console.log('[6] repointed ' + fixed.count + ' direct-ollama row(s) at ollama2.space-z.ai');

// ── 7. MedQ DB: admin default model → through the FreeLLM router ─────────
const admin = await db.user.findFirst({ where: { email }, select: { id: true, defaultModel: true } });
await db.user.update({ where: { id: admin.id }, data: { defaultModel: 'medq-router:zai-llm' } });
console.log('[7] admin defaultModel: ' + admin.defaultModel + ' → medq-router:zai-llm');

// ── 8. .env: defaults + deep agent through FreeLLM /v1 ───────────────────
const { readFileSync, writeFileSync } = await import('node:fs');
const ENV = '/home/z/my-project/.env';
let env = readFileSync(ENV, 'utf8');
const setEnv = (key, val) => {
  const re = new RegExp(`^${key}=.*$`, 'm');
  if (re.test(env)) env = env.replace(re, `${key}=${val}`);
  else env += `\n${key}=${val}`;
};
setEnv('DEFAULT_MODEL', 'medq-router:zai-llm');
setEnv('MEDQ_AGENT_BASE_URL', 'http://127.0.0.1:3000/v1');
setEnv('MEDQ_AGENT_API_KEY', ukey);
setEnv('MEDQ_AGENT_MODEL', 'zai-llm');
writeFileSync(ENV, env);
console.log('[8] .env: DEFAULT_MODEL=medq-router:zai-llm, MEDQ_AGENT_* → /v1 router');

// ── 9. Kill the mock Ollama ──────────────────────────────────────────────
await $`pkill -f mock-local-ollama || true`.quiet();
console.log('[9] mock Ollama (:11434) killed');

console.log('\nDONE — every AI plane now routes MedQ → FreeLLM router → ollama2.space-z.ai');
process.exit(0);
