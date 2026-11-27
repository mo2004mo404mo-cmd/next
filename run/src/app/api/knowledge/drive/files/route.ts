/**
 * GET /api/knowledge/drive/files?q=&pageToken=
 *   → { files: [{ id, name, mimeType, size?, modifiedTime? }], nextPageToken? }
 *
 * Lists the CONNECTED user's Drive files (name search, newest first, folders
 * excluded). 400 when Drive isn't configured; 409 when not connected.
 */

import { NextResponse } from 'next/server';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { isDriveConfigured, listDriveFiles } from '@/lib/agent/knowledge/google-drive';

export const runtime = 'nodejs';

export const GET = withErrorHandler(async (req: Request) => {
  if (!isDriveConfigured()) {
    return NextResponse.json({ error: 'Google Drive is not configured on this server (missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET).' }, { status: 400 });
  }
  const userId = await resolveUserId();
  try {
    const q = new URL(req.url).searchParams.get('q') || '';
    const pageToken = new URL(req.url).searchParams.get('pageToken') || undefined;
    const result = await listDriveFiles(userId, q, pageToken);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const status = message.includes('not connected') ? 409 : 502;
    return NextResponse.json({ error: message }, { status });
  }
});
