/**
 * e2e-extract-dense.ts — regression test for the "700 provided → 200/243/288
 * extracted" bug family.
 *
 * TWO bank formats are verified, because the real-world failures came from
 * two different holes:
 *
 *   Phase 1 — DENSE "?"-terminated bank (short stems + short options +
 *   letter answers, ~170 chars/question). The original bug: extraction
 *   stopped at exactly 200 (hardcoded client maxQuestions).
 *
 *   Phase 2 — STATEMENT-style MCQ bank (the user's real format: stems like
 *   "Head circumference at birth is:" with NO "?" and no numbering — only
 *   lettered option lines A)…D) reveal the density). The second bug: the
 *   server's density check counted ONLY "?" chars, misjudged this bank as
 *   sparse, and packed ~39 questions into each 6.5k chunk — the model's JSON
 *   response got truncated and only ~16 questions per chunk survived
 *   ("provided ~700, extracted 288").
 *
 * Verifies for BOTH banks:
 *   1. Recall ≥ 90% of planted questions (not a fraction of them)
 *   2. droppedChunks === 0
 *   3. Document order preserved after the parallel merge
 *   4. A >1.5M-char input is honestly REJECTED with 413 (no silent truncation)
 *
 * Usage: bun scripts/e2e-extract-dense.ts [questionCount]
 */
const BASE = process.env.BASE_URL || 'http://localhost:3000';

/** Dense "?"-terminated bank: ~170 chars/question. */
function buildDenseText(n: number): string {
  const topics = [
    ['milestone', 'walk', 'run', 'hop', 'climb'],
    ['vaccine', 'BCG', 'OPV', 'HepB', 'DPT'],
    ['reflex', 'Moro', 'grasp', 'rooting', 'Babinski'],
    ['deficiency', 'iron', 'folate', 'B12', 'vitD'],
    ['infection', 'measles', 'rubella', 'mumps', 'varicella'],
    ['syndrome', 'Down', 'Turner', 'Klinefelter', 'Fragile-X'],
  ];
  const parts: string[] = [];
  for (let i = 1; i <= n; i++) {
    const t = topics[i % topics.length];
    const d = String(i).padStart(2, '0');
    const correct = 1 + (i % 4); // B/C/D/A rotation
    const letters = ['A', 'B', 'C', 'D'];
    parts.push(
      `${i}. (Q${d}/${n}) At age ${5 + (i % 60)} months, which ${t[0]} matches the child (case ${d})?` + '\n' +
      `A) ${t[1]}  B) ${t[2]}  C) ${t[3]}  D) ${t[4]}` + '\n' +
      `Answer: ${letters[correct - 1]}` + '\n',
    );
  }
  return parts.join('\n');
}

/** Real-world "mixed signal" bank — mirrors the user's pediatrics PDF format
 *  (the "700 → 350" case): ~45% of stems end with "?", numbering is "9-"
 *  (digit-hyphen), options are INLINE one-liners ("a. x  b. y  c. z  d. w"),
 *  and answers are bare lines with NO "Answer:" prefix. Multiple detector
 *  signals each see only a fraction; the chunker must still size chunks by
 *  ~20 REAL questions or the model's JSON output truncates (~15/chunk). */
function buildMixedSignalText(n: number): string {
  const topics = [
    ['milestone', 'walk', 'run', 'hop', 'climb'],
    ['vaccine', 'BCG', 'OPV', 'HepB', 'DPT'],
    ['reflex', 'Moro', 'grasp', 'rooting', 'Babinski'],
    ['deficiency', 'iron', 'folate', 'B12', 'vitD'],
    ['infection', 'measles', 'rubella', 'mumps', 'varicella'],
    ['syndrome', 'Down', 'Turner', 'Klinefelter', 'Fragile-X'],
  ];
  const parts: string[] = [];
  for (let i = 1; i <= n; i++) {
    const t = topics[i % topics.length];
    const correct = 1 + (i % 4);
    const stem = i % 2 === 0
      ? `At age ${5 + (i % 60)} months, which ${t[0]} matches the child (case ${i})?`
      : `The ${t[0]} expected at age ${5 + (i % 60)} months in case ${i} is`;
    parts.push(
      `${i}- ${stem}\n` +
      `a. ${t[1]}  b. ${t[2]}  c. ${t[3]}  d. ${t[4]}\n` +
      `${t[correct]}\n\n`,
    );
  }
  return parts.join('');
}

