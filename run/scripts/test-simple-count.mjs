#!/usr/bin/env node
/**
 * test-simple-count.mjs — verify the old 5-cap is gone using the simpler
 * /api/generate endpoint (one LLM call per question, resilient to stream
 * interruption). Requests count=6 — above the OLD 5-cap, so success proves
 * the fix landed.
 */
const BASE = 'http://127.0.0.1:3000';
const EMAIL = 'student@medq.com';
const PASSWORD = 'test123';
const REQUESTED = 6;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
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

  const genRes = await fetch(`${BASE}/api/generate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie: sessionCookie },
    body: JSON.stringify({ topic: 'Renal physiology basics', count: REQUESTED, types: ['mcq'], system: 'Renal' }),
  });
  const genBody = await genRes.json();
  if (!genRes.ok || !genBody.jobId) {
    console.error('✗ POST failed:', genRes.status, JSON.stringify(genBody).slice(0, 300));
    process.exit(1);
  }
  console.log(`✓ job started (count=${REQUESTED}):`, genBody.jobId);

  const started = Date.now();
  let lastProgress = '';
  while (Date.now() - started < 8 * 60_000) {
    await sleep(5000);
    const jobRes = await fetch(`${BASE}/api/generate?jobId=${genBody.jobId}`, { headers: { cookie: sessionCookie } });
    const job = await jobRes.json();
    const progress = typeof job.progress === 'string' ? job.progress : '';
    if (progress !== lastProgress) {
      lastProgress = progress;
      console.log(`  [${job.status}] ${progress.slice(0, 100)}`);
    }
    if (job.status === 'done' || job.status === 'completed') {
      const result = Array.isArray(job.result) ? job.result : [];
      console.log(`\n✓ completed — ${result.length} question(s) saved (requested ${REQUESTED}).`);
      if (result.length >= 5) {
        console.log(`✓ PASS — old 5-cap is gone; endpoint honored count=${REQUESTED}.`);
        process.exit(0);
      } else {
        console.error(`✗ FAIL — only ${result.length} saved. Old cap may still be active.`);
        process.exit(1);
      }
    }
    if (job.status === 'failed' || job.status === 'error') {
      console.error('✗ job failed:', JSON.stringify(job.error).slice(0, 200));
      process.exit(1);
    }
  }
  console.error('✗ timeout');
  process.exit(1);
}

main().catch((e) => { console.error('script error:', e); process.exit(1); });
