// E2E test: freellmapi-style BYOK — catalog visibility fix + analytics + telemetry.
// Run: bun scripts/test-byok-e2e.ts
import { $ } from 'bun';

const BASE = 'http://127.0.0.1:3000';
const JAR = 'tmp/byok-e2e-cookies.txt';

async function login(): Promise<boolean> {
  await $`mkdir -p tmp`.quiet();
  await $`rm -f ${JAR}`.quiet();
  const csrf = await $`curl -s -c ${JAR} ${BASE}/api/auth/csrf`.text();
  const csrfToken = JSON.parse(csrf).csrfToken;
  await $`curl -s -b ${JAR} -c ${JAR} -X POST ${BASE}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrfToken} --data-urlencode email=admin@medq.com --data-urlencode password=test123 --data-urlencode callbackUrl=${BASE}/ -o /dev/null`.quiet();
  const sess = await $`curl -s -b ${JAR} ${BASE}/api/auth/session`.text();
  const email = JSON.parse(sess)?.user?.email;
  console.log('logged in as:', email ?? 'FAILED');
  return email === 'admin@medq.com';
}

async function get(path: string): Promise<{ status: number; body: any }> {
  const [meta, body] = await $`curl -s -b ${JAR} -w '\n%{http_code}' ${BASE}${path}`.text().then((t) => {
    const idx = t.lastIndexOf('\n');
    return [Number(t.slice(idx + 1)), t.slice(0, idx)] as const;
  });
  let parsed: any = null;
  try { parsed = JSON.parse(body); } catch { /* non-json */ }
  return { status: meta, body: parsed };
}

async function post(path: string, payload: unknown): Promise<{ status: number; body: any }> {
  const [meta, body] = await $`curl -s -b ${JAR} -X POST -H 'Content-Type: application/json' -d ${JSON.stringify(payload)} -w '\n%{http_code}' ${BASE}${path}`.text().then((t) => {
    const idx = t.lastIndexOf('\n');
    return [Number(t.slice(idx + 1)), t.slice(0, idx)] as const;
  });
  let parsed: any = null;
  try { parsed = JSON.parse(body); } catch { /* non-json */ }
  return { status: meta, body: parsed };
}

async function main() {
  const ok = await login();
  if (!ok) process.exit(1);

  console.log('\n== GET /api/providers (THE visibility fix) ==');
  const cat = await get('/api/providers');
  console.log('status:', cat.status);
  const d = cat.body ?? {};
  console.log('server providers:', (d.server ?? []).map((p: any) => p.id));
  console.log('byok providers:  ', (d.byok ?? []).map((p: any) => p.id));
  console.log('local providers: ', (d.local ?? []).map((p: any) => p.id));
  for (const p of d.byok ?? []) {
    console.log(`  byok[${p.id}] models:`, (p.models ?? []).map((m: any) => m.id).slice(0, 8));
  }
  for (const p of d.local ?? []) {
    console.log(`  local[${p.id}] models:`, (p.models ?? []).map((m: any) => m.id).slice(0, 8));
  }
  console.log('userDefault:', d.userDefault, '| serverDefault:', d.serverDefault);
  console.log('available (add-key list):', (d.available ?? []).map((p: any) => p.id).slice(0, 20).join(', '));

  console.log('\n== GET /api/user/ai-analytics?range=30d ==');
  const an = await get('/api/user/ai-analytics?range=30d');
  console.log('status:', an.status);
  const s = an.body?.summary ?? {};
  console.log('summary:', {
    totalRequests: s.totalRequests,
    errorCount: s.errorCount,
    successRate: s.successRate,
    tokensIn: s.totalInputTokens,
    tokensOut: s.totalOutputTokens,
    avgLatencyMs: s.avgLatencyMs,
  });
  console.log('byProvider:', an.body?.byProvider);
  console.log('recent count:', (an.body?.recent ?? []).length);

  console.log('\n== POST /api/user/api-keys/test (ollama saved endpoint → model discovery) ==');
  const keys = await get('/api/user/api-keys');
  console.log('keys status:', keys.status, '| count:', (keys.body?.keys ?? []).length);
  const ollamaKey = (keys.body?.keys ?? []).find((k: any) => k.providerId === 'ollama');
  if (ollamaKey) {
    const td = await post('/api/user/api-keys/test', { keyId: ollamaKey.id, providerId: 'ollama' });
    console.log('ollama test ok:', td.body?.ok, '| models found:', (td.body?.models ?? []).length);
  } else {
    console.log('no saved ollama key — skipping discovery test');
  }

  console.log('\n== Trigger ONE real callChat with x-model → telemetry row ==');
  // POST /api/questions/explain with ONE question id + x-model header — exactly
  // what the new ExplainQuestionsModal ModelPicker sends. Exercises the whole
  // chain: x-model → resolve-model → callChat → failover → telemetry insert.
  const qs = await get('/api/questions?limit=1');
  const qid = qs.body?.questions?.[0]?.id ?? null;
  if (!qid) {
    console.log('no questions in bank — skipping the live generation test');
  } else {
    console.log('using question id:', qid);
    const startRes = await $`curl -s -b ${JAR} -X POST -H 'Content-Type: application/json' -H 'x-model: ollama:zai-llm' -d ${JSON.stringify({ questionIds: [qid], overwrite: true })} ${BASE}/api/questions/explain`.text();
    const jobId = JSON.parse(startRes)?.jobId;
    console.log('job started:', jobId);
    let done = false;
    for (let i = 0; i < 40 && !done; i++) {
      await new Promise((r) => setTimeout(r, 4000));
      const st = await get(`/api/questions/explain?jobId=${jobId}`);
      const status = st.body?.status;
      if (status === 'done') {
        done = true;
        console.log('job done | written:', st.body?.written, '| failed:', st.body?.failed);
      } else if (status === 'error') {
        done = true;
        console.log('job ERROR:', st.body?.error);
      } else if (i % 5 === 4) {
        console.log(`  … status=${status} progress=${JSON.stringify(st.body?.progress)}`);
      }
    }
    if (!done) console.log('job still running after 160s — continuing (telemetry may lag)');
  }

  console.log('\n== AiCallLog telemetry check ==');
  const { SQL } = await import('bun');
  const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
  const cnt = await sql`SELECT COUNT(*)::int AS n FROM "AiCallLog"`;
  console.log('AiCallLog rows:', cnt[0].n);
  const sample = await sql`SELECT "providerId", "modelId", "stage", "status", "latencyMs" FROM "AiCallLog" ORDER BY "createdAt" DESC LIMIT 5`;
  console.log('recent rows:', sample);
  await sql.end();

  console.log('\n== Analytics now reflects telemetry ==');
  const an2 = await get('/api/user/ai-analytics?range=24h');
  console.log('status:', an2.status, '| totalRequests:', an2.body?.summary?.totalRequests ?? 0);

  console.log('\nALL CHECKS DONE');
}

main().catch((e) => {
  console.error('E2E FAILED:', e);
  process.exit(1);
});
