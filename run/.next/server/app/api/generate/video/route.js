(() => {
var exports = {};
exports.id = 6007;
exports.ids = [4307,6007];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ 51455:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ 78335:
/***/ (() => {



/***/ }),

/***/ 79868:
/***/ ((module) => {

"use strict";
module.exports = require("node:sqlite");

/***/ }),

/***/ 87997:
/***/ ((module) => {

"use strict";
module.exports = require("node:timers");

/***/ }),

/***/ 90772:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ generateWithGrokVideo)
/* harmony export */ });
/* unused harmony export testGrokVideoConnectivity */
/** Ported from OpenMAIC. Original: lib/media/adapters/grok-video-adapter.ts */ /**
 * Grok (xAI) Video Generation Adapter
 *
 * Async task pattern: submit → poll → return video URL.
 *
 * REST endpoints:
 * - Submit: POST /v1/videos/generations
 * - Poll:   GET  /v1/videos/{request_id}
 *
 * Supported models:
 * - grok-imagine-video  ($0.05/sec)
 *
 * Authentication: Bearer token via Authorization header
 *
 * API docs: https://docs.x.ai/developers/rest-api-reference/inference/videos
 */ const DEFAULT_MODEL = 'grok-imagine-video';
const DEFAULT_BASE_URL = 'https://api.x.ai/v1';
const POLL_INTERVAL_MS = 10000; // 10 seconds
const MAX_POLL_ATTEMPTS = 60; // 10 minutes max
function delay(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
/** Dimension defaults per aspect ratio */ function getDimensions(aspectRatio) {
    switch(aspectRatio){
        case '9:16':
            return {
                width: 720,
                height: 1280
            };
        case '1:1':
            return {
                width: 1080,
                height: 1080
            };
        case '4:3':
            return {
                width: 1024,
                height: 768
            };
        default:
            return {
                width: 1280,
                height: 720
            }; // 16:9
    }
}
/** Common headers for all Grok Video API calls */ function apiHeaders(apiKey) {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
    };
}
// ---------------------------------------------------------------------------
// Connectivity test
// ---------------------------------------------------------------------------
/**
 * Lightweight connectivity test — validates API key by making a minimal
 * request that triggers auth check. 401/403 means key invalid.
 */ async function testGrokVideoConnectivity(config) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    try {
        const response = await fetch(`${baseUrl}/videos/generations`, {
            method: 'POST',
            headers: apiHeaders(config.apiKey),
            body: JSON.stringify({
                model: config.model || DEFAULT_MODEL,
                prompt: ''
            })
        });
        if (response.status === 401 || response.status === 403) {
            const text = await response.text();
            return {
                success: false,
                message: `Grok Video auth failed (${response.status}): ${text}`
            };
        }
        return {
            success: true,
            message: 'Connected to Grok Video'
        };
    } catch (err) {
        return {
            success: false,
            message: `Grok Video connectivity error: ${err}`
        };
    }
}
// ---------------------------------------------------------------------------
// Submit
// ---------------------------------------------------------------------------
async function submitVideoGeneration(baseUrl, apiKey, model, options) {
    const body = {
        model,
        prompt: options.prompt
    };
    if (options.duration) body.duration = options.duration;
    const response = await fetch(`${baseUrl}/videos/generations`, {
        method: 'POST',
        headers: apiHeaders(apiKey),
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Grok video submit failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (!data.request_id) {
        throw new Error('Grok video returned empty request_id');
    }
    return data.request_id;
}
// ---------------------------------------------------------------------------
// Poll
// ---------------------------------------------------------------------------
async function pollVideoStatus(baseUrl, apiKey, requestId) {
    const response = await fetch(`${baseUrl}/videos/${requestId}`, {
        method: 'GET',
        headers: apiHeaders(apiKey)
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Grok video poll failed (${response.status}): ${text}`);
    }
    return response.json();
}
// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------
async function generateWithGrokVideo(config, options) {
    const model = config.model || DEFAULT_MODEL;
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    // 1. Submit
    const requestId = await submitVideoGeneration(baseUrl, config.apiKey, model, options);
    // 2. Poll until done
    for(let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++){
        await delay(POLL_INTERVAL_MS);
        const result = await pollVideoStatus(baseUrl, config.apiKey, requestId);
        if (result.status === 'done') {
            if (!result.video?.url) {
                throw new Error('Grok video task completed but no video URL returned');
            }
            const { width, height } = getDimensions(options.aspectRatio);
            return {
                url: result.video.url,
                duration: result.video.duration || options.duration || 6,
                width,
                height
            };
        }
        if (result.status === 'failed') {
            throw new Error(`Grok video generation failed: ${JSON.stringify(result)}`);
        }
    }
    throw new Error(`Grok video generation timed out after ${MAX_POLL_ATTEMPTS * POLL_INTERVAL_MS / 1000}s (request: ${requestId})`);
}


/***/ }),

/***/ 108128:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 124307:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 134589:
/***/ ((module) => {

"use strict";
module.exports = require("node:assert");

/***/ }),

/***/ 157075:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ 173136:
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 174842:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   patchFetch: () => (/* binding */ patchFetch),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),
/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)
/* harmony export */ });
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(319225);
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(684006);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8317);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(799373);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(434775);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(524235);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(200261);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(754365);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(590771);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(473461);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(767798);
/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(192280);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(662018);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(445696);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(347929);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(986439);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(137527);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__);

















// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({
    definition: {
        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
        page: "/api/generate/video/route",
        pathname: "/api/generate/video",
        filename: "route",
        bundlePath: "app/api/generate/video/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/generate/video/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(286113),
    // In Turbopack dev mode, also provide a synchronous per-request getter so
    // server HMR updates are picked up without re-executing the entry chunk.
    // Using require() (synchronous) avoids adding async overhead that would be
    // incorrectly attributed to application-code time in devRequestTiming.
    ... false ? 0 : {}
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;
function patchFetch() {
    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({
        workAsyncStorage,
        workUnitAsyncStorage
    });
}

async function handler(req, res, ctx) {
    if (ctx.requestMeta) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.setRequestMeta)(req, ctx.requestMeta);
    }
    if (routeModule.isDev) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.addRequestMeta)(req, 'devRequestTimingInternalsEnd', process.hrtime.bigint());
    }
    let srcPage = "/api/generate/video/route";
    // turbopack doesn't normalize `/index` in the page name
    // so we need to to process dynamic routes properly
    // TODO: fix turbopack providing differing value from webpack
    if (false) {} else if (srcPage === '/index') {
        // we always normalize /index specifically
        srcPage = '/';
    }
    const multiZoneDraftMode = false;
    const prepareResult = await routeModule.prepare(req, res, {
        srcPage,
        multiZoneDraftMode
    });
    if (!prepareResult) {
        res.statusCode = 400;
        res.end('Bad Request');
        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());
        return null;
    }
    const { buildId, deploymentId, params, nextConfig, parsedUrl, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname, clientReferenceManifest, serverActionsManifest } = prepareResult;
    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__.normalizeAppPath)(srcPage);
    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);
    const render404 = async ()=>{
        // TODO: should route-module itself handle rendering the 404
        if (routerServerContext == null ? void 0 : routerServerContext.render404) {
            await routerServerContext.render404(req, res, parsedUrl, false);
        } else {
            res.end('This page could not be found');
        }
        return null;
    };
    if (isIsr && !isDraftMode) {
        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);
        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];
        if (prerenderInfo) {
            if (prerenderInfo.fallback === false && !isPrerendered) {
                if (nextConfig.adapterPath) {
                    return await render404();
                }
                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError();
            }
        }
    }
    let cacheKey = null;
    if (isIsr && !routeModule.isDev && !isDraftMode) {
        cacheKey = resolvedPathname;
        // ensure /index and / is normalized to one key
        cacheKey = cacheKey === '/index' ? '/' : cacheKey;
    }
    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML
    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports
    // dynamic HTML.
    !isIsr;
    // This is a revalidation request if the request is for a static
    // page and it is not being resumed from a postponed render and
    // it is not a dynamic RSC request then it is a revalidation
    // request.
    const isStaticGeneration = isIsr && !supportsDynamicResponse;
    // Before rendering (which initializes component tree modules), we have to
    // set the reference manifests to our global store so Server Action's
    // encryption util can access to them at the top level of the page module.
    if (serverActionsManifest && clientReferenceManifest) {
        (0,next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__.setManifestsSingleton)({
            page: srcPage,
            clientReferenceManifest,
            serverActionsManifest
        });
    }
    const method = req.method || 'GET';
    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();
    const activeSpan = tracer.getActiveScopeSpan();
    const isWrappedByNextServer = Boolean(routerServerContext == null ? void 0 : routerServerContext.isWrappedByNextServer);
    const isMinimalMode = Boolean((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode'));
    const incrementalCache = (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache') || await routeModule.getIncrementalCache(req, nextConfig, prerenderManifest, isMinimalMode);
    incrementalCache == null ? void 0 : incrementalCache.resetRequestCache();
    globalThis.__incrementalCache = incrementalCache;
    const context = {
        params,
        previewProps: prerenderManifest.preview,
        renderOpts: {
            experimental: {
                authInterrupts: Boolean(nextConfig.experimental.authInterrupts),
                useCacheTimeout: nextConfig.experimental.useCacheTimeout
            },
            cacheComponents: Boolean(nextConfig.cacheComponents),
            validationLevel: nextConfig.experimental.instantInsights.validationLevel,
            supportsDynamicResponse,
            incrementalCache,
            hmrRefreshHash: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'hmrRefreshHash'),
            cacheLifeProfiles: nextConfig.cacheLife,
            staticPageGenerationTimeout: nextConfig.staticPageGenerationTimeout,
            waitUntil: ctx.waitUntil,
            onClose: (cb)=>{
                res.on('close', cb);
            },
            onAfterTaskError: undefined,
            onInstrumentationRequestError: (error, _request, errorContext, silenceLog)=>routeModule.onRequestError(req, error, errorContext, silenceLog, routerServerContext)
        },
        sharedContext: {
            buildId,
            deploymentId
        }
    };
    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextRequest(req);
    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextResponse(res);
    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.signalFromNodeResponse)(res));
    const responseGenerator = async ({ previousCacheEntry })=>{
        try {
            if (!isMinimalMode && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {
                res.statusCode = 404;
                // on-demand revalidate always sets this header
                res.setHeader('x-nextjs-cache', 'REVALIDATED');
                res.end('This page could not be found');
                return null;
            }
            const response = await routeModule.handle(nextReq, context);
            req.fetchMetrics = context.renderOpts.fetchMetrics;
            let pendingWaitUntil = context.renderOpts.pendingWaitUntil;
            // Attempt using provided waitUntil if available
            // if it's not we fallback to sendResponse's handling
            if (pendingWaitUntil) {
                if (ctx.waitUntil) {
                    ctx.waitUntil(pendingWaitUntil);
                    pendingWaitUntil = undefined;
                }
            }
            const cacheTags = context.renderOpts.collectedTags;
            // If the request is for a static response, we can cache it so long
            // as it's not edge.
            if (isIsr) {
                const blob = await response.blob();
                // Copy the headers from the response.
                const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.toNodeOutgoingHttpHeaders)(response.headers);
                if (cacheTags) {
                    headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER] = cacheTags;
                }
                if (!headers['content-type'] && blob.type) {
                    headers['content-type'] = blob.type;
                }
                const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;
                const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? // route has a numeric `revalidate` but didn't declare an
                // explicit `expire` (e.g. via `cacheLife`). This mirrors the
                // build-time fallback in `build/index.ts` so cache entries
                // and the response Cache-Control header agree on the route's
                // effective expire. Routes that opt out of revalidation
                // (`revalidate: false`) or that are dynamic (`revalidate: 0`)
                // keep `expire: undefined`.
                revalidate !== false && revalidate > 0 ? nextConfig.expireTime : undefined : context.renderOpts.collectedExpire;
                // Create the cache entry for the response.
                const cacheEntry = {
                    value: {
                        kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE,
                        status: response.status,
                        body: Buffer.from(await blob.arrayBuffer()),
                        headers
                    },
                    cacheControl: {
                        revalidate,
                        expire
                    }
                };
                return cacheEntry;
            } else {
                // send response without caching if not ISR
                await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, response, pendingWaitUntil);
                return null;
            }
        } catch (err) {
            // if this is a background revalidate we need to report
            // the request error here as it won't be bubbled
            if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: srcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            throw err;
        }
    };
    const handleResponse = async (currentSpan, parentSpan)=>{
        try {
            var _cacheEntry_value;
            const cacheEntry = await routeModule.handleResponse({
                req,
                nextConfig,
                cacheKey,
                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
                isFallback: false,
                prerenderManifest,
                isRoutePPREnabled: false,
                isOnDemandRevalidate,
                revalidateOnlyGenerated,
                responseGenerator,
                waitUntil: ctx.waitUntil,
                isMinimalMode
            });
            // we don't create a cacheEntry for ISR
            if (!isIsr) {
                return;
            }
            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE) {
                var _cacheEntry_value1;
                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), "__NEXT_ERROR_CODE", {
                    value: "E701",
                    enumerable: false,
                    configurable: true
                });
            }
            if (!isMinimalMode) {
                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');
            }
            // Draft mode should never be cached
            if (isDraftMode) {
                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
            }
            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);
            if (!(isMinimalMode && isIsr)) {
                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER);
            }
            // If cache control is already set on the response we don't
            // override it to allow users to customize it via next.config
            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {
                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__.getCacheControlHeader)(cacheEntry.cacheControl));
            }
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, // @ts-expect-error - Argument of type 'Buffer<ArrayBufferLike>' is not assignable to parameter of type 'BodyInit | null | undefined'.
            new Response(cacheEntry.value.body, {
                headers,
                status: cacheEntry.value.status || 200
            }));
            return;
        } catch (err) {
            if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError)) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: normalizedSrcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            // rethrow so that we can handle serving error page
            // If this is during static generation, throw the error again.
            if (isIsr) throw err;
            // Otherwise, send a 500 response.
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, new Response(null, {
                status: 500
            }));
            return;
        } finally{
            ;
            (()=>{
                if (!currentSpan) {
                    return;
                }
                let statusCode = res.statusCode;
                currentSpan.setAttributes({
                    'http.status_code': statusCode,
                    'next.rsc': false
                });
                if (statusCode && statusCode >= 500) {
                    // For 5xx status codes: SHOULD be set to 'Error' span status.
                    // x-ref: https://opentelemetry.io/docs/specs/semconv/http/http-spans/#status
                    currentSpan.setStatus({
                        code: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanStatusCode.ERROR
                    });
                    // For span status 'Error', SHOULD set 'error.type' attribute.
                    currentSpan.setAttribute('error.type', statusCode.toString());
                }
                const rootSpanAttributes = tracer.getRootSpanAttributes();
                // We were unable to get attributes, probably OTEL is not enabled
                if (!rootSpanAttributes) {
                    return;
                }
                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest) {
                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                    return;
                }
                const route = rootSpanAttributes.get('next.route') || normalizedSrcPage;
                const name = `${method} ${route}`;
                currentSpan.setAttributes({
                    'next.route': route,
                    'http.route': route,
                    'next.span_name': name
                });
                currentSpan.updateName(name);
                // Propagate http.route to the parent span if one exists (e.g.
                // a platform-created HTTP span in adapter deployments).
                if (parentSpan && parentSpan !== currentSpan) {
                    parentSpan.setAttribute('http.route', route);
                    parentSpan.updateName(name);
                }
            })();
        }
    };
    // TODO: activeSpan code path is for when wrapped by
    // next-server can be removed when this is no longer used
    if (isWrappedByNextServer && activeSpan) {
        await handleResponse(activeSpan, undefined);
    } else {
        let parentSpan = tracer.getActiveScopeSpan();
        await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest, {
                spanName: `${method} ${srcPage}`,
                kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,
                attributes: {
                    'http.method': method,
                    'http.target': req.url
                }
            }, (span)=>handleResponse(span, parentSpan)), undefined, !isWrappedByNextServer);
    }
}

//# sourceMappingURL=app-route.js.map


/***/ }),

/***/ 176760:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 192280:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "I", ({
    enumerable: true,
    get: function() {
        return sendResponse;
    }
}));
const _helpers = __webpack_require__(228208);
const _pipereadable = __webpack_require__(447617);
const _utils = __webpack_require__(662018);
async function sendResponse(req, res, response, waitUntil) {
    if (// The type check here ensures that `req` is correctly typed, and the
    // environment variable check provides dead code elimination.
     true && (0, _helpers.isNodeNextResponse)(res)) {
        var // Copy over the response headers.
        _response_headers;
        // Copy over the response status.
        res.statusCode = response.status;
        res.statusMessage = response.statusText;
        // TODO: this is not spec-compliant behavior and we should not restrict
        // headers that are allowed to appear many times.
        //
        // See:
        // https://github.com/vercel/next.js/pull/70127
        const headersWithMultipleValuesAllowed = [
            // can add more headers to this list if needed
            'set-cookie',
            'www-authenticate',
            'proxy-authenticate',
            'vary'
        ];
        (_response_headers = response.headers) == null ? void 0 : _response_headers.forEach((value, name)=>{
            // `x-middleware-set-cookie` is an internal header not needed for the response
            if (name.toLowerCase() === 'x-middleware-set-cookie') {
                return;
            }
            // The append handling is special cased for `set-cookie`.
            if (name.toLowerCase() === 'set-cookie') {
                // TODO: (wyattjoh) replace with native response iteration when we can upgrade undici
                for (const cookie of (0, _utils.splitCookiesString)(value)){
                    res.appendHeader(name, cookie);
                }
            } else {
                // only append the header if it is either not present in the outbound response
                // or if the header supports multiple values
                const isHeaderPresent = typeof res.getHeader(name) !== 'undefined';
                if (headersWithMultipleValuesAllowed.includes(name.toLowerCase()) || !isHeaderPresent) {
                    res.appendHeader(name, value);
                }
            }
        });
        /**
     * The response can't be directly piped to the underlying response. The
     * following is duplicated from the edge runtime handler.
     *
     * See packages/next/server/next-server.ts
     */ const { originalResponse } = res;
        // A response body must not be sent for HEAD requests. See https://httpwg.org/specs/rfc9110.html#HEAD
        if (response.body && req.method !== 'HEAD') {
            await (0, _pipereadable.pipeToNodeResponse)(response.body, originalResponse, waitUntil);
        } else {
            originalResponse.end();
        }
    }
}

//# sourceMappingURL=send-response.js.map

/***/ }),

/***/ 200261:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ 257975:
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ 269879:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ generateWithVeo)
/* harmony export */ });
/* unused harmony export testVeoConnectivity */
/** Ported from OpenMAIC. Original: lib/media/adapters/veo-adapter.ts */ /**
 * Veo (Google) Video Generation Adapter
 *
 * Direct REST API calls for video generation with Google's Veo models.
 * Async task pattern: submit → poll → return inline base64 video.
 *
 * REST endpoints (Gemini API):
 * - Submit:   POST /v1beta/models/{model}:predictLongRunning
 * - Poll:     POST /v1beta/models/{model}:fetchPredictOperation  { operationName }
 *   Returns inline base64 video data in response.videos[]
 *
 * Supported models:
 * - veo-3.1-fast-generate-001  (fast, $0.15/sec)
 * - veo-3.1-generate-001       (quality, $0.40/sec)
 * - veo-3.0-fast-generate-001  (fast, $0.15/sec)
 * - veo-3.0-generate-001       (quality, $0.40/sec)
 * - veo-2.0-generate-001       (legacy, $0.50/sec)
 *
 * Authentication: x-goog-api-key header
 *
 * Stateless: video content is returned as a base64 data URL.
 * No files are saved on the server.
 */ const DEFAULT_MODEL = 'veo-3.0-generate-001';
const DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com';
const POLL_INTERVAL_MS = 10000; // 10 seconds
const MAX_POLL_ATTEMPTS = 60; // 10 minutes max
function delay(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
/** Dimension defaults per aspect ratio */ function getDimensions(aspectRatio) {
    switch(aspectRatio){
        case '9:16':
            return {
                width: 720,
                height: 1280
            };
        case '1:1':
            return {
                width: 1080,
                height: 1080
            };
        case '4:3':
            return {
                width: 1024,
                height: 768
            };
        default:
            return {
                width: 1280,
                height: 720
            }; // 16:9
    }
}
/** Common headers for all Veo API calls */ function apiHeaders(apiKey) {
    return {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
    };
}
// ---------------------------------------------------------------------------
// Submit
// ---------------------------------------------------------------------------
async function submitVideoGeneration(baseUrl, apiKey, model, options) {
    const url = `${baseUrl}/v1beta/models/${model}:predictLongRunning`;
    const body = {
        instances: [
            {
                prompt: options.prompt
            }
        ]
    };
    // Parameters are optional — only include if we have values
    const parameters = {};
    if (options.aspectRatio) parameters.aspectRatio = options.aspectRatio;
    if (options.duration) parameters.durationSeconds = options.duration;
    if (Object.keys(parameters).length > 0) {
        body.parameters = parameters;
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: apiHeaders(apiKey),
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Veo submit failed (${response.status}): ${text}`);
    }
    return response.json();
}
// ---------------------------------------------------------------------------
// Poll
// ---------------------------------------------------------------------------
async function pollOperation(baseUrl, apiKey, model, operationName) {
    const url = `${baseUrl}/v1beta/models/${model}:fetchPredictOperation`;
    const response = await fetch(url, {
        method: 'POST',
        headers: apiHeaders(apiKey),
        body: JSON.stringify({
            operationName
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Veo poll failed (${response.status}): ${text}`);
    }
    return response.json();
}
// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------
/**
 * Lightweight connectivity test — validates API key by fetching model info.
 * Uses GET /v1beta/models/{model} which does not trigger generation.
 */ async function testVeoConnectivity(config) {
    const model = config.model || DEFAULT_MODEL;
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const url = `${baseUrl}/v1beta/models`;
    // Try ?key= query param first (direct Google API), fall back to x-goog-api-key header (proxy)
    let response = null;
    try {
        response = await fetch(`${url}?key=${config.apiKey}`, {
            method: 'GET'
        });
    } catch  {
    // Direct API unreachable, try header auth
    }
    if (!response || !response.ok) {
        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-goog-api-key': config.apiKey
                }
            });
        } catch (_err) {
            return {
                success: false,
                message: `Network error: unable to reach ${baseUrl}. Check your Base URL and network connection.`
            };
        }
    }
    if (response.ok) {
        return {
            success: true,
            message: `Connected to Veo (${model})`
        };
    }
    // Parse error body for user-friendly message
    const text = await response.text().catch(()=>'');
    if (response.status === 400 || response.status === 401 || response.status === 403) {
        return {
            success: false,
            message: `Invalid API key or unauthorized (${response.status}). Check your API Key and Base URL match the same provider.`
        };
    }
    return {
        success: false,
        message: `Veo connectivity failed (${response.status}): ${text}`
    };
}
async function generateWithVeo(config, options) {
    const model = config.model || DEFAULT_MODEL;
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    // 1. Submit
    const operation = await submitVideoGeneration(baseUrl, config.apiKey, model, options);
    if (!operation.name) {
        throw new Error('Veo returned operation without name');
    }
    // 2. Poll until done
    let current = operation;
    let pollCount = 0;
    while(!current.done){
        if (pollCount >= MAX_POLL_ATTEMPTS) {
            throw new Error('Veo video generation timed out after 10 minutes');
        }
        await delay(POLL_INTERVAL_MS);
        current = await pollOperation(baseUrl, config.apiKey, model, current.name);
        pollCount++;
    }
    // 3. Check for errors
    if (current.error) {
        throw new Error(`Veo generation failed: ${current.error.code} - ${current.error.message}`);
    }
    // 4. Extract inline base64 video from response.videos[]
    const videos = current.response?.videos;
    if (!videos || videos.length === 0) {
        throw new Error('Veo returned no generated videos');
    }
    const first = videos[0];
    if (!first.bytesBase64Encoded) {
        throw new Error('Veo returned video entry without data');
    }
    const base64 = first.bytesBase64Encoded;
    const mimeType = first.mimeType || 'video/mp4';
    const { width, height } = getDimensions(options.aspectRatio);
    return {
        url: `data:${mimeType};base64,${base64}`,
        duration: options.duration || 8,
        width,
        height
    };
}


/***/ }),

/***/ 286113:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration)
/* harmony export */ });
/* harmony import */ var _lib_media_video_providers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(576538);
/* harmony import */ var _lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(834007);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(653165);
/* harmony import */ var _lib_server_api_response__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(648825);
/* harmony import */ var _lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(124307);
/**
 * Video Generation API
 *
 * Generates a video from a text prompt using the specified provider.
 * Uses async task pattern (submit → poll) so maxDuration is set to 5 minutes.
 *
 * POST /api/generate/video
 *
 * Headers:
 *   x-video-provider: VideoProviderId (default: 'seedance')
 *   x-video-model: string (optional model override)
 *   x-api-key: string (optional, server fallback)
 *   x-base-url: string (optional, server fallback)
 *
 * Body: { prompt, duration?, aspectRatio?, resolution? }
 * Response: { success: boolean, result?: VideoGenerationResult, error?: string }
 */ 




const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_2__/* .createLogger */ .h)('VideoGeneration API');
const maxDuration = 300;
async function POST(request) {
    try {
        const body = await request.json();
        if (!body.prompt) {
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_3__/* .apiError */ .pb)('MISSING_REQUIRED_FIELD', 400, 'Missing prompt');
        }
        const providerId = request.headers.get('x-video-provider') || 'seedance';
        // Managed providers are admin-owned: ignore any client-sent key/baseUrl.
        const managed = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__/* .isServerConfiguredProvider */ .$q)('video', providerId);
        const clientApiKey = managed ? undefined : request.headers.get('x-api-key') || undefined;
        const clientBaseUrl = managed ? undefined : request.headers.get('x-base-url') || undefined;
        const clientModel = request.headers.get('x-video-model') || undefined;
        if (clientBaseUrl && "production" === 'production') {
            // NOTE: validateUrlForSSRF is the PRE-FLIGHT check. The actual fetch
            // happens downstream in the provider adapter (which takes `baseUrl`
            // as a string and does its own fetch). For full DNS-rebinding defense
            // (connect-time pinning), the adapter should be migrated to use
            // safeFetch from '@/lib/server/ssrf-guard'. See docs/runbook.md#ssrf-blocked.
            const ssrfError = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_4__/* .validateUrlForSSRF */ .VG)(clientBaseUrl);
            if (ssrfError) {
                return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_3__/* .apiError */ .pb)('INVALID_URL', 403, ssrfError);
            }
        }
        const apiKey = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__/* .resolveVideoApiKey */ .Zi)(providerId, clientApiKey);
        if (!apiKey) {
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_3__/* .apiError */ .pb)('MISSING_API_KEY', 401, `No API key configured for video provider: ${providerId}`);
        }
        const baseUrl = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_1__/* .resolveVideoBaseUrl */ .Gc)(providerId, clientBaseUrl);
        // Normalize options against provider capabilities
        const options = (0,_lib_media_video_providers__WEBPACK_IMPORTED_MODULE_0__/* .normalizeVideoOptions */ .j)(providerId, body);
        log.info(`Generating video: provider=${providerId}, model=${clientModel || 'default'}, ` + `prompt="${body.prompt.slice(0, 80)}...", duration=${options.duration ?? 'auto'}, ` + `aspect=${options.aspectRatio ?? 'auto'}, resolution=${options.resolution ?? 'auto'}`);
        const result = await (0,_lib_media_video_providers__WEBPACK_IMPORTED_MODULE_0__/* .generateVideo */ .NM)({
            providerId,
            apiKey,
            baseUrl,
            model: clientModel
        }, options);
        log.info(`Video generated: url=${result.url ? 'yes' : 'no'}, ${result.width}x${result.height}, ${result.duration}s`);
        return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_3__/* .apiSuccess */ .kU)({
            result
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        // Detect content safety filter rejections (e.g. Seedance SensitiveContent errors)
        if (message.includes('SensitiveContent') || message.includes('sensitive information')) {
            log.warn(`Video blocked by content safety filter: ${message}`);
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_3__/* .apiError */ .pb)('CONTENT_SENSITIVE', 400, message);
        }
        log.error(`Video generation failed [provider=${request.headers.get('x-video-provider') ?? 'kling'}, model=${request.headers.get('x-video-model') ?? 'default'}]:`, error);
        return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_3__/* .apiError */ .pb)('INTERNAL_ERROR', 500, message);
    }
}


/***/ }),

/***/ 296487:
/***/ (() => {



/***/ }),

/***/ 298846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fe: () => (/* binding */ generateWithHappyHorse)
/* harmony export */ });
/* unused harmony exports submitHappyHorseTask, pollHappyHorseTask, testHappyHorseConnectivity */
/** Ported from OpenMAIC. Original: lib/media/adapters/happyhorse-adapter.ts */ /**
 * HappyHorse (Alibaba Cloud Model Studio / DashScope) Video Generation Adapter
 *
 * Uses DashScope's async task flow:
 * POST /api/v1/services/aigc/video-generation/video-synthesis
 * GET  /api/v1/tasks/{task_id}
 */ const DEFAULT_MODEL = 'happyhorse-1.0-t2v';
const DEFAULT_BASE_URL = 'https://dashscope.aliyuncs.com';
const POLL_INTERVAL_MS = 15000;
const MAX_POLL_ATTEMPTS = 40; // 10 minutes max
function normalizeBaseUrl(baseUrl) {
    return (baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
}
function delay(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
function authHeaders(apiKey) {
    return {
        Authorization: `Bearer ${apiKey}`
    };
}
function jsonHeaders(apiKey) {
    return {
        ...authHeaders(apiKey),
        'Content-Type': 'application/json'
    };
}
function toHappyHorseResolution(resolution) {
    return resolution === '1080p' ? '1080P' : '720P';
}
function estimateDimensions(ratio, resolution) {
    const height = resolution || 720;
    const [widthRatio, heightRatio] = (ratio || '16:9').split(':').map(Number);
    if (!widthRatio || !heightRatio) return {
        width: Math.round(height * 16 / 9),
        height
    };
    return {
        width: Math.round(height * widthRatio / heightRatio),
        height
    };
}
function getErrorMessage(data) {
    const code = data.output?.code || data.code;
    const message = data.output?.message || data.message || 'Unknown error';
    return code ? `${code}: ${message}` : message;
}
async function submitHappyHorseTask(config, options) {
    const baseUrl = normalizeBaseUrl(config.baseUrl);
    const response = await fetch(`${baseUrl}/api/v1/services/aigc/video-generation/video-synthesis`, {
        method: 'POST',
        headers: {
            ...jsonHeaders(config.apiKey),
            'X-DashScope-Async': 'enable'
        },
        body: JSON.stringify({
            model: config.model || DEFAULT_MODEL,
            input: {
                prompt: options.prompt
            },
            parameters: {
                resolution: toHappyHorseResolution(options.resolution),
                ratio: options.aspectRatio || '16:9',
                duration: options.duration || 5,
                watermark: false
            }
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`HappyHorse task submission failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (data.code || data.message) {
        throw new Error(`HappyHorse task submission failed: ${getErrorMessage(data)}`);
    }
    if (!data.output?.task_id) {
        throw new Error(`HappyHorse returned empty task ID. Response: ${JSON.stringify(data)}`);
    }
    return data.output.task_id;
}
async function pollHappyHorseTask(config, taskId) {
    const baseUrl = normalizeBaseUrl(config.baseUrl);
    const response = await fetch(`${baseUrl}/api/v1/tasks/${encodeURIComponent(taskId)}`, {
        method: 'GET',
        headers: authHeaders(config.apiKey)
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`HappyHorse poll failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    const status = data.output?.task_status;
    if (status === 'SUCCEEDED') {
        if (!data.output?.video_url) {
            throw new Error('HappyHorse task succeeded but no video URL returned');
        }
        const dimensions = estimateDimensions(data.usage?.ratio, data.usage?.SR);
        return {
            url: data.output.video_url,
            duration: data.usage?.duration || 5,
            width: dimensions.width,
            height: dimensions.height
        };
    }
    if (status === 'FAILED' || status === 'CANCELED' || status === 'UNKNOWN') {
        throw new Error(`HappyHorse video generation failed: ${getErrorMessage(data)}`);
    }
    return null;
}
async function generateWithHappyHorse(config, options) {
    const taskId = await submitHappyHorseTask(config, options);
    for(let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++){
        await delay(POLL_INTERVAL_MS);
        const result = await pollHappyHorseTask(config, taskId);
        if (result) return result;
    }
    throw new Error(`HappyHorse video generation timed out after ${MAX_POLL_ATTEMPTS * POLL_INTERVAL_MS / 1000}s (task: ${taskId})`);
}
async function testHappyHorseConnectivity(config) {
    try {
        const baseUrl = normalizeBaseUrl(config.baseUrl);
        const response = await fetch(`${baseUrl}/api/v1/tasks/connectivity-test-nonexistent`, {
            method: 'GET',
            headers: authHeaders(config.apiKey)
        });
        if (response.status === 401 || response.status === 403) {
            const text = await response.text();
            return {
                success: false,
                message: `HappyHorse auth failed (${response.status}): ${text}`
            };
        }
        return {
            success: true,
            message: 'Connected to HappyHorse'
        };
    } catch (err) {
        return {
            success: false,
            message: `HappyHorse connectivity error: ${err}`
        };
    }
}


/***/ }),

/***/ 300643:
/***/ ((module) => {

"use strict";
module.exports = require("node:perf_hooks");

/***/ }),

/***/ 319225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (false) {} else {
    if (false) {} else {
        if (false) {} else {
            if (false) {} else {
                module.exports = __webpack_require__(744870);
            }
        }
    }
}

//# sourceMappingURL=module.compiled.js.map

/***/ }),

/***/ 321820:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 324815:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ normalizeVideoOptions),
/* harmony export */   l: () => (/* binding */ VIDEO_PROVIDERS)
/* harmony export */ });
/**
 * Video provider REGISTRY — pure data, browser-safe.
 *
 * The client-safe half of src/lib/media/video-providers.ts: the
 * VIDEO_PROVIDERS config table and the pure normalizeVideoOptions() helper,
 * with ZERO adapter imports. The dispatchers that call the provider adapters
 * (which import node 'crypto' for HMAC signing etc.) stay in
 * video-providers.ts — importing them here would drag node builtins into
 * browser chunks, which Turbopack refuses to write
 * ("chunking context does not support external modules").
 *
 * Client code imports from './video-provider-registry'; server code can use
 * either (video-providers.ts re-exports this registry).
 */ const VIDEO_PROVIDERS = {
    seedance: {
        id: 'seedance',
        name: 'Seedance',
        requiresApiKey: true,
        defaultBaseUrl: 'https://ark.cn-beijing.volces.com',
        models: [
            {
                id: 'doubao-seedance-1-5-pro-251215',
                name: 'Seedance 1.5 Pro'
            },
            {
                id: 'doubao-seedance-1-0-pro-250528',
                name: 'Seedance 1.0 Pro'
            },
            {
                id: 'doubao-seedance-1-0-pro-fast-251015',
                name: 'Seedance 1.0 Pro Fast'
            },
            {
                id: 'doubao-seedance-1-0-lite-t2v-250428',
                name: 'Seedance 1.0 Lite T2V'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16',
            '3:4',
            '21:9'
        ],
        supportedDurations: [
            5,
            10
        ],
        supportedResolutions: [
            '480p',
            '720p',
            '1080p'
        ],
        maxDuration: 10
    },
    kling: {
        id: 'kling',
        name: 'Kling',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api-beijing.klingai.com',
        models: [
            {
                id: 'kling-v2-6',
                name: 'Kling V2.6'
            },
            {
                id: 'kling-v1-6',
                name: 'Kling V1.6'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            5,
            10
        ],
        maxDuration: 10
    },
    veo: {
        id: 'veo',
        name: 'Veo',
        requiresApiKey: true,
        defaultBaseUrl: 'https://generativelanguage.googleapis.com',
        models: [
            {
                id: 'veo-3.1-fast-generate-001',
                name: 'Veo 3.1 Fast'
            },
            {
                id: 'veo-3.1-generate-001',
                name: 'Veo 3.1'
            },
            {
                id: 'veo-3.0-fast-generate-001',
                name: 'Veo 3.0 Fast'
            },
            {
                id: 'veo-3.0-generate-001',
                name: 'Veo 3.0'
            },
            {
                id: 'veo-2.0-generate-001',
                name: 'Veo 2.0'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            8
        ],
        supportedResolutions: [
            '720p'
        ],
        maxDuration: 8
    },
    sora: {
        id: 'sora',
        name: 'Sora',
        requiresApiKey: true,
        models: [],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        maxDuration: 20
    },
    'minimax-video': {
        id: 'minimax-video',
        name: 'MiniMax Video',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.minimaxi.com',
        // Hailuo 2.3 Fast requires Image-to-Video with first_frame_image; this
        // provider currently submits Text-to-Video requests only.
        models: [
            {
                id: 'MiniMax-Hailuo-2.3',
                name: 'Hailuo 2.3'
            },
            {
                id: 'MiniMax-Hailuo-02',
                name: 'Hailuo 02'
            },
            {
                id: 'T2V-01-Director',
                name: 'T2V-01 Director'
            },
            {
                id: 'T2V-01',
                name: 'T2V-01'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            6,
            10
        ],
        supportedResolutions: [
            '720p',
            '1080p'
        ],
        maxDuration: 10
    },
    'grok-video': {
        id: 'grok-video',
        name: 'Grok Video (xAI)',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.x.ai/v1',
        models: [
            {
                id: 'grok-imagine-video',
                name: 'Grok Imagine Video'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            6
        ],
        maxDuration: 6
    },
    happyhorse: {
        id: 'happyhorse',
        name: 'HappyHorse',
        requiresApiKey: true,
        defaultBaseUrl: 'https://dashscope.aliyuncs.com',
        models: [
            {
                id: 'happyhorse-1.0-t2v',
                name: 'HappyHorse 1.0 T2V'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '9:16',
            '1:1',
            '4:3',
            '3:4'
        ],
        supportedDurations: [
            5,
            10,
            15
        ],
        supportedResolutions: [
            '720p',
            '1080p'
        ],
        maxDuration: 15
    }
};
/**
 * Normalize video generation options against provider capabilities.
 * Ensures duration, aspectRatio, and resolution are valid for the given provider.
 * Falls back to the first supported value when the requested value is unsupported.
 */ function normalizeVideoOptions(providerId, options) {
    const provider = VIDEO_PROVIDERS[providerId];
    if (!provider) return options;
    const normalized = {
        ...options
    };
    // Duration: use first supported value if unset or unsupported
    if (provider.supportedDurations && provider.supportedDurations.length > 0) {
        if (!normalized.duration || !provider.supportedDurations.includes(normalized.duration)) {
            normalized.duration = provider.supportedDurations[0];
        }
    }
    // Aspect ratio: use first supported value if unset or unsupported
    if (provider.supportedAspectRatios && provider.supportedAspectRatios.length > 0) {
        if (!normalized.aspectRatio || !provider.supportedAspectRatios.includes(normalized.aspectRatio)) {
            normalized.aspectRatio = provider.supportedAspectRatios[0];
        }
    }
    // Resolution: use first supported value if unset or unsupported
    if (provider.supportedResolutions && provider.supportedResolutions.length > 0) {
        if (!normalized.resolution || !provider.supportedResolutions.includes(normalized.resolution)) {
            normalized.resolution = provider.supportedResolutions[0];
        }
    }
    return normalized;
}


/***/ }),

/***/ 325696:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ generateWithKling)
/* harmony export */ });
/* unused harmony export testKlingConnectivity */
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(455511);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/** Ported from OpenMAIC. Original: lib/media/adapters/kling-adapter.ts */ /**
 * Kling (Kuaishou) Video Generation Adapter
 *
 * Async task pattern: submit → poll → return video URL.
 *
 * REST endpoints:
 * - Submit: POST /v1/videos/text2video
 * - Poll:   GET  /v1/videos/text2video/{task_id}
 *
 * Authentication: JWT Bearer token generated from Access Key + Secret Key.
 * The apiKey field should be formatted as "accessKey:secretKey".
 *
 * Supported models:
 * - kling-v2-6     (latest)
 * - kling-v1-6     (v1)
 *
 * API docs: https://docs.klingai.com/api
 */ 
const DEFAULT_MODEL = 'kling-v2-6';
const DEFAULT_BASE_URL = 'https://api-beijing.klingai.com';
const POLL_INTERVAL_MS = 5000;
const MAX_POLL_ATTEMPTS = 120; // 10 minutes max
const JWT_EXPIRY_SECS = 1800; // 30 minutes
// ---------------------------------------------------------------------------
// JWT helper (HS256, no external deps)
// ---------------------------------------------------------------------------
function base64url(data) {
    const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf-8');
    return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function generateJWT(accessKey, secretKey) {
    const now = Math.floor(Date.now() / 1000);
    const header = base64url(JSON.stringify({
        alg: 'HS256',
        typ: 'JWT'
    }));
    const payload = base64url(JSON.stringify({
        iss: accessKey,
        exp: now + JWT_EXPIRY_SECS,
        nbf: now - 5,
        iat: now
    }));
    const signature = base64url(crypto__WEBPACK_IMPORTED_MODULE_0___default().createHmac('sha256', secretKey).update(`${header}.${payload}`).digest());
    return `${header}.${payload}.${signature}`;
}
function parseApiKey(apiKey) {
    const sep = apiKey.indexOf(':');
    if (sep <= 0) {
        throw new Error('Kling apiKey must be "accessKey:secretKey" format');
    }
    return {
        accessKey: apiKey.slice(0, sep),
        secretKey: apiKey.slice(sep + 1)
    };
}
// ---------------------------------------------------------------------------
// Dimension helpers
// ---------------------------------------------------------------------------
function getDimensions(aspectRatio) {
    switch(aspectRatio){
        case '9:16':
            return {
                width: 720,
                height: 1280
            };
        case '1:1':
            return {
                width: 1080,
                height: 1080
            };
        case '4:3':
            return {
                width: 1024,
                height: 768
            };
        default:
            return {
                width: 1280,
                height: 720
            }; // 16:9
    }
}
/**
 * Lightweight connectivity test — validates API key by generating a JWT
 * and making a GET request. 401/403 means key invalid.
 */ async function testKlingConnectivity(config) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    try {
        const { accessKey, secretKey } = parseApiKey(config.apiKey);
        const token = generateJWT(accessKey, secretKey);
        // Use a GET to a non-existent task to validate auth
        const response = await fetch(`${baseUrl}/v1/videos/text2video/connectivity-test`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 401 || response.status === 403) {
            const text = await response.text();
            return {
                success: false,
                message: `Kling auth failed (${response.status}): ${text}`
            };
        }
        return {
            success: true,
            message: 'Connected to Kling'
        };
    } catch (err) {
        return {
            success: false,
            message: `Kling connectivity error: ${err}`
        };
    }
}
// ---------------------------------------------------------------------------
// Submit
// ---------------------------------------------------------------------------
async function submitTask(baseUrl, token, model, options) {
    const body = {
        model_name: model,
        prompt: options.prompt,
        negative_prompt: '',
        mode: 'pro'
    };
    if (options.duration) body.duration = String(options.duration);
    if (options.aspectRatio) body.aspect_ratio = options.aspectRatio;
    const response = await fetch(`${baseUrl}/v1/videos/text2video`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Kling submit failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (data.code !== 0) {
        throw new Error(`Kling submit error ${data.code}: ${data.message}`);
    }
    if (!data.data?.task_id) {
        throw new Error('Kling returned empty task_id');
    }
    return data.data.task_id;
}
// ---------------------------------------------------------------------------
// Poll
// ---------------------------------------------------------------------------
async function pollTask(baseUrl, token, taskId) {
    const response = await fetch(`${baseUrl}/v1/videos/text2video/${taskId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Kling poll failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (data.code !== 0) {
        throw new Error(`Kling poll error ${data.code}: ${data.message}`);
    }
    return data.data;
}
// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------
async function generateWithKling(config, options) {
    const model = config.model || DEFAULT_MODEL;
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const { accessKey, secretKey } = parseApiKey(config.apiKey);
    const token = generateJWT(accessKey, secretKey);
    // 1. Submit
    const taskId = await submitTask(baseUrl, token, model, options);
    // 2. Poll until done
    for(let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++){
        await new Promise((resolve)=>setTimeout(resolve, POLL_INTERVAL_MS));
        const result = await pollTask(baseUrl, token, taskId);
        if (result.task_status === 'succeed') {
            const video = result.task_result?.videos?.[0];
            if (!video?.url) {
                throw new Error('Kling task succeeded but no video URL returned');
            }
            const { width, height } = getDimensions(options.aspectRatio);
            return {
                url: video.url,
                duration: Number(video.duration) || options.duration || 5,
                width,
                height
            };
        }
        if (result.task_status === 'failed') {
            throw new Error(`Kling video generation failed: ${result.task_status_msg || 'Unknown error'}`);
        }
    }
    throw new Error(`Kling video generation timed out after ${MAX_POLL_ATTEMPTS * POLL_INTERVAL_MS / 1000}s (task: ${taskId})`);
}


/***/ }),

/***/ 333873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 337540:
/***/ ((module) => {

"use strict";
module.exports = require("node:console");

/***/ }),

/***/ 353053:
/***/ ((module) => {

"use strict";
module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ 419121:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 478474:
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ 504573:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 529294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 541692:
/***/ ((module) => {

"use strict";
module.exports = require("node:tls");

/***/ }),

/***/ 541792:
/***/ ((module) => {

"use strict";
module.exports = require("node:querystring");

/***/ }),

/***/ 576538:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NM: () => (/* binding */ generateVideo),
/* harmony export */   j: () => (/* reexport safe */ _video_provider_registry__WEBPACK_IMPORTED_MODULE_0__.j)
/* harmony export */ });
/* unused harmony export testVideoConnectivity */
/* harmony import */ var _video_provider_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(324815);
/* harmony import */ var _adapters_seedance_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(904151);
/* harmony import */ var _adapters_kling_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(325696);
/* harmony import */ var _adapters_veo_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(269879);
/* harmony import */ var _adapters_minimax_video_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(727740);
/* harmony import */ var _adapters_grok_video_adapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(90772);
/* harmony import */ var _adapters_happyhorse_adapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(298846);
/**
 * Video Generation Service -- routes to provider adapters
 *
 * 2026-11-04: the pure registry (VIDEO_PROVIDERS) and normalizeVideoOptions
 * moved to ./video-provider-registry — a browser-safe module with ZERO
 * adapter imports. The dispatchers below import the provider adapters, which
 * use node builtins (crypto for HMAC signing, safeFetch/DNS checks), so THIS
 * file must never be imported from client code. Server consumers can import
 * from either module (the registry is re-exported below for compat).
 */ // Re-exported for backward compatibility — existing server imports of
// VIDEO_PROVIDERS / normalizeVideoOptions from './video-providers' keep working.







async function testVideoConnectivity(config) {
    switch(config.providerId){
        case 'seedance':
            return testSeedanceConnectivity(config);
        case 'kling':
            return testKlingConnectivity(config);
        case 'veo':
            return testVeoConnectivity(config);
        case 'minimax-video':
            return testMiniMaxVideoConnectivity(config);
        case 'grok-video':
            return testGrokVideoConnectivity(config);
        case 'happyhorse':
            return testHappyHorseConnectivity(config);
        default:
            return {
                success: false,
                message: `Unsupported video provider: ${config.providerId}`
            };
    }
}
async function generateVideo(config, options) {
    switch(config.providerId){
        case 'seedance':
            return (0,_adapters_seedance_adapter__WEBPACK_IMPORTED_MODULE_2__/* .generateWithSeedance */ .cL)(config, options);
        case 'kling':
            return (0,_adapters_kling_adapter__WEBPACK_IMPORTED_MODULE_1__/* .generateWithKling */ .Z)(config, options);
        case 'veo':
            return (0,_adapters_veo_adapter__WEBPACK_IMPORTED_MODULE_3__/* .generateWithVeo */ .k)(config, options);
        case 'minimax-video':
            return (0,_adapters_minimax_video_adapter__WEBPACK_IMPORTED_MODULE_4__/* .generateWithMiniMaxVideo */ .k)(config, options);
        case 'grok-video':
            return (0,_adapters_grok_video_adapter__WEBPACK_IMPORTED_MODULE_5__/* .generateWithGrokVideo */ .K)(config, options);
        case 'happyhorse':
            return (0,_adapters_happyhorse_adapter__WEBPACK_IMPORTED_MODULE_6__/* .generateWithHappyHorse */ .Fe)(config, options);
        default:
            throw new Error(`Unsupported video provider: ${config.providerId}`);
    }
}


/***/ }),

/***/ 629021:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 638522:
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ 648825:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   kU: () => (/* binding */ apiSuccess),
/* harmony export */   pb: () => (/* binding */ apiError)
/* harmony export */ });
/* unused harmony export API_ERROR_CODES */
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/api-response.ts
 *
 * Utility helpers for Next.js API routes — ported verbatim.
 */ 
const API_ERROR_CODES = {
    MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
    MISSING_API_KEY: 'MISSING_API_KEY',
    INVALID_REQUEST: 'INVALID_REQUEST',
    PROVIDER_DISABLED: 'PROVIDER_DISABLED',
    VOXCPM_AUTO_VOICE_REQUIRES_CONTEXT: 'VOXCPM_AUTO_VOICE_REQUIRES_CONTEXT',
    INVALID_URL: 'INVALID_URL',
    REDIRECT_NOT_ALLOWED: 'REDIRECT_NOT_ALLOWED',
    TOO_MANY_REDIRECTS: 'TOO_MANY_REDIRECTS',
    CONTENT_SENSITIVE: 'CONTENT_SENSITIVE',
    UPSTREAM_ERROR: 'UPSTREAM_ERROR',
    RATE_LIMITED: 'RATE_LIMITED',
    GENERATION_FAILED: 'GENERATION_FAILED',
    TRANSCRIPTION_FAILED: 'TRANSCRIPTION_FAILED',
    PARSE_FAILED: 'PARSE_FAILED',
    INTERNAL_ERROR: 'INTERNAL_ERROR'
};
function apiError(code, status, error, details) {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        success: false,
        errorCode: code,
        error,
        ...details ? {
            details
        } : {}
    }, {
        status
    });
}
function apiSuccess(data, status = 200) {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        success: true,
        ...data
    }, {
        status
    });
}


