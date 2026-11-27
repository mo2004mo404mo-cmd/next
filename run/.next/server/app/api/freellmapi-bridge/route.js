"use strict";
(() => {
var exports = {};
exports.id = 4127;
exports.ids = [4127];
exports.modules = {

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 108128:
/***/ ((module) => {

module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 144865:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

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

/***/ 274552:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

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

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 397667:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   dynamic: () => (/* binding */ dynamic),
/* harmony export */   runtime: () => (/* binding */ runtime)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(51455);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(122035);
/* harmony import */ var _lib_freellmapi_embedded__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(430865);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__]);
_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * /api/freellmapi-bridge — the MedQ ⇄ FreeLLM API auth bridge.
 *
 * This is the piece that LINKS the AI Router tab with MedQ: a signed-in MedQ
 * user gets a FreeLLMAPI dashboard session token minted for them, server
 * side, so the native tab never shows a second login. The sidecar's
 * dashboard is single-operator by design (freellmapi upstream), so the
 * bridge speaks for one MedQ-owned service account whose credentials live
 * in freellmapi/server/data/medq-bridge.json — never in the client.
 *
 * #MEDQ-embedded: the AI Router now runs INSIDE the Next.js process (see
 * src/lib/freellmapi-embedded.ts); the upstream below resolves to its
 * ephemeral in-process port automatically.
 *
 * Flow (POST, requires a MedQ session):
 *   1. probe the router (livez)                       → 502-style error if down
 *   2. GET  /api/auth/status                        → needsSetup? authenticated?
 *   3. needsSetup → POST /api/auth/setup            → claim with bridge creds
 *      (loopback origin ⇒ no setup code required — see the sidecar runbook)
 *   4. POST /api/auth/login with bridge creds       → { token }
 *   5. hand the token to the caller (Bearer for /freellmapi/api/*)
 *
 * GET returns a status probe (router up? bridge credentials present?) for
 * the tab's header health dot — no MedQ auth needed.
 */ 




const runtime = 'nodejs';
const dynamic = 'force-dynamic';
const BRIDGE_FILE = node_path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'freellmapi', 'server', 'data', 'medq-bridge.json');
function generatePassword() {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    const bytes = new Uint8Array(24);
    globalThis.crypto.getRandomValues(bytes);
    return Array.from(bytes, (b)=>alphabet[b % alphabet.length]).join('');
}
async function readBridgeCreds() {
    try {
        const raw = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.readFile)(BRIDGE_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed.email && parsed.password) return parsed;
        return null;
    } catch  {
        return null;
    }
}
async function writeBridgeCreds(creds) {
    await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.mkdir)(node_path__WEBPACK_IMPORTED_MODULE_2___default().dirname(BRIDGE_FILE), {
        recursive: true
    });
    await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.writeFile)(BRIDGE_FILE, JSON.stringify({
        ...creds,
        note: 'MedQ-to-freellmapi auth bridge credentials (auto-managed by /api/freellmapi-bridge).'
    }, null, 2), 'utf8');
}
async function sidecar(pathname, init) {
    return fetch(new URL(pathname, (0,_lib_freellmapi_embedded__WEBPACK_IMPORTED_MODULE_4__/* .freellmapiUpstream */ .F3)()), {
        ...init,
        headers: {
            'content-type': 'application/json',
            ...init?.headers ?? {}
        },
        cache: 'no-store'
    });
}
/** GET — light probe for the tab header: is the sidecar alive + bridgeable? */ async function GET() {
    let up = false;
    let version = null;
    try {
        const res = await sidecar('/livez');
        up = res.ok;
        if (res.ok) {
            const body = await res.json().catch(()=>null);
            version = body?.version ?? null;
        }
    } catch  {
        up = false;
    }
    const creds = await readBridgeCreds();
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        up,
        version,
        bridged: up && !!creds,
        needsCreds: up && !creds
    }, {
        headers: {
            'Cache-Control': 'no-store'
        }
    });
}
/** POST — mint a sidecar dashboard session for the signed-in MedQ user. */ async function POST(req) {
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__/* .getAuthenticatedUserId */ .At)(req).catch(()=>null);
    if (!userId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            ok: false,
            code: 'medq_auth_required',
            error: 'Sign in to MedQ to use the AI Router.'
        }, {
            status: 401
        });
    }
    // 1. AI Router reachable? (It is embedded in this app and boots with it.)
    let livez;
    try {
        livez = await sidecar('/livez');
    } catch  {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            ok: false,
            code: 'sidecar_down',
            error: 'The embedded AI Router is not responding. It starts together with the MedQ server — check the startup logs for [freellmapi] lines, then retry.'
        }, {
            status: 502
        });
    }
    if (!livez.ok) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            ok: false,
            code: 'sidecar_down',
            error: `AI Router unhealthy (HTTP ${livez.status}).`
        }, {
            status: 502
        });
    }
    // 2. What does its auth state look like?
    const statusRes = await sidecar('/api/auth/status');
    if (!statusRes.ok) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            ok: false,
            code: 'sidecar_error',
            error: `AI Router auth endpoint failed (HTTP ${statusRes.status}).`
        }, {
            status: 502
        });
    }
    const status = await statusRes.json();
    // 3. First run ever → claim the dashboard under a MedQ service account.
    let creds = await readBridgeCreds();
    if (status.needsSetup) {
        creds = creds ?? {
            email: 'medq-router@medq.local',
            password: generatePassword()
        };
        const setupRes = await sidecar('/api/auth/setup', {
            method: 'POST',
            body: JSON.stringify({
                email: creds.email,
                password: creds.password
            })
        });
        // 409 setup_complete is fine — someone claimed it out-of-band with the
        // same or different credentials; the login attempt below decides.
        if (!setupRes.ok && setupRes.status !== 409) {
            const body = await setupRes.json().catch(()=>null);
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                ok: false,
                code: 'setup_failed',
                error: body?.error?.message ?? 'Could not initialise the AI Router account.'
            }, {
                status: 502
            });
        }
        await writeBridgeCreds(creds);
    }
    if (!creds) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            ok: false,
            code: 'bridge_not_configured',
            error: 'The AI Router is already claimed but no bridge credentials are on file. ' + 'Create freellmapi/server/data/medq-bridge.json with the dashboard email/password, then retry.'
        }, {
            status: 409
        });
    }
    // 4. Login → token.
    const loginRes = await sidecar('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email: creds.email,
            password: creds.password
        })
    });
    if (!loginRes.ok) {
        const body = await loginRes.json().catch(()=>null);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            ok: false,
            code: loginRes.status === 429 ? 'rate_limited' : 'bridge_credentials_invalid',
            error: body?.error?.message ?? 'The AI Router rejected the bridge credentials. If the dashboard password was changed, update freellmapi/server/data/medq-bridge.json.'
        }, {
            status: 502
        });
    }
    const session = await loginRes.json();
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        ok: true,
        token: session.token,
        email: session.email
    }, {
        headers: {
            'Cache-Control': 'no-store'
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 430865:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F3: () => (/* binding */ freellmapiUpstream)
/* harmony export */ });
/* unused harmony exports embeddedFreellmapiReady, startEmbeddedFreellmapi */
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(173136);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_2__);
/**
 * #MEDQ-embedded FreeLLM API — the AI Router as PART of the main app.
 *
 * Historically the freellmapi suite ran as a separate Express process on
 * 127.0.0.1:3002 that had to be started alongside the Next.js app
 * (scripts/start-freellmapi.sh). This module embeds it IN-PROCESS instead:
 * the Next.js server (via src/instrumentation-nodejs.ts) imports the sidecar's
 * built entry (freellmapi/server/dist/index.js), boots its Express app on an
 * EPHEMERAL loopback port (listen 0 — no fixed port, nothing enumerable from
 * outside), and publishes the assigned port on globalThis for the in-app
 * reverse proxy (src/lib/freellmapi-proxy.ts) and the auth bridge
 * (src/app/api/freellmapi-bridge) to pick up per-request.
 *
 * Result: ONE process, ONE public port (3000). /freellm, /freellmapi and /v1
 * all flow through the Next.js origin into the embedded Express app; the
 * sidecar's background services (health checker, catalog sync, cooldown
 * probes, backups) run inside the same process and live/die with it.
 *
 * Fallbacks, in resolution order (see freellmapiUpstream()):
 *   1. FREELLMAPI_UPSTREAM env — explicit operator override (e.g. debugging
 *      against a separately-run standalone sidecar); wins over embedding.
 *   2. The embedded server's ephemeral port (normal operation).
 *   3. http://127.0.0.1:3002 — the legacy standalone sidecar, kept so an
 *      operator can still run scripts/start-freellmapi.sh if they prefer.
 */ 