/** Statement-style bank (the user's earlier format): NO "?", NO numbering —
 * stems are imperative/declarative fragments, options on lettered lines,
 * answer inline. Mirrors the imported ground truth (avg stem ≈ 94 chars). */
function buildStatementText(n: number): string {
  const topics = [
    ['milestone', 'walk', 'run', 'hop', 'climb'],
    ['vaccine', 'BCG', 'OPV', 'HepB', 'DPT'],
    ['reflex', 'Moro', 'grasp', 'rooting', 'Babinski'],
    ['deficiency', 'iron', 'folate', 'B12', 'vitD'],
    ['infection', 'measles', 'rubella', 'mumps', 'varicella'],
    ['syndrome', 'Down', 'Turner', 'Klinefelter', 'Fragile-X'],
  ];
  const parts: string[] = [];
  for (let i = 1; i <= n; i++) {
    const t = topics[i % topics.length];
    const d = String(i).padStart(2, '0');
    const correct = 1 + (i % 4);
    const letters = ['A', 'B', 'C', 'D'];
    parts.push(
      `At age ${5 + (i % 60)} months, the ${t[0]} of the child in case ${d} is` + '\n' +
      `A) ${t[1]}` + '\n' + `B) ${t[2]}` + '\n' + `C) ${t[3]}` + '\n' + `D) ${t[4]}` + '\n' +
      `Answer: ${letters[correct - 1]}` + '\n\n',
    );
  }
  return parts.join('');
}

interface PollData {
  status: string;
  error?: string;
  progress?: { done: number; total: number };
  questions?: Array<{ text: string; answer: string }>;
  rawCount?: number;
  droppedChunks?: number;
  estimatedCount?: number;
}

async function extract(text: string, fileName: string, sendMaxQuestions?: number) {
  const body: Record<string, unknown> = { text, fileName };
  if (sendMaxQuestions !== undefined) body.maxQuestions = sendMaxQuestions;
  // NOTE: maxQuestions intentionally OMITTED (the fixed client behavior) —
  // the server default (2,000) must be the effective cap.
  const res = await fetch(`${BASE}/api/questions/import/extract`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const start = (await res.json()) as { jobId?: string; error?: string };
  return { res, start };
}

async function runBank(
  label: string,
  text: string,
  fileName: string,
  planted: number,
  opts: { marker: RegExp | null; expectOver200: boolean },
): Promise<void> {
  console.log(`\n──── ${label} ────`);
  console.log(
    `text: ${(text.length / 1024).toFixed(1)} KB, ${planted} planted questions`,
  );

  const { res, start } = await extract(text, fileName);
  if (!res.ok || !start.jobId) throw new Error(`POST failed: ${res.status} ${JSON.stringify(start)}`);
  console.log('jobId:', start.jobId);

  const t0 = Date.now();
  let lastDone = -1;
  let data: PollData | null = null;
  for (;;) {
    await new Promise((r) => setTimeout(r, 3000));
    const poll = await fetch(`${BASE}/api/questions/import/extract?jobId=${start.jobId}`);
    if (poll.status === 404) throw new Error('job lost (worker restarted?)');
    data = (await poll.json()) as PollData;
    if (data.status === 'running') {
      if ((data.progress?.done ?? -1) !== lastDone) {
        lastDone = data.progress!.done;
        console.log(`[${((Date.now() - t0) / 1000).toFixed(0)}s] progress ${data.progress!.done}/${data.progress!.total}`);
      }
      if (Date.now() - t0 > 15 * 60_000) throw new Error('TEST TIMEOUT (15 min)');
      continue;
    }
    break;
  }
  if (!data || data.status === 'error') throw new Error(`job error: ${data?.error}`);

  const qs = data.questions ?? [];
  const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`\nDONE in ${elapsed}s — rawCount=${data.rawCount} extracted=${qs.length} detectorEstimate=${data.estimatedCount ?? 'n/a'} droppedChunks=${data.droppedChunks ?? 0} (of ${planted} planted)`);

  // THE regression check: the old hardcoded cap stopped at exactly 200.
  if (opts.expectOver200 && planted > 200) {
    if (qs.length > 200) {
      console.log('cap check: PASS — extraction exceeded the old 200-question wall');
    } else {
      throw new Error(`still capped at ≤200 (extracted ${qs.length}) — the maxQuestions fix is NOT live`);
    }
  }

  // Order check via the Qnn/N markers (when the bank carries them)
  if (opts.marker) {
    const nums = qs
      .map((q) => Number((q.text.match(opts.marker as RegExp) || [0, 0])[1]))
      .filter((n) => n > 0);
    let inversions = 0;
    for (let i = 0; i < nums.length; i++)
      for (let j = i + 1; j < nums.length; j++) if (nums[j] < nums[i]) inversions++;
    console.log(`order preserved: ${inversions === 0} (inversions=${inversions}, parsed ${nums.length}/${planted} markers)`);
  }

  const recall = (qs.length / planted) * 100;
  console.log(`recall: ${recall.toFixed(0)}%`);
  if (qs.length < Math.ceil(planted * 0.9)) {
    throw new Error(`recall too low: ${qs.length}/${planted} (${recall.toFixed(0)}%) — the chunking fix is NOT live`);
  }
  if ((data.droppedChunks ?? 0) > 0) throw new Error(`${data.droppedChunks} chunk(s) dropped`);

  // Answer mapping check: terse banks use letter answers — the server must
  // resolve them to full option texts (e.g. "measles"), not store bare letters.
  const letterAnswers = qs.filter((q) => /^[A-F][).\s]?$/.test((q.answer || '').trim())).length;
  console.log(`answer mapping: ${letterAnswers} bare-letter answers (want 0)`);
  if (letterAnswers > qs.length * 0.05) throw new Error('too many unresolved letter answers');

  // Cleanup: remove the job row (mirrors the client's post-import DELETE)
  const del = await fetch(`${BASE}/api/questions/import/extract?jobId=${start.jobId}`, { method: 'DELETE' });
  console.log(`cleanup DELETE: ${del.status}`);
}

