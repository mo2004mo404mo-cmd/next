/**
 * POST /api/knowledge/drive/disconnect
 *   → { disconnected: boolean }
 *
 * Removes the stored Google Drive OAuth tokens (Account row) for the current
 * app user. Files already imported into the Knowledge Library are kept.
 */

import { NextResponse } from 'next/server';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { isDriveConfigured, disconnectDrive } from '@/lib/agent/knowledge/google-drive';

export const runtime = 'nodejs';

export const POST = withErrorHandler(async () => {
  if (!isDriveConfigured()) {
    return NextResponse.json({ error: 'Google Drive is not configured on this server.' }, { status: 400 });
  }
  const userId = await resolveUserId();
  const count = await disconnectDrive(userId);
  return NextResponse.json({ disconnected: count > 0 });
});
