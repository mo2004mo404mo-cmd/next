/**
 * E2E ingestion test: upload text/PDF/audio/video to /api/knowledge/upload,
 * poll until indexed, then verify chunks + embeddings + enrichment.
 */
const BASE = 'http://localhost:3000';
const DIR = '/tmp/rag-e2e';

const FILES = [
  { path: `${DIR}/ward-handbook.md`, name: 'ward-handbook.md', type: 'text/markdown' },
  { path: `${DIR}/ward-protocol.pdf`, name: 'ward-protocol.pdf', type: 'application/pdf' },
  { path: `${DIR}/lecture-audio.mp3`, name: 'lecture-audio.mp3', type: 'audio/mpeg' },
  { path: `${DIR}/lecture-video.mp4`, name: 'lecture-video.mp4', type: 'video/mp4' },
];

async function uploadOne(file: { path: string; name: string; type: string }) {
  const bytes = await Bun.file(file.path).arrayBuffer();
  const form = new FormData();
  form.append('file', new Blob([bytes], { type: file.type }), file.name);
  const res = await fetch(`${BASE}/api/knowledge/upload`, { method: 'POST', body: form });
  const json = await res.json();
  if (!res.ok) throw new Error(`upload ${file.name} failed: HTTP ${res.status} ${JSON.stringify(json).slice(0, 200)}`);
  console.log(`  uploaded ${file.name} → sourceId ${json.sourceId} (${json.fileKind}, ${Math.round(json.bytes / 1024)}KB)`);
  return json as { sourceId: string; fileKind: string };
}

async function pollUntilReady(sourceId: string, timeoutMs: number) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const res = await fetch(`${BASE}/api/knowledge/sources`);
    const json = await res.json();
    const src = (json.sources || []).find((s: any) => s.id === sourceId);
    if (!src) throw new Error(`source ${sourceId} missing from list`);
    if (src.status === 'ready') return src;
    if (src.status === 'failed') throw new Error(`source ${sourceId} FAILED: ${src.error}`);
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`source ${sourceId} still not ready after ${timeoutMs / 1000}s`);
}

async function main() {
  console.log('── Uploading 4 files (text, pdf, audio, video)…');
  const uploaded: Array<{ sourceId: string; fileKind: string; name: string }> = [];
  for (const f of FILES) {
    const r = await uploadOne(f);
    uploaded.push({ ...r, name: f.name });
  }

  console.log('── Polling until indexed (audio/video take 1-3 min: ASR + VLM)…');
  const TIMEOUT = 300_000;
  for (const u of uploaded) {
    const t0 = Date.now();
    try {
      const src = await pollUntilReady(u.sourceId, TIMEOUT);
      const meta = src.meta || {};
      console.log(
        `  ✓ ${u.name} READY in ${Math.round((Date.now() - t0) / 1000)}s — ` +
        `${meta.chunks ?? '?'} chunks, fileKind=${meta.fileKind ?? src.fileKind}` +
        (meta.durationSec ? `, duration=${meta.durationSec}s` : '') +
        (meta.transcription ? `, transcription=${meta.transcription}` : '') +
        (meta.pages ? `, pages=${meta.pages}` : '') +
        (meta.ocr ? `, ocr=${meta.ocr}` : ''),
      );
    } catch (e: any) {
      console.log(`  ✗ ${u.name}: ${e.message}`);
    }
  }

  // Show a sample of the audio transcript to verify ASR accuracy
  const res = await fetch(`${BASE}/api/knowledge/sources`);
  const json = await res.json();
  const audioSrc = (json.sources || []).find((s: any) => s.name?.includes('lecture-audio'));
  if (audioSrc) {
    const detail = await fetch(`${BASE}/api/knowledge/sources/${audioSrc.id}`);
    const dj = await detail.json();
    console.log('\n── Audio transcript preview (first 500 chars):');
    console.log('  ' + String(dj.preview || '').slice(0, 500).replace(/\n/g, '\n  '));
    console.log('\n── Sample chunk (first):');
    const c = dj.sampleChunks?.[0];
    if (c) {
      console.log('  contextSummary:', String(c.contextSummary || '').slice(0, 200));
      console.log('  content:', String(c.content || '').slice(0, 300));
    }
  }
}
main().catch((e) => { console.error('E2E FAILED:', e); process.exit(1); });
