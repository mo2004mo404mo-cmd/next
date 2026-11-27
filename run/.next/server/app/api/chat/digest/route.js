"use strict";
(() => {
var exports = {};
exports.id = 2719;
exports.ids = [2719,6389];
exports.modules = {

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 55591:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 72516:
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
        page: "/api/chat/digest/route",
        pathname: "/api/chat/digest",
        filename: "route",
        bundlePath: "app/api/chat/digest/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/chat/digest/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(672707),
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
    let srcPage = "/api/chat/digest/route";
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

/***/ 134631:
/***/ ((module) => {

module.exports = require("tls");

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

/***/ 318958:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ digestUnreadMessages)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _lib_agent_provider_fast_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(286155);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const CHUNK_SIZE = 40;
function formatTimestamp(date) {
    const pad = (value)=>String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
/** Robustly pull a JSON object out of a model reply (handles ```json fences
 * and trailing prose). */ function parseJsonObject(text) {
    const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text);
    const candidate = fenced ? fenced[1] : text;
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');
    if (start < 0 || end <= start) return null;
    try {
        const parsed = JSON.parse(candidate.slice(start, end + 1));
        return typeof parsed === 'object' && parsed !== null ? parsed : null;
    } catch  {
        return null;
    }
}
function coerceEvents(raw) {
    if (!Array.isArray(raw)) return [];
    const allowed = [
        'meeting',
        'exam',
        'deadline',
        'schedule_change',
        'announcement',
        'other'
    ];
    const events = [];
    for (const item of raw.slice(0, 25)){
        if (typeof item !== 'object' || item === null) continue;
        const record = item;
        const title = typeof record.title === 'string' ? record.title.trim() : '';
        if (!title) continue;
        events.push({
            type: allowed.includes(record.type) ? record.type : 'other',
            title: title.slice(0, 140),
            when: typeof record.when === 'string' ? record.when.slice(0, 80) : undefined,
            who: typeof record.who === 'string' ? record.who.slice(0, 60) : undefined,
            detail: typeof record.detail === 'string' ? record.detail.slice(0, 240) : undefined,
            messageId: typeof record.messageId === 'string' ? record.messageId : undefined
        });
    }
    return events;
}
const CHUNK_SYSTEM = [
    'You summarize one chunk of a group chat for a busy medical student.',
    'Return ONLY a JSON object: {"summary": string, "events": array}.',
    'summary: <=90 words, factual, names who said what matters.',
    'events: only REAL scheduled things found in THIS chunk — meetings, exams, quizzes, deadlines, schedule changes, official announcements.',
    'Each event: {"type": "meeting|exam|deadline|schedule_change|announcement|other", "title": short, "when": date/time EXACTLY as stated, "who": who it concerns, "detail": one line, "messageId": the id given for the message it came from}.',
    'No event if nothing scheduled appears. Never invent dates, times or events.'
].join('\n');
const REDUCE_SYSTEM = [
    'You merge partial chat digests into ONE final digest for a busy medical student.',
    'Return ONLY a JSON object: {"digest": string, "events": array}.',
    'digest: markdown with sections "## Overview" (3-4 sentences), "## Key topics" (bullets), "## Decisions & answers" (bullets, who decided), "## Needs your attention" (questions asked to the student, action items).',
    'events: the MERGED, deduplicated event list from all chunks (same shape: type/title/when/who/detail/messageId). Keep the most precise "when".',
    'Stay strictly faithful to the partial digests — no new facts.'
].join('\n');
/** One map step: summarize one chunk on the fast model. */ async function summarizeChunk(model, roomName, lines, messageIds) {
    const numbered = lines.map((line, index)=>`${messageIds[index]} · ${line}`).join('\n');
    const response = await invokeWithRetry(model, [
        {
            role: 'system',
            content: CHUNK_SYSTEM
        },
        {
            role: 'user',
            content: `Room: "${roomName}". Messages (id · [time] Sender: text):\n\n${numbered}`
        }
    ]);
    const text = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
    const parsed = parseJsonObject(text);
    if (!parsed) {
        return {
            summary: text.slice(0, 600),
            events: []
        };
    }
    return {
        summary: typeof parsed.summary === 'string' ? parsed.summary : '',
        events: coerceEvents(parsed.events)
    };
}
function dedupeEvents(events) {
    const seen = new Map();
    for (const event of events){
        const key = `${event.type}|${event.title.toLowerCase().slice(0, 60)}`;
        if (!seen.has(key)) seen.set(key, event);
    }
    return Array.from(seen.values()).slice(0, 20);
}
/** Rate-limit-resilient invoke: the shared gateway storms transiently (429
 * "Too many requests" wrapping) — retrying after a short backoff usually
 * clears it. When the primary stays saturated, the managed Z.AI backup
 * (same 3rd rung as the chat runtime's ladder) takes the final attempt. */ async function invokeWithRetry(model, messages, attempts = 3) {
    let lastError;
    let rateLimited = false;
    for(let attempt = 0; attempt < attempts; attempt += 1){
        try {
            return await model.invoke(messages);
        } catch (error) {
            lastError = error;
            const text = error instanceof Error ? error.message : String(error);
            rateLimited = /429|rate.?limit|too many requests|all models exhausted/i.test(text);
            if (!rateLimited) throw error; // non-rate errors propagate unchanged
            if (attempt < attempts - 1) {
                await new Promise((resolve)=>setTimeout(resolve, 8000 * (attempt + 1)));
            }
        }
    }
    // All attempts rate-limited → final rung: the Z.AI backup endpoint.
    if (rateLimited) {
        const backup = (0,_lib_agent_provider_fast_model__WEBPACK_IMPORTED_MODULE_1__/* .buildZaiBackupModel */ ._4)();
        if (backup) {
            return await backup.invoke(messages);
        }
    }
    throw lastError;
}
/** The reduce step: merge chunk digests into the final digest + events. */ async function mergeDigests(model, roomName, chunks) {
    const parts = chunks.map((chunk, index)=>`### Part ${index + 1}\n${chunk.summary || '(no summary)'}\nEvents: ${JSON.stringify(chunk.events)}`).join('\n\n');
    const response = await invokeWithRetry(model, [
        {
            role: 'system',
            content: REDUCE_SYSTEM
        },
        {
            role: 'user',
            content: `Room: "${roomName}". Partial digests:\n\n${parts}`
        }
    ]);
    const text = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
    const parsed = parseJsonObject(text);
    if (!parsed) {
        // Fall back to mechanical merge — still useful, never a dead end.
        return {
            summary: chunks.map((chunk)=>chunk.summary).filter(Boolean).join('\n\n'),
            events: dedupeEvents(chunks.flatMap((chunk)=>chunk.events))
        };
    }
    const mergedEvents = coerceEvents(parsed.events);
    return {
        summary: typeof parsed.digest === 'string' ? parsed.digest : '',
        events: mergedEvents.length > 0 ? mergedEvents : dedupeEvents(chunks.flatMap((chunk)=>chunk.events))
    };
}
async function digestUnreadMessages(options) {
    const { userId, roomId, signal } = options;
    const maxMessages = Math.min(Math.max(options.maxMessages ?? 600, 20), 1000);
    const membership = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.chatRoomMember.findUnique({
        where: {
            roomId_userId: {
                roomId,
                userId
            }
        },
        include: {
            room: {
                select: {
                    id: true,
                    name: true,
                    type: true
                }
            }
        }
    });
    if (!membership) throw new Error('Not a member of that room');
    const room = membership.room;
    const cutoff = options.since ?? membership.lastReadAt;
    const unreadWhere = {
        roomId,
        senderId: {
            not: userId
        },
        isDeleted: false,
        createdAt: {
            gt: cutoff
        }
    };
    const [totalUnread, rows] = await Promise.all([
        _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.chatMessage.count({
            where: unreadWhere
        }),
        _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.chatMessage.findMany({
            where: unreadWhere,
            include: {
                sender: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            },
            take: maxMessages
        })
    ]);
    if (rows.length === 0) {
        return {
            roomId,
            roomName: room.name || 'Direct message',
            totalUnread: 0,
            analyzed: 0,
            skippedOldest: 0,
            digest: options.since ? `No messages from others in that time window.` : 'No unread messages in this room.',
            events: [],
            model: 'none'
        };
    }
    const skippedOldest = Math.max(totalUnread - rows.length, 0);
    // Aux model ladder: explicitly-passed model (agent runtime) → fast model
    // (opt-in) → env-chain primary (the auto model) → Z.AI backup. With the
    // routing revert, this is the SAME model the chat loop uses.
    const model = options.model ?? (0,_lib_agent_provider_fast_model__WEBPACK_IMPORTED_MODULE_1__/* .buildAuxModel */ .qW)() ?? null;
    const roomName = room.type === 'group' ? room.name || 'the group' : 'this conversation';
    const lines = rows.map((row)=>{
        const text = (row.content || `[${row.type}]`).replace(/\s+/g, ' ').slice(0, 400);
        return `[${formatTimestamp(row.createdAt)}] ${row.sender?.name ?? 'Someone'}: ${text}`;
    });
    const messageIds = rows.map((row)=>row.id);
    let chunks;
    if (!model) {
        // No LLM configured — mechanical fallback: newest 25 messages verbatim.
        const newest = lines.slice(-25);
        chunks = [
            {
                summary: `No summarization model is configured. Latest unread messages:\n\n${newest.join('\n')}`,
                events: []
            }
        ];
    } else {
        const chunkPromises = [];
        for(let start = 0; start < lines.length; start += CHUNK_SIZE){
            chunkPromises.push(summarizeChunk(model, roomName, lines.slice(start, start + CHUNK_SIZE), messageIds.slice(start, start + CHUNK_SIZE)));
        }
        chunks = await Promise.all(chunkPromises);
        if (signal?.aborted) throw new Error('Digest aborted');
    }
    const merged = chunks.length > 1 && model ? await mergeDigests(model, roomName, chunks) : {
        summary: chunks[0]?.summary ?? '',
        events: dedupeEvents(chunks.flatMap((chunk)=>chunk.events))
    };
    const header = skippedOldest > 0 ? `> Note: you have ${totalUnread} unread messages; the ${skippedOldest} oldest were beyond the digest window (${rows.length} analyzed, newest prioritized).\n\n` : '';
    return {
        roomId,
        roomName: room.name || 'Direct message',
        totalUnread,
        analyzed: rows.length,
        skippedOldest,
        digest: `${header}${merged.summary}`,
        events: merged.events,
        model: model ? String(model.model ?? 'fast-model') : 'fallback'
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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

/***/ 343753:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ sendPushForNotification),
/* harmony export */   sendPushToUser: () => (/* binding */ sendPushToUser)
/* harmony export */ });
/* harmony import */ var web_push__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68342);
/* harmony import */ var web_push__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web_push__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__]);
_lib_db__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Web Push server-side helper.
 *
 * Wraps the `web-push` library with MedQ's VAPID config and Prisma
 * PushSubscription storage. Used by:
 *   - /api/push/subscribe   (client subscribes a new device)
 *   - /api/push/unsubscribe (client removes a device)
 *   - /api/push/send        (admin/debug: send to one user)
 *   - sendPushForNotification() (auto-called whenever a Notification is created)
 *
 * VAPID keys are read from env (VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY,
 * VAPID_SUBJECT). If any are missing, push is disabled — functions become
 * no-ops and return a `disabled` status, so the rest of the app keeps working.
 */ 

