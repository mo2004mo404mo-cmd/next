/* One-time library upgrade: re-index every ready knowledge source with the
 * sentence-aware chunker + extraction normalization (Task 56).
 *
 * For each source: reindexKnowledgeSource() resolves the best text (retained
 * original → URL → complete stored content), re-chunks on sentence
 * boundaries, re-enriches and re-embeds, replacing chunks in place.
 *
 * Prints before/after evidence: chunk counts + the first chunk's tail (the
 * old character-stride cuts are visible as mid-word endings).
 */
import { db } from '../src/lib/db';
import { reindexKnowledgeSource, chunkText } from '../src/lib/agent/knowledge/pipeline';
import { normalizeExtractedText } from '../src/lib/agent/knowledge/text-quality';

async function main() {
  const sources = await db.knowledgeSource.findMany({
    where: { status: 'ready' },
    select: { id: true, userId: true, name: true, fileKind: true, type: true },
    orderBy: { createdAt: 'asc' },
  });
  console.log(`Re-indexing ${sources.length} ready sources with the sentence-aware chunker…\n`);

  let ok = 0;
  let skipped = 0;
  for (const s of sources) {
    const doc = await db.knowledgeDocument.findFirst({
      where: { sourceId: s.id },
      orderBy: { createdAt: 'desc' },
      select: { chunkCount: true, content: true },
    });
    const beforeChunks = await db.knowledgeChunk.count({ where: { sourceId: s.id } });
    const beforeSample = doc?.content ? chunkOldSample(doc.content) : '';

    // Preview what the new chunking does to the stored content (for the log).
    const preview = doc?.content ? chunkText(normalizeExtractedText(doc.content)).length : 0;

    try {
      const { chunks } = await reindexKnowledgeSource(s.userId, s.id);
      const fresh = await db.knowledgeChunk.findFirst({
        where: { sourceId: s.id, idx: 0 },
        select: { content: true },
      });
      console.log(`✓ ${s.name} [${s.fileKind || s.type}]`);
      console.log(`    chunks ${beforeChunks} → ${chunks} (stored-content preview said ${preview})`);
      if (beforeSample) console.log(`    OLD chunk1 tail: …${JSON.stringify(beforeSample.slice(-60))}`);
      if (fresh) console.log(`    NEW chunk1 tail: …${JSON.stringify(fresh.content.slice(-60))}`);
      ok++;
    } catch (e) {
      skipped++;
      console.log(`✗ ${s.name} [${s.fileKind || s.type}]: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  console.log(`\nDone: ${ok} re-indexed, ${skipped} skipped/failed.`);
  await db.$disconnect();
  process.exit(0);
}

/** Reproduce the OLD chunker's first cut for the before/after evidence. */
function chunkOldSample(content: string): string {
  const paragraphs = content.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const giant = paragraphs.find((p) => p.length > 900);
  if (!giant) return content.slice(0, 900);
  // Old algorithm: first oversized paragraph → slice(0, 900).
  return giant.slice(0, 900);
}

void main();
