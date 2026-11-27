"use strict";
(() => {
var exports = {};
exports.id = 6519;
exports.ids = [4307,6519];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 79868:
/***/ ((module) => {

module.exports = require("node:sqlite");

/***/ }),

/***/ 87997:
/***/ ((module) => {

module.exports = require("node:timers");

/***/ }),

/***/ 108128:
/***/ ((module) => {

module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

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

/***/ 134589:
/***/ ((module) => {

module.exports = require("node:assert");

/***/ }),

/***/ 144865:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

/***/ }),

/***/ 157075:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 164939:
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ 173136:
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ 176760:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 192280:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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

module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ 226849:
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/client");

/***/ }),

/***/ 257975:
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ 265940:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
        page: "/api/user/api-keys/route",
        pathname: "/api/user/api-keys",
        filename: "route",
        bundlePath: "app/api/user/api-keys/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/user/api-keys/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(894011),
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
    let srcPage = "/api/user/api-keys/route";
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

/***/ 274552:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 300643:
/***/ ((module) => {

module.exports = require("node:perf_hooks");

/***/ }),

/***/ 319225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


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

module.exports = require("os");

/***/ }),

/***/ 333873:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 337540:
/***/ ((module) => {

module.exports = require("node:console");

/***/ }),

/***/ 353053:
/***/ ((module) => {

module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 478474:
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ 500770:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Uy: () => (/* binding */ BYOK_PROVIDER_BY_ID),
/* harmony export */   ln: () => (/* binding */ BYOK_PROVIDERS)
/* harmony export */ });
/* unused harmony export BYOK_MONO_LOGO_IDS */
/**
 * BYOK provider metadata for the app-wide Settings UI.
 *
 * Lightweight, client-safe subset of the full PROVIDERS registry in
 * src/lib/ai/providers.ts. We don't import that file directly because it
 * pulls in @ai-sdk/* packages (heavy, server-leaning) and the BYOK UI is
 * a client component mounted inside the SettingsDialog.
 *
 * Fields:
 *   id           — provider ID, matches PROVIDERS keys
 *   name         — display name
 *   type         — provider type, drives the test endpoint strategy
 *   defaultBaseUrl — used to pre-fill the Base URL field in the UI
 *   icon         — logo path under /public/openmaic/logos/
 *   keyHint      — placeholder shown in the API key input
 *   requiresKey  — false for keyless providers like Ollama
 */ const L = '/openmaic/logos';
