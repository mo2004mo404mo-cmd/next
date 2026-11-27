"use strict";
(() => {
var exports = {};
exports.id = 1801;
exports.ids = [1801];
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

/***/ 114406:
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
        page: "/api/verify-model/route",
        pathname: "/api/verify-model",
        filename: "route",
        bundlePath: "app/api/verify-model/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/verify-model/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(827719),
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
    let srcPage = "/api/verify-model/route";
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

/***/ 442301:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DG: () => (/* binding */ verifyZaiConnectivity)
/* harmony export */ });
/* unused harmony exports createZaiAICallFn, getDefaultZaiAICallFn, createZaiStreamFn */
/* harmony import */ var _lib_zai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(376389);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/classroom-generation.ts (AICallFn implementation)
 *
 * ZAI-backed `AICallFn` factory.
 *
 * OpenMAIC's `classroom-generation.ts` constructs an `AICallFn` inline by
 * calling `callLLM` from `@/lib/ai/llm` (which wraps Vercel AI SDK's
 * `generateText` for OpenAI/Anthropic/Google/…). MedQ has no `@/lib/ai/llm`
 * and uses the ZAI SDK exclusively (`z-ai-web-dev-sdk`). This module
 * implements the same `AICallFn` contract — `(systemPrompt, userPrompt,
 * images?) => Promise<string>` — by wrapping `zai.chat.completions.create`.
 *
 * The factory is a thin function so callers can pass per-request options
 * (model id, thinking config) without re-reading `.z-ai-config` on every
 * call. The ZAI client is created lazily on first invocation.
 */ 

const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('ZaiAICall');
async function loadZaiSdk() {
    try {
        const loader = new Function('return import("z-ai-web-dev-sdk")');
        const mod = await loader();
        const ZaiClass = mod?.default ?? mod ?? null;
        if (!ZaiClass) return null;
        // The SDK exports the ZAI class; obtain an instance via its static
        // create() factory (reads .z-ai-config itself). Older builds exported a
        // ready-made instance — support both shapes.
        const instance = typeof ZaiClass.create === 'function' ? await ZaiClass.create() : ZaiClass;
        if (!instance || !instance.chat || !instance.chat.completions || typeof instance.chat.completions.create !== 'function') {
            return null;
        }
        return instance;
    } catch  {
        return null;
    }
}
/**
 * Build an `AICallFn` backed by ZAI's chat completions API.
 *
 * The returned function:
 *   1. Lazily creates a ZAI client (cached across calls within the same
 *      factory instance — one client per `createZaiAICallFn` call).
 *   2. Calls `zai.chat.completions.create({ model, messages, thinking })`.
 *   3. Returns the assistant message's `content` string.
 *
 * Images (the optional third `AICallFn` argument) are currently ignored:
 * MedQ's ZAI adapter does not yet wire ZAI's vision API into the AICallFn
 * path. The ported generation pipeline degrades gracefully when vision is
 * unavailable — outline-generator and scene-generator fall back to text-only
 * descriptions.
 */ function createZaiAICallFn(options = {}) {
    const model = options.model || 'auto';
    const thinkingEnabled = options.thinking?.enabled ?? false;
    // Lazily-created ZAI client — shared across all calls made by this factory.
    let zaiPromise = null;
    const getZai = ()=>{
        if (!zaiPromise) {
            const token = options.token ?? readConfig()?.token;
            zaiPromise = (async ()=>{
                const sdk = await loadZaiSdk();
                if (!sdk) {
                    throw new Error('This project is set up for the BYOK/provider flow and does not include the missing ZAI SDK.');
                }
                return sdk;
            })();
        }
        return zaiPromise;
    };
    const aiCall = async (systemPrompt, userPrompt, _images)=>{
        const zai = await getZai();
        const completion = await zai.chat.completions.create({
            model,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userPrompt
                }
            ],
            thinking: {
                type: thinkingEnabled ? 'enabled' : 'disabled'
            },
            // The SDK does not officially document `signal`, but forwarding it is
            // harmless and unlocks abort support if/when the SDK adds it.
            ...options.signal ? {
                signal: options.signal
            } : {}
        });
        const content = completion.choices?.[0]?.message?.content || '';
        if (!content) {
            log.warn('ZAI returned an empty response', {
                model,
                systemPromptLength: systemPrompt.length,
                userPromptLength: userPrompt.length
            });
        }
        return content;
    };
    return aiCall;
}
/**
 * Default ZAI-backed AICallFn. Created lazily on first call (so server-side
 * import never triggers a config-file read or network call). Use this when
 * you don't need per-request options — e.g. a one-off generation pipeline
 * invocation. For routes that want to control the model or thinking config,
 * call `createZaiAICallFn({ model, thinking })` instead.
 */ let _defaultAiCall = null;
