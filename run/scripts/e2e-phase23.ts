/**
 * e2e-phase23.ts — run ONLY phases 2 & 3 of the dense-bank E2E (phase 1
 * already verified via e2e-attach). POSTs the bank, prints the jobId, then
 * polls to completion and asserts recall ≥ 90%.
 *
 * Usage: bun scripts/e2e-phase23.ts [N]
 */
const BASE = process.env.BASE_URL || 'http://localhost:3000';
const N = Number(process.argv[2]) || 260;

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

interface PollData {
  status: string;
  error?: string;
  progress?: { done: number; total: number };
  questions?: Array<{ text: string; answer: string }>;
  rawCount?: number;
  droppedChunks?: number;
  estimatedCount?: number;
}

async function runPhase(label: string, text: string, fileName: string, planted: number) {
  console.log(`\n──── ${label} ────`);
  console.log(`text: ${(text.length / 1024).toFixed(1)} KB, ${planted} planted`);

  const res = await fetch(`${BASE}/api/questions/import/extract`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, fileName }),
  });
  const start = (await res.json()) as { jobId?: string; error?: string };
  if (!res.ok || !start.jobId) throw new Error(`POST failed: ${res.status} ${JSON.stringify(start)}`);
  console.log('jobId:', start.jobId);

  const t0 = Date.now();
  let lastDone = -1;
  let data: PollData | null = null;
  for (;;) {
    await new Promise((r) => setTimeout(r, 3000));
    const poll = await fetch(`${BASE}/api/questions/import/extract?jobId=${start.jobId}`);
    if (poll.status === 404) throw new Error('job lost');
    data = (await poll.json()) as PollData;
    if (data.status === 'running') {
      if ((data.progress?.done ?? -1) !== lastDone) {
        lastDone = data.progress!.done;
        console.log(`[${((Date.now() - t0) / 1000).toFixed(0)}s] progress ${data.progress!.done}/${data.progress!.total}`);
      }
      if (Date.now() - t0 > 12 * 60_000) throw new Error('TIMEOUT (12 min)');
      continue;
    }
    break;
  }
  if (!data || data.status === 'error') throw new Error(`job error: ${data?.error}`);

  const qs = data.questions ?? [];
  console.log(`DONE in ${((Date.now() - t0) / 1000).toFixed(0)}s — rawCount=${data.rawCount} extracted=${qs.length} detectorEstimate=${data.estimatedCount ?? 'n/a'} droppedChunks=${data.droppedChunks ?? 0} (of ${planted})`);

  if (planted > 200 && qs.length <= 200) throw new Error(`still capped at ≤200 (${qs.length})`);
  const recall = (qs.length / planted) * 100;
  console.log(`recall: ${recall.toFixed(0)}%`);
  if (qs.length < Math.ceil(planted * 0.9)) throw new Error(`recall too low: ${qs.length}/${planted}`);
  if ((data.droppedChunks ?? 0) > 0) throw new Error(`${data.droppedChunks} chunk(s) dropped`);

  const letterAnswers = qs.filter((q) => /^[A-F][).\s]?$/.test((q.answer || '').trim())).length;
  console.log(`answer mapping: ${letterAnswers} bare-letter answers (want 0)`);
  if (letterAnswers > qs.length * 0.05) throw new Error('too many unresolved letter answers');

  const del = await fetch(`${BASE}/api/questions/import/extract?jobId=${start.jobId}`, { method: 'DELETE' });
  console.log(`cleanup DELETE: ${del.status}`);
}

await runPhase('Phase 2: statement-style bank (no "?", no numbering)', buildStatementText(N), 'statement-bank-e2e.txt', N);
await runPhase('Phase 3: mixed-signal bank (9- numbering, inline options)', buildMixedSignalText(N), 'mixed-signal-bank-e2e.txt', N);
console.log('\nPHASES 2+3 PASSED');
