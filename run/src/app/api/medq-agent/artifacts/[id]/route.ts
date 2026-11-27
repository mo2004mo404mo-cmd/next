/**
 * Agent artifact download API.
 *
 * GET /api/medq-agent/artifacts/[id]
 *
 * Serves one generated artifact (study guide, cheat sheet, spreadsheet,
 * chart, image, office file…) for its owner:
 *   • inline-text artifacts (markdown/html/csv/json) → streamed with the
 *     stored mimeType + a download Content-Disposition (filename sanitized);
 *     add ?inline=1 to serve inline instead — that's what the chat timeline's
 *     file-card preview iframe uses (browsers refuse to render attachments)
 *   • binary artifacts (images/PDFs written to public/generated/, office
 *     files) → 302 redirect to their stored URL
 *
 * Every tool result that references downloadUrl points here — this route is
 * what makes those links actually download something. Ownership: artifacts
 * created by guests (userId null) are downloadable by id (unguessable cuid);
 * artifacts with a userId are restricted to that user.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { createLogger } from '@/lib/logger';

const log = createLogger('ArtifactAPI');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id || !/^[a-zA-Z0-9-]{10,64}$/.test(id)) {
    return NextResponse.json({ error: 'Invalid artifact id' }, { status: 400 });
  }

  const artifact = await db.agentArtifact.findUnique({ where: { id } });
  if (!artifact) {
    return NextResponse.json({ error: 'Artifact not found' }, { status: 404 });
  }

  // Ownership gate — cuids are unguessable, but an owned artifact must still
  // only be downloadable by its owner.
  if (artifact.userId) {
    const userId = await resolveUserId().catch(() => null);
    if (userId !== artifact.userId) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  }

  // Binary artifacts live on disk under public/generated — redirect.
  if (!artifact.content && artifact.url) {
    log.info?.(`Artifact ${id} → redirect ${artifact.url}`);
    return NextResponse.redirect(new URL(artifact.url, _request.nextUrl.origin), 302);
  }

  if (artifact.content == null) {
    return NextResponse.json({ error: 'Artifact has no stored content' }, { status: 410 });
  }

  // Inline text artifact → attachment download.
  const extension =
    artifact.kind === 'markdown' || artifact.kind === 'document' ? '.md'
    : artifact.kind === 'html' ? '.html'
    : artifact.kind === 'csv' ? '.csv'
    : artifact.kind === 'json' || artifact.kind === 'chart' ? '.json'
    : artifact.kind === 'image' ? '.png'
    : '.txt';

  const fileName = `${artifact.name.replace(/[/\\?%*:|"<>]/g, '-')}${extension}`;
  log.info?.(`Artifact ${id} → ${_request.nextUrl.searchParams.get('inline') ? 'inline preview' : 'inline download'} "${fileName}" (${artifact.sizeBytes}B)`);

  return new NextResponse(artifact.content, {
    status: 200,
    headers: {
      'Content-Type': `${artifact.mimeType}; charset=utf-8`,
      'Content-Disposition': `${_request.nextUrl.searchParams.get('inline') ? 'inline' : 'attachment'}; filename="${fileName}"`,
      'Cache-Control': 'private, max-age=60',
    },
  });
}
