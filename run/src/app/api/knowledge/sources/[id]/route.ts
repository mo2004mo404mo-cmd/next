/**
 * Knowledge Library API — single source management.
 *
 * DELETE /api/knowledge/sources/[id] — delete a source and all its
 *                                     documents/chunks (cascade)
 * GET    /api/knowledge/sources/[id] — source detail incl. stored content
 *                                      preview and sample chunks.
 *                                      ?full=1 → complete stored content
 *                                      (what the file viewer shows).
 *                                      ?chunks=all → every indexed passage
 *                                      instead of the 5-chunk sample.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, notFound, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { deleteKnowledgeSource } from '@/lib/agent/knowledge/pipeline';
import { retainedOriginalPath, resolveServeMime } from '@/lib/agent/knowledge/file-store';

export const runtime = 'nodejs';

export const DELETE = withErrorHandler(async (_req: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const userId = await resolveUserId();
  const { id } = await ctx.params;
  if (!id) return badRequest('Source id is required');

  const deleted = await deleteKnowledgeSource(userId, id);
  if (!deleted) return notFound('Source not found');
  return NextResponse.json({ ok: true });
});

export const GET = withErrorHandler(async (_req: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const userId = await resolveUserId();
  const { id } = await ctx.params;
  if (!id) return badRequest('Source id is required');

  const source = await db.knowledgeSource.findFirst({
    where: { id, userId },
    include: {
      documents: {
        select: { id: true, title: true, mimeType: true, sizeBytes: true, chunkCount: true },
      },
    },
  });
  if (!source) return notFound('Source not found');

  const wantFull = _req.nextUrl.searchParams.get('full') === '1';
  const wantAllChunks = _req.nextUrl.searchParams.get('chunks') === 'all';

  const chunks = await db.knowledgeChunk.findMany({
    where: { sourceId: id },
    orderBy: { idx: 'asc' },
    // id included so citation chips can point at the exact passage
    select: { id: true, idx: true, content: true, contextSummary: true, embeddingModel: true },
    take: wantAllChunks ? 500 : 5,
  });

  const document = source.documents[0];
  const documentRow = document
    ? await db.knowledgeDocument.findUnique({
        where: { id: document.id },
        select: { content: true, chunkCount: true, mimeType: true, sizeBytes: true },
      })
    : null;

  // full=1 → the whole stored text (already capped at ingestion, ~100k chars);
  // default → the 3k preview (kept for lightweight status checks).
  const contentText = documentRow?.content || '';

  // Original-file availability + resolved serve mime — powers the "Original
  // file" tab (PDF viewer / image / audio / video) and the download button.
  const originalPath = retainedOriginalPath(source.id);
  const hasOriginal = originalPath !== null;
  const originalMime = originalPath ? resolveServeMime(originalPath, source.metaJson) : '';

  return NextResponse.json({
    source: {
      id: source.id,
      name: source.name,
      type: source.type,
      fileKind: source.fileKind,
      status: source.status,
      error: source.error,
      meta: source.metaJson ? safeParse(source.metaJson) : null,
      createdAt: source.createdAt.toISOString(),
      documents: source.documents,
      hasOriginal,
      ...(hasOriginal ? { originalMime } : {}),
    },
    preview: contentText.slice(0, 3000),
    ...(wantFull
      ? {
          content: contentText,
          contentTruncated: contentText.length >= 100_000,
          chunkTotal: documentRow?.chunkCount ?? chunks.length,
        }
      : {}),
    [wantAllChunks ? 'chunks' : 'sampleChunks']: chunks,
  });
});

function safeParse(json: string): Record<string, unknown> | null {
  try {
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}
