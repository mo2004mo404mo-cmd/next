#!/usr/bin/env node
/**
 * test-count-cap.mjs — verify the /generate count fix end-to-end.
 *
 * Logs in as the demo student, POSTs /api/generate/deep-agent with count=10,
 * polls the job until completion, and asserts the agent saved ≥9 questions
 * (allowing one to fail in case the model hiccups on one stem). FAIL if the
 * job reports fewer than 9 saved, or if the old 5-cap is still in effect.
 */
const BASE = 'http://127.0.0.1:3000';
const EMAIL = 'student@medq.com';
const PASSWORD = 'test123';
const REQUESTED = 10;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  // 1. Login
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`);
  const { csrfToken } = await csrfRes.json();
  const csrfCookie = csrfRes.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ');
  const loginRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', cookie: csrfCookie },
    body: new URLSearchParams({ email: EMAIL, password: PASSWORD, csrfToken, callbackUrl: `${BASE}/home`, json: 'true' }),
    redirect: 'manual',
  });
  const sessionCookie = loginRes.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ');
  console.log('✓ logged in as', EMAIL);

  // 2. Start deep-agent generation with count=10
  const genRes = await fetch(`${BASE}/api/generate/deep-agent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie: sessionCookie },
    body: JSON.stringify({ topic: 'Basic ECG interpretation', count: REQUESTED, types: ['mcq'] }),
  });
  const genBody = await genRes.json();
  if (!genRes.ok || !genBody.jobId) {
    console.error('✗ deep-agent POST failed:', genRes.status, JSON.stringify(genBody).slice(0, 300));
    process.exit(1);
  }
  console.log(`✓ job started (count=${REQUESTED}):`, genBody.jobId);

  // 3. Poll until done (deep-agent at ~75s/Q × 10 ≈ 12 min; allow 25 min)
  const started = Date.now();
  let savedCount = 0;
  while (Date.now() - started < 25 * 60_000) {
    await sleep(8000);
    const jobRes = await fetch(`${BASE}/api/generate/deep-agent?jobId=${genBody.jobId}`, { headers: { cookie: sessionCookie } });
    const job = await jobRes.json();
    const progress = typeof job.progress === 'string' ? job.progress : '';
    const m = progress.match(/(\d+)\s*\/\s*(\d+)/);
    if (m) {
      const cur = parseInt(m[1], 10);
      const total = parseInt(m[2], 10);
      if (cur > savedCount) {
        savedCount = cur;
        console.log(`  progress: ${cur}/${total} saved  (elapsed ${Math.round((Date.now()-started)/1000)}s)`);
      }
    }
    if (job.status === 'completed' || job.status === 'done') {
      const result = Array.isArray(job.result) ? job.result : [];
      console.log(`\n✓ job completed — ${result.length} question(s) saved (requested ${REQUESTED}).`);
      if (result.length >= 9) {
        console.log('✓ PASS — count cap raised; agent honored the request.');
        process.exit(0);
      } else {
        console.error(`✗ FAIL — only ${result.length} saved (expected ≥9). Old 5-cap may still be active.`);
        process.exit(1);
      }
    }
    if (job.status === 'failed' || job.status === 'error') {
      console.error('✗ job failed:', JSON.stringify(job.error).slice(0, 300));
      process.exit(1);
    }
  }
  console.error('✗ timeout after 25 min');
  process.exit(1);
}

main().catch((e) => { console.error('script error:', e); process.exit(1); });