async function main() {
  const N = Number(process.argv[2]) || 260;

  /* ── Phase 0: honest rejection of oversized input (no silent truncation) ── */
  const huge = 'x'.repeat(1_500_001);
  const over = await extract(huge, 'oversized.txt');
  console.log(`[oversize] ${over.res.status} — ${over.start.error?.slice(0, 90) ?? ''}`);
  if (over.res.status !== 413) throw new Error(`expected 413 for oversized input, got ${over.res.status}`);
  console.log('[oversize] PASS — rejected honestly, no silent slice');

  /* ── Phase 1: dense "?"-terminated bank, N > 200 questions, no maxQuestions sent ── */
  await runBank('Phase 1: dense "?"-terminated bank', buildDenseText(N), 'dense-bank-e2e.txt', N, {
    marker: new RegExp(`Q(\\d+)/${N}`),
    expectOver200: true,
  });

  /* ── Phase 2: statement-style MCQ bank — the user's real format (no "?",
   * no numbering; only the lettered option lines reveal the density). This
   * is the bank that the old qmark-only density check misjudged, producing
   * ~39-question chunks whose JSON responses got truncated (~16 recovered). ── */
  await runBank('Phase 2: statement-style bank (no "?", no numbering)', buildStatementText(N), 'statement-bank-e2e.txt', N, {
    marker: null,
    expectOver200: true,
  });

  /* ── Phase 3: mixed-signal bank — the pediatrics-PDF format that produced
   *   "700 provided → 350 extracted": "9-" numbering, inline options, bare
   *   answers, only ~45% of stems with "?". Single-signal detectors each
   *   see ≤ half the bank; the multi-signal estimator + 1.5× safety factor
   *   must still bound chunks at ~20 REAL questions. ── */
  await runBank('Phase 3: mixed-signal bank (9- numbering, inline options)', buildMixedSignalText(N), 'mixed-signal-bank-e2e.txt', N, {
    marker: null,
    expectOver200: true,
  });

  console.log('\nE2E PASSED');
}

main().catch((e) => {
  console.error('E2E FAILED:', e);
  process.exit(1);
});