/** Absolute path to the sidecar's built server entry (ESM). */ const SIDECAR_ENTRY = node_path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'freellmapi', 'server', 'dist', 'index.js');
/** Absolute path to the sidecar's .env (ENCRYPTION_KEY & friends). */ const SIDECAR_ENV = node_path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'freellmapi', '.env');
/**
 * Upstream base URL for reaching the AI Router from inside the Next.js
 * process. Evaluated per-call (NOT at module scope) so the embedded port —
 * assigned during instrumentation, before the first request — is always seen.
 */ function freellmapiUpstream() {
    if (process.env.FREELLMAPI_UPSTREAM) return process.env.FREELLMAPI_UPSTREAM;
    const port = globalThis.__FREELLMAPI_EMBEDDED_PORT__;
    if (typeof port === 'number' && port > 0) return `http://127.0.0.1:${port}`;
    return 'http://127.0.0.1:3002';
}
/** True when the embedded sidecar booted and owns its socket. */ function embeddedFreellmapiReady() {
    return typeof globalThis.__FREELLMAPI_EMBEDDED_PORT__ === 'number';
}
/**
 * Boot the sidecar inside this process. Idempotent; never throws to the
 * caller's caller without being caught first (instrumentation wraps this in
 * try/catch — a sidecar failure must never block the app from serving).
 */ async function startEmbeddedFreellmapi() {
    if (embeddedFreellmapiReady()) return; // already booted (HMR re-register etc.)
    if (!existsSync(SIDECAR_ENTRY)) {
        console.warn(`[freellmapi] embedded server entry missing (${SIDECAR_ENTRY}). ` + 'Build it (cd freellmapi && npm run build -w server) — the AI Router tab will stay offline until then.');
        return;
    }
    // Point the sidecar's dotenv loader at ITS OWN .env before its modules load
    // (its env.ts honours FREEAPI_ENV_PATH precisely for embedders). Snapshot
    // PORT/HOST around the import: the sidecar .env carries PORT=3002 /
    // HOST=127.0.0.1, and dotenv would plant them on the Next.js process — the
    // -p 3000 CLI flag still wins the bind, but no downstream tooling should
    // ever observe a stale PORT from the sidecar's file.
    process.env.FREEAPI_ENV_PATH = SIDECAR_ENV;
    const prevPort = process.env.PORT;
    const prevHost = process.env.HOST;
    // Runtime import of on-disk ESM that must NEVER be bundled: `new Function`
    // keeps webpack/turbopack from rewriting the specifier into a context
    // module, so the sidecar's real module graph (and its own node_modules)
    // resolves exactly as in standalone mode.
    const runtimeImport = new Function('specifier', 'return import(specifier)');
    let mod;
    try {
        mod = await runtimeImport(pathToFileURL(SIDECAR_ENTRY).href);
    } finally{
        if (prevPort === undefined) delete process.env.PORT;
        else process.env.PORT = prevPort;
        if (prevHost === undefined) delete process.env.HOST;
        else process.env.HOST = prevHost;
    }
    if (typeof mod?.startServer !== 'function') {
        throw new Error('freellmapi/server/dist/index.js does not export startServer() — ' + 'rebuild the sidecar (cd freellmapi && npm run build -w server).');
    }
    // Ephemeral loopback port (0 = OS-assigned): the AI Router has no fixed TCP
    // port of its own any more; it is reachable only through the MedQ origin.
    const server = await mod.startServer({
        port: 0,
        host: '127.0.0.1',
        embedded: true
    });
    await new Promise((resolve, reject)=>{
        if (server.listening) return resolve();
        server.once?.('listening', ()=>resolve());
        server.once?.('error', (err)=>reject(err));
    });
    const addr = server.address?.();
    const port = typeof addr === 'object' && addr && typeof addr.port === 'number' ? addr.port : 0;
    if (!port) throw new Error('embedded sidecar reported no listening port');
    globalThis.__FREELLMAPI_EMBEDDED_PORT__ = port;
    console.log(`[freellmapi] embedded AI Router listening on 127.0.0.1:${port} (in-process, no separate app — served through the MedQ origin on port 3000)`);
}


/***/ }),

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 456780:
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
        page: "/api/freellmapi-bridge/route",
        pathname: "/api/freellmapi-bridge",
        filename: "route",
        bundlePath: "app/api/freellmapi-bridge/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/freellmapi-bridge/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(397667),
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
    let srcPage = "/api/freellmapi-bridge/route";
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

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 663033:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 710846:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 744870:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 973024:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 986439:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,859,2035], () => (__webpack_exec__(456780)));
module.exports = __webpack_exports__;

})();