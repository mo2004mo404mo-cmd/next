/**
 * scripts/reindex-semantic.ts — re-index knowledge sources with SEMANTIC
 * chunking through the production pipeline (parse retained original →
 * semantic chunk → LLM contextual enrichment → embed → replace chunks).
 *
 * Usage:
 *   bun scripts/reindex-semantic.ts            # all ready sources
 *   bun scripts/reindex-semantic.ts <sourceId> # one source
 */
import { db } from '../src/lib/db';
import { reindexKnowledgeSource } from '../src/lib/agent/knowledge/pipeline';

async function main() {
  const filter = process.argv[2];
  const sources = await db.knowledgeSource.findMany({
    where: { status: 'ready', ...(filter ? { id: filter } : {}) },
    select: { id: true, userId: true, name: true },
    orderBy: { createdAt: 'asc' },
  });
  if (sources.length === 0) {
    console.log('No ready sources to reindex.');
    return;
  }

  const results: Array<{ name: string; chunks: number; ms: number; error?: string }> = [];

  for (const s of sources) {
    console.log(`\n=== Reindexing ${s.name} [${s.id}] ===`);
    const t0 = Date.now();
    try {
      const { chunks } = await reindexKnowledgeSource(s.userId, s.id);
      const ms = Date.now() - t0;
      results.push({ name: s.name, chunks, ms });
      console.log(`OK — ${chunks} chunks in ${(ms / 1000).toFixed(0)}s`);
      const src = await db.knowledgeSource.findUnique({ where: { id: s.id }, select: { metaJson: true } });
      console.log(`source meta: ${(src?.metaJson ?? '').slice(0, 180)}`);
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      results.push({ name: s.name, chunks: 0, ms: Date.now() - t0, error });
      console.log(`FAILED: ${error.slice(0, 300)}`);
    }
  }

  console.log('\n──── SUMMARY ────');
  for (const r of results) {
    console.log(
      `${r.error ? '✗' : '✓'} ${r.name.padEnd(42)} ${r.error ? r.error.slice(0, 80) : `${r.chunks} chunks (${(r.ms / 1000).toFixed(0)}s)`}`,
    );
  }

  const total = await db.knowledgeChunk.count();
  const semantic = await db.knowledgeChunk.count({
    where: { metaJson: { contains: '"chunker":"semantic"' } },
  });
  console.log(`\nTotal library chunks: ${total} (semantic: ${semantic})`);
  await db.$disconnect();
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
