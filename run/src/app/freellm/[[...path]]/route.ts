/**
 * /freellm/* — the complete MedQ AI Router dashboard, at its own short URL.
 *
 * Identical app to the /freellmapi mount (the freellmapi sidecar's rebranded
 * client), built as a second bundle with VITE_BASE=/freellm/ so every asset,
 * route and fetch carries THIS prefix. The split:
 *
 *   • /frellm/api/*, /freellm/v1/*, /freellm/livez → proxied to the
 *     embedded in-process AI Router (same proxy the /freellmapi mount uses), so the
 *     dashboard's admin surface, OpenAI-wire endpoint and SSE streams behave
 *     exactly as before — including Bearer auth with the bridge token.
 *   • everything else → static files from freellmapi/client/dist-freellm,
 *     with the SPA fallback (any client-side route serves index.html).
 *
 * The auth experience is seamless: the dashboard's auth-gate silently POSTs
 * the MedQ bridge (/api/freellmapi-bridge, origin-absolute) with the MedQ
 * session cookie, so a signed-in MedQ user lands straight in the dashboard —
 * no second login, no "separate app" feel.
 *
 * Optional catch-all [[...path]] so bare /freellm serves the SPA root.
 */

import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { proxyToFreellmapi } from '@/lib/freellmapi-proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DIST = path.join(process.cwd(), 'freellmapi', 'client', 'dist-freellm');

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

type Ctx = { params: Promise<{ path?: string[] }> };

function staticHeaders(file: string): Headers {
  const h = new Headers();
  h.set('content-type', MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream');
  if (file.startsWith(`${DIST}${path.sep}assets${path.sep}`)) {
    // Content-hashed Vite output — safe to cache forever.
    h.set('cache-control', 'public, max-age=31536000, immutable');
  } else {
    // index.html and root files must revalidate so deploys show up instantly.
    h.set('cache-control', 'no-store');
  }
  return h;
}

async function serveFile(file: string, headOnly: boolean): Promise<Response> {
  const st = await stat(file).catch(() => null);
  if (!st || !st.isFile()) throw new Error('missing');
  const buf = await readFile(file);
  const headers = staticHeaders(file);
  headers.set('content-length', String(st.size));
  return new Response(headOnly ? null : new Uint8Array(buf), { status: 200, headers });
}

async function serveIndex(headOnly: boolean): Promise<Response> {
  return serveFile(path.join(DIST, 'index.html'), headOnly);
}

async function handle(req: Request, ctx: Ctx): Promise<Response> {
  const { path: segs } = await ctx.params;
  const sub = (segs ?? []).map((s) => decodeURIComponent(s)).join('/');
  const method = req.method.toUpperCase();

  // 1. The sidecar surface: dashboard admin API, OpenAI-wire /v1 (SSE streams
  //    pass through unbuffered), and the liveness probe.
  if (sub === 'livez' || sub.startsWith('api/') || sub.startsWith('v1/')) {
    return proxyToFreellmapi(req, '/freellm');
  }

  if (method !== 'GET' && method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { allow: 'GET, HEAD' } });
  }

  // 2. Static assets and SPA routes from the /freellm-based client bundle.
  if (sub) {
    const file = path.normalize(path.join(DIST, sub));
    // Containment: normalize() collapses traversal before the prefix check.
    if (file !== DIST && !file.startsWith(DIST + path.sep)) {
      return new Response(null, { status: 400 });
    }
    try {
      return await serveFile(file, method === 'HEAD');
    } catch {
      // Missing hashed asset → a genuine 404 (never HTML for /assets/*).
      if (sub.startsWith('assets/')) {
        return new Response(null, { status: 404 });
      }
      // Any other unknown path is a client-side route → SPA fallback.
      return serveIndex(method === 'HEAD');
    }
  }

  // 3. Bare /freellm → the SPA root.
  return serveIndex(method === 'HEAD');
}

export async function GET(req: Request, ctx: Ctx) {
  return handle(req, ctx);
}
export async function HEAD(req: Request, ctx: Ctx) {
  return handle(req, ctx);
}
export async function POST(req: Request, ctx: Ctx) {
  return handle(req, ctx);
}
export async function PUT(req: Request, ctx: Ctx) {
  return handle(req, ctx);
}
export async function PATCH(req: Request, ctx: Ctx) {
  return handle(req, ctx);
}
export async function DELETE(req: Request, ctx: Ctx) {
  return handle(req, ctx);
}
export async function OPTIONS(req: Request, ctx: Ctx) {
  return handle(req, ctx);
}
