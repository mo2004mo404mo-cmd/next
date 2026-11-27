"use strict";
(() => {
var exports = {};
exports.id = 441;
exports.ids = [441];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 71553:
/***/ ((module) => {

module.exports = require("node:dns/promises");

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

/***/ 221722:
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
        page: "/api/questions/import/extract/route",
        pathname: "/api/questions/import/extract",
        filename: "route",
        bundlePath: "app/api/questions/import/extract/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/questions/import/extract/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(684279),
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
    let srcPage = "/api/questions/import/extract/route";
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

/***/ 328354:
/***/ ((module) => {

module.exports = require("util");

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

/***/ 378608:
/***/ ((module) => {

module.exports = require("exceljs");

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 399253:
/***/ ((module) => {

module.exports = import("@huggingface/transformers");;

/***/ }),

/***/ 414649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PE: () => (/* binding */ extractFromFileServer),
/* harmony export */   g_: () => (/* binding */ extractAudioPassthrough),
/* harmony export */   gc: () => (/* binding */ isAudioExtension)
/* harmony export */ });
/* unused harmony export AUDIO_EXTENSIONS */
/**
 * server-file-extract.ts — Server-side file extraction (text + images).
 *
 * THE single source of truth for parsing uploads (Stage 1 convergence):
 * the client module src/lib/file-extract.ts is a thin wrapper that POSTs
 * the raw file to /api/extract, which calls into here. One parser, zero
 * pdfjs-worker drift, zero browser OOM.
 *
 * Supported: PDF, DOCX, PPTX, TXT, MD, CSV, TSV, JSON + standalone images
 * (PNG/JPEG/GIF/WebP via magic-byte sniffing) + audio passthrough (bytes
 * wrapped as a data-URL attachment for the transcribe_audio tool).
 */ const MAX_IMAGES = 24;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // skip images larger than 2 MB (VLM rejects)
/** Audio extensions passed through as attachments (chat-ASR parity). */ const AUDIO_EXTENSIONS = new Set([
    'mp3',
    'wav',
    'm4a',
    'aac',
    'ogg',
    'oga',
    'webm',
    'flac',
    'opus',
    'wma',
    'aiff',
    'amr',
    '3gp'
]);
/** True when a file name looks like audio the ASR tool can handle. */ function isAudioExtension(fileName) {
    const ext = (fileName.split('.').pop() ?? '').toLowerCase();
    return AUDIO_EXTENSIONS.has(ext);
}
function bufToDataUrl(buf, mime) {
    return `data:${mime};base64,${buf.toString('base64')}`;
}
function sniffImageMime(buf) {
    if (buf.length < 4) return null;
    // PNG: 89 50 4E 47
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
    // JPEG: FF D8 FF
    if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
    // GIF: 47 49 46 38
    if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return 'image/gif';
    // WebP: 52 49 46 46 ... 57 45 42 50
    if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf.length > 11 && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp';
    return null;
}
/** Attach the flat imageUrls alias every server-parsed payload carries. */ function withImageUrlAlias(content) {
    content.imageUrls = (content.images ?? []).map((img)=>img.dataUrl);
    return content;
}
// ── PPTX ───────────────────────────────────────────────────────────────────
function pptxSlideText(xml) {
    // Extract <a:t> text runs (same logic as the retired client parser)
    const parts = [];
    for (const m of xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)){
        if (m[1]) parts.push(m[1]);
    }
    return parts.join(' ').replace(/\s+/g, ' ').trim();
}
async function extractPptx(buffer) {
    const JSZip = (await Promise.all(/* import() */[__webpack_require__.e(6364), __webpack_require__.e(4191)]).then(__webpack_require__.t.bind(__webpack_require__, 76364, 23))).default;
    const zip = await JSZip.loadAsync(buffer);
    // Collect slide numbers
    const slideNums = [];
    zip.forEach((relPath)=>{
        const m = relPath.match(/^ppt\/slides\/slide(\d+)\.xml$/);
        if (m) slideNums.push(Number(m[1]));
    });
    slideNums.sort((a, b)=>a - b);
    if (slideNums.length === 0) throw new Error('PPTX contains no slides.');
    const parts = [];
    const images = [];
    for (const n of slideNums.slice(0, 200)){
        const slideXml = await zip.file(`ppt/slides/slide${n}.xml`)?.async('string') || '';
        const slideText = pptxSlideText(slideXml);
        const notesXml = await zip.file(`ppt/notesSlides/notesSlide${n}.xml`)?.async('string') || '';
        const notes = pptxSlideText(notesXml).replace(/\n+/g, ' ').trim();
        // Embedded images for this slide via _rels
        const relsXml = await zip.file(`ppt/slides/_rels/slide${n}.xml.rels`)?.async('string') || '';
        let perSlide = 0;
        for (const tag of relsXml.matchAll(/<Relationship\b[^>]*>/g)){
            const tagStr = tag[0];
            if (!/\/image"/.test(tagStr)) continue;
            const target = tagStr.match(/Target="([^"]+)"/)?.[1];
            if (!target) continue;
            const mediaPath = target.startsWith('/') ? target.slice(1) : target.replace(/^\.\.\//, 'ppt/');
            if (perSlide >= 2 || images.length >= MAX_IMAGES) break;
            const img = await zip.file(mediaPath)?.async('nodebuffer');
            if (!img || img.length < 4000 || img.length > MAX_IMAGE_BYTES) continue;
            const mimeType = sniffImageMime(img);
            if (!mimeType) continue;
            images.push({
                dataUrl: bufToDataUrl(img, mimeType),
                caption: `Slide ${n}`
            });
            perSlide++;
        }
        const block = [];
        if (slideText) block.push(slideText);
        if (notes) block.push(`Speaker notes: ${notes}`);
        parts.push(`── Slide ${n} ──\n${block.join('\n')}`);
    }
    const text = parts.join('\n\n');
    if (!text.trim() && images.length === 0) {
        throw new Error('PPTX contains no extractable slide text, notes, or images.');
    }
    return {
        text,
        fileName: '',
        fileType: 'pptx',
        fileSize: buffer.length,
        images
    };
}
// ── DOCX ──────────────────────────────────────────────────────────────────
async function extractDocx(buffer) {
    const mammoth = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 517393, 23));
    const result = await mammoth.extractRawText({
        buffer
    });
    const text = result.value || '';
    // Walk word/media/* for embedded images
    const JSZip = (await Promise.all(/* import() */[__webpack_require__.e(6364), __webpack_require__.e(4191)]).then(__webpack_require__.t.bind(__webpack_require__, 76364, 23))).default;
    const zip = await JSZip.loadAsync(buffer);
    const images = [];
    let imgIdx = 0;
    const mediaFiles = Object.keys(zip.files).filter((p)=>/^word\/media\//.test(p));
    for (const mediaPath of mediaFiles){
        if (images.length >= MAX_IMAGES) break;
        const img = await zip.file(mediaPath)?.async('nodebuffer');
        if (!img || img.length < 4000 || img.length > MAX_IMAGE_BYTES) continue;
        const mimeType = sniffImageMime(img);
        if (!mimeType) continue;
        imgIdx++;
        images.push({
            dataUrl: bufToDataUrl(img, mimeType),
            caption: `Image ${imgIdx} in DOCX`
        });
    }
    if (!text.trim() && images.length === 0) {
        throw new Error('DOCX contains no extractable text or images.');
    }
    return {
        text,
        fileName: '',
        fileType: 'docx',
        fileSize: buffer.length,
        images
    };
}
// ── PDF ───────────────────────────────────────────────────────────────────
async function extractPdf(buffer) {
    // Use unpdf for text (same as the knowledge pipeline — server-proven)
    const { getDocumentProxy, extractText } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 633925));
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, {
        mergePages: true
    });
    // PDF page images: carve embedded JPEGs from the PDF stream (server-side,
    // no canvas needed). Reuses the knowledge pipeline's carvePdfJpegs.
    let images = [];
    try {
        const { carvePdfJpegs } = await Promise.all(/* import() */[__webpack_require__.e(9985), __webpack_require__.e(6899), __webpack_require__.e(3009)]).then(__webpack_require__.bind(__webpack_require__, 256899));
        const jpegs = carvePdfJpegs(buffer, MAX_IMAGES);
        images = jpegs.map((buf, i)=>({
                dataUrl: bufToDataUrl(buf, 'image/jpeg'),
                caption: `Page ${i + 1}`
            }));
    } catch  {
    // carvePdfJpegs may fail on some PDFs — text-only extraction is fine
    }
    if (!text.trim() && images.length === 0) {
        throw new Error('PDF contains no extractable text or images.');
    }
    return {
        text: text || '',
        fileName: '',
        fileType: 'pdf',
        fileSize: buffer.length,
        pageCount: pdf.numPages,
        images
    };
}
// ── Standalone image ───────────────────────────────────────────────────────
async function extractImageFile(buffer, fileName) {
    const mimeType = sniffImageMime(buffer);
    if (!mimeType) throw new Error('Unrecognized image format (expected PNG, JPEG, GIF, or WebP).');
    return {
        text: `[Standalone image upload: ${fileName}. The AI will analyze this image directly.]`,
        fileName: '',
        fileType: mimeType.split('/')[1],
        fileSize: buffer.length,
        images: [
            {
                dataUrl: bufToDataUrl(buffer, mimeType),
                caption: fileName
            }
        ]
    };
}
// ── Audio passthrough (chat-attachment parity) ─────────────────────────────
/**
 * Wrap audio bytes as a single data-URL attachment. The real ASR happens
 * later (transcribe_audio tool / knowledge pipeline) — this keeps the
 * chat-attachment contract identical to the retired client-side path.
 */ function extractAudioPassthrough(buffer, fileName) {
    const ext = (fileName.split('.').pop() ?? '').toLowerCase() || 'mp3';
    // Canonical audio MIME per extension (matches what browsers report for
    // File.type — the attachment machinery only needs a valid audio/* prefix).
    const AUDIO_MIME = {
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        webm: 'audio/webm',
        m4a: 'audio/mp4',
        aac: 'audio/aac',
        flac: 'audio/flac',
        ogg: 'audio/ogg',
        oga: 'audio/ogg',
        opus: 'audio/ogg'
    };
    const mime = AUDIO_MIME[ext] ?? 'audio/mpeg';
    return {
        // Audio rides along as a single "image"-style attachment so the existing
        // server-side attachment machinery resolves it into an attachment:// URL.
        text: `[Audio file: ${fileName}. This recording will be transcribed by AI speech recognition.]`,
        fileName,
        fileType: ext,
        fileSize: buffer.length,
        images: [
            {
                dataUrl: bufToDataUrl(buffer, mime),
                caption: `Audio: ${fileName}`
            }
        ]
    };
}
// ── Master entry ───────────────────────────────────────────────────────────
async function extractFromFileServer(buffer, fileName) {
    const ext = (fileName.split('.').pop() ?? '').toLowerCase();
    let content;
    if (ext === 'pdf') {
        content = await extractPdf(buffer);
    } else if (ext === 'docx' || ext === 'doc') {
        content = await extractDocx(buffer);
    } else if (ext === 'pptx') {
        content = await extractPptx(buffer);
    } else if (ext === 'txt' || ext === 'md' || ext === 'markdown' || ext === 'csv' || ext === 'tsv' || ext === 'json') {
        const text = buffer.toString('utf8');
        content = {
            text,
            fileName: '',
            fileType: ext,
            fileSize: buffer.length
        };
    } else if ([
        'png',
        'jpg',
        'jpeg',
        'gif',
        'webp'
    ].includes(ext)) {
        content = await extractImageFile(buffer, fileName);
    } else if (ext === 'ppt') {
        throw new Error('Legacy .ppt files are not supported. Open the file in PowerPoint and save it as .pptx, then upload again.');
    } else {
        throw new Error(`Unsupported file type ".${ext}". Supported: PDF, DOCX, PPTX, TXT, MD, CSV, TSV, JSON, PNG, JPG, GIF, WEBP.`);
    }
    content.fileName = fileName;
    return withImageUrlAlias(content);
}


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

/***/ 517393:
/***/ ((module) => {

module.exports = require("mammoth");

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

/***/ 579646:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 594735:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 633925:
/***/ ((module) => {

module.exports = import("unpdf");;

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

/***/ 684279:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DELETE: () => (/* binding */ DELETE),
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(455511);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(520903);
/* harmony import */ var _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(960736);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(122035);
/* harmony import */ var _lib_api_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(362768);
/* harmony import */ var _lib_server_file_extract__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(414649);
/* harmony import */ var _lib_subscription_visitor_strategy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(822567);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_4__, _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_5__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_6__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_7__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_4__, _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_5__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_6__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










/** Hard ceiling on input size. Exceeding it REJECTS with a clear message —
 *  never a silent slice: a silent 120k cap once ate ~500 of a user's 700
 *  questions before extraction even started. 1.5M chars ≈ a 3,000+ question
 *  bank, beyond any realistic single import. */ const MAX_INPUT_CHARS = 1500000;
/** Default / ceiling for the extraction result when the client doesn't ask
 *  for a specific limit. (Was 200 — the final merge slice silently matched a
 *  user's "provided ~700, extracted exactly 200" report.) */ const DEFAULT_MAX_QUESTIONS = 2000;
const MAX_MAX_QUESTIONS = 5000;
/** Target size of each extraction chunk (smaller = better per-chunk recall —
 *  big single passes silently drop questions). DENSE/terse banks (short
 *  one-liner questions) get smaller chunks via chunkText(): a full-size chunk
 *  of terse questions can hold 50+ questions, and the JSON output for that is
 *  big enough to hit provider output-token limits — the JSON gets cut and
 *  the chunk yields ~nothing. */ const CHUNK_TARGET_CHARS = 6500;
/** Hard cap on ESTIMATED questions per chunk. A chunk asking the model to
 *  emit more than ~20 questions of JSON risks hitting provider output-token
 *  limits or simply degrading — the JSON gets cut and the chunk silently
 *  yields only part of its questions (observed: "provided ~700, extracted
 *  288" — 6.5k-char chunks held ~39 terse questions each, model returned
 *  ~16 per chunk). */ const MAX_QUESTIONS_PER_CHUNK = 20;
/** Per-chunk budgets. Race-based — the Ollama adapter ignores AbortSignal. */ const PRIMARY_TIMEOUT_MS = 70000;
/** Per ZAI ATTEMPT (not per logical call) so backoff waits never eat the
 *  per-chunk budget. */ const FALLBACK_TIMEOUT_MS = 180000;
/** Chunks are extracted in parallel — big files (10+ chunks) would otherwise
 *  take 2+ minutes per chunk SEQUENTIALLY (observed: 14 chunks ≈ 25 min and
 *  the client gives up). 3 balances wall time against ZAI rate limits. */ const CHUNK_CONCURRENCY = 3;
/** Circuit breaker: after this many CONSECUTIVE primary-LLM failures, the
 *  rest of the job goes straight to the ZAI fallback. Without it, a dead
 *  provider (502/hang) burns the full 70 s primary budget on EVERY chunk. */ const PRIMARY_BREAKER_THRESHOLD = 2;
/** ZAI rate-limit handling: burst traffic gets 429s ("Too many requests" —
 *  observed silently wiping out half of a 14-chunk file, and later killing
 *  chunks even through three retry passes when two jobs ran concurrently).
 *  Every ZAI call goes through the GLOBAL adaptive gate (semaphore + spacing
 *  that backs off on 429s) and retries with exponential backoff + jitter. */ const ZAI_MAX_ATTEMPTS = 5;
const ZAI_RETRY_BASE_MS = 6000;
/** A "processing" row whose updatedAt is older than this (no heartbeat) is
 *  considered orphaned — the next poll re-kicks it. Generous: one slow chunk
 *  (primary timeout + retries + fallback) can legitimately take ~5 min.
 *  (Superseded for RESUME by FAST_RESUME_MS — kept for documentation.) */ const RESUME_AFTER_MS = (/* unused pure expression or super */ null && (10 * 60000));
/** FAST resume: a PAUSED job (rate-limited / deadline / restart — runner
 *  returned without settling) is re-kicked by the next poll after only this
 *  long. The heartbeat (30 s) keeps LIVE jobs looking fresh, so this never
 *  double-kicks an active runner — it only rescues paused/dead ones. */ const FAST_RESUME_MS = 90000;
/** Heartbeat: bump updatedAt while a job runs even if no chunk completes. */ const HEARTBEAT_MS = 30000;
/** Finished/failed rows stay retrievable for this long; then POST-side cleanup
 *  removes them (and the client discards its localStorage pointer). */ const JOB_TTL_MS = 24 * 60 * 60000;
/** Only ONE extraction may run on the WHOLE SERVER at a time. The ZAI budget
 *  is shared account-wide, and a per-user cap proved insufficient: every new
 *  browser session gets a fresh guest userId, so three jobs from two guest ids
 *  ran concurrently (observed 2026-10-04 05:26 / 07:32 / 07:34) and hammered
 *  the rate-limited gateway into a 429 storm in which every job stalled
 *  forever ("it stop after time no one done"). One job = one polite queue. */ const MAX_RUNNING_GLOBAL = 1;
/** Hard wall-clock budget for ONE PASS. When it's reached the job PAUSES
 *  (already-extracted chunks are persisted; the next poll resumes into a
 *  fresh pass with a fresh budget) — never drops, never grinds forever.
 *  After MAX_PASSES the job settles honestly with a droppedChunks count. */ const JOB_DEADLINE_MS = 20 * 60000;
/** Hard time budget for the VLM image pass on pass 1. VLM calls are
 *  sequential and share the Z.AI gateway rate-limit budget with text
 *  extraction -- a deck with 20+ images can otherwise eat the whole
 *  20-min pass on VLM alone, leaving no time to actually pull the
 *  questions out of the OCR'd slide text. When this budget is hit we
 *  STOP starting new VLM calls but CONTINUE the job: text extraction
 *  proceeds on whatever image OCR was already collected, and skipped
 *  images are simply not analyzed (worst case: question stem without
 *  the figure's text context -- far better than failing the whole job). */ const VLM_TIME_BUDGET_MS = Number(process.env.EXTRACT_VLM_BUDGET_MS || 4 * 60000);
/** Max extraction passes (each = worker sweep + sequential retry round)
 *  before honest settlement. */ const MAX_PASSES = 6;
/** If a job has been rate-limited on this many CONSECUTIVE passes, settle
 *  as error instead of resume-looping forever. The ZAI gateway rate limit
 *  is account-wide — once we've burned through MAX_PASSES retries it's
 *  unlikely to recover in the user's session window, and the resume-loop
 *  blocks the global single-job slot (every retry bumps `updatedAt`,
 *  defeating the zombie sweep). Settle honestly so the user can retry. */ const MAX_RATE_LIMITED_PASSES = 3;
/** A pending/processing row whose startedAt is older than this is a ZOMBIE:
 *  its runner died without settling and (repeated) resumes haven't saved it.
 *  Fail it honestly instead of resume-looping forever. runJob RESETS startedAt
 *  on each resume, so this clock measures time since the last resume began. */ const ZOMBIE_FAIL_MS = 45 * 60000;
/** Global cap (memory guard on the 4 GB host). */ const MAX_TOTAL_JOBS = 20;
/** Live runners in THIS process — prevents double-kicking a job that is
 *  already running here (kept in globalThis so dev HMR reloads don't lose it). */ const LIVE = globalThis.__qExtractLive ?? (globalThis.__qExtractLive = new Set());
/** Per-job cancellation flags — set by the DELETE handler when the user
 *  clicks "Stop extraction". The runner checks this between every chunk
 *  (and between every VLM image) and exits cleanly when set. We don't try
 *  to abort in-flight LLM calls (ZAI ignores AbortSignal), but we DO stop
 *  starting new ones, so a 5-image VLM pass cancels after the current
 *  image finishes (~5–10 s) instead of running all the way through. */ const CANCELLED = globalThis.__qExtractCancelled ?? (globalThis.__qExtractCancelled = new Set());
/** VLM-extracted questions per job — populated by the VLM pass and merged
 *  into the final settlement alongside the text-extraction chunks' results.
 *  These are questions the VLM EXPLICITLY pulled out of an image (the
 *  QUESTIONS_JSON block in its response). The text-extraction LLM ALSO
 *  extracts questions from the OCR'd text + slide text; the final merge
 *  dedupes by question text, so questions appearing in both streams don't
 *  double. Memory-only — a server restart loses this, but the VLM pass is
 *  pass-1 only and the text-extraction LLM is the more reliable extractor
 *  for slide-text questions, so losing the VLM-only questions on restart
 *  is acceptable (and re-running extraction re-populates it). */ const VLM_QUESTIONS = globalThis.__qExtractVlmQs ?? (globalThis.__qExtractVlmQs = new Map());
function sleep(ms) {
    return new Promise((r)=>setTimeout(r, ms));
}
function isRateLimitError(err) {
    const msg = err instanceof Error ? err.message : String(err);
    return /\b429\b|too many requests|rate.?limit/i.test(msg);
}
async function getZaiClient() {
    const g = globalThis;
    return g.__qExtractZai ??= (async ()=>{
        const ZAI = (await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 902381))).default;
        return ZAI.create();
    })();
}
/** Global ZAI admission gate: a process-wide in-flight semaphore PLUS a
 *  start-spacing delay that ADAPTS to rate-limit responses. A pure start-space
 *  (the old gate) still let 3 workers × 2 concurrent jobs hold ~6 requests in
 *  flight — observed melting the gateway into a 429 storm where chunks died
 *  even through THREE retry passes. Now: at most ZAI_MAX_IN_FLIGHT requests
 *  are in flight at any instant, and every 429 doubles the spacing between
 *  starts (up to 30 s; successes decay it back toward the floor), turning a
 *  storm into a drip the gateway tolerates. Kept in globalThis so dev-mode
 *  HMR reloads don't reset it — and so concurrent JOBS share one budget. */ const ZAI_MAX_IN_FLIGHT = 2;
const ZAI_SPACING_FLOOR_MS = 1200;
const ZAI_SPACING_CEIL_MS = 30000;
const zaiGate = globalThis.__qExtractZaiGate2 ?? (globalThis.__qExtractZaiGate2 = {
    active: 0,
    spacingMs: ZAI_SPACING_FLOOR_MS,
    lastStart: 0,
    waiters: []
});
/** Acquire a slot + respect the adaptive spacing; resolves when the request
 *  may start. Caller MUST call release(success) when the attempt settles. */ function zaiAcquire() {
    return new Promise((resolveReady)=>{
        const start = ()=>{
            zaiGate.active++;
            const wait = zaiGate.lastStart + zaiGate.spacingMs - Date.now();
            const go = ()=>{
                zaiGate.lastStart = Date.now();
                resolveReady((success)=>{
                    zaiGate.active--;
                    // Adaptive pacing: 429 → back off hard; success → ease toward floor.
                    zaiGate.spacingMs = success ? Math.max(zaiGate.spacingMs * 0.7, ZAI_SPACING_FLOOR_MS) : Math.min(zaiGate.spacingMs * 2, ZAI_SPACING_CEIL_MS);
                    const next = zaiGate.waiters.shift();
                    if (next) next();
                });
            };
            if (wait > 0) sleep(wait).then(go);
            else go();
        };
        if (zaiGate.active < ZAI_MAX_IN_FLIGHT) start();
        else zaiGate.waiters.push(start);
    });
}
async function zaiExtractOnce(system, prompt) {
    const release = await zaiAcquire();
    try {
        const zai = await getZaiClient();
        const completion = await zai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: system
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            // JSON extraction doesn't benefit from reasoning; disabling it keeps the
            // model's output budget for actual content (a thinking model can burn
            // half its tokens on hidden CoT before the JSON even starts, truncating
            // the array). max_tokens 8k comfortably covers ~25 terse questions of JSON.
            thinking: {
                type: 'disabled'
            },
            temperature: 0.1,
            max_tokens: 8000
        });
        release(true);
        return completion.choices[0]?.message?.content || '';
    } catch (err) {
        release(!isRateLimitError(err));
        throw err;
    }
}
/** Reject if `p` doesn't settle within `ms`. The losing promise keeps running
 *  in the background (its eventual rejection is swallowed by the race's already
 *  attached handlers — no unhandled-rejection warnings). */ function withTimeout(p, ms, label) {
    let timer;
    const timeoutP = new Promise((_, reject)=>{
        timer = setTimeout(()=>reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    });
    return Promise.race([
        p,
        timeoutP
    ]).finally(()=>{
        if (timer) clearTimeout(timer);
    });
}
/** One logical ZAI extraction: up to ZAI_MAX_ATTEMPTS attempts. A 429 waits
 *  (exponential backoff + jitter — ON TOP of the adaptive gate, which has
 *  already slowed global pacing) and retries instead of dropping the chunk's
 *  questions; any other failure throws immediately. Each attempt has its OWN
 *  timeout so backoff waits never eat into the per-chunk budget. */ async function zaiExtract(system, prompt) {
    for(let attempt = 1;; attempt++){
        try {
            return await withTimeout(zaiExtractOnce(system, prompt), FALLBACK_TIMEOUT_MS, `ZAI fallback (attempt ${attempt})`);
        } catch (err) {
            if (attempt >= ZAI_MAX_ATTEMPTS || !isRateLimitError(err)) throw err;
            const backoff = ZAI_RETRY_BASE_MS * 2 ** (attempt - 1) + Math.floor(Math.random() * 2000);
            console.warn(`[Question Extract] ZAI rate-limited (attempt ${attempt}/${ZAI_MAX_ATTEMPTS}, gate spacing ${Math.round(zaiGate.spacingMs / 1000)}s) — retrying in ${Math.round(backoff / 1000)}s`);
            await sleep(backoff);
        }
    }
}
/* ═══════════════════════════════════════════════════════════════
   VLM image extraction — OCR + describe + extract image-based questions
   ═══════════════════════════════════════════════════════════════ */ /** Directory under public/ where extracted images are persisted so the
 *  QuestionCard can render them. Matches the agent-image convention
 *  (`public/generated/agent/<sub>/<id>.<ext>` → `/generated/agent/<sub>/<id>.<ext>`). */ const IMPORTED_IMAGE_DIR = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'public', 'generated', 'agent', 'imported');
const IMPORTED_IMAGE_URL_PREFIX = '/generated/agent/imported';
/** Parse a `data:image/png;base64,XXXX` URL into { mime, ext, buffer }.
 *  Returns null for non-data URLs. */ function parseDataUrl(dataUrl) {
    const m = dataUrl.match(/^data:([^;,]+)(?:;([^,]+))?,(.+)$/i);
    if (!m) return null;
    const mime = m[1].toLowerCase();
    const isBase64 = (m[2] || '').toLowerCase() === 'base64';
    const data = m[3];
    let buf;
    try {
        buf = isBase64 ? Buffer.from(data, 'base64') : Buffer.from(decodeURIComponent(data), 'utf-8');
    } catch  {
        return null;
    }
    const ext = mime === 'image/png' ? 'png' : mime === 'image/jpeg' || mime === 'image/jpg' ? 'jpg' : mime === 'image/webp' ? 'webp' : mime === 'image/gif' ? 'gif' : mime === 'image/bmp' ? 'bmp' : 'png'; // unknown — assume png
    return {
        mime,
        ext,
        buffer: buf
    };
}
/** Persist an image data URL to public/generated/agent/imported/<id>.<ext>
 *  and return the public path that QuestionCard can load via <img src=…>.
 *  Idempotent: the same data URL always maps to the same file name (sha256
 *  of the bytes), so re-running the VLM pass on a resumed job does NOT
 *  duplicate files. Returns null when the data URL is malformed. */ function saveImportedImage(dataUrl) {
    const parsed = parseDataUrl(dataUrl);
    if (!parsed) return null;
    const hash = crypto__WEBPACK_IMPORTED_MODULE_3___default().createHash('sha256').update(parsed.buffer).digest('hex').slice(0, 24);
    const fileName = `${hash}.${parsed.ext}`;
    try {
        fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(IMPORTED_IMAGE_DIR, {
            recursive: true
        });
        const fullPath = path__WEBPACK_IMPORTED_MODULE_2___default().join(IMPORTED_IMAGE_DIR, fileName);
        if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(fullPath)) {
            fs__WEBPACK_IMPORTED_MODULE_1___default().writeFileSync(fullPath, parsed.buffer);
        }
        return `${IMPORTED_IMAGE_URL_PREFIX}/${fileName}`;
    } catch (err) {
        console.warn(`[Question Extract] could not persist extracted image:`, err instanceof Error ? err.message : err);
        return null;
    }
}
/** Vision model candidates tried in order; the first that answers is cached
 *  for the rest of the worker (matches the proven pattern in
 *  src/lib/agent/knowledge/ingest-media.ts → describeImage). */ const VISION_MODELS = [
    'glm-4.5v',
    'glm-4.6v',
    'glm-4v'
];
const visionGlobal = globalThis;
/** The instruction we send the VLM for every embedded image. Asks for:
 *  (1) a verbatim OCR of all visible text (so labels, axis values, captions
 *      survive into the text-extraction chunk plan),
 *  (2) a precise visual description (so a question stem that references
 *      "the figure below" has the figure's content as context),
 *  (3) any MCQ/TF/short-answer questions present in the image itself,
 *      returned as JSON so they merge straight into the parsed-questions
 *      stream without a second LLM pass. Each extracted question MUST carry
 *      the image's source URL so the question card can render the image.
 *
 *  The {imageUrl} placeholder is replaced per-image with the public URL the
 *  image was saved to (see saveImportedImage). The model is told this URL
 *  must appear verbatim on each extracted question — and the
 *  normalizeQuestion() downstream only accepts URLs that begin with the
 *  imported-image prefix, so a hallucinated path would be rejected. */ const VISION_INSTRUCTION_TEMPLATE = `You are OCR-ing and analyzing an image embedded in a medical-education document. The image has already been saved at this public URL: {imageUrl}

Do ALL of the following, in order, in a single response:

1) Transcribe ALL visible text verbatim — headings, labels, axis values, captions, table cells, multi-choice options. Preserve original line breaks. If the image has multiple panels or sub-figures, transcribe each panel's text separately under sub-headers "Panel A:", "Panel B:", etc.

2) Describe the visual content precisely (1-3 sentences): what kind of figure (anatomical illustration, X-ray, histology slide, chart, diagram, table, scan-text question, clinical photograph, …), what it shows, key labeled structures or data trends.

3) If the image itself contains one or more complete exam questions (a stem + options + an answer key, or a true/false statement, or a short-answer prompt), output them as a STRICT JSON array under a final line that begins with "QUESTIONS_JSON:". Use the same shape as the question-extraction endpoint: each item is an object with keys text, type ("mcq"|"tf"|"short"), options (array of strings), answer, explanation, difficulty (Easy/Basic/Moderate/Hard/Expert), system, topic, tags, AND imageUrl (the URL above — verbatim, so the question card can render the source image). IMPORTANT: extract EVERY complete question present in the image — if the image shows 4 questions, output all 4, not just the first. If the image contains no complete question, output "QUESTIONS_JSON: []".

Output format (use exactly these section headers on their own lines):
TEXT:
<verbatim transcription>

VISUAL:
<1-3 sentence description>

QUESTIONS_JSON:
<JSON array>`;
const visionGlobal2 = globalThis;
/** Try the FreeLLM Router's vision capability. Returns the raw text response
 *  or '' if the Router has no vision-capable key configured (so the caller
 *  falls through to the Z.AI SDK). Throws on transient errors so the caller
 *  can decide whether to retry. */ async function freellmVisionExtract(dataUrl, instruction) {
    const baseUrl = process.env.MEDQ_AGENT_BASE_URL || 'http://127.0.0.1:3000/v1';
    const apiKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '';
    if (!apiKey) return ''; // Router not configured — fall through to ZAI
    const models = [
        'gemini-2.5-flash',
        'glm-4.5v',
        'claude-haiku-4.5',
        'aya-vision-32b'
    ];
    let lastErr = '';
    for (const model of models){
        try {
            const ctrl = new AbortController();
            const timer = setTimeout(()=>ctrl.abort(), FALLBACK_TIMEOUT_MS);
            const res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model,
                    max_tokens: 1800,
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: instruction
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: dataUrl
                                    }
                                }
                            ]
                        }
                    ]
                }),
                signal: ctrl.signal
            });
            clearTimeout(timer);
            if (!res.ok) {
                // 4xx with "no candidate model" => Router has no vision key for this
                // model; try the next one. Don't abort the whole pass on a 4xx — the
                // next model in the list might be configured.
                const body1 = await res.text().catch(()=>'');
                if (/no candidate model|not configured|no .* key/i.test(body1)) {
                    lastErr = `model ${model}: no key`;
                    continue;
                }
                lastErr = `model ${model}: HTTP ${res.status}`;
                continue;
            }
            const json = await res.json();
            const text = json?.choices?.[0]?.message?.content || '';
            if (text.trim()) return text.trim();
            lastErr = `model ${model}: empty`;
        } catch (err) {
            lastErr = `model ${model}: ${(err instanceof Error ? err.message : String(err)).slice(0, 80)}`;
        }
    }
    // No model worked — return empty so the caller falls through to ZAI.
    if (lastErr) console.warn(`[Question Extract] FreeLLM vision: ${lastErr}`);
    return '';
}
/** Run the VLM on ONE image's data URL; returns the raw text response or ''
 *  on failure. Tries the FreeLLM Router first (30+ vision models with
  *  per-key health checking + failover) so a configured paid vision
 *  provider supersedes the bare Z.AI gateway. Falls back to the Z.AI SDK
 *  when the Router has no vision key configured (fresh install) so
 *  extraction still works out-of-the-box. */ async function visionExtractImage(dataUrl, imageUrl) {
    const instruction = VISION_INSTRUCTION_TEMPLATE.replace('{imageUrl}', imageUrl);
    // ── FreeLLM Router first (preferred) ──
    // The Router pools 30+ vision models with health checking + failover.
    // Cache the working backend so successful calls don't re-probe the
    // dead one on every image.
    if (visionGlobal2.__qExtractVisionBackend !== 'zai') {
        try {
            const text = await freellmVisionExtract(dataUrl, instruction);
            if (text.trim()) {
                visionGlobal2.__qExtractVisionBackend = 'freellm';
                return text;
            }
            // Empty => Router has no vision key configured (or all vision keys
            // rate-limited). Fall through to Z.AI SDK below.
            visionGlobal2.__qExtractVisionBackend = 'zai';
        } catch (err) {
            console.warn(`[Question Extract] FreeLLM vision threw (falling back to ZAI): ${(err instanceof Error ? err.message : String(err)).slice(0, 120)}`);
            visionGlobal2.__qExtractVisionBackend = 'zai';
        }
    }
    // ── Z.AI SDK fallback (always available in the sandbox) ──
    const release = await zaiAcquire();
    try {
        const zai = await getZaiClient();
        const cached = visionGlobal.__qExtractVisionModel;
        const candidates = cached ? [
            cached,
            ...VISION_MODELS.filter((m)=>m !== cached)
        ] : VISION_MODELS;
        for (const model of candidates){
            try {
                const completion = await withTimeout((async ()=>{
                    return zai.chat.completions.createVision({
                        model,
                        messages: [
                            {
                                role: 'user',
                                content: [
                                    {
                                        type: 'text',
                                        text: instruction
                                    },
                                    {
                                        type: 'image_url',
                                        image_url: {
                                            url: dataUrl
                                        }
                                    }
                                ]
                            }
                        ],
                        thinking: {
                            type: 'disabled'
                        }
                    });
                })(), FALLBACK_TIMEOUT_MS, `VLM ${model}`);
                const text = completion?.choices?.[0]?.message?.content || '';
                if (text.trim()) {
                    visionGlobal.__qExtractVisionModel = model;
                    return text.trim();
                }
            // empty answer — try next model
            } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                // 400 "image parse" / 1210 image format → image is unusable, don't retry
                if (msg.includes('1210') || msg.includes('图片输入格式') || msg.includes('image format')) {
                    console.warn('[Question Extract] VLM rejected image as unparseable');
                    return '';
                }
                console.warn(`[Question Extract] VLM ${model} failed: ${msg.slice(0, 140)}`);
            // try next model
            }
        }
        return '';
    } finally{
        release(true);
    }
}
/** Parse the trailing "QUESTIONS_JSON:\n[...]" block out of a VLM response
 *  into ParsedImportQuestion[] (re-uses normalizeQuestion so the same
 *  normalization rules apply: letter→option-text, True/False, etc.).
 *  Returns questions the VLM EXPLICITLY extracted from the image — these
 *  merge into the final results alongside the questions the text-extraction
 *  LLM pulls from the slide text + OCR'd transcription. The merge dedupes
 *  by question text, so questions appearing in BOTH streams don't double. */ async function parseVisionQuestions(vlmText) {
    const m = vlmText.match(/QUESTIONS_JSON:\s*([\s\S]+?)$/i);
    if (!m) return [];
    let raw = m[1].trim();
    // Strip a trailing markdown fence if the model wrapped the JSON.
    const fence = raw.match(/```(?:json|JSON)?\s*([\s\S]*?)```/);
    if (fence) raw = fence[1].trim();
    const firstBracket = raw.indexOf('[');
    const lastBracket = raw.lastIndexOf(']');
    if (firstBracket === -1 || lastBracket <= firstBracket) return [];
    raw = raw.slice(firstBracket, lastBracket + 1);
    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch  {
        try {
            const { jsonrepair } = await Promise.all(/* import() */[__webpack_require__.e(3381), __webpack_require__.e(8899)]).then(__webpack_require__.bind(__webpack_require__, 298899));
            parsed = JSON.parse(await jsonrepair(raw));
        } catch  {
            return [];
        }
    }
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item)=>item && typeof item === 'object' ? normalizeQuestion(item) : null).filter((q)=>q !== null);
}
function stripFences(raw) {
    let s = raw.trim();
    // ```json ... ``` fences
    const fence = s.match(/```(?:json|JSON)?\s*([\s\S]*?)```/);
    if (fence) s = fence[1].trim();
    // Trailing prose before/after the array
    const firstBracket = s.indexOf('[');
    const lastBracket = s.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket > firstBracket) {
        s = s.slice(firstBracket, lastBracket + 1);
    }
    return s;
}
async function parseQuestionsJson(raw) {
    const cleaned = stripFences(raw);
    try {
        const parsed = JSON.parse(cleaned);
        return {
            items: Array.isArray(parsed) ? parsed : [],
            strict: true,
            truncated: false
        };
    } catch  {
        // Fall back to jsonrepair for LLM quirks (trailing commas etc.)
        try {
            const { jsonrepair } = await Promise.all(/* import() */[__webpack_require__.e(3381), __webpack_require__.e(8899)]).then(__webpack_require__.bind(__webpack_require__, 298899));
            const repaired = await jsonrepair(cleaned);
            const parsed = JSON.parse(repaired);
            // Strict parse failed but the text doesn't end with a closing bracket →
            // the response was CUT OFF mid-array (output-token limit), not merely
            // quirky. jsonrepair salvaged only the complete items — a strong signal
            // that this chunk was too big for one response.
            const truncated = !/\]\s*$/.test(cleaned);
            return {
                items: Array.isArray(parsed) ? parsed : [],
                strict: false,
                truncated
            };
        } catch  {
            return {
                items: [],
                strict: false,
                truncated: cleaned.length > 0
            };
        }
    }
}
function normalizeQuestion(q) {
    const text = typeof q.text === 'string' ? q.text.trim() : typeof q.question === 'string' ? q.question.trim() : '';
    const answerRaw = typeof q.answer === 'string' ? q.answer.trim() : typeof q.correctAnswer === 'string' ? q.correctAnswer.trim() : typeof q.correct === 'string' ? q.correct.trim() : typeof q.correct_answer === 'string' ? q.correct_answer.trim() : typeof q.answerLetter === 'string' ? q.answerLetter.trim() : typeof q.answerIndex === 'number' ? String(q.answerIndex) : typeof q.correctIndex === 'number' ? String(q.correctIndex) : '';
    if (!text || !answerRaw) return null;
    const rawType = typeof q.type === 'string' ? q.type.toLowerCase() : 'mcq';
    let type = 'mcq';
    if ([
        'tf',
        'true_false',
        'truefalse',
        'true-false',
        'boolean'
    ].includes(rawType)) type = 'tf';
    else if (rawType === 'short' || rawType === 'short_answer' || rawType === 'free') type = 'short';
    let options = [];
    if (Array.isArray(q.options)) {
        options = q.options.map((o)=>String(o).trim()).filter(Boolean);
    } else if (typeof q.options === 'string' && q.options) {
        options = q.options.split('|').map((o)=>o.trim()).filter(Boolean);
    } else if (Array.isArray(q.choices)) {
        options = q.choices.map((o)=>String(typeof o === 'object' && o ? o.text ?? o.label : o).trim()).filter(Boolean);
    }
    // TF questions: normalize answers to True/False
    let answer = answerRaw;
    if (type === 'tf') {
        const a = answerRaw.toLowerCase();
        if ([
            'true',
            't',
            'yes',
            'correct'
        ].includes(a)) answer = 'True';
        else if ([
            'false',
            'f',
            'no',
            'incorrect'
        ].includes(a)) answer = 'False';
    }
    // MCQ answers given as just a letter ("A", "b)", "(C)") or a 1-based index
    // ("2") — resolve to the FULL option text so the imported answer matches
    // the options list instead of storing a bare letter.
    if (type === 'mcq' && options.length > 0) {
        const letter = answerRaw.match(/^\(?([A-Fa-f])[.)\]]?$/);
        const digit = letter ? null : answerRaw.match(/^([1-9])$/);
        const idx = letter ? letter[1].toUpperCase().charCodeAt(0) - 65 : digit ? Number(digit[1]) - 1 : -1;
        if (idx >= 0 && idx < options.length) answer = options[idx];
    }
    const validDifficulty = [
        'Easy',
        'Basic',
        'Moderate',
        'Hard',
        'Expert'
    ];
    const rawDifficulty = typeof q.difficulty === 'string' ? q.difficulty : '';
    const difficulty = validDifficulty.includes(rawDifficulty) ? rawDifficulty : 'Moderate';
    let tags = [];
    if (Array.isArray(q.tags)) tags = q.tags.map((t)=>String(t).trim()).filter(Boolean);
    else if (typeof q.tags === 'string' && q.tags) tags = q.tags.split(',').map((t)=>t.trim()).filter(Boolean);
    // imageUrl — set when the question was extracted from an image (PPTX slide
    // image, DOCX word/media, PDF page render, standalone image). The VLM pass
    // writes a `SOURCE_IMAGE_URL: <url>` line into the merged text; the
    // extraction LLM is told to copy it onto questions that came from the
    // image. Accept a few field-name variants the model might emit.
    let imageUrl = '';
    for (const k of [
        'imageUrl',
        'image_url',
        'image',
        'image_ref',
        'source_image'
    ]){
        const v = q[k];
        if (typeof v === 'string' && v.startsWith('/generated/agent/imported/')) {
            imageUrl = v.trim();
            break;
        }
    }
    return {
        text,
        type,
        options,
        answer,
        explanation: typeof q.explanation === 'string' ? q.explanation : '',
        mnemonic: typeof q.mnemonic === 'string' ? q.mnemonic : '',
        clinicalPearl: typeof q.clinicalPearl === 'string' ? q.clinicalPearl : '',
        difficulty,
        system: typeof q.system === 'string' && q.system.trim() ? q.system.trim() : 'General',
        topic: typeof q.topic === 'string' && q.topic.trim() ? q.topic.trim() : 'General',
        tags,
        ...imageUrl ? {
            imageUrl
        } : {}
    };
}
/** Lines that look like the START of a new question. The number delimiter
 *  class includes "-" — real banks use "9- stem…" / "70- stem…" (observed in
 *  the user's pediatrics PDF; missing it meant chunks cut mid-question). */ const QUESTION_START = /^\s*(?:\d{1,3}[.\):\-]\s|Q\s?\d{1,3}[.\):\-]\s|\(?[A-Z]\)?[.)]\s)/;
