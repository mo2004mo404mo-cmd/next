"use strict";
exports.id = 2901;
exports.ids = [2901,4307];
exports.modules = {

/***/ 124307:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VG: () => (/* binding */ validateUrlForSSRF),
/* harmony export */   aO: () => (/* binding */ safeFetch),
/* harmony export */   tX: () => (/* binding */ httpFetch)
/* harmony export */ });
/* unused harmony exports isPrivateIP, resolveUrlForSSRF, createSSRFSafeDispatcher */
/* harmony import */ var node_dns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(840610);
/* harmony import */ var node_dns__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_dns__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(777030);
/* harmony import */ var node_net__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_net__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var undici__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(547774);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/ssrf-guard.ts
 *
 * SSRF (Server-Side Request Forgery) protection utilities — ported verbatim,
 * then extended (Stage 9 of the RAG roadmap) with connect-time DNS pinning
 * to close the DNS-rebinding TOCTOU gap between `validateUrlForSSRF` and the
 * caller's `fetch()`.
 *
 * Validates URLs to prevent requests to internal/private network addresses.
 * Used by any API route that fetches a user-supplied URL server-side.
 *
 * Pure Node.js (no Next/AI deps), so it ports without modification.
 *
 * ── Stage 9: DNS rebinding TOCTOU defense ──
 * `validateUrlForSSRF(url)` resolves DNS, checks all returned addresses for
 * private ranges, and returns null (safe). The caller then `fetch()`es the
 * URL — Node does its OWN DNS lookup between validate and connect, and DNS
 * is allowed to return a different IP the second time (DNS rebinding). The
 * fix is `safeFetch()` below: it runs the actual connection through an
 * undici Agent whose custom `lookup` re-resolves and re-validates at connect
 * time. Private IPs are filtered there too, so even a rebinding attack
 * between validate and connect lands on `EACCES` instead of 169.254.169.254.
 */ 


