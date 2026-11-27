#!/usr/bin/env node
/**
 * test-server-extract.mjs — verify the new server-side file extraction.
 *
 * Logs in as the demo student, uploads a test .txt file via
 * multipart/form-data to /api/questions/import/extract, and polls the job
 * until done. This proves the server-side parsing path works end-to-end
 * (no client-side FileReader/pdfjs involved).
 */
const BASE = 'http://127.0.0.1:3000';
const EMAIL = 'student@medq.com';
const PASSWORD = 'test123';

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

  // 2. Create a test .txt file with a question
  const testContent = `What is the normal resting heart rate for a healthy adult?
A) 40-60 bpm
B) 60-100 bpm
C) 100-120 bpm
D) 120-140 bpm
Answer: B) 60-100 bpm

Which valve separates the left atrium from the left ventricle?
A) Tricuspid valve
B) Pulmonary valve
C) Mitral valve
D) Aortic valve
Answer: C) Mitral valve`;

  const blob = new Blob([testContent], { type: 'text/plain' });
  const formData = new FormData();
  formData.append('file', blob, 'test-questions.txt');

  // 3. Upload via multipart/form-data (server-side extraction path)
  const genRes = await fetch(`${BASE}/api/questions/import/extract`, {
    method: 'POST',
    headers: { cookie: sessionCookie },
    body: formData,
  });
  const genBody = await genRes.json();
  if (!genRes.ok || !genBody.jobId) {
    console.error('✗ upload failed:', genRes.status, JSON.stringify(genBody).slice(0, 300));
    process.exit(1);
  }
  console.log('✓ file uploaded, job started:', genBody.jobId);

  // 4. Poll until done
  const started = Date.now();
  while (Date.now() - started < 120_000) {
    await sleep(5000);
    const jobRes = await fetch(`${BASE}/api/questions/import/extract?jobId=${genBody.jobId}`, { headers: { cookie: sessionCookie } });
    const job = await jobRes.json();
    if (job.status === 'done') {
      const questions = Array.isArray(job.questions) ? job.questions : [];
      console.log(`\n✓ extraction completed — ${questions.length} question(s) found.`);
      if (questions.length >= 1) {
        console.log('✓ PASS — server-side file extraction works end-to-end.');
        process.exit(0);
      } else {
        console.error('✗ FAIL — no questions extracted.');
        process.exit(1);
      }
    }
    if (job.status === 'error' || job.status === 'failed') {
      console.error('✗ job failed:', JSON.stringify(job.error).slice(0, 200));
      process.exit(1);
    }
  }
  console.error('✗ timeout');
  process.exit(1);
}

main().catch((e) => { console.error('script error:', e); process.exit(1); });
