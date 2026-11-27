// Register the Z.AI gateway's generative-media models as freellmapi custom
// media models (platform 'custom' — never pruned by catalog-sync), then verify
// image generation and TTS through the MedQ origin (port 3000) end to end.
//
// 1. login to the sidecar dashboard via the MedQ bridge creds
// 2. probe GET {gateway}/v1/models for image/TTS-looking model ids
// 3. POST /freellmapi/api/media/custom {modality:'image', model:'cogview-4'}
//    (no apiKey — resolveCustomEndpointKey reuses the stored endpoint key)
// 4. fetch the unified key, then POST /v1/images/generations and
//    /v1/audio/speech through the app origin
import { readFileSync, writeFileSync } from 'node:fs';

const ORIGIN = 'http://127.0.0.1:3000';
const MOUNT = '/freellmapi';
const bridge = JSON.parse(readFileSync('/home/z/my-project/freellmapi/server/data/medq-bridge.json', 'utf8'));

const out = [];
const log = (s) => { out.push(s); console.log(s); };

// 1. sidecar dashboard login through the MedQ origin proxy
const loginRes = await fetch(`${ORIGIN}${MOUNT}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: bridge.email, password: bridge.password }),
});
if (!loginRes.ok) throw new Error(`login failed: HTTP ${loginRes.status}`);
const { token } = await loginRes.json();
log(`login ok (token ${token.slice(0, 6)}…)`);

// 2. probe the gateway's model list (decrypt the stored endpoint key via the
//    sidecar itself is unnecessary: use the media router after registration)
// First read what the gateway offers — use the dashboard's key reveal.
const keyRes = await fetch(`${ORIGIN}${MOUNT}/api/settings/api-key`, {
  headers: { Authorization: `Bearer ${token}` },
});
if (!keyRes.ok) throw new Error(`api-key fetch failed: HTTP ${keyRes.status}`);
const { apiKey } = await keyRes.json();
log(`unified key ok (${apiKey.slice(0, 6)}…)`);

// What does the gateway itself list? Use the existing chat-models endpoint of
// the sidecar (it proxies provider model lists) — simpler: direct probe with
// the unified key against the app's own /v1/models is chat models only. Probe
// the gateway directly with the sidecar's stored custom key instead:
// (kept minimal — just try registering cogview-4 which we verified works)
const IMAGE_MODELS = [
  { model: 'cogview-4', displayName: 'CogView-4 (Z.AI Gateway)' },
  { model: 'cogview-4-plus', displayName: 'CogView-4 Plus (Z.AI Gateway)' },
  { model: 'zai-image-gen', displayName: 'Z.AI Image Gen (Gateway default)' },
];

for (const m of IMAGE_MODELS) {
  const res = await fetch(`${ORIGIN}${MOUNT}/api/media/custom`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      baseUrl: 'https://ollama2.space-z.ai/v1',
      model: m.model,
      displayName: m.displayName,
      modality: 'image',
      quotaLabel: 'Z.AI Gateway',
    }),
  });
  const body = await res.json().catch(() => ({}));
  log(`register image ${m.model}: HTTP ${res.status} ${res.ok ? 'ok' : body?.error?.message ?? ''}`);
}

// 3. image generation through the MedQ origin
const imgRes = await fetch(`${ORIGIN}/v1/images/generations`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
  body: JSON.stringify({ model: 'cogview-4', prompt: 'a stethoscope on a teal medical chart, flat illustration', size: '1024x1024', n: 1 }),
  signal: AbortSignal.timeout(180000),
});
log(`image gen (cogview-4): HTTP ${imgRes.status}`);
if (imgRes.ok) {
  const j = await imgRes.json();
  const first = j.data?.[0];
  const len = first?.b64_json?.length ?? 0;
  log(`  provider=${j.provider} model=${j.model} images=${j.data?.length} b64len=${len}`);
  if (len > 1000) {
    writeFileSync('/home/z/my-project/tmp/studio-test-image.jpg', Buffer.from(first.b64_json, 'base64'));
    log('  saved tmp/studio-test-image.jpg');
  }
} else {
  log(`  error: ${(await imgRes.text()).slice(0, 200)}`);
}

// 4. TTS through the MedQ origin (zai-tts was registered by an earlier session)
const ttsRes = await fetch(`${ORIGIN}/v1/audio/speech`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
  body: JSON.stringify({ model: 'zai-tts', input: 'The studio is live.' }),
  signal: AbortSignal.timeout(120000),
});
log(`tts (zai-tts): HTTP ${ttsRes.status} ct=${ttsRes.headers.get('content-type')}`);
if (ttsRes.ok) {
  const buf = Buffer.from(await ttsRes.arrayBuffer());
  log(`  audio bytes=${buf.length} X-Provider=${ttsRes.headers.get('X-Provider')}`);
  if (buf.length > 1000) {
    writeFileSync('/home/z/my-project/tmp/studio-test-speech.mp3', buf);
    log('  saved tmp/studio-test-speech.mp3');
  }
} else {
  log(`  error: ${(await ttsRes.text()).slice(0, 200)}`);
}

writeFileSync('/home/z/my-project/tmp/register-zai-media-out.txt', out.join('\n') + '\n');