/** Estimated question count — same heuristic family as the client's "X
 *  characters ≈ Y questions" preview, hardened for real-world bank formats.
 *  Every single signal undercounts SOME observed format (the pediatrics PDF:
 *  only ~45% of stems carry "?", numbering was "9-" not "9.", options were
 *  inline "a. x  b. y" not one-per-line) — so MULTIPLE signals are combined
 *  with max() and the result is treated as a LOWER BOUND (chunkText adds a
 *  safety factor on top; the per-chunk under-yield re-split catches the
 *  rest at runtime). */ function estimateQuestionCount(text) {
    const qmarks = (text.match(/\?/g) || []).length;
    const numbered = (text.match(/(^|\n)\s*(?:\d{1,3}[.)\]:\-]\s|Q\s?\d{1,3}[.)\]:\-]\s)/g) || []).length;
    // Lettered option markers ANYWHERE — inline option runs ("a. x b. y c. z
    // d. w") only match once at line-start, so the global count ÷ ~4 options
    // is the honest per-question estimate for inline banks.
    const optionMarkers = (text.match(/(?:^|[\s(])[A-Ea-e][.)]\s+\S/g) || []).length;
    // "Answer:" / "Ans:" / "Correct answer:" lines — one per Q&A-style block.
    const answerLines = (text.match(/(^|\n)\s*(?:ans(?:wer)?|correct(?:\s+answer)?)\s*[:.\-)]/gi) || []).length;
    // Short-line density: terse banks run ~5-6 meaningful short lines per
    // question (stem + options + answer); prose runs long lines.
    const shortLines = text.split('\n').filter((l)=>{
        const n = l.trim().length;
        return n > 0 && n <= 90;
    }).length;
    const est = Math.max(qmarks, numbered, Math.floor(optionMarkers / 4), answerLines, Math.floor(shortLines / 6));
    // Guard against pathological overestimates on non-question text (a doc
    // full of "a. b. c." lists): a question needs at least ~80 chars somewhere.
    return Math.min(est, Math.floor(text.length / 80));
}
/** Split `text` into pieces of ~`target` chars, preferring to break at
 *  question starts (then blank lines) so no question straddles a boundary. */ function splitByChars(text, target) {
    if (text.length <= target) return [
        text
    ];
    const chunks = [];
    let start = 0;
    while(start < text.length){
        const targetEnd = start + target;
        if (targetEnd >= text.length) {
            chunks.push(text.slice(start));
            break;
        }
        // Search backwards from the target for a question-start line, then for
        // a blank line, then any newline. Require the cut to be reasonably deep
        // in the chunk (≥40%) to avoid degenerate tiny chunks.
        const minOffset = Math.floor(target * 0.4);
        let cut = -1;
        for(let i = targetEnd; i >= start + minOffset; i--){
            const lineStart = text.lastIndexOf('\n', i);
            if (lineStart <= start) break;
            const line = text.slice(lineStart + 1, Math.min(lineStart + 12, text.length));
            if (QUESTION_START.test(line)) {
                cut = lineStart + 1;
                break;
            }
        }
        if (cut === -1) {
            const blank = text.lastIndexOf('\n\n', targetEnd);
            if (blank >= start + minOffset) cut = blank + 2;
            else {
                const nl = text.lastIndexOf('\n', targetEnd);
                if (nl >= start + minOffset) cut = nl + 1;
                else cut = targetEnd;
            }
        }
        chunks.push(text.slice(start, cut));
        start = cut;
    }
    return chunks.filter((c)=>c.trim().length > 0);
}
/** A chunk whose OWN estimate still exceeds the per-chunk question budget
 *  (local density higher than the global average) is split again at half
 *  granularity — question starts are preferred as the cut points. */ function capChunkQuestions(chunk) {
    const est = estimateQuestionCount(chunk);
    if (est <= MAX_QUESTIONS_PER_CHUNK + 4 || chunk.length <= 1200) return [
        chunk
    ];
    const halves = splitByChars(chunk, Math.max(1200, Math.ceil(chunk.length / 2)));
    if (halves.length <= 1) return [
        chunk
    ];
    return halves.flatMap(capChunkQuestions);
}
/**
 * Split text into extraction chunks. Chunks are sized by ESTIMATED QUESTION
 * COUNT (~20 per chunk), not by characters: what kills recall is the number
 * of questions whose JSON the model must emit in ONE response. The estimate
 * is a lower bound (formats hide their signals — observed: a 156k-char
 * 700-question bank estimated at only ~450 because half the stems had no
 * "?", the numbering was "9-", options were inline), so a 1.5× safety factor
 * shrinks chunks further; the per-chunk under-yield re-split is the final
 * net for chunks that still hold more questions than estimated. Non-question
 * prose (estimate ≈ 0) keeps the ~6.5k-char attention-window target.
 */ function chunkText(text) {
    const est = estimateQuestionCount(text);
    let target = CHUNK_TARGET_CHARS;
    if (est > 0) {
        const estSafe = Math.ceil(est * 1.5); // assume up to 50% undercount
        target = Math.min(CHUNK_TARGET_CHARS, Math.max(1200, Math.round(text.length / estSafe * MAX_QUESTIONS_PER_CHUNK)));
    }
    return splitByChars(text, target).flatMap(capChunkQuestions);
}
/** Cheap heuristic: does this chunk even look like it contains questions?
 *  (Statement-style banks have no "?" — lettered option lines are their
 *  telltale signal.) */ function chunkMightContainQuestions(chunk) {
    return chunk.includes('?') || QUESTION_START.test(chunk.split('\n').find((l)=>l.trim()) || '') || /(^|\n)\s*\(?[A-Fa-f][.)]\s/.test(chunk);
}
function buildPrompts(text, fileName, maxQuestions, part) {
    const system = `You are a medical-education data extraction engine. You receive the raw text of a document that contains exam/quiz questions and you convert EVERY question you can find into a strict JSON array. You never invent questions that are not present, never merge two questions, and never drop a question unless it is impossible to recover its text and answer.`;
    const partNote = part ? `\nNOTE: This is PART ${part.index} of ${part.total} of a larger document. Extract every question FULLY contained in this part. If the last question is cut off at the end (its options or answer missing), SKIP it — do not guess.` : '';
    const userPrompt = `Extract every question from the text below into a JSON array. For each question output an object with EXACTLY these keys:

- "text": the full question stem (string)
- "type": "mcq" (multiple choice), "tf" (true/false), or "short" (short answer / free text)
- "options": array of answer-choice strings for MCQ (empty array [] for tf/short)
- "answer": the correct answer — for MCQ the FULL TEXT of the correct choice (not just the letter); for tf exactly "True" or "False"
- "explanation": the rationale if present in the text, else ""
- "mnemonic": "" (unless the text includes one)
- "clinicalPearl": "" (unless the text includes one)
- "difficulty": one of "Easy", "Basic", "Moderate", "Hard", "Expert" (judge from the question's complexity if not stated)
- "system": the organ system / domain (e.g. "Cardiovascular", "Respiratory", "Pharmacology", "General")
- "topic": the specific topic (e.g. "Heart Failure", "Antibiotics")
- "tags": array of 1-5 short lowercase tags
- "imageUrl": IMPORTANT — IMAGE ATTACHMENT RULES (read carefully):
  * Each "SOURCE_IMAGE_URL:" line in the text marks the URL of an image attached to that slide/page section.
  * Copy the URL verbatim onto EVERY question whose stem is in the same slide/page section as a SOURCE_IMAGE_URL line — that includes short-answer questions like "Identify the anomaly shown", "What abnormality is represented in this picture?", "Mention one complication" (these questions implicitly reference the figure on their slide).
  * Also copy the URL onto questions on a slide whose stem mentions "the picture", "the image", "the figure", "this lesion", "shown", "above", "below" — these reference a nearby image even if the question text is on a slide without its own image.
  * If a slide has NO SOURCE_IMAGE_URL line within ~2000 chars before/after the question text, omit the imageUrl key (or use "").
  * Multiple questions extracted from the same slide section that has an image MUST ALL carry that image's URL — not just the first one.
  * Verbatim URLs only — never invent paths.

Rules:
- If the document gives options as A) B) C) D), strip the letters and output the option texts.
- If the correct answer is given as a letter, map it to the full option text for "answer".
- Output ONLY the JSON array. No markdown fences, no commentary.
- Extract at most ${maxQuestions} questions. If there are more, keep the first ${maxQuestions}.
- If the text contains NO questions at all, output exactly [].${partNote}

TEXT (from file "${fileName || 'pasted text'}"):
"""
${text}
"""`;
    return {
        system,
        userPrompt
    };
}
/** Extract the questions from ONE chunk via the primary provider, falling
 *  back to the sandbox ZAI SDK if the primary fails or yields nothing.
 *  `breaker` lets the caller skip a provider that has already failed
 *  repeatedly; `forceFallback` (pass-2 retries) skips the primary entirely.
 *  `req` is the App Router Request (always a NextRequest at runtime) cast
 *  only where callChat's signature demands it.
 *  Returns the parsed questions plus whether the LLM's response looked CUT
 *  OFF mid-JSON — the caller uses that to split the chunk and retry. */ async function extractChunk(req, chunk, fileName, maxQuestions, part, breaker, forceFallback = false) {
    const { system, userPrompt } = buildPrompts(chunk, fileName, maxQuestions, part);
    let raw = '';
    let fromPrimary = false;
    if (forceFallback || breaker?.skipPrimary()) {
        // Circuit breaker open (or retry pass) — the provider already failed
        // repeatedly this job; go straight to the rate-limit-aware ZAI fallback.
        raw = await zaiExtract(system, userPrompt);
    } else {
        // Primary: fail FAST (maxRetries 0) and race a deadline — the Ollama adapter
        // ignores AbortSignal, so the race is the reliable cutoff. A best-effort
        // abort is passed too in case the provider honors it.
        const primaryAbort = new AbortController();
        const primaryTimer = setTimeout(()=>primaryAbort.abort(), PRIMARY_TIMEOUT_MS);
        try {
            raw = await withTimeout((0,_lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_5__.callChat)(req, {
                system,
                prompt: userPrompt,
                maxOutputTokens: 16000,
                temperature: 0.1,
                maxRetries: 0,
                abortSignal: primaryAbort.signal
            }), PRIMARY_TIMEOUT_MS, `Primary extraction${part ? ` (part ${part.index}/${part.total})` : ''}`);
            fromPrimary = true;
        } catch (err) {
            console.warn('[Question Extract] primary LLM failed, trying ZAI SDK fallback:', err);
            breaker?.onPrimaryFail();
            raw = await zaiExtract(system, userPrompt);
        } finally{
            clearTimeout(primaryTimer);
        }
    }
    let { items: parsed, truncated } = await parseQuestionsJson(raw);
    let questions = parsed.map((item)=>item && typeof item === 'object' ? normalizeQuestion(item) : null).filter((q)=>q !== null);
    // A response that parses but yields ZERO normalizable questions is NOT a
    // primary success — it must not reset the circuit breaker (observed: garbage
    // "successes" re-closed the breaker and re-burned the 70 s primary timeout
    // on every later chunk).
    if (fromPrimary && questions.length > 0) breaker?.onPrimarySuccess();
    // Primary returned garbage/empty for a chunk that clearly has questions —
    // give the ZAI fallback a shot before accepting the empty result.
    if (questions.length === 0 && chunkMightContainQuestions(chunk)) {
        console.warn(`[Question Extract]${part ? ` part ${part.index}/${part.total}:` : ''} primary returned ${parsed.length} parseable items — retrying chunk via ZAI fallback`);
        raw = await zaiExtract(system, userPrompt);
        ({ items: parsed, truncated } = await parseQuestionsJson(raw));
        questions = parsed.map((item)=>item && typeof item === 'object' ? normalizeQuestion(item) : null).filter((q)=>q !== null);
    }
    return {
        questions,
        truncated
    };
}
/** Extract one chunk; if the response shows evidence of OUTPUT TRUNCATION
 *  (strict JSON.parse failed and the array wasn't closed) or the chunk
 *  yielded far fewer questions than its own estimate, split it in half and
 *  extract both halves — halves each produce a much smaller, far likelier
 *  complete response. Depth-capped so a pathological chunk can't loop.
 *  If the halves fail entirely, the full-chunk partial result is kept —
 *  this is a "recover more" pass, never a "lose what we had" pass. */ async function extractChunkResilient(req, chunk, fileName, maxQuestions, part, breaker, forceFallback = false, depth = 0) {
    const { questions, truncated } = await extractChunk(req, chunk, fileName, maxQuestions, part, breaker, forceFallback);
    if (part) {
        console.log(`[Question Extract] part ${part.index}/${part.total}: got ${questions.length}` + (truncated ? ' (response was cut mid-JSON)' : ''));
    }
    if (depth >= 2 || chunk.length <= 1200) return questions;
    const est = estimateQuestionCount(chunk);
    // Under-yield = far fewer questions than the chunk itself promises.
    // Threshold is 75% (was 60% — chunks yielding 60-80% passed silently and
    // that was exactly the "700 → 350" hole: ~29-question chunks yielding ~15).
    const underYielded = est >= 6 && questions.length < Math.floor(est * 0.75) && est - questions.length >= 3;
    if (!truncated && !underYielded) return questions;
    console.warn(`[Question Extract]${part ? ` part ${part.index}/${part.total}:` : ''} ` + `got ${questions.length} of ~${est} expected${truncated ? ' (response truncated mid-JSON)' : ''} — splitting the chunk and retrying`);
    const halves = splitByChars(chunk, Math.max(1200, Math.ceil(chunk.length / 2)));
    if (halves.length <= 1) return questions;
    try {
        const halvesResults = await Promise.all(halves.map((h, k)=>extractChunkResilient(req, h, fileName, maxQuestions, {
                index: k + 1,
                total: halves.length
            }, breaker, forceFallback, depth + 1)));
        const combined = halvesResults.flat();
        if (combined.length > questions.length) return combined;
    } catch  {
    // Halves failed (e.g. ZAI 429s that outlived their retries) — keep the
    // full-chunk partial result; pass 2 will retry this chunk sequentially.
    }
    return questions;
}
/** Serialized chunkResults persistence per job — two workers settling
 *  chunks concurrently must not read-modify-write the row out of order. */ const CHUNK_CHAINS = globalThis.__qExtractChains ?? (globalThis.__qExtractChains = new Map());
