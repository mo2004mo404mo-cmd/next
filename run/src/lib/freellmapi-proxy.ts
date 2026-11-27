/**
 * Reverse proxy for the embedded FreeLLM API AI Router.
 *
 * The complete freellmapi suite (dashboard, /api admin surface, OpenAI-style
 * /v1 LLM endpoint, SSE streams) is served by the sidecar's Express app,
 * which since the #MEDQ-embedded change runs INSIDE this Next.js process
 * (booted by instrumentation on an ephemeral loopback port). MedQ mounts it
 * in-app under /freellmapi/* (the client bundle is built with
 * VITE_BASE=/freellmapi/ so every asset, route and fetch already carries the
 * prefix) and additionally exposes the wire endpoint at /v1/* so the "Base
 * URL" the dashboard shows (origin + /v1) works verbatim in curl, agents and
 * OpenAI-compatible clients. Upstream resolution lives in
 * ./freellmapi-embedded (embedded port → FREELLMAPI_UPSTREAM override →
 * legacy 3002 fallback).
 *
 * Design notes:
 *  - Streams both ways: request bodies are piped (duplex: 'half') and the
 *    upstream Response body is returned untouched, so /v1/chat/completions
 *    SSE token streams pass through unbuffered.
 *  - `accept-encoding: identity` upstream + stripping content-encoding /
 *    content-length on the way back: undici auto-decompresses, so forwarding
 *    those headers would corrupt the body; identity keeps lengths valid and
 *    everything stays localhost-bandwidth anyway.
 *  - Hop-by-hop headers are dropped in both directions per RFC 7230 §6.1.
 *  - 'x-forwarded-*' is NOT injected: the sidecar runs with trust proxy
 *    disabled, so every request appears to come from loopback — which is
 *    what keeps the dashboard's first-run setup code-free (see
 *    freellmapi/server/src/routes/auth.ts isLoopbackRemote).
 */

import { freellmapiUpstream } from './freellmapi-embedded';

// Headers that must never survive a proxy hop (RFC 7230 §6.1) plus framing
// headers that describe the upstream connection, not the response we rebuild.
const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-encoding',
  'content-length',
]);

function isHopByHop(name: string): boolean {
  return HOP_BY_HOP.has(name.toLowerCase());
}

/**
 * Forward a MedQ-origin request to the sidecar.
 *
 * @param req     the incoming Next.js route-handler Request
 * @param prefix  mount prefix to strip ('/freellmapi' for the dashboard
 *                mount, '' for the bare /v1 wire mount)
 */
export async function proxyToFreellmapi(req: Request, prefix: string): Promise<Response> {
  const incoming = new URL(req.url);
  // Resolved per-request: the embedded port is assigned during instrumentation
  // (before any traffic) and an operator's FREELLMAPI_UPSTREAM override must
  // be honoured without a restart.
  const UPSTREAM = freellmapiUpstream();

  // Strip the mount prefix so /freellmapi/api/keys → /api/keys upstream.
  let subPath = incoming.pathname;
  if (prefix) {
    const bare = prefix.replace(/\/+$/, '');
    if (subPath === bare || subPath === `${bare}/`) {
      subPath = '/';
    } else if (subPath.startsWith(`${bare}/`)) {
      subPath = subPath.slice(bare.length);
    }
  }

  let target: URL;
  try {
    target = new URL(subPath + incoming.search, UPSTREAM);
  } catch {
    return Response.json(
      { error: { message: `Invalid proxy path: ${incoming.pathname}`, type: 'invalid_request_error' } },
      { status: 400 },
    );
  }

  // Copy the browser's headers minus hop-by-hop; force identity encoding and
  // the sidecar host so Express routes/vhosts behave as if called directly.
  const headers = new Headers();
  req.headers.forEach((value, name) => {
    if (isHopByHop(name) || name.toLowerCase() === 'accept-encoding') return;
    headers.set(name, value);
  });
  headers.set('accept-encoding', 'identity');
  try {
    headers.set('host', new URL(UPSTREAM).host);
  } catch {
    /* keep original host on malformed UPSTREAM — fetch will still target it */
  }

  const method = req.method.toUpperCase();
  const init: RequestInit & { duplex?: 'half' } = {
    method,
    headers,
    redirect: 'manual',
  };
  // Streaming bodies need duplex:'half' (undici). GET/HEAD must not carry one.
  if (method !== 'GET' && method !== 'HEAD') {
    init.body = req.body ?? undefined;
    if (init.body) init.duplex = 'half';
  }

  let upstream: Response;
  try {
    upstream = await fetch(target, init as RequestInit);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json(
      {
        error: {
          message: `FreeLLM API (AI Router) unreachable (${message}). It is embedded in this app and starts with it — check the server startup logs for '[freellmapi]' lines.`,
          type: 'api_unreachable',
        },
      },
      { status: 502 },
    );
  }

  // Rebuild response headers: drop hop-by-hop + framing headers (undici has
  // already transparently decompressed if the upstream compressed anyway).
  const respHeaders = new Headers();
  upstream.headers.forEach((value, name) => {
    if (isHopByHop(name)) return;
    respHeaders.set(name, value);
  });

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: respHeaders,
  });
}