const BYOK_PROVIDERS = [
    {
        id: 'openai',
        name: 'OpenAI',
        type: 'openai',
        defaultBaseUrl: 'https://api.openai.com/v1',
        icon: `${L}/openai.svg`,
        keyHint: 'sk-proj-...',
        requiresKey: true
    },
    {
        id: 'anthropic',
        name: 'Anthropic (Claude)',
        type: 'anthropic',
        defaultBaseUrl: 'https://api.anthropic.com',
        icon: `${L}/claude.svg`,
        keyHint: 'sk-ant-...',
        requiresKey: true
    },
    {
        id: 'google',
        name: 'Google Gemini',
        type: 'google',
        defaultBaseUrl: 'https://generativelanguage.googleapis.com',
        icon: `${L}/gemini.svg`,
        keyHint: 'AIza...',
        requiresKey: true
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        type: 'openai',
        defaultBaseUrl: 'https://api.deepseek.com/v1',
        icon: `${L}/deepseek.svg`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'glm',
        name: 'GLM (Zhipu)',
        type: 'openai',
        defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
        icon: `${L}/glm.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'qwen',
        name: 'Qwen (DashScope)',
        type: 'openai',
        defaultBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        icon: `${L}/qwen.svg`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'kimi',
        name: 'Kimi (Moonshot)',
        type: 'openai',
        defaultBaseUrl: 'https://api.moonshot.cn/v1',
        icon: `${L}/kimi.png`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'minimax',
        name: 'MiniMax',
        type: 'anthropic',
        defaultBaseUrl: 'https://api.minimaxi.com/anthropic/v1',
        icon: `${L}/minimax.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'siliconflow',
        name: 'SiliconFlow',
        type: 'openai',
        defaultBaseUrl: 'https://api.siliconflow.cn/v1',
        icon: `${L}/siliconflow.svg`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'doubao',
        name: 'Doubao (Volcengine Ark)',
        type: 'openai',
        defaultBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
        icon: `${L}/doubao.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'openrouter',
        name: 'OpenRouter',
        type: 'openai',
        defaultBaseUrl: 'https://openrouter.ai/api/v1',
        icon: `${L}/openrouter.svg`,
        keyHint: 'sk-or-...',
        requiresKey: true
    },
    {
        id: 'grok',
        name: 'Grok (xAI)',
        type: 'openai',
        defaultBaseUrl: 'https://api.x.ai/v1',
        icon: `${L}/grok.svg`,
        keyHint: 'xai-...',
        requiresKey: true
    },
    {
        id: 'xiaomi',
        name: 'Xiaomi MiMo',
        type: 'openai',
        defaultBaseUrl: 'https://api.xiaomimimo.com/v1',
        icon: `${L}/xiaomi.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'ollama',
        name: 'Ollama (local)',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:11434',
        icon: `${L}/ollama.svg`,
        keyHint: '(no key needed — local only)',
        requiresKey: false
    },
    {
        id: 'freellmapi',
        name: 'FreeLLMAPI (free-tier router)',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:3001/v1',
        icon: `${L}/freellmapi.svg`,
        keyHint: 'freellmapi-… (unified key from its dashboard)',
        requiresKey: true
    },
    {
        id: 'medq-router',
        name: 'MedQ AI Router (this app)',
        type: 'openai',
        // Same-origin wire surface — the AI Router tab links this automatically,
        // so the default is only a prefill for manual adds.
        defaultBaseUrl: '/v1',
        icon: `${L}/freellmapi.svg`,
        keyHint: 'freellm… (unified key from the AI Router tab)',
        requiresKey: true
    },
    {
        id: 'lemonade',
        name: 'Lemonade (local)',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:13305/v1',
        icon: `${L}/lemonade.svg`,
        keyHint: '(no key needed — local only)',
        requiresKey: false
    }
];
const BYOK_PROVIDER_BY_ID = Object.fromEntries(BYOK_PROVIDERS.map((p)=>[
        p.id,
        p
    ]));
/** Monochrome SVG logos that need a dark background to render correctly. */ const BYOK_MONO_LOGO_IDS = new Set([
    'openai',
    'openrouter',
    'ollama',
    'siliconflow'
]);


/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 541692:
/***/ ((module) => {

module.exports = require("node:tls");

/***/ }),

/***/ 541792:
/***/ ((module) => {

module.exports = require("node:querystring");

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 638522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 653165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 673429:
/***/ ((module) => {

module.exports = require("node:util/types");

/***/ }),

/***/ 710846:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 744870:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 775919:
/***/ ((module) => {

module.exports = require("node:worker_threads");

/***/ }),

/***/ 777030:
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ 789967:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ testProviderApiKey)
/* harmony export */ });
/* harmony import */ var _lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(124307);
/* harmony import */ var _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(500770);
/**
 * Provider key testing — server-only.
 *
 * Verifies a user-supplied API key actually works against the upstream
 * provider, before we let the user save it (or as a "Test" button action).
 *
 * Strategy: do the CHEAPEST possible authenticated call against each provider:
 *   - OpenAI-compatible (OpenAI, DeepSeek, GLM, Qwen, Kimi, SiliconFlow,
 *     Doubao, OpenRouter, Grok, Xiaomi, Lemonade): GET /models with the
 *     Bearer key. Returns 200 if the key is valid.
 *   - Anthropic (incl. MiniMax which uses the Anthropic API): POST /v1/messages
 *     with a 1-token "hi" request. Returns 200 if the key is valid.
 *     (Anthropic has no /models endpoint that accepts only an API key.)
 *   - Google Gemini: GET /v1beta/models?key=… — returns 200 if key is valid.
 *   - Ollama: GET /api/tags — works without a key, so we just check the URL
 *     is reachable.
 *
 * We deliberately avoid importing the heavy @ai-sdk/* provider packages here —
 * this is a single fetch per test, and pulling in the SDK would balloon this
 * route's cold start.
 */ 

