/**
 * Re-import the USER'S ACTUAL harvard.wav (their 18s Kaggle-URL import from
 * 02:37 UTC, transcribed by the OLD basic pipeline — the exact "not good"
 * transcript they complained about) through the NEW advanced pipeline.
 *
 * Safe order: import the URL fresh FIRST (old row untouched), verify the new
 * transcript, and only then delete the old row + the UI-verification seed.
 * If the import fails (e.g. ASR quota), the old source stays intact.
 *
 * Run: bunx tsx scripts/reimport-user-harvard.ts
 */
import fs from 'fs';

const BASE = 'http://localhost:3000';
const OLD_ID = 'cmurs7cjn00294boefhtxxsgr'; // user's old basic-pipeline import
const SEED_ID = 'cmurtp8v600000loejam0xj6r'; // UI-verification seed (Task 21)

interface SourceRow {
  id: string; name: string; status: 'pending' | 'processing' | 'ready' | 'failed';
  error?: string | null; meta?: Record<string, unknown> | null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  // 1. fetch the old source's original URL (signed GCS link, valid ~Oct 5)
  const old = await fetch(`${BASE}/api/knowledge/sources/${OLD_ID}?full=1`);
  if (!old.ok) {
    console.log('old source already gone — nothing to upgrade');
  }
  const oldJson = (await old.json()) as { source?: { meta?: Record<string, unknown> } };
  const sourceUrl = oldJson.source?.meta?.sourceUrl as string | undefined;
  if (!sourceUrl) throw new Error('old source has no sourceUrl in meta — cannot re-import');
  console.log(`re-importing user's harvard.wav from ${sourceUrl.slice(0, 60)}…`);

  // 2. import fresh through the advanced pipeline (guest = the live user)
  const res = await fetch(`${BASE}/api/knowledge/sources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'url', url: sourceUrl }),
  });
  const json = (await res.json()) as { sourceId?: string; error?: string };
  if (!res.ok || !json.sourceId) throw new Error(`import failed: ${json.error || res.status}`);
  const newId = json.sourceId;
  console.log(`new source → ${newId} (pending)`);

  // 3. poll
  let row: SourceRow | undefined;
  for (let i = 0; i < 70; i++) {
    await sleep(4000);
    const list = (await (await fetch(`${BASE}/api/knowledge/sources`)).json()) as { sources?: SourceRow[] };
    row = list.sources?.find((s) => s.id === newId);
    if (row && (row.status === 'ready' || row.status === 'failed')) break;
  }
  if (!row || row.status !== 'ready') {
    throw new Error(`new import failed: ${row?.error || 'timeout'} — OLD source left untouched`);
  }

  // 4. verify the upgrade
  const det = (await (await fetch(`${BASE}/api/knowledge/sources/${newId}?full=1`)).json()) as {
    content?: string;
    source?: { meta?: Record<string, unknown> & { transcript?: Record<string, unknown> } };
  };
  const meta = det.source?.meta || {};
  const t = meta.transcript as
    | { sentences: Array<{ start: number; end: number; text: string }>; stats: { sentences: number; words: number; wpm: number }; insights: { title: string } }
    | undefined;
  if (!t) throw new Error('new source has no structured transcript — aborting cleanup');
  console.log(`UPGRADED: ${t.stats.sentences} sentences, ${t.stats.words} words, ${t.stats.wpm} wpm`);
  console.log(`insights title: ${t.insights.title}`);
  for (const s of t.sentences) console.log(`  [${s.start.toFixed(2)}-${s.end.toFixed(2)}] ${s.text}`);

  const audio = await fetch(`${BASE}/api/knowledge/sources/${newId}/audio`, { headers: { Range: 'bytes=0-1' } });
  console.log(`retained audio: HTTP ${audio.status} (${audio.headers.get('content-range') || 'no range'})`);
  void audio.body?.cancel().catch(() => {});

  // 5. swap: remove old + seed, keep the new one (it IS the user's file)
  for (const [label, id] of [['old basic-pipeline source', OLD_ID], ['UI-verification seed', SEED_ID]] as const) {
    const del = await fetch(`${BASE}/api/knowledge/sources/${id}`, { method: 'DELETE' });
    console.log(`deleted ${label}: HTTP ${del.status}`);
  }

  const storePath = `/home/z/my-project/upload/audio-store/${OLD_ID}.bin`;
  if (fs.existsSync(storePath)) fs.rmSync(storePath);
  console.log(`\n✓ user's harvard.wav upgraded in place — new source id: ${newId}`);
}

void main().catch((e) => { console.error(e); process.exit(1); });
