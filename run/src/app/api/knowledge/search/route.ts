/**
 * Knowledge Library API — hybrid retrieval test endpoint.
 *
 * POST /api/knowledge/search
 *   Body: { query, sourceIds?: string[], topK?: number, expand?: boolean, rerank?: boolean }
 *   Returns: { chunks: [{content, contextSummary, documentTitle, scores…}], diagnostics }
 *
 * This is the RAG engine's window into the UI: the Library panel's "test
 * retrieval" box and the eval view both call it. It also writes a RagQueryLog
 * row (unless skipLog) for observability.
 */

import { NextRequest, NextResponse } from 'next/server';
import { resolveUserId, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { retrieveKnowledgeHybrid } from '@/lib/agent/knowledge/hybrid';

export const runtime = 'nodejs';
export const maxDuration = 120;

export const POST = withErrorHandler(async (req: NextRequest) => {
  const userId = await resolveUserId();
  const body = await req.json().catch(() => ({})) as {
    query?: unknown;
    sourceIds?: unknown;
    topK?: unknown;
    expand?: unknown;
    rerank?: unknown;
  };

  const query = typeof body.query === 'string' ? body.query.trim() : '';
  if (!query) return badRequest('query is required');
  if (query.length > 1000) return badRequest('query too long (max 1000 chars)');

  const sourceIds = Array.isArray(body.sourceIds)
    ? body.sourceIds.filter((s): s is string => typeof s === 'string').slice(0, 20)
    : undefined;

  const { chunks, diagnostics } = await retrieveKnowledgeHybrid(userId, query, {
    sourceIds,
    topK: typeof body.topK === 'number' ? body.topK : 8,
    expand: body.expand !== false,
    rerank: body.rerank !== false,
    request: req,
  });

  return NextResponse.json({
    chunks: chunks.map((c) => ({
      chunkId: c.chunkId,
      documentTitle: c.documentTitle,
      sourceId: c.sourceId,
      idx: c.idx,
      contextSummary: c.contextSummary ?? '',
      content: c.content.slice(0, 900),
      score: c.score,
      denseScore: c.denseScore,
      lexicalScore: c.lexicalScore,
      rerankScore: c.rerankScore,
      reranked: c.reranked ?? false,
    })),
    diagnostics,
  });
});
