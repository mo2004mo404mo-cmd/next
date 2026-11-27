"use strict";
(() => {
var exports = {};
exports.id = 6803;
exports.ids = [6803];
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

/***/ 353528:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Db: () => (/* binding */ resolveVocationalActive)
/* harmony export */ });
/* unused harmony exports isMaicEditorEnabled, isVocationalTaskEngineEnabled, shouldShowVocationalTestUi */
/**
 * Feature flags. Public flags come from `NEXT_PUBLIC_*` env vars, which
 * Next.js inlines at build time so they are safe to read from client
 * components. Server-only flags must not use the `NEXT_PUBLIC_` prefix.
 *
 * Truthy values: `'true'` or `'1'`. Anything else (including unset) is
 * treated as disabled.
 */ function readBoolean(envValue) {
    return envValue === 'true' || envValue === '1';
}
/**
 * MAIC Editor (Pro mode) gate. Default OFF — gates only the Pro toggle
 * affordance in `Header`. The `StageMode` type union is unaffected so
 * existing code paths typecheck identically with the flag in either
 * state.
 */ function isMaicEditorEnabled() {
    return readBoolean(process.env.NEXT_PUBLIC_MAIC_EDITOR_ENABLED);
}
/**
 * Server-authoritative gate for the vocational task-engine generation path.
 * Default OFF. When disabled, requests that include taskEngineMode must
 * silently fall back to the ordinary standard / interactive generation paths.
 */ function isVocationalTaskEngineEnabled() {
    return readBoolean(process.env.OPENMAIC_ENABLE_VOCATIONAL);
}
function resolveVocationalActive(requirements) {
    return Boolean(requirements?.taskEngineMode) && isVocationalTaskEngineEnabled();
}
/**
 * Optional client-only affordance for exposing the experimental vocational
 * test toggle. This is not a security or routing gate.
 */ function shouldShowVocationalTestUi() {
    return readBoolean(process.env.NEXT_PUBLIC_SHOW_VOCATIONAL_TEST_UI);
}


/***/ }),

/***/ 364610:
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
        page: "/api/generate/scene-outlines-stream/route",
        pathname: "/api/generate/scene-outlines-stream",
        filename: "route",
        bundlePath: "app/api/generate/scene-outlines-stream/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/generate/scene-outlines-stream/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(747621),
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
    let srcPage = "/api/generate/scene-outlines-stream/route";
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

/***/ 747621:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration)
/* harmony export */ });
/* harmony import */ var _lib_ai_llm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(525351);
/* harmony import */ var _lib_prompts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548245);
/* harmony import */ var _lib_generation_generation_pipeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34727);
/* harmony import */ var _lib_generation_outline_generator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(958206);
/* harmony import */ var _lib_constants_generation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(941953);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(661427);
/* harmony import */ var _lib_server_api_response__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(648825);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(653165);
/* harmony import */ var _lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(592901);
/* harmony import */ var _lib_config_feature_flags__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(353528);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_6__]);
_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Scene Outlines Streaming API (SSE)
 *
 * Streams outline generation via Server-Sent Events.
 * Emits individual outline objects as they're parsed from the LLM response,
 * so the frontend can display them incrementally.
 *
 * SSE events:
 *   { type: 'languageDirective', data: string }
 *   { type: 'courseTitle', data: string }
 *   { type: 'outline', data: SceneOutline, index: number }
 *   { type: 'done', outlines: SceneOutline[], languageDirective: string, courseTitle?: string }
 *   { type: 'error', error: string }
 */ 









const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_5__/* .createLogger */ .h)('Outlines Stream');
const maxDuration = 300;
/**
 * Extract the languageDirective from the streamed wrapper JSON.
 * Matches `"languageDirective":"<value>"` in partial JSON like:
 *   {"languageDirective":"用中文授课...","outlines":[...
 */ function extractLanguageDirective(buffer) {
    // The directive is the first key of the wrapper object, so it can only ever
    // appear in the head of the buffer. Bound the scan to keep this O(1) per
    // streamed chunk — it is called on the full, growing buffer on every chunk,
    // which is otherwise O(n²) over the stream.
    const head = buffer.length > 8192 ? buffer.slice(0, 8192) : buffer;
    const match = head.match(/"languageDirective"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    if (!match) return null;
    try {
        return JSON.parse(`"${match[1]}"`);
    } catch  {
        return match[1];
    }
}
/**
 * Extract the courseTitle from the streamed wrapper JSON.
 * Same head-bound scan as `extractLanguageDirective` — the title is a
 * top-level key near the start of the wrapper object, so it only appears in
 * the buffer head. Returns the decoded title, or null if not yet streamed.
 */ const COURSE_TITLE_RE = /"courseTitle"\s*:\s*"((?:[^"\\]|\\.)*)"/;