/** Parse the persisted per-chunk results (JSON array parallel to the chunk
 *  plan; each entry = that chunk's extracted questions, or null = pending). */ function parseChunkResults(raw) {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((entry)=>Array.isArray(entry) ? entry : null);
    } catch  {
        return [];
    }
}
/** Persist ONE chunk's result through the job's serialized write chain. */ function persistChunk(jobId, chunkIdx, questions) {
    const run = (async ()=>{
        const row = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.findUnique({
            where: {
                id: jobId
            },
            select: {
                chunkResults: true
            }
        });
        if (!row) return;
        const results = parseChunkResults(row.chunkResults);
        while(results.length <= chunkIdx)results.push(null);
        results[chunkIdx] = questions;
        await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
            where: {
                id: jobId
            },
            data: {
                chunkResults: JSON.stringify(results)
            }
        });
    })();
    const prev = CHUNK_CHAINS.get(jobId) ?? Promise.resolve();
    const next = prev.then(()=>run, ()=>run);
    CHUNK_CHAINS.set(jobId, next.catch(()=>{}));
    return next;
}
/** The actual extraction, decoupled from the HTTP request lifecycle.
 *  Never throws — always settles the ImportExtraction row to done/error,
 *  or PAUSES it (status stays processing, chunkResults persisted, no
 *  heartbeat → the next GET poll fast-resumes a NEW pass).
 *
 *  RESUMABLE MULTI-PASS architecture:
 *   • chunkText(text) is deterministic, so the chunk plan is identical on
 *     every pass; per-chunk results are persisted the moment they complete
 *     (chunkResults), so completed chunks are NEVER re-extracted and never
 *     lost — a pause/restart only re-runs the still-pending ones.
 *   • Pass = worker-pool sweep over pending chunks + sequential retry round.
 *     Rate-limit errors and the pass deadline PAUSE rather than drop.
 *   • Settlement merges chunkResults in chunk order and counts anything
 *     still null after MAX_PASSES as droppedChunks (honest). */ async function runJob(jobId, req) {
    if (LIVE.has(jobId)) return; // already running in this process
    LIVE.add(jobId);
    const wallStart = Date.now(); // PASS_DEADLINE anchor (reset every pass)
    let progressDone = 0; // shared by persistProgress + the heartbeat writer
    const heartbeat = setInterval(()=>{
        // No-op field write: @updatedAt bumps the row so the resume check
        // (which triggers on a stale updatedAt) leaves an active job alone.
        void _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
            where: {
                id: jobId
            },
            data: {
                progressDone
            }
        }).catch(()=>{});
    }, HEARTBEAT_MS);
    try {
        const row = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.findUnique({
            where: {
                id: jobId
            }
        });
        if (!row || row.status === 'done' || row.status === 'error') return;
        let text = row.text;
        const fileName = row.fileName;
        const maxQuestions = row.maxQuestions;
        const passNo = (row.passCount ?? 0) + 1;
        // ── VLM image pass — runs ONCE on pass 1, before chunking. Each image
        //  (PPTX slide image / DOCX word/media / PDF page render / standalone
        //  image) is sent to the VLM with an OCR + describe + question-extract
        //  instruction; the responses are concatenated, prepended to the source
        //  text, and PERSISTED on the row (with a sentinel marker so resume
        //  passes don't re-run the VLM). The chunker then sees image content
        //  as text and the text-extraction LLM picks up any questions in the
        //  OCR'd text. ──
        if (passNo === 1 && row.imagesJson) {
            let images = [];
            try {
                const parsed = JSON.parse(row.imagesJson);
                if (Array.isArray(parsed)) {
                    images = parsed.filter((x)=>!!x && typeof x === 'object' && typeof x.dataUrl === 'string' && typeof x.caption === 'string').slice(0, 24);
                }
            } catch  {}
            // Sentinel at the top of the merged text marks VLM completion so a
            // resumed pass doesn't re-run it (which would waste API quota).
            const VLM_SENTINEL = '[VLM_DONE]';
            if (images.length > 0 && !text.startsWith(VLM_SENTINEL)) {
                console.log(`[Question Extract] job ${jobId}: running VLM pass on ${images.length} image${images.length > 1 ? 's' : ''}…`);
                const vlmResults = [];
                let visionDone = 0;
                let consecutiveVlmFailures = 0;
                const vlmStartedAt = Date.now();
                let vlmSkipped = 0;
                for (const img of images){
                    // VLM time budget — stop starting new VLM calls once the pass's
                    // VLM slice is exhausted. The text-extraction LLM still runs on
                    // whatever OCR text we already collected; remaining images are
                    // counted as skipped (worst case: a question stem loses its
                    // figure's text context — better than failing the whole job).
                    if (Date.now() - vlmStartedAt > VLM_TIME_BUDGET_MS) {
                        vlmSkipped = images.length - visionDone;
                        console.warn(`[Question Extract] job ${jobId}: VLM time budget exhausted after ${visionDone}/${images.length} image(s) — skipping remaining ${vlmSkipped}, text extraction will continue`);
                        break;
                    }
                    // VLM time budget — stop starting new VLM calls once the pass's
                    // VLM slice is exhausted. The text-extraction LLM still runs on
                    // whatever OCR text we already collected; remaining images are
                    // counted as skipped (worst case: a question stem loses its
                    // figure's text context — better than failing the whole job).
                    if (Date.now() - vlmStartedAt > VLM_TIME_BUDGET_MS) {
                        vlmSkipped = images.length - visionDone;
                        console.warn(`[Question Extract] job ${jobId}: VLM time budget exhausted after ${visionDone}/${images.length} image(s) — skipping remaining ${vlmSkipped}, text extraction will continue`);
                        break;
                    }
                    // Cancellation check — stop starting new VLM calls. The in-flight
                    // call (if any) will finish (~5–10s) and then we exit.
                    if (CANCELLED.has(jobId)) {
                        console.log(`[Question Extract] job ${jobId}: cancelled during VLM pass — stopping after ${visionDone}/${images.length} image(s)`);
                        break;
                    }
                    // Per-image progress so the user sees something moving during the
                    // (potentially slow) VLM pass.
                    visionDone++;
                    await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
                        where: {
                            id: jobId
                        },
                        data: {
                            progressDone: visionDone,
                            progressTotal: images.length
                        }
                    }).catch(()=>{});
                    const imageUrl = saveImportedImage(img.dataUrl);
                    if (!imageUrl) {
                        console.warn(`[Question Extract] could not persist image "${img.caption}" — skipping VLM`);
                        continue;
                    }
                    // If recent VLM calls hit 429s, slow down BEFORE the next attempt
                    // (the adaptive gate handles in-flight concurrency, but adding a
                    // per-image backoff gives the gateway breathing room between
                    // sequential images on a fully-rate-limited account).
                    if (consecutiveVlmFailures > 0) {
                        const backoff = Math.min(8000 * consecutiveVlmFailures, 30000);
                        console.log(`[Question Extract] VLM backing off ${Math.round(backoff / 1000)}s before next image (consecutive failures: ${consecutiveVlmFailures})`);
                        await sleep(backoff);
                    }
                    let vlm = '';
                    try {
                        vlm = await visionExtractImage(img.dataUrl, imageUrl);
                    } catch (err) {
                        console.warn(`[Question Extract] VLM image "${img.caption}" threw:`, err instanceof Error ? err.message : err);
                    }
                    if (vlm.trim()) {
                        consecutiveVlmFailures = 0;
                        // The VLM was asked to extract any complete questions present
                        // in the image as a QUESTIONS_JSON block. Parse them now and
                        // store them in the per-job VLM_QUESTIONS map — they'll be
                        // merged into the final settlement alongside the text-extraction
                        // chunks' results (deduped by question text).
                        try {
                            const vlmQs = await parseVisionQuestions(vlm);
                            if (vlmQs.length > 0) {
                                // Ensure each VLM-extracted question carries this image's
                                // URL — the VLM was instructed to include it but might have
                                // forgotten on some items.
                                for (const q of vlmQs){
                                    if (!q.imageUrl) q.imageUrl = imageUrl;
                                }
                                const existing = VLM_QUESTIONS.get(jobId) ?? [];
                                VLM_QUESTIONS.set(jobId, [
                                    ...existing,
                                    ...vlmQs
                                ]);
                                console.log(`[Question Extract] VLM image "${img.caption}" yielded ${vlmQs.length} question(s)`);
                            }
                        } catch (e) {
                            console.warn(`[Question Extract] VLM questions parse for "${img.caption}" failed:`, e instanceof Error ? e.message : e);
                        }
                    } else {
                        consecutiveVlmFailures++;
                        console.warn(`[Question Extract] VLM image "${img.caption}" returned no content (${consecutiveVlmFailures} consecutive failures)`);
                    }
                    vlmResults.push({
                        caption: img.caption,
                        imageUrl,
                        vlm: vlm || '[VLM returned no content for this image.]'
                    });
                }
                // 2) Build the merged text by INLINING each VLM result next to the
                //    slide/page section it belongs to. The original text has lines
                //    like `── Slide 6 ──` and `── Slide 6 (image 1) (VLM extraction) ──`
                //    placeholders from the client. We insert the VLM block right
                //    after the matching `── <caption-prefix> ──` line.
                //
                //    Captions come in shapes like:
                //      - "Slide 6"            → match `── Slide 6 ──`
                //      - "Slide 19 (image 1)" → match `── Slide 19 ──` (sub-image 1)
                //      - "Page 5"             → match `--- Page 5 ---`
                //      - "Image 2 in DOCX"    → match anywhere (DOCX has no per-image anchors)
                //      - "audio: foo.mp3"     → match anywhere (audio caption)
                //    For files without per-image anchors (DOCX, standalone image),
                //    the VLM blocks are appended at the top of the merged text
                //    (same behavior as before).
                const inlined = [];
                const leftover = [];
                let workingText = row.text;
                for (const r of vlmResults){
                    // Extract a slide/page anchor from the caption.
                    const slideMatch = r.caption.match(/^(Slide|Page)\s+(\d+)/);
                    if (slideMatch) {
                        const kind = slideMatch[1]; // "Slide" or "Page"
                        const num = slideMatch[2];
                        // For PPTX: `── Slide N ──` ; for PDF: `--- Page N ---`
                        const marker = kind === 'Slide' ? `── Slide ${num} ──` : `--- Page ${num} ---`;
                        const idx = workingText.indexOf(marker);
                        if (idx !== -1) {
                            // Find the end of this slide's section (next `── Slide` or
                            // `--- Page` marker, or end of text).
                            const after = idx + marker.length;
                            const nextMarker = workingText.slice(after).search(kind === 'Slide' ? /\n── Slide \d+ ──/ : /\n--- Page \d+ ---/);
                            const insertAt = nextMarker === -1 ? workingText.length : after + nextMarker;
                            const block = `\n\n── ${r.caption} (VLM extraction) ──\nSOURCE_IMAGE_URL: ${r.imageUrl}\n${r.vlm}`;
                            workingText = workingText.slice(0, insertAt) + block + workingText.slice(insertAt);
                            inlined.push({
                                caption: r.caption,
                                block
                            });
                            continue;
                        }
                    }
                    // No anchor — collect for top-of-file append.
                    leftover.push(r);
                }
                // Top-of-file block (sentinel + any images we couldn't anchor inline).
                const topBlocks = leftover.map((r)=>`── ${r.caption} (VLM extraction) ──\nSOURCE_IMAGE_URL: ${r.imageUrl}\n${r.vlm}`).join('\n\n');
                const topSection = topBlocks ? `${VLM_SENTINEL}\n\n${topBlocks}\n\n` : `${VLM_SENTINEL}\n\n`;
                const mergedText = `${topSection}${workingText}`;
                await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
                    where: {
                        id: jobId
                    },
                    data: {
                        text: mergedText.slice(0, MAX_INPUT_CHARS)
                    }
                });
                text = mergedText.slice(0, MAX_INPUT_CHARS);
                console.log(`[Question Extract] job ${jobId}: VLM pass done — ${inlined.length} image(s) inlined next to their slide text, ${leftover.length} at top of file${vlmSkipped ? `, ${vlmSkipped} skipped (VLM time budget)` : ''}; merged text is now ${text.length.toLocaleString()} chars (was ${row.text.length.toLocaleString()})`);
            }
        }
        const chunks = chunkText(text);
        const chunkResults = parseChunkResults(row.chunkResults);
        while(chunkResults.length < chunks.length)chunkResults.push(null);
        const settledCount = chunkResults.filter((r)=>r !== null).length;
        await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
            where: {
                id: jobId
            },
            data: {
                status: 'processing',
                startedAt: new Date(),
                passCount: passNo,
                progressDone: settledCount,
                progressTotal: chunks.length
            }
        });
        progressDone = settledCount;
        console.log(`[Question Extract] job ${jobId}: text ${text.length.toLocaleString()} chars, ` + `est ~${estimateQuestionCount(text)} questions → ${chunks.length} chunk(s); ` + `pass ${passNo}/${MAX_PASSES} — ${chunks.length - settledCount} chunk(s) pending`);
        // ── Circuit breaker state (per pass) ──
        let primaryFailures = 0;
        const breaker = {
            skipPrimary: ()=>primaryFailures >= PRIMARY_BREAKER_THRESHOLD,
            onPrimaryFail: ()=>{
                primaryFailures++;
            },
            onPrimarySuccess: ()=>{
                primaryFailures = 0;
            }
        };
        const persistProgress = (total)=>{
            progressDone++;
            void _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
                where: {
                    id: jobId
                },
                data: {
                    progressDone,
                    progressTotal: total
                }
            }).catch(()=>{});
        };
        // ── Pass sweep: worker pool over the still-pending chunks ──
        let rateLimited = false;
        const pendingIdx = chunkResults.reduce((acc, r, i)=>r === null ? (acc.push(i), acc) : acc, []);
        let nextIndex = 0;
        const worker = async ()=>{
            for(;;){
                // Cancellation check — the user clicked "Stop extraction". Stop
                // starting new chunks; the in-flight chunk will finish and the
                // finally block settles the row as 'cancelled'.
                if (CANCELLED.has(jobId)) {
                    console.log(`[Question Extract] job ${jobId}: cancelled mid-pass — stopping worker`);
                    return;
                }
                const i = nextIndex++;
                if (i >= pendingIdx.length) return;
                const chunkIdx = pendingIdx[i];
                if (Date.now() - wallStart > JOB_DEADLINE_MS) {
                    console.warn(`[Question Extract] job ${jobId}: pass ${passNo} deadline reached — pausing (progress persisted, resumable)`);
                    return;
                }
                const part = chunks.length > 1 ? {
                    index: chunkIdx + 1,
                    total: chunks.length
                } : undefined;
                try {
                    const qs = await extractChunkResilient(req, chunks[chunkIdx], fileName, Math.min(maxQuestions, 100), part, breaker);
                    chunkResults[chunkIdx] = qs;
                    await persistChunk(jobId, chunkIdx, qs);
                } catch (err) {
                    // Rate-limited beyond in-call retries → PAUSE the whole pass now
                    // (grinding on only manufactures a deeper 429 storm).
                    if (isRateLimitError(err)) {
                        rateLimited = true;
                        console.warn(`[Question Extract] job ${jobId}: rate-limited mid-pass — pausing after ${chunkResults.filter((r)=>r !== null).length}/${chunks.length} chunk(s) (resumable)`);
                        return;
                    }
                    // Not fatal yet — the retry round below retries failures sequentially.
                    console.error(`[Question Extract] chunk ${chunkIdx + 1}/${chunks.length} failed entirely:`, err);
                } finally{
                    persistProgress(chunks.length);
                }
            }
        };
        const workers = Array.from({
            length: Math.min(CHUNK_CONCURRENCY, Math.max(pendingIdx.length, 1))
        }, ()=>worker());
        await Promise.all(workers);
        // If the user cancelled mid-pass, settle as 'cancelled' immediately —
        // skip the retry round and the merge. Already-extracted chunks are
        // persisted in chunkResults and would be available on a re-run, but
        // the user explicitly asked to stop, so we don't continue.
        if (CANCELLED.has(jobId)) {
            console.log(`[Question Extract] job ${jobId}: settling as cancelled (pass ${passNo} interrupted)`);
            await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
                where: {
                    id: jobId
                },
                data: {
                    status: 'cancelled',
                    error: 'Cancelled by the user.',
                    finishedAt: new Date()
                }
            }).catch(()=>{});
            return;
        }
        // ── Retry round: chunks that failed ENTIRELY get one sequential,
        // primary-skipping retry. Sequential = minimum rate-limit pressure. ──
        if (!rateLimited) {
            const failedIdx = chunkResults.reduce((acc, r, i)=>r === null ? (acc.push(i), acc) : acc, []);
            if (failedIdx.length > 0) {
                console.warn(`[Question Extract] pass ${passNo} retry round: ${failedIdx.length} failed chunk(s) sequentially`);
                for (const i of failedIdx){
                    if (CANCELLED.has(jobId)) break;
                    if (Date.now() - wallStart > JOB_DEADLINE_MS || rateLimited) break;
                    try {
                        const qs = await extractChunkResilient(req, chunks[i], fileName, Math.min(maxQuestions, 100), chunks.length > 1 ? {
                            index: i + 1,
                            total: chunks.length
                        } : undefined, breaker, true);
                        chunkResults[i] = qs;
                        await persistChunk(jobId, i, qs);
                    } catch (err) {
                        if (isRateLimitError(err)) {
                            rateLimited = true;
                            console.warn(`[Question Extract] job ${jobId}: rate-limited in retry round — pausing (resumable)`);
                            break;
                        }
                        console.error(`[Question Extract] chunk ${i + 1}/${chunks.length} failed on retry:`, err);
                    }
                }
            }
        }
        // ── Still pending? PAUSE (resumable) or settle ──
        const stillPendingIdx = chunkResults.reduce((acc, r, i)=>r === null ? (acc.push(i), acc) : acc, []);
        // Track consecutive rate-limited passes — if a job is rate-limited on
        // every pass for MAX_RATE_LIMITED_PASSES passes, settle as error. The
        // ZAI rate limit is account-wide; resume-looping forever just keeps
        // the global single-job slot blocked (every retry bumps `updatedAt`,
        // defeating the zombie sweep).
        const rateLimitedPasses = (row.passCount ?? 0) + 1; // current pass counts
        const tooManyRateLimited = rateLimited && rateLimitedPasses >= MAX_RATE_LIMITED_PASSES;
        if (stillPendingIdx.length > 0 && passNo < MAX_PASSES && !tooManyRateLimited) {
            console.warn(`[Question Extract] job ${jobId} PAUSING after pass ${passNo} — ${stillPendingIdx.length}/${chunks.length} chunk(s) pending${rateLimited ? ' (rate-limited)' : ''}; the next poll resumes pass ${passNo + 1}`);
            return; // row stays "processing"; heartbeat stops → stale → fast-resume
        }
        if (tooManyRateLimited) {
            console.warn(`[Question Extract] job ${jobId} settling as error after ${rateLimitedPasses} rate-limited passes — ZAI gateway appears to be down for the session`);
        }
        const droppedChunks = stillPendingIdx.length;
        // ── Merge in original chunk order + dedupe boundary straddlers ──
        // Dedupe key is the FULL normalized text (not the first 80 chars — that
        // prefix key collapsed real exam banks that share long stem openings,
        // e.g. "Which of the following is the most common…" variants, silently
        // dropping dozens of legitimately distinct questions).
        const merged = [];
        const seen = new Set();
        let rawCount = 0;
        for (const chunkQuestions of chunkResults){
            for (const q of chunkQuestions ?? []){
                rawCount++;
                const key = q.text.toLowerCase().replace(/\s+/g, ' ').trim();
                if (!key || seen.has(key)) continue; // boundary-straddle / exact duplicates
                seen.add(key);
                merged.push(q);
            }
        }
        // ── Merge VLM-extracted questions (questions the VLM pulled out of
        //  QUESTIONS_JSON blocks during the VLM pass). These are image-based
        //  questions that the text-extraction LLM may have missed (the question
        //  text was INSIDE the image, not on the slide). They're prepended to
        //  `merged` so they appear first in the result (image-based questions
        //  are typically the most visual and should be reviewed first). The
        //  dedupe-by-text step above already covers VLM questions whose text
        //  also appears in the slide text — only NET-NEW VLM questions survive. ──
        const vlmQs = VLM_QUESTIONS.get(jobId) ?? [];
        if (vlmQs.length > 0) {
            const vlmNew = [];
            for (const q of vlmQs){
                const key = q.text.toLowerCase().replace(/\s+/g, ' ').trim();
                if (!key || seen.has(key)) continue;
                seen.add(key);
                vlmNew.push(q);
                rawCount++;
            }
            if (vlmNew.length > 0) {
                merged.unshift(...vlmNew);
                console.log(`[Question Extract] job ${jobId}: merged ${vlmNew.length} VLM-only question(s) (of ${vlmQs.length} VLM-extracted; ${vlmQs.length - vlmNew.length} already in text-extraction results)`);
            }
        }
        // ── Post-processing pass: questions that reference an image ("shown",
        //  "the picture", "above", "below", "this lesion") but weren't given an
        //  imageUrl by the LLM get the NEAREST preceding SOURCE_IMAGE_URL from
        //  the merged text. This catches cross-slide references like a question
        //  on slide 9 saying "what abnormality is shown in the picture above"
        //  where the image lives on slide 8 — the LLM's per-section attachment
        //  rule misses these because they're in different slide sections. ──
        const sourceText = text; // already-merged text with inline SOURCE_IMAGE_URL lines
        const urlLineRegex = /SOURCE_IMAGE_URL:\s*(\/generated\/agent\/imported\/[^\s\n]+)/g;
        const urlLines = [];
        for (const m of sourceText.matchAll(urlLineRegex)){
            urlLines.push({
                idx: m.index ?? 0,
                url: m[1]
            });
        }
        if (urlLines.length > 0) {
            let attached = 0;
            for (const q of merged){
                if (q.imageUrl) continue;
                // Heuristic: the question text references visual content. Match
                // common phrasings from medical OSPE/clinical decks.
                const refsImage = /\b(shown|the picture|the image|the figure|this lesion|this mass|this patient|this condition|this appearance|this abnormality|this sign|this slide|picture shown|image shown|figure shown|above|below)\b/i.test(q.text) || /\bidentify\b.*\b(anomal|lesion|abnormalit|defect|condition|mass|tumor|sign|feature)\b/i.test(q.text) || /\bwhat\b.*\b(anomal|lesion|abnormalit|defect|condition|mass|tumor|sign|feature|abnormality)\b/i.test(q.text) || /\bname\b.*\b(the|this|one|the above)\b/i.test(q.text) || /\bmention\b/i.test(q.text);
                if (!refsImage) continue;
                // Find the question text in the source and pick the nearest
                // SOURCE_IMAGE_URL line (before OR after, whichever is closer).
                const qIdx = sourceText.indexOf(q.text);
                if (qIdx === -1) continue;
                let best = null;
                for (const ul of urlLines){
                    const dist = Math.abs(ul.idx - qIdx);
                    if (!best || dist < best.dist) best = {
                        url: ul.url,
                        dist
                    };
                }
                // Only attach if the nearest URL is within ~3000 chars — beyond that
                // the image is probably unrelated to this question.
                if (best && best.dist <= 3000) {
                    q.imageUrl = best.url;
                    attached++;
                }
            }
            if (attached > 0) {
                console.log(`[Question Extract] job ${jobId}: post-processing attached imageUrl to ${attached} additional question(s) via nearest-URL lookup`);
            }
        }
        // Every chunk failed → job failed. Some failed → still deliver results,
        // but flag it so the user knows the count may be short.
        if (chunks.length > 0 && droppedChunks === chunks.length) {
            await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
                where: {
                    id: jobId
                },
                data: {
                    status: 'error',
                    error: 'AI extraction failed — the AI service is unavailable or the file is too large. Please retry in a minute, split your file into smaller parts, or import a JSON/CSV file instead (direct import, no AI needed).',
                    finishedAt: new Date()
                }
            });
            return;
        }
        await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
            where: {
                id: jobId
            },
            data: {
                status: 'done',
                questionsJson: JSON.stringify(merged.slice(0, maxQuestions)),
                rawCount,
                droppedChunks,
                finishedAt: new Date()
            }
        });
    } catch (err) {
        console.error('[Question Extract] job crashed:', err);
        await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
            where: {
                id: jobId
            },
            data: {
                status: 'error',
                error: 'AI extraction failed unexpectedly. Please try again.',
                finishedAt: new Date()
            }
        }).catch(()=>{});
    } finally{
        clearInterval(heartbeat);
        LIVE.delete(jobId);
        CHUNK_CHAINS.delete(jobId);
        VLM_QUESTIONS.delete(jobId);
        CANCELLED.delete(jobId);
    }
}
async function cleanupJobs() {
    const cutoff = new Date(Date.now() - JOB_TTL_MS);
    await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.deleteMany({
        where: {
            createdAt: {
                lt: cutoff
            }
        }
    }).catch(()=>{});
}
const POST = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_7__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_6__/* .resolveUserId */ .n$)();
    // Stage 10: visitor strategy gate. Visitors (anonymous, guest@medq.local)
    // cannot use AI question extraction — it's a paid-tier feature that
    // consumes LLM credits and persists results to the Knowledge Library.
    // Free/premium/pro tiers proceed; the rate-limit and daily-quota system
    // handles per-user caps downstream.
    const _tier = await (0,_lib_subscription_visitor_strategy__WEBPACK_IMPORTED_MODULE_9__/* .resolveAccessTier */ .l6)(userId);
    const _tierCfg = (0,_lib_subscription_visitor_strategy__WEBPACK_IMPORTED_MODULE_9__/* .thresholdFor */ .De)(_tier);
    if (!_tierCfg.canSaveQuestions) {
        return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_6__/* .forbidden */ .o0)(`AI question extraction is not available for the ${_tierCfg.label} tier. ` + `Sign up for a free account to extract questions from your uploaded files.`);
    }
    if (!userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'User not found'
    }, {
        status: 401
    });
    // ── Detect upload mode: multipart/form-data (file) vs JSON (text) ──
    // File uploads are parsed SERVER-SIDE (extractFromFileServer) — no
    // client-side FileReader/pdfjs/mammoth. More reliable: no browser OOM,
    // no pdfjs worker version mismatch, no reload loss.
    const contentType = req.headers.get('content-type') || '';
    let text;
    let uploadFileName;
    let uploadImages = [];
    if (contentType.includes('multipart/form-data')) {
        // ── File upload mode: parse the file server-side ──
        const formData = await req.formData();
        const file = formData.get('file');
        if (!(file instanceof File)) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'No file uploaded'
            }, {
                status: 400
            });
        }
        uploadFileName = file.name;
        // 30 MB cap (preview-gateway aware). The z.ai preview gateway hard-rejects
        // any request body larger than 32 MiB (33,554,432 bytes) with HTTP 400
        // EntityTooLarge, and borderline bodies sometimes surface as 502 Bad
        // Gateway (upstream connection reset mid-buffering). Capping at 30 MiB
        // lets the app reject oversized uploads with a clear 413 message BEFORE
        // the gateway ever sees the body. ~2 MiB headroom for multipart framing.
        const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;
        if (file.size > MAX_UPLOAD_BYTES) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'File is too large (' + Math.round(file.size / 1024 / 1024) + ' MB — the limit is 30 MB ' + 'through the preview gateway). Split it into smaller files and import them one by one — ' + 'duplicate questions are skipped automatically.'
            }, {
                status: 413
            });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        try {
            const extracted = await (0,_lib_server_file_extract__WEBPACK_IMPORTED_MODULE_8__/* .extractFromFileServer */ .PE)(buffer, file.name);
            text = extracted.text;
            uploadImages = extracted.images ?? [];
        } catch (err) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: err instanceof Error ? err.message : 'Could not parse the uploaded file'
            }, {
                status: 400
            });
        }
        if (text.length > MAX_INPUT_CHARS) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: `Extracted content is too large (${Math.round(text.length / 1000)}k characters — the limit is ${Math.round(MAX_INPUT_CHARS / 1000)}k). Split the file into smaller parts.`
            }, {
                status: 413
            });
        }
    } else {
        // ── Text paste mode (JSON body) — unchanged ──
        const body1 = await req.json().catch(()=>null);
        if (!body1 || typeof body1.text !== 'string' || !body1.text.trim()) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'No text provided'
            }, {
                status: 400
            });
        }
        if (body1.text.length > MAX_INPUT_CHARS) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: `That content is too large (${Math.round(body1.text.length / 1000)}k characters — the limit is ${Math.round(MAX_INPUT_CHARS / 1000)}k). Split it into two or three smaller files and import them one by one — duplicates are skipped automatically.`
            }, {
                status: 413
            });
        }
        text = body1.text;
        uploadFileName = typeof body1.fileName === 'string' ? body1.fileName : 'pasted text';
        if (Array.isArray(body1.images)) {
            uploadImages = body1.images;
        }
    }
    // ── Images (PPTX slide images, DOCX word/media/*, PDF page renders,
    //  standalone image/audio files). Each is a base64 data URL paired with a
    //  caption. We cap at 24 images / 12 MB total payload — anything bigger
    //  should be split into multiple imports. ──
    const MAX_IMAGES = 24;
    const MAX_IMAGES_BYTES = 12 * 1024 * 1024;
    let images = [];
    // uploadImages comes from either the JSON body (paste mode) or the
    // server-side file parser (upload mode). Same shape either way.
    if (Array.isArray(uploadImages)) {
        let totalBytes = 0;
        for (const img of uploadImages){
            if (images.length >= MAX_IMAGES) break;
            if (!img || typeof img.dataUrl !== 'string' || !/^data:/i.test(img.dataUrl)) continue;
            if (typeof img.caption !== 'string' || !img.caption.trim()) continue;
            const approxBytes = Math.round(img.dataUrl.length * 0.75);
            if (totalBytes + approxBytes > MAX_IMAGES_BYTES) break;
            totalBytes += approxBytes;
            images.push({
                dataUrl: img.dataUrl,
                caption: img.caption.slice(0, 80)
            });
        }
    }
    // maxQuestions only comes from the JSON body (paste mode). File uploads
    // use the server default.
    const maxQuestions = Math.min(Math.max(Number(typeof body !== 'undefined' && body?.maxQuestions) || DEFAULT_MAX_QUESTIONS, 1), MAX_MAX_QUESTIONS);
    await cleanupJobs();
    // ── Zombie sweep: a "processing" row that's stuck settles as error so
    //  the single-job lock is released for the next request. Two criteria:
    //   • updatedAt older than ZOMBIE_FAIL_MS (no heartbeat for 45 min) — the
    //     classic zombie case (server restart / dead runner).
    //   • createdAt older than 1 hour — a job that's been "processing" for
    //     more than an hour is definitely stuck even if it's still being
    //     polled and bumping updatedAt via the heartbeat (the rate-limit
    //     resume-loop pattern: every pass fails fast on 429s, but each pass
    //     bumps updatedAt, defeating the classic zombie check).
    //  Fail it honestly; the owner can retry any time. ──
    const STALE_TOTAL_MS = 60 * 60000; // 1 hour wall-clock from createdAt
    const totalCutoff = new Date(Date.now() - STALE_TOTAL_MS);
    await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.updateMany({
        where: {
            status: {
                in: [
                    'pending',
                    'processing'
                ]
            },
            OR: [
                {
                    updatedAt: {
                        lt: new Date(Date.now() - ZOMBIE_FAIL_MS)
                    }
                },
                {
                    createdAt: {
                        lt: totalCutoff
                    }
                }
            ]
        },
        data: {
            status: 'error',
            error: 'Extraction did not complete (it was interrupted or the AI service was rate-limited for too long). Please try again — already-imported questions are skipped automatically.',
            finishedAt: new Date()
        }
    }).catch(()=>{});
    // ONE extraction on the whole server at a time (any user/guest id) — the
    // shared ZAI budget cannot feed two jobs without a 429 storm. EXCEPT:
    // if the existing "running" job has been in flight for > STALE_RUNNING_MS,
    // it's stuck (rate-limited forever, runner dead, etc.) and the user needs
    // to be able to start a new one. Don't block forever on a stuck job.
    const STALE_RUNNING_MS = 30 * 60000; // 30 min wall-clock
    const staleCutoff = new Date(Date.now() - STALE_RUNNING_MS);
    const running = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.count({
        where: {
            status: {
                in: [
                    'pending',
                    'processing'
                ]
            },
            createdAt: {
                gt: new Date(Date.now() - JOB_TTL_MS)
            },
            // Don't count jobs that have been "running" for more than 30 min —
            // those are stuck and shouldn't block new extractions.
            startedAt: {
                gt: staleCutoff
            }
        }
    });
    if (running >= MAX_RUNNING_GLOBAL) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Another extraction is still running — please wait for it to finish (a few minutes, at most ~20) and try again. Already-imported questions are skipped automatically.'
        }, {
            status: 429
        });
    }
    const total = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.count();
    if (total >= MAX_TOTAL_JOBS) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'The server is busy with too many extractions right now. Please retry in a minute.'
        }, {
            status: 503
        });
    }
    const job = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.create({
        data: {
            userId,
            fileName: uploadFileName && uploadFileName.trim() ? uploadFileName.trim().slice(0, 200) : 'pasted text',
            status: 'pending',
            text,
            maxQuestions,
            ...images.length > 0 ? {
                imagesJson: JSON.stringify(images)
            } : {}
        }
    });
    // Fire-and-continue (Knowledge-Library pattern): runJob never rejects.
    void runJob(job.id, req).catch(()=>{});
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        jobId: job.id
    }, {
        status: 202
    });
});
const GET = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_7__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_6__/* .resolveUserId */ .n$)();
    if (!userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'User not found'
    }, {
        status: 401
    });
    const jobId = new URL(req.url).searchParams.get('jobId');
    if (!jobId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'Missing jobId'
    }, {
        status: 400
    });
    let job = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.findUnique({
        where: {
            id: jobId
        }
    });
    if (!job || job.userId !== userId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Extraction job not found — it may have expired. Please try again.'
        }, {
            status: 404
        });
    }
    // ── Fast resume: a PAUSED (or restart-orphaned) job — status processing,
    //  no heartbeat for FAST_RESUME_MS, not LIVE in this process — is claimed
    //  at the DB level and re-kicked into a NEW PASS over only the still-
    //  pending chunks (completed chunks are already persisted in chunkResults
    //  and are never re-extracted). The DB-level claim keeps concurrent polls
    //  from double-starting, and the LIVE set guards within this process. ──
    if (job.status === 'pending' || job.status === 'processing') {
        // Zombie first: too old overall AND not live here → repeated resumes have
        // not saved it. Fail it honestly instead of resume-looping forever (each
        // resume resets startedAt, so this only trips when resumes keep dying).
        // ALSO: settle if the job has been in flight (createdAt) for more than
        // 1 hour — even with successful resumes that keep resetting startedAt,
        // a job that's been "processing" for an hour is definitely stuck and
        // needs to be settled so the global single-job slot is released.
        const STALE_TOTAL_MS = 60 * 60000; // 1 hour wall-clock from createdAt
        const totalAge = Date.now() - job.createdAt.getTime();
        const isZombieByStartedAt = job.startedAt.getTime() < Date.now() - ZOMBIE_FAIL_MS;
        const isZombieByCreatedAt = totalAge > STALE_TOTAL_MS;
        if ((isZombieByStartedAt || isZombieByCreatedAt) && !LIVE.has(jobId)) {
            const reason = isZombieByCreatedAt ? `extraction has been running for ${Math.round(totalAge / 60000)} min (limit: ${Math.round(STALE_TOTAL_MS / 60000)} min)` : `started ${Math.round((Date.now() - job.startedAt.getTime()) / 60000)} min ago`;
            console.warn(`[Question Extract] failing zombie job ${jobId} (${reason})`);
            await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
                where: {
                    id: jobId
                },
                data: {
                    status: 'error',
                    error: 'This extraction could not complete — the AI service was unavailable for too long. Please try again; already-imported questions are skipped automatically.',
                    finishedAt: new Date()
                }
            }).catch(()=>{});
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                status: 'error',
                error: 'This extraction could not complete — the AI service was unavailable for too long. Please try again; already-imported questions are skipped automatically.'
            });
        }
        const staleBefore = new Date(Date.now() - FAST_RESUME_MS);
        if (job.updatedAt < staleBefore && !LIVE.has(jobId)) {
            const claimed = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.updateMany({
                where: {
                    id: jobId,
                    updatedAt: {
                        lt: staleBefore
                    },
                    status: {
                        in: [
                            'pending',
                            'processing'
                        ]
                    }
                },
                data: {
                    status: 'processing'
                }
            });
            if (claimed.count === 1) {
                console.log(`[Question Extract] fast-resuming paused job ${jobId} into a new pass`);
                void runJob(jobId, req).catch(()=>{});
                job = {
                    ...job,
                    status: 'processing',
                    updatedAt: new Date()
                };
            }
        }
    }
    if (job.status === 'pending' || job.status === 'processing') {
        // Progress counts SETTLED chunks (from the persisted chunkResults),
        // never in-memory counters — plus the pass number so the UI can show
        // "resumed after a pause" when pass ≥ 2.
        const chunkResults = parseChunkResults(job.chunkResults);
        const settled = chunkResults.filter((r)=>r !== null).length;
        // If the VLM pass is running (progressTotal > 0 but no chunks yet — pass
        // 1 with images), surface the image count so the UI can show "analyzing N
        // images" instead of the misleading "0/0 chunks done".
        let imageCount = 0;
        if (job.imagesJson) {
            try {
                const parsed = JSON.parse(job.imagesJson);
                if (Array.isArray(parsed)) imageCount = parsed.length;
            } catch  {}
        }
        const vlmRunning = (job.passCount || 0) <= 1 && imageCount > 0 && chunkResults.length === 0;
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            status: 'running',
            startedAt: job.startedAt.getTime(),
            progress: {
                done: settled,
                total: job.progressTotal || chunkResults.length
            },
            pass: job.passCount || 1,
            serverUpdatedAt: job.updatedAt.getTime(),
            ...vlmRunning ? {
                vlm: {
                    images: imageCount,
                    done: job.progressDone || 0
                }
            } : {},
            ...imageCount > 0 ? {
                imageCount
            } : {}
        });
    }
    if (job.status === 'done') {
        let questions = [];
        try {
            const parsed = JSON.parse(job.questionsJson ?? '[]');
            if (Array.isArray(parsed)) questions = parsed;
        } catch  {}
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            status: 'done',
            questions,
            rawCount: job.rawCount ?? undefined,
            // Detector's independent count of question-like blocks in the source
            // text — lets the UI honestly compare "found N of ~M detected" (a big
            // gap means either similar-question dedupe or missed extractions).
            estimatedCount: estimateQuestionCount(job.text ?? ''),
            ...job.droppedChunks ? {
                droppedChunks: job.droppedChunks
            } : {}
        });
    }
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        status: 'error',
        error: job.error || 'AI extraction failed'
    });
});
const DELETE = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_7__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_6__/* .resolveUserId */ .n$)();
    if (!userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'User not found'
    }, {
        status: 401
    });
    const jobId = new URL(req.url).searchParams.get('jobId');
    if (!jobId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'Missing jobId'
    }, {
        status: 400
    });
    const job = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.findUnique({
        where: {
            id: jobId
        }
    });
    if (!job || job.userId !== userId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Extraction job not found'
        }, {
            status: 404
        });
    }
    // RUNNING job → mark as 'cancelled'. The LIVE runner will pick this up on
    // its next chunk boundary and exit cleanly. (We can't kill the in-flight
    // ZAI calls directly — they ignore AbortSignal — but the runner stops
    // starting new chunks and settles the row as 'cancelled' once the
    // current chunk completes. Settled rows can then be deleted on the next
    // DELETE call, or they TTL out after 24h.)
    if (job.status === 'pending' || job.status === 'processing') {
        CANCELLED.add(jobId); // signal the runner to stop after the current chunk/image
        await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.update({
            where: {
                id: jobId
            },
            data: {
                status: 'cancelled',
                error: 'Cancelled by the user.',
                finishedAt: new Date()
            }
        }).catch(()=>{});
        // Also drop the LIVE flag so a fast-resume poll doesn't re-kick it.
        LIVE.delete(jobId);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            cancelled: true
        });
    }
    if (job.status === 'cancelled') {
        // Already cancelled — allow the row to be deleted entirely now.
        await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.delete({
            where: {
                id: jobId
            }
        }).catch(()=>{});
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            deleted: true
        });
    }
    // Settled (done / error) — delete the row entirely.
    await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.importExtraction.delete({
        where: {
            id: jobId
        }
    });
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        deleted: true
    });
});

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

