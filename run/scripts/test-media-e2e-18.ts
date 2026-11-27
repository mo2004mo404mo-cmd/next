/**
 * Task 18 E2E — verify the new ingestion capabilities end-to-end through the
 * live dev server (guest account, same as the real user):
 *
 *   1. test-deck.pptx   → slide text + speaker notes + embedded slide-image VLM OCR
 *   2. test-labs.xlsx   → per-sheet rows
 *   3. test-notes.docx  → text + embedded image description
 *   4. test-book.epub   → spine-ordered chapters
 *   5. test-lecture.mp4 → ASR transcript + evenly-sampled frame VLM OCR
 *
 * Each upload is polled to ready/failed, the stored content is fetched with
 * ?full=1 and asserted, and every test source is DELETED at the end (the
 * guest library belongs to the real user).
 *
 * Run: bunx tsx scripts/test-media-e2e-18.ts
 */
import fs from 'fs';

const BASE = 'http://localhost:3000';
const FIX = '/home/z/my-project/upload/fixtures';

interface SourceRow {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'ready' | 'failed';
  error?: string | null;
  meta?: Record<string, unknown> | null;
}

async function upload(fileName: string): Promise<string> {
  const buf = fs.readFileSync(`${FIX}/${fileName}`);
  const form = new FormData();
  form.append('file', new Blob([new Uint8Array(buf)]), fileName);
  const res = await fetch(`${BASE}/api/knowledge/upload`, { method: 'POST', body: form });
  const json = (await res.json()) as { sourceId?: string; error?: string };
  if (!res.ok || !json.sourceId) throw new Error(`upload ${fileName} failed: ${json.error || res.status}`);
  return json.sourceId;
}

async function waitForReady(id: string, timeoutMs = 360_000): Promise<SourceRow> {
  const start = Date.now();
  for (;;) {
    if (Date.now() - start > timeoutMs) throw new Error(`timeout waiting for source ${id}`);
    await new Promise((r) => setTimeout(r, 4000));
    const res = await fetch(`${BASE}/api/knowledge/sources`);
    const json = (await res.json()) as { sources?: SourceRow[] };
    const row = json.sources?.find((s) => s.id === id);
    if (!row) throw new Error(`source ${id} vanished`);
    if (row.status === 'ready' || row.status === 'failed') return row;
  }
}

async function getContent(id: string): Promise<{ content: string; meta: Record<string, unknown> }> {
  const res = await fetch(`${BASE}/api/knowledge/sources/${id}?full=1`);
  const json = (await res.json()) as { content?: string; source?: SourceRow; error?: string };
  if (!res.ok) throw new Error(`content fetch failed: ${json.error || res.status}`);
  return { content: json.content || '', meta: (json.source?.meta || {}) as Record<string, unknown> };
}

async function deleteSource(id: string): Promise<void> {
  await fetch(`${BASE}/api/knowledge/sources/${id}`, { method: 'DELETE' }).catch(() => {});
}

const results: Array<{ file: string; ok: boolean; details: string[] }> = [];

async function runCase(file: string, checks: Array<[string, RegExp]>, metaChecks: RegExp[] = []) {
  const details: string[] = [];
  const ids: string[] = [];
  try {
    const id = await upload(file);
    ids.push(id);
    const row = await waitForReady(id);
    if (row.status === 'failed') throw new Error(`indexing failed: ${row.error}`);
    const { content, meta } = await getContent(id);
    let ok = true;
    for (const [label, re] of checks) {
      const hit = re.test(content);
      if (!hit) ok = false;
      details.push(`${hit ? 'PASS' : 'FAIL'} ${label}`);
    }
    for (const re of metaChecks) {
      const hit = re.test(JSON.stringify(meta));
      if (!hit) ok = false;
      details.push(`${hit ? 'PASS' : 'FAIL'} meta ${re}`);
    }
    const preview = content.replace(/\s+/g, ' ').slice(0, 220);
    details.push(`meta: ${JSON.stringify(meta).slice(0, 260)}`);
    details.push(`content: ${preview}…`);
    results.push({ file, ok, details });
  } catch (e) {
    details.push(`ERROR ${e instanceof Error ? e.message : e}`);
    results.push({ file, ok: false, details });
  } finally {
    for (const id of ids) await deleteSource(id);
  }
}

async function main() {
  console.log('— pptx —');
  await runCase(
    'test-deck.pptx',
    [
      ['slide heading', /Insulin and Potassium Rules/],
      ['slide bullet text', /Start insulin 0\.1 units\/kg\/h IV once K\+ > 3\.3/],
      ['speaker notes', /Do not start insulin before correcting hypokalemia/],
      ['slide visuals (VLM OCR of embedded image)', /# Slide visuals/],
      ['VLM reads slide image text', /Insulin 0\.1 units\/kg\/h/i],
      ['slide 3 text', /Cerebral Edema/],
    ],
    [/slides/, /ocr/],
  );

  console.log('— xlsx —');
  await runCase(
    'test-labs.xlsx',
    [
      ['sheet 1 header', /## Sheet: Lab Reference Ranges/],
      ['sheet 1 row', /Troponin I \| < 0\.04 \| ng\/mL/],
      ['sheet 2 header', /## Sheet: Emergency Drug Doses/],
      ['sheet 2 row', /Mannitol \| 0\.5 - 1 g\/kg/],
    ],
    [/sheets/, /rows/],
  );

  console.log('— docx —');
  await runCase(
    'test-notes.docx',
    [
      ['body text', /anion gap above 12/],
      ['embedded images section', /# Embedded images/],
      ['VLM describes embedded slide', /Insulin 0\.1 units\/kg\/h|0\.1 units/i],
    ],
    [/embeddedImages/],
  );

  console.log('— epub —');
  await runCase(
    'test-book.epub',
    [
      ['chapter 1 title', /Chapter 1: Chest Pain/],
      ['chapter 1 body', /Boerhaave/],
      ['chapter 2 title', /Chapter 2: Shock/],
      ['chapter 2 body', /SHOCK trial/],
    ],
    [/chapters/],
  );

  console.log('— video (mp4: ASR + frames) —');
  await runCase(
    'test-lecture.mp4',
    [
      ['spoken content section', /# Spoken content/],
      ['ASR transcript (speech)', /insulin/i],
      ['on-screen visuals section', /# On-screen visuals/],
      ['VLM OCR reads slide text', /DKA PROTOCOL/i],
    ],
    [/durationSec/, /asr\+vlm-frames/],
  );

  console.log('\n========== RESULTS ==========');
  for (const r of results) {
    console.log(`${r.ok ? '✓' : '✗'} ${r.file}`);
    for (const d of r.details) console.log(`   ${d}`);
  }
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} fixtures passed`);
  if (failed.length) process.exit(1);
}

void main().catch((e) => { console.error(e); process.exit(1); });
