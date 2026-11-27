// ─────────────────────────────────────────────────────────────────────────
// csrf.ts — Origin/Referer check for non-GET API requests.
// ─────────────────────────────────────────────────────────────────────────
// NextAuth.js already protects its own endpoints (/api/auth/*) with a
// double-submit CSRF token. This helper covers the REST of /api/* —
// any POST/PUT/PATCH/DELETE that mutates server state.
//
// Strategy:
//   1. Allow same-origin requests (Origin header matches the request Host).
//   2. If Origin is missing, allow only if Referer is same-origin.
//   3. Otherwise reject with 403.
//
// This blocks the classic CSRF vector (a malicious site POSTing to your
// API while the user's cookies are attached) without breaking legitimate
// browser usage.
//
// Usage in a route handler:
//   import { checkCsrf } from '@/lib/security/csrf';
//   export const POST = withAuth(async (req) => {
//     const csrf = checkCsrf(req);
//     if (!csrf.ok) return csrf.response;
//     ...
//   });
// ─────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';

export interface CsrfResult {
  ok: boolean;
  response?: NextResponse;
}

function sameOrigin(a: string, b: string): boolean {
  try {
    const ua = new URL(a);
    const ub = new URL(b);
    return ua.origin === ub.origin;
  } catch {
    return false;
  }
}

/**
 * Returns true if this request is "safe" (GET/HEAD/OPTIONS) and doesn't
 * need CSRF protection.
 */
export function isSafeMethod(method: string): boolean {
  return ['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase());
}

/**
 * Check CSRF on a non-safe request. Returns ok=true if allowed.
 */
export function checkCsrf(req: Request): CsfrResultInternal {
  if (isSafeMethod(req.method)) return { ok: true };

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host');

  // Build the expected origin from the Host header.
  // For dev (no TLS) the expected scheme is http://, for prod https://.
  // We try both, since proxy/CDN schemes can vary.
  if (host) {
    const expectedHttps = `https://${host}`;
    const expectedHttp = `http://${host}`;
    if (origin) {
      if (origin === expectedHttps || origin === expectedHttp) return { ok: true };
      // Allow localhost variants for dev
      if (
        (host.startsWith('localhost') || host.startsWith('127.0.0.1')) &&
        (origin.startsWith('http://localhost') || origin.startsWith('https://localhost') ||
         origin.startsWith('http://127.0.0.1') || origin.startsWith('https://127.0.0.1'))
      ) {
        return { ok: true };
      }
    } else if (referer) {
      if (sameOrigin(referer, expectedHttps) || sameOrigin(referer, expectedHttp)) {
        return { ok: true };
      }
    } else {
      // No Origin and no Referer — allow only for same-server (e.g. fetch from
      // server components or cron). For browser requests this is suspicious;
      // browsers always send Origin (or Referer as fallback) on cross-site.
      // We accept this for non-browser clients (curl, server-side fetch).
      const userAgent = req.headers.get('user-agent') || '';
      if (!userAgent || userAgent.startsWith('node-fetch') || userAgent.startsWith('curl')) {
        return { ok: true };
      }
    }
  }

  return {
    ok: false,
    response: NextResponse.json(
      { error: 'CSRF check failed: invalid Origin' },
      { status: 403 },
    ),
  };
}

interface CsfrResultInternal {
  ok: boolean;
  response?: NextResponse;
}