/***/ 822567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   De: () => (/* binding */ thresholdFor),
/* harmony export */   l6: () => (/* binding */ resolveAccessTier)
/* harmony export */ });
/* unused harmony exports VISITOR_THRESHOLDS, classifyVisitor, rateLimitKey */
/**
 * visitor-strategy.ts — Stage 10 visitor strategy threshold table.
 *
 * ── Audit context ──
 * Before this module, all unauthenticated traffic was bucketed under the
 * shared `guest@medq.local` user record (see src/lib/guest-user.tsx) with a
 * `free` subscription. That meant EVERY visitor on the internet drew from
 * ONE free-tier daily quota — a single visitor could exhaust the limit for
 * all guests, and a coordinated attacker could trivially starve the pool.
 *
 * ── Strategy ──
 * Add an explicit `visitor` tier BELOW `free` for unauthenticated traffic,
 * with much tighter per-IP caps. Authenticated users keep their existing
 * free / premium / pro tier. The matrix below is the single source of truth
 * for "what can each tier do" — wired into the rate limiter and surfaced
 * to product via /api/visitor-strategy (so the marketing site can render a
 * comparison table without re-deriving the numbers).
 *
 * ── Why a separate tier (not a flag) ──
 * A visitor's caps are PER-IP (rate-limit.ts, key=`<category>:<ip>`), while
 * an authenticated user's caps are PER-USER (key=`<category>:<userId>`).
 * Splitting the tier makes that policy explicit at the call site instead
 * of hiding it behind "isGuest" branches scattered across routes.
 */ const VISITOR_THRESHOLDS = {
    visitor: {
        label: 'Visitor',
        isAnonymous: true,
        aiGenerationsPerDay: 2,
        tutorMessagesPerDay: 3,
        fileUploadMaxMb: 2,
        fileUploadsPerDay: 1,
        videoAnalysisAllowed: false,
        deepAgentAllowed: false,
        canSaveQuestions: false,
        canUploadToLibrary: false,
        adsLevel: 'full'
    },
    free: {
        label: 'Free',
        isAnonymous: false,
        aiGenerationsPerDay: 5,
        tutorMessagesPerDay: 10,
        // 50 MB — raised from 15 MB (2026-11-03): medical PDFs (textbook
        // chapters, clinical guidelines, case reports) routinely run 20-80
        // MB; 15 MB blocked the core use case. The tier hierarchy is
        // preserved by the OTHER caps (5 uploads/day vs premium's 100, no
        // deep-agent, full ads) so file size alone no longer gates real
        // medical documents.
        fileUploadMaxMb: 50,
        fileUploadsPerDay: 5,
        videoAnalysisAllowed: true,
        deepAgentAllowed: false,
        canSaveQuestions: true,
        canUploadToLibrary: true,
        adsLevel: 'full'
    },
    premium: {
        label: 'Premium',
        isAnonymous: false,
        aiGenerationsPerDay: 100,
        tutorMessagesPerDay: 100,
        // 80 MB — raised from 50 MB (2026-11-03) to keep a clear step above
        // the new free tier (50 MB) while staying below pro's absolute cap.
        fileUploadMaxMb: 80,
        fileUploadsPerDay: 100,
        videoAnalysisAllowed: true,
        deepAgentAllowed: true,
        canSaveQuestions: true,
        canUploadToLibrary: true,
        adsLevel: 'minimal'
    },
    pro: {
        label: 'Pro',
        isAnonymous: false,
        aiGenerationsPerDay: 999999,
        tutorMessagesPerDay: 999999,
        fileUploadMaxMb: 100,
        fileUploadsPerDay: 999999,
        videoAnalysisAllowed: true,
        deepAgentAllowed: true,
        canSaveQuestions: true,
        canUploadToLibrary: true,
        adsLevel: 'none'
    }
};
/**
 * Classify a request into its AccessTier. The classification is the single
 * decision point routes call before applying caps — keeps policy in one file.
 *
 *   - isGuestUser=true -> 'visitor' (regardless of any other field)
 *   - otherwise -> the user's subscription tier, defaulting to 'free'
 *
 * The caller is responsible for the actual anonymous check (session lookup,
 * guest-user comparison). We don't reach into the DB here so the function
 * stays pure and unit-testable.
 */ function classifyVisitor(opts) {
    if (opts.isGuestUser) return 'visitor';
    return opts.tier ?? 'free';
}
/**
 * Look up the threshold matrix entry for a tier. Throws on unknown tier
 * (which should be impossible because AccessTier is a closed union, but
 * this guards against runtime drift if VISITOR_THRESHOLDS is edited
 * without adding the matching key).
 */ function thresholdFor(tier) {
    const t = VISITOR_THRESHOLDS[tier];
    if (!t) {
        throw new Error(`Unknown access tier: ${tier}`);
    }
    return t;
}
/**
 * Rate-limit key for a given category. Visitors are keyed by IP (since they
 * have no user id), authenticated users by userId. This separation is what
 * makes the per-IP caps for visitors actually work.
 */ function rateLimitKey(opts) {
    if (opts.tier === 'visitor') {
        return `${opts.category}:ip:${opts.ip}`;
    }
    return `${opts.category}:user:${opts.userId ?? 'unknown'}`;
}
async function loadDb() {
    const mod = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 520903));
    return mod.db;
}
async function loadGuestResolver() {
    const mod = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 245187));
    return mod.getGuestUserId;
}
/**
 * Resolve the AccessTier for a given userId. Server-only (touches DB).
 *
 *   - If userId === guest user id → 'visitor'
 *   - Otherwise → look up subscription.tier; default to 'free' if missing
 *
 * Lazy-imports the db + guest-user modules so the pure helpers above stay
 * unit-testable without a DB or Next runtime.
 */ async function resolveAccessTier(userId) {
    const getGuestUserId = await loadGuestResolver();
    const guestId = await getGuestUserId();
    if (userId === guestId) return 'visitor';
    const db = await loadDb();
    const sub = await db.subscription.findUnique({
        where: {
            userId
        }
    });
    const tier = sub?.tier ?? 'free';
    return classifyVisitor({
        isGuestUser: false,
        tier
    });
}


/***/ }),

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 902381:
/***/ ((module) => {

module.exports = import("z-ai-web-dev-sdk");;

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 927910:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 932467:
/***/ ((module) => {

module.exports = require("node:http2");

/***/ }),

/***/ 937067:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 973024:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 977598:
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ 979428:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 986439:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,7774,1545,9567,859,2035,4007,7909,5566,8262,2901,736], () => (__webpack_exec__(221722)));
module.exports = __webpack_exports__;

})();