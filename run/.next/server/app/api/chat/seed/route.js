"use strict";
(() => {
var exports = {};
exports.id = 9484;
exports.ids = [9484];
exports.modules = {

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

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 288744:
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
        page: "/api/chat/seed/route",
        pathname: "/api/chat/seed",
        filename: "route",
        bundlePath: "app/api/chat/seed/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/chat/seed/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(507074),
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
    let srcPage = "/api/chat/seed/route";
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

/***/ 507074:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__]);
_lib_db__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


// POST /api/chat/seed - Seed demo friendships, chat rooms, and messages (ENRICHED)
async function POST() {
    try {
        // Find all demo users
        const student = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({
            where: {
                email: 'student@medq.com'
            }
        });
        const educator = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({
            where: {
                email: 'educator@medq.com'
            }
        });
        const admin = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({
            where: {
                email: 'admin@medq.com'
            }
        });
        const sarah = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({
            where: {
                email: 'sarah@medq.com'
            }
        });
        const ahmed = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({
            where: {
                email: 'ahmed@medq.com'
            }
        });
        const priya = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({
            where: {
                email: 'priya@medq.com'
            }
        });
        const james = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({
            where: {
                email: 'james@medq.com'
            }
        });
        const maria = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({
            where: {
                email: 'maria@medq.com'
            }
        });
        if (!student || !educator || !admin) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Core demo users not found. Run /api/seed-demo first.'
            }, {
                status: 400
            });
        }
        const allUsers = [
            student,
            educator,
            admin,
            sarah,
            ahmed,
            priya,
            james,
            maria
        ].filter(Boolean);
        const results = {
            friendships: 0,
            directRooms: 0,
            directMessages: 0,
            groupRooms: 0,
            groupMessages: 0,
            reactions: 0,
            systemMessages: 0,
            pollMessages: 0,
            pinnedMessages: 0,
            skipped: []
        };
        // ═══════════════════════════════════════════════════════════
        // 1. Create Friendships (all accepted, every pair)
        // ═══════════════════════════════════════════════════════════
        const coreFriendships = [
            {
                senderId: student.id,
                receiverId: educator.id
            },
            {
                senderId: student.id,
                receiverId: admin.id
            },
            {
                senderId: educator.id,
                receiverId: admin.id
            }
        ];
        const extendedFriendships = [];
        if (sarah) {
            extendedFriendships.push({
                senderId: student.id,
                receiverId: sarah.id
            }, {
                senderId: educator.id,
                receiverId: sarah.id
            }, {
                senderId: sarah.id,
                receiverId: admin.id
            });
        }
        if (ahmed) {
            extendedFriendships.push({
                senderId: student.id,
                receiverId: ahmed.id
            }, {
                senderId: educator.id,
                receiverId: ahmed.id
            }, {
                senderId: ahmed.id,
                receiverId: admin.id
            });
        }
        if (priya) {
            extendedFriendships.push({
                senderId: student.id,
                receiverId: priya.id
            }, {
                senderId: priya.id,
                receiverId: educator.id
            }, {
                senderId: priya.id,
                receiverId: admin.id
            });
        }
        if (james) {
            extendedFriendships.push({
                senderId: james.id,
                receiverId: student.id
            }, {
                senderId: james.id,
                receiverId: educator.id
            }, {
                senderId: james.id,
                receiverId: admin.id
            });
        }
        if (maria) {
            extendedFriendships.push({
                senderId: maria.id,
                receiverId: student.id
            }, {
                senderId: maria.id,
                receiverId: educator.id
            }, {
                senderId: maria.id,
                receiverId: admin.id
            });
        }
        if (sarah && ahmed) extendedFriendships.push({
            senderId: sarah.id,
            receiverId: ahmed.id
        });
        if (sarah && priya) extendedFriendships.push({
            senderId: sarah.id,
            receiverId: priya.id
        });
        if (ahmed && james) extendedFriendships.push({
            senderId: ahmed.id,
            receiverId: james.id
        });
        if (priya && maria) extendedFriendships.push({
            senderId: priya.id,
            receiverId: maria.id
        });
        if (james && sarah) extendedFriendships.push({
            senderId: james.id,
            receiverId: sarah.id
        });
        if (maria && ahmed) extendedFriendships.push({
            senderId: maria.id,
            receiverId: ahmed.id
        });
        const allFriendships = [
            ...coreFriendships,
            ...extendedFriendships
        ];
        for (const pair of allFriendships){
            try {
                await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.friendship.upsert({
                    where: {
                        senderId_receiverId: {
                            senderId: pair.senderId,
                            receiverId: pair.receiverId
                        }
                    },
                    update: {
                        status: 'accepted'
                    },
                    create: {
                        senderId: pair.senderId,
                        receiverId: pair.receiverId,
                        status: 'accepted'
                    }
                });
                results.friendships++;
            } catch  {
                results.skipped.push(`friendship ${pair.senderId}->${pair.receiverId}`);
            }
        }
        const directPairs = [
            {
                user1: student,
                user2: educator,
                messages: [
                    {
                        senderId: student.id,
                        content: "Hey! How's your cardiology revision going?",
                        minutesAgo: 7 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: "Pretty good! Just finished reviewing the cardiac cycle. The Wiggers diagram finally makes sense 😅",
                        minutesAgo: 7 * 24 * 60 - 3
                    },
                    {
                        senderId: student.id,
                        content: "The mnemonics for the cranial nerves are finally sticking!",
                        minutesAgo: 5 * 24 * 60 + 120
                    },
                    {
                        senderId: educator.id,
                        content: "Oh nice! 'Oh Oh Oh To Touch And Feel Very Good Velvet, AH!' never fails 😂",
                        minutesAgo: 5 * 24 * 60 + 115
                    },
                    {
                        senderId: student.id,
                        content: "Have you tried the new practice questions on pharmacology?",
                        minutesAgo: 3 * 24 * 60 + 60
                    },
                    {
                        senderId: educator.id,
                        content: "Yes! The ones on autonomic drugs are really well made. Great for USMLE prep.",
                        minutesAgo: 3 * 24 * 60 + 55
                    },
                    {
                        senderId: student.id,
                        content: "That clinical case simulator is really helpful for differential diagnosis",
                        minutesAgo: 2 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: "Definitely. The branching logic really makes you think through the decision tree",
                        minutesAgo: 2 * 24 * 60 - 5
                    },
                    {
                        senderId: student.id,
                        content: "Quick question: what's the mechanism of action of aspirin again?",
                        minutesAgo: 45
                    },
                    {
                        senderId: educator.id,
                        content: "Irreversibly inhibits COX-1, reducing thromboxane A2 production → decreased platelet aggregation. Remember: it's COX-1 selective at low doses!",
                        minutesAgo: 40,
                        isPinned: true
                    },
                    {
                        senderId: student.id,
                        content: "That's right! Low dose = antiplatelet, high dose = anti-inflammatory. Thanks! 🙏",
                        minutesAgo: 35
                    }
                ]
            },
            {
                user1: student,
                user2: admin,
                messages: [
                    {
                        senderId: admin.id,
                        content: "Welcome to MedQ! Let me know if you need any help getting started 🏥",
                        minutesAgo: 6 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Thanks! The platform looks amazing. Love the flashcard spaced repetition feature!",
                        minutesAgo: 6 * 24 * 60 - 10
                    },
                    {
                        senderId: admin.id,
                        content: "Glad you like it! We're adding new features every week",
                        minutesAgo: 4 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "I noticed the study planner is really useful for organizing my exam prep",
                        minutesAgo: 4 * 24 * 60 - 5
                    },
                    {
                        senderId: admin.id,
                        content: "That's one of our most popular features. Have you tried the daily challenge?",
                        minutesAgo: 2 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Not yet, but I'll definitely check it out today!",
                        minutesAgo: 30
                    }
                ]
            },
            {
                user1: educator,
                user2: admin,
                messages: [
                    {
                        senderId: admin.id,
                        content: "Dr. Educator, your question submissions have been excellent! 🌟",
                        minutesAgo: 5 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: "Thank you! I try to make them clinically relevant and challenging",
                        minutesAgo: 5 * 24 * 60 - 15
                    },
                    {
                        senderId: admin.id,
                        content: "The students are really engaging with your cardiology questions in particular",
                        minutesAgo: 3 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: "That's great to hear. I'm working on a new set for respiratory physiology next",
                        minutesAgo: 3 * 24 * 60 - 10
                    },
                    {
                        senderId: admin.id,
                        content: "Looking forward to it! Your explanations are always top-notch",
                        minutesAgo: 1 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: "I believe good explanations are just as important as the questions themselves",
                        minutesAgo: 1 * 24 * 60 - 5
                    }
                ]
            }
        ];
        // Add direct chats for new users
        if (sarah) {
            directPairs.push({
                user1: student,
                user2: sarah,
                messages: [
                    {
                        senderId: sarah.id,
                        content: "Hey! I saw you're studying cardiology too. Want to review together?",
                        minutesAgo: 4 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "That would be great! I'm struggling with ECG interpretation 😅",
                        minutesAgo: 4 * 24 * 60 - 10
                    },
                    {
                        senderId: sarah.id,
                        content: "ECG is all about pattern recognition. Try the 1-2-3 rule for MI localization",
                        minutesAgo: 3 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "That's helpful! I'll practice with the cardiology question bank",
                        minutesAgo: 2 * 24 * 60
                    },
                    {
                        senderId: sarah.id,
                        content: "The neuroanatomy questions are my favorite. The brain pathways are like a maze 🧠",
                        minutesAgo: 20
                    }
                ]
            }, {
                user1: educator,
                user2: sarah,
                messages: [
                    {
                        senderId: educator.id,
                        content: "Sarah, your neurology knowledge is impressive! Have you considered creating some questions?",
                        minutesAgo: 3 * 24 * 60
                    },
                    {
                        senderId: sarah.id,
                        content: "I'd love to! I have some great clinical vignettes from my neurology rotation",
                        minutesAgo: 3 * 24 * 60 - 5
                    },
                    {
                        senderId: educator.id,
                        content: "Perfect! The platform could use more neuro questions. Especially stroke localization",
                        minutesAgo: 2 * 24 * 60
                    }
                ]
            });
        }
        if (ahmed) {
            directPairs.push({
                user1: student,
                user2: ahmed,
                messages: [
                    {
                        senderId: ahmed.id,
                        content: "Salaam! I heard you're prepping for exams. How's it going?",
                        minutesAgo: 5 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Hey Dr. Ahmed! Going well, but emergency medicine always catches me off guard",
                        minutesAgo: 5 * 24 * 60 - 10
                    },
                    {
                        senderId: ahmed.id,
                        content: "EM is all about ABCDE - Airway, Breathing, Circulation, Disability, Exposure. Always start there!",
                        minutesAgo: 3 * 24 * 60,
                        isPinned: true
                    },
                    {
                        senderId: student.id,
                        content: "That's a great reminder. The triage scenarios are tricky though",
                        minutesAgo: 2 * 24 * 60
                    },
                    {
                        senderId: ahmed.id,
                        content: "Practice makes perfect. I'll try to add more EM questions to the bank 🚑",
                        minutesAgo: 15
                    }
                ]
            });
        }
        if (priya) {
            directPairs.push({
                user1: student,
                user2: priya,
                messages: [
                    {
                        senderId: priya.id,
                        content: "Hi! I love your study notes on the platform. Very organized!",
                        minutesAgo: 4 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Thanks Priya! Your mnemonics for pediatric milestones are lifesavers 🙏",
                        minutesAgo: 4 * 24 * 60 - 10
                    },
                    {
                        senderId: priya.id,
                        content: "Haha thanks! I have a whole collection. Want to trade mnemonics?",
                        minutesAgo: 2 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Absolutely! I'll share my cardio ones for your peds ones",
                        minutesAgo: 10
                    }
                ]
            });
        }
        if (james) {
            directPairs.push({
                user1: student,
                user2: james,
                messages: [
                    {
                        senderId: james.id,
                        content: "Greetings from Edinburgh! How's the USMLE prep going?",
                        minutesAgo: 5 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Hey James! Slowly but surely. How about PLAB?",
                        minutesAgo: 5 * 24 * 60 - 15
                    },
                    {
                        senderId: james.id,
                        content: "Making progress! The surgical questions are my strong suit",
                        minutesAgo: 3 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Lucky you! Surgery always confuses me with all the different approaches",
                        minutesAgo: 25
                    }
                ]
            });
        }
        if (maria) {
            directPairs.push({
                user1: student,
                user2: maria,
                messages: [
                    {
                        senderId: maria.id,
                        content: "Olá! 👋 I'm Maria, OB/GYN enthusiast from Brazil!",
                        minutesAgo: 6 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Hi Maria! Welcome to MedQ! OB/GYN is fascinating",
                        minutesAgo: 6 * 24 * 60 - 10
                    },
                    {
                        senderId: maria.id,
                        content: "It really is! Especially fetal development - it's like watching a miracle unfold 👶",
                        minutesAgo: 4 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Any tips for remembering the stages of labor?",
                        minutesAgo: 2 * 24 * 60
                    },
                    {
                        senderId: maria.id,
                        content: "Stage 1: dilation, Stage 2: delivery, Stage 3: placenta. Think 'DDP' like a dance move! 💃",
                        minutesAgo: 5
                    }
                ]
            });
        }
        for (const pair of directPairs){
            // Check if direct room already exists between these two users
            const existingRoom = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.findFirst({
                where: {
                    type: 'direct',
                    members: {
                        every: {
                            userId: {
                                in: [
                                    pair.user1.id,
                                    pair.user2.id
                                ]
                            }
                        }
                    }
                }
            });
            if (existingRoom) {
                results.skipped.push(`direct room ${pair.user1.name}-${pair.user2.name}`);
                continue;
            }
            // Create direct room
            const room = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.create({
                data: {
                    type: 'direct',
                    lastMessageAt: new Date(),
                    members: {
                        create: [
                            {
                                userId: pair.user1.id,
                                role: 'member'
                            },
                            {
                                userId: pair.user2.id,
                                role: 'member'
                            }
                        ]
                    }
                }
            });
            results.directRooms++;
            // Create sample messages with varied timestamps
            const now = Date.now();
            const createdMsgIds = [];
            for(let i = 0; i < pair.messages.length; i++){
                const msg = pair.messages[i];
                const minutesAgo = msg.minutesAgo ?? (pair.messages.length - i) * 5;
                const timestamp = new Date(now - minutesAgo * 60 * 1000);
                const replyToId = msg.replyToIndex !== undefined ? createdMsgIds[msg.replyToIndex] : null;
                const created = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.create({
                    data: {
                        roomId: room.id,
                        senderId: msg.senderId,
                        content: msg.content,
                        type: msg.type || 'text',
                        metadata: JSON.stringify(msg.metadata || {}),
                        isPinned: msg.isPinned || false,
                        replyToId,
                        createdAt: timestamp
                    }
                });
                createdMsgIds.push(created.id);
                results.directMessages++;
                if (msg.isPinned) results.pinnedMessages++;
            }
            // Update lastMessageAt to match the most recent message
            const lastMinutesAgo = pair.messages[pair.messages.length - 1]?.minutesAgo ?? 5;
            await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.update({
                where: {
                    id: room.id
                },
                data: {
                    lastMessageAt: new Date(now - lastMinutesAgo * 60 * 1000)
                }
            });
            // Set different lastReadAt for members
            // Student reads some chats recently, others days ago
            const studentMember = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.findUnique({
                where: {
                    roomId_userId: {
                        roomId: room.id,
                        userId: student.id
                    }
                }
            });
            if (studentMember) {
                // Read half the conversations recently, others less recently
                const readOffset = results.directRooms % 2 === 0 ? 60 : 3 * 24 * 60; // alternate between recent and days ago
                await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.update({
                    where: {
                        id: studentMember.id
                    },
                    data: {
                        lastReadAt: new Date(now - readOffset * 60 * 1000)
                    }
                });
            }
        }
        // ═══════════════════════════════════════════════════════════
        // 3. Create Group Chat Rooms (ENRICHED)
        // ═══════════════════════════════════════════════════════════
        const groupMemberIds = allUsers.map((u)=>u.id);
        const groupRooms = [
            {
                name: 'Cardio Study Group',
                avatar: '🫀',
                description: 'Cardiovascular system study discussions',
                createdBy: educator.id,
                messages: [
                    {
                        senderId: educator.id,
                        content: 'Welcome to the Cardio Study Group! 💪',
                        minutesAgo: 7 * 24 * 60,
                        type: 'system'
                    },
                    {
                        senderId: educator.id,
                        content: 'Just finished reviewing the cardiac cycle - the Wiggers diagram finally makes sense',
                        minutesAgo: 6 * 24 * 60 + 120
                    },
                    {
                        senderId: student.id,
                        content: "Remember: S1 = AV valves closing, S2 = Semilunar valves closing",
                        minutesAgo: 6 * 24 * 60 + 60
                    },
                    {
                        senderId: admin.id,
                        content: "Great mnemonic! I always add: S1 = 'Mitral Tricuspid' (lub), S2 = 'Aortic Pulmonic' (dub)",
                        minutesAgo: 6 * 24 * 60
                    },
                    ...sarah ? [
                        {
                            senderId: sarah.id,
                            content: "From a neuro perspective - remember the cardiac reflexes! The vagus nerve is key 🧠",
                            minutesAgo: 5 * 24 * 60 + 180
                        }
                    ] : [],
                    {
                        senderId: educator.id,
                        content: 'Can someone explain the difference between preload and afterload?',
                        minutesAgo: 5 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: 'Preload = ventricular stretch at end of diastole (volume). Afterload = resistance the ventricle must overcome to eject blood',
                        minutesAgo: 5 * 24 * 60 - 10,
                        replyToIndex: 5
                    },
                    {
                        senderId: admin.id,
                        content: "Think of preload as how much you're stretching a rubber band. Afterload is how heavy the door is that you're pushing open",
                        minutesAgo: 4 * 24 * 60 + 60
                    },
                    ...ahmed ? [
                        {
                            senderId: ahmed.id,
                            content: "In the ER, we always check afterload first in heart failure patients - it's the most actionable parameter 🚑",
                            minutesAgo: 4 * 24 * 60,
                            replyToIndex: 5
                        }
                    ] : [],
                    {
                        senderId: educator.id,
                        content: 'Perfect analogy! 🔥 Frank-Starling law relates preload to stroke volume',
                        minutesAgo: 3 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "Don't forget: increased afterload → decreased stroke volume → increased O2 demand → worse heart failure",
                        minutesAgo: 3 * 24 * 60 - 30,
                        isPinned: true
                    },
                    {
                        senderId: admin.id,
                        content: 'Pro tip: the best way to remember cardiac output = HR × SV, and SV = EDV - ESV',
                        minutesAgo: 2 * 24 * 60
                    },
                    // Poll message
                    {
                        senderId: educator.id,
                        content: 'Which artery is most commonly occluded in MI?',
                        minutesAgo: 1 * 24 * 60,
                        type: 'poll',
                        metadata: {
                            poll: {
                                question: 'Which artery is most commonly occluded in MI?',
                                options: [
                                    'LAD',
                                    'RCA',
                                    'LCx',
                                    'PDA'
                                ],
                                isMultiChoice: false,
                                isAnonymous: false,
                                votes: {
                                    '0': [
                                        student.id,
                                        ahmed?.id
                                    ].filter(Boolean),
                                    '1': [
                                        sarah?.id
                                    ].filter(Boolean),
                                    '2': [],
                                    '3': []
                                }
                            },
                            reactions: []
                        }
                    },
                    {
                        senderId: student.id,
                        content: 'LAD is the correct answer! Also known as the "widowmaker" when proximal 🫀',
                        minutesAgo: 1 * 24 * 60 - 30
                    },
                    {
                        senderId: educator.id,
                        content: 'Exactly! The LAD supplies ~50% of the left ventricle. Proximal occlusion = poor prognosis',
                        minutesAgo: 45
                    },
                    {
                        senderId: student.id,
                        content: 'Thanks for the great discussion everyone! 🎉',
                        minutesAgo: 5
                    }
                ]
            },
            {
                name: 'MedQ General',
                avatar: '🏥',
                description: 'General medical discussions',
                createdBy: admin.id,
                messages: [
                    {
                        senderId: admin.id,
                        content: 'Welcome to MedQ General! 🏥 This is the place for all medical education discussions',
                        minutesAgo: 7 * 24 * 60,
                        type: 'system'
                    },
                    {
                        senderId: educator.id,
                        content: 'Happy to be here! Looking forward to great discussions',
                        minutesAgo: 7 * 24 * 60 - 30
                    },
                    {
                        senderId: student.id,
                        content: 'Excited to learn from everyone! 🎓',
                        minutesAgo: 6 * 24 * 60 + 180
                    },
                    ...sarah ? [
                        {
                            senderId: sarah.id,
                            content: "Hello everyone! Neuro nerd here - ask me anything about the brain! 🧠",
                            minutesAgo: 6 * 24 * 60 + 120
                        }
                    ] : [],
                    ...ahmed ? [
                        {
                            senderId: ahmed.id,
                            content: "Salaam everyone! EM doc from Cairo. Quick thinking saves lives! ⚡",
                            minutesAgo: 6 * 24 * 60 + 60
                        }
                    ] : [],
                    ...priya ? [
                        {
                            senderId: priya.id,
                            content: "Namaste! 🙏 Pediatrics is my passion. Let's make learning fun!",
                            minutesAgo: 6 * 24 * 60
                        }
                    ] : [],
                    ...james ? [
                        {
                            senderId: james.id,
                            content: "Cheers from Edinburgh! Surgery is my game 🔪",
                            minutesAgo: 5 * 24 * 60 + 180
                        }
                    ] : [],
                    ...maria ? [
                        {
                            senderId: maria.id,
                            content: "Olá from São Paulo! OB/GYN all the way! 👶",
                            minutesAgo: 5 * 24 * 60 + 120
                        }
                    ] : [],
                    {
                        senderId: admin.id,
                        content: "Fun fact: The average human body contains about 5 liters of blood, and the heart pumps all of it through the body once every minute!",
                        minutesAgo: 5 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: "Speaking of blood - anyone else find the coagulation cascade the hardest thing to memorize?",
                        minutesAgo: 4 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "The intrinsic pathway is the worst 😭 But 'Ten is In' (X→intrinsic) helps me remember",
                        minutesAgo: 4 * 24 * 60 - 20,
                        replyToIndex: 9
                    },
                    {
                        senderId: admin.id,
                        content: "My tip: Focus on the common pathway from Factor X onwards - that's where most exam questions hit",
                        minutesAgo: 3 * 24 * 60,
                        isPinned: true
                    },
                    {
                        senderId: educator.id,
                        content: "True! And warfarin affects the vitamin K-dependent factors: 2, 7, 9, 10 (remember: 1942 → 'War of 1942')",
                        minutesAgo: 2 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "That's a great mnemonic! I'll add that to my flashcards 📝",
                        minutesAgo: 1 * 24 * 60
                    },
                    // Poll
                    {
                        senderId: admin.id,
                        content: 'Which coagulation factor has the shortest half-life?',
                        minutesAgo: 30,
                        type: 'poll',
                        metadata: {
                            poll: {
                                question: 'Which coagulation factor has the shortest half-life?',
                                options: [
                                    'Factor II',
                                    'Factor VII',
                                    'Factor IX',
                                    'Factor X'
                                ],
                                isMultiChoice: false,
                                isAnonymous: false,
                                votes: {
                                    '0': [],
                                    '1': [
                                        student.id,
                                        educator.id
                                    ],
                                    '2': [],
                                    '3': []
                                }
                            },
                            reactions: []
                        }
                    },
                    {
                        senderId: educator.id,
                        content: 'Factor VII has the shortest half-life (~6 hours). That\'s why INR rises first with warfarin!',
                        minutesAgo: 20,
                        replyToIndex: 13
                    },
                    {
                        senderId: student.id,
                        content: 'Makes sense! That\'s why bridge therapy with heparin is needed 🧬',
                        minutesAgo: 5
                    }
                ]
            },
            {
                name: 'Neuro Study Group',
                avatar: '🧠',
                description: 'Neurology and neuroanatomy discussions',
                createdBy: sarah?.id || educator.id,
                messages: [
                    {
                        senderId: sarah?.id || educator.id,
                        content: 'Welcome to the Neuro Study Group! 🧠 Where the brain is the main focus!',
                        minutesAgo: 6 * 24 * 60,
                        type: 'system'
                    },
                    {
                        senderId: sarah?.id || student.id,
                        content: "Let's start with cranial nerves - who has the best mnemonic?",
                        minutesAgo: 6 * 24 * 60 - 10
                    },
                    {
                        senderId: student.id,
                        content: "Oh Oh Oh To Touch And Feel Very Good Velvet, AH! for CN I-XII",
                        minutesAgo: 5 * 24 * 60 + 180,
                        isPinned: true
                    },
                    {
                        senderId: sarah?.id || educator.id,
                        content: "For nuclei: 'Messy Marge Serves Visiting Vendors Lemon And Ham' = Mesencephalic, Main, Spinal, Visceral, Ventral, Lateral, Alar, Horn",
                        minutesAgo: 5 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: "Don't forget: CN III, IV, VI control eye movements. CN IV is the only one that exits dorsally!",
                        minutesAgo: 4 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: "And CN IV (trochlear) innervates the superior oblique - 'you troch on the side of your nose'",
                        minutesAgo: 4 * 24 * 60 - 30,
                        replyToIndex: 4
                    },
                    {
                        senderId: sarah?.id || educator.id,
                        content: "Stroke localization is crucial for exams. MCA = face + arm, ACA = leg, PCA = visual",
                        minutesAgo: 3 * 24 * 60,
                        isPinned: true
                    },
                    {
                        senderId: educator.id,
                        content: "Great point! And always remember: same-side weakness, opposite-side lesion (for motor cortex)",
                        minutesAgo: 2 * 24 * 60
                    },
                    // Poll
                    {
                        senderId: sarah?.id || educator.id,
                        content: 'Which cranial nerve is most commonly affected in Bell\'s palsy?',
                        minutesAgo: 1 * 24 * 60,
                        type: 'poll',
                        metadata: {
                            poll: {
                                question: "Which cranial nerve is most commonly affected in Bell's palsy?",
                                options: [
                                    'CN V (Trigeminal)',
                                    'CN VII (Facial)',
                                    'CN IX (Glossopharyngeal)',
                                    'CN XII (Hypoglossal)'
                                ],
                                isMultiChoice: false,
                                isAnonymous: false,
                                votes: {
                                    '0': [],
                                    '1': [
                                        student.id,
                                        educator.id,
                                        ahmed?.id
                                    ].filter(Boolean),
                                    '2': [],
                                    '3': []
                                }
                            },
                            reactions: []
                        }
                    },
                    {
                        senderId: student.id,
                        content: 'CN VII of course! It\'s a lower motor neuron lesion of the facial nerve 🧠',
                        minutesAgo: 30
                    },
                    {
                        senderId: educator.id,
                        content: 'Correct! Remember: UMN spares the forehead (bilateral cortical representation), LMN affects entire ipsilateral face',
                        minutesAgo: 10
                    }
                ]
            },
            {
                name: 'Emergency Medicine',
                avatar: '🚑',
                description: 'Emergency medicine cases and discussions',
                createdBy: ahmed?.id || educator.id,
                messages: [
                    {
                        senderId: ahmed?.id || educator.id,
                        content: 'Welcome to EM Cases! 🚑 Real scenarios, real decisions',
                        minutesAgo: 5 * 24 * 60,
                        type: 'system'
                    },
                    {
                        senderId: ahmed?.id || educator.id,
                        content: "Case: 55yo M, chest pain, diaphoretic. What's your first step?",
                        minutesAgo: 5 * 24 * 60 - 10
                    },
                    {
                        senderId: student.id,
                        content: "ABCs first! Then ECG within 10 minutes",
                        minutesAgo: 4 * 24 * 60 + 120,
                        replyToIndex: 1
                    },
                    {
                        senderId: ahmed?.id || educator.id,
                        content: "Correct! Time is muscle. MONA = Morphine, Oxygen, Nitro, Aspirin",
                        minutesAgo: 4 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: "Actually, current guidelines de-emphasize morphine. Focus on dual antiplatelet therapy and PCI",
                        minutesAgo: 3 * 24 * 60
                    },
                    {
                        senderId: ahmed?.id || educator.id,
                        content: "Great update! Evidence-based medicine matters. Always check the latest guidelines",
                        minutesAgo: 3 * 24 * 60 - 20,
                        replyToIndex: 4
                    },
                    {
                        senderId: student.id,
                        content: "What about the HEART score for chest pain risk stratification?",
                        minutesAgo: 2 * 24 * 60
                    },
                    {
                        senderId: ahmed?.id || educator.id,
                        content: "Excellent! H-History, E-ECG, A-Age, R-Risk factors, T-Troponin. Score 0-3 = low risk, 4-6 = observe, 7-10 = intervene",
                        minutesAgo: 2 * 24 * 60 - 30,
                        isPinned: true
                    },
                    {
                        senderId: educator.id,
                        content: 'Another EM pearl: in trauma, always check for ABCDE then do a secondary survey. Don\'t get distracted by obvious injuries!',
                        minutesAgo: 1 * 24 * 60
                    },
                    // Poll
                    {
                        senderId: ahmed?.id || educator.id,
                        content: 'What is the most common presentation of aortic dissection?',
                        minutesAgo: 3 * 60,
                        type: 'poll',
                        metadata: {
                            poll: {
                                question: 'What is the most common presentation of aortic dissection?',
                                options: [
                                    'Tearing chest pain radiating to back',
                                    'Crushing substernal chest pain',
                                    'Sharp pleuritic chest pain',
                                    'Dyspnea with hemoptysis'
                                ],
                                isMultiChoice: false,
                                isAnonymous: false,
                                votes: {
                                    '0': [
                                        student.id,
                                        educator.id
                                    ],
                                    '1': [],
                                    '2': [],
                                    '3': []
                                }
                            },
                            reactions: []
                        }
                    },
                    {
                        senderId: student.id,
                        content: 'Tearing pain radiating to the back! Classic Stanford Type A presentation 🚑',
                        minutesAgo: 1 * 60
                    }
                ]
            },
            // ═══════════ NEW GROUP ROOMS ═══════════
            {
                name: 'Pathology Club',
                avatar: '🔬',
                description: 'Pathology discussions with slide descriptions and case correlations',
                createdBy: educator.id,
                messages: [
                    {
                        senderId: educator.id,
                        content: 'Welcome to Pathology Club! 🔬 Where every slide tells a story',
                        minutesAgo: 7 * 24 * 60,
                        type: 'system'
                    },
                    {
                        senderId: educator.id,
                        content: 'Let\'s start with the basics: inflammation! Remember the 5 cardinal signs - rubor (redness), tumor (swelling), calor (heat), dolor (pain), functio laesa (loss of function)',
                        minutesAgo: 6 * 24 * 60 + 180,
                        isPinned: true
                    },
                    {
                        senderId: student.id,
                        content: 'Those are the Celsus signs! And Virchow added functio laesa later, right?',
                        minutesAgo: 6 * 24 * 60 + 120,
                        replyToIndex: 1
                    },
                    {
                        senderId: educator.id,
                        content: 'Exactly! Now, acute vs chronic inflammation - what are the key cellular players?',
                        minutesAgo: 5 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: 'Acute = neutrophils. Chronic = lymphocytes, macrophages, plasma cells',
                        minutesAgo: 5 * 24 * 60 - 30
                    },
                    ...sarah ? [
                        {
                            senderId: sarah.id,
                            content: 'Don\'t forget granulomatous inflammation! Caseating (TB) vs non-caseating (sarcoidosis) 🔬',
                            minutesAgo: 4 * 24 * 60
                        }
                    ] : [],
                    {
                        senderId: educator.id,
                        content: 'Great point! Path slide tip: caseating granulomas have central necrosis that looks like cottage cheese',
                        minutesAgo: 4 * 24 * 60 - 15
                    },
                    {
                        senderId: student.id,
                        content: 'What about the difference between coagulative and liquefactive necrosis?',
                        minutesAgo: 3 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: 'Coagulative = tissue architecture preserved (classic in MI). Liquefactive = tissue destruction with pus (classic in brain infarcts and bacterial abscesses)',
                        minutesAgo: 3 * 24 * 60 - 20,
                        isPinned: true
                    },
                    ...ahmed ? [
                        {
                            senderId: ahmed.id,
                            content: 'In the ER, we see fat necrosis in acute pancreatitis - those chalky white spots on the pancreas are pathognomonic 🔬',
                            minutesAgo: 2 * 24 * 60
                        }
                    ] : [],
                    ...priya ? [
                        {
                            senderId: priya.id,
                            content: 'Pediatric pathology pearl: Wilms tumor has a characteristic "triphasic" pattern - blastemal, stromal, and epithelial cells 👶',
                            minutesAgo: 1 * 24 * 60
                        }
                    ] : [],
                    // Poll
                    {
                        senderId: educator.id,
                        content: 'Which type of necrosis is seen in TB?',
                        minutesAgo: 6 * 60,
                        type: 'poll',
                        metadata: {
                            poll: {
                                question: 'Which type of necrosis is seen in TB?',
                                options: [
                                    'Coagulative',
                                    'Liquefactive',
                                    'Caseous',
                                    'Fat necrosis'
                                ],
                                isMultiChoice: false,
                                isAnonymous: false,
                                votes: {
                                    '0': [],
                                    '1': [],
                                    '2': [
                                        student.id,
                                        sarah?.id
                                    ].filter(Boolean),
                                    '3': []
                                }
                            },
                            reactions: []
                        }
                    },
                    {
                        senderId: student.id,
                        content: 'Caseous necrosis! The "cheese-like" appearance is classic for TB 🔬',
                        minutesAgo: 3 * 60
                    }
                ]
            },
            {
                name: 'Pharmacology Study',
                avatar: '💊',
                description: 'Drug mechanisms, interactions, and clinical pharmacology discussions',
                createdBy: educator.id,
                messages: [
                    {
                        senderId: educator.id,
                        content: 'Welcome to Pharmacology Study! 💊 Know your drugs, know your patients',
                        minutesAgo: 7 * 24 * 60,
                        type: 'system'
                    },
                    {
                        senderId: educator.id,
                        content: 'Key concept: agonists vs antagonists. Full agonist = max response. Partial agonist = submax response even at full receptor occupancy. Antagonist = blocks the receptor',
                        minutesAgo: 6 * 24 * 60,
                        isPinned: true
                    },
                    {
                        senderId: student.id,
                        content: 'And competitive antagonists shift the curve right (increase EC50), while non-competitive shift it down (decrease Emax)!',
                        minutesAgo: 6 * 24 * 60 - 20,
                        replyToIndex: 1
                    },
                    {
                        senderId: educator.id,
                        content: 'Perfect! Now let\'s talk autonomic pharmacology. Sympathetic = fight or flight. Parasympathetic = rest and digest',
                        minutesAgo: 5 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: 'My trick: Sympathetic has "S" = Stress. Parasympathetic has "P" = Peace 😌',
                        minutesAgo: 5 * 24 * 60 - 15
                    },
                    ...ahmed ? [
                        {
                            senderId: ahmed.id,
                            content: 'In EM, we use epinephrine for cardiac arrest, anaphylaxis, and severe asthma. Know your doses! 1mg IV for cardiac, 0.3-0.5mg IM for anaphylaxis 💊',
                            minutesAgo: 4 * 24 * 60
                        }
                    ] : [],
                    {
                        senderId: educator.id,
                        content: 'Drug interactions review: CYP450 inducers = "CRAP GPS" (Carbamazepine, Rifampin, Alcohol/Phenobarbital, Griseofulvin, Phenytoin, St. John\'s Wort)',
                        minutesAgo: 3 * 24 * 60,
                        isPinned: true
                    },
                    {
                        senderId: student.id,
                        content: 'And inhibitors = "SICKFACE" (Sulfonamides, Isoniazid, Ketoconazole, Fluconazole, Alcohol acute, Cimetidine, Erythromycin)',
                        minutesAgo: 3 * 24 * 60 - 10,
                        replyToIndex: 6
                    },
                    ...priya ? [
                        {
                            senderId: priya.id,
                            content: 'Peds pharmacology reminder: children are NOT small adults! Different Vd, different metabolism, always weight-based dosing 🧮',
                            minutesAgo: 2 * 24 * 60
                        }
                    ] : [],
                    ...james ? [
                        {
                            senderId: james.id,
                            content: 'Surgical pharmacology: know your muscle relaxants! Succinylcholine = depolarizing (phase I block). Rocuronium = non-depolarizing',
                            minutesAgo: 1 * 24 * 60
                        }
                    ] : [],
                    // Poll
                    {
                        senderId: educator.id,
                        content: 'Which drug is a competitive antagonist at muscarinic receptors?',
                        minutesAgo: 2 * 60,
                        type: 'poll',
                        metadata: {
                            poll: {
                                question: 'Which drug is a competitive antagonist at muscarinic receptors?',
                                options: [
                                    'Neostigmine',
                                    'Atropine',
                                    'Pilocarpine',
                                    'Bethanechol'
                                ],
                                isMultiChoice: false,
                                isAnonymous: false,
                                votes: {
                                    '0': [],
                                    '1': [
                                        student.id,
                                        ahmed?.id
                                    ].filter(Boolean),
                                    '2': [],
                                    '3': []
                                }
                            },
                            reactions: []
                        }
                    },
                    {
                        senderId: student.id,
                        content: 'Atropine! "Atropine blocks everything wet" - dry mouth, dry eyes, constipation, urinary retention 💊',
                        minutesAgo: 1 * 60
                    }
                ]
            },
            {
                name: 'OSCE Practice',
                avatar: '🩺',
                description: 'Clinical skills practice, OSCE stations, and communication tips',
                createdBy: educator.id,
                messages: [
                    {
                        senderId: educator.id,
                        content: 'Welcome to OSCE Practice! 🩺 Master your clinical skills',
                        minutesAgo: 6 * 24 * 60,
                        type: 'system'
                    },
                    {
                        senderId: educator.id,
                        content: 'OSCE tip #1: Always wash your hands before and after patient contact. It\'s an automatic fail if you forget!',
                        minutesAgo: 6 * 24 * 60 - 10,
                        isPinned: true
                    },
                    {
                        senderId: student.id,
                        content: 'And always introduce yourself: "Hello, I\'m [name], I\'m a medical student. Can I confirm your name and date of birth?"',
                        minutesAgo: 5 * 24 * 60 + 120
                    },
                    {
                        senderId: educator.id,
                        content: 'Perfect! Now let\'s practice cardiovascular examination. What\'s the correct sequence?',
                        minutesAgo: 5 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: 'Inspection → Palpation → Percussion → Auscultation. Always in that order!',
                        minutesAgo: 5 * 24 * 60 - 15,
                        replyToIndex: 3
                    },
                    ...sarah ? [
                        {
                            senderId: sarah.id,
                            content: 'For neuro OSCEs: always document GCS, pupil size and reactivity, and limb power (MRC scale 0-5) 🧠',
                            minutesAgo: 4 * 24 * 60
                        }
                    ] : [],
                    ...ahmed ? [
                        {
                            senderId: ahmed.id,
                            content: 'Emergency OSCE: ABCDE assessment is crucial. Expose the patient but maintain dignity. Communicate findings clearly 🚑',
                            minutesAgo: 4 * 24 * 60 - 20
                        }
                    ] : [],
                    {
                        senderId: educator.id,
                        content: 'Communication station tip: use the Calgary-Cambridge framework. Build rapport, gather info, explain, plan, close 🩺',
                        minutesAgo: 3 * 24 * 60
                    },
                    ...maria ? [
                        {
                            senderId: maria.id,
                            content: 'OB/GYN OSCE: always offer a chaperone for intimate examinations. Document consent! 👶',
                            minutesAgo: 2 * 24 * 60
                        }
                    ] : [],
                    {
                        senderId: student.id,
                        content: 'What about breaking bad news? SPIKES protocol is gold standard',
                        minutesAgo: 1 * 24 * 60
                    },
                    {
                        senderId: educator.id,
                        content: 'SPIKES: Setting, Perception, Invitation, Knowledge, Emotions, Strategy/Summary. Practice it until it\'s natural!',
                        minutesAgo: 1 * 24 * 60 - 10,
                        isPinned: true
                    },
                    // Poll
                    {
                        senderId: educator.id,
                        content: 'What is the most important first step in any OSCE station?',
                        minutesAgo: 4 * 60,
                        type: 'poll',
                        metadata: {
                            poll: {
                                question: 'What is the most important first step in any OSCE station?',
                                options: [
                                    'Read the instructions carefully',
                                    'Wash your hands',
                                    'Introduce yourself',
                                    'Start the examination'
                                ],
                                isMultiChoice: false,
                                isAnonymous: false,
                                votes: {
                                    '0': [
                                        student.id,
                                        educator.id
                                    ],
                                    '1': [],
                                    '2': [],
                                    '3': []
                                }
                            },
                            reactions: []
                        }
                    },
                    {
                        senderId: student.id,
                        content: 'Read the instructions! You need to know what you\'re being asked to do before anything else 🩺',
                        minutesAgo: 2 * 60
                    }
                ]
            },
            {
                name: 'Anatomy Lab',
                avatar: '🦴',
                description: 'Gross anatomy, dissection discussions, and clinical correlations',
                createdBy: educator.id,
                messages: [
                    {
                        senderId: educator.id,
                        content: 'Welcome to Anatomy Lab! 🦴 Where structure meets function',
                        minutesAgo: 7 * 24 * 60,
                        type: 'system'
                    },
                    {
                        senderId: educator.id,
                        content: 'Let\'s start with the thorax. The mediastinum is divided into superior and inferior (which is further divided into anterior, middle, and posterior)',
                        minutesAgo: 6 * 24 * 60 + 180
                    },
                    {
                        senderId: student.id,
                        content: 'The middle mediastinum contains the heart, pericardium, and phrenic nerve. Key surgical landmark!',
                        minutesAgo: 6 * 24 * 60 + 120
                    },
                    {
                        senderId: educator.id,
                        content: 'Important: the phrenic nerve (C3-C5) innervates the diaphragm and passes ANTERIOR to the lung root. Vagus nerve passes POSTERIOR',
                        minutesAgo: 5 * 24 * 60,
                        isPinned: true
                    },
                    {
                        senderId: student.id,
                        content: 'Mnemonic: "Phrenic is Anterior to the root, Vagus is behind" - PAV 🚗',
                        minutesAgo: 5 * 24 * 60 - 15,
                        replyToIndex: 3
                    },
                    ...james ? [
                        {
                            senderId: james.id,
                            content: 'Surgical anatomy: knowing the triangle of Calot is essential for cholecystectomy. Cystic artery, cystic duct, and common hepatic duct 🔪',
                            minutesAgo: 4 * 24 * 60
                        }
                    ] : [],
                    {
                        senderId: educator.id,
                        content: 'Abdominal wall layers: Skin → Camper\'s fascia → Scarpa\'s fascia → External oblique → Internal oblique → Transversus abdominis → Transversalis fascia → Peritoneum',
                        minutesAgo: 3 * 24 * 60
                    },
                    {
                        senderId: student.id,
                        content: 'Mnemonic: "Some Super Engineers Can Fix Very Old Refrigerators" for the layers 😂',
                        minutesAgo: 3 * 24 * 60 - 20
                    },
                    ...sarah ? [
                        {
                            senderId: sarah.id,
                            content: 'Neuroanatomy: the internal capsule has anterior limb, genu, and posterior limb. Genu = motor for face, posterior limb = motor for body 🧠',
                            minutesAgo: 2 * 24 * 60
                        }
                    ] : [],
                    {
                        senderId: educator.id,
                        content: 'Blood supply to the internal capsule: anterior limb = ACA/MCA lenticulostriates, genu = MCA lenticulostriates, posterior limb = anterior choroidal',
                        minutesAgo: 1 * 24 * 60,
                        isPinned: true
                    },
                    ...priya ? [
                        {
                            senderId: priya.id,
                            content: 'Pediatric anatomy: in newborns, the liver takes up ~5% of body weight (vs 2% in adults). That\'s why the abdomen looks so protuberant! 👶',
                            minutesAgo: 12 * 60
                        }
                    ] : [],
                    // Poll
                    {
                        senderId: educator.id,
                        content: 'Which structure passes through the foramen ovale?',
                        minutesAgo: 5 * 60,
                        type: 'poll',
                        metadata: {
                            poll: {
                                question: 'Which structure passes through the foramen ovale?',
                                options: [
                                    'Mandibular nerve (V3)',
                                    'Maxillary nerve (V2)',
                                    'Middle meningeal artery',
                                    'Internal carotid artery'
                                ],
                                isMultiChoice: false,
                                isAnonymous: false,
                                votes: {
                                    '0': [
                                        student.id,
                                        sarah?.id
                                    ].filter(Boolean),
                                    '1': [],
                                    '2': [],
                                    '3': []
                                }
                            },
                            reactions: []
                        }
                    },
                    {
                        senderId: student.id,
                        content: 'V3! Foramen ovale = Mandibular branch. Remember: Ovale sounds like "O-molar" → O for oral/mastication 🦴',
                        minutesAgo: 2 * 60
                    }
                ]
            }
        ];
        for (const group of groupRooms){
            // Check if group room with same name already exists
            const existingRoom = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.findFirst({
                where: {
                    type: 'group',
                    name: group.name
                }
            });
            if (existingRoom) {
                results.skipped.push(`group room ${group.name}`);
                continue;
            }
            // Create group room with all available members
            const membersCreate = groupMemberIds.map((uid)=>({
                    userId: uid,
                    role: uid === group.createdBy ? 'admin' : 'member'
                }));
            // Deduplicate
            const uniqueMembers = membersCreate.filter((v, i, a)=>a.findIndex((t)=>t.userId === v.userId) === i);
            const room = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.create({
                data: {
                    type: 'group',
                    name: group.name,
                    avatar: group.avatar,
                    description: group.description,
                    createdBy: group.createdBy,
                    lastMessageAt: new Date(),
                    members: {
                        create: uniqueMembers
                    }
                }
            });
            results.groupRooms++;
            // Create sample messages with varied timestamps
            const now = Date.now();
            const createdMsgIds = [];
            for(let i = 0; i < group.messages.length; i++){
                const msg = group.messages[i];
                const minutesAgo = msg.minutesAgo ?? (group.messages.length - i) * 3;
                const timestamp = new Date(now - minutesAgo * 60 * 1000);
                const replyToId = msg.replyToIndex !== undefined ? createdMsgIds[msg.replyToIndex] : null;
                const msgType = msg.type || 'text';
                let metadata = msg.metadata || {};
                // For system messages, add system info
                if (msgType === 'system') {
                    metadata = {
                        ...metadata,
                        systemEvent: 'room_created',
                        systemUser: msg.senderId
                    };
                    results.systemMessages++;
                }
                if (msgType === 'poll') {
                    results.pollMessages++;
                }
                const created = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.create({
                    data: {
                        roomId: room.id,
                        senderId: msg.senderId,
                        content: msg.content,
                        type: msgType,
                        metadata: JSON.stringify(metadata),
                        isPinned: msg.isPinned || false,
                        replyToId,
                        createdAt: timestamp
                    }
                });
                createdMsgIds.push(created.id);
                results.groupMessages++;
                if (msg.isPinned) results.pinnedMessages++;
            }
            // Update lastMessageAt to match the most recent message
            const lastMinutesAgo = group.messages[group.messages.length - 1]?.minutesAgo ?? 3;
            await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.update({
                where: {
                    id: room.id
                },
                data: {
                    lastMessageAt: new Date(now - lastMinutesAgo * 60 * 1000)
                }
            });
            // ═══════════════════════════════════════════════════════════
            // Post-creation: Add reactions to some messages
            // ═══════════════════════════════════════════════════════════
            const roomMessages = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.findMany({
                where: {
                    roomId: room.id,
                    type: 'text'
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });
            // Add reactions to various messages
            for(let i = 0; i < roomMessages.length; i++){
                const msg = roomMessages[i];
                const meta = JSON.parse(msg.metadata || '{}');
                let updated = false;
                // Add reactions to certain messages based on position and content
                if (i === 1 && !meta.reactions) {
                    // Second message gets thumbs up and heart
                    meta.reactions = [
                        {
                            emoji: '👍',
                            userIds: [
                                student.id,
                                admin.id,
                                sarah?.id
                            ].filter(Boolean)
                        },
                        {
                            emoji: '❤️',
                            userIds: [
                                ahmed?.id,
                                priya?.id
                            ].filter(Boolean)
                        }
                    ];
                    updated = true;
                }
                if (i === 3 && !meta.reactions) {
                    // Fourth message gets fire emoji
                    meta.reactions = [
                        {
                            emoji: '🔥',
                            userIds: [
                                student.id,
                                educator.id
                            ]
                        },
                        {
                            emoji: '💯',
                            userIds: [
                                admin.id
                            ]
                        }
                    ];
                    updated = true;
                }
                if (i === 5 && !meta.reactions) {
                    // Sixth message gets clap
                    meta.reactions = [
                        {
                            emoji: '👏',
                            userIds: [
                                student.id,
                                admin.id,
                                sarah?.id
                            ].filter(Boolean)
                        }
                    ];
                    updated = true;
                }
                if (i === roomMessages.length - 2 && !meta.reactions) {
                    // Second to last message gets celebration
                    meta.reactions = [
                        {
                            emoji: '🎉',
                            userIds: [
                                educator.id,
                                admin.id
                            ]
                        },
                        {
                            emoji: '👍',
                            userIds: [
                                student.id
                            ]
                        }
                    ];
                    updated = true;
                }
                if (updated) {
                    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.update({
                        where: {
                            id: msg.id
                        },
                        data: {
                            metadata: JSON.stringify(meta)
                        }
                    });
                    results.reactions++;
                }
            }
            // ═══════════════════════════════════════════════════════════
            // Post-creation: Set isPinned/isMuted/pinOrder on some ChatRoomMembers
            // ═══════════════════════════════════════════════════════════
            // Pin some rooms for the student user
            const studentMembership = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.findUnique({
                where: {
                    roomId_userId: {
                        roomId: room.id,
                        userId: student.id
                    }
                }
            });
            if (studentMembership) {
                // Pin the first 3 group rooms, mute the 5th+ ones
                const roomIndex = results.groupRooms;
                if (roomIndex <= 3) {
                    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.update({
                        where: {
                            id: studentMembership.id
                        },
                        data: {
                            isPinned: true,
                            pinOrder: roomIndex
                        }
                    });
                }
                if (roomIndex >= 5) {
                    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.update({
                        where: {
                            id: studentMembership.id
                        },
                        data: {
                            isMuted: true
                        }
                    });
                }
                // Set different lastReadAt values for varying unread counts
                const readMinutesAgo = roomIndex <= 2 ? 5 : roomIndex <= 4 ? 2 * 24 * 60 : 5 * 24 * 60;
                await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.update({
                    where: {
                        id: studentMembership.id
                    },
                    data: {
                        lastReadAt: new Date(now - readMinutesAgo * 60 * 1000)
                    }
                });
            }
        }
        // ═══════════════════════════════════════════════════════════
        // 4. Add "X was added to the group" system messages for new rooms
        // ═══════════════════════════════════════════════════════════
        for (const group of groupRooms){
            const existingRoom = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.findFirst({
                where: {
                    type: 'group',
                    name: group.name
                }
            });
            if (!existingRoom) continue;
            // Check if we already have member_added system messages for this room (skip if re-seeded)
            const existingMemberAddedMsg = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.findFirst({
                where: {
                    roomId: existingRoom.id,
                    type: 'system',
                    content: {
                        contains: 'was added to the group'
                    }
                }
            });
            if (existingMemberAddedMsg) continue;
            // Add "X created the group" system message at the very beginning (only if not already present)
            const existingCreatedMsg = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.findFirst({
                where: {
                    roomId: existingRoom.id,
                    type: 'system',
                    content: {
                        contains: 'created the group'
                    }
                }
            });
            if (!existingCreatedMsg) {
                const firstMsg = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.findFirst({
                    where: {
                        roomId: existingRoom.id
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                });
                if (firstMsg) {
                    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.create({
                        data: {
                            roomId: existingRoom.id,
                            senderId: group.createdBy,
                            content: `${allUsers.find((u)=>u.id === group.createdBy)?.name || 'Someone'} created the group "${group.name}"`,
                            type: 'system',
                            metadata: JSON.stringify({
                                systemEvent: 'room_created',
                                systemUser: group.createdBy
                            }),
                            createdAt: new Date(firstMsg.createdAt.getTime() - 1000)
                        }
                    });
                    results.systemMessages++;
                }
            }
            // Add "Y was added to the group" system messages
            const firstMsgForTime = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.findFirst({
                where: {
                    roomId: existingRoom.id
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });
            const roomMembers = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.findMany({
                where: {
                    roomId: existingRoom.id,
                    userId: {
                        not: group.createdBy
                    }
                },
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            for (const member of roomMembers.slice(0, 3)){
                const addTime = new Date(firstMsgForTime ? firstMsgForTime.createdAt.getTime() + 500 : Date.now());
                await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.create({
                    data: {
                        roomId: existingRoom.id,
                        senderId: group.createdBy,
                        content: `${member.user?.name || 'Someone'} was added to the group`,
                        type: 'system',
                        metadata: JSON.stringify({
                            systemEvent: 'member_added',
                            systemUser: group.createdBy,
                            addedUser: member.userId
                        }),
                        createdAt: addTime
                    }
                });
                results.systemMessages++;
            }
        }
        // ═══════════════════════════════════════════════════════════
        // 5. Set some users as online for testing
        // ═══════════════════════════════════════════════════════════
        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.updateMany({
            where: {
                email: {
                    in: [
                        'student@medq.com',
                        'sarah@medq.com',
                        'ahmed@medq.com'
                    ]
                }
            },
            data: {
                isOnline: true,
                lastActiveAt: new Date()
            }
        });
        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.updateMany({
            where: {
                email: {
                    in: [
                        'educator@medq.com',
                        'admin@medq.com'
                    ]
                }
            },
            data: {
                isOnline: false,
                lastActiveAt: new Date(Date.now() - 30 * 60 * 1000)
            }
        });
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            success: true,
            message: 'Chat data seeded successfully with enriched data!',
            results
        });
    } catch (error) {
        console.error('Error seeding chat data:', error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,859], () => (__webpack_exec__(288744)));
module.exports = __webpack_exports__;

})();