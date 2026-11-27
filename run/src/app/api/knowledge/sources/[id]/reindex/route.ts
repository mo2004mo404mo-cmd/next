/**
 * POST /api/knowledge/sources/[id]/reindex — upgrade an already-ingested
 * source to the sentence-aware chunking + extraction normalization.
 *
 * Sources ingested with the old character-stride chunker carry mid-word /
 * mid-sentence cuts that surface in citations, the extracted-content viewer
 * and the LLM's retrieved context. This re-runs chunk → contextual-enrich →
 * embed on the best available text (retained original file → URL re-fetch →
 * complete stored content) and replaces the source's chunks in place — same
 * document row, same provenance, live progress in the library list.
 *
 * Eligibility: the source must belong to the caller and not be busy. Runs
 * in the background exactly like the retry route (the library panel polls
 * meta.progress); failures mark the source failed with the reason, which
 * the library row surfaces in red.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { reindexKnowledgeSource } from '@/lib/agent/knowledge/pipeline';

export const runtime = 'nodejs';
export const maxDuration = 300;

async function markSourceFailed(sourceId: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  try {
    await db.knowledgeSource.update({
      where: { id: sourceId },
      data: { status: 'failed', error: message.slice(0, 500) },
    });
  } catch { /* best-effort */ }
}

export const POST = withErrorHandler(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const userId = await resolveUserId();

  const source = await db.knowledgeSource.findUnique({ where: { id } });
  if (!source || source.userId !== userId) return badRequest('Source not found');
  if (source.status === 'pending' || source.status === 'processing') {
    return badRequest('This source is already indexing — wait for it to finish');
  }
  const doc = await db.knowledgeDocument.findFirst({ where: { sourceId: id }, select: { id: true } });
  if (!doc) return badRequest('No indexed document found for this source — add the file again');

  // reindexKnowledgeSource flips the row to processing itself (and reports
  // live stage progress); this handler returns immediately so the library
  // row's spinner + progress bar take over via the existing poll.
  void reindexKnowledgeSource(userId, id).catch((error) => {
    void markSourceFailed(id, error);
  });

  return NextResponse.json({ sourceId: id, status: 'processing' });
});