function getDefaultZaiAICallFn() {
    if (!_defaultAiCall) {
        _defaultAiCall = createZaiAICallFn();
    }
    return _defaultAiCall;
}
/**
 * Build a streaming `OrchestrationAICallFn` backed by ZAI's chat completions
 * API.
 *
 * The returned function accepts a full message list (system / user /
 * assistant turns) and yields `StreamChunk` events:
 *   - `{ type: 'delta', content }` for each streamed text chunk
 *   - `{ type: 'done', content }` once with the full concatenated text
 *   - `{ type: 'error', message }` (NOT a `StreamChunk` variant — emitted
 *     via `log.error` and re-thrown) if ZAI fails
 *
 * This is the shape consumed by the ported `statelessGenerate` orchestration
 * loop (via `AISdkLangGraphAdapter`), so the chat route can pass it directly
 * as the `aiCallFn` argument and skip the (absent) `LanguageModel` path.
 *
 * Implementation note: `z-ai-web-dev-sdk`'s `chat.completions.create` returns
 * the raw `ReadableStream<Uint8Array>` (OpenAI-compatible SSE bytes) when the
 * request body carries `stream: true` AND the response content-type is
 * `text/event-stream` or `text/plain`. We parse the SSE stream incrementally:
 *
 *   1. Read bytes from the stream into a TextDecoder (streaming mode).
 *   2. Split on `\n\n` to extract SSE events.
 *   3. For each event, parse `data:` lines as JSON (OpenAI ChatCompletionChunk
 *      shape: `choices[0].delta.content` is the incremental text). The
 *      sentinel `data: [DONE]` marks end-of-stream.
 *   4. Yield each non-empty `delta.content` as `{ type: 'delta', content }`.
 *   5. Yield the full concatenated text as `{ type: 'done', content }` at end.
 *
 * If `stream: true` is rejected (HTTP non-ok or non-SSE content-type), we
 * fall back to a single non-streaming request and yield one delta + done —
 * matching the original (pre-streaming) behavior.
 *
 * Errors are logged via the `ZaiAICall` logger and re-thrown so the
 * ported `statelessGenerate` orchestration loop can surface them in the SSE
 * error event. The chat route's outer try/catch converts the thrown error
 * into a `{ type: 'error' }` SSE event.
 */ function createZaiStreamFn(options = {}) {
    const model = options.model || 'auto';
    const thinkingEnabled = options.thinking?.enabled ?? false;
    let zaiPromise = null;
    const getZai = ()=>{
        if (!zaiPromise) {
            const token = options.token ?? readConfig()?.token;
            zaiPromise = (async ()=>{
                const sdk = await loadZaiSdk();
                if (!sdk) {
                    throw new Error('This project is set up for the BYOK/provider flow and does not include the missing ZAI SDK.');
                }
                return sdk;
            })();
        }
        return zaiPromise;
    };
    const streamFn = async function*(messages, callOptions) {
        const zai = await getZai();
        // The ZAI SDK type signature only declares `create(body) => Promise<any>`,
        // but the runtime implementation returns a `ReadableStream<Uint8Array>`
        // when `body.stream === true` and the server responds with an SSE content
        // type. The cast through `unknown` lets us accept either shape.
        const response = await zai.chat.completions.create({
            model,
            messages,
            stream: true,
            thinking: {
                type: thinkingEnabled ? 'enabled' : 'disabled'
            },
            ...callOptions?.signal ? {
                signal: callOptions.signal
            } : {}
        });
        // Streaming path: `response` is a `ReadableStream<Uint8Array>` (browser /
        // Node 18 web streams). The SDK only returns this shape when the server
        // responded with `text/event-stream` or `text/plain` to a `stream:true`
        // request; otherwise it returns a parsed JSON object.
        if (response && typeof response.getReader === 'function') {
            let fullText = '';
            try {
                for await (const chunk of sseDeltaIterator(response, callOptions?.signal)){
                    if (chunk) {
                        fullText += chunk;
                        yield {
                            type: 'delta',
                            content: chunk
                        };
                    }
                }
            } catch (error) {
                log.error('ZAI stream interrupted:', error);
                // Yield whatever we accumulated so the consumer can salvage partial
                // output, then re-throw so the orchestration loop surfaces the error.
                if (fullText) {
                // We already streamed deltas; do NOT yield a duplicate delta here.
                }
                throw error;
            }
            yield {
                type: 'done',
                content: fullText
            };
            return;
        }
        // Fallback path: server returned a regular JSON object (either `stream:
        // false` was ignored or the endpoint doesn't support SSE). This mirrors
        // the original non-streaming behavior.
        log.warn('ZAI did not return a ReadableStream — falling back to non-streaming path');
        const completion = response;
        const content = completion.choices?.[0]?.message?.content || '';
        if (content) {
            yield {
                type: 'delta',
                content
            };
        }
        yield {
            type: 'done',
            content
        };
    };
    return streamFn;
}
/**
 * Iterate over an SSE-encoded `ReadableStream<Uint8Array>` and yield
 * incremental text deltas (parsed from OpenAI-compatible
 * `ChatCompletionChunk.choices[0].delta.content`).
 *
 * Handles:
 *   - partial chunks split across stream reads (the SSE parser buffers
 *     incomplete events until the next `\n\n` boundary)
 *   - the `data: [DONE]` sentinel
 *   - comment lines (`: heartbeat` etc.) — ignored
 *   - abort via the optional `signal` (re-throws `AbortError`)
 */ async function* sseDeltaIterator(stream, signal) {
    const reader = stream.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    try {
        while(true){
            if (signal?.aborted) {
                await reader.cancel().catch(()=>undefined);
                throw new DOMException('Aborted', 'AbortError');
            }
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, {
                stream: true
            });
            // SSE events are separated by a blank line. Process all complete
            // events in the buffer; leave the trailing partial in `buffer`.
            let sepIndex;
            while((sepIndex = buffer.indexOf('\n\n')) !== -1){
                const rawEvent = buffer.slice(0, sepIndex);
                buffer = buffer.slice(sepIndex + 2);
                const delta = parseSseEventForDelta(rawEvent);
                if (delta !== null) yield delta;
            }
        }
        // Flush any remaining buffered event (some servers omit the trailing
        // `\n\n` after `[DONE]`).
        if (buffer.trim()) {
            const delta = parseSseEventForDelta(buffer);
            if (delta !== null) yield delta;
        }
    } finally{
        try {
            reader.releaseLock();
        } catch  {
        /* already released */ }
    }
}
/**
 * Parse a single SSE event (already split on `\n\n`) into the incremental
 * text delta. Returns `null` for:
 *   - comment lines (starting with `:`)
 *   - events without a `data:` line
 *   - the `[DONE]` sentinel
 *   - non-delta JSON shapes (e.g. role-only chunks, tool_calls chunks)
 */ function parseSseEventForDelta(rawEvent) {
    const lines = rawEvent.split('\n');
    const dataLines = [];
    for (const line of lines){
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(':')) continue;
        if (trimmed.startsWith('data:')) {
            dataLines.push(trimmed.slice(5).trimStart());
        }
    // Other SSE fields (`event:`, `id:`, `retry:`) are ignored.
    }
    if (dataLines.length === 0) return null;
    const dataStr = dataLines.join('\n');
    if (dataStr === '[DONE]') return null;
    try {
        const parsed = JSON.parse(dataStr);
        const delta = parsed.choices?.[0]?.delta?.content;
        return typeof delta === 'string' && delta.length > 0 ? delta : null;
    } catch  {
        // Some servers send keep-alive pings as non-JSON `data:` payloads —
        // silently ignore them rather than crashing the stream.
        return null;
    }
}
/**
 * Send a minimal "Say OK" prompt to ZAI's chat completions API to verify
 * that the configured credentials work end-to-end. Used by the ported
 * `/api/openmaic/verify-model` route in place of OpenMAIC's `callLLM`-based
 * connectivity test.
 */ async function verifyZaiConnectivity(options = {}) {
    try {
        const token = options.token ?? (0,_lib_zai__WEBPACK_IMPORTED_MODULE_0__.readConfig)()?.token;
        const zai = await (0,_lib_zai__WEBPACK_IMPORTED_MODULE_0__.createZAI)(token);
        const completion = await zai.chat.completions.create({
            model: options.model || 'auto',
            messages: [
                {
                    role: 'user',
                    content: 'Say "OK" if you can hear me.'
                }
            ],
            thinking: {
                type: 'disabled'
            }
        });
        const text = completion.choices?.[0]?.message?.content || '';
        return {
            ok: true,
            responseText: text
        };
    } catch (error) {
        return {
            ok: false,
            responseText: '',
            error: error instanceof Error ? error.message : String(error)
        };
    }
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

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 638522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 648825:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 827719:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(653165);
/* harmony import */ var _lib_server_api_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(648825);
/* harmony import */ var _lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(592901);
/* harmony import */ var _lib_server_zai_ai_call__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(442301);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_2__]);
_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: app/api/verify-model/route.ts
 *
 * MedQ adaptation:
 *   OpenMAIC's verify-model route resolves a `LanguageModel` via
 *   `resolveModel` and calls `callLLM` from `@/lib/ai/llm` with a minimal
 *   "Say OK" prompt. MedQ has no `@/lib/ai/llm` and uses ZAI exclusively.
 *   This route replaces the `callLLM` invocation with
 *   `verifyZaiConnectivity` from `@/lib/server/zai-ai-call`, which sends the
 *   same minimal prompt via `zai.chat.completions.create`.
 *
 *   `resolveModel` is still called to honor stage routes / `DEFAULT_MODEL`
 *   and surface a clear error if ZAI isn't configured — but the returned
 *   `model: LanguageModel` is `null` in medq (ignored). The `modelId` is
 *   forwarded to `verifyZaiConnectivity` so a `MODEL_ROUTES` override (e.g.
 *   `zai:glm-4.6`) is honored by the connectivity probe.
 */ 



