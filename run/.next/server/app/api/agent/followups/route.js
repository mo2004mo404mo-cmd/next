"use strict";
(() => {
var exports = {};
exports.id = 3687;
exports.ids = [3687,6389];
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

/***/ 286155:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _4: () => (/* binding */ buildZaiBackupModel),
/* harmony export */   gi: () => (/* binding */ buildFastModel),
/* harmony export */   qW: () => (/* binding */ buildAuxModel)
/* harmony export */ });
/* unused harmony exports fastModelName, AUX_MODEL_TIMEOUT_MS, buildPrimaryEnvModel */
/* harmony import */ var _langchain_openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(618093);
/* harmony import */ var _key_pool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(858701);
/* harmony import */ var _zai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(376389);



/** The fast model id when per-task routing is enabled, else null.
 * DISABLED by default since the 2026-10-25 revert — opt in via env. */ function fastModelName() {
    const name = (process.env.MEDQ_AGENT_FAST_MODEL ?? 'off').trim();
    if (!name || /^(off|none|false|disabled)$/i.test(name)) return null;
    return name;
}
/** True when the fast model has an explicitly configured endpoint or key. */ function hasExplicitFastEndpoint() {
    return Boolean((process.env.MEDQ_AGENT_FAST_BASE_URL || '').trim() || (process.env.MEDQ_AGENT_FAST_API_KEY || '').trim());
}
/** True when `primary.baseUrl` is the env-configured gateway the fast model
 * id belongs to (the chain MEDQ_AGENT_API_KEY / OPENAI_API_KEY serves). */ function primaryIsDefaultChain(primary) {
    const gateway = (0,_key_pool__WEBPACK_IMPORTED_MODULE_2__/* .poolBaseUrl */ .j_)();
    if (!gateway) return true; // no env gateway → primary IS the configured chain
    return (0,_key_pool__WEBPACK_IMPORTED_MODULE_2__/* .normalizeBaseUrl */ .qT)(primary.baseUrl) === gateway;
}
/**
 * Build the fast model for this turn, or null when it should be skipped
 * (disabled by env, or the BYOK safety rule above fires). The runtime passes
 * the resolved primary config; standalone callers (chat digest API) omit it
 * and get the env-default chain.
 */ function buildFastModel(primary) {
    const name = fastModelName();
    if (!name) return null;
    const explicit = hasExplicitFastEndpoint();
    if (!explicit && primary && !primaryIsDefaultChain(primary)) {
        // Hand-picked provider cannot be assumed to serve the fast model id.
        return null;
    }
    const baseUrl = (process.env.MEDQ_AGENT_FAST_BASE_URL || '').trim() || primary?.baseUrl || process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const apiKey = (process.env.MEDQ_AGENT_FAST_API_KEY || '').trim() || primary?.apiKey || process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '';
    if (!apiKey) return null;
    const configuration = {
        baseURL: baseUrl
    };
    if (primary?.defaultHeaders) configuration.defaultHeaders = primary.defaultHeaders;
    return new _langchain_openai__WEBPACK_IMPORTED_MODULE_0__/* .ChatOpenAI */ .Db({
        apiKey,
        model: name,
        temperature: 0.3,
        configuration,
        maxRetries: 4,
        // A hung gateway request must error into the retry ladder, not park
        // the turn (the 3-minute no-data stalls).
        timeout: 60000
    });
}
/** Per-request timeout for auxiliary (non-chat-loop) model calls. */ const AUX_MODEL_TIMEOUT_MS = 60000;
/**
 * The ORIGINAL auto model — the env-chain primary (MEDQ_AGENT_* / OPENAI_*),
 * else the managed Z.AI config. This is the same chain the chat runtime's
 * default provider uses, so everything built here behaves exactly like the
 * main agent's Auto selection. Returns null when nothing is configured.
 */ function buildPrimaryEnvModel() {
    const envKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY;
    if (envKey) {
        return new _langchain_openai__WEBPACK_IMPORTED_MODULE_0__/* .ChatOpenAI */ .Db({
            apiKey: envKey,
            model: process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini',
            temperature: 0.3,
            maxRetries: 2,
            timeout: AUX_MODEL_TIMEOUT_MS,
            configuration: {
                baseURL: (process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
            }
        });
    }
    try {
        const zai = (0,_zai__WEBPACK_IMPORTED_MODULE_1__.readConfig)();
        if (zai?.apiKey && zai.baseUrl) {
            const headers = {
                'X-Z-AI-From': 'Z'
            };
            if (zai.token) headers['X-Token'] = zai.token;
            return new _langchain_openai__WEBPACK_IMPORTED_MODULE_0__/* .ChatOpenAI */ .Db({
                apiKey: zai.apiKey,
                model: process.env.ZAI_FALLBACK_MODEL || 'glm-4.5',
                temperature: 0.3,
                maxRetries: 2,
                timeout: AUX_MODEL_TIMEOUT_MS,
                configuration: {
                    baseURL: zai.baseUrl,
                    defaultHeaders: headers
                }
            });
        }
    } catch  {
    // fall through — no provider
    }
    return null;
}
/**
 * The model auxiliary tasks should use, in priority order:
 *   1. the explicitly-configured fast model (opt-in per-task routing);
 *   2. the env-chain primary (the auto model — the default since the
 *      2026-10-25 revert);
 *   3. the managed Z.AI backup.
 * Consumers: thread titles, chat unread digests, AI skill drafts, follow-up
 * suggestion generation. Never null when ANY provider is configured.
 */ function buildAuxModel(primary) {
    return buildFastModel(primary) ?? buildPrimaryEnvModel() ?? buildZaiBackupModel();
}
/**
 * The managed Z.AI backup as a ready-to-call model (same chain the chat
 * runtime's 3rd fallback rung uses — readConfig resolves .z-ai-config or the
 * ZAI_API_KEY/ZAI_BASE_URL env pair). Returns null when not configured.
 * Used by the chat digest when the primary gateway is in a sustained 429
 * storm; NOT imported from deep-agent-runtime to avoid a dependency cycle.
 */ function buildZaiBackupModel() {
    let zai = null;
    try {
        zai = (0,_zai__WEBPACK_IMPORTED_MODULE_1__.readConfig)();
    } catch  {
        zai = null;
    }
    if (!zai?.apiKey || !zai.baseUrl) return null;
    const model = process.env.ZAI_FALLBACK_MODEL || 'glm-4.5';
    const headers = {
        'X-Z-AI-From': 'Z'
    };
    if (zai.token) headers['X-Token'] = zai.token;
    return new _langchain_openai__WEBPACK_IMPORTED_MODULE_0__/* .ChatOpenAI */ .Db({
        apiKey: zai.apiKey,
        model,
        temperature: 0.3,
        configuration: {
            baseURL: zai.baseUrl,
            defaultHeaders: headers
        },
        maxRetries: 2,
        timeout: AUX_MODEL_TIMEOUT_MS
    });
}


/***/ }),

