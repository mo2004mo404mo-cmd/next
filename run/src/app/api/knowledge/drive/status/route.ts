/**
 * GET /api/knowledge/drive/status
 *   → { configured, connected, email?, name?, redirectUri }
 *
 * The panel uses this to decide between "Connect Google Drive" (OAuth client
 * configured) and the setup guide (not configured — shows the exact redirect
 * URI to register in Google Cloud Console).
 */

import { NextResponse } from 'next/server';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import {
  isDriveConfigured,
  deriveRedirectUri,
  getDriveConnection,
} from '@/lib/agent/knowledge/google-drive';

export const runtime = 'nodejs';

export const GET = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  const configured = isDriveConfigured();
  const connection = configured ? await getDriveConnection(userId).catch(() => null) : null;
  return NextResponse.json({
    configured,
    connected: Boolean(connection),
    email: connection?.email,
    name: connection?.name,
    redirectUri: deriveRedirectUri(req),
  });
});
