/**
 * E2E: "Link with MedQ generation" — the piece that makes the AI Router a
 * first-class MedQ citizen. Registers the router (OpenAI-compatible /v1 at
 * MedQ's own origin) into the user's MedQ BYOK store, then verifies the
 * router's models appear in MedQ's unified provider catalog (/api/providers)
 * — i.e. every MedQ model picker (question generation, explanations, tutor).
 *
 * Run: bun scripts/verify-medq-link.ts
 */
import { $ } from 'bun';

const B = 'http://127.0.0.1:3000';
const JAR = '/tmp/medq-link-verify.cookies.txt';
const ROUTER_LABEL = 'MedQ AI Router';

async function main() {
  // [1] MedQ login
  await $`rm -f ${JAR}`.quiet();
  const csrf = JSON.parse(await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text()).csrfToken;
  await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrf} --data-urlencode email=admin@medq.com --data-urlencode password=test123 --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
  const me = JSON.parse(await $`curl -s -b ${JAR} ${B}/api/auth/session`.text())?.user?.email;
  console.log(`[1] MedQ login: ${me ?? 'FAILED'}`);

  // [2] Bridge → sidecar token → unified key
  const bridge = JSON.parse(await $`curl -s -b ${JAR} -X POST ${B}/api/freellmapi-bridge`.text());
  if (!bridge.ok) throw new Error('bridge failed');
  const ukey = JSON.parse(
    await $`curl -s ${B}/freellmapi/api/settings/api-key -H ${`Authorization: Bearer ${bridge.token}`}`.text(),
  ).apiKey;
  console.log(`[2] Unified router key: ${ukey.slice(0, 6)}…`);

  // [3] Enable a couple of router models first (medgemma from the mock endpoint)
  const models: any[] = JSON.parse(
    await $`curl -s ${B}/freellmapi/api/models -H ${`Authorization: Bearer ${bridge.token}`}`.text(),
  );
  const target = models.filter((m) => ['medgemma:latest', 'llama3.2:3b', 'qwen2.5:7b'].includes(m.modelId));
  for (const m of target) {
    if (!m.enabled) {
      await $`curl -s -X PATCH ${B}/freellmapi/api/models/${m.id} -H ${`Authorization: Bearer ${bridge.token}`} -H 'Content-Type: application/json' -d '{"enabled":true}' -o /dev/null`.quiet();
    }
  }
  const enabledNames = target.map((m) => m.modelId).join(', ');
  console.log(`[3] Router models enabled: ${enabledNames}`);

  // [4] Link: register router endpoint in MedQ BYOK store (as the Overview card does)
  // Clean up any stale pre-fix row (registered under 'openai') first.
  const existingKeys = JSON.parse(await $`curl -s -b ${JAR} ${B}/api/user/api-keys`.text()).keys;
  for (const k of existingKeys) {
    if (k.label === ROUTER_LABEL && k.providerId !== 'medq-router') {
      await $`curl -s -b ${JAR} -X DELETE ${B}/api/user/api-keys/${k.providerId}?keyId=${k.id} -o /dev/null`.quiet();
      console.log(`   cleaned stale router row (providerId=${k.providerId})`);
    }
  }
  const picked = target.map((m) => ({ id: m.modelId, name: m.displayName }));
  const linkRes = await $`curl -s -b ${JAR} -X POST ${B}/api/user/api-keys -H 'Content-Type: application/json' -d ${JSON.stringify({
    providerId: 'medq-router',
    apiKey: ukey,
    baseUrl: `${B}/v1`,
    label: ROUTER_LABEL,
    modelsConfig: picked,
  })}`.text();
  console.log(`[4] Link result: ${linkRes.slice(0, 160)}`);

  // [5] Verify: MedQ's unified catalog now carries the router models
  const catalog = JSON.parse(await $`curl -s -b ${JAR} ${B}/api/providers`.text());
  const byokEntries = catalog?.byok ?? [];
  const routerEntry = byokEntries.find((e: any) => e.id === 'medq-router');
  const routerModels: string[] = routerEntry?.models?.map((m: any) => m.id) ?? [];
  console.log(`[5] MedQ catalog: byok providers=${byokEntries.length}, router entry=${routerEntry ? `YES (${routerEntry.name})` : 'NO'}, router models=${routerModels.join(', ') || '—'}`);

  // [6] Verify the router endpoint actually answers from MedQ's generation plane
  const chat = await $`curl -s --max-time 60 -N -X POST ${B}/v1/chat/completions -H ${`Authorization: Bearer ${ukey}`} -H 'Content-Type: application/json' -d '{"model":"medgemma:latest","messages":[{"role":"user","content":"Say LINKED in one word."}],"stream":true,"max_tokens":20}'`.text();
  console.log(`[6] Router chat via MedQ origin: ${chat.includes('LINKED') || chat.includes('data:') ? 'STREAM OK' : 'FAIL'} — ${chat.slice(0, 120).replace(/\n/g, '⏎')}`);

  // [7] The real prize: MedQ's OWN generation plane resolving a medq-router model.
  // Single-question explain job with x-model medq-router:medgemma:latest —
  // resolveModel must treat the unknown provider as OpenAI-compatible, pull
  // the BYOK endpoint (unified key + /v1 baseUrl), and the mock Ollama behind
  // the router must answer.
  const qid = JSON.parse(await $`curl -s -b ${JAR} ${B}/api/questions?limit=1`.text())?.questions?.[0]?.id
    ?? JSON.parse(await $`curl -s -b ${JAR} ${B}/api/questions?take=1`.text())?.[0]?.id;
  if (qid) {
    const start = JSON.parse(await $`curl -s -b ${JAR} -X POST ${B}/api/questions/explain -H 'Content-Type: application/json' -H 'x-model: medq-router:medgemma:latest' -d ${JSON.stringify({ questionIds: [qid] })}`.text());
    const jobId = start?.jobId;
    console.log(`[7] Explain job via medq-router model: jobId=${jobId ?? start?.error ?? 'NONE'}`);
    if (jobId) {
      for (let i = 0; i < 30; i++) {
        await $`sleep 4`;
        const st = JSON.parse(await $`curl -s -b ${JAR} ${B}/api/questions/explain?jobId=${jobId}`.text());
        const status = st?.status ?? st?.job?.status;
        if (status === 'done' || status === 'completed' || st?.done) {
          console.log(`    job finished after ~${(i + 1) * 4}s — written=${st?.written ?? st?.job?.written ?? '?'}`);
          break;
        }
        if (status === 'failed' || status === 'error') {
          console.log(`    job FAILED: ${JSON.stringify(st).slice(0, 300)}`);
          break;
        }
        if (i === 29) console.log(`    job still ${status} after 120s`);
      }
    }
  } else {
    console.log('[7] skipped — no question id found');
  }

  const pass = routerEntry && routerModels.length > 0;
  console.log(`\nRESULT: ${pass ? 'MEDQ LINK VERIFIED ✓ — router models are in MedQ model pickers' : 'LINK FAILED ✗'}`);
  if (!pass) process.exit(1);
}

main().catch((e) => { console.error('E2E FAILED:', e.message); process.exit(1); });
