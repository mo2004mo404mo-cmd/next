/**
 * repair-citations.ts — rebuild EXISTING questions' citations through the
 * production verification pipeline (the same three layers save_question
 * runs): agent picks (existing citation chunks) → corrective answer-support
 * retrieval → LLM judge + token coverage → CONJUNCTION GATE
 * (judge >= 7 AND answerCoverage >= 0.15).
 *
 * Usage:
 *   bun scripts/repair-citations.ts                        # every question that HAS citations
 *   bun scripts/repair-citations.ts --user <userId>        # …and questions with NO citations, searching that user's whole library
 *   bun scripts/repair-citations.ts --sources id1,id2      # restrict the search scope to these sources
 *   bun scripts/repair-citations.ts <questionId> [<id>…]   # only these questions
 *
 * Scope rules per question:
 *   - has citations → scope = the cited sources (grouped by owner for retrieval)
 *   - no citations  → scope = --user's whole library (or --sources); skipped without either
 */
import { db } from '../src/lib/db';
import {
  retrieveKnowledgeHybrid,
  judgeCitationSupport,
  answerTokenCoverage,
  JUDGE_MAX_CANDIDATES,
} from '../src/lib/agent/knowledge/hybrid';
import { buildCitationQuote } from '../src/lib/agent/knowledge/text-quality';

interface ExistingCitation {
  sourceId?: string;
  chunkId?: string;
}

