#!/usr/bin/env node
/** inspect-deep-agent-job.mjs — dump the FULL job record for a deep-agent run. */
const BASE = 'http://127.0.0.1:3000';
const EMAIL = 'student@medq.com';
const PASSWORD = 'test123';
const JOB_ID = process.argv[2];

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

  const res = await fetch(`${BASE}/api/generate/deep-agent?jobId=${JOB_ID}`, { headers: { cookie: sessionCookie } });
  const job = await res.json();
  console.log('status:', job.status);
  console.log('keys:', Object.keys(job).join(', '));
  console.log('error:', JSON.stringify(job.error)?.slice(0, 800));
  const p = job.progress;
  console.log('--- progress ---');
  if (typeof p === 'string') console.log(p.slice(0, 3000));
  else console.log(JSON.stringify(p, null, 1)?.slice(0, 3000));
  if (job.partialResult) console.log('partialResult:', JSON.stringify(job.partialResult).slice(0, 500));
  if (job.result) console.log('result:', JSON.stringify(job.result).slice(0, 500));
}

main().catch((e) => { console.error('script error:', e); process.exit(1); });