function normalizeAddress(value) {
    let normalized = value.trim().toLowerCase();
    if (normalized.startsWith('[') && normalized.endsWith(']')) {
        normalized = normalized.slice(1, -1);
    }
    return normalized.replace(/\.+$/, '');
}
function parseIPv4(ip) {
    const parts = ip.split('.');
    if (parts.length !== 4) return null;
    const octets = parts.map((part)=>{
        if (!/^\d+$/.test(part)) {
            return Number.NaN;
        }
        return Number.parseInt(part, 10);
    });
    if (octets.some((octet)=>Number.isNaN(octet) || octet < 0 || octet > 255)) {
        return null;
    }
    return octets;
}
function extractMappedIPv4(ip) {
    const normalized = normalizeAddress(ip);
    if (!normalized.startsWith('::ffff:')) {
        return null;
    }
    const suffix = normalized.slice('::ffff:'.length);
    const dottedIPv4 = parseIPv4(suffix);
    if (dottedIPv4) {
        return dottedIPv4.join('.');
    }
    const parts = suffix.split(':');
    if (parts.length !== 2 || parts.some((part)=>!/^[0-9a-f]{1,4}$/.test(part))) {
        return null;
    }
    const [high, low] = parts.map((part)=>Number.parseInt(part, 16));
    return [
        high >> 8,
        high & 0xff,
        low >> 8,
        low & 0xff
    ].join('.');
}
function getFirstIPv6Hextet(ip) {
    const normalized = normalizeAddress(ip);
    if (!normalized.includes(':')) {
        return null;
    }
    if (normalized.startsWith('::')) {
        return 0;
    }
    const [firstHextet] = normalized.split(':');
    if (!firstHextet || !/^[0-9a-f]{1,4}$/.test(firstHextet)) {
        return null;
    }
    return Number.parseInt(firstHextet, 16);
}
/** Expand an IPv6 address into 8 numeric hextets. Returns null for invalid input. */ function expandIPv6(ip) {
    const normalized = normalizeAddress(ip);
    if (!normalized.includes(':')) return null;
    // Skip IPv4-suffix forms (handled separately by extractMappedIPv4)
    const lastPart = normalized.split(':').pop() || '';
    if (lastPart.includes('.')) return null;
    const sides = normalized.split('::');
    if (sides.length > 2) return null;
    let parts;
    if (sides.length === 2) {
        const left = sides[0] ? sides[0].split(':') : [];
        const right = sides[1] ? sides[1].split(':') : [];
        const missing = 8 - left.length - right.length;
        if (missing < 0) return null;
        parts = [
            ...left,
            ...Array(missing).fill('0'),
            ...right
        ];
    } else {
        parts = normalized.split(':');
    }
    if (parts.length !== 8) return null;
    if (parts.some((p)=>!/^[0-9a-f]{1,4}$/.test(p))) return null;
    return parts.map((p)=>Number.parseInt(p, 16));
}
function isPrivateIP(ip) {
    const normalized = normalizeAddress(ip);
    const mappedIPv4 = extractMappedIPv4(normalized);
    if (mappedIPv4) {
        return isPrivateIP(mappedIPv4);
    }
    const ipv4 = parseIPv4(normalized);
    if (ipv4) {
        const [first, second, third, fourth] = ipv4;
        return first === 0 || first === 10 || first === 127 || first === 169 && second === 254 || first === 172 && second >= 16 && second <= 31 || first === 192 && second === 168 || first === 0 && second === 0 && third === 0 && fourth === 0;
    }
    const ipv6FirstHextet = getFirstIPv6Hextet(normalized);
    if (ipv6FirstHextet === null) {
        return false;
    }
    if (normalized === '::' || normalized === '::1') {
        return true;
    }
    if ((ipv6FirstHextet & 0xfe00) === 0xfc00 || // fc00::/7 unique local
    (ipv6FirstHextet & 0xffc0) === 0xfe80 || // fe80::/10 link-local
    (ipv6FirstHextet & 0xffc0) === 0xfec0 // fec0::/10 site-local (deprecated)
    ) {
        return true;
    }
    // 6to4 tunnel: 2002::/16 — embedded IPv4 sits in bits 16-47
    if (ipv6FirstHextet === 0x2002) {
        const hextets = expandIPv6(normalized);
        if (hextets) {
            const embedded = `${hextets[1] >> 8}.${hextets[1] & 0xff}.${hextets[2] >> 8}.${hextets[2] & 0xff}`;
            if (isPrivateIP(embedded)) return true;
        }
    }
    // Teredo tunnel: 2001:0000::/32 — client IPv4 in last 32 bits, XOR-inverted
    if (ipv6FirstHextet === 0x2001) {
        const hextets = expandIPv6(normalized);
        if (hextets && hextets[1] === 0x0000) {
            const high = hextets[6] ^ 0xffff;
            const low = hextets[7] ^ 0xffff;
            const embedded = `${high >> 8}.${high & 0xff}.${low >> 8}.${low & 0xff}`;
            if (isPrivateIP(embedded)) return true;
        }
    }
    return false;
}
const LOCAL_NETWORK_BLOCK_MESSAGE = 'Local/private network URLs are not allowed. If this is a self-hosted deployment or internal gateway (including split-horizon DNS), set ALLOW_LOCAL_NETWORKS=true to allow local network targets.';
/**
 * Validate a URL against SSRF attacks.
 * Returns null if the URL is safe, or an error message string if blocked.
 */ async function validateUrlForSSRF(url) {
    let parsed;
    try {
        parsed = new URL(url);
    } catch  {
        return 'Invalid URL';
    }
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        return 'Only HTTP(S) URLs are allowed';
    }
    // Self-hosted deployments can set ALLOW_LOCAL_NETWORKS=true to skip private-IP checks
    const allowLocal = process.env.ALLOW_LOCAL_NETWORKS;
    if (allowLocal === 'true' || allowLocal === '1') {
        return null;
    }
    const hostname = normalizeAddress(parsed.hostname);
    if (hostname === 'localhost' || hostname.endsWith('.local') || hostname === '0.0.0.0' || hostname === '::1' || isPrivateIP(hostname)) {
        return LOCAL_NETWORK_BLOCK_MESSAGE;
    }
    if ((0,node_net__WEBPACK_IMPORTED_MODULE_1__.isIP)(hostname)) {
        return null;
    }
    let resolvedAddresses;
    try {
        resolvedAddresses = await node_dns__WEBPACK_IMPORTED_MODULE_0__.promises.lookup(hostname, {
            all: true,
            verbatim: true
        });
    } catch  {
        return 'Unable to verify hostname safety';
    }
    if (resolvedAddresses.length === 0) {
        return 'Unable to verify hostname safety';
    }
    if (resolvedAddresses.some(({ address })=>isPrivateIP(address))) {
        return LOCAL_NETWORK_BLOCK_MESSAGE;
    }
    return null;
}
/**
 * Resolve a URL for SSRF safety, returning structured data.
 *
 * This is the recommended entry point for new code: it returns the
 * validated IP so the caller can pin it (or use `safeFetch` which pins it
 * for them). `validateUrlForSSRF` (above) is kept for backward compatibility
 * and now delegates here.
 */ async function resolveUrlForSSRF(url) {
    let parsed;
    try {
        parsed = new URL(url);
    } catch  {
        return {
            ok: false,
            error: 'Invalid URL'
        };
    }
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        return {
            ok: false,
            error: 'Only HTTP(S) URLs are allowed'
        };
    }
    // Self-hosted deployments can opt out via env.
    const allowLocal = process.env.ALLOW_LOCAL_NETWORKS;
    if (allowLocal === 'true' || allowLocal === '1') {
        return {
            ok: true
        };
    }
    const hostname = normalizeAddress(parsed.hostname);
    if (hostname === 'localhost' || hostname.endsWith('.local') || hostname === '0.0.0.0' || hostname === '::1' || isPrivateIP(hostname)) {
        return {
            ok: false,
            error: LOCAL_NETWORK_BLOCK_MESSAGE
        };
    }
    // IP-literal URLs are already validated above; no DNS to rebind.
    if ((0,node_net__WEBPACK_IMPORTED_MODULE_1__.isIP)(hostname)) {
        return {
            ok: true,
            resolvedIp: hostname
        };
    }
    let resolvedAddresses;
    try {
        resolvedAddresses = await node_dns__WEBPACK_IMPORTED_MODULE_0__.promises.lookup(hostname, {
            all: true,
            verbatim: true
        });
    } catch  {
        return {
            ok: false,
            error: 'Unable to verify hostname safety'
        };
    }
    if (resolvedAddresses.length === 0) {
        return {
            ok: false,
            error: 'Unable to verify hostname safety'
        };
    }
    if (resolvedAddresses.some(({ address })=>isPrivateIP(address))) {
        return {
            ok: false,
            error: LOCAL_NETWORK_BLOCK_MESSAGE
        };
    }
    // Return the first public IP so callers can pin if they want.
    return {
        ok: true,
        resolvedIp: resolvedAddresses[0].address
    };
}
/**
 * Custom DNS lookup for undici's `connect.lookup`. Re-resolves the hostname
 * at connection time (closing the TOCTOU gap) and rejects any private IP.
 *
 * Signature matches Node's `dns.lookup` callback form so undici accepts it.
 */ function ssrfLookup(hostname, _options, callback) {
    // Allow opt-out for self-hosted deployments.
    const allowLocal = process.env.ALLOW_LOCAL_NETWORKS;
    if (allowLocal === 'true' || allowLocal === '1') {
        node_dns__WEBPACK_IMPORTED_MODULE_0__.promises.lookup(hostname, {
            all: true,
            verbatim: true
        }).then((addrs)=>{
            if (addrs.length === 0) {
                const err = new Error(`ENOTFOUND ${hostname}`);
                err.code = 'ENOTFOUND';
                callback(err, '', 0);
                return;
            }
            callback(null, addrs[0].address, addrs[0].family);
        }).catch((e)=>callback(e, '', 0));
        return;
    }
    node_dns__WEBPACK_IMPORTED_MODULE_0__.promises.lookup(hostname, {
        all: true,
        verbatim: true
    }).then((addrs)=>{
        if (addrs.length === 0) {
            const err = new Error(`ENOTFOUND ${hostname}`);
            err.code = 'ENOTFOUND';
            callback(err, '', 0);
            return;
        }
        // Reject any private address at connect time. Pick the first public one.
        const safe = addrs.find((a)=>!isPrivateIP(a.address));
        if (!safe) {
            const err = new Error(`SSRF blocked: ${hostname} resolved only to private addresses`);
            err.code = 'EACCES';
            callback(err, '', 0);
            return;
        }
        callback(null, safe.address, safe.family);
    }).catch((e)=>callback(e, '', 0));
}
/**
 * Construct an undici Dispatcher that runs every connect-time DNS lookup
 * through `ssrfLookup`. Use this when you need a custom Agent (e.g. to set
 * timeouts, TLS options) but want SSRF safety applied automatically.
 *
 * Most callers should use `safeFetch` instead.
 */ function createSSRFSafeDispatcher() {
    return new undici__WEBPACK_IMPORTED_MODULE_2__/* .Agent */ .g6({
        connect: {
            lookup: ssrfLookup
        }
    });
}
let _sharedDispatcher = null;
function sharedDispatcher() {
    if (!_sharedDispatcher) _sharedDispatcher = createSSRFSafeDispatcher();
    return _sharedDispatcher;
}
/**
 * SSRF-safe `fetch`. Drop-in replacement for global `fetch` that pins the
 * connection to a re-validated public IP at connect time, closing the
 * DNS-rebinding TOCTOU gap. Use this anywhere a user-supplied URL is fetched.
 *
 * Behaviour:
 *   • Pre-flight: rejects non-HTTP(S), private IP literals, and hostnames
 *     whose DNS records resolve to ANY private IP (same checks as
 *     `validateUrlForSSRF`).
 *   • Connect: undici's lookup runs `ssrfLookup`, which re-validates. If
 *     DNS rebinds between pre-flight and connect (the TOCTOU window), the
 *     connect-time lookup refuses the private IP and the request fails with
 *     `EACCES` instead of leaking into the private network.
 *   • AllowLocal: setting ALLOW_LOCAL_NETWORKS=true|1 skips both layers
 *     (self-hosted escape hatch).
 */ async function safeFetch(url, init) {
    const pre = await resolveUrlForSSRF(url);
    if (!pre.ok) {
        // Mimic fetch's TypeError shape for unsafe URLs.
        throw new TypeError(`SSRF blocked: ${pre.error}`);
    }
    const merged = {
        ...init,
        dispatcher: sharedDispatcher()
    };
    // undici's fetch returns a Response-compatible object; cast through
    // unknown so the caller's types stay clean.
    return (0,undici__WEBPACK_IMPORTED_MODULE_2__/* .fetch */ .hd)(url, merged);
}
/**
 * Production-gated fetch for provider adapter code.
 *
 *   NODE_ENV=production → safeFetch (pre-flight + connect-time DNS pin —
 *                          full DNS-rebinding defense)
 *   otherwise (dev)     → global fetch (local gateways like localhost
 *                          Ollama/Lemonade keep working, exactly mirroring
 *                          the route-level gating that only SSRF-checks
 *                          client baseUrls in production)
 *
 * Use this in adapter modules that fetch a config.baseUrl which may be
 * client-supplied (BYOK). Managed-provider adapters with operator-pinned
 * baseUrls can keep using global fetch.
 */ async function httpFetch(url, init) {
    if (true) {
        return safeFetch(url, init);
    }
    return fetch(url, init);
}


