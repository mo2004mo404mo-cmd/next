// ─────────────────────────────────────────────────────────────────────────
// server-url.ts — resolve absolute URLs from inside Server Components
// and Route Handlers.
//
// Why this exists:
//   Server Components and Route Handlers run on the server, where there is
//   no `window.location`. Calling fetch('/api/foo') from a server component
//   fails because the fetch needs an absolute URL. Setting NEXTAUTH_URL is
//   one workaround, but it breaks multi-domain deployments and local tunnelling.
//   Instead we read the Host header (and X-Forwarded-Proto when behind a
//   proxy) so the same code works on localhost, in production, and behind
//   any reverse proxy.
//
// Reference: Next.js App Router docs, "Static and Dynamic Rendering > Dynamic
//   Rendering > Headers" — reading headers() opts the route into dynamic
//   rendering, which is what we want for any page that fetches user-specific
//   data.
// ─────────────────────────────────────────────────────────────────────────

import { headers } from 'next/headers';

/**
 * Returns the absolute base URL of the current request.
 *
 * Uses the Host header (or X-Forwarded-Host when behind a proxy).
 * Protocol is http: on localhost, https: in production — overridable via
 * X-Forwarded-Proto (set by Cloudflare, nginx, Caddy, etc).
 *
 * Example:
 *   const url = `${await getBaseUrl()}/api/qotd`;
 *   const res = await fetch(url, { cache: 'no-store' });
 */
export async function getBaseUrl(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host') ?? 'localhost:3000';
  const proto = headerList.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

/**
 * Builds an absolute URL for an internal path on the current deployment.
 *
 *   const url = await buildAbsoluteUrl('/api/qotd');
 *   // → 'http://localhost:3000/api/qotd'  (dev)
 *   // → 'https://medq.app/api/qotd'       (prod)
 *
 * Query string may be included in `path`:
 *   await buildAbsoluteUrl('/api/notifications?unread=true')
 */
export async function buildAbsoluteUrl(path: string): Promise<string> {
  if (/^https?:\/\//i.test(path)) return path; // already absolute
  const base = await getBaseUrl();
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}
