/**
 * e2e-attach.ts — attach to a RUNNING extraction job and verify the same
 * assertions as e2e-extract-dense.ts (used when the driver script got killed
 * by a tool-session cleanup but the DB-backed server job kept going).
 *
 * Usage: bun scripts/e2e-attach.ts <jobId> <planted> [markerRegex]
 */
const BASE = process.env.BASE_URL || 'http://localhost:3000';
const jobId = process.argv[2];
const planted = Number(process.argv[3] || 260);
const markerSrc = process.argv[4] || '';
const marker = markerSrc ? new RegExp(markerSrc) : null;

if (!jobId) {
  console.error('usage: bun scripts/e2e-attach.ts <jobId> <planted> [markerRegex]');
  process.exit(1);
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

const t0 = Date.now();
let lastDone = -1;
let data: PollData | null = null;
for (;;) {
  await new Promise((r) => setTimeout(r, 3000));
  const poll = await fetch(`${BASE}/api/questions/import/extract?jobId=${jobId}`);
  if (poll.status === 404) throw new Error('job lost');
  data = (await poll.json()) as PollData;
  if (data.status === 'running') {
    if ((data.progress?.done ?? -1) !== lastDone) {
      lastDone = data.progress!.done;
      console.log(`[${((Date.now() - t0) / 1000).toFixed(0)}s] progress ${data.progress!.done}/${data.progress!.total}`);
    }
    if (Date.now() - t0 > 12 * 60_000) throw new Error('ATTACH TIMEOUT (12 min)');
    continue;
  }
  break;
}
if (!data || data.status === 'error') throw new Error(`job error: ${data?.error}`);

const qs = data.questions ?? [];
console.log(`DONE — rawCount=${data.rawCount} extracted=${qs.length} detectorEstimate=${data.estimatedCount ?? 'n/a'} droppedChunks=${data.droppedChunks ?? 0} (of ${planted} planted)`);

if (planted > 200 && qs.length <= 200) throw new Error(`still capped at ≤200 (extracted ${qs.length})`);

if (marker) {
  const nums = qs.map((q) => Number((q.text.match(marker) || [0, 0])[1])).filter((n) => n > 0);
  let inversions = 0;
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++) if (nums[j] < nums[i]) inversions++;
  console.log(`order preserved: ${inversions === 0} (inversions=${inversions}, ${nums.length}/${planted} markers)`);
}

const recall = (qs.length / planted) * 100;
console.log(`recall: ${recall.toFixed(0)}%`);
if (qs.length < Math.ceil(planted * 0.9)) throw new Error(`recall too low: ${qs.length}/${planted}`);
if ((data.droppedChunks ?? 0) > 0) throw new Error(`${data.droppedChunks} chunk(s) dropped`);

const letterAnswers = qs.filter((q) => /^[A-F][).\s]?$/.test((q.answer || '').trim())).length;
console.log(`answer mapping: ${letterAnswers} bare-letter answers (want 0)`);
if (letterAnswers > qs.length * 0.05) throw new Error('too many unresolved letter answers');

const del = await fetch(`${BASE}/api/questions/import/extract?jobId=${jobId}`, { method: 'DELETE' });
console.log(`cleanup DELETE: ${del.status}`);
console.log('ATTACH PASSED');