const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('Verify Model');
async function POST(req) {
    let model;
    try {
        const body = await req.json();
        const { apiKey, baseUrl, providerType } = body;
        model = body.model;
        void apiKey;
        void baseUrl;
        void providerType;
        if (!model) {
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_1__/* .apiError */ .pb)('MISSING_REQUIRED_FIELD', 400, 'Model name is required');
        }
        // Parse model string and resolve server-side fallback. In medq, this
        // validates ZAI is configured (DEFAULT_MODEL must be set or stage route
        // must resolve), then returns the modelId we feed to ZAI.
        let modelId;
        try {
            const result = await (0,_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_2__.resolveModel)({
                modelString: model,
                apiKey: apiKey || '',
                baseUrl: baseUrl || undefined,
                providerType
            });
            modelId = result.modelId;
        } catch (error) {
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_1__/* .apiError */ .pb)('INVALID_REQUEST', 401, error instanceof Error ? error.message : String(error));
        }
        // Send a minimal test message via ZAI.
        const probe = await (0,_lib_server_zai_ai_call__WEBPACK_IMPORTED_MODULE_3__/* .verifyZaiConnectivity */ .DG)({
            model: modelId
        });
        if (!probe.ok) {
            const errorMessage = classifyError(probe.error || 'Connection failed');
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_1__/* .apiError */ .pb)('INTERNAL_ERROR', 500, errorMessage);
        }
        return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_1__/* .apiSuccess */ .kU)({
            message: 'Connection successful',
            response: probe.responseText
        });
    } catch (error) {
        log.error(`Model verification failed [model="${model ?? 'unknown'}"]:`, error);
        return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_1__/* .apiError */ .pb)('INTERNAL_ERROR', 500, 'Connection failed');
    }
}
function classifyError(rawMessage) {
    if (rawMessage.includes('401') || rawMessage.includes('Unauthorized')) {
        return 'API key is invalid or expired';
    }
    if (rawMessage.includes('404') || rawMessage.includes('not found')) {
        return 'Model not found or API endpoint error';
    }
    if (rawMessage.includes('429')) {
        return 'API rate limit exceeded, please try again later';
    }
    if (rawMessage.includes('ENOTFOUND') || rawMessage.includes('ECONNREFUSED')) {
        return 'Cannot connect to API server, please check the Base URL';
    }
    if (rawMessage.includes('timeout')) {
        return 'Connection timed out, please check your network';
    }
    return rawMessage;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,7774,1545,9567,859,2035,4007,7909,5566,8262,2901], () => (__webpack_exec__(114406)));
module.exports = __webpack_exports__;

})();