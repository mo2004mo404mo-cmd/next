/**
 * Agent artifact PDF preview API.
 *
 * GET /api/medq-agent/artifacts/[id]/pdf
 *
 * Inline PDF preview for office artifacts (docx/xlsx/pptx): converts the
 * stored binary to PDF via headless LibreOffice (soffice) and streams it
 * with Content-Disposition inline so the chat timeline can embed it in an
 * <iframe>/<object>. Already-PDF artifacts redirect to their stored URL.
 *
 * Conversion results are cached on disk (public/generated/artifact-<id>.pdf)
 * so repeat previews are instant; a failed conversion falls back to the raw
 * file download instead of a dead link.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { createLogger } from '@/lib/logger';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';

const execFileAsync = promisify(execFile);
const log = createLogger('ArtifactPdfAPI');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const GENERATED_DIR = path.join(process.cwd(), 'public', 'generated');

const OFFICE_MIME_HINTS: Array<[RegExp, string]> = [
  [/wordprocessingml/, 'docx'],
  [/spreadsheetml/, 'xlsx'],
  [/presentationml/, 'pptx'],
];

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

  if (artifact.userId) {
    const userId = await resolveUserId().catch(() => null);
    if (userId !== artifact.userId) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  }

  // PDFs (and anything without a URL) — redirect to the canonical download.
  if (artifact.mimeType.includes('pdf') || !artifact.url) {
    return NextResponse.redirect(
      new URL(artifact.url ?? `/api/medq-agent/artifacts/${artifact.id}`, _request.nextUrl.origin),
      302,
    );
  }

  const sourcePath = path.join(GENERATED_DIR, path.basename(artifact.url));
  if (!fs.existsSync(sourcePath)) {
    return NextResponse.json({ error: 'Artifact file is no longer on disk' }, { status: 410 });
  }

  // Cached conversion?
  const cachedPath = path.join(GENERATED_DIR, `artifact-${id}.pdf`);
  if (fs.existsSync(cachedPath)) {
    return streamPdf(cachedPath);
  }

  // Only office containers make sense to convert; anything else redirects.
  const hint = OFFICE_MIME_HINTS.find(([re]) => re.test(artifact.mimeType));
  if (!hint) {
    return NextResponse.redirect(new URL(artifact.url, _request.nextUrl.origin), 302);
  }

  try {
    // soffice writes <basename>.pdf into the outdir; run inside a scratch dir
    // so concurrent conversions can't collide, then move to the cache name.
    const tmpDir = path.join(GENERATED_DIR, `.pdfconv-${id}-${Date.now()}`);
    fs.mkdirSync(tmpDir, { recursive: true });
    try {
      await execFileAsync(
        'soffice',
        ['--headless', '--norestore', '--convert-to', 'pdf', '--outdir', tmpDir, sourcePath],
        { timeout: 50_000 },
      );
      const produced = path.join(tmpDir, `${path.basename(sourcePath, path.extname(sourcePath))}.pdf`);
      if (!fs.existsSync(produced)) throw new Error('soffice produced no PDF');
      fs.copyFileSync(produced, cachedPath);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
    log.info?.(`Artifact ${id} converted to PDF (${artifact.mimeType})`);
    return streamPdf(cachedPath);
  } catch (error) {
    log.warn?.(`Artifact ${id} PDF conversion failed: ${error instanceof Error ? error.message : error}`);
    // Never dead-end the UI — hand back the original file instead.
    return NextResponse.redirect(new URL(artifact.url, _request.nextUrl.origin), 302);
  }
}

function streamPdf(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
      'Content-Length': String(buffer.byteLength),
      'Cache-Control': 'private, max-age=3600',
    },
  });
}
