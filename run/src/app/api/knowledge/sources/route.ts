/**
 * Knowledge Library API — ingestion from files, text, and URLs.
 *
 * POST /api/knowledge/sources            (JSON)    — paste text or ingest a URL
 * GET  /api/knowledge/sources            — list the user's sources with status
 *
 * Multipart uploads live at /api/knowledge/upload (larger bodies, own route).
 *
 * URL ingestion (type=url) responds IMMEDIATELY with a pending source row;
 * the download + parse + embed happen in a background job (same pattern as
 * the upload route). Supported: YouTube (yt-dlp audio → ASR), Google Drive /
 * Docs / Sheets share links, Dropbox links, direct file URLs, and plain
 * webpages. The client polls GET /api/knowledge/sources for progress.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { createAndIngestSource, listKnowledgeSources } from '@/lib/agent/knowledge/pipeline';
import { processExternalUrl, markSourceFailed } from '@/lib/agent/knowledge/process-url';

export const runtime = 'nodejs';
export const maxDuration = 300;

export const GET = withErrorHandler(async () => {
  const userId = await resolveUserId();
  const sources = await listKnowledgeSources(userId);
  return NextResponse.json({ sources });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const userId = await resolveUserId();
  const body = await req.json().catch(() => ({})) as {
    type?: unknown;
    content?: unknown;
    url?: unknown;
    title?: unknown;
  };

  const type = body.type === 'url' ? 'url' : body.type === 'text' ? 'text' : null;
  if (!type) return badRequest('type must be "text" or "url"');

  if (type === 'text') {
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    if (!content) return badRequest('content is required for type=text');
    if (content.length > 500_000) return badRequest('Text exceeds the 500k character limit');
    const { sourceId, result } = await createAndIngestSource({
      userId,
      name: typeof body.title === 'string' && body.title.trim() ? body.title.trim().slice(0, 200) : 'Pasted text',
      type: 'text',
      fileKind: 'text',
      payload: { content, title: typeof body.title === 'string' ? body.title : undefined },
    });
    return NextResponse.json({ sourceId, ...result });
  }

  const url = typeof body.url === 'string' ? body.url.trim() : '';
  if (!url || !/^https?:\/\//i.test(url)) return badRequest('A valid http(s) url is required');

  // Persist the original URL so a later retry can find it even after the
  // row's display name is replaced with the resolved title.
  const source = await db.knowledgeSource.create({
    data: {
      userId,
      name: url.slice(0, 200),
      type: 'url',
      status: 'pending',
      fileKind: 'url',
      metaJson: JSON.stringify({ sourceUrl: url }),
    },
  });

  // Fire-and-continue: download (yt-dlp / Drive / direct / webpage) then ingest.
  void processExternalUrl(userId, source.id, url).catch((error) => {
    void markSourceFailed(source.id, error);
  });

  return NextResponse.json({ sourceId: source.id, status: 'pending' });
});
