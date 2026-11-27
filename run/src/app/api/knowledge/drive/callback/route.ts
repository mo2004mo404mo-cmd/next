/**
 * GET /api/knowledge/drive/callback?code=…&state=…
 *
 * OAuth redirect target: validates the state cookie, exchanges the code for
 * tokens, and stores them as an Account row (provider 'google-drive') for the
 * current app user. Redirects back to /generate with a drive=… query flag the
 * panel uses for toasts. Errors also redirect (Google redirects the BROWSER
 * here — a JSON error page would be useless to the user).
 */

import { NextRequest, NextResponse } from 'next/server';
import { resolveUserId } from '@/lib/auth-helpers';
import { createLogger } from '@/lib/logger';
import {
  isDriveConfigured,
  deriveRedirectUri,
  exchangeCodeForTokens,
  saveDriveConnection,
  STATE_COOKIE,
} from '@/lib/agent/knowledge/google-drive';

export const runtime = 'nodejs';

const log = createLogger('DriveCallback');

export async function GET(req: NextRequest) {
  const back = (flag: string) => {
    const res = NextResponse.redirect(new URL(`/generate?drive=${flag}`, req.url), 302);
    res.cookies.delete(STATE_COOKIE);
    return res;
  };

  try {
    if (!isDriveConfigured()) return back('unconfigured');

    const error = req.nextUrl.searchParams.get('error');
    if (error === 'access_denied') return back('denied');
    if (error) return back('error');

    const code = req.nextUrl.searchParams.get('code');
    const state = req.nextUrl.searchParams.get('state');
    const cookieState = req.cookies.get(STATE_COOKIE)?.value;
    if (!code || !state || !cookieState || state !== cookieState) {
      log.warn?.('OAuth state mismatch — ignoring callback');
      return back('state-mismatch');
    }

    const userId = await resolveUserId();
    const tokens = await exchangeCodeForTokens(code, deriveRedirectUri(req));
    const { email } = await saveDriveConnection(userId, tokens);
    log.info?.(`Drive OAuth complete for ${userId}${email ? ` (${email})` : ''}`);
    return back('connected');
  } catch (e) {
    log.error?.('Drive callback failed:', e);
    return back('error');
  }
}
