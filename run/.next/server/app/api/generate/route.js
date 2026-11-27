"use strict";
(() => {
var exports = {};
exports.id = 5435;
exports.ids = [5435];
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

/***/ 334318:
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
        page: "/api/generate/route",
        pathname: "/api/generate",
        filename: "route",
        bundlePath: "app/api/generate/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/generate/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(701745),
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
    let srcPage = "/api/generate/route";
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

/***/ 337540:
/***/ ((module) => {

module.exports = require("node:console");

/***/ }),

/***/ 353053:
/***/ ((module) => {

module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ 362768:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FB: () => (/* binding */ withErrorHandler),
/* harmony export */   RK: () => (/* binding */ apiHandler)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth_helpers__WEBPACK_IMPORTED_MODULE_2__]);
_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// ─────────────────────────────────────────────────────────────────────────
// api-handler.ts — composable wrappers for App Router Route Handlers.
//
// This module builds on `withAuth` from auth-helpers.ts and adds:
//
//   1. withErrorHandler()  — try/catch around any handler, logs to the
//      shared logger, returns a clean 500 response on uncaught errors.
//
//   2. apiHandler()        — composes withAuth + withErrorHandler in one
//      call. This is the recommended wrapper for any new route handler
//      that needs authenticated access.
//



const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('api');
// ─────────────────────────────────────────────────────────────────────────
// withErrorHandler — wraps any route handler with try/catch + structured log
// ─────────────────────────────────────────────────────────────────────────
function withErrorHandler(handler) {
    return async (req, context)=>{
        // Next.js 16 passes the second arg as { params: Promise<...> }.
        // Older / no-param routes call with just (req) — context is undefined.
        // Resolve to a plain TParams object in all cases.
        let params;
        if (context === undefined) {
            params = {};
        } else if (context instanceof Promise) {
            // Defensive: shouldn't happen with Next.js 16, but covers edge cases.
            params = await context;
        } else if (typeof context === 'object' && context !== null && 'params' in context) {
            // Next.js 16 shape: { params: Promise<TParams> }
            const rawParams = context.params;
            params = rawParams instanceof Promise ? await rawParams : rawParams;
        } else {
            // Already-resolved params object (Next.js 15 or earlier).
            params = context;
        }
        try {
            return await handler(req, {
                params
            });
        } catch (error) {
            // Pull a route tag from the request URL so logs identify the failing route.
            const url = (()=>{
                try {
                    return new URL(req.url).pathname;
                } catch  {
                    return 'unknown';
                }
            })();
            const message = error instanceof Error ? error.message : String(error);
            const stack = error instanceof Error ? error.stack : undefined;
            log.error(`uncaught error in ${url}: ${message}`, stack ?? '');
            // Don't leak internal error details in production.
            const isProd = "production" === 'production';
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Internal server error',
                ...isProd ? {} : {
                    detail: message
                }
            }, {
                status: 500
            });
        }
    };
}
// ─────────────────────────────────────────────────────────────────────────
// apiHandler — composes withAuth + withErrorHandler
//
//   export const GET = apiHandler(async (req, ctx) => {
//     return NextResponse.json({ id: ctx.userId });
//   }, { requiredRole: 'admin' });
// ─────────────────────────────────────────────────────────────────────────
function apiHandler(handler, options = {}) {
    return withErrorHandler(async (req, ctx)=>{
        // Delegate auth to withAuth-style logic, but inlined so we can preserve
        // the params shape from withErrorHandler.
        // We reuse the existing withAuth impl by calling it and forwarding.
        const wrapped = (0,_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .withAuth */ .ru)(handler, options);
        return wrapped(req, {
            params: ctx.params
        });
    });
}
// Re-export the response helpers from auth-helpers for convenience.


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 421946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ emitJobUpdate)
/* harmony export */ });
/**
 * Emit job progress updates to the socket.io service.
 * Called by API routes after updateJob() to push real-time updates to the browser.
 * This is fire-and-forget — errors are logged but don't affect the job.
 */ const SOCKET_SERVICE_URL = (process.env.SOCKET_PROGRESS_URL || '').replace(/\/$/, '');