function stripHtml(s: string): string {
  return String(s || '').replace(/<[^>]*>/g, ' ').replace(/&#?[a-z0-9]+;/gi, ' ');
}

async function main() {
  const args = process.argv.slice(2);
  const ids = args.filter((a) => !a.startsWith('--'));
  const userFlag = args.find((a) => a.startsWith('--user=') || a === '--user');
  const sourcesFlag = args.find((a) => a.startsWith('--sources=') || a === '--sources');
  const explicitUser = userFlag ? (userFlag.includes('=') ? userFlag.split('=')[1] : args[args.indexOf(userFlag) + 1]) : undefined;
  const explicitSources = sourcesFlag
    ? (sourcesFlag.includes('=') ? sourcesFlag.split('=')[1] : args[args.indexOf(sourcesFlag) + 1])?.split(',').filter(Boolean)
    : undefined;

  const where = ids.length ? { id: { in: ids } } : { citations: { not: '[]' } };
  const questions = await db.question.findMany({
    where,
    select: { id: true, text: true, answer: true, explanation: true, options: true, citations: true },
    orderBy: { createdAt: 'asc' },
  });
  console.log(`repair-citations: ${questions.length} question(s) to verify\n`);

  let repaired = 0;
  let dropped = 0;
  let unchanged = 0;

  for (const q of questions) {
    const questionText = stripHtml(q.text);
    const answerText = String(q.answer || '').trim();
    const rationale = String(q.explanation || '').slice(0, 900);
    if (!answerText) {
      console.log(`✗ ${q.id} — no answer stored, cannot verify\n`);
      continue;
    }

    // Parse existing citations → agent-pick chunkIds + scope sources
    let existing: ExistingCitation[] = [];
    try {
      const parsed = JSON.parse(q.citations || '[]');
      if (Array.isArray(parsed)) existing = parsed;
    } catch { /* treat as none */ }
    const existingChunkIds = existing.map((c) => String(c.chunkId || '')).filter(Boolean);
    const citedSourceIds = [...new Set(existing.map((c) => String(c.sourceId || '')).filter(Boolean))];

    // Scope precedence: --sources > the question's OWN cited sources >
    // --user's whole library (fallback for citation-less questions only).
    // (--user must NOT override a question's own scope: the cited sources
    // may belong to a different owner than --user, which empties retrieval.)
    const scopeSourceIds = explicitSources ?? citedSourceIds;
    let scopeUserIds: string[] = [];
    if (scopeSourceIds.length) {
      const owners = await db.knowledgeSource.findMany({
        where: { id: { in: scopeSourceIds } },
        select: { userId: true },
      });
      scopeUserIds = [...new Set(owners.map((o) => o.userId))];
    } else if (explicitUser) {
      scopeUserIds = [explicitUser];
    }
    if (scopeSourceIds.length === 0 && scopeUserIds.length === 0) {
      console.log(`⊘ ${q.id} — no citation scope (no citations, no --user/--sources); skipped\n`);
      continue;
    }

    // ── 1) agent picks: existing citation chunks, validated in scope ──
    const pool = new Map<string, {
      chunkId: string; content: string; sourceId: string; documentId: string;
      title: string; fileKind: string;
    }>();
    if (existingChunkIds.length) {
      const rows = await db.knowledgeChunk.findMany({
        where: {
          id: { in: existingChunkIds },
          ...(scopeSourceIds.length ? { sourceId: { in: scopeSourceIds } } : {}),
        },
        select: {
          id: true, sourceId: true, documentId: true, content: true,
          source: { select: { name: true, fileKind: true } },
        },
        take: 10,
      });
      for (const row of rows) {
        pool.set(row.id, {
          chunkId: row.id, content: row.content, sourceId: row.sourceId,
          documentId: row.documentId, title: row.source.name,
          fileKind: row.source.fileKind || 'document',
        });
      }
    }

    // ── 2) corrective retrieval (answer-support), per owner group ──
    for (const userId of scopeUserIds) {
      try {
        const corrective = await retrieveKnowledgeHybrid(
          userId,
          `${questionText} ${answerText}`.slice(0, 900),
          {
            ...(scopeSourceIds.length ? { sourceIds: scopeSourceIds } : {}),
            topK: 8,
            rerankMode: 'answer-support',
            answerContext: { answer: answerText, rationale },
            skipLog: true,
          },
        );
        const newSourceIds = [...new Set(corrective.chunks.map((c) => c.sourceId))]
          .filter((sid) => ![...pool.values()].some((p) => p.sourceId === sid));
        const sourceRows = newSourceIds.length
          ? await db.knowledgeSource.findMany({
              where: { id: { in: newSourceIds } },
              select: { id: true, name: true, fileKind: true },
            })
          : [];
        const sourceById = new Map(sourceRows.map((r) => [r.id, r]));
        for (const chunk of corrective.chunks) {
          if (pool.has(chunk.chunkId)) continue;
          const src = sourceById.get(chunk.sourceId);
          pool.set(chunk.chunkId, {
            chunkId: chunk.chunkId, content: chunk.content, sourceId: chunk.sourceId,
            documentId: chunk.documentId, title: src?.name || chunk.documentTitle,
            fileKind: src?.fileKind || 'document',
          });
        }
      } catch (e) {
        console.log(`  (corrective retrieval failed for owner ${userId}: ${(e as Error).message.slice(0, 80)})`);
      }
    }

    // ── 3) judge + coverage conjunction gate ──
    const candidates = [...pool.values()].slice(0, JUDGE_MAX_CANDIDATES);
    if (candidates.length === 0) {
      console.log(`✗ ${q.id} — empty candidate pool\n`);
      continue;
    }
    const verdicts = await judgeCitationSupport(
      undefined, answerText, questionText,
      candidates.map((c) => ({ chunkId: c.chunkId, content: c.content })),
      rationale,
    );
    const verdictMap = new Map(verdicts.map((v) => [v.chunkId, v.score]));
    const kept = candidates
      .map((c) => ({
        ...c,
        judgeScore: verdictMap.get(c.chunkId) ?? 0,
        coverage: answerTokenCoverage(c.content, answerText),
      }))
      .filter((c) => c.judgeScore >= 7 && c.coverage >= 0.15)
      .sort((a, b) => b.judgeScore - a.judgeScore || b.coverage - a.coverage)
      .slice(0, 4);

    // Report
    const oldCiteIds = existingChunkIds.join(',');
    const newCiteIds = kept.map((k) => k.chunkId).join(',');
    const status = kept.length === 0 ? 'DROPPED (no answer-support)' : oldCiteIds === newCiteIds ? 'unchanged' : 'REPAIRED';
    console.log(`${kept.length === 0 ? '✗' : status === 'unchanged' ? '＝' : '✓'} ${q.id} — ${stripHtml(q.text).slice(0, 60)}`);
    for (const k of kept) {
      console.log(`    judge ${k.judgeScore}/10 · cov ${k.coverage.toFixed(2)} · ${k.title} · ${k.chunkId}`);
    }
    if (kept.length === 0) {
      console.log(`    (candidates judged: ${candidates.length}; none passed judge>=7 AND cov>=0.15)`);
    }

    // Persist
    const citationsJson = JSON.stringify(kept.map((k) => ({
      sourceId: k.sourceId,
      chunkId: k.chunkId,
      documentId: k.documentId,
      title: k.title,
      fileKind: k.fileKind,
      quote: buildCitationQuote(String(k.content), `${questionText} ${answerText}`, 400),
      chunkContent: String(k.content),
      answerCoverage: Number(k.coverage.toFixed(2)),
      judgeScore: k.judgeScore,
    })));
    await db.question.update({
      where: { id: q.id },
      data: {
        citations: citationsJson,
        knowledgeSourceIds: JSON.stringify([...new Set(kept.map((k) => k.sourceId))]),
        sources: JSON.stringify(kept.map((k) => ({ type: 'library', title: k.title }))),
      },
    });
    if (kept.length === 0) dropped++;
    else if (status === 'unchanged') unchanged++;
    else repaired++;
    console.log('');
  }

  console.log(`SUMMARY — repaired: ${repaired}, unchanged: ${unchanged}, dropped: ${dropped}`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
