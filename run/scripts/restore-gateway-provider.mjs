// Re-register the ollama2.space-z.ai gateway provider + media models after
// an ENCRYPTION_KEY rotation (old encrypted rows are undecryptable).
// 1. sidecar dashboard login via bridge creds (through the MedQ origin)
// 2. delete stale custom providers whose key fails to decrypt
// 3. re-add the Z.AI Gateway provider with models + key
// 4. register custom media models (image: cogview-4 family, tts: zai-tts)
// 5. fetch the unified key and smoke-test /v1/models + /v1/audio/speech
import { readFileSync } from 'node:fs';

const ORIGIN = 'http://127.0.0.1:3000';
const MOUNT = '/freellmapi';
const GATEWAY = 'https://ollama2.space-z.ai/v1';
const GATEWAY_KEY = 'Z.ai';
const bridge = JSON.parse(readFileSync('/home/z/my-project/freellmapi/server/data/medq-bridge.json', 'utf8'));

const loginRes = await fetch(`${ORIGIN}${MOUNT}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: bridge.email, password: bridge.password }),
});
if (!loginRes.ok) throw new Error(`login failed: HTTP ${loginRes.status}`);
const { token } = await loginRes.json();
const AUTH = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
console.log('login ok');

// 1. delete stale custom providers (masked shows '[decrypt failed]')
const keysRes = await fetch(`${ORIGIN}${MOUNT}/api/keys`, { headers: { Authorization: `Bearer ${token}` } });
const keysJson = await keysRes.json();
const providers = keysJson.providers ?? [];
for (const p of providers) {
  const masked = String(p.masked ?? p.maskedKey ?? '');
  if (p.platform === 'custom' && masked.includes('decrypt failed')) {
    const del = await fetch(`${ORIGIN}${MOUNT}/api/keys/${p.id}`, { method: 'DELETE', headers: AUTH });
    console.log(`deleted stale provider #${p.id} (${p.label}): ${del.status}`);
  }
}

// 2. re-add the gateway provider
const add = await fetch(`${ORIGIN}${MOUNT}/api/keys/custom`, {
  method: 'POST', headers: AUTH,
  body: JSON.stringify({
    baseUrl: GATEWAY,
    label: 'Z.AI Gateway (ollama2)',
    apiKey: GATEWAY_KEY,
    models: [
      'zai-llm', 'zai-vision', 'zai-web-search', 'zai-web-reader',
      'zai-image-gen', 'zai-image-edit', 'zai-tts', 'zai-asr',
    ],
  }),
});
console.log(`re-added provider: ${add.status} ${(await add.text()).slice(0, 120)}`);

// 3. register custom media models (platform 'custom' rows survive catalog-sync)
for (const m of [
  { modality: 'image', model: 'cogview-4', displayName: 'CogView-4 (Z.AI Gateway)' },
  { modality: 'image', model: 'cogview-4-plus', displayName: 'CogView-4 Plus (Z.AI Gateway)' },
  { modality: 'image', model: 'zai-image-gen', displayName: 'Z.AI Image Gen (Gateway default)' },
  { modality: 'audio', model: 'zai-tts', displayName: 'ZAI TTS (Gateway)' },
]) {
  const res = await fetch(`${ORIGIN}${MOUNT}/api/media/custom`, {
    method: 'POST', headers: AUTH,
    body: JSON.stringify({ baseUrl: GATEWAY, model: m.model, displayName: m.displayName, modality: m.modality, quotaLabel: 'Z.AI Gateway' }),
  });
  const body = await res.json().catch(() => ({}));
  console.log(`register ${m.modality} ${m.model}: ${res.status} ${res.ok ? 'ok' : body?.error?.message ?? ''}`);
}

// 4. unified key + smoke tests
const uk = await (await fetch(`${ORIGIN}${MOUNT}/api/settings/api-key`, { headers: { Authorization: `Bearer ${token}` } })).json();
const ukey = uk?.apiKey ?? '';
console.log(`unified key: ${ukey ? 'ok (' + ukey.slice(0, 6) + '…)' : 'MISSING'}`);

const modelsRes = await fetch(`${ORIGIN}/v1/models`, { headers: { Authorization: `Bearer ${ukey}` } });
const modelsJson = modelsRes.ok ? await modelsRes.json() : null;
console.log(`/v1/models: ${modelsRes.status} (${modelsJson?.data?.length ?? 0} models)`);

const tts = await fetch(`${ORIGIN}/v1/audio/speech`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ukey}` },
  body: JSON.stringify({ model: 'zai-tts', input: 'Router restored.', voice: 'tongtong' }),
  signal: AbortSignal.timeout(60000),
});
const ttsBuf = await tts.arrayBuffer();
console.log(`/v1/audio/speech: ${tts.status} (${ttsBuf.byteLength} bytes${ttsBuf.byteLength > 44 ? ', audio ok' : ''})`);
