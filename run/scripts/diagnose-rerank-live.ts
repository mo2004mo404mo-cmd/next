// diagnose-rerank-live.ts — live A/B replay of the LLM reranker on a real
// cited question.
//
// Question the user reported: cited chunks only "contain some words like
// vitamin b12" (decorative chunks). The repair pipeline now re-ranks
// candidates with an ENRICHED query (QUESTION + CORRECT ANSWER + RATIONALE).
// This script measures the actual reranker behavior in both modes:
//
//   A. stem-only query        — answer-blind: ranks topical relevance only
//   B. enriched verifyQuery   — answer-aware: the query itself carries the
//                               answer + mechanism vocabulary
//
// For each mode we run the FULL production pipeline (dense + BM25 + RRF +
// LLM listwise rerank — rerank defaults ON) over the same source set and
// report: per-chunk rerank score, final rank, and whether the chunk that
// actually CONTAINS the answer (answerCoverage measured with the production
// grounding scorer) lands in top-3.
import { db } from '../src/lib/db';
import { retrieveKnowledgeHybrid } from '../src/lib/agent/knowledge/hybrid';
import {
  scoreCitationGrounding,
  makeCitationIdf,
} from '../src/lib/agent/knowledge/text-quality';

async function main() {
  // ── Pick a cited question: optional search term via argv[2], else newest ──
  const term = (process.argv[2] || '').toLowerCase();
  const recent = await db.question.findMany({
    orderBy: { updatedAt: 'desc' },
    select: { id: true, text: true, answer: true, explanation: true, options: true, citations: true },
    take: 40,
  });
  const withCites = recent.filter((r) => {
    try { return Array.isArray(JSON.parse(r.citations ?? '[]')) && JSON.parse(r.citations ?? '[]').length > 0; }
    catch { return false; }
  });
  const q = term
    ? withCites.find((r) => (r.text + ' ' + r.answer).toLowerCase().includes(term))
    : withCites[0];
  if (!q) throw new Error('no cited question found');
  const citations = (() => { try { return JSON.parse(q.citations ?? '[]'); } catch { return []; } })();
  const chunkIds = citations.map((c) => String(c.chunkId)).filter(Boolean);
  const sourceIds = [...new Set(citations.map((c) => String(c.sourceId)).filter(Boolean))];

  // Owner of the cited sources (questions are bank-global).
  const src = await db.knowledgeSource.findFirst({
    where: { id: sourceIds[0] },
    select: { userId: true, name: true },
  });
  if (!src) throw new Error('cited source not found');

  // ── Resolve the full answer text (bare letter → option text) ──
  const options = (Array.isArray(q.options) ? q.options : []) as string[];
  const letterIdx = String(q.answer || '').trim().match(/^option\s+([a-e])$/i)?.[1]
    ?? String(q.answer || '').trim().match(/^([a-e])[.:)]?$/i)?.[1];
  const fullAnswerText = letterIdx
    ? (options[letterIdx.toLowerCase().charCodeAt(0) - 97] ?? String(q.answer))
    : String(q.answer || '');
  const questionText = String(q.text || '').replace(/<[^>]*>/g, ' ').replace(/&#?[a-z0-9]+;/gi, ' ');

  // ── IDF over the cited sources' chunks (production signal) ──
  const pool = await db.knowledgeChunk.findMany({
    where: { sourceId: { in: sourceIds } },
    select: { content: true },
  });
  const idf = makeCitationIdf(pool.map((r) => r.content));

  console.log('══ The question under test ══');
  console.log(`Q: ${questionText.replace(/\s+/g, ' ').slice(0, 140)}…`);
  console.log(`A: ${fullAnswerText.slice(0, 120)}`);
  console.log(`sources: ${sourceIds.length} (${src.name}) · corpus: ${pool.length} chunks\n`);

  // ── Grounding of the currently-cited chunks (post-repair, expected good) ──
  const citedChunks = await db.knowledgeChunk.findMany({
    where: { id: { in: chunkIds } },
    select: { id: true, content: true },
  });
  console.log('══ Currently-cited chunks (production grounding scorer) ══');
  for (const c of citedChunks) {
    const g = scoreCitationGrounding(c.content, questionText, fullAnswerText, String(q.explanation || ''), idf);
    console.log(
      `  ${c.id.slice(-6)} answerCov=${g.answerCoverage.toFixed(2)} mechCov=${g.mechanismCoverage.toFixed(2)} score=${g.score.toFixed(2)}`,
    );
  }
  const answerChunkIds = citedChunks
    .map((c) => ({
      id: c.id,
      g: scoreCitationGrounding(c.content, questionText, fullAnswerText, String(q.explanation || ''), idf),
    }))
    .filter((x) => x.g.answerCoverage >= 0.5)
    .map((x) => x.id);
  console.log(`  → answer-bearing chunks: ${answerChunkIds.length ? answerChunkIds.map((i) => i.slice(-6)).join(', ') : 'NONE FOUND'}\n`);

  // ── Query variants ──
  const stemOnly = questionText.slice(0, 400);
  const enriched = `QUESTION: ${questionText.slice(0, 400)}\nCORRECT ANSWER: ${fullAnswerText.slice(0, 250)}\nRATIONALE: ${String(q.explanation || '').slice(0, 600)}`.trim();

  const modes: Array<{ label: string; query: string; answerSupport?: boolean }> = [
    { label: 'A. STEM-ONLY + relevance rerank (answer-blind — old behavior)', query: stemOnly },
    { label: 'B. ENRICHED Q+A+RATIONALE + relevance rerank (current corrective)', query: enriched },
    { label: 'C. ENRICHED + ANSWER-SUPPORT rerank (fixed — anti-list rubric)', query: enriched, answerSupport: true },
  ];

  for (const mode of modes) {
    console.log(`══ ${mode.label} ══`);
    const { chunks, diagnostics } = await retrieveKnowledgeHybrid(src.userId, mode.query, {
      sourceIds,
      topK: 6,
      expand: false, // corrective path disables expansion; the enriched query is already specific
      skipLog: true,
      ...(mode.answerSupport
        ? {
            rerankMode: 'answer-support' as const,
            answerContext: {
              answer: fullAnswerText.slice(0, 300),
              rationale: String(q.explanation || '').slice(0, 600),
            },
          }
        : {}),
    });
    chunks.forEach((c, rank) => {
      const isAnswerChunk = answerChunkIds.includes(c.chunkId);
      const g = scoreCitationGrounding(c.content, questionText, fullAnswerText, String(q.explanation || ''), idf);
      console.log(
        `  #${rank + 1} ${c.chunkId.slice(-6)} rerank=${c.rerankScore ?? '–'}/10 final=${c.score}` +
        ` ansCov=${g.answerCoverage.toFixed(2)}${isAnswerChunk ? '  ◀ ANSWER CHUNK' : ''}`,
      );
      console.log(`      ${String(c.content).replace(/\s+/g, ' ').slice(0, 130)}…`);
    });
    const top3Hit = chunks.slice(0, 3).some((c) => answerChunkIds.includes(c.chunkId));
    console.log(
      `  rerankUsed=${diagnostics.rerankUsed} · answer chunk in top-3: ${top3Hit ? 'YES ✓' : 'NO ✗'} · ${diagnostics.latencyMs}ms\n`,
    );
  }

  await db.$disconnect();
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
