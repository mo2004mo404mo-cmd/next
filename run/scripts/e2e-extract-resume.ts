/**
 * e2e-extract-resume.ts — verify the resume-after-restart path.
 *
 * Simulates a job that was "processing" when the server died: creates an
 * ImportExtraction row with status=processing and a heartbeat 15 minutes old
 * (stale beyond RESUME_AFTER_MS), then polls GET /extract?jobId=… like the
 * browser does. The GET must detect the orphan, re-kick runJob, and deliver
 * a completed extraction — proving jobs survive restarts.
 */
import { SQL } from 'bun';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const DB = 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp';

async function main() {
  const sql = new SQL(DB);

  // 1. The GUEST user — resolveUserId() falls back to it for unauthenticated
  //    dev requests (the browser/E2E path this test mimics).
  const users = await sql`select id from "User" where email = 'guest@medq.local'`;
  const userId = users[0].id as string;

  // 2. Insert an orphaned "processing" row — updatedAt forced 15 min into the
  //    past (Prisma @updatedAt would set "now", so we backdate it manually).
  const text = [
    '1. Which vitamin deficiency causes scurvy?',
    'A) Vitamin A',
    'B) Vitamin B12',
    'C) Vitamin C',
    'D) Vitamin D',
    'Answer: C — ascorbic acid deficiency impairs collagen synthesis.',
    '',
    '2. TRUE or FALSE: Insulin lowers blood glucose.',
    'Answer: True',
  ].join('\n');

  const rows = await sql`
    insert into "ImportExtraction" (id, "userId", "fileName", status, text, "maxQuestions",
                                    "progressDone", "progressTotal", "startedAt", "createdAt", "updatedAt")
    values ('resume-test-job-1', ${userId}, 'resume-test.txt', 'processing', ${text}, 50,
            0, 2, now() - interval '16 minutes', now() - interval '16 minutes', now() - interval '15 minutes')
    returning id`;
  if (rows.length !== 1) throw new Error('could not insert orphan row');
  console.log('orphaned processing row inserted (heartbeat 15 min old)');

  // 3. Poll like the browser — the FIRST GET should resume the job.
  const t0 = Date.now();
  for (;;) {
    const poll = await fetch(`${BASE}/api/questions/import/extract?jobId=resume-test-job-1`);
    if (poll.status === 404) throw new Error('job not found');
    const data = (await poll.json()) as {
      status: string;
      error?: string;
      questions?: Array<{ text: string; answer: string }>;
      progress?: { done: number; total: number };
    };
    if (data.status === 'running') {
      console.log(`[${((Date.now() - t0) / 1000).toFixed(0)}s] running ${data.progress?.done ?? '?'}/${data.progress?.total ?? '?'}`);
      if (Date.now() - t0 > 5 * 60_000) throw new Error('TIMEOUT — job was not resumed');
      await new Promise((r) => setTimeout(r, 3000));
      continue;
    }
    if (data.status === 'error') throw new Error(`job error: ${data.error}`);
    console.log(`\nDONE in ${((Date.now() - t0) / 1000).toFixed(0)}s after resume — extracted=${data.questions?.length ?? 0}`);
    console.log('questions:', (data.questions ?? []).map((q) => q.text.slice(0, 60)));
    const answers = (data.questions ?? []).map((q) => q.answer);
    console.log('answers:', answers);
    if ((data.questions?.length ?? 0) !== 2) throw new Error('expected exactly 2 questions after resume');

    // 4. Confirm the row really was resumed (not silently re-created).
    const row = await sql`select status, "progressDone", "progressTotal" from "ImportExtraction" where id = 'resume-test-job-1'`;
    console.log('row after resume:', row[0]);
    break;
  }

  // 5. Cleanup: DELETE endpoint (job is done now — must succeed), then verify gone.
  const del = await fetch(`${BASE}/api/questions/import/extract?jobId=resume-test-job-1`, { method: 'DELETE' });
  console.log('DELETE status:', del.status, await del.json());
  const check = await sql`select count(*)::int as n from "ImportExtraction" where id = 'resume-test-job-1'`;
  if (check[0].n !== 0) throw new Error('row not deleted');
  console.log('row deleted from DB — cleanup verified');

  // 6. Also count rows left from other tests (the parallel E2E job).
  const left = await sql`select id, status, "droppedChunks", "rawCount" from "ImportExtraction"`;
  console.log('remaining rows (expected: the parallel-test job):', left);

  await sql.end();
  console.log('\nRESUME E2E PASSED');
}

main().catch((e) => {
  console.error('RESUME E2E FAILED:', e);
  process.exit(1);
});
