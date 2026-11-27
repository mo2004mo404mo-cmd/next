(() => {
var exports = {};
exports.id = 5226;
exports.ids = [5226];
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

/***/ 101778:
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
        page: "/api/agent/chat/route",
        pathname: "/api/agent/chat",
        filename: "route",
        bundlePath: "app/api/agent/chat/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/agent/chat/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(492734),
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
    let srcPage = "/api/agent/chat/route";
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

/***/ 108128:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/runtime-reacts.external.js");

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

/***/ 296487:
/***/ (() => {



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

/***/ 478474:
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ 492734:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   dynamic: () => (/* binding */ dynamic),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration),
/* harmony export */   runtime: () => (/* binding */ runtime),
/* harmony export */   splitForSpeech: () => (/* binding */ splitForSpeech)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/**
 * Agent voice services API (v1 chat route — voice modes only).
 *
 * POST /api/agent/chat
 *   body: { mode: 'tts', text, voice? }     → audio/wav|mpeg blob of the text
 *   body: { mode: 'asr', audio: base64 }    → { text } transcription
 *
 * This is the endpoint the floating assistant's voice layer (useAgentVoice)
 * calls when the browser's native speech capabilities are missing or fail:
 *   • TTS: browser speechSynthesis unavailable/voiceless → server synthesis
 *   • ASR: MediaRecorder fallback (webkitSpeechRecognition unavailable) →
 *     server transcription
 *
 * Voice providers, in priority order:
 *   1. The FreeLLM router (MEDQ_AGENT_BASE_URL + MEDQ_AGENT_API_KEY — same
 *      BYOK pool the chat LLM uses): POST {base}/audio/speech (model 'auto'
 *      picks a healthy audio model) and multipart {base}/audio/transcriptions.
 *      Verified live: speech → WAV, transcription → { text }.
 *   2. An operator-configured built-in TTS/ASR provider (TTS_x / ASR_x env
 *      vars or server-providers.yml) via generateTTS / transcribeAudio.
 *   3. 503 with a descriptive message.
 *
 * The v1 CHAT mode of this route was replaced by /api/agent/chat/v2 (SSE
 * streaming, tools, threads); chat-mode requests get a 410 pointer so stale
 * clients fail loudly instead of silently.
 *
 * Auth: any resolved user (session or guest fallback) — parity with chat/v2.
 */ 

const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentVoiceAPI');
const runtime = 'nodejs';
const dynamic = 'force-dynamic';
const maxDuration = 120;
/** Resolve the OpenAI-compatible router the agent LLM already uses. */ function resolveRouter() {
    const baseUrl = (process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || '').replace(/\/$/, '');
    const apiKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '';
    if (!baseUrl || !apiKey) return null;
    return {
        baseUrl,
        apiKey
    };
}
/**
 * Split long text into ≤maxChars segments at sentence boundaries so each
 * fits an upstream TTS input cap (router: 1024 chars). Prefers breaking on
 * sentence enders, then newlines/commas; never cuts mid-word.
 */ function splitForSpeech(text, maxChars) {
    const trimmed = text.trim();
    if (trimmed.length <= maxChars) return [
        trimmed
    ];
    const sentences = trimmed.match(/[^.!?\n]+[.!?]*[\n]*/g) ?? [
        trimmed
    ];
    const segments = [];
    let current = '';
    for (const sentence of sentences){
        const piece = sentence.trim();
        if (!piece) continue;
        if ((current + ' ' + piece).trim().length <= maxChars) {
            current = (current ? current + ' ' : '') + piece;
        } else {
            if (current) segments.push(current);
            if (piece.length <= maxChars) {
                current = piece;
            } else {
                // Pathological single sentence longer than the cap — hard split on
                // spaces near the boundary.
                let rest = piece;
                while(rest.length > maxChars){
                    let cut = rest.lastIndexOf(' ', maxChars);
                    if (cut <= 0) cut = maxChars;
                    segments.push(rest.slice(0, cut).trim());
                    rest = rest.slice(cut).trim();
                }
                current = rest;
            }
        }
    }
    if (current.trim()) segments.push(current.trim());
    return segments.length > 0 ? segments : [
        trimmed.slice(0, maxChars)
    ];
}
/**
 * Concatenate same-format WAV buffers into one playable file: reads the fmt
 * chunk (sample rate / channels / bit depth) from the first buffer, appends
 * every buffer's PCM payload, and writes a fresh canonical 44-byte header.
 * Falls back to the first buffer when inputs are not parseable WAVs or the
 * formats differ between segments.
 */ function mergeWavBuffers(buffers) {
    if (buffers.length === 0) throw new Error('no audio segments');
    if (buffers.length === 1) return buffers[0];
    const parse = (buf)=>{
        if (buf.length < 44 || buf.subarray(0, 4).toString('ascii') !== 'RIFF' || buf.subarray(8, 12).toString('ascii') !== 'WAVE') return null;
        let offset = 12;
        let fmt = null;
        let data = null;
        while(offset + 8 <= buf.length){
            const chunkId = buf.subarray(offset, offset + 4).toString('ascii');
            const chunkSize = buf.readUInt32LE(offset + 4);
            if (chunkId === 'fmt ' && !fmt) fmt = {
                start: offset + 8,
                size: chunkSize
            };
            if (chunkId === 'data') {
                data = {
                    start: offset + 8,
                    size: Math.min(chunkSize, buf.length - offset - 8)
                };
                break;
            }
            offset += 8 + chunkSize + chunkSize % 2;
        }
        if (!fmt || !data) return null;
        return {
            audioFormat: buf.readUInt16LE(fmt.start),
            channels: buf.readUInt16LE(fmt.start + 2),
            sampleRate: buf.readUInt32LE(fmt.start + 4),
            bitsPerSample: buf.readUInt16LE(fmt.start + 14),
            pcm: buf.subarray(data.start, data.start + data.size)
        };
    };
    const parts = buffers.map(parse);
    const first = parts[0];
    if (!first || parts.some((p)=>!p)) return buffers[0];
    // Same PCM format across segments? Otherwise concatenation would glitch.
    const sameFormat = parts.every((p)=>p.audioFormat === first.audioFormat && p.channels === first.channels && p.sampleRate === first.sampleRate && p.bitsPerSample === first.bitsPerSample);
    if (!sameFormat) return buffers[0];
    let dataBytes = 0;
    for (const p of parts)dataBytes += p.pcm.length;
    const byteRate = first.sampleRate * first.channels * (first.bitsPerSample / 8);
    const blockAlign = first.channels * (first.bitsPerSample / 8);
    const merged = Buffer.alloc(44 + dataBytes);
    merged.write('RIFF', 0, 'ascii');
    merged.writeUInt32LE(36 + dataBytes, 4);
    merged.write('WAVE', 8, 'ascii');
    merged.write('fmt ', 12, 'ascii');
    merged.writeUInt32LE(16, 16);
    merged.writeUInt16LE(first.audioFormat, 20);
    merged.writeUInt16LE(first.channels, 22);
    merged.writeUInt32LE(first.sampleRate, 24);
    merged.writeUInt32LE(byteRate, 28);
    merged.writeUInt16LE(blockAlign, 32);
    merged.writeUInt16LE(first.bitsPerSample, 34);
    merged.write('data', 36, 'ascii');
    merged.writeUInt32LE(dataBytes, 40);
    let cursor = 44;
    for (const p of parts){
        p.pcm.copy(merged, cursor);
        cursor += p.pcm.length;
    }
    return merged;
}
async function POST(req) {
    const body = await req.json().catch(()=>null);
    if (!body || typeof body.mode !== 'string') {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'mode is required'
        }, {
            status: 400
        });
    }
    // ── Text to speech ──────────────────────────────────────────────────────
    if (body.mode === 'tts') {
        const text = typeof body.text === 'string' ? body.text.trim() : '';
        const voice = typeof body.voice === 'string' && body.voice.trim() ? body.voice.trim() : 'tongtong';
        if (!text) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'text is required for mode=tts'
        }, {
            status: 400
        });
        if (text.length > 6000) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Text too long for a single utterance (6000 char cap)'
            }, {
                status: 400
            });
        }
        // 1. FreeLLM router (audio/speech is OpenAI-compatible: model/input/voice).
        //    Upstream caps a single input at ~1024 chars — longer replies are
        //    split at sentence boundaries, synthesized per segment and merged.
        const router = resolveRouter();
        if (router) {
            try {
                const segments = splitForSpeech(text, 1000);
                const buffers = [];
                let contentType = 'audio/wav';
                for (const segment of segments){
                    const upstream = await fetch(`${router.baseUrl}/audio/speech`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${router.apiKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            model: 'auto',
                            input: segment,
                            voice
                        }),
                        signal: AbortSignal.timeout(30000)
                    });
                    if (!upstream.ok) {
                        const errText = await upstream.text().catch(()=>upstream.statusText);
                        throw new Error(`router ${upstream.status}: ${errText.slice(0, 160)}`);
                    }
                    contentType = upstream.headers.get('content-type') || contentType;
                    buffers.push(Buffer.from(await upstream.arrayBuffer()));
                }
                const audio = mergeWavBuffers(buffers);
                log.info?.(`TTS ok via router (${audio.byteLength}B, ${contentType}, ${segments.length} segment(s)) for ${text.slice(0, 60)}…`);
                return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(new Uint8Array(audio), {
                    status: 200,
                    headers: {
                        'Content-Type': contentType,
                        'Content-Length': String(audio.byteLength),
                        'Cache-Control': 'no-store'
                    }
                });
            } catch (error) {
                log.warn?.(`TTS router failed: ${error instanceof Error ? error.message : error}`);
            }
        }
        // 2. Operator-configured built-in provider (env / server-providers.yml).
        //    'zai' is not a generateTTS provider (it is the router path above).
        try {
            const { getServerTTSProviders, resolveTTSApiKey, resolveTTSBaseUrl, resolveTTSModel, isServerTTSProviderDisabled } = await Promise.all(/* import() */[__webpack_require__.e(426), __webpack_require__.e(4007)]).then(__webpack_require__.bind(__webpack_require__, 834007));
            const configured = Object.keys(getServerTTSProviders()).filter((id)=>id !== 'browser-native-tts' && id !== 'zai' && !isServerTTSProviderDisabled(id));
            const providerId = configured[0];
            if (providerId) {
                const { generateTTS } = await Promise.all(/* import() */[__webpack_require__.e(7774), __webpack_require__.e(1229), __webpack_require__.e(7662), __webpack_require__.e(4307)]).then(__webpack_require__.bind(__webpack_require__, 107662));
                const config = {
                    providerId: providerId,
                    modelId: resolveTTSModel(providerId),
                    apiKey: resolveTTSApiKey(providerId),
                    baseUrl: resolveTTSBaseUrl(providerId),
                    voice
                };
                const result = await generateTTS(config, text);
                const buffer = Buffer.from(result.audio);
                const mimeType = result.format === 'wav' ? 'audio/wav' : 'audio/mpeg';
                log.info?.(`TTS ok via ${providerId} (${buffer.byteLength}B)`);
                return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(new Uint8Array(buffer), {
                    status: 200,
                    headers: {
                        'Content-Type': mimeType,
                        'Content-Length': String(buffer.byteLength),
                        'Cache-Control': 'no-store'
                    }
                });
            }
        } catch (error) {
            log.warn?.(`TTS provider fallback failed: ${error instanceof Error ? error.message : error}`);
        }
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'TTS unavailable: no reachable voice provider (router down, no TTS provider configured)'
        }, {
            status: 503
        });
    }
    // ── Speech to text ──────────────────────────────────────────────────────
    if (body.mode === 'asr') {
        const audio = typeof body.audio === 'string' ? body.audio.replace(/^data:[^,]+,/, '') : '';
        if (!audio) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'audio (base64) is required for mode=asr'
        }, {
            status: 400
        });
        if (audio.length > 12 * 1024 * 1024) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Audio too large'
            }, {
                status: 413
            });
        }
        const buffer = Buffer.from(audio, 'base64');
        // 1. FreeLLM router (multipart transcription, model 'auto').
        const router = resolveRouter();
        if (router) {
            try {
                const form = new FormData();
                form.append('file', new Blob([
                    new Uint8Array(buffer)
                ], {
                    type: typeof body.mimeType === 'string' ? body.mimeType : 'audio/webm'
                }), 'utterance.webm');
                form.append('model', 'auto');
                const upstream = await fetch(`${router.baseUrl}/audio/transcriptions`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${router.apiKey}`
                    },
                    body: form,
                    signal: AbortSignal.timeout(50000)
                });
                if (upstream.ok) {
                    const data = await upstream.json().catch(()=>null);
                    if (data && typeof data.text === 'string') {
                        log.info?.(`ASR ok via router (${buffer.byteLength}B): ${data.text.slice(0, 80)}`);
                        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                            text: data.text
                        });
                    }
                }
                const errText = await upstream.text().catch(()=>upstream.statusText);
                log.warn?.(`ASR router ${upstream.status}: ${errText.slice(0, 200)}`);
            } catch (error) {
                log.warn?.(`ASR router unreachable: ${error instanceof Error ? error.message : error}`);
            }
        }
        // 2. Operator-configured ASR provider ('zai' is the router path above).
        try {
            const { getServerASRProviders, resolveASRApiKey, resolveASRBaseUrl } = await Promise.all(/* import() */[__webpack_require__.e(426), __webpack_require__.e(4007)]).then(__webpack_require__.bind(__webpack_require__, 834007));
            const configured = Object.keys(getServerASRProviders()).filter((id)=>id !== 'zai');
            const providerId = configured[0];
            if (providerId) {
                const { transcribeAudio } = await Promise.all(/* import() */[__webpack_require__.e(2393), __webpack_require__.e(8963), __webpack_require__.e(1545), __webpack_require__.e(1229), __webpack_require__.e(2317)]).then(__webpack_require__.bind(__webpack_require__, 972317));
                const config = {
                    providerId: providerId,
                    apiKey: resolveASRApiKey(providerId),
                    baseUrl: resolveASRBaseUrl(providerId)
                };
                const result = await transcribeAudio(config, buffer);
                log.info?.(`ASR ok via ${providerId} (${buffer.byteLength}B): ${result.text.slice(0, 80)}`);
                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                    text: result.text
                });
            }
        } catch (error) {
            log.warn?.(`ASR provider fallback failed: ${error instanceof Error ? error.message : error}`);
        }
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'ASR unavailable: no reachable transcription provider'
        }, {
            status: 503
        });
    }
    // ── Legacy chat mode ────────────────────────────────────────────────────
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'Chat moved to /api/agent/chat/v2 (SSE). Voice modes: mode=tts|asr.'
    }, {
        status: 410
    });
}


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
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592], () => (__webpack_exec__(101778)));
module.exports = __webpack_exports__;

})();