/***/ }),

/***/ 653165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ createLogger)
/* harmony export */ });
/**
 * Shared logger used across the app for request tracing and diagnostics.
 *
 * It centralizes log formatting, log-level filtering, and console emission so
 * routes and services can record operational events consistently without
 * duplicating configuration or message formatting logic.
 */ const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};
function getMinLevel() {
    const env = (process.env.LOG_LEVEL ?? 'info').toLowerCase();
    return env in LOG_LEVELS ? env : 'info';
}
function isJsonFormat() {
    return process.env.LOG_FORMAT === 'json';
}
function formatLine(level, tag, args) {
    const timestamp = new Date().toISOString();
    const upperLevel = level.toUpperCase();
    const msg = args.map((a)=>a instanceof Error ? a.stack ?? a.message : typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
    if (isJsonFormat()) {
        return JSON.stringify({
            timestamp,
            level: upperLevel,
            tag,
            message: msg
        });
    }
    return `[${timestamp}] [${upperLevel}] [${tag}] ${msg}`;
}
function createLogger(tag) {
    const emit = (level, args)=>{
        if (LOG_LEVELS[level] < LOG_LEVELS[getMinLevel()]) return;
        const line = formatLine(level, tag, args);
        // Console output
        const fn = level === 'debug' ? console.debug : level === 'warn' ? console.warn : level === 'error' ? console.error : console.log;
        fn(line);
    };
    return {
        debug: (...args)=>emit('debug', args),
        info: (...args)=>emit('info', args),
        warn: (...args)=>emit('warn', args),
        error: (...args)=>emit('error', args)
    };
}


/***/ }),

