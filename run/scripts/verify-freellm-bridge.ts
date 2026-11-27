/**
 * E2E verification of the NATIVE MedQ AI Router tab architecture:
 *
 *   MedQ login (cookie) → POST /api/freellmapi-bridge (auto-claims the fresh
 *   sidecar + mints a dashboard token) → native tab data plane through the
 *   /freellmapi proxy → BYOK provider add + model discovery + registration
 *   ("models I add must be visible") → streaming chat → analytics.
 *
 * Run: bun scripts/verify-freellm-bridge.ts
 */
import { $ } from 'bun';

const B = 'http://127.0.0.1:3000';
const JAR = '/tmp/medq-bridge-verify.cookies.txt';

const email = 'admin@medq.com';
const password = 'test123';

async function loginMedQ(): Promise<boolean> {
  await $`rm -f ${JAR}`.quiet();
  const csrfHtml = await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text();
  const csrfToken = JSON.parse(csrfHtml).csrfToken;
  await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrfToken} --data-urlencode email=${email} --data-urlencode password=${password} --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
  const sess = await $`curl -s -b ${JAR} ${B}/api/auth/session`.text();
  const me = JSON.parse(sess)?.user?.email;
  console.log(`[1] MedQ login: ${me ?? 'FAILED'}`);
  return me === email;
}

async function main() {
  if (!(await loginMedQ())) throw new Error('MedQ login failed');

  // [2] Bridge: MedQ session → sidecar dashboard token (auto-setup on fresh DB)
  const bridgeRaw = await $`curl -s -b ${JAR} -X POST ${B}/api/freellmapi-bridge`.text();
  const bridge = JSON.parse(bridgeRaw);
  if (!bridge.ok) throw new Error(`bridge failed: ${bridgeRaw}`);
  console.log(`[2] Bridge: ok, sidecar account ${bridge.email}, token ${bridge.token.length} chars`);
  const AUTH = `-H 'Authorization: Bearer ${bridge.token}'`;

  // [3] Catalog through the proxy with the bridged token
  let models: any[] = [];
  for (let i = 0; i < 5 && models.length === 0; i++) {
    const raw = await $`curl -s --max-time 25 ${B}/freellmapi/api/models -H ${`Authorization: Bearer ${bridge.token}`}`.text();
    try { models = JSON.parse(raw); } catch { models = []; }
    if (models.length === 0) {
      console.log(`   catalog empty (attempt ${i + 1}) — waiting for upstream sync…`);
      await $`sleep 8`;
    }
  }
  console.log(`[3] Catalog models: ${models.length}${models.length ? ` (e.g. ${models.slice(0, 3).map((m: any) => m.displayName).join(', ')})` : ' ⚠ NONE'}`);

  // [4] Add the custom BYOK provider (local mock Ollama, OpenAI-compatible)
  const addRaw = await $`curl -s --max-time 30 -X POST ${B}/freellmapi/api/keys/custom -H ${`Authorization: Bearer ${bridge.token}`} -H 'Content-Type: application/json' -d '{"baseUrl":"http://127.0.0.1:11434/v1","label":"Local Ollama (mock)","models":["medgemma:latest","llama3.2:3b","qwen2.5:7b"]}'`.text();
  console.log(`[4] Add custom provider: ${addRaw.slice(0, 140)}`);

  // [5] Models list must now include the added ones (the original complaint)
  const modelsRaw2 = await $`curl -s --max-time 25 ${B}/freellmapi/api/models -H ${`Authorization: Bearer ${bridge.token}`}`.text();
  const models2 = JSON.parse(modelsRaw2);
  const custom = models2.filter((m: any) => m.platform === 'custom');
  console.log(`[5] Models after add: total=${models2.length}, custom=${custom.length} (${custom.map((m: any) => m.modelId).join(', ')})`);
  if (custom.length === 0) throw new Error('added models NOT visible — regression!');

  // [6] Analytics (dashboard summary shape)
  const sumRaw = await $`curl -s --max-time 25 ${B}/freellmapi/api/analytics/summary -H ${`Authorization: Bearer ${bridge.token}`}`.text();
  let sum: any = null;
  try { sum = JSON.parse(sumRaw); } catch {}
  console.log(`[6] Analytics summary: ${sum ? `totalRequests=${sum.totalRequests ?? sum.summary?.totalRequests ?? '?'} successRate=${sum.successRate ?? sum.summary?.successRate ?? '?'}` : sumRaw.slice(0, 120)}`);

  // [7] Unified key + streaming chat through /v1 (OpenAI wire surface)
  const ukeyRaw = await $`curl -s --max-time 15 ${B}/freellmapi/api/settings/api-key -H ${`Authorization: Bearer ${bridge.token}`}`.text();
  const ukey = JSON.parse(ukeyRaw).apiKey ?? '';
  console.log(`[7] Unified key: ${ukey.slice(0, 6)}… (${ukey.length} chars)`);
  const chat = await $`curl -s --max-time 60 -N -X POST ${B}/v1/chat/completions -H ${`Authorization: Bearer ${ukey}`} -H 'Content-Type: application/json' -d '{"model":"medgemma:latest","messages":[{"role":"user","content":"Say READY in one word."}],"stream":true,"max_tokens":20}'`.text();
  const streamed = chat.includes('data:') && (chat.includes('[DONE]') || chat.includes('DONE'));
  console.log(`[8] Streaming chat via /v1: ${streamed ? 'SSE OK' : 'FAIL'} — first 160 chars: ${chat.slice(0, 160).replace(/\n/g, '⏎')}`);

  console.log('\nRESULT: ' + (custom.length > 0 && ukey ? 'ALL CORE CHECKS PASS ✓' : 'CHECK FAILURES ✗'));
}

main().catch((e) => { console.error('E2E FAILED:', e.message); process.exit(1); });
