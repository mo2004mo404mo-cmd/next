"use strict";
(() => {
var exports = {};
exports.id = 3230;
exports.ids = [3230];
exports.modules = {

/***/ 47739:
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
        page: "/favicon.ico/route",
        pathname: "/favicon.ico",
        filename: "favicon",
        bundlePath: "app/favicon.ico/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "next-metadata-route-loader?filePath=%2Fworkspaces%2Fnext%2Frun%2Fsrc%2Fapp%2Ffavicon.ico&isDynamicRouteExtension=0!?__next_metadata_route__",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(620617),
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
    let srcPage = "/favicon.ico/route";
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

module.exports = require("next/dist/server/runtime-reacts.external.js");

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

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 620617:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   dynamic: () => (/* binding */ dynamic)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* static asset route */


const contentType = "image/x-icon"
const buffer = Buffer.from("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", 'base64'
  )

if (false) {}

function GET() {
  return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': "public, max-age=0, must-revalidate",
    },
  })
}

const dynamic = 'force-static'


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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592], () => (__webpack_exec__(47739)));
module.exports = __webpack_exports__;

})();