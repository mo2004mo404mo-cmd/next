/**
 * GET /api/knowledge/drive/connect
 *
 * Starts the Google OAuth flow: sets a short-lived state cookie and redirects
 * to Google's consent screen. When no OAuth client is configured, returns a
 * 400 JSON with setup steps instead of redirecting.
 */

import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/api-handler';
import {
  isDriveConfigured,
  deriveRedirectUri,
  buildAuthUrl,
  STATE_COOKIE,
} from '@/lib/agent/knowledge/google-drive';

export const runtime = 'nodejs';

export const GET = withErrorHandler(async (req: Request) => {
  if (!isDriveConfigured()) {
    return NextResponse.json(
      {
        error: 'Google Drive import is not configured on this server yet.',
        setup: [
          '1. Open console.cloud.google.com → create (or pick) a project.',
          '2. APIs & Services → Library → enable the "Google Drive API".',
          '3. APIs & Services → OAuth consent screen → External → add your Google account as a test user.',
          '4. APIs & Services → Credentials → Create credentials → OAuth client ID → Web application.',
          `5. Add this Authorized redirect URI: ${deriveRedirectUri(req)}`,
          '6. Copy the Client ID and Client Secret into .env as GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, then restart the server.',
          '7. Click "Connect Google Drive" again.',
        ],
        redirectUri: deriveRedirectUri(req),
      },
      { status: 400 },
    );
  }

  const state = randomBytes(16).toString('hex');
  const redirectUri = deriveRedirectUri(req);
  const res = NextResponse.redirect(buildAuthUrl(redirectUri, state), 302);
  res.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });
  return res;
});
