/**
 * scripts/semantic-chunk-test.ts — measure semantic chunking vs the structural
 * chunker on the REAL library sources.
 *
 * For every ready source (largest first):
 *   - load the best text (retained PDF original re-parsed, else stored content)
 *   - run BOTH chunkers on the same input
 *   - report: chunk count, size distribution, sentence-terminator rate,
 *     and for semantic: cuts, thresholds, within-sim vs cross-sim (the
 *     coherence gap that proves cuts land on topic shifts), plus sample
 *     cut neighborhoods.
 *
 * Run: bun scripts/semantic-chunk-test.ts [sourceIdFilter]
 */
import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { chunkTextQuality, normalizeExtractedText } from '../src/lib/agent/knowledge/text-quality';
import { chunkTextSemantic } from '../src/lib/agent/knowledge/semantic-chunking';
import { BgeLocalEmbeddings } from '../src/lib/agent/knowledge/embeddings';

// The platform injects a stale SQLite DATABASE_URL into every bash session —
// only accept a PostgreSQL URL from the environment, else the hardcoded one.
const ENV_URL = process.env.DATABASE_URL;
const DB = ENV_URL && ENV_URL.startsWith('postgres') ? ENV_URL : 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp';
const TERMINATOR = /[.!?…][")'\]]*$/;

interface SourceRow {
  id: string;
  name: string;
  type: string;
  content: string | null;
  size_bytes: number | string | null;
}

function distribution(nums: number[]): string {
  if (nums.length === 0) return 'n/a';
  const sorted = [...nums].sort((a, b) => a - b);
  const q = (p: number) => sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];
  return `min ${q(0)} / p25 ${q(25)} / med ${q(50)} / p75 ${q(75)} / max ${q(100)} (avg ${Math.round(
    nums.reduce((s, n) => s + n, 0) / nums.length,
  )})`;
}

function terminatedRate(chunks: string[]): string {
  const hit = chunks.filter((c) => TERMINATOR.test(c.trim())).length;
  return `${Math.round((100 * hit) / Math.max(1, chunks.length))}%`;
}

async function loadSources(): Promise<SourceRow[]> {
  const client = new pg.Client({ connectionString: DB });
  await client.connect();
  const { rows } = await client.query(
    `SELECT s.id, s.name, s.type, d.content, d."sizeBytes" AS size_bytes
     FROM "KnowledgeSource" s
     JOIN "KnowledgeDocument" d ON d."sourceId" = s.id
     WHERE s.status = 'ready'
     ORDER BY d."sizeBytes" DESC`,
  );
  await client.end();
  return rows as SourceRow[];
}

async function textFor(row: SourceRow): Promise<string> {
  const bin = path.join(process.cwd(), 'upload', 'file-store', `${row.id}.bin`);
  if (fs.existsSync(bin) && /\.pdf$/i.test(row.name)) {
    const { getDocumentProxy, extractText } = await import('unpdf');
    const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(bin)));
    const { text } = await extractText(pdf, { mergePages: true });
    return normalizeExtractedText(text);
  }
  return row.content ?? '';
}

function showCut(prev: string, next: string): string {
  const tail = prev.slice(-160).replace(/\s+/g, ' ');
  const head = next.slice(0, 160).replace(/\s+/g, ' ');
  return `    …${tail}\n    ✂ ────────────────\n    ${head}…`;
}

async function main() {
  const filter = process.argv[2];
  const sources = await loadSources();
  const selected = filter ? sources.filter((s) => s.id === filter || s.name.includes(filter)) : sources;
  if (selected.length === 0) {
    console.log('No ready sources matched.');
    return;
  }

  const embedder = new BgeLocalEmbeddings();
  console.log(`Embedder: ${embedder.id} (${embedder.model})\n`);

  let totOld = 0;
  let totNew = 0;
  let totCuts = 0;

  for (const row of selected) {
    const text = await textFor(row);
    if (!text.trim() || text.length < 400) {
      console.log(`── ${row.name} — skipped (no usable text: ${text.length} chars)\n`);
      continue;
    }

    console.log(`── ${row.name}  [${row.id}]`);
    console.log(`   text: ${text.length.toLocaleString()} chars`);

    const oldChunks = chunkTextQuality(text, { size: 900, overlap: 150 });
    const t0 = Date.now();
    const result = await chunkTextSemantic(
      text,
      (texts: string[]) => embedder.embed(texts),
      {},
    );
    const newChunks = result.chunks;
    totOld += oldChunks.length;
    totNew += newChunks.length;
    totCuts += result.stats.cuts;

    console.log(`   OLD structural : ${oldChunks.length} chunks | sizes ${distribution(oldChunks.map((c) => c.length))} | ends-on-sentence ${terminatedRate(oldChunks)}`);
    console.log(`   NEW ${result.method.padEnd(16)}: ${newChunks.length} chunks | sizes ${distribution(newChunks.map((c) => c.length))} | ends-on-sentence ${terminatedRate(newChunks)}`);
    console.log(
      `   semantic stats : ${result.stats.cuts} cuts | cut cost p68 ${result.stats.cutCost} | ${result.stats.units} sentences`,
    );
    console.log(
      `   coherence gap  : within-chunk sim ${result.stats.avgWithinSim} vs cross-boundary sim ${result.stats.avgCrossSim} → Δ ${(result.stats.avgWithinSim - result.stats.avgCrossSim).toFixed(3)} ${result.stats.avgWithinSim - result.stats.avgCrossSim > 0.05 ? '(✓ cuts on topic shifts)' : '(weak signal)'} | ${Date.now() - t0}ms`,
    );

    // Show 2 sample cut neighborhoods from the middle of the doc.
    if (newChunks.length > 6) {
      const mid = Math.floor(newChunks.length / 2);
      console.log('   sample cut #1:');
      console.log(showCut(newChunks[mid - 1], newChunks[mid]));
      console.log('   sample cut #2:');
      console.log(showCut(newChunks[mid + 1], newChunks[mid + 2]));
    }
    console.log('');
  }

  console.log(`TOTALS: old ${totOld} chunks → new ${totNew} chunks across ${totCuts} semantic cuts`);
}

main().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