const TIMEOUT_MS = 10000;
async function fetchWithTimeout(url, init) {
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), TIMEOUT_MS);
    try {
        // Stage 9: safeFetch pre-flights the URL AND pins the connect-time DNS
        // lookup through an undici Agent with a custom lookup that re-validates
        // IPs at connect time. This closes the DNS-rebinding TOCTOU gap between
        // the validateUrlForSSRF pre-flight (line 77) and the actual fetch.
        // See docs/runbook.md#ssrf-blocked.
        return await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_0__/* .safeFetch */ .aO)(url, {
            ...init,
            signal: controller.signal
        });
    } finally{
        clearTimeout(timer);
    }
}
/**
 * Resolve the base URL for a provider: explicit param > provider default > fail.
 */ function resolveBaseUrl(providerId, override) {
    if (override && override.trim()) return override.trim();
    const provider = _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_1__/* .BYOK_PROVIDER_BY_ID */ .Uy[providerId];
    return provider?.defaultBaseUrl || null;
}
async function testProviderApiKey(providerId, params) {
    const provider = _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_1__/* .BYOK_PROVIDER_BY_ID */ .Uy[providerId];
    if (!provider) {
        return {
            ok: false,
            error: `Unknown provider: ${providerId}`
        };
    }
    const baseUrl = resolveBaseUrl(providerId, params.baseUrl);
    if (!baseUrl) {
        return {
            ok: false,
            error: 'No base URL configured for this provider'
        };
    }
    // SSRF guard — same check the model resolver uses for unmanaged providers.
    if (true) {
        const ssrfError = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_0__/* .validateUrlForSSRF */ .VG)(baseUrl);
        if (ssrfError) return {
            ok: false,
            error: ssrfError
        };
    }
    try {
        return await dispatchTest(providerId, provider.type, baseUrl, params.apiKey);
    } catch (e) {
        return {
            ok: false,
            error: e?.message || 'Network error while testing the key'
        };
    }
}
async function dispatchTest(providerId, providerType, baseUrl, apiKey) {
    // Ollama is keyless — just probe /api/tags.
    if (providerId === 'ollama' || providerId === 'lemonade') {
        try {
            const res = await fetchWithTimeout(`${baseUrl.replace(/\/v1\/?$/, '')}/api/tags`);
            if (res.ok) {
                // Parse model list from Ollama's /api/tags response.
                let models;
                try {
                    const json = await res.json();
                    if (Array.isArray(json?.models)) {
                        models = json.models.map((m)=>m.name || m.model).filter(Boolean);
                    }
                } catch  {}
                return {
                    ok: true,
                    model: providerId,
                    models
                };
            }
            return {
                ok: false,
                error: `${providerId} returned ${res.status}`
            };
        } catch (e) {
            return {
                ok: false,
                error: `Cannot reach ${providerId} at ${baseUrl}: ${e?.message || e}`
            };
        }
    }
    // Anthropic-style API (also MiniMax which uses the Anthropic API):
    // POST /v1/messages with a 1-token "hi" — /v1/models doesn't accept
    // the simple API-key auth header.
    if (providerType === 'anthropic') {
        const url = `${baseUrl.replace(/\/$/, '')}/v1/messages`;
        try {
            const res = await fetchWithTimeout(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true'
                },
                body: JSON.stringify({
                    model: 'claude-haiku-4-5',
                    max_tokens: 1,
                    messages: [
                        {
                            role: 'user',
                            content: 'hi'
                        }
                    ]
                })
            });
            if (res.ok) return {
                ok: true,
                model: 'claude-haiku-4-5'
            };
            // 401/403 → bad key. 400/404 → bad model. 5xx → upstream issue.
            if (res.status === 401 || res.status === 403) {
                return {
                    ok: false,
                    error: `Invalid API key (HTTP ${res.status})`
                };
            }
            const text = await res.text().catch(()=>'');
            return {
                ok: false,
                error: `Anthropic returned ${res.status}: ${text.slice(0, 200)}`
            };
        } catch (e) {
            return {
                ok: false,
                error: e?.message || 'Network error'
            };
        }
    }
    // Google Gemini: GET /v1beta/models?key=…
    if (providerType === 'google') {
        const url = `${baseUrl.replace(/\/$/, '')}/v1beta/models?key=${encodeURIComponent(apiKey)}`;
        try {
            const res = await fetchWithTimeout(url);
            if (res.ok) {
                let models;
                try {
                    const json = await res.json();
                    if (Array.isArray(json?.models)) {
                        models = json.models.map((m)=>m.name?.replace('models/', '')).filter(Boolean);
                    }
                } catch  {}
                return {
                    ok: true,
                    model: 'gemini',
                    models
                };
            }
            if (res.status === 400 || res.status === 401 || res.status === 403) {
                return {
                    ok: false,
                    error: `Invalid API key (HTTP ${res.status})`
                };
            }
            return {
                ok: false,
                error: `Google returned ${res.status}`
            };
        } catch (e) {
            return {
                ok: false,
                error: e?.message || 'Network error'
            };
        }
    }
    // Default: OpenAI-compatible — GET /models with Bearer auth.
    const url = `${baseUrl.replace(/\/$/, '')}/models`;
    try {
        const res = await fetchWithTimeout(url, {
            headers: {
                authorization: `Bearer ${apiKey}`,
                accept: 'application/json'
            }
        });
        if (res.ok) {
            // Parse the full model list so the UI can populate the models section.
            let model;
            let models;
            try {
                const json = await res.json();
                const list = json?.data || json?.models;
                if (Array.isArray(list) && list.length > 0) {
                    models = list.map((m)=>m.id).filter(Boolean);
                    model = models[0];
                }
            } catch  {
            // Ignore — model is just informational.
            }
            return {
                ok: true,
                model,
                models
            };
        }
        if (res.status === 401 || res.status === 403) {
            return {
                ok: false,
                error: `Invalid API key (HTTP ${res.status})`
            };
        }
        const text = await res.text().catch(()=>'');
        return {
            ok: false,
            error: `${providerId} returned ${res.status}: ${text.slice(0, 200)}`
        };
    } catch (e) {
        return {
            ok: false,
            error: e?.message || 'Network error'
        };
    }
}


