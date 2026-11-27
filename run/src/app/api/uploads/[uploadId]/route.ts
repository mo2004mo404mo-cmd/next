/**
 * GET /api/uploads/:uploadId — session status (Stage 13).
 *
 * The resume primitive: reports which chunks the server already holds, so a
 * client that reconnected, refreshed, or re-picked the same file skips them.
 * Foreign sessions are indistinguishable from missing ones (404).
 */

import { NextResponse } from 'next/server';
import { resolveUserId, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { uploadStore } from '@/lib/uploads/upload-session-store';

export const runtime = 'nodejs';

export const GET = withErrorHandler<{ uploadId: string }>(async (req, ctx) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to upload files');

  const session = uploadStore.get(ctx.params.uploadId, userId);
  if (!session) {
    return NextResponse.json({ error: 'Upload session not found' }, { status: 404 });
  }
  return NextResponse.json(session);
});