let configured = false;
function ensureConfigured() {
    if (configured) return true;
    const publicKey = process.env.VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject = process.env.VAPID_SUBJECT || 'mailto:admin@medq.local';
    if (!publicKey || !privateKey) {
        return false;
    }
    web_push__WEBPACK_IMPORTED_MODULE_0___default().setVapidDetails(subject, publicKey, privateKey);
    configured = true;
    return true;
}
/**
 * Send a push notification to ALL of a user's subscribed devices.
 * Returns per-subscription outcomes so callers can prune dead subscriptions.
 */ async function sendPushToUser(userId, payload) {
    if (!ensureConfigured()) {
        // Push not configured — silently no-op. Callers should still create the
        // Notification row in the DB so it shows up in the in-app bell.
        return {
            sent: 0,
            failed: 0,
            total: 0,
            disabled: true
        };
    }
    const subs = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.pushSubscription.findMany({
        where: {
            userId
        }
    });
    if (subs.length === 0) {
        return {
            sent: 0,
            failed: 0,
            total: 0
        };
    }
    const message = JSON.stringify({
        title: payload.title,
        body: payload.body,
        url: payload.url || '/',
        icon: payload.icon || '/icons/icon-192.png',
        badge: payload.badge || '/icons/icon-192.png',
        tag: payload.tag || 'medq-notification',
        data: payload.data || {}
    });
    const staleEndpoints = [];
    let sent = 0;
    let failed = 0;
    await Promise.all(subs.map(async (sub)=>{
        const wpSub = {
            endpoint: sub.endpoint,
            keys: {
                p256dh: sub.p256dh,
                auth: sub.auth
            }
        };
        try {
            await web_push__WEBPACK_IMPORTED_MODULE_0___default().sendNotification(wpSub, message);
            sent++;
        } catch (err) {
            failed++;
            // 404 = subscription expired, 410 = subscription deleted, 413 = payload too large (config error)
            // In all these cases the subscription is dead and should be removed.
            const status = err?.statusCode;
            if (status === 404 || status === 410 || status === 400) {
                staleEndpoints.push(sub.endpoint);
            }
        // 429 (rate limit) and 5xx are transient — leave the subscription alone.
        }
    }));
    // Prune dead subscriptions in the background (don't block the response).
    if (staleEndpoints.length > 0) {
        _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.pushSubscription.deleteMany({
            where: {
                endpoint: {
                    in: staleEndpoints
                }
            }
        }).catch(()=>{
        // Best-effort cleanup — failures here don't matter.
        });
    }
    return {
        sent,
        failed,
        total: subs.length
    };
}
/**
 * Convenience: send a push notification matching an in-app Notification row.
 * Called from notification creation sites (friends, posts, groups, etc.) so
 * users on mobile get a real system notification even when the tab is closed.
 */ async function sendPushForNotification(notificationId) {
    try {
        const n = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.notification.findUnique({
            where: {
                id: notificationId
            },
            select: {
                id: true,
                userId: true,
                type: true,
                title: true,
                message: true,
                referenceId: true
            }
        });
        if (!n) return;
        // Map notification types to deep-link URLs.
        // For chat-related notifications, `referenceId` may encode the
        // `<roomId>:<messageId>` pair — if so, we deep-link directly to the
        // specific message so the recipient lands on the conversation context
        // instead of just the Messages tab.
        const chatDeepLink = (()=>{
            if (!n.referenceId) return null;
            // referenceId format: `<roomId>:<messageId>` (set by chat mention
            // notification creators). Anything else falls back to /messages.
            const parts = n.referenceId.split(':');
            if (parts.length === 2 && parts[0] && parts[1]) {
                return `/messages?room=${parts[0]}&msg=${parts[1]}`;
            }
            if (parts.length === 1 && parts[0]) {
                return `/messages?room=${parts[0]}`;
            }
            return null;
        })();
        const urlForType = {
            friend_request: '/friends',
            challenge: '/challenge-arena',
            group_invite: '/groups',
            post_like: '/feed',
            post_comment: '/feed',
            mention: chatDeepLink || '/feed',
            chat_mention: chatDeepLink || '/messages',
            chat_reply: chatDeepLink || '/messages',
            chat_message: chatDeepLink || '/messages',
            achievement: '/achievements',
            system: '/',
            daily_challenge: '/daily-challenge',
            study_reminder: '/dashboard'
        };
        await sendPushToUser(n.userId, {
            title: n.title || 'MedQ',
            body: n.message,
            url: urlForType[n.type] || '/',
            tag: `medq-${n.type}`,
            data: {
                notificationId: n.id,
                type: n.type,
                referenceId: n.referenceId
            }
        });
    } catch (err) {
        // Push failures must never break the calling API route.
        console.error('[push] sendPushForNotification failed:', err);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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

/***/ 379551:
/***/ ((module) => {

module.exports = require("url");

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

/***/ 491645:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 583997:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 663033:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 672707:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   PUT: () => (/* binding */ PUT),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration),
/* harmony export */   runtime: () => (/* binding */ runtime)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(122035);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(520903);
/* harmony import */ var _lib_server_push__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(343753);
/* harmony import */ var _lib_chat_digest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(318958);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_db__WEBPACK_IMPORTED_MODULE_2__, _lib_server_push__WEBPACK_IMPORTED_MODULE_3__, _lib_chat_digest__WEBPACK_IMPORTED_MODULE_4__]);
([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_db__WEBPACK_IMPORTED_MODULE_2__, _lib_server_push__WEBPACK_IMPORTED_MODULE_3__, _lib_chat_digest__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Chat unread digest API — the Messages tab's "AI digest" button.
 *
 * POST /api/chat/digest  { roomId }
 *
 * Runs the chunked map-reduce digest (src/lib/chat/digest.ts — the SAME
 * engine the agent's summarize_unread_messages tool uses) over the user's
 * UNREAD messages in one room and returns the digest plus extracted events
 * (meetings, exam schedules, deadlines). Never marks the room as read.
 */ 




const runtime = 'nodejs';
const maxDuration = 120;
async function POST(req) {
    try {
        const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .getAuthenticatedUserId */ .At)(req);
        if (!userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Unauthorized'
        }, {
            status: 401
        });
        const body = await req.json().catch(()=>({}));
        const roomId = typeof body.roomId === 'string' ? body.roomId : '';
        if (!roomId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'roomId is required'
        }, {
            status: 400
        });
        // Time-window mode: opening a room marks it read, so the Messages-tab
        // button offers "digest the last N hours" as the fallback scope.
        let since;
        if (typeof body.hours === 'number' && Number.isFinite(body.hours)) {
            const hours = Math.min(Math.max(body.hours, 1), 24 * 30);
            since = new Date(Date.now() - hours * 60 * 60 * 1000);
        }
        const digest = await (0,_lib_chat_digest__WEBPACK_IMPORTED_MODULE_4__/* .digestUnreadMessages */ .o)({
            userId,
            roomId,
            since
        });
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(digest);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        const status = message === 'Not a member of that room' ? 403 : 500;
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: message
        }, {
            status
        });
    }
}
/**
 * PUT /api/chat/digest  { roomId, messageId?, title, body }
 *
 * "Notify me" for one extracted event: creates an in-app Notification and
 * sends the web push (deep-linking back to the room — or the exact message
 * when the digest carried its id). The user asked for this explicitly from
 * the digest dialog, so no HITL gate is needed here (unlike the agent tool).
 */ async function PUT(req) {
    try {
        const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .getAuthenticatedUserId */ .At)(req);
        if (!userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Unauthorized'
        }, {
            status: 401
        });
        const body = await req.json().catch(()=>({}));
        const roomId = typeof body.roomId === 'string' ? body.roomId : '';
        const messageId = typeof body.messageId === 'string' ? body.messageId : '';
        const title = typeof body.title === 'string' ? body.title.trim() : '';
        const message = typeof body.body === 'string' ? body.body.trim() : '';
        if (!roomId || !title || !message) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'roomId, title and body are required'
            }, {
                status: 400
            });
        }
        // Membership check — notifications only for rooms the user belongs to.
        const membership = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.db.chatRoomMember.findUnique({
            where: {
                roomId_userId: {
                    roomId,
                    userId
                }
            }
        }).catch(()=>null);
        if (!membership) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Not a member of that room'
            }, {
                status: 403
            });
        }
        const created = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.db.notification.create({
            data: {
                userId,
                type: roomId ? 'chat_mention' : 'system',
                title: title.slice(0, 120),
                message: message.slice(0, 300),
                referenceId: roomId && messageId ? `${roomId}:${messageId}` : roomId || ''
            }
        });
        // sendPushToUser returns real delivery stats (sendPushForNotification is
        // void); the deep-link mirrors the referenceId format it would compute.
        const push = await (0,_lib_server_push__WEBPACK_IMPORTED_MODULE_3__.sendPushToUser)(userId, {
            title,
            body: message,
            url: roomId && messageId ? `/messages?room=${roomId}&msg=${messageId}` : roomId ? `/messages?room=${roomId}` : '/',
            tag: 'medq-chat-event',
            data: {
                notificationId: created.id
            }
        }).catch(()=>({
                sent: 0,
                failed: 0,
                total: 0,
                disabled: true
            }));
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            sent: true,
            notificationId: created.id,
            push
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: message
        }, {
            status: 500
        });
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

/***/ 781630:
/***/ ((module) => {

module.exports = require("http");

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

/***/ 912412:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 927910:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 973024:
/***/ ((module) => {

module.exports = require("node:fs");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,1890,9611,8093,859,2035], () => (__webpack_exec__(72516)));
module.exports = __webpack_exports__;

})();