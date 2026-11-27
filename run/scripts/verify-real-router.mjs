/**
 * E2E: MedQ ⇄ FreeLLM router ⇄ ollama2.space-z.ai (REAL endpoint).
 *
 * Verifies the "everything through the router" rewiring:
 *  1. /api/providers shows medq-router with the 8 real zai models
 *  2. /v1 chat (router wire surface) streams a REAL reply
 *  3. MedQ generation plane (callChat via x-model medq-router:zai-llm)
 *  4. Deep-agent config resolves to the router (/v1 + unified key + zai-llm)
 */
import { $ } from 'bun';

const B = 'http://127.0.0.1:3000';
const JAR = '/tmp/medq-e2e.jar';
const email = 'admin@medq.com';
const password = 'test123';
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
};

// login
await $`rm -f ${JAR}`;
const csrfToken = JSON.parse(await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text()).csrfToken;
await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrfToken} --data-urlencode email=${email} --data-urlencode password=${password} --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();

// 1. provider catalog
const provRaw = await $`curl -s -b ${JAR} ${B}/api/providers --max-time 20`.text();
const prov = JSON.parse(provRaw);
const byok = prov.byok ?? prov.providers?.find((p) => p.id === 'medq-router') ?? [];
const routerEntry = Array.isArray(byok) ? byok.find((p) => (p.id ?? p.providerId) === 'medq-router') : byok;
const routerModels = routerEntry?.models ?? [];
const hasZai = routerModels.some((m) => (m.id ?? m.modelId) === 'zai-llm');
check('catalog: medq-router present with zai-llm', Boolean(routerEntry && hasZai),
  `${routerModels.length} models: ${routerModels.slice(0, 4).map((m) => m.id ?? m.modelId).join(', ')}…`);

// 2. /v1 through the router (REAL endpoint)
const UKEY = (await $`grep ^MEDQ_AGENT_API_KEY= /home/z/my-project/.env`.text()).split('=')[1].trim();
const chatRaw = await $`curl -s --max-time 120 -N ${B}/v1/chat/completions -H ${'Authorization: Bearer ' + UKEY} -H 'Content-Type: application/json' -d '{"model":"zai-llm","messages":[{"role":"user","content":"In one sentence: what is the normal serum potassium range?"}],"max_tokens":80,"stream":true}'`.text();
const firstContent = chatRaw.split('\n').filter((l) => l.startsWith('data:')).map((l) => {
  try { return JSON.parse(l.slice(5)).choices?.[0]?.delta?.content ?? ''; } catch { return ''; }
}).join('');
const isRateLimited = chatRaw.includes('rate_limit') || chatRaw.includes('429');
const isMockText = firstContent.includes('mock reply');
check('router /v1: real streamed reply', firstContent.length > 20 && !isMockText && !isRateLimited,
  isRateLimited ? 'upstream 429 (storm — retry later)'
    : isMockText ? 'MOCK TEXT — mock still wired!'
    : firstContent.slice(0, 90).replace(/\s+/g, ' '));

// 3. MedQ generation plane — clinical reasoning probe with x-model
const genRaw = await $`curl -s -b ${JAR} --max-time 120 -X POST ${B}/api/ai/clinical-reasoning -H 'Content-Type: application/json' -H 'x-model: medq-router:zai-llm' -d '{"vignette":"A 58-year-old man on lisinopril presents with muscle weakness. Examining physician suspects hyperkalemia.","question":"What is the next best step in management?"}'`.text();
let genOk = false, genDetail = genRaw.slice(0, 110).replace(/\s+/g, ' ');
try {
  const j = JSON.parse(genRaw);
  const text = j.analysis ?? j.reasoning ?? j.text ?? j.answer ?? JSON.stringify(j);
  genOk = typeof text === 'string' && text.length > 40 && !/mock reply/i.test(text);
  genDetail = genOk ? text.slice(0, 90).replace(/\s+/g, ' ') : text.slice(0, 110).replace(/\s+/g, ' ');
} catch { /* raw */ }
check('MedQ generation via medq-router:zai-llm', genOk, genDetail);

// 4. deep-agent env resolves to the router
const env = (await $`cat /home/z/my-project/.env`.text());
const envOk = env.includes('MEDQ_AGENT_BASE_URL=http://127.0.0.1:3000/v1') &&
  env.includes('MEDQ_AGENT_MODEL=zai-llm') &&
  env.includes('DEFAULT_MODEL=medq-router:zai-llm');
check('deep agent env → router /v1 + zai-llm', envOk);

console.log(`\n${results.filter((r) => r.ok).length}/${results.length} checks passed`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