/***/ }),

/***/ 592901:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V2: () => (/* binding */ resolveModelFromRequest),
/* harmony export */   resolveModel: () => (/* binding */ resolveModel)
/* harmony export */ });
/* unused harmony export resolveModelFromHeaders */
/* harmony import */ var _lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(228262);
/* harmony import */ var _lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(834007);
/* harmony import */ var _lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124307);
/* harmony import */ var _lib_server_model_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(598603);
/* harmony import */ var _lib_server_byok__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(735566);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(122035);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_server_byok__WEBPACK_IMPORTED_MODULE_4__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__, _lib_db__WEBPACK_IMPORTED_MODULE_6__]);
([_lib_server_byok__WEBPACK_IMPORTED_MODULE_4__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__, _lib_db__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Shared model resolution utilities for API routes.
 *
 * Extracts the repeated parseModelString → resolveApiKey → resolveBaseUrl →
 * resolveProxy → getModel boilerplate into a single call.
 */ 
// Re-export so callers (e.g. /api/openmaic/chat/route.ts) can import
// isProviderKeyRequired from this module as a single entry point.







/**
 * Resolve a language model from explicit parameters.
 *
 * Use this when model config comes from the request body.
 */ async function resolveModel(params) {
    // Resolution order: stage route > x-model > DEFAULT_MODEL > ZAI fallback.
    // A configured stage route is the operator's deliberate per-stage choice and
    // wins even over a client-sent x-model (otherwise the browser UI, which always
    // sends its saved model, would shadow every route). Unrouted stages fall back
    // to the client x-model, then DEFAULT_MODEL.
    //
    // MedQ-specific ZAI fallback: if nothing above resolves AND `.z-ai-config`
    // is present (ZAI is configured as a managed provider), default to
    // `zai:auto`. MedQ is designed to run out-of-the-box on ZAI alone — failing
    // loud here would break every OpenMAIC generation request on a fresh
    // deployment that hasn't yet set DEFAULT_MODEL. Operators who want a
    // different default can still set DEFAULT_MODEL or MODEL_ROUTES to override.
    // Non-ZAI deployments (no .z-ai-config) fall through to the loud error.
    const stageRoute = (0,_lib_server_model_routes__WEBPACK_IMPORTED_MODULE_3__.getStageRoute)(params.stage);
    const stageModel = stageRoute?.model;
    // Resolution order (highest to lowest):
    //   1. Stage route (operator's per-stage config from MODEL_ROUTES env)
    //   2. Client x-model header (params.modelString — from ModelPicker)
    //   3. User's per-user default (DB: User.defaultModel, set via ModelPicker)
    //   4. DEFAULT_MODEL env var (server-wide default)
    //   5. Auto-detect (Ollama → env keys → ZAI)
    let modelString = stageModel || params.modelString || undefined;
    let usedFallback = false;
    // ── Per-user default model fallback ──
    // If no stage route and no client x-model header, consult the user's saved
    // default (set via the ModelPicker UI). This is a best-effort DB hit — we
    // only do it on the cold path (no other resolution source matched), so it
    // doesn't slow down the hot path.
    if (!modelString && params._req) {
        try {
            const uid = params.userId ?? await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__/* .getAuthenticatedUserId */ .At)(params._req);
            if (uid) {
                const user = await _lib_db__WEBPACK_IMPORTED_MODULE_6__.db.user.findUnique({
                    where: {
                        id: uid
                    },
                    select: {
                        defaultModel: true
                    }
                });
                if (user?.defaultModel) {
                    modelString = user.defaultModel;
                }
            }
        } catch  {
        // ignore — fall through to DEFAULT_MODEL / auto-detect
        }
    }
    // ── Server-wide default ──
    if (!modelString && process.env.DEFAULT_MODEL) {
        modelString = process.env.DEFAULT_MODEL;
    }
    if (!modelString) {
        // Auto-detect: Ollama (if running) → first env API key → ZAI (if .z-ai-config)
        // This replaces the old ZAI-only fallback so the app works out-of-the-box
        // on any machine with at least one provider configured.
        try {
            const { autoDetectDefaultModel } = await __webpack_require__.e(/* import() */ 8953).then(__webpack_require__.bind(__webpack_require__, 148953));
            const auto = await autoDetectDefaultModel();
            modelString = `${auto.providerId}:${auto.modelId}`;
            usedFallback = true;
        } catch (autoDetectError) {
            // Auto-detect threw (no provider configured) — try ZAI as last resort
            if ((0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__/* .isServerConfiguredProvider */ .$q)('providers', 'zai')) {
                modelString = 'zai:auto';
                usedFallback = true;
            } else {
                throw autoDetectError instanceof Error ? autoDetectError : new Error('No model could be resolved. Configure DEFAULT_MODEL, run Ollama locally, ' + 'or set an API key in .env (OPENAI_API_KEY, ANTHROPIC_API_KEY, etc.). ' + 'See SETUP_PROVIDERS.md for instructions.');
            }
        }
    }
    const { providerId, modelId } = (0,_lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__/* .parseModelString */ .UT)(modelString);
    // When a stage route (or the ZAI fallback) overrides the client's model, the
    // client-sent connection params (apiKey/baseUrl/providerType) belong to the
    // client's *other* model and must not bleed onto the resolved provider —
    // otherwise e.g. a routed Anthropic model would be built with the client's
    // OpenAI providerType/key. A routed/fallback model resolves purely from
    // server config, as if no x-model was sent.
    const routed = Boolean(stageModel) || usedFallback;
    const clientApiKey = routed ? undefined : params.apiKey;
    const clientProviderType = routed ? undefined : params.providerType;
    const clientBaseUrlParam = routed ? undefined : params.baseUrl;
    // Server-managed providers are admin-owned: the operator's key and base URL
    // are authoritative and any client-sent override is ignored. SSRF validation
    // therefore applies only to unmanaged providers, where the base URL really is
    // client-supplied. (Server-configured URLs are trusted by the operator.)
    const managed = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__/* .isServerConfiguredProvider */ .$q)('providers', providerId);
    const clientBaseUrl = managed ? undefined : clientBaseUrlParam || undefined;
    if (clientBaseUrl && "production" === 'production') {
        // NOTE: validateUrlForSSRF is the PRE-FLIGHT check. The actual fetch
        // happens downstream in the provider adapter (which takes `baseUrl`
        // as a string and does its own fetch). For full DNS-rebinding defense
        // (connect-time pinning), the adapter should be migrated to use
        // safeFetch from '@/lib/server/ssrf-guard'. See docs/runbook.md#ssrf-blocked.
        const ssrfError = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_2__/* .validateUrlForSSRF */ .VG)(clientBaseUrl);
        if (ssrfError) {
            throw new Error(ssrfError);
        }
    }
    const apiKey = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__/* .resolveApiKey */ .kv)(providerId, clientApiKey || '');
    const baseUrl = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__/* .resolveBaseUrl */ .xj)(providerId, clientBaseUrl);
    const proxy = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__/* .resolveProxy */ .Fu)(providerId);
    // ── App-wide BYOK fallback ──
    // If neither the operator nor the client supplied a key, look up the
    // user's saved ENDPOINT for this provider (encrypted in the UserApiKey
    // table — possibly several rows per provider). This is the app-wide BYOK
    // path: keys sync across devices, never appear in the browser, and are
    // scoped per user. See src/lib/server/byok.ts.
    //
    // An endpoint row is a COMPLETE destination: its key AND its baseUrl
    // travel together (you must not send the remote gateway's key to a local
    // Ollama or vice versa), so when an endpoint is chosen its baseUrl is
    // authoritative — even over the operator's env default (OLLAMA_BASE_URL).
    // The operator's env default remains the fallback for users with no
    // saved endpoint. (Managed KEYS still win for managed providers — only
    // the URL follows the endpoint.)
    //
    // We only hit the DB if neither the server nor the client supplied a key —
    // avoiding a DB query on every managed-provider request (the hot path).
    let effectiveApiKey = apiKey;
    let effectiveBaseUrl = baseUrl;
    let apiKeySource = 'none';
    let byokMeta;
    if (apiKey) {
        apiKeySource = managed ? 'managed' : 'client';
    } else {
        // Resolve the user ID from the request — required for BYOK lookup.
        // Callers that pass `userId` explicitly bypass this (e.g. server-side jobs).
        const byokUserId = params.userId ?? (params._req ? await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__/* .getAuthenticatedUserId */ .At)(params._req) : null);
        if (byokUserId) {
            const byok = await (0,_lib_server_byok__WEBPACK_IMPORTED_MODULE_4__/* .resolveUserApiKey */ .Rt)(byokUserId, providerId, {
                slot: params.byokSlot
            });
            if (byok) {
                effectiveApiKey = byok.apiKey;
                // The endpoint's own baseUrl (if set) is authoritative — see note above.
                if (byok.baseUrl) {
                    if (true) {
                        // NOTE: validateUrlForSSRF is the PRE-FLIGHT check. The actual fetch
                        // happens downstream in the provider adapter (which takes `baseUrl`
                        // as a string and does its own fetch). For full DNS-rebinding defense
                        // (connect-time pinning), the adapter should be migrated to use
                        // safeFetch from '@/lib/server/ssrf-guard'. See docs/runbook.md#ssrf-blocked.
                        const ssrfError = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_2__/* .validateUrlForSSRF */ .VG)(byok.baseUrl);
                        if (ssrfError) throw new Error(ssrfError);
                    }
                    effectiveBaseUrl = byok.baseUrl;
                }
                apiKeySource = 'byok';
                byokMeta = {
                    slot: byok.slot,
                    endpointCount: byok.endpointCount,
                    rowId: byok.rowId,
                    userId: byokUserId
                };
                // Fire-and-forget lastUsedAt update — best-effort, never block the response.
                void (0,_lib_server_byok__WEBPACK_IMPORTED_MODULE_4__/* .touchUserApiKeyById */ .Yj)(byokUserId, byok.rowId);
            }
        }
    }
    // Silence the unused warning for apiKeySource when no telemetry reads it.
    void apiKeySource;
    // ZAI is a synthetic provider type — dispatch to the ZAI LanguageModel
    // adapter instead of OpenMAIC's `getModel()` (which only knows OpenAI /
    // Anthropic / Google). The ZAI adapter wraps `z-ai-web-dev-sdk`'s
    // `chat.completions.create` into the Vercel AI SDK's `LanguageModelV3`
    // interface so OpenMAIC's `callLLM`/`streamLLM` work unchanged.
    //
    // This interception lives in resolve-model.ts (server-only) rather than in
    // providers.ts (shared with client) so the `z-ai-web-dev-sdk` import stays
    // out of the client bundle — `z-ai-web-dev-sdk` uses Node's `fs` to read
    // `.z-ai-config` and cannot run in the browser.
    if (providerId === 'zai') {
        const { createZaiLanguageModel } = await __webpack_require__.e(/* import() */ 7663).then(__webpack_require__.bind(__webpack_require__, 677663));
        const { PROVIDERS } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 228262));
        const providerCfg = PROVIDERS.zai;
        const thinkingCapability = providerCfg?.models.find((m)=>m.id === modelId)?.capabilities?.thinking;
        const thinkingEnabled = thinkingCapability && 'defaultEnabled' in thinkingCapability ? thinkingCapability.defaultEnabled ?? false : false;
        const zaiModel = createZaiLanguageModel({
            modelId,
            thinkingEnabled
        });
        const modelInfo = providerCfg?.models.find((m)=>m.id === modelId) || undefined;
        return {
            model: zaiModel,
            modelInfo,
            modelString,
            providerId,
            modelId,
            apiKey: effectiveApiKey,
            baseUrl: effectiveBaseUrl,
            thinkingConfig: routed ? stageRoute?.thinking : params.thinkingConfig,
            ...byokMeta ? {
                byok: byokMeta
            } : {}
        };
    }
    // ── Ollama native adapter ──
    // Ollama is dispatched to the native /api/chat adapter (with /v1 fallback)
    // instead of going through getModel()'s createOpenAI() path. This gives us
    // access to Ollama-native features (think levels, keep_alive, format) and
    // auto-detects whether the native API is available. See
    // src/lib/ai/ollama-language-model.ts.
    if (providerId === 'ollama') {
        const { createOllamaLanguageModel } = await __webpack_require__.e(/* import() */ 1431).then(__webpack_require__.bind(__webpack_require__, 801431));
        const { PROVIDERS } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 228262));
        const providerCfg = PROVIDERS.ollama;
        const modelInfo = providerCfg?.models.find((m)=>m.id === modelId) || undefined;
        const thinkingCapability = modelInfo?.capabilities?.thinking;
        const thinkingEnabled = thinkingCapability && 'defaultEnabled' in thinkingCapability ? thinkingCapability.defaultEnabled ?? false : false;
        // Resolve the base URL: explicit > provider default > env
        const ollamaBaseUrl = effectiveBaseUrl || providerCfg?.defaultBaseUrl?.replace(/\/v1$/, '') || process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        const ollamaModel = createOllamaLanguageModel({
            modelId,
            baseUrl: ollamaBaseUrl,
            thinkingEnabled,
            apiKey: effectiveApiKey
        });
        return {
            model: ollamaModel,
            modelInfo,
            modelString,
            providerId,
            modelId,
            apiKey: effectiveApiKey,
            baseUrl: ollamaBaseUrl,
            thinkingConfig: routed ? stageRoute?.thinking : params.thinkingConfig,
            ...byokMeta ? {
                byok: byokMeta
            } : {}
        };
    }
    // Custom BYOK endpoint ids (e.g. the MedQ AI Router registered as its own
    // `medq-router` provider, or any user-saved OpenAI-compatible gateway) are
    // not in the static registry. When the client didn't send a provider type,
    // default them to 'openai' (OpenAI-compatible) — otherwise getModel() would
    // throw "Unknown provider" and the endpoint's models would be unusable.
    const providerKnown = providerId in _lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__.PROVIDERS;
    const { model, modelInfo } = (0,_lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__/* .getModel */ .E1)({
        providerId,
        modelId,
        apiKey: effectiveApiKey,
        baseUrl: effectiveBaseUrl,
        proxy,
        providerType: clientProviderType ?? (providerKnown ? undefined : 'openai')
    });
    // Thinking arbitration mirrors model routing — the route carries a full
    // ThinkingConfig (mode/effort/level/enabled/budgetTokens/…) which callLLM
    // normalizes against the model's capability:
    //  - routed + thinking set → the route's thinking wins (over client thinking).
    //  - routed + no thinking  → routed model uses its own default; client thinking
    //    is dropped (it belonged to the client's other model).
    //  - unrouted              → honor the client's thinking config.
    const thinkingConfig = routed ? stageRoute?.thinking : params.thinkingConfig;
    return {
        model,
        modelInfo,
        modelString,
        providerId,
        modelId,
        apiKey: effectiveApiKey,
        baseUrl: effectiveBaseUrl,
        thinkingConfig,
        ...byokMeta ? {
            byok: byokMeta
        } : {}
    };
}
function getThinkingConfigFromBody(body) {
    if (!body || typeof body !== 'object') return undefined;
    const record = body;
    const config = record.thinkingConfig ?? record.thinking;
    return config && typeof config === 'object' ? config : undefined;
}
/**
 * Resolve a language model from standard request headers.
 *
 * Reads: x-model, x-api-key, x-base-url, x-provider-type
 * Note: requiresApiKey is derived server-side from the provider registry,
 * never from client headers, to prevent auth bypass.
 */ async function resolveModelFromHeaders(req, stage, thinkingConfig, byokSlot) {
    return resolveModel({
        modelString: req.headers.get('x-model') || undefined,
        stage,
        apiKey: req.headers.get('x-api-key') || undefined,
        baseUrl: req.headers.get('x-base-url') || undefined,
        providerType: req.headers.get('x-provider-type') || undefined,
        thinkingConfig,
        ...byokSlot != null ? {
            byokSlot
        } : {},
        _req: req
    });
}
/**
 * Resolve a language model from standard request headers plus body fields.
 *
 * Reads model credentials from headers and per-request thinking config from
 * the JSON body field `thinkingConfig` (or legacy/eval field `thinking`).
 * `byokSlot` pins which user-saved endpoint supplies key/baseUrl (failover).
 */ async function resolveModelFromRequest(req, body, stage, byokSlot) {
    // Pass the client's body thinking into resolveModel so the single arbiter
    // there decides (a routed stage may override or drop it). See resolveModel.
    return resolveModelFromHeaders(req, stage, getThinkingConfigFromBody(body), byokSlot);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 598603:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getStageRoute: () => (/* binding */ getStageRoute)
/* harmony export */ });
/* unused harmony exports LLM_STAGES, getStageModel */
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(653165);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/model-routes.ts
 *
 * Per-stage LLM model routing — ported verbatim. This module is pure
 * env-driven config (reads `MODEL_ROUTES` JSON) with no provider-specific
 * logic, so it works as-is in MedQ: a route value is just a model string
 * (e.g. `"zai:auto"`) that `resolveModel` parses via the ZAI-aware
 * `parseModelString`.
 *
 * MedQ-specific note: the only valid provider prefix in route values is
 * `zai`. Routes referencing other providers (e.g. `openai:gpt-4o`) will
 * fail at resolveModel time with "unknown provider" — operators should
 * stick to `zai:<modelId>` or omit the provider prefix entirely.
 */ 
