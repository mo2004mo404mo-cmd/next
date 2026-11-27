import { NextResponse, type NextRequest } from "next/server";

/**
 * Preview-proxy host normalization.
 *
 * The sandbox preview proxy (https://preview-chat-<id>.space-z.ai) reaches the
 * dev server through an internal tunnel (ws-*.fcapp.run). The tunnel forwards
 * every request with:
 *
 *   host / x-forwarded-host  = ws-*.fcapp.run   (the TUNNEL domain, not public)
 *   x-forwarded-proto        = http
 *   abc                      = preview-chat-<id> (the public subdomain)
 *   x-session-id             = chat-<id>
 *
 * Auth.js v5 builds absolute redirect URLs from x-forwarded-host +
 * x-forwarded-proto (@auth/core/lib/utils/env.js → createActionURL), so after
 * a successful signIn() the browser was being redirected to
 * http://ws-*.fcapp.run/ — a domain it cannot reach (tunnel endpoint answers
 * 400). Next.js server-action CSRF validation also compares origin against
 * these headers.
 *
 * This middleware detects the public preview host (from the browser's Origin
 * header on POSTs, or from the proxy's `abc` subdomain header on plain GETs)
 * and rewrites the forwarded headers to the public host so all absolute-URL
 * generation (auth redirects, OAuth callbacks, canonical URLs) points where
 * the browser can actually go.
 *
 * Local dev access (localhost / 127.0.0.1) is left completely untouched.
 */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  // Never rewrite for direct local access — preserve plain dev behavior.
  const currentForwardedHost = (
    request.headers.get("x-forwarded-host") ?? ""
  ).toLowerCase();
  if (
    currentForwardedHost.startsWith("localhost") ||
    currentForwardedHost.startsWith("127.")
  ) {
    return NextResponse.next({ request: { headers } });
  }

  let publicHost: string | null = null;

  // 1) Origin header (server-action POSTs, fetches with CORS mode) — the
  //    browser's own view of the host it is talking to. Most trustworthy.
  const origin = request.headers.get("origin");
  if (origin && origin !== "null") {
    try {
      const originUrl = new URL(origin);
      const hostname = originUrl.hostname.toLowerCase();
      if (
        hostname.startsWith("preview-chat-") ||
        hostname.endsWith(".space-z.ai")
      ) {
        publicHost = originUrl.host;
      }
    } catch {
      /* malformed origin — ignore */
    }
  }

  // 2) Proxy `abc` header (document GETs carry no Origin) — the proxy passes
  //    the public subdomain on every forwarded request.
  if (!publicHost) {
    const abc = (request.headers.get("abc") ?? "").trim().toLowerCase();
    if (abc && /^[a-z0-9][a-z0-9-]*$/.test(abc)) {
      publicHost = `${abc}.space-z.ai`;
    }
  }

  if (publicHost && currentForwardedHost !== publicHost) {
    headers.set("x-forwarded-host", publicHost);
    headers.set("x-forwarded-proto", "https");
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Run on everything except static assets — pages, API routes and
  // server-action POSTs all need the corrected forwarded headers.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|manifest.json|scripts/|generated/|sw.js).*)",
  ],
};
