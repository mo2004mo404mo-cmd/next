/**
 * scripts/verify-retrieval.ts — end-to-end retrieval check on the semantic
 * chunks: run the full hybrid engine (dense + BM25 + RRF + LLM rerank) on
 * representative medical questions and show what the question-agent would
 * cite. Verify: (1) top chunks are on-topic for the question, (2) the
 * formatted [K#] context carries complete passages.
 *
 * Usage: bun scripts/verify-retrieval.ts
 */
import { db } from '../src/lib/db';
import { retrieveKnowledgeHybrid, formatHybridContext } from '../src/lib/agent/knowledge/hybrid';

const QUERIES = [
  'What are the warning signs that a breastfed baby is not getting enough milk?',
  'How is hepatitis B virus transmitted?',
  'What are the ten steps of the Baby-Friendly Hospital Initiative?',
  'Which hepatitis virus is transmitted through contaminated water supplies?',
];

async function main() {
  // The guest user owns the pediatric textbook + prevention PDF.
  const guest = await db.user.findFirst({ where: { email: 'guest@medq.local' }, select: { id: true } });
  if (!guest) throw new Error('guest user not found');

  for (const q of QUERIES) {
    console.log(`\n❓ ${q}`);
    const { chunks, diagnostics } = await retrieveKnowledgeHybrid(guest.id, q, { topK: 3, skipLog: true });
    for (const c of chunks) {
      console.log(
        `   [K] ${(c.rerankScore ?? 0).toFixed(1)}/10 rerank · dense ${c.denseScore?.toFixed(3)} · ${c.documentTitle.slice(0, 34)} · passage ${c.idx + 1} (${c.content.length} chars)`,
      );
      console.log(`       ${c.content.replace(/\s+/g, ' ').slice(0, 190)}…`);
    }
    console.log(
      `   diagnostics: dense=${diagnostics.denseCandidates} bm25=${diagnostics.lexicalCandidates} expand=${diagnostics.expandedQueries.length} rerank=${diagnostics.rerankUsed} ${diagnostics.latencyMs}ms`,
    );
  }

  // Show one formatted context block (what the question-agent LLM reads).
  const { chunks } = await retrieveKnowledgeHybrid(guest.id, QUERIES[0], { topK: 2, skipLog: true });
  const ctx = formatHybridContext(chunks);
  console.log('\n──── formatted LLM context (first 900 chars) ────');
  console.log(ctx.slice(0, 900));

  await db.$disconnect();
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
