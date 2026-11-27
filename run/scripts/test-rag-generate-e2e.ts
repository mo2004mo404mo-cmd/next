/**
 * FULL E2E: generate a question GROUNDED in the knowledge library (RAG),
 * then verify the question reflects the library's distinctive facts and
 * carries library citations in its sources array.
 */
const BASE = 'http://localhost:3000';

async function main() {
  // 1. get the ready sources (handbook + pdf + audio + video)
  const list = await (await fetch(`${BASE}/api/knowledge/sources`)).json();
  const sources = (list.sources || []).filter((s: any) => s.status === 'ready');
  const ids = sources.map((s: any) => s.id);
  console.log('grounding on', ids.length, 'sources:', sources.map((s: any) => s.name).join(', '));

  // 2. start an agent generation job with RAG grounding
  const res = await fetch(`${BASE}/api/generate/agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      topic: 'antibiotic protocols and DKA management from my ward handbook',
      system: 'Pharmacology',
      types: ['mcq'],
      difficulties: ['Medium'],
      count: 1,
      knowledgeSourceIds: ids,
    }),
  });
  const start = await res.json();
  if (!res.ok) throw new Error('generate failed: ' + JSON.stringify(start).slice(0, 300));
  console.log('job started:', start.jobId, '| gated:', JSON.stringify(start.gated));

  // 3. poll the job
  const t0 = Date.now();
  let job: any = null;
  let lastProgress = '';
  while (Date.now() - t0 < 480_000) {
    job = await (await fetch(`${BASE}/api/generate/agent?jobId=${start.jobId}`)).json();
    if (job.status === 'completed' || job.status === 'failed') break;
    if (job.progress && job.progress !== lastProgress) {
      console.log('  [' + Math.round((Date.now() - t0) / 1000) + 's]', job.progress.slice(0, 140));
      lastProgress = job.progress;
    }
    await new Promise((r) => setTimeout(r, 4000));
  }
  if (job.status !== 'completed') {
    throw new Error('job ' + job.status + ': ' + (job.error || job.progress));
  }
  console.log('job completed in', Math.round((Date.now() - t0) / 1000), 's');

  // 4. inspect the generated question
  const q = (job.result || [])[0];
  if (!q) throw new Error('no question in result');
  console.log('\n════ GENERATED QUESTION ════');
  console.log('stem:', String(q.text).replace(/<[^>]*>/g, '').slice(0, 400));
  console.log('options:', JSON.stringify(q.options));
  console.log('answer:', q.answer);
  console.log('explanation:', String(q.explanation).replace(/<[^>]*>/g, '').slice(0, 500));
  console.log('sources:', JSON.stringify(q.sources, null, 1).slice(0, 700));
  console.log('reviewStatus:', q.reviewStatus);

  // 5. verification: distinctive facts present?
  const haystack = (String(q.text) + ' ' + String(q.explanation) + ' ' + JSON.stringify(q.options)).toLowerCase();
  const checks: Array<[string, boolean]> = [
    ['library citations present', Array.isArray(q.sources) && q.sources.some((s: any) => s.type === 'library')],
  ];
  for (const [needle, label] of [
    ['0.05', 'DKA insulin 0.05 (handbook-specific value)'],
    ['doxycycline', 'CAP doxycycline (handbook)'],
    ['nitrofurantoin', 'CAUTI nitrofurantoin (audio)'],
    ['methenamine', 'prophylaxis methenamine (audio)'],
    ['dapagliflozin', 'HF dapagliflozin (handbook)'],
  ] as [string, string][]) {
    checks.push([label + ' — "' + needle + '"', haystack.includes(needle)]);
  }
  console.log('\n════ GROUNDING CHECKS ════');
  for (const [label, ok] of checks) console.log('  ' + (ok ? 'PASS' : '----') + ' | ' + label);
}
main().catch((e) => { console.error('E2E FAILED:', e); process.exit(1); });
