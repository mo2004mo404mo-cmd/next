/**
 * Knowledge Library — ORIGINAL file serving.
 *
 * GET /api/knowledge/sources/[id]/file
 *   Streams the original bytes retained at ingestion time (upload/file-store,
 *   falling back to upload/audio-store for audio sources). Owner-gated.
 *   Supports HTTP Range requests (206) so <audio>/<video> elements and PDF
 *   viewers can seek.
 *
 *   ?download=1 → Content-Disposition: attachment (download button)
 *   otherwise   → Content-Disposition: inline (PDF viewer / <img> / players)
 *
 * Used by:
 *   - QuestionCard media: questions generated from the user's own files point
 *     imageUrl/audioUrl/videoUrl here ("show my X-ray and ask about it").
 *   - SourceViewerModal "Original file" tab — PDFs render in the browser's
 *     embedded PDF viewer (Adobe-like: zoom, search, page navigation),
 *     images full-size, audio/video in native players.
 *   - Citation "view original" alongside the highlighted passage.
 *
 * Sources uploaded before original-retention existed (or Google-native Drive
 * exports that were never downloaded as binary) → 404 with an explanatory
 * message; the extracted text remains available via the detail endpoint.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import { db } from '@/lib/db';
import { resolveUserId, notFound, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { retainedOriginalPath, resolveServeMime } from '@/lib/agent/knowledge/file-store';

export const runtime = 'nodejs';

/** Browser-suggested filename from meta.originalName, sanitized. */
function resolveDownloadName(metaJson: string | null, fallbackId: string): string {
  try {
    const meta = metaJson ? (JSON.parse(metaJson) as Record<string, unknown>) : {};
    const declared = meta.originalName;
    if (typeof declared === 'string' && declared.trim()) {
      // strip path separators + control chars someone could smuggle in
      return declared.replace(/[\\/\x00-\x1f]/g, '_').slice(0, 120);
    }
  } catch {
    // fall through
  }
  return `medq-source-${fallbackId.slice(-8)}.bin`;
}

export const GET = withErrorHandler(async (req: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const userId = await resolveUserId();
  const { id } = await ctx.params;
  if (!id) return badRequest('Source id is required');

  const source = await db.knowledgeSource.findFirst({
    where: { id, userId },
    select: { id: true, metaJson: true, name: true },
  });
  if (!source) return notFound('Source not found');

  const file = retainedOriginalPath(id);
  if (!file) {
    return notFound('The original file was not retained for this source (older uploads store only the extracted text).');
  }

  const { statSync } = await import('fs');
  const stat = statSync(file);
  const mime = resolveServeMime(file, source.metaJson);
  const download = req.nextUrl.searchParams.get('download') === '1';
  const fileName = resolveDownloadName(source.metaJson, source.id);

  const baseHeaders: Record<string, string> = {
    'Content-Type': mime,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'private, max-age=3600',
    'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="${fileName}"`,
    'X-Content-Type-Options': 'nosniff',
  };

  const rangeHeader = req.headers.get('range');
  const rangeMatch = rangeHeader?.match(/bytes=(\d*)-(\d*)/);
  if (rangeMatch) {
    const start = rangeMatch[1] ? Number.parseInt(rangeMatch[1], 10) : 0;
    const end = rangeMatch[2]
      ? Math.min(Number.parseInt(rangeMatch[2], 10), stat.size - 1)
      : stat.size - 1;
    if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= stat.size) {
      return new NextResponse(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${stat.size}` },
      });
    }
    const stream = createReadStream(file, { start, end });
    return new NextResponse(Readable.toWeb(stream) as unknown as ReadableStream, {
      status: 206,
      headers: {
        ...baseHeaders,
        'Content-Length': String(end - start + 1),
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      },
    });
  }

  const stream = createReadStream(file);
  return new NextResponse(Readable.toWeb(stream) as unknown as ReadableStream, {
    status: 200,
    headers: { ...baseHeaders, 'Content-Length': String(stat.size) },
  });
});