/***/ 663033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 673429:
/***/ ((module) => {

"use strict";
module.exports = require("node:util/types");

/***/ }),

/***/ 710846:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 727740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ generateWithMiniMaxVideo)
/* harmony export */ });
/* unused harmony export testMiniMaxVideoConnectivity */
/** Ported from OpenMAIC. Original: lib/media/adapters/minimax-video-adapter.ts */ /**
 * MiniMax Video Generation Adapter
 * Supports: text-to-video with camera control commands
 * API: POST /v1/video_generation (submit) + GET /v1/query/video_generation?task_id=xxx (poll)
 * Docs: https://platform.minimaxi.com/docs/api-reference/video-generation-t2v
 */ const BASE_URL = 'https://api.minimaxi.com';
const POLL_INTERVAL_MS = 5000;
const MAX_POLL_ATTEMPTS = 120; // ~10 minutes max
async function submitTask(config, options) {
    const baseUrl = (config.baseUrl || BASE_URL).replace(/\/$/, '');
    const model = config.model || 'MiniMax-Hailuo-2.3';
    const duration = options.duration || 6;
    // Map OpenMAIC resolution to MiniMax format
    const resolutionMap = {
        '720p': '720P',
        '1080p': '1080P'
    };
    const resolution = resolutionMap[options.resolution || ''] || '768P';
    const response = await fetch(`${baseUrl}/v1/video_generation`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model,
            prompt: options.prompt,
            duration,
            resolution,
            prompt_optimizer: false
        })
    });
    if (!response.ok) {
        const errText = await response.text().catch(()=>response.statusText);
        throw new Error(`MiniMax Video submit error: ${errText}`);
    }
    const data = await response.json();
    if (data.base_resp?.status_code !== 0) {
        const code = data.base_resp?.status_code;
        const msg = data.base_resp?.status_msg || 'unknown error';
        throw new Error(`MiniMax Video API error ${code}: ${msg}`);
    }
    if (!data.task_id) {
        throw new Error(`MiniMax Video: no task_id returned. Response: ${JSON.stringify(data)}`);
    }
    return data.task_id;
}
async function pollTaskStatus(config, taskId) {
    const baseUrl = (config.baseUrl || BASE_URL).replace(/\/$/, '');
    const url = `${baseUrl}/v1/query/video_generation?task_id=${encodeURIComponent(taskId)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${config.apiKey}`
        }
    });
    if (!response.ok) {
        const errText = await response.text().catch(()=>response.statusText);
        throw new Error(`MiniMax Video poll error: ${errText}`);
    }
    return response.json();
}
async function retrieveFileDownloadUrl(config, fileId) {
    const baseUrl = (config.baseUrl || BASE_URL).replace(/\/$/, '');
    const url = `${baseUrl}/v1/files/retrieve?file_id=${encodeURIComponent(fileId)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${config.apiKey}`
        }
    });
    if (!response.ok) {
        const errText = await response.text().catch(()=>response.statusText);
        throw new Error(`MiniMax Video file retrieve error: ${errText}`);
    }
    const data = await response.json();
    if (data.base_resp?.status_code !== 0) {
        const code = data.base_resp?.status_code;
        const msg = data.base_resp?.status_msg || 'unknown error';
        throw new Error(`MiniMax Video file retrieve error ${code}: ${msg}`);
    }
    const downloadUrl = data.file?.download_url;
    if (!downloadUrl) {
        throw new Error(`MiniMax Video: no download_url returned. Response: ${JSON.stringify(data)}`);
    }
    return downloadUrl;
}
async function generateWithMiniMaxVideo(config, options) {
    // Step 1: Submit task
    const taskId = await submitTask(config, options);
    // Step 2: Poll until complete
    let lastStatus = '';
    let attempts = 0;
    while(attempts < MAX_POLL_ATTEMPTS){
        await new Promise((resolve)=>setTimeout(resolve, POLL_INTERVAL_MS));
        const result = await pollTaskStatus(config, taskId);
        lastStatus = result.status;
        if (result.status === 'Success') {
            if (!result.file_id) {
                throw new Error(`MiniMax Video: task succeeded but no file_id returned`);
            }
            const videoUrl = await retrieveFileDownloadUrl(config, result.file_id);
            return {
                url: videoUrl,
                width: result.video_width || 1920,
                height: result.video_height || 1080,
                duration: options.duration || 6
            };
        }
        if (result.status === 'Fail') {
            throw new Error(`MiniMax Video generation failed: ${result.base_resp?.status_msg || 'unknown'}`);
        }
        attempts++;
    }
    throw new Error(`MiniMax Video: timeout after ${MAX_POLL_ATTEMPTS} polls, last status: ${lastStatus}`);
}
async function testMiniMaxVideoConnectivity(config) {
    try {
        const baseUrl = (config.baseUrl || BASE_URL).replace(/\/$/, '');
        // Submit a minimal task and immediately check if it returns a task_id
        const response = await fetch(`${baseUrl}/v1/video_generation`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${config.apiKey}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                model: 'MiniMax-Hailuo-2.3',
                prompt: 'test connectivity',
                duration: 6,
                resolution: '768P'
            })
        });
        if (response.ok) {
            return {
                success: true,
                message: 'MiniMax Video API connected'
            };
        }
        const errData = await response.json().catch(()=>({}));
        const msg = errData?.base_resp?.status_msg || response.statusText;
        return {
            success: false,
            message: `API error: ${msg}`
        };
    } catch (err) {
        return {
            success: false,
            message: `Connection failed: ${err.message}`
        };
    }
}


