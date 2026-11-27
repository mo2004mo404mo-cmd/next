/**
 * POST /api/uploads/:uploadId/complete — assemble + verify (Stage 13).
 *
 * Concatenates the chunks in order, verifies the byte count against the
 * declared size, and flips the session to `complete`. After this, consumers
 * (/api/extract, /api/knowledge/upload) process the file BY REFERENCE via
 * the uploadId form field — no second full transfer.
 */

import { NextResponse } from 'next/server';
import { resolveUserId, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { uploadStore, UploadSessionError, type UploadSessionErrorCode } from '@/lib/uploads/upload-session-store';
import { createLogger } from '@/lib/logger';

const log = createLogger('ApiUploads');

export const runtime = 'nodejs';

function statusForCode(code: UploadSessionErrorCode): number {
  switch (code) {
    case 'not_found':
      return 404;
    case 'incomplete':
    case 'already_complete':
      return 409;
    case 'size_mismatch':
      return 500;
    default:
      return 400;
  }
}

export const POST = withErrorHandler<{ uploadId: string }>(async (req, ctx) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to upload files');

  try {
    const done = uploadStore.assemble(ctx.params.uploadId, userId);
    log.info?.(`session ${done.uploadId} complete: "${done.fileName}" ${done.size}B by ${userId}`);
    return NextResponse.json(done);
  } catch (error) {
    if (error instanceof UploadSessionError) {
      return NextResponse.json({ error: error.message, code: error.code }, {
        status: statusForCode(error.code),
      });
    }
    throw error;
  }
});
