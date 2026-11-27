/**
 * POST /api/uploads — open a resumable upload session (Stage 13).
 *
 * Body: { fileName, size, mimeType } → { uploadId, chunkSize, totalChunks,
 * receivedChunks: [], missingChunks, maxBytes }
 *
 * The caller's tier cap is applied HERE, up front, so a visitor can never
 * open a 100 MB session and discover the cap after uploading 98 MB (the old
 * UX failure mode). Chunk PUTs then only validate chunk shape.
 */

import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { uploadStore, UploadSessionError, DEFAULT_MAX_AGE_MS } from '@/lib/uploads/upload-session-store';
import { resolveAccessTier, thresholdFor } from '@/lib/subscription/visitor-strategy';
import { createLogger } from '@/lib/logger';

const log = createLogger('ApiUploads');

export const runtime = 'nodejs';

// Absolute ceiling across all tiers — parity with /api/extract (Stage 10).
const ABSOLUTE_MAX_BYTES = 100 * 1024 * 1024;

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to upload files');

  const body = await req.json().catch(() => null) as
    | { fileName?: unknown; size?: unknown; mimeType?: unknown }
    | null;
  if (!body || typeof body !== 'object') {
    return badRequest('Expected a JSON body: { fileName, size, mimeType }');
  }

  const tier = await resolveAccessTier(userId);
  const tierConfig = thresholdFor(tier);
  const maxBytes = Math.min(tierConfig.fileUploadMaxMb * 1024 * 1024, ABSOLUTE_MAX_BYTES);

  try {
    const session = uploadStore.init({
      userId,
      fileName: typeof body.fileName === 'string' ? body.fileName : '',
      mimeType: typeof body.mimeType === 'string' ? body.mimeType : '',
      size: typeof body.size === 'number' ? body.size : -1,
      maxBytes,
    });
    // Opportunistic hygiene — never blocks the response.
    try {
      uploadStore.sweep(DEFAULT_MAX_AGE_MS);
    } catch {
      /* best-effort */
    }
    log.info?.(
      `session ${session.uploadId} opened: "${session.fileName}" ${session.size}B in ` +
      `${session.totalChunks} chunks (cap ${Math.round(maxBytes / 1024 / 1024)}MB) by ${userId}`,
    );
    return NextResponse.json({ ...session, maxBytes });
  } catch (error) {
    if (error instanceof UploadSessionError) {
      const hint =
        error.code === 'too_large' && tierConfig.isAnonymous
          ? ` — sign up for a free account to upload files up to ${thresholdFor('free').fileUploadMaxMb}MB`
          : '';
      return NextResponse.json({ error: `${error.message}${hint}`, code: error.code }, {
        status: error.code === 'too_large' ? 413 : 400,
      });
    }
    throw error;
  }
});