const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('model-routes');
const VALID_MODES = [
    'default',
    'disabled',
    'enabled',
    'auto'
];
const VALID_EFFORTS = [
    'none',
    'minimal',
    'low',
    'medium',
    'high',
    'xhigh',
    'max'
];
const VALID_LEVELS = [
    'minimal',
    'low',
    'medium',
    'high'
];
/** Validate/sanitize a route's `thinking` object into a ThinkingConfig (drops bad fields with a warn). */ function parseThinking(key, raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        log.warn(`"thinking" for stage "${key}" must be an object in MODEL_ROUTES; ignored.`);
        return undefined;
    }
    const o = raw;
    const out = {};
    const checkEnum = (field, val, valid)=>{
        if (val === undefined) return undefined;
        if (typeof val === 'string' && valid.includes(val)) return val;
        log.warn(`Invalid ${field} "${String(val)}" for stage "${key}" ignored. Valid: ${valid.join(', ')}`);
        return undefined;
    };
    const mode = checkEnum('mode', o.mode, VALID_MODES);
    if (mode) out.mode = mode;
    const effort = checkEnum('effort', o.effort, VALID_EFFORTS);
    if (effort) out.effort = effort;
    const level = checkEnum('level', o.level, VALID_LEVELS);
    if (level) out.level = level;
    if (o.enabled !== undefined) {
        if (typeof o.enabled === 'boolean') out.enabled = o.enabled;
        else log.warn(`Invalid enabled "${String(o.enabled)}" for stage "${key}" ignored (must be boolean).`);
    }
    if (o.budgetTokens !== undefined) {
        if (typeof o.budgetTokens === 'number') out.budgetTokens = o.budgetTokens;
        else log.warn(`Invalid budgetTokens "${String(o.budgetTokens)}" for stage "${key}" ignored (must be number).`);
    }
    if (o.excludeReasoningOutput !== undefined) {
        if (typeof o.excludeReasoningOutput === 'boolean') out.excludeReasoningOutput = o.excludeReasoningOutput;
        else log.warn(`Invalid excludeReasoningOutput for stage "${key}" ignored (must be boolean).`);
    }
    return Object.keys(out).length ? out : undefined;
}
/**
 * Stages that can be independently routed to a model. Each value is a valid
 * `MODEL_ROUTES` key; the base entries also mirror a `callLLM` source label.
 *
 * `scene-content:<type>` are finer-grained composite keys: when a scene-content
 * request carries an `outline.type`, it routes via the composite key and falls
 * back to the base `scene-content` route (see getStageModel). Only the four
 * core scene types are routable; interactive widget sub-types are not split.
 */ const LLM_STAGES = [
    'scene-outlines-stream',
    'scene-content',
    'scene-content:slide',
    'scene-content:quiz',
    'scene-content:interactive',
    'scene-content:pbl',
    'scene-actions',
    'agent-profiles',
    'quiz-grade',
    'pbl-chat',
    'chat-adapter',
    'generate-classroom',
    'web-search-query-rewrite',
    'maic-agent',
    // MedQ app features (BYOK analytics stage attribution)
    'explain',
    'import-extend',
    'tutor-chat',
    'summary',
    'translate',
    'clinical-reasoning'
];
/** Parsed once per process (env is read at startup; tests reset via vi.resetModules). */ let _routes = null;
/** Parse one MODEL_ROUTES value (string model, or {model, thinking}) into a StageRoute. */ function parseRouteValue(key, value) {
    if (typeof value === 'string') {
        return value.trim() ? {
            model: value.trim()
        } : undefined;
    }
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        const obj = value;
        const model = typeof obj.model === 'string' ? obj.model.trim() : '';
        if (!model) {
            log.warn(`Route for stage "${key}" has no model string in MODEL_ROUTES; ignored.`);
            return undefined;
        }
        const route = {
            model
        };
        if (obj.thinking !== undefined) {
            const thinking = parseThinking(key, obj.thinking);
            if (thinking) route.thinking = thinking;
        }
        return route;
    }
    log.warn(`Invalid route value for stage "${key}" in MODEL_ROUTES ignored.`);
    return undefined;
}
function loadRoutes() {
    if (_routes) return _routes;
    const routes = {};
    const raw = process.env.MODEL_ROUTES?.trim();
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                for (const [key, value] of Object.entries(parsed)){
                    if (!LLM_STAGES.includes(key)) {
                        log.warn(`Unknown stage "${key}" in MODEL_ROUTES ignored. Valid stages: ${LLM_STAGES.join(', ')}`);
                        continue;
                    }
                    const route = parseRouteValue(key, value);
                    if (route) routes[key] = route;
                }
            } else {
                log.error('MODEL_ROUTES must be a JSON object of stage -> model; ignoring.');
            }
        } catch (err) {
            log.error('Invalid MODEL_ROUTES JSON, ignoring (falling back to DEFAULT_MODEL).', err);
        }
    }
    _routes = routes;
    return _routes;
}
/**
 * Resolve the configured model string for a stage, or `undefined` when the
 * stage is unset/unconfigured (callers fall back to `DEFAULT_MODEL`).
 *
 * Composite `a:b` stages resolve most-specific-first: the full key is tried,
 * then successively shorter prefixes (e.g. `scene-content:quiz` →
 * `scene-content`). Plain stages (no colon) are a single exact lookup.
 */ function getStageRoute(stage) {
    if (!stage) return undefined;
    const routes = loadRoutes();
    let key = stage;
    while(key){
        const route = routes[key];
        if (route) return route;
        const lastColon = key.lastIndexOf(':');
        key = lastColon > 0 ? key.slice(0, lastColon) : undefined;
    }
    return undefined;
}
/** Convenience: the resolved model string for a stage (route's `model`). */ function getStageModel(stage) {
    return getStageRoute(stage)?.model;
}


/***/ })

};
;