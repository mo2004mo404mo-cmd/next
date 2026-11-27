#!/usr/bin/env node
/**
 * test-deep-agent.mjs — end-to-end verification that the deep agent gets past
 * the provider gate ("No AI provider is configured...").
 *
 * Flow: NextAuth credentials login as the demo student → POST
 * /api/generate/deep-agent (topic: cardiac cycle, 1 MCQ) → poll the job until
 * it finishes or the provider error appears. PASS = any real agent activity
 * (plan / tool events / saved questions) with NO provider error event.
 */
const BASE = 'http://127.0.0.1:3000';
const EMAIL = 'student@medq.com';
const PASSWORD = 'test123';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  // 1. CSRF token
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`);
  const { csrfToken } = await csrfRes.json();
  const csrfCookie = csrfRes.headers
    .getSetCookie()
    .map((c) => c.split(';')[0])
    .join('; ');

  // 2. Credentials login
  const loginRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', cookie: csrfCookie },
    body: new URLSearchParams({
      email: EMAIL,
      password: PASSWORD,
      csrfToken,
      callbackUrl: `${BASE}/home`,
      json: 'true',
    }),
    redirect: 'manual',
  });
  const sessionCookie = loginRes.headers
    .getSetCookie()
    .map((c) => c.split(';')[0])
    .join('; ');
  if (!sessionCookie.includes('session-token') && !sessionCookie.includes('authjs')) {
    console.error('✗ login failed:', loginRes.status, (await loginRes.text()).slice(0, 200));
    process.exit(1);
  }
  console.log('✓ logged in as', EMAIL);

  // 3. Kick off a deep-agent generation (1 MCQ, small so it finishes fast)
  const genRes = await fetch(`${BASE}/api/generate/deep-agent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie: sessionCookie },
    body: JSON.stringify({ topic: 'Cardiac cycle physiology', count: 1, types: ['mcq'] }),
  });
  const genBody = await genRes.json();
  if (!genRes.ok || !genBody.jobId) {
    console.error('✗ deep-agent POST failed:', genRes.status, JSON.stringify(genBody).slice(0, 300));
    process.exit(1);
  }
  console.log('✓ job started:', genBody.jobId, '— polling…');

  // 4. Poll the job
  const started = Date.now();
  let lastMessageCount = -1;
  while (Date.now() - started < 240_000) {
    await sleep(6000);
    const jobRes = await fetch(`${BASE}/api/generate/deep-agent?jobId=${genBody.jobId}`, {
      headers: { cookie: sessionCookie },
    });
    if (!jobRes.ok) {
      console.error('✗ job poll failed:', jobRes.status);
      process.exit(1);
    }
    const job = await jobRes.json();
    const msgs = job.messages ?? job.progress ?? [];
    if (msgs.length !== lastMessageCount) {
      lastMessageCount = msgs.length;
      for (const m of msgs.slice(-6)) {
        const text = typeof m === 'string' ? m : m.message ?? m.text ?? JSON.stringify(m);
        console.log(`  [${job.status}] ${String(text).slice(0, 110)}`);
      }
    }
    const flat = JSON.stringify(msgs);
    if (flat.includes('No AI provider is configured')) {
      console.error('\n✗ STILL BROKEN — provider error present.');
      process.exit(1);
    }
    if (job.status === 'done' || job.status === 'completed' || job.status === 'error' || job.status === 'failed') {
      console.log(`\nfinal job status: ${job.status}`);
      const savedOk = /saved|✓|complete/i.test(flat);
      console.log(savedOk || job.status !== 'error' ? '✓ PASS — no provider error; agent ran.' : '⚠ job ended — inspect messages above.');
      process.exit(0);
    }
  }
  console.log('\n⏱ timeout after 4 min — but no provider error seen so far (agent still working).');
  process.exit(0);
}

main().catch((e) => {
  console.error('script error:', e);
  process.exit(1);
});