/***/ 304444:
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
        page: "/api/agent/followups/route",
        pathname: "/api/agent/followups",
        filename: "route",
        bundlePath: "app/api/agent/followups/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/agent/followups/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(554991),
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
    let srcPage = "/api/agent/followups/route";
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

/***/ 376389:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createZAI: () => (/* binding */ createZAI),
/* harmony export */   readConfig: () => (/* binding */ readConfig)
/* harmony export */ });
/* unused harmony exports updateConfigToken, hasToken */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(321820);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_2__);
/**
 * ZAI SDK Wrapper — Handles dynamic token management and config updates.
 *
 * The z-ai-web-dev-sdk reads from .z-ai-config, but the API gateway
 * now requires an X-Token header. This utility:
 * 1. Reads the current config
 * 2. Allows dynamic token updates (e.g., from environment or request)
 * 3. Caches the ZAI instance for reuse within a request
 */ 


async function getZaiSdk() {
    try {
        const loader = new Function('return import("z-ai-web-dev-sdk")');
        const mod = await loader();
        return mod?.default ?? mod ?? null;
    } catch  {
        return null;
    }
}
const CONFIG_PATHS = [
    path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), '.z-ai-config'),
    path__WEBPACK_IMPORTED_MODULE_1___default().join(os__WEBPACK_IMPORTED_MODULE_2___default().homedir(), '.z-ai-config'),
    '/etc/.z-ai-config'
];
/**
 * Read the current ZAI config.
 *
 * Resolution order:
 *   1. `.z-ai-config` file (project / home / /etc) — original SDK behavior
 *   2. Env vars: `ZAI_API_KEY` (+ optional `ZAI_BASE_URL`)
 *      Also accepts `GLM_API_KEY` / `GLM_BASE_URL` as aliases (same service).
 *
 * The env-var fallback lets deployments (Docker, Vercel, CI) inject
 * credentials without writing a JSON file to disk, and lets the
 * `isServerConfigured` gate flip to true for the OpenMAIC UI.
 */ function readConfig() {
    // 1. File-based config (preferred — may include token, chatId, userId)
    for (const p of CONFIG_PATHS){
        try {
            const raw = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(p, 'utf-8');
            const config = JSON.parse(raw);
            if (config.baseUrl && config.apiKey) return config;
        } catch  {
        // continue
        }
    }
    // 2. Env-var fallback
    const envApiKey = process.env.ZAI_API_KEY || process.env.GLM_API_KEY;
    if (envApiKey) {
        const envBaseUrl = process.env.ZAI_BASE_URL || process.env.GLM_BASE_URL || 'https://api.z.ai/api/paas/v4';
        return {
            baseUrl: envBaseUrl,
            apiKey: envApiKey
        };
    }
    return null;
}
/** Write the project-level .z-ai-config with an updated token.
 *  Silently skips the write when the file is read-only (e.g. when it's a
 *  symlink to /etc/.z-ai-config owned by root) — the in-memory config is
 *  still returned so the caller can use it. The warn is downgraded from
 *  console.warn to a no-op because the warning fired on every single ZAI
 *  request when .z-ai-config was deployed as a non-writable symlink, which
 *  is the documented production deployment pattern. */ function updateConfigToken(token) {
    const configPath = CONFIG_PATHS[0]; // project-level
    // Default config — reads from env vars or uses null sentinel if unconfigured.
    // (Previously hardcoded a sandbox-internal IP; now degrades gracefully when
    // no .z-ai-config exists, so the auto-detect fallback can kick in instead.)
    let config = readConfig();
    if (!config) {
        // No .z-ai-config found — ZAI is not configured. Return a minimal config
        // with the token so the caller can attempt to use it (ZAI.create() will
        // fail if the SDK can't find a config, which is the correct behavior —
        // the auto-detect system will then fall back to other providers).
        config = {
            baseUrl: process.env.ZAI_BASE_URL || '',
            apiKey: process.env.ZAI_API_KEY || '',
            token
        };
        return config;
    }
    // Skip the write entirely if the existing config already has this token —
    // common case after the first request (the token doesn't change between
    // requests, so the write is redundant and just produces EACCES noise on
    // non-writable deployments).
    if (config.token === token) {
        return config;
    }
    config.token = token;
    try {
        // Ensure file is writable before writing
        try {
            fs__WEBPACK_IMPORTED_MODULE_0___default().chmodSync(configPath, 420);
        } catch  {}
        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    } catch  {
    // EACCES / EROFS / EISDIR: file is not writable (typically a symlink to
    // /etc/.z-ai-config owned by root). The in-memory config is still valid,
    // so the caller proceeds normally. Silently ignored — the warning fired
    // on every ZAI request in production deployments using a read-only
    // symlink, which is the documented deployment pattern.
    }
    return config;
}
/**
 * Create a ZAI instance with optional token override.
 *
 * Resolution:
 *   1. If a token is provided, persist it to `.z-ai-config` so the SDK's
 *      own `ZAI.create()` picks it up (existing behavior).
 *   2. Otherwise — and whenever `.z-ai-config` is absent but env vars are
 *      set — bypass `ZAI.create()` and instantiate directly with the
 *      env-var-resolved config. This is necessary because the SDK's
 *      `loadConfig()` only reads files and throws otherwise.
 *
 * Note: the SDK marks its constructor as `private` in the .d.ts to force
 * callers through `ZAI.create()`. At runtime the constructor is a plain
 * function, so we cast to bypass the TS check. This lets us inject an
 * env-var-resolved config without writing a temp file to disk.
 */ async function createZAI(token) {
    if (token) {
        updateConfigToken(token);
    }
    const ZAI = await getZaiSdk();
    if (!ZAI) {
        throw new Error('This project is configured to use the BYOK/provider flow. Configure a provider key or model in the app instead of the missing ZAI SDK.');
    }
    const config = readConfig();
    if (config) {
        const Ctor = ZAI;
        return new Ctor(config);
    }
    return ZAI.create();
}
/** Check if the current config has a non-empty token */ function hasToken() {
    const config = readConfig();
    return !!config?.token && config.token.trim().length > 0;
}


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

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 554991:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   dynamic: () => (/* binding */ dynamic),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration),
/* harmony export */   runtime: () => (/* binding */ runtime)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _langchain_core_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31747);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
/* harmony import */ var _lib_agent_provider_fast_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(286155);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__]);
_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Chat-specific follow-up suggestions.
 *
 * POST /api/agent/followups   { messages: [{ role, content }] }
 *   → { suggestions: string[] }
 *
 * The chat panel's recommendation chips under the latest answer used to be
 * purely heuristic (tool-name → canned follow-ups + generic defaults like
 * "Explain this more simply") — useful, but not SPECIFIC to the
 * conversation. This endpoint asks the same auto model the agent runs on
 * (see provider/fast-model.ts — per-task routing was reverted 2026-10-25)
 * to propose 3-4 concrete next steps grounded in the actual exchange.
 *
 * Contract with the client: ALWAYS 200 — a failure, timeout, or unparsable
 * reply yields `suggestions: []`, and the caller keeps its instant
 * heuristic chips instead (progressive enhancement, never a dead end).
 */ 