// Normalize a captured title identically to the non-streaming parser
// (lib/generation/outline-generator.ts): ignore whitespace-only titles and cap
// length defensively so a hallucinating model cannot push a blank or unbounded
// value into the stage name. Returning null lets callers fall back / keep scanning.
function normalizeStreamedTitle(raw) {
    let title;
    try {
        title = JSON.parse(`"${raw}"`);
    } catch  {
        title = raw;
    }
    const normalized = title.trim();
    return normalized ? normalized.slice(0, 120) : null;
}
function extractCourseTitle(buffer) {
    const head = buffer.length > 8192 ? buffer.slice(0, 8192) : buffer;
    const match = head.match(COURSE_TITLE_RE);
    return match ? normalizeStreamedTitle(match[1]) : null;
}
/**
 * Full-buffer fallback, run once after the stream completes: recovers a title
 * the model emitted after the `outlines` array or beyond the 8KB head window —
 * cases the head-bound `extractCourseTitle` scan would miss. Only invoked when
 * the streaming scan produced nothing, so the extra full-buffer regex is paid once.
 */ function extractCourseTitleFromComplete(buffer) {
    const match = buffer.match(COURSE_TITLE_RE);
    return match ? normalizeStreamedTitle(match[1]) : null;
}
/**
 * Incremental JSON array parser.
 * Extracts complete top-level objects from a partially-streamed JSON array,
 * resuming from `scanFrom` (an index into `buffer`) so the growing buffer is
 * scanned only ONCE across the whole stream — O(n) total instead of O(n²).
 * Supports both a flat array `[{...},{...}]` and a wrapper object
 * `{"languageDirective":"...","outlines":[{...},{...}]}`, with or without a
 * markdown ```json fence (the array is located by content, not by stripping).
 * Returns newly found objects plus the index to resume scanning from next time.
 */ function extractNewOutlines(buffer, scanFrom) {
    const results = [];
    let i;
    if (scanFrom > 0) {
        // Resume just past the last fully-parsed object (between array elements,
        // so not inside a string and at brace depth 0).
        i = scanFrom;
    } else {
        // Locate the outlines array opening once.
        const outlinesKeyIdx = buffer.indexOf('"outlines"');
        const arrayStart = outlinesKeyIdx >= 0 ? buffer.indexOf('[', outlinesKeyIdx) : buffer.indexOf('[');
        if (arrayStart === -1) return {
            outlines: results,
            scanFrom: 0
        };
        i = arrayStart + 1;
    }
    let depth = 0;
    let objectStart = -1;
    let inString = false;
    let escaped = false;
    let consumed = i; // index just past the last fully-parsed object
    for(; i < buffer.length; i++){
        const char = buffer[i];
        if (escaped) {
            escaped = false;
            continue;
        }
        if (char === '\\' && inString) {
            escaped = true;
            continue;
        }
        if (char === '"') {
            inString = !inString;
            continue;
        }
        if (inString) continue;
        if (char === '{') {
            if (depth === 0) objectStart = i;
            depth++;
        } else if (char === '}') {
            depth--;
            if (depth === 0 && objectStart >= 0) {
                try {
                    results.push(JSON.parse(buffer.substring(objectStart, i + 1)));
                } catch  {
                // Incomplete or invalid JSON — skip
                }
                objectStart = -1;
                consumed = i + 1;
            }
        }
    }
    return {
        outlines: results,
        scanFrom: consumed
    };
}
function normalizeTaskEngineProceduralOutline(outline, requirement) {
    const widgetOutline = outline.widgetOutline ?? {};
    return {
        ...outline,
        type: 'interactive',
        widgetType: 'procedural-skill',
        widgetOutline: {
            ...widgetOutline,
            procedureType: widgetOutline.procedureType ?? 'inspection',
            task: widgetOutline.task || requirement,
            tools: widgetOutline.tools && widgetOutline.tools.length > 0 ? widgetOutline.tools : [
                'required PPE',
                'task checklist'
            ],
            steps: widgetOutline.steps && widgetOutline.steps.length > 0 ? widgetOutline.steps : [
                'Confirm task conditions',
                'Select required tools',
                'Complete safety check'
            ],
            successCriteria: widgetOutline.successCriteria && widgetOutline.successCriteria.length > 0 ? widgetOutline.successCriteria : [
                'Required checks completed',
                'Unsafe conditions are not ignored'
            ],
            errorConsequences: widgetOutline.errorConsequences && widgetOutline.errorConsequences.length > 0 ? widgetOutline.errorConsequences : [
                'Unsafe or incorrect actions require stopping and rechecking'
            ]
        }
    };
}
function normalizeTaskEngineSlideOutline(outline) {
    const normalized = {
        ...outline,
        type: 'slide'
    };
    delete normalized.widgetType;
    delete normalized.widgetOutline;
    delete normalized.interactiveConfig;
    return normalized;
}
const ORDINARY_WIDGET_TYPES = new Set([
    'simulation',
    'diagram',
    'code',
    'game',
    'visualization3d'
]);
function normalizeTaskEngineOutline(outline, requirement) {
    if (outline.type === 'slide') {
        return normalizeTaskEngineSlideOutline(outline);
    }
    if (outline.type === 'interactive' && outline.widgetType === 'procedural-skill') {
        return normalizeTaskEngineProceduralOutline(outline, requirement);
    }
    if (outline.type === 'interactive' && outline.widgetType && ORDINARY_WIDGET_TYPES.has(outline.widgetType)) {
        return outline;
    }
    return normalizeTaskEngineSlideOutline(outline);
}
function sanitizeNonTaskEngineOutline(outline) {
    if (outline.widgetType !== 'procedural-skill') {
        return outline;
    }
    const widgetOutline = {
        ...outline.widgetOutline ?? {}
    };
    delete widgetOutline.procedureType;
    delete widgetOutline.task;
    delete widgetOutline.tools;
    delete widgetOutline.steps;
    delete widgetOutline.successCriteria;
    delete widgetOutline.errorConsequences;
    // procedural-skill is gated behind taskEngineMode to protect ordinary MAIC generation.
    return {
        ...outline,
        type: 'interactive',
        widgetType: 'diagram',
        description: outline.description ? `${outline.description} Present this as a process or structure diagram.` : 'Present this topic as a process or structure diagram.',
        widgetOutline
    };
}
function ensureUniqueOutlineId(outline, usedIds) {
    const candidate = typeof outline.id === 'string' && outline.id.trim() ? outline.id : undefined;
    if (candidate && !usedIds.has(candidate)) {
        usedIds.add(candidate);
        return outline;
    }
    let id = (0,nanoid__WEBPACK_IMPORTED_MODULE_7__/* .nanoid */ .Ak)();
    while(usedIds.has(id)){
        id = (0,nanoid__WEBPACK_IMPORTED_MODULE_7__/* .nanoid */ .Ak)();
    }
    usedIds.add(id);
    return {
        ...outline,
        id
    };
}
async function POST(req) {
    let requirementSnippet;
    let resolvedModelString;
    try {
        const body = await req.json();
        // Get API configuration from request headers/body
        const { model: languageModel, modelInfo, modelString, thinkingConfig } = await (0,_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_6__/* .resolveModelFromRequest */ .V2)(req, body, 'scene-outlines-stream');
        resolvedModelString = modelString;
        if (!body.requirements) {
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_4__/* .apiError */ .pb)('MISSING_REQUIRED_FIELD', 400, 'Requirements are required');
        }
        const { requirements, pdfText, pdfImages, imageMapping, researchContext, agents } = body;
        requirementSnippet = requirements?.requirement?.substring(0, 60);
        // Build user profile string for language inference context
        const userProfileText = requirements.userNickname || requirements.userBio ? `## Student Profile\n\nStudent: ${requirements.userNickname || 'Unknown'}${requirements.userBio ? ` — ${requirements.userBio}` : ''}\n\nConsider this student's background when designing the course. Adapt difficulty, examples, and teaching approach accordingly.\n\n---` : '';
        // Detect vision capability
        const hasVision = !!modelInfo?.capabilities?.vision;
        // Build prompt (same logic as generateSceneOutlinesFromRequirements)
        let availableImagesText = 'No images available';
        let visionImages;
        if (pdfImages && pdfImages.length > 0) {
            if (hasVision && imageMapping) {
                // Vision mode: split into vision images (first N) and text-only (rest)
                const allWithSrc = pdfImages.filter((img)=>imageMapping[img.id]);
                const visionSlice = allWithSrc.slice(0, _lib_constants_generation__WEBPACK_IMPORTED_MODULE_8__/* .MAX_VISION_IMAGES */ .R);
                const textOnlySlice = allWithSrc.slice(_lib_constants_generation__WEBPACK_IMPORTED_MODULE_8__/* .MAX_VISION_IMAGES */ .R);
                const noSrcImages = pdfImages.filter((img)=>!imageMapping[img.id]);
                const visionDescriptions = visionSlice.map((img)=>(0,_lib_generation_generation_pipeline__WEBPACK_IMPORTED_MODULE_2__/* .formatImagePlaceholder */ .wD)(img));
                const textDescriptions = [
                    ...textOnlySlice,
                    ...noSrcImages
                ].map((img)=>(0,_lib_generation_generation_pipeline__WEBPACK_IMPORTED_MODULE_2__/* .formatImageDescription */ .Xq)(img));
                availableImagesText = [
                    ...visionDescriptions,
                    ...textDescriptions
                ].join('\n');
                visionImages = visionSlice.map((img)=>({
                        id: img.id,
                        src: imageMapping[img.id],
                        width: img.width,
                        height: img.height
                    }));
            } else {
                // Text-only mode: full descriptions
                availableImagesText = pdfImages.map((img)=>(0,_lib_generation_generation_pipeline__WEBPACK_IMPORTED_MODULE_2__/* .formatImageDescription */ .Xq)(img)).join('\n');
            }
        }
        // Build media snippet conditions based on enabled flags.
        const imageGenerationEnabled = req.headers.get('x-image-generation-enabled') === 'true';
        const videoGenerationEnabled = req.headers.get('x-video-generation-enabled') === 'true';
        const mediaGenerationEnabled = imageGenerationEnabled || videoGenerationEnabled;
        const hasSourceImages = (pdfImages?.length ?? 0) > 0;
        // Build teacher context from agents (if available)
        const teacherContext = (0,_lib_generation_generation_pipeline__WEBPACK_IMPORTED_MODULE_2__/* .formatTeacherPersonaForPrompt */ .BE)(agents);
        // Check if Interactive Mode or server-enabled Task Engine mode is enabled.
        const interactiveMode = requirements.interactiveMode ?? false;
        const taskEngineMode = (0,_lib_config_feature_flags__WEBPACK_IMPORTED_MODULE_9__/* .resolveVocationalActive */ .Db)(requirements);
        const promptId = taskEngineMode ? _lib_prompts__WEBPACK_IMPORTED_MODULE_1__/* .PROMPT_IDS */ .u9.TASK_ENGINE_OUTLINES : interactiveMode ? _lib_prompts__WEBPACK_IMPORTED_MODULE_1__/* .PROMPT_IDS */ .u9.INTERACTIVE_OUTLINES : _lib_prompts__WEBPACK_IMPORTED_MODULE_1__/* .PROMPT_IDS */ .u9.REQUIREMENTS_TO_OUTLINES;
        const prompts = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_1__/* .buildPrompt */ .fn)(promptId, {
            requirement: requirements.requirement,
            pdfContent: pdfText ? pdfText.substring(0, _lib_constants_generation__WEBPACK_IMPORTED_MODULE_8__/* .MAX_PDF_CONTENT_CHARS */ .k) : 'None',
            availableImages: availableImagesText,
            researchContext: researchContext || 'None',
            hasSourceImages,
            imageEnabled: imageGenerationEnabled,
            videoEnabled: videoGenerationEnabled,
            mediaEnabled: mediaGenerationEnabled,
            teacherContext,
            userProfile: userProfileText
        });
        if (!prompts) {
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_4__/* .apiError */ .pb)('INTERNAL_ERROR', 500, 'Prompt template not found');
        }
        log.info(`Generating outlines: "${requirements.requirement.substring(0, 50)}" [model=${modelString}]`);
        // Create SSE stream with heartbeat to prevent connection timeout
        const encoder = new TextEncoder();
        const HEARTBEAT_INTERVAL_MS = 15000;
        const stream = new ReadableStream({
            async start (controller) {
                // Heartbeat: periodically send SSE comments to keep the connection alive.
                let heartbeatTimer = null;
                const startHeartbeat = ()=>{
                    stopHeartbeat();
                    heartbeatTimer = setInterval(()=>{
                        try {
                            controller.enqueue(encoder.encode(`:heartbeat\n\n`));
                        } catch  {
                            stopHeartbeat();
                        }
                    }, HEARTBEAT_INTERVAL_MS);
                };
                const stopHeartbeat = ()=>{
                    if (heartbeatTimer) {
                        clearInterval(heartbeatTimer);
                        heartbeatTimer = null;
                    }
                };
                const MAX_STREAM_RETRIES = 2;
                // Hard ceiling on the accumulated stream buffer. Legitimate outline
                // JSON is small (tens of KB); anything past this is a runaway/degenerate
                // generation and must not be allowed to grow the heap unbounded.
                const MAX_OUTLINE_STREAM_BYTES = 512 * 1024;
                try {
                    startHeartbeat();
                    const streamParams = visionImages?.length ? {
                        model: languageModel,
                        system: prompts.system,
                        messages: [
                            {
                                role: 'user',
                                content: (0,_lib_generation_generation_pipeline__WEBPACK_IMPORTED_MODULE_2__/* .buildVisionUserContent */ .bJ)(prompts.user, visionImages)
                            }
                        ],
                        maxOutputTokens: modelInfo?.outputWindow,
                        // Tear down the upstream LLM request when the client disconnects,
                        // instead of letting it run to completion for a dead connection.
                        abortSignal: req.signal
                    } : {
                        model: languageModel,
                        system: prompts.system,
                        prompt: prompts.user,
                        maxOutputTokens: modelInfo?.outputWindow,
                        abortSignal: req.signal
                    };
                    let parsedOutlines = [];
                    let languageDirective = null;
                    let courseTitle = null;
                    let lastError;
                    for(let attempt = 1; attempt <= MAX_STREAM_RETRIES + 1; attempt++){
                        try {
                            let fullText = '';
                            let scanFrom = 0;
                            parsedOutlines = [];
                            languageDirective = null;
                            courseTitle = null;
                            const usedOutlineIds = new Set();
                            const textStream = (0,_lib_ai_llm__WEBPACK_IMPORTED_MODULE_0__/* .streamLLM */ .Y)(streamParams, 'scene-outlines-stream', thinkingConfig).textStream;
                            for await (const chunk of textStream){
                                // Stop doing work the moment the client goes away — otherwise
                                // generation keeps running and buffering for a dead connection.
                                if (req.signal?.aborted) {
                                    stopHeartbeat();
                                    return;
                                }
                                fullText += chunk;
                                if (fullText.length > MAX_OUTLINE_STREAM_BYTES) {
                                    log.warn(`Outline stream exceeded ${MAX_OUTLINE_STREAM_BYTES} bytes (len=${fullText.length}); stopping read and finalizing with ${parsedOutlines.length} outline(s)`);
                                    break;
                                }
                                // Try to extract language directive early
                                if (!languageDirective) {
                                    languageDirective = extractLanguageDirective(fullText);
                                    if (languageDirective) {
                                        const ldEvent = JSON.stringify({
                                            type: 'languageDirective',
                                            data: languageDirective
                                        });
                                        controller.enqueue(encoder.encode(`data: ${ldEvent}\n\n`));
                                    }
                                }
                                // Try to extract course title early (same pattern as languageDirective)
                                if (!courseTitle) {
                                    courseTitle = extractCourseTitle(fullText);
                                    if (courseTitle) {
                                        const ctEvent = JSON.stringify({
                                            type: 'courseTitle',
                                            data: courseTitle
                                        });
                                        controller.enqueue(encoder.encode(`data: ${ctEvent}\n\n`));
                                    }
                                }
                                // Try to extract new outlines from the accumulated text,
                                // resuming the scan from where the previous chunk left off.
                                const { outlines: newOutlines, scanFrom: nextScanFrom } = extractNewOutlines(fullText, scanFrom);
                                scanFrom = nextScanFrom;
                                for (const outline of newOutlines){
                                    // Ensure ID and order
                                    const enrichedBase = {
                                        ...outline,
                                        order: parsedOutlines.length + 1
                                    };
                                    const normalized = taskEngineMode ? normalizeTaskEngineOutline(enrichedBase, requirements.requirement) : sanitizeNonTaskEngineOutline(enrichedBase);
                                    const enriched = ensureUniqueOutlineId(normalized, usedOutlineIds);
                                    parsedOutlines.push(enriched);
                                    const event = JSON.stringify({
                                        type: 'outline',
                                        data: enriched,
                                        index: parsedOutlines.length - 1
                                    });
                                    controller.enqueue(encoder.encode(`data: ${event}\n\n`));
                                }
                            }
                            // Validate: got outlines?
                            if (parsedOutlines.length > 0) {
                                if (!courseTitle) {
                                    // The head-bound streaming scan can miss a title the model
                                    // placed after the outlines array or past the 8KB head window;
                                    // recover it from the now-complete response before finalizing.
                                    courseTitle = extractCourseTitleFromComplete(fullText);
                                }
                                break;
                            }
                            // Empty result — retry if we have attempts left
                            lastError = fullText.trim() ? 'LLM response could not be parsed into outlines' : 'LLM returned empty response';
                            log.warn(`Outlines attempt ${attempt} diagnostics: textLen=${fullText.length}, outlines=${parsedOutlines.length}, languageDirective=${languageDirective ? 'yes' : 'no'}, preview=${JSON.stringify(fullText.slice(0, 240))}`);
                            if (attempt <= MAX_STREAM_RETRIES) {
                                log.warn(`Empty outlines (attempt ${attempt}/${MAX_STREAM_RETRIES + 1}), retrying...`);
                                // Notify client a retry is happening
                                const retryEvent = JSON.stringify({
                                    type: 'retry',
                                    attempt,
                                    maxAttempts: MAX_STREAM_RETRIES + 1
                                });
                                controller.enqueue(encoder.encode(`data: ${retryEvent}\n\n`));
                            }
                        } catch (error) {
                            // Client disconnected (AbortError from the now-propagated signal):
                            // stop immediately, don't burn retries re-running generation.
                            if (req.signal?.aborted) {
                                stopHeartbeat();
                                return;
                            }
                            lastError = error instanceof Error ? error.message : String(error);
                            log.warn(`Outlines stream error detail (attempt ${attempt}/${MAX_STREAM_RETRIES + 1}): ${lastError}`);
                            if (attempt <= MAX_STREAM_RETRIES) {
                                log.warn(`Stream error (attempt ${attempt}/${MAX_STREAM_RETRIES + 1}), retrying...`, error);
                                const retryEvent = JSON.stringify({
                                    type: 'retry',
                                    attempt,
                                    maxAttempts: MAX_STREAM_RETRIES + 1
                                });
                                controller.enqueue(encoder.encode(`data: ${retryEvent}\n\n`));
                                continue;
                            }
                        }
                    }
                    if (parsedOutlines.length > 0) {
                        // Replace sequential gen_img_N/gen_vid_N with globally unique IDs
                        const uniquifiedOutlines = (0,_lib_generation_generation_pipeline__WEBPACK_IMPORTED_MODULE_2__/* .uniquifyMediaElementIds */ .tF)(parsedOutlines);
                        // Send done event with all outlines
                        const doneEvent = JSON.stringify({
                            type: 'done',
                            outlines: uniquifiedOutlines,
                            languageDirective: languageDirective || _lib_generation_outline_generator__WEBPACK_IMPORTED_MODULE_3__/* .DEFAULT_LANGUAGE_DIRECTIVE */ .He,
                            courseTitle: courseTitle || undefined,
                            taskEngineMode
                        });
                        controller.enqueue(encoder.encode(`data: ${doneEvent}\n\n`));
                    } else {
                        // All retries exhausted, no outlines produced
                        log.error(`Outline generation failed after ${MAX_STREAM_RETRIES + 1} attempts: ${lastError}`);
                        const errorEvent = JSON.stringify({
                            type: 'error',
                            error: lastError || 'Failed to generate outlines'
                        });
                        controller.enqueue(encoder.encode(`data: ${errorEvent}\n\n`));
                    }
                } catch (error) {
                    const errorEvent = JSON.stringify({
                        type: 'error',
                        error: error instanceof Error ? error.message : String(error)
                    });
                    controller.enqueue(encoder.encode(`data: ${errorEvent}\n\n`));
                } finally{
                    stopHeartbeat();
                    // The controller may already be closed if the client disconnected.
                    try {
                        controller.close();
                    } catch  {
                    // already closed — ignore
                    }
                }
            }
        });
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive'
            }
        });
    } catch (error) {
        log.error(`Outline streaming failed [requirement="${requirementSnippet ?? 'unknown'}...", model=${resolvedModelString ?? 'unknown'}]:`, error);
        return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_4__/* .apiError */ .pb)('INTERNAL_ERROR', 500, error instanceof Error ? error.message : String(error));
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 775919:
/***/ ((module) => {

module.exports = require("node:worker_threads");

/***/ }),

/***/ 777030:
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

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
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,7774,1545,9567,3381,7293,859,2035,4007,7909,5566,8262,2901,6807], () => (__webpack_exec__(364610)));
module.exports = __webpack_exports__;

})();