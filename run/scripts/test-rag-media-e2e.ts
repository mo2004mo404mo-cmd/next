/**
 * Re-test audio + video ingestion (after the 25s ASR segmentation fix),
 * then run hybrid retrieval quality checks on the whole library.
 */
const BASE = 'http://localhost:3000';
const DIR = '/tmp/rag-e2e';

async function uploadAndAwait(path: string, name: string, type: string, timeoutMs = 240_000) {
  const bytes = await Bun.file(path).arrayBuffer();
  const form = new FormData();
  form.append('file', new Blob([bytes], { type }), name);
  const res = await fetch(`${BASE}/api/knowledge/upload`, { method: 'POST', body: form });
  const json = await res.json();
  if (!res.ok) throw new Error(`upload failed: HTTP ${res.status} ${JSON.stringify(json).slice(0, 200)}`);
  console.log(`  uploaded ${name} → ${json.sourceId}`);
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const list = await (await fetch(`${BASE}/api/knowledge/sources`)).json();
    const src = (list.sources || []).find((s: any) => s.id === json.sourceId);
    if (src?.status === 'ready') {
      console.log(`  ✓ ${name} READY in ${Math.round((Date.now() - t0) / 1000)}s — ${(src.meta || {}).chunks} chunks, meta:`, JSON.stringify({ ...(src.meta || {}), title: undefined, chunks: undefined, mimeType: undefined, fileKind: undefined }));
      return src;
    }
    if (src?.status === 'failed') throw new Error(`${name} FAILED: ${src.error}`);
    await new Promise((r) => setTimeout(r, 4000));
  }
  throw new Error(`${name} not ready after ${timeoutMs / 1000}s`);
}

async function search(query: string, expectIn: string, label: string) {
  const res = await fetch(`${BASE}/api/knowledge/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, topK: 5 }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`search failed: ${JSON.stringify(json).slice(0, 200)}`);
  const top = json.chunks?.[0];
  const hit = top ? (top.content + ' ' + (top.contextSummary || '')).toLowerCase().includes(expectIn.toLowerCase()) : false;
  const mark = hit ? 'OK ' : 'MISS';
  const info = [
    '[' + label + '] "' + query.slice(0, 50) + '"',
    'top="' + (top?.documentTitle || '?') + '"',
    'score=' + top?.score,
    'rerank=' + (top?.rerankScore ?? '-'),
    'dense=' + (top?.denseScore != null ? Number(top.denseScore).toFixed(3) : '-'),
    'latency=' + (json.diagnostics?.latencyMs ?? '?') + 'ms',
    'rerankUsed=' + json.diagnostics?.rerankUsed,
    'expand=' + (json.diagnostics?.expandedQueries?.length ?? 0),
    hit ? 'CONTAINS "' + expectIn + '"' : 'MISSING "' + expectIn + '"',
  ].join(' | ');
  console.log('  ' + mark + ' ' + info);
  return hit;
}

async function main() {
  console.log('── Re-ingesting audio + video with fixed 25s ASR segmentation…');
  const audio = await uploadAndAwait(`${DIR}/lecture-audio.mp3`, 'lecture-audio.mp3', 'audio/mpeg');
  const video = await uploadAndAwait(`${DIR}/lecture-video.mp4`, 'lecture-video.mp4', 'video/mp4');

  // Show the transcript of the audio source
  const detail = await (await fetch(`${BASE}/api/knowledge/sources/${audio.id}`)).json();
  console.log('\n── Audio transcript (verbatim from ASR):');
  console.log('  ' + String(detail.preview || '').slice(0, 700).replace(/\n/g, '\n  '));

  const vdetail = await (await fetch(`${BASE}/api/knowledge/sources/${video.id}`)).json();
  console.log('\n── Video extracted content (first 700 chars):');
  console.log('  ' + String(vdetail.preview || '').slice(0, 700).replace(/\n/g, '\n  '));

  console.log('\n── Hybrid retrieval quality checks:');
  let pass = 0, total = 0;
  for (const [q, expect, label] of [
    ['what insulin infusion rate does the DKA protocol use', '0.05', 'DKA insulin rate'],
    ['which antibiotic is first line for outpatient pneumonia', 'doxycycline', 'CAP antibiotic'],
    ['door to needle target for thrombolysis', '35', 'stroke door-to-needle'],
    ['nitrofurantoin dose for urinary tract infection', '100', 'CAUTI nitrofurantoin'],
    ['prophylaxis agent for recurrent urinary infections', 'methenamine', 'CAUTI prophylaxis'],
    ['what does the discharge bundle include for heart failure', 'dapagliflozin', 'HF bundle'],
  ] as [string, string, string][]) {
    total++;
    if (await search(q, expect, label)) pass++;
  }
  console.log(`\n── RESULT: ${pass}/${total} retrieval checks passed`);
}
main().catch((e) => { console.error('E2E FAILED:', e); process.exit(1); });
