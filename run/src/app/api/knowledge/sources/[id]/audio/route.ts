/**
 * Knowledge Library API — retained audio playback stream.
 *
 * GET /api/knowledge/sources/[id]/audio
 *   Serves the ORIGINAL audio bytes kept at ingestion time (audio sources
 *   only — see audio-pipeline.ts retainAudioFile). Owner-gated. Supports
 *   HTTP Range requests (206) so <audio> elements can seek — Safari probes
 *   with "Range: bytes=0-1" and REQUIRES a 206 answer to play at all.
 *
 *   Sources uploaded before the advanced-transcription upgrade did not
 *   retain audio → 404 with an explanatory message (the transcript itself
 *   is still available via the detail endpoint).
 */

import { NextRequest, NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import fs from 'fs';
import { Readable } from 'stream';
import { db } from '@/lib/db';
import { resolveUserId, notFound, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { audioStorePath, sniffAudioMime } from '@/lib/agent/knowledge/audio-pipeline';

export const runtime = 'nodejs';

function resolveMime(file: string, metaJson: string | null): string {
  try {
    const meta = metaJson ? (JSON.parse(metaJson) as Record<string, unknown>) : {};
    const declared = meta.audioMime;
    if (typeof declared === 'string' && declared.startsWith('audio/')) return declared;
  } catch {
    // fall through to sniffing
  }
  const head = Buffer.alloc(16);
  const fd = fs.openSync(file, 'r');
  try {
    fs.readSync(fd, head, 0, 16, 0);
  } finally {
    fs.closeSync(fd);
  }
  const sniffed = sniffAudioMime(head);
  return sniffed !== 'application/octet-stream' ? sniffed : 'audio/mpeg';
}

export const GET = withErrorHandler(async (req: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const userId = await resolveUserId();
  const { id } = await ctx.params;
  if (!id) return badRequest('Source id is required');

  const source = await db.knowledgeSource.findFirst({
    where: { id, userId },
    select: { id: true, metaJson: true },
  });
  if (!source) return notFound('Source not found');

  const file = audioStorePath(id);
  if (!fs.existsSync(file)) {
    return notFound('No retained audio for this source (uploads from before the advanced transcription upgrade are not stored).');
  }

  const stat = fs.statSync(file);
  const mime = resolveMime(file, source.metaJson);

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
        'Content-Type': mime,
        'Content-Length': String(end - start + 1),
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'private, max-age=3600',
      },
    });
  }

  const stream = createReadStream(file);
  return new NextResponse(Readable.toWeb(stream) as unknown as ReadableStream, {
    status: 200,
    headers: {
      'Content-Type': mime,
      'Content-Length': String(stat.size),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'private, max-age=3600',
    },
  });
});
