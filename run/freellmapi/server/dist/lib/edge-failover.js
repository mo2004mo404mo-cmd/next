// Edge failover for direct provider fetches.
//
// A provider hostname can resolve to several edge IPs where only some are
// healthy — observed on the Z.AI gateway: one A record's ALB answered every
// long-running POST with a ~60s 502 while the other served the same requests
// in ~26s. undici pins a pooled connection to whichever address the first
// lookup returned, so an unlucky process (the embedded router inside
// next-server) can sit on the broken edge forever while fresh processes
// succeed. This helper resolves the hostname itself and retries the request
// against each address (SNI/Host/TLS stay on the hostname — only the TCP
// destination moves, exactly like `curl --resolve`).
//
// Kept in its own module with a deliberately plain `FetchLike` type: an inline
// version inside proxy.ts exploded the type-checker's memory once wired into
// dispatchFetch's branches.
//
// Constrained on purpose:
// - only http/https URLs whose host is a real DNS name (IP literals and
//   localhost never rotate addresses);
// - only when the body is absent or a string (a stream body cannot be sent
//   twice; every adapter in this codebase sends strings);
// - retries only on gateway-class statuses (502/503/504) or network errors —
//   a 4xx/500 is a real answer from the provider and is returned as-is;
// - the caller's AbortSignal keeps ticking across attempts, so the overall
//   request budget is unchanged.
import { lookup as dnsLookup } from 'node:dns/promises';
const EDGE_RETRY_STATUSES = new Set([502, 503, 504]);
/** Opt-in: set FREEAPI_EDGE_FAILOVER=1 (or true/yes). Off by default so the
 *  direct path keeps its exact pass-through contract — unit tests spy on
 *  global fetch and assert the untouched init, and ordinary single-edge
 *  hosts gain nothing but a DNS lookup. Enable where a provider hostname is
 *  known to resolve to a mix of healthy and broken edges (observed on the
 *  Z.AI gateway deployment this router is embedded in). Read lazily per call
 *  so dotenv-style loaders that run after this module's import still count. */
function edgeFailoverEnabled() {
    return /^(1|true|yes)$/i.test(process.env.FREEAPI_EDGE_FAILOVER ?? '');
}
/** Per-host affinity: the address that last answered successfully is tried
 *  first on the next request. Without this, a host whose first-listed edge is
 *  broken costs that edge's full failure latency (observed ~60-90s on the
 *  Z.AI ALB) on EVERY request before the retry reaches the healthy edge; with
 *  it, steady-state requests go straight to the known-good edge (~26s). */
const lastGoodAddress = new Map();
let agentCtor = null;
const addressAgents = new Map();
function agentForAddress(address) {
    let agent = addressAgents.get(address);
    if (!agent && agentCtor) {
        agent = new agentCtor({
            connect: {
                lookup(_host, _opts, cb) {
                    cb(null, [{ address, family: 4 }]);
                },
            },
        });
        addressAgents.set(address, agent);
    }
    return agent;
}
function isRetryableEdgeFailure(err) {
    // undici surfaces network-level failures as TypeError ("fetch failed", the
    // socket code on .cause); anything else — TLS rejection, invalid request —
    // would fail identically on every address, so it is not retried here.
    const name = err?.name ?? '';
    const code = err?.code ?? '';
    const cause = err?.cause?.code ?? '';
    const socketCodes = ['ECONNRESET', 'ECONNREFUSED', 'EPIPE', 'ETIMEDOUT', 'EAI_AGAIN', 'ECONNABORTED'];
    return name === 'TypeError' || socketCodes.includes(code) || socketCodes.includes(cause);
}
export async function fetchWithEdgeFailover(doFetch, url, init) {
    const requestInit = init ?? {};
    if (!edgeFailoverEnabled()) {
        return doFetch(url, requestInit);
    }
    let parsed;
    try {
        parsed = new URL(url);
    }
    catch {
        return doFetch(url, requestInit);
    }
    const host = parsed.hostname;
    // IP literals, localhost and IPv6 hosts never rotate addresses.
    if (/^[0-9.]+$/.test(host) || host === 'localhost' || host.includes(':')) {
        return doFetch(url, requestInit);
    }
    // A stream body cannot be re-sent on the second attempt.
    if (requestInit.body !== undefined && typeof requestInit.body !== 'string') {
        return doFetch(url, requestInit);
    }
    let addresses;
    try {
        addresses = (await dnsLookup(host, { all: true, family: 4 })).map(a => a.address);
    }
    catch {
        // DNS unavailable (or a mock hostname in tests) → plain direct path.
        return doFetch(url, requestInit);
    }
    if (addresses.length <= 1) {
        return doFetch(url, requestInit);
    }
    if (!agentCtor) {
        try {
            agentCtor = (await import('undici')).Agent;
        }
        catch {
            agentCtor = null; // no undici → single-address behavior below
        }
    }
    // Preferred address first, then the rest in resolution order.
    const preferred = lastGoodAddress.get(host);
    const ordered = preferred && addresses.includes(preferred)
        ? [preferred, ...addresses.filter(a => a !== preferred)]
        : addresses;
    let lastResponse = null;
    let lastError = null;
    for (const address of ordered) {
        const agent = agentForAddress(address);
        const attemptInit = { ...requestInit };
        if (agent)
            attemptInit.dispatcher = agent;
        try {
            const response = await doFetch(url, attemptInit);
            if (EDGE_RETRY_STATUSES.has(response.status)) {
                // Consume the error body so the socket can be released.
                await response.arrayBuffer().catch(() => undefined);
                lastResponse = response;
                continue;
            }
            lastGoodAddress.set(host, address);
            return response;
        }
        catch (err) {
            if (err?.name === 'AbortError' && requestInit.signal?.aborted) {
                throw err; // the caller's own timeout/abort — not an edge failure
            }
            lastError = err;
            if (!isRetryableEdgeFailure(err))
                throw err;
        }
    }
    if (lastResponse) {
        // Every edge answered with a gateway-class error — surface one shaped like
        // the upstream's own error body so downstream parsing still works.
        return new Response(JSON.stringify({
            error: {
                message: `all ${addresses.length} resolved addresses for ${host} returned ${lastResponse.status}`,
                type: 'server_error',
            },
        }), { status: lastResponse.status, headers: { 'Content-Type': 'application/json' } });
    }
    throw lastError ?? new Error(`all resolved addresses for ${host} failed`);
}
//# sourceMappingURL=edge-failover.js.map