/***/ }),

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 894011:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   PATCH: () => (/* binding */ PATCH),
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(122035);
/* harmony import */ var _lib_server_byok__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(735566);
/* harmony import */ var _lib_server_provider_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(834007);
/* harmony import */ var _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(500770);
/* harmony import */ var _lib_server_byok_test__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(789967);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_server_byok__WEBPACK_IMPORTED_MODULE_2__]);
([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_server_byok__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * BYOK API routes — /api/user/api-keys
 *
 *   GET    /api/user/api-keys           → list user's saved endpoints (metadata only)
 *   POST   /api/user/api-keys           → save an endpoint (new row, or update by `id`)
 *   PATCH  /api/user/api-keys           → update modelsConfig only (no key re-entry)
 *
 * A user may save MULTIPLE endpoints per provider (multi-endpoint BYOK):
 * each POST without `id` appends a new endpoint (key + baseUrl + label).
 * POST with `id` updates that endpoint in place (empty apiKey keeps the
 * stored key). Keyless providers (Ollama, Lemonade) accept endpoints with a
 * baseUrl and no key.
 *
 * Endpoint management (enable / reorder / delete one) lives on the
 * [providerId] sub-route:
 *   PATCH  /api/user/api-keys/[providerId]   {keyId, enabled?} | {keyId, move}
 *   DELETE /api/user/api-keys/[providerId]   ?keyId=… (one) | all
 *
 * All routes require authentication via NextAuth (session). Guest users are
 * rejected — BYOK is a per-account feature, and allowing guest keys would
 * share them across every guest.
 */ 





// ── GET: list user's saved endpoints ──
async function GET(req) {
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .getAuthenticatedUserId */ .At)(req);
    if (!userId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Authentication required'
        }, {
            status: 401
        });
    }
    try {
        const keys = await (0,_lib_server_byok__WEBPACK_IMPORTED_MODULE_2__/* .listUserApiKeys */ .IW)(userId);
        // Annotate each endpoint with whether the operator has also configured
        // this provider server-side — in that case the operator's key wins for
        // managed-key providers and the UI shows that hint.
        const annotated = keys.map((k)=>({
                ...k,
                isServerManaged: (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_3__/* .isServerConfiguredProvider */ .$q)('providers', k.providerId)
            }));
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            keys: annotated
        });
    } catch (e) {
        console.error('[api/user/api-keys GET]', e);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Failed to load API keys'
        }, {
            status: 500
        });
    }
}
// ── POST: save an endpoint (create) or update one (by `id`) ──
const MAX_BODY = 16 * 1024; // 16KB — API keys are tiny, anything bigger is suspicious
async function POST(req) {
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .getAuthenticatedUserId */ .At)(req);
    if (!userId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Authentication required'
        }, {
            status: 401
        });
    }
    let body;
    try {
        const text = await req.text();
        if (text.length > MAX_BODY) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Request body too large'
            }, {
                status: 413
            });
        }
        body = JSON.parse(text);
    } catch  {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Invalid JSON'
        }, {
            status: 400
        });
    }
    const providerId = body.providerId?.trim();
    const apiKey = body.apiKey?.trim() ?? '';
    if (!providerId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'providerId is required'
        }, {
            status: 400
        });
    }
    // Validate providerId against the known registry — prevents storing keys
    // for made-up providers that nothing will ever resolve.
    if (!_lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_4__/* .BYOK_PROVIDER_BY_ID */ .Uy[providerId]) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: `Unknown provider: ${providerId}`
        }, {
            status: 400
        });
    }
    // Keyless providers (Ollama / Lemonade) may save an endpoint with only a
    // base URL — "my local Ollama" is a legitimate endpoint. Everything else
    // requires a key.
    const keyless = _lib_server_byok__WEBPACK_IMPORTED_MODULE_2__/* .KEYLESS_PROVIDER_IDS */ .UM.has(providerId);
    const hasBaseUrl = !!body.baseUrl?.trim();
    if (!apiKey && !keyless) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'apiKey is required'
        }, {
            status: 400
        });
    }
    if (!apiKey && keyless && !hasBaseUrl && !body.id) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Provide an API key or a base URL for this endpoint'
        }, {
            status: 400
        });
    }
    try {
        // Optional pre-save test: fail the save if the endpoint doesn't work.
        // Useful for the UI's "Save & Test" button — atomic feedback to the user.
        // When UPDATING without a new key, test against the stored key by id.
        if (body.test) {
            if (body.id && !apiKey) {
                // Test the stored endpoint directly (row lookup + decrypt + test).
                const testResult = await testSavedEndpoint(userId, body.id, providerId);
                if (!testResult.ok) {
                    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                        error: `Key test failed: ${testResult.error}`,
                        tested: true
                    }, {
                        status: 400
                    });
                }
            } else {
                const testResult = await (0,_lib_server_byok_test__WEBPACK_IMPORTED_MODULE_5__/* .testProviderApiKey */ .p)(providerId, {
                    apiKey,
                    baseUrl: body.baseUrl ?? null
                });
                if (!testResult.ok) {
                    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                        error: `Key test failed: ${testResult.error}`,
                        tested: true
                    }, {
                        status: 400
                    });
                }
            }
        }
        const saved = await (0,_lib_server_byok__WEBPACK_IMPORTED_MODULE_2__/* .saveUserApiKey */ .KA)(userId, providerId, {
            ...body.id ? {
                id: body.id
            } : {},
            apiKey,
            baseUrl: body.baseUrl ?? null,
            label: body.label ?? null,
            modelsConfig: body.modelsConfig ?? null
        });
        if (body.test && saved.id) {
            // Mark as verified — the test above passed.
            await (0,_lib_server_byok__WEBPACK_IMPORTED_MODULE_2__/* .markUserApiKeyVerified */ .Os)(userId, saved.id);
            saved.lastVerifiedAt = new Date().toISOString();
        }
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            key: {
                ...saved,
                isServerManaged: (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_3__/* .isServerConfiguredProvider */ .$q)('providers', providerId)
            }
        });
    } catch (e) {
        console.error('[api/user/api-keys POST]', e);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: e?.message || 'Failed to save API key'
        }, {
            status: 500
        });
    }
}
/** Test a stored endpoint by row id (used by the update-without-key path). */ async function testSavedEndpoint(userId, keyId, providerId) {
    const { db } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 520903));
    const { decryptEndpointKey } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 735566));
    const row = await db.userApiKey.findFirst({
        where: {
            id: keyId,
            userId
        }
    });
    if (!row) return {
        ok: false,
        error: 'Endpoint not found'
    };
    if (row.providerId !== providerId) return {
        ok: false,
        error: 'Endpoint/provider mismatch'
    };
    try {
        const apiKey = decryptEndpointKey(row.encryptedKey, row.iv, row.authTag);
        return (0,_lib_server_byok_test__WEBPACK_IMPORTED_MODULE_5__/* .testProviderApiKey */ .p)(providerId, {
            apiKey,
            baseUrl: row.baseUrl
        });
    } catch (e) {
        return {
            ok: false,
            error: e?.message || 'Decryption failed'
        };
    }
}
// ── PATCH: update modelsConfig only (no key re-entry required) ──
//
// Used by the per-model add/edit/delete UI. Body:
//   { providerId, modelsConfig: ByokModelConfig[] | null }
// Applies to ALL endpoint rows of that provider (the model catalog is
// per-provider, not per-endpoint).
async function PATCH(req) {
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .getAuthenticatedUserId */ .At)(req);
    if (!userId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Authentication required'
        }, {
            status: 401
        });
    }
    let body;
    try {
        const text = await req.text();
        if (text.length > MAX_BODY) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Request body too large'
            }, {
                status: 413
            });
        }
        body = JSON.parse(text);
    } catch  {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Invalid JSON'
        }, {
            status: 400
        });
    }
    const providerId = body.providerId?.trim();
    if (!providerId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'providerId is required'
        }, {
            status: 400
        });
    }
    if (!_lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_4__/* .BYOK_PROVIDER_BY_ID */ .Uy[providerId]) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: `Unknown provider: ${providerId}`
        }, {
            status: 400
        });
    }
    try {
        await (0,_lib_server_byok__WEBPACK_IMPORTED_MODULE_2__/* .updateModelsConfig */ .IT)(userId, providerId, body.modelsConfig ?? null);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            ok: true
        });
    } catch (e) {
        console.error('[api/user/api-keys PATCH]', e);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: e?.message || 'Failed to update models config'
        }, {
            status: 500
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 932467:
/***/ ((module) => {

module.exports = require("node:http2");

/***/ }),

/***/ 937067:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 977598:
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ 986439:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,426,7774,859,2035,4007,5566], () => (__webpack_exec__(265940)));
module.exports = __webpack_exports__;

})();