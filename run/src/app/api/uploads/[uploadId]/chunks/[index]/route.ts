/**
 * PUT /api/uploads/:uploadId/chunks/:index — one idempotent chunk (Stage 13).
 *
 * Raw binary body (application/octet-stream). The expected byte length is
 * derived from the session manifest (chunkSize / total size), so the
 * assembled file can never exceed the declared, tier-capped size.
 *
 * Re-PUTting an already-received chunk is a 200 no-op — that is exactly what
 * makes retries and resumes safe.
 */

import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { uploadStore, UploadSessionError, type UploadSessionErrorCode } from '@/lib/uploads/upload-session-store';

export const runtime = 'nodejs';

function statusForCode(code: UploadSessionErrorCode): number {
  switch (code) {
    case 'not_found':
      return 404; // foreign session looks like a missing one — no leak
    case 'too_large':
    case 'chunk_size_mismatch':
      return 413;
    case 'already_complete':
      return 409;
    case 'bad_index':
    case 'bad_request':
      return 400;
    default:
      return 400;
  }
}

export const PUT = withErrorHandler<{ uploadId: string; index: string }>(async (req, ctx) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to upload files');

  const raw = ctx.params.index;
  if (!/^[0-9]{1,6}$/.test(raw)) return badRequest('Invalid chunk index');
  const index = Number(raw);

  const buf = Buffer.from(await req.arrayBuffer());

  try {
    const status = uploadStore.saveChunk(ctx.params.uploadId, userId, index, buf);
    return NextResponse.json(status);
  } catch (error) {
    if (error instanceof UploadSessionError) {
      return NextResponse.json({ error: error.message, code: error.code }, {
        status: statusForCode(error.code),
      });
    }
    throw error;
  }
});
