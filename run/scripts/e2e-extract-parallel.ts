/**
 * e2e-extract-parallel.ts — verify the parallel chunked-extraction fix.
 *
 * Generates a large synthetic question document (~7 chunks), POSTs it to
 * /api/questions/import/extract exactly like the browser does, then polls
 * until the job settles. Prints per-part progress with wall-clock timing,
 * the final extracted count, and checks that chunk order was preserved
 * after the parallel merge.
 *
 * Usage: bun scripts/e2e-extract-parallel.ts [questionCount]
 */
const BASE = process.env.BASE_URL || 'http://localhost:3000';

function buildText(n: number): string {
  const systems = [
    'Cardiovascular', 'Respiratory', 'Gastrointestinal', 'Neurology',
    'Endocrine', 'Renal', 'Hematology', 'Infectious Disease',
  ];
  const parts: string[] = [];
  for (let i = 1; i <= n; i++) {
    const sys = systems[i % systems.length];
    const d = String(i).padStart(2, '0');
    parts.push(
      `${i}. A patient (case Q${d}/${n}) with a ${sys.toLowerCase()} history presents with a three-day history of progressive exertional symptom complex ${i}, associated with intermittent discomfort and a notable laboratory finding. On examination there is a characteristic physical sign ${i} and the working differential includes four plausible entities.` + `\n` +
      `A) First diagnostic entity for case Q${d}/${n}` + `\n` +
      `B) Second diagnostic entity for case Q${d}/${n}` + `\n` +
      `C) Third diagnostic entity for case Q${d}/${n}` + `\n` +
      `D) Fourth diagnostic entity for case Q${d}/${n}` + `\n` +
      `Answer: B — the second entity best explains the symptom complex because of the hallmark pathophysiology described.` + `\n` +
      `Explanation: The correct answer is B. The described scenario for case Q${d}/${n} matches the classic presentation within ${sys}. Option A lacks the characteristic examination finding, option C would present acutely rather than over three days, and option D typically spares the laboratory parameter mentioned. Management centers on confirmation followed by targeted therapy.` + `\n`,
    );
  }
  return parts.join('\n');
}

async function main() {
  const N = Number(process.argv[2]) || 66;
  const text = buildText(N);
  const estChunks = Math.ceil(text.length / 6500);
  console.log(`text: ${(text.length / 1024).toFixed(1)} KB → ~${estChunks} chunks, ${N} questions`);

  const res = await fetch(`${BASE}/api/questions/import/extract`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, fileName: 'e2e-parallel-test.txt', maxQuestions: 200 }),
  });
  const start = (await res.json()) as { jobId?: string; error?: string };
  if (!res.ok || !start.jobId) throw new Error(`POST failed: ${res.status} ${JSON.stringify(start)}`);
  console.log('jobId:', start.jobId);

  const t0 = Date.now();
  let lastDone = -1;
  for (;;) {
    await new Promise((r) => setTimeout(r, 3000));
    const poll = await fetch(`${BASE}/api/questions/import/extract?jobId=${start.jobId}`);
    if (poll.status === 404) throw new Error('job lost (worker restarted?)');
    const data = (await poll.json()) as {
      status: string;
      error?: string;
      progress?: { done: number; total: number };
      questions?: Array<{ text: string }>;
      rawCount?: number;
      droppedChunks?: number;
    };
    if (data.status === 'running') {
      if ((data.progress?.done ?? -1) !== lastDone) {
        lastDone = data.progress!.done;
        console.log(`[${((Date.now() - t0) / 1000).toFixed(0)}s] progress ${data.progress!.done}/${data.progress!.total}`);
      }
      if (Date.now() - t0 > 12 * 60_000) throw new Error('TEST TIMEOUT (12 min)');
      continue;
    }
    if (data.status === 'error') throw new Error(`job error: ${data.error}`);

    const qs = data.questions ?? [];
    const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
    console.log(`\nDONE in ${elapsed}s — rawCount=${data.rawCount} extracted=${qs.length} droppedChunks=${data.droppedChunks ?? 0} (of ${N} planted)`);

    // Order check: the Qnn/N markers must be non-decreasing after the parallel
    // merge (equal neighbors = LLM emitted a near-duplicate, not an order bug).
    const nums = qs
      .map((q) => Number((q.text.match(new RegExp(`Q(\\d+)/${N}`)) || [0, 0])[1]))
      .filter((n) => n > 0);
    let inversions = 0;
    for (let i = 0; i < nums.length; i++)
      for (let j = i + 1; j < nums.length; j++) if (nums[j] < nums[i]) inversions++;
    console.log(`order preserved: ${inversions === 0} (inversions=${inversions}, parsed ${nums.length}/${N} markers)`);

    const recall = (qs.length / N) * 100;
    console.log(`recall: ${recall.toFixed(0)}%`);
    if (qs.length < N * 0.7) throw new Error(`recall too low: ${qs.length}/${N}`);
    if ((data.droppedChunks ?? 0) > 0) console.log('WARNING: some chunks dropped');
    console.log('\nE2E PASSED');
    break;
  }
}

main().catch((e) => {
  console.error('E2E FAILED:', e);
  process.exit(1);
});