/***/ }),

/***/ 744870:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 775919:
/***/ ((module) => {

"use strict";
module.exports = require("node:worker_threads");

/***/ }),

/***/ 777030:
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ 840610:
/***/ ((module) => {

"use strict";
module.exports = require("node:dns");

/***/ }),

/***/ 903295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 904151:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cL: () => (/* binding */ generateWithSeedance)
/* harmony export */ });
/* unused harmony exports testSeedanceConnectivity, submitSeedanceTask, pollSeedanceTask */
/** Ported from OpenMAIC. Original: lib/media/adapters/seedance-adapter.ts */ /**
 * Seedance (ByteDance / Doubao / Ark) Video Generation Adapter
 *
 * Uses async task pattern: submit task → poll until succeeded → get video URL.
 * Endpoint: https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks
 *
 * Request format (text-to-video):
 *   POST /api/v3/contents/generations/tasks
 *   {
 *     "model": "doubao-seedance-1-5-pro-251215",
 *     "content": [{ "type": "text", "text": "prompt here" }],
 *     "ratio": "16:9",
 *     "duration": 5,
 *     "resolution": "1080p",
 *     "watermark": false
 *   }
 *
 * Supported models:
 * - doubao-seedance-1-5-pro-251215     (latest, 4~12s)
 * - doubao-seedance-1-0-pro-250528     (stable, 2~12s)
 * - doubao-seedance-1-0-pro-fast-251015 (faster, 2~12s)
 * - doubao-seedance-1-0-lite-t2v-250428 (lightweight, 2~12s)
 *
 * API docs: https://www.volcengine.com/docs/6492/2165104
 */ const DEFAULT_MODEL = 'doubao-seedance-1-5-pro-251215';