const runtime = 'nodejs';
const dynamic = 'force-dynamic';
const maxDuration = 40;
const MAX_MESSAGES = 12;
const MAX_CONTENT_CHARS = 3000;
const GENERATION_TIMEOUT_MS = 25000;
const SYSTEM_PROMPT = [
    'You propose follow-up actions for a medical-education chat between a learner and their AI study assistant.',
    'Read the recent exchange, then propose 3-4 SPECIFIC next steps the learner could realistically ask next.',
    'Rules:',
    '- Each suggestion must be anchored in THIS conversation (its topics, questions, artifacts, or stated goals) — never generic filler like "Explain this more simply" or "Quiz me on this topic" unless the conversation gives no anchor at all.',
    '- Prefer concrete, actionable study actions (drill a named subtopic, compare the two things discussed, make flashcards of the listed items, deepen the hardest part, generate practice questions in the same style).',
    '- Each suggestion: 8-90 characters, starts with a verb, no quotes, no numbering, no trailing period.',
    '- Do NOT repeat an already-answered question.',
    'Return ONLY a JSON array of 3-4 strings. Nothing else.'
].join('\n');
function normalizeExchanges(raw) {
    if (!Array.isArray(raw)) return null;
    const entries = [];
    for (const item of raw.slice(0, MAX_MESSAGES)){
        if (!item || typeof item !== 'object') continue;
        const role = item.role;
        const content = item.content;
        if (typeof role !== 'string' || typeof content !== 'string') continue;
        if (role !== 'user' && role !== 'assistant') continue;
        const text = content.trim();
        if (!text) continue;
        entries.push({
            role,
            content: text.slice(0, MAX_CONTENT_CHARS)
        });
    }
    // Need at least one user message and one assistant reply to be "specific
    // to the chat"; otherwise the caller's heuristics are a better fit.
    if (!entries.some((e)=>e.role === 'user') || !entries.some((e)=>e.role === 'assistant')) return null;
    return entries;
}
/** Tolerant JSON-array-of-strings extraction (models add fences/prose). */ function parseSuggestions(raw) {
    const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(raw);
    const candidate = fenced ? fenced[1] : raw;
    const start = candidate.indexOf('[');
    const end = candidate.lastIndexOf(']');
    if (start < 0 || end <= start) return [];
    try {
        const parsed = JSON.parse(candidate.slice(start, end + 1));
        if (!Array.isArray(parsed)) return [];
        const seen = new Set();
        const suggestions = [];
        for (const item of parsed){
            if (typeof item !== 'string') continue;
            const text = item.trim().replace(/^["'\s]+|["'\s.]+$/g, '');
            if (text.length < 8 || text.length > 90) continue;
            const key = text.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            suggestions.push(text);
            if (suggestions.length >= 4) break;
        }
        return suggestions;
    } catch  {
        return [];
    }
}
async function POST(req) {
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .resolveUserId */ .n$)().catch(()=>null);
    if (!userId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Not authenticated'
        }, {
            status: 401
        });
    }
    const body = await req.json().catch(()=>({}));
    const exchanges = normalizeExchanges(body.messages);
    if (!exchanges) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            suggestions: []
        }, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    }
    const model = (0,_lib_agent_provider_fast_model__WEBPACK_IMPORTED_MODULE_3__/* .buildAuxModel */ .qW)();
    if (!model) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            suggestions: []
        }, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    }
    const transcript = exchanges.map((entry)=>`${entry.role === 'user' ? 'Learner' : 'Assistant'}: ${entry.content}`).join('\n\n');
    const ask = async ()=>{
        const response = await Promise.race([
            model.invoke([
                new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_1__/* .HumanMessage */ .xc(`${SYSTEM_PROMPT}\n\nRecent exchange:\n\n${transcript}`)
            ]),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error('followup-generation timeout')), GENERATION_TIMEOUT_MS))
        ]);
        return String(response.content ?? '');
    };
    let raw = '';
    try {
        raw = await ask();
    } catch  {
        // One 429-aware retry — the shared gateway storms transiently.
        try {
            await new Promise((resolve)=>setTimeout(resolve, 4000));
            raw = await ask();
        } catch  {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                suggestions: []
            }, {
                headers: {
                    'Cache-Control': 'no-store'
                }
            });
        }
    }
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        suggestions: parseSuggestions(raw)
    }, {
        headers: {
            'Cache-Control': 'no-store'
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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

/***/ 775919:
/***/ ((module) => {

module.exports = require("node:worker_threads");

/***/ }),

/***/ 858701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RA: () => (/* binding */ nextPoolKey),
/* harmony export */   Rg: () => (/* binding */ resolveAgentKeyPool),
/* harmony export */   j_: () => (/* binding */ poolBaseUrl),
/* harmony export */   qT: () => (/* binding */ normalizeBaseUrl)
/* harmony export */ });
/**
 * Agent API key pool — rate-limit mitigation through key rotation.
 *
 * MEDQ_AGENT_API_KEYS (comma-separated) declares ADDITIONAL keys for the same
 * operator-configured provider/endpoint as MEDQ_AGENT_API_KEY. When the
 * primary key hits a provider rate limit (429 / "too many requests" / 5xx
 * storm), the chat runtime's attempt loop rotates to the next healthy pool
 * key on the SAME endpoint BEFORE falling back to the managed Z.AI backup
 * service. Rotation is capped at one hop per turn — brief storms are already
 * absorbed inside the model call (ChatOpenAI maxRetries + modelRetryMiddleware);
 * the pool hop covers sustained per-key quota exhaustion.
 *
 * Keys only apply to the env-configured provider (MEDQ_AGENT_BASE_URL /
 * OPENAI_BASE_URL): a user-picked model or the Z.AI backup runs on its own
 * credentials and is never rotated.
 */ /** Resolve the pool from env: primary first, then MEDQ_AGENT_API_KEYS extras. */ function resolveAgentKeyPool() {
    const primary = (process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '').trim();
    const extras = (process.env.MEDQ_AGENT_API_KEYS || '').split(',').map((key)=>key.trim()).filter((key)=>key.length > 0 && key !== primary);
    const keys = [
        primary,
        ...extras
    ].filter(Boolean);
    return {
        keys,
        size: keys.length
    };
}
/**
 * The next pool key that differs from `avoid` (the key that just failed).
 * Returns null when the pool offers no alternative.
 */ function nextPoolKey(pool, avoid) {
    if (pool.size === 0) return null;
    if (!avoid) return pool.keys[0];
    const index = pool.keys.indexOf(avoid);
    if (index >= 0) {
        if (pool.size === 1) return null;
        return pool.keys[(index + 1) % pool.size];
    }
    return pool.keys[0];
}
/** Normalize a base URL for comparison (trim trailing slashes). */ function normalizeBaseUrl(url) {
    return url.trim().replace(/\/+$/, '');
}
/** The base URL the pool keys belong to (env-configured provider), or null. */ function poolBaseUrl() {
    const raw = process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || '';
    return raw ? normalizeBaseUrl(raw) : null;
}


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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,1890,8093,859,2035], () => (__webpack_exec__(304444)));
module.exports = __webpack_exports__;

})();