/**
 * Emit a job update event to the socket service.
 * The socket service will broadcast to connected clients.
 */ function emitJobUpdate(job) {
    if (!SOCKET_SERVICE_URL) return;
    // Fire-and-forget POST to socket service
    const event = job.status === 'completed' ? 'job:completed' : job.status === 'failed' ? 'job:failed' : 'job:progress';
    fetch(`${SOCKET_SERVICE_URL}/emit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event,
            data: job
        })
    }).catch((err)=>{
        // Log but don't throw — socket notification is best-effort
        console.warn('[socket-emit] Failed to emit job update:', err);
    });
}


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

/***/ 603630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _S: () => (/* binding */ createJob),
/* harmony export */   ax: () => (/* binding */ getJob),
/* harmony export */   lh: () => (/* binding */ updateJob)
/* harmony export */ });
/* unused harmony export deleteJob */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/**
 * File-backed job store for async generation tasks.
 * Persists jobs to .job-store.json so they survive server restarts (HMR, crash, etc.).
 * Uses batched (debounced) writes to avoid excessive disk I/O.
 * Auto-cleans completed/failed jobs after 10 minutes.
 * On startup, marks any jobs stuck in "processing" for >10 minutes as "failed".
 */ 

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------
const STORE_PATH = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), '.job-store.json');
const JOB_TTL_MS = 10 * 60 * 1000; // 10 minutes
const STALE_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes — only mark processing jobs older than this as failed
/** Strip large fields (e.g. imageBase64) from results before writing to disk. */ function sanitizeForDisk(job) {
    if (!job.result || !Array.isArray(job.result)) return job;
    const sanitizedResult = job.result.map((item)=>{
        if (item && typeof item === 'object') {
            const clone = {
                ...item
            };
            if ('imageBase64' in clone) {
                delete clone.imageBase64;
            }
            return clone;
        }
        return item;
    });
    return {
        ...job,
        result: sanitizedResult
    };
}
// ---------------------------------------------------------------------------
// Load from disk on module init
// ---------------------------------------------------------------------------
const jobs = new Map();
let jobCounter = 0;
let writeScheduled = false;
try {
    if ((0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(STORE_PATH)) {
        const raw = (0,fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync)(STORE_PATH, 'utf-8');
        const data = JSON.parse(raw);
        const now = Date.now();
        for (const job of data.jobs){
            // Stale processing detection: only mark as failed if processing for >10 min
            if (job.status === 'processing' && now - job.updatedAt > STALE_THRESHOLD_MS) {
                job.status = 'failed';
                job.error = 'Job was interrupted by a server restart. Please try again.';
                job.updatedAt = now;
            }
            jobs.set(job.id, job);
        }
        // Restore jobCounter so new IDs don't collide
        if (typeof data.jobCounter === 'number') {
            jobCounter = data.jobCounter;
        }
        // Persist the cleaned-up state immediately
        flushToDisk();
    }
} catch (err) {
    // If we can't read/parse the file, start fresh — don't crash the server
    console.warn('[job-store] Failed to load persisted jobs, starting fresh:', err);
}
// ---------------------------------------------------------------------------
// Batched (debounced) writes
// ---------------------------------------------------------------------------
function flushToDisk() {
    try {
        const allJobs = Array.from(jobs.values()).map(sanitizeForDisk);
        (0,fs__WEBPACK_IMPORTED_MODULE_0__.writeFileSync)(STORE_PATH, JSON.stringify({
            jobs: allJobs,
            jobCounter
        }), 'utf-8');
    } catch (err) {
        console.error('[job-store] Failed to flush jobs to disk:', err);
    }
    writeScheduled = false;
}
function scheduleWrite() {
    if (writeScheduled) return; // already scheduled
    writeScheduled = true;
    // Use a microtask-style short delay (setImmediate in Node, fallback to setTimeout)
    // This batches multiple updateJob calls in the same tick / near-future
    const schedule = typeof setImmediate === 'function' ? setImmediate : (fn)=>setTimeout(fn, 0);
    schedule(flushToDisk);
}
// ---------------------------------------------------------------------------
// Auto-cleanup: remove completed/failed jobs older than TTL
// ---------------------------------------------------------------------------
setInterval(()=>{
    const now = Date.now();
    let changed = false;
    for (const [id, job] of jobs){
        if ((job.status === 'completed' || job.status === 'failed') && now - job.updatedAt > JOB_TTL_MS) {
            jobs.delete(id);
            changed = true;
        }
    }
    if (changed) {
        scheduleWrite();
    }
}, 5 * 60 * 1000);
// ---------------------------------------------------------------------------
// Public API (same signatures as before)
// ---------------------------------------------------------------------------
/**
 * Create a new job and return its ID
 */ function createJob() {
    jobCounter++;
    const id = `job_${Date.now()}_${jobCounter}`;
    const now = Date.now();
    jobs.set(id, {
        id,
        status: 'pending',
        progress: 'Starting...',
        attempt: 0,
        result: null,
        partialResult: null,
        error: null,
        createdAt: now,
        updatedAt: now
    });
    scheduleWrite();
    return id;
}
/**
 * Update a job's status
 */ function updateJob(id, updates) {
    const job = jobs.get(id);
    if (!job) return;
    Object.assign(job, updates, {
        updatedAt: Date.now()
    });
    scheduleWrite();
}
/**
 * Get a job's data
 */ function getJob(id) {
    return jobs.get(id) || null;
}
/**
 * Delete a job
 */ function deleteJob(id) {
    jobs.delete(id);
    scheduleWrite();
}


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

/***/ 701745:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(960736);
/* harmony import */ var _lib_job_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(603630);
/* harmony import */ var _lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(421946);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(122035);
/* harmony import */ var _lib_api_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(362768);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_6__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const SYSTEM_PROMPT = `You are a world-class medical educator and USMLE/PLAB exam writer creating visually rich, evidence-based medical questions with beautiful HTML formatting.

MEDICAL ACCURACY IS PARAMOUNT — you must:
- Use ONLY verified, current medical facts from established guidelines and textbooks
- Include specific numbers: drug dosages (mg/kg), half-lives (hours), sensitivity/specificity (%), NNT, odds ratios
- Use correct receptor subtypes (β₁ not β1), proper drug nomenclature (INN/generic names), and accurate lab reference ranges
- Cite the specific pathway steps with correct mediators, enzymes, and intermediates (e.g., "ACE converts Angiotensin I → Angiotensin II", NOT just "angiotensin is activated")
- Include correct mechanism of action with molecular detail (e.g., "competitive antagonism at the β₁-adrenergic receptor", NOT just "blocks beta receptors")
- Reference specific guideline recommendations with class/level of evidence when available
- NEVER fabricate drug dosages, study results, or statistics — use well-known, verifiable data
- When uncertain about a specific number, describe the concept accurately without inventing figures

CRITICAL OUTPUT RULES:
1. Return ONLY valid JSON — no markdown fences, no commentary, just the raw JSON object
2. Use SINGLE QUOTES for ALL HTML attributes — write class='q-hl' NOT class="q-hl"
   This is ESSENTIAL because double quotes would break the JSON structure
3. The "options" array MUST contain plain text only — NO HTML tags
4. The "answer" field MUST be plain text only — must match one option exactly for MCQ

HTML CONTENT FORMAT — Each field must be rich and visually stunning:

"text" — Question with highlighted key terms:
  <span class='q-hl'>key term</span> for important concepts (green pill)
  <span class='q-hl-red'>pathology</span> for disease/pathology (red pill)
  <span class='q-hl-amber'>caution</span> for warning/caution (amber pill)
  <span class='q-hl-purple'>classification</span> for categories (purple pill)
  Example: "A 55-year-old man presents with <span class='q-hl-red'>crushing chest pain</span> radiating to the left arm. ECG shows <span class='q-hl-amber'>ST elevation</span> in leads V1-V4. The most likely diagnosis is:"

"explanation" — MUST be EVIDENCE-BASED and include MULTIPLE rich elements:
  1. Start with a blue callout containing the CORE MECHANISM with specific details:
     <div class='q-callout q-callout-blue'>💡 <strong>Key Concept:</strong> <span class='q-hl'>Specific mechanism</span> — e.g., "ACE inhibitors block the conversion of <span class='q-hl'>Angiotensin I → Angiotensin II</span> by inhibiting <span class='q-hl'>kininase II</span>, reducing vasoconstriction and aldosterone secretion [1]"</div>
  2. Add a flow diagram showing the COMPLETE pathophysiology chain with SPECIFIC mediators:
     <div class='q-flow'><span class='q-node q-node-red'>Renin release</span><span class='q-arrow'>→</span><span class='q-node q-node-orange'>Ang I</span><span class='q-arrow q-arrow-green'>→</span><span class='q-node q-node-green'>Ang II (via ACE)</span><span class='q-arrow'>→</span><span class='q-node q-node-blue'>↑ Aldosterone</span></div>
  3. Add a SECOND callout (green/purple) with CLINICAL EVIDENCE — specific study results, guideline recommendations, or statistics:
     <div class='q-callout q-callout-green'>📊 <strong>Evidence:</strong> HOPE trial showed ramipril reduced CV death by <span class='q-hl'>26%</span> (NNT=28 over 5 years) [2]</div>
  4. Include a styled list with SPECIFIC, ACCURATE details:
     <ul class='q-list'><li><span class='q-hl'>Mechanism:</span> Specific receptor/enzyme interaction with correct terminology</li><li><span class='q-hl'>Clinical effect:</span> Measurable outcome with data (e.g., "↓ BP 10-15 mmHg systolic")</li><li><span class='q-hl'>Key side effect:</span> Specific mechanism behind the side effect (e.g., "dry cough via ↑ bradykinin")</li></ul>
  5. Use <span class='q-label q-label-red'>Normal Physiology</span> vs <span class='q-label q-label-green'>Drug Effect</span> to clearly label comparative sections
  6. For time-dependent protocols (stroke windows, drug onset), use q-timeline with SPECIFIC data:
     <div class='q-timeline'><div class='q-timeline-item green'><strong>0–3h:</strong> IV tPA window (alteplase 0.9 mg/kg)</div><div class='q-timeline-item amber'><strong>3–4.5h:</strong> Extended window (ECASS III criteria)</div><div class='q-timeline-item red'><strong>&gt;4.5h:</strong> Thrombectomy only (DAWN/DEFUSE 3)</div></div>
  7. For comparison questions (drug classes, insulin types), use q-table with SPECIFIC data:
     <table class='q-table'><thead><tr><th>Drug</th><th>Onset</th><th>Peak</th><th>Duration</th></tr></thead><tbody><tr><td>Regular insulin</td><td>30min</td><td>2–4h</td><td>6–8h</td></tr><tr><td>Lispro</td><td>15min</td><td>0.5–1.5h</td><td>3–4h</td></tr></tbody></table>
  8. Use inline source citations like [1], [2] in explanation text that match entries in the "sources" array
  9. For pharmacology: ALWAYS include the SPECIFIC receptor subtype, mechanism (agonist/antagonist/partial agonist), and downstream signaling pathway

"mnemonic" — MUST create a TOPIC-SPECIFIC, CLINICALLY MEANINGFUL mnemonic:
  RULES for great mnemonics:
  - The letters MUST spell a WORD or ACRONYM directly related to the topic (e.g., "ACE" for ACE inhibitors side effects, "FAST" for stroke signs, "MONA" for ACS initial treatment)
  - Each letter MUST correspond to a SPECIFIC, EXAM-TESTABLE clinical fact — NOT generic words
  - Use well-known medical mnemonics when they exist (e.g., "ABCDE" for melanoma, "SAMPLE" for history, "CAGE" for alcoholism screening)
  - If no standard mnemonic exists, CREATE one where the letters spell a relevant word
  - Include a brief "Why it works" explanation in the remember callout

  Format:
  <div class='q-mnemo'>
    <div><div class='q-letter' style='background:linear-gradient(135deg,#ef4444,#dc2626)'>A</div><div class='q-letter-text'>Angioedema (bradykinin-mediated)</div></div>
    <div><div class='q-letter' style='background:linear-gradient(135deg,#f97316,#ea580c)'>C</div><div class='q-letter-text'>Cough (dry, persistent — ↑ bradykinin)</div></div>
    <div><div class='q-letter' style='background:linear-gradient(135deg,#eab308,#ca8a04)'>E</div><div class='q-letter-text'>Electrolyte ↑K+ (↓ aldosterone)</div></div>
  </div>
  <div class='q-callout q-callout-red'>🚨 <strong>ACE</strong> side effects — all caused by ↓ Ang II + ↑ bradykinin!</div>

  Gradient palette (cycle through): red #ef4444→#dc2626, orange #f97316→#ea580c, amber #eab308→#ca8a04, green #22c55e→#16a34a, blue #3b82f6→#2563eb, purple #8b5cf6→#7c3aed, pink #ec4899→#db2777, teal #14b8a6→#0d9488

  EXAMPLES of topic-specific mnemonics:
  - ACE inhibitors side effects → "ACE": Angioedema, Cough, Elevated K+
  - Stroke signs → "FAST": Face drooping, Arm weakness, Speech difficulty, Time to call 911
  - ACS initial treatment → "MONA": Morphine, Oxygen, Nitrates, Aspirin
  - Beta blocker contraindications → "CRAB": Cocaine use, Raynaud's, Asthma, Bradycardia
  - NSAID side effects → "PAIN": Peptic ulcer, Asthma exacerbation, Interstitial nephritis, Na+ retention
  - Warfarin interactions → "ABC": Antibiotics (rifampin), Barbiturates, Carbamazepine (inducers)

"clinicalPearl" — MUST be amber callout with SPECIFIC, VERIFIABLE clinical data:
  <div class='q-callout q-callout-amber'>💎 <strong>Clinical Pearl:</strong> Include specific data like <span class='q-hl'>sensitivity 95%</span>, <span class='q-hl'>NNT=28</span>, or guideline class <span class='q-hl-green'>Class I, Level A</span>. Example: "ACE inhibitors reduce mortality by <span class='q-hl'>20%</span> post-MI (SAVE trial, NNT=20 over 3.5 years)"</div>

"distractorAnalysis" — MUST use grid with SPECIFIC clinical reasoning:
  <div class='q-grid q-grid-2'>
    <div class='q-card q-card-correct'>✅ <strong>Correct:</strong> Specific mechanism explaining why this is right</div>
    <div class='q-card q-card-red'>❌ <strong>Option B:</strong> Why wrong — specific misconception (e.g., "confuses β₁-selective with non-selective effects")</div>
    <div class='q-card q-card-orange'>❌ <strong>Option C:</strong> Why wrong — specific distinction (e.g., "ARBs block the receptor, not the enzyme — different mechanism")</div>
    <div class='q-card q-card-purple'>❌ <strong>Option D:</strong> Why wrong — specific trap (e.g., "aldosterone antagonists work downstream of ACE — different site")</div>
  </div>

ADDITIONAL JSON FIELDS — Choose the RIGHT visual for each question topic:

"illustrationDescription" — REQUIRED for every question. A detailed description of what medical illustration/diagram would best help visualize this concept.
  Example: "Cross-section of the heart showing the left anterior descending artery with a thrombus, highlighting the area of myocardial infarction in the anterior wall, with labeled structures: LAD, LV anterior wall, papillary muscles"
  This description will be used to AI-generate a medical illustration. Be specific about:
  - Anatomical structures to show
  - Pathological changes to highlight
  - Labels and annotations
  - Color coding (e.g., red for ischemic area, blue for deoxygenated blood)
  - Perspective (cross-section, anterior view, microscopic, etc.)
  Do NOT describe a style — just describe the educational content of the image.

"diagramSpec" — Optional. Include for pathway/algorithm questions (pharmacology pathways like RAAS, treatment protocols, decision trees).
  CRITICAL RULES for accurate, memorable diagrams:
  - Flow MUST follow logical biological/physiological direction (left-to-right for horizontal, top-to-bottom for vertical)
  - Each node MUST have an "annotation" field explaining its role in the pathway (shown on hover)
  - Use "subtitle" to indicate the functional state (e.g., "active form", "precursor", "vasoconstrictor", "↑secretion")
  - Use descriptive edge "label" fields that explain the transformation (e.g., "ACE cleaves", "stimulates", "converts")
  - For drug interventions, use a "drug" type node with an inhibition edge to the target, and add a group labeled "Drug Intervention"
  - For feedback loops, use edge type "feedback" — the renderer will draw a curved arrow back
  - MINIMUM 5 nodes and 4 edges for a meaningful pathway — more is better for complex topics

  A JSON object for the DiagramRenderer with this structure:
  { "title": "Renin-Angiotensin-Aldosterone System",
    "layout": "horizontal",
    "nodes": [
      {"id":"kidney","label":"Kidney","type":"organ","icon":"kidney","subtitle":"juxtaglomerular cells","annotation":"Detects ↓BP/↓Na+ at macula densa and releases renin"},
      {"id":"renin","label":"Renin","type":"enzyme","icon":"⚗️","subtitle":"protease","annotation":"Cleaves angiotensinogen → Angiotensin I in the blood"},
      {"id":"ang1","label":"Angiotensin I","type":"substrate","subtitle":"inactive precursor","annotation":"Decapeptide produced by renin cleavage of angiotensinogen"},
      {"id":"ace","label":"ACE","type":"enzyme","icon":"⚗️","subtitle":"kininase II","annotation":"Converts Ang I → Ang II in pulmonary endothelium; also degrades bradykinin"},
      {"id":"ang2","label":"Angiotensin II","type":"product","subtitle":"potent vasoconstrictor","annotation":"Octapeptide: vasoconstriction + ↑aldosterone + ↑ADH + sympathetic activation"},
      {"id":"aldo","label":"Aldosterone","type":"hormone","subtitle":"↑Na⁺ reabsorption","annotation":"Mineralocorticoid from zona glomerulosa: ↑Na⁺/H₂O reabsorption, ↑K⁺/H⁺ excretion"},
      {"id":"acei","label":"ACE Inhibitor","type":"drug","icon":"💊","subtitle":"e.g., lisinopril","annotation":"Blocks ACE → ↓Ang II + ↑bradykinin → vasodilation + ↓aldosterone"}
    ],
    "edges": [
      {"from":"kidney","to":"renin","label":"↓BP triggers","type":"activation"},
      {"from":"renin","to":"ang1","label":"cleaves","type":"conversion"},
      {"from":"ang1","to":"ace","label":"substrate for","type":"conversion"},
      {"from":"ace","to":"ang2","label":"produces","type":"conversion"},
      {"from":"ang2","to":"aldo","label":"stimulates","type":"activation"},
      {"from":"ang2","to":"kidney","label":"↑BP feedback","type":"feedback"},
      {"from":"acei","to":"ace","label":"blocks","type":"inhibition"}
    ],
    "groups": [
      {"id":"intervention","label":"Drug Intervention","color":"#ef4444","nodes":["acei"]}
    ]
  }
  Layout: "horizontal" or "vertical". Node types: enzyme, substrate, product, receptor, effect, outcome, organ, drug, blocked, decision, info, hormone, ion, gene.
  Use "icon" for emoji icons (⚗️,💊,🧬,❤️,🧠,🫀,⚡) or organ names (heart, brain, lung, kidney, liver, vessel, bone, eye, stomach, pancreas, thyroid, adrenal, pituitary, ovary, testis) for anatomical SVG icons.
  Use "subtitle" for brief functional state below the node label (e.g., "precursor", "active form", "vasoconstrictor").
  Use "annotation" for longer tooltip text explaining the node's role (shown on hover).
  Edge types: normal, activation (green arrow), inhibition (red T-bar), conversion (gray arrow), feedback (yellow curved arrow).

"molecularScenes" — Optional. Include for mechanism-of-action questions (drug-receptor binding, channel blocking, enzyme inhibition, ion channels, transporters).
  CRITICAL RULES for accurate, memorable molecular illustrations:
  - ALWAYS generate 2 scenes: Normal physiology (blocked:false) + Drug effect (blocked:true)
  - Every scene MUST have a "descriptionText" — a one-line summary of the mechanism (e.g., "NE binds β₁ → Gs activation → ↑cAMP → ↑heart rate")
  - For the blocked scene, include "drugMechanism" explaining HOW the drug blocks (e.g., "competitive antagonism at β₁ receptor")
  - Use specific molecule names (e.g., "NE", "Epinephrine", "GABA") NOT generic terms ("ligand", "neurotransmitter")
  - For GPCR pathways, use gprotein_cascade template with gprotein, effector, and secondMessenger fields
  - For ion channels, include voltageLabel and specific ion names with colors
  - For enzyme inhibition, include inhibitorType ("competitive" or "non-competitive")
  - For transporters, show the molecule being transported with its direction
  - Include stepDescriptions array listing 3-4 key steps of the mechanism

  A JSON object for the MolecularIllustrator with this structure:
  { "scenes": [
      { "template":"gprotein_cascade","label":"Normal β₁ Stimulation","blocked":false,"resultLabel":"Active",
        "receptor":{"label":"β₁ Receptor","color":"#8b5cf6","isGPCR":true},
        "ligand":{"label":"NE","color":"#ef4444"},
        "gprotein":{"type":"s","color":"#f59e0b"},
        "effector":{"label":"Adenylyl Cyclase","color":"#3b82f6"},
        "secondMessenger":{"label":"cAMP","color":"#22c55e","description":"activates PKA → ↑Ca²⁺ influx"},
        "signal":{"active":true,"text":"Gs → cAMP ↑","color":"#f97316"},
        "effect":{"type":"heart","color":"#ef4444","extra":{"icon":"❤️","label":"↑ HR & ↑ contractility"}},
        "descriptionText":"NE binds β₁ receptor → Gs activation → ↑adenylyl cyclase → ↑cAMP → ↑PKA → ↑Ca²⁺ → ↑heart rate",
        "stepDescriptions":["NE binds β₁ receptor","Gs protein dissociates (GDP→GTP)","Adenylyl cyclase produces cAMP","PKA phosphorylates Ca²⁺ channels"]
      },
      { "template":"gprotein_cascade","label":"With Metoprolol","blocked":true,"resultLabel":"Blocked",
        "receptor":{"label":"β₁ Receptor","color":"#6B7280","isGPCR":true},
        "ligand":{"label":"NE","color":"#ef4444"},
        "gprotein":{"type":"s","color":"#6B7280"},
        "effector":{"label":"Adenylyl Cyclase","color":"#6B7280"},
        "secondMessenger":{"label":"cAMP","color":"#6B7280","description":"↓production"},
        "drugName":"Metoprolol",
        "drugMechanism":"competitive β₁-selective antagonist",
        "effect":{"type":"crossed","color":"#ef4444"},
        "descriptionText":"Metoprolol blocks β₁ receptor → No Gs activation → ↓cAMP → ↓heart rate & ↓contractility",
        "stepDescriptions":["Metoprolol occupies β₁ binding site","NE cannot activate receptor","No Gs protein activation","↓cAMP → ↓heart rate"]
      }
    ]
  }
  Templates: receptor_ligand, gprotein_cascade, ion_channel, transporter, enzyme_catalysis, dna_binding.
  IMPORTANT: Always generate 2 scenes — one without drug (blocked:false) showing normal physiology, and one with drug (blocked:true) showing the drug effect.
  Scene fields: receptor, ligand, gprotein, effector, secondMessenger, signal, channel, ions, transporter, molecule, enzyme, substrates, products, effect, drugName, organTarget.
  "drugName" — name of the drug being shown in the blocked scene (displayed as a pill icon).
  "drugMechanism" — how the drug blocks (e.g., "competitive antagonist", "irreversible inhibitor", "allosteric modulator").
  "descriptionText" — one-line mechanism summary shown below the scene.
  "stepDescriptions" — array of 3-4 key steps describing the mechanism sequence.
  "effect" — visual effect icon: type can be heart, brain, lightning, crossed, constrict, dilate. Include extra.icon (emoji) and extra.label for text.
  "inhibitorType" — for enzyme_catalysis: "competitive" or "non-competitive".
  "receptor.isGPCR" — true for G-protein coupled receptors (shows 7-transmembrane domains).
  "channel.isVoltageGated" — true for voltage-gated ion channels (shows voltage sensor).
  Use specific molecule/ion names in scene fields for richer labeling.

"sources" — Optional but RECOMMENDED. Array of real medical references. Always include at least 2-3 references.
  [ {"type":"guideline","title":"2023 AHA/ACC Hypertension Guideline"},
    {"type":"paper","title":"NEJM: HOPE Trial, 2000"},
    {"type":"review","title":"Lancet: ACE Inhibitor Meta-Analysis, 2022"} ]
  Type values: "guideline", "paper", "review".
  Use inline citations [1], [2], [3] in the explanation text that correspond to the sources array order.

WHEN TO USE EACH VISUAL — Match the visual to the medical system and question type:

VISUAL ASSIGNMENT BY MEDICAL SYSTEM:
- Cardiovascular: diagramSpec (hemodynamic pathways, cardiac cycle, coronary circulation), q-timeline (MI management windows), q-table (drug comparisons - antihypertensives, antiarrhythmics)
- Respiratory: diagramSpec (respiratory physiology pathways, ventilation-perfusion), q-timeline (COPD exacerbation management, asthma step therapy), q-table (inhaler comparisons, ABG interpretation)
- Neurological: diagramSpec (neural pathways, cranial nerve pathways, basal ganglia circuits), q-timeline (stroke treatment windows, seizure protocols), q-table (antiepileptic drug comparison, headache types)
- Gastrointestinal: diagramSpec (digestive enzyme cascades, hepatic metabolism pathways), q-table (IBD comparison, hepatitis serology), q-timeline (GI bleed management)
- Renal: diagramSpec (nephron physiology, RAAS, acid-base regulation), q-table (AKI vs CKD, electrolyte disorders), q-timeline (AKI management)
- Endocrine: diagramSpec (hormone feedback loops, HPA axis, thyroid pathway), q-table (diabetes medications, thyroid function tests), q-timeline (DKA management, adrenal crisis)
- Hematologic: diagramSpec (coagulation cascade, hematopoiesis), q-table (anemia types, coagulation studies), molecularScenes (for drug mechanisms like anticoagulants)
- Musculoskeletal: diagramSpec (bone remodeling, joint structure), q-table (arthritis comparisons, fracture classification), q-timeline (osteoporosis treatment)
- Integumentary: q-table (skin lesion classification, rash differentials), diagramSpec (wound healing phases)
- Reproductive: diagramSpec (HPO axis, menstrual cycle, spermatogenesis), q-table (contraception comparison, STI features), q-timeline (pregnancy milestones, labor stages)
- Immunologic: diagramSpec (immune activation pathways, complement cascade, hypersensitivity types), q-table (immunodeficiency types, transplant rejection), molecularScenes (for monoclonal antibody mechanisms)
- Pharmacology: diagramSpec (drug metabolism pathways, RAAS, neurotransmitter pathways), molecularScenes (drug-receptor binding, enzyme inhibition, ion channels), q-table (drug class comparisons)
- Pathology: diagramSpec (disease progression pathways, neoplasia stages), q-table (tumor classification, grading systems), q-timeline (cancer staging and progression)
- Microbiology: diagramSpec (infection pathways, viral replication cycle, bacterial pathogenesis), q-table (organism classification, antibiotic coverage), q-timeline (infection progression)
- Biochemistry: diagramSpec (metabolic pathways: glycolysis, TCA, urea cycle, ETC), molecularScenes (enzyme kinetics, allosteric regulation), q-table (glycogen storage diseases, porphyrias)

RULES:
- EVERY question MUST include at least ONE of: diagramSpec, molecularScenes, q-timeline, or q-table in the explanation
- diagramSpec: ALWAYS include for pathway/process questions (≥5 nodes, ≥4 edges with annotations)
- molecularScenes: Include for mechanism-of-action and drug-receptor questions (2 scenes: normal + blocked)
- q-timeline: Include for time-sensitive protocols and disease progression questions
- q-table: Include for comparison and classification questions
- For pharmacology/drug mechanism topics: ALWAYS include BOTH diagramSpec AND molecularScenes
- For pathway/protocol topics: ALWAYS include a populated diagramSpec
- Do NOT force visuals that genuinely don't fit, but ALWAYS try to include at least one
- sources → ALWAYS include at least 2-3 references

VALID CSS CLASSES (use ONLY these):
- Highlights: q-hl, q-hl-red, q-hl-green, q-hl-amber, q-hl-purple
- Flow nodes: q-node-red, q-node-green, q-node-blue, q-node-purple, q-node-orange
- Arrows: q-arrow, q-arrow-red, q-arrow-green, q-arrow-blue, q-arrow-amber
- Callouts: q-callout-blue, q-callout-green, q-callout-red, q-callout-amber, q-callout-purple
- Cards: q-card-correct, q-card-red, q-card-green, q-card-orange, q-card-purple, q-card-blue
- Containers: q-flow, q-flow-col, q-mnemo, q-grid, q-grid-2, q-grid-3, q-list
- Badges: q-badge-blue, q-badge-red, q-badge-green, q-badge-amber, q-badge-purple
- Timeline: q-timeline, q-timeline-item, q-timeline-item green, q-timeline-item amber, q-timeline-item red
- Table: q-table
- Labels: q-label, q-label-red, q-label-green

REMEMBER: Always use SINGLE QUOTES in HTML attributes. Be medically accurate and exam-level correct. Create topic-specific mnemonics where letters spell a relevant word.`;
function buildUserPrompt(topic, types, difficulties, system, count) {
    return `Generate ${count} medical question(s):

Topic: ${topic}
Medical System: ${system}
Question Types: ${types.join(', ')}
Difficulties: ${difficulties.join(', ')}

Return a JSON object with this EXACT structure (use single quotes in HTML):
{
  "questions": [
    {
      "type": "mcq",
      "text": "A 55yo man presents with <span class='q-hl-red'>crushing chest pain</span>... The most likely cause is:",
      "options": ["Option A plain text", "Option B plain text", "Option C plain text", "Option D plain text"],
      "answer": "Option A plain text",
      "explanation": "<div class='q-callout q-callout-blue'>💡 <strong>Key Concept:</strong> ... [1]</div><div class='q-flow'>...</div><ul class='q-list'>...</ul>",
      "mnemonic": "<div class='q-mnemo'>...</div><div class='q-callout q-callout-red'>🚨 Remember this mnemonic!</div>",
      "clinicalPearl": "<div class='q-callout q-callout-amber'>💎 <strong>Clinical Pearl:</strong> ...</div>",
      "distractorAnalysis": "<div class='q-grid q-grid-2'>...</div>",
      "illustrationDescription": "Detailed description of what illustration would help visualize this concept",
      "diagramSpec": null,
      "molecularScenes": null,
      "sources": [ {"type":"guideline","title":"..."}, {"type":"paper","title":"..."} ],
      "difficulty": "Medium",
      "metadata": { "system": "${system}", "tags": ["${topic}", "tag1", "tag2"] }
    }
  ]
}

CRITICAL REMINDERS:
- Use SINGLE QUOTES for ALL HTML attributes: class='q-hl' NOT class="q-hl"
- options and answer MUST be plain text with NO HTML tags
- Every question MUST have rich HTML in text, explanation, mnemonic, clinicalPearl, distractorAnalysis
- Every question MUST have an illustrationDescription — describe what medical illustration would help visualize the concept
- Explanation MUST include SPECIFIC medical data: drug dosages, half-lives, sensitivity/specificity, receptor subtypes, signaling pathways — NOT vague descriptions
- Mnemonic MUST use q-mnemo with q-letter blocks — letters MUST spell a TOPIC-RELEVANT word (e.g., "ACE" for ACE inhibitor side effects, "FAST" for stroke). Each letter = specific exam-testable fact
- diagramSpec: Set to null if not needed. When included, you MUST:
  * Populate at least 5 nodes with "annotation" field explaining each node's role
  * Populate at least 4 edges with descriptive "label" fields
  * Use descriptive edge labels (e.g., "cleaves", "stimulates", "blocks") NOT just the enzyme name
  * Use "subtitle" on every node for functional state (e.g., "precursor", "vasoconstrictor")
  * Include feedback loops where biologically accurate (e.g., Ang II → kidney feedback)
  * NEVER return empty nodes/edges arrays
- molecularScenes: Set to null if not needed. When included, you MUST:
  * Generate 2 fully populated scenes with descriptionText and stepDescriptions
  * Include drugMechanism in the blocked scene
  * Use specific molecule names (NE, Epinephrine) NOT generic terms
  * For GPCR receptors: use gprotein_cascade template with gprotein, effector, secondMessenger
  * NEVER return empty scenes arrays
- VISUAL REQUIREMENT: Every question MUST include at least ONE visual element in the explanation (diagramSpec, molecularScenes, q-timeline, or q-table)
- For pharmacology/drug mechanism topics: ALWAYS include BOTH diagramSpec AND molecularScenes
- For pathway/protocol/cascade topics: ALWAYS include a populated diagramSpec
- For time-sensitive/disease progression topics: ALWAYS include q-timeline
- For comparison/classification/differential topics: ALWAYS include q-table
- Match the visual to the medical system using the VISUAL ASSIGNMENT BY MEDICAL SYSTEM guide above
- sources should ALWAYS include at least 2-3 real medical references
- Use inline citations [1], [2] in explanation text matching the sources array`;
}
/**
 * Strip HTML tags from a string, leaving only text content
 */ function stripHtml(html) {
    return html.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim();
}
/**
 * Enrich plain text content with basic HTML formatting
 * if the AI returned content without proper HTML structure
 */ function enrichContent(content, fieldType) {
    if (!content.trim()) return content;
    // Check if content already has HTML tags with our CSS classes
    const hasMedqClasses = /class=['"]q-/.test(content);
    if (hasMedqClasses) return content;
    // Check if content has any HTML tags
    const hasHtml = /<[a-z][\s\S]*?>/i.test(content);
    if (fieldType === 'text') {
        if (hasMedqClasses) return content;
        // Try to highlight common medical terms
        return content;
    }
    if (fieldType === 'explanation') {
        if (hasMedqClasses) return content;
        // Convert plain text explanation to structured HTML
        const paragraphs = content.split(/\n\n+/).filter(Boolean);
        if (paragraphs.length === 0) return content;
        let html = `<div class='q-callout q-callout-blue'>💡 <strong>Key Points:</strong> ${paragraphs[0]}</div>`;
        if (paragraphs.length > 1) {
            const items = paragraphs.slice(1).map((p)=>`<li>${p}</li>`).join('');
            html += `<ul class='q-list'>${items}</ul>`;
        }
        return html;
    }
    if (fieldType === 'mnemonic') {
        if (hasMedqClasses) return content;
        // Try to create a meaningful mnemonic from the text
        // Split by common delimiters: commas, semicolons, dashes, newlines
        const items = content.split(/[,;]\s*|\n|—\s*|–\s*|\s{2,}/).map((s)=>s.trim()).filter((s)=>s.length > 1);
        if (items.length === 0) {
            const words = content.split(/\s+/).filter((w)=>w.length > 0);
            if (words.length === 0) return content;
        }
        const gradients = [
            'linear-gradient(135deg,#ef4444,#dc2626)',
            'linear-gradient(135deg,#f97316,#ea580c)',
            'linear-gradient(135deg,#eab308,#ca8a04)',
            'linear-gradient(135deg,#22c55e,#16a34a)',
            'linear-gradient(135deg,#3b82f6,#2563eb)',
            'linear-gradient(135deg,#8b5cf6,#7c3aed)',
            'linear-gradient(135deg,#ec4899,#db2777)',
            'linear-gradient(135deg,#14b8a6,#0d9488)'
        ];
        // Build letter blocks from items — each item gets its first letter
        const mnemonicItems = items.slice(0, 8).map((item, i)=>{
            const letter = item.match(/\b[A-Z]/i)?.[0]?.toUpperCase() || item[0].toUpperCase();
            return `<div><div class='q-letter' style='background:${gradients[i % gradients.length]}'>${letter}</div><div class='q-letter-text'>${item}</div></div>`;
        });
        // Try to extract the acronym from the first letters
        const acronym = mnemonicItems.map((m)=>{
            const match = m.match(/class='q-letter'[^>]*>(\w)/);
            return match ? match[1] : '';
        }).join('');
        const letterBlocks = mnemonicItems.join('');
        const acronymLabel = acronym ? `<strong>${acronym}</strong> — ` : '';
        return `<div class='q-mnemo'>${letterBlocks}</div><div class='q-callout q-callout-red'>🚨 ${acronymLabel}Remember this mnemonic!</div>`;
    }
    if (fieldType === 'clinicalPearl') {
        if (hasMedqClasses) return content;
        return `<div class='q-callout q-callout-amber'>💎 <strong>Clinical Pearl:</strong> ${content}</div>`;
    }
    if (fieldType === 'distractorAnalysis') {
        if (hasMedqClasses) return content;
        // Convert plain text to cards
        const lines = content.split('\n').filter((l)=>l.trim());
        const cards = lines.map((line)=>{
            const isCorrect = line.toLowerCase().includes('correct') || line.startsWith('✅');
            return `<div class='q-card ${isCorrect ? 'q-card-correct' : 'q-card-red'}'>${isCorrect ? '✅' : '❌'} ${line}</div>`;
        }).join('');
        return `<div class='q-grid q-grid-2'>${cards}</div>`;
    }
    return content;
}
/**
 * Fix AI-generated HTML to use only valid CSS classes
 */ function fixHtmlClasses(html) {
    return html// Replace q-node-yellow with q-node-orange (yellow isn't commonly defined)
    .replace(/q-node-yellow/g, 'q-node-orange')// Replace any q-node-<invalid> with q-node
    .replace(/q-node-(?!red|green|blue|purple|orange|yellow|amber|teal|blocked)[a-z]+/g, 'q-node');
}
/**
 * Robust JSON parser that handles common AI response issues:
 * 1. Markdown code block wrapping
 * 2. Leading/trailing non-JSON text
 * 3. HTML with double quotes that break JSON (converts to single quotes)
 * 4. Truncated responses (closes open brackets)
 */ function parseAIResponse(content) {
    let text = content.trim();
    // Step 1: Remove markdown code block markers
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*)```/);
    if (codeBlockMatch) {
        text = codeBlockMatch[1].trim();
    }
    // Step 2: Try direct parse first
    try {
        return JSON.parse(text);
    } catch  {
    // Continue to repairs
    }
    // Step 3: Fix HTML quotes + remove trailing commas
    const withFixedHtml = fixHtmlQuotesInJson(text);
    const withFixedHtmlAndCommas = removeTrailingCommas(withFixedHtml);
    try {
        return JSON.parse(withFixedHtmlAndCommas);
    } catch  {
    // Continue
    }
    // Step 4: Strip to JSON boundaries + fix HTML + remove trailing commas
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) {
        const stripped = text.substring(firstBrace, lastBrace + 1);
        const strippedFixed = removeTrailingCommas(fixHtmlQuotesInJson(stripped));
        try {
            return JSON.parse(strippedFixed);
        } catch  {
        // Continue
        }
    }
    // Step 5: Recover truncated JSON (missing closing brackets)
    const recovered = recoverTruncatedJson(withFixedHtmlAndCommas);
    try {
        return JSON.parse(recovered);
    } catch  {
    // Continue
    }
    // Step 6: Strip boundaries + fix HTML + remove commas + recover truncated
    if (firstBrace >= 0 && lastBrace > firstBrace) {
        const stripped = text.substring(firstBrace, lastBrace + 1);
        const fullyFixed = recoverTruncatedJson(removeTrailingCommas(fixHtmlQuotesInJson(stripped)));
        try {
            return JSON.parse(fullyFixed);
        } catch  {
        // Continue
        }
    }
    // Step 7: Last resort — replace &quot; + fix HTML + remove commas
    const withEscapedQuotes = removeTrailingCommas(fixHtmlQuotesInJson(text.replace(/&quot;/g, "'")));
    try {
        return JSON.parse(withEscapedQuotes);
    } catch  {
    // Continue
    }
    // Step 8: Nuclear option — try to extract questions using regex
    // This handles cases where the JSON structure is fundamentally broken
    // but the individual question data is still parseable
    try {
        const extracted = extractQuestionsFromBrokenJson(text);
        if (extracted && extracted.length > 0) {
            console.log(`parseAIResponse: Step 8 - extracted ${extracted.length} questions from broken JSON`);
            return {
                questions: extracted
            };
        }
    } catch  {
    // Give up
    }
    // Step 9: Nuclear regex extraction — extract question data using regex patterns
    // This handles completely broken JSON where the structure is mangled but
    // individual fields are still readable
    try {
        const extracted = extractQuestionsByRegex(text);
        if (extracted && extracted.length > 0) {
            console.log(`parseAIResponse: Step 9 - regex extracted ${extracted.length} questions`);
            return {
                questions: extracted
            };
        }
    } catch  {
    // Continue
    }
    console.error('parseAIResponse: All JSON parse attempts failed. Raw content (first 800 chars):', text.substring(0, 800));
    throw new Error('Failed to parse AI response as JSON after all repair attempts');
}
/**
 * Nuclear regex-based question extraction from completely broken JSON.
 * Uses regex to find individual field values and reconstructs question objects.
 */ function extractQuestionsByRegex(text) {
    const questions = [];
    // Find all question blocks by looking for "type": "mcq" or "type" : "tf" patterns
    const typePattern = /"type"\s*:\s*"(mcq|tf|short)"/g;
    const typeMatches = [
        ...text.matchAll(typePattern)
    ];
    for (const typeMatch of typeMatches){
        const startIdx = typeMatch.index;
        // Find the enclosing object boundaries
        let depth = 0;
        let endIdx = startIdx;
        // Go backwards to find the opening {
        let searchStart = startIdx;
        for(let i = startIdx; i >= 0; i--){
            if (text[i] === '}') depth++;
            else if (text[i] === '{') {
                if (depth === 0) {
                    searchStart = i;
                    break;
                }
                depth--;
            }
        }
        // Go forward to find the closing }
        depth = 0;
        for(let i = searchStart; i < text.length; i++){
            if (text[i] === '{') depth++;
            else if (text[i] === '}') {
                depth--;
                if (depth === 0) {
                    endIdx = i + 1;
                    break;
                }
            }
        }
        const block = text.substring(searchStart, endIdx);
        // Extract individual fields using regex
        const qType = typeMatch[1];
        const extractField = (name)=>{
            // Try pattern: "name": "value" or "name" : "value"
            const match = block.match(new RegExp(`"${name}"\\s*:\\s*"([\\s\\S]*?)(?:"\\s*[,}]|"$)`, 'm'));
            return match ? match[1].trim() : '';
        };
        const extractArray = (name)=>{
            const match = block.match(new RegExp(`"${name}"\\s*:\\s*\\[([\\s\\S]*?)\\]`));
            if (!match) return [];
            // Parse array items
            const items = [];
            const itemPattern = /"([^"]*?)"/g;
            let itemMatch;
            while((itemMatch = itemPattern.exec(match[1])) !== null){
                items.push(itemMatch[1]);
            }
            return items;
        };
        const text_content = extractField('text');
        const answer = extractField('answer');
        const explanation = extractField('explanation');
        const mnemonic = extractField('mnemonic');
        const clinicalPearl = extractField('clinicalPearl');
        const distractorAnalysis = extractField('distractorAnalysis');
        const options = extractArray('options');
        // Only include if we have at least text and answer
        if (text_content && answer) {
            questions.push({
                type: qType,
                text: text_content,
                options: options.length > 0 ? options : qType === 'tf' ? [
                    'True',
                    'False'
                ] : [],
                answer,
                explanation: explanation || 'Explanation not available.',
                mnemonic: mnemonic || '',
                clinicalPearl: clinicalPearl || '',
                distractorAnalysis: distractorAnalysis || '',
                difficulty: 'Medium',
                metadata: {
                    tags: []
                }
            });
        }
    }
    return questions.length > 0 ? questions : null;
}
/**
 * Last-resort extraction: try to pull question objects from broken JSON
 * by finding individual question boundaries.
 */ function extractQuestionsFromBrokenJson(text) {
    const questions = [];
    // Find all question object boundaries
    // Look for patterns like: { "type": "mcq", ... }
    const questionRegex = /\{\s*"type"\s*:\s*"mcq"/g;
    let match;
    let searchStart = 0;
    while((match = questionRegex.exec(text)) !== null){
        const startIdx = match.index;
        // Find the matching closing brace
        let depth = 0;
        let endIdx = startIdx;
        for(let i = startIdx; i < text.length; i++){
            if (text[i] === '{') depth++;
            else if (text[i] === '}') depth--;
            if (depth === 0) {
                endIdx = i + 1;
                break;
            }
        }
        const questionText = text.substring(startIdx, endIdx);
        try {
            // Try to parse just this question object
            const fixed = removeTrailingCommas(fixHtmlQuotesInJson(questionText));
            const parsed = JSON.parse(fixed);
            questions.push(parsed);
        } catch  {
        // Skip this question — can't parse it
        }
        searchStart = endIdx;
    }
    return questions.length > 0 ? questions : null;
}
/**
 * Fix HTML attribute double quotes in JSON text.
 * Replaces ANY attribute="value" pattern with attribute='value'.
 * This is the #1 cause of JSON parse failures — AI uses double quotes in HTML
 * attributes despite being told to use single quotes.
 *
 * Strategy: Process the text character by character to properly track
 * whether we're inside a JSON string or an HTML tag, then replace
 * double-quoted HTML attributes with single-quoted ones.
 */ function fixHtmlQuotesInJson(text) {
    // Step 1: Unescape \" inside HTML tags to " for processing
    // AI often returns: class=\"q-hl\" which we want to normalize first
    let result = text.replace(/\\"/g, (match, offset)=>{
        // Check if this escaped quote is inside an HTML tag context
        // Look backwards from the offset to see if we're after a < and before a >
        const before = text.substring(Math.max(0, offset - 200), offset);
        const lastOpenTag = before.lastIndexOf('<');
        const lastCloseTag = before.lastIndexOf('>');
        // If we're inside an HTML tag (more recent < than >)
        if (lastOpenTag > lastCloseTag) {
            return '"'; // Unescape — it's an HTML attribute quote
        }
        return match; // Keep escaped — it's a JSON string delimiter
    });
    // Step 2: Process HTML tags — replace ="..." with ='...' inside tags
    result = result.replace(/<([^>]{0,2000})>/g, (match, tagContent)=>{
        // Replace all attribute="value" with attribute='value' inside this tag
        // Handle style="..." specially since it may contain complex values
        let fixed = tagContent;
        // Replace attribute="value" patterns — handle simple and complex values
        // Pattern: word chars or data-/aria- prefix, =, then " anything-not-quote "
        fixed = fixed.replace(/([\w-]+)=(")([^"]*?)\2/g, "$1='$3'");
        return `<${fixed}>`;
    });
    // Step 3: Handle remaining unescaped double quotes in HTML attributes
    // that are inside JSON string values (e.g., "text": "...class="q-hl"...")
    // This is trickier — we need to find patterns where a JSON string value
    // contains HTML with double quotes
    result = result.replace(/(:\s*")(.*?class\s*=\s*")(.*?)(".*?")/gs, (_, prefix, attrStart, attrVal, rest)=>{
        return `${prefix}${attrStart.replace(/"/g, "'")}${attrVal}${rest}`;
    });
    return result;
}
/**
 * Remove trailing commas in JSON (before } or ])
 * This is extremely common in AI-generated JSON and causes parse failures.
 */ function removeTrailingCommas(text) {
    // Remove commas before closing brackets/braces, with optional whitespace
    return text.replace(/,\s*([}\]])/g, '$1');
}
/**
 * Attempt to recover a truncated JSON response by:
 * 1. Finding the last complete question object
 * 2. Closing open brackets properly
 * 3. Removing incomplete trailing content
 */ function recoverTruncatedJson(text) {
    // Count open vs close brackets
    const opens = (text.match(/[{[]/g) || []).length;
    const closes = (text.match(/[}\]]/g) || []).length;
    const diff = opens - closes;
    if (diff <= 0) return text;
    let trimmed = text;
    // Strategy: Find the last complete object by looking for "}," or "}]"
    // Try to truncate at the last complete question boundary
    const lastCompleteObj = Math.max(trimmed.lastIndexOf('},'), trimmed.lastIndexOf('}]'), trimmed.lastIndexOf('} '));
    if (lastCompleteObj > trimmed.length * 0.5) {
        // We found a reasonable truncation point — cut there and close brackets
        trimmed = trimmed.substring(0, lastCompleteObj + 1);
        // Now count remaining open brackets and close them
        const remainingOpens = (trimmed.match(/[{[]/g) || []).length;
        const remainingCloses = (trimmed.match(/[}\]]/g) || []).length;
        const remaining = remainingOpens - remainingCloses;
        if (remaining > 0) {
            // Close in reverse order: ] before }
            for(let i = 0; i < remaining; i++){
                trimmed += ']'; // Most inner brackets are arrays
            }
            // Ensure the outermost structure is closed with }
            if (!trimmed.endsWith('}')) {
                trimmed += '}';
            }
        }
        console.log(`Recovered truncated JSON at position ${lastCompleteObj}, added ${remaining} closing brackets`);
        return trimmed;
    }
    // Fallback: simple bracket counting approach
    trimmed = trimmed.replace(/[,:\s]*$/, '');
    for(let i = 0; i < diff; i++){
        trimmed += i < Math.ceil(diff / 2) ? ']' : '}';
    }
    console.log(`Recovered truncated JSON: added ${diff} closing brackets (fallback)`);
    return trimmed;
}
const MAX_RETRIES = 1;
const AI_TIMEOUT_MS = Number(process.env.AI_GENERATION_TIMEOUT_MS || 180000); // Per-attempt AI timeout
// Leave unset by default so the provider can use the context remaining after
// the prompt. Set this to a positive value to enforce an application limit.
const AI_MAX_OUTPUT_TOKENS = Number(process.env.AI_GENERATION_MAX_OUTPUT_TOKENS || 0);
/**
 * Race an AI call against a timeout. Returns the AI content or throws on timeout.
 */ async function aiCallWithTimeout(request, system, userPrompt, timeoutMs) {
    const aiPromise = (0,_lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__.callChat)(request, {
        stage: 'chat-adapter',
        system,
        prompt: userPrompt,
        maxOutputTokens: AI_MAX_OUTPUT_TOKENS
    });
    const requestedModel = request.headers.get('x-model') || await (0,_lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__/* .resolveDefaultModelString */ .Ez)('chat-adapter');
    if (/^ollama(?::|$)/i.test(requestedModel)) {
        const aiContent = await aiPromise;
        if (!aiContent) throw new Error('AI returned empty response');
        return aiContent;
    }
    const timeoutPromise = new Promise((_, reject)=>setTimeout(()=>reject(new Error(`AI call timed out after ${timeoutMs / 1000}s`)), timeoutMs));
    const aiContent = await Promise.race([
        aiPromise,
        timeoutPromise
    ]);
    if (!aiContent) throw new Error('AI returned empty response');
    return aiContent;
}
/**
 * Save a single question to the database and return the formatted result
 */ async function saveQuestion(q, topic, system) {
    const metadata = q.metadata || {};
    const tags = Array.isArray(metadata.tags) ? metadata.tags : [
        topic
    ];
    const qType = q.type || 'mcq';
    let options = Array.isArray(q.options) ? q.options : qType === 'tf' ? [
        'True',
        'False'
    ] : [];
    options = options.map((opt)=>stripHtml(String(opt)));
    let answer = stripHtml(String(q.answer || ''));
    if (qType === 'mcq' && options.length > 0) {
        const matchIndex = options.findIndex((opt)=>opt.toLowerCase().trim() === answer.toLowerCase().trim());
        if (matchIndex >= 0) {
            answer = options[matchIndex];
        } else {
            const partialMatch = options.findIndex((opt)=>opt.toLowerCase().includes(answer.toLowerCase()) || answer.toLowerCase().includes(opt.toLowerCase()));
            if (partialMatch >= 0) {
                answer = options[partialMatch];
            }
        }
    }
    let text = fixHtmlClasses(String(q.text || ''));
    text = enrichContent(text, 'text');
    let explanation = fixHtmlClasses(String(q.explanation || ''));
    explanation = enrichContent(explanation, 'explanation');
    let mnemonic = fixHtmlClasses(String(q.mnemonic || ''));
    mnemonic = enrichContent(mnemonic, 'mnemonic');
    let clinicalPearl = fixHtmlClasses(String(q.clinicalPearl || ''));
    clinicalPearl = enrichContent(clinicalPearl, 'clinicalPearl');
    let distractorAnalysis = fixHtmlClasses(String(q.distractorAnalysis || ''));
    distractorAnalysis = enrichContent(distractorAnalysis, 'distractorAnalysis');
    let diagramSpec = '';
    if (q.diagramSpec && typeof q.diagramSpec === 'object') {
        const ds = q.diagramSpec;
        if (Array.isArray(ds.nodes) && ds.nodes.length >= 2 && Array.isArray(ds.edges) && ds.edges.length >= 1) {
            diagramSpec = JSON.stringify(q.diagramSpec);
        }
    }
    let molecularScenes = '';
    if (q.molecularScenes && typeof q.molecularScenes === 'object') {
        const ms = q.molecularScenes;
        if (Array.isArray(ms.scenes) && ms.scenes.length >= 1) {
            molecularScenes = JSON.stringify(q.molecularScenes);
        }
    }
    const sources = Array.isArray(q.sources) ? JSON.stringify(q.sources) : '[]';
    const illustrationDescription = String(q.illustrationDescription || '');
    const saved = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.create({
        data: {
            type: qType,
            text,
            options: JSON.stringify(options),
            answer,
            explanation,
            mnemonic,
            clinicalPearl,
            distractorAnalysis,
            illustrationDescription,
            diagramSpec,
            molecularScenes,
            sources,
            difficulty: q.difficulty || 'Medium',
            system: metadata.system || system,
            topic,
            tags: JSON.stringify(tags),
            isAIGenerated: true
        }
    });
    return {
        ...saved,
        options: JSON.parse(saved.options),
        tags: JSON.parse(saved.tags),
        sources: saved.sources ? JSON.parse(saved.sources) : [],
        distractorAnalysis: distractorAnalysis || undefined,
        illustrationDescription: illustrationDescription || undefined,
        diagramSpec: diagramSpec || undefined,
        molecularScenes: molecularScenes || undefined
    };
}
const GET = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_6__/* .withErrorHandler */ .FB)(async (req)=>{
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');
    if (!jobId) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__/* .badRequest */ .li)('jobId is required');
    const job = (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId);
    if (!job) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__/* .notFound */ .mX)('Job not found');
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(job);
});
const POST = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_6__/* .withErrorHandler */ .FB)(async (req)=>{
    const body = await req.json();
    // ── AI feature gate ──
    // Resolve the user (session or guest fallback), then check tier + daily
    // usage. If over limit, try to debit credits. If no credits, return
    // 402/429 with upgrade hints.
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__/* .resolveUserId */ .n$)();
    const { debitAICredits } = await __webpack_require__.e(/* import() */ 1597).then(__webpack_require__.bind(__webpack_require__, 701597));
    const gate = await debitAICredits(userId, 'generate');
    if (!gate.allowed) {
        const status = gate.reason === 'no_credits' ? 402 : 429;
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: gate.reason === 'no_credits' ? 'You have reached your daily AI generation limit and have insufficient credits.' : 'Daily AI generation limit reached.',
            reason: gate.reason,
            category: gate.category,
            used: gate.usageBefore,
            limit: gate.limit,
            balance: gate.balanceAfter,
            creditCost: 2,
            upgradeUrl: '/pricing'
        }, {
            status
        });
    }
    const jobId = (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .createJob */ ._S)();
    // Return jobId immediately
    const response = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        jobId,
        gated: {
            source: gate.source,
            creditsSpent: gate.creditsSpent ?? 0
        }
    });
    // Start background processing (fire-and-forget)
    processGenerationJob(jobId, body, req).catch(async (err)=>{
        (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
            status: 'failed',
            error: err instanceof Error ? err.message : String(err)
        });
        // Best-effort refund if we had debited credits.
        if (gate.source === 'credits' && gate.creditsSpent) {
            const { refundAICredits } = await __webpack_require__.e(/* import() */ 1597).then(__webpack_require__.bind(__webpack_require__, 701597));
            try {
                await refundAICredits(userId, gate, 'AI generation job failed');
            } catch  {}
        }
    });
    return response;
});
async function processGenerationJob(jobId, body, request) {
    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
        status: 'processing',
        progress: 'Connecting to AI...'
    });
    (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
    try {
        // Check database connection with timeout
        try {
            await Promise.race([
                _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.$connect(),
                new Promise((_, reject)=>setTimeout(()=>reject(new Error('DB connect timeout')), 5000))
            ]);
        } catch (dbError) {
            console.error('Database connection failed:', dbError);
            (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
                status: 'failed',
                error: 'Database connection failed. Please try again.'
            });
            (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
            return;
        }
        const { topic, types, difficulties } = body;
        const system = body.system || 'General';
        if (!topic) {
            (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
                status: 'failed',
                error: 'Topic is required'
            });
            (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
            return;
        }
        // Use the count from the request (up to 5 per batch)
        const effectiveCount = Math.min(Math.max(body.count || 1, 1), 100);
        let lastError = null;
        // Generate questions one at a time to avoid JSON truncation with rich HTML content.
        // Each question's AI response is ~7-8KB of HTML; batching multiple in one call
        // often causes truncation, losing questions. Individual calls are more reliable.
        const allSavedQuestions = [];
        for(let qIndex = 0; qIndex < effectiveCount; qIndex++){
            const questionNum = qIndex + 1;
            for(let attempt = 1; attempt <= MAX_RETRIES; attempt++){
                try {
                    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
                        status: 'processing',
                        progress: `Generating question ${questionNum}/${effectiveCount}${attempt > 1 ? ` (attempt ${attempt})` : ''}...`,
                        attempt
                    });
                    (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
                    const aiContent = await aiCallWithTimeout(request, SYSTEM_PROMPT, buildUserPrompt(topic, types || [
                        'mcq'
                    ], difficulties || [
                        'Medium'
                    ], system, 1), AI_TIMEOUT_MS);
                    console.log(`AI response length for Q${questionNum}:`, aiContent.length, 'attempt:', attempt);
                    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
                        progress: `Parsing question ${questionNum}...`
                    });
                    (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
                    let parsed;
                    try {
                        parsed = parseAIResponse(aiContent);
                    } catch (parseError) {
                        lastError = parseError instanceof Error ? parseError : new Error('Parse failed');
                        console.error(`Parse Q${questionNum} attempt ${attempt} failed:`, parseError instanceof Error ? parseError.message : 'Unknown');
                        if (attempt < MAX_RETRIES) {
                            await new Promise((resolve)=>setTimeout(resolve, 500 * attempt));
                            continue;
                        }
                        // If this question fails after all retries, skip it and continue to next
                        console.error(`Skipping question ${questionNum} after all retries failed`);
                        break;
                    }
                    const questionsData = parsed.questions ?? parsed;
                    if (!Array.isArray(questionsData) || questionsData.length === 0) {
                        lastError = new Error('AI returned no question');
                        if (attempt < MAX_RETRIES) {
                            await new Promise((resolve)=>setTimeout(resolve, 500 * attempt));
                            continue;
                        }
                        console.error(`Skipping question ${questionNum} — AI returned no data`);
                        break;
                    }
                    // Save the generated question
                    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
                        progress: `Saving question ${questionNum}/${effectiveCount}...`
                    });
                    (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
                    for (const q of questionsData){
                        try {
                            const saved = await saveQuestion(q, topic, system);
                            allSavedQuestions.push(saved);
                            // Stream this question to the client immediately via progress event
                            (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
                                progress: `Generated ${allSavedQuestions.length}/${effectiveCount} question${allSavedQuestions.length > 1 ? 's' : ''}`,
                                partialResult: saved
                            });
                            (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
                        } catch (saveErr) {
                            console.error('Failed to save question to DB (returning without persisting):', saveErr instanceof Error ? saveErr.message : 'Unknown');
                            const metadata = q.metadata || {};
                            const tags = Array.isArray(metadata.tags) ? metadata.tags : [
                                topic
                            ];
                            allSavedQuestions.push({
                                id: `gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                                type: q.type || 'mcq',
                                text: String(q.text || ''),
                                options: Array.isArray(q.options) ? q.options : [],
                                answer: String(q.answer || ''),
                                explanation: String(q.explanation || ''),
                                mnemonic: String(q.mnemonic || ''),
                                clinicalPearl: String(q.clinicalPearl || ''),
                                distractorAnalysis: String(q.distractorAnalysis || ''),
                                illustrationDescription: String(q.illustrationDescription || '') || undefined,
                                diagramSpec: q.diagramSpec || undefined,
                                molecularScenes: q.molecularScenes || undefined,
                                sources: Array.isArray(q.sources) ? q.sources : [],
                                difficulty: q.difficulty || 'Medium',
                                system: metadata.system || system,
                                topic,
                                tags,
                                isAIGenerated: true,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString()
                            });
                        }
                    }
                    break;
                } catch (attemptError) {
                    lastError = attemptError instanceof Error ? attemptError : new Error('Unknown error');
                    console.error(`Generate Q${questionNum} attempt ${attempt} error:`, attemptError instanceof Error ? attemptError.message : 'Unknown');
                    if (attempt < MAX_RETRIES) {
                        await new Promise((resolve)=>setTimeout(resolve, 1000 * attempt));
                    }
                }
            }
        }
        // Return whatever we saved successfully (partial success is OK)
        if (allSavedQuestions.length > 0) {
            (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
                status: 'completed',
                result: allSavedQuestions
            });
            (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
            return;
        }
        (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
            status: 'failed',
            error: lastError?.message || 'Failed to generate questions after retries'
        });
        (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
    } catch (error) {
        console.error('Generate error:', error);
        (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .updateJob */ .lh)(jobId, {
            status: 'failed',
            error: error instanceof Error ? error.message : 'Failed to generate questions'
        });
        (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_4__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_3__/* .getJob */ .ax)(jobId));
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,7774,1545,9567,859,2035,4007,7909,5566,8262,2901,736], () => (__webpack_exec__(334318)));
module.exports = __webpack_exports__;

})();