const DEFAULT_BASE_URL = 'https://ark.cn-beijing.volces.com';
const POLL_INTERVAL_MS = 5000;
const MAX_POLL_ATTEMPTS = 60; // 5 minutes max
/**
 * Map aspect ratio to Seedance ratio format.
 * Seedance uses the same "W:H" format we already have.
 */ function toSeedanceRatio(aspectRatio) {
    if (!aspectRatio) return undefined;
    return aspectRatio; // Already in "16:9" format
}
/**
 * Map resolution to Seedance format.
 * Seedance expects "480p", "720p", "1080p".
 */ function toSeedanceResolution(resolution) {
    if (!resolution) return undefined;
    return resolution; // Already in "720p" format
}
/**
 * Estimate video dimensions from ratio and resolution for the result.
 */ function estimateDimensions(ratio, resolution) {
    const resMap = {
        '480p': 480,
        '720p': 720,
        '1080p': 1080
    };
    const h = resMap[resolution || '720p'] || 720;
    if (!ratio) return {
        width: Math.round(h * 16 / 9),
        height: h
    };
    const [w, hRatio] = ratio.split(':').map(Number);
    if (!w || !hRatio) return {
        width: Math.round(h * 16 / 9),
        height: h
    };
    return {
        width: Math.round(h * w / hRatio),
        height: h
    };
}
/**
 * Submit a video generation task to Seedance API.
 * Returns the task ID for polling.
 */ /**
 * Lightweight connectivity test — validates API key by making a GET request
 * to poll a non-existent task. If auth fails we get 401/403; if auth succeeds
 * we get 404 (task not found), confirming the key is valid.
 */ async function testSeedanceConnectivity(config) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    try {
        const response = await fetch(`${baseUrl}/api/v3/contents/generations/tasks/connectivity-test-nonexistent`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${config.apiKey}`
            }
        });
        // 401/403 means key invalid; anything else (404, 400, 200) means key works
        if (response.status === 401 || response.status === 403) {
            const text = await response.text();
            return {
                success: false,
                message: `Seedance auth failed (${response.status}): ${text}`
            };
        }
        return {
            success: true,
            message: 'Connected to Seedance'
        };
    } catch (err) {
        return {
            success: false,
            message: `Seedance connectivity error: ${err}`
        };
    }
}
async function submitSeedanceTask(config, options) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const body = {
        model: config.model || DEFAULT_MODEL,
        content: [
            {
                type: 'text',
                text: options.prompt
            }
        ],
        watermark: false
    };
    const ratio = toSeedanceRatio(options.aspectRatio);
    if (ratio) body.ratio = ratio;
    if (options.duration) body.duration = options.duration;
    const resolution = toSeedanceResolution(options.resolution);
    if (resolution) body.resolution = resolution;
    const response = await fetch(`${baseUrl}/api/v3/contents/generations/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Seedance task submission failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (!data.id) {
        throw new Error('Seedance returned empty task ID');
    }
    return data.id;
}
/**
 * Poll the status of a Seedance video generation task.
 * Returns the result if complete, null if still running.
 * Throws on failure.
 */ async function pollSeedanceTask(config, taskId) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const response = await fetch(`${baseUrl}/api/v3/contents/generations/tasks/${taskId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${config.apiKey}`
        }
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Seedance poll failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (data.status === 'succeeded') {
        if (!data.content?.video_url) {
            throw new Error('Seedance task succeeded but no video URL returned');
        }
        const dims = estimateDimensions(data.ratio, data.resolution);
        return {
            url: data.content.video_url,
            duration: data.duration || 5,
            width: dims.width,
            height: dims.height
        };
    }
    if (data.status === 'failed') {
        throw new Error(`Seedance video generation failed: ${data.error?.message || 'Unknown error'}`);
    }
    // queued or running
    return null;
}
/**
 * Generate a video using Seedance: submit task + poll until complete.
 */ async function generateWithSeedance(config, options) {
    const taskId = await submitSeedanceTask(config, options);
    for(let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++){
        await new Promise((resolve)=>setTimeout(resolve, POLL_INTERVAL_MS));
        const result = await pollSeedanceTask(config, taskId);
        if (result) return result;
    }
    throw new Error(`Seedance video generation timed out after ${MAX_POLL_ATTEMPTS * POLL_INTERVAL_MS / 1000}s (task: ${taskId})`);
}


/***/ }),

/***/ 932467:
/***/ ((module) => {

"use strict";
module.exports = require("node:http2");

/***/ }),

/***/ 937067:
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ 977598:
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ 986439:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,426,7774,4007], () => (__webpack_exec__(174842)));
module.exports = __webpack_exports__;

})();