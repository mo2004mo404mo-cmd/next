(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[93794],{

/***/ 42:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * This module imports the configured client instrumentation modules.
 *
 * The `private-next-instrumentation-client` module is automatically aliased to
 * either the user's instrumentation module or a generated module array.
 */ 
if (false) {} else {
    // eslint-disable-next-line @next/internal/typechecked-require -- Not a module.
    const instrumentationClient = __webpack_require__(12699);
    module.exports = Array.isArray(instrumentationClient) ? instrumentationClient : [
        instrumentationClient
    ];
}

//# sourceMappingURL=require-instrumentation-client.js.map

/***/ }),

/***/ 145:
/***/ ((module, exports) => {

"use strict";
// Adapted from React's sanitizeURL function found here: https://github.com/facebook/react/blob/b565373afd0cc1988497e1107106e851e8cfb261/packages/react-dom-bindings/src/shared/sanitizeURL.js
// A javascript: URL can contain leading C0 control or \u0020 SPACE,
// and any newline or tab are filtered out as if they're not part of the URL.
// https://url.spec.whatwg.org/#url-parsing
// Tab or newline are defined as \r\n\t:
// https://infra.spec.whatwg.org/#ascii-tab-or-newline
// A C0 control is a code point in the range \u0000 NULL to \u001F
// INFORMATION SEPARATOR ONE, inclusive:
// https://infra.spec.whatwg.org/#c0-control-or-space

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isJavaScriptURLString", ({
    enumerable: true,
    get: function() {
        return isJavaScriptURLString;
    }
}));
const isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function isJavaScriptURLString(url) {
    return isJavaScriptProtocol.test('' + url);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=javascript-url.js.map


/***/ }),

/***/ 1262:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    SERVER_REFERENCE_ID_LENGTH: function() {
        return SERVER_REFERENCE_ID_LENGTH;
    },
    extractInfoFromServerReferenceId: function() {
        return extractInfoFromServerReferenceId;
    },
    mightBeServerReferenceId: function() {
        return mightBeServerReferenceId;
    },
    omitUnusedArgs: function() {
        return omitUnusedArgs;
    }
});
const SERVER_REFERENCE_ID_LENGTH = 42;
function mightBeServerReferenceId(id) {
    return id.length === SERVER_REFERENCE_ID_LENGTH;
}
function extractInfoFromServerReferenceId(id) {
    const infoByte = parseInt(id.slice(0, 2), 16);
    const typeBit = infoByte >> 7 & 0x1;
    const argMask = infoByte >> 1 & 0x3f;
    const restArgs = infoByte & 0x1;
    const usedArgs = Array(6);
    for(let index = 0; index < 6; index++){
        const bitPosition = 5 - index;
        const bit = argMask >> bitPosition & 0x1;
        usedArgs[index] = bit === 1;
    }
    return {
        type: typeBit === 1 ? 'use-cache' : 'server-action',
        usedArgs: usedArgs,
        hasRestArgs: restArgs === 1
    };
}
function omitUnusedArgs(args, info) {
    const filteredArgs = new Array(args.length);
    let length = 0;
    for(let index = 0; index < args.length; index++){
        if (index < 6 && info.usedArgs[index] || // This assumes that the server reference info byte has the restArgs bit
        // set to 1 if there are more than 6 args.
        index >= 6 && info.hasRestArgs) {
            filteredArgs[index] = args[index];
            length = index + 1;
        }
    }
    // Trim trailing unused args from the array.
    filteredArgs.length = length;
    return filteredArgs;
} //# sourceMappingURL=server-reference-info.js.map


/***/ }),

/***/ 1280:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "reducer", ({
    enumerable: true,
    get: function() {
        return reducer;
    }
}));
const _routerreducertypes = __webpack_require__(74616);
const _navigatereducer = __webpack_require__(15368);
const _serverpatchreducer = __webpack_require__(41467);
const _restorereducer = __webpack_require__(23629);
const _refreshreducer = __webpack_require__(92512);
const _serveractionreducer = __webpack_require__(87491);
/**
 * Reducer that handles the app-router state updates.
 */ function clientReducer(state, action) {
    switch(action.type){
        case _routerreducertypes.ACTION_NAVIGATE:
            {
                return (0, _navigatereducer.navigateReducer)(state, action);
            }
        case _routerreducertypes.ACTION_SERVER_PATCH:
            {
                return (0, _serverpatchreducer.serverPatchReducer)(state, action);
            }
        case _routerreducertypes.ACTION_RESTORE:
            {
                return (0, _restorereducer.restoreReducer)(state, action);
            }
        case _routerreducertypes.ACTION_REFRESH:
            {
                return (0, _refreshreducer.refreshReducer)(state, action);
            }
        case _routerreducertypes.ACTION_HMR_REFRESH:
            {
                if (false) {} else {
                    throw Object.defineProperty(new Error('hmrRefresh can only be used in development mode. Please use refresh instead.'), "__NEXT_ERROR_CODE", {
                        value: "E485",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        case _routerreducertypes.ACTION_SERVER_ACTION:
            {
                return (0, _serveractionreducer.serverActionReducer)(state, action);
            }
        // This case should never be hit as dispatch is strongly typed.
        default:
            throw Object.defineProperty(new Error('Unknown action'), "__NEXT_ERROR_CODE", {
                value: "E295",
                enumerable: false,
                configurable: true
            });
    }
}
function serverReducer(state, _action) {
    return state;
}
const reducer =  false ? 0 : clientReducer;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-reducer.js.map


/***/ }),

/***/ 1980:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// This has to be a shared module which is shared between client component error boundary and dynamic component

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super(`Bail out to client-side rendering: ${reason}`), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map


/***/ }),

/***/ 2451:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "encodeURIPath", ({
    enumerable: true,
    get: function() {
        return encodeURIPath;
    }
}));
function encodeURIPath(file) {
    return file.split('/').map((p)=>encodeURIComponent(p)).join('/');
} //# sourceMappingURL=encode-uri-path.js.map


/***/ }),

/***/ 2522:
/***/ ((module, exports) => {

"use strict";
// Browser variant of `./navigation-dynamic-rendering`. The dynamic-rendering
// hooks only run on the server; callers use optional calls, so these are
// `undefined` in the browser.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    useDynamicRouteParams: function() {
        return useDynamicRouteParams;
    },
    useDynamicSearchParams: function() {
        return useDynamicSearchParams;
    }
});
const useDynamicRouteParams = undefined;
const useDynamicSearchParams = undefined;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation-dynamic-rendering.browser.js.map


/***/ }),

/***/ 3005:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unauthorized", ({
    enumerable: true,
    get: function() {
        return unauthorized;
    }
}));
const _httpaccessfallback = __webpack_require__(87016);
// TODO: Add `unauthorized` docs
/**
 * @experimental
 * This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
 * within a route segment as well as inject a tag.
 *
 * `unauthorized()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 *
 * Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};401`;
function unauthorized() {
    if (true) {
        throw Object.defineProperty(new Error(`\`unauthorized()\` is experimental and only allowed to be used when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E411",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E1002",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unauthorized.js.map


/***/ }),

/***/ 3584:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "setAttributesFromProps", ({
    enumerable: true,
    get: function() {
        return setAttributesFromProps;
    }
}));
const DOMAttributeNames = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
    noModule: 'noModule'
};
const ignoreProps = [
    'onLoad',
    'onReady',
    'dangerouslySetInnerHTML',
    'children',
    'onError',
    'strategy',
    'stylesheets'
];
function isBooleanScriptAttribute(attr) {
    return [
        'async',
        'defer',
        'noModule'
    ].includes(attr);
}
function setAttributesFromProps(el, props) {
    for (const [p, value] of Object.entries(props)){
        if (!props.hasOwnProperty(p)) continue;
        if (ignoreProps.includes(p)) continue;
        // we don't render undefined props to the DOM
        if (value === undefined) {
            continue;
        }
        const attr = DOMAttributeNames[p] || p.toLowerCase();
        if (el.tagName === 'SCRIPT' && isBooleanScriptAttribute(attr)) {
            // Correctly assign boolean script attributes
            // https://github.com/vercel/next.js/pull/20748
            ;
            el[attr] = !!value;
        } else {
            el.setAttribute(attr, String(value));
        }
        // Remove falsy non-zero boolean attributes so they are correctly interpreted
        // (e.g. if we set them to false, this coerces to the string "false", which the browser interprets as true)
        if (value === false || el.tagName === 'SCRIPT' && isBooleanScriptAttribute(attr) && (!value || value === 'false')) {
            // Call setAttribute before, as we need to set and unset the attribute to override force async:
            // https://html.spec.whatwg.org/multipage/scripting.html#script-force-async
            el.setAttribute(attr, '');
            el.removeAttribute(attr);
        }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=set-attributes-from-props.js.map


/***/ }),

/***/ 3967:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getObjectClassLabel: function() {
        return getObjectClassLabel;
    },
    isPlainObject: function() {
        return isPlainObject;
    }
});
function getObjectClassLabel(value) {
    return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
    if (getObjectClassLabel(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    /**
   * this used to be previously:
   *
   * `return prototype === null || prototype === Object.prototype`
   *
   * but Edge Runtime expose Object from vm, being that kind of type-checking wrongly fail.
   *
   * It was changed to the current implementation since it's resilient to serialization.
   */ return prototype === null || prototype.hasOwnProperty('isPrototypeOf');
} //# sourceMappingURL=is-plain-object.js.map


/***/ }),

/***/ 4060:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "findSourceMapURL", ({
    enumerable: true,
    get: function() {
        return findSourceMapURL;
    }
}));
const basePath = (/* unused pure expression or super */ null && ( false || ''));
const pathname = (/* unused pure expression or super */ null && (`${basePath}/__nextjs_source-map`));
const findSourceMapURL =  false ? 0 : undefined;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-find-source-map-url.js.map


/***/ }),

/***/ 4103:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createInitialRSCPayloadFromFallbackPrerender: function() {
        return createInitialRSCPayloadFromFallbackPrerender;
    },
    getFlightDataPartsFromPath: function() {
        return getFlightDataPartsFromPath;
    },
    getNextFlightSegmentPath: function() {
        return getNextFlightSegmentPath;
    },
    normalizeFlightData: function() {
        return normalizeFlightData;
    },
    prepareFlightRouterStateForRequest: function() {
        return prepareFlightRouterStateForRequest;
    }
});
const _segment = __webpack_require__(78237);
const _routeparams = __webpack_require__(84536);
const _createhreffromurl = __webpack_require__(29453);
function getFlightDataPartsFromPath(flightDataPath) {
    // Pick the last 4 items from the `FlightDataPath` to get the [tree, seedData, viewport, isHeadPartial].
    const flightDataPathLength = 4;
    // tree, seedData, and head are *always* the last three items in the `FlightDataPath`.
    const [tree, seedData, head, isHeadPartial] = flightDataPath.slice(-flightDataPathLength);
    // The `FlightSegmentPath` is everything except the last three items. For a root render, it won't be present.
    const segmentPath = flightDataPath.slice(0, -flightDataPathLength);
    return {
        // TODO: Unify these two segment path helpers. We are inconsistently pushing an empty segment ("")
        // to the start of the segment path in some places which makes it hard to use solely the segment path.
        // Look for "// TODO-APP: remove ''" in the codebase.
        pathToSegment: segmentPath.slice(0, -1),
        segmentPath,
        // if the `FlightDataPath` corresponds with the root, there'll be no segment path,
        // in which case we default to ''.
        segment: segmentPath[segmentPath.length - 1] ?? '',
        tree,
        seedData,
        head,
        isHeadPartial,
        isRootRender: flightDataPath.length === flightDataPathLength
    };
}
function createInitialRSCPayloadFromFallbackPrerender(response, fallbackInitialRSCPayload) {
    // This is a static fallback page. In order to hydrate the page, we need to
    // parse the client params from the URL, but to account for the possibility
    // that the page was rewritten, we need to check the response headers
    // for x-nextjs-rewritten-path or x-nextjs-rewritten-query headers. Since
    // we can't access the headers of the initial document response, the client
    // performs a fetch request to the current location. Since it's possible that
    // the fetch request will be dynamically rewritten to a different path than
    // the initial document, this fetch request delivers _all_ the hydration data
    // for the page; it was not inlined into the document, like it normally
    // would be.
    //
    // TODO: Consider treating the case where fetch is rewritten to a different
    // path from the document as a special deopt case. We should optimistically
    // assume this won't happen, inline the data into the document, and perform
    // a minimal request (like a HEAD or range request) to verify that the
    // response matches. Tricky to get right because we need to account for
    // all the different deployment environments we support, like output:
    // "export" mode, where we currently don't assume that custom response
    // headers are present.
    // Patch the Flight data sent by the server with the correct params parsed
    // from the URL + response object.
    const renderedPathname = (0, _routeparams.getRenderedPathname)(response);
    const renderedSearch = (0, _routeparams.getRenderedSearch)(response);
    const canonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(new URL(location.href));
    const originalFlightDataPath = fallbackInitialRSCPayload.f[0];
    const originalFlightRouterState = originalFlightDataPath[0];
    const payload = {
        c: canonicalUrl.split('/'),
        q: renderedSearch,
        i: fallbackInitialRSCPayload.i,
        f: [
            [
                fillInFallbackFlightRouterState(originalFlightRouterState, renderedPathname, renderedSearch),
                originalFlightDataPath[1],
                originalFlightDataPath[2],
                // isHeadPartial. Previously this incorrectly passed the head itself
                // (index 2), which is truthy, so the head was always treated
                // as partial.
                originalFlightDataPath[3]
            ]
        ],
        m: fallbackInitialRSCPayload.m,
        G: fallbackInitialRSCPayload.G,
        S: fallbackInitialRSCPayload.S,
        h: fallbackInitialRSCPayload.h
    };
    if (fallbackInitialRSCPayload.b) {
        payload.b = fallbackInitialRSCPayload.b;
    }
    return payload;
}
function fillInFallbackFlightRouterState(flightRouterState, renderedPathname, renderedSearch) {
    const pathnameParts = renderedPathname.split('/').filter((p)=>p !== '');
    const index = 0;
    return fillInFallbackFlightRouterStateImpl(flightRouterState, renderedSearch, pathnameParts, index);
}
function fillInFallbackFlightRouterStateImpl(flightRouterState, renderedSearch, pathnameParts, pathnamePartsIndex) {
    const originalSegment = flightRouterState[0];
    let newSegment;
    let doesAppearInURL;
    if (typeof originalSegment === 'string') {
        newSegment = originalSegment;
        doesAppearInURL = (0, _routeparams.doesStaticSegmentAppearInURL)(originalSegment);
    } else {
        const paramName = originalSegment[0];
        const paramType = originalSegment[2];
        const staticSiblings = originalSegment[3];
        const paramValue = (0, _routeparams.parseDynamicParamFromURLPart)(paramType, pathnameParts, pathnamePartsIndex);
        const cacheKey = (0, _routeparams.getCacheKeyForDynamicParam)(paramValue, renderedSearch);
        newSegment = [
            paramName,
            cacheKey,
            paramType,
            staticSiblings
        ];
        doesAppearInURL = true;
    }
    // Only increment the index if the segment appears in the URL. If it's a
    // "virtual" segment, like a route group, it remains the same.
    const childPathnamePartsIndex = doesAppearInURL ? pathnamePartsIndex + 1 : pathnamePartsIndex;
    const children = flightRouterState[1];
    const newChildren = {};
    for(let key in children){
        const childFlightRouterState = children[key];
        newChildren[key] = fillInFallbackFlightRouterStateImpl(childFlightRouterState, renderedSearch, pathnameParts, childPathnamePartsIndex);
    }
    const newState = [
        newSegment,
        newChildren,
        null,
        flightRouterState[3],
        flightRouterState[4]
    ];
    return newState;
}
function getNextFlightSegmentPath(flightSegmentPath) {
    // Since `FlightSegmentPath` is a repeated tuple of `Segment` and `ParallelRouteKey`, we slice off two items
    // to get the next segment path.
    return flightSegmentPath.slice(2);
}
function normalizeFlightData(flightData) {
    // FlightData can be a string when the server didn't respond with a proper flight response,
    // or when a redirect happens, to signal to the client that it needs to perform an MPA navigation.
    if (typeof flightData === 'string') {
        return flightData;
    }
    return flightData.map((flightDataPath)=>getFlightDataPartsFromPath(flightDataPath));
}
function prepareFlightRouterStateForRequest(flightRouterState, isHmrRefresh) {
    // HMR requests need the complete, unmodified state for proper functionality
    if (isHmrRefresh) {
        return encodeURIComponent(JSON.stringify(flightRouterState));
    }
    return encodeURIComponent(JSON.stringify(stripClientOnlyDataFromFlightRouterState(flightRouterState)));
}
/**
 * Recursively strips client-only data from FlightRouterState while preserving
 * server-needed information for proper rendering decisions.
 */ function stripClientOnlyDataFromFlightRouterState(flightRouterState) {
    const [segment, parallelRoutes, _refreshState, refreshMarker, prefetchHints] = flightRouterState;
    // Strip client-only data from the segment
    const cleanedSegment = stripClientOnlyDataFromSegment(segment);
    // Recursively process parallel routes
    const cleanedParallelRoutes = {};
    for (const [key, childState] of Object.entries(parallelRoutes)){
        cleanedParallelRoutes[key] = stripClientOnlyDataFromFlightRouterState(childState);
    }
    const result = [
        cleanedSegment,
        cleanedParallelRoutes
    ];
    if (refreshMarker) {
        result[2] = null // null slightly more compact than undefined
        ;
        result[3] = refreshMarker;
    }
    // Append optional fields if present
    if (prefetchHints !== undefined) {
        result[4] = prefetchHints;
    }
    // Everything else is used only by the client and is not needed for requests.
    return result;
}
/**
 * Strips client-only data from segments:
 * - Search parameters from __PAGE__ segments
 * - staticSiblings from dynamic segment tuples (only needed for client-side
 *   prefetch reuse decisions)
 */ function stripClientOnlyDataFromSegment(segment) {
    if (typeof segment === 'string') {
        // Strip search params from __PAGE__ segments
        if (segment.startsWith(_segment.PAGE_SEGMENT_KEY + '?')) {
            return _segment.PAGE_SEGMENT_KEY;
        }
        return segment;
    }
    // Dynamic segment tuple: [paramName, paramCacheKey, paramType, staticSiblings]
    // Strip staticSiblings (4th element) since server doesn't need it
    const [paramName, paramCacheKey, paramType] = segment;
    return [
        paramName,
        paramCacheKey,
        paramType,
        null
    ];
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=flight-data-helpers.js.map


/***/ }),

/***/ 4542:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createPromiseWithResolvers", ({
    enumerable: true,
    get: function() {
        return createPromiseWithResolvers;
    }
}));
function createPromiseWithResolvers() {
    // Shim of Stage 4 Promise.withResolvers proposal
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        resolve = res;
        reject = rej;
    });
    return {
        resolve: resolve,
        reject: reject,
        promise
    };
} //# sourceMappingURL=promise-with-resolvers.js.map


/***/ }),

/***/ 7103:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ACTION_SUFFIX: function() {
        return ACTION_SUFFIX;
    },
    APP_DIR_ALIAS: function() {
        return APP_DIR_ALIAS;
    },
    CACHE_ONE_YEAR_SECONDS: function() {
        return CACHE_ONE_YEAR_SECONDS;
    },
    DOT_NEXT_ALIAS: function() {
        return DOT_NEXT_ALIAS;
    },
    ESLINT_DEFAULT_DIRS: function() {
        return ESLINT_DEFAULT_DIRS;
    },
    GSP_NO_RETURNED_VALUE: function() {
        return GSP_NO_RETURNED_VALUE;
    },
    GSSP_COMPONENT_MEMBER_ERROR: function() {
        return GSSP_COMPONENT_MEMBER_ERROR;
    },
    GSSP_NO_RETURNED_VALUE: function() {
        return GSSP_NO_RETURNED_VALUE;
    },
    HTML_CONTENT_TYPE_HEADER: function() {
        return HTML_CONTENT_TYPE_HEADER;
    },
    INFINITE_CACHE: function() {
        return INFINITE_CACHE;
    },
    INSTRUMENTATION_HOOK_FILENAME: function() {
        return INSTRUMENTATION_HOOK_FILENAME;
    },
    JSON_CONTENT_TYPE_HEADER: function() {
        return JSON_CONTENT_TYPE_HEADER;
    },
    MATCHED_PATH_HEADER: function() {
        return MATCHED_PATH_HEADER;
    },
    MIDDLEWARE_FILENAME: function() {
        return MIDDLEWARE_FILENAME;
    },
    MIDDLEWARE_LOCATION_REGEXP: function() {
        return MIDDLEWARE_LOCATION_REGEXP;
    },
    NEXT_BODY_SUFFIX: function() {
        return NEXT_BODY_SUFFIX;
    },
    NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return NEXT_CACHE_IMPLICIT_TAG_ID;
    },
    NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return NEXT_CACHE_REVALIDATED_TAGS_HEADER;
    },
    NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER;
    },
    NEXT_CACHE_ROOT_PARAM_TAG_ID: function() {
        return NEXT_CACHE_ROOT_PARAM_TAG_ID;
    },
    NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return NEXT_CACHE_SOFT_TAG_MAX_LENGTH;
    },
    NEXT_CACHE_TAGS_HEADER: function() {
        return NEXT_CACHE_TAGS_HEADER;
    },
    NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return NEXT_CACHE_TAG_MAX_ITEMS;
    },
    NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return NEXT_CACHE_TAG_MAX_LENGTH;
    },
    NEXT_DATA_SUFFIX: function() {
        return NEXT_DATA_SUFFIX;
    },
    NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return NEXT_INTERCEPTION_MARKER_PREFIX;
    },
    NEXT_META_SUFFIX: function() {
        return NEXT_META_SUFFIX;
    },
    NEXT_NAV_DEPLOYMENT_ID_HEADER: function() {
        return NEXT_NAV_DEPLOYMENT_ID_HEADER;
    },
    NEXT_QUERY_PARAM_PREFIX: function() {
        return NEXT_QUERY_PARAM_PREFIX;
    },
    NEXT_RESUME_HEADER: function() {
        return NEXT_RESUME_HEADER;
    },
    NEXT_RESUME_STATE_LENGTH_HEADER: function() {
        return NEXT_RESUME_STATE_LENGTH_HEADER;
    },
    NON_STANDARD_NODE_ENV: function() {
        return NON_STANDARD_NODE_ENV;
    },
    PAGES_DIR_ALIAS: function() {
        return PAGES_DIR_ALIAS;
    },
    PRERENDER_REVALIDATE_HEADER: function() {
        return PRERENDER_REVALIDATE_HEADER;
    },
    PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER;
    },
    PROXY_FILENAME: function() {
        return PROXY_FILENAME;
    },
    PROXY_LOCATION_REGEXP: function() {
        return PROXY_LOCATION_REGEXP;
    },
    PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return PUBLIC_DIR_MIDDLEWARE_CONFLICT;
    },
    ROOT_DIR_ALIAS: function() {
        return ROOT_DIR_ALIAS;
    },
    RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return RSC_ACTION_CLIENT_WRAPPER_ALIAS;
    },
    RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return RSC_ACTION_ENCRYPTION_ALIAS;
    },
    RSC_ACTION_PROXY_ALIAS: function() {
        return RSC_ACTION_PROXY_ALIAS;
    },
    RSC_ACTION_VALIDATE_ALIAS: function() {
        return RSC_ACTION_VALIDATE_ALIAS;
    },
    RSC_CACHE_WRAPPER_ALIAS: function() {
        return RSC_CACHE_WRAPPER_ALIAS;
    },
    RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function() {
        return RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS;
    },
    RSC_MOD_REF_PROXY_ALIAS: function() {
        return RSC_MOD_REF_PROXY_ALIAS;
    },
    RSC_SEGMENTS_DIR_SUFFIX: function() {
        return RSC_SEGMENTS_DIR_SUFFIX;
    },
    RSC_SEGMENT_SUFFIX: function() {
        return RSC_SEGMENT_SUFFIX;
    },
    RSC_SUFFIX: function() {
        return RSC_SUFFIX;
    },
    SERVER_PROPS_EXPORT_ERROR: function() {
        return SERVER_PROPS_EXPORT_ERROR;
    },
    SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return SERVER_PROPS_GET_INIT_PROPS_CONFLICT;
    },
    SERVER_PROPS_SSG_CONFLICT: function() {
        return SERVER_PROPS_SSG_CONFLICT;
    },
    SERVER_RUNTIME: function() {
        return SERVER_RUNTIME;
    },
    SSG_FALLBACK_EXPORT_ERROR: function() {
        return SSG_FALLBACK_EXPORT_ERROR;
    },
    SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return SSG_GET_INITIAL_PROPS_CONFLICT;
    },
    STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR;
    },
    TEXT_PLAIN_CONTENT_TYPE_HEADER: function() {
        return TEXT_PLAIN_CONTENT_TYPE_HEADER;
    },
    UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return UNSTABLE_REVALIDATE_RENAME_ERROR;
    },
    WEBPACK_LAYERS: function() {
        return WEBPACK_LAYERS;
    },
    WEBPACK_RESOURCE_QUERIES: function() {
        return WEBPACK_RESOURCE_QUERIES;
    },
    WEB_SOCKET_MAX_RECONNECTIONS: function() {
        return WEB_SOCKET_MAX_RECONNECTIONS;
    }
});
const TEXT_PLAIN_CONTENT_TYPE_HEADER = 'text/plain';
const HTML_CONTENT_TYPE_HEADER = 'text/html; charset=utf-8';
const JSON_CONTENT_TYPE_HEADER = 'application/json; charset=utf-8';
const NEXT_QUERY_PARAM_PREFIX = 'nxtP';
const NEXT_INTERCEPTION_MARKER_PREFIX = 'nxtI';
const MATCHED_PATH_HEADER = 'x-matched-path';
const PRERENDER_REVALIDATE_HEADER = 'x-prerender-revalidate';
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = 'x-prerender-revalidate-if-generated';
const RSC_SEGMENTS_DIR_SUFFIX = '.segments';
const RSC_SEGMENT_SUFFIX = '.segment.rsc';
const RSC_SUFFIX = '.rsc';
const ACTION_SUFFIX = '.action';
const NEXT_DATA_SUFFIX = '.json';
const NEXT_META_SUFFIX = '.meta';
const NEXT_BODY_SUFFIX = '.body';
const NEXT_NAV_DEPLOYMENT_ID_HEADER = 'x-nextjs-deployment-id';
const NEXT_CACHE_TAGS_HEADER = 'x-next-cache-tags';
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = 'x-next-revalidated-tags';
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = 'x-next-revalidate-tag-token';
const NEXT_RESUME_HEADER = 'next-resume';
const NEXT_RESUME_STATE_LENGTH_HEADER = 'x-next-resume-state-length';
const NEXT_CACHE_TAG_MAX_ITEMS = 128;
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = '_N_T_';
const NEXT_CACHE_ROOT_PARAM_TAG_ID = '_N_RP_';
const CACHE_ONE_YEAR_SECONDS = 31536000;
const INFINITE_CACHE = 0xfffffffe;
const MIDDLEWARE_FILENAME = 'middleware';
const MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
const PROXY_FILENAME = 'proxy';
const PROXY_LOCATION_REGEXP = `(?:src/)?${PROXY_FILENAME}`;
const INSTRUMENTATION_HOOK_FILENAME = 'instrumentation';
const PAGES_DIR_ALIAS = 'private-next-pages';
const DOT_NEXT_ALIAS = 'private-dot-next';
const ROOT_DIR_ALIAS = 'private-next-root-dir';
const APP_DIR_ALIAS = 'private-next-app-dir';
const RSC_MOD_REF_PROXY_ALIAS = 'private-next-rsc-mod-ref-proxy';
const RSC_ACTION_VALIDATE_ALIAS = 'private-next-rsc-action-validate';
const RSC_ACTION_PROXY_ALIAS = 'private-next-rsc-server-reference';
const RSC_CACHE_WRAPPER_ALIAS = 'private-next-rsc-cache-wrapper';
const RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS = 'private-next-rsc-track-dynamic-import';
const RSC_ACTION_ENCRYPTION_ALIAS = 'private-next-rsc-action-encryption';
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = 'private-next-rsc-action-client-wrapper';
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
const SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
const SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
const SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
const GSP_NO_RETURNED_VALUE = 'Your `getStaticProps` function did not return an object. Did you forget to add a `return`?';
const GSSP_NO_RETURNED_VALUE = 'Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?';
const UNSTABLE_REVALIDATE_RENAME_ERROR = 'The `unstable_revalidate` property is available for general use.\n' + 'Please use `revalidate` instead.';
const GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
const SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
const ESLINT_DEFAULT_DIRS = [
    'app',
    'pages',
    'components',
    'lib',
    'src'
];
const SERVER_RUNTIME = {
    edge: 'edge',
    experimentalEdge: 'experimental-edge',
    nodejs: 'nodejs'
};
const WEB_SOCKET_MAX_RECONNECTIONS = 12;
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: 'shared',
    /**
   * The layer for server-only runtime and picking up `react-server` export conditions.
   * Including app router RSC pages and app router custom routes and metadata routes.
   */ reactServerComponents: 'rsc',
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: 'ssr',
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: 'action-browser',
    /**
   * The Node.js bundle layer for the API routes.
   */ apiNode: 'api-node',
    /**
   * The Edge Lite bundle layer for the API routes.
   */ apiEdge: 'api-edge',
    /**
   * The layer for the middleware code.
   */ middleware: 'middleware',
    /**
   * The layer for the instrumentation hooks.
   */ instrument: 'instrument',
    /**
   * The layer for assets on the edge.
   */ edgeAsset: 'edge-asset',
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: 'app-pages-browser',
    /**
   * The browser client bundle layer for Pages directory.
   */ pagesDirBrowser: 'pages-dir-browser',
    /**
   * The Edge Lite bundle layer for Pages directory.
   */ pagesDirEdge: 'pages-dir-edge',
    /**
   * The Node.js bundle layer for Pages directory.
   */ pagesDirNode: 'pages-dir-node'
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        builtinReact: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser
        ],
        serverOnly: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.instrument,
            WEBPACK_LAYERS_NAMES.middleware
        ],
        neutralTarget: [
            // pages api
            WEBPACK_LAYERS_NAMES.apiNode,
            WEBPACK_LAYERS_NAMES.apiEdge
        ],
        clientOnly: [
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser
        ],
        bundled: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.shared,
            WEBPACK_LAYERS_NAMES.instrument,
            WEBPACK_LAYERS_NAMES.middleware
        ],
        appPages: [
            // app router pages and layouts
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.actionBrowser
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: '__next_edge_ssr_entry__',
    metadata: '__next_metadata__',
    metadataRoute: '__next_metadata_route__',
    metadataImageMeta: '__next_metadata_image_meta__'
};

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 10208:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return _readonlyurlsearchparams.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return RedirectType;
    },
    forbidden: function() {
        return _forbidden.forbidden;
    },
    notFound: function() {
        return _notfound.notFound;
    },
    permanentRedirect: function() {
        return _redirect.permanentRedirect;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    unauthorized: function() {
        return _unauthorized.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
        return unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
        return _unstablerethrow.unstable_rethrow;
    }
});
const _readonlyurlsearchparams = __webpack_require__(99297);
const _redirect = __webpack_require__(23159);
const _notfound = __webpack_require__(16601);
const _forbidden = __webpack_require__(84344);
const _unauthorized = __webpack_require__(3005);
const _unstablerethrow = __webpack_require__(50587);
function unstable_isUnrecognizedActionError() {
    throw Object.defineProperty(new Error('`unstable_isUnrecognizedActionError` can only be used on the client.'), "__NEXT_ERROR_CODE", {
        value: "E776",
        enumerable: false,
        configurable: true
    });
}
const RedirectType = {
    push: 'push',
    replace: 'replace'
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.react-server.js.map


/***/ }),

/***/ 10425:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "findHeadInCache", ({
    enumerable: true,
    get: function() {
        return findHeadInCache;
    }
}));
const _segment = __webpack_require__(78237);
const _createroutercachekey = __webpack_require__(40899);
function findHeadInCache(cache, parallelRoutes) {
    return findHeadInCacheImpl(cache, parallelRoutes, '', '');
}
function findHeadInCacheImpl(cache, parallelRoutes, keyPrefix, keyPrefixWithoutSearchParams) {
    const isLastItem = Object.keys(parallelRoutes).length === 0;
    if (isLastItem) {
        // Returns the entire Cache Node of the segment whose head we will render.
        return [
            cache,
            keyPrefix,
            keyPrefixWithoutSearchParams
        ];
    }
    // First try the 'children' parallel route if it exists
    // when starting from the "root", this corresponds with the main page component
    const parallelRoutesKeys = Object.keys(parallelRoutes).filter((key)=>key !== 'children');
    // if we are at the root, we need to check the children slot first
    if ('children' in parallelRoutes) {
        parallelRoutesKeys.unshift('children');
    }
    const slots = cache.slots;
    if (slots !== null) {
        for (const key of parallelRoutesKeys){
            const [segment, childParallelRoutes] = parallelRoutes[key];
            // If the parallel is not matched and using the default segment,
            // skip searching the head from it.
            if (segment === _segment.DEFAULT_SEGMENT_KEY) {
                continue;
            }
            const childCacheNode = slots[key];
            if (!childCacheNode) {
                continue;
            }
            const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segment);
            const cacheKeyWithoutSearchParams = (0, _createroutercachekey.createRouterCacheKey)(segment, true);
            const item = findHeadInCacheImpl(childCacheNode, childParallelRoutes, keyPrefix + '/' + cacheKey, keyPrefix + '/' + cacheKeyWithoutSearchParams);
            if (item) {
                return item;
            }
        }
    }
    return null;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=find-head-in-cache.js.map


/***/ }),

/***/ 11132:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fetch", ({
    enumerable: true,
    get: function() {
        return fetchInternal;
    }
}));
const _navigationtestinglock = __webpack_require__(39197);
/**
 * Internal `fetch` used by the Next.js client router.
 *
 * When the Instant Navigation Testing API is enabled, the navigation lock may
 * install a blocking override on `window.fetch` for the duration of a lock
 * scope. To let internal fetches bypass the lock, callers go through a wrapper
 * that falls back to the pre-lock fetch captured at lock-acquire time.
 *
 * When the testing API is not enabled, this calls window.fetch directly.
 */ function fetchInternal(input, init) {
    if (false) {}
    return fetch(input, init);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fetch.js.map


/***/ }),

/***/ 11543:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return RootErrorBoundary;
    }
}));
const _interop_require_default = __webpack_require__(73623);
const _jsxruntime = __webpack_require__(95155);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(12115));
const _gracefuldegradeboundary = /*#__PURE__*/ _interop_require_default._(__webpack_require__(93350));
const _errorboundary = __webpack_require__(47600);
const _isbot = __webpack_require__(98080);
const isBotUserAgent =  true && (0, _isbot.isBot)(window.navigator.userAgent);
function RootErrorBoundary({ children, errorComponent, errorStyles, errorScripts }) {
    if (isBotUserAgent) {
        // Preserve existing DOM/HTML for bots to avoid replacing content with an error UI
        // and to keep the original SSR output intact.
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_gracefuldegradeboundary.default, {
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary.ErrorBoundary, {
        errorComponent: errorComponent,
        errorStyles: errorStyles,
        errorScripts: errorScripts,
        children: children
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=root-error-boundary.js.map


/***/ }),

/***/ 12115:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(61426);
} else {}


/***/ }),

/***/ 12506:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    EntryStatus: function() {
        return _cachemap.EntryStatus;
    },
    MetadataOnlyRequestTree: function() {
        return MetadataOnlyRequestTree;
    },
    attemptToFulfillDynamicSegmentFromBFCache: function() {
        return attemptToFulfillDynamicSegmentFromBFCache;
    },
    attemptToUpgradeSegmentFromBFCache: function() {
        return attemptToUpgradeSegmentFromBFCache;
    },
    canNewFetchStrategyProvideMoreContent: function() {
        return canNewFetchStrategyProvideMoreContent;
    },
    convertReusedFlightRouterStateToRouteTree: function() {
        return convertReusedFlightRouterStateToRouteTree;
    },
    convertRootFlightRouterStateToRouteTree: function() {
        return convertRootFlightRouterStateToRouteTree;
    },
    convertRouteTreeToFlightRouterState: function() {
        return convertRouteTreeToFlightRouterState;
    },
    createDetachedSegmentCacheEntry: function() {
        return createDetachedSegmentCacheEntry;
    },
    createMetadataRouteTree: function() {
        return createMetadataRouteTree;
    },
    createNonTaskyPrefetchResponseStream: function() {
        return createNonTaskyPrefetchResponseStream;
    },
    deprecated_requestOptimisticRouteCacheEntry: function() {
        return deprecated_requestOptimisticRouteCacheEntry;
    },
    fetchRouteOnCacheMiss: function() {
        return fetchRouteOnCacheMiss;
    },
    fetchSegmentPrefetchesUsingDynamicRequest: function() {
        return fetchSegmentPrefetchesUsingDynamicRequest;
    },
    fetchSegmentsOnCacheMiss: function() {
        return fetchSegmentsOnCacheMiss;
    },
    fulfillRouteCacheEntry: function() {
        return fulfillRouteCacheEntry;
    },
    getCurrentRouteCacheVersion: function() {
        return getCurrentRouteCacheVersion;
    },
    getCurrentSegmentCacheVersion: function() {
        return getCurrentSegmentCacheVersion;
    },
    getStaleTimeMs: function() {
        return getStaleTimeMs;
    },
    invalidateEntirePrefetchCache: function() {
        return invalidateEntirePrefetchCache;
    },
    invalidateRouteCacheEntries: function() {
        return invalidateRouteCacheEntries;
    },
    invalidateSegmentCacheEntries: function() {
        return invalidateSegmentCacheEntries;
    },
    markRouteEntryAsDynamicRewrite: function() {
        return markRouteEntryAsDynamicRewrite;
    },
    overwriteRevalidatingSegmentCacheEntry: function() {
        return overwriteRevalidatingSegmentCacheEntry;
    },
    pingInvalidationListeners: function() {
        return pingInvalidationListeners;
    },
    processRuntimePrefetchStream: function() {
        return processRuntimePrefetchStream;
    },
    readOrCreateRevalidatingSegmentEntry: function() {
        return readOrCreateRevalidatingSegmentEntry;
    },
    readOrCreateRouteCacheEntry: function() {
        return readOrCreateRouteCacheEntry;
    },
    readOrCreateSegmentCacheEntry: function() {
        return readOrCreateSegmentCacheEntry;
    },
    readRouteCacheEntry: function() {
        return readRouteCacheEntry;
    },
    readSegmentCacheEntryForNavigation: function() {
        return readSegmentCacheEntryForNavigation;
    },
    resolveStaleAt: function() {
        return resolveStaleAt;
    },
    segmentCacheMap: function() {
        return segmentCacheMap;
    },
    stripIsPartialByte: function() {
        return stripIsPartialByte;
    },
    upgradeToPendingSegment: function() {
        return upgradeToPendingSegment;
    },
    upsertSegmentEntry: function() {
        return upsertSegmentEntry;
    },
    waitForSegmentCacheEntry: function() {
        return waitForSegmentCacheEntry;
    },
    writeDynamicRenderResponseIntoCache: function() {
        return writeDynamicRenderResponseIntoCache;
    },
    writePrerenderResponseIntoCache: function() {
        return writePrerenderResponseIntoCache;
    },
    writeRouteIntoCache: function() {
        return writeRouteIntoCache;
    }
});
const _approutertypes = __webpack_require__(76731);
const _varyparamsdecoding = __webpack_require__(28854);
const _approuterheaders = __webpack_require__(15563);
const _fetchserverresponse = __webpack_require__(28796);
const _fetch = __webpack_require__(11132);
const _scheduler = __webpack_require__(57705);
const _varypath = __webpack_require__(79620);
const _createhreffromurl = __webpack_require__(29453);
const _cachekey = __webpack_require__(26452);
const _routeparams = __webpack_require__(84536);
const _cachemap = __webpack_require__(76849);
const _segmentvalueencoding = __webpack_require__(63534);
const _flightdatahelpers = __webpack_require__(4103);
const _navigatereducer = __webpack_require__(15368);
const _links = __webpack_require__(24972);
const _segment = __webpack_require__(78237);
const _types = __webpack_require__(77565);
const _promisewithresolvers = __webpack_require__(4542);
const _bfcache = __webpack_require__(80882);
const _optimisticroutes = __webpack_require__(68378);
const _navigation = __webpack_require__(20354);
const _navigationbuildid = __webpack_require__(97797);
const _constants = __webpack_require__(7103);
function getStaleTimeMs(staleTimeSeconds) {
    return Math.max(staleTimeSeconds, 30) * 1000;
}
const isOutputExportMode =  true && undefined === 'export';
const MetadataOnlyRequestTree = [
    '',
    {},
    null,
    'metadata-only'
];
const routeCacheMap = (0, _cachemap.createCacheMap)();
const segmentCacheMap = (0, _cachemap.createCacheMap)();
// All invalidation listeners for the whole cache are tracked in single set.
// Since we don't yet support tag or path-based invalidation, there's no point
// tracking them any more granularly than this. Once we add granular
// invalidation, that may change, though generally the model is to just notify
// the listeners and allow the caller to poll the prefetch cache with a new
// prefetch task if desired.
let invalidationListeners = null;
// Incrementing counters used to track cache invalidations. Route and segment
// caches have separate versions so they can be invalidated independently.
// Invalidation does not eagerly evict anything from the cache; entries are
// lazily evicted when read.
let currentRouteCacheVersion = 0;
let currentSegmentCacheVersion = 0;
function getCurrentRouteCacheVersion() {
    return currentRouteCacheVersion;
}
function getCurrentSegmentCacheVersion() {
    return currentSegmentCacheVersion;
}
function invalidateEntirePrefetchCache(nextUrl, tree) {
    currentRouteCacheVersion++;
    currentSegmentCacheVersion++;
    (0, _links.pingVisibleLinks)(nextUrl, tree);
    pingInvalidationListeners(nextUrl, tree);
}
function invalidateRouteCacheEntries(nextUrl, tree) {
    currentRouteCacheVersion++;
    (0, _links.pingVisibleLinks)(nextUrl, tree);
    pingInvalidationListeners(nextUrl, tree);
}
function invalidateSegmentCacheEntries(nextUrl, tree) {
    currentSegmentCacheVersion++;
    (0, _links.pingVisibleLinks)(nextUrl, tree);
    pingInvalidationListeners(nextUrl, tree);
}
function attachInvalidationListener(task) {
    // This function is called whenever a prefetch task reads a cache entry. If
    // the task has an onInvalidate function associated with it — i.e. the one
    // optionally passed to router.prefetch(onInvalidate) — then we attach that
    // listener to the every cache entry that the task reads. Then, if an entry
    // is invalidated, we call the function.
    if (task.onInvalidate !== null) {
        if (invalidationListeners === null) {
            invalidationListeners = new Set([
                task
            ]);
        } else {
            invalidationListeners.add(task);
        }
    }
}
function notifyInvalidationListener(task) {
    const onInvalidate = task.onInvalidate;
    if (onInvalidate !== null) {
        // Clear the callback from the task object to guarantee it's not called more
        // than once.
        task.onInvalidate = null;
        // This is a user-space function, so we must wrap in try/catch.
        try {
            onInvalidate();
        } catch (error) {
            if (typeof reportError === 'function') {
                reportError(error);
            } else {
                console.error(error);
            }
        }
    }
}
function pingInvalidationListeners(nextUrl, tree) {
    // The rough equivalent of pingVisibleLinks, but for onInvalidate callbacks.
    // This is called when the Next-Url or the base tree changes, since those
    // may affect the result of a prefetch task. It's also called after a
    // cache invalidation.
    if (invalidationListeners !== null) {
        const tasks = invalidationListeners;
        invalidationListeners = null;
        for (const task of tasks){
            if ((0, _scheduler.isPrefetchTaskDirty)(task, nextUrl, tree)) {
                notifyInvalidationListener(task);
            }
        }
    }
}
function readRouteCacheEntry(now, key) {
    const varyPath = (0, _varypath.getRouteVaryPath)(key.pathname, key.search, key.nextUrl);
    const isRevalidation = false;
    const existingEntry = (0, _cachemap.getFromCacheMap)(now, getCurrentRouteCacheVersion(), routeCacheMap, varyPath, isRevalidation, false);
    if (existingEntry !== null) {
        return existingEntry;
    }
    // No cache hit. Attempt to construct from template using the new
    // optimistic routing mechanism (pattern-based matching).
    if (true) {
        return (0, _optimisticroutes.matchKnownRoute)(now, key.pathname, key.search);
    }
    return null;
}
function readSegmentCacheEntryForNavigation(now, // map, or the shared map otherwise.
map, varyPath, restrictToShell = false) {
    const isRevalidation = false;
    let lookupVaryPath = varyPath;
    if (false) {}
    // Prefer a Fulfilled entry (e.g. a cached shell) over a more-specific
    // Pending/Rejected one so it renders immediately instead of blocking on an
    // in-flight entry.
    const fulfilled = (0, _cachemap.getFromCacheMap)(now, getCurrentSegmentCacheVersion(), map, lookupVaryPath, isRevalidation, true);
    if (fulfilled !== null) {
        return fulfilled;
    }
    return (0, _cachemap.getFromCacheMap)(now, getCurrentSegmentCacheVersion(), map, lookupVaryPath, isRevalidation, false);
}
function readRevalidatingSegmentCacheEntry(now, map, varyPath) {
    const isRevalidation = true;
    return (0, _cachemap.getFromCacheMap)(now, getCurrentSegmentCacheVersion(), map, varyPath, isRevalidation, false);
}
function waitForSegmentCacheEntry(pendingEntry) {
    // Because the entry is pending, there's already a in-progress request.
    // Attach a promise to the entry that will resolve when the server responds.
    let promiseWithResolvers = pendingEntry.promise;
    if (promiseWithResolvers === null) {
        promiseWithResolvers = pendingEntry.promise = (0, _promisewithresolvers.createPromiseWithResolvers)();
    } else {
    // There's already a promise we can use
    }
    return promiseWithResolvers.promise;
}
function createDetachedRouteCacheEntry() {
    return {
        canonicalUrl: null,
        status: _cachemap.EntryStatus.Empty,
        blockedTasks: null,
        tree: null,
        metadata: null,
        // This is initialized to true because we don't know yet whether the route
        // could be intercepted. It's only set to false once we receive a response
        // from the server.
        couldBeIntercepted: true,
        // Similarly, we don't yet know if the route supports PPR.
        supportsPerSegmentPrefetching: false,
        hasDynamicRewrite: false,
        renderedSearch: null,
        // Map-related fields
        ref: null,
        size: 0,
        // Since this is an empty entry, there's no reason to ever evict it. It will
        // be updated when the data is populated.
        staleAt: Infinity,
        version: getCurrentRouteCacheVersion()
    };
}
function readOrCreateRouteCacheEntry(now, task, key) {
    attachInvalidationListener(task);
    const existingEntry = readRouteCacheEntry(now, key);
    if (existingEntry !== null) {
        return existingEntry;
    }
    // Create a pending entry and add it to the cache.
    const pendingEntry = createDetachedRouteCacheEntry();
    const varyPath = (0, _varypath.getRouteVaryPath)(key.pathname, key.search, key.nextUrl);
    const isRevalidation = false;
    (0, _cachemap.setInCacheMap)(routeCacheMap, varyPath, pendingEntry, isRevalidation);
    return pendingEntry;
}
function deprecated_requestOptimisticRouteCacheEntry(now, requestedUrl, nextUrl) {
    // This function is called during a navigation when there was no matching
    // route tree in the prefetch cache. Before de-opting to a blocking,
    // unprefetched navigation, we will first attempt to construct an "optimistic"
    // route tree by checking the cache for similar routes.
    //
    // Check if there's a route with the same pathname, but with different
    // search params. We can then base our optimistic route tree on this entry.
    //
    // Conceptually, we are simulating what would happen if we did perform a
    // prefetch the requested URL, under the assumption that the server will
    // not redirect or rewrite the request in a different manner than the
    // base route tree. This assumption might not hold, in which case we'll have
    // to recover when we perform the dynamic navigation request. However, this
    // is what would happen if a route were dynamically rewritten/redirected
    // in between the prefetch and the navigation. So the logic needs to exist
    // to handle this case regardless.
    // Look for a route with the same pathname, but with an empty search string.
    // TODO: There's nothing inherently special about the empty search string;
    // it's chosen somewhat arbitrarily, with the rationale that it's the most
    // likely one to exist. But we should update this to match _any_ search
    // string. The plan is to generalize this logic alongside other improvements
    // related to "fallback" cache entries.
    const requestedSearch = requestedUrl.search;
    if (requestedSearch === '') {
        // The caller would have already checked if a route with an empty search
        // string is in the cache. So we can bail out here.
        return null;
    }
    const urlWithoutSearchParams = new URL(requestedUrl);
    urlWithoutSearchParams.search = '';
    const routeWithNoSearchParams = readRouteCacheEntry(now, (0, _cachekey.createCacheKey)(urlWithoutSearchParams.href, nextUrl));
    if (routeWithNoSearchParams === null || routeWithNoSearchParams.status !== _cachemap.EntryStatus.Fulfilled) {
        // Bail out of constructing an optimistic route tree. This will result in
        // a blocking, unprefetched navigation.
        return null;
    }
    // Now we have a base route tree we can "patch" with our optimistic values.
    // Optimistically assume that redirects for the requested pathname do
    // not vary on the search string. Therefore, if the base route was
    // redirected to a different search string, then the optimistic route
    // should be redirected to the same search string. Otherwise, we use
    // the requested search string.
    const canonicalUrlForRouteWithNoSearchParams = new URL(routeWithNoSearchParams.canonicalUrl, requestedUrl.origin);
    const optimisticCanonicalSearch = canonicalUrlForRouteWithNoSearchParams.search !== '' ? canonicalUrlForRouteWithNoSearchParams.search : requestedSearch;
    // Similarly, optimistically assume that rewrites for the requested
    // pathname do not vary on the search string. Therefore, if the base
    // route was rewritten to a different search string, then the optimistic
    // route should be rewritten to the same search string. Otherwise, we use
    // the requested search string.
    const optimisticRenderedSearch = routeWithNoSearchParams.renderedSearch !== '' ? routeWithNoSearchParams.renderedSearch : requestedSearch;
    const optimisticUrl = new URL(routeWithNoSearchParams.canonicalUrl, location.origin);
    optimisticUrl.search = optimisticCanonicalSearch;
    const optimisticCanonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(optimisticUrl);
    const optimisticRouteTree = deprecated_createOptimisticRouteTree(routeWithNoSearchParams.tree, optimisticRenderedSearch);
    const optimisticMetadataTree = deprecated_createOptimisticRouteTree(routeWithNoSearchParams.metadata, optimisticRenderedSearch);
    // Clone the base route tree, and override the relevant fields with our
    // optimistic values.
    const optimisticEntry = {
        canonicalUrl: optimisticCanonicalUrl,
        status: _cachemap.EntryStatus.Fulfilled,
        // This isn't cloned because it's instance-specific
        blockedTasks: null,
        tree: optimisticRouteTree,
        metadata: optimisticMetadataTree,
        couldBeIntercepted: routeWithNoSearchParams.couldBeIntercepted,
        supportsPerSegmentPrefetching: routeWithNoSearchParams.supportsPerSegmentPrefetching,
        hasDynamicRewrite: routeWithNoSearchParams.hasDynamicRewrite,
        // Override the rendered search with the optimistic value.
        renderedSearch: optimisticRenderedSearch,
        // Map-related fields
        ref: null,
        size: 0,
        staleAt: routeWithNoSearchParams.staleAt,
        version: routeWithNoSearchParams.version
    };
    // Do not insert this entry into the cache. It only exists so we can
    // perform the current navigation. Just return it to the caller.
    return optimisticEntry;
}
function deprecated_createOptimisticRouteTree(tree, newRenderedSearch) {
    // Create a new route tree that identical to the original one except for
    // the rendered search string, which is contained in the vary path.
    let clonedSlots = null;
    const originalSlots = tree.slots;
    if (originalSlots !== null) {
        clonedSlots = new Map();
        for (const [parallelRouteKey, childTree] of originalSlots){
            clonedSlots.set(parallelRouteKey, deprecated_createOptimisticRouteTree(childTree, newRenderedSearch));
        }
    }
    // We only need to clone the vary path if the route is a page.
    if (tree.isPage) {
        // The shell vary path Fallbacks search params, so it's unaffected by the
        // new rendered search and can be reused as-is.
        return {
            requestKey: tree.requestKey,
            segment: tree.segment,
            shellVaryPath: tree.shellVaryPath,
            refreshState: tree.refreshState,
            varyPath: (0, _varypath.clonePageVaryPathWithNewSearchParams)(tree.varyPath, newRenderedSearch),
            isPage: true,
            slots: clonedSlots,
            prefetchHints: tree.prefetchHints
        };
    }
    return {
        requestKey: tree.requestKey,
        segment: tree.segment,
        shellVaryPath: tree.shellVaryPath,
        refreshState: tree.refreshState,
        varyPath: tree.varyPath,
        isPage: false,
        slots: clonedSlots,
        prefetchHints: tree.prefetchHints
    };
}
function readOrCreateSegmentCacheEntry(now, // captured when the task was scheduled).
map, fetchStrategy, tree) {
    const existingEntry = (0, _cachemap.getFromCacheMap)(now, getCurrentSegmentCacheVersion(), map, tree.varyPath, false, false);
    if (existingEntry !== null) {
        return existingEntry;
    }
    return insertEmptySegmentCacheEntry(now, map, fetchStrategy, tree);
}
/**
 * Creates an empty segment cache entry and inserts it into the cache, keyed
 * at the vary path a request made with the given fetch strategy is stored
 * under. The stale time is set to a default value; the actual stale time will
 * be set when the entry is fulfilled with data from the server response.
 */ function insertEmptySegmentCacheEntry(now, map, fetchStrategy, tree) {
    const varyPathForRequest = (0, _varypath.getSegmentVaryPathForRequest)(fetchStrategy, tree);
    const emptyEntry = createDetachedSegmentCacheEntry(now);
    const isRevalidation = false;
    (0, _cachemap.setInCacheMap)(map, varyPathForRequest, emptyEntry, isRevalidation);
    return emptyEntry;
}
function readOrCreateRevalidatingSegmentEntry(now, map, fetchStrategy, tree) {
    // This function is called when we've already confirmed that a particular
    // segment is cached, but we want to perform another request anyway in case it
    // returns more complete and/or fresher data than we already have. The logic
    // for deciding whether to replace the existing entry is handled elsewhere;
    // this function just handles retrieving a cache entry that we can use to
    // track the revalidation.
    //
    // The reason revalidations are stored in the cache is because we need to be
    // able to dedupe multiple revalidation requests. The reason they have to be
    // handled specially is because we shouldn't overwrite a "normal" entry if
    // one exists at the same keypath. So, for each internal cache location, there
    // is a special "revalidation" slot that is used solely for this purpose.
    //
    // You can think of it as if all the revalidation entries were stored in a
    // separate cache map from the canonical entries, and then transfered to the
    // canonical cache map once the request is complete — this isn't how it's
    // actually implemented, since it's more efficient to store them in the same
    // data structure as the normal entries, but that's how it's modeled
    // conceptually.
    // TODO: Once we implement Fallback behavior for params, where an entry is
    // re-keyed based on response information, we'll need to account for the
    // possibility that the keypath of the previous entry is more generic than
    // the keypath of the revalidating entry. In other words, the server could
    // return a less generic entry upon revalidation. For now, though, this isn't
    // a concern because the keypath is based solely on the prefetch strategy,
    // not on data contained in the response.
    const existingEntry = readRevalidatingSegmentCacheEntry(now, map, tree.varyPath);
    if (existingEntry !== null) {
        return existingEntry;
    }
    // Create a pending entry and add it to the cache. The stale time is set to a
    // default value; the actual stale time will be set when the entry is
    // fulfilled with data from the server response.
    const varyPathForRequest = (0, _varypath.getSegmentVaryPathForRequest)(fetchStrategy, tree);
    const pendingEntry = createDetachedSegmentCacheEntry(now);
    const isRevalidation = true;
    (0, _cachemap.setInCacheMap)(map, varyPathForRequest, pendingEntry, isRevalidation);
    return pendingEntry;
}
function overwriteRevalidatingSegmentCacheEntry(now, map, fetchStrategy, tree) {
    // This function is called when we've already decided to replace an existing
    // revalidation entry. Create a new entry and write it into the cache,
    // overwriting the previous value. The stale time is set to a default value;
    // the actual stale time will be set when the entry is fulfilled with data
    // from the server response.
    const varyPathForRequest = (0, _varypath.getSegmentVaryPathForRequest)(fetchStrategy, tree);
    const pendingEntry = createDetachedSegmentCacheEntry(now);
    const isRevalidation = true;
    (0, _cachemap.setInCacheMap)(map, varyPathForRequest, pendingEntry, isRevalidation);
    return pendingEntry;
}
/**
 * Whether an existing cache entry is preferred over an incoming candidate —
 * i.e. the candidate does NOT supersede it. (On an exact tie — same fetch
 * strategy, same partialness — this returns false, so the candidate replaces
 * the existing entry.) This is the precedence rule used both when deciding
 * whether an upsert may replace the entry at its own keypath, and when
 * deciding whether an entry at a more specific keypath may be evicted because
 * it shadows a just-inserted candidate (see `evictShadowingSegmentEntries`).
 *
 * Note that "less/more specific" in the comments below refers to fetch
 * strategy content tiers (how much content a strategy can produce), not the
 * vary-path specificity the eviction docs are concerned with.
 */ function isExistingSegmentEntryPreferred(existingEntry, candidateEntry) {
    return(// strategy than the segment we already have in the cache, so it can't
    // have more content.
    candidateEntry.fetchStrategy !== existingEntry.fetchStrategy && !canNewFetchStrategyProvideMoreContent(existingEntry.fetchStrategy, candidateEntry.fetchStrategy) || // The existing entry isn't partial, but the new one is.
    // (TODO: can this be true if `candidateEntry.fetchStrategy >= existingEntry.fetchStrategy`?)
    !existingEntry.isPartial && candidateEntry.isPartial);
}
function upsertSegmentEntry(now, // operates in. Prefetch response-write paths pass the spawning task's map
// (`PrefetchTask.segmentCacheMap`), so a response that lands after a
// testing-lock scope boundary still writes into the map its entries
// live in.
map, varyPath, candidateEntry, // against (all concrete param values, i.e. `tree.varyPath`) — the most
// specific path a read would use. Note this is the opposite of the
// generalized keying path that `getSegmentVaryPathForRequest` computes.
// Used to detect and evict stale entries at more specific keypaths that
// would otherwise shadow the candidate. Pass null when there's no request
// context; the shadow check is skipped.
lookupVaryPath) {
    // We have a new entry that has not yet been inserted into the cache. Before
    // we do so, we need to confirm whether it takes precedence over the existing
    // entry (if one exists).
    // TODO: We should not upsert an entry if its key was invalidated in the time
    // since the request was made. We can do that by passing the "owner" entry to
    // this function and confirming it's the same as `existingEntry`.
    if ((0, _cachemap.isValueExpired)(now, getCurrentSegmentCacheVersion(), candidateEntry)) {
        // The entry is expired. We cannot upsert it.
        return null;
    }
    const existingEntry = (0, _cachemap.getFromCacheMap)(now, getCurrentSegmentCacheVersion(), map, varyPath, false, false);
    if (existingEntry !== null) {
        // Don't replace a more specific segment with a less-specific one. A case where this
        // might happen is if the existing segment was fetched via
        // `<Link prefetch={true}>`.
        if (isExistingSegmentEntryPreferred(existingEntry, candidateEntry)) {
            // The candidate does not supersede the existing entry. Leave the
            // existing entry in place and discard the candidate by not inserting it.
            //
            // We must not mutate the candidate here (e.g. downgrade it to Rejected or
            // null out its `rsc`). The caller does not transfer exclusive ownership
            // of it: it may already have been fulfilled, resolving its promise to a
            // waiter that holds the entry and reads `rsc` off it later. A navigation
            // seed is such a waiter, via `waitForSegmentCacheEntry`. Nulling `rsc`
            // after the fact resolves that read to `null`, so the waiter loses the
            // data it was about to render. Declining to insert it is enough: the
            // existing entry stays canonical, and the candidate keeps its valid (if
            // less complete) data for any waiter that already took it.
            return null;
        }
        // Ping any tasks blocked on the existing entry before replacing it so they
        // re-run and pick up the new entry. Without this, tasks waiting on the
        // existing Empty/Pending entry would be stranded — the new fulfilled
        // candidate has no blockedTasks of its own.
        if (existingEntry.status === _cachemap.EntryStatus.Empty || existingEntry.status === _cachemap.EntryStatus.Pending) {
            pingBlockedTasks(existingEntry);
        }
    // Replace the existing entry by writing the candidate over its keypath
    // below (the same mechanism `overwriteRevalidatingSegmentCacheEntry`
    // uses). We intentionally do NOT call `deleteFromCacheMap` first: deleting
    // vacates the canonical slot, and `deleteMapEntry` promotes a pending
    // Revalidation-slot entry into the vacated slot — which the immediate
    // insert below would then silently overwrite. The in-flight revalidation
    // would vanish from the map, so the next scheduler pass would find an
    // empty revalidation slot and spawn a duplicate request instead of
    // deduping against it. Replacing in place never vacates the slot, so
    // promotion never runs and the pending revalidating entry stays in its
    // Revalidation slot where `readOrCreateRevalidatingSegmentEntry`'s dedupe
    // finds it.
    //
    // The displaced entry's map/LRU accounting is handled by the replacement
    // itself: `setMapEntryValue` drops the displaced value's `ref` and
    // `updateLruSize` swaps its size for the candidate's, which is exactly
    // what delete-then-insert did.
    }
    const isRevalidation = false;
    (0, _cachemap.setInCacheMap)(map, varyPath, candidateEntry, isRevalidation);
    if (lookupVaryPath !== null) {
        evictShadowingSegmentEntries(now, map, lookupVaryPath, candidateEntry);
    }
    return candidateEntry;
}
/**
 * Evicts stale entries at more specific keypaths that shadow a just-inserted
 * candidate entry.
 *
 * A response can be written to the cache at a MORE GENERIC vary path than the
 * path the request was issued against — for example, the server may report
 * that a segment doesn't vary on a param, so the entry is re-keyed with that
 * param as Fallback. Meanwhile, an older, less useful entry can exist at a
 * more specific path within the same fallback chain — for example, a partial
 * shell entry keyed with root params concrete (see
 * `getShellSegmentVaryPath`). Because segment lookup is
 * most-specific-match-wins, every subsequent read at the concrete request
 * path keeps returning the stale specific entry, and the more complete
 * generic entry is unreachable from that URL. That both wastes the completed
 * request and can loop: a prefetch task that revalidated the segment reads
 * back the same stale entry, decides it needs to revalidate again, and
 * repeats forever.
 *
 * The upsert is the one moment we know the ordering between the two entries:
 * the candidate was produced by a request for this segment position, and
 * `lookupVaryPath` is the fully concrete path a read for that position
 * resolves against, so any entry that a read at that path would return in the
 * candidate's stead is directly comparable to it. If such an entry is settled
 * and the candidate supersedes it — under the same precedence rules the
 * upsert applies at its own keypath — we know we never want to match against
 * it again, so delete it, making the candidate reachable.
 *
 * Non-settled entries are never evicted here: a Pending entry is owned by an
 * in-flight request that will settle it, and an Empty entry is a placeholder
 * that a scheduler pass may still claim and upgrade.
 */ function evictShadowingSegmentEntries(now, map, lookupVaryPath, candidateEntry) {
    // There can in principle be multiple shadowing entries at successively less
    // specific keypaths, so loop until the read returns the candidate (or an
    // entry we don't supersede). Each iteration re-reads and re-checks from
    // scratch (in part because `deleteFromCacheMap` can promote a settled
    // Revalidation-slot value into the just-vacated slot, surfacing a new entry
    // at the same keypath). Each iteration deletes an entry from the map, so
    // the loop terminates naturally; the bound is defensive, and 32 is far
    // beyond any real fallback chain, which is bounded by the vary
    // path's length.
    for(let i = 0; i < 32; i++){
        const shadowEntry = (0, _cachemap.getFromCacheMap)(now, getCurrentSegmentCacheVersion(), map, lookupVaryPath, false, false);
        if (shadowEntry === null || shadowEntry === candidateEntry) {
            // The candidate is reachable from the lookup path (or the read missed
            // entirely, e.g. because the candidate expired). Done.
            return;
        }
        if (shadowEntry.status !== _cachemap.EntryStatus.Fulfilled && shadowEntry.status !== _cachemap.EntryStatus.Rejected) {
            // Only settled entries may be evicted. A Pending entry is held by an
            // in-flight request and will settle on its own.
            return;
        }
        if (isExistingSegmentEntryPreferred(shadowEntry, candidateEntry)) {
            // The shadowing entry is preferred over the candidate (e.g. it's a
            // complete entry fetched with a more specific strategy). Leave it —
            // reads at this path should keep matching it.
            return;
        }
        // The candidate supersedes the shadowing entry. Evict it. Settled entries
        // shouldn't have blocked tasks (Fulfilled always has `blockedTasks:
        // null`, and Rejected entries were pinged at rejection), but ping
        // defensively before deleting, matching the upsert-evict pattern above.
        pingBlockedTasks(shadowEntry);
        (0, _cachemap.deleteFromCacheMap)(shadowEntry);
    }
}
function createDetachedSegmentCacheEntry(now) {
    // Default stale time for pending segment cache entries. The actual stale time
    // is set when the entry is fulfilled with data from the server response.
    const staleAt = now + 30 * 1000;
    const emptyEntry = {
        status: _cachemap.EntryStatus.Empty,
        blockedTasks: null,
        // Default to assuming the fetch strategy will be PPR. This will be updated
        // when a fetch is actually initiated.
        fetchStrategy: _types.FetchStrategy.PPR,
        rsc: null,
        isPartial: true,
        isUpgradeableISRFallback: false,
        promise: null,
        // Map-related fields
        ref: null,
        size: 0,
        staleAt,
        version: 0
    };
    return emptyEntry;
}
function upgradeToPendingSegment(emptyEntry, fetchStrategy) {
    const pendingEntry = emptyEntry;
    pendingEntry.status = _cachemap.EntryStatus.Pending;
    pendingEntry.fetchStrategy = fetchStrategy;
    if (fetchStrategy === _types.FetchStrategy.Full) {
        // We can assume the response will contain the full segment data. Set this
        // to false so we know it's OK to omit this segment from any navigation
        // requests that may happen while the data is still pending.
        pendingEntry.isPartial = false;
    }
    // Set the version here, since this is right before the request is initiated.
    // The next time the segment cache version is incremented, the entry will
    // effectively be evicted. This happens before initiating the request, rather
    // than when receiving the response, because it's guaranteed to happen
    // before the data is read on the server.
    pendingEntry.version = getCurrentSegmentCacheVersion();
    return pendingEntry;
}
function attemptToFulfillDynamicSegmentFromBFCache(now, segment, tree) {
    // Attempts to fulfill an empty segment cache entry using data from the
    // bfcache. This is only valid during a Full prefetch (i.e. one that includes
    // dynamic data), because the bfcache stores data from navigations which
    // always include dynamic data.
    // We always use the canonical vary path when checking the bfcache. This is
    // the same operation we'd use to access the cache during a
    // regular navigation.
    const varyPath = tree.varyPath;
    // Read from the BFCache without expiring it (pass -1). We check freshness
    // ourselves using navigatedAt, because the BFCache's staleAt may have been
    // overridden by a per-page unstable_dynamicStaleTime and can't be used to
    // derive the original request time.
    const bfcacheEntry = (0, _bfcache.readFromBFCache)(varyPath);
    if (bfcacheEntry !== null) {
        // The stale time for dynamic prefetches (default: 5 mins) is different
        // from the stale time for regular navigations (default: 0 secs). Use
        // navigatedAt to compute the correct expiry for prefetch purposes.
        const dynamicPrefetchStaleAt = bfcacheEntry.navigatedAt + _navigatereducer.STATIC_STALETIME_MS;
        if (now > dynamicPrefetchStaleAt) {
            return null;
        }
        const pendingSegment = upgradeToPendingSegment(segment, _types.FetchStrategy.Full);
        const isPartial = false;
        return fulfillSegmentCacheEntry(pendingSegment, bfcacheEntry.rsc, dynamicPrefetchStaleAt, isPartial, false, _types.FetchStrategy.Full);
    }
    return null;
}
function attemptToUpgradeSegmentFromBFCache(now, map, tree) {
    const varyPath = tree.varyPath;
    const bfcacheEntry = (0, _bfcache.readFromBFCache)(varyPath);
    if (bfcacheEntry !== null) {
        const dynamicPrefetchStaleAt = bfcacheEntry.navigatedAt + _navigatereducer.STATIC_STALETIME_MS;
        if (now > dynamicPrefetchStaleAt) {
            return null;
        }
        const pendingSegment = upgradeToPendingSegment(createDetachedSegmentCacheEntry(now), _types.FetchStrategy.Full);
        const isPartial = false;
        const newEntry = fulfillSegmentCacheEntry(pendingSegment, bfcacheEntry.rsc, dynamicPrefetchStaleAt, isPartial, false, _types.FetchStrategy.Full);
        const segmentVaryPath = (0, _varypath.getSegmentVaryPathForRequest)(_types.FetchStrategy.Full, tree);
        const upserted = upsertSegmentEntry(now, map, segmentVaryPath, newEntry, // practice a Full request path is already fully concrete, so nothing
        // can shadow the new entry and the shadow check is a no-op.)
        tree.varyPath);
        if (upserted !== null && upserted.status === _cachemap.EntryStatus.Fulfilled) {
            return upserted;
        }
    }
    return null;
}
function pingBlockedTasks(entry) {
    const blockedTasks = entry.blockedTasks;
    if (blockedTasks !== null) {
        for (const task of blockedTasks){
            (0, _scheduler.pingPrefetchTask)(task);
        }
        entry.blockedTasks = null;
    }
}
function createMetadataRouteTree(metadataVaryPath) {
    // The Head is not actually part of the route tree, but other than that, it's
    // fetched and cached like a segment. Some functions expect a RouteTree
    // object, so rather than fork the logic in all those places, we use this
    // "fake" one.
    const metadata = {
        requestKey: _segmentvalueencoding.HEAD_REQUEST_KEY,
        segment: _segmentvalueencoding.HEAD_REQUEST_KEY,
        shellVaryPath: (0, _varypath.getShellSegmentVaryPath)(metadataVaryPath),
        refreshState: null,
        varyPath: metadataVaryPath,
        // The metadata isn't really a "page" (though it isn't really a "segment"
        // either) but for the purposes of how this field is used, it behaves like
        // one. If this logic ever gets more complex we can change this to an enum.
        isPage: true,
        slots: null,
        prefetchHints: 0
    };
    return metadata;
}
function fulfillRouteCacheEntry(now, entry, tree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching) {
    // Get the rendered search from the vary path
    const renderedSearch = (0, _varypath.getRenderedSearchFromVaryPath)(metadataVaryPath) ?? '';
    const fulfilledEntry = entry;
    fulfilledEntry.status = _cachemap.EntryStatus.Fulfilled;
    fulfilledEntry.tree = tree;
    fulfilledEntry.metadata = createMetadataRouteTree(metadataVaryPath);
    // Route structure is essentially static — it only changes on deploy.
    // Always use the static stale time.
    // NOTE: An exception is rewrites/redirects in middleware or proxy, which can
    // change routes dynamically. We have other strategies for handling those.
    //
    // If the route tree has stale inlining hints (e.g. the initial RSC payload
    // for a build-time static page, generated before collectPrefetchHints ran),
    // immediately expire the entry so it gets re-fetched with correct hints.
    // The segment data itself is still valid — only the route tree (which
    // contains the hint bits) needs to be re-fetched.
    if (tree.prefetchHints & _approutertypes.PrefetchHint.InliningHintsStale) {
        fulfilledEntry.staleAt = -1;
    } else {
        fulfilledEntry.staleAt = now + _navigatereducer.STATIC_STALETIME_MS;
    }
    fulfilledEntry.couldBeIntercepted = couldBeIntercepted;
    fulfilledEntry.canonicalUrl = canonicalUrl;
    fulfilledEntry.renderedSearch = renderedSearch;
    fulfilledEntry.supportsPerSegmentPrefetching = supportsPerSegmentPrefetching;
    fulfilledEntry.hasDynamicRewrite = false;
    pingBlockedTasks(entry);
    return fulfilledEntry;
}
function writeRouteIntoCache(now, pathname, search, nextUrl, tree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching) {
    const pendingEntry = createDetachedRouteCacheEntry();
    const fulfilledEntry = fulfillRouteCacheEntry(now, pendingEntry, tree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
    const varyPath = (0, _varypath.getFulfilledRouteVaryPath)(pathname, search, nextUrl, couldBeIntercepted);
    const isRevalidation = false;
    (0, _cachemap.setInCacheMap)(routeCacheMap, varyPath, fulfilledEntry, isRevalidation);
    return fulfilledEntry;
}
function markRouteEntryAsDynamicRewrite(entry) {
    entry.hasDynamicRewrite = true;
// Note: The caller is responsible for also calling invalidateRouteCacheEntries
// to invalidate other entries that may have been derived from this template
// before we knew it had a dynamic rewrite.
}
function fulfillSegmentCacheEntry(segmentCacheEntry, rsc, staleAt, isPartial, // callers pass false. Always assigned (even when false) so that re-fulfilling
// a previously-fallback entry with a concrete response clears the flag and
// ends the retry loop.
isUpgradeableISRFallback, // which comes from the response, not the tier the entry was requested at.
// Usually the two agree, but when a response's shell payload IS the full
// response (no shell/full split), shell-spawned entries are fulfilled with
// full-tier content and recorded as such (see the promotion in
// writeSegmentBundleResponse). Always assigned, replacing
// the spawn-time strategy set by upgradeToPendingSegment; the write walks'
// matching and keying decisions all happen against the spawn-time
// strategy, before fulfillment, so they are unaffected. See
// SegmentCacheEntryShared['fetchStrategy'].
fetchStrategy) {
    const fulfilledEntry = segmentCacheEntry;
    fulfilledEntry.status = _cachemap.EntryStatus.Fulfilled;
    fulfilledEntry.rsc = rsc;
    fulfilledEntry.staleAt = staleAt;
    fulfilledEntry.isPartial = isPartial;
    fulfilledEntry.isUpgradeableISRFallback = isUpgradeableISRFallback;
    fulfilledEntry.fetchStrategy = fetchStrategy;
    // Resolve any listeners that were waiting for this data.
    if (segmentCacheEntry.promise !== null) {
        segmentCacheEntry.promise.resolve(fulfilledEntry);
        // Free the promise for garbage collection.
        fulfilledEntry.promise = null;
    }
    pingBlockedTasks(segmentCacheEntry);
    return fulfilledEntry;
}
function rejectRouteCacheEntry(entry, staleAt) {
    const rejectedEntry = entry;
    rejectedEntry.status = _cachemap.EntryStatus.Rejected;
    rejectedEntry.staleAt = staleAt;
    pingBlockedTasks(entry);
}
function rejectSegmentCacheEntry(entry, staleAt) {
    const rejectedEntry = entry;
    rejectedEntry.status = _cachemap.EntryStatus.Rejected;
    rejectedEntry.staleAt = staleAt;
    if (entry.promise !== null) {
        // NOTE: We don't currently propagate the reason the prefetch was canceled
        // but we could by accepting a `reason` argument.
        entry.promise.resolve(null);
        entry.promise = null;
    }
    pingBlockedTasks(entry);
}
function convertRootTreePrefetchToRouteTree(rootTree, renderedPathname, renderedSearch, acc) {
    // Remove trailing and leading slashes
    const pathnameParts = (0, _cachekey.splitPathnameIntoParts)(renderedPathname);
    const index = 0;
    const rootSegment = _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY;
    return convertTreePrefetchToRouteTree(rootTree.tree, rootSegment, null, _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY, pathnameParts, index, renderedSearch, acc);
}
function convertTreePrefetchToRouteTree(prefetch, segment, partialVaryPath, requestKey, pathnameParts, pathnamePartsIndex, renderedSearch, acc) {
    // Converts the route tree sent by the server into the format used by the
    // cache. The cached version of the tree includes additional fields, such as a
    // cache key for each segment. Since this is frequently accessed, we compute
    // it once instead of on every access. This same cache key is also used to
    // request the segment from the server.
    let slots = null;
    let isPage;
    let varyPath;
    const prefetchSlots = prefetch.slots;
    if (prefetchSlots !== null) {
        isPage = false;
        varyPath = (0, _varypath.finalizeLayoutVaryPath)(requestKey, partialVaryPath);
        slots = new Map();
        for(let parallelRouteKey in prefetchSlots){
            const childPrefetch = prefetchSlots[parallelRouteKey];
            const childSegmentName = childPrefetch.name;
            const childParam = childPrefetch.param;
            let childDoesAppearInURL;
            let childSegment;
            let childPartialVaryPath;
            if (childParam !== null) {
                // This segment is parameterized. Get the param from the pathname.
                const childParamValue = (0, _routeparams.parseDynamicParamFromURLPart)(childParam.type, pathnameParts, pathnamePartsIndex);
                // Assign a cache key to the segment, based on the param value. In the
                // pre-Segment Cache implementation, the server computes this and sends
                // it in the body of the response. In the Segment Cache implementation,
                // the server sends an empty string and we fill it in here.
                // TODO: We're intentionally not adding the search param to page
                // segments here; it's tracked separately and added back during a read.
                // This would clearer if we waited to construct the segment until it's
                // read from the cache, since that's effectively what we're
                // doing anyway.
                const childParamKey = // cacheComponents is enabled.
                childParam.key !== null ? childParam.key : (0, _routeparams.getCacheKeyForDynamicParam)(childParamValue, '');
                childPartialVaryPath = (0, _varypath.appendLayoutVaryPath)(partialVaryPath, childParamKey, childSegmentName, // above the root layout, which the server marks directly.
                (childPrefetch.prefetchHints & _approutertypes.PrefetchHint.IsRootLayoutOrAbove) !== 0);
                childSegment = [
                    childSegmentName,
                    childParamKey,
                    childParam.type,
                    childParam.siblings
                ];
                childDoesAppearInURL = true;
            } else {
                // This segment does not have a param. Inherit the partial vary path of
                // the parent.
                childPartialVaryPath = partialVaryPath;
                childSegment = childSegmentName;
                childDoesAppearInURL = (0, _routeparams.doesStaticSegmentAppearInURL)(childSegmentName);
            }
            // Only increment the index if the segment appears in the URL. If it's a
            // "virtual" segment, like a route group, it remains the same.
            const childPathnamePartsIndex = childDoesAppearInURL ? pathnamePartsIndex + 1 : pathnamePartsIndex;
            const childRequestKeyPart = (0, _segmentvalueencoding.createSegmentRequestKeyPart)(childSegment);
            const childRequestKey = (0, _segmentvalueencoding.appendSegmentRequestKeyPart)(requestKey, parallelRouteKey, childRequestKeyPart);
            slots.set(parallelRouteKey, convertTreePrefetchToRouteTree(childPrefetch, childSegment, childPartialVaryPath, childRequestKey, pathnameParts, childPathnamePartsIndex, renderedSearch, acc));
        }
    } else {
        if (requestKey.endsWith(_segment.PAGE_SEGMENT_KEY)) {
            // This is a page segment.
            isPage = true;
            varyPath = (0, _varypath.finalizePageVaryPath)(requestKey, renderedSearch, partialVaryPath);
            // The metadata "segment" is not part the route tree, but it has the same
            // conceptual params as a page segment. Write the vary path into the
            // accumulator object. If there are multiple parallel pages, we use the
            // first one. Which page we choose is arbitrary as long as it's
            // consistently the same one every time every time. See
            // finalizeMetadataVaryPath for more details.
            if (acc.metadataVaryPath === null) {
                acc.metadataVaryPath = (0, _varypath.finalizeMetadataVaryPath)(requestKey, renderedSearch, partialVaryPath);
            }
        } else {
            // This is a layout segment.
            isPage = false;
            varyPath = (0, _varypath.finalizeLayoutVaryPath)(requestKey, partialVaryPath);
        }
    }
    return {
        requestKey,
        segment,
        shellVaryPath: (0, _varypath.getShellSegmentVaryPath)(varyPath),
        refreshState: null,
        // TODO: Cheating the type system here a bit because TypeScript can't tell
        // that the type of isPage and varyPath are consistent. The fix would be to
        // create separate constructors and call the appropriate one from each of
        // the branches above. Just seems a bit overkill only for one field so I'll
        // leave it as-is for now. If isPage were wrong it would break the behavior
        // and we'd catch it quickly, anyway.
        varyPath: varyPath,
        isPage: isPage,
        slots,
        prefetchHints: prefetch.prefetchHints
    };
}
function convertRootFlightRouterStateToRouteTree(flightRouterState, renderedSearch, acc) {
    return convertFlightRouterStateToRouteTree(flightRouterState, _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY, null, renderedSearch, acc);
}
function convertReusedFlightRouterStateToRouteTree(parentRouteTree, parallelRouteKey, flightRouterState, renderedSearch, acc) {
    // Create a RouteTree for a FlightRouterState that was reused from an older
    // route. This happens during a navigation when a parallel route slot does not
    // match the target route; we reuse whatever slot was already active.
    // Unlike a FlightRouterState, the RouteTree type contains backreferences to
    // the parent segments. Append the vary path to the parent's vary path.
    const parentPartialVaryPath = parentRouteTree.isPage ? (0, _varypath.getPartialPageVaryPath)(parentRouteTree.varyPath) : (0, _varypath.getPartialLayoutVaryPath)(parentRouteTree.varyPath);
    const segment = flightRouterState[0];
    // And the request key.
    const parentRequestKey = parentRouteTree.requestKey;
    const requestKeyPart = (0, _segmentvalueencoding.createSegmentRequestKeyPart)(segment);
    const requestKey = (0, _segmentvalueencoding.appendSegmentRequestKeyPart)(parentRequestKey, parallelRouteKey, requestKeyPart);
    return convertFlightRouterStateToRouteTree(flightRouterState, requestKey, parentPartialVaryPath, renderedSearch, acc);
}
function convertFlightRouterStateToRouteTree(flightRouterState, requestKey, parentPartialVaryPath, parentRenderedSearch, acc) {
    const originalSegment = flightRouterState[0];
    // This segment's param (if any) is a root param iff the segment is at or
    // above the root layout, which the server marks directly.
    const isRootParam = ((flightRouterState[4] ?? 0) & _approutertypes.PrefetchHint.IsRootLayoutOrAbove) !== 0;
    // If the FlightRouterState has a refresh state, then this segment is part of
    // an inactive parallel route. It has a different rendered search query than
    // the outer parent route. In order to construct the inactive route correctly,
    // we must restore the query that was originally used to render it.
    const compressedRefreshState = flightRouterState[2] ?? null;
    const refreshState = compressedRefreshState !== null ? {
        canonicalUrl: compressedRefreshState[0],
        renderedSearch: compressedRefreshState[1]
    } : null;
    const renderedSearch = refreshState !== null ? refreshState.renderedSearch : parentRenderedSearch;
    let segment;
    let partialVaryPath;
    let isPage;
    let varyPath;
    if (Array.isArray(originalSegment)) {
        isPage = false;
        const paramCacheKey = originalSegment[1];
        const paramName = originalSegment[0];
        partialVaryPath = (0, _varypath.appendLayoutVaryPath)(parentPartialVaryPath, paramCacheKey, paramName, isRootParam);
        varyPath = (0, _varypath.finalizeLayoutVaryPath)(requestKey, partialVaryPath);
        segment = originalSegment;
    } else {
        // This segment does not have a param. Inherit the partial vary path of
        // the parent.
        partialVaryPath = parentPartialVaryPath;
        if (requestKey.endsWith(_segment.PAGE_SEGMENT_KEY)) {
            // This is a page segment.
            isPage = true;
            // The navigation implementation expects the search params to be included
            // in the segment. However, in the case of a static response, the search
            // params are omitted. So the client needs to add them back in when reading
            // from the Segment Cache.
            //
            // For consistency, we'll do this for dynamic responses, too.
            //
            // TODO: We should move search params out of FlightRouterState and handle
            // them entirely on the client, similar to our plan for dynamic params.
            segment = _segment.PAGE_SEGMENT_KEY;
            varyPath = (0, _varypath.finalizePageVaryPath)(requestKey, renderedSearch, partialVaryPath);
            // The metadata "segment" is not part the route tree, but it has the same
            // conceptual params as a page segment. Write the vary path into the
            // accumulator object. If there are multiple parallel pages, we use the
            // first one. Which page we choose is arbitrary as long as it's
            // consistently the same one every time every time. See
            // finalizeMetadataVaryPath for more details.
            if (acc.metadataVaryPath === null) {
                acc.metadataVaryPath = (0, _varypath.finalizeMetadataVaryPath)(requestKey, renderedSearch, partialVaryPath);
            }
        } else {
            // This is a layout segment.
            isPage = false;
            segment = originalSegment;
            varyPath = (0, _varypath.finalizeLayoutVaryPath)(requestKey, partialVaryPath);
        }
    }
    let slots = null;
    const parallelRoutes = flightRouterState[1];
    for(let parallelRouteKey in parallelRoutes){
        const childRouterState = parallelRoutes[parallelRouteKey];
        const childSegment = childRouterState[0];
        // TODO: Eventually, the param values will not be included in the response
        // from the server. We'll instead fill them in on the client by parsing
        // the URL. This is where we'll do that.
        const childRequestKeyPart = (0, _segmentvalueencoding.createSegmentRequestKeyPart)(childSegment);
        const childRequestKey = (0, _segmentvalueencoding.appendSegmentRequestKeyPart)(requestKey, parallelRouteKey, childRequestKeyPart);
        const childTree = convertFlightRouterStateToRouteTree(childRouterState, childRequestKey, partialVaryPath, renderedSearch, acc);
        if (slots === null) {
            slots = new Map();
        }
        slots.set(parallelRouteKey, childTree);
    }
    return {
        requestKey,
        segment,
        shellVaryPath: (0, _varypath.getShellSegmentVaryPath)(varyPath),
        refreshState,
        // TODO: Cheating the type system here a bit because TypeScript can't tell
        // that the type of isPage and varyPath are consistent. The fix would be to
        // create separate constructors and call the appropriate one from each of
        // the branches above. Just seems a bit overkill only for one field so I'll
        // leave it as-is for now. If isPage were wrong it would break the behavior
        // and we'd catch it quickly, anyway.
        varyPath: varyPath,
        isPage: isPage,
        slots,
        prefetchHints: flightRouterState[4] ?? 0
    };
}
function convertRouteTreeToFlightRouterState(routeTree) {
    const parallelRoutes = {};
    const slots = routeTree.slots;
    if (slots !== null) {
        for (const [parallelRouteKey, childTree] of slots){
            parallelRoutes[parallelRouteKey] = convertRouteTreeToFlightRouterState(childTree);
        }
    }
    const flightRouterState = [
        routeTree.segment,
        parallelRoutes,
        null,
        null
    ];
    if (routeTree.prefetchHints !== 0) {
        flightRouterState[4] = routeTree.prefetchHints;
    }
    return flightRouterState;
}
async function fetchRouteOnCacheMiss(entry, key, // branch that writes segment data included in the tree response.
map) {
    // This function is allowed to use async/await because it contains the actual
    // fetch that gets issued on a cache miss. Notice it writes the result to the
    // cache entry directly, rather than return data that is then written by
    // the caller.
    const pathname = key.pathname;
    const search = key.search;
    const nextUrl = key.nextUrl;
    const segmentPath = '/_tree';
    const headers = {
        [_approuterheaders.RSC_HEADER]: '1',
        [_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER]: '1',
        [_approuterheaders.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER]: segmentPath
    };
    if (nextUrl !== null) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
    }
    try {
        const url = new URL(pathname + search, location.origin);
        let response;
        let urlAfterRedirects;
        if (isOutputExportMode) {
            // In output: "export" mode, we can't use headers to request a particular
            // segment. Instead, we encode the extra request information into the URL.
            // This is not part of the "public" interface of the app; it's an internal
            // Next.js implementation detail that the app developer should not need to
            // concern themselves with.
            //
            // For example, to request a segment:
            //
            //   Path passed to <Link>:   /path/to/page
            //   Path passed to fetch:    /path/to/page/__next-segments/_tree
            //
            //   (This is not the exact protocol, just an illustration.)
            //
            // Before we do that, though, we need to account for redirects. Even in
            // output: "export" mode, a proxy might redirect the page to a different
            // location, but we shouldn't assume or expect that they also redirect all
            // the segment files, too.
            //
            // To check whether the page is redirected, previously we perform a range
            // request of 64 bytes of the HTML document to check if the target page
            // is part of this app (by checking if build id matches). Only if the target
            // page is part of this app do we determine the final canonical URL.
            //
            // However, as mentioned in https://github.com/vercel/next.js/pull/85903,
            // some popular static hosting providers (like Cloudflare Pages or Render.com)
            // do not support range requests, in the worst case, the entire HTML instead
            // of 64 bytes could be returned, which is wasteful.
            //
            // So instead, we drops the check for build id here, and simply perform
            // a HEAD request to rejects 1xx/4xx/5xx responses, and then determine the
            // final URL after redirects.
            //
            // NOTE: We could embed the route tree into the HTML document, to avoid
            // a second request. We're not doing that currently because it would make
            // the HTML document larger and affect normal page loads.
            const headResponse = await (0, _fetch.fetch)(url, {
                method: 'HEAD'
            });
            if (headResponse.status < 200 || headResponse.status >= 400) {
                // The target page responded w/o a successful status code
                // Could be a WAF serving a 403, or a 5xx from a backend
                //
                // Note that we can't use headResponse.ok here, because
                // Response#ok returns `false` with 3xx responses.
                rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
                return null;
            }
            urlAfterRedirects = headResponse.redirected ? new URL(headResponse.url) : url;
            response = await fetchPrefetchResponse(addSegmentPathToUrlInOutputExportMode(urlAfterRedirects, segmentPath), headers);
        } else {
            // "Server" mode. We can use request headers instead of the pathname.
            // TODO: The eventual plan is to get rid of our custom request headers and
            // encode everything into the URL, using a similar strategy to the
            // "output: export" block above.
            response = await fetchPrefetchResponse(url, headers);
            urlAfterRedirects = response !== null && response.redirected ? new URL(response.url) : url;
        }
        if (!response || !response.ok || !response.body) {
            // Server responded with an error, or with a miss. We should still cache
            // the response, but we can try again after 10 seconds.
            rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
            return null;
        }
        // TODO: The canonical URL is the href without the origin. I think
        // historically the reason for this is because the initial canonical URL
        // gets passed as a prop to the top-level React component, which means it
        // needs to be computed during SSR. If it were to include the origin, it
        // would need to always be same as location.origin on the client, to prevent
        // a hydration mismatch. To sidestep this complexity, we omit the origin.
        //
        // However, since this is neither a native URL object nor a fully qualified
        // URL string, we need to be careful about how we use it. To prevent subtle
        // mistakes, we should create a special type for it, instead of just string.
        // Or, we should just use a (readonly) URL object instead. The type of the
        // prop that we pass to seed the initial state does not need to be the same
        // type as the state itself.
        const canonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(urlAfterRedirects);
        // Check whether the response varies based on the Next-Url header.
        const varyHeader = response.headers.get('vary');
        const couldBeIntercepted = varyHeader !== null && varyHeader.includes(_approuterheaders.NEXT_URL);
        // TODO: The `closed` promise was originally used to track when a streaming
        // network connection closes, so the scheduler could limit concurrent
        // connections. Now that prefetch responses are buffered, `closed` is
        // resolved immediately after buffering — before the outer function even
        // returns. This mechanism is only still meaningful for dynamic (Full)
        // prefetches, which use incremental streaming. Consider removing the
        // `closed` plumbing for buffered prefetch paths.
        const closed = (0, _promisewithresolvers.createPromiseWithResolvers)();
        // This checks whether the response was served from the per-segment cache,
        // rather than the old prefetching flow. If it fails, it implies that PPR
        // is disabled on this route.
        const routeIsPPREnabled = response.headers.get(_approuterheaders.NEXT_DID_POSTPONE_HEADER) === '2' || // In output: "export" mode, we can't rely on response headers. But if we
        // receive a well-formed response, we can assume it's a static response,
        // because all data is static in this mode.
        isOutputExportMode;
        if (routeIsPPREnabled) {
            const { stream: prefetchStream, size: responseSize } = await createNonTaskyPrefetchResponseStream(response.body);
            closed.resolve();
            (0, _cachemap.setSizeInCacheMap)(entry, responseSize);
            const serverData = await (0, _fetchserverresponse.createFromNextReadableStream)(prefetchStream, headers, {
                allowPartialStream: true
            });
            if ((response.headers.get(_constants.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? serverData.buildId) !== (0, _navigationbuildid.getNavigationBuildId)()) {
                // The server build does not match the client. Treat as a 404. During
                // an actual navigation, the router will trigger an MPA navigation.
                // TODO: We should cache the fact that this is an MPA navigation.
                rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
                return null;
            }
            // Get the params that were used to render the target page. These may
            // be different from the params in the request URL, if the page
            // was rewritten.
            const renderedPathname = (0, _routeparams.getRenderedPathname)(response);
            const renderedSearch = (0, _routeparams.getRenderedSearch)(response);
            // Convert the server-sent data into the RouteTree format used by the
            // client cache.
            //
            // During this traversal, we accumulate additional data into this
            // "accumulator" object.
            const acc = {
                metadataVaryPath: null,
                treeDivergedFromBase: false
            };
            const routeTree = convertRootTreePrefetchToRouteTree(serverData, renderedPathname, renderedSearch, acc);
            const metadataVaryPath = acc.metadataVaryPath;
            if (metadataVaryPath === null) {
                rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
                return null;
            }
            (0, _optimisticroutes.discoverKnownRoute)(Date.now(), pathname, search, nextUrl, entry, routeTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, routeIsPPREnabled, false // hasDynamicRewrite
            );
        } else {
            // PPR is not enabled for this route. The server responds with a
            // different format (FlightRouterState) that we need to convert.
            // TODO: We will unify the responses eventually. I'm keeping the types
            // separate for now because FlightRouterState has so many
            // overloaded concerns.
            const { stream: prefetchStream, size: responseSize } = await createNonTaskyPrefetchResponseStream(response.body);
            closed.resolve();
            (0, _cachemap.setSizeInCacheMap)(entry, responseSize);
            const serverData = await (0, _fetchserverresponse.createFromNextReadableStream)(prefetchStream, headers, {
                allowPartialStream: true
            });
            if ((response.headers.get(_constants.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? serverData.b) !== (0, _navigationbuildid.getNavigationBuildId)()) {
                // The server build does not match the client. Treat as a 404. During
                // an actual navigation, the router will trigger an MPA navigation.
                // TODO: We should cache the fact that this is an MPA navigation.
                rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
                return null;
            }
            // Read head vary params synchronously (unioning in the response-level
            // root params). Individual segments carry their own iterables in
            // CacheNodeSeedData; the root iterable is threaded down so each segment
            // unions it too.
            const headVaryParams = (0, _varyparamsdecoding.readVaryParams)(serverData.h, serverData.r);
            writeDynamicTreeResponseIntoCache(Date.now(), // using the LoadingBoundary fetch strategy, so mark their cache entries accordingly.
            _types.FetchStrategy.LoadingBoundary, response, serverData, entry, couldBeIntercepted, canonicalUrl, routeIsPPREnabled, headVaryParams, serverData.r ?? null, pathname, search, nextUrl, map);
        }
        if (!couldBeIntercepted) {
            // This route will never be intercepted. So we can use this entry for all
            // requests to this route, regardless of the Next-Url header. This works
            // because when reading the cache we always check for a valid
            // non-intercepted entry first.
            // Re-key the entry. The `set` implementation handles removing it from
            // its previous position in the cache. We don't need to do anything to
            // update the LRU, because the entry is already in it.
            // TODO: Treat this as an upsert — should check if an entry already
            // exists at the new keypath, and if so, whether we should keep that
            // one instead.
            const fulfilledVaryPath = (0, _varypath.getFulfilledRouteVaryPath)(pathname, search, nextUrl, couldBeIntercepted);
            const isRevalidation = false;
            (0, _cachemap.setInCacheMap)(routeCacheMap, fulfilledVaryPath, entry, isRevalidation);
        }
        // Return a promise that resolves when the network connection closes, so
        // the scheduler can track the number of concurrent network connections.
        return {
            value: null,
            closed: closed.promise
        };
    } catch (error) {
        // Either the connection itself failed, or something bad happened while
        // decoding the response. If we're offline, reject with staleAt=-1 so the
        // entry immediately expires and gets retried once the scheduler is
        // re-pinged after connectivity is restored.
        if (false) {}
        rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
        return null;
    }
}
function rejectRemainingSegmentsInBundle(entries, staleAt) {
    let node = entries;
    while(node !== null){
        if (node.entry !== null && node.entry.status === _cachemap.EntryStatus.Pending) {
            rejectSegmentCacheEntry(node.entry, staleAt);
        }
        node = node.parent;
    }
}
// When a static (per-segment PPR) prefetch receives an upgradeable fallback
// shell, the localized retry loop re-issues the same fetch after this delay to
// pick up the concrete version once the server's background regeneration
// finishes.
const FALLBACK_RETRY_DELAY_MS = 2000;
// Maximum number of fallback retries per task, to avoid looping indefinitely
// if the server keeps returning a fallback (e.g. misconfiguration).
const MAX_FALLBACK_RETRIES = 3;
async function fetchSegmentsOnCacheMiss(task, route, routeKey, tree, segments, segmentCount, // identical either way; this only decides which payload of the response
// fulfills the entries.
fetchStrategy) {
    // This function is allowed to use async/await because it contains the actual
    // fetch that gets issued on a cache miss. Notice it writes the result to the
    // cache entry directly, rather than return data that is then written by
    // the caller.
    //
    // Segment fetches are non-blocking so we don't need to ping the scheduler
    // on completion.
    let result;
    try {
        result = await fetchSegmentsOnCacheMissImpl(route, routeKey, tree);
    } catch (error) {
        // The connection failed, or the response couldn't be decoded. Reject the
        // pending entries so they don't stay Pending forever, and get retried once
        // the entry expires. If we're offline, expire immediately (-1) so the entry
        // is re-fetched once the scheduler is re-pinged on reconnect; otherwise
        // apply a 10s backoff. (Unlike navigations and server actions, prefetches
        // don't await `waitForConnection`.)
        let staleAt = Date.now() + 10 * 1000;
        if (false) {}
        rejectRemainingSegmentsInBundle(segments, staleAt);
        return null;
    }
    if (result === null) {
        // The response was fetched but isn't usable yet (server error/miss, empty
        // data, or a build-id mismatch — the server may be transiently unready).
        // Reject with a short backoff so the entries are retried soon.
        rejectRemainingSegmentsInBundle(segments, Date.now() + 10 * 1000);
        return null;
    }
    const { serverResponse, shellResponse, responseSize, closed } = result;
    const now = Date.now();
    writeSegmentBundleResponseVariants(task.segmentCacheMap, serverResponse, shellResponse, responseSize, segments, segmentCount, now, fetchStrategy);
    // If the server served an upgradeable fallback shell, drive a localized
    // retry loop to pick up the concrete version once the server's background
    // regeneration finishes. Only the first such response per task starts a loop
    // (`fallbackRetryStatus === Empty`); once it leaves Empty, no second loop is
    // started — sibling bundle responses that also got a fallback don't, and
    // neither does a re-hover.
    if (serverResponse.isUpgradeableISRFallback && task.fallbackRetryStatus === _cachemap.EntryStatus.Empty && !task.isCanceled) {
        task.fallbackRetryStatus = _cachemap.EntryStatus.Pending;
        // Fire-and-forget: the loop drives itself via timers and pings the task
        // on success.
        void retryUpgradeableFallbackPrefetch(task, route, routeKey, tree, segments, segmentCount, fetchStrategy);
    }
    return {
        value: null,
        closed
    };
}
/**
 * Issues a single segment-bundle prefetch request, validates it, and decodes
 * the response. Returns the decoded response (see the return type below)
 * on success, or `null` if the response was fetched but isn't usable yet
 * (server error/miss, empty data, or a build-id mismatch — the server may be
 * transiently unready, so it's worth retrying). THROWS if the connection failed
 * or the response couldn't be decoded; re-issuing the identical request won't
 * fix that, so callers should give up rather than retry.
 *
 * This deliberately does NOT touch the cache — it neither writes the decoded
 * segments nor rejects entries. The caller decides what to do with the result:
 * write it (`fetchSegmentsOnCacheMiss`) or ignore it and try again (the retry
 * loop). Calling this again with the same arguments reproduces the exact same
 * request.
 */ async function fetchSegmentsOnCacheMissImpl(route, routeKey, tree) {
    // Use the canonical URL to request the segment, not the original URL. These
    // are usually the same, but the canonical URL will be different if the route
    // tree response was redirected. To avoid an extra waterfall on every segment
    // request, we pass the redirected URL instead of the original one.
    const url = new URL(route.canonicalUrl, location.origin);
    const nextUrl = routeKey.nextUrl;
    const requestKey = tree.requestKey;
    const normalizedRequestKey = requestKey === _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY ? // `_index` instead of as an empty string. This should be treated as
    // an implementation detail and not as a stable part of the protocol.
    // It just needs to match the equivalent logic that happens when
    // prerendering the responses. It should not leak outside of Next.js.
    '/_index' : requestKey;
    const headers = {
        [_approuterheaders.RSC_HEADER]: '1',
        [_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER]: '1',
        [_approuterheaders.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER]: normalizedRequestKey
    };
    if (nextUrl !== null) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
    }
    const requestUrl = isOutputExportMode ? addSegmentPathToUrlInOutputExportMode(url, normalizedRequestKey) : url;
    const response = await fetchPrefetchResponse(requestUrl, headers);
    if (!response || !response.ok || // This checks whether the response was served from the per-segment cache,
    // rather than the old prefetching flow. If it fails, it implies that PPR
    // is disabled on this route. Theoretically this should never happen
    // because we only issue requests for segments once we've verified that
    // the route supports PPR.
    response.headers.get(_approuterheaders.NEXT_DID_POSTPONE_HEADER) !== '2' && // In output: "export" mode, we can't rely on response headers. But if
    // we receive a well-formed response, we can assume it's a static
    // response, because all data is static in this mode.
    !isOutputExportMode || !response.body) {
        // Server responded with an error or a miss — fetched but not usable.
        return null;
    }
    // See TODO in fetchRouteOnCacheMiss about removing `closed` for
    // buffered prefetch paths.
    const closed = (0, _promisewithresolvers.createPromiseWithResolvers)();
    const { stream: prefetchStream, size: responseSize, buffer } = await createNonTaskyPrefetchResponseStream(response.body);
    closed.resolve();
    // Parse the response. Always a SegmentPrefetchResponse with a build ID and a
    // data array. A connection drop or malformed stream throws here, which
    // propagates to the caller as a non-retryable failure.
    const serverResponse = await (0, _fetchserverresponse.createFromNextReadableStream)(prefetchStream, headers, {
        allowPartialStream: true
    });
    if (serverResponse.data.length === 0) {
        return null;
    }
    if ((response.headers.get(_constants.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? serverResponse.buildId) !== (0, _navigationbuildid.getNavigationBuildId)()) {
        // The server build does not match the client. Treat as a 404. During
        // an actual navigation, the router will trigger an MPA navigation.
        return null;
    }
    // Extract the shell payload, if the response carries a distinct one
    // (positive shell byte offset): decode the buffered bytes a SECOND time,
    // truncated at the boundary. The truncation is what produces the shell
    // variant: each segment's param-dependent rows land past the boundary and
    // decode as still-pending, which renders as the param fallback. It also
    // rewinds the response's signals — `needsRuntimeRequest` and `isPartial`
    // fulfillments past the boundary read as pending in this decode, so a
    // post-shell runtime-data access doesn't mark the shell variant itself as
    // needing a runtime request.
    // (The offset is never legitimately pending or 0 in this decode: the full
    // buffer is present, and the server only ever emits a positive offset or
    // null. Reading 0 — the default for an unfulfilled `a` — therefore means a
    // bug in Next.js itself, and is handled like an error: the response is
    // treated as carrying no shell, and the scheduler skips the affected
    // segments rather than falling back to a runtime request — see the
    // `shellResponse === null` handling in writeSegmentBundleResponseVariants.
    // Failing in that direction costs a shell prefetch but never leaks
    // post-shell content into shell positions.)
    const shellOffset = readFulfilledValue(serverResponse.a, 0);
    let shellResponse;
    if (shellOffset === null) {
        shellResponse = serverResponse;
    } else if (shellOffset === 0) {
        shellResponse = null;
    } else {
        try {
            shellResponse = await (0, _fetchserverresponse.decodeBufferedStage)(buffer.subarray(0, shellOffset), headers);
        } catch  {
            // The truncated prefix couldn't be decoded. Treat it as if no shell
            // exists; the full payload is still usable. (For a StaticShell-spawned
            // bundle this means the spawned entries are rejected — the scheduler
            // then skips them rather than issuing a runtime substitute; see the
            // no-shell branch in fetchSegmentsOnCacheMiss.)
            shellResponse = null;
        }
    }
    return {
        serverResponse,
        responseSize,
        shellResponse,
        closed: closed.promise
    };
}
/**
 * Writes every payload of a parsed segment-bundle response into the cache.
 * The bundle's entries are fulfilled by the payload matching the walk that
 * spawned them; the other payload, when distinct, is written with a detached
 * copy of the bundle. The full payload is written first so the shell write's
 * shadow eviction sees the fresh concrete entry.
 *
 * Shared by the initial fetch (`fetchSegmentsOnCacheMiss`) and the localized
 * fallback-retry loop. The retry's bundle entries are already settled, so
 * for that caller every write is a detached upsert and the rejection below
 * is a no-op (it only touches Pending entries).
 */ function writeSegmentBundleResponseVariants(// spawned).
map, serverResponse, shellResponse, responseSize, segments, segmentCount, now, // them. See fetchSegmentsOnCacheMiss.
fetchStrategy) {
    if (fetchStrategy === _types.FetchStrategy.StaticShell) {
        if (shellResponse !== serverResponse) {
            writeSegmentBundleResponse(map, serverResponse, responseSize, detachEntriesFromSegmentBundle(segments), segmentCount, now, _types.FetchStrategy.PPR, _types.FetchStrategy.PPR);
        }
        if (shellResponse === null) {
            // No shell exists. Reject the spawned entries so the task isn't
            // stranded blocking on them. Note the scheduler does NOT fall back to
            // a runtime request for rejected segments — it skips them outright (see
            // the Rejected case in pingSegmentBundle in scheduler.ts), so these
            // segments get no shell prefetch and no runtime substitute until the
            // rejection's backoff expires.
            rejectRemainingSegmentsInBundle(segments, now + 10 * 1000);
        } else {
            writeSegmentBundleResponse(map, shellResponse, responseSize, segments, segmentCount, now, _types.FetchStrategy.StaticShell, // entries this write fulfills carry full-tier content, so PPR is the
            // strategy that describes it.
            shellResponse === serverResponse ? _types.FetchStrategy.PPR : _types.FetchStrategy.StaticShell);
        }
    } else {
        writeSegmentBundleResponse(map, serverResponse, responseSize, segments, segmentCount, now, _types.FetchStrategy.PPR, _types.FetchStrategy.PPR);
        if (shellResponse !== null && shellResponse !== serverResponse) {
            writeSegmentBundleResponse(map, shellResponse, responseSize, detachEntriesFromSegmentBundle(segments), segmentCount, now, _types.FetchStrategy.StaticShell, _types.FetchStrategy.StaticShell);
        }
    }
}
/**
 * Writes one payload of a parsed segment-bundle response into the cache:
 * distributes the response size across the bundle, then walks the segments
 * list and the response's `data` array in parallel, fulfilling/upserting
 * each entry. Any segments the server didn't return are rejected so they
 * don't stay Pending forever.
 *
 * `fetchStrategy` says which of the response's payloads this call is
 * writing — StaticShell for the shell payload, PPR for the full payload —
 * which determines the vary paths the entries are keyed at.
 *
 * The walk fulfills any Pending entry in `segments`, so the caller must
 * pass the bundle only to the walk matching the entries' own strategy, and
 * a detached copy to the other. In particular, fulfilling a spawned
 * StaticShell entry with the concrete payload would leak param-dependent
 * content into shell positions: during a navigation, a pending entry can be
 * rendered as a promise that resolves to its eventual value.
 *
 * Shared by the initial fetch and the localized fallback-retry loop (which
 * re-issues the same request and upserts the upgraded result here).
 */ function writeSegmentBundleResponse(map, serverResponse, responseSize, segments, segmentCount, now, fetchStrategy, // the entries it fulfills. Differs from `fetchStrategy` (which drives
// matching and keying) in one case: a StaticShell write whose payload IS
// the full response (no shell/full split) records PPR — see
// writeSegmentBundleResponseVariants.
payloadFetchStrategy) {
    // Distribute the response size evenly across all segments in the bundle.
    // (When a response produces two payload writes, each write distributes the
    // full response size — intentionally double-charging the LRU for one wire
    // response, since it produced two live entries per segment.)
    const averageSize = responseSize / segmentCount;
    let sizeNode = segments;
    while(sizeNode !== null){
        if (sizeNode.entry !== null) {
            (0, _cachemap.setSizeInCacheMap)(sizeNode.entry, averageSize);
        }
        sizeNode = sizeNode.parent;
    }
    const serverDataArray = serverResponse.data;
    // True if the server served an upgradeable fallback shell (page not yet
    // prerendered with concrete params, but the route can be upgraded). Applies
    // to the whole response and is recorded on each fulfilled entry.
    const responseIsUpgradeableISRFallback = serverResponse.isUpgradeableISRFallback;
    // Whether the render that produced this payload accessed runtime data
    // (page-global; combined with each segment's `isPartial` below to decide
    // the tier each entry records). Read from THIS decode's thenable status,
    // which scopes it to the payload being written — see
    // `SegmentPrefetchResponse['needsRuntimeRequest']` for the encoding.
    //
    // Reading it from the same decode that produced the entry's data is what
    // makes the answer rewindable: a truncated shell decode reads a post-shell
    // runtime access as pending, i.e. `false`, because the shell variant itself
    // doesn't need that data.
    //
    // It is load-bearing in one direction only. A false `true` costs a wasted
    // runtime request; a false `false` would record too high a tier and skip a
    // runtime request that had more content.
    const responseNeedsRuntimeRequest = readFulfilledValue(serverResponse.needsRuntimeRequest, false);
    let node = segments;
    let dataIndex = 0;
    while(node !== null && dataIndex < serverDataArray.length){
        const data = serverDataArray[dataIndex];
        // Null data means this segment has prefetching disabled
        // (prefetch: 'force-disabled' — Partial Prefetching segments have static
        // data, so the server emits a real slot for them). Skip it without
        // creating a cache entry.
        if (data === null || node.tree === null) {
            // The server's and the client's prefetch-disabled hints normally agree,
            // so there shouldn't be a spawned entry for a segment the server
            // skipped. But if they disagree, a Pending entry that a task blocked on
            // would otherwise never settle, stranding the task forever. Settle
            // it defensively.
            if (node.entry !== null && node.entry.status === _cachemap.EntryStatus.Pending) {
                rejectSegmentCacheEntry(node.entry, now + 10 * 1000);
            }
            node = node.parent;
            dataIndex++;
            continue;
        }
        // The segment's late-resolving metadata can be read synchronously
        // because the payload was fully buffered before it was decoded (and, for
        // a truncated shell decode, delivered as a single chunk).
        const entryStaleAt = readFulfilledStaleAt(now, data.staleTime);
        // Root params are emitted once at the top level of the response and
        // unioned into each segment's set here, same as for a route-level
        // response.
        const varyParams = (0, _varyparamsdecoding.readVaryParams)(data.varyParams, serverResponse.rootVaryParams);
        const isPartial = readFulfilledIsPartial(data.isPartial);
        // A runtime prefetch can only provide more content than this entry if the
        // render accessed runtime data AND this particular segment has holes — a
        // fully static segment gains nothing from a runtime request no matter
        // what the page accessed.
        const needsRuntimeRequest = responseNeedsRuntimeRequest && isPartial;
        // An entry records the tier of the content that actually satisfied it,
        // which spans both axes: shell-vs-concrete AND static-vs-runtime.
        //
        // When this payload fully satisfied the segment — no runtime request
        // needed — the content is as complete as a RUNTIME response of the same
        // variant would have been, so it records that runtime tier. That's what
        // lets the scheduler decide "would a runtime request return more?" by
        // comparing tiers alone, with no separate signal to consult.
        //
        // Otherwise the content is only as complete as the static tier it was
        // requested at, so a follow-up runtime request can still supersede it.
        const recordedFetchStrategy = !needsRuntimeRequest ? payloadFetchStrategy === _types.FetchStrategy.StaticShell ? _types.FetchStrategy.RuntimeShell : _types.FetchStrategy.PPRRuntime : fetchStrategy;
        // Key the entry by which params the server said this segment depends on.
        // Reusing one copy across param values is the point of the shell, but it
        // requires knowing the content doesn't depend on those params, and the
        // server's report is the direct evidence of that.
        //
        // Without that report, assume every param varies. The exception is a
        // shell variant, which reduces param-dependent content to param
        // fallbacks, so it really is good for any value of them.
        const payloadVaryPath =  true && varyParams !== null ? (0, _varypath.getFulfilledSegmentVaryPath)(node.tree.varyPath, varyParams) : (0, _varypath.getSegmentVaryPathForRequest)(payloadFetchStrategy, node.tree);
        const nodeEntry = node.entry;
        if (nodeEntry !== null && nodeEntry.status === _cachemap.EntryStatus.Pending) {
            // We own this entry — fulfill it directly.
            const fulfilledEntry = fulfillSegmentCacheEntry(nodeEntry, data.rsc, entryStaleAt, isPartial, responseIsUpgradeableISRFallback, recordedFetchStrategy);
            // Move the entry to that key. This is load-bearing rather than a no-op:
            // a task spawns its entries before it knows what the response will
            // contain, so the key it guessed can be more reusable than the response
            // turned out to deserve.
            //
            // Pass the concrete lookup path — the most specific path a read for
            // this segment position would use — so that if the entry lands at a
            // more generic key, a stale entry at a more specific one can't shadow
            // it. See evictShadowingSegmentEntries. The upsert (rather than a bare
            // set) applies the usual precedence rules, so a concurrent task's more
            // complete response already in this slot isn't downgraded.
            upsertSegmentEntry(now, map, payloadVaryPath, fulfilledEntry, node.tree.varyPath);
        } else {
            // We don't own this entry. Create a detached entry and attempt to
            // upsert it into this payload's slot.
            const detachedEntry = createDetachedSegmentCacheEntry(now);
            const fulfilledEntry = fulfillSegmentCacheEntry(upgradeToPendingSegment(detachedEntry, fetchStrategy), data.rsc, entryStaleAt, isPartial, responseIsUpgradeableISRFallback, recordedFetchStrategy);
            upsertSegmentEntry(now, map, payloadVaryPath, fulfilledEntry, node.tree.varyPath);
        }
        node = node.parent;
        dataIndex++;
    }
    // If the server returned fewer segments than expected, reject any
    // remaining pending entries so they don't stay Pending forever.
    if (node !== null) {
        rejectRemainingSegmentsInBundle(node, now + 10 * 1000);
    }
}
/**
 * Clones a SegmentBundle chain with every `entry` removed, so a write walk
 * over it is pure detached upserts. Used for the payload that does NOT
 * match the bundle's spawned entries (see writeSegmentBundleResponse).
 */ function detachEntriesFromSegmentBundle(segments) {
    const head = {
        tree: segments.tree,
        entry: null,
        parent: null
    };
    let clonedTail = head;
    let node = segments.parent;
    while(node !== null){
        const clonedNode = {
            tree: node.tree,
            entry: null,
            parent: null
        };
        clonedTail.parent = clonedNode;
        clonedTail = clonedNode;
        node = node.parent;
    }
    return head;
}
// TODO: Consolidate the read* helpers below with the ones in
// vary-params-decoding — they all perform a version of the same synchronous
// read of a buffered decode's late-resolving values.
/**
 * Reads a segment's partialness from its `isPartial` promise. (Unlike the
 * values read via `readFulfilledValue` below, the fulfillment value here is
 * void — partialness is encoded as the ABSENCE of a fulfillment.) The server
 * fulfills it only for a fully-static segment and leaves it pending for a
 * partial one (see `SegmentPrefetch['isPartial']`), so partial == not
 * fulfilled. The read is synchronous because the response is fully buffered
 * before it's decoded, so a fulfillment is already visible on the thenable's
 * status — the same trick `readVaryParams` uses for the vary params iterables.
 */ function readFulfilledIsPartial(isPartial) {
    const thenable = isPartial;
    // Force Flight to unwrap a received-but-not-yet-settled row. A pending row,
    // or a truncated shell decode whose fulfillment landed past the boundary,
    // stays non-fulfilled — read as partial, which is correct either way.
    thenable.then(noop, noop);
    return thenable.status !== 'fulfilled';
}
/**
 * Reads a late-resolving value off a fully-buffered decode's thenable status,
 * using the same trick as above. Returns `valueIfUnresolved` for a row that
 * is pending or absent in this decode — e.g. one whose fulfillment landed
 * past a truncated shell decode's boundary. That's what scopes a response's
 * late-resolving signals to the payload being decoded.
 */ function readFulfilledValue(valueFromServer, valueIfUnresolved) {
    const thenable = valueFromServer;
    // Force Flight to unwrap a received-but-not-yet-settled row.
    thenable.then(noop, noop);
    if (thenable.status === 'fulfilled' && thenable.value !== undefined) {
        return thenable.value;
    }
    return valueIfUnresolved;
}
/**
 * Reads a stale-at time from the staleTime async iterable of a fully-buffered
 * response — segment bundles and stage decodes, which go through
 * `createNonTaskyPrefetchResponseStream`. Because the bytes are all present,
 * each yielded value is already visible on its chunk's thenable status (the
 * same trick `readVaryParams` uses), so this drains synchronously and takes
 * the last value (the final staleTime, as `resolveStaleAt` does for the
 * async case). A missing iterable, or a truncated shell decode whose value
 * landed past the boundary, reads as absent and falls back to the static
 * stale time.
 *
 * For the one response kind that isn't buffered when read — a dynamic `Full`
 * response (fetchStrategy.Full with Partial Prefetching disabled) — use
 * `resolveStaleAt` instead, since its values aren't materialized synchronously.
 */ function readFulfilledStaleAt(now, staleTime) {
    if (staleTime === undefined) {
        return now + _navigatereducer.STATIC_STALETIME_MS;
    }
    const iterator = staleTime[Symbol.asyncIterator]();
    let staleTimeSeconds;
    while(true){
        const chunk = iterator.next();
        chunk.then(noop, noop);
        if (chunk.status !== 'fulfilled' || chunk.value === undefined) {
            break;
        }
        if (chunk.value.done) {
            break;
        }
        staleTimeSeconds = chunk.value.value;
    }
    if (staleTimeSeconds === undefined || isNaN(staleTimeSeconds)) {
        return now + _navigatereducer.STATIC_STALETIME_MS;
    }
    return now + getStaleTimeMs(staleTimeSeconds);
}
const noop = ()=>{};
/**
 * The localized retry loop for an upgradeable fallback shell. Re-issues the
 * exact same segment-bundle request (via `fetchSegmentsOnCacheMissImpl`) up to
 * MAX_FALLBACK_RETRIES times, FALLBACK_RETRY_DELAY_MS apart, until the server
 * returns the concrete (upgraded) version. On success it upserts the upgraded
 * segments (so they aren't re-fetched) and pings the task, so the task's
 * *other* fallback segments get re-attempted. If every attempt is still a
 * fallback (or fails), it gives up.
 *
 * A loop runs at most once per task, ever (the caller gates on
 * `fallbackRetryStatus === Empty`, set to `Pending` before this runs and never
 * reset to `Empty`). The sleep timer is never `clearTimeout`-ed, so the awaited
 * sleep always settles; the loop simply checks `isCanceled` after waking and
 * bails if the task was canceled in the meantime. On success the status becomes
 * `Fulfilled`; on any non-success exit (exhausted retries, fetch error, or
 * cancel) it becomes `Rejected`.
 */ async function retryUpgradeableFallbackPrefetch(task, route, routeKey, tree, segments, segmentCount, // result is written through the same payload fork so the same cache slots
// (including the shell paths) are upgraded.
fetchStrategy) {
    for(let attempt = 0; attempt < MAX_FALLBACK_RETRIES; attempt++){
        await new Promise((resolve)=>setTimeout(resolve, FALLBACK_RETRY_DELAY_MS));
        if (task.isCanceled) {
            break;
        }
        let result;
        try {
            result = await fetchSegmentsOnCacheMissImpl(route, routeKey, tree);
        } catch  {
            break;
        }
        if (task.isCanceled) {
            break;
        }
        if (result === null) {
            continue;
        }
        if (result.serverResponse.isUpgradeableISRFallback) {
            continue;
        }
        // Success: the server returned the concrete (upgraded) version. Write it
        // back through the same payload fork as the initial fetch, so every slot
        // the initial fetch wrote — including the shell paths, even when the
        // upgraded response is fully static (shell === full) — is upgraded. The
        // bundle's entries were already settled by the initial fetch, so every
        // write is a detached upsert that replaces the fallback. Mark the loop
        // fulfilled and ping the task; its other fallback segments are now
        // allowed to revalidate.
        const { serverResponse, shellResponse, responseSize } = result;
        const now = Date.now();
        writeSegmentBundleResponseVariants(task.segmentCacheMap, serverResponse, shellResponse, responseSize, segments, segmentCount, now, fetchStrategy);
        task.fallbackRetryStatus = _cachemap.EntryStatus.Fulfilled;
        (0, _scheduler.pingPrefetchTask)(task);
        return;
    }
    // The loop finished without success (exhausted its retries, broke out on a
    // fetch error, or the task was canceled). It won't run again for this task.
    task.fallbackRetryStatus = _cachemap.EntryStatus.Rejected;
}
async function fetchSegmentPrefetchesUsingDynamicRequest(task, route, fetchStrategy, dynamicRequestTree, spawnedEntries) {
    const key = task.key;
    const url = new URL(route.canonicalUrl, location.origin);
    const nextUrl = key.nextUrl;
    if (spawnedEntries.size === 1 && spawnedEntries.has(route.metadata.requestKey)) {
        // The only thing pending is the head. Instruct the server to
        // skip over everything else.
        // TODO: Lift this logic into the caller. Or perhaps unify the
        // "request tree" and the spawnedEntries into the same type so they are
        // guaranteed to always been in sync.
        dynamicRequestTree = MetadataOnlyRequestTree;
    }
    const headers = {
        [_approuterheaders.RSC_HEADER]: '1',
        [_approuterheaders.NEXT_ROUTER_STATE_TREE_HEADER]: (0, _flightdatahelpers.prepareFlightRouterStateForRequest)(dynamicRequestTree)
    };
    if (nextUrl !== null) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
    }
    switch(fetchStrategy){
        case _types.FetchStrategy.Full:
            {
                break;
            }
        case _types.FetchStrategy.PPRRuntime:
            {
                headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER] = '2';
                break;
            }
        case _types.FetchStrategy.RuntimeShell:
            {
                headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER] = '3';
                break;
            }
        case _types.FetchStrategy.LoadingBoundary:
            {
                headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER] = '1';
                break;
            }
        default:
            {
                fetchStrategy;
            }
    }
    try {
        const response = await fetchPrefetchResponse(url, headers);
        if (!response || !response.ok || !response.body) {
            // Server responded with an error, or with a miss. We should still cache
            // the response, but we can try again after 10 seconds.
            rejectSegmentEntriesIfStillPending(spawnedEntries, Date.now() + 10 * 1000);
            return null;
        }
        const renderedSearch = (0, _routeparams.getRenderedSearch)(response);
        if (renderedSearch !== route.renderedSearch) {
            // The search params that were used to render the target page are
            // different from the search params in the request URL. This only happens
            // when there's a dynamic rewrite in between the tree prefetch and the
            // data prefetch.
            // TODO: For now, since this is an edge case, we reject the prefetch, but
            // the proper way to handle this is to evict the stale route tree entry
            // then fill the cache with the new response.
            rejectSegmentEntriesIfStillPending(spawnedEntries, Date.now() + 10 * 1000);
            return null;
        }
        // Track when the network connection closes. Only meaningful for Full
        // (dynamic) prefetches which use incremental streaming. For buffered
        // paths, this is resolved immediately — see TODO in fetchRouteOnCacheMiss.
        const closed = (0, _promisewithresolvers.createPromiseWithResolvers)();
        let fulfilledEntries = null;
        let prefetchStream;
        let bufferedResponseSize = null;
        if (fetchStrategy === _types.FetchStrategy.Full) {
            // Full prefetches are dynamic responses stored in the prefetch cache.
            // They don't carry vary params or other cache metadata, so there's no
            // need to buffer them. Use the incremental version to allow data to be
            // processed as it arrives.
            prefetchStream = createIncrementalPrefetchResponseStream(response.body, closed.resolve, function onResponseSizeUpdate(totalBytesReceivedSoFar) {
                // When processing a dynamic response, we don't know how large each
                // individual segment is, so approximate by assigning each segment
                // the average of the total response size.
                if (fulfilledEntries === null) {
                    // Haven't received enough data yet to know which segments
                    // were included.
                    return;
                }
                const averageSize = totalBytesReceivedSoFar / fulfilledEntries.length;
                for (const entry of fulfilledEntries){
                    (0, _cachemap.setSizeInCacheMap)(entry, averageSize);
                }
            });
        } else {
            const { stream, size } = await createNonTaskyPrefetchResponseStream(response.body);
            closed.resolve();
            prefetchStream = stream;
            bufferedResponseSize = size;
        }
        const [serverData, cacheData] = await Promise.all([
            (0, _fetchserverresponse.createFromNextReadableStream)(prefetchStream, headers, {
                allowPartialStream: true
            }),
            response.cacheData
        ]);
        const now = Date.now();
        const staleAt = await resolveStaleAt(now, serverData.s, response);
        const buildId = response.headers.get(_constants.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? serverData.b;
        // Check if a reusable App Shell can be extracted from the main response.
        let serverDataThatSatisfiesSpawnedEntries;
        // The shell and full response have independent stale times. Track the
        // staleAt that corresponds to whatever payload the spawned entries get
        // filled with below.
        let staleAtForSpawnedEntries = staleAt;
        if (cacheData === null) {
            // No shell can be extracted without cache metadata (only present when
            // Cached Navigations is enabled). For routes without a distinct App Shell
            // the extraction below is a no-op anyway (`resolveShellStageData` returns
            // null), so this just short-circuits that case.
            serverDataThatSatisfiesSpawnedEntries = serverData;
        } else {
            const shellStageData = await (0, _fetchserverresponse.resolveShellStageData)(cacheData, serverData, headers);
            if (shellStageData === null) {
                // No App Shell can be extracted. This usually means the entire response
                // _is_ the App Shell. The other possibility (for now, until the feature
                // is fully stabilized) is that App Shells are not yet enabled. Either
                // way, there's nothing extra for us to do: fulfill the pending entries
                // using the response from the server.
                serverDataThatSatisfiesSpawnedEntries = serverData;
            } else {
                // Successfully extracted an App Shell that is a subset of the main
                // response. Depending on the type of prefetch this is, we need to
                // decide whether to fulfill the pending entries with the shell or with
                // the entire response. In either scenario, we'll be inserting _both_
                // versions of the response into the cache; the extra logic is only
                // here so that we don't fulfill pending shell entries with something
                // that's more concrete than what they expect.
                // TODO: The only reason this matters is because during a navigation,
                // if a segment is still pending, we render a promise that resolves to
                // the eventual value of that segment. But that means we cannot
                // eventually resolve that segment to something more concrete than what
                // was already requested. Hence the extra logic here. A cleaner way to
                // model this, though, is whenever we render a promise that resolves to
                // the result of a pending entry, do one additional cache look-up right
                // after the promise resolves, to ensure we never get a mismatching
                // entry. Leaving this for a follow up.
                // shellStageData is a fully-buffered stage decode, so read staleTime
                // synchronously off the thenable status.
                const shellStaleAt = readFulfilledStaleAt(now, shellStageData.s);
                if (fetchStrategy === _types.FetchStrategy.RuntimeShell) {
                    // This is a Shell prefetch, so the pending entries must be fulfilled
                    // with the shell.
                    serverDataThatSatisfiesSpawnedEntries = shellStageData;
                    staleAtForSpawnedEntries = shellStaleAt;
                    // Separately, we'll also cache the entire response, by upserting it
                    // into the cache.
                    writePrerenderResponseIntoCache(now, _types.FetchStrategy.PPR, serverData.f, buildId, serverData.h, serverData.r ?? null, staleAt, dynamicRequestTree, renderedSearch, cacheData.isResponsePartial, task.segmentCacheMap);
                } else {
                    // This is _not_ a Shell prefetch, so the pending entries should be
                    // fulfilled with the entire response.
                    serverDataThatSatisfiesSpawnedEntries = serverData;
                    // Additionally, we might as well upsert the extracted Shell into the
                    // cache, too.
                    // `shellStageData` is only provided in cases where the shell is
                    // different from the main response. If they are equivalent, this
                    // branch is skipped. So it follows that any shell data reaches
                    // this path must be partial -- it does not represent the entire
                    // UI of the target page.
                    const isShellStagePartial = true;
                    writePrerenderResponseIntoCache(now, _types.FetchStrategy.RuntimeShell, shellStageData.f, buildId, shellStageData.h, shellStageData.r ?? null, shellStaleAt, dynamicRequestTree, renderedSearch, isShellStagePartial, task.segmentCacheMap);
                }
            }
        }
        // Read head vary params synchronously (unioning in the response-level root
        // params). Individual segments carry their own iterables in
        // CacheNodeSeedData; the root iterable is threaded down so each segment
        // unions it too.
        const rootVaryParamsIterable = serverDataThatSatisfiesSpawnedEntries.r ?? null;
        const headVaryParams = (0, _varyparamsdecoding.readVaryParams)(serverDataThatSatisfiesSpawnedEntries.h, rootVaryParamsIterable);
        // PPRRuntime and RuntimeShell prefetches are partial when the server
        // marks the response as '~' (Partial). RuntimeShell additionally omits
        // every dynamic suspense boundary below the App Shell, so its segments
        // are always partial regardless of what the server marker says.
        // Full/LoadingBoundary prefetches are always complete.
        const isResponsePartial = fetchStrategy === _types.FetchStrategy.RuntimeShell || fetchStrategy === _types.FetchStrategy.PPRRuntime && (cacheData?.isResponsePartial ?? false);
        const flightDatas = (0, _flightdatahelpers.normalizeFlightData)(serverDataThatSatisfiesSpawnedEntries.f);
        if (typeof flightDatas === 'string') {
            rejectSegmentEntriesIfStillPending(spawnedEntries, Date.now() + 10 * 1000);
            return null;
        }
        const navigationSeed = (0, _navigation.convertServerPatchToFullTree)(now, dynamicRequestTree, flightDatas, renderedSearch, _bfcache.UnknownDynamicStaleTime);
        if (navigationSeed.treeDivergedFromBase && // A head-only request uses the MetadataOnlyRequestTree stub rather than
        // a tree derived from the route entry, so divergence from it carries
        // no signal.
        // TODO: This special case goes away once convertServerPatchToFullTree
        // diffs against the base RouteTree (route.tree) instead of the
        // request tree.
        dynamicRequestTree !== MetadataOnlyRequestTree) {
            // The server rendered a different route tree than the one we requested:
            // the URL has a rewrite that behaves dynamically, so the params baked
            // into the request are wrong and the server can never fulfill it. Mark
            // the route entry — which doubles as the stored prediction pattern, so
            // this also disables a bad prediction (see matchKnownRoute) that would
            // otherwise be re-derived on every retry — and invalidate entries that
            // were derived from it. This mirrors dispatchRetryDueToTreeMismatch on
            // the navigation path. It can't loop: the refetched route entry is
            // built from the server's response, so it only mismatches again if the
            // rewrite's behavior changes again.
            markRouteEntryAsDynamicRewrite(route);
            invalidateRouteCacheEntries(key.nextUrl, task.treeAtTimeOfPrefetch);
            // Reject with an immediate expiration instead of the usual backoff: the
            // invalidation above triggers a re-prefetch, which per the above does
            // not loop.
            // TODO: Consider also bounding retries with a counter on the task
            // object, so a prefetch that repeatedly fails to settle backs off
            // regardless of the reason.
            rejectSegmentEntriesIfStillPending(spawnedEntries, -1);
            return null;
        }
        // Aside from writing the data into the cache, this function also returns
        // the entries that were fulfilled, so we can streamingly update their sizes
        // in the LRU as more data comes in.
        fulfilledEntries = writeDynamicRenderResponseIntoCache(now, fetchStrategy, flightDatas, buildId, isResponsePartial, headVaryParams, rootVaryParamsIterable, staleAtForSpawnedEntries, navigationSeed, spawnedEntries, task.segmentCacheMap);
        // For buffered responses, update LRU sizes now that we know which
        // entries were fulfilled.
        if (bufferedResponseSize !== null && fulfilledEntries !== null && fulfilledEntries.length > 0) {
            const averageSize = bufferedResponseSize / fulfilledEntries.length;
            for (const entry of fulfilledEntries){
                (0, _cachemap.setSizeInCacheMap)(entry, averageSize);
            }
        }
        // Return a promise that resolves when the network connection closes, so
        // the scheduler can track the number of concurrent network connections.
        return {
            value: null,
            closed: closed.promise
        };
    } catch (error) {
        if (false) {}
        rejectSegmentEntriesIfStillPending(spawnedEntries, Date.now() + 10 * 1000);
        return null;
    }
}
function writeDynamicTreeResponseIntoCache(now, fetchStrategy, response, serverData, entry, couldBeIntercepted, canonicalUrl, routeIsPPREnabled, headVaryParams, rootVaryParamsIterable, originalPathname, originalSearch, nextUrl, map) {
    const renderedSearch = (0, _routeparams.getRenderedSearch)(response);
    const normalizedFlightDataResult = (0, _flightdatahelpers.normalizeFlightData)(serverData.f);
    if (// MPA navigation.
    typeof normalizedFlightDataResult === 'string' || normalizedFlightDataResult.length !== 1) {
        rejectRouteCacheEntry(entry, now + 10 * 1000);
        return;
    }
    const flightData = normalizedFlightDataResult[0];
    if (!flightData.isRootRender) {
        // Unexpected response format.
        rejectRouteCacheEntry(entry, now + 10 * 1000);
        return;
    }
    const flightRouterState = flightData.tree;
    // If the response was postponed, segments may contain dynamic holes.
    // The head has its own partiality flag (flightDataEntry.isHeadPartial)
    // which is handled separately in writeDynamicRenderResponseIntoCache.
    const isResponsePartial = response.headers.get(_approuterheaders.NEXT_DID_POSTPONE_HEADER) === '1';
    // Convert the server-sent data into the RouteTree format used by the
    // client cache.
    //
    // During this traversal, we accumulate additional data into this
    // "accumulator" object.
    const acc = {
        metadataVaryPath: null,
        treeDivergedFromBase: false
    };
    const routeTree = convertRootFlightRouterStateToRouteTree(flightRouterState, renderedSearch, acc);
    const metadataVaryPath = acc.metadataVaryPath;
    if (metadataVaryPath === null) {
        rejectRouteCacheEntry(entry, now + 10 * 1000);
        return;
    }
    (0, _optimisticroutes.discoverKnownRoute)(now, originalPathname, originalSearch, nextUrl, entry, routeTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, routeIsPPREnabled, false // hasDynamicRewrite
    );
    // If the server sent segment data as part of the response, we should write
    // it into the cache to prevent a second, redundant prefetch request.
    // TODO: This is a leftover branch from before Client Segment Cache was
    // enabled everywhere. Tree prefetches should never include segment data.  We
    // can delete it. Leaving for a subsequent PR.
    const navigationSeed = (0, _navigation.convertServerPatchToFullTree)(now, flightRouterState, normalizedFlightDataResult, renderedSearch, _bfcache.UnknownDynamicStaleTime);
    const buildId = response.headers.get(_constants.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? serverData.b;
    writeDynamicRenderResponseIntoCache(now, fetchStrategy, normalizedFlightDataResult, buildId, isResponsePartial, headVaryParams, rootVaryParamsIterable, getStaleAtFromHeader(now, response), navigationSeed, null, map);
}
function rejectSegmentEntriesIfStillPending(entries, staleAt) {
    const fulfilledEntries = [];
    for (const entry of entries.values()){
        if (entry.status === _cachemap.EntryStatus.Pending) {
            rejectSegmentCacheEntry(entry, staleAt);
        } else if (entry.status === _cachemap.EntryStatus.Fulfilled) {
            fulfilledEntries.push(entry);
        }
    }
    return fulfilledEntries;
}
function writeDynamicRenderResponseIntoCache(now, fetchStrategy, flightDatas, buildId, isResponsePartial, headVaryParams, rootVaryParamsIterable, staleAt, navigationSeed, spawnedEntries, // spawning task's `PrefetchTask.segmentCacheMap` for prefetches, the
// navigation's map for navigation-side writes. Binding the write to the
// requesting work means a response that lands after a testing-lock scope
// boundary still writes into the map its entries live in.
map) {
    if (buildId && buildId !== (0, _navigationbuildid.getNavigationBuildId)()) {
        // The server build does not match the client. Treat as a 404. During
        // an actual navigation, the router will trigger an MPA navigation.
        if (spawnedEntries !== null) {
            rejectSegmentEntriesIfStillPending(spawnedEntries, now + 10 * 1000);
        }
        return null;
    }
    const routeTree = navigationSeed.routeTree;
    const metadataTree = navigationSeed.metadataVaryPath !== null ? createMetadataRouteTree(navigationSeed.metadataVaryPath) : null;
    for (const flightDataEntry of flightDatas){
        const seedData = flightDataEntry.seedData;
        if (seedData !== null) {
            // The data sent by the server represents only a subtree of the app. We
            // need to find the part of the task tree that matches the response.
            //
            // segmentPath represents the parent path of subtree. It's a repeating
            // pattern of parallel route key and segment:
            //
            //   [string, Segment, string, Segment, string, Segment, ...]
            const segmentPath = flightDataEntry.segmentPath;
            let tree = routeTree;
            for(let i = 0; i < segmentPath.length; i += 2){
                const parallelRouteKey = segmentPath[i];
                const childTree = tree?.slots?.get(parallelRouteKey);
                if (childTree !== undefined) {
                    tree = childTree;
                } else {
                    if (spawnedEntries !== null) {
                        rejectSegmentEntriesIfStillPending(spawnedEntries, now + 10 * 1000);
                    }
                    return null;
                }
            }
            writeSeedDataIntoCache(now, // spawning task's `PrefetchTask.segmentCacheMap`).
            map, fetchStrategy, tree, staleAt, seedData, isResponsePartial, rootVaryParamsIterable, spawnedEntries);
        }
        const head = flightDataEntry.head;
        if (head !== null && metadataTree !== null) {
            // When Cache Components is enabled, the server's `isHeadPartial` flag
            // (isPossiblyPartialHead in app-render.tsx) is unreliable: it's computed
            // before the head is serialized, so it's conservatively `true` for every
            // statically-generated PPR page — even pages whose head is actually
            // complete — and it's `false` for runtime/dynamic responses whose head is
            // actually partial (e.g. a route with an async `generateMetadata`). So we
            // ignore it and derive the head's partiality from whether the response
            // itself was partial, exactly as we do for segments (see
            // `writeSeedDataIntoCache`). A non-partial response carries a complete
            // head; a partial (postponed) one does not.
            //
            // Without Cache Components, the server sends the correct isHeadPartial.
            const isHeadPartial =  false ? 0 : flightDataEntry.isHeadPartial;
            fulfillEntrySpawnedByRuntimePrefetch(now, // spawning task's `PrefetchTask.segmentCacheMap`).
            map, fetchStrategy, head, isHeadPartial, staleAt, // parameter.
            headVaryParams, metadataTree, spawnedEntries);
        }
    }
    // Any entry that's still pending was intentionally not rendered by the
    // server, because it was inside the loading boundary. Mark them as rejected
    // so we know not to fetch them again.
    // TODO: If PPR is enabled on some routes but not others, then it's possible
    // that a different page is able to do a per-segment prefetch of one of the
    // segments we're marking as rejected here. We should mark on the segment
    // somehow that the reason for the rejection is because of a non-PPR prefetch.
    // That way a per-segment prefetch knows to disregard the rejection.
    if (spawnedEntries !== null) {
        const fulfilledEntries = rejectSegmentEntriesIfStillPending(spawnedEntries, now + 10 * 1000);
        return fulfilledEntries;
    }
    return null;
}
function writeSeedDataIntoCache(now, map, fetchStrategy, tree, staleAt, seedData, isResponsePartial, rootVaryParamsIterable, entriesOwnedByCurrentTask) {
    // This function is used to write the result of a runtime server request
    // (CacheNodeSeedData) into the prefetch cache.
    const rsc = seedData[0];
    const isPartial = rsc === null || isResponsePartial;
    // Each segment carries its own vary params iterable in the seed data, which
    // drains to the set of params the segment accessed during render. A null
    // iterable means tracking was not enabled (not a prerender). readVaryParams
    // unions in the response-level root params.
    const varyParams = (0, _varyparamsdecoding.readVaryParams)(seedData[4], rootVaryParamsIterable);
    fulfillEntrySpawnedByRuntimePrefetch(now, // task's `PrefetchTask.segmentCacheMap`).
    map, fetchStrategy, rsc, isPartial, staleAt, varyParams, tree, entriesOwnedByCurrentTask);
    // Recursively write the child data into the cache.
    const slots = tree.slots;
    if (slots !== null) {
        const seedDataChildren = seedData[1];
        for (const [parallelRouteKey, childTree] of slots){
            const childSeedData = seedDataChildren[parallelRouteKey];
            if (childSeedData !== null && childSeedData !== undefined) {
                writeSeedDataIntoCache(now, map, fetchStrategy, childTree, staleAt, childSeedData, isResponsePartial, rootVaryParamsIterable, entriesOwnedByCurrentTask);
            }
        }
    }
}
function fulfillEntrySpawnedByRuntimePrefetch(now, map, fetchStrategy, rsc, isPartial, staleAt, segmentVaryParams, tree, entriesOwnedByCurrentTask) {
    // Decide whether to re-key the entry under a more generic vary path based on
    // which params the segment actually depends on.
    //
    // Skip re-keying for Full prefetches: as of today, `varyParams` tracking only
    // works within the static stage portion of a response. A Full prefetch
    // response covers all stages, and we can't track params during the dynamic
    // stage without dead-locking the Flight stream, so the server-reported set is
    // incomplete and can't be trusted for the full response. Re-keying with an
    // untrustworthy set could replace concrete params with Fallback and let
    // unrelated URLs read each other's content from the cache.
    //
    // For RuntimeShell prefetches, always re-key to the precomputed shell vary
    // path. A shell entry is spawned at a concrete param path but is reusable
    // across all of them; tree.shellVaryPath (root-param values kept, every other
    // param replaced with Fallback) is exactly the path that shell reads look it
    // up under.
    let fulfilledVaryPath = null;
    if (true) {
        if (fetchStrategy === _types.FetchStrategy.RuntimeShell) {
            fulfilledVaryPath = tree.shellVaryPath;
        } else if (fetchStrategy !== _types.FetchStrategy.Full && segmentVaryParams !== null) {
            fulfilledVaryPath = (0, _varypath.getFulfilledSegmentVaryPath)(tree.varyPath, segmentVaryParams);
        }
    }
    // We should only write into cache entries that are owned by us. Or create
    // a new one and write into that. We must never write over an entry that was
    // created by a different task, because that causes data races.
    const ownedEntry = entriesOwnedByCurrentTask !== null ? entriesOwnedByCurrentTask.get(tree.requestKey) : undefined;
    if (ownedEntry !== undefined) {
        const fulfilledEntry = fulfillSegmentCacheEntry(ownedEntry, rsc, staleAt, isPartial, false, fetchStrategy);
        // Re-key the entry at its canonical path. When `varyParams` produced a
        // generalized path above, use that; otherwise fall back to the request's
        // own keying (this is load-bearing for entries spawned as revalidations:
        // without the re-key they'd stay in their Revalidation slot forever,
        // invisible to canonical reads, and the partial entry that prompted the
        // revalidation would keep serving navigations). Full responses are
        // excluded, matching the varyParams re-key: they're spawned as canonical
        // entries at their final path, and their vary tracking can't be trusted
        // for re-keying (see the fulfilledVaryPath derivation above).
        const canonicalVaryPath = fulfilledVaryPath !== null ? fulfilledVaryPath : fetchStrategy !== _types.FetchStrategy.Full ? (0, _varypath.getSegmentVaryPathForRequest)(fetchStrategy, tree) : null;
        if (canonicalVaryPath !== null) {
            const isRevalidation = false;
            (0, _cachemap.setInCacheMap)(map, canonicalVaryPath, fulfilledEntry, isRevalidation);
            // The re-key moved the entry to a more generic path (and, for a spawned
            // revalidation, vacated its Revalidation slot). A stale settled entry
            // at a more specific path — e.g. the partial entry that prompted the
            // revalidation — would shadow every read at the concrete lookup path,
            // causing the scheduler to keep re-reading the stale entry and respawn
            // the revalidation forever. Evict it so the fulfilled entry is
            // reachable. See evictShadowingSegmentEntries.
            evictShadowingSegmentEntries(now, map, tree.varyPath, fulfilledEntry);
        }
    } else {
        // There's no matching entry. Attempt to create a new one.
        let possiblyNewEntry = (0, _cachemap.getFromCacheMap)(now, getCurrentSegmentCacheVersion(), map, tree.varyPath, false, false);
        if (possiblyNewEntry === null) {
            possiblyNewEntry = insertEmptySegmentCacheEntry(now, map, fetchStrategy, tree);
        }
        if (possiblyNewEntry.status === _cachemap.EntryStatus.Empty) {
            // Confirmed this is a new entry. We can fulfill it.
            const newEntry = possiblyNewEntry;
            const fulfilledEntry = fulfillSegmentCacheEntry(upgradeToPendingSegment(newEntry, fetchStrategy), rsc, staleAt, isPartial, false, fetchStrategy);
            if (fulfilledVaryPath !== null) {
                const isRevalidation = false;
                (0, _cachemap.setInCacheMap)(map, fulfilledVaryPath, fulfilledEntry, isRevalidation);
                // Same as the owned-entry re-key above. Usually the entry really is
                // new — the read a moment ago returned nothing at the concrete lookup
                // path, so nothing can shadow it and this is a no-op — but this
                // branch also claims a pre-existing Empty entry, and re-keying that
                // away can expose a stale settled entry at an intermediate path.
                evictShadowingSegmentEntries(now, map, tree.varyPath, fulfilledEntry);
            }
        } else {
            // There was already an entry in the cache. But we may be able to
            // replace it with the new one from the server.
            const newEntry = fulfillSegmentCacheEntry(upgradeToPendingSegment(createDetachedSegmentCacheEntry(now), fetchStrategy), rsc, staleAt, isPartial, false, fetchStrategy);
            const varyPath = fulfilledVaryPath !== null ? fulfilledVaryPath : (0, _varypath.getSegmentVaryPathForRequest)(fetchStrategy, tree);
            // Pass the concrete lookup path so that if the entry was re-keyed to
            // a more generic path, any stale settled entry at a more specific path
            // that would shadow it is evicted (the upsert handles this; the other
            // branches above call evictShadowingSegmentEntries themselves).
            upsertSegmentEntry(now, map, varyPath, newEntry, tree.varyPath);
        }
    }
}
async function fetchPrefetchResponse(url, headers) {
    const fetchPriority = 'low';
    // When issuing a prefetch request, don't immediately decode the response; we
    // use the lower level `createFromResponse` API instead because we need to do
    // some extra processing of the response stream. See
    // `createNonTaskyPrefetchResponseStream` for more details.
    const shouldImmediatelyDecode = false;
    const response = await (0, _fetchserverresponse.createFetch)(url, headers, fetchPriority, shouldImmediatelyDecode);
    if (!response.ok) {
        return null;
    }
    // Check the content type
    if (isOutputExportMode) {
    // In output: "export" mode, we relaxed about the content type, since it's
    // not Next.js that's serving the response. If the status is OK, assume the
    // response is valid. If it's not a valid response, the Flight client won't
    // be able to decode it, and we'll treat it as a miss.
    } else {
        const contentType = response.headers.get('content-type');
        const isFlightResponse = contentType && contentType.startsWith(_approuterheaders.RSC_CONTENT_TYPE_HEADER);
        if (!isFlightResponse) {
            return null;
        }
    }
    return response;
}
async function createNonTaskyPrefetchResponseStream(body, byteLimit) {
    // Buffer the entire response before passing it to the Flight client. This
    // ensures that when Flight processes the stream, all model data is available
    // synchronously. This is important for readVaryParams, which synchronously
    // checks the thenable status — if data arrived in multiple network chunks,
    // the thenables might not yet be fulfilled.
    //
    // TODO: There are too many intermediate stream transformations in the
    // prefetch response pipeline (e.g. stripIsPartialByte, this function).
    // These could all be consolidated into a single transformation. Refactor
    // once the cached navigations experiment lands.
    //
    // Read the response from the network, optionally truncating at byteLimit.
    const reader = body.getReader();
    const chunks = [];
    let size = 0;
    while(true){
        const { done, value } = await reader.read();
        if (done) break;
        if (byteLimit !== undefined && size + value.byteLength >= byteLimit) {
            const remaining = byteLimit - size;
            if (remaining > 0) {
                chunks.push(value.byteLength > remaining ? value.subarray(0, remaining) : value);
                size += remaining;
            }
            reader.cancel();
            break;
        }
        chunks.push(value);
        size += value.byteLength;
    }
    // Concatenate into a single chunk so that Flight's processBinaryChunk
    // processes all rows synchronously in one call. Multiple chunks would not
    // be sufficient: even though reader.read() resolves as a microtask for
    // already-enqueued data, the `await` continuation from
    // createFromReadableStream can interleave between chunks. If the root
    // model row isn't the first row (e.g. outlined values come first), the
    // PromiseResolveThenableJob from `await` can cause the root to initialize
    // eagerly, scheduling the continuation before remaining chunks (including
    // promise value rows) are processed. A single chunk avoids this.
    let buffer;
    if (chunks.length === 1) {
        buffer = chunks[0];
    } else if (chunks.length > 1) {
        buffer = new Uint8Array(size);
        let offset = 0;
        for (const chunk of chunks){
            buffer.set(chunk, offset);
            offset += chunk.byteLength;
        }
    } else {
        buffer = new Uint8Array(0);
    }
    const stream = new ReadableStream({
        start (controller) {
            controller.enqueue(buffer);
            controller.close();
        }
    });
    return {
        stream,
        size,
        buffer
    };
}
/**
 * Creates a streaming (non-buffered) prefetch response stream for dynamic/Full
 * prefetches. These are essentially dynamic responses that get stored in the
 * prefetch cache — they don't carry vary params or other cache metadata that
 * requires synchronous thenable resolution, so there's no need to buffer them.
 * They should continue to stream so consumers can process data as it arrives.
 */ function createIncrementalPrefetchResponseStream(originalFlightStream, onStreamClose, onResponseSizeUpdate) {
    // While processing the original stream, we incrementally update the size
    // of the cache entry in the LRU.
    let totalByteLength = 0;
    const reader = originalFlightStream.getReader();
    return new ReadableStream({
        async pull (controller) {
            while(true){
                const { done, value } = await reader.read();
                if (!done) {
                    // Pass to the target stream and keep consuming the Flight response
                    // from the server.
                    controller.enqueue(value);
                    // Incrementally update the size of the cache entry in the LRU.
                    totalByteLength += value.byteLength;
                    onResponseSizeUpdate(totalByteLength);
                    continue;
                }
                controller.close();
                onStreamClose();
                return;
            }
        }
    });
}
function addSegmentPathToUrlInOutputExportMode(url, segmentPath) {
    if (isOutputExportMode) {
        // In output: "export" mode, we cannot use a header to encode the segment
        // path. Instead, we append it to the end of the pathname.
        const staticUrl = new URL(url);
        const routeDir = staticUrl.pathname.endsWith('/') ? staticUrl.pathname.slice(0, -1) : staticUrl.pathname;
        const staticExportFilename = (0, _segmentvalueencoding.convertSegmentPathToStaticExportFilename)(segmentPath);
        staticUrl.pathname = `${routeDir}/${staticExportFilename}`;
        return staticUrl;
    }
    return url;
}
function canNewFetchStrategyProvideMoreContent(currentStrategy, newStrategy) {
    return currentStrategy < newStrategy;
}
function getStaleAtFromHeader(now, response) {
    const staleTimeSeconds = parseInt(response.headers.get(_approuterheaders.NEXT_ROUTER_STALE_TIME_HEADER) ?? '', 10);
    const staleTimeMs = !isNaN(staleTimeSeconds) ? getStaleTimeMs(staleTimeSeconds) : _navigatereducer.STATIC_STALETIME_MS;
    return now + staleTimeMs;
}
async function resolveStaleAt(now, staleTimeIterable, response) {
    if (staleTimeIterable !== undefined) {
        // Iterate the async iterable and take the last yielded value. The server
        // yields updated staleTime values during the render; the last one is the
        // final staleTime.
        let staleTimeSeconds;
        for await (const value of staleTimeIterable){
            staleTimeSeconds = value;
        }
        if (staleTimeSeconds !== undefined) {
            const staleTimeMs = isNaN(staleTimeSeconds) ? _navigatereducer.STATIC_STALETIME_MS : getStaleTimeMs(staleTimeSeconds);
            return now + staleTimeMs;
        }
    }
    if (response !== undefined) {
        return getStaleAtFromHeader(now, response);
    }
    return now + _navigatereducer.STATIC_STALETIME_MS;
}
function writePrerenderResponseIntoCache(now, fetchStrategy, flightData, buildId, headVaryParamsIterable, rootVaryParamsIterable, staleAt, baseTree, renderedSearch, isResponsePartial, // writeDynamicRenderResponseIntoCache.
map) {
    // Root params are emitted once at the top level; readVaryParams unions them
    // into the head, and they're threaded down to each segment below.
    const headVaryParams = (0, _varyparamsdecoding.readVaryParams)(headVaryParamsIterable, rootVaryParamsIterable);
    const flightDatas = (0, _flightdatahelpers.normalizeFlightData)(flightData);
    if (typeof flightDatas === 'string') {
        return;
    }
    const navigationSeed = (0, _navigation.convertServerPatchToFullTree)(now, baseTree, flightDatas, renderedSearch, _bfcache.UnknownDynamicStaleTime);
    writeDynamicRenderResponseIntoCache(now, fetchStrategy, flightDatas, buildId, isResponsePartial, headVaryParams, rootVaryParamsIterable, staleAt, navigationSeed, null, map);
}
async function processRuntimePrefetchStream(now, runtimePrefetchStream, baseTree, renderedSearch) {
    const { stream, isPartial } = await stripIsPartialByte(runtimePrefetchStream);
    const serverData = await (0, _fetchserverresponse.createFromNextReadableStream)(stream, undefined, {
        allowPartialStream: true
    });
    // Root params are emitted once at the top level; readVaryParams unions them
    // into the head, and we return the iterable so the caller can union it into
    // each segment too.
    const rootVaryParamsIterable = serverData.r ?? null;
    const headVaryParams = (0, _varyparamsdecoding.readVaryParams)(serverData.h, rootVaryParamsIterable);
    const staleAt = await resolveStaleAt(now, serverData.s);
    const flightDatas = (0, _flightdatahelpers.normalizeFlightData)(serverData.f);
    if (typeof flightDatas === 'string') {
        return null;
    }
    const navigationSeed = (0, _navigation.convertServerPatchToFullTree)(now, baseTree, flightDatas, renderedSearch, _bfcache.UnknownDynamicStaleTime);
    return {
        flightDatas,
        navigationSeed,
        buildId: serverData.b,
        isResponsePartial: isPartial,
        headVaryParams,
        rootVaryParamsIterable,
        staleAt
    };
}
async function stripIsPartialByte(stream) {
    // When there is no recognized marker byte, the fallback depends on whether
    // Cached Navigations is enabled. When enabled, dynamic navigation responses
    // don't have a marker but may contain dynamic holes, so they are treated as
    // partial. When disabled, unmarked responses are treated as non-partial.
    const defaultIsPartial = !!false;
    const reader = stream.getReader();
    const { done, value } = await reader.read();
    if (done || !value || value.byteLength === 0) {
        return {
            stream: new ReadableStream({
                start: (c)=>c.close()
            }),
            isPartial: defaultIsPartial
        };
    }
    const firstByte = value[0];
    const hasMarker = firstByte === 0x23 || firstByte === 0x7e;
    const isPartial = hasMarker ? firstByte === 0x7e : defaultIsPartial;
    const remainder = hasMarker ? value.byteLength > 1 ? value.subarray(1) : null : value;
    return {
        isPartial,
        stream: new ReadableStream({
            start (controller) {
                if (remainder) {
                    controller.enqueue(remainder);
                }
            },
            async pull (controller) {
                const result = await reader.read();
                if (result.done) {
                    controller.close();
                } else {
                    controller.enqueue(result.value);
                }
            }
        })
    };
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=cache.js.map


/***/ }),

/***/ 12669:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(59248);
} else {}


/***/ }),

/***/ 12699:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(35703);


/***/ }),

/***/ 15368:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DYNAMIC_STALETIME_MS: function() {
        return DYNAMIC_STALETIME_MS;
    },
    STATIC_STALETIME_MS: function() {
        return STATIC_STALETIME_MS;
    },
    navigateReducer: function() {
        return navigateReducer;
    }
});
const _navigation = __webpack_require__(20354);
const _cache = __webpack_require__(12506);
const _pprnavigations = __webpack_require__(22120);
const DYNAMIC_STALETIME_MS = Number("0") * 1000;
const STATIC_STALETIME_MS = (0, _cache.getStaleTimeMs)(Number("300"));
function navigateReducer(state, action) {
    const { url, isExternalUrl, navigateType, scrollBehavior } = action;
    if (isExternalUrl) {
        return (0, _navigation.completeHardNavigation)(state, url, navigateType);
    }
    // Handles case where `<meta http-equiv="refresh">` tag is present,
    // which will trigger an MPA navigation.
    if (document.getElementById('__next-page-redirect')) {
        return (0, _navigation.completeHardNavigation)(state, url, navigateType);
    }
    // Temporary glue code between the router reducer and the new navigation
    // implementation. Eventually we'll rewrite the router reducer to a
    // state machine.
    const currentUrl = new URL(state.canonicalUrl, location.origin);
    const currentRenderedSearch = state.renderedSearch;
    return (0, _navigation.navigate)(state, url, currentUrl, currentRenderedSearch, state.cache, state.tree, state.nextUrl, _pprnavigations.FreshnessPolicy.Default, scrollBehavior, navigateType);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigate-reducer.js.map


/***/ }),

/***/ 15563:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ACTION_HEADER: function() {
        return ACTION_HEADER;
    },
    FLIGHT_HEADERS: function() {
        return FLIGHT_HEADERS;
    },
    NEXT_ACTION_NOT_FOUND_HEADER: function() {
        return NEXT_ACTION_NOT_FOUND_HEADER;
    },
    NEXT_ACTION_REVALIDATED_HEADER: function() {
        return NEXT_ACTION_REVALIDATED_HEADER;
    },
    NEXT_DID_POSTPONE_HEADER: function() {
        return NEXT_DID_POSTPONE_HEADER;
    },
    NEXT_HMR_REFRESH_HEADER: function() {
        return NEXT_HMR_REFRESH_HEADER;
    },
    NEXT_HTML_REQUEST_ID_HEADER: function() {
        return NEXT_HTML_REQUEST_ID_HEADER;
    },
    NEXT_INSTANT_TEST_COOKIE: function() {
        return NEXT_INSTANT_TEST_COOKIE;
    },
    NEXT_IS_PRERENDER_HEADER: function() {
        return NEXT_IS_PRERENDER_HEADER;
    },
    NEXT_REQUEST_ID_HEADER: function() {
        return NEXT_REQUEST_ID_HEADER;
    },
    NEXT_REWRITTEN_PATH_HEADER: function() {
        return NEXT_REWRITTEN_PATH_HEADER;
    },
    NEXT_REWRITTEN_QUERY_HEADER: function() {
        return NEXT_REWRITTEN_QUERY_HEADER;
    },
    NEXT_ROUTER_PREFETCH_HEADER: function() {
        return NEXT_ROUTER_PREFETCH_HEADER;
    },
    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
        return NEXT_ROUTER_SEGMENT_PREFETCH_HEADER;
    },
    NEXT_ROUTER_STALE_TIME_HEADER: function() {
        return NEXT_ROUTER_STALE_TIME_HEADER;
    },
    NEXT_ROUTER_STATE_TREE_HEADER: function() {
        return NEXT_ROUTER_STATE_TREE_HEADER;
    },
    NEXT_RSC_UNION_QUERY: function() {
        return NEXT_RSC_UNION_QUERY;
    },
    NEXT_URL: function() {
        return NEXT_URL;
    },
    RSC_CONTENT_TYPE_HEADER: function() {
        return RSC_CONTENT_TYPE_HEADER;
    },
    RSC_HEADER: function() {
        return RSC_HEADER;
    }
});
const RSC_HEADER = 'rsc';
const ACTION_HEADER = 'next-action';
const NEXT_ROUTER_STATE_TREE_HEADER = 'next-router-state-tree';
const NEXT_ROUTER_PREFETCH_HEADER = 'next-router-prefetch';
const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = 'next-router-segment-prefetch';
const NEXT_HMR_REFRESH_HEADER = 'next-hmr-refresh';
const NEXT_URL = 'next-url';
const RSC_CONTENT_TYPE_HEADER = 'text/x-component';
const NEXT_INSTANT_TEST_COOKIE = 'next-instant-navigation-testing';
const FLIGHT_HEADERS = [
    RSC_HEADER,
    NEXT_ROUTER_STATE_TREE_HEADER,
    NEXT_ROUTER_PREFETCH_HEADER,
    NEXT_HMR_REFRESH_HEADER,
    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
];
const NEXT_RSC_UNION_QUERY = '_rsc';
const NEXT_ROUTER_STALE_TIME_HEADER = 'x-nextjs-stale-time';
const NEXT_DID_POSTPONE_HEADER = 'x-nextjs-postponed';
const NEXT_REWRITTEN_PATH_HEADER = 'x-nextjs-rewritten-path';
const NEXT_REWRITTEN_QUERY_HEADER = 'x-nextjs-rewritten-query';
const NEXT_IS_PRERENDER_HEADER = 'x-nextjs-prerender';
const NEXT_ACTION_NOT_FOUND_HEADER = 'x-nextjs-action-not-found';
const NEXT_REQUEST_ID_HEADER = 'x-nextjs-request-id';
const NEXT_HTML_REQUEST_ID_HEADER = 'x-nextjs-html-request-id';
const NEXT_ACTION_REVALIDATED_HEADER = 'x-action-revalidated';
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-headers.js.map


/***/ }),

/***/ 16601:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "notFound", ({
    enumerable: true,
    get: function() {
        return notFound;
    }
}));
const _httpaccessfallback = __webpack_require__(87016);
/**
 * This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
 * within a route segment as well as inject a tag.
 *
 * `notFound()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
 * - In a Route Handler or Server Action, it will serve a 404 to the caller.
 *
 * Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
function notFound() {
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E1041",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map


/***/ }),

/***/ 20354:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    completeHardNavigation: function() {
        return completeHardNavigation;
    },
    completeSoftNavigation: function() {
        return completeSoftNavigation;
    },
    completeTraverseNavigation: function() {
        return completeTraverseNavigation;
    },
    convertServerPatchToFullTree: function() {
        return convertServerPatchToFullTree;
    },
    navigate: function() {
        return navigate;
    },
    navigateToKnownRoute: function() {
        return navigateToKnownRoute;
    }
});
const _approutertypes = __webpack_require__(76731);
const _fetchserverresponse = __webpack_require__(28796);
const _pprnavigations = __webpack_require__(22120);
const _createhreffromurl = __webpack_require__(29453);
const _constants = __webpack_require__(7103);
const _cache = __webpack_require__(12506);
const _optimisticroutes = __webpack_require__(68378);
const _cachekey = __webpack_require__(26452);
const _scheduler = __webpack_require__(57705);
const _types = __webpack_require__(77565);
const _links = __webpack_require__(24972);
const _routerreducertypes = __webpack_require__(74616);
const _computechangedpath = __webpack_require__(62496);
const _javascripturl = __webpack_require__(145);
const _bfcache = __webpack_require__(80882);
const _instantmessages = __webpack_require__(77324);
const _matchsegments = __webpack_require__(57653);
const _segment = __webpack_require__(78237);
function navigate(state, url, currentUrl, currentRenderedSearch, currentCacheNode, currentFlightRouterState, nextUrl, freshnessPolicy, scrollBehavior, navigateType) {
    let navigationLock = null;
    // Instant Navigation Testing API: when the lock is active, ensure a
    // prefetch task has been initiated before proceeding with the navigation.
    // This guarantees that segment data requests are at least pending, even
    // for routes that already have a cached route tree. Without this, the
    // shell might be incomplete because some segments were never
    // requested.
    if (false) {}
    return navigateImpl(state, url, currentUrl, currentRenderedSearch, currentCacheNode, currentFlightRouterState, nextUrl, freshnessPolicy, scrollBehavior, navigateType, navigationLock, _cache.segmentCacheMap);
}
function navigateImpl(state, url, currentUrl, currentRenderedSearch, currentCacheNode, currentFlightRouterState, nextUrl, freshnessPolicy, scrollBehavior, navigateType, navigationLock, // driving-task map, or the shared map. See `segmentCacheMap` in cache.ts.
map) {
    const now = Date.now();
    const href = url.href;
    const cacheKey = (0, _cachekey.createCacheKey)(href, nextUrl);
    const route = (0, _cache.readRouteCacheEntry)(now, cacheKey);
    if (route !== null && route.status === _cache.EntryStatus.Fulfilled) {
        // We have a matching prefetch.
        return navigateUsingPrefetchedRouteTree(now, state, url, currentUrl, currentRenderedSearch, nextUrl, currentCacheNode, currentFlightRouterState, freshnessPolicy, scrollBehavior, navigateType, route, navigationLock, map);
    }
    // There was no matching route tree in the cache. Let's see if we can
    // construct an "optimistic" route tree using the deprecated search-params
    // based matching. This is only used when the new optimisticRouting flag is
    // disabled.
    //
    // Do not construct an optimistic route tree if there was a cache hit, but
    // the entry has a rejected status, since it may have been rejected due to a
    // rewrite or redirect based on the search params.
    //
    // TODO: There are multiple reasons a prefetch might be rejected; we should
    // track them explicitly and choose what to do here based on that.
    if (false) {}
    // There's no matching prefetch for this route in the cache. We must lazily
    // fetch it from the server before we can perform the navigation.
    //
    // TODO: If this is a gesture navigation, instead of performing a
    // dynamic request, we should do a runtime prefetch.
    return navigateToUnknownRoute(now, state, url, currentUrl, currentRenderedSearch, nextUrl, currentCacheNode, currentFlightRouterState, freshnessPolicy, scrollBehavior, navigateType, navigationLock, map).catch(()=>{
        // If the navigation fails, return the current state
        return state;
    });
}
function navigateToKnownRoute(now, state, url, canonicalUrl, navigationSeed, currentUrl, currentRenderedSearch, currentCacheNode, currentFlightRouterState, freshnessPolicy, nextUrl, scrollBehavior, navigateType, navigationLock, // driving-task map, or the shared map. See `segmentCacheMap` in cache.ts.
map, debugInfo, // prediction. Passed through so it can be marked as having a dynamic rewrite
// if the server returns a different pathname (indicating dynamic rewrite
// behavior).
//
// When null, the navigation did not use route prediction - either because
// the route was already fully cached, or it's a navigation that doesn't
// involve prediction (refresh, history traversal, server action, etc.).
// In these cases, if a mismatch occurs, we still mark the route as having a
// dynamic rewrite by traversing the known route tree (see
// dispatchRetryDueToTreeMismatch).
routeCacheEntry, signal) {
    // A version of navigate() that accepts the target route tree as an argument
    // rather than reading it from the prefetch cache.
    if (false) {}
    // Instant Navigation Testing API: when the lock is held, restrict segment
    // reads to shell entries if the target route would only have prefetched
    // its shell.
    let restrictToShell = false;
    if (false) {}
    const accumulation = {
        separateRefreshUrls: null,
        scrollRef: null
    };
    // We special case navigations to the exact same URL as the current location.
    // It's a common UI pattern for apps to refresh when you click a link to the
    // current page. So when this happens, we refresh the dynamic data in the page
    // segments.
    //
    // Note that this does not apply if the any part of the hash or search query
    // has changed. This might feel a bit weird but it makes more sense when you
    // consider that the way to trigger this behavior is to click the same link
    // multiple times.
    //
    // TODO: We should probably refresh the *entire* route when this case occurs,
    // not just the page segments. Essentially treating it the same as a refresh()
    // triggered by an action, which is the more explicit way of modeling the UI
    // pattern described above.
    //
    // Also note that this only refreshes the dynamic data, not static/ cached
    // data. If the page segment is fully static and prefetched, the request is
    // skipped. (This is also how refresh() works.)
    const isSamePageNavigation = url.href === currentUrl.href;
    const task = (0, _pprnavigations.startPPRNavigation)(now, currentUrl, currentRenderedSearch, currentCacheNode, currentFlightRouterState, navigationSeed.routeTree, navigationSeed.metadataVaryPath, freshnessPolicy, navigationSeed.data, navigationSeed.head, navigationSeed.dynamicStaleAt, isSamePageNavigation, accumulation, map, restrictToShell);
    if (task !== null) {
        if (freshnessPolicy !== _pprnavigations.FreshnessPolicy.Gesture) {
            (0, _pprnavigations.spawnDynamicRequests)(task, url, nextUrl, freshnessPolicy, accumulation, routeCacheEntry, navigateType, navigationLock, map, signal);
        }
        return completeSoftNavigation(state, url, nextUrl, task.route, task.node, navigationSeed.renderedSearch, canonicalUrl, navigateType, scrollBehavior, accumulation.scrollRef, debugInfo);
    }
    // Could not perform a SPA navigation. Revert to a full-page (MPA) navigation.
    return completeHardNavigation(state, url, navigateType);
}
function navigateUsingPrefetchedRouteTree(now, state, url, currentUrl, currentRenderedSearch, nextUrl, currentCacheNode, currentFlightRouterState, freshnessPolicy, scrollBehavior, navigateType, route, navigationLock, map) {
    const routeTree = route.tree;
    const canonicalUrl = route.canonicalUrl + url.hash;
    const renderedSearch = route.renderedSearch;
    const prefetchSeed = {
        renderedSearch,
        routeTree,
        metadataVaryPath: route.metadata.varyPath,
        data: null,
        head: null,
        dynamicStaleAt: (0, _bfcache.computeDynamicStaleAt)(now, _bfcache.UnknownDynamicStaleTime),
        // Not derived from a server response; no base to diverge from.
        treeDivergedFromBase: false
    };
    return navigateToKnownRoute(now, state, url, canonicalUrl, prefetchSeed, currentUrl, currentRenderedSearch, currentCacheNode, currentFlightRouterState, freshnessPolicy, nextUrl, scrollBehavior, navigateType, navigationLock, map, null, route, undefined);
}
// Used to request all the dynamic data for a route, rather than just a subset,
// e.g. during a refresh or a revalidation. Typically this gets constructed
// during the normal flow when diffing the route tree, but for an unprefetched
// navigation, where we don't know the structure of the target route, we use
// this instead.
const DynamicRequestTreeForEntireRoute = [
    '',
    {},
    null,
    'refetch'
];
async function navigateToUnknownRoute(now, state, url, currentUrl, currentRenderedSearch, nextUrl, currentCacheNode, currentFlightRouterState, freshnessPolicy, scrollBehavior, navigateType, navigationLock, map) {
    // Runs when a navigation happens but there's no cached prefetch we can use.
    // Don't bother to wait for a prefetch response; go straight to a full
    // navigation that contains both static and dynamic data in a single stream.
    // (This is unlike the old navigation implementation, which instead blocks
    // the dynamic request until a prefetch request is received.)
    //
    // To avoid duplication of logic, we're going to pretend that the tree
    // returned by the dynamic request is, in fact, a prefetch tree. Then we can
    // use the same server response to write the actual data into the CacheNode
    // tree. So it's the same flow as the "happy path" (prefetch, then
    // navigation), except we use a single server response for both stages.
    let dynamicRequestTree;
    switch(freshnessPolicy){
        case _pprnavigations.FreshnessPolicy.Default:
        case _pprnavigations.FreshnessPolicy.HistoryTraversal:
        case _pprnavigations.FreshnessPolicy.Gesture:
            dynamicRequestTree = currentFlightRouterState;
            break;
        case _pprnavigations.FreshnessPolicy.Hydration:
        case _pprnavigations.FreshnessPolicy.RefreshAll:
        case _pprnavigations.FreshnessPolicy.HMRRefresh:
            dynamicRequestTree = DynamicRequestTreeForEntireRoute;
            break;
        default:
            freshnessPolicy;
            dynamicRequestTree = currentFlightRouterState;
            break;
    }
    const promiseForDynamicServerResponse = (0, _fetchserverresponse.fetchServerResponse)(url, {
        flightRouterState: dynamicRequestTree,
        nextUrl
    });
    const result = await promiseForDynamicServerResponse;
    if (typeof result === 'string') {
        // This is an MPA navigation.
        const redirectUrl = new URL(result, location.origin);
        return completeHardNavigation(state, redirectUrl, navigateType);
    }
    const { flightData, canonicalUrl, renderedSearch, couldBeIntercepted, supportsPerSegmentPrefetching, dynamicStaleTime, staticStageData, runtimePrefetchStream, responseHeaders, debugInfo } = result;
    // Since the response format of dynamic requests and prefetches is slightly
    // different, we'll need to massage the data a bit. Create FlightRouterState
    // tree that simulates what we'd receive as the result of a prefetch.
    const navigationSeed = convertServerPatchToFullTree(now, currentFlightRouterState, flightData, renderedSearch, dynamicStaleTime);
    // Learn the route pattern so we can predict it for future navigations.
    // hasDynamicRewrite is false because this is a fresh navigation to an
    // unknown route - any rewrite detection happens during the traversal inside
    // discoverKnownRoute. The hasDynamicRewrite param is only set to true when
    // retrying after a tree mismatch (see dispatchRetryDueToTreeMismatch).
    const metadataVaryPath = navigationSeed.metadataVaryPath;
    if (metadataVaryPath !== null) {
        (0, _optimisticroutes.discoverKnownRoute)(now, url.pathname, url.search, nextUrl, null, navigationSeed.routeTree, metadataVaryPath, couldBeIntercepted, // a later same-route hash nav appends `url.hash` to it.
        (0, _createhreffromurl.createHrefFromUrl)(canonicalUrl, false), supportsPerSegmentPrefetching, false // hasDynamicRewrite - not a retry, rewrite detection happens during traversal
        );
        if (staticStageData !== null) {
            const { response: staticStageResponse, isResponsePartial } = staticStageData;
            // Write the static stage of the response into the segment cache so that
            // subsequent navigations can serve cached static segments instantly.
            (0, _cache.resolveStaleAt)(now, staticStageResponse.s).then((staleAt)=>{
                const buildId = responseHeaders.get(_constants.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? staticStageResponse.b;
                // TODO: Implement Shell extraction as part of Cached Navigations.
                // Intentionally holding off on doing this until we decide how the
                // Cached Navigations behavior should work in combination with App
                // Shells.
                (0, _cache.writePrerenderResponseIntoCache)(now, _types.FetchStrategy.PPR, staticStageResponse.f, buildId, staticStageResponse.h, staticStageResponse.r ?? null, staleAt, currentFlightRouterState, renderedSearch, isResponsePartial, map);
            }).catch(()=>{
            // The static stage processing failed. Not fatal — the navigation
            // completed normally, we just won't write into the cache.
            });
        }
        if (runtimePrefetchStream !== null) {
            (0, _cache.processRuntimePrefetchStream)(now, runtimePrefetchStream, currentFlightRouterState, renderedSearch).then((processed)=>{
                if (processed !== null) {
                    (0, _cache.writeDynamicRenderResponseIntoCache)(now, _types.FetchStrategy.PPRRuntime, processed.flightDatas, processed.buildId, processed.isResponsePartial, processed.headVaryParams, processed.rootVaryParamsIterable, processed.staleAt, processed.navigationSeed, null, map);
                }
            }).catch(()=>{
            // The runtime prefetch cache write failed. Not fatal — the
            // navigation completed normally, we just won't cache runtime data.
            });
        }
    }
    // In the streaming dev render, this single response's seed content may still
    // be streaming when we build the tree below. An unknown-route navigation
    // places that content inline (it has no prior cache entry, so the server
    // sends a full seed rather than the dynamic-only delta a known route gets),
    // and that inline content is not gated like a known route's deferred RSCs. So
    // React could read a still-pending chunk and flash a Suspense fallback
    // (wanted on a cold cache, but not on a warm one). Wait for the shell to
    // flush (`revealAfter`) first, so the inline seed content is decoded by the
    // time React reads it, the same way the known-route path gates its deferred
    // RSCs. `revealAfter` is null outside the streaming dev render. On a cache
    // miss it resolves early, so the cold-cache fallback is still shown.
    if (result.revealAfter !== null) {
        await result.revealAfter;
    }
    return navigateToKnownRoute(now, state, url, (0, _createhreffromurl.createHrefFromUrl)(canonicalUrl), navigationSeed, currentUrl, currentRenderedSearch, currentCacheNode, currentFlightRouterState, freshnessPolicy, nextUrl, scrollBehavior, navigateType, navigationLock, map, debugInfo, // came directly from the server. If a mismatch occurs during dynamic data
    // fetch, the retry handler will traverse the known route tree to mark the
    // entry as having a dynamic rewrite.
    null, undefined);
}
function completeHardNavigation(state, url, navigateType) {
    if ((0, _javascripturl.isJavaScriptURLString)(url.href)) {
        console.error('Next.js has blocked a javascript: URL as a security precaution.');
        return state;
    }
    const newState = {
        canonicalUrl: url.origin === location.origin ? (0, _createhreffromurl.createHrefFromUrl)(url) : url.href,
        pushRef: {
            pendingPush: navigateType === 'push',
            mpaNavigation: true,
            preserveCustomHistoryState: false
        },
        // TODO: None of the rest of these values are consistent with the incoming
        // navigation. We rely on the fact that AppRouter will suspend and trigger
        // a hard navigation before it accesses any of these values. But instead
        // we should trigger the hard navigation and blocking any subsequent
        // router updates without updating React.
        renderedSearch: state.renderedSearch,
        focusAndScrollRef: state.focusAndScrollRef,
        cache: state.cache,
        tree: state.tree,
        nextUrl: state.nextUrl,
        previousNextUrl: state.previousNextUrl,
        debugInfo: null
    };
    return newState;
}
function completeSoftNavigation(oldState, url, referringNextUrl, tree, cache, renderedSearch, canonicalUrl, navigateType, scrollBehavior, scrollRef, collectedDebugInfo) {
    // The "Next-Url" is a special representation of the URL that Next.js
    // uses to implement interception routes.
    // TODO: Get rid of this extra traversal by computing this during the
    // same traversal that computes the tree itself. We should also figure out
    // what is the minimum information needed for the server to correctly
    // intercept the route.
    const changedPath = (0, _computechangedpath.computeChangedPath)(oldState.tree, tree);
    const nextUrlForNewRoute = changedPath ? changedPath : oldState.nextUrl;
    // This value is stored on the state as `previousNextUrl`; the naming is
    // confusing. What it represents is the "Next-Url" header that was used to
    // fetch the incoming route. It's essentially the refererer URL, but in a
    // Next.js specific format. During refreshes, this is sent back to the server
    // instead of the current route's "Next-Url" so that the same interception
    // logic is applied as during the original navigation.
    const previousNextUrl = referringNextUrl;
    // Check if the only thing that changed was the hash fragment.
    const oldUrl = new URL(oldState.canonicalUrl, url);
    const onlyHashChange = // navigations are always same-origin.
    url.pathname === oldUrl.pathname && url.search === oldUrl.search && url.hash !== oldUrl.hash;
    // Determine whether and how the page should scroll after this
    // navigation.
    //
    // By default, we scroll to the segments that were navigated to — i.e.
    // segments in the new part of the route, as opposed to shared segments
    // that were already part of the previous route. All newly navigated
    // segments share a single ScrollRef. When they mount, the first one
    // to mount initiates the scroll. They share a ref so that only one
    // scroll happens per navigation.
    //
    // If a subsequent navigation produces new segments, those supersede
    // any pending scroll from the previous navigation by invalidating its
    // ScrollRef. If a navigation doesn't produce any new segments (e.g.
    // a refresh where the route structure didn't change), any pending
    // scrolls from previous navigations are unaffected.
    //
    // The branches below handle special cases layered on top of this
    // default model.
    let activeScrollRef;
    let forceScroll;
    if (scrollBehavior === _routerreducertypes.ScrollBehavior.NoScroll) {
        // The user explicitly opted out of scrolling (e.g. scroll={false}
        // on a Link or router.push).
        //
        // If this navigation created new scroll targets (scrollRef !== null),
        // neutralize them. If it didn't, any prior scroll targets carried
        // forward on the cache nodes via reuseSharedCacheNode remain active.
        if (scrollRef !== null) {
            scrollRef.current = false;
        }
        activeScrollRef = oldState.focusAndScrollRef.scrollRef;
        forceScroll = false;
    } else if (onlyHashChange) {
        // Hash-only navigations should scroll regardless of per-node state.
        // Create a fresh ref so the first segment to scroll consumes it.
        //
        // Invalidate any scroll ref from a prior navigation that hasn't
        // been consumed yet.
        const oldScrollRef = oldState.focusAndScrollRef.scrollRef;
        if (oldScrollRef !== null) {
            oldScrollRef.current = false;
        }
        // Also invalidate any per-node refs that were accumulated during
        // this navigation's tree construction — the hash-only ref
        // supersedes them.
        if (scrollRef !== null) {
            scrollRef.current = false;
        }
        activeScrollRef = {
            current: true
        };
        forceScroll = true;
    } else {
        // Default case. Use the accumulated scrollRef (may be null if no
        // new segments were created). The handler checks per-node refs, so
        // unchanged parallel route slots won't scroll.
        activeScrollRef = scrollRef;
        // If this navigation created new scroll targets, invalidate any
        // pending scroll from a previous navigation.
        if (scrollRef !== null) {
            const oldScrollRef = oldState.focusAndScrollRef.scrollRef;
            if (oldScrollRef !== null) {
                oldScrollRef.current = false;
            }
        }
        forceScroll = false;
    }
    const newState = {
        canonicalUrl,
        renderedSearch,
        pushRef: {
            pendingPush: navigateType === 'push',
            mpaNavigation: false,
            preserveCustomHistoryState: false
        },
        focusAndScrollRef: {
            scrollRef: activeScrollRef,
            forceScroll,
            onlyHashChange,
            hashFragment: //
            // Empty hash should trigger default behavior of scrolling layout into
            // view. #top is handled in layout-router.
            //
            // Refer to `ScrollAndFocusHandler` for details on how this is used.
            scrollBehavior !== _routerreducertypes.ScrollBehavior.NoScroll && url.hash !== '' ? decodeURIComponent(url.hash.slice(1)) : oldState.focusAndScrollRef.hashFragment
        },
        cache,
        tree,
        nextUrl: nextUrlForNewRoute,
        previousNextUrl,
        debugInfo: collectedDebugInfo
    };
    return newState;
}
function completeTraverseNavigation(state, url, renderedSearch, cache, tree, nextUrl) {
    return {
        // Set canonical url
        canonicalUrl: (0, _createhreffromurl.createHrefFromUrl)(url),
        renderedSearch,
        pushRef: {
            pendingPush: false,
            mpaNavigation: false,
            // Ensures that the custom history state that was set is preserved when applying this update.
            preserveCustomHistoryState: true
        },
        focusAndScrollRef: state.focusAndScrollRef,
        cache,
        // Restore provided tree
        tree,
        nextUrl,
        // TODO: We need to restore previousNextUrl, too, which represents the
        // Next-Url that was used to fetch the data. Anywhere we fetch using the
        // canonical URL, there should be a corresponding Next-Url.
        previousNextUrl: null,
        debugInfo: null
    };
}
function convertServerPatchToFullTree(now, currentTree, flightData, renderedSearch, dynamicStaleTimeSeconds) {
    // During a client navigation or prefetch, the server sends back only a patch
    // for the parts of the tree that have changed.
    //
    // This applies the patch to the base tree to create a full representation of
    // the resulting tree.
    //
    // The return type includes a full FlightRouterState tree and a full
    // CacheNodeSeedData tree. (Conceptually these are the same tree, and should
    // eventually be unified, but there's still lots of existing code that
    // operates on FlightRouterState trees alone without the CacheNodeSeedData.)
    //
    // TODO: This similar to what apply-router-state-patch-to-tree does. It
    // will eventually fully replace it. We should get rid of all the remaining
    // places where we iterate over the server patch format. This should also
    // eventually replace normalizeFlightData.
    let baseTree = currentTree;
    let baseData = null;
    let head = null;
    // Whether any patch rendered a segment whose identity differs from the base
    // (request) tree at the same position. See NavigationSeed.treeDivergedFromBase.
    // Compared against the original `currentTree`, not the progressively-merged
    // `baseTree`, so each patch is checked against what was actually requested.
    let treeDivergedFromBase = false;
    if (flightData !== null) {
        for (const { segmentPath, tree: treePatch, seedData: dataPatch, head: headPatch } of flightData){
            if (!treeDivergedFromBase) {
                treeDivergedFromBase = didServerPatchDivergeFromBase(currentTree, segmentPath, treePatch);
            }
            const result = convertServerPatchToFullTreeImpl(baseTree, baseData, treePatch, dataPatch, segmentPath, renderedSearch, 0);
            baseTree = result.tree;
            baseData = result.data;
            // This is the same for all patches per response, so just pick an
            // arbitrary one
            head = headPatch;
        }
    }
    const finalFlightRouterState = baseTree;
    // Convert the final FlightRouterState into a RouteTree type.
    //
    // TODO: Eventually, FlightRouterState will evolve to being a transport format
    // only. The RouteTree type will become the main type used for dealing with
    // routes on the client, and we'll store it in the state directly.
    const acc = {
        metadataVaryPath: null,
        treeDivergedFromBase: false
    };
    const routeTree = (0, _cache.convertRootFlightRouterStateToRouteTree)(finalFlightRouterState, renderedSearch, acc);
    return {
        routeTree,
        metadataVaryPath: acc.metadataVaryPath,
        data: baseData,
        renderedSearch,
        head,
        dynamicStaleAt: (0, _bfcache.computeDynamicStaleAt)(now, dynamicStaleTimeSeconds),
        treeDivergedFromBase
    };
}
// Whether a server patch's rendered tree diverges in segment identity from the
// base (request) tree it was applied to. Mirrors the comparison performed while
// decoding a server response in newer versions of the client (see
// NavigationSeed.treeDivergedFromBase). Divergence means the server rendered a
// different route than the one we requested — e.g. a URL rewrite that behaves
// dynamically — so a prefetch built from the base tree can never be fulfilled.
//
// The base-tree descent mirrors convertServerPatchToFullTreeImpl: segmentPath
// is a repeating [parallelRouteKey, segment, ...] pattern; segmentPath[i] keys
// into the children, segmentPath[i + 1] is the server's segment at that
// position.
function didServerPatchDivergeFromBase(currentTree, segmentPath, treePatch) {
    let baseNode = currentTree;
    for(let i = 0; i + 1 < segmentPath.length; i += 2){
        const parallelRouteKey = segmentPath[i];
        const serverSegment = segmentPath[i + 1];
        const childBase = baseNode[1][parallelRouteKey];
        if (childBase === undefined) {
            // The base tree doesn't have this branch. Unless the server merely
            // filled it with a default, the trees have different structures.
            return serverSegment !== _segment.DEFAULT_SEGMENT_KEY;
        }
        if (segmentIdentityDivergesFromBase(serverSegment, childBase[0])) {
            return true;
        }
        baseNode = childBase;
    }
    return detectTreeDivergenceFromBase(treePatch, baseNode);
}
// Recursively compares a server-rendered subtree against the base subtree at
// the same position. Inactive parallel route branches — which carry a refresh
// state in the base — are expected to differ and are skipped.
function detectTreeDivergenceFromBase(serverNode, baseNode) {
    if (segmentIdentityDivergesFromBase(serverNode[0], baseNode[0])) {
        return true;
    }
    const serverChildren = serverNode[1];
    const baseChildren = baseNode[1];
    for(const parallelRouteKey in serverChildren){
        const childServer = serverChildren[parallelRouteKey];
        const childBase = baseChildren[parallelRouteKey];
        if (childBase === undefined) {
            // A slot the base tree doesn't have. Unless the server merely filled it
            // with a default, the trees have different structures.
            if (childServer[0] !== _segment.DEFAULT_SEGMENT_KEY) {
                return true;
            }
        } else if ((childBase[2] ?? null) !== null) {
        // The base branch carries a refresh state: an inactive parallel route
        // reused from a different route (e.g. a "default" slot). The server's
        // answer is expected to differ, so skip the branch.
        } else if (detectTreeDivergenceFromBase(childServer, childBase)) {
            return true;
        }
    }
    return false;
}
// Whether two segments at the same position claim different identities. Page
// segments match modulo embedded search params (validated separately, see
// getRenderedSearch), and a default filled in by the server is not a claim
// about the position's identity.
function segmentIdentityDivergesFromBase(serverSegment, baseSegment) {
    if (typeof serverSegment === 'string' && typeof baseSegment === 'string' && serverSegment.startsWith(_segment.PAGE_SEGMENT_KEY) && baseSegment.startsWith(_segment.PAGE_SEGMENT_KEY)) {
        return false;
    }
    if (serverSegment === _segment.DEFAULT_SEGMENT_KEY) {
        return false;
    }
    return !(0, _matchsegments.matchSegment)(baseSegment, serverSegment);
}
function convertServerPatchToFullTreeImpl(baseRouterState, baseData, treePatch, dataPatch, segmentPath, renderedSearch, index) {
    if (index === segmentPath.length) {
        // We reached the part of the tree that we need to patch.
        return {
            tree: treePatch,
            data: dataPatch
        };
    }
    // segmentPath represents the parent path of subtree. It's a repeating
    // pattern of parallel route key and segment:
    //
    //   [string, Segment, string, Segment, string, Segment, ...]
    //
    // This path tells us which part of the base tree to apply the tree patch.
    //
    // NOTE: We receive the FlightRouterState patch in the same request as the
    // seed data patch. Therefore we don't need to worry about diffing the segment
    // values; we can assume the server sent us a correct result.
    const updatedParallelRouteKey = segmentPath[index];
    // const segment: Segment = segmentPath[index + 1] <-- Not used, see note above
    const baseTreeChildren = baseRouterState[1];
    const baseSeedDataChildren = baseData !== null ? baseData[1] : null;
    const newTreeChildren = {};
    const newSeedDataChildren = {};
    for(const parallelRouteKey in baseTreeChildren){
        const childBaseRouterState = baseTreeChildren[parallelRouteKey];
        const childBaseSeedData = baseSeedDataChildren !== null ? baseSeedDataChildren[parallelRouteKey] ?? null : null;
        if (parallelRouteKey === updatedParallelRouteKey) {
            const result = convertServerPatchToFullTreeImpl(childBaseRouterState, childBaseSeedData, treePatch, dataPatch, segmentPath, renderedSearch, // the end of the segment path.
            index + 2);
            newTreeChildren[parallelRouteKey] = result.tree;
            newSeedDataChildren[parallelRouteKey] = result.data;
        } else {
            // This child is not being patched. Copy it over as-is.
            newTreeChildren[parallelRouteKey] = childBaseRouterState;
            newSeedDataChildren[parallelRouteKey] = childBaseSeedData;
        }
    }
    let clonedTree;
    let clonedSeedData;
    // Clone all the fields except the children.
    // Clone the FlightRouterState tree. Based on equivalent logic in
    // apply-router-state-patch-to-tree, but should confirm whether we need to
    // copy all of these fields. Not sure the server ever sends, e.g. the
    // refetch marker.
    clonedTree = [
        baseRouterState[0],
        newTreeChildren
    ];
    if (2 in baseRouterState) {
        const compressedRefreshState = baseRouterState[2];
        if (compressedRefreshState !== undefined && compressedRefreshState !== null) {
            // Since this part of the tree was patched with new data, any parent
            // refresh states should be updated to reflect the new rendered search
            // value. (The refresh state acts like a "context provider".) All pages
            // within the same server response share the same renderedSearch value,
            // but the same RouteTree could be composed from multiple different
            // routes, and multiple responses.
            clonedTree[2] = [
                compressedRefreshState[0],
                renderedSearch
            ];
        }
    }
    if (3 in baseRouterState) {
        clonedTree[3] = baseRouterState[3];
    }
    // Recompute the propagated "subtree" prefetch hints for this segment. Mirrors
    // the propagation done on the server in
    // createFlightRouterStateFromLoaderTree.
    let prefetchHints = (baseRouterState[4] ?? 0) & ~_approutertypes.SubtreePrefetchHints;
    for(const parallelRouteKey in newTreeChildren){
        const childHints = newTreeChildren[parallelRouteKey][4];
        if (childHints !== undefined) {
            prefetchHints = (0, _approutertypes.propagateSubtreeBits)(prefetchHints, childHints);
        }
    }
    if (prefetchHints !== 0) {
        clonedTree[4] = prefetchHints;
    }
    // Clone the CacheNodeSeedData tree.
    const isEmptySeedDataPartial = true;
    clonedSeedData = [
        null,
        newSeedDataChildren,
        null,
        isEmptySeedDataPartial,
        null
    ];
    return {
        tree: clonedTree,
        data: clonedSeedData
    };
}
/**
 * Instant Navigation Testing API: ensures a prefetch task has been initiated
 * and completed before proceeding with the navigation. This guarantees that
 * segment data requests are at least pending, even for routes whose route
 * tree is already cached.
 *
 * After the prefetch completes, delegates to the normal navigation flow.
 */ async function ensurePrefetchThenNavigate(state, url, currentUrl, currentRenderedSearch, currentCacheNode, currentFlightRouterState, nextUrl, freshnessPolicy, scrollBehavior, navigateType, navigationLock) {
    const link = (0, _links.getLinkForCurrentNavigation)();
    const fetchStrategy = link !== null ? link.fetchStrategy : _types.FetchStrategy.PPR;
    const cacheKey = (0, _cachekey.createCacheKey)(url.href, nextUrl);
    // Create this navigation's "wait for prefetch to fulfill" state and schedule
    // the prefetch as a locked-navigation prefetch. The prefetch's promise
    // resolves when the task completes — after every segment response the task
    // cares about has settled — so the navigation below reads present data
    // rather than a still-in-flight entry.
    const { beginNavigationLockPrefetch } = __webpack_require__(39197);
    const navigationLockPrefetch = beginNavigationLockPrefetch();
    const prefetchTask = (0, _scheduler.schedulePrefetchTask)(cacheKey, currentFlightRouterState, fetchStrategy, _types.PrefetchPriority.Default, null, navigationLockPrefetch);
    if (navigationLockPrefetch !== null) {
        await navigationLockPrefetch.promise;
    }
    // Prefetch is complete. Proceed with the normal navigation flow, which
    // will now find the route in the cache. The navigation inherits the map of
    // the prefetch task that drives it: the task was scheduled inside the lock
    // scope, so this is the scope's private map, and the navigation reads only
    // data fetched under the lock.
    const result = await navigateImpl(state, url, currentUrl, currentRenderedSearch, currentCacheNode, currentFlightRouterState, nextUrl, freshnessPolicy, scrollBehavior, navigateType, navigationLock, prefetchTask.segmentCacheMap);
    // Only transition to captured-SPA once the navigation is known to be an SPA.
    // If the result is an MPA navigation, leave the cookie pending and let the new
    // document load transition it to captured-MPA.
    if (!result.pushRef.mpaNavigation) {
        const { updateCapturedSPAToTree } = __webpack_require__(39197);
        updateCapturedSPAToTree(currentFlightRouterState, result.tree);
    }
    return result;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map


/***/ }),

/***/ 21315:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "ensureLeadingSlash", ({
    enumerable: true,
    get: function() {
        return ensureLeadingSlash;
    }
}));
function ensureLeadingSlash(path) {
    return path.startsWith('/') ? path : `/${path}`;
} //# sourceMappingURL=ensure-leading-slash.js.map


/***/ }),

/***/ 22120:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    FreshnessPolicy: function() {
        return FreshnessPolicy;
    },
    beginLockedNavigation: function() {
        return beginLockedNavigation;
    },
    createInitialCacheNodeForHydration: function() {
        return createInitialCacheNodeForHydration;
    },
    getCurrentNavigationLock: function() {
        return getCurrentNavigationLock;
    },
    isDeferredRsc: function() {
        return isDeferredRsc;
    },
    resetNavigationLockToPending: function() {
        return resetNavigationLockToPending;
    },
    spawnDynamicRequests: function() {
        return spawnDynamicRequests;
    },
    startPPRNavigation: function() {
        return startPPRNavigation;
    }
});
const _approutertypes = __webpack_require__(76731);
const _segment = __webpack_require__(78237);
const _matchsegments = __webpack_require__(57653);
const _createhreffromurl = __webpack_require__(29453);
const _fetchserverresponse = __webpack_require__(28796);
const _useactionqueue = __webpack_require__(55437);
const _routerreducertypes = __webpack_require__(74616);
const _isnavigatingtonewrootlayout = __webpack_require__(97880);
const _committedstate = __webpack_require__(54728);
const _navigation = __webpack_require__(20354);
const _cache = __webpack_require__(12506);
const _types = __webpack_require__(77565);
const _optimisticroutes = __webpack_require__(68378);
const _constants = __webpack_require__(7103);
const _routeparams = __webpack_require__(84536);
const _varypath = __webpack_require__(79620);
const _bfcache = __webpack_require__(80882);
var FreshnessPolicy = /*#__PURE__*/ function(FreshnessPolicy) {
    FreshnessPolicy[FreshnessPolicy["Default"] = 0] = "Default";
    FreshnessPolicy[FreshnessPolicy["Hydration"] = 1] = "Hydration";
    FreshnessPolicy[FreshnessPolicy["HistoryTraversal"] = 2] = "HistoryTraversal";
    FreshnessPolicy[FreshnessPolicy["RefreshAll"] = 3] = "RefreshAll";
    FreshnessPolicy[FreshnessPolicy["HMRRefresh"] = 4] = "HMRRefresh";
    FreshnessPolicy[FreshnessPolicy["Gesture"] = 5] = "Gesture";
    return FreshnessPolicy;
}({});
const noop = ()=>{};
function createInitialCacheNodeForHydration(navigatedAt, initialTree, seedData, seedHead, seedDynamicStaleAt) {
    // Create the initial cache node tree, using the data embedded into the
    // HTML document.
    const accumulation = {
        separateRefreshUrls: null,
        scrollRef: null
    };
    const restrictToShell = false;
    const task = createCacheNodeOnNavigation(navigatedAt, initialTree, null, 1, seedData, seedHead, seedDynamicStaleAt, false, accumulation, _cache.segmentCacheMap, restrictToShell);
    return task;
}
function startPPRNavigation(navigatedAt, oldUrl, oldRenderedSearch, oldCacheNode, oldRouterState, newRouteTree, newMetadataVaryPath, freshness, seedData, seedHead, seedDynamicStaleAt, isSamePageNavigation, accumulation, // driving-task map, or the shared map. See `segmentCacheMap` in cache.ts.
map, // entries. Always false outside the testing API. See navigation-testing-lock.
restrictToShell) {
    const parentNeedsDynamicRequest = false;
    const parentRefreshState = null;
    const oldRootRefreshState = {
        canonicalUrl: (0, _createhreffromurl.createHrefFromUrl)(oldUrl),
        renderedSearch: oldRenderedSearch
    };
    return updateCacheNodeOnNavigation(navigatedAt, oldUrl, oldCacheNode !== null ? oldCacheNode : undefined, oldRouterState, newRouteTree, newMetadataVaryPath, freshness, seedData, seedHead, seedDynamicStaleAt, isSamePageNavigation, parentNeedsDynamicRequest, oldRootRefreshState, parentRefreshState, accumulation, map, restrictToShell);
}
function updateCacheNodeOnNavigation(navigatedAt, oldUrl, oldCacheNode, oldRouterState, newRouteTree, newMetadataVaryPath, freshness, seedData, seedHead, seedDynamicStaleAt, isSamePageNavigation, parentNeedsDynamicRequest, oldRootRefreshState, parentRefreshState, accumulation, map, // entries. Always false outside the testing API. See navigation-testing-lock.
restrictToShell) {
    // Check if this segment matches the one in the previous route. A
    // search-param-only difference at a page segment falls through to the
    // matched branch — the CacheNode is rebuilt (so data refetches), but the
    // bfcacheId carries forward as if the segment had matched.
    const oldSegment = oldRouterState[0];
    const newSegment = createSegmentFromRouteTree(newRouteTree);
    const segmentMatchKind = compareSegments(newSegment, oldSegment);
    if (segmentMatchKind === 1) {
        // This segment does not match the previous route. We're now entering the
        // new part of the target route. Switch to the "create" path.
        if ((newRouteTree.prefetchHints & _approutertypes.PrefetchHint.IsRootLayoutOrAbove) !== 0 && (0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(oldRouterState, newRouteTree) || // The global Not Found route (app/global-not-found.tsx) is a special
        // case, because it acts like a root layout, but in the router tree, it
        // is rendered in the same position as app/layout.tsx.
        //
        // Any navigation to the global Not Found route should trigger a
        // full-page navigation.
        //
        // TODO: We should probably model this by changing the key of the root
        // segment when this happens. Then the root layout check would work
        // as expected, without a special case.
        newSegment === _segment.NOT_FOUND_SEGMENT_KEY) {
            return null;
        }
        return createCacheNodeOnNavigation(navigatedAt, newRouteTree, newMetadataVaryPath, freshness, seedData, seedHead, seedDynamicStaleAt, parentNeedsDynamicRequest, accumulation, map, restrictToShell);
    }
    const newSlots = newRouteTree.slots;
    const oldRouterStateChildren = oldRouterState[1];
    const seedDataChildren = seedData !== null ? seedData[1] : null;
    let shouldRefreshDynamicData = false;
    switch(freshness){
        case 0:
        case 2:
        case 1:
        case 5:
            shouldRefreshDynamicData = false;
            break;
        case 3:
        case 4:
            shouldRefreshDynamicData = true;
            break;
        default:
            freshness;
            break;
    }
    // TODO: We're not consistent about how we do this check. Some places
    // check if the segment starts with PAGE_SEGMENT_KEY, but most seem to
    // check if there any any children, which is why I'm doing it here. We
    // should probably encode an empty children set as `null` though. Either
    // way, we should update all the checks to be consistent.
    const isLeafSegment = newSlots === null;
    // Get the data for this segment. Since it was part of the previous route,
    // usually we just clone the data from the old CacheNode. However, during a
    // refresh or a revalidation, there won't be any existing CacheNode. So we
    // may need to consult the prefetch cache, like we would for a new segment.
    let newCacheNode;
    let needsDynamicRequest;
    if (oldCacheNode !== undefined && !shouldRefreshDynamicData && // During a same-page navigation, we always refetch the page segments
    !(isLeafSegment && isSamePageNavigation) && // A search-param-only change is treated as a refresh of the page segment.
    // The internal cache key of the data is different, but the identity of
    // the node in the route tree is the same.
    segmentMatchKind !== 2) {
        // Reuse the existing CacheNode
        const dropPrefetchRsc = false;
        newCacheNode = reuseSharedCacheNode(dropPrefetchRsc, oldCacheNode);
        needsDynamicRequest = false;
    } else {
        // If this is part of a refresh, ignore the existing CacheNode and create a
        // new one.
        const seedRsc = seedData !== null ? seedData[0] : null;
        const result = createCacheNodeForSegment(navigatedAt, newRouteTree, seedRsc, newMetadataVaryPath, seedHead, freshness, seedDynamicStaleAt, // even though the data is being refreshed, the state identity of the
        // route hasn't changed. Otherwise (no prior node) mint a fresh one.
        oldCacheNode !== undefined ? oldCacheNode.bfcacheId : generateBFCacheId(freshness), map, restrictToShell);
        newCacheNode = result.cacheNode;
        needsDynamicRequest = result.needsDynamicRequest;
        // Scroll handling
        if (isLeafSegment && segmentMatchKind === 2) {
            // Special case: A search param change mostly acts the same as a
            // refresh, except it does trigger a scroll.
            accumulateScrollRef(freshness, newCacheNode, accumulation);
        } else {
            // Normal case: This is a refresh of an existing segment. Carry forward
            // the old node's scrollRef. This preserves scroll intent when a prior
            // navigation's CacheNode is replaced by a refresh before the scroll
            // handler has had a chance to fire — e.g. when router.push() and
            // router.refresh() are called in the same startTransition batch.
            if (oldCacheNode !== undefined) {
                newCacheNode.scrollRef = oldCacheNode.scrollRef;
            }
        }
    }
    // During a refresh navigation, there's a special case that happens when
    // entering a "default" slot. The default slot may not be part of the
    // current route; it may have been reused from an older route. If so,
    // we need to fetch its data from the old route's URL rather than current
    // route's URL. Keep track of this as we traverse the tree.
    const maybeRefreshState = newRouteTree.refreshState;
    const refreshState = maybeRefreshState !== undefined && maybeRefreshState !== null ? maybeRefreshState : parentRefreshState;
    // If this segment itself needs to fetch new data from the server, then by
    // definition it is being refreshed. Track its refresh URL so we know which
    // URL to request the data from.
    if (needsDynamicRequest && refreshState !== null) {
        accumulateRefreshUrl(accumulation, refreshState);
    }
    // As we diff the trees, we may sometimes modify (copy-on-write, not mutate)
    // the Route Tree that was returned by the server — for example, in the case
    // of default parallel routes, we preserve the currently active segment. To
    // avoid mutating the original tree, we clone the router state children along
    // the return path.
    let patchedRouterStateChildren = {};
    let taskChildren = null;
    // Most navigations require a request to fetch additional data from the
    // server, either because the data was not already prefetched, or because the
    // target route contains dynamic data that cannot be prefetched.
    //
    // However, if the target route is fully static, and it's already completely
    // loaded into the segment cache, then we can skip the server request.
    //
    // This starts off as `false`, and is set to `true` if any of the child
    // routes requires a dynamic request.
    let childNeedsDynamicRequest = false;
    // As we traverse the children, we'll construct a FlightRouterState that can
    // be sent to the server to request the dynamic data. If it turns out that
    // nothing in the subtree is dynamic (i.e. childNeedsDynamicRequest is false
    // at the end), then this will be discarded.
    // TODO: We can probably optimize the format of this data structure to only
    // include paths that are dynamic. Instead of reusing the
    // FlightRouterState type.
    let dynamicRequestTreeChildren = {};
    let newCacheNodeSlots = null;
    if (newSlots !== null) {
        const oldCacheNodeSlots = oldCacheNode !== undefined ? oldCacheNode.slots : null;
        newCacheNode.slots = newCacheNodeSlots = {};
        taskChildren = new Map();
        for (let [parallelRouteKey, newRouteTreeChild] of newSlots){
            const oldRouterStateChild = oldRouterStateChildren[parallelRouteKey];
            if (oldRouterStateChild === undefined) {
                // This should never happen, but if it does, it suggests a malformed
                // server response. Trigger a full-page navigation.
                return null;
            }
            let seedDataChild = seedDataChildren !== null ? seedDataChildren[parallelRouteKey] : null;
            const oldSegmentChild = oldRouterStateChild[0];
            let newSegmentChild = createSegmentFromRouteTree(newRouteTreeChild);
            let seedHeadChild = seedHead;
            if (// was stashed in the history entry as-is.
            freshness !== 2 && newSegmentChild === _segment.DEFAULT_SEGMENT_KEY && oldSegmentChild !== _segment.DEFAULT_SEGMENT_KEY) {
                // This is a "default" segment. These are never sent by the server during
                // a soft navigation; instead, the client reuses whatever segment was
                // already active in that slot on the previous route.
                newRouteTreeChild = reuseActiveSegmentInDefaultSlot(newRouteTree, parallelRouteKey, oldRootRefreshState, oldRouterStateChild);
                newSegmentChild = createSegmentFromRouteTree(newRouteTreeChild);
                // Since we're switching to a different route tree, these are no
                // longer valid, because they correspond to the outer tree.
                seedDataChild = null;
                seedHeadChild = null;
            }
            const oldCacheNodeChild = oldCacheNodeSlots !== null ? oldCacheNodeSlots[parallelRouteKey] : undefined;
            const taskChild = updateCacheNodeOnNavigation(navigatedAt, oldUrl, oldCacheNodeChild, oldRouterStateChild, newRouteTreeChild, newMetadataVaryPath, freshness, seedDataChild ?? null, seedHeadChild, seedDynamicStaleAt, isSamePageNavigation, parentNeedsDynamicRequest || needsDynamicRequest, oldRootRefreshState, refreshState, accumulation, map, restrictToShell);
            if (taskChild === null) {
                // One of the child tasks discovered a change to the root layout.
                // Immediately unwind from this recursive traversal. This will trigger a
                // full-page navigation.
                return null;
            }
            // Recursively propagate up the child tasks.
            taskChildren.set(parallelRouteKey, taskChild);
            newCacheNodeSlots[parallelRouteKey] = taskChild.node;
            // The child tree's route state may be different from the prefetched
            // route sent by the server. We need to clone it as we traverse back up
            // the tree.
            const taskChildRoute = taskChild.route;
            patchedRouterStateChildren[parallelRouteKey] = taskChildRoute;
            const dynamicRequestTreeChild = taskChild.dynamicRequestTree;
            if (dynamicRequestTreeChild !== null) {
                // Something in the child tree is dynamic.
                childNeedsDynamicRequest = true;
                dynamicRequestTreeChildren[parallelRouteKey] = dynamicRequestTreeChild;
            } else {
                dynamicRequestTreeChildren[parallelRouteKey] = taskChildRoute;
            }
        }
    }
    const newFlightRouterState = [
        createSegmentFromRouteTree(newRouteTree),
        patchedRouterStateChildren,
        refreshState !== null ? [
            refreshState.canonicalUrl,
            refreshState.renderedSearch
        ] : null,
        null,
        newRouteTree.prefetchHints
    ];
    return {
        status: needsDynamicRequest ? 0 : 1,
        route: newFlightRouterState,
        node: newCacheNode,
        dynamicRequestTree: createDynamicRequestTree(newFlightRouterState, dynamicRequestTreeChildren, needsDynamicRequest, childNeedsDynamicRequest, parentNeedsDynamicRequest),
        refreshState,
        children: taskChildren
    };
}
/**
 * Assigns a ScrollRef to a new leaf CacheNode so the scroll handler
 * knows to scroll to it after navigation. All leaves in the same
 * navigation share the same ScrollRef — the first segment to scroll
 * consumes it, preventing others from also scrolling.
 *
 * This is only called inside `createCacheNodeOnNavigation`, which only
 * runs when segments diverge from the previous route. So for a refresh
 * where the route structure stays the same, segments match, the update
 * path is taken, and this function is never called — no scroll ref is
 * assigned. A scroll ref is only assigned when the route actually
 * changed (e.g. a redirect, or a dynamic condition on the server that
 * produces a different route).
 *
 * Skipped during hydration (initial render should not scroll) and
 * history traversal (scroll restoration is handled separately).
 */ function accumulateScrollRef(freshness, cacheNode, accumulation) {
    switch(freshness){
        case 0:
        case 5:
        case 3:
        case 4:
            if (accumulation.scrollRef === null) {
                accumulation.scrollRef = {
                    current: true
                };
            }
            cacheNode.scrollRef = accumulation.scrollRef;
            break;
        case 1:
            break;
        case 2:
            break;
        default:
            freshness;
            break;
    }
}
function createCacheNodeOnNavigation(navigatedAt, newRouteTree, newMetadataVaryPath, freshness, seedData, seedHead, seedDynamicStaleAt, parentNeedsDynamicRequest, accumulation, map, // entries. Always false outside the testing API. See navigation-testing-lock.
restrictToShell) {
    // Same traversal as updateCacheNodeNavigation, but simpler. We switch to this
    // path once we reach the part of the tree that was not in the previous route.
    // We don't need to diff against the old tree, we just need to create a new
    // one. We also don't need to worry about any refresh-related logic.
    //
    // For the most part, this is a subset of updateCacheNodeOnNavigation, so any
    // change that happens in this function likely needs to be applied to that
    // one, too. However there are some places where the behavior intentionally
    // diverges, which is why we keep them separate.
    const newSegment = createSegmentFromRouteTree(newRouteTree);
    const newSlots = newRouteTree.slots;
    const seedDataChildren = seedData !== null ? seedData[1] : null;
    const seedRsc = seedData !== null ? seedData[0] : null;
    const result = createCacheNodeForSegment(navigatedAt, newRouteTree, seedRsc, newMetadataVaryPath, seedHead, freshness, seedDynamicStaleAt, // bfcacheId.
    generateBFCacheId(freshness), map, restrictToShell);
    const newCacheNode = result.cacheNode;
    const needsDynamicRequest = result.needsDynamicRequest;
    const isLeafSegment = newSlots === null;
    if (isLeafSegment) {
        accumulateScrollRef(freshness, newCacheNode, accumulation);
    }
    let patchedRouterStateChildren = {};
    let taskChildren = null;
    let childNeedsDynamicRequest = false;
    let dynamicRequestTreeChildren = {};
    let newCacheNodeSlots = null;
    if (newSlots !== null) {
        newCacheNode.slots = newCacheNodeSlots = {};
        taskChildren = new Map();
        for (const [parallelRouteKey, newRouteTreeChild] of newSlots){
            const seedDataChild = seedDataChildren !== null ? seedDataChildren[parallelRouteKey] : null;
            const taskChild = createCacheNodeOnNavigation(navigatedAt, newRouteTreeChild, newMetadataVaryPath, freshness, seedDataChild ?? null, seedHead, seedDynamicStaleAt, parentNeedsDynamicRequest || needsDynamicRequest, accumulation, map, restrictToShell);
            taskChildren.set(parallelRouteKey, taskChild);
            newCacheNodeSlots[parallelRouteKey] = taskChild.node;
            const taskChildRoute = taskChild.route;
            patchedRouterStateChildren[parallelRouteKey] = taskChildRoute;
            const dynamicRequestTreeChild = taskChild.dynamicRequestTree;
            if (dynamicRequestTreeChild !== null) {
                childNeedsDynamicRequest = true;
                dynamicRequestTreeChildren[parallelRouteKey] = dynamicRequestTreeChild;
            } else {
                dynamicRequestTreeChildren[parallelRouteKey] = taskChildRoute;
            }
        }
    }
    const newFlightRouterState = [
        newSegment,
        patchedRouterStateChildren,
        null,
        null,
        newRouteTree.prefetchHints
    ];
    return {
        status: needsDynamicRequest ? 0 : 1,
        route: newFlightRouterState,
        node: newCacheNode,
        dynamicRequestTree: createDynamicRequestTree(newFlightRouterState, dynamicRequestTreeChildren, needsDynamicRequest, childNeedsDynamicRequest, parentNeedsDynamicRequest),
        // This route is not part of the current tree, so there's no reason to
        // track the refresh URL.
        refreshState: null,
        children: taskChildren
    };
}
function createSegmentFromRouteTree(newRouteTree) {
    if (newRouteTree.isPage) {
        // In a dynamic server response, the server embeds the search params into
        // the segment key, but in a static one it's omitted. The client handles
        // this inconsistency by adding the search params back right at the end.
        //
        // TODO: The only thing this is used for is to create a cache key for
        // ChildSegmentMap. But we already track the `renderedSearch` everywhere as
        // part of the varyPath. The plan is get rid of ChildSegmentMap and
        // store the page data in a CacheMap using the varyPath, like we do
        // for prefetches. Then we can remove it from the segment key.
        //
        // As an incremental step, we can grab the search params from the varyPath.
        const renderedSearch = (0, _varypath.getRenderedSearchFromVaryPath)(newRouteTree.varyPath);
        if (renderedSearch === null) {
            return _segment.PAGE_SEGMENT_KEY;
        }
        // This is based on equivalent logic in addSearchParamsIfPageSegment, used
        // on the server.
        const stringifiedQuery = JSON.stringify((0, _routeparams.urlSearchParamsToParsedUrlQuery)(new URLSearchParams(renderedSearch)));
        return stringifiedQuery !== '{}' ? _segment.PAGE_SEGMENT_KEY + '?' + stringifiedQuery : _segment.PAGE_SEGMENT_KEY;
    }
    return newRouteTree.segment;
}
function patchRouterStateWithNewChildren(baseRouterState, newChildren) {
    const clone = [
        baseRouterState[0],
        newChildren
    ];
    // Based on equivalent logic in apply-router-state-patch-to-tree, but should
    // confirm whether we need to copy all of these fields. Not sure the server
    // ever sends, e.g. the refetch marker.
    if (2 in baseRouterState) {
        clone[2] = baseRouterState[2];
    }
    if (3 in baseRouterState) {
        clone[3] = baseRouterState[3];
    }
    if (4 in baseRouterState) {
        clone[4] = baseRouterState[4];
    }
    return clone;
}
function createDynamicRequestTree(newRouterState, dynamicRequestTreeChildren, needsDynamicRequest, childNeedsDynamicRequest, parentNeedsDynamicRequest) {
    // Create a FlightRouterState that instructs the server how to render the
    // requested segment.
    //
    // Or, if neither this segment nor any of the children require a new data,
    // then we return `null` to skip the request.
    let dynamicRequestTree = null;
    if (needsDynamicRequest) {
        dynamicRequestTree = patchRouterStateWithNewChildren(newRouterState, dynamicRequestTreeChildren);
        // The "refetch" marker is set on the top-most segment that requires new
        // data. We can omit it if a parent was already marked.
        if (!parentNeedsDynamicRequest) {
            dynamicRequestTree[3] = 'refetch';
        }
    } else if (childNeedsDynamicRequest) {
        // This segment does not request new data, but at least one of its
        // children does.
        dynamicRequestTree = patchRouterStateWithNewChildren(newRouterState, dynamicRequestTreeChildren);
    } else {
        dynamicRequestTree = null;
    }
    return dynamicRequestTree;
}
function accumulateRefreshUrl(accumulation, refreshState) {
    // This is a refresh navigation, and we're inside a "default" slot that's
    // not part of the current route; it was reused from an older route. In
    // order to get fresh data for this reused route, we need to issue a
    // separate request using the old route's URL.
    //
    // Track these extra URLs in the accumulated result. Later, we'll construct
    // an appropriate request for each unique URL in the final set. The reason
    // we don't do it immediately here is so we can deduplicate multiple
    // instances of the same URL into a single request. See
    // listenForDynamicRequest for more details.
    const refreshUrl = refreshState.canonicalUrl;
    const separateRefreshUrls = accumulation.separateRefreshUrls;
    if (separateRefreshUrls === null) {
        accumulation.separateRefreshUrls = new Set([
            refreshUrl
        ]);
    } else {
        separateRefreshUrls.add(refreshUrl);
    }
}
function reuseActiveSegmentInDefaultSlot(parentRouteTree, parallelRouteKey, oldRootRefreshState, oldRouterState) {
    // This is a "default" segment. These are never sent by the server during a
    // soft navigation; instead, the client reuses whatever segment was already
    // active in that slot on the previous route. This means if we later need to
    // refresh the segment, it will have to be refetched from the previous route's
    // URL. We store it in the Flight Router State.
    let reusedUrl;
    let reusedRenderedSearch;
    const oldRefreshState = oldRouterState[2];
    if (oldRefreshState !== undefined && oldRefreshState !== null) {
        // This segment was already reused from an even older route. Keep its
        // existing URL and refresh state.
        reusedUrl = oldRefreshState[0];
        reusedRenderedSearch = oldRefreshState[1];
    } else {
        // Since this route didn't already have a refresh state, it must have been
        // reachable from the root of the old route. So we use the refresh state
        // that represents the old route.
        reusedUrl = oldRootRefreshState.canonicalUrl;
        reusedRenderedSearch = oldRootRefreshState.renderedSearch;
    }
    const acc = {
        metadataVaryPath: null,
        treeDivergedFromBase: false
    };
    const reusedRouteTree = (0, _cache.convertReusedFlightRouterStateToRouteTree)(parentRouteTree, parallelRouteKey, oldRouterState, reusedRenderedSearch, acc);
    reusedRouteTree.refreshState = {
        canonicalUrl: reusedUrl,
        renderedSearch: reusedRenderedSearch
    };
    return reusedRouteTree;
}
function reuseSharedCacheNode(dropPrefetchRsc, existingCacheNode) {
    // Clone the CacheNode that was already present in the previous tree.
    // Carry forward the scrollRef so scroll intent from a prior navigation
    // survives tree rebuilds (e.g. push + refresh in the same batch).
    // Carry forward the bfcacheId so shared-layout segments retain stable
    // identity across navigations.
    return createCacheNode(existingCacheNode.rsc, dropPrefetchRsc ? null : existingCacheNode.prefetchRsc, existingCacheNode.head, dropPrefetchRsc ? null : existingCacheNode.prefetchHead, existingCacheNode.bfcacheId, existingCacheNode.scrollRef);
}
function createCacheNodeForSegment(now, tree, seedRsc, metadataVaryPath, seedHead, freshness, dynamicStaleAt, bfcacheId, map, // entries. Always false outside the testing API. See navigation-testing-lock.
restrictToShell) {
    // Construct a new CacheNode using data from the BFCache, the client's
    // Segment Cache, or seeded from a server response.
    //
    // If there's a cache miss, or if we only have a partial hit, we'll render
    // the partial state immediately, and spawn a request to the server to fill
    // in the missing data.
    //
    // If the segment is fully cached on the client already, we can omit this
    // segment from the server request.
    //
    // If we already have a dynamic data response associated with this navigation,
    // as in the case of a Server Action-initiated redirect or refresh, we may
    // also be able to use that data without spawning a new request. (This is
    // referred to as the "seed" data.)
    const isPage = tree.isPage;
    // During certain kinds of navigations, we may be able to render from
    // the BFCache.
    switch(freshness){
        case 0:
            {
                // Check BFCache during regular navigations. The entry's staleAt
                // determines whether it's still fresh. This is used when
                // staleTimes.dynamic is configured globally or when a page exports
                // unstable_dynamicStaleTime for per-page control.
                const bfcacheEntry = (0, _bfcache.readFromBFCacheDuringRegularNavigation)(now, tree.varyPath);
                if (bfcacheEntry !== null) {
                    // A regular navigation that happens to read cached data is still a
                    // fresh navigation, so we use the caller-supplied bfcacheId — the
                    // BFCacheEntry's id is only restored on history-traversal
                    // navigations.
                    return {
                        cacheNode: createCacheNode(bfcacheEntry.rsc, bfcacheEntry.prefetchRsc, bfcacheEntry.head, bfcacheEntry.prefetchHead, bfcacheId),
                        needsDynamicRequest: false
                    };
                }
                break;
            }
        case 1:
            {
                // This is not related to the BFCache but it is a special case.
                //
                // We should never spawn network requests during hydration. We must treat
                // the initial payload as authoritative, because the initial page load is
                // used as a last-ditch mechanism for recovering the app.
                //
                // This is also an important safety check because if this leaks into the
                // server rendering path (which theoretically it never should because the
                // server payload should be consistent), the server would hang because these
                // promises would never resolve.
                //
                // TODO: There is an existing case where the global "not found" boundary
                // triggers this path. But it does render correctly despite that. That's an
                // unusual render path so it's not surprising, but we should look into
                // modeling it in a more consistent way. See also the /_notFound special
                // case in updateCacheNodeOnNavigation.
                const rsc = seedRsc;
                const prefetchRsc = null;
                const head = isPage ? seedHead : null;
                const prefetchHead = null;
                (0, _bfcache.writeToBFCache)(now, tree.varyPath, rsc, prefetchRsc, head, prefetchHead, dynamicStaleAt, bfcacheId);
                if (isPage && metadataVaryPath !== null) {
                    (0, _bfcache.writeHeadToBFCache)(now, metadataVaryPath, head, prefetchHead, dynamicStaleAt, bfcacheId);
                }
                return {
                    cacheNode: createCacheNode(rsc, prefetchRsc, head, prefetchHead, bfcacheId),
                    needsDynamicRequest: false
                };
            }
        case 2:
            const bfcacheEntry = (0, _bfcache.readFromBFCache)(tree.varyPath);
            if (bfcacheEntry !== null) {
                // Only show prefetched data if the dynamic data is still pending. This
                // avoids a flash back to the prefetch state in a case where it's highly
                // likely to have already streamed in.
                //
                // Tehnically, what we're actually checking is whether the dynamic
                // network response was received. But since it's a streaming response,
                // this does not mean that all the dynamic data has fully streamed in.
                // It just means that _some_ of the dynamic data was received. But as a
                // heuristic, we assume that the rest dynamic data will stream in
                // quickly, so it's still better to skip the prefetch state.
                const oldRsc = bfcacheEntry.rsc;
                const oldRscDidResolve = !isDeferredRsc(oldRsc) || oldRsc.status !== 'pending';
                const dropPrefetchRsc = oldRscDidResolve;
                // Restore the bfcacheId from the cached entry so that back/forward
                // navigations preserve the original id, regardless of whether
                // `cacheComponents` Activity preservation is enabled.
                return {
                    cacheNode: createCacheNode(bfcacheEntry.rsc, dropPrefetchRsc ? null : bfcacheEntry.prefetchRsc, bfcacheEntry.head, dropPrefetchRsc ? null : bfcacheEntry.prefetchHead, bfcacheEntry.bfcacheId),
                    needsDynamicRequest: false
                };
            }
            break;
        case 3:
        case 4:
        case 5:
            break;
        default:
            freshness;
            break;
    }
    let cachedRsc = null;
    let isCachedRscPartial = true;
    const segmentEntry = (0, _cache.readSegmentCacheEntryForNavigation)(now, map, tree.varyPath, restrictToShell);
    if (segmentEntry !== null) {
        switch(segmentEntry.status){
            case _cache.EntryStatus.Fulfilled:
                {
                    // Happy path: a cache hit
                    cachedRsc = segmentEntry.rsc;
                    isCachedRscPartial = segmentEntry.isPartial;
                    break;
                }
            case _cache.EntryStatus.Pending:
                {
                    // We haven't received data for this segment yet, but there's already
                    // an in-progress request. Since it's extremely likely to arrive
                    // before the dynamic data response, we might as well use it.
                    const promiseForFulfilledEntry = (0, _cache.waitForSegmentCacheEntry)(segmentEntry);
                    cachedRsc = promiseForFulfilledEntry.then((entry)=>entry !== null ? entry.rsc : null);
                    // Because the request is still pending, we typically don't know yet
                    // whether the response will be partial. We shouldn't skip this segment
                    // during the dynamic navigation request. Otherwise, we might need to
                    // do yet another request to fill in the remaining data, creating
                    // a waterfall.
                    //
                    // The one exception is if this segment is being fetched with via
                    // prefetch={true} (i.e. the "force stale" or "full" strategy). If so,
                    // we can assume the response will be full. This field is set to `false`
                    // for such segments.
                    isCachedRscPartial = segmentEntry.isPartial;
                    break;
                }
            case _cache.EntryStatus.Empty:
            case _cache.EntryStatus.Rejected:
                {
                    break;
                }
            default:
                {
                    segmentEntry;
                    break;
                }
        }
    }
    // Now combine the cached data with the seed data to determine what we can
    // render immediately, versus what needs to stream in later.
    // A partial state to show immediately while we wait for the final data to
    // arrive. If `rsc` is already a complete value (not partial), or if we
    // don't have any useful partial state, this will be `null`.
    let prefetchRsc;
    // The final, resolved segment data. If the data is missing, this will be a
    // promise that resolves to the eventual data. A resolved value of `null`
    // means the data failed to load; the LayoutRouter will suspend indefinitely
    // until the router updates again (refer to finishNavigationTask).
    let rsc;
    let doesSegmentNeedDynamicRequest;
    if (seedRsc !== null) {
        // We already have a dynamic server response for this segment.
        if (isCachedRscPartial) {
            // The seed data may still be streaming in, so it's worth showing the
            // partial cached state in the meantime.
            prefetchRsc = cachedRsc;
            rsc = seedRsc;
        } else {
            // We already have a completely cached segment. Ignore the seed data,
            // which may still be streaming in. This shouldn't happen in the normal
            // case because the client will inform the server which segments are
            // already fully cached, and the server will skip rendering them.
            prefetchRsc = null;
            rsc = cachedRsc;
        }
        doesSegmentNeedDynamicRequest = false;
    } else {
        if (isCachedRscPartial) {
            // The cached data contains dynamic holes, or it's missing entirely. We'll
            // show the partial state immediately (if available), and stream in the
            // final data.
            //
            // Create a pending promise that we can later write to when the
            // data arrives from the server.
            prefetchRsc = cachedRsc;
            rsc = createDeferredRsc();
        } else {
            // The data is fully cached.
            prefetchRsc = null;
            rsc = cachedRsc;
        }
        doesSegmentNeedDynamicRequest = isCachedRscPartial;
    }
    // If this is a page segment, we need to do the same for the head. This
    // follows analogous logic to the segment data above.
    // TODO: We don't need to store the head on the page segment's CacheNode; we
    // can lift it to the main state object. Then we can also delete
    // findHeadCache.
    let prefetchHead = null;
    let head = null;
    let doesHeadNeedDynamicRequest = isPage;
    if (isPage) {
        let cachedHead = null;
        let isCachedHeadPartial = true;
        if (metadataVaryPath !== null) {
            const metadataEntry = (0, _cache.readSegmentCacheEntryForNavigation)(now, map, metadataVaryPath, restrictToShell);
            if (metadataEntry !== null) {
                switch(metadataEntry.status){
                    case _cache.EntryStatus.Fulfilled:
                        {
                            cachedHead = metadataEntry.rsc;
                            isCachedHeadPartial = metadataEntry.isPartial;
                            break;
                        }
                    case _cache.EntryStatus.Pending:
                        {
                            cachedHead = (0, _cache.waitForSegmentCacheEntry)(metadataEntry).then((entry)=>entry !== null ? entry.rsc : null);
                            isCachedHeadPartial = metadataEntry.isPartial;
                            break;
                        }
                    case _cache.EntryStatus.Empty:
                    case _cache.EntryStatus.Rejected:
                        {
                            break;
                        }
                    default:
                        {
                            metadataEntry;
                            break;
                        }
                }
            }
        }
        if ( true && isCachedHeadPartial) {
            // TODO: When optimistic routing is enabled, don't block on waiting for
            // the viewport to resolve. This is a temporary workaround until Vary
            // Params are tracked when rendering the metadata. We'll fix it before
            // this feature is stable. However, it's not a critical issue because 1)
            // it will stream in eventually anyway 2) metadata is wrapped in an
            // internal Suspense boundary, so is always non-blocking; this only
            // affects the viewport node, which is meant to blocking, however... 3)
            // before Segment Cache landed this wasn't always the case, anyway, so
            // it's unlikely that many people are relying on this behavior. Still,
            // will be fixed before stable. It's the very next step in the sequence of
            // work on this project.
            //
            // This line of code works because the App Router treats `null` as
            // "no renderable head available", rather than an empty head. React treats
            // an empty string as empty.
            cachedHead = '';
        }
        if (seedHead !== null) {
            if (isCachedHeadPartial) {
                prefetchHead = cachedHead;
                head = seedHead;
            } else {
                prefetchHead = null;
                head = cachedHead;
            }
            doesHeadNeedDynamicRequest = false;
        } else {
            if (isCachedHeadPartial) {
                prefetchHead = cachedHead;
                head = createDeferredRsc();
            } else {
                prefetchHead = null;
                head = cachedHead;
            }
            doesHeadNeedDynamicRequest = isCachedHeadPartial;
        }
    }
    // Now that we're creating a new segment, write its data to the BFCache. A
    // subsequent back/forward navigation will reuse this same data, until or
    // unless it's cleared by a refresh/revalidation.
    //
    // Skip BFCache writes for optimistic navigations since they are transient
    // and will be replaced by the canonical navigation.
    if (freshness !== 5) {
        (0, _bfcache.writeToBFCache)(now, tree.varyPath, rsc, prefetchRsc, head, prefetchHead, dynamicStaleAt, bfcacheId);
        if (isPage && metadataVaryPath !== null) {
            (0, _bfcache.writeHeadToBFCache)(now, metadataVaryPath, head, prefetchHead, dynamicStaleAt, bfcacheId);
        }
    }
    return {
        cacheNode: createCacheNode(rsc, prefetchRsc, head, prefetchHead, bfcacheId),
        // TODO: We should store this field on the CacheNode itself. I think we can
        // probably unify NavigationTask, CacheNode, and DeferredRsc into a
        // single type. Or at least CacheNode and DeferredRsc.
        needsDynamicRequest: doesSegmentNeedDynamicRequest || doesHeadNeedDynamicRequest
    };
}
function createCacheNode(rsc, prefetchRsc, head, prefetchHead, bfcacheId, scrollRef = null) {
    return {
        rsc,
        prefetchRsc,
        head,
        prefetchHead,
        slots: null,
        scrollRef,
        bfcacheId
    };
}
// Globally-unique counter for fresh bfcacheIds. Incremented every time a new
// CacheNode is created on the client. The id surfaces to user code as a
// string via `useRouter().bfcacheId`.
let nextBFCacheId = 0;
function generateBFCacheId(freshness) {
    // Server-side rendering and the initial client-side hydration tree both
    // use a fixed sentinel so they reconcile cleanly across hydration. The
    // counter only advances on real client-side navigations after hydration.
    if (false) {}
    if (freshness === 1) return 0;
    return ++nextBFCacheId;
}
function compareSegments(newSegment, oldSegment) {
    if ((0, _matchsegments.matchSegment)(newSegment, oldSegment)) {
        return 0;
    }
    if (typeof newSegment === 'string' && typeof oldSegment === 'string' && newSegment.startsWith(_segment.PAGE_SEGMENT_KEY) && oldSegment.startsWith(_segment.PAGE_SEGMENT_KEY)) {
        return 2;
    }
    return 1;
}
// Represents whether the previuos navigation resulted in a route tree mismatch.
// A mismatch results in a refresh of the page. If there are two successive
// mismatches, we will fall back to an MPA navigation, to prevent a retry loop.
let previousNavigationDidMismatch = false;
function spawnDynamicRequests(task, primaryUrl, nextUrl, freshnessPolicy, accumulation, // prediction. Passed through so it can be marked as having a dynamic rewrite
// if the server returns a different pathname than expected (indicating
// dynamic rewrite behavior that varies by param value).
routeCacheEntry, // server-patch retry logic so it can inherit the intent if the original
// transition hasn't committed yet.
navigateType, navigationLock, // in cache.ts.
map, signal) {
    const dynamicRequestTree = task.dynamicRequestTree;
    if (dynamicRequestTree === null) {
        // This navigation was fully cached. There are no dynamic requests to spawn.
        previousNavigationDidMismatch = false;
        return;
    }
    // This is intentionally not an async function to discourage the caller from
    // awaiting the result. Any subsequent async operations spawned by this
    // function should result in a separate navigation task, rather than
    // block the original one.
    //
    // In this function we spawn (but do not await) all the network requests that
    // block the navigation, and collect the promises. The next function,
    // `finishNavigationTask`, can await the promises in any order without
    // accidentally introducing a network waterfall.
    const primaryRequestPromise = fetchMissingDynamicData(task, dynamicRequestTree, primaryUrl, nextUrl, freshnessPolicy, routeCacheEntry, navigationLock, map, signal);
    const separateRefreshUrls = accumulation.separateRefreshUrls;
    let refreshRequestPromises = null;
    if (separateRefreshUrls !== null) {
        // There are multiple URLs that we need to request the data from. This
        // happens when a "default" parallel route slot is present in the tree, and
        // its data cannot be fetched from the current route. We need to split the
        // combined dynamic request tree into separate requests per URL.
        // TODO: Create a scoped dynamic request tree that omits anything that
        // is not relevant to the given URL. Without doing this, the server may
        // sometimes render more data than necessary; this is not a regression
        // compared to the pre-Segment Cache implementation, though, just an
        // optimization we can make in the future.
        // Construct a request tree for each additional refresh URL. This will
        // prune away everything except the parts of the tree that match the
        // given refresh URL.
        refreshRequestPromises = [];
        const canonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(primaryUrl);
        for (const refreshUrl of separateRefreshUrls){
            if (refreshUrl === canonicalUrl) {
                continue;
            }
            // TODO: Create a scoped dynamic request tree that omits anything that
            // is not relevant to the given URL. Without doing this, the server may
            // sometimes render more data than necessary; this is not a regression
            // compared to the pre-Segment Cache implementation, though, just an
            // optimization we can make in the future.
            // const scopedDynamicRequestTree = splitTaskByURL(task, refreshUrl)
            const scopedDynamicRequestTree = dynamicRequestTree;
            if (scopedDynamicRequestTree !== null) {
                refreshRequestPromises.push(fetchMissingDynamicData(task, scopedDynamicRequestTree, new URL(refreshUrl, location.origin), // time the refresh URL was set, not the current Next-Url. Need to
                // start tracking this alongside the refresh URL. In the meantime,
                // if a refresh fails due to a mismatch, it will trigger a
                // hard refresh.
                nextUrl, freshnessPolicy, routeCacheEntry, navigationLock, map, signal));
            }
        }
    }
    // Further async operations are moved into this separate function to
    // discourage sequential network requests.
    const voidPromise = finishNavigationTask(task, nextUrl, primaryRequestPromise, refreshRequestPromises, routeCacheEntry, navigateType);
    // `finishNavigationTask` is responsible for error handling, so we can attach
    // noop callbacks to this promise.
    voidPromise.then(noop, noop);
}
async function finishNavigationTask(task, nextUrl, primaryRequestPromise, refreshRequestPromises, routeCacheEntry, navigateType) {
    // Wait for all the requests to finish, or for the first one to fail.
    let exitStatus = await waitForRequestsToFinish(primaryRequestPromise, refreshRequestPromises);
    // Once the all the requests have finished, check the tree for any remaining
    // pending tasks. If anything is still pending, it means the server response
    // does not match the client, and we must refresh to get back to a consistent
    // state. We can skip this step if we already detected a mismatch during the
    // first phase; it doesn't matter in that case because we're going to refresh
    // the whole tree regardless.
    if (exitStatus === 0) {
        exitStatus = abortRemainingPendingTasks(task, null, null);
    }
    switch(exitStatus){
        case -1:
            {
                // This navigation was superseded and its request aborted. Its cache nodes
                // may already be reused by the newer navigation, so leave them untouched
                // for the newer request to fulfill. If the tree was abandoned entirely,
                // it can be garbage collected along with its unresolved promises. We do
                // not retry or hard-navigate.
                return;
            }
        case 0:
            {
                // The task has completely finished. There's no missing data. Exit.
                previousNavigationDidMismatch = false;
                return;
            }
        case 1:
            {
                // Some data failed to finish loading. Trigger a soft retry that re-fetches
                // the tree's dynamic data.
                // TODO: As an extra precaution against soft retry loops, consider
                // tracking whether a navigation was itself triggered by a retry. If two
                // happen in a row, fall back to a hard retry.
                const isHardRetry = false;
                const primaryRequestResult = await primaryRequestPromise;
                dispatchRetryDueToTreeMismatch(isHardRetry, primaryRequestResult.url, nextUrl, primaryRequestResult.seed, task.route, routeCacheEntry, navigateType, 3);
                return;
            }
        case 3:
            {
                // The route matched, but the request was redirected, so we committed the
                // wrong canonical URL. Re-resolve the route to invalidate the now-stale
                // route cache and correct the URL — but reuse the data we already received
                // (HistoryTraversal) instead of re-fetching it. See issue #95195.
                const isHardRetry = false;
                const primaryRequestResult = await primaryRequestPromise;
                dispatchRetryDueToTreeMismatch(isHardRetry, primaryRequestResult.url, nextUrl, primaryRequestResult.seed, task.route, routeCacheEntry, navigateType, 2);
                return;
            }
        case 2:
            {
                // Some data failed to finish loading in a non-recoverable way, such as a
                // network error. Trigger an MPA navigation.
                //
                // Hard navigating/refreshing is how we prevent an infinite retry loop
                // caused by a network error — when the network fails, we fall back to the
                // browser behavior for offline navigations. In the future, Next.js may
                // introduce its own custom handling of offline navigations, but that
                // doesn't exist yet.
                const isHardRetry = true;
                const primaryRequestResult = await primaryRequestPromise;
                dispatchRetryDueToTreeMismatch(isHardRetry, primaryRequestResult.url, nextUrl, primaryRequestResult.seed, task.route, routeCacheEntry, navigateType, 3);
                return;
            }
        default:
            {
                return exitStatus;
            }
    }
}
function waitForRequestsToFinish(primaryRequestPromise, refreshRequestPromises) {
    // Custom async combinator logic. This could be replaced by Promise.any but
    // we don't assume that's available.
    //
    // Each promise resolves once the server responsds and the data is written
    // into the CacheNode tree. Resolve the combined promise once all the
    // requests finish.
    //
    // Or, resolve as soon as one of the requests fails, without waiting for the
    // others to finish.
    return new Promise((resolve)=>{
        const onFulfill = (result)=>{
            if (result.exitStatus === 0) {
                remainingCount--;
                if (remainingCount === 0) {
                    // All the requests finished successfully.
                    resolve(0);
                }
            } else {
                // One of the requests failed. Exit with a failing status.
                // NOTE: It's possible for one of the requests to fail with SoftRetry
                // and a later one to fail with HardRetry. In this case, we choose to
                // retry immediately, rather than delay the retry until all the requests
                // finish. If it fails again, we will hard retry on the next
                // attempt, anyway.
                resolve(result.exitStatus);
            }
        };
        // onReject shouldn't ever be called because fetchMissingDynamicData's
        // entire body is wrapped in a try/catch. This is just defensive.
        const onReject = ()=>resolve(2);
        // Attach the listeners to the promises.
        let remainingCount = 1;
        primaryRequestPromise.then(onFulfill, onReject);
        if (refreshRequestPromises !== null) {
            remainingCount += refreshRequestPromises.length;
            refreshRequestPromises.forEach((refreshRequestPromise)=>refreshRequestPromise.then(onFulfill, onReject));
        }
    });
}
function dispatchRetryDueToTreeMismatch(isHardRetry, retryUrl, retryNextUrl, seed, baseTree, // prediction. If the navigation results in a mismatch, we mark it as having
// a dynamic rewrite so future predictions bail out.
routeCacheEntry, originalNavigateType, // tree's dynamic data (used for genuine tree mismatches). `HistoryTraversal`
// reuses the data already in the tree (used when only the URL needs
// correcting after a redirect).
retryFreshnessPolicy) {
    // If the navigation used a route prediction, mark it as having a dynamic
    // rewrite since it resulted in a mismatch.
    if (routeCacheEntry !== null) {
        (0, _cache.markRouteEntryAsDynamicRewrite)(routeCacheEntry);
    } else if (seed !== null) {
        // Even without a direct reference to the route cache entry, we can still
        // mark the route as having a dynamic rewrite by traversing the known route
        // tree. This handles cases where the navigation didn't originate from a
        // route prediction, but still needs to mark the pattern.
        const metadataVaryPath = seed.metadataVaryPath;
        if (metadataVaryPath !== null) {
            const now = Date.now();
            (0, _optimisticroutes.discoverKnownRoute)(now, retryUrl.pathname, retryUrl.search, retryNextUrl, null, seed.routeTree, metadataVaryPath, false, (0, _createhreffromurl.createHrefFromUrl)(retryUrl), false, true // hasDynamicRewrite
            );
        }
    }
    // Invalidate all route cache entries. Other entries may have been derived
    // from the template before we knew it had a dynamic rewrite. This also
    // triggers re-prefetching of visible links.
    (0, _cache.invalidateRouteCacheEntries)(retryNextUrl, baseTree);
    // If this is the second time in a row that a navigation resulted in a
    // mismatch, fall back to a hard (MPA) refresh.
    isHardRetry = isHardRetry || previousNavigationDidMismatch;
    previousNavigationDidMismatch = true;
    // If the original navigation hasn't committed to the browser history yet
    // (the transition suspended before React committed), inherit its push/replace
    // intent. Otherwise, the pushState already ran, so use 'replace' to avoid
    // creating a duplicate history entry.
    //
    // This works because React entangles the retry's state update with the
    // original pending transition — they commit together as a single batch,
    // so the navigate type from the retry is what HistoryUpdater ultimately sees.
    //
    // TODO: Ideally this check would happen right before we schedule the React
    // update (i.e., closer to where the action is dispatched into the queue),
    // not here where the action is constructed. But the current action queue
    // doesn't provide a natural place for that. Revisit when we refactor the
    // action queue into a more reactive navigation model.
    const lastCommitted = (0, _committedstate.getLastCommittedTree)();
    const retryNavigateType = lastCommitted !== null && baseTree !== lastCommitted ? originalNavigateType : 'replace';
    const retryAction = {
        type: _routerreducertypes.ACTION_SERVER_PATCH,
        previousTree: baseTree,
        url: retryUrl,
        nextUrl: retryNextUrl,
        seed,
        mpa: isHardRetry,
        navigateType: retryNavigateType,
        freshnessPolicy: retryFreshnessPolicy
    };
    (0, _useactionqueue.dispatchAppRouterAction)(retryAction);
}
async function fetchMissingDynamicData(task, dynamicRequestTree, url, nextUrl, freshnessPolicy, routeCacheEntry, navigationLock, map, signal) {
    try {
        const result = await (0, _fetchserverresponse.fetchServerResponse)(url, {
            flightRouterState: dynamicRequestTree,
            nextUrl,
            isHmrRefresh: freshnessPolicy === 4,
            signal
        });
        if (typeof result === 'string') {
            // fetchServerResponse will return an href to indicate that the SPA
            // navigation failed. For example, if the server triggered a hard
            // redirect, or the fetch request errored. Initiate an MPA navigation
            // to the given href.
            return {
                exitStatus: 2,
                url: new URL(result, location.origin),
                seed: null
            };
        }
        const now = Date.now();
        const seed = (0, _navigation.convertServerPatchToFullTree)(now, task.route, result.flightData, result.renderedSearch, result.dynamicStaleTime);
        // If the navigation lock is active, wait for it to be released before
        // writing the dynamic data. This allows tests to assert on the prefetched
        // UI state.
        if (false) {}
        // TODO: Implement Shell extraction as part of Cached Navigations.
        // Intentionally holding off on doing this until we decide how the Cached
        // Navigations behavior should work in combination with App Shells.
        if (routeCacheEntry !== null && result.staticStageData !== null) {
            const { response: staticStageResponse, isResponsePartial } = result.staticStageData;
            (0, _cache.resolveStaleAt)(now, staticStageResponse.s).then((staleAt)=>{
                const buildId = result.responseHeaders.get(_constants.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? staticStageResponse.b;
                (0, _cache.writePrerenderResponseIntoCache)(now, _types.FetchStrategy.PPR, staticStageResponse.f, buildId, staticStageResponse.h, staticStageResponse.r ?? null, staleAt, dynamicRequestTree, result.renderedSearch, isResponsePartial, map);
            }).catch(()=>{
            // The static stage processing failed. Not fatal — the navigation
            // completed normally, we just won't write into the cache.
            });
        }
        if (routeCacheEntry !== null && result.runtimePrefetchStream !== null) {
            (0, _cache.processRuntimePrefetchStream)(now, result.runtimePrefetchStream, dynamicRequestTree, result.renderedSearch).then((processed)=>{
                if (processed !== null) {
                    (0, _cache.writeDynamicRenderResponseIntoCache)(now, _types.FetchStrategy.PPRRuntime, processed.flightDatas, processed.buildId, processed.isResponsePartial, processed.headVaryParams, processed.rootVaryParamsIterable, processed.staleAt, processed.navigationSeed, null, map);
                }
            }).catch(()=>{
            // The runtime prefetch cache write failed. Not fatal — the
            // navigation completed normally, we just won't cache runtime data.
            });
        }
        // result.dynamicStaleTime is in seconds (from the server's `d` field).
        // Convert to an absolute timestamp using the centralized helper.
        const dynamicStaleAt = (0, _bfcache.computeDynamicStaleAt)(now, result.dynamicStaleTime);
        const didReceiveUnknownParallelRoute = writeDynamicDataIntoNavigationTask(task, seed.routeTree, seed.data, seed.head, dynamicStaleAt, result.debugInfo, result.revealAfter);
        const resolvedUrl = new URL(result.canonicalUrl, location.origin);
        // Decide whether the navigation needs to be retried.
        //
        // - A tree mismatch (unknown parallel route) means the data is incomplete,
        //   so we soft-retry and re-fetch the whole tree.
        // - Otherwise, the navigation committed the canonical URL from the route
        //   cache entry it used (a prediction or prefetch). If the request resolved
        //   to a *different* canonical URL — e.g. a middleware/proxy redirect the
        //   prediction didn't account for — then the committed URL is wrong and the
        //   route cache it came from is no longer reliable (the redirect implies a
        //   server change the prediction couldn't know about, like logging in or
        //   out). We re-resolve the route to invalidate the stale cache and correct
        //   the browser URL, reusing the data we just received rather than
        //   re-fetching it. When the entry already reflects the redirect (e.g. a
        //   prefetch that followed it), the committed URL matches and no retry is
        //   needed. See issue #95195.
        let didCommitWrongUrl = false;
        if (routeCacheEntry !== null) {
            const committedUrl = new URL(routeCacheEntry.canonicalUrl, location.origin);
            didCommitWrongUrl = committedUrl.pathname !== resolvedUrl.pathname || committedUrl.search !== resolvedUrl.search;
        }
        const exitStatus = didReceiveUnknownParallelRoute ? 1 : didCommitWrongUrl ? 3 : 0;
        return {
            exitStatus,
            url: resolvedUrl,
            seed
        };
    } catch  {
        if (signal?.aborted) {
            // A newer HMR refresh superseded this one and aborted its request. Treat
            // it as canceled rather than a failure, so we don't retry or
            // hard-navigate.
            return {
                exitStatus: -1,
                url,
                seed: null
            };
        }
        // This shouldn't happen because fetchServerResponse's entire body is
        // wrapped in a try/catch. If it does, though, it implies the server failed
        // to respond with any tree at all. So we must fall back to a hard retry.
        return {
            exitStatus: 2,
            url: url,
            seed: null
        };
    }
}
function writeDynamicDataIntoNavigationTask(task, serverRouteTree, dynamicData, dynamicHead, dynamicStaleAt, debugInfo, revealAfter) {
    if (task.status === 0 && dynamicData !== null) {
        task.status = 1;
        finishPendingCacheNode(task.node, dynamicData, dynamicHead, debugInfo, revealAfter);
        // Update the BFCache entry's staleAt for this segment with the value
        // from the dynamic response. This applies the per-page
        // unstable_dynamicStaleTime if set, or the default DYNAMIC_STALETIME_MS.
        // We only update segments that received dynamic data — static segments
        // are unaffected.
        (0, _bfcache.updateBFCacheEntryStaleAt)(serverRouteTree.varyPath, dynamicStaleAt);
    }
    const taskChildren = task.children;
    const serverChildren = serverRouteTree.slots;
    const dynamicDataChildren = dynamicData !== null ? dynamicData[1] : null;
    // Detect whether the server sends a parallel route slot that the client
    // doesn't know about.
    let didReceiveUnknownParallelRoute = false;
    if (taskChildren !== null) {
        if (serverChildren !== null) {
            for (const [parallelRouteKey, serverRouteTreeChild] of serverChildren){
                const dynamicDataChild = dynamicDataChildren !== null ? dynamicDataChildren[parallelRouteKey] : null;
                const taskChild = taskChildren.get(parallelRouteKey);
                if (taskChild === undefined) {
                    // The server sent a child segment that the client doesn't know about.
                    //
                    // When we receive an unknown parallel route, we must consider it a
                    // mismatch. This is unlike the case where the segment itself
                    // mismatches, because multiple routes can be active simultaneously.
                    // But a given layout should never have a mismatching set of
                    // child slots.
                    //
                    // Theoretically, this should only happen in development during an HMR
                    // refresh, because the set of parallel routes for a layout does not
                    // change over the lifetime of a build/deployment. In production, we
                    // should have already mismatched on either the build id or the segment
                    // path. But as an extra precaution, we validate in prod, too.
                    didReceiveUnknownParallelRoute = true;
                } else {
                    const taskSegment = taskChild.route[0];
                    const serverSegment = createSegmentFromRouteTree(serverRouteTreeChild);
                    if ((0, _matchsegments.matchSegment)(serverSegment, taskSegment) && dynamicDataChild !== null && dynamicDataChild !== undefined) {
                        // Found a match for this task. Keep traversing down the task tree.
                        const childDidReceiveUnknownParallelRoute = writeDynamicDataIntoNavigationTask(taskChild, serverRouteTreeChild, dynamicDataChild, dynamicHead, dynamicStaleAt, debugInfo, revealAfter);
                        if (childDidReceiveUnknownParallelRoute) {
                            didReceiveUnknownParallelRoute = true;
                        }
                    }
                }
            }
        } else {
            if (serverChildren !== null) {
                // The server sent a child segment that the client doesn't know about.
                didReceiveUnknownParallelRoute = true;
            }
        }
    }
    return didReceiveUnknownParallelRoute;
}
function finishPendingCacheNode(cacheNode, dynamicData, dynamicHead, debugInfo, revealAfter) {
    // Writes a dynamic response into an existing Cache Node tree. This does _not_
    // create a new tree, it updates the existing tree in-place. So it must follow
    // the Suspense rules of cache safety — it can resolve pending promises, but
    // it cannot overwrite existing data. It can add segments to the tree (because
    // a missing segment will cause the layout router to suspend).
    // but it cannot delete them.
    //
    // We must resolve every promise in the tree, or else it will suspend
    // indefinitely. If we did not receive data for a segment, we will resolve its
    // data promise to `null` to trigger a lazy fetch during render.
    // Use the dynamic data from the server to fulfill the deferred RSC promise
    // on the Cache Node.
    const rsc = cacheNode.rsc;
    const dynamicSegmentData = dynamicData[0];
    if (dynamicSegmentData === null) {
        // This is an empty CacheNode; this particular server request did not
        // render this segment. There may be a separate pending request that will,
        // though, so we won't abort the task until all pending requests finish.
        return;
    }
    if (rsc === null) {
        // This is a lazy cache node. We can overwrite it. This is only safe
        // because we know that the LayoutRouter suspends if `rsc` is `null`.
        cacheNode.rsc = dynamicSegmentData;
    } else if (isDeferredRsc(rsc)) {
        // This is a deferred RSC promise. We can fulfill it with the data we just
        // received from the server. If it was already resolved by a different
        // navigation, then this does nothing because we can't overwrite data.
        //
        // In the streaming dev render, defer the fill until `revealAfter` settles,
        // so React doesn't render the boundary's children before their row has been
        // decoded (otherwise it suspends on the still-pending children and commits
        // a premature fallback). Outside that render `revealAfter` is null and we
        // resolve immediately.
        if (revealAfter !== null) {
            const resolveRsc = ()=>rsc.resolve(dynamicSegmentData, debugInfo);
            // Use the same callback for both outcomes: we don't expect `revealAfter`
            // to reject, but if it ever did (e.g. a connection drop mid-stream) we'd
            // still want to resolve the RSC.
            revealAfter.then(resolveRsc, resolveRsc);
        } else {
            rsc.resolve(dynamicSegmentData, debugInfo);
        }
    } else {
    // This is not a deferred RSC promise, nor is it empty, so it must have
    // been populated by a different navigation. We must not overwrite it.
    }
    // Check if this is a leaf segment. If so, it will have a `head` property with
    // a pending promise that needs to be resolved with the dynamic head from
    // the server.
    const head = cacheNode.head;
    if (isDeferredRsc(head)) {
        head.resolve(dynamicHead, debugInfo);
    }
}
function abortRemainingPendingTasks(task, error, debugInfo) {
    let exitStatus;
    if (task.status === 0) {
        // The data for this segment is still missing.
        task.status = 2;
        abortPendingCacheNode(task.node, error, debugInfo);
        // If the server failed to fulfill the data for this segment, it implies
        // that the route tree received from the server mismatched the tree that
        // was previously prefetched.
        //
        // In an app with fully static routes and no proxy-driven redirects or
        // rewrites, this should never happen, because the route for a URL would
        // always be the same across multiple requests. So, this implies that some
        // runtime routing condition changed, likely in a proxy, without being
        // pushed to the client.
        //
        // When this happens, we treat this the same as a refresh(). The entire
        // tree will be re-rendered from the root.
        if (task.refreshState === null) {
            // Trigger a "soft" refresh. Essentially the same as calling `refresh()`
            // in a Server Action.
            exitStatus = 1;
        } else {
            // The mismatch was discovered inside an inactive parallel route. This
            // implies the inactive parallel route is no longer reachable at the URL
            // that originally rendered it. Fall back to an MPA refresh.
            // TODO: An alternative could be to trigger a soft refresh but to _not_
            // re-use the inactive parallel routes this time. Similar to what would
            // happen if were to do a hard refrehs, but without the HTML page.
            exitStatus = 2;
        }
    } else {
        // This segment finished. (An error here is treated as Done because they are
        // surfaced to the application during render.)
        exitStatus = 0;
    }
    const taskChildren = task.children;
    if (taskChildren !== null) {
        for (const [, taskChild] of taskChildren){
            const childExitStatus = abortRemainingPendingTasks(taskChild, error, debugInfo);
            // Propagate the exit status up the tree. The statuses are ordered by
            // their precedence.
            if (childExitStatus > exitStatus) {
                exitStatus = childExitStatus;
            }
        }
    }
    return exitStatus;
}
function abortPendingCacheNode(cacheNode, error, debugInfo) {
    const rsc = cacheNode.rsc;
    if (isDeferredRsc(rsc)) {
        if (error === null) {
            // This will trigger a lazy fetch during render.
            rsc.resolve(null, debugInfo);
        } else {
            // This will trigger an error during rendering.
            rsc.reject(error, debugInfo);
        }
    }
    // Check if this is a leaf segment. If so, it will have a `head` property with
    // a pending promise that needs to be resolved. If an error was provided, we
    // will not resolve it with an error, since this is rendered at the root of
    // the app. We want the segment to error, not the entire app.
    const head = cacheNode.head;
    if (isDeferredRsc(head)) {
        head.resolve(null, debugInfo);
    }
}
const DEFERRED = Symbol();
function isDeferredRsc(value) {
    return value && typeof value === 'object' && value.tag === DEFERRED;
}
function createDeferredRsc() {
    // Create an unresolved promise that represents data derived from a Flight
    // response. The promise will be resolved later as soon as we start receiving
    // data from the server, i.e. as soon as the Flight client decodes and returns
    // the top-level response object.
    // The `_debugInfo` field contains profiling information. Promises that are
    // created by Flight already have this info added by React; for any derived
    // promise created by the router, we need to transfer the Flight debug info
    // onto the derived promise.
    //
    // The debug info represents the latency between the start of the navigation
    // and the start of rendering. (It does not represent the time it takes for
    // whole stream to finish.)
    const debugInfo = [];
    let resolve;
    let reject;
    const pendingRsc = new Promise((res, rej)=>{
        resolve = res;
        reject = rej;
    });
    pendingRsc.status = 'pending';
    pendingRsc.resolve = (value, responseDebugInfo)=>{
        if (pendingRsc.status === 'pending') {
            const fulfilledRsc = pendingRsc;
            fulfilledRsc.status = 'fulfilled';
            fulfilledRsc.value = value;
            if (responseDebugInfo !== null) {
                // Transfer the debug info to the derived promise.
                debugInfo.push.apply(debugInfo, responseDebugInfo);
            }
            resolve(value);
        }
    };
    pendingRsc.reject = (error, responseDebugInfo)=>{
        if (pendingRsc.status === 'pending') {
            const rejectedRsc = pendingRsc;
            rejectedRsc.status = 'rejected';
            rejectedRsc.reason = error;
            if (responseDebugInfo !== null) {
                // Transfer the debug info to the derived promise.
                debugInfo.push.apply(debugInfo, responseDebugInfo);
            }
            reject(error);
        }
    };
    pendingRsc.tag = DEFERRED;
    pendingRsc._debugInfo = debugInfo;
    return pendingRsc;
}
function getCurrentNavigationLock() {
    if (false) {}
    return null;
}
function beginLockedNavigation() {
    if (false) {}
    return null;
}
function resetNavigationLockToPending() {
    if (false) {}
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=ppr-navigations.js.map


/***/ }),

/***/ 22213:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function push(heap, node) {
  var index = heap.length;
  heap.push(node);
  a: for (; 0 < index; ) {
    var parentIndex = (index - 1) >>> 1,
      parent = heap[parentIndex];
    if (0 < compare(parent, node))
      (heap[parentIndex] = node), (heap[index] = parent), (index = parentIndex);
    else break a;
  }
}
function peek(heap) {
  return 0 === heap.length ? null : heap[0];
}
function pop(heap) {
  if (0 === heap.length) return null;
  var first = heap[0],
    last = heap.pop();
  if (last !== first) {
    heap[0] = last;
    a: for (
      var index = 0, length = heap.length, halfLength = length >>> 1;
      index < halfLength;

    ) {
      var leftIndex = 2 * (index + 1) - 1,
        left = heap[leftIndex],
        rightIndex = leftIndex + 1,
        right = heap[rightIndex];
      if (0 > compare(left, last))
        rightIndex < length && 0 > compare(right, left)
          ? ((heap[index] = right),
            (heap[rightIndex] = last),
            (index = rightIndex))
          : ((heap[index] = left),
            (heap[leftIndex] = last),
            (index = leftIndex));
      else if (rightIndex < length && 0 > compare(right, last))
        (heap[index] = right), (heap[rightIndex] = last), (index = rightIndex);
      else break a;
    }
  }
  return first;
}
function compare(a, b) {
  var diff = a.sortIndex - b.sortIndex;
  return 0 !== diff ? diff : a.id - b.id;
}
exports.unstable_now = void 0;
if ("object" === typeof performance && "function" === typeof performance.now) {
  var localPerformance = performance;
  exports.unstable_now = function () {
    return localPerformance.now();
  };
} else {
  var localDate = Date,
    initialTime = localDate.now();
  exports.unstable_now = function () {
    return localDate.now() - initialTime;
  };
}
var taskQueue = [],
  timerQueue = [],
  taskIdCounter = 1,
  currentTask = null,
  currentPriorityLevel = 3,
  isPerformingWork = !1,
  isHostCallbackScheduled = !1,
  isHostTimeoutScheduled = !1,
  needsPaint = !1,
  localSetTimeout = "function" === typeof setTimeout ? setTimeout : null,
  localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null,
  localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
function advanceTimers(currentTime) {
  for (var timer = peek(timerQueue); null !== timer; ) {
    if (null === timer.callback) pop(timerQueue);
    else if (timer.startTime <= currentTime)
      pop(timerQueue),
        (timer.sortIndex = timer.expirationTime),
        push(taskQueue, timer);
    else break;
    timer = peek(timerQueue);
  }
}
function handleTimeout(currentTime) {
  isHostTimeoutScheduled = !1;
  advanceTimers(currentTime);
  if (!isHostCallbackScheduled)
    if (null !== peek(taskQueue))
      (isHostCallbackScheduled = !0),
        isMessageLoopRunning ||
          ((isMessageLoopRunning = !0), schedulePerformWorkUntilDeadline());
    else {
      var firstTimer = peek(timerQueue);
      null !== firstTimer &&
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }
}
var isMessageLoopRunning = !1,
  taskTimeoutID = -1,
  frameInterval = 5,
  startTime = -1;
function shouldYieldToHost() {
  return needsPaint
    ? !0
    : exports.unstable_now() - startTime < frameInterval
      ? !1
      : !0;
}
function performWorkUntilDeadline() {
  needsPaint = !1;
  if (isMessageLoopRunning) {
    var currentTime = exports.unstable_now();
    startTime = currentTime;
    var hasMoreWork = !0;
    try {
      a: {
        isHostCallbackScheduled = !1;
        isHostTimeoutScheduled &&
          ((isHostTimeoutScheduled = !1),
          localClearTimeout(taskTimeoutID),
          (taskTimeoutID = -1));
        isPerformingWork = !0;
        var previousPriorityLevel = currentPriorityLevel;
        try {
          b: {
            advanceTimers(currentTime);
            for (
              currentTask = peek(taskQueue);
              null !== currentTask &&
              !(
                currentTask.expirationTime > currentTime && shouldYieldToHost()
              );

            ) {
              var callback = currentTask.callback;
              if ("function" === typeof callback) {
                currentTask.callback = null;
                currentPriorityLevel = currentTask.priorityLevel;
                var continuationCallback = callback(
                  currentTask.expirationTime <= currentTime
                );
                currentTime = exports.unstable_now();
                if ("function" === typeof continuationCallback) {
                  currentTask.callback = continuationCallback;
                  advanceTimers(currentTime);
                  hasMoreWork = !0;
                  break b;
                }
                currentTask === peek(taskQueue) && pop(taskQueue);
                advanceTimers(currentTime);
              } else pop(taskQueue);
              currentTask = peek(taskQueue);
            }
            if (null !== currentTask) hasMoreWork = !0;
            else {
              var firstTimer = peek(timerQueue);
              null !== firstTimer &&
                requestHostTimeout(
                  handleTimeout,
                  firstTimer.startTime - currentTime
                );
              hasMoreWork = !1;
            }
          }
          break a;
        } finally {
          (currentTask = null),
            (currentPriorityLevel = previousPriorityLevel),
            (isPerformingWork = !1);
        }
        hasMoreWork = void 0;
      }
    } finally {
      hasMoreWork
        ? schedulePerformWorkUntilDeadline()
        : (isMessageLoopRunning = !1);
    }
  }
}
var schedulePerformWorkUntilDeadline;
if ("function" === typeof localSetImmediate)
  schedulePerformWorkUntilDeadline = function () {
    localSetImmediate(performWorkUntilDeadline);
  };
else if ("undefined" !== typeof MessageChannel) {
  var channel = new MessageChannel(),
    port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  schedulePerformWorkUntilDeadline = function () {
    port.postMessage(null);
  };
} else
  schedulePerformWorkUntilDeadline = function () {
    localSetTimeout(performWorkUntilDeadline, 0);
  };
function requestHostTimeout(callback, ms) {
  taskTimeoutID = localSetTimeout(function () {
    callback(exports.unstable_now());
  }, ms);
}
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_cancelCallback = function (task) {
  task.callback = null;
};
exports.unstable_forceFrameRate = function (fps) {
  0 > fps || 125 < fps
    ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      )
    : (frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5);
};
exports.unstable_getCurrentPriorityLevel = function () {
  return currentPriorityLevel;
};
exports.unstable_next = function (eventHandler) {
  switch (currentPriorityLevel) {
    case 1:
    case 2:
    case 3:
      var priorityLevel = 3;
      break;
    default:
      priorityLevel = currentPriorityLevel;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_requestPaint = function () {
  needsPaint = !0;
};
exports.unstable_runWithPriority = function (priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      priorityLevel = 3;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_scheduleCallback = function (
  priorityLevel,
  callback,
  options
) {
  var currentTime = exports.unstable_now();
  "object" === typeof options && null !== options
    ? ((options = options.delay),
      (options =
        "number" === typeof options && 0 < options
          ? currentTime + options
          : currentTime))
    : (options = currentTime);
  switch (priorityLevel) {
    case 1:
      var timeout = -1;
      break;
    case 2:
      timeout = 250;
      break;
    case 5:
      timeout = 1073741823;
      break;
    case 4:
      timeout = 1e4;
      break;
    default:
      timeout = 5e3;
  }
  timeout = options + timeout;
  priorityLevel = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: options,
    expirationTime: timeout,
    sortIndex: -1
  };
  options > currentTime
    ? ((priorityLevel.sortIndex = options),
      push(timerQueue, priorityLevel),
      null === peek(taskQueue) &&
        priorityLevel === peek(timerQueue) &&
        (isHostTimeoutScheduled
          ? (localClearTimeout(taskTimeoutID), (taskTimeoutID = -1))
          : (isHostTimeoutScheduled = !0),
        requestHostTimeout(handleTimeout, options - currentTime)))
    : ((priorityLevel.sortIndex = timeout),
      push(taskQueue, priorityLevel),
      isHostCallbackScheduled ||
        isPerformingWork ||
        ((isHostCallbackScheduled = !0),
        isMessageLoopRunning ||
          ((isMessageLoopRunning = !0), schedulePerformWorkUntilDeadline())));
  return priorityLevel;
};
exports.unstable_shouldYield = shouldYieldToHost;
exports.unstable_wrapCallback = function (callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function () {
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;
    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
};


/***/ }),

/***/ 22909:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppRouterContext: function() {
        return AppRouterContext;
    },
    GlobalLayoutRouterContext: function() {
        return GlobalLayoutRouterContext;
    },
    LayoutRouterContext: function() {
        return LayoutRouterContext;
    },
    MissingSlotContext: function() {
        return MissingSlotContext;
    },
    TemplateContext: function() {
        return TemplateContext;
    }
});
const _interop_require_default = __webpack_require__(73623);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(12115));
const AppRouterContext = _react.default.createContext(null);
const LayoutRouterContext = _react.default.createContext(null);
const GlobalLayoutRouterContext = _react.default.createContext(null);
const TemplateContext = _react.default.createContext(null);
if (false) {}
const MissingSlotContext = _react.default.createContext(new Set()); //# sourceMappingURL=app-router-context.shared-runtime.js.map


/***/ }),

/***/ 23159:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRedirectError: function() {
        return getRedirectError;
    },
    getRedirectStatusCodeFromError: function() {
        return getRedirectStatusCodeFromError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    permanentRedirect: function() {
        return permanentRedirect;
    },
    redirect: function() {
        return redirect;
    }
});
const _redirectstatuscode = __webpack_require__(99786);
const _redirecterror = __webpack_require__(57080);
const _serverasyncstorage = __webpack_require__(72051);
function getRedirectError(url, type, statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect) {
    const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = `${_redirecterror.REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
    return error;
}
function redirect(/** The URL to redirect to */ url, type) {
    type ??= _serverasyncstorage.actionAsyncStorage?.getStore()?.isAction ? 'push' : 'replace';
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
}
function permanentRedirect(/** The URL to redirect to */ url, type = 'replace') {
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
}
function getURLFromRedirectError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(';').slice(2, -2).join(';');
}
function getRedirectTypeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return error.digest.split(';', 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return Number(error.digest.split(';').at(-2));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map


/***/ }),

/***/ 23629:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "restoreReducer", ({
    enumerable: true,
    get: function() {
        return restoreReducer;
    }
}));
const _computechangedpath = __webpack_require__(62496);
const _pprnavigations = __webpack_require__(22120);
const _navigation = __webpack_require__(20354);
const _cache = __webpack_require__(12506);
const _bfcache = __webpack_require__(80882);
function restoreReducer(state, action) {
    // This action is used to restore the router state from the history state.
    // However, it's possible that the history state no longer contains the `FlightRouterState`.
    // We will copy over the internal state on pushState/replaceState events, but if a history entry
    // occurred before hydration, or if the user navigated to a hash using a regular anchor link,
    // the history state will not contain the `FlightRouterState`.
    // In this case, we'll continue to use the existing tree so the router doesn't get into an invalid state.
    let treeToRestore;
    let renderedSearch;
    const historyState = action.historyState;
    if (historyState) {
        treeToRestore = historyState.tree;
        renderedSearch = historyState.renderedSearch;
    } else {
        treeToRestore = state.tree;
        renderedSearch = state.renderedSearch;
    }
    const currentUrl = new URL(state.canonicalUrl, location.origin);
    const restoredUrl = action.url;
    const restoredNextUrl = (0, _computechangedpath.extractPathFromFlightRouterState)(treeToRestore) ?? restoredUrl.pathname;
    const now = Date.now();
    // TODO: Store the dynamic stale time on the top-level state so it's known
    // during restores and refreshes.
    const accumulation = {
        separateRefreshUrls: null,
        scrollRef: null
    };
    const restoreSeed = (0, _navigation.convertServerPatchToFullTree)(now, treeToRestore, null, renderedSearch, _bfcache.UnknownDynamicStaleTime);
    const task = (0, _pprnavigations.startPPRNavigation)(now, currentUrl, state.renderedSearch, state.cache, state.tree, restoreSeed.routeTree, restoreSeed.metadataVaryPath, _pprnavigations.FreshnessPolicy.HistoryTraversal, null, null, restoreSeed.dynamicStaleAt, false, accumulation, _cache.segmentCacheMap, false);
    if (task === null) {
        return (0, _navigation.completeHardNavigation)(state, restoredUrl, 'replace');
    }
    (0, _pprnavigations.spawnDynamicRequests)(task, restoredUrl, restoredNextUrl, _pprnavigations.FreshnessPolicy.HistoryTraversal, accumulation, // cache entry to mark as having a dynamic rewrite on mismatch. If a
    // mismatch occurs, the retry handler will traverse the known route tree
    // to find and mark the entry.
    null, 'replace', // dynamic requests ungated (null lock) so they render from cache or fetch
    // normally rather than being withheld behind the lock.
    null, _cache.segmentCacheMap, undefined);
    // Instant Navigation Testing API: a traversal resets the lock to a fresh
    // pending scope — releasing any data withheld by prior forward navigations and
    // returning the panel to "awaiting" — without ending the testing session.
    // No-op when the testing API is disabled or no lock is held.
    (0, _pprnavigations.resetNavigationLockToPending)();
    return (0, _navigation.completeTraverseNavigation)(state, restoredUrl, renderedSearch, task.node, task.route, restoredNextUrl);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=restore-reducer.js.map


/***/ }),

/***/ 24281:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getAssetPrefix", ({
    enumerable: true,
    get: function() {
        return getAssetPrefix;
    }
}));
const _invarianterror = __webpack_require__(72299);
function getAssetPrefix() {
    const currentScript = document.currentScript;
    if (!(currentScript instanceof HTMLScriptElement)) {
        throw Object.defineProperty(new _invarianterror.InvariantError(`Expected document.currentScript to be a <script> element. Received ${currentScript} instead.`), "__NEXT_ERROR_CODE", {
            value: "E783",
            enumerable: false,
            configurable: true
        });
    }
    const { pathname } = new URL(currentScript.src);
    const nextIndex = pathname.indexOf('/_next/');
    if (nextIndex === -1) {
        throw Object.defineProperty(new _invarianterror.InvariantError(`Expected document.currentScript src to contain '/_next/'. Received ${currentScript.src} instead.`), "__NEXT_ERROR_CODE", {
            value: "E784",
            enumerable: false,
            configurable: true
        });
    }
    return pathname.slice(0, nextIndex);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=asset-prefix.js.map


/***/ }),

/***/ 24382:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// This regex contains the bots that we need to do a blocking render for and can't safely stream the response
// due to how they parse the DOM. For example, they might explicitly check for metadata in the `head` tag, so we can't stream metadata tags after the `head` was sent.
// Note: The pattern [\w-]+-Google captures all Google crawlers with "-Google" suffix (e.g., Mediapartners-Google, AdsBot-Google, Storebot-Google)
// as well as crawlers starting with "Google-" (e.g., Google-PageRenderer, Google-InspectionTool)

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "HTML_LIMITED_BOT_UA_RE", ({
    enumerable: true,
    get: function() {
        return HTML_LIMITED_BOT_UA_RE;
    }
}));
const HTML_LIMITED_BOT_UA_RE = /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight/i; //# sourceMappingURL=html-bots.js.map


/***/ }),

/***/ 24972:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    IDLE_LINK_STATUS: function() {
        return IDLE_LINK_STATUS;
    },
    PENDING_LINK_STATUS: function() {
        return PENDING_LINK_STATUS;
    },
    getLinkForCurrentNavigation: function() {
        return getLinkForCurrentNavigation;
    },
    mountFormInstance: function() {
        return mountFormInstance;
    },
    mountLinkInstance: function() {
        return mountLinkInstance;
    },
    onLinkVisibilityChanged: function() {
        return onLinkVisibilityChanged;
    },
    onNavigationIntent: function() {
        return onNavigationIntent;
    },
    pingVisibleLinks: function() {
        return pingVisibleLinks;
    },
    setLinkForCurrentNavigation: function() {
        return setLinkForCurrentNavigation;
    },
    unmountLinkForCurrentNavigation: function() {
        return unmountLinkForCurrentNavigation;
    },
    unmountPrefetchableInstance: function() {
        return unmountPrefetchableInstance;
    }
});
const _types = __webpack_require__(77565);
const _cachekey = __webpack_require__(26452);
const _scheduler = __webpack_require__(57705);
const _react = __webpack_require__(12115);
// Tracks the most recently navigated link instance. When null, indicates
// the current navigation was not initiated by a link click.
let linkForMostRecentNavigation = null;
const PENDING_LINK_STATUS = {
    pending: true
};
const IDLE_LINK_STATUS = {
    pending: false
};
function setLinkForCurrentNavigation(link) {
    (0, _react.startTransition)(()=>{
        linkForMostRecentNavigation?.setOptimisticLinkStatus(IDLE_LINK_STATUS);
        link?.setOptimisticLinkStatus(PENDING_LINK_STATUS);
        linkForMostRecentNavigation = link;
    });
}
function unmountLinkForCurrentNavigation(link) {
    if (linkForMostRecentNavigation === link) {
        linkForMostRecentNavigation = null;
    }
}
function getLinkForCurrentNavigation() {
    return linkForMostRecentNavigation;
}
// Use a WeakMap to associate a Link instance with its DOM element. This is
// used by the IntersectionObserver to track the link's visibility.
const prefetchable = typeof WeakMap === 'function' ? new WeakMap() : new Map();
// A Set of the currently visible links. We re-prefetch visible links after a
// cache invalidation, or when the current URL changes. It's a separate data
// structure from the WeakMap above because only the visible links need to
// be enumerated.
const prefetchableAndVisible = new Set();
// A single IntersectionObserver instance shared by all <Link> components.
const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(handleIntersect, {
    rootMargin: '200px'
}) : null;
function observeVisibility(element, instance) {
    const existingInstance = prefetchable.get(element);
    if (existingInstance !== undefined) {
        // This shouldn't happen because each <Link> component should have its own
        // anchor tag instance, but it's defensive coding to avoid a memory leak in
        // case there's a logical error somewhere else.
        unmountPrefetchableInstance(element);
    }
    // Only track prefetchable links that have a valid prefetch URL
    prefetchable.set(element, instance);
    if (observer !== null) {
        observer.observe(element);
    }
}
function coercePrefetchableUrl(href) {
    if (true) {
        const { createPrefetchURL } = // ast-grep-ignore: no-typeof-window-require
        __webpack_require__(28720);
        try {
            return createPrefetchURL(href);
        } catch  {
            // createPrefetchURL sometimes throws an error if an invalid URL is
            // provided, though I'm not sure if it's actually necessary.
            // TODO: Consider removing the throw from the inner function, or change it
            // to reportError. Or maybe the error isn't even necessary for automatic
            // prefetches, just navigations.
            const reportErrorFn = typeof reportError === 'function' ? reportError : console.error;
            reportErrorFn(`Cannot prefetch '${href}' because it cannot be converted to a URL.`);
            return null;
        }
    } else {}
}
function mountLinkInstance(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus, ownerStack) {
    if (prefetchEnabled) {
        const prefetchURL = coercePrefetchableUrl(href);
        if (prefetchURL !== null) {
            const instance = {
                router,
                fetchStrategy,
                isVisible: false,
                prefetchTask: null,
                prefetchHref: prefetchURL.href,
                setOptimisticLinkStatus,
                ownerStack
            };
            // We only observe the link's visibility if it's prefetchable. For
            // example, this excludes links to external URLs.
            observeVisibility(element, instance);
            return instance;
        }
    }
    // If the link is not prefetchable, we still create an instance so we can
    // track its optimistic state (i.e. useLinkStatus).
    const instance = {
        router,
        fetchStrategy,
        isVisible: false,
        prefetchTask: null,
        prefetchHref: null,
        setOptimisticLinkStatus,
        ownerStack
    };
    return instance;
}
function mountFormInstance(element, href, router, fetchStrategy) {
    const prefetchURL = coercePrefetchableUrl(href);
    if (prefetchURL === null) {
        // This href is not prefetchable, so we don't track it.
        // TODO: We currently observe/unobserve a form every time its href changes.
        // For Links, this isn't a big deal because the href doesn't usually change,
        // but for forms it's extremely common. We should optimize this.
        return;
    }
    const instance = {
        router,
        fetchStrategy,
        isVisible: false,
        prefetchTask: null,
        prefetchHref: prefetchURL.href,
        setOptimisticLinkStatus: null
    };
    observeVisibility(element, instance);
}
function unmountPrefetchableInstance(element) {
    const instance = prefetchable.get(element);
    if (instance !== undefined) {
        prefetchable.delete(element);
        prefetchableAndVisible.delete(instance);
        const prefetchTask = instance.prefetchTask;
        if (prefetchTask !== null) {
            (0, _scheduler.cancelPrefetchTask)(prefetchTask);
        }
    }
    if (observer !== null) {
        observer.unobserve(element);
    }
}
function handleIntersect(entries) {
    // Process the entries in reverse order. The prefetch scheduler assigns the
    // highest priority to the most recently scheduled task, so whichever link we
    // schedule *last* wins. When multiple links enter the viewport at once (e.g.
    // on initial load), the observer reports them in document order, so iterating
    // in reverse means the link nearest the top of the document is scheduled last
    // and therefore prioritized. The topmost link isn't guaranteed to be the most
    // important, but as a default heuristic it's more reasonable than prioritizing
    // whichever link happens to be lowest in the document.
    for(let i = entries.length - 1; i >= 0; i--){
        const entry = entries[i];
        // Some extremely old browsers or polyfills don't reliably support
        // isIntersecting so we check intersectionRatio instead. (Do we care? Not
        // really. But whatever this is fine.)
        const isVisible = entry.intersectionRatio > 0;
        onLinkVisibilityChanged(entry.target, isVisible);
    }
}
function onLinkVisibilityChanged(element, isVisible) {
    if (false) {}
    const instance = prefetchable.get(element);
    if (instance === undefined) {
        return;
    }
    instance.isVisible = isVisible;
    if (isVisible) {
        prefetchableAndVisible.add(instance);
    } else {
        prefetchableAndVisible.delete(instance);
    }
    rescheduleLinkPrefetch(instance, _types.PrefetchPriority.Default);
}
function onNavigationIntent(element, unstable_upgradeToDynamicPrefetch) {
    const instance = prefetchable.get(element);
    if (instance === undefined) {
        return;
    }
    // Prefetch the link on hover/touchstart.
    if (instance !== undefined) {
        if (false) {}
        rescheduleLinkPrefetch(instance, _types.PrefetchPriority.Intent);
    }
}
function rescheduleLinkPrefetch(instance, priority) {
    // Ensures that app-router-instance is not compiled in the server bundle
    if (true) {
        const existingPrefetchTask = instance.prefetchTask;
        if (!instance.isVisible) {
            // Cancel any in-progress prefetch task. (If it already finished then this
            // is a no-op.)
            if (existingPrefetchTask !== null) {
                (0, _scheduler.cancelPrefetchTask)(existingPrefetchTask);
            }
            // We don't need to reset the prefetchTask to null upon cancellation; an
            // old task object can be rescheduled with reschedulePrefetchTask. This is a
            // micro-optimization but also makes the code simpler (don't need to
            // worry about whether an old task object is stale).
            return;
        }
        const { getCurrentAppRouterState } = // ast-grep-ignore: no-typeof-window-require
        __webpack_require__(70156);
        const appRouterState = getCurrentAppRouterState();
        if (appRouterState !== null) {
            const treeAtTimeOfPrefetch = appRouterState.tree;
            if (existingPrefetchTask === null) {
                // Initiate a prefetch task.
                const nextUrl = appRouterState.nextUrl;
                const cacheKey = (0, _cachekey.createCacheKey)(instance.prefetchHref, nextUrl);
                instance.prefetchTask = (0, _scheduler.schedulePrefetchTask)(cacheKey, treeAtTimeOfPrefetch, instance.fetchStrategy, priority, null, null // navigationLockPrefetch
                );
            } else {
                // We already have an old task object that we can reschedule. This is
                // effectively the same as canceling the old task and creating a new one.
                (0, _scheduler.reschedulePrefetchTask)(existingPrefetchTask, treeAtTimeOfPrefetch, instance.fetchStrategy, priority);
            }
        }
    }
}
function pingVisibleLinks(nextUrl, tree) {
    // For each currently visible link, cancel the existing prefetch task (if it
    // exists) and schedule a new one. This is effectively the same as if all the
    // visible links left and then re-entered the viewport.
    //
    // This is called when the Next-Url or the base tree changes, since those
    // may affect the result of a prefetch task. It's also called after a
    // cache invalidation.
    for (const instance of prefetchableAndVisible){
        const task = instance.prefetchTask;
        if (task !== null && !(0, _scheduler.isPrefetchTaskDirty)(task, nextUrl, tree)) {
            continue;
        }
        // Something changed. Cancel the existing prefetch task and schedule a
        // new one.
        if (task !== null) {
            (0, _scheduler.cancelPrefetchTask)(task);
        }
        const cacheKey = (0, _cachekey.createCacheKey)(instance.prefetchHref, nextUrl);
        instance.prefetchTask = (0, _scheduler.schedulePrefetchTask)(cacheKey, tree, instance.fetchStrategy, _types.PrefetchPriority.Default, null, null // navigationLockPrefetch
        );
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=links.js.map


/***/ }),

/***/ 26452:
/***/ ((module, exports) => {

"use strict";
// TypeScript trick to simulate opaque types, like in Flow.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createCacheKey: function() {
        return createCacheKey;
    },
    splitPathnameIntoParts: function() {
        return splitPathnameIntoParts;
    }
});
function createCacheKey(originalHref, nextUrl) {
    const originalUrl = new URL(originalHref);
    const cacheKey = {
        pathname: originalUrl.pathname,
        search: originalUrl.search,
        nextUrl: nextUrl
    };
    return cacheKey;
}
function splitPathnameIntoParts(pathname) {
    const parts = [];
    let start = 0;
    for(let i = 0; i < pathname.length; i++){
        if (pathname.charCodeAt(i) === 47 /* '/' */ ) {
            if (i > start) {
                parts.push(pathname.slice(start, i));
            }
            start = i + 1;
        }
    }
    if (start < pathname.length) {
        parts.push(pathname.slice(start));
    }
    return parts;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=cache-key.js.map


/***/ }),

/***/ 26672:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
// This module can be shared between both pages router and app router

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isRecoverableError: function() {
        return isRecoverableError;
    },
    onRecoverableError: function() {
        return onRecoverableError;
    }
});
const _interop_require_default = __webpack_require__(73623);
const _bailouttocsr = __webpack_require__(1980);
const _iserror = /*#__PURE__*/ _interop_require_default._(__webpack_require__(36981));
const _reportglobalerror = __webpack_require__(63008);
const recoverableErrors = new WeakSet();
const isInstantTest =  false && 0;
function isRecoverableError(error) {
    return recoverableErrors.has(error);
}
const onRecoverableError = (error)=>{
    // x-ref: https://github.com/facebook/react/pull/28736
    let cause = (0, _iserror.default)(error) && 'cause' in error ? error.cause : error;
    // Skip certain custom errors which are not expected to be reported on client
    if ((0, _bailouttocsr.isBailoutToCSRError)(cause)) return;
    // Instant Navigation Testing API: suppress "server could not finish this
    // Suspense boundary" errors (React error #419) during instant test mode.
    // The static shell intentionally has incomplete Suspense boundaries — React
    // correctly falls back to client rendering, which is expected.
    if (isInstantTest) {
        if ((0, _iserror.default)(cause)) {
            if (true) {
                if (cause.message.includes('#419')) return;
            } else {}
        }
    }
    if (false) {}
    (0, _reportglobalerror.reportGlobalError)(cause);
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=on-recoverable-error.js.map


/***/ }),

/***/ 27123:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _default;
    }
}));
const _interop_require_default = __webpack_require__(73623);
const _jsxruntime = __webpack_require__(95155);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(12115));
const _handleisrerror = __webpack_require__(38149);
const _errorstyles = __webpack_require__(82676);
function DefaultGlobalError({ error }) {
    const digest = error?.digest;
    const isServerError = !!digest;
    const message = isServerError ? 'A server error occurred. Reload to try again.' : 'Reload to try again, or go back.';
    (0, _handleisrerror.handleISRError)({
        error
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("html", {
        id: "__next_error__",
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("head", {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)("style", {
                    dangerouslySetInnerHTML: {
                        __html: _errorstyles.errorThemeCss
                    }
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("body", {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        style: _errorstyles.errorStyles.container,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                            style: _errorstyles.errorStyles.card,
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorstyles.WarningIcon, {}),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("h1", {
                                    style: _errorstyles.errorStyles.title,
                                    children: "This page couldn’t load"
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("p", {
                                    style: _errorstyles.errorStyles.message,
                                    children: message
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                                    style: _errorstyles.errorStyles.buttonGroup,
                                    children: [
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)("form", {
                                            style: _errorstyles.errorStyles.form,
                                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)("button", {
                                                type: "submit",
                                                style: _errorstyles.errorStyles.button,
                                                children: "Reload"
                                            })
                                        }),
                                        !isServerError && /*#__PURE__*/ (0, _jsxruntime.jsx)("button", {
                                            type: "button",
                                            style: _errorstyles.errorStyles.buttonSecondary,
                                            onClick: ()=>{
                                                if (window.history.length > 1) {
                                                    window.history.back();
                                                } else {
                                                    window.location.href = '/';
                                                }
                                            },
                                            children: "Back"
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    digest && /*#__PURE__*/ (0, _jsxruntime.jsxs)("p", {
                        style: _errorstyles.errorStyles.digestFooter,
                        children: [
                            "ERROR ",
                            digest
                        ]
                    })
                ]
            })
        ]
    });
}
const _default = DefaultGlobalError;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=global-error.js.map


/***/ }),

/***/ 28720:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createPrefetchURL: function() {
        return createPrefetchURL;
    },
    isExternalURL: function() {
        return isExternalURL;
    }
});
const _isbot = __webpack_require__(98080);
const _addbasepath = __webpack_require__(70127);
function isExternalURL(url) {
    return url.origin !== window.location.origin;
}
function createPrefetchURL(href) {
    // Don't prefetch for bots as they don't navigate.
    if ((0, _isbot.isBot)(window.navigator.userAgent)) {
        return null;
    }
    let url;
    try {
        url = new URL((0, _addbasepath.addBasePath)(href), window.location.href);
    } catch (_) {
        // TODO: Does this need to throw or can we just console.error instead? Does
        // anyone rely on this throwing? (Seems unlikely.)
        throw Object.defineProperty(new Error(`Cannot prefetch '${href}' because it cannot be converted to a URL.`), "__NEXT_ERROR_CODE", {
            value: "E234",
            enumerable: false,
            configurable: true
        });
    }
    // Don't prefetch during development (improves compilation performance)
    if (false) {}
    // External urls can't be prefetched in the same way.
    if (isExternalURL(url)) {
        return null;
    }
    return url;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-utils.js.map


/***/ }),

/***/ 28796:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createFetch: function() {
        return createFetch;
    },
    createFromNextReadableStream: function() {
        return createFromNextReadableStream;
    },
    decodeBufferedStage: function() {
        return decodeBufferedStage;
    },
    decodeStageUntilBoundary: function() {
        return decodeStageUntilBoundary;
    },
    fetchServerResponse: function() {
        return fetchServerResponse;
    },
    processFetch: function() {
        return processFetch;
    },
    resolveShellStageData: function() {
        return resolveShellStageData;
    },
    resolveStaticStageData: function() {
        return resolveStaticStageData;
    }
});
const _client = __webpack_require__(77197);
const _invarianterror = __webpack_require__(72299);
const _fetch = __webpack_require__(11132);
const _approuterheaders = __webpack_require__(15563);
const _appcallserver = __webpack_require__(77304);
const _appfindsourcemapurl = __webpack_require__(4060);
const _flightdatahelpers = __webpack_require__(4103);
const _setcachebustingsearchparam = __webpack_require__(32071);
const _routeparams = __webpack_require__(84536);
const _deploymentid = __webpack_require__(53887);
const _navigationbuildid = __webpack_require__(97797);
const _constants = __webpack_require__(7103);
const _cache = __webpack_require__(12506);
const _bfcache = __webpack_require__(80882);
const createFromReadableStream = _client.createFromReadableStream;
const createFromFetch = _client.createFromFetch;
let createDebugChannel;
if (false) {}
function doMpaNavigation(url) {
    return (0, _routeparams.urlToUrlWithoutFlightMarker)(new URL(url, location.origin)).toString();
}
let isPageUnloading = false;
if (true) {
    // Track when the page is unloading, e.g. due to reloading the page or
    // performing hard navigations. This allows us to suppress error logging when
    // the browser cancels in-flight requests during page unload.
    window.addEventListener('pagehide', ()=>{
        isPageUnloading = true;
    });
    // Reset the flag on pageshow, e.g. when navigating back and the JavaScript
    // execution context is restored by the browser.
    window.addEventListener('pageshow', ()=>{
        isPageUnloading = false;
    });
}
async function fetchServerResponse(url, options) {
    const { flightRouterState, nextUrl } = options;
    const headers = {
        // Enable flight response
        [_approuterheaders.RSC_HEADER]: '1',
        // Provide the current router state
        [_approuterheaders.NEXT_ROUTER_STATE_TREE_HEADER]: (0, _flightdatahelpers.prepareFlightRouterStateForRequest)(flightRouterState, options.isHmrRefresh)
    };
    if (false) {}
    if (nextUrl) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
    }
    // In static export mode, we need to modify the URL to request the .txt file,
    // but we should preserve the original URL for the canonical URL and error handling.
    const originalUrl = url;
    try {
        if (true) {
            if (false) {}
        }
        // Typically, during a navigation, we decode the response using Flight's
        // `createFromFetch` API, which accepts a `fetch` promise.
        // TODO: Remove this check once the old PPR flag is removed
        const isLegacyPPR =  false && 0;
        const shouldImmediatelyDecode = !isLegacyPPR;
        const res = await createFetch(url, headers, 'auto', shouldImmediatelyDecode, options.signal);
        // If the fetch succeeds while we're in the offline state, notify the
        // offline module so it can short-circuit the polling loop.
        if (false) {}
        const responseUrl = (0, _routeparams.urlToUrlWithoutFlightMarker)(new URL(res.url));
        const canonicalUrl = res.redirected ? responseUrl : originalUrl;
        const contentType = res.headers.get('content-type') || '';
        const interception = !!res.headers.get('vary')?.includes(_approuterheaders.NEXT_URL);
        const postponed = !!res.headers.get(_approuterheaders.NEXT_DID_POSTPONE_HEADER);
        let isFlightResponse = contentType.startsWith(_approuterheaders.RSC_CONTENT_TYPE_HEADER);
        if (true) {
            if (false) {}
        }
        // If fetch returns something different than flight response handle it like a mpa navigation
        // If the fetch was not 200, we also handle it like a mpa navigation
        if (!isFlightResponse || !res.ok || !res.body) {
            // in case the original URL came with a hash, preserve it before redirecting to the new URL
            if (url.hash) {
                responseUrl.hash = url.hash;
            }
            return doMpaNavigation(responseUrl.toString());
        }
        // We may navigate to a page that requires a different Webpack runtime.
        // In prod, every page will have the same Webpack runtime.
        // In dev, the Webpack runtime is minimal for each page.
        // We need to ensure the Webpack runtime is updated before executing client-side JS of the new page.
        // TODO: This needs to happen in the Flight Client.
        // Or Webpack needs to include the runtime update in the Flight response as
        // a blocking script.
        if (false) {}
        let flightResponsePromise = res.flightResponsePromise;
        if (flightResponsePromise === null) {
            // Typically, `createFetch` would have already started decoding the
            // Flight response. If it hasn't, though, we need to decode it now.
            // TODO: This should only be reachable if legacy PPR is enabled (i.e. PPR
            // without Cache Components). Remove this branch once legacy PPR
            // is deleted.
            flightResponsePromise = createFromNextReadableStream(res.body, headers, {
                allowPartialStream: postponed
            });
        }
        const [flightResponse, cacheData] = await Promise.all([
            flightResponsePromise,
            res.cacheData
        ]);
        if ((res.headers.get(_constants.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? flightResponse.b) !== (0, _navigationbuildid.getNavigationBuildId)()) {
            // The server build does not match the client build.
            return doMpaNavigation(res.url);
        }
        const normalizedFlightData = (0, _flightdatahelpers.normalizeFlightData)(flightResponse.f);
        if (typeof normalizedFlightData === 'string') {
            return doMpaNavigation(normalizedFlightData);
        }
        const staticStageData = cacheData !== null ? await resolveStaticStageData(cacheData, flightResponse, headers) : null;
        return {
            flightData: normalizedFlightData,
            canonicalUrl: canonicalUrl,
            // TODO: We should be able to read this from the rewrite header, not the
            // Flight response. Theoretically they should always agree, but there are
            // currently some cases where it's incorrect for interception routes. We
            // can always trust the value in the response body. However, per-segment
            // prefetch responses don't embed the value in the body; they rely on the
            // header alone. So we need to investigate why the header is sometimes
            // wrong for interception routes.
            renderedSearch: flightResponse.q,
            couldBeIntercepted: interception,
            supportsPerSegmentPrefetching: flightResponse.S,
            postponed,
            // The dynamicStaleTime is only present in the response body when
            // a page exports unstable_dynamicStaleTime and this is a dynamic render.
            // When absent (UnknownDynamicStaleTime), the client falls back to the
            // global DYNAMIC_STALETIME_MS. The value is in seconds.
            dynamicStaleTime: flightResponse.d ?? _bfcache.UnknownDynamicStaleTime,
            staticStageData,
            runtimePrefetchStream: flightResponse.p ?? null,
            responseHeaders: res.headers,
            debugInfo: flightResponsePromise._debugInfo ?? null,
            revealAfter: flightResponse._revealAfter ?? null
        };
    } catch (err) {
        if (options.signal?.aborted) {
            // A newer HMR refresh superseded this one and aborted its request.
            // Rethrow so the caller treats it as canceled, rather than logging a
            // failure or falling back to an MPA navigation.
            throw err;
        }
        // If the fetch rejected due to a network error, wait for connectivity
        // to be restored and then retry. checkOfflineError returns true for
        // network errors (and starts the polling loop); returns false for
        // intentional aborts/timeouts, which fall through to the MPA fallback.
        //
        // Note: when the user navigates multiple times while offline, each
        // navigation queues a separate retry here. Once connectivity returns,
        // all pending retries resume simultaneously. This is mitigated in PR 3
        // by reusing back-forward cache entries during offline navigation, which
        // avoids issuing new fetches in the first place.
        if (false) {}
        if (!isPageUnloading) {
            console.error(`Failed to fetch RSC payload for ${originalUrl}. Falling back to browser navigation.`, err);
        }
        // If fetch fails handle it like a mpa navigation
        // TODO-APP: Add a test for the case where a CORS request fails, e.g. external url redirect coming from the response.
        // See https://github.com/vercel/next.js/issues/43605#issuecomment-1451617521 for a reproduction.
        return originalUrl.toString();
    }
}
async function processFetch(response) {
    if (false) {}
    return {
        response,
        cacheData: null
    };
}
async function resolveStaticStageData(cacheData, flightResponse, headers) {
    const { isResponsePartial, staticBodyClone } = cacheData;
    if (staticBodyClone) {
        if (!isResponsePartial) {
            // Fully static — cache the entire decoded response as-is.
            staticBodyClone.cancel();
            return {
                response: flightResponse,
                isResponsePartial: false
            };
        }
        if (flightResponse.l !== undefined) {
            // Partially static — truncate the body clone at the byte boundary and
            // decode it.
            const staticStageByteLength = await flightResponse.l;
            const response = await decodeStageUntilBoundary(staticBodyClone, staticStageByteLength, headers);
            return {
                response,
                isResponsePartial: true
            };
        }
        // No caching — cancel the unused clone.
        staticBodyClone.cancel();
    }
    return null;
}
async function resolveShellStageData(cacheData, flightResponse, headers) {
    const { shellBodyClone } = cacheData;
    if (!shellBodyClone) {
        return null;
    }
    if (flightResponse.a === undefined) {
        shellBodyClone.cancel();
        return null;
    }
    const shellByteLength = await flightResponse.a;
    if (shellByteLength === null) {
        // Shell == main response — caller reuses the existing flightResponse.
        shellBodyClone.cancel();
        return null;
    }
    return decodeStageUntilBoundary(shellBodyClone, shellByteLength, headers);
}
async function decodeStageUntilBoundary(responseBodyClone, byteLength, headers) {
    const { buffer } = await (0, _cache.createNonTaskyPrefetchResponseStream)(responseBodyClone, byteLength);
    return decodeBufferedStage(buffer, headers);
}
function decodeBufferedStage(buffer, headers) {
    const stream = new ReadableStream({
        start (controller) {
            controller.enqueue(buffer);
            controller.close();
        }
    });
    return createFromNextReadableStream(stream, headers, {
        allowPartialStream: true
    });
}
// When an HMR refresh can be superseded, we decode its Flight response through
// a wrapper stream we can close on abort. Closing the stream (rather than
// letting the aborted fetch error it) makes React's Flight client mark
// unresolved rows as halted: they suspend during render instead of rejecting,
// so a superseded request never surfaces an error on an already-committed tree.
// Because the stream is closed, there's also no unclosed-stream GC-root leak
// (see #89610). The wrapper is created synchronously here so that the decode
// starts at the same point `createFromNextFetch` would, preserving the
// server-latency debug timing.
function createHaltingFlightResponse(fetchPromise, headers, signal) {
    let closed = false;
    let reader = null;
    const wrapper = new ReadableStream({
        start (controller) {
            const onAbort = ()=>{
                closed = true;
                try {
                    controller.close();
                } catch  {
                // The controller may already be closed; nothing to do.
                }
                if (reader !== null) {
                    reader.cancel().catch(()=>{});
                }
            };
            if (signal.aborted) {
                onAbort();
            } else {
                signal.addEventListener('abort', onAbort, {
                    once: true
                });
            }
        },
        async pull (controller) {
            if (closed) {
                return;
            }
            if (reader === null) {
                let response;
                try {
                    response = await fetchPromise;
                } catch (err) {
                    // We don't inspect `err`. If the request was superseded, `onAbort`
                    // already ran synchronously (abort listeners fire during
                    // `signal.abort()`, before this rejection microtask), so `closed` is
                    // true and the controller is already closed — erroring it would
                    // throw, and a superseded request's failure is moot regardless of its
                    // cause. Only a genuine, non-superseded failure reaches here with
                    // `closed` still false; that is the case we surface.
                    if (!closed) {
                        controller.error(err);
                    }
                    return;
                }
                if (closed) {
                    // Aborted while awaiting the response. The `fetch` abort tears down
                    // an in-flight request, but if it had already completed we still hold
                    // an unread body; release it so it isn't left dangling.
                    response.body?.cancel().catch(()=>{});
                    return;
                }
                const body = response.body;
                if (body === null) {
                    controller.close();
                    return;
                }
                reader = body.getReader();
            }
            try {
                const { done, value } = await reader.read();
                if (closed) {
                    return;
                }
                if (done) {
                    controller.close();
                } else {
                    controller.enqueue(value);
                }
            } catch (err) {
                // Same as the fetch catch above: once superseded (`closed`) the
                // controller is already closed and the outcome is moot, so we swallow
                // the rejection unconditionally; only a real, non-superseded read
                // failure (`closed` still false) is surfaced.
                if (!closed) {
                    controller.error(err);
                }
            }
        }
    });
    // React attaches `_debugInfo` to the returned promise at runtime.
    return createFromNextReadableStream(wrapper, headers, {
        allowPartialStream: true
    });
}
// Selects the Flight decode strategy: a halting wrapper for cancellable HMR
// refreshes, otherwise the standard fetch-based decode. Gated to the dev server
// (where HMR runs) so the wrapper is eliminated from production and
// `--debug-prerender` bundles regardless of the flag.
function decodeFlightResponse(fetchPromise, headers, signal) {
    if (false) {}
    return createFromNextFetch(fetchPromise, headers);
}
async function createFetch(url, headers, fetchPriority, shouldImmediatelyDecode, signal) {
    // TODO: In output: "export" mode, the headers do nothing. Omit them (and the
    // cache busting search param) from the request so they're
    // maximally cacheable.
    if (false) {}
    const deploymentId = (0, _deploymentid.getDeploymentId)();
    if (deploymentId) {
        headers['x-deployment-id'] = deploymentId;
    }
    if (false) {}
    const fetchOptions = {
        // Backwards compat for older browsers. `same-origin` is the default in modern browsers.
        credentials: 'same-origin',
        headers,
        priority: fetchPriority || undefined,
        signal
    };
    // `fetchUrl` is slightly different from `url` because we add a cache-busting
    // search param to it. This should not leak outside of this function, so we
    // track them separately.
    let fetchUrl = new URL(url);
    await (0, _setcachebustingsearchparam.setCacheBustingSearchParam)(fetchUrl, headers);
    let processed = (0, _fetch.fetch)(fetchUrl, fetchOptions).then(processFetch);
    let fetchPromise = processed.then(({ response })=>response);
    // Immediately pass the fetch promise to the Flight client so that the debug
    // info includes the latency from the client to the server. The internal timer
    // in React starts as soon as `createFromFetch` is called.
    //
    // The only case where we don't do this is during a prefetch, because a
    // top-level prefetch response never blocks a navigation; if it hasn't already
    // been written into the cache by the time the navigation happens, the router
    // will go straight to a dynamic request.
    let flightResponsePromise = shouldImmediatelyDecode ? decodeFlightResponse(fetchPromise, headers, signal) : null;
    let browserResponse = await fetchPromise;
    // If the server responds with a redirect (e.g. 307), and the redirected
    // location does not contain the cache busting search param set in the
    // original request, the response is likely invalid — when following the
    // redirect, the browser forwards the request headers, but since the cache
    // busting search param is missing, the server will reject the request due to
    // a mismatch.
    //
    // Ideally, we would be able to intercept the redirect response and perform it
    // manually, instead of letting the browser automatically follow it, but this
    // is not allowed by the fetch API.
    //
    // So instead, we must "replay" the redirect by fetching the new location
    // again, but this time we'll append the cache busting search param to prevent
    // a mismatch.
    //
    // TODO: We can optimize Next.js's built-in middleware APIs by returning a
    // custom status code, to prevent the browser from automatically following it.
    //
    // This does not affect Server Action-based redirects; those are encoded
    // differently, as part of the Flight body. It only affects redirects that
    // occur in a middleware or a third-party proxy.
    let redirected = browserResponse.redirected;
    if (true) {
        // This is to prevent a redirect loop. Same limit used by Chrome.
        const MAX_REDIRECTS = 20;
        for(let n = 0; n < MAX_REDIRECTS; n++){
            if (!browserResponse.redirected) {
                break;
            }
            const responseUrl = new URL(browserResponse.url, fetchUrl);
            if (responseUrl.origin !== fetchUrl.origin) {
                break;
            }
            if (responseUrl.searchParams.get(_approuterheaders.NEXT_RSC_UNION_QUERY) === fetchUrl.searchParams.get(_approuterheaders.NEXT_RSC_UNION_QUERY)) {
                break;
            }
            // The RSC request was redirected. Assume the response is invalid.
            //
            // Append the cache busting search param to the redirected URL and
            // fetch again.
            // TODO: We should abort the previous request.
            fetchUrl = new URL(responseUrl);
            await (0, _setcachebustingsearchparam.setCacheBustingSearchParam)(fetchUrl, headers);
            processed = (0, _fetch.fetch)(fetchUrl, fetchOptions).then(processFetch);
            fetchPromise = processed.then(({ response })=>response);
            flightResponsePromise = shouldImmediatelyDecode ? decodeFlightResponse(fetchPromise, headers, signal) : null;
            browserResponse = await fetchPromise;
            // We just performed a manual redirect, so this is now true.
            redirected = true;
        }
    }
    // Remove the cache busting search param from the response URL, to prevent it
    // from leaking outside of this function.
    const responseUrl = new URL(browserResponse.url, fetchUrl);
    responseUrl.searchParams.delete(_approuterheaders.NEXT_RSC_UNION_QUERY);
    const rscResponse = {
        url: responseUrl.href,
        // This is true if any redirects occurred, either automatically by the
        // browser, or manually by us. So it's different from
        // `browserResponse.redirected`, which only tells us whether the browser
        // followed a redirect, and only for the last response in the chain.
        redirected,
        // These can be copied from the last browser response we received. We
        // intentionally only expose the subset of fields that are actually used
        // elsewhere in the codebase.
        ok: browserResponse.ok,
        headers: browserResponse.headers,
        body: browserResponse.body,
        status: browserResponse.status,
        // This is the exact promise returned by `createFromFetch`. It contains
        // debug information that we need to transfer to any derived promises that
        // are later rendered by React.
        flightResponsePromise: flightResponsePromise,
        cacheData: processed.then(({ cacheData })=>cacheData)
    };
    return rscResponse;
}
function createFromNextReadableStream(flightStream, requestHeaders, options) {
    return createFromReadableStream(flightStream, {
        callServer: _appcallserver.callServer,
        findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
        debugChannel: createDebugChannel && createDebugChannel(requestHeaders),
        unstable_allowPartialStream: options?.allowPartialStream
    });
}
function createFromNextFetch(promiseForResponse, requestHeaders) {
    return createFromFetch(promiseForResponse, {
        callServer: _appcallserver.callServer,
        findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
        debugChannel: createDebugChannel && createDebugChannel(requestHeaders)
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fetch-server-response.js.map


/***/ }),

/***/ 28854:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Vary Params Decoding
 *
 * This module is shared between server and client.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "readVaryParams", ({
    enumerable: true,
    get: function() {
        return readVaryParams;
    }
}));
/**
 * Synchronously drains a vary params `AsyncIterable`, adding each yielded name
 * to `target`.
 *
 * By the time this runs (on the client, or in collectSegmentData), the Flight
 * stream has been fully buffered, so every yielded value is already
 * materialized and can be read without awaiting. We force each iterator result
 * to resolve synchronously using the same `.then(noop)` trick React uses
 * internally, then read its `status`/`value` directly.
 *
 * We add "every param yielded up to the point the stream suspends": a
 * normally-closed iterable drains fully, while one left hanging (a sync-I/O
 * abort, or a `close()` whose row hasn't flushed yet) drains to the prefix
 * already in the stream. Both are correct — a segment's param accesses are all
 * flushed as they happen during its render, so the prefix is exactly the set
 * the response depends on. We therefore never need the terminating `done` row
 * to be present; it's only stream hygiene.
 */ function drainVaryParams(iterable, target) {
    const iterator = iterable[Symbol.asyncIterator]();
    while(true){
        const chunk = iterator.next();
        // Attach a no-op listener to force Flight to synchronously resolve the
        // chunk. A freshly-arrived result may be in an intermediate
        // 'resolved_model' state (data received but not unwrapped); calling
        // .then() transitions it to 'fulfilled', making the value available
        // synchronously. (A native Promise has no `status` and simply reads as
        // not-fulfilled below, so this can never hang.)
        chunk.then(noop, noop);
        if (chunk.status !== 'fulfilled' || chunk.value === undefined) {
            // The stream suspended here. Everything yielded before this point has
            // already been added.
            return;
        }
        const step = chunk.value;
        if (step.done) {
            return;
        }
        target.add(step.value);
    }
}
function readVaryParams(iterable, rootIterable) {
    if (iterable === null || iterable === undefined || rootIterable === null || rootIterable === undefined) {
        return null;
    }
    const varyParams = new Set();
    drainVaryParams(iterable, varyParams);
    drainVaryParams(rootIterable, varyParams);
    return varyParams;
}
const noop = ()=>{}; //# sourceMappingURL=vary-params-decoding.js.map


/***/ }),

/***/ 29453:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createHrefFromUrl", ({
    enumerable: true,
    get: function() {
        return createHrefFromUrl;
    }
}));
function createHrefFromUrl(url, includeHash = true) {
    return url.pathname + url.search + (includeHash ? url.hash : '');
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-href-from-url.js.map


/***/ }),

/***/ 29940:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addPathPrefix", ({
    enumerable: true,
    get: function() {
        return addPathPrefix;
    }
}));
const _parsepath = __webpack_require__(52697);
function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return `${prefix}${pathname}${query}${hash}`;
} //# sourceMappingURL=add-path-prefix.js.map


/***/ }),

/***/ 32025:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createInitialRouterState", ({
    enumerable: true,
    get: function() {
        return createInitialRouterState;
    }
}));
const _createhreffromurl = __webpack_require__(29453);
const _computechangedpath = __webpack_require__(62496);
const _flightdatahelpers = __webpack_require__(4103);
const _pprnavigations = __webpack_require__(22120);
const _cache = __webpack_require__(12506);
const _types = __webpack_require__(77565);
const _bfcache = __webpack_require__(80882);
const _fetchserverresponse = __webpack_require__(28796);
const _optimisticroutes = __webpack_require__(68378);
function createInitialRouterState({ navigatedAt, initialRSCPayload, initialFlightStreamForCache, location }) {
    const { c: initialCanonicalUrlParts, f: initialFlightData, q: initialRenderedSearch, i: initialCouldBeIntercepted, S: initialSupportsPerSegmentPrefetching, s: initialStaleTime, l: initialStaticStageByteLength, h: initialHeadVaryParams, r: initialRootVaryParams, p: initialRuntimePrefetchStream, d: initialDynamicStaleTimeSeconds } = initialRSCPayload;
    // When initialized on the server, the canonical URL is provided as an array of parts.
    // This is to ensure that when the RSC payload streamed to the client, crawlers don't interpret it
    // as a URL that should be crawled.
    const initialCanonicalUrl = initialCanonicalUrlParts.join('/');
    const normalizedFlightData = (0, _flightdatahelpers.getFlightDataPartsFromPath)(initialFlightData[0]);
    const { tree: initialTree, seedData: initialSeedData, head: initialHead } = normalizedFlightData;
    // For the SSR render, seed data should always be available (we only send back a `null` response
    // in the case of a `loading` segment, pre-PPR.)
    const canonicalUrl = // This is safe to do as canonicalUrl can't be rendered, it's only used to control the history updates in the useEffect further down in this file.
    location ? (0, _createhreffromurl.createHrefFromUrl)(location) : initialCanonicalUrl;
    // Convert the initial FlightRouterState into the RouteTree type.
    // NOTE: The metadataVaryPath isn't used for anything currently because the
    // head is embedded into the CacheNode tree, but eventually we'll lift it out
    // and store it on the top-level state object.
    //
    // For statically-generated-at-build-time HTML pages, the FlightRouterState
    // baked into the initial RSC payload won't have the correct segment inlining
    // hints because those are computed after the pre-render. The server marks
    // these trees with InliningHintsStale, which causes the route cache entry
    // to be immediately expired. The next prefetch will re-fetch the tree with
    // correct hints from the /_tree response.
    const acc = {
        metadataVaryPath: null,
        treeDivergedFromBase: false
    };
    const initialRouteTree = (0, _cache.convertRootFlightRouterStateToRouteTree)(initialTree, initialRenderedSearch, acc);
    const metadataVaryPath = acc.metadataVaryPath;
    const initialTask = (0, _pprnavigations.createInitialCacheNodeForHydration)(navigatedAt, initialRouteTree, initialSeedData, initialHead, (0, _bfcache.computeDynamicStaleAt)(navigatedAt, initialDynamicStaleTimeSeconds ?? _bfcache.UnknownDynamicStaleTime));
    // The following only applies in the browser (location !== null) since neither
    // route learning nor segment cache state persists from SSR to client.
    if (location !== null && metadataVaryPath !== null) {
        // Learn the route pattern so we can predict it for future navigations.
        (0, _optimisticroutes.discoverKnownRoute)(Date.now(), location.pathname, location.search, null, null, initialRouteTree, metadataVaryPath, initialCouldBeIntercepted, canonicalUrl, initialSupportsPerSegmentPrefetching, false // hasDynamicRewrite
        );
        // TODO: Implement Shell extraction as part of Cached Navigations.
        // Intentionally holding off on doing this until we decide how the Cached
        // Navigations behavior should work in combination with App Shells.
        // Write the initial seed data into the segment cache so subsequent
        // navigations to the initial page can serve cached segments instantly.
        if (initialSeedData !== null && initialStaleTime !== undefined) {
            if (initialStaticStageByteLength !== undefined && initialFlightStreamForCache != null) {
                // Partially static page — truncate the cloned Flight stream at the
                // static stage byte boundary, decode, and cache the static subset.
                // Promise.resolve wraps the Flight-deserialized thenable into a
                // native Promise so we can chain `.then` on it safely.
                Promise.resolve(initialStaticStageByteLength).then(async (byteLength)=>{
                    const staticStageResponse = await (0, _fetchserverresponse.decodeStageUntilBoundary)(initialFlightStreamForCache, byteLength, undefined);
                    const now = Date.now();
                    const staleAt = await (0, _cache.resolveStaleAt)(now, staticStageResponse.s);
                    (0, _cache.writePrerenderResponseIntoCache)(now, _types.FetchStrategy.PPR, staticStageResponse.f, undefined, staticStageResponse.h, staticStageResponse.r ?? null, staleAt, initialTree, initialRenderedSearch, true, _cache // hydration writes are bound to the shared map
                    .segmentCacheMap);
                }).catch(()=>{
                // The static stage processing failed. Not fatal — the page
                // rendered normally, we just won't write into the cache.
                });
            } else {
                // Fully static page — cache the entire decoded seed data as-is. We're
                // not using the initial response here (which would allow us to combine
                // the two branches) to avoid unnecessary decoding of the Flight data,
                // since we can just take the seed data that we already decoded during
                // hydration and write it into the cache directly.
                const now = Date.now();
                (0, _cache.resolveStaleAt)(now, initialStaleTime).then((staleAt)=>{
                    (0, _cache.writePrerenderResponseIntoCache)(now, _types.FetchStrategy.PPR, initialFlightData, undefined, initialHeadVaryParams, initialRootVaryParams ?? null, staleAt, initialTree, initialRenderedSearch, false, _cache // hydration writes are bound to the shared map
                    .segmentCacheMap);
                }).catch(()=>{
                // The static stage processing failed. Not fatal — the page
                // rendered normally, we just won't write into the cache.
                });
                // Cancel the stream clone — fully static path doesn't need it.
                initialFlightStreamForCache?.cancel();
            }
        } else {
            // No caching — cancel the unused stream clone.
            initialFlightStreamForCache?.cancel();
        }
        // If the initial RSC payload includes an embedded runtime prefetch stream,
        // decode it and write the runtime data into the segment cache. This allows
        // subsequent navigations to serve runtime-prefetchable content from cache
        // without a separate prefetch request.
        if (initialRuntimePrefetchStream != null) {
            (0, _cache.processRuntimePrefetchStream)(Date.now(), initialRuntimePrefetchStream, initialTree, initialRenderedSearch).then((processed)=>{
                if (processed !== null) {
                    (0, _cache.writeDynamicRenderResponseIntoCache)(Date.now(), _types.FetchStrategy.PPRRuntime, processed.flightDatas, processed.buildId, processed.isResponsePartial, processed.headVaryParams, processed.rootVaryParamsIterable, processed.staleAt, processed.navigationSeed, null, _cache // hydration writes are bound to the shared map
                    .segmentCacheMap);
                }
            }).catch(()=>{
            // Runtime prefetch cache write failed. Not fatal — the page rendered
            // normally, we just won't cache runtime data.
            });
        }
    }
    // NOTE: We intentionally don't check if any data needs to be fetched from the
    // server. We assume the initial hydration payload is sufficient to render
    // the page.
    //
    // The completeness of the initial data is an important property that we rely
    // on as a last-ditch mechanism for recovering the app; we must always be able
    // to reload a fresh HTML document to get to a consistent state.
    //
    // In the future, there may be cases where the server intentionally sends
    // partial data and expects the client to fill in the rest, in which case this
    // logic may change. (There already is a similar case where the server sends
    // _no_ hydration data in the HTML document at all, and the client fetches it
    // separately, but that's different because we still end up hydrating with a
    // complete tree.)
    const initialState = {
        tree: initialTask.route,
        cache: initialTask.node,
        pushRef: {
            pendingPush: false,
            mpaNavigation: false,
            // First render needs to preserve the previous window.history.state
            // to avoid it being overwritten on navigation back/forward with MPA Navigation.
            preserveCustomHistoryState: true
        },
        focusAndScrollRef: {
            scrollRef: null,
            forceScroll: false,
            onlyHashChange: false,
            hashFragment: null
        },
        canonicalUrl,
        renderedSearch: initialRenderedSearch,
        // the || operator is intentional, the pathname can be an empty string
        nextUrl: ((0, _computechangedpath.extractPathFromFlightRouterState)(initialTree) || location?.pathname) ?? null,
        previousNextUrl: null,
        debugInfo: null
    };
    return initialState;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-initial-router-state.js.map


/***/ }),

/***/ 32071:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    setCacheBustingSearchParam: function() {
        return setCacheBustingSearchParam;
    },
    setCacheBustingSearchParamWithHash: function() {
        return setCacheBustingSearchParamWithHash;
    }
});
const _cachebustingsearchparam = __webpack_require__(36132);
const _approuterheaders = __webpack_require__(15563);
async function computeClientCacheBustingSearchParam(headers) {
    if (typeof globalThis.crypto?.subtle?.digest === 'function') {
        return (0, _cachebustingsearchparam.computeCacheBustingSearchParam)(headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER], headers[_approuterheaders.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER], headers[_approuterheaders.NEXT_ROUTER_STATE_TREE_HEADER], headers[_approuterheaders.NEXT_URL]);
    }
    return (0, _cachebustingsearchparam.computeLegacyCacheBustingSearchParam)(headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER], headers[_approuterheaders.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER], headers[_approuterheaders.NEXT_ROUTER_STATE_TREE_HEADER], headers[_approuterheaders.NEXT_URL]);
}
const setCacheBustingSearchParam = async (url, headers)=>{
    const uniqueCacheKey = await computeClientCacheBustingSearchParam(headers);
    setCacheBustingSearchParamWithHash(url, uniqueCacheKey);
};
const setCacheBustingSearchParamWithHash = (url, hash)=>{
    /**
   * Note that we intentionally do not use `url.searchParams.set` here:
   *
   * const url = new URL('https://example.com/search?q=custom%20spacing');
   * url.searchParams.set('_rsc', 'abc123');
   * console.log(url.toString()); // Outputs: https://example.com/search?q=custom+spacing&_rsc=abc123
   *                                                                             ^ <--- this is causing confusion
   * This is in fact intended based on https://url.spec.whatwg.org/#interface-urlsearchparams, but
   * we want to preserve the %20 as %20 if that's what the user passed in, hence the custom
   * logic below.
   */ const existingSearch = url.search;
    const rawQuery = existingSearch.startsWith('?') ? existingSearch.slice(1) : existingSearch;
    // Always remove any existing cache busting param and add a fresh one to ensure
    // we have the correct value based on current request headers
    const pairs = rawQuery.split('&').filter((pair)=>pair && !pair.startsWith(`${_approuterheaders.NEXT_RSC_UNION_QUERY}=`));
    if (hash.length > 0) {
        pairs.push(`${_approuterheaders.NEXT_RSC_UNION_QUERY}=${hash}`);
    } else {
        pairs.push(`${_approuterheaders.NEXT_RSC_UNION_QUERY}`);
    }
    url.search = pairs.length ? `?${pairs.join('&')}` : '';
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=set-cache-busting-search-param.js.map


/***/ }),

/***/ 35191:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InstantValidationBoundaryContext: function() {
        return _impl.InstantValidationBoundaryContext;
    },
    PlaceValidationBoundaryBelowThisLevel: function() {
        return _impl.PlaceValidationBoundaryBelowThisLevel;
    },
    RenderValidationBoundaryAtThisLevel: function() {
        return _impl.RenderValidationBoundaryAtThisLevel;
    },
    SlotMarker: function() {
        return _impl.SlotMarker;
    }
});
const _impl = __webpack_require__(75153);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=boundary.js.map


/***/ }),

/***/ 36132:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    computeCacheBustingSearchParam: function() {
        return computeCacheBustingSearchParam;
    },
    computeLegacyCacheBustingSearchParam: function() {
        return computeLegacyCacheBustingSearchParam;
    }
});
const _hash = __webpack_require__(83180);
const CACHE_BUSTING_SEARCH_PARAM_DIGEST_BYTES = 12;
const textEncoder = new TextEncoder();
function encodeCacheBustingSearchParam(bytes) {
    let binary = '';
    for(let i = 0; i < bytes.length; i++){
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function normalizeCacheBustingInput(value) {
    if (value === undefined) {
        return '0';
    }
    return Array.isArray(value) ? value.join(',') : value;
}
function createCacheBustingSearchParamInput(prefetchHeader, segmentPrefetchHeader, stateTreeHeader, nextUrlHeader) {
    if ((prefetchHeader === undefined || prefetchHeader === '0') && segmentPrefetchHeader === undefined && stateTreeHeader === undefined && nextUrlHeader === undefined) {
        return null;
    }
    return [
        prefetchHeader ?? '0',
        normalizeCacheBustingInput(segmentPrefetchHeader),
        normalizeCacheBustingInput(stateTreeHeader),
        normalizeCacheBustingInput(nextUrlHeader)
    ].join(',');
}
async function computeCacheBustingSearchParamFromInput(input) {
    // Truncate SHA-256 to 96 bits to keep `_rsc` compact
    const digest = await globalThis.crypto.subtle.digest('SHA-256', textEncoder.encode(input));
    return encodeCacheBustingSearchParam(new Uint8Array(digest).subarray(0, CACHE_BUSTING_SEARCH_PARAM_DIGEST_BYTES));
}
async function computeCacheBustingSearchParam(prefetchHeader, segmentPrefetchHeader, stateTreeHeader, nextUrlHeader) {
    const input = createCacheBustingSearchParamInput(prefetchHeader, segmentPrefetchHeader, stateTreeHeader, nextUrlHeader);
    if (input === null) {
        return '';
    }
    return computeCacheBustingSearchParamFromInput(input);
}
function computeLegacyCacheBustingSearchParam(prefetchHeader, segmentPrefetchHeader, stateTreeHeader, nextUrlHeader) {
    const input = createCacheBustingSearchParamInput(prefetchHeader, segmentPrefetchHeader, stateTreeHeader, nextUrlHeader);
    if (input === null) {
        return '';
    }
    return (0, _hash.hexHash)(input);
} //# sourceMappingURL=cache-busting-search-param.js.map


/***/ }),

/***/ 36981:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * Checks whether the given value is a NextError.
 * This can be used to print a more detailed error message with properties like `code` & `digest`.
 */ default: function() {
        return isError;
    },
    getProperError: function() {
        return getProperError;
    }
});
const _isplainobject = __webpack_require__(3967);
/**
 * This is a safe stringify function that handles circular references.
 * We're using a simpler version here to avoid introducing
 * the dependency `safe-stable-stringify` into production bundle.
 *
 * This helper is used both in development and production.
 */ function safeStringifyLite(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (_key, value)=>{
        // If value is an object and already seen, replace with "[Circular]"
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular]';
            }
            seen.add(value);
        }
        return value;
    });
}
function isError(err) {
    return typeof err === 'object' && err !== null && 'name' in err && 'message' in err;
}
function getProperError(err) {
    if (isError(err)) {
        return err;
    }
    if (false) {}
    return Object.defineProperty(new Error((0, _isplainobject.isPlainObject)(err) ? safeStringifyLite(err) : err + ''), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
}

//# sourceMappingURL=is-error.js.map

/***/ }),

/***/ 37788:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NavigationPromisesContext: function() {
        return NavigationPromisesContext;
    },
    PathParamsContext: function() {
        return PathParamsContext;
    },
    PathnameContext: function() {
        return PathnameContext;
    },
    ReadonlyURLSearchParams: function() {
        return _readonlyurlsearchparams.ReadonlyURLSearchParams;
    },
    SearchParamsContext: function() {
        return SearchParamsContext;
    },
    createDevToolsInstrumentedPromise: function() {
        return createDevToolsInstrumentedPromise;
    }
});
const _react = __webpack_require__(12115);
const _readonlyurlsearchparams = __webpack_require__(99297);
const SearchParamsContext = (0, _react.createContext)(null);
const PathnameContext = (0, _react.createContext)(null);
const PathParamsContext = (0, _react.createContext)(null);
const NavigationPromisesContext = (0, _react.createContext)(null);
function createDevToolsInstrumentedPromise(displayName, value) {
    const promise = Promise.resolve(value);
    promise.status = 'fulfilled';
    promise.value = value;
    promise.displayName = `${displayName} (SSR)`;
    return promise;
}
if (false) {} //# sourceMappingURL=hooks-client-context.shared-runtime.js.map


/***/ }),

/***/ 38108:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Check to see if a value is Thenable.
 *
 * @param promise the maybe-thenable value
 * @returns true if the value is thenable
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isThenable", ({
    enumerable: true,
    get: function() {
        return isThenable;
    }
}));
function isThenable(promise) {
    return promise !== null && typeof promise === 'object' && 'then' in promise && typeof promise.then === 'function';
} //# sourceMappingURL=is-thenable.js.map


/***/ }),

/***/ 38149:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "handleISRError", ({
    enumerable: true,
    get: function() {
        return handleISRError;
    }
}));
const _serverasyncstorage = __webpack_require__(72051);
function handleISRError({ error }) {
    if (_serverasyncstorage.workAsyncStorage) {
        const store = _serverasyncstorage.workAsyncStorage.getStore();
        if (store?.isStaticGeneration) {
            if (error) {
                console.error(error);
            }
            throw error;
        }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=handle-isr-error.js.map


/***/ }),

/***/ 39197:
/***/ ((module, exports) => {

"use strict";
/**
 * Inert stand-in for `./navigation-testing-lock`.
 *
 * When the Instant Navigation Testing API is disabled (a production build
 * without `experimental.exposeTestingApiInProductionBuild`), the browser
 * bundle resolves `./navigation-testing-lock` to this module instead of the
 * real implementation, so none of the lock machinery ships. The alias is set
 * up in `create-compiler-aliases.ts` (webpack) and
 * `crates/next-core/src/next_import_map.rs` (Turbopack).
 *
 * Every export mirrors the real module's signature and returns the value the
 * real implementation produces when no lock is held.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    beginLockedNavigation: function() {
        return beginLockedNavigation;
    },
    beginNavigationLockPrefetch: function() {
        return beginNavigationLockPrefetch;
    },
    getCurrentNavigationGate: function() {
        return getCurrentNavigationGate;
    },
    getNavigationLockSegmentCacheMap: function() {
        return getNavigationLockSegmentCacheMap;
    },
    getPreLockFetch: function() {
        return getPreLockFetch;
    },
    isNavigationLocked: function() {
        return isNavigationLocked;
    },
    resetNavigationLockToPending: function() {
        return resetNavigationLockToPending;
    },
    resolveNavigationLockPrefetch: function() {
        return resolveNavigationLockPrefetch;
    },
    shouldRestrictNavigationToShell: function() {
        return shouldRestrictNavigationToShell;
    },
    startListeningForInstantNavigationCookie: function() {
        return startListeningForInstantNavigationCookie;
    },
    updateCapturedSPAToTree: function() {
        return updateCapturedSPAToTree;
    }
});
function getPreLockFetch() {
    return null;
}
function beginNavigationLockPrefetch() {
    return null;
}
function getNavigationLockSegmentCacheMap() {
    return null;
}
function resolveNavigationLockPrefetch(_prefetch) {}
function startListeningForInstantNavigationCookie() {}
function updateCapturedSPAToTree(_fromTree, _toTree) {}
function isNavigationLocked() {
    return false;
}
function beginLockedNavigation() {
    return null;
}
function getCurrentNavigationGate() {
    return null;
}
function resetNavigationLockToPending() {}
function shouldRestrictNavigationToShell(_rootPrefetchHints, _linkFetchStrategy) {
    return false;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation-testing-lock.disabled.js.map


/***/ }),

/***/ 39862:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ServerInsertedHTMLContext: function() {
        return ServerInsertedHTMLContext;
    },
    useServerInsertedHTML: function() {
        return useServerInsertedHTML;
    }
});
const _interop_require_wildcard = __webpack_require__(66388);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(12115));
const ServerInsertedHTMLContext = /*#__PURE__*/ _react.default.createContext(null);
function useServerInsertedHTML(callback) {
    const addInsertedServerHTMLCallback = (0, _react.useContext)(ServerInsertedHTMLContext);
    // Should have no effects on client where there's no flush effects provider
    if (addInsertedServerHTMLCallback) {
        addInsertedServerHTMLCallback(callback);
    }
} //# sourceMappingURL=server-inserted-html.shared-runtime.js.map


/***/ }),

/***/ 40899:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createRouterCacheKey", ({
    enumerable: true,
    get: function() {
        return createRouterCacheKey;
    }
}));
const _segment = __webpack_require__(78237);
function createRouterCacheKey(segment, withoutSearchParameters = false) {
    // if the segment is an array, it means it's a dynamic segment
    // for example, ['lang', 'en', 'd']. We need to convert it to a string to store it as a cache node key.
    if (Array.isArray(segment)) {
        return `${segment[0]}|${segment[1]}|${segment[2]}`;
    }
    // Page segments might have search parameters, ie __PAGE__?foo=bar
    // When `withoutSearchParameters` is true, we only want to return the page segment
    if (withoutSearchParameters && segment.startsWith(_segment.PAGE_SEGMENT_KEY)) {
        return _segment.PAGE_SEGMENT_KEY;
    }
    return segment;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-router-cache-key.js.map


/***/ }),

/***/ 41463:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var _global_process, _global_process1;
module.exports = ((_global_process = __webpack_require__.g.process) == null ? void 0 : _global_process.env) && typeof ((_global_process1 = __webpack_require__.g.process) == null ? void 0 : _global_process1.env) === 'object' ? __webpack_require__.g.process : __webpack_require__(55208);

//# sourceMappingURL=process.js.map

/***/ }),

/***/ 41467:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "serverPatchReducer", ({
    enumerable: true,
    get: function() {
        return serverPatchReducer;
    }
}));
const _createhreffromurl = __webpack_require__(29453);
const _routerreducertypes = __webpack_require__(74616);
const _navigation = __webpack_require__(20354);
const _cache = __webpack_require__(12506);
const _refreshreducer = __webpack_require__(92512);
const _pprnavigations = __webpack_require__(22120);
function serverPatchReducer(state, action) {
    // A "retry" is a navigation that happens due to a route mismatch. It's
    // similar to a refresh, because we will omit any existing dynamic data on
    // the page. But we seed the retry navigation with the exact tree that the
    // server just responded with.
    const retryMpa = action.mpa;
    const retryUrl = new URL(action.url, location.origin);
    const retrySeed = action.seed;
    const navigateType = action.navigateType;
    if (retryMpa || retrySeed === null) {
        // If the server did not send back data during the mismatch, fall back to
        // an MPA navigation.
        return (0, _navigation.completeHardNavigation)(state, retryUrl, navigateType);
    }
    const currentUrl = new URL(state.canonicalUrl, location.origin);
    const currentRenderedSearch = state.renderedSearch;
    if (action.previousTree !== state.tree) {
        // There was another, more recent navigation since the once that
        // mismatched. We can abort the retry, but we still need to refresh the
        // page to evict any stale dynamic data.
        return (0, _refreshreducer.refreshReducer)(state, {
            type: _routerreducertypes.ACTION_REFRESH
        });
    }
    // There have been no new navigations since the mismatched one. Refresh,
    // using the tree we just received from the server.
    //
    // The freshness policy comes from the action: a genuine tree mismatch
    // re-fetches the dynamic data (`RefreshAll`), whereas a redirect that only
    // changed the canonical URL reuses the data already in the tree
    // (`HistoryTraversal`), since the data we received is correct.
    const retryCanonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(retryUrl);
    const retryNextUrl = action.nextUrl;
    const scrollBehavior = _routerreducertypes.ScrollBehavior.Default;
    const navigationLock = (0, _pprnavigations.getCurrentNavigationLock)();
    const now = Date.now();
    return (0, _navigation.navigateToKnownRoute)(now, state, retryUrl, retryCanonicalUrl, retrySeed, currentUrl, currentRenderedSearch, state.cache, state.tree, action.freshnessPolicy, retryNextUrl, scrollBehavior, navigateType, navigationLock, _cache.segmentCacheMap, null, // typically a retry after a previous mismatch, so the route was already
    // marked as having a dynamic rewrite when the mismatch was detected.
    null, undefined);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-patch-reducer.js.map


/***/ }),

/***/ 42429:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "useRouterBFCache", ({
    enumerable: true,
    get: function() {
        return useRouterBFCache;
    }
}));
const _react = __webpack_require__(12115);
// When the flag is disabled, only track the currently active tree
const MAX_BF_CACHE_ENTRIES =  false ? 0 : 1;
function useRouterBFCache(activeTree, activeCacheNode, activeStateKey) {
    // The currently active entry. The entries form a linked list, sorted in
    // order of most recently active. This allows us to reuse parts of the list
    // without cloning, unless there's a reordering or removal.
    // TODO: Once we start tracking back/forward history at each route level,
    // we should use the history order instead. In other words, when traversing
    // to an existing entry as a result of a popstate event, we should maintain
    // the existing order instead of moving it to the front of the list. I think
    // an initial implementation of this could be to pass an incrementing id
    // to history.pushState/replaceState, then use that here for ordering.
    const [prevActiveEntry, setPrevActiveEntry] = (0, _react.useState)(()=>{
        const initialEntry = {
            tree: activeTree,
            cacheNode: activeCacheNode,
            stateKey: activeStateKey,
            next: null
        };
        return initialEntry;
    });
    if (prevActiveEntry.tree === activeTree) {
        // Fast path. The active tree hasn't changed, so we can reuse the
        // existing state.
        return prevActiveEntry;
    }
    // The route tree changed. Note that this doesn't mean that the tree changed
    // *at this level* — the change may be due to a child route. Either way, we
    // need to either add or update the router tree in the bfcache.
    //
    // The rest of the code looks more complicated than it actually is because we
    // can't mutate the state in place; we have to copy-on-write.
    // Create a new entry for the active cache key. This is the head of the new
    // linked list.
    const newActiveEntry = {
        tree: activeTree,
        cacheNode: activeCacheNode,
        stateKey: activeStateKey,
        next: null
    };
    // We need to append the old list onto the new list. If the head of the new
    // list was already present in the cache, then we'll need to clone everything
    // that came before it. Then we can reuse the rest.
    let n = 1;
    let oldEntry = prevActiveEntry;
    let clonedEntry = newActiveEntry;
    while(oldEntry !== null && n < MAX_BF_CACHE_ENTRIES){
        if (oldEntry.stateKey === activeStateKey) {
            // Fast path. This entry in the old list that corresponds to the key that
            // is now active. We've already placed a clone of this entry at the front
            // of the new list. We can reuse the rest of the old list without cloning.
            // NOTE: We don't need to worry about eviction in this case because we
            // haven't increased the size of the cache, and we assume the max size
            // is constant across renders. If we were to change it to a dynamic limit,
            // then the implementation would need to account for that.
            clonedEntry.next = oldEntry.next;
            break;
        } else {
            // Clone the entry and append it to the list.
            n++;
            const entry = {
                tree: oldEntry.tree,
                cacheNode: oldEntry.cacheNode,
                stateKey: oldEntry.stateKey,
                next: null
            };
            clonedEntry.next = entry;
            clonedEntry = entry;
        }
        oldEntry = oldEntry.next;
    }
    setPrevActiveEntry(newActiveEntry);
    return newActiveEntry;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=bfcache-state-manager.js.map


/***/ }),

/***/ 42777:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cleanup: function() {
        return cleanup;
    },
    deleteFromLru: function() {
        return deleteFromLru;
    },
    lruPut: function() {
        return lruPut;
    },
    updateLruSize: function() {
        return updateLruSize;
    }
});
const _cachemap = __webpack_require__(76849);
const _scheduler = __webpack_require__(57705);
// We use an LRU for memory management. We must update this whenever we add or
// remove a new cache entry, or when an entry changes size.
let head = null;
let lruSize = 0;
// TODO: I chose the max size somewhat arbitrarily. Consider setting this based
// on navigator.deviceMemory, or some other heuristic. We should make this
// customizable via the Next.js config, too.
const maxLruSize = 50 * 1024 * 1024 // 50 MB
;
function lruPut(node) {
    if (head === node) {
        // Already at the head
        return;
    }
    const prev = node.prev;
    const next = node.next;
    if (next === null || prev === null) {
        // This is an insertion
        lruSize += node.size;
        // Whenever we add an entry, we need to check if we've exceeded the
        // max size. We don't evict entries immediately; they're evicted later in
        // an asynchronous task.
        ensureCleanupIsScheduled();
    } else {
        // This is a move. Remove from its current position.
        prev.next = next;
        next.prev = prev;
    }
    // Move to the front of the list
    if (head === null) {
        // This is the first entry
        node.prev = node;
        node.next = node;
    } else {
        // Add to the front of the list
        const tail = head.prev;
        node.prev = tail;
        // In practice, this is never null, but that isn't encoded in the type
        if (tail !== null) {
            tail.next = node;
        }
        node.next = head;
        head.prev = node;
    }
    head = node;
}
function updateLruSize(node, newNodeSize) {
    // This is a separate function from `put` so that we can resize the entry
    // regardless of whether it's currently being tracked by the LRU.
    const prevNodeSize = node.size;
    node.size = newNodeSize;
    if (node.next === null) {
        // This entry is not currently being tracked by the LRU.
        return;
    }
    // Update the total LRU size
    lruSize = lruSize - prevNodeSize + newNodeSize;
    ensureCleanupIsScheduled();
}
function deleteFromLru(deleted) {
    const next = deleted.next;
    const prev = deleted.prev;
    if (next !== null && prev !== null) {
        lruSize -= deleted.size;
        deleted.next = null;
        deleted.prev = null;
        // Remove from the list
        if (head === deleted) {
            // Update the head
            if (next === head) {
                // This was the last entry
                head = null;
            } else {
                head = next;
                prev.next = next;
                next.prev = prev;
            }
        } else {
            prev.next = next;
            next.prev = prev;
        }
    } else {
    // Already deleted
    }
}
function ensureCleanupIsScheduled() {
    if (lruSize <= maxLruSize) {
        return;
    }
    // To schedule cleanup, ping the prefetch scheduler. At the end of its work
    // loop, once there are no queued tasks and no in-progress requests, it will
    // call cleanup().
    (0, _scheduler.pingPrefetchScheduler)();
}
function cleanup() {
    if (lruSize <= maxLruSize) {
        return;
    }
    // Evict entries until we're at 90% capacity. We can assume this won't
    // infinite loop because even if `maxLruSize` were 0, eventually
    // `deleteFromLru` sets `head` to `null` when we run out entries.
    const ninetyPercentMax = maxLruSize * 0.9;
    while(lruSize > ninetyPercentMax && head !== null){
        const tail = head.prev;
        // In practice, this is never null, but that isn't encoded in the type
        if (tail !== null) {
            // Delete the entry from the map. In turn, this will remove it from
            // the LRU.
            (0, _cachemap.deleteMapEntry)(tail);
        }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=lru.js.map


/***/ }),

/***/ 42832:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(22213);
} else {}


/***/ }),

/***/ 45653:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    METADATA_BOUNDARY_NAME: function() {
        return METADATA_BOUNDARY_NAME;
    },
    OUTLET_BOUNDARY_NAME: function() {
        return OUTLET_BOUNDARY_NAME;
    },
    ROOT_LAYOUT_BOUNDARY_NAME: function() {
        return ROOT_LAYOUT_BOUNDARY_NAME;
    },
    VIEWPORT_BOUNDARY_NAME: function() {
        return VIEWPORT_BOUNDARY_NAME;
    }
});
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';
const ROOT_LAYOUT_BOUNDARY_NAME = '__next_root_layout_boundary__';

//# sourceMappingURL=boundary-constants.js.map

/***/ }),

/***/ 47600:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ErrorBoundary: function() {
        return ErrorBoundary;
    },
    ErrorBoundaryHandler: function() {
        return ErrorBoundaryHandler;
    }
});
const _interop_require_wildcard = __webpack_require__(66388);
const _jsxruntime = __webpack_require__(95155);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(12115));
const _navigationuntracked = __webpack_require__(53095);
const _isnextroutererror = __webpack_require__(58904);
const _navfailurehandler = __webpack_require__(70530);
const _handleisrerror = __webpack_require__(38149);
const _isbot = __webpack_require__(98080);
const _approutercontextsharedruntime = __webpack_require__(22909);
const isBotUserAgent =  true && (0, _isbot.isBot)(window.navigator.userAgent);
class ErrorBoundaryHandler extends _react.default.Component {
    static{
        this.contextType = _approutercontextsharedruntime.AppRouterContext;
    }
    constructor(props){
        super(props), this.reset = ()=>{
            this.setState({
                error: null
            });
        }, this.retry = ()=>{
            (0, _react.startTransition)(()=>{
                this.context?.refresh();
                this.reset();
            });
        };
        this.state = {
            error: null,
            previousPathname: this.props.pathname
        };
    }
    static getDerivedStateFromError(thrownValue) {
        if ((0, _isnextroutererror.isNextRouterError)(thrownValue)) {
            // Re-throw if an expected internal Next.js router error occurs
            // this means it should be handled by a different boundary (such as a NotFound boundary in a parent segment)
            throw thrownValue;
        }
        return {
            error: {
                thrownValue
            }
        };
    }
    static getDerivedStateFromProps(props, state) {
        const { error } = state;
        // if we encounter an error while
        // a navigation is pending we shouldn't render
        // the error boundary and instead should fallback
        // to a hard navigation to attempt recovering
        if (false) {}
        /**
     * Handles reset of the error boundary when a navigation happens.
     * Ensures the error boundary does not stay enabled when navigating to a new page.
     * Approach of setState in render is safe as it checks the previous pathname and then overrides
     * it as outlined in https://react.dev/reference/react/useState#storing-information-from-previous-renders
     */ if (props.pathname !== state.previousPathname && state.error) {
            return {
                error: null,
                previousPathname: props.pathname
            };
        }
        return {
            error: state.error,
            previousPathname: props.pathname
        };
    }
    // Explicit type is needed to avoid the generated `.d.ts` having a wide return type that could be specific to the `@types/react` version.
    render() {
        //When it's bot request, segment level error boundary will keep rendering the children,
        // the final error will be caught by the root error boundary and determine wether need to apply graceful degrade.
        if (this.state.error && !isBotUserAgent) {
            const thrownValue = this.state.error.thrownValue;
            (0, _handleisrerror.handleISRError)({
                error: thrownValue
            });
            return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    this.props.errorStyles,
                    this.props.errorScripts,
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(this.props.errorComponent, {
                        // TODO(NAR-804): Docs say this is an Error object, but we don't guarantee that
                        error: thrownValue,
                        reset: this.reset,
                        retry: this.retry
                    })
                ]
            });
        }
        return this.props.children;
    }
}
function ErrorBoundary({ errorComponent, errorStyles, errorScripts, children }) {
    // When we're rendering the missing params shell, this will return null. This
    // is because we won't be rendering any not found boundaries or error
    // boundaries for the missing params shell. When this runs on the client
    // (where these errors can occur), we will get the correct pathname.
    const pathname = (0, _navigationuntracked.useUntrackedPathname)();
    if (errorComponent) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(ErrorBoundaryHandler, {
            pathname: pathname,
            errorComponent: errorComponent,
            errorStyles: errorStyles,
            errorScripts: errorScripts,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=error-boundary.js.map


/***/ }),

/***/ 47650:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(58730);
} else {}


/***/ }),

/***/ 48159:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createRenderSearchParamsFromClient", ({
    enumerable: true,
    get: function() {
        return createRenderSearchParamsFromClient;
    }
}));
const createRenderSearchParamsFromClient =  false ? 0 : (__webpack_require__(77446).createRenderSearchParamsFromClient);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=search-params.browser.js.map


/***/ }),

/***/ 48512:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "hasBasePath", ({
    enumerable: true,
    get: function() {
        return hasBasePath;
    }
}));
const _pathhasprefix = __webpack_require__(63697);
const basePath =  false || '';
function hasBasePath(path) {
    return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=has-base-path.js.map


/***/ }),

/***/ 50020:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "normalizePathTrailingSlash", ({
    enumerable: true,
    get: function() {
        return normalizePathTrailingSlash;
    }
}));
const _removetrailingslash = __webpack_require__(90603);
const _parsepath = __webpack_require__(52697);
const normalizePathTrailingSlash = (path)=>{
    // 47 is the char code for '/'
    if (path.charCodeAt(0) !== 47 || undefined) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    if (false) {}
    return `${(0, _removetrailingslash.removeTrailingSlash)(pathname)}${query}${hash}`;
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=normalize-trailing-slash.js.map


/***/ }),

/***/ 50587:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unstable_rethrow", ({
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
}));
const _bailouttocsr = __webpack_require__(1980);
const _isnextroutererror = __webpack_require__(58904);
function unstable_rethrow(error) {
    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error)) {
        throw error;
    }
    if (error instanceof Error && 'cause' in error) {
        unstable_rethrow(error.cause);
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.browser.js.map


/***/ }),

/***/ 50980:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
// imports polyfill from `@next/polyfill-module` after build.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__webpack_require__(58456);
// Only set up devtools for the dev server.
if (false) {}
// Start listening for the instant navigation test cookie. The test framework
// (e.g. Playwright) sets/clears this cookie to control the navigation lock.
// Browser-only.
if (false) {}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-globals.js.map


/***/ }),

/***/ 51309:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
// This file is only used in app router due to the specific error state handling.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    onCaughtError: function() {
        return onCaughtError;
    },
    onUncaughtError: function() {
        return onUncaughtError;
    }
});
const _interop_require_default = __webpack_require__(73623);
const _isnextroutererror = __webpack_require__(58904);
const _bailouttocsr = __webpack_require__(1980);
const _reportglobalerror = __webpack_require__(63008);
const _errorboundary = __webpack_require__(47600);
const _globalerror = /*#__PURE__*/ _interop_require_default._(__webpack_require__(27123));
const devToolErrorMod =  false ? 0 : {
    decorateDevError: (error)=>error,
    handleClientError: ()=>{},
    originConsoleError: console.error.bind(console)
};
function onCaughtError(thrownValue, errorInfo) {
    const errorBoundaryComponent = errorInfo.errorBoundary?.constructor;
    let isImplicitErrorBoundary;
    if (false) {}
    isImplicitErrorBoundary = isImplicitErrorBoundary || errorBoundaryComponent === _errorboundary.ErrorBoundaryHandler && errorInfo.errorBoundary.props.errorComponent === _globalerror.default;
    // Skip the segment explorer triggered error
    if (false) {}
    if (isImplicitErrorBoundary) {
        // We don't consider errors caught unless they're caught by an explicit error
        // boundary. The built-in ones are considered implicit.
        // This mimics how the same app would behave without Next.js.
        return onUncaughtError(thrownValue);
    }
    // Skip certain custom errors which are not expected to be reported on client
    if ((0, _bailouttocsr.isBailoutToCSRError)(thrownValue) || (0, _isnextroutererror.isNextRouterError)(thrownValue)) return;
    if (false) {} else {
        devToolErrorMod.originConsoleError(thrownValue);
    }
}
function onUncaughtError(thrownValue) {
    // Skip certain custom errors which are not expected to be reported on client
    if ((0, _bailouttocsr.isBailoutToCSRError)(thrownValue) || (0, _isnextroutererror.isNextRouterError)(thrownValue)) return;
    if (false) {} else {
        (0, _reportglobalerror.reportGlobalError)(thrownValue);
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=error-boundary-callbacks.js.map


/***/ }),

/***/ 52431:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
// Override chunk URL mapping in the webpack runtime
// https://github.com/webpack/webpack/blob/2738eebc7880835d88c727d364ad37f3ec557593/lib/RuntimeGlobals.js#L204

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__webpack_require__(59643);
const _deploymentid = __webpack_require__(53887);
const _encodeuripath = __webpack_require__(2451);
// If we have a deployment ID, we need to append it to the webpack chunk names
// I am keeping the process check explicit so this can be statically optimized
if ((0, _deploymentid.getAssetToken)()) {
    const suffix = (0, _deploymentid.getAssetTokenQuery)();
    const getChunkScriptFilename = __webpack_require__.u;
    __webpack_require__.u = (...args)=>// filename path.
        (0, _encodeuripath.encodeURIPath)(getChunkScriptFilename(...args)) + suffix;
    const getChunkCssFilename = __webpack_require__.k;
    __webpack_require__.k = (...args)=>getChunkCssFilename(...args) + suffix;
    const getMiniCssFilename = __webpack_require__.miniCssF;
    __webpack_require__.miniCssF = (...args)=>getMiniCssFilename(...args) + suffix;
} else {
    const getChunkScriptFilename = __webpack_require__.u;
    __webpack_require__.u = (...args)=>// filename path.
        (0, _encodeuripath.encodeURIPath)(getChunkScriptFilename(...args));
// We don't need to override __webpack_require__.k because we don't modify
// the css chunk name when not using deployment id suffixes
// WE don't need to override __webpack_require__.miniCssF because we don't modify
// the mini css chunk name when not using deployment id suffixes
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-webpack.js.map


/***/ }),

/***/ 52697:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "parsePath", ({
    enumerable: true,
    get: function() {
        return parsePath;
    }
}));
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
} //# sourceMappingURL=parse-path.js.map


/***/ }),

/***/ 53095:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "useUntrackedPathname", ({
    enumerable: true,
    get: function() {
        return useUntrackedPathname;
    }
}));
const _react = __webpack_require__(12115);
const _hooksclientcontextsharedruntime = __webpack_require__(37788);
const _serverasyncstorage = __webpack_require__(72051);
/**
 * This checks to see if the current render has any unknown route parameters that
 * would cause the pathname to be dynamic. It's used to trigger a different
 * render path in the error boundary.
 *
 * @returns true if there are any unknown route parameters, false otherwise
 */ function hasFallbackRouteParams() {
    // The AsyncLocalStorage module is kept out of the client bundle via the
    // `./server-async-storage` browser alias; the guard ensures the stub is never
    // dereferenced in the browser.
    if (false) {}
    return false;
}
function useUntrackedPathname() {
    // If there are any unknown route parameters we would typically throw
    // an error, but this internal method allows us to return a null value instead
    // for components that do not propagate the pathname to the static shell (like
    // the error boundary).
    if (hasFallbackRouteParams()) {
        return null;
    }
    // This shouldn't cause any issues related to conditional rendering because
    // the environment will be consistent for the render.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation-untracked.js.map


/***/ }),

/***/ 53887:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getAssetToken: function() {
        return getAssetToken;
    },
    getAssetTokenQuery: function() {
        return getAssetTokenQuery;
    },
    getDeploymentId: function() {
        return getDeploymentId;
    },
    getDeploymentIdQuery: function() {
        return getDeploymentIdQuery;
    }
});
let deploymentId;
if (true) {
    deploymentId = document.documentElement.dataset.dplId;
    // Immediately remove the attribute to prevent hydration errors (the dplId was inserted into the
    // HTML only), React isn't aware of it at all.
    delete document.documentElement.dataset.dplId;
} else {}
function getDeploymentId() {
    return deploymentId;
}
function getDeploymentIdQuery(ampersand = false) {
    let id = getDeploymentId();
    if (id) {
        return `${ampersand ? '&' : '?'}dpl=${id}`;
    }
    return '';
}
function getAssetToken() {
    return  false ? 0 : false;
}
function getAssetTokenQuery(ampersand = false) {
    let id = getAssetToken();
    if (id) {
        return `${ampersand ? '&' : '?'}dpl=${id}`;
    }
    return '';
} //# sourceMappingURL=deployment-id.js.map


/***/ }),

/***/ 54728:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getLastCommittedTree: function() {
        return getLastCommittedTree;
    },
    setLastCommittedTree: function() {
        return setLastCommittedTree;
    }
});
// The tree from the last state that was committed to the browser history
// (i.e., the last state for which HistoryUpdater's useInsertionEffect ran).
// This lets the server-patch reducer distinguish between retrying a
// navigation that already pushed a history entry vs one whose transition
// suspended and never committed.
//
// Currently only used by the server-patch retry logic, but this module is a
// stepping stone toward a broader refactor of the navigation queue. The
// existing AppRouter action queue will eventually be replaced by a more
// reactive model that explicitly tracks pending vs committed navigation
// state. This file will likely evolve into (or be subsumed by) that new
// implementation.
let lastCommittedTree = null;
function getLastCommittedTree() {
    return lastCommittedTree;
}
function setLastCommittedTree(tree) {
    lastCommittedTree = tree;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=committed-state.js.map


/***/ }),

/***/ 55208:
/***/ ((module) => {

var __dirname = "/";
(function(){var e={156:function(e){var t=e.exports={};var r;var n;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){r=setTimeout}else{r=defaultSetTimout}}catch(e){r=defaultSetTimout}try{if(typeof clearTimeout==="function"){n=clearTimeout}else{n=defaultClearTimeout}}catch(e){n=defaultClearTimeout}})();function runTimeout(e){if(r===setTimeout){return setTimeout(e,0)}if((r===defaultSetTimout||!r)&&setTimeout){r=setTimeout;return setTimeout(e,0)}try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}function runClearTimeout(e){if(n===clearTimeout){return clearTimeout(e)}if((n===defaultClearTimeout||!n)&&clearTimeout){n=clearTimeout;return clearTimeout(e)}try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}var i=[];var o=false;var u;var a=-1;function cleanUpNextTick(){if(!o||!u){return}o=false;if(u.length){i=u.concat(i)}else{a=-1}if(i.length){drainQueue()}}function drainQueue(){if(o){return}var e=runTimeout(cleanUpNextTick);o=true;var t=i.length;while(t){u=i;i=[];while(++a<t){if(u){u[a].run()}}a=-1;t=i.length}u=null;o=false;runClearTimeout(e)}t.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1){for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}}i.push(new Item(e,t));if(i.length===1&&!o){runTimeout(drainQueue)}};function Item(e,t){this.fun=e;this.array=t}Item.prototype.run=function(){this.fun.apply(null,this.array)};t.title="browser";t.browser=true;t.env={};t.argv=[];t.version="";t.versions={};function noop(){}t.on=noop;t.addListener=noop;t.once=noop;t.off=noop;t.removeListener=noop;t.removeAllListeners=noop;t.emit=noop;t.prependListener=noop;t.prependOnceListener=noop;t.listeners=function(e){return[]};t.binding=function(e){throw new Error("process.binding is not supported")};t.cwd=function(){return"/"};t.chdir=function(e){throw new Error("process.chdir is not supported")};t.umask=function(){return 0}}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var i=t[r]={exports:{}};var o=true;try{e[r](i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r=__nccwpck_require__(156);module.exports=r})();

/***/ }),

/***/ 55437:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    dispatchAppRouterAction: function() {
        return dispatchAppRouterAction;
    },
    dispatchGestureState: function() {
        return dispatchGestureState;
    },
    refreshOnInstantNavigationUnlock: function() {
        return refreshOnInstantNavigationUnlock;
    },
    useActionQueue: function() {
        return useActionQueue;
    }
});
const _interop_require_wildcard = __webpack_require__(66388);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(12115));
const _isthenable = __webpack_require__(38108);
const _routerreducertypes = __webpack_require__(74616);
// The app router state lives outside of React, so we can import the dispatch
// method directly wherever we need it, rather than passing it around via props
// or context.
let dispatch = null;
function refreshOnInstantNavigationUnlock() {
    if (false) {}
}
function dispatchAppRouterAction(action) {
    if (dispatch === null) {
        throw Object.defineProperty(new Error('Internal Next.js error: Router action dispatched before initialization.'), "__NEXT_ERROR_CODE", {
            value: "E668",
            enumerable: false,
            configurable: true
        });
    }
    dispatch(action);
}
// Optimistic state setter for experimental_gesturePush. Only should be used
// during a gesture transition.
let setGestureRouterState = null;
function dispatchGestureState(state) {
    if (setGestureRouterState === null) {
        throw Object.defineProperty(new Error('Internal Next.js error: Router action dispatched before initialization.'), "__NEXT_ERROR_CODE", {
            value: "E668",
            enumerable: false,
            configurable: true
        });
    }
    setGestureRouterState(state);
}
const __DEV__ = "production" !== 'production';
const promisesWithDebugInfo = __DEV__ ? new WeakMap() : null;
function useActionQueue(actionQueue) {
    const [canonicalState, setState] = _react.default.useState(actionQueue.state);
    // Wrap the canonical state in useOptimistic to support
    // experimental_gesturePush. During a gesture transition, this returns a fork
    // of the router state that represents the eventual target if/when the gesture
    // completes. Otherwise it returns the canonical state.
    const [state, setGesture] = (0, _react.useOptimistic)(canonicalState);
    if (true) {
        setGestureRouterState = setGesture;
    }
    // Because of a known issue that requires to decode Flight streams inside the
    // render phase, we have to be a bit clever and assign the dispatch method to
    // a module-level variable upon initialization. The useState hook in this
    // module only exists to synchronize state that lives outside of React.
    // Ideally, what we'd do instead is pass the state as a prop to root.render;
    // this is conceptually how we're modeling the app router state, despite the
    // weird implementation details.
    let nextDispatch;
    if (false) {} else {
        nextDispatch = (action)=>actionQueue.dispatch(action, setState);
    }
    if (true) {
        dispatch = nextDispatch;
    }
    // When navigating to a non-prefetched route, then App Router state will be
    // blocked until the server responds. We need to transfer the `_debugInfo`
    // from the underlying Flight response onto the top-level promise that is
    // passed to React (via `use`) so that the latency is accurately represented
    // in the React DevTools.
    const stateWithDebugInfo = (0, _react.useMemo)(()=>{
        if (!__DEV__) {
            return state;
        }
        if ((0, _isthenable.isThenable)(state)) {
            // useMemo can't be used to cache a Promise since the memoized value is thrown
            // away when we suspend. So we use a WeakMap to cache the Promise with debug info.
            let promiseWithDebugInfo = promisesWithDebugInfo.get(state);
            if (promiseWithDebugInfo === undefined) {
                const debugInfo = [];
                promiseWithDebugInfo = Promise.resolve(state).then((asyncState)=>{
                    if (asyncState.debugInfo !== null) {
                        debugInfo.push(...asyncState.debugInfo);
                    }
                    return asyncState;
                });
                promiseWithDebugInfo._debugInfo = debugInfo;
                promisesWithDebugInfo.set(state, promiseWithDebugInfo);
            }
            return promiseWithDebugInfo;
        }
        return state;
    }, [
        state
    ]);
    return (0, _isthenable.isThenable)(stateWithDebugInfo) ? (0, _react.use)(stateWithDebugInfo) : stateWithDebugInfo;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-action-queue.js.map


/***/ }),

/***/ 55448:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "hydrate", ({
    enumerable: true,
    get: function() {
        return hydrate;
    }
}));
const _interop_require_default = __webpack_require__(73623);
const _jsxruntime = __webpack_require__(95155);
__webpack_require__(50980);
const _client = /*#__PURE__*/ _interop_require_default._(__webpack_require__(12669));
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(12115));
const _client1 = __webpack_require__(77197);
const _headmanagercontextsharedruntime = __webpack_require__(75368);
const _onrecoverableerror = __webpack_require__(26672);
const _errorboundarycallbacks = __webpack_require__(51309);
const _appcallserver = __webpack_require__(77304);
const _appfindsourcemapurl = __webpack_require__(4060);
const _approuterinstance = __webpack_require__(70156);
const _approuter = /*#__PURE__*/ _interop_require_default._(__webpack_require__(74036));
const _createinitialrouterstate = __webpack_require__(32025);
const _approutercontextsharedruntime = __webpack_require__(22909);
const _flightdatahelpers = __webpack_require__(4103);
const _deploymentid = __webpack_require__(53887);
const _navigationbuildid = __webpack_require__(97797);
const _routertransition = __webpack_require__(94062);
/// <reference types="react-dom/experimental" />
const createFromReadableStream = _client1.createFromReadableStream;
const createFromFetch = _client1.createFromFetch;
const appElement = document;
// Instant Navigation Testing API: captured once at module init. When truthy,
// this is the fetch promise for the static RSC payload (set by an injected
// <script> tag in the static shell HTML).
const instantTestStaticFetch = self.__next_instant_test ? self.__next_instant_test : undefined;
const encoder = new TextEncoder();
let initialServerDataBuffer = undefined;
let initialServerDataWriter = undefined;
let initialServerDataLoaded = false;
let initialServerDataFlushed = false;
let initialFormStateData = null;
function nextServerDataCallback(seg) {
    if (seg[0] === 0) {
        initialServerDataBuffer = [];
    } else if (seg[0] === 1) {
        if (!initialServerDataBuffer) throw Object.defineProperty(new Error('Unexpected server data: missing bootstrap script.'), "__NEXT_ERROR_CODE", {
            value: "E18",
            enumerable: false,
            configurable: true
        });
        if (initialServerDataWriter) {
            initialServerDataWriter.enqueue(encoder.encode(seg[1]));
        } else {
            initialServerDataBuffer.push(seg[1]);
        }
    } else if (seg[0] === 2) {
        initialFormStateData = seg[1];
    } else if (seg[0] === 3) {
        if (!initialServerDataBuffer) throw Object.defineProperty(new Error('Unexpected server data: missing bootstrap script.'), "__NEXT_ERROR_CODE", {
            value: "E18",
            enumerable: false,
            configurable: true
        });
        // Decode the base64 string back to binary data.
        const binaryString = atob(seg[1]);
        const decodedChunk = new Uint8Array(binaryString.length);
        for(var i = 0; i < binaryString.length; i++){
            decodedChunk[i] = binaryString.charCodeAt(i);
        }
        if (initialServerDataWriter) {
            initialServerDataWriter.enqueue(decodedChunk);
        } else {
            initialServerDataBuffer.push(decodedChunk);
        }
    }
}
function isStreamErrorOrUnfinished(ctr) {
    // If `desiredSize` is null, it means the stream is closed or errored. If it is lower than 0, the stream is still unfinished.
    return ctr.desiredSize === null || ctr.desiredSize < 0;
}
// There might be race conditions between `nextServerDataRegisterWriter` and
// `DOMContentLoaded`. The former will be called when React starts to hydrate
// the root, the latter will be called when the DOM is fully loaded.
// For streaming, the former is called first due to partial hydration.
// For non-streaming, the latter can be called first.
// Hence, we use two variables `initialServerDataLoaded` and
// `initialServerDataFlushed` to make sure the writer will be closed and
// `initialServerDataBuffer` will be cleared in the right time.
function nextServerDataRegisterWriter(ctr) {
    if (initialServerDataBuffer) {
        initialServerDataBuffer.forEach((val)=>{
            ctr.enqueue(typeof val === 'string' ? encoder.encode(val) : val);
        });
        if (initialServerDataLoaded && !initialServerDataFlushed) {
            // Instant Navigation Testing API: don't close or error the inline
            // Flight stream. The static shell has no inline Flight data, so the
            // stream is empty. Closing it would cause React to log an error about
            // missing data. Leaving it open lets React treat any holes as
            // "still suspended." Hydration uses the separately fetched RSC payload
            // (self.__next_instant_test), not this stream.
            if (isStreamErrorOrUnfinished(ctr)) {
                if (!instantTestStaticFetch) {
                    ctr.error(Object.defineProperty(new Error('The connection to the page was unexpectedly closed, possibly due to the stop button being clicked, loss of Wi-Fi, or an unstable internet connection.'), "__NEXT_ERROR_CODE", {
                        value: "E117",
                        enumerable: false,
                        configurable: true
                    }));
                }
            } else {
                ctr.close();
            }
            initialServerDataFlushed = true;
            initialServerDataBuffer = undefined;
        }
    }
    initialServerDataWriter = ctr;
}
// When `DOMContentLoaded`, we can close all pending writers to finish hydration.
const DOMContentLoaded = function() {
    if (initialServerDataWriter && !initialServerDataFlushed) {
        initialServerDataWriter.close();
        initialServerDataFlushed = true;
        initialServerDataBuffer = undefined;
    }
    initialServerDataLoaded = true;
};
// It's possible that the DOM is already loaded.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
} else {
    // Delayed in marco task to ensure it's executed later than hydration
    setTimeout(DOMContentLoaded);
}
const nextServerDataLoadingGlobal = self.__next_f = self.__next_f || [];
// Consume all buffered chunks and clear the global data array right after to release memory.
// Otherwise it will be retained indefinitely.
nextServerDataLoadingGlobal.forEach(nextServerDataCallback);
nextServerDataLoadingGlobal.length = 0;
// Patch its push method so subsequent chunks are handled (but not actually pushed to the array).
nextServerDataLoadingGlobal.push = nextServerDataCallback;
let readable = new ReadableStream({
    start (controller) {
        nextServerDataRegisterWriter(controller);
    }
});
if (false) {}
// When Cache Components is enabled, tee the inlined Flight stream so we can
// truncate a clone at the static stage byte boundary and cache it. We don't
// know if `l` is present until React decodes the payload, so always tee and
// cancel the clone if not needed.
let initialFlightStreamForCache = null;
if (false) {}
let debugChannel;
if (false) {}
let initialServerResponse;
if (instantTestStaticFetch) {
    // Instant Navigation Testing API: hydrate from the static RSC payload
    // fetch kicked off by an injected <script> tag, instead of the inline
    // Flight data (which is not present in the static shell).
    initialServerResponse = Promise.resolve(createFromFetch(instantTestStaticFetch, {
        callServer: _appcallserver.callServer,
        findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
        debugChannel,
        // The static fetch response is a partial stream (static-only Flight
        // data with no dynamic content). Allow it to close without error so
        // React treats dynamic holes as still-suspended rather than
        // triggering error recovery.
        unstable_allowPartialStream: true
    })).then(async (initialRSCPayload)=>{
        return (0, _flightdatahelpers.createInitialRSCPayloadFromFallbackPrerender)(await instantTestStaticFetch, initialRSCPayload);
    });
} else if (window.__NEXT_CLIENT_RESUME) {
    const clientResumeFetch = window.__NEXT_CLIENT_RESUME;
    initialServerResponse = Promise.resolve(createFromFetch(clientResumeFetch, {
        callServer: _appcallserver.callServer,
        findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
        debugChannel
    })).then(async (fallbackInitialRSCPayload)=>(0, _flightdatahelpers.createInitialRSCPayloadFromFallbackPrerender)(await clientResumeFetch, fallbackInitialRSCPayload));
} else {
    initialServerResponse = createFromReadableStream(readable, {
        callServer: _appcallserver.callServer,
        findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
        debugChannel,
        startTime: 0
    });
}
function ServerRoot({ initialRSCPayload, actionQueue, webSocket, staticIndicatorState }) {
    const router = /*#__PURE__*/ (0, _jsxruntime.jsx)(_approuter.default, {
        actionQueue: actionQueue,
        globalErrorState: initialRSCPayload.G,
        webSocket: webSocket,
        staticIndicatorState: staticIndicatorState
    });
    if (false) {}
    return router;
}
const StrictModeIfEnabled =  true ? _react.default.StrictMode : 0;
function Root({ children }) {
    if (false) {}
    return children;
}
const enableTransitionIndicator = false;
function noDefaultTransitionIndicator() {
    return ()=>{};
}
const reactRootOptions = {
    onDefaultTransitionIndicator: enableTransitionIndicator ? undefined : noDefaultTransitionIndicator,
    onRecoverableError: _onrecoverableerror.onRecoverableError,
    onCaughtError: _errorboundarycallbacks.onCaughtError,
    onUncaughtError: _errorboundarycallbacks.onUncaughtError
};
async function hydrate(instrumentationModules, assetPrefix) {
    let staticIndicatorState;
    let webSocket;
    if (false) {}
    const initialRSCPayload = await initialServerResponse;
    // Initialize the offline module to register browser event listeners
    // (offline/online) before any components hydrate.
    if (false) {}
    // setNavigationBuildId should be called only once, during JS initialization
    // and before any components have hydrated.
    if (initialRSCPayload.b) {
        (0, _navigationbuildid.setNavigationBuildId)(initialRSCPayload.b);
    } else {
        (0, _navigationbuildid.setNavigationBuildId)((0, _deploymentid.getDeploymentId)());
    }
    (0, _routertransition.initializeRouterTransitionModules)(instrumentationModules);
    const initialTimestamp = Date.now();
    const actionQueue = (0, _approuterinstance.createMutableActionQueue)((0, _createinitialrouterstate.createInitialRouterState)({
        navigatedAt: initialTimestamp,
        initialRSCPayload,
        initialFlightStreamForCache,
        location: window.location
    }));
    const reactEl = /*#__PURE__*/ (0, _jsxruntime.jsx)(StrictModeIfEnabled, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_headmanagercontextsharedruntime.HeadManagerContext.Provider, {
            value: {
                appDir: true
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Root, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(ServerRoot, {
                    initialRSCPayload: initialRSCPayload,
                    actionQueue: actionQueue,
                    webSocket: webSocket,
                    staticIndicatorState: staticIndicatorState
                })
            })
        })
    });
    if (document.documentElement.id === '__next_error__') {
        let element = reactEl;
        // Server rendering failed, fall back to client-side rendering
        if (false) {}
        _client.default.createRoot(appElement, reactRootOptions).render(element);
    } else {
        _react.default.startTransition(()=>{
            _client.default.hydrateRoot(appElement, reactEl, {
                ...reactRootOptions,
                formState: initialFormStateData
            });
        });
    }
    // TODO-APP: Remove this logic when Float has GC built-in in development.
    if (false) {}
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-index.js.map


/***/ }),

/***/ 56469:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    INTERCEPTION_ROUTE_MARKERS: function() {
        return INTERCEPTION_ROUTE_MARKERS;
    },
    extractInterceptionRouteInformation: function() {
        return extractInterceptionRouteInformation;
    },
    isInterceptionRouteAppPath: function() {
        return isInterceptionRouteAppPath;
    }
});
const _apppaths = __webpack_require__(89226);
const INTERCEPTION_ROUTE_MARKERS = [
    '(..)(..)',
    '(.)',
    '(..)',
    '(...)'
];
function isInterceptionRouteAppPath(path) {
    // TODO-APP: add more serious validation
    return path.split('/').find((segment)=>INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m))) !== undefined;
}
function extractInterceptionRouteInformation(path) {
    let interceptingRoute;
    let marker;
    let interceptedRoute;
    for (const segment of path.split('/')){
        marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        if (marker) {
            ;
            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
            break;
        }
    }
    if (!interceptingRoute || !marker || !interceptedRoute) {
        throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
            value: "E269",
            enumerable: false,
            configurable: true
        });
    }
    interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute) // normalize the path, e.g. /(blog)/feed -> /feed
    ;
    switch(marker){
        case '(.)':
            // (.) indicates that we should match with sibling routes, so we just need to append the intercepted route to the intercepting route
            if (interceptingRoute === '/') {
                interceptedRoute = `/${interceptedRoute}`;
            } else {
                interceptedRoute = interceptingRoute + '/' + interceptedRoute;
            }
            break;
        case '(..)':
            // (..) indicates that we should match at one level up, so we need to remove the last segment of the intercepting route
            if (interceptingRoute === '/') {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
                    value: "E207",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = interceptingRoute.split('/').slice(0, -1).concat(interceptedRoute).join('/');
            break;
        case '(...)':
            // (...) will match the route segment in the root directory, so we need to use the root directory to prepend the intercepted route
            interceptedRoute = '/' + interceptedRoute;
            break;
        case '(..)(..)':
            // (..)(..) indicates that we should match at two levels up, so we need to remove the last two segments of the intercepting route
            const splitInterceptingRoute = interceptingRoute.split('/');
            if (splitInterceptingRoute.length <= 2) {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
                    value: "E486",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join('/');
            break;
        default:
            throw Object.defineProperty(new Error('Invariant: unexpected marker'), "__NEXT_ERROR_CODE", {
                value: "E112",
                enumerable: false,
                configurable: true
            });
    }
    return {
        interceptingRoute,
        interceptedRoute
    };
} //# sourceMappingURL=interception-routes.js.map


/***/ }),

/***/ 57080:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    REDIRECT_ERROR_CODE: function() {
        return REDIRECT_ERROR_CODE;
    },
    isRedirectError: function() {
        return isRedirectError;
    }
});
const _redirectstatuscode = __webpack_require__(99786);
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-error.js.map


/***/ }),

/***/ 57121:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    LoadingBoundaryProvider: function() {
        return LoadingBoundaryProvider;
    },
    /**
 * OuterLayoutRouter handles the current segment as well as <Offscreen> rendering of other segments.
 * It can be rendered next to each other with a different `parallelRouterKey`, allowing for Parallel routes.
 */ default: function() {
        return OuterLayoutRouter;
    }
});
const _interop_require_default = __webpack_require__(73623);
const _interop_require_wildcard = __webpack_require__(66388);
const _jsxruntime = __webpack_require__(95155);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(12115));
const _reactdom = /*#__PURE__*/ _interop_require_default._(__webpack_require__(47650));
const _approutercontextsharedruntime = __webpack_require__(22909);
const _unresolvedthenable = __webpack_require__(77584);
const _errorboundary = __webpack_require__(47600);
const _disablesmoothscroll = __webpack_require__(58465);
const _redirectboundary = __webpack_require__(64872);
const _errorboundary1 = __webpack_require__(64777);
const _boundary = __webpack_require__(35191);
const _createroutercachekey = __webpack_require__(40899);
const _bfcachestatemanager = __webpack_require__(42429);
const _apppaths = __webpack_require__(89226);
const _hooksclientcontextsharedruntime = __webpack_require__(37788);
const _routeparams = __webpack_require__(84536);
const _pprnavigations = __webpack_require__(22120);
const enableNewScrollHandler = true;
const __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _reactdom.default.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
// TODO-APP: Replace with new React API for finding dom nodes without a `ref` when available
/**
 * Wraps ReactDOM.findDOMNode with additional logic to hide React Strict Mode warning
 */ function findDOMNode(instance) {
    // Tree-shake for server bundle
    if (false) {}
    // __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.findDOMNode is null during module init.
    // We need to lazily reference it.
    const internal_reactDOMfindDOMNode = __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.findDOMNode;
    return internal_reactDOMfindDOMNode(instance);
}
const rectProperties = [
    'bottom',
    'height',
    'left',
    'right',
    'top',
    'width',
    'x',
    'y'
];
/**
 * Check if a HTMLElement is hidden or fixed/sticky position
 */ function shouldSkipElement(element) {
    // we ignore fixed or sticky positioned elements since they'll likely pass the "in-viewport" check
    // and will result in a situation we bail on scroll because of something like a fixed nav,
    // even though the actual page content is offscreen
    if ([
        'sticky',
        'fixed'
    ].includes(getComputedStyle(element).position)) {
        return true;
    }
    // Uses `getBoundingClientRect` to check if the element is hidden instead of `offsetParent`
    // because `offsetParent` doesn't consider document/body
    const rect = element.getBoundingClientRect();
    return rectProperties.every((item)=>rect[item] === 0);
}
/**
 * Resolve the root scroll padding used by the viewport check.
 *
 * Computed lengths serialize as pixels, but percentages remain relative to
 * the scrollport. Preserve the existing behavior for values that still
 * contain unresolved CSS math.
 */ function getScrollPaddingTopInPixels(htmlElement, viewportHeight) {
    const scrollPaddingTop = getComputedStyle(htmlElement).scrollPaddingTop;
    const value = Number.parseFloat(scrollPaddingTop);
    if (!Number.isFinite(value) || value < 0) {
        return 0;
    }
    if (scrollPaddingTop.endsWith('px')) {
        return value;
    }
    if (scrollPaddingTop.endsWith('%')) {
        return value / 100 * viewportHeight;
    }
    return 0;
}
/**
 * Check where the top corner of the HTMLElement is relative to the usable
 * viewport.
 *
 * Scroll padding is resolved lazily so an empty Fragment does not trigger a
 * computed style read. The caller caches the value for the second check.
 */ function getScrollTargetState(instance, viewportHeight, getScrollPaddingTop) {
    const rects = instance.getClientRects();
    if (rects.length === 0) {
        return 0;
    }
    let elementTop = Number.POSITIVE_INFINITY;
    for(let i = 0; i < rects.length; i++){
        const rect = rects[i];
        if (rect.top < elementTop) {
            elementTop = rect.top;
        }
    }
    return elementTop >= getScrollPaddingTop() && elementTop <= viewportHeight ? 1 : 2;
}
/**
 * Find the DOM node for a hash fragment.
 * If `top` the page has to scroll to the top of the page. This mirrors the browser's behavior.
 * If the hash fragment is an id, the page has to scroll to the element with that id.
 * If the hash fragment is a name, the page has to scroll to the first element with that name.
 */ function getHashFragmentDomNode(hashFragment) {
    // If the hash fragment is `top` the page has to scroll to the top of the page.
    if (hashFragment === 'top') {
        return document.body;
    }
    // If the hash fragment is an id, the page has to scroll to the element with that id.
    return document.getElementById(hashFragment) ?? // If the hash fragment is a name, the page has to scroll to the first element with that name.
    document.getElementsByName(hashFragment)[0] ?? null;
}
class InnerScrollAndFocusHandlerOld extends _react.default.Component {
    componentDidMount() {
        this.handlePotentialScroll();
    }
    componentDidUpdate() {
        this.handlePotentialScroll();
    }
    render() {
        return this.props.children;
    }
    constructor(...args){
        super(...args), this.handlePotentialScroll = ()=>{
            // Handle scroll and focus, it's only applied once.
            const { focusAndScrollRef, cacheNode } = this.props;
            const scrollRef = focusAndScrollRef.forceScroll ? focusAndScrollRef.scrollRef : cacheNode.scrollRef;
            if (scrollRef === null || !scrollRef.current) return;
            let domNode = null;
            const hashFragment = focusAndScrollRef.hashFragment;
            if (hashFragment) {
                domNode = getHashFragmentDomNode(hashFragment);
                if (domNode === null) {
                    // A missing hash target is still a handled scroll intent. Do not
                    // fall back to the route segment or leave the intent pending.
                    scrollRef.current = false;
                    focusAndScrollRef.onlyHashChange = false;
                    focusAndScrollRef.hashFragment = null;
                    return;
                }
            }
            // `findDOMNode` is tricky because it returns just the first child if the component is a fragment.
            // This already caused a bug where the first child was a <link/> in head.
            if (!domNode) {
                domNode = findDOMNode(this);
            }
            // If there is no DOM node this layout-router level is skipped. It'll be handled higher-up in the tree.
            if (!(domNode instanceof Element)) {
                return;
            }
            // Verify if the element is a HTMLElement and if we want to consider it for scroll behavior.
            // If the element is skipped, try to select the next sibling and try again.
            while(!(domNode instanceof HTMLElement) || shouldSkipElement(domNode)){
                if (false) {}
                // No siblings found that match the criteria are found, so handle scroll higher up in the tree instead.
                if (domNode.nextElementSibling === null) {
                    return;
                }
                domNode = domNode.nextElementSibling;
            }
            // Mark as scrolled so no other segment scrolls for this navigation.
            scrollRef.current = false;
            (0, _disablesmoothscroll.disableSmoothScrollDuringRouteTransition)(()=>{
                // In case of hash scroll, we only need to scroll the element into view
                if (hashFragment) {
                    domNode.scrollIntoView();
                    return;
                }
                // Store the current viewport height because reading `clientHeight` causes a reflow,
                // and it won't change during this function.
                const htmlElement = document.documentElement;
                const viewportHeight = htmlElement.clientHeight;
                let scrollPaddingTop = null;
                const getScrollPaddingTop = ()=>{
                    if (scrollPaddingTop === null) {
                        // Reuse the style and layout update from the geometry read above.
                        scrollPaddingTop = getScrollPaddingTopInPixels(htmlElement, viewportHeight);
                    }
                    return scrollPaddingTop;
                };
                // If the element's top edge is already in the viewport, exit early.
                if (getScrollTargetState(domNode, viewportHeight, getScrollPaddingTop) === 1) {
                    return;
                }
                // Otherwise, try scrolling go the top of the document to be backward compatible with pages
                // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
                // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
                // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
                htmlElement.scrollTop = 0;
                // Scroll to domNode if domNode is not in viewport when scrolled to top of document
                if (getScrollTargetState(domNode, viewportHeight, getScrollPaddingTop) !== 1) {
                    // Scroll into view doesn't scroll horizontally by default when not needed
                    domNode.scrollIntoView();
                }
            }, {
                // We will force layout by querying domNode position
                dontForceLayout: true,
                onlyHashChange: focusAndScrollRef.onlyHashChange
            });
            // Mutate after scrolling so that it can be read by `disableSmoothScrollDuringRouteTransition`
            focusAndScrollRef.onlyHashChange = false;
            focusAndScrollRef.hashFragment = null;
            // Set focus on the element
            domNode.focus();
        };
    }
}
/**
 * Fork of InnerScrollAndFocusHandlerOld using Fragment refs for scrolling.
 * No longer focuses the first host descendant.
 */ function InnerScrollHandlerNew(props) {
    const childrenRef = _react.default.useRef(null);
    (0, _react.useLayoutEffect)(()=>{
        const { focusAndScrollRef, cacheNode } = props;
        const scrollRef = focusAndScrollRef.forceScroll ? focusAndScrollRef.scrollRef : cacheNode.scrollRef;
        if (scrollRef === null || !scrollRef.current) return;
        let instance = null;
        const hashFragment = focusAndScrollRef.hashFragment;
        if (hashFragment) {
            instance = getHashFragmentDomNode(hashFragment);
            if (instance === null) {
                // A missing hash target is still a handled scroll intent. Do not
                // fall back to the route Fragment or leave the intent pending.
                scrollRef.current = false;
                focusAndScrollRef.onlyHashChange = false;
                focusAndScrollRef.hashFragment = null;
                return;
            }
        } else {
            instance = childrenRef.current;
        }
        // If there is no DOM node this layout-router level is skipped. It'll be handled higher-up in the tree.
        if (instance === null) {
            return;
        }
        let didHandleScroll = false;
        (0, _disablesmoothscroll.disableSmoothScrollDuringRouteTransition)(()=>{
            const htmlElement = document.documentElement;
            let viewportHeight = null;
            let initialTargetState = null;
            let scrollPaddingTop = null;
            const getScrollPaddingTop = ()=>{
                if (scrollPaddingTop === null) {
                    // Reuse the style and layout update from the geometry read.
                    scrollPaddingTop = getScrollPaddingTopInPixels(htmlElement, viewportHeight);
                }
                return scrollPaddingTop;
            };
            if (!hashFragment) {
                // Store the current viewport height because reading `clientHeight` causes a reflow,
                // and it won't change during this function.
                viewportHeight = htmlElement.clientHeight;
                initialTargetState = getScrollTargetState(instance, viewportHeight, getScrollPaddingTop);
                // An empty Fragment is not a scroll target. In particular, avoid
                // React's sibling fallback and leave the scroll signal available
                // for another changed segment.
                if (initialTargetState === 0) {
                    return;
                }
            }
            didHandleScroll = true;
            // Mark as scrolled so no other segment scrolls for this navigation.
            scrollRef.current = false;
            // This handler intentionally leaves focus untouched; resetting focus on
            // navigation is deferred.
            // In case of hash scroll, we only need to scroll the element into view
            if (hashFragment) {
                instance.scrollIntoView();
                return;
            }
            // If the element's top edge is already in the viewport, exit early.
            if (initialTargetState === 1) {
                return;
            }
            // Otherwise, try scrolling go the top of the document to be backward compatible with pages
            // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
            // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
            // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
            htmlElement.scrollTop = 0;
            // Scroll to domNode if domNode is not in viewport when scrolled to top of document
            if (getScrollTargetState(instance, viewportHeight, getScrollPaddingTop) === 2) {
                // Scroll into view doesn't scroll horizontally by default when not needed
                instance.scrollIntoView();
            }
        }, {
            // We will force layout by querying domNode position
            dontForceLayout: true,
            onlyHashChange: focusAndScrollRef.onlyHashChange
        });
        if (!didHandleScroll) {
            return;
        }
        // Mutate after scrolling so that it can be read by `disableSmoothScrollDuringRouteTransition`
        focusAndScrollRef.onlyHashChange = false;
        focusAndScrollRef.hashFragment = null;
    }, // but be prepared for lots of manual testing.
    undefined);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Fragment, {
        ref: childrenRef,
        children: props.children
    });
}
const InnerScrollAndMaybeFocusHandler = enableNewScrollHandler ? InnerScrollHandlerNew : InnerScrollAndFocusHandlerOld;
function ScrollAndMaybeFocusHandler({ children, cacheNode }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant global layout router not mounted'), "__NEXT_ERROR_CODE", {
            value: "E473",
            enumerable: false,
            configurable: true
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerScrollAndMaybeFocusHandler, {
        focusAndScrollRef: context.focusAndScrollRef,
        cacheNode: cacheNode,
        children: children
    });
}
/**
 * InnerLayoutRouter handles rendering the provided segment based on the cache.
 */ function InnerLayoutRouter({ tree, segmentPath, debugNameContext, cacheNode: maybeCacheNode, params, url, isActive }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    const parentNavPromises = (0, _react.useContext)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant global layout router not mounted'), "__NEXT_ERROR_CODE", {
            value: "E473",
            enumerable: false,
            configurable: true
        });
    }
    const cacheNode = maybeCacheNode !== null ? maybeCacheNode : // This should only be reachable for inactive/hidden segments, during
    // prerendering The active segment should always be consistent with the
    // CacheNode tree. Regardless, if we don't have a matching CacheNode, we
    // must suspend rather than render nothing, to prevent showing an
    // inconsistent route.
    (0, _react.use)(_unresolvedthenable.unresolvedThenable);
    // `rsc` represents the renderable node for this segment.
    // If this segment has a `prefetchRsc`, it's the statically prefetched data.
    // We should use that on initial render instead of `rsc`. Then we'll switch
    // to `rsc` when the dynamic response streams in.
    //
    // If no prefetch data is available, then we go straight to rendering `rsc`.
    const resolvedPrefetchRsc = cacheNode.prefetchRsc !== null ? cacheNode.prefetchRsc : cacheNode.rsc;
    // We use `useDeferredValue` to handle switching between the prefetched and
    // final values. The second argument is returned on initial render, then it
    // re-renders with the first argument.
    const rsc = (0, _react.useDeferredValue)(cacheNode.rsc, resolvedPrefetchRsc);
    // `rsc` is either a React node or a promise for a React node, except we
    // special case `null` to represent that this segment's data is missing. If
    // it's a promise, we need to unwrap it so we can determine whether or not the
    // data is missing.
    let resolvedRsc;
    if ((0, _pprnavigations.isDeferredRsc)(rsc)) {
        const unwrappedRsc = (0, _react.use)(rsc);
        if (unwrappedRsc === null) {
            // If the promise was resolved to `null`, it means the data for this
            // segment was not returned by the server. Suspend indefinitely. When this
            // happens, the router is responsible for triggering a new state update to
            // un-suspend this segment.
            (0, _react.use)(_unresolvedthenable.unresolvedThenable);
        }
        resolvedRsc = unwrappedRsc;
    } else {
        // This is not a deferred RSC promise. Don't need to unwrap it.
        if (rsc === null) {
            (0, _react.use)(_unresolvedthenable.unresolvedThenable);
        }
        resolvedRsc = rsc;
    }
    // In dev, we create a NavigationPromisesContext containing the instrumented promises that provide
    // `useSelectedLayoutSegment` and `useSelectedLayoutSegments`.
    // Promises are cached outside of render to survive suspense retries.
    let navigationPromises = null;
    if (false) {}
    let children = resolvedRsc;
    if (navigationPromises) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.NavigationPromisesContext.Provider, {
            value: navigationPromises,
            children: resolvedRsc
        });
    }
    children = /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
        value: {
            parentTree: tree,
            parentCacheNode: cacheNode,
            parentSegmentPath: segmentPath,
            parentParams: params,
            // This is always set to null as we enter a child segment. It's
            // populated by LoadingBoundaryProvider the next time we reach a
            // loading boundary.
            parentLoadingData: null,
            debugNameContext: debugNameContext,
            // TODO-APP: overriding of url for parallel routes
            url: url,
            isActive: isActive
        },
        children: children
    });
    return children;
}
function LoadingBoundaryProvider({ loading, children }) {
    // Provides the data needed to render a loading.tsx boundary, via context.
    //
    // loading.tsx creates a Suspense boundary around each of a layout's child
    // slots. (Might be bit confusing to think about the data flow, but: if
    // loading.tsx and layout.tsx are in the same directory, they are assigned
    // to the same CacheNode.)
    //
    // This provider component does not render the Suspense boundary directly;
    // that's handled by LoadingBoundary.
    //
    // TODO: For simplicity, we should combine this provider with LoadingBoundary
    // and render the Suspense boundary directly. The only real benefit of doing
    // it separately is so that when there are multiple parallel routes, we only
    // send the boundary data once, rather than once per child. But that's a
    // negligible benefit and can be achieved via caching instead.
    const parentContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
    if (parentContext === null) {
        return children;
    }
    // All values except for parentLoadingData are the same as the parent context.
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
        value: {
            parentTree: parentContext.parentTree,
            parentCacheNode: parentContext.parentCacheNode,
            parentSegmentPath: parentContext.parentSegmentPath,
            parentParams: parentContext.parentParams,
            parentLoadingData: loading,
            debugNameContext: parentContext.debugNameContext,
            url: parentContext.url,
            isActive: parentContext.isActive
        },
        children: children
    });
}
/**
 * Renders suspense boundary with the provided "loading" property as the fallback.
 * If no loading property is provided it renders the children without a suspense boundary.
 */ function LoadingBoundary({ name, loading, children }) {
    // TODO: For LoadingBoundary, and the other built-in boundary types, don't
    // wrap in an extra function component if no user-defined boundary is
    // provided. In other words, inline this conditional wrapping logic into
    // the parent component. More efficient and keeps unnecessary junk out of
    // the component stack.
    if (loading !== null) {
        const loadingRsc = loading[0];
        const loadingStyles = loading[1];
        const loadingScripts = loading[2];
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Suspense, {
            name: name,
            fallback: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    loadingStyles,
                    loadingScripts,
                    loadingRsc
                ]
            }),
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
function OuterLayoutRouter({ parallelRouterKey, error, errorStyles, errorScripts, templateStyles, templateScripts, template, notFound, forbidden, unauthorized, segmentViewBoundaries }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant expected layout router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E56",
            enumerable: false,
            configurable: true
        });
    }
    const { parentTree, parentCacheNode, parentSegmentPath, parentParams, parentLoadingData, url, isActive, debugNameContext } = context;
    // Get the CacheNode for this segment by reading it from the parent segment's
    // child map.
    const parentTreeSegment = parentTree[0];
    const segmentPath = parentSegmentPath === null ? // the code. We should clean this up.
    [
        parallelRouterKey
    ] : parentSegmentPath.concat([
        parentTreeSegment,
        parallelRouterKey
    ]);
    // The "state" key of a segment is the one passed to React — it represents the
    // identity of the UI tree. Whenever the state key changes, the tree is
    // recreated and the state is reset. In the App Router model, search params do
    // not cause state to be lost, so two segments with the same segment path but
    // different search params should have the same state key.
    //
    // The "cache" key of a segment, however, *does* include the search params, if
    // it's possible that the segment accessed the search params on the server.
    // (This only applies to page segments; layout segments cannot access search
    // params on the server.)
    const activeTree = parentTree[1][parallelRouterKey];
    const maybeParentSlots = parentCacheNode.slots;
    if (activeTree === undefined || maybeParentSlots === null) {
        // Could not find a matching segment. The client tree is inconsistent with
        // the server tree. Suspend indefinitely; the router will have already
        // detected the inconsistency when handling the server response, and
        // triggered a refresh of the page to recover.
        (0, _react.use)(_unresolvedthenable.unresolvedThenable);
    }
    let maybeValidationBoundaryId = null;
    if (false) {}
    const activeSegment = activeTree[0];
    const activeCacheNode = maybeParentSlots[parallelRouterKey] ?? null;
    const activeStateKey = (0, _createroutercachekey.createRouterCacheKey)(activeSegment, true) // no search params
    ;
    // At each level of the route tree, not only do we render the currently
    // active segment — we also render the last N segments that were active at
    // this level inside a hidden <Activity> boundary, to preserve their state
    // if or when the user navigates to them again.
    //
    // bfcacheEntry is a linked list of FlightRouterStates.
    let bfcacheEntry = (0, _bfcachestatemanager.useRouterBFCache)(activeTree, activeCacheNode, activeStateKey);
    let children = [];
    do {
        const tree = bfcacheEntry.tree;
        const cacheNode = bfcacheEntry.cacheNode;
        const stateKey = bfcacheEntry.stateKey;
        const segment = tree[0];
        /*
    - Error boundary
      - Only renders error boundary if error component is provided.
      - Rendered for each segment to ensure they have their own error state.
      - When gracefully degrade for bots, skip rendering error boundary.
    - Loading boundary
      - Only renders suspense boundary if loading components is provided.
      - Rendered for each segment to ensure they have their own loading state.
      - Passed to the router during rendering to ensure it can be immediately rendered when suspending on a Flight fetch.
  */ let segmentBoundaryTriggerNode = null;
        let segmentViewStateNode = null;
        if (false) {}
        let params = parentParams;
        if (Array.isArray(segment)) {
            // This segment contains a route param. Accumulate these as we traverse
            // down the router tree. The result represents the set of params that
            // the layout/page components are permitted to access below this point.
            const paramName = segment[0];
            const paramCacheKey = segment[1];
            const paramType = segment[2];
            const paramValue = (0, _routeparams.getParamValueFromCacheKey)(paramCacheKey, paramType);
            if (paramValue !== null) {
                params = {
                    ...parentParams,
                    [paramName]: paramValue
                };
            }
        }
        const debugName = getBoundaryDebugNameFromSegment(segment);
        // `debugNameContext` represents the nearest non-"virtual" parent segment.
        // `getBoundaryDebugNameFromSegment` returns undefined for virtual segments.
        // So if `debugName` is undefined, the context is passed through unchanged.
        const childDebugNameContext = debugName ?? debugNameContext;
        // In practical terms, clicking this name in the Suspense DevTools
        // should select the child slots of that layout.
        //
        // So the name we apply to the Activity boundary is actually based on
        // the nearest parent segments.
        //
        // We skip over "virtual" parents, i.e. ones inserted by Next.js that
        // don't correspond to application-defined code.
        const isVirtual = debugName === undefined;
        const debugNameToDisplay = isVirtual ? undefined : debugNameContext;
        let templateValue = /*#__PURE__*/ (0, _jsxruntime.jsxs)(ScrollAndMaybeFocusHandler, {
            cacheNode: cacheNode,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary.ErrorBoundary, {
                    errorComponent: error,
                    errorStyles: errorStyles,
                    errorScripts: errorScripts,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(LoadingBoundary, {
                        name: debugNameToDisplay,
                        // TODO: The loading module data for a segment is stored on the
                        // parent, then applied to each of that parent segment's
                        // parallel route slots. In the simple case where there's only
                        // one parallel route (the `children` slot), this is no
                        // different from if the loading module data were stored on the
                        // child directly. But I'm not sure this actually makes sense
                        // when there are multiple parallel routes. It's not a huge
                        // issue because you always have the option to define a narrower
                        // loading boundary for a particular slot. But this sort of
                        // smells like an implementation accident to me.
                        loading: parentLoadingData,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary1.HTTPAccessFallbackBoundary, {
                            notFound: notFound,
                            forbidden: forbidden,
                            unauthorized: unauthorized,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_redirectboundary.RedirectBoundary, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerLayoutRouter, {
                                        url: url,
                                        tree: tree,
                                        params: params,
                                        cacheNode: cacheNode,
                                        segmentPath: segmentPath,
                                        debugNameContext: childDebugNameContext,
                                        isActive: isActive && stateKey === activeStateKey
                                    }),
                                    segmentBoundaryTriggerNode
                                ]
                            })
                        })
                    })
                }),
                segmentViewStateNode
            ]
        });
        if (false) {}
        let child = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_approutercontextsharedruntime.TemplateContext.Provider, {
            value: templateValue,
            children: [
                templateStyles,
                templateScripts,
                template
            ]
        }, stateKey);
        if (false) {}
        if (false) {}
        children.push(child);
        bfcacheEntry = bfcacheEntry.next;
    }while (bfcacheEntry !== null);
    return children;
}
function getBoundaryDebugNameFromSegment(segment) {
    if (segment === '/') {
        // Reached the root
        return '/';
    }
    if (typeof segment === 'string') {
        if (isVirtualLayout(segment)) {
            return undefined;
        } else {
            return segment + '/';
        }
    }
    const paramCacheKey = segment[1];
    return paramCacheKey + '/';
}
function isVirtualLayout(segment) {
    return(// (like __PAGE__ and __DEFAULT__) to avoid collisions with
    // user-defined route groups.
    segment === '(__SLOT__)');
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=layout-router.js.map


/***/ }),

/***/ 57653:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "matchSegment", ({
    enumerable: true,
    get: function() {
        return matchSegment;
    }
}));
const matchSegment = (existingSegment, segment)=>{
    // segment is either Array or string
    if (typeof existingSegment === 'string') {
        if (typeof segment === 'string') {
            // Common case: segment is just a string
            return existingSegment === segment;
        }
        return false;
    }
    if (typeof segment === 'string') {
        return false;
    }
    return existingSegment[0] === segment[0] && existingSegment[1] === segment[1];
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=match-segments.js.map


/***/ }),

/***/ 57704:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createRenderParamsFromClient", ({
    enumerable: true,
    get: function() {
        return createRenderParamsFromClient;
    }
}));
const createRenderParamsFromClient =  false ? 0 : (__webpack_require__(98127).createRenderParamsFromClient);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=params.browser.js.map


/***/ }),

/***/ 57705:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cancelPrefetchTask: function() {
        return cancelPrefetchTask;
    },
    isPrefetchTaskDirty: function() {
        return isPrefetchTaskDirty;
    },
    pingPrefetchScheduler: function() {
        return pingPrefetchScheduler;
    },
    pingPrefetchTask: function() {
        return pingPrefetchTask;
    },
    reschedulePrefetchTask: function() {
        return reschedulePrefetchTask;
    },
    schedulePrefetchTask: function() {
        return schedulePrefetchTask;
    },
    startRevalidationCooldown: function() {
        return startRevalidationCooldown;
    },
    subtreeHasSpeculativePrefetch: function() {
        return subtreeHasSpeculativePrefetch;
    }
});
const _approutertypes = __webpack_require__(76731);
const _matchsegments = __webpack_require__(57653);
const _cache = __webpack_require__(12506);
const _cachekey = __webpack_require__(26452);
const _routeparams = __webpack_require__(84536);
const _types = __webpack_require__(77565);
const _segment = __webpack_require__(78237);
const _lru = __webpack_require__(42777);
const scheduleMicrotask = typeof queueMicrotask === 'function' ? queueMicrotask : (fn)=>Promise.resolve().then(fn).catch((error)=>setTimeout(()=>{
            throw error;
        }));
const taskHeap = [];
let inProgressRequests = 0;
let sortIdCounter = 0;
let didScheduleMicrotask = false;
// The most recently hovered (or touched, etc) link, i.e. the most recent task
// scheduled at Intent priority. There's only ever a single task at Intent
// priority at a time. We reserve special network bandwidth for this task only.
let mostRecentlyHoveredLink = null;
// CDN cache propagation delay after revalidation (in milliseconds)
const REVALIDATION_COOLDOWN_MS = 300;
// Timeout handle for the revalidation cooldown. When non-null, prefetch
// requests are blocked to allow CDN cache propagation.
let revalidationCooldownTimeoutHandle = null;
function startRevalidationCooldown() {
    // Clear any existing timeout in case multiple revalidations happen
    // in quick succession.
    if (revalidationCooldownTimeoutHandle !== null) {
        clearTimeout(revalidationCooldownTimeoutHandle);
    }
    // Schedule the cooldown to expire after the delay.
    revalidationCooldownTimeoutHandle = setTimeout(()=>{
        revalidationCooldownTimeoutHandle = null;
        // Retry the prefetch queue now that the cooldown has expired.
        pingPrefetchScheduler();
    }, REVALIDATION_COOLDOWN_MS);
}
function schedulePrefetchTask(key, treeAtTimeOfPrefetch, fetchStrategy, priority, onInvalidate, navigationLockPrefetch) {
    // Bind the task to the segment cache map that is active right now: the
    // shared map, unless the Instant Navigation Testing lock is held, in which
    // case the task gets the lock scope's private map. This is the single
    // place work is bound to a map based on lock state — everything downstream
    // receives the map explicitly. See `segmentCacheMap` in cache.ts.
    let taskSegmentCacheMap = _cache.segmentCacheMap;
    if (false) {}
    // Spawn a new prefetch task
    const task = {
        key,
        treeAtTimeOfPrefetch,
        routeCacheVersion: (0, _cache.getCurrentRouteCacheVersion)(),
        segmentCacheVersion: (0, _cache.getCurrentSegmentCacheVersion)(),
        segmentCacheMap: taskSegmentCacheMap,
        priority,
        phase: 2,
        hasBackgroundWork: false,
        hasPendingResponses: false,
        spawnedRuntimePrefetches: null,
        fetchStrategy,
        sortId: sortIdCounter++,
        isCanceled: false,
        fallbackRetryStatus: _cache.EntryStatus.Empty,
        onInvalidate,
        _heapIndex: -1
    };
    if (false) {}
    trackMostRecentlyHoveredLink(task);
    heapPush(taskHeap, task);
    // Schedule an async task to process the queue.
    //
    // The main reason we process the queue in an async task is for batching.
    // It's common for a single JS task/event to trigger multiple prefetches.
    // By deferring to a microtask, we only process the queue once per JS task.
    // If they have different priorities, it also ensures they are processed in
    // the optimal order.
    pingPrefetchScheduler();
    return task;
}
function cancelPrefetchTask(task) {
    // Remove the prefetch task from the queue. If the task already completed,
    // then this is a no-op.
    //
    // We must also explicitly mark the task as canceled so that a blocked task
    // does not get added back to the queue when it's pinged by the network.
    task.isCanceled = true;
    // A running fallback-retry loop notices `isCanceled` when it next wakes and
    // bails (settling its status to Rejected), so there's nothing to clean up here.
    heapDelete(taskHeap, task);
}
function reschedulePrefetchTask(task, treeAtTimeOfPrefetch, fetchStrategy, priority) {
    // Bump the prefetch task to the top of the queue, as if it were a fresh
    // task. This is essentially the same as canceling the task and scheduling
    // a new one, except it reuses the original object.
    //
    // The primary use case is to increase the priority of a Link-initated
    // prefetch on hover.
    // Un-cancel the task, in case it was previously canceled.
    task.isCanceled = false;
    task.phase = 2;
    // Note: fallback-retry state is deliberately NOT reset here. A retry loop runs
    // at most once per task, even across reschedules, so a re-hover never starts a
    // second loop. A loop already running simply continues (it only stops on
    // cancel); `fallbackRetryStatus` never returns to `Empty` once it leaves it.
    // Assign a new sort ID to move it ahead of all other tasks at the same
    // priority level. (Higher sort IDs are processed first.)
    task.sortId = sortIdCounter++;
    task.priority = // Intent priority, even if the rescheduled priority is lower.
    task === mostRecentlyHoveredLink ? _types.PrefetchPriority.Intent : priority;
    task.treeAtTimeOfPrefetch = treeAtTimeOfPrefetch;
    task.fetchStrategy = fetchStrategy;
    trackMostRecentlyHoveredLink(task);
    if (task._heapIndex !== -1) {
        // The task is already in the queue.
        heapResift(taskHeap, task);
    } else {
        heapPush(taskHeap, task);
    }
    pingPrefetchScheduler();
}
function isPrefetchTaskDirty(task, nextUrl, tree) {
    // This is used to quickly bail out of a prefetch task if the result is
    // guaranteed to not have changed since the task was initiated. This is
    // strictly an optimization — theoretically, if it always returned true, no
    // behavior should change because a full prefetch task will effectively
    // perform the same checks.
    return task.routeCacheVersion !== (0, _cache.getCurrentRouteCacheVersion)() || task.segmentCacheVersion !== (0, _cache.getCurrentSegmentCacheVersion)() || task.treeAtTimeOfPrefetch !== tree || task.key.nextUrl !== nextUrl;
}
function trackMostRecentlyHoveredLink(task) {
    // Track the mostly recently hovered link, i.e. the most recently scheduled
    // task at Intent priority. There must only be one such task at a time.
    if (task.priority === _types.PrefetchPriority.Intent && task !== mostRecentlyHoveredLink) {
        if (mostRecentlyHoveredLink !== null) {
            // Bump the previously hovered link's priority down to Default.
            if (mostRecentlyHoveredLink.priority !== _types.PrefetchPriority.Background) {
                mostRecentlyHoveredLink.priority = _types.PrefetchPriority.Default;
                heapResift(taskHeap, mostRecentlyHoveredLink);
            }
        }
        mostRecentlyHoveredLink = task;
    }
}
function pingPrefetchScheduler() {
    if (didScheduleMicrotask) {
        // Already scheduled a task to process the queue
        return;
    }
    didScheduleMicrotask = true;
    scheduleMicrotask(processQueueInMicrotask);
}
/**
 * Checks if we've exceeded the maximum number of concurrent prefetch requests,
 * to avoid saturating the browser's internal network queue. This is a
 * cooperative limit — prefetch tasks should check this before issuing
 * new requests.
 *
 * Also checks if we're within the revalidation cooldown window, during which
 * prefetch requests are delayed to allow CDN cache propagation.
 */ function hasNetworkBandwidth(task) {
    // When offline, don't issue any prefetch requests. The scheduler will be
    // re-pinged when connectivity is restored.
    if (false) {}
    // Check if we're within the revalidation cooldown window
    if (revalidationCooldownTimeoutHandle !== null) {
        // We're within the cooldown window. Return false to prevent prefetching.
        // When the cooldown expires, the timeout will call ensureWorkIsScheduled()
        // to retry the queue.
        return false;
    }
    // TODO: Also check if there's an in-progress navigation. We should never
    // add prefetch requests to the network queue if an actual navigation is
    // taking place, to ensure there's sufficient bandwidth for render-blocking
    // data and resources.
    // TODO: Consider reserving some amount of bandwidth for static prefetches.
    if (task.priority === _types.PrefetchPriority.Intent) {
        // The most recently hovered link is allowed to exceed the default limit.
        //
        // The goal is to always have enough bandwidth to start a new prefetch
        // request when hovering over a link.
        //
        // However, because we don't abort in-progress requests, it's still possible
        // we'll run out of bandwidth. When links are hovered in quick succession,
        // there could be multiple hover requests running simultaneously.
        return inProgressRequests < 12;
    }
    // The default limit is lower than the limit for a hovered link.
    return inProgressRequests < 4;
}
function spawnPrefetchSubtask(prefetchSubtask) {
    // When the scheduler spawns an async task, we don't await its result.
    // Instead, the async task writes its result directly into the cache, then
    // pings the scheduler to continue.
    //
    // We process server responses streamingly, so the prefetch subtask will
    // likely resolve before we're finished receiving all the data. The subtask
    // result includes a promise that resolves once the network connection is
    // closed. The scheduler uses this to control network bandwidth by tracking
    // and limiting the number of concurrent requests.
    inProgressRequests++;
    return prefetchSubtask.then((result)=>{
        if (result === null) {
            // The prefetch task errored before it could start processing the
            // network stream. Assume the connection is closed.
            onPrefetchConnectionClosed();
            return null;
        }
        // Wait for the connection to close before freeing up more bandwidth.
        result.closed.then(onPrefetchConnectionClosed);
        return result.value;
    });
}
function onPrefetchConnectionClosed() {
    inProgressRequests--;
    // Notify the scheduler that we have more bandwidth, and can continue
    // processing tasks.
    pingPrefetchScheduler();
}
function pingPrefetchTask(task) {
    // "Ping" a prefetch that's already in progress to notify it of new data.
    if (task.isCanceled || // Check if prefetch is already queued.
    task._heapIndex !== -1) {
        return;
    }
    // Add the task back to the queue.
    heapPush(taskHeap, task);
    pingPrefetchScheduler();
}
function processQueueInMicrotask() {
    didScheduleMicrotask = false;
    // We aim to minimize how often we read the current time. Since nearly all
    // functions in the prefetch scheduler are synchronous, we can read the time
    // once and pass it as an argument wherever it's needed.
    const now = Date.now();
    // Process the task queue until we run out of network bandwidth.
    let task = heapPeek(taskHeap);
    while(task !== null && hasNetworkBandwidth(task)){
        task.routeCacheVersion = (0, _cache.getCurrentRouteCacheVersion)();
        task.segmentCacheVersion = (0, _cache.getCurrentSegmentCacheVersion)();
        const exitStatus = pingRoute(now, task);
        // These fields are only valid for a single "pass" — one pingRoute
        // invocation for a task, which is what the comments here also call an
        // attempt or an iteration. Reset them after each iteration of the
        // task queue.
        const hasBackgroundWork = task.hasBackgroundWork;
        task.hasBackgroundWork = false;
        task.hasPendingResponses = false;
        task.spawnedRuntimePrefetches = null;
        switch(exitStatus){
            case 0:
                // The task yielded because there are too many requests in progress.
                // Stop processing tasks until we have more bandwidth.
                return;
            case 1:
                // The task is blocked. It needs more data before it can proceed.
                // Keep the task out of the queue until the server responds.
                heapPop(taskHeap);
                // Continue to the next task
                task = heapPeek(taskHeap);
                continue;
            case 2:
                if (task.phase === 2) {
                    // Finished prefetching the route tree. The two-phase (Shell then
                    // Speculative) flow only applies to routes that have opted into
                    // Partial Prefetching — either globally via the `partialPrefetching`
                    // config or per segment (`prefetch: 'partial'` or
                    // `'unstable_eager'`), all surfaced as the
                    // `SubtreeHasPartialPrefetching` hint on the route tree. Every other
                    // route skips the Shell phase and goes straight to Speculative.
                    //
                    // The route entry is fulfilled at this point (the RouteTree phase
                    // just completed), so its prefetch hints are available.
                    const route = (0, _cache.readRouteCacheEntry)(now, task.key);
                    const routeHasPartialPrefetching = route !== null && route.status === _cache.EntryStatus.Fulfilled && (route.tree.prefetchHints & _approutertypes.PrefetchHint.SubtreeHasPartialPrefetching) !== 0;
                    task.phase = routeHasPartialPrefetching ? 1 : 0;
                    heapResift(taskHeap, task);
                } else if (task.phase === 1) {
                    // Shell phase complete — a Done exit means the pass observed every
                    // response it cares about (otherwise it would have exited Blocked;
                    // see hasPendingResponses). Always advance to Speculative regardless
                    // of whether Shell-phase work fired — Speculative is responsible
                    // for the per-link concrete work and runs even on routes whose
                    // shell phase was a no-op.
                    task.phase = 0;
                    heapResift(taskHeap, task);
                } else if (hasBackgroundWork) {
                    // The task spawned additional background work. Reschedule the task
                    // at background priority.
                    task.priority = _types.PrefetchPriority.Background;
                    heapResift(taskHeap, task);
                } else {
                    // The prefetch is complete. Continue to the next task.
                    //
                    // Completion is terminal in the normal flow: a task only completes
                    // after a full pass observed every response it cares about. In rare
                    // cases, though, a task can complete while still registered on an
                    // entry from an earlier pass whose subtree the final pass no longer
                    // reached; when that entry later settles, it re-pings the completed
                    // task. The re-run is a harmless idempotent no-op, but any
                    // per-completion side effect added here must be idempotent or
                    // once-guarded — in particular, the navigation-lock release below
                    // must not fire twice (hence the nulling).
                    if (false) {}
                    heapPop(taskHeap);
                }
                task = heapPeek(taskHeap);
                continue;
            default:
                exitStatus;
        }
    }
    // Run LRU cleanup only when the scheduler is fully idle: no queued tasks and
    // no in-progress requests. At that point, all active prefetch tasks have
    // finished reading from the cache (moving recently used entries to the front
    // of the list), so only genuinely stale data gets evicted.
    if (task === null && inProgressRequests === 0) {
        (0, _lru.cleanup)();
    }
}
/**
 * Check this during a prefetch task to determine if background work can be
 * performed. If so, it evaluates to `true`. Otherwise, it returns `false`,
 * while also scheduling a background task to run later. Usage:
 *
 * @example
 * if (background(task)) {
 *   // Perform background-pri work
 * }
 *
 * TODO: Model "background" as a phase (like Shell / Speculative) rather
 * than as a priority. Conceptually it's the same pattern: defer work
 * until a later pass over the task. The current priority-based encoding
 * predates the phase model and could be unified.
 */ function background(task) {
    if (task.priority === _types.PrefetchPriority.Background) {
        return true;
    }
    task.hasBackgroundWork = true;
    return false;
}
function pingRoute(now, task) {
    const key = task.key;
    const route = (0, _cache.readOrCreateRouteCacheEntry)(now, task, key);
    const exitStatus = pingRootRouteTree(now, task, route);
    if (exitStatus !== 0 && key.search !== '') {
        // If the URL has a non-empty search string, also prefetch the pathname
        // without the search string. We use the searchless route tree as a base for
        // optimistic routing; see requestOptimisticRouteCacheEntry for details.
        //
        // Note that we don't need to prefetch any of the segment data. Just the
        // route tree.
        //
        // TODO: This is a temporary solution; the plan is to replace this by adding
        // a wildcard lookup method to the TupleMap implementation. This is
        // non-trivial to implement because it needs to account for things like
        // fallback route entries, hence this temporary workaround.
        const url = new URL(key.pathname, location.origin);
        const keyWithoutSearch = (0, _cachekey.createCacheKey)(url.href, key.nextUrl);
        const routeWithoutSearch = (0, _cache.readOrCreateRouteCacheEntry)(now, task, keyWithoutSearch);
        switch(routeWithoutSearch.status){
            case _cache.EntryStatus.Empty:
                {
                    if (background(task)) {
                        routeWithoutSearch.status = _cache.EntryStatus.Pending;
                        spawnPrefetchSubtask((0, _cache.fetchRouteOnCacheMiss)(routeWithoutSearch, keyWithoutSearch, task.segmentCacheMap));
                    }
                    break;
                }
            case _cache.EntryStatus.Pending:
            case _cache.EntryStatus.Fulfilled:
            case _cache.EntryStatus.Rejected:
                {
                    break;
                }
            default:
                routeWithoutSearch;
        }
    }
    if (exitStatus === 2 && task.hasPendingResponses) {
        // The pass traversed the whole tree, but some segment responses haven't
        // arrived yet, so the current phase isn't actually complete. Block until
        // they do (see blockTaskOnPendingResponse for the full rationale).
        return 1;
    }
    return exitStatus;
}
function pingRootRouteTree(now, task, route) {
    switch(route.status){
        case _cache.EntryStatus.Empty:
            {
                // Route is not yet cached, and there's no request already in progress.
                // Spawn a task to request the route, load it into the cache, and ping
                // the task to continue.
                // TODO: There are multiple strategies in the <Link> API for prefetching
                // a route. Currently we've only implemented the main one: per-segment,
                // static-data only.
                //
                // There's also `<Link prefetch={true}>`
                // which prefetch both static *and* dynamic data.
                // Similarly, we need to fallback to the old, per-page
                // behavior if PPR is disabled for a route (via the incremental opt-in).
                //
                // Those cases will be handled here.
                spawnPrefetchSubtask((0, _cache.fetchRouteOnCacheMiss)(route, task.key, task.segmentCacheMap));
                // If the request takes longer than a minute, a subsequent request should
                // retry instead of waiting for this one. When the response is received,
                // this value will be replaced by a new value based on the stale time sent
                // from the server.
                // TODO: We should probably also manually abort the fetch task, to reclaim
                // server bandwidth.
                route.staleAt = now + 60 * 1000;
                // Upgrade to Pending so we know there's already a request in progress
                route.status = _cache.EntryStatus.Pending;
            // Intentional fallthrough to the Pending branch
            }
        case _cache.EntryStatus.Pending:
            {
                // Still pending. We can't start prefetching the segments until the route
                // tree has loaded. Add the task to the set of blocked tasks so that it
                // is notified when the route tree is ready.
                const blockedTasks = route.blockedTasks;
                if (blockedTasks === null) {
                    route.blockedTasks = new Set([
                        task
                    ]);
                } else {
                    blockedTasks.add(task);
                }
                return 1;
            }
        case _cache.EntryStatus.Rejected:
            {
                // Route tree failed to load. Treat as a 404.
                return 2;
            }
        case _cache.EntryStatus.Fulfilled:
            {
                if (task.phase === 2) {
                    // Do not prefetch segment data during the route tree phase.
                    return 2;
                }
                // Recursively fill in the segment tree.
                if (!hasNetworkBandwidth(task)) {
                    // Stop prefetching segments until there's more bandwidth.
                    return 0;
                }
                const tree = route.tree;
                // A task's fetch strategy gets set to `PPR` for any "auto" prefetch.
                // If it turned out that the route isn't PPR-enabled, we need to use `LoadingBoundary` instead.
                // We don't need to do this for runtime prefetches, because those are only available in
                // `cacheComponents`, where every route is PPR.
                let fetchStrategy;
                if (tree.prefetchHints & _approutertypes.PrefetchHint.SubtreeHasPartialPrefetching) {
                    // If Partial Prefetching is enabled anywhere on the target route,
                    // ignore the fetch strategy and switch to unified strategy used by
                    // Cache Components (called `PPR` for now, will likely be renamed).
                    //
                    // In practice, this just means that a "full" prefetch (<Link
                    // prefetch={true}>) has no effect. You're meant to use Runtime
                    // Prefetching instead — that's the new pattern that replaces
                    // prefetch={true}.
                    //
                    // The reason we check for the Partial Prefetching opt-in rather than
                    // the `cacheComponents` flag is to support incremental adoption.
                    // `prefetch={true}` will continue to work until you opt into
                    // Partial Prefetching.
                    fetchStrategy = _types.FetchStrategy.PPR;
                } else if (task.fetchStrategy === _types.FetchStrategy.PPR) {
                    fetchStrategy = route.supportsPerSegmentPrefetching ? _types.FetchStrategy.PPR : _types.FetchStrategy.LoadingBoundary;
                } else {
                    fetchStrategy = task.fetchStrategy;
                }
                switch(fetchStrategy){
                    case _types.FetchStrategy.PPR:
                        {
                            // For Cache Components pages, each segment may be prefetched
                            // statically or using a runtime request, based on various
                            // configurations and heuristics. We'll do this in two passes: first
                            // traverse the tree and perform all the static prefetches.
                            //
                            // Then, if there are any segments that need a runtime request,
                            // do another pass to perform a runtime prefetch.
                            // Derive the static walk's parameters once per pass; the walk
                            // functions below receive them as arguments and are phase-agnostic.
                            // During the Shell phase the walk targets the App Shell variant of
                            // each segment (keyed at the shell vary paths); otherwise it's the
                            // ordinary per-segment static strategy. This is the only place the
                            // phase is consulted — everything below keys off the strategy.
                            const staticWalkStrategy = task.phase === 1 ? _types.FetchStrategy.StaticShell : _types.FetchStrategy.PPR;
                            if (staticWalkStrategy === _types.FetchStrategy.PPR && !subtreeHasSpeculativePrefetch(task.fetchStrategy, tree.prefetchHints)) {
                                // Nothing in the target route needs to be speculatively prefetched.
                                // Bail out. (A PPR walk is the Speculative pass; same check as
                                // the per-subtree bail in pingNewPartOfCacheComponentsTree.)
                                return 2;
                            }
                            pingStaticHead(now, task, route, staticWalkStrategy);
                            const exitStatus = pingSharedPartOfCacheComponentsTree(now, task, route, task.treeAtTimeOfPrefetch, tree, null, staticWalkStrategy);
                            if (exitStatus === 0) {
                                // Child yielded without finishing.
                                return 0;
                            }
                            // We may need to do a runtime prefetch for one or more segments.
                            // Before checking, we can do some fast checks to bail out of this
                            // branch early.
                            //
                            // Runtime prefetches are only issued for walks that require runtime
                            // completeness — the same per-pass predicate that produced the
                            // deopt registrations during the traversal above; see the decision
                            // point in pingNewPartOfCacheComponentsTree. Which segments
                            // actually need a runtime request — registered directly, or only
                            // as the fallback after an insufficient static attempt — was
                            // decided there.
                            if (walkRequiresRuntimeCompleteness(staticWalkStrategy, route)) {
                                const runtimeStrategy = staticWalkStrategy === _types.FetchStrategy.StaticShell ? _types.FetchStrategy.RuntimeShell : _types.FetchStrategy.PPRRuntime;
                                // spawnedRuntimePrefetches was populated during the traversal
                                // above: every subtree in the new part of the tree that needs a
                                // runtime prefetch — plus, during the Shell phase, the head, if
                                // its static attempt was insufficient (see above).
                                //
                                // If it's null, nothing in the new part of the tree is a candidate
                                // for runtime prefetching, and we don't fetch the head, either —
                                // the head is runtime prefetched only if one of the segments is.
                                const spawnedRuntimePrefetches = task.spawnedRuntimePrefetches;
                                if (spawnedRuntimePrefetches !== null) {
                                    const spawnedEntries = new Map();
                                    pingRuntimeHead(now, task, route, spawnedEntries, runtimeStrategy);
                                    const requestTree = pingRuntimePrefetches(now, task, route, tree, spawnedRuntimePrefetches, spawnedEntries, runtimeStrategy);
                                    if (spawnedEntries.size > 0) {
                                        spawnPrefetchSubtask((0, _cache.fetchSegmentPrefetchesUsingDynamicRequest)(task, route, runtimeStrategy, requestTree, spawnedEntries));
                                    }
                                }
                            }
                            return 2;
                        }
                    case _types.FetchStrategy.Full:
                    case _types.FetchStrategy.PPRRuntime:
                    case _types.FetchStrategy.LoadingBoundary:
                        {
                            if (task.phase === 1) {
                                // Shell phase only does work on routes that use the PPR strategy
                                // (Cache Components routes). Other strategies are Shell no-ops
                                // and fall through to Speculative.
                                return 2;
                            }
                            // Prefetch multiple segments using a single dynamic request.
                            // TODO: We can consolidate this branch with previous one by modeling
                            // it as if the first segment in the new tree has runtime prefetching
                            // enabled. Will do this as a follow-up refactor. Might want to remove
                            // the special metatdata case below first. In the meantime, it's not
                            // really that much duplication, just would be nice to remove one of
                            // these codepaths.
                            const spawnedEntries = new Map();
                            pingRuntimeHead(now, task, route, spawnedEntries, fetchStrategy);
                            const dynamicRequestTree = diffRouteTreeAgainstCurrent(now, task, route, task.treeAtTimeOfPrefetch, tree, spawnedEntries, fetchStrategy);
                            let needsDynamicRequest = spawnedEntries.size > 0;
                            if (needsDynamicRequest) {
                                spawnPrefetchSubtask((0, _cache.fetchSegmentPrefetchesUsingDynamicRequest)(task, route, fetchStrategy, dynamicRequestTree, spawnedEntries));
                            }
                            return 2;
                        }
                    default:
                        fetchStrategy;
                }
                break;
            }
        default:
            {
                route;
            }
    }
    return 2;
}
/**
 * Prefetches the Head data for a page (metadata, viewport). The Head is not
 * really a route segment, in the sense that it doesn't appear in the route
 * tree, but we store it in the cache as if it were, using a special key.
 *
 * Symmetric with the per-segment decision point in
 * pingNewPartOfCacheComponentsTree: the head deopts to the runtime prefetch
 * path either when it requires runtime completeness and no static attempt is
 * happening, or when a fulfilled static head entry reported that a runtime
 * request would return more content than the entry contains. Deopting
 * registers the head under its metadata request key, which makes the runtime
 * gate in pingRootRouteTree fire even when every tree segment was
 * sufficient; pingRuntimeHead performs the actual head work.
 */ function pingStaticHead(now, task, route, // it's derived.
fetchStrategy) {
    // The head is subject to the same per-pass runtime-completeness contract
    // as the route's segments: during an App Shell walk, and during any walk
    // of a Partial Prefetching route, the head needs a response at least as
    // complete as a runtime one.
    const headRequiresRuntimeCompleteness = walkRequiresRuntimeCompleteness(fetchStrategy, route);
    if (headRequiresRuntimeCompleteness && // The head is not a tree node — it hangs off the route root — so the
    // static-attempt hint is read from the root's node. (Segments read the
    // bit from their own node; see the decision point in
    // pingNewPartOfCacheComponentsTree.)
    (route.tree.prefetchHints & _approutertypes.PrefetchHint.ShouldAttemptStaticPrefetch) === 0) {
        // No static attempt: the head arrives via the runtime request instead.
        addSpawnedRuntimePrefetch(task, route.metadata.requestKey);
        return;
    }
    if (// on the root), skip the standalone fetch — the head data will arrive
    // as part of that page's response, and its runtime-completeness signal
    // is carried by that page's own entries.
     true && !(route.tree.prefetchHints & _approutertypes.PrefetchHint.HeadOutlined)) {
        return;
    }
    const segments = {
        tree: route.metadata,
        entry: (0, _cache.readOrCreateSegmentCacheEntry)(now, task.segmentCacheMap, fetchStrategy, route.metadata),
        parent: null
    };
    const needsRuntimeRequest = pingSegmentBundle(now, task, route, task.key, route.metadata, segments, fetchStrategy, true);
    if (headRequiresRuntimeCompleteness && needsRuntimeRequest) {
        // The static attempt was insufficient for the head. Deopt to a
        // runtime prefetch. (Outside of runtime-completeness contexts the
        // head's signal is unused — a partial static head is filled in by the
        // navigation-time request, as with any other static segment.)
        addSpawnedRuntimePrefetch(task, route.metadata.requestKey);
    }
}
/**
 * Whether the task needs a cache entry at least as complete as a runtime
 * response for every segment it walks before the prefetch counts as done.
 * Runtime completeness is the universal contract for Partial Prefetching,
 * so the predicate is per pass, not per segment:
 *
 * - Every walk of a route that opts into Partial Prefetching (any segment
 *   with a partial-prefetching config, or the global `partialPrefetching`
 *   flag — both surfaced as SubtreeHasPartialPrefetching on the route
 *   root), in both the Shell and Speculative phases.
 * - Every App Shell (StaticShell) walk, because the App Shell must be
 *   reusable across all params by definition. (In practice this is implied
 *   by the first case — the Shell phase only runs for Partial Prefetching
 *   routes.)
 *
 * Routes without Partial Prefetching keep the static-only contract: their
 * walks prefetch static data and partial entries are acceptable — the
 * dynamic holes are filled by the navigation-time request.
 *
 * Note that on a Partial Prefetching route, non-eager subtrees are still
 * skipped by the Speculative pass of a default (auto) link — eagerness is
 * unaffected by this predicate. But every segment the pass DOES walk (eager
 * segments, and everything on a `prefetch={true}` walk) is held to the
 * runtime-completeness contract. The contract is affordable because most
 * routes carry the ShouldAttemptStaticPrefetch hint: their segments are
 * prefetched statically and the responses' own sufficiency signal makes a
 * runtime request rare. On a hint-unset route, a walked segment deopts
 * directly to the batched runtime request — which then serves the segment's
 * whole subtree, so navigations into it are complete without a
 * navigation-time request.
 *
 * This is also the gate for the batched runtime request at the end of
 * pingRootRouteTree; requiring runtime completeness does not itself mean a
 * runtime request is issued for a given segment — see the decision point in
 * pingNewPartOfCacheComponentsTree.
 */ function walkRequiresRuntimeCompleteness(staticWalkStrategy, route) {
    return staticWalkStrategy === _types.FetchStrategy.StaticShell || (route.tree.prefetchHints & _approutertypes.PrefetchHint.SubtreeHasPartialPrefetching) !== 0;
}
/**
 * The runtime counterpart of a pass's static walk strategy: the strategy the
 * batched runtime request uses if this walk deopts. Each phase has exactly one
 * — the Shell phase escalates to a runtime App Shell, the Speculative phase to
 * a per-link concrete runtime prefetch.
 */ function getRuntimeStrategyForWalk(staticWalkStrategy) {
    return staticWalkStrategy === _types.FetchStrategy.StaticShell ? _types.FetchStrategy.RuntimeShell : _types.FetchStrategy.PPRRuntime;
}
/**
 * Whether this phase's runtime request would return more content for a
 * fulfilled entry than the entry already holds.
 *
 * An entry records the tier its CONTENT achieved, not the one it was requested
 * at, and that tier spans both axes — so a static response that needed no
 * runtime data records the runtime counterpart of its own variant (see
 * `recordedFetchStrategy` in cache.ts). That makes this a pure tier
 * comparison: an entry at or above the phase's runtime tier has nothing to
 * gain from it.
 */ function wouldRuntimeRequestProvideMore(entry, staticWalkStrategy) {
    return (0, _cache.canNewFetchStrategyProvideMoreContent)(entry.fetchStrategy, getRuntimeStrategyForWalk(staticWalkStrategy));
}
/**
 * Register a subtree root (or the head's metadata key) for the batched
 * runtime request issued by the gate at the end of pingRootRouteTree.
 */ function addSpawnedRuntimePrefetch(task, requestKey) {
    if (task.spawnedRuntimePrefetches === null) {
        task.spawnedRuntimePrefetches = new Set([
            requestKey
        ]);
    } else {
        task.spawnedRuntimePrefetches.add(requestKey);
    }
}
function pingRuntimeHead(now, task, route, spawnedEntries, fetchStrategy) {
    pingRouteTreeAndIncludeDynamicData(now, task, route, route.metadata, false, spawnedEntries, // and LoadingBoundary
    fetchStrategy === _types.FetchStrategy.LoadingBoundary ? _types.FetchStrategy.Full : fetchStrategy);
}
// TODO: Rename dynamic -> runtime throughout this module
function pingSharedPartOfCacheComponentsTree(now, task, route, oldTree, newTree, parentBundle, // it's derived.
fetchStrategy) {
    // When Cache Components is enabled (or PPR, or a fully static route when PPR
    // is disabled; those cases are treated equivalently to Cache Components), we
    // start by prefetching each segment individually. Once we reach the "new"
    // part of the tree — the part that doesn't exist on the current page — we
    // may choose to switch to a runtime prefetch instead, based on the
    // information sent by the server in the route tree.
    //
    // The traversal starts in the "shared" part of the tree. Once we reach the
    // "new" part of the tree, we switch to a different traversal,
    // pingNewPartOfCacheComponentsTree.
    // The shared part of the tree always performs the ordinary static (PPR)
    // prefetch, regardless of phase. Phase-specific strategies — the runtime
    // shell request and the Shell phase's StaticShell walk — apply only to the
    // new part of the tree, so the per-pass walk strategy is irrelevant here.
    // (The needs-runtime signal is ignored: shared segments are already
    // rendered on the current page, so a runtime prefetch has nothing to add.)
    const bundleInProgress = accumulateSegmentBundle(now, task, route, newTree, parentBundle, _types.FetchStrategy.PPR, true).bundle;
    // Recursively ping the children.
    const oldTreeChildren = oldTree[1];
    const newTreeChildren = newTree.slots;
    if (newTreeChildren !== null) {
        for (const [parallelRouteKey, newTreeChild] of newTreeChildren){
            if (!hasNetworkBandwidth(task)) {
                // Stop prefetching segments until there's more bandwidth.
                return 0;
            }
            const newTreeChildSegment = newTreeChild.segment;
            const oldTreeChild = oldTreeChildren[parallelRouteKey];
            const oldTreeChildSegment = oldTreeChild?.[0];
            // Only pass the bundle to the child that accepts it. A parent is
            // only ever bundled into one child.
            const bundleForChild =  true && bundleInProgress !== null && newTreeChild.prefetchHints & _approutertypes.PrefetchHint.ParentInlinedIntoSelf ? bundleInProgress : null;
            let childExitStatus;
            if (oldTreeChildSegment !== undefined && doesCurrentSegmentMatchCachedSegment(route, newTreeChildSegment, oldTreeChildSegment)) {
                // We're still in the "shared" part of the tree.
                childExitStatus = pingSharedPartOfCacheComponentsTree(now, task, route, oldTreeChild, newTreeChild, bundleForChild, fetchStrategy);
            } else {
                // We've entered the "new" part of the tree. Switch
                // traversal functions.
                //
                // Bundle chains must not cross the strategy boundary: the shared
                // part walks at PPR while a Shell-phase new part walks at
                // StaticShell, and a chain spanning both would fulfill the shared
                // parent's concrete-path entry with shell-variant data. Nor may we
                // finish the chain by fetching the new-part child at PPR here —
                // that would prefetch new-part segments at the concrete tier
                // during the Shell phase, which only the Speculative phase is
                // allowed to do. So drop the bundle instead, exactly like the
                // Speculative walk's subtree bail does when a chain crosses into a
                // subtree it skips: nothing in a dropped chain was upgraded to
                // Pending, so no entry is stranded, and the inlined shared data is
                // fetched by the Speculative pass whenever its walk of the new
                // part permits the child fetch.
                const bundleForNewPart = fetchStrategy === _types.FetchStrategy.StaticShell ? null : bundleForChild;
                childExitStatus = pingNewPartOfCacheComponentsTree(now, task, route, newTreeChild, bundleForNewPart, fetchStrategy);
            }
            if (childExitStatus === 0) {
                // Child yielded without finishing.
                return 0;
            }
        }
    }
    return 2;
}
function pingNewPartOfCacheComponentsTree(now, task, route, tree, parentBundle, // it's derived.
fetchStrategy) {
    // We're now prefetching in the "new" part of the tree, the part that
    // doesn't exist on the current page. (In other words, we're deeper than
    // the shared layouts.) Segments in here default to being prefetched
    // statically, at the per-pass strategy derived in pingRootRouteTree.
    //
    // When the walk requires runtime completeness — an entry at least as
    // complete as a runtime response for every segment before the prefetch
    // can complete (see walkRequiresRuntimeCompleteness) — this function is
    // also the per-segment decision point. If the segment's node carries the
    // ShouldAttemptStaticPrefetch hint (the build-time prerender accessed no
    // runtime data), its subtree is prefetched statically first,
    // and the responses themselves decide whether that was enough: every
    // fulfilled entry carries a needsRuntimeRequest signal. Pending responses
    // block the task, so the attempt is serial, never raced: static attempt →
    // observe → runtime only if needed. Without the hint, the segment deopts
    // directly. Deopting registers the segment's request key in
    // spawnedRuntimePrefetches; the runtime gate at the end of
    // pingRootRouteTree issues a single batched runtime request for
    // everything that accumulated, and that request re-fetches the whole
    // subtree, so the walk stops descending at a deopt.
    //
    // Outside a runtime-completeness walk the same needsRuntimeRequest signal
    // is routine and ignored — any partial entry of a page that accesses
    // runtime data carries it, and the dynamic holes are filled by the
    // navigation-time request.
    if (// prefetch. (It's also the only pass that walks at FetchStrategy.PPR;
    // the Shell phase walks at StaticShell and covers the whole new tree.)
    fetchStrategy === _types.FetchStrategy.PPR && !subtreeHasSpeculativePrefetch(task.fetchStrategy, tree.prefetchHints)) {
        // Nothing in the new part of the tree needs to be speculatively prefetched.
        // Bail out.
        return 2;
    }
    // Constant for the whole pass; recomputed here only because the walk is
    // recursive and the check is cheap.
    const segmentRequiresRuntimeCompleteness = walkRequiresRuntimeCompleteness(fetchStrategy, route);
    // TODO: The static-attempt hint reflects the build-time prerender's whole
    // runtime-data tracking, so a page that always accesses
    // runtime data after the shell stage never attempts a static prefetch —
    // even though its shell variant is rewindable at the shell boundary and
    // perfectly reusable. The server could emit a second bit derived from the
    // shell-stage value ("a static SHELL attempt is worthwhile even though
    // the page accesses runtime data post-shell") to let such pages attempt
    // static, too.
    // A force-disabled segment deliberately does NOT deopt here: disabling
    // prefetch is passive. It never initiates a request — its accumulation
    // below contributes nothing — and must never be the reason a runtime
    // prefetch spawns, though it may ride along in a runtime response issued
    // on another segment's behalf.
    const attemptStaticPrefetchOfSegment = (tree.prefetchHints & _approutertypes.PrefetchHint.ShouldAttemptStaticPrefetch) !== 0;
    if (segmentRequiresRuntimeCompleteness && !attemptStaticPrefetchOfSegment) {
        // Deopt directly to a runtime prefetch, without a static attempt.
        addSpawnedRuntimePrefetch(task, tree.requestKey);
        // If there's a pending static bundle from a parent, we need to finish
        // prefetching it before bailing out to runtime prefetching.
        if (parentBundle !== null) {
            finishStaticBundleOnRuntimeBailout(now, task, route, tree, parentBundle, fetchStrategy);
        }
        return 2;
    }
    // Prefetch this segment and its subtree statically, using the normal
    // static bundling walk.
    const accumulation = accumulateSegmentBundle(now, task, route, tree, parentBundle, fetchStrategy, true);
    const bundleInProgress = accumulation.bundle;
    if (segmentRequiresRuntimeCompleteness && accumulation.needsRuntimeRequest) {
        // The static attempt for this segment was insufficient. Stop the walk
        // and deopt — the runtime prefetch covers the whole subtree. (Unlike the
        // direct deopt above, any open bundle is dropped rather than finished: a
        // fulfilled InlinedIntoChild node can report a true signal while its
        // chain is still open. That's safe — nothing in an un-pinged chain was
        // upgraded to Pending, so no entry is stranded blocking the task, and
        // Empty entries in the dropped chain are re-fetched by a later pass.)
        addSpawnedRuntimePrefetch(task, tree.requestKey);
        return 2;
    }
    if (tree.slots !== null) {
        if (!hasNetworkBandwidth(task)) {
            // Stop prefetching segments until there's more bandwidth.
            return 0;
        }
        // Recursively ping the children.
        for (const childTree of tree.slots.values()){
            // Only pass the bundle to the child that accepts it. A parent is
            // only ever bundled into one child.
            const bundleForChild =  true && bundleInProgress !== null && childTree.prefetchHints & _approutertypes.PrefetchHint.ParentInlinedIntoSelf ? bundleInProgress : null;
            const childResult = pingNewPartOfCacheComponentsTree(now, task, route, childTree, bundleForChild, fetchStrategy);
            if (childResult === 0) {
                // Child yielded without finishing.
                return 0;
            }
        }
    }
    // The static attempt was sufficient for this segment (each child is its
    // own decision point) — or parts of it are still in flight, in which case
    // the task is blocked and the decision re-runs against the received
    // responses.
    return 2;
}
function diffRouteTreeAgainstCurrent(now, task, route, oldTree, newTree, spawnedEntries, fetchStrategy) {
    // This is a single recursive traversal that does multiple things:
    // - Finds the parts of the target route (newTree) that are not part of
    //   of the current page (oldTree) by diffing them, using the same algorithm
    //   as a real navigation.
    // - Constructs a request tree (FlightRouterState) that describes which
    //   segments need to be prefetched and which ones are already cached.
    // - Creates a set of pending cache entries for the segments that need to
    //   be prefetched, so that a subsequent prefetch task does not request the
    //   same segments again.
    const oldTreeChildren = oldTree[1];
    const newTreeChildren = newTree.slots;
    let requestTreeChildren = {};
    if (newTreeChildren !== null) {
        for (const [parallelRouteKey, newTreeChild] of newTreeChildren){
            const newTreeChildSegment = newTreeChild.segment;
            const oldTreeChild = oldTreeChildren[parallelRouteKey];
            const oldTreeChildSegment = oldTreeChild?.[0];
            if (oldTreeChildSegment !== undefined && doesCurrentSegmentMatchCachedSegment(route, newTreeChildSegment, oldTreeChildSegment)) {
                // This segment is already part of the current route. Keep traversing.
                const requestTreeChild = diffRouteTreeAgainstCurrent(now, task, route, oldTreeChild, newTreeChild, spawnedEntries, fetchStrategy);
                requestTreeChildren[parallelRouteKey] = requestTreeChild;
            } else {
                // This segment is not part of the current route. We're entering a
                // part of the tree that we need to prefetch (unless everything is
                // already cached).
                switch(fetchStrategy){
                    case _types.FetchStrategy.LoadingBoundary:
                        {
                            // When PPR is disabled, we can't prefetch per segment. We must
                            // fallback to the old prefetch behavior and send a dynamic request.
                            // Only routes that include a loading boundary can be prefetched in
                            // this way.
                            //
                            // This is simlar to a "full" prefetch, but we're much more
                            // conservative about which segments to include in the request.
                            //
                            // The server will only render up to the first loading boundary
                            // inside new part of the tree. If there's no loading boundary
                            // anywhere in the tree, the server will never return any data, so
                            // we can skip the request.
                            const subtreeHasLoadingBoundary = (newTreeChild.prefetchHints & (_approutertypes.PrefetchHint.SegmentHasLoadingBoundary | _approutertypes.PrefetchHint.SubtreeHasLoadingBoundary)) !== 0;
                            const requestTreeChild = subtreeHasLoadingBoundary ? pingPPRDisabledRouteTreeUpToLoadingBoundary(now, task, route, newTreeChild, null, spawnedEntries) : (0, _cache.convertRouteTreeToFlightRouterState)(newTreeChild);
                            requestTreeChildren[parallelRouteKey] = requestTreeChild;
                            break;
                        }
                    case _types.FetchStrategy.PPRRuntime:
                        {
                            // This is a runtime prefetch. Fetch all cacheable data in the tree,
                            // not just the static PPR shell.
                            const requestTreeChild = pingRouteTreeAndIncludeDynamicData(now, task, route, newTreeChild, false, spawnedEntries, fetchStrategy);
                            requestTreeChildren[parallelRouteKey] = requestTreeChild;
                            break;
                        }
                    case _types.FetchStrategy.Full:
                        {
                            // This is a "full" prefetch. Fetch all the data in the tree, both
                            // static and dynamic. We issue roughly the same request that we
                            // would during a real navigation. The goal is that once the
                            // navigation occurs, the router should not have to fetch any
                            // additional data.
                            //
                            // Although the response will include dynamic data, opting into a
                            // Full prefetch — via <Link prefetch={true}> — implicitly
                            // instructs the cache to treat the response as "static", or non-
                            // dynamic, since the whole point is to cache it for
                            // future navigations.
                            //
                            // Construct a tree (currently a FlightRouterState) that represents
                            // which segments need to be prefetched and which ones are already
                            // cached. If the tree is empty, then we can exit. Otherwise, we'll
                            // send the request tree to the server and use the response to
                            // populate the segment cache.
                            const requestTreeChild = pingRouteTreeAndIncludeDynamicData(now, task, route, newTreeChild, false, spawnedEntries, fetchStrategy);
                            requestTreeChildren[parallelRouteKey] = requestTreeChild;
                            break;
                        }
                    default:
                        fetchStrategy;
                }
            }
        }
    }
    const requestTree = [
        newTree.segment,
        requestTreeChildren,
        null,
        null
    ];
    if (newTree.prefetchHints !== 0) {
        requestTree[4] = newTree.prefetchHints;
    }
    return requestTree;
}
function pingPPRDisabledRouteTreeUpToLoadingBoundary(now, task, route, tree, refetchMarkerContext, spawnedEntries) {
    // This function is similar to pingRouteTreeAndIncludeDynamicData, except the
    // server is only going to return a minimal loading state — it will stop
    // rendering at the first loading boundary. Whereas a Full prefetch is
    // intentionally aggressive and tries to pretfetch all the data that will be
    // needed for a navigation, a LoadingBoundary prefetch is much more
    // conservative. For example, it will omit from the request tree any segment
    // that is already cached, regardles of whether it's partial or full. By
    // contrast, a Full prefetch will refetch partial segments.
    // "inside-shared-layout" tells the server where to start looking for a
    // loading boundary.
    let refetchMarker = refetchMarkerContext === null ? 'inside-shared-layout' : null;
    const segment = (0, _cache.readOrCreateSegmentCacheEntry)(now, task.segmentCacheMap, task.fetchStrategy, tree);
    switch(segment.status){
        case _cache.EntryStatus.Empty:
            {
                // This segment is not cached. Add a refetch marker so the server knows
                // to start rendering here.
                // TODO: Instead of a "refetch" marker, we could just omit this subtree's
                // FlightRouterState from the request tree. I think this would probably
                // already work even without any updates to the server. For consistency,
                // though, I'll send the full tree and we'll look into this later as part
                // of a larger redesign of the request protocol.
                // Add the pending cache entry to the result map.
                const pendingSegment = (0, _cache.upgradeToPendingSegment)(segment, // might not include it in the pending response. If another route is able
                // to issue a per-segment request, we'll do that in the background.
                _types.FetchStrategy.LoadingBoundary);
                spawnedEntries.set(tree.requestKey, pendingSegment);
                // The pass blocks on every request it spawns, not just requests it
                // finds already in flight.
                blockTaskOnPendingResponse(task, pendingSegment);
                if (refetchMarkerContext !== 'refetch') {
                    refetchMarker = refetchMarkerContext = 'refetch';
                } else {
                // There's already a parent with a refetch marker, so we don't need
                // to add another one.
                }
                break;
            }
        case _cache.EntryStatus.Fulfilled:
            {
                // The segment is already cached.
                const segmentHasLoadingBoundary = (tree.prefetchHints & _approutertypes.PrefetchHint.SegmentHasLoadingBoundary) !== 0;
                if (segmentHasLoadingBoundary) {
                    // This segment has a loading boundary, which means the server won't
                    // render its children. So there's nothing left to prefetch along this
                    // path. We can bail out.
                    return (0, _cache.convertRouteTreeToFlightRouterState)(tree);
                }
                break;
            }
        case _cache.EntryStatus.Pending:
            {
                // There's another prefetch currently in progress. Don't add the refetch
                // marker yet, so the server knows it can skip rendering this segment.
                // The pass still depends on the in-flight response, so wait for it
                // before the phase can complete.
                blockTaskOnPendingResponse(task, segment);
                break;
            }
        case _cache.EntryStatus.Rejected:
            {
                break;
            }
        default:
            segment;
    }
    const requestTreeChildren = {};
    if (tree.slots !== null) {
        for (const [parallelRouteKey, childTree] of tree.slots){
            requestTreeChildren[parallelRouteKey] = pingPPRDisabledRouteTreeUpToLoadingBoundary(now, task, route, childTree, refetchMarkerContext, spawnedEntries);
        }
    }
    const requestTree = [
        tree.segment,
        requestTreeChildren,
        null,
        refetchMarker
    ];
    if (tree.prefetchHints !== 0) {
        requestTree[4] = tree.prefetchHints;
    }
    return requestTree;
}
/**
 * Called during a pass when a segment's response hasn't been received yet —
 * whether the request was just spawned by this pass or was already in flight.
 * Marks the task as blocked: a phase only completes once a full pass observes
 * every segment response it cares about, because later decisions (like
 * whether a segment needs a follow-up runtime request) are made against the
 * contents of those responses, and a phase may need to restart its work based
 * on what they contain. The task is re-pinged (via pingBlockedTasks in
 * cache.ts) when the entry resolves, re-running the pass against the
 * received data. Only a pass that observes every response may advance the
 * phase or complete the task.
 *
 * Never call this for an entry that's already Rejected — nothing ever pings
 * a Rejected entry, so registering on one would strand the task. A rejected
 * segment is simply skipped: the pass keeps prefetching the rest of the tree
 * without it.
 */ function blockTaskOnPendingResponse(task, segment) {
    // This state is reset after each iteration of the task queue. We use it to
    // inform the scheduler that the task is blocked.
    task.hasPendingResponses = true;
    // Add the task to this segment's blocked tasks, so it can be rescheduled
    // once the segment finishes loading.
    if (segment.blockedTasks === null) {
        segment.blockedTasks = new Set([
            task
        ]);
    } else {
        segment.blockedTasks.add(task);
    }
}
function pingRouteTreeAndIncludeDynamicData(now, task, route, tree, isInsideRefetchingParent, spawnedEntries, fetchStrategy) {
    // The tree we're constructing is the same shape as the tree we're navigating
    // to. But even though this is a "new" tree, some of the individual segments
    // may be cached as a result of other route prefetches.
    //
    // So we need to find the first uncached segment along each path add an
    // explicit "refetch" marker so the server knows where to start rendering.
    // Once the server starts rendering along a path, it keeps rendering the
    // entire subtree.
    const segment = (0, _cache.readOrCreateSegmentCacheEntry)(now, task.segmentCacheMap, // and we have to use the former here.
    // We can have a task with `FetchStrategy.PPR` where some of its segments are configured to
    // always use runtime prefetching (via `export const prefetch`), and those should check for
    // entries that include search params.
    fetchStrategy, tree);
    let spawnedSegment = null;
    switch(segment.status){
        case _cache.EntryStatus.Empty:
            {
                // This segment is not cached.
                if (fetchStrategy === _types.FetchStrategy.Full) {
                    // Check if there's a matching entry in the bfcache. If so, fulfill the
                    // segment using the bfcache entry instead of issuing a new request.
                    const fulfilled = (0, _cache.attemptToFulfillDynamicSegmentFromBFCache)(now, segment, tree);
                    if (fulfilled !== null) {
                        break;
                    }
                }
                // Include it in the request.
                spawnedSegment = (0, _cache.upgradeToPendingSegment)(segment, fetchStrategy);
                break;
            }
        case _cache.EntryStatus.Fulfilled:
            {
                // The segment is already cached.
                if (segment.isPartial && (0, _cache.canNewFetchStrategyProvideMoreContent)(segment.fetchStrategy, fetchStrategy)) {
                    // The cached segment contains dynamic holes, and was prefetched using a
                    // less specific strategy than the current one. This means we're in one
                    // of these cases:
                    //   - we have a static prefetch, and we're doing a runtime prefetch
                    //   - we have a static or runtime prefetch, and we're doing a Full
                    //     prefetch (or a navigation).
                    // In either case, we need to include it in the request to get a more
                    // specific (or full) version. However, if there's a non-stale bfcache
                    // entry from a previous navigation, prefer that over making a new
                    // request.
                    if (fetchStrategy === _types.FetchStrategy.Full) {
                        const fulfilled = (0, _cache.attemptToUpgradeSegmentFromBFCache)(now, task.segmentCacheMap, tree);
                        if (fulfilled !== null) {
                            break;
                        }
                    }
                    spawnedSegment = pingFullSegmentRevalidation(now, task, tree, fetchStrategy);
                }
                break;
            }
        case _cache.EntryStatus.Pending:
        case _cache.EntryStatus.Rejected:
            {
                // There's either another prefetch currently in progress, or the previous
                // attempt failed. If the new strategy can provide more content, fetch it again.
                if ((0, _cache.canNewFetchStrategyProvideMoreContent)(segment.fetchStrategy, fetchStrategy)) {
                    spawnedSegment = pingFullSegmentRevalidation(now, task, tree, fetchStrategy);
                }
                if (segment.status === _cache.EntryStatus.Pending) {
                    // A response for this segment is still in flight. The pass must
                    // observe it before the phase can complete.
                    blockTaskOnPendingResponse(task, segment);
                } else {
                // The segment failed to load, or the server intentionally omitted it
                // from a response (both are encoded as Rejected). Skip it and keep
                // prefetching the rest of the tree; the entry's staleAt governs when
                // it may be retried. Don't register the task on the rejected entry —
                // nothing ever pings a Rejected entry.
                //
                // TODO: The cache encodes real failures and intentional server
                // omissions identically (both Rejected); with per-segment skipping
                // this has no task-lifecycle consequence, but distinguishing them
                // could still be useful someday.
                }
                break;
            }
        default:
            segment;
    }
    if (spawnedSegment !== null) {
        // A pass must observe the response for every request it spawns before
        // its phase can complete — not just requests it finds already in flight.
        // Block on the entry we just spawned; the task is re-pinged when it's
        // fulfilled or rejected.
        blockTaskOnPendingResponse(task, spawnedSegment);
    }
    const requestTreeChildren = {};
    if (tree.slots !== null) {
        for (const [parallelRouteKey, childTree] of tree.slots){
            requestTreeChildren[parallelRouteKey] = pingRouteTreeAndIncludeDynamicData(now, task, route, childTree, isInsideRefetchingParent || spawnedSegment !== null, spawnedEntries, fetchStrategy);
        }
    }
    if (spawnedSegment !== null) {
        // Add the pending entry to the result map.
        spawnedEntries.set(tree.requestKey, spawnedSegment);
    }
    // Don't bother to add a refetch marker if one is already present in a parent.
    const refetchMarker = !isInsideRefetchingParent && spawnedSegment !== null ? 'refetch' : null;
    const requestTree = [
        tree.segment,
        requestTreeChildren,
        null,
        refetchMarker
    ];
    if (tree.prefetchHints !== 0) {
        requestTree[4] = tree.prefetchHints;
    }
    return requestTree;
}
function pingRuntimePrefetches(now, task, route, tree, spawnedRuntimePrefetches, spawnedEntries, fetchStrategy) {
    // Construct a request tree (FlightRouterState) for a runtime prefetch. If
    // a segment is part of the runtime prefetch, the tree is constructed by
    // diffing against what's already in the prefetch cache. Otherwise, we send
    // a regular FlightRouterState with no special markers.
    //
    // See pingRouteTreeAndIncludeDynamicData for details.
    if (spawnedRuntimePrefetches.has(tree.requestKey)) {
        // This segment needs a runtime prefetch.
        return pingRouteTreeAndIncludeDynamicData(now, task, route, tree, false, spawnedEntries, fetchStrategy);
    }
    let requestTreeChildren = {};
    const slots = tree.slots;
    if (slots !== null) {
        for (const [parallelRouteKey, childTree] of slots){
            requestTreeChildren[parallelRouteKey] = pingRuntimePrefetches(now, task, route, childTree, spawnedRuntimePrefetches, spawnedEntries, fetchStrategy);
        }
    }
    // This segment is not part of the runtime prefetch. Clone the base tree.
    const requestTree = [
        tree.segment,
        requestTreeChildren,
        null,
        null
    ];
    if (tree.prefetchHints !== 0) {
        requestTree[4] = tree.prefetchHints;
    }
    return requestTree;
}
/**
 * Walk a SegmentBundle, apply status-based logic to each entry, and if any
 * entries need data, spawn a single fetch request for the whole bundle.
 *
 * Returns true if a fulfilled entry in the bundle reported that a runtime
 * request would return more content than the entry contains
 * (needsRuntimeRequest, derived at write time from the response that
 * produced the entry). The callers surface this signal to the per-segment
 * decision point in pingNewPartOfCacheComponentsTree (and its analog for
 * the head in pingStaticHead), which uses it during a static attempt to
 * decide whether to fall back to a runtime prefetch.
 */ function pingSegmentBundle(now, task, route, routeKey, tree, segments, fetchStrategy, // (finishStaticBundleOnRuntimeBailout). The finish exists only to fetch
// data the batched runtime request won't cover — Empty entries in the
// chain — so it must not spawn revalidations over entries that are
// already settled or in flight: the chain's terminal segments are inside
// the deopted subtree, and re-fetching their static bundle would at best
// duplicate the runtime request and at worst replace a runtime-complete
// entry (e.g. a runtime App Shell) with a less complete static fallback
// response.
spawnRevalidations) {
    let segmentCount = 0;
    let needsFetch = false;
    let needsRuntimeRequest = false;
    let node = segments;
    while(node !== null){
        segmentCount++;
        const nodeEntry = node.entry;
        const nodeTree = node.tree;
        if (nodeEntry === null || nodeTree === null) {
            node = node.parent;
            continue;
        }
        switch(nodeEntry.status){
            case _cache.EntryStatus.Empty:
                (0, _cache.upgradeToPendingSegment)(nodeEntry, fetchStrategy);
                needsFetch = true;
                // The pass blocks on every request it spawns, not just requests it
                // finds already in flight.
                blockTaskOnPendingResponse(task, nodeEntry);
                break;
            case _cache.EntryStatus.Pending:
                if (spawnRevalidations && // During a static shell attempt, never spawn revalidations — just
                // wait for the in-flight response (blocked below); its sufficiency
                // is checked on the re-run pass.
                fetchStrategy === _types.FetchStrategy.PPR && (0, _cache.canNewFetchStrategyProvideMoreContent)(nodeEntry.fetchStrategy, fetchStrategy)) {
                    const revalidatingEntry = (0, _cache.readOrCreateRevalidatingSegmentEntry)(now, task.segmentCacheMap, fetchStrategy, nodeTree);
                    if (revalidatingEntry.status === _cache.EntryStatus.Empty) {
                        (0, _cache.upgradeToPendingSegment)(revalidatingEntry, fetchStrategy);
                        node.entry = revalidatingEntry;
                        needsFetch = true;
                        // Block on the revalidation request we just spawned, in
                        // addition to the original in-flight entry (blocked below).
                        blockTaskOnPendingResponse(task, revalidatingEntry);
                    } else {
                        node.entry = null;
                    }
                } else {
                    node.entry = null;
                }
                blockTaskOnPendingResponse(task, nodeEntry);
                break;
            case _cache.EntryStatus.Rejected:
                if (spawnRevalidations && // During a static shell attempt, a rejected entry is skipped
                // outright: no retry revalidation, and — deliberately — no runtime
                // fallback either (per-segment rejection semantics; the entry's
                // staleAt governs when it may be retried). Note that the cache
                // path encodes "no shell exists" (a static response whose shell
                // byte offset is 0, i.e. the page wasn't produced by staged
                // rendering) as a rejection too, so such segments get no shell
                // prefetch at all — an edge that shouldn't occur for hint-set
                // Cache Components routes.
                fetchStrategy === _types.FetchStrategy.PPR && (0, _cache.canNewFetchStrategyProvideMoreContent)(nodeEntry.fetchStrategy, fetchStrategy)) {
                    const revalidatingEntry = (0, _cache.readOrCreateRevalidatingSegmentEntry)(now, task.segmentCacheMap, fetchStrategy, nodeTree);
                    if (revalidatingEntry.status === _cache.EntryStatus.Empty) {
                        (0, _cache.upgradeToPendingSegment)(revalidatingEntry, fetchStrategy);
                        node.entry = revalidatingEntry;
                        needsFetch = true;
                        // Block on the retry revalidation we just spawned, like any
                        // other pending response. If the retry succeeds, its upsert
                        // evicts the rejected entry (see evictShadowingSegmentEntries
                        // in cache.ts) and the re-run pass reads the healed data. If it
                        // rejects too, the re-run observes a settled revalidation and
                        // moves on.
                        blockTaskOnPendingResponse(task, revalidatingEntry);
                    } else {
                        node.entry = null;
                    }
                } else {
                    node.entry = null;
                }
                break;
            case _cache.EntryStatus.Fulfilled:
                {
                    const runtimeWouldProvideMore = wouldRuntimeRequestProvideMore(nodeEntry, fetchStrategy);
                    if (runtimeWouldProvideMore) {
                        // A runtime request would return more content for this segment
                        // than the entry contains. Surface it via the return value, so the
                        // caller can deopt this subtree to a runtime prefetch.
                        needsRuntimeRequest = true;
                    }
                    // For entries below this phase's tier, upgrade during the phase
                    // itself — no background deferral, since the whole point of the
                    // Speculative phase is to bring the cache up to the
                    // per-link-concrete tier. `isPartial` ensures a complete entry isn't
                    // re-fetched.
                    //
                    // Exception: when a runtime request would return more AND this walk
                    // permits one, skip the static path entirely. The runtime request
                    // covers this segment and supersedes anything a static fetch could
                    // add, so a static upgrade would at best duplicate it — delivering
                    // the same content twice — and at worst replace runtime content with
                    // static content.
                    //
                    // When no runtime request is permitted, the signal is irrelevant:
                    // nothing can act on it, so it must not suppress the static upgrade.
                    // That's what keeps a link prefetching static content on top of a
                    // cached shell.
                    const willBeSupersededByRuntimeRequest = runtimeWouldProvideMore && walkRequiresRuntimeCompleteness(fetchStrategy, route);
                    // Check if we should attempt to upgrade a fallback ISR response to
                    // a concrete version.
                    const isUpgradeableISRFallbackRetry = nodeEntry.isUpgradeableISRFallback && // If the status is empty, then we haven't yet attempted to upgrade
                    // the fallback.
                    //
                    // If the status is fulfilled, then the fallback was
                    // successfully upgraded to a concrete version.
                    //
                    // Do not attempt to upgrade if the status is Pending or Rejected.
                    (task.fallbackRetryStatus === _cache.EntryStatus.Empty || task.fallbackRetryStatus === _cache.EntryStatus.Fulfilled);
                    if (spawnRevalidations && !willBeSupersededByRuntimeRequest && (nodeEntry.isPartial && (0, _cache.canNewFetchStrategyProvideMoreContent)(nodeEntry.fetchStrategy, fetchStrategy) || isUpgradeableISRFallbackRetry)) {
                        const revalidatingEntry = (0, _cache.readOrCreateRevalidatingSegmentEntry)(now, task.segmentCacheMap, fetchStrategy, nodeTree);
                        if (revalidatingEntry.status === _cache.EntryStatus.Empty) {
                            (0, _cache.upgradeToPendingSegment)(revalidatingEntry, fetchStrategy);
                            node.entry = revalidatingEntry;
                            needsFetch = true;
                            // The pass blocks on every request it spawns, including
                            // revalidations of an already-fulfilled entry.
                            blockTaskOnPendingResponse(task, revalidatingEntry);
                        } else {
                            // A non-empty revalidating entry means a request is already in
                            // flight (or recently settled), so we dedupe and don't issue a
                            // competing one — including for ISR-fallback upgrades, which then
                            // share the same revalidation across tasks.
                            node.entry = null;
                            if (revalidatingEntry.status === _cache.EntryStatus.Pending) {
                                // The deduped-against revalidation is still in flight, and this
                                // pass depends on its response. Wait for it before the phase
                                // can complete. (A settled revalidation we chose not to use
                                // needs no waiting and is not a prefetch failure — the base
                                // entry here is already Fulfilled.)
                                blockTaskOnPendingResponse(task, revalidatingEntry);
                            }
                        }
                    } else {
                        node.entry = null;
                    }
                    break;
                }
            default:
                nodeEntry;
        }
        node = node.parent;
    }
    if (needsFetch) {
        spawnPrefetchSubtask((0, _cache.fetchSegmentsOnCacheMiss)(task, route, routeKey, tree, segments, segmentCount, fetchStrategy));
    }
    return needsRuntimeRequest;
}
/**
 * During the tree walk, decide whether this segment should be added to the
 * in-progress bundle (if it has InlinedIntoChild) or finalize the bundle
 * and ping it, triggering a fetch if any of its entries need data (if it
 * doesn't). Returns the updated bundle to pass to children (null if the
 * bundle was finalized here), along with the needs-runtime signal from the
 * bundle ping, if one happened (always false otherwise).
 */ function accumulateSegmentBundle(now, task, route, tree, parentBundle, // PPR for the normal static bundling walk; StaticShell during the Shell
// phase's static App Shell attempt, whose entries are keyed at the shell
// vary paths.
fetchStrategy, // pingSegmentBundle.
spawnRevalidations) {
    // Prefetching is disabled for this segment (prefetch: 'force-disabled'):
    // the server emits null for its slot, and it participates in the bundle
    // chain with null tree/entry so the null-slot positions line up.
    // (Partial Prefetching segments are NOT in this mask — the server emits
    // static data for them unconditionally.) Intentionally not gated by the
    // prefetch inlining flag: we never statically prefetch unprefetchable
    // segments.
    if (tree.prefetchHints & _approutertypes.StaticPrefetchDisabled) {
        return {
            bundle: {
                tree: null,
                entry: null,
                parent: parentBundle
            },
            needsRuntimeRequest: false
        };
    }
    const segment = (0, _cache.readOrCreateSegmentCacheEntry)(now, task.segmentCacheMap, fetchStrategy, tree);
    if ( true && tree.prefetchHints & _approutertypes.PrefetchHint.InlinedIntoChild) {
        if (segment.status === _cache.EntryStatus.Pending) {
            // The chain this entry joins may be dropped before it's ever pinged
            // (see the drop sites in pingNewPartOfCacheComponentsTree), and only
            // the ping blocks on Pending entries. Register on the in-flight
            // response at read time instead, so the pass observes it before the
            // phase can complete even if the chain is dropped. When the chain does
            // get pinged, the ping's own registration dedupes against this one.
            blockTaskOnPendingResponse(task, segment);
        }
        return {
            bundle: {
                tree,
                entry: segment,
                parent: parentBundle
            },
            // No bundle ping happens here, but the node's own entry may already be
            // fulfilled and insufficient. Report that signal directly: the chain
            // ping only reaches the terminal descendant, and if that descendant is
            // itself a decision point it consumes the signal for its own subtree,
            // leaving this ancestor's insufficiency invisible to the decision
            // point above it.
            needsRuntimeRequest: segment.status === _cache.EntryStatus.Fulfilled && wouldRuntimeRequestProvideMore(segment, fetchStrategy)
        };
    }
    // Not bundled. Build a single-node bundle and ping it. If this page
    // accepts the head (HeadInlinedIntoSelf), prepend the head's cache entry
    // to the bundle.
    let effectiveParent = parentBundle;
    if ( true && tree.prefetchHints & _approutertypes.PrefetchHint.HeadInlinedIntoSelf) {
        effectiveParent = {
            tree: route.metadata,
            entry: (0, _cache.readOrCreateSegmentCacheEntry)(now, task.segmentCacheMap, fetchStrategy, route.metadata),
            parent: parentBundle
        };
    }
    const segments = {
        tree,
        entry: segment,
        parent: effectiveParent
    };
    const needsRuntimeRequest = pingSegmentBundle(now, task, route, task.key, tree, segments, fetchStrategy, spawnRevalidations);
    return {
        bundle: null,
        needsRuntimeRequest
    };
}
function finishStaticBundleOnRuntimeBailout(now, task, route, tree, parentBundle, // Any needs-runtime signal from finishing the bundle is dropped: the
// caller is already deopting this subtree to a runtime prefetch.
fetchStrategy) {
    const bundle = accumulateSegmentBundle(now, task, route, tree, parentBundle, fetchStrategy, // Empty entries the chain would otherwise strand — never spawn
    // revalidations over settled or in-flight ones. See pingSegmentBundle.
    false).bundle;
    if (bundle === null) {
        return;
    }
    if (tree.slots !== null) {
        for (const childTree of tree.slots.values()){
            if (childTree.prefetchHints & _approutertypes.PrefetchHint.ParentInlinedIntoSelf) {
                finishStaticBundleOnRuntimeBailout(now, task, route, childTree, bundle, fetchStrategy);
                return;
            }
        }
    }
}
function pingFullSegmentRevalidation(now, task, tree, fetchStrategy) {
    const revalidatingSegment = (0, _cache.readOrCreateRevalidatingSegmentEntry)(now, task.segmentCacheMap, fetchStrategy, tree);
    if (revalidatingSegment.status === _cache.EntryStatus.Empty) {
        // During a Full/PPRRuntime prefetch, a single dynamic request is made for all the
        // segments that we need. So we don't initiate a request here directly. By
        // returning a pending entry from this function, it signals to the caller
        // that this segment should be included in the request that's sent to
        // the server.
        const pendingSegment = (0, _cache.upgradeToPendingSegment)(revalidatingSegment, fetchStrategy);
        // The upsert is handled by fulfillEntrySpawnedByRuntimePrefetch
        // when the dynamic prefetch response is written into the cache.
        return pendingSegment;
    } else {
        // There's already a revalidation in progress.
        const nonEmptyRevalidatingSegment = revalidatingSegment;
        if ((0, _cache.canNewFetchStrategyProvideMoreContent)(nonEmptyRevalidatingSegment.fetchStrategy, fetchStrategy)) {
            // The existing revalidation was fetched using a less specific strategy.
            // Reset it and start a new revalidation.
            const emptySegment = (0, _cache.overwriteRevalidatingSegmentCacheEntry)(now, task.segmentCacheMap, fetchStrategy, tree);
            const pendingSegment = (0, _cache.upgradeToPendingSegment)(emptySegment, fetchStrategy);
            // The upsert is handled by fulfillEntrySpawnedByRuntimePrefetch
            // when the dynamic prefetch response is written into the cache.
            return pendingSegment;
        }
        switch(nonEmptyRevalidatingSegment.status){
            case _cache.EntryStatus.Pending:
                // There's already an in-progress prefetch that includes this segment.
                // The pass needs the contents of that response, too. Wait for it
                // before the phase can complete.
                blockTaskOnPendingResponse(task, nonEmptyRevalidatingSegment);
                return null;
            case _cache.EntryStatus.Fulfilled:
            case _cache.EntryStatus.Rejected:
                // A previous revalidation attempt finished, but we chose not to replace
                // the existing entry in the cache. Don't try again until or unless the
                // revalidation entry expires.
                return null;
            default:
                nonEmptyRevalidatingSegment;
                return null;
        }
    }
}
function doesCurrentSegmentMatchCachedSegment(route, currentSegment, cachedSegment) {
    if (cachedSegment === _segment.PAGE_SEGMENT_KEY) {
        // In the FlightRouterState stored by the router, the page segment has the
        // rendered search params appended to the name of the segment. In the
        // prefetch cache, however, this is stored separately. So, when comparing
        // the router's current FlightRouterState to the cached FlightRouterState,
        // we need to make sure we compare both parts of the segment.
        // TODO: This is not modeled clearly. We use the same type,
        // FlightRouterState, for both the CacheNode tree _and_ the prefetch cache
        // _and_ the server response format, when conceptually those are three
        // different things and treated in different ways. We should encode more of
        // this information into the type design so mistakes are less likely.
        return currentSegment === (0, _segment.addSearchParamsIfPageSegment)(_segment.PAGE_SEGMENT_KEY, (0, _routeparams.urlSearchParamsToParsedUrlQuery)(new URLSearchParams(route.renderedSearch)));
    }
    // Non-page segments are compared using the same function as the server
    return (0, _matchsegments.matchSegment)(cachedSegment, currentSegment);
}
function subtreeHasSpeculativePrefetch(fetchStrategy, prefetchHints) {
    return fetchStrategy === _types.FetchStrategy.Full || // Check if something in this subtree is configured to be eagerly
    // prefetched at the route level. Segments that don't opt into Partial
    // Prefetching are marked eager, so a route without any Partial Prefetching
    // still speculatively prefetches everything.
    (prefetchHints & _approutertypes.PrefetchHint.SubtreeHasEagerPrefetch) !== 0;
}
// -----------------------------------------------------------------------------
// The remainder of the module is a MinHeap implementation. Try not to put any
// logic below here unless it's related to the heap algorithm. We can extract
// this to a separate module if/when we need multiple kinds of heaps.
// -----------------------------------------------------------------------------
function compareQueuePriority(a, b) {
    // Since the queue is a MinHeap, this should return a positive number if b is
    // higher priority than a, and a negative number if a is higher priority
    // than b.
    // `priority` is an integer, where higher numbers are higher priority.
    const priorityDiff = b.priority - a.priority;
    if (priorityDiff !== 0) {
        return priorityDiff;
    }
    // If the priority is the same, check which phase the prefetch is in — is it
    // prefetching the route tree, or the segments? Route trees are prioritized.
    const phaseDiff = b.phase - a.phase;
    if (phaseDiff !== 0) {
        return phaseDiff;
    }
    // Finally, check the insertion order. `sortId` is an incrementing counter
    // assigned to prefetches. We want to process the newest prefetches first.
    return b.sortId - a.sortId;
}
function heapPush(heap, node) {
    const index = heap.length;
    heap.push(node);
    node._heapIndex = index;
    heapSiftUp(heap, node, index);
}
function heapPeek(heap) {
    return heap.length === 0 ? null : heap[0];
}
function heapPop(heap) {
    if (heap.length === 0) {
        return null;
    }
    const first = heap[0];
    first._heapIndex = -1;
    const last = heap.pop();
    if (last !== first) {
        heap[0] = last;
        last._heapIndex = 0;
        heapSiftDown(heap, last, 0);
    }
    return first;
}
function heapDelete(heap, node) {
    const index = node._heapIndex;
    if (index !== -1) {
        node._heapIndex = -1;
        if (heap.length !== 0) {
            const last = heap.pop();
            if (last !== node) {
                heap[index] = last;
                last._heapIndex = index;
                heapSiftDown(heap, last, index);
            }
        }
    }
}
function heapResift(heap, node) {
    const index = node._heapIndex;
    if (index !== -1) {
        if (index === 0) {
            heapSiftDown(heap, node, 0);
        } else {
            const parentIndex = index - 1 >>> 1;
            const parent = heap[parentIndex];
            if (compareQueuePriority(parent, node) > 0) {
                // The parent is larger. Sift up.
                heapSiftUp(heap, node, index);
            } else {
                // The parent is smaller (or equal). Sift down.
                heapSiftDown(heap, node, index);
            }
        }
    }
}
function heapSiftUp(heap, node, i) {
    let index = i;
    while(index > 0){
        const parentIndex = index - 1 >>> 1;
        const parent = heap[parentIndex];
        if (compareQueuePriority(parent, node) > 0) {
            // The parent is larger. Swap positions.
            heap[parentIndex] = node;
            node._heapIndex = parentIndex;
            heap[index] = parent;
            parent._heapIndex = index;
            index = parentIndex;
        } else {
            // The parent is smaller. Exit.
            return;
        }
    }
}
function heapSiftDown(heap, node, i) {
    let index = i;
    const length = heap.length;
    const halfLength = length >>> 1;
    while(index < halfLength){
        const leftIndex = (index + 1) * 2 - 1;
        const left = heap[leftIndex];
        const rightIndex = leftIndex + 1;
        const right = heap[rightIndex];
        // If the left or right node is smaller, swap with the smaller of those.
        if (compareQueuePriority(left, node) < 0) {
            if (rightIndex < length && compareQueuePriority(right, left) < 0) {
                heap[index] = right;
                right._heapIndex = index;
                heap[rightIndex] = node;
                node._heapIndex = rightIndex;
                index = rightIndex;
            } else {
                heap[index] = left;
                left._heapIndex = index;
                heap[leftIndex] = node;
                node._heapIndex = leftIndex;
                index = leftIndex;
            }
        } else if (rightIndex < length && compareQueuePriority(right, node) < 0) {
            heap[index] = right;
            right._heapIndex = index;
            heap[rightIndex] = node;
            node._heapIndex = rightIndex;
            index = rightIndex;
        } else {
            // Neither child is smaller. Exit.
            return;
        }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=scheduler.js.map


/***/ }),

/***/ 58456:
/***/ (() => {

"trimStart"in String.prototype||(String.prototype.trimStart=String.prototype.trimLeft),"trimEnd"in String.prototype||(String.prototype.trimEnd=String.prototype.trimRight),"description"in Symbol.prototype||Object.defineProperty(Symbol.prototype,"description",{configurable:!0,get:function(){var t=/\((.*)\)/.exec(this.toString());return t?t[1]:void 0}}),Array.prototype.flat||(Array.prototype.flat=function(t,r){return r=this.concat.apply([],this),t>1&&r.some(Array.isArray)?r.flat(t-1):r},Array.prototype.flatMap=function(t,r){return this.map(t,r).flat()}),Promise.prototype.finally||(Promise.prototype.finally=function(t){if("function"!=typeof t)return this.then(t,t);var r=this.constructor||Promise;return this.then(function(n){return r.resolve(t()).then(function(){return n})},function(n){return r.resolve(t()).then(function(){throw n})})}),Object.fromEntries||(Object.fromEntries=function(t){return Array.from(t).reduce(function(t,r){return t[r[0]]=r[1],t},{})}),Array.prototype.at||(Array.prototype.at=function(t){var r=Math.trunc(t)||0;if(r<0&&(r+=this.length),!(r<0||r>=this.length))return this[r]}),Object.hasOwn||(Object.hasOwn=function(t,r){if(null==t)throw new TypeError("Cannot convert undefined or null to object");return Object.prototype.hasOwnProperty.call(Object(t),r)}),"canParse"in URL||(URL.canParse=function(t,r){try{return!!new URL(t,r)}catch(t){return!1}});


/***/ }),

/***/ 58465:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Run function with `scroll-behavior: auto` applied to `<html/>`.
 * This css change will be reverted after the function finishes.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "disableSmoothScrollDuringRouteTransition", ({
    enumerable: true,
    get: function() {
        return disableSmoothScrollDuringRouteTransition;
    }
}));
function disableSmoothScrollDuringRouteTransition(fn, options = {}) {
    // if only the hash is changed, we don't need to disable smooth scrolling
    // we only care to prevent smooth scrolling when navigating to a new page to avoid jarring UX
    if (options.onlyHashChange) {
        fn();
        return;
    }
    const htmlElement = document.documentElement;
    const hasDataAttribute = htmlElement.dataset.scrollBehavior === 'smooth';
    if (!hasDataAttribute) {
        // Warn if smooth scrolling is detected but no data attribute is present
        if (false) {}
        // No smooth scrolling configured, run directly without style manipulation
        fn();
        return;
    }
    // Proceed with temporarily disabling smooth scrolling
    const existing = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    if (!options.dontForceLayout) {
        // In Chrome-based browsers we need to force reflow before calling `scrollTo`.
        // Otherwise it will not pickup the change in scrollBehavior
        // More info here: https://github.com/vercel/next.js/issues/40719#issuecomment-1336248042
        htmlElement.getClientRects();
    }
    fn();
    htmlElement.style.scrollBehavior = existing;
} //# sourceMappingURL=disable-smooth-scroll.js.map


/***/ }),

/***/ 58730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var React = __webpack_require__(12115);
function formatProdErrorMessage(code) {
  var url = "https://react.dev/errors/" + code;
  if (1 < arguments.length) {
    url += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var i = 2; i < arguments.length; i++)
      url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return (
    "Minified React error #" +
    code +
    "; visit " +
    url +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function noop() {}
var Internals = {
    d: {
      f: noop,
      r: function () {
        throw Error(formatProdErrorMessage(522));
      },
      D: noop,
      C: noop,
      L: noop,
      m: noop,
      X: noop,
      S: noop,
      M: noop
    },
    p: 0,
    findDOMNode: null
  },
  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
  REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable"),
  REACT_OPTIMISTIC_KEY = Symbol.for("react.optimistic_key");
function createPortal$1(children, containerInfo, implementation) {
  var key =
    3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key:
      null == key
        ? null
        : key === REACT_OPTIMISTIC_KEY
          ? REACT_OPTIMISTIC_KEY
          : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}
var ReactSharedInternals =
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function getCrossOriginStringAs(as, input) {
  if ("font" === as) return "";
  if ("string" === typeof input)
    return "use-credentials" === input ? input : "";
}
exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
  Internals;
exports.browser = function () {
  var recoverable = Error(formatProdErrorMessage(603));
  Object.defineProperty(recoverable, "$$typeof", {
    value: REACT_RECOVERABLE_TYPE
  });
  return recoverable;
};
exports.createPortal = function (children, container) {
  var key =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (
    !container ||
    (1 !== container.nodeType &&
      9 !== container.nodeType &&
      11 !== container.nodeType)
  )
    throw Error(formatProdErrorMessage(299));
  return createPortal$1(children, container, null, key);
};
exports.flushSync = function (fn) {
  var previousTransition = ReactSharedInternals.T,
    previousUpdatePriority = Internals.p;
  try {
    if (((ReactSharedInternals.T = null), (Internals.p = 2), fn)) return fn();
  } finally {
    (ReactSharedInternals.T = previousTransition),
      (Internals.p = previousUpdatePriority),
      Internals.d.f();
  }
};
exports.preconnect = function (href, options) {
  "string" === typeof href &&
    (options
      ? ((options = options.crossOrigin),
        (options =
          "string" === typeof options
            ? "use-credentials" === options
              ? options
              : ""
            : void 0))
      : (options = null),
    Internals.d.C(href, options));
};
exports.prefetchDNS = function (href) {
  "string" === typeof href && Internals.d.D(href);
};
exports.preinit = function (href, options) {
  if ("string" === typeof href && options && "string" === typeof options.as) {
    var as = options.as,
      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
      integrity =
        "string" === typeof options.integrity ? options.integrity : void 0,
      fetchPriority =
        "string" === typeof options.fetchPriority
          ? options.fetchPriority
          : void 0;
    "style" === as
      ? Internals.d.S(
          href,
          "string" === typeof options.precedence ? options.precedence : void 0,
          {
            crossOrigin: crossOrigin,
            integrity: integrity,
            fetchPriority: fetchPriority
          }
        )
      : "script" === as &&
        Internals.d.X(href, {
          crossOrigin: crossOrigin,
          integrity: integrity,
          fetchPriority: fetchPriority,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
  }
};
exports.preinitModule = function (href, options) {
  if ("string" === typeof href)
    if ("object" === typeof options && null !== options) {
      if (null == options.as || "script" === options.as) {
        var crossOrigin = getCrossOriginStringAs(
          options.as,
          options.crossOrigin
        );
        Internals.d.M(href, {
          crossOrigin: crossOrigin,
          integrity:
            "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          fetchPriority:
            "string" === typeof options.fetchPriority
              ? options.fetchPriority
              : void 0
        });
      }
    } else null == options && Internals.d.M(href);
};
exports.preload = function (href, options) {
  if (
    "string" === typeof href &&
    "object" === typeof options &&
    null !== options &&
    "string" === typeof options.as
  ) {
    var as = options.as,
      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
    Internals.d.L(href, as, {
      crossOrigin: crossOrigin,
      integrity:
        "string" === typeof options.integrity ? options.integrity : void 0,
      nonce: "string" === typeof options.nonce ? options.nonce : void 0,
      type: "string" === typeof options.type ? options.type : void 0,
      fetchPriority:
        "string" === typeof options.fetchPriority
          ? options.fetchPriority
          : void 0,
      referrerPolicy:
        "string" === typeof options.referrerPolicy
          ? options.referrerPolicy
          : void 0,
      imageSrcSet:
        "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
      imageSizes:
        "string" === typeof options.imageSizes ? options.imageSizes : void 0,
      media: "string" === typeof options.media ? options.media : void 0
    });
  }
};
exports.preloadModule = function (href, options) {
  if ("string" === typeof href)
    if (options) {
      var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
      Internals.d.m(href, {
        as:
          "string" === typeof options.as && "script" !== options.as
            ? options.as
            : void 0,
        crossOrigin: crossOrigin,
        integrity:
          "string" === typeof options.integrity ? options.integrity : void 0,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0,
        fetchPriority:
          "string" === typeof options.fetchPriority
            ? options.fetchPriority
            : void 0
      });
    } else Internals.d.m(href);
};
exports.requestFormReset = function (form) {
  Internals.d.r(form);
};
exports.unstable_batchedUpdates = function (fn, a) {
  return fn(a);
};
exports.useFormState = function (action, initialState, permalink) {
  return ReactSharedInternals.H.useFormState(action, initialState, permalink);
};
exports.useFormStatus = function () {
  return ReactSharedInternals.H.useHostTransitionStatus();
};
exports.version = "19.3.0-canary-cbb046ab-20260731";


/***/ }),

/***/ 58904:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isNextRouterError", ({
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
}));
const _httpaccessfallback = __webpack_require__(87016);
const _redirecterror = __webpack_require__(57080);
function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-next-router-error.js.map


/***/ }),

/***/ 58956:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
// Browser variant of `./client-boundary-params`. In the browser the params and
// searchParams are created at render time rather than dynamically tracked.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createClientParams: function() {
        return _paramsbrowser.createRenderParamsFromClient;
    },
    createClientSearchParams: function() {
        return _searchparamsbrowser.createRenderSearchParamsFromClient;
    }
});
const _paramsbrowser = __webpack_require__(57704);
const _searchparamsbrowser = __webpack_require__(48159);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-boundary-params.browser.js.map


/***/ }),

/***/ 59643:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const _deploymentid = __webpack_require__(53887);
const deploymentId = (0, _deploymentid.getDeploymentId)();
globalThis.NEXT_DEPLOYMENT_ID = deploymentId;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=register-deployment-id-global.js.map


/***/ }),

/***/ 60398:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "hasInterceptionRouteInCurrentTree", ({
    enumerable: true,
    get: function() {
        return hasInterceptionRouteInCurrentTree;
    }
}));
const _interceptionroutes = __webpack_require__(56469);
function hasInterceptionRouteInCurrentTree([segment, parallelRoutes]) {
    // If we have a dynamic segment, it's marked as an interception route by the presence of the `i` suffix.
    if (Array.isArray(segment) && (segment[2] === 'di(..)(..)' || segment[2] === 'ci(..)(..)' || segment[2] === 'di(.)' || segment[2] === 'ci(.)' || segment[2] === 'di(..)' || segment[2] === 'ci(..)' || segment[2] === 'di(...)' || segment[2] === 'ci(...)')) {
        return true;
    }
    // If segment is not an array, apply the existing string-based check
    if (typeof segment === 'string' && (0, _interceptionroutes.isInterceptionRouteAppPath)(segment)) {
        return true;
    }
    // Iterate through parallelRoutes if they exist
    if (parallelRoutes) {
        for(const key in parallelRoutes){
            if (hasInterceptionRouteInCurrentTree(parallelRoutes[key])) {
                return true;
            }
        }
    }
    return false;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=has-interception-route-in-current-tree.js.map


/***/ }),

/***/ 61304:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "ClientPageRoot", ({
    enumerable: true,
    get: function() {
        return ClientPageRoot;
    }
}));
const _jsxruntime = __webpack_require__(95155);
const _approutercontextsharedruntime = __webpack_require__(22909);
const _react = __webpack_require__(12115);
const _routeparams = __webpack_require__(84536);
const _hooksclientcontextsharedruntime = __webpack_require__(37788);
const _clientboundaryparams = __webpack_require__(58956);
function ClientPageRoot({ Component, serverProvidedParams }) {
    let searchParams;
    let params;
    if (serverProvidedParams !== null) {
        searchParams = serverProvidedParams.searchParams;
        params = serverProvidedParams.params;
    } else {
        // When Cache Components is enabled, the server does not pass the params as
        // props; they are parsed on the client and passed via context.
        const layoutRouterContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
        params = layoutRouterContext !== null ? layoutRouterContext.parentParams : {};
        // This is an intentional behavior change: when Cache Components is enabled,
        // client segments receive the "canonical" search params, not the
        // rewritten ones. Users should either call useSearchParams directly or pass
        // the rewritten ones in from a Server Component.
        // TODO: Log a deprecation error when this object is accessed
        searchParams = (0, _routeparams.urlSearchParamsToParsedUrlQuery)((0, _react.use)(_hooksclientcontextsharedruntime.SearchParamsContext));
    }
    const clientSearchParams = (0, _clientboundaryparams.createClientSearchParams)(searchParams);
    const clientParams = (0, _clientboundaryparams.createClientParams)(params);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
        params: clientParams,
        searchParams: clientSearchParams
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-page.js.map


/***/ }),

/***/ 61426:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(41463);
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
  REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
  REACT_CONTEXT_TYPE = Symbol.for("react.context"),
  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
  REACT_MEMO_TYPE = Symbol.for("react.memo"),
  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
  REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
  REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"),
  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var ReactNoopUpdateQueue = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
  assign = Object.assign,
  emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  if (
    "object" !== typeof partialState &&
    "function" !== typeof partialState &&
    null != partialState
  )
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = !0;
var isArrayImpl = Array.isArray;
function noop() {}
var ReactSharedInternals = { H: null, A: null, T: null, S: null },
  hasOwnProperty = Object.prototype.hasOwnProperty;
function ReactElement(type, key, props) {
  var refProp = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: void 0 !== refProp ? refProp : null,
    props: props
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(oldElement.type, newKey, oldElement.props);
}
function isValidElement(object) {
  return (
    "object" === typeof object &&
    null !== object &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
function escape(key) {
  var escaperLookup = { "=": "=0", ":": "=2" };
  return (
    "$" +
    key.replace(/[=:]/g, function (match) {
      return escaperLookup[match];
    })
  );
}
var userProvidedKeyEscapeRegex = /\/+/g;
function getElementKey(element, index) {
  return "object" === typeof element && null !== element && null != element.key
    ? escape("" + element.key)
    : index.toString(36);
}
function resolveThenable(thenable) {
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      switch (
        ("string" === typeof thenable.status
          ? thenable.then(noop, noop)
          : ((thenable.status = "pending"),
            thenable.then(
              function (fulfilledValue) {
                "pending" === thenable.status &&
                  ((thenable.status = "fulfilled"),
                  (thenable.value = fulfilledValue));
              },
              function (error) {
                "pending" === thenable.status &&
                  ((thenable.status = "rejected"), (thenable.reason = error));
              }
            )),
        thenable.status)
      ) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
      }
  }
  throw thenable;
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = !1;
  if (null === children) invokeCallback = !0;
  else
    switch (type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = !0;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = !0;
            break;
          case REACT_LAZY_TYPE:
            return (
              (invokeCallback = children._init),
              mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              )
            );
        }
    }
  if (invokeCallback)
    return (
      (callback = callback(children)),
      (invokeCallback =
        "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar),
      isArrayImpl(callback)
        ? ((escapedPrefix = ""),
          null != invokeCallback &&
            (escapedPrefix =
              invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),
          mapIntoArray(callback, array, escapedPrefix, "", function (c) {
            return c;
          }))
        : null != callback &&
          (isValidElement(callback) &&
            (callback = cloneAndReplaceKey(
              callback,
              escapedPrefix +
                (null == callback.key ||
                (children && children.key === callback.key)
                  ? ""
                  : ("" + callback.key).replace(
                      userProvidedKeyEscapeRegex,
                      "$&/"
                    ) + "/") +
                invokeCallback
            )),
          array.push(callback)),
      1
    );
  invokeCallback = 0;
  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
  if (isArrayImpl(children))
    for (var i = 0; i < children.length; i++)
      (nameSoFar = children[i]),
        (type = nextNamePrefix + getElementKey(nameSoFar, i)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if (((i = getIteratorFn(children)), "function" === typeof i))
    for (
      children = i.call(children), i = 0;
      !(nameSoFar = children.next()).done;

    )
      (nameSoFar = nameSoFar.value),
        (type = nextNamePrefix + getElementKey(nameSoFar, i++)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if ("object" === type) {
    if ("function" === typeof children.then)
      return mapIntoArray(
        resolveThenable(children),
        array,
        escapedPrefix,
        nameSoFar,
        callback
      );
    array = String(children);
    throw Error(
      "Objects are not valid as a React child (found: " +
        ("[object Object]" === array
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : array) +
        "). If you meant to render a collection of children, use an array instead."
    );
  }
  return invokeCallback;
}
function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [],
    count = 0;
  mapIntoArray(children, result, "", "", function (child) {
    return func.call(context, child, count++);
  });
  return result;
}
function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result,
      thenable = ctor();
    thenable.then(
      function (moduleObject) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 1),
            (payload._result = moduleObject),
            void 0 === thenable.status &&
              ((thenable.status = "fulfilled"),
              (thenable.value = moduleObject));
      },
      function (error) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 2),
            (payload._result = error),
            void 0 === thenable.status &&
              ((thenable.status = "rejected"), (thenable.reason = error));
      }
    );
    -1 === payload._status &&
      ((payload._status = 0), (payload._result = thenable));
  }
  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}
var reportGlobalError =
  "function" === typeof reportError
    ? reportError
    : function (error) {
        if (
          "object" === typeof window &&
          "function" === typeof window.ErrorEvent
        ) {
          var event = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              "object" === typeof error &&
              null !== error &&
              "string" === typeof error.message
                ? String(error.message)
                : String(error),
            error: error
          });
          if (!window.dispatchEvent(event)) return;
        } else if (
          "object" === typeof process &&
          "function" === typeof process.emit
        ) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      };
function startTransition(scope) {
  var prevTransition = ReactSharedInternals.T,
    currentTransition = {};
  currentTransition.types =
    null !== prevTransition ? prevTransition.types : null;
  ReactSharedInternals.T = currentTransition;
  try {
    var returnValue = scope(),
      onStartTransitionFinish = ReactSharedInternals.S;
    null !== onStartTransitionFinish &&
      onStartTransitionFinish(currentTransition, returnValue);
    "object" === typeof returnValue &&
      null !== returnValue &&
      "function" === typeof returnValue.then &&
      returnValue.then(noop, reportGlobalError);
  } catch (error) {
    reportGlobalError(error);
  } finally {
    null !== prevTransition &&
      null !== currentTransition.types &&
      (prevTransition.types = currentTransition.types),
      (ReactSharedInternals.T = prevTransition);
  }
}
function addTransitionType(type) {
  var transition = ReactSharedInternals.T;
  if (null !== transition) {
    var transitionTypes = transition.types;
    null === transitionTypes
      ? (transition.types = [type])
      : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
  } else startTransition(addTransitionType.bind(null, type));
}
var Children = {
  map: mapChildren,
  forEach: function (children, forEachFunc, forEachContext) {
    mapChildren(
      children,
      function () {
        forEachFunc.apply(this, arguments);
      },
      forEachContext
    );
  },
  count: function (children) {
    var n = 0;
    mapChildren(children, function () {
      n++;
    });
    return n;
  },
  toArray: function (children) {
    return (
      mapChildren(children, function (child) {
        return child;
      }) || []
    );
  },
  only: function (children) {
    if (!isValidElement(children))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return children;
  }
};
exports.Activity = REACT_ACTIVITY_TYPE;
exports.Children = Children;
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
  ReactSharedInternals;
exports.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function (size) {
    return ReactSharedInternals.H.useMemoCache(size);
  }
};
exports.addTransitionType = addTransitionType;
exports.cache = function (fn) {
  return function () {
    return fn.apply(null, arguments);
  };
};
exports.cacheSignal = function () {
  return null;
};
exports.cloneElement = function (element, config, children) {
  if (null === element || void 0 === element)
    throw Error(
      "The argument must be a React element, but you passed " + element + "."
    );
  var props = assign({}, element.props),
    key = element.key;
  if (null != config)
    for (propName in (void 0 !== config.key && (key = "" + config.key), config))
      !hasOwnProperty.call(config, propName) ||
        "key" === propName ||
        "__self" === propName ||
        "__source" === propName ||
        ("ref" === propName && void 0 === config.ref) ||
        (props[propName] = config[propName]);
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;
  else if (1 < propName) {
    for (var childArray = Array(propName), i = 0; i < propName; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  return ReactElement(element.type, key, props);
};
exports.createContext = function (defaultValue) {
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = defaultValue;
  defaultValue.Consumer = {
    $$typeof: REACT_CONSUMER_TYPE,
    _context: defaultValue
  };
  return defaultValue;
};
exports.createElement = function (type, config, children) {
  var propName,
    props = {},
    key = null;
  if (null != config)
    for (propName in (void 0 !== config.key && (key = "" + config.key), config))
      hasOwnProperty.call(config, propName) &&
        "key" !== propName &&
        "__self" !== propName &&
        "__source" !== propName &&
        (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;
  else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps)
    for (propName in ((childrenLength = type.defaultProps), childrenLength))
      void 0 === props[propName] &&
        (props[propName] = childrenLength[propName]);
  return ReactElement(type, key, props);
};
exports.createRef = function () {
  return { current: null };
};
exports.forwardRef = function (render) {
  return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };
};
exports.isValidElement = isValidElement;
exports.lazy = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: { _status: -1, _result: ctor },
    _init: lazyInitializer
  };
};
exports.memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
exports.startTransition = startTransition;
exports.unstable_useCacheRefresh = function () {
  return ReactSharedInternals.H.useCacheRefresh();
};
exports.use = function (usable) {
  return ReactSharedInternals.H.use(usable);
};
exports.useActionState = function (action, initialState, permalink) {
  return ReactSharedInternals.H.useActionState(action, initialState, permalink);
};
exports.useCallback = function (callback, deps) {
  return ReactSharedInternals.H.useCallback(callback, deps);
};
exports.useContext = function (Context) {
  return ReactSharedInternals.H.useContext(Context);
};
exports.useDebugValue = function () {};
exports.useDeferredValue = function (value, initialValue) {
  return ReactSharedInternals.H.useDeferredValue(value, initialValue);
};
exports.useEffect = function (create, deps) {
  return ReactSharedInternals.H.useEffect(create, deps);
};
exports.useEffectEvent = function (callback) {
  return ReactSharedInternals.H.useEffectEvent(callback);
};
exports.useId = function () {
  return ReactSharedInternals.H.useId();
};
exports.useImperativeHandle = function (ref, create, deps) {
  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
};
exports.useInsertionEffect = function (create, deps) {
  return ReactSharedInternals.H.useInsertionEffect(create, deps);
};
exports.useLayoutEffect = function (create, deps) {
  return ReactSharedInternals.H.useLayoutEffect(create, deps);
};
exports.useMemo = function (create, deps) {
  return ReactSharedInternals.H.useMemo(create, deps);
};
exports.useOptimistic = function (passthrough, reducer) {
  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
};
exports.useReducer = function (reducer, initialArg, init) {
  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
};
exports.useRef = function (initialValue) {
  return ReactSharedInternals.H.useRef(initialValue);
};
exports.useState = function (initialState) {
  return ReactSharedInternals.H.useState(initialState);
};
exports.useSyncExternalStore = function (
  subscribe,
  getSnapshot,
  getServerSnapshot
) {
  return ReactSharedInternals.H.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
};
exports.useTransition = function () {
  return ReactSharedInternals.H.useTransition();
};
exports.version = "19.3.0-canary-cbb046ab-20260731";


/***/ }),

/***/ 61840:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ActionDidNotRevalidate: function() {
        return ActionDidNotRevalidate;
    },
    ActionDidRevalidateDynamicOnly: function() {
        return ActionDidRevalidateDynamicOnly;
    },
    ActionDidRevalidateStaticAndDynamic: function() {
        return ActionDidRevalidateStaticAndDynamic;
    }
});
const ActionDidNotRevalidate = 0;
const ActionDidRevalidateStaticAndDynamic = 1;
const ActionDidRevalidateDynamicOnly = 2; //# sourceMappingURL=action-revalidation-kind.js.map


/***/ }),

/***/ 62496:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    computeChangedPath: function() {
        return computeChangedPath;
    },
    extractPathFromFlightRouterState: function() {
        return extractPathFromFlightRouterState;
    },
    extractSourcePageFromFlightRouterState: function() {
        return extractSourcePageFromFlightRouterState;
    },
    getSelectedParams: function() {
        return getSelectedParams;
    },
    segmentToSourcePagePathname: function() {
        return segmentToSourcePagePathname;
    }
});
const _interceptionroutes = __webpack_require__(56469);
const _segment = __webpack_require__(78237);
const _matchsegments = __webpack_require__(57653);
const removeLeadingSlash = (segment)=>{
    return segment[0] === '/' ? segment.slice(1) : segment;
};
const segmentToPathname = (segment)=>{
    if (typeof segment === 'string') {
        // 'children' is not a valid path -- it's technically a parallel route that corresponds with the current segment's page
        // if we don't skip it, then the computed pathname might be something like `/children` which doesn't make sense.
        if (segment === 'children') return '';
        return segment;
    }
    return segment[1];
};
const segmentToSourcePagePathname = (segment)=>{
    if (typeof segment === 'string') {
        if (segment === 'children') return '';
        if (segment.startsWith(_segment.PAGE_SEGMENT_KEY)) return 'page';
        return segment;
    }
    const [paramName, , dynamicParamType] = segment;
    switch(dynamicParamType){
        case 'c':
            return `[...${paramName}]`;
        case 'ci(..)(..)':
            return `(..)(..)[...${paramName}]`;
        case 'ci(.)':
            return `(.)[...${paramName}]`;
        case 'ci(..)':
            return `(..)[...${paramName}]`;
        case 'ci(...)':
            return `(...)[...${paramName}]`;
        case 'oc':
            return `[[...${paramName}]]`;
        case 'd':
            return `[${paramName}]`;
        case 'di(..)(..)':
            return `(..)(..)[${paramName}]`;
        case 'di(.)':
            return `(.)[${paramName}]`;
        case 'di(..)':
            return `(..)[${paramName}]`;
        case 'di(...)':
            return `(...)[${paramName}]`;
        default:
            dynamicParamType;
            return `[${paramName}]`;
    }
};
function normalizeSegments(segments) {
    return segments.reduce((acc, segment)=>{
        segment = removeLeadingSlash(segment);
        if (segment === '' || (0, _segment.isGroupSegment)(segment)) {
            return acc;
        }
        return `${acc}/${segment}`;
    }, '') || '/';
}
function extractPathFromFlightRouterState(flightRouterState) {
    const segment = Array.isArray(flightRouterState[0]) ? flightRouterState[0][1] : flightRouterState[0];
    if (segment === _segment.DEFAULT_SEGMENT_KEY || _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m))) return undefined;
    if (segment.startsWith(_segment.PAGE_SEGMENT_KEY)) return '';
    const segments = [
        segmentToPathname(segment)
    ];
    const parallelRoutes = flightRouterState[1] ?? {};
    const childrenPath = parallelRoutes.children ? extractPathFromFlightRouterState(parallelRoutes.children) : undefined;
    if (childrenPath !== undefined) {
        segments.push(childrenPath);
    } else {
        for (const [key, value] of Object.entries(parallelRoutes)){
            if (key === 'children') continue;
            const childPath = extractPathFromFlightRouterState(value);
            if (childPath !== undefined) {
                segments.push(childPath);
            }
        }
    }
    return normalizeSegments(segments);
}
function extractSourcePageSegmentsFromFlightRouterState(flightRouterState) {
    const segment = segmentToSourcePagePathname(flightRouterState[0]);
    if (segment === _segment.DEFAULT_SEGMENT_KEY) {
        return undefined;
    }
    if (segment === 'page') {
        return [
            segment
        ];
    }
    const parallelRoutes = flightRouterState[1] ?? {};
    const childrenPath = parallelRoutes.children ? extractSourcePageSegmentsFromFlightRouterState(parallelRoutes.children) : undefined;
    if (childrenPath !== undefined) {
        return segment === '' ? childrenPath : [
            removeLeadingSlash(segment),
            ...childrenPath
        ];
    }
    for (const [key, value] of Object.entries(parallelRoutes)){
        if (key === 'children') continue;
        const childPath = extractSourcePageSegmentsFromFlightRouterState(value);
        if (childPath !== undefined) {
            return segment === '' ? childPath : [
                removeLeadingSlash(segment),
                ...childPath
            ];
        }
    }
    return undefined;
}
function extractSourcePageFromFlightRouterState(flightRouterState) {
    const sourcePageSegments = extractSourcePageSegmentsFromFlightRouterState(flightRouterState);
    return sourcePageSegments ? `/${sourcePageSegments.join('/')}` : undefined;
}
function computeChangedPathImpl(treeA, treeB) {
    const [segmentA, parallelRoutesA] = treeA;
    const [segmentB, parallelRoutesB] = treeB;
    const normalizedSegmentA = segmentToPathname(segmentA);
    const normalizedSegmentB = segmentToPathname(segmentB);
    if (_interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>normalizedSegmentA.startsWith(m) || normalizedSegmentB.startsWith(m))) {
        return '';
    }
    if (!(0, _matchsegments.matchSegment)(segmentA, segmentB)) {
        // once we find where the tree changed, we compute the rest of the path by traversing the tree
        return extractPathFromFlightRouterState(treeB) ?? '';
    }
    for(const parallelRouterKey in parallelRoutesA){
        if (parallelRoutesB[parallelRouterKey]) {
            const changedPath = computeChangedPathImpl(parallelRoutesA[parallelRouterKey], parallelRoutesB[parallelRouterKey]);
            if (changedPath !== null) {
                return `${segmentToPathname(segmentB)}/${changedPath}`;
            }
        }
    }
    return null;
}
function computeChangedPath(treeA, treeB) {
    const changedPath = computeChangedPathImpl(treeA, treeB);
    if (changedPath == null || changedPath === '/') {
        return changedPath;
    }
    // lightweight normalization to remove route groups
    return normalizeSegments(changedPath.split('/'));
}
function getSelectedParams(currentTree, params = {}) {
    const parallelRoutes = currentTree[1];
    for (const parallelRoute of Object.values(parallelRoutes)){
        const segment = parallelRoute[0];
        const isDynamicParameter = Array.isArray(segment);
        const segmentValue = isDynamicParameter ? segment[1] : segment;
        if (!segmentValue || segmentValue.startsWith(_segment.PAGE_SEGMENT_KEY)) continue;
        // Ensure catchAll and optional catchall are turned into an array
        const isCatchAll = isDynamicParameter && (segment[2] === 'c' || segment[2] === 'oc');
        if (isCatchAll) {
            params[segment[0]] = segment[1].split('/');
        } else if (isDynamicParameter) {
            params[segment[0]] = segment[1];
        }
        params = getSelectedParams(parallelRoute, params);
    }
    return params;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=compute-changed-path.js.map


/***/ }),

/***/ 63008:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "reportGlobalError", ({
    enumerable: true,
    get: function() {
        return reportGlobalError;
    }
}));
const reportGlobalError = typeof reportError === 'function' ? reportError : (error)=>{
    // TODO: Dispatch error event
    globalThis.console.error(error);
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=report-global-error.js.map


/***/ }),

/***/ 63534:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HEAD_REQUEST_KEY: function() {
        return HEAD_REQUEST_KEY;
    },
    ROOT_SEGMENT_REQUEST_KEY: function() {
        return ROOT_SEGMENT_REQUEST_KEY;
    },
    appendSegmentRequestKeyPart: function() {
        return appendSegmentRequestKeyPart;
    },
    convertSegmentPathToStaticExportFilename: function() {
        return convertSegmentPathToStaticExportFilename;
    },
    createSegmentRequestKeyPart: function() {
        return createSegmentRequestKeyPart;
    }
});
const _segment = __webpack_require__(78237);
const ROOT_SEGMENT_REQUEST_KEY = '';
const HEAD_REQUEST_KEY = '/_head';
function createSegmentRequestKeyPart(segment) {
    if (typeof segment === 'string') {
        if (segment.startsWith(_segment.PAGE_SEGMENT_KEY)) {
            // The Flight Router State type sometimes includes the search params in
            // the page segment. However, the Segment Cache tracks this as a separate
            // key. So, we strip the search params here, and then add them back when
            // the cache entry is turned back into a FlightRouterState. This is an
            // unfortunate consequence of the FlightRouteState being used both as a
            // transport type and as a cache key; we'll address this once more of the
            // Segment Cache implementation has settled.
            // TODO: We should hoist the search params out of the FlightRouterState
            // type entirely, This is our plan for dynamic route params, too.
            return _segment.PAGE_SEGMENT_KEY;
        }
        const safeName = // But params typically don't include the leading slash. We should use
        // a different encoding to avoid this special case.
        segment === '/_not-found' ? '_not-found' : encodeToFilesystemAndURLSafeString(segment);
        // Since this is not a dynamic segment, it's fully encoded. It does not
        // need to be "hydrated" with a param value.
        return safeName;
    }
    const name = segment[0];
    const paramType = segment[2];
    const safeName = encodeToFilesystemAndURLSafeString(name);
    const encodedName = '$' + paramType + '$' + safeName;
    return encodedName;
}
function appendSegmentRequestKeyPart(parentRequestKey, parallelRouteKey, childRequestKeyPart) {
    // Aside from being filesystem safe, segment keys are also designed so that
    // each segment and parallel route creates its own subdirectory. Roughly in
    // the same shape as the source app directory. This is mostly just for easier
    // debugging (you can open up the build folder and navigate the output); if
    // we wanted to do we could just use a flat structure.
    // Omit the parallel route key for children, since this is the most
    // common case. Saves some bytes (and it's what the app directory does).
    const slotKey = parallelRouteKey === 'children' ? childRequestKeyPart : `@${encodeToFilesystemAndURLSafeString(parallelRouteKey)}/${childRequestKeyPart}`;
    return parentRequestKey + '/' + slotKey;
}
// Define a regex pattern to match the most common characters found in a route
// param. It excludes anything that might not be cross-platform filesystem
// compatible, like |. It does not need to be precise because the fallback is to
// just base64url-encode the whole parameter, which is fine; we just don't do it
// by default for compactness, and for easier debugging.
const simpleParamValueRegex = /^[a-zA-Z0-9\-_@]+$/;
function encodeToFilesystemAndURLSafeString(value) {
    if (simpleParamValueRegex.test(value)) {
        return value;
    }
    // If there are any unsafe characters, base64url-encode the entire value.
    // We also add a ! prefix so it doesn't collide with the simple case.
    const base64url = btoa(value).replace(/\+/g, '-') // Replace '+' with '-'
    .replace(/\//g, '_') // Replace '/' with '_'
    .replace(/=+$/, '') // Remove trailing '='
    ;
    return '!' + base64url;
}
function convertSegmentPathToStaticExportFilename(segmentPath) {
    return `__next${segmentPath.replace(/\//g, '.')}.txt`;
} //# sourceMappingURL=segment-value-encoding.js.map


/***/ }),

/***/ 63697:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "pathHasPrefix", ({
    enumerable: true,
    get: function() {
        return pathHasPrefix;
    }
}));
const _parsepath = __webpack_require__(52697);
function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname } = (0, _parsepath.parsePath)(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
} //# sourceMappingURL=path-has-prefix.js.map


/***/ }),

/***/ 64777:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "HTTPAccessFallbackBoundary", ({
    enumerable: true,
    get: function() {
        return HTTPAccessFallbackBoundary;
    }
}));
const _interop_require_wildcard = __webpack_require__(66388);
const _jsxruntime = __webpack_require__(95155);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(12115));
const _navigationuntracked = __webpack_require__(53095);
const _httpaccessfallback = __webpack_require__(87016);
const _approutercontextsharedruntime = __webpack_require__(22909);
class HTTPAccessFallbackErrorBoundary extends _react.default.Component {
    constructor(props){
        super(props);
        this.state = {
            triggeredStatus: undefined,
            previousPathname: props.pathname
        };
    }
    componentDidCatch() {
        if (false) {}
    }
    static getDerivedStateFromError(error) {
        if ((0, _httpaccessfallback.isHTTPAccessFallbackError)(error)) {
            const httpStatus = (0, _httpaccessfallback.getAccessFallbackHTTPStatus)(error);
            return {
                triggeredStatus: httpStatus
            };
        }
        // Re-throw if error is not for 404
        throw error;
    }
    static getDerivedStateFromProps(props, state) {
        /**
     * Handles reset of the error boundary when a navigation happens.
     * Ensures the error boundary does not stay enabled when navigating to a new page.
     * Approach of setState in render is safe as it checks the previous pathname and then overrides
     * it as outlined in https://react.dev/reference/react/useState#storing-information-from-previous-renders
     */ if (props.pathname !== state.previousPathname && state.triggeredStatus) {
            return {
                triggeredStatus: undefined,
                previousPathname: props.pathname
            };
        }
        return {
            triggeredStatus: state.triggeredStatus,
            previousPathname: props.pathname
        };
    }
    render() {
        const { notFound, forbidden, unauthorized, children } = this.props;
        const { triggeredStatus } = this.state;
        const errorComponents = {
            [_httpaccessfallback.HTTPAccessErrorStatus.NOT_FOUND]: notFound,
            [_httpaccessfallback.HTTPAccessErrorStatus.FORBIDDEN]: forbidden,
            [_httpaccessfallback.HTTPAccessErrorStatus.UNAUTHORIZED]: unauthorized
        };
        if (triggeredStatus) {
            const isNotFound = triggeredStatus === _httpaccessfallback.HTTPAccessErrorStatus.NOT_FOUND && notFound;
            const isForbidden = triggeredStatus === _httpaccessfallback.HTTPAccessErrorStatus.FORBIDDEN && forbidden;
            const isUnauthorized = triggeredStatus === _httpaccessfallback.HTTPAccessErrorStatus.UNAUTHORIZED && unauthorized;
            // If there's no matched boundary in this layer, keep throwing the error by rendering the children
            if (!(isNotFound || isForbidden || isUnauthorized)) {
                return children;
            }
            return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        name: "robots",
                        content: "noindex"
                    }),
                     false && /*#__PURE__*/ 0,
                    errorComponents[triggeredStatus]
                ]
            });
        }
        return children;
    }
}
function HTTPAccessFallbackBoundary({ notFound, forbidden, unauthorized, children }) {
    // When we're rendering the missing params shell, this will return null. This
    // is because we won't be rendering any not found boundaries or error
    // boundaries for the missing params shell. When this runs on the client
    // (where these error can occur), we will get the correct pathname.
    const pathname = (0, _navigationuntracked.useUntrackedPathname)();
    const missingSlots = (0, _react.useContext)(_approutercontextsharedruntime.MissingSlotContext);
    const hasErrorFallback = !!(notFound || forbidden || unauthorized);
    if (hasErrorFallback) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(HTTPAccessFallbackErrorBoundary, {
            pathname: pathname,
            notFound: notFound,
            forbidden: forbidden,
            unauthorized: unauthorized,
            missingSlots: missingSlots,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=error-boundary.js.map


/***/ }),

/***/ 64872:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RedirectBoundary: function() {
        return RedirectBoundary;
    },
    RedirectErrorBoundary: function() {
        return RedirectErrorBoundary;
    }
});
const _interop_require_wildcard = __webpack_require__(66388);
const _jsxruntime = __webpack_require__(95155);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(12115));
const _navigation = __webpack_require__(74645);
const _redirect = __webpack_require__(23159);
const _redirecterror = __webpack_require__(57080);
function HandleRedirect({ redirect, reset, redirectType }) {
    const router = (0, _navigation.useRouter)();
    (0, _react.useEffect)(()=>{
        _react.default.startTransition(()=>{
            if (redirectType === 'push') {
                router.push(redirect, {});
            } else {
                router.replace(redirect, {});
            }
            reset();
        });
    }, [
        redirect,
        redirectType,
        reset,
        router
    ]);
    return null;
}
class RedirectErrorBoundary extends _react.default.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: null,
            redirectType: null
        };
    }
    static getDerivedStateFromError(error) {
        if ((0, _redirecterror.isRedirectError)(error)) {
            const url = (0, _redirect.getURLFromRedirectError)(error);
            const redirectType = (0, _redirect.getRedirectTypeFromError)(error);
            if ('handled' in error) {
                // The redirect was already handled. We'll still catch the redirect error
                // so that we can remount the subtree, but we don't actually need to trigger the
                // router.push.
                return {
                    redirect: null,
                    redirectType: null
                };
            }
            return {
                redirect: url,
                redirectType
            };
        }
        // Re-throw if error is not for redirect
        throw error;
    }
    // Explicit type is needed to avoid the generated `.d.ts` having a wide return type that could be specific to the `@types/react` version.
    render() {
        const { redirect, redirectType } = this.state;
        if (redirect !== null && redirectType !== null) {
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(HandleRedirect, {
                redirect: redirect,
                redirectType: redirectType,
                reset: ()=>this.setState({
                        redirect: null
                    })
            });
        }
        return this.props.children;
    }
}
function RedirectBoundary({ children }) {
    const router = (0, _navigation.useRouter)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(RedirectErrorBoundary, {
        router: router,
        children: children
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-boundary.js.map


/***/ }),

/***/ 66388:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ _interop_require_wildcard)
/* harmony export */ });
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;

    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();

    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) return cache.get(obj);

    var newObj = { __proto__: null };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }

    newObj.default = obj;

    if (cache) cache.set(obj, newObj);

    return newObj;
}



/***/ }),

/***/ 67841:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "assignLocation", ({
    enumerable: true,
    get: function() {
        return assignLocation;
    }
}));
const _addbasepath = __webpack_require__(70127);
function assignLocation(location, url) {
    if (location.startsWith('.')) {
        const urlBase = url.origin + url.pathname;
        return new URL(// new URL('./relative', 'https://example.com/subdir').href -> 'https://example.com/relative'
        // new URL('./relative', 'https://example.com/subdir/').href -> 'https://example.com/subdir/relative'
        (urlBase.endsWith('/') ? urlBase : urlBase + '/') + location);
    }
    return new URL((0, _addbasepath.addBasePath)(location), url.href);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=assign-location.js.map


/***/ }),

/***/ 68378:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/**
 * Optimistic Routing (Known Routes)
 *
 * This module enables the client to predict route structure for URLs that
 * haven't been prefetched yet, based on previously learned route patterns.
 * When successful, this allows skipping the route tree prefetch request
 * entirely.
 *
 * The core idea is that many URLs map to the same route structure. For example,
 * /blog/post-1 and /blog/post-2 both resolve to /blog/[slug]. Once we've
 * prefetched one, we can predict the structure of the other.
 *
 * However, we can't always make this prediction. Static siblings (like
 * /blog/featured alongside /blog/[slug]) have different route structures.
 * When we learn a dynamic route, we also learn its static siblings so we
 * know when NOT to apply the prediction.
 *
 * Main entry points:
 *
 * 1. discoverKnownRoute: Called after receiving a route tree from the server.
 *    Traverses the route tree, compares URL parts to segments, and populates
 *    the known route tree if they match. Routes are always inserted into the
 *    cache.
 *
 * 2. matchKnownRoute: Called when looking up a route with no cache entry.
 *    Matches the candidate URL against learned patterns. Returns a synthetic
 *    cache entry if successful, or null to fall back to server resolution.
 *
 * Rewrite detection happens during traversal: if a URL path part doesn't match
 * the corresponding route segment, we stop populating the known route tree
 * (since the mapping is incorrect) but still insert the route into the cache.
 *
 * The known route tree is append-only with no eviction. Route patterns are
 * derived from the filesystem, so they don't become stale within a session.
 * Cache invalidation on deploy clears everything anyway.
 *
 * Current limitations (deopt to server resolution):
 * - Rewrites: Detected during traversal (tree not populated, but route cached)
 * - Intercepted routes: The route tree varies by referrer (Next-Url header),
 *   so we can't predict the correct structure from the URL alone. Patterns are
 *   still stored during discovery (so the trie stays populated for non-
 *   intercepted siblings), but matching bails out when the pattern is marked
 *   as interceptable.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    discoverKnownRoute: function() {
        return discoverKnownRoute;
    },
    matchKnownRoute: function() {
        return matchKnownRoute;
    },
    resetKnownRoutes: function() {
        return resetKnownRoutes;
    }
});
const _approutertypes = __webpack_require__(76731);
const _cache = __webpack_require__(12506);
const _cachemap = __webpack_require__(76849);
const _routeparams = __webpack_require__(84536);
const _cachekey = __webpack_require__(26452);
const _varypath = __webpack_require__(79620);
/**
 * Read the pattern from a KnownRoutePart, evicting it if expired.
 *
 * This prevents stale patterns (e.g. from InliningHintsStale route entries
 * with staleAt = -1) from being cloned into synthetic entries indefinitely.
 * Once evicted, the pattern slot can be repopulated by the next
 * discoverKnownRoute call with a fresh entry from a /_tree response.
 */ function readPattern(now, part) {
    const pattern = part.pattern;
    if (pattern === null) {
        return null;
    }
    if ((0, _cachemap.isValueExpired)(now, (0, _cache.getCurrentRouteCacheVersion)(), pattern)) {
        // The pattern is expired. Null it out so the slot can be repopulated.
        part.pattern = null;
        return null;
    }
    return pattern;
}
function createEmptyPart() {
    return {
        staticChildren: null,
        dynamicChild: null,
        dynamicChildParamName: null,
        dynamicChildParamType: null,
        pattern: null,
        hasConflictingDynamicChildren: false
    };
}
// The root of the known route tree.
let knownRouteTreeRoot = createEmptyPart();
function discoverKnownRoute(now, pathname, search, nextUrl, pendingEntry, routeTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching, hasDynamicRewrite) {
    const tree = routeTree;
    const pathnameParts = (0, _cachekey.splitPathnameIntoParts)(pathname);
    if (pendingEntry !== null) {
        // Fulfill the pending entry first
        const fulfilledEntry = (0, _cache.fulfillRouteCacheEntry)(now, pendingEntry, tree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
        if (hasDynamicRewrite) {
            fulfilledEntry.hasDynamicRewrite = true;
        }
        // Populate the known route tree (handles rewrite detection internally).
        // The entry is already in the cache; this just stores it as a pattern
        // if the URL matches the route structure.
        discoverKnownRoutePart(knownRouteTreeRoot, tree, pathnameParts, 0, fulfilledEntry, now, pathname, search, nextUrl, tree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching, hasDynamicRewrite);
        return fulfilledEntry;
    }
    // No pending entry - discoverKnownRoutePart will create one and insert it
    // into the cache, or return an existing pattern if one exists.
    return discoverKnownRoutePart(knownRouteTreeRoot, tree, pathnameParts, 0, null, now, pathname, search, nextUrl, tree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching, hasDynamicRewrite);
}
/**
 * Bail out of populating the known route tree when discovery detects that the
 * URL doesn't match the route structure (a rewrite). The route entry is still
 * inserted into the cache for direct lookup — we just don't store it as a
 * pattern, since the URL and the tree describe different shapes.
 */ function handleMismatchDueToRewrite(existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching) {
    if (existingEntry !== null) {
        return existingEntry;
    }
    return (0, _cache.writeRouteIntoCache)(now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
}
/**
 * Gets or creates the dynamic child node for a KnownRoutePart. A node can
 * have at most one dynamic child. Sibling filesystem routes can't declare two
 * different params at the same level, but parallel route branches can (e.g.
 * @modal/[...catchAll] alongside [username]) — the caller detects that case
 * and marks the level as conflicted instead of calling this.
 */ function discoverDynamicChild(part, paramName, paramType) {
    if (part.dynamicChild !== null) {
        return part.dynamicChild;
    }
    const newChild = createEmptyPart();
    // Type assertion needed because we're converting from "without" to "with"
    // dynamic child variant.
    const mutablePart = part;
    mutablePart.dynamicChild = newChild;
    mutablePart.dynamicChildParamName = paramName;
    mutablePart.dynamicChildParamType = paramType;
    return newChild;
}
/**
 * Recursive workhorse for discoverKnownRoute.
 *
 * Walks the route tree and URL parts in parallel, building out the known
 * route tree as it goes. At each step:
 * 1. Determines if the current segment appears in the URL (dynamic/static)
 * 2. Validates URL matches route structure (detects rewrites)
 * 3. Creates/updates the corresponding KnownRoutePart node
 * 4. Records static siblings for future matching
 * 5. Recurses into child slots (parallel routes)
 *
 * If a URL/route mismatch is detected (rewrite), we stop building the known
 * route tree but still cache the route entry for direct lookup.
 */ function discoverKnownRoutePart(parentKnownRoutePart, routeTree, pathnameParts, partIndex, existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching, hasDynamicRewrite) {
    const segment = routeTree.segment;
    const urlPart = partIndex < pathnameParts.length ? pathnameParts[partIndex] : null;
    let knownRoutePart = parentKnownRoutePart;
    let nextPartIndex = partIndex;
    if (typeof segment === 'string') {
        if ((0, _routeparams.doesStaticSegmentAppearInURL)(segment)) {
            // A visible static segment must consume exactly one URL part that
            // equals the segment. If the URL is exhausted or the URL part doesn't
            // match, the URL doesn't fit the route shape — the response was
            // rewrite-affected. Bail out.
            if (urlPart === null || urlPart !== segment) {
                return handleMismatchDueToRewrite(existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
            }
            if (parentKnownRoutePart.staticChildren === null) {
                parentKnownRoutePart.staticChildren = new Map();
            }
            let existingChild = parentKnownRoutePart.staticChildren.get(urlPart);
            if (existingChild === undefined) {
                existingChild = createEmptyPart();
                parentKnownRoutePart.staticChildren.set(urlPart, existingChild);
            }
            knownRoutePart = existingChild;
            // Advance to next URL part.
            nextPartIndex = partIndex + 1;
        }
    // else: Transparent segment (route group, __PAGE__, etc.)
    // Stay at the same known route part, don't advance URL parts
    } else {
        // Dynamic segment tuple: [paramName, paramCacheKey, paramType, staticSiblings]
        const paramName = segment[0];
        const paramCacheKey = segment[1];
        const paramType = segment[2];
        const staticSiblings = segment[3];
        if (paramType !== 'oc' && urlPart === null) {
            // Every dynamic segment except the optional catch-all (`[[...param]]`)
            // must consume at least one URL part at runtime. If discovery reached
            // this segment with no URL parts left to consume, the URL doesn't fit
            // the route shape — the response was rewrite-affected. Bail out.
            return handleMismatchDueToRewrite(existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
        }
        if (staticSiblings !== null && urlPart !== null && staticSiblings.includes(urlPart)) {
            // The route tree says this is a dynamic sibling, but the canonical URL
            // is a known static sibling. This is a mismatch.
            return handleMismatchDueToRewrite(existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
        }
        // The param's cache key holds the value parsed from the *rendered*
        // pathname. If the URL part(s) this segment would consume don't equal
        // that value, the response was rewrite-affected in a way that shifts
        // which URL part maps to which segment (e.g. a proxy injected a leading
        // locale segment). A static segment catches this above by failing to
        // match its URL part; a dynamic segment consumes whatever part is in
        // front of it, so compare against the rendered value instead. Bail out.
        switch(paramType){
            case 'd':
                {
                    // Canonicalize the URL part to the same encoded form the server used
                    // for the cache key.
                    if (urlPart !== null && (0, _routeparams.canonicalizeURLPart)(urlPart) !== paramCacheKey) {
                        return handleMismatchDueToRewrite(existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
                    }
                    break;
                }
            case 'c':
            case 'oc':
                {
                    // Catch-alls consume every remaining URL part; their cache keys are
                    // the rendered parts joined with '/' (empty string for an empty
                    // optional catch-all). Comparing the joined remainder also catches a
                    // rewrite that appended segments the URL doesn't have.
                    const joinedRemainingParts = pathnameParts.slice(partIndex).map(_routeparams.canonicalizeURLPart).join('/');
                    if (joinedRemainingParts !== paramCacheKey) {
                        return handleMismatchDueToRewrite(existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
                    }
                    break;
                }
            case 'ci(..)(..)':
            case 'ci(.)':
            case 'ci(..)':
            case 'ci(...)':
            case 'di(..)(..)':
            case 'di(.)':
            case 'di(..)':
            case 'di(...)':
                break;
            default:
                paramType;
        }
        if (parentKnownRoutePart.hasConflictingDynamicChildren || parentKnownRoutePart.dynamicChild !== null && (parentKnownRoutePart.dynamicChildParamName !== paramName || parentKnownRoutePart.dynamicChildParamType !== paramType)) {
            // A different parallel route branch already claimed the dynamic child
            // at this level with a different param. Mark the level as conflicted
            // so matching bails out, and don't store a pattern via this branch.
            parentKnownRoutePart.hasConflictingDynamicChildren = true;
            return handleMismatchDueToRewrite(existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
        }
        // URL matches route structure. Build the known route tree.
        knownRoutePart = discoverDynamicChild(parentKnownRoutePart, paramName, paramType);
        // Record static siblings as placeholder parts.
        // IMPORTANT: We use the null vs Map distinction to track whether
        // siblings are known at this level:
        // - staticChildren: null = siblings unknown (can't safely match dynamic)
        // - staticChildren: Map = siblings known (even if empty)
        // This matters in dev mode where webpack may not know all siblings yet.
        if (staticSiblings !== null) {
            // Siblings are known - ensure we have a Map (even if empty)
            if (parentKnownRoutePart.staticChildren === null) {
                parentKnownRoutePart.staticChildren = new Map();
            }
            for (const sibling of staticSiblings){
                if (!parentKnownRoutePart.staticChildren.has(sibling)) {
                    parentKnownRoutePart.staticChildren.set(sibling, createEmptyPart());
                }
            }
        }
        // Advance to next URL part. Catch-all segments (`[...param]` and
        // `[[...param]]`) absorb every remaining URL part at runtime (see
        // `matchKnownRoutePart`, which slices the rest of `pathnameParts`).
        if (paramType === 'c' || paramType === 'oc') {
            nextPartIndex = pathnameParts.length;
        } else {
            nextPartIndex = partIndex + 1;
        }
    }
    // Recurse into child routes. A route tree can have multiple parallel routes
    // (e.g., @modal alongside children). Each parallel route is a separate
    // branch, but they all share the same URL - we just need to traverse all
    // branches to build out the known route tree.
    const slots = routeTree.slots;
    let resultFromChildren = null;
    if (slots !== null) {
        for (const childRouteTree of slots.values()){
            // Skip branches with refreshState set - these were reused from a
            // different route (e.g., a "default" parallel slot) and don't represent
            // the actual route structure for this URL.
            if (childRouteTree.refreshState !== null) {
                continue;
            }
            const result = discoverKnownRoutePart(knownRoutePart, childRouteTree, pathnameParts, nextPartIndex, existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching, hasDynamicRewrite);
            // All parallel route branches share the same URL, so they should all
            // reach compatible leaf nodes. We capture any result.
            resultFromChildren = result;
        }
        if (resultFromChildren !== null) {
            return resultFromChildren;
        }
        // Defensive fallback: no children returned a result. This shouldn't happen
        // for valid route trees, but handle it gracefully.
        return handleMismatchDueToRewrite(existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
    }
    // Reached a page node (`__PAGE__` leaf). If there are still URL parts
    // left to consume, the route tree is shorter than the URL, which means
    // the URL doesn't match the route structure (likely a rewrite).
    if (nextPartIndex < pathnameParts.length) {
        return handleMismatchDueToRewrite(existingEntry, now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
    }
    // Reached a page node. Create/get the route cache entry and store as a
    // pattern. First, check if there's already a pattern for this route.
    const existingPattern = readPattern(now, knownRoutePart);
    if (existingPattern !== null) {
        // If this route has a dynamic rewrite, mark the existing pattern.
        if (hasDynamicRewrite) {
            existingPattern.hasDynamicRewrite = true;
        }
        return existingPattern;
    }
    // Get or create the entry
    let entry;
    if (existingEntry !== null) {
        // Already have a fulfilled entry, use it directly. It's already in the
        // route cache map.
        entry = existingEntry;
    } else {
        // Create the entry and insert it into the route cache map.
        entry = (0, _cache.writeRouteIntoCache)(now, pathname, search, nextUrl, fullTree, metadataVaryPath, couldBeIntercepted, canonicalUrl, supportsPerSegmentPrefetching);
    }
    if (hasDynamicRewrite) {
        entry.hasDynamicRewrite = true;
    }
    // Store as pattern
    knownRoutePart.pattern = entry;
    return entry;
}
function matchKnownRoute(now, pathname, search) {
    const pathnameParts = (0, _cachekey.splitPathnameIntoParts)(pathname);
    const resolvedParams = new Map();
    const match = matchKnownRoutePart(now, knownRouteTreeRoot, pathnameParts, 0, resolvedParams);
    if (match === null) {
        return null;
    }
    const matchedPart = match.part;
    const pattern = match.pattern;
    // If the pattern could be intercepted, we can't safely use it for prediction.
    // Interception routes resolve to different route trees depending on the
    // referrer (the Next-Url header), which means the same URL can map to
    // different page components depending on where the navigation originated.
    // Since the known route tree only stores a single pattern per URL shape, we
    // can't distinguish between the intercepted and non-intercepted cases, so we
    // bail out to server resolution.
    //
    // TODO: We could store interception behavior in the known route tree itself
    // (e.g., which segments use interception markers and what they resolve to).
    // With enough information embedded in the trie, we could match interception
    // routes entirely on the client without a server round-trip.
    if (pattern.couldBeIntercepted) {
        return null;
    }
    // "Reify" the pattern: clone the template tree with concrete param values.
    // This substitutes resolved params (e.g., slug: "hello") into dynamic
    // segments and recomputes vary paths for correct segment cache keying.
    const acc = {
        metadataVaryPath: null
    };
    const reifiedTree = reifyRouteTree(pattern.tree, resolvedParams, search, null, acc);
    // The metadata tree is a flat page node without the intermediate layout
    // structure. Clone it with the updated metadata vary path collected during
    // the main tree traversal.
    const metadataVaryPath = acc.metadataVaryPath;
    if (metadataVaryPath === null) {
        // This shouldn't be reachable for a valid route tree.
        return null;
    }
    const reifiedMetadata = (0, _cache.createMetadataRouteTree)(metadataVaryPath);
    // Create a synthetic (predicted) entry and store it as the new pattern.
    //
    // Why replace the pattern? We intentionally update the pattern with this
    // synthetic entry so that if our prediction was wrong (server returns a
    // different pathname due to dynamic rewrite), the entry gets marked with
    // hasDynamicRewrite. Future predictions for this route will see the flag
    // and bail out to server resolution instead of making the same mistake.
    const syntheticEntry = {
        canonicalUrl: pathname + search,
        status: _cache.EntryStatus.Fulfilled,
        blockedTasks: null,
        tree: reifiedTree,
        metadata: reifiedMetadata,
        couldBeIntercepted: pattern.couldBeIntercepted,
        supportsPerSegmentPrefetching: pattern.supportsPerSegmentPrefetching,
        hasDynamicRewrite: false,
        renderedSearch: search,
        ref: null,
        size: pattern.size,
        staleAt: pattern.staleAt,
        version: pattern.version
    };
    matchedPart.pattern = syntheticEntry;
    return syntheticEntry;
}
/**
 * Recursively matches a URL against the known route tree.
 *
 * Matching priority (most specific first):
 * 1. Static children - exact path segment match
 * 2. Dynamic child - [param], [...param], [[...param]]
 * 3. Direct pattern - when no more URL parts remain
 *
 * Collects resolved param values in resolvedParams as it traverses.
 * Returns null if no match found (caller should fall back to server).
 */ function matchKnownRoutePart(now, part, pathnameParts, partIndex, resolvedParams) {
    const urlPart = partIndex < pathnameParts.length ? pathnameParts[partIndex] : null;
    // If staticChildren is null, we don't know what static routes exist at this
    // level. This happens in webpack dev mode where routes are compiled
    // on-demand. We can't safely match a dynamicChild because the URL part might
    // be a static sibling we haven't discovered yet. Example: We know
    // /blog/[slug] exists, but haven't compiled /blog/featured. A request for
    // /blog/featured would incorrectly match /blog/[slug].
    if (part.staticChildren === null) {
        // The only safe match is a direct pattern when no URL parts remain.
        if (urlPart === null) {
            const pattern = readPattern(now, part);
            if (pattern !== null && !pattern.hasDynamicRewrite) {
                return {
                    part,
                    pattern
                };
            }
        }
        return null;
    }
    // Static children take priority over dynamic. This ensures /blog/featured
    // matches its own route rather than /blog/[slug].
    if (urlPart !== null) {
        const staticChild = part.staticChildren.get(urlPart);
        if (staticChild !== undefined) {
            // Check if this is an "unknown" placeholder part. These are created when
            // we learn about static siblings (from the route tree's staticSiblings
            // field) but haven't prefetched them yet. We know the path exists but
            // don't know its structure, so we can't predict it.
            if (staticChild.pattern === null && staticChild.dynamicChild === null && staticChild.staticChildren === null) {
                // Bail out - server must resolve this route.
                return null;
            }
            const match = matchKnownRoutePart(now, staticChild, pathnameParts, partIndex + 1, resolvedParams);
            if (match !== null) {
                return match;
            }
            // Static child is a real node (not a placeholder) but its subtree
            // didn't match the remaining URL parts. This means the route exists
            // in the static subtree but hasn't been fully discovered yet. Do not
            // fall through to try the dynamic child — the static match is
            // authoritative. Bail out to server resolution.
            return null;
        }
    }
    // Try dynamic child. Skip it entirely if parallel route branches disagree
    // about the dynamic segment at this level — any pattern stored beneath it
    // was learned under a conflicting model.
    if (part.dynamicChild !== null && !part.hasConflictingDynamicChildren) {
        const dynamicPart = part.dynamicChild;
        const paramName = part.dynamicChildParamName;
        const paramType = part.dynamicChildParamType;
        const dynamicPattern = readPattern(now, dynamicPart);
        switch(paramType){
            case 'c':
                // Required catch-all [...param]: consumes 1+ URL parts
                if (dynamicPattern !== null && !dynamicPattern.hasDynamicRewrite && urlPart !== null) {
                    resolvedParams.set(paramName, pathnameParts.slice(partIndex).join('/'));
                    return {
                        part: dynamicPart,
                        pattern: dynamicPattern
                    };
                }
                break;
            case 'oc':
                {
                    // Optional catch-all [[...param]]: consumes 0+ URL parts
                    if (dynamicPattern !== null && !dynamicPattern.hasDynamicRewrite) {
                        if (urlPart !== null) {
                            resolvedParams.set(paramName, pathnameParts.slice(partIndex).join('/'));
                            return {
                                part: dynamicPart,
                                pattern: dynamicPattern
                            };
                        }
                        // urlPart is null - can match with zero parts, but a direct pattern
                        // (e.g., page.tsx alongside [[...param]]) takes precedence.
                        const directPattern = readPattern(now, part);
                        if (directPattern === null || directPattern.hasDynamicRewrite) {
                            resolvedParams.set(paramName, '');
                            return {
                                part: dynamicPart,
                                pattern: dynamicPattern
                            };
                        }
                    }
                    break;
                }
            case 'd':
                // Regular dynamic [param]: consumes exactly 1 URL part.
                // Unlike catch-all which terminates here, regular dynamic must
                // continue recursing to find the leaf pattern.
                if (urlPart !== null) {
                    resolvedParams.set(paramName, urlPart);
                    return matchKnownRoutePart(now, dynamicPart, pathnameParts, partIndex + 1, resolvedParams);
                }
                break;
            // Intercepted routes use relative path markers like (.), (..), (...)
            // Their behavior depends on navigation context (soft vs hard nav),
            // so we can't predict them client-side. Defer to server.
            case 'ci(..)(..)':
            case 'ci(.)':
            case 'ci(..)':
            case 'ci(...)':
            case 'di(..)(..)':
            case 'di(.)':
            case 'di(..)':
            case 'di(...)':
                return null;
            default:
                paramType;
        }
    }
    // No children matched. If we've consumed all URL parts, check for a direct
    // pattern at this node (the route terminates here).
    if (urlPart === null) {
        const pattern = readPattern(now, part);
        if (pattern !== null && !pattern.hasDynamicRewrite) {
            return {
                part,
                pattern
            };
        }
    }
    return null;
}
/**
 * "Reify" means to make concrete - we take an abstract pattern (the template
 * route tree) and produce a concrete instance with actual param values.
 *
 * This function clones a RouteTree, substituting dynamic segment values from
 * resolvedParams and computing new vary paths. The vary path encodes param
 * values so segment cache entries can be correctly keyed.
 *
 * Example: Pattern for /blog/[slug] with resolvedParams { slug: "hello" }
 * produces a tree where segment [slug] has cacheKey "hello".
 */ function reifyRouteTree(pattern, resolvedParams, search, parentPartialVaryPath, acc) {
    const originalSegment = pattern.segment;
    // This segment's param (if any) is a root param iff the segment is at or
    // above the root layout, which the server marks directly.
    const isRootParam = (pattern.prefetchHints & _approutertypes.PrefetchHint.IsRootLayoutOrAbove) !== 0;
    let newSegment = originalSegment;
    let partialVaryPath;
    if (typeof originalSegment !== 'string') {
        // Dynamic segment: compute new cache key and append to partial vary path
        const paramName = originalSegment[0];
        const paramType = originalSegment[2];
        const staticSiblings = originalSegment[3];
        const newValue = resolvedParams.get(paramName);
        if (newValue !== undefined) {
            // Catch-all values are already joined into a single string when they're
            // resolved in matchKnownRoutePart, so the value can be used directly.
            const newCacheKey = newValue;
            newSegment = [
                paramName,
                newCacheKey,
                paramType,
                staticSiblings
            ];
            partialVaryPath = (0, _varypath.appendLayoutVaryPath)(parentPartialVaryPath, newCacheKey, paramName, isRootParam);
        } else {
            // Param not found in resolvedParams - keep original and inherit partial
            // TODO: This should never happen. Bail out with null.
            partialVaryPath = parentPartialVaryPath;
        }
    } else {
        // Static segment: inherit partial vary path from parent
        partialVaryPath = parentPartialVaryPath;
    }
    // Recurse into children with the (possibly updated) partial vary path
    let newSlots = null;
    const patternSlots = pattern.slots;
    if (patternSlots !== null) {
        newSlots = new Map();
        for (const [key, childPattern] of patternSlots){
            newSlots.set(key, reifyRouteTree(childPattern, resolvedParams, search, partialVaryPath, acc));
        }
    }
    if (pattern.isPage) {
        // Page segment: finalize with search params
        const newVaryPath = (0, _varypath.finalizePageVaryPath)(pattern.requestKey, search, partialVaryPath);
        // Collect metadata vary path (first page wins, same as original algorithm)
        if (acc.metadataVaryPath === null) {
            acc.metadataVaryPath = (0, _varypath.finalizeMetadataVaryPath)(pattern.requestKey, search, partialVaryPath);
        }
        return {
            requestKey: pattern.requestKey,
            segment: newSegment,
            shellVaryPath: (0, _varypath.getShellSegmentVaryPath)(newVaryPath),
            refreshState: pattern.refreshState,
            varyPath: newVaryPath,
            isPage: true,
            slots: newSlots,
            prefetchHints: pattern.prefetchHints
        };
    } else {
        // Layout segment: finalize without search params
        const newVaryPath = (0, _varypath.finalizeLayoutVaryPath)(pattern.requestKey, partialVaryPath);
        return {
            requestKey: pattern.requestKey,
            segment: newSegment,
            shellVaryPath: (0, _varypath.getShellSegmentVaryPath)(newVaryPath),
            refreshState: pattern.refreshState,
            varyPath: newVaryPath,
            isPage: false,
            slots: newSlots,
            prefetchHints: pattern.prefetchHints
        };
    }
}
function resetKnownRoutes() {
    knownRouteTreeRoot = createEmptyPart();
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=optimistic-routes.js.map


/***/ }),

/***/ 70127:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addBasePath", ({
    enumerable: true,
    get: function() {
        return addBasePath;
    }
}));
const _addpathprefix = __webpack_require__(29940);
const _normalizetrailingslash = __webpack_require__(50020);
const basePath =  false || '';
function addBasePath(path, required) {
    return (0, _normalizetrailingslash.normalizePathTrailingSlash)( false ? 0 : (0, _addpathprefix.addPathPrefix)(path, basePath));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-base-path.js.map


/***/ }),

/***/ 70156:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createMutableActionQueue: function() {
        return createMutableActionQueue;
    },
    dispatchNavigateAction: function() {
        return dispatchNavigateAction;
    },
    dispatchTraverseAction: function() {
        return dispatchTraverseAction;
    },
    getCurrentAppRouterState: function() {
        return getCurrentAppRouterState;
    },
    publicAppRouterInstance: function() {
        return publicAppRouterInstance;
    }
});
const _routerreducertypes = __webpack_require__(74616);
const _routerreducer = __webpack_require__(1280);
const _react = __webpack_require__(12115);
const _isthenable = __webpack_require__(38108);
const _types = __webpack_require__(77565);
const _prefetch = __webpack_require__(84035);
const _navigation = __webpack_require__(20354);
const _useactionqueue = __webpack_require__(55437);
const _optimisticroutes = __webpack_require__(68378);
const _pprnavigations = __webpack_require__(22120);
const _addbasepath = __webpack_require__(70127);
const _approuterutils = __webpack_require__(28720);
const _links = __webpack_require__(24972);
const _javascripturl = __webpack_require__(145);
const _routertransition = __webpack_require__(94062);
function runRemainingActions(actionQueue, settledAction, setState) {
    // Only advance the queue if the settled action is still at its head. If a
    // navigation discarded this action, the navigation took its place and is
    // still in flight — starting the next queued action now would run it
    // against router state that doesn't include the navigation yet.
    if (actionQueue.pending === settledAction) {
        actionQueue.pending = settledAction.next;
        if (actionQueue.pending !== null) {
            runAction({
                actionQueue,
                action: actionQueue.pending,
                setState
            });
            return;
        }
    }
    if (actionQueue.pending === null && actionQueue.needsRefresh) {
        // The queue is idle; flush the refresh requested by a discarded server
        // action that revalidated data.
        actionQueue.needsRefresh = false;
        actionQueue.dispatch({
            type: _routerreducertypes.ACTION_REFRESH
        }, setState);
    }
}
async function runAction({ actionQueue, action, setState }) {
    const prevState = actionQueue.state;
    actionQueue.pending = action;
    const payload = action.payload;
    const actionResult = actionQueue.action(prevState, payload);
    function handleResult(nextState) {
        // if we discarded this action, the state should also be discarded
        if (action.discarded) {
            // Check if the discarded server action revalidated data
            if (action.payload.type === _routerreducertypes.ACTION_SERVER_ACTION && action.payload.didRevalidate) {
                // The server action was discarded but it revalidated data,
                // mark that we need to refresh after all actions complete
                actionQueue.needsRefresh = true;
            }
            // This can't advance the queue (this action is no longer its head), but
            // if the queue has already drained, it flushes the refresh now.
            runRemainingActions(actionQueue, action, setState);
            return;
        }
        actionQueue.state = nextState;
        runRemainingActions(actionQueue, action, setState);
        action.resolve(nextState);
    }
    // if the action is a promise, set up a callback to resolve it
    if ((0, _isthenable.isThenable)(actionResult)) {
        actionResult.then(handleResult, (err)=>{
            runRemainingActions(actionQueue, action, setState);
            action.reject(err);
        });
    } else {
        handleResult(actionResult);
    }
}
function dispatchAction(actionQueue, payload, setState) {
    let resolvers = {
        resolve: setState,
        reject: ()=>{}
    };
    // most of the action types are async with the exception of restore
    // it's important that restore is handled quickly since it's fired on the popstate event
    // and we don't want to add any delay on a back/forward nav
    // this only creates a promise for the async actions
    if (payload.type !== _routerreducertypes.ACTION_RESTORE) {
        // Create the promise and assign the resolvers to the object.
        const deferredPromise = new Promise((resolve, reject)=>{
            resolvers = {
                resolve,
                reject
            };
        });
        (0, _react.startTransition)(()=>{
            // we immediately notify React of the pending promise -- the resolver is attached to the action node
            // and will be called when the associated action promise resolves
            setState(deferredPromise);
        });
    }
    const newAction = {
        payload,
        next: null,
        resolve: resolvers.resolve,
        reject: resolvers.reject
    };
    // Check if the queue is empty
    if (actionQueue.pending === null) {
        // The queue is empty, so add the action and start it immediately
        // Mark this action as the last in the queue
        actionQueue.last = newAction;
        runAction({
            actionQueue,
            action: newAction,
            setState
        });
    } else if (payload.type === _routerreducertypes.ACTION_NAVIGATE || payload.type === _routerreducertypes.ACTION_RESTORE) {
        // Navigations (including back/forward) take priority over any pending actions.
        // Mark the pending action as discarded (so the state is never applied) and start the navigation action immediately.
        actionQueue.pending.discarded = true;
        // The rest of the current queue should still execute after this navigation.
        // (Note that it can't contain any earlier navigations, because we always put those into `actionQueue.pending` by calling `runAction`)
        newAction.next = actionQueue.pending.next;
        if (actionQueue.last === actionQueue.pending) {
            actionQueue.last = newAction;
        }
        runAction({
            actionQueue,
            action: newAction,
            setState
        });
    } else {
        // The queue is not empty, so add the action to the end of the queue
        // It will be started by runRemainingActions after the previous action finishes
        if (actionQueue.last !== null) {
            actionQueue.last.next = newAction;
        }
        actionQueue.last = newAction;
    }
}
let globalActionQueue = null;
function createMutableActionQueue(initialState) {
    const actionQueue = {
        state: initialState,
        dispatch: (payload, setState)=>dispatchAction(actionQueue, payload, setState),
        action: async (state, action)=>{
            const result = (0, _routerreducer.reducer)(state, action);
            return result;
        },
        pending: null,
        last: null
    };
    if (true) {
        // The action queue is lazily created on hydration, but after that point
        // it doesn't change. So we can store it in a global rather than pass
        // it around everywhere via props/context.
        if (globalActionQueue !== null) {
            throw Object.defineProperty(new Error('Internal Next.js Error: createMutableActionQueue was called more ' + 'than once'), "__NEXT_ERROR_CODE", {
                value: "E624",
                enumerable: false,
                configurable: true
            });
        }
        globalActionQueue = actionQueue;
    }
    return actionQueue;
}
function getCurrentAppRouterState() {
    return globalActionQueue !== null ? globalActionQueue.state : null;
}
function getAppRouterActionQueue() {
    if (globalActionQueue === null) {
        throw Object.defineProperty(new Error('Internal Next.js error: Router action dispatched before initialization.'), "__NEXT_ERROR_CODE", {
            value: "E668",
            enumerable: false,
            configurable: true
        });
    }
    return globalActionQueue;
}
function dispatchNavigateAction(href, navigateType, scrollBehavior, linkInstanceRef, transitionTypes, prefetchIntent) {
    // TODO: This stuff could just go into the reducer. Leaving as-is for now
    // since we're about to rewrite all the router reducer stuff anyway.
    if (transitionTypes) {
        for (const type of transitionTypes){
            (0, _react.addTransitionType)(type);
        }
    }
    const url = new URL((0, _addbasepath.addBasePath)(href), location.href);
    if (false) {}
    (0, _links.setLinkForCurrentNavigation)(linkInstanceRef);
    (0, _routertransition.startRouterTransition)(href, navigateType, getAppRouterActionQueue().state.tree, prefetchIntent);
    (0, _useactionqueue.dispatchAppRouterAction)({
        type: _routerreducertypes.ACTION_NAVIGATE,
        url,
        isExternalUrl: (0, _approuterutils.isExternalURL)(url),
        locationSearch: location.search,
        scrollBehavior,
        navigateType
    });
}
function dispatchTraverseAction(href, historyState) {
    (0, _routertransition.startRouterTransition)(href, 'traverse', getAppRouterActionQueue().state.tree, null);
    (0, _useactionqueue.dispatchAppRouterAction)({
        type: _routerreducertypes.ACTION_RESTORE,
        url: new URL(href),
        historyState
    });
}
/**
 * (Experimental) Perform a gesture navigation. This dispatches through React's
 * useOptimistic instead of the main action queue, allowing the state to be
 * shown during a gesture transition and discarded when the canonical navigation
 * completes.
 *
 * Only available when experimental.gestureTransition is enabled.
 */ function gesturePush(href, options) {
    if (false) {}
}
// Tracks the newest HMR refresh generation so that a newer refresh can abort
// the request of the one it supersedes. Development only.
let activeHmrRefreshController = null;
const publicAppRouterInstance = {
    back: ()=>window.history.back(),
    forward: ()=>window.history.forward(),
    prefetch: // data in the router reducer state; it writes into a global mutable
    // cache. So we don't need to dispatch an action.
    (href, options)=>{
        if ((0, _javascripturl.isJavaScriptURLString)(href)) {
            throw Object.defineProperty(new Error('Next.js has blocked a javascript: URL as a security precaution.'), "__NEXT_ERROR_CODE", {
                value: "E978",
                enumerable: false,
                configurable: true
            });
        }
        const actionQueue = getAppRouterActionQueue();
        const prefetchKind = options?.kind ?? _routerreducertypes.PrefetchKind.AUTO;
        // We don't currently offer a way to issue a runtime prefetch via `router.prefetch()`.
        // This will be possible when we update its API to not take a PrefetchKind.
        let fetchStrategy;
        switch(prefetchKind){
            case _routerreducertypes.PrefetchKind.AUTO:
                {
                    // We default to PPR. We'll discover whether or not the route supports it with the initial prefetch.
                    fetchStrategy = _types.FetchStrategy.PPR;
                    break;
                }
            case _routerreducertypes.PrefetchKind.FULL:
                {
                    fetchStrategy = _types.FetchStrategy.Full;
                    break;
                }
            default:
                {
                    prefetchKind;
                    // Despite typescript thinking that this can't happen,
                    // we might get an unexpected value from user code.
                    // We don't know what they want, but we know they want a prefetch,
                    // so use the default.
                    fetchStrategy = _types.FetchStrategy.PPR;
                }
        }
        (0, _prefetch.prefetch)(href, actionQueue.state.nextUrl, actionQueue.state.tree, fetchStrategy, options?.onInvalidate ?? null);
    },
    replace: (href, options)=>{
        if ((0, _javascripturl.isJavaScriptURLString)(href)) {
            throw Object.defineProperty(new Error('Next.js has blocked a javascript: URL as a security precaution.'), "__NEXT_ERROR_CODE", {
                value: "E978",
                enumerable: false,
                configurable: true
            });
        }
        (0, _react.startTransition)(()=>{
            dispatchNavigateAction(href, 'replace', options?.scroll === false ? _routerreducertypes.ScrollBehavior.NoScroll : _routerreducertypes.ScrollBehavior.Default, null, options?.transitionTypes, null);
        });
    },
    push: (href, options)=>{
        if ((0, _javascripturl.isJavaScriptURLString)(href)) {
            throw Object.defineProperty(new Error('Next.js has blocked a javascript: URL as a security precaution.'), "__NEXT_ERROR_CODE", {
                value: "E978",
                enumerable: false,
                configurable: true
            });
        }
        (0, _react.startTransition)(()=>{
            dispatchNavigateAction(href, 'push', options?.scroll === false ? _routerreducertypes.ScrollBehavior.NoScroll : _routerreducertypes.ScrollBehavior.Default, null, options?.transitionTypes, null);
        });
    },
    refresh: ()=>{
        (0, _react.startTransition)(()=>{
            (0, _useactionqueue.dispatchAppRouterAction)({
                type: _routerreducertypes.ACTION_REFRESH
            });
        });
    },
    hmrRefresh: ()=>{
        if (true) {
            throw Object.defineProperty(new Error('hmrRefresh can only be used in development mode. Please use refresh instead.'), "__NEXT_ERROR_CODE", {
                value: "E485",
                enumerable: false,
                configurable: true
            });
        } else {}
    },
    // Default value. Each route segment provides its own value at runtime. Refer
    // to `useRouter()`.
    bfcacheId: '0'
};
// Conditionally add experimental_gesturePush when gestureTransition is enabled
if (false) {}
// Exists for debugging purposes. Don't use in application code.
if ( true && window.next) {
    window.next.router = publicAppRouterInstance;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-instance.js.map


/***/ }),

/***/ 70530:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleHardNavError: function() {
        return handleHardNavError;
    },
    useNavFailureHandler: function() {
        return useNavFailureHandler;
    }
});
const _react = __webpack_require__(12115);
const _createhreffromurl = __webpack_require__(29453);
function handleHardNavError(error) {
    if ( true && window.next.__pendingUrl && (0, _createhreffromurl.createHrefFromUrl)(new URL(window.location.href)) !== (0, _createhreffromurl.createHrefFromUrl)(window.next.__pendingUrl)) {
        console.error(`Error occurred during navigation, falling back to hard navigation`, error);
        window.location.href = window.next.__pendingUrl.toString();
        return true;
    }
    return false;
}
function useNavFailureHandler() {
    if (false) {}
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=nav-failure-handler.js.map


/***/ }),

/***/ 70894:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "AppRouterAnnouncer", ({
    enumerable: true,
    get: function() {
        return AppRouterAnnouncer;
    }
}));
const _react = __webpack_require__(12115);
const _reactdom = __webpack_require__(47650);
const ANNOUNCER_TYPE = 'next-route-announcer';
const ANNOUNCER_ID = '__next-route-announcer__';
function getAnnouncerNode() {
    const existingAnnouncer = document.getElementsByName(ANNOUNCER_TYPE)[0];
    if (existingAnnouncer?.shadowRoot?.childNodes[0]) {
        return existingAnnouncer.shadowRoot.childNodes[0];
    } else {
        const container = document.createElement(ANNOUNCER_TYPE);
        container.style.cssText = 'position:absolute';
        const announcer = document.createElement('div');
        announcer.ariaLive = 'assertive';
        announcer.id = ANNOUNCER_ID;
        announcer.role = 'alert';
        announcer.style.cssText = 'position:absolute;border:0;height:1px;margin:-1px;padding:0;width:1px;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;word-wrap:normal';
        // Use shadow DOM here to avoid any potential CSS bleed
        const shadow = container.attachShadow({
            mode: 'open'
        });
        shadow.appendChild(announcer);
        document.body.appendChild(container);
        return announcer;
    }
}
function AppRouterAnnouncer({ tree }) {
    const [portalNode, setPortalNode] = (0, _react.useState)(null);
    (0, _react.useEffect)(()=>{
        const announcer = getAnnouncerNode();
        setPortalNode(announcer);
        return ()=>{
            const container = document.getElementsByTagName(ANNOUNCER_TYPE)[0];
            if (container?.isConnected) {
                document.body.removeChild(container);
            }
        };
    }, []);
    const [routeAnnouncement, setRouteAnnouncement] = (0, _react.useState)('');
    const previousTitle = (0, _react.useRef)(undefined);
    (0, _react.useEffect)(()=>{
        let currentTitle = '';
        if (document.title) {
            currentTitle = document.title;
        } else {
            const pageHeader = document.querySelector('h1');
            if (pageHeader) {
                currentTitle = pageHeader.innerText || pageHeader.textContent || '';
            }
        }
        // Only announce the title change, but not for the first load because screen
        // readers do that automatically.
        if (previousTitle.current !== undefined && previousTitle.current !== currentTitle) {
            setRouteAnnouncement(currentTitle);
        }
        previousTitle.current = currentTitle;
    }, [
        tree
    ]);
    return portalNode ? /*#__PURE__*/ (0, _reactdom.createPortal)(routeAnnouncement, portalNode) : null;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-announcer.js.map


/***/ }),

/***/ 72051:
/***/ ((module, exports) => {

"use strict";
// Browser variant of `./server-async-storage`. The server-only async-storage
// singletons don't exist in the browser, so these are `undefined`. Consumers
// guard usage behind `typeof window === 'undefined'`, so the stubs are never
// dereferenced.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    actionAsyncStorage: function() {
        return actionAsyncStorage;
    },
    workAsyncStorage: function() {
        return workAsyncStorage;
    },
    workUnitAsyncStorage: function() {
        return workUnitAsyncStorage;
    }
});
const actionAsyncStorage = undefined;
const workAsyncStorage = undefined;
const workUnitAsyncStorage = undefined;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-async-storage.browser.js.map


/***/ }),

/***/ 72299:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "InvariantError", ({
    enumerable: true,
    get: function() {
        return InvariantError;
    }
}));
class InvariantError extends Error {
    constructor(message, options){
        super(`Invariant: ${message.endsWith('.') ? message : message + '.'} This is a bug in Next.js.`, options);
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1179",
            enumerable: false,
            configurable: true
        });
        this.name = 'InvariantError';
    }
} //# sourceMappingURL=invariant-error.js.map


/***/ }),

/***/ 73623:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ _interop_require_default)
/* harmony export */ });
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}



/***/ }),

/***/ 74036:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return AppRouter;
    }
}));
const _interop_require_default = __webpack_require__(73623);
const _interop_require_wildcard = __webpack_require__(66388);
const _jsxruntime = __webpack_require__(95155);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(12115));
const _approutercontextsharedruntime = __webpack_require__(22909);
const _routerreducertypes = __webpack_require__(74616);
const _createhreffromurl = __webpack_require__(29453);
const _hooksclientcontextsharedruntime = __webpack_require__(37788);
const _useactionqueue = __webpack_require__(55437);
const _committedstate = __webpack_require__(54728);
const _approuterannouncer = __webpack_require__(70894);
const _redirectboundary = __webpack_require__(64872);
const _findheadincache = __webpack_require__(10425);
const _unresolvedthenable = __webpack_require__(77584);
const _removebasepath = __webpack_require__(95888);
const _hasbasepath = __webpack_require__(48512);
const _computechangedpath = __webpack_require__(62496);
const _navfailurehandler = __webpack_require__(70530);
const _approuterinstance = __webpack_require__(70156);
const _redirect = __webpack_require__(23159);
const _redirecterror = __webpack_require__(57080);
const _links = __webpack_require__(24972);
const _rooterrorboundary = /*#__PURE__*/ _interop_require_default._(__webpack_require__(11543));
const _globalerror = /*#__PURE__*/ _interop_require_default._(__webpack_require__(27123));
const _boundarycomponents = __webpack_require__(90484);
const _deploymentid = __webpack_require__(53887);
const globalMutable = {};
function HistoryUpdater({ appRouterState }) {
    (0, _react.useInsertionEffect)(()=>{
        if (false) {}
        const { tree, pushRef, canonicalUrl, renderedSearch } = appRouterState;
        const appHistoryState = {
            tree,
            renderedSearch
        };
        // TODO: Use Navigation API if available
        const historyState = {
            ...pushRef.preserveCustomHistoryState ? window.history.state : {},
            // Identifier is shortened intentionally.
            // __NA is used to identify if the history entry can be handled by the app-router.
            // __N is used to identify if the history entry can be handled by the old router.
            __NA: true,
            __PRIVATE_NEXTJS_INTERNALS_TREE: appHistoryState
        };
        if (pushRef.pendingPush && // Skip pushing an additional history entry if the canonicalUrl is the same as the current url.
        // This mirrors the browser behavior for normal navigation.
        (0, _createhreffromurl.createHrefFromUrl)(new URL(window.location.href)) !== canonicalUrl) {
            // This intentionally mutates React state, pushRef is overwritten to ensure additional push/replace calls do not trigger an additional history entry.
            pushRef.pendingPush = false;
            window.history.pushState(historyState, '', canonicalUrl);
        } else {
            window.history.replaceState(historyState, '', canonicalUrl);
        }
        (0, _committedstate.setLastCommittedTree)(tree);
    }, [
        appRouterState
    ]);
    (0, _react.useEffect)(()=>{
        // The Next-Url and the base tree may affect the result of a prefetch
        // task. Re-prefetch all visible links with the updated values. In most
        // cases, this will not result in any new network requests, only if
        // the prefetch result actually varies on one of these inputs.
        (0, _links.pingVisibleLinks)(appRouterState.nextUrl, appRouterState.tree);
    }, [
        appRouterState.nextUrl,
        appRouterState.tree
    ]);
    return null;
}
function copyNextJsInternalHistoryState(data) {
    if (data == null) data = {};
    const currentState = window.history.state;
    const __NA = currentState?.__NA;
    if (__NA) {
        data.__NA = __NA;
    }
    const __PRIVATE_NEXTJS_INTERNALS_TREE = currentState?.__PRIVATE_NEXTJS_INTERNALS_TREE;
    if (__PRIVATE_NEXTJS_INTERNALS_TREE) {
        data.__PRIVATE_NEXTJS_INTERNALS_TREE = __PRIVATE_NEXTJS_INTERNALS_TREE;
    }
    return data;
}
function Head({ headCacheNode }) {
    // If this segment has a `prefetchHead`, it's the statically prefetched data.
    // We should use that on initial render instead of `head`. Then we'll switch
    // to `head` when the dynamic response streams in.
    const head = headCacheNode !== null ? headCacheNode.head : null;
    const prefetchHead = headCacheNode !== null ? headCacheNode.prefetchHead : null;
    // If no prefetch data is available, then we go straight to rendering `head`.
    const resolvedPrefetchRsc = prefetchHead !== null ? prefetchHead : head;
    // We use `useDeferredValue` to handle switching between the prefetched and
    // final values. The second argument is returned on initial render, then it
    // re-renders with the first argument.
    return (0, _react.useDeferredValue)(head, resolvedPrefetchRsc);
}
/**
 * The global router that wraps the application components.
 */ function Router({ actionQueue, globalError, webSocket, staticIndicatorState }) {
    const state = (0, _useactionqueue.useActionQueue)(actionQueue);
    const { canonicalUrl } = state;
    // Add memoized pathname/query for useSearchParams and usePathname.
    const { searchParams, pathname } = (0, _react.useMemo)(()=>{
        const url = new URL(canonicalUrl,  false ? 0 : window.location.href);
        return {
            // This is turned into a readonly class in `useSearchParams`
            searchParams: url.searchParams,
            pathname: (0, _hasbasepath.hasBasePath)(url.pathname) ? (0, _removebasepath.removeBasePath)(url.pathname) : url.pathname
        };
    }, [
        canonicalUrl
    ]);
    if (false) {}
    (0, _react.useEffect)(()=>{
        const sourcePage = (0, _computechangedpath.extractSourcePageFromFlightRouterState)(state.tree);
        if (sourcePage !== undefined) {
            window.next.__internal_src_page = sourcePage;
        } else {
            delete window.next.__internal_src_page;
        }
    }, [
        state.tree
    ]);
    (0, _react.useEffect)(()=>{
        // If the app is restored from bfcache, it's possible that
        // pushRef.mpaNavigation is true, which would mean that any re-render of this component
        // would trigger the mpa navigation logic again from the lines below.
        // This will restore the router to the initial state in the event that the app is restored from bfcache.
        function handlePageShow(event) {
            if (!event.persisted || !window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE) {
                return;
            }
            // Clear the pendingMpaPath value so that a subsequent MPA navigation to the same URL can be triggered.
            // This is necessary because if the browser restored from bfcache, the pendingMpaPath would still be set to the value
            // of the last MPA navigation.
            globalMutable.pendingMpaPath = undefined;
            (0, _useactionqueue.dispatchAppRouterAction)({
                type: _routerreducertypes.ACTION_RESTORE,
                url: new URL(window.location.href),
                historyState: window.history.state.__PRIVATE_NEXTJS_INTERNALS_TREE
            });
        }
        window.addEventListener('pageshow', handlePageShow);
        return ()=>{
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);
    (0, _react.useEffect)(()=>{
        // Ensure that any redirect errors that bubble up outside of the RedirectBoundary
        // are caught and handled by the router.
        function handleUnhandledRedirect(event) {
            const error = 'reason' in event ? event.reason : event.error;
            if ((0, _redirecterror.isRedirectError)(error)) {
                event.preventDefault();
                const url = (0, _redirect.getURLFromRedirectError)(error);
                const redirectType = (0, _redirect.getRedirectTypeFromError)(error);
                // TODO: This should access the router methods directly, rather than
                // go through the public interface.
                if (redirectType === 'push') {
                    _approuterinstance.publicAppRouterInstance.push(url, {});
                } else {
                    _approuterinstance.publicAppRouterInstance.replace(url, {});
                }
            }
        }
        window.addEventListener('error', handleUnhandledRedirect);
        window.addEventListener('unhandledrejection', handleUnhandledRedirect);
        return ()=>{
            window.removeEventListener('error', handleUnhandledRedirect);
            window.removeEventListener('unhandledrejection', handleUnhandledRedirect);
        };
    }, []);
    // When mpaNavigation flag is set do a hard navigation to the new url.
    // Infinitely suspend because we don't actually want to rerender any child
    // components with the new URL and any entangled state updates shouldn't
    // commit either (eg: useTransition isPending should stay true until the page
    // unloads).
    //
    // This is a side effect in render. Don't try this at home, kids. It's
    // probably safe because we know this is a singleton component and it's never
    // in <Offscreen>. At least I hope so. (It will run twice in dev strict mode,
    // but that's... fine?)
    const { pushRef } = state;
    if (pushRef.mpaNavigation) {
        // if there's a re-render, we don't want to trigger another redirect if one is already in flight to the same URL
        if (globalMutable.pendingMpaPath !== canonicalUrl) {
            const location = window.location;
            if (pushRef.pendingPush) {
                location.assign(canonicalUrl);
            } else {
                location.replace(canonicalUrl);
            }
            globalMutable.pendingMpaPath = canonicalUrl;
        }
        // TODO-APP: Should we listen to navigateerror here to catch failed
        // navigations somehow? And should we call window.stop() if a SPA navigation
        // should interrupt an MPA one?
        // NOTE: This is intentionally using `throw` instead of `use` because we're
        // inside an externally mutable condition (pushRef.mpaNavigation), which
        // violates the rules of hooks.
        throw _unresolvedthenable.unresolvedThenable;
    }
    (0, _react.useEffect)(()=>{
        const originalPushState = window.history.pushState.bind(window.history);
        const originalReplaceState = window.history.replaceState.bind(window.history);
        // Ensure the canonical URL in the Next.js Router is updated when the URL is changed so that `usePathname` and `useSearchParams` hold the pushed values.
        const applyUrlFromHistoryPushReplace = (url)=>{
            const href = window.location.href;
            const appHistoryState = window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE;
            (0, _react.startTransition)(()=>{
                (0, _useactionqueue.dispatchAppRouterAction)({
                    type: _routerreducertypes.ACTION_RESTORE,
                    url: new URL(url ?? href, href),
                    historyState: appHistoryState
                });
            });
        };
        /**
     * Patch pushState to ensure external changes to the history are reflected in the Next.js Router.
     * Ensures Next.js internal history state is copied to the new history entry.
     * Ensures usePathname and useSearchParams hold the newly provided url.
     */ window.history.pushState = function pushState(data, _unused, url) {
            // TODO: Warn when Navigation API is available (navigation.navigate() should be used)
            // Avoid a loop when Next.js internals trigger pushState/replaceState
            if (data?.__NA || data?._N) {
                return originalPushState(data, _unused, url);
            }
            data = copyNextJsInternalHistoryState(data);
            if (url) {
                applyUrlFromHistoryPushReplace(url);
            }
            return originalPushState(data, _unused, url);
        };
        /**
     * Patch replaceState to ensure external changes to the history are reflected in the Next.js Router.
     * Ensures Next.js internal history state is copied to the new history entry.
     * Ensures usePathname and useSearchParams hold the newly provided url.
     */ window.history.replaceState = function replaceState(data, _unused, url) {
            // TODO: Warn when Navigation API is available (navigation.navigate() should be used)
            // Avoid a loop when Next.js internals trigger pushState/replaceState
            if (data?.__NA || data?._N) {
                return originalReplaceState(data, _unused, url);
            }
            data = copyNextJsInternalHistoryState(data);
            if (url) {
                applyUrlFromHistoryPushReplace(url);
            }
            return originalReplaceState(data, _unused, url);
        };
        /**
     * Handle popstate event, this is used to handle back/forward in the browser.
     * By default dispatches ACTION_RESTORE, however if the history entry was not pushed/replaced by app-router it will reload the page.
     * That case can happen when the old router injected the history entry.
     */ const onPopState = (event)=>{
            if (!event.state) {
                // TODO-APP: this case only happens when pushState/replaceState was called outside of Next.js. It should probably reload the page in this case.
                return;
            }
            // This case happens when the history entry was pushed by the `pages` router.
            if (!event.state.__NA) {
                window.location.reload();
                return;
            }
            // TODO-APP: Ideally the back button should not use startTransition as it should apply the updates synchronously
            // Without startTransition works if the cache is there for this path
            (0, _react.startTransition)(()=>{
                (0, _approuterinstance.dispatchTraverseAction)(window.location.href, event.state.__PRIVATE_NEXTJS_INTERNALS_TREE);
            });
        };
        // Register popstate event to call onPopstate.
        window.addEventListener('popstate', onPopState);
        return ()=>{
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
            window.removeEventListener('popstate', onPopState);
        };
    }, []);
    const { cache, tree, nextUrl, focusAndScrollRef, previousNextUrl } = state;
    const matchingHead = (0, _react.useMemo)(()=>{
        return (0, _findheadincache.findHeadInCache)(cache, tree[1]);
    }, [
        cache,
        tree
    ]);
    // Add memoized pathParams for useParams.
    const pathParams = (0, _react.useMemo)(()=>{
        return (0, _computechangedpath.getSelectedParams)(tree);
    }, [
        tree
    ]);
    // Create instrumented promises for navigation hooks (dev-only)
    // These are specially instrumented promises to show in the Suspense DevTools
    // Promises are cached outside of render to survive suspense retries.
    let instrumentedNavigationPromises = null;
    if (false) {}
    const layoutRouterContext = (0, _react.useMemo)(()=>{
        return {
            parentTree: tree,
            parentCacheNode: cache,
            parentSegmentPath: null,
            parentParams: {},
            parentLoadingData: null,
            // This is the <Activity> "name" that shows up in the Suspense DevTools.
            // It represents the root of the app.
            debugNameContext: '/',
            // Root node always has `url`
            // Provided in AppTreeContext to ensure it can be overwritten in layout-router
            url: canonicalUrl,
            // Root segment is always active
            isActive: true
        };
    }, [
        tree,
        cache,
        canonicalUrl
    ]);
    const globalLayoutRouterContext = (0, _react.useMemo)(()=>{
        return {
            tree,
            focusAndScrollRef,
            nextUrl,
            previousNextUrl
        };
    }, [
        tree,
        focusAndScrollRef,
        nextUrl,
        previousNextUrl
    ]);
    let head;
    if (matchingHead !== null) {
        // The head is wrapped in an extra component so we can use
        // `useDeferredValue` to swap between the prefetched and final versions of
        // the head. (This is what LayoutRouter does for segment data, too.)
        //
        // The `key` is used to remount the component whenever the head moves to
        // a different segment.
        const [headCacheNode, headKey, headKeyWithoutSearchParams] = matchingHead;
        head = /*#__PURE__*/ (0, _jsxruntime.jsx)(Head, {
            headCacheNode: headCacheNode
        },  false ? 0 : headKey);
    } else {
        head = null;
    }
    let content = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_redirectboundary.RedirectBoundary, {
        children: [
            head,
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_boundarycomponents.RootLayoutBoundary, {
                children: cache.rsc
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_approuterannouncer.AppRouterAnnouncer, {
                tree: tree
            })
        ]
    });
    if (false) {} else {
        content = /*#__PURE__*/ (0, _jsxruntime.jsx)(_rooterrorboundary.default, {
            errorComponent: globalError[0],
            errorStyles: globalError[1],
            children: content
        });
    }
    if (false) {}
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(HistoryUpdater, {
                appRouterState: state
            }),
             false ? 0 : /*#__PURE__*/ (0, _jsxruntime.jsx)(RuntimeStylesForWebpack, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.NavigationPromisesContext.Provider, {
                value: instrumentedNavigationPromises,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.PathParamsContext.Provider, {
                    value: pathParams,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.PathnameContext.Provider, {
                        value: pathname,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.SearchParamsContext.Provider, {
                            value: searchParams,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.GlobalLayoutRouterContext.Provider, {
                                value: globalLayoutRouterContext,
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.AppRouterContext.Provider, {
                                    value: _approuterinstance.publicAppRouterInstance,
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
                                        value: layoutRouterContext,
                                        children: content
                                    })
                                })
                            })
                        })
                    })
                })
            })
        ]
    });
}
function AppRouter({ actionQueue, globalErrorState, webSocket, staticIndicatorState }) {
    (0, _navfailurehandler.useNavFailureHandler)();
    const router = /*#__PURE__*/ (0, _jsxruntime.jsx)(Router, {
        actionQueue: actionQueue,
        globalError: globalErrorState,
        webSocket: webSocket,
        staticIndicatorState: staticIndicatorState
    });
    // At the very top level, use the default GlobalError component as the final fallback.
    // When the app router itself fails, which means the framework itself fails, we show the default error.
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_rooterrorboundary.default, {
        errorComponent: _globalerror.default,
        children: router
    });
}
let runtimeStyles;
let runtimeStyleChanged;
if (true) {
    runtimeStyles = new Set();
    runtimeStyleChanged = new Set();
    globalThis._N_E_STYLE_LOAD = function(href) {
        if (!runtimeStyles || !runtimeStyleChanged) return Promise.resolve();
        let len = runtimeStyles.size;
        runtimeStyles.add(href);
        if (runtimeStyles.size !== len) {
            runtimeStyleChanged.forEach((cb)=>cb());
        }
        // TODO figure out how to get a promise here
        // But maybe it's not necessary as react would block rendering until it's loaded
        return Promise.resolve();
    };
}
function RuntimeStylesForWebpack() {
    const [, forceUpdate] = _react.default.useState(0);
    const renderedStylesSize = runtimeStyles?.size ?? 0;
    (0, _react.useEffect)(()=>{
        if (!runtimeStyles || !runtimeStyleChanged) return;
        const changed = ()=>forceUpdate((c)=>c + 1);
        runtimeStyleChanged.add(changed);
        if (renderedStylesSize !== runtimeStyles.size) {
            changed();
        }
        return ()=>{
            runtimeStyleChanged.delete(changed);
        };
    }, [
        renderedStylesSize,
        forceUpdate
    ]);
    const query = (0, _deploymentid.getAssetTokenQuery)();
    return [
        ...runtimeStyles || []
    ].map((href, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
            rel: "stylesheet",
            href: `${href}${query}`,
            // @ts-ignore
            precedence: "next"
        }, i));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router.js.map


/***/ }),

/***/ 74581:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return RenderFromTemplateContext;
    }
}));
const _interop_require_wildcard = __webpack_require__(66388);
const _jsxruntime = __webpack_require__(95155);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(12115));
const _approutercontextsharedruntime = __webpack_require__(22909);
function RenderFromTemplateContext() {
    const children = (0, _react.useContext)(_approutercontextsharedruntime.TemplateContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=render-from-template-context.js.map


/***/ }),

/***/ 74616:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ACTION_HMR_REFRESH: function() {
        return ACTION_HMR_REFRESH;
    },
    ACTION_NAVIGATE: function() {
        return ACTION_NAVIGATE;
    },
    ACTION_REFRESH: function() {
        return ACTION_REFRESH;
    },
    ACTION_RESTORE: function() {
        return ACTION_RESTORE;
    },
    ACTION_SERVER_ACTION: function() {
        return ACTION_SERVER_ACTION;
    },
    ACTION_SERVER_PATCH: function() {
        return ACTION_SERVER_PATCH;
    },
    PrefetchKind: function() {
        return PrefetchKind;
    },
    ScrollBehavior: function() {
        return ScrollBehavior;
    }
});
const ACTION_REFRESH = 'refresh';
const ACTION_NAVIGATE = 'navigate';
const ACTION_RESTORE = 'restore';
const ACTION_SERVER_PATCH = 'server-patch';
const ACTION_HMR_REFRESH = 'hmr-refresh';
const ACTION_SERVER_ACTION = 'server-action';
var PrefetchKind = /*#__PURE__*/ function(PrefetchKind) {
    PrefetchKind["AUTO"] = "auto";
    PrefetchKind["FULL"] = "full";
    return PrefetchKind;
}({});
var ScrollBehavior = /*#__PURE__*/ function(ScrollBehavior) {
    /** Use per-node ScrollRef to decide whether to scroll. */ ScrollBehavior[ScrollBehavior["Default"] = 0] = "Default";
    /** Suppress scroll entirely (e.g. scroll={false} on Link or router.push). */ ScrollBehavior[ScrollBehavior["NoScroll"] = 1] = "NoScroll";
    return ScrollBehavior;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-reducer-types.js.map


/***/ }),

/***/ 74645:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    // We need the same class that was used to instantiate the context value
    // Otherwise instanceof checks will fail in usercode
    ReadonlyURLSearchParams: function() {
        return _hooksclientcontextsharedruntime.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _navigationreactserver.RedirectType;
    },
    ServerInsertedHTMLContext: function() {
        return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
    },
    forbidden: function() {
        return _navigationreactserver.forbidden;
    },
    notFound: function() {
        return _navigationreactserver.notFound;
    },
    permanentRedirect: function() {
        return _navigationreactserver.permanentRedirect;
    },
    redirect: function() {
        return _navigationreactserver.redirect;
    },
    unauthorized: function() {
        return _navigationreactserver.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
        return _unrecognizedactionerror.unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
        return _navigationreactserver.unstable_rethrow;
    },
    useParams: function() {
        return useParams;
    },
    usePathname: function() {
        return usePathname;
    },
    useRouter: function() {
        return useRouter;
    },
    useSearchParams: function() {
        return useSearchParams;
    },
    useSelectedLayoutSegment: function() {
        return useSelectedLayoutSegment;
    },
    useSelectedLayoutSegments: function() {
        return useSelectedLayoutSegments;
    },
    useServerInsertedHTML: function() {
        return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
    }
});
const _interop_require_wildcard = __webpack_require__(66388);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(12115));
const _approutercontextsharedruntime = __webpack_require__(22909);
const _hooksclientcontextsharedruntime = __webpack_require__(37788);
const _segment = __webpack_require__(78237);
const _navigationdynamicrendering = __webpack_require__(2522);
const _serverinsertedhtmlsharedruntime = __webpack_require__(39862);
const _unrecognizedactionerror = __webpack_require__(94454);
const _navigationreactserver = __webpack_require__(10208);
const { instrumentParamsForClientValidation, instrumentSearchParamsForClientValidation, expectCompleteParamsInClientValidation } =  false ? 0 : {};
function useSearchParams() {
    _navigationdynamicrendering.useDynamicSearchParams?.('useSearchParams()');
    const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react.useMemo)(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new _hooksclientcontextsharedruntime.ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    // During build-time instant validation, wrap with an proxy
    // so that accessing undeclared search params throws an error.
    if (false) {}
    // Instrument with Suspense DevTools (dev-only)
    if (false) {}
    return readonlySearchParams;
}
function usePathname() {
    _navigationdynamicrendering.useDynamicRouteParams?.('usePathname()');
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    const pathname = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
    // During build-time instant validation, error if fallback params exist
    // because usePathname() can't return a sensible value without all params.
    if (false) {}
    // Instrument with Suspense DevTools (dev-only)
    if (false) {}
    return pathname;
}
function useRouter() {
    const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
    if (router === null) {
        throw Object.defineProperty(new Error('invariant expected app router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E238",
            enumerable: false,
            configurable: true
        });
    }
    // Read the bfcacheId of the closest CacheNode and merge it into the
    // returned router instance. This is contextual: callers in a shared
    // layout get the layout's id; callers in a leaf segment get the leaf's.
    // The id is stored on the CacheNode as a number and materialized as a
    // string here. The format mirrors React's `useId()` (e.g. `_r_0_`) with
    // a `b` prefix, so the id can be safely concatenated with other keys
    // without collision.
    const layout = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    const bfcacheIdNumber = layout?.parentCacheNode.bfcacheId ?? 0;
    return (0, _react.useMemo)(()=>({
            back: router.back,
            forward: router.forward,
            refresh: router.refresh,
            hmrRefresh: router.hmrRefresh,
            push: router.push,
            replace: router.replace,
            prefetch: router.prefetch,
            experimental_gesturePush: router.experimental_gesturePush,
            bfcacheId: '_b_' + bfcacheIdNumber + '_'
        }), [
        router,
        bfcacheIdNumber
    ]);
}
function useParams() {
    _navigationdynamicrendering.useDynamicRouteParams?.('useParams()');
    const params = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
    // During build-time instant validation, wrap with a proxy
    // so that accessing undeclared params throws an error.
    if (false) {}
    // Instrument with Suspense DevTools (dev-only)
    if (false) {}
    return params;
}
function useSelectedLayoutSegments(parallelRouteKey = 'children') {
    _navigationdynamicrendering.useDynamicRouteParams?.('useSelectedLayoutSegments()');
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    // @ts-expect-error This only happens in `pages`. Type is overwritten in navigation.d.ts
    if (!context) return null;
    // During build-time instant validation, error if fallback params exist
    // because useSelectedLayoutSegments() can't return a sensible value without all params.
    if (false) {}
    // Instrument with Suspense DevTools (dev-only)
    if (false) {}
    return (0, _segment.getSelectedLayoutSegmentPath)(context.parentTree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey = 'children') {
    _navigationdynamicrendering.useDynamicRouteParams?.('useSelectedLayoutSegment()');
    const navigationPromises = (0, _react.useContext)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    // During build-time instant validation, error if fallback params exist
    // because useSelectedLayoutSegment() can't return a sensible value without all params.
    if (false) {}
    // Instrument with Suspense DevTools (dev-only)
    if (false) {}
    return (0, _segment.computeSelectedLayoutSegment)(selectedLayoutSegments, parallelRouteKey);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map


/***/ }),

/***/ 75153:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InstantValidationBoundaryContext: function() {
        return InstantValidationBoundaryContext;
    },
    PlaceValidationBoundaryBelowThisLevel: function() {
        return PlaceValidationBoundaryBelowThisLevel;
    },
    RenderValidationBoundaryAtThisLevel: function() {
        return RenderValidationBoundaryAtThisLevel;
    },
    SlotMarker: function() {
        return SlotMarker;
    }
});
const InstantValidationBoundaryContext = null;
const PlaceValidationBoundaryBelowThisLevel = null;
const RenderValidationBoundaryAtThisLevel = null;
const SlotMarker = null;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=impl.browser.js.map


/***/ }),

/***/ 75368:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "HeadManagerContext", ({
    enumerable: true,
    get: function() {
        return HeadManagerContext;
    }
}));
const _interop_require_default = __webpack_require__(73623);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(12115));
const HeadManagerContext = _react.default.createContext({});
if (false) {} //# sourceMappingURL=head-manager-context.shared-runtime.js.map


/***/ }),

/***/ 76731:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * App Router types - Client-safe types for the Next.js App Router
 *
 * This file contains type definitions that can be safely imported
 * by both client-side and server-side code without circular dependencies.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PrefetchHint: function() {
        return PrefetchHint;
    },
    StaticPrefetchDisabled: function() {
        return StaticPrefetchDisabled;
    },
    SubtreePrefetchHints: function() {
        return SubtreePrefetchHints;
    },
    propagateSubtreeBits: function() {
        return propagateSubtreeBits;
    }
});
var PrefetchHint = /*#__PURE__*/ function(PrefetchHint) {
    // NOTE: The 0b00001 bit was previously HasRuntimePrefetch (prefetch:
    // 'allow-runtime'). Partial Prefetching now implies runtime completeness
    // for every segment, so the bit was removed. Do not reuse it without
    // considering caches populated by older builds.
    // This segment or one of its descendants opts into Partial Prefetching, i.e.
    // uses the two-phase (Shell then Speculative) prefetch flow. Set when
    // `prefetch` is 'partial' or 'unstable_eager' (including the defaults
    // implied by the global `partialPrefetching` config). Propagates upward so
    // the root segment reflects the entire subtree.
    //
    // Partial Prefetching segments require RUNTIME COMPLETENESS: a prefetch
    // isn't considered done for such a segment until an entry at least as
    // complete as a runtime response exists. This does NOT mean the segment
    // lacks static data — the server emits static data unconditionally, and the
    // scheduler may attempt a static prefetch first (per
    // ShouldAttemptStaticPrefetch), issuing the runtime request only if the
    // static response's own `needsRuntimeRequest` signal says it would
    // return more.
    PrefetchHint[PrefetchHint["SubtreeHasPartialPrefetching"] = 2] = "SubtreeHasPartialPrefetching";
    // This segment itself has a loading.tsx boundary.
    PrefetchHint[PrefetchHint["SegmentHasLoadingBoundary"] = 4] = "SegmentHasLoadingBoundary";
    // A descendant segment (but not this one) has a loading.tsx boundary.
    // Propagates upward so the root reflects the entire subtree.
    PrefetchHint[PrefetchHint["SubtreeHasLoadingBoundary"] = 8] = "SubtreeHasLoadingBoundary";
    // This segment is at or above the application's root layout — the root layout
    // segment itself and all of its ancestors. A dynamic param in one of these
    // segments is a "root param".
    PrefetchHint[PrefetchHint["IsRootLayoutOrAbove"] = 16] = "IsRootLayoutOrAbove";
    // This segment's response includes its parent's data inlined into it.
    // Set at build time by the segment size measurement pass.
    PrefetchHint[PrefetchHint["ParentInlinedIntoSelf"] = 32] = "ParentInlinedIntoSelf";
    // This segment's data is inlined into one of its children — don't fetch
    // it separately. Set at build time by the segment size measurement pass.
    PrefetchHint[PrefetchHint["InlinedIntoChild"] = 64] = "InlinedIntoChild";
    // On a __PAGE__: this page's response includes the head (metadata/viewport)
    // at the end of its SegmentPrefetch[] array.
    PrefetchHint[PrefetchHint["HeadInlinedIntoSelf"] = 128] = "HeadInlinedIntoSelf";
    // On the root hint node: the head was NOT inlined into any page — fetch
    // it separately. Absence of this bit means the head is bundled into a page.
    PrefetchHint[PrefetchHint["HeadOutlined"] = 256] = "HeadOutlined";
    // The inlining hints in this tree may be stale because the tree was
    // generated before collectPrefetchHints ran (e.g. the initial RSC payload
    // for a fully static page at build time). When writing this tree into the
    // cache, the route entry should be immediately expired so it gets
    // re-fetched with correct hints. Only set during build-time prerendering,
    // never at runtime.
    PrefetchHint[PrefetchHint["InliningHintsStale"] = 512] = "InliningHintsStale";
    // This segment has prefetch = 'force-disabled'. The opt-out is passive
    // and applies to this segment only: it never INITIATES a prefetch — no
    // static data is emitted or fetched, and it's never the reason a runtime
    // prefetch spawns — but it may ride along in a runtime response issued on
    // another segment's behalf. Descendants prefetch normally.
    //
    // TODO: Also set as an internal fallback when the prefetch hints manifest
    // is unavailable (see #91407 mitigations), which only means "no static
    // prefetch data exists" — not a user opt-out. Split the fallback into its
    // own bit so the two intents can diverge.
    PrefetchHint[PrefetchHint["PrefetchDisabled"] = 1024] = "PrefetchDisabled";
    // NOTE: The 0b100000000000 bit was previously SubtreeHasRuntimePrefetch.
    // Partial Prefetching now implies runtime completeness for every segment
    // (see SubtreeHasPartialPrefetching), so the bit was removed. Do not reuse
    // it without considering caches populated by older builds.
    // This segment or one of its descendants prefetches "eagerly" — i.e. its
    // effective prefetch strategy is anything other than 'partial'. Used by
    // App Shells: a non-eager subtree relies on the shared app shell and skips
    // its Speculative prefetch. Propagates upward so the root reflects the
    // entire subtree.
    PrefetchHint[PrefetchHint["SubtreeHasEagerPrefetch"] = 4096] = "SubtreeHasEagerPrefetch";
    // This segment or one of its descendants exports `instant = false`,
    // explicitly opting out of Partial Prefetching. Propagates upward so the root
    // reflects the entire subtree. Used only to suppress the dev-time
    // `<Link prefetch={true}>` warning — unlike PrefetchDisabled, it has no effect
    // on the actual prefetch behavior.
    PrefetchHint[PrefetchHint["SubtreeHasInstantFalse"] = 8192] = "SubtreeHasInstantFalse";
    // The client should attempt a static prefetch for this route: the
    // build-time prerender did not access any runtime data (cookies, headers,
    // searchParams, ...), so a static prefetch is expected to be as complete
    // as a runtime one. A fallback-param access only unsets the bit when the
    // route can never be upgraded from a fallback to a concrete prerender —
    // on an upgradeable route, ISR later produces the concrete prerender a
    // static attempt would hit (until then, the static responses' own
    // signal reports the insufficiency per response). Purely advisory, and
    // both error directions are safe: if set when a runtime request is
    // actually needed, that same response-level signal (the load-bearing
    // `needsRuntimeRequest` promise combined with each segment's `isPartial`)
    // directs the client to follow up — the cost is a wasted static attempt.
    // If unset when static would have sufficed, the client goes straight to a
    // runtime prefetch, which is a superset of the static response — the cost
    // is only reduced cacheability. Like the other bits, this one is computed
    // once per build and stays constant for the build's lifetime; it rides
    // the prefetch-hints manifest into every response that carries hints —
    // `/_tree` prefetch responses and the FlightRouterState of dynamic
    // navigations alike. (Routes missing from the manifest — see the #91407
    // fallbacks — simply never carry it.) Set on every node of the tree, but
    // does not propagate.
    PrefetchHint[PrefetchHint["ShouldAttemptStaticPrefetch"] = 16384] = "ShouldAttemptStaticPrefetch";
    return PrefetchHint;
}({});
const StaticPrefetchDisabled = 1024;
const SubtreePrefetchHints = 2 | 8 | 8192 | 4096;
function propagateSubtreeBits(parentHints, childHints) {
    if (childHints & 2) {
        parentHints |= 2;
    }
    // A child with a loading boundary (directly, or anywhere in its subtree) makes
    // this a SubtreeHasLoadingBoundary on the parent.
    if (childHints & (4 | 8)) {
        parentHints |= 8;
    }
    // And for eager prefetch. The bit is set directly on each eager segment, so
    // there's no separate segment-local flag — propagate it as-is.
    if (childHints & 4096) {
        parentHints |= 4096;
    }
    // And for `instant = false`. Like eager prefetch, the bit is set directly on
    // each opted-out segment, so propagate it as-is.
    if (childHints & 8192) {
        parentHints |= 8192;
    }
    return parentHints;
} //# sourceMappingURL=app-router-types.js.map


/***/ }),

/***/ 76849:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    EntryStatus: function() {
        return EntryStatus;
    },
    Fallback: function() {
        return Fallback;
    },
    createCacheMap: function() {
        return createCacheMap;
    },
    deleteFromCacheMap: function() {
        return deleteFromCacheMap;
    },
    deleteMapEntry: function() {
        return deleteMapEntry;
    },
    getFromCacheMap: function() {
        return getFromCacheMap;
    },
    isValueExpired: function() {
        return isValueExpired;
    },
    setInCacheMap: function() {
        return setInCacheMap;
    },
    setSizeInCacheMap: function() {
        return setSizeInCacheMap;
    }
});
const _lru = __webpack_require__(42777);
var EntryStatus = /*#__PURE__*/ function(EntryStatus) {
    EntryStatus[EntryStatus["Empty"] = 0] = "Empty";
    EntryStatus[EntryStatus["Pending"] = 1] = "Pending";
    EntryStatus[EntryStatus["Fulfilled"] = 2] = "Fulfilled";
    EntryStatus[EntryStatus["Rejected"] = 3] = "Rejected";
    return EntryStatus;
}({});
const Fallback = {};
// This is a special internal key that is used for "revalidation" entries. It's
// an implementation detail that shouldn't leak outside of this module.
const Revalidation = {};
function createCacheMap() {
    const cacheMap = {
        parent: null,
        key: null,
        value: null,
        map: null,
        // LRU-related fields
        prev: null,
        next: null,
        size: 0
    };
    return cacheMap;
}
function getOrInitialize(cacheMap, keys, isRevalidation) {
    // Go through each level of keys until we find the entry that matches, or
    // create a new entry if one doesn't exist.
    //
    // This function will only return entries that match the keypath _exactly_.
    // Unlike getWithFallback, it will not access fallback entries unless it's
    // explicitly part of the keypath.
    let entry = cacheMap;
    let remainingKeys = keys;
    let key = null;
    while(true){
        const previousKey = key;
        if (remainingKeys !== null) {
            key = remainingKeys.value;
            remainingKeys = remainingKeys.parent;
        } else if (isRevalidation && previousKey !== Revalidation) {
            // During a revalidation, we append an internal "Revalidation" key to
            // the end of the keypath. The "normal" entry is its parent.
            // However, if the parent entry is currently empty, we don't need to store
            // this as a revalidation entry. Just insert the revalidation into the
            // normal slot.
            if (entry.value === null) {
                return entry;
            }
            // Otheriwse, create a child entry.
            key = Revalidation;
        } else {
            break;
        }
        let map = entry.map;
        if (map !== null) {
            const existingEntry = map.get(key);
            if (existingEntry !== undefined) {
                // Found a match. Keep going.
                entry = existingEntry;
                continue;
            }
        } else {
            map = new Map();
            entry.map = map;
        }
        // No entry exists yet at this level. Create a new one.
        const newEntry = {
            parent: entry,
            key,
            value: null,
            map: null,
            // LRU-related fields
            prev: null,
            next: null,
            size: 0
        };
        map.set(key, newEntry);
        entry = newEntry;
    }
    return entry;
}
function getFromCacheMap(now, currentCacheVersion, rootEntry, keys, isRevalidation, // the lookup falls through to a less-specific Fallback entry. Use this
// during a navigation to prefer a Fulfilled shell entry over a more-specific
// Pending entry that may still be in-flight. Callers that want to also
// accept non-Fulfilled entries should perform a second lookup with this set
// to false.
onlyMatchFulfilled) {
    const entry = getEntryWithFallbackImpl(now, currentCacheVersion, rootEntry, keys, isRevalidation, 0, onlyMatchFulfilled);
    if (entry === null || entry.value === null) {
        return null;
    }
    // This is an LRU access. Move the entry to the front of the list.
    (0, _lru.lruPut)(entry);
    return entry.value;
}
function isValueExpired(now, currentCacheVersion, value) {
    return value.staleAt <= now || value.version < currentCacheVersion;
}
function lazilyEvictIfNeeded(now, currentCacheVersion, entry, onlyMatchFulfilled) {
    // We have a matching entry, but before we can return it, we need to check if
    // it's still fresh. Otherwise it should be treated the same as a cache miss.
    if (entry.value === null) {
        // This entry has no value, so there's nothing to evict.
        return entry;
    }
    const value = entry.value;
    if (isValueExpired(now, currentCacheVersion, value)) {
        // The value expired. Lazily evict it from the cache, and return null. This
        // is conceptually the same as a cache miss.
        deleteMapEntry(entry);
        return null;
    }
    if (onlyMatchFulfilled && value.status !== 2) {
        // The entry is fresh but is not Fulfilled. Treat as a non-match so the
        // recursion can continue and try a Fallback entry.
        return null;
    }
    // The matched entry has not expired. Return it.
    return entry;
}
function getEntryWithFallbackImpl(now, currentCacheVersion, entry, keys, isRevalidation, previousKey, onlyMatchFulfilled) {
    // This is similar to getExactEntry, but if an exact match is not found for
    // a key, it will return the fallback entry instead. This is recursive at
    // every level, e.g. an entry with keypath [a, Fallback, c, Fallback] is
    // valid match for [a, b, c, d].
    //
    // It will return the most specific match available.
    //
    // When `onlyMatchFulfilled` is true, terminal entries that aren't Fulfilled
    // are treated as non-matches, so the recursion will continue searching for
    // a Fallback match. See getFromCacheMap for the rationale.
    let key;
    let remainingKeys;
    if (keys !== null) {
        key = keys.value;
        remainingKeys = keys.parent;
    } else if (isRevalidation && previousKey !== Revalidation) {
        // During a revalidation, we append an internal "Revalidation" key to
        // the end of the keypath.
        key = Revalidation;
        remainingKeys = null;
    } else {
        // There are no more keys. This is the terminal entry.
        return lazilyEvictIfNeeded(now, currentCacheVersion, entry, onlyMatchFulfilled);
    }
    const map = entry.map;
    if (map !== null) {
        const existingEntry = map.get(key);
        if (existingEntry !== undefined) {
            // Found an exact match for this key. Keep searching.
            const result = getEntryWithFallbackImpl(now, currentCacheVersion, existingEntry, remainingKeys, isRevalidation, key, onlyMatchFulfilled);
            if (result !== null) {
                return result;
            }
        }
        // No match found for this key. Check if there's a fallback.
        const fallbackEntry = map.get(Fallback);
        if (fallbackEntry !== undefined) {
            // Found a fallback for this key. Keep searching.
            return getEntryWithFallbackImpl(now, currentCacheVersion, fallbackEntry, remainingKeys, isRevalidation, key, onlyMatchFulfilled);
        }
    }
    return null;
}
function setInCacheMap(cacheMap, keys, value, isRevalidation) {
    // Add a value to the map at the given keypath. If the value is already
    // part of the map, it's removed from its previous keypath. (NOTE: This is
    // unlike a regular JS map, but the behavior is intentional.)
    const entry = getOrInitialize(cacheMap, keys, isRevalidation);
    setMapEntryValue(entry, value);
    // This is an LRU access. Move the entry to the front of the list.
    (0, _lru.lruPut)(entry);
    (0, _lru.updateLruSize)(entry, value.size);
}
function setMapEntryValue(entry, value) {
    if (entry.value !== null) {
        // There's already a value at the given keypath. Disconnect the old value
        // from the map. We're not calling `deleteMapEntry` here because the
        // entry itself is still in the map. We just want to overwrite its value.
        dropRef(entry.value);
        entry.value = null;
    }
    // This value may already be in the map at a different keypath.
    // Grab a reference before we overwrite it.
    const oldEntry = value.ref;
    entry.value = value;
    value.ref = entry;
    (0, _lru.updateLruSize)(entry, value.size);
    if (oldEntry !== null && oldEntry !== entry && oldEntry.value === value) {
        // This value is already in the map at a different keypath in the map.
        // Values only exist at a single keypath at a time. Remove it from the
        // previous keypath.
        //
        // Note that only the internal map entry is garbage collected; we don't
        // call `dropRef` here because it's still in the map, just
        // at a new keypath (the one we just set, above).
        deleteMapEntry(oldEntry);
    }
}
function deleteFromCacheMap(value) {
    const entry = value.ref;
    if (entry === null) {
        // This value is not a member of any map.
        return;
    }
    dropRef(value);
    deleteMapEntry(entry);
}
function dropRef(value) {
    // Drop the value from the map by setting its `ref` backpointer to
    // null. This is a separate operation from `deleteMapEntry` because when
    // re-keying a value we need to be able to delete the old, internal map
    // entry without garbage collecting the value itself.
    value.ref = null;
}
function deleteMapEntry(entry) {
    // Delete the entry from the cache.
    entry.value = null;
    (0, _lru.deleteFromLru)(entry);
    // Check if we can garbage collect the entry.
    const map = entry.map;
    if (map === null) {
        // Since this entry has no value, and also no child entries, we can
        // garbage collect it. Remove it from its parent, and keep garbage
        // collecting the parents until we reach a non-empty entry.
        let parent = entry.parent;
        let key = entry.key;
        while(parent !== null){
            const parentMap = parent.map;
            if (parentMap !== null) {
                parentMap.delete(key);
                if (parentMap.size === 0) {
                    // We just removed the last entry in the parent map.
                    parent.map = null;
                    if (parent.value === null) {
                        // The parent node has no child entries, nor does it have a value
                        // on itself. It can be garbage collected. Keep going.
                        key = parent.key;
                        parent = parent.parent;
                        continue;
                    }
                }
            }
            break;
        }
    } else {
        // Check if there's a revalidating entry. If so, promote it to a
        // "normal" entry, since the normal one was just deleted.
        const revalidatingEntry = map.get(Revalidation);
        if (revalidatingEntry !== undefined && revalidatingEntry.value !== null) {
            setMapEntryValue(entry, revalidatingEntry.value);
        }
    }
}
function setSizeInCacheMap(value, size) {
    const entry = value.ref;
    if (entry === null) {
        // This value is not a member of any map.
        return;
    }
    // Except during initialization (when the size is set to 0), this is the only
    // place the `size` field should be updated, to ensure it's in sync with the
    // the LRU.
    value.size = size;
    (0, _lru.updateLruSize)(entry, size);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=cache-map.js.map


/***/ }),

/***/ 77197:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(99062);
} else {}


/***/ }),

/***/ 77304:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "callServer", ({
    enumerable: true,
    get: function() {
        return callServer;
    }
}));
const _react = __webpack_require__(12115);
const _routerreducertypes = __webpack_require__(74616);
const _useactionqueue = __webpack_require__(55437);
async function callServer(actionId, actionArgs) {
    return new Promise((resolve, reject)=>{
        (0, _react.startTransition)(()=>{
            (0, _useactionqueue.dispatchAppRouterAction)({
                type: _routerreducertypes.ACTION_SERVER_ACTION,
                actionId,
                actionArgs,
                resolve,
                reject
            });
        });
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-call-server.js.map


/***/ }),

/***/ 77324:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createLinkPrefetchPartialError: function() {
        return createLinkPrefetchPartialError;
    },
    createUnrenderedSegmentError: function() {
        return createUnrenderedSegmentError;
    }
});
function createUnrenderedSegmentError(route, missingFiles) {
    let message = `Route "${route}": Could not validate that a segment in your UI has instant navigation.`;
    if (missingFiles.length > 0) {
        const label = missingFiles.length === 1 ? 'Dropped segment' : 'Dropped segments';
        message += `\n\nThis segment was dropped from rendering. Issues that would prevent instant navigation will go undetected.` + `\n\n${label}:\n${missingFiles.map((p)=>`  ${p}`).join('\n')}` + `\n\nWays to fix this:` + `\n  - [render] Render the dropped segment` + `\n  - [ignore] Set \`export const instant = false\` to opt the dropped segment out of instant-navigation validation` + `\n\nLearn more: https://nextjs.org/docs/messages/instant-unrendered-segment`;
    }
    return Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E1286",
        enumerable: false,
        configurable: true
    });
}
function createLinkPrefetchPartialError(pathname) {
    return Object.defineProperty(new Error(`Next.js encountered dynamic data during prefetching for "${pathname}".\n\n` + `This will lead to slower, more expensive prefetches.\n\n` + `Ways to fix this:\n` + `  - [upgrade] Opt into Partial Prefetching by exporting \`const prefetch = 'partial'\` from the page or layout, or by setting \`partialPrefetching: true\` in next.config to opt the whole app in\n` + `  - [disable] Remove \`prefetch={true}\` from the <Link> to use the default prefetch\n` + `  - [ignore] Set \`export const instant = false\` to opt the route out of instant-navigation validation\n\n` + `Learn more: https://nextjs.org/docs/messages/instant-link-prefetch-partial`), "__NEXT_ERROR_CODE", {
        value: "E1435",
        enumerable: false,
        configurable: true
    });
} //# sourceMappingURL=instant-messages.js.map


/***/ }),

/***/ 77446:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createRenderSearchParamsFromClient", ({
    enumerable: true,
    get: function() {
        return createRenderSearchParamsFromClient;
    }
}));
const CachedSearchParams = new WeakMap();
function makeUntrackedSearchParams(underlyingSearchParams) {
    const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const promise = Promise.resolve(underlyingSearchParams);
    CachedSearchParams.set(underlyingSearchParams, promise);
    return promise;
}
function createRenderSearchParamsFromClient(underlyingSearchParams) {
    return makeUntrackedSearchParams(underlyingSearchParams);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=search-params.browser.prod.js.map


/***/ }),

/***/ 77565:
/***/ ((module, exports) => {

"use strict";
/**
 * Shared types and constants for the Segment Cache.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    FetchStrategy: function() {
        return FetchStrategy;
    },
    NavigationResultTag: function() {
        return NavigationResultTag;
    },
    PrefetchPriority: function() {
        return PrefetchPriority;
    }
});
var NavigationResultTag = /*#__PURE__*/ function(NavigationResultTag) {
    NavigationResultTag[NavigationResultTag["MPA"] = 0] = "MPA";
    NavigationResultTag[NavigationResultTag["Success"] = 1] = "Success";
    NavigationResultTag[NavigationResultTag["NoOp"] = 2] = "NoOp";
    NavigationResultTag[NavigationResultTag["Async"] = 3] = "Async";
    return NavigationResultTag;
}({});
var PrefetchPriority = /*#__PURE__*/ function(PrefetchPriority) {
    /**
   * Assigned to the most recently hovered/touched link. Special network
   * bandwidth is reserved for this task only. There's only ever one Intent-
   * priority task at a time; when a new Intent task is scheduled, the previous
   * one is bumped down to Default.
   */ PrefetchPriority[PrefetchPriority["Intent"] = 2] = "Intent";
    /**
   * The default priority for prefetch tasks.
   */ PrefetchPriority[PrefetchPriority["Default"] = 1] = "Default";
    /**
   * Assigned to tasks when they spawn non-blocking background work, like
   * revalidating a partially cached entry to see if more data is available.
   */ PrefetchPriority[PrefetchPriority["Background"] = 0] = "Background";
    return PrefetchPriority;
}({});
var FetchStrategy = /*#__PURE__*/ function(FetchStrategy) {
    // Deliberately ordered so we can easily compare two segments
    // and determine if one segment is "more specific" than another
    // (i.e. if it's likely that it contains more data). See
    // canNewFetchStrategyProvideMoreContent in cache.ts for what each tier can
    // contain relative to the others.
    //
    // These numeric values are client-internal and never cross the wire — the
    // `next-router-prefetch` request header values are mapped explicitly in
    // fetchSegmentPrefetchesUsingDynamicRequest (cache.ts) — so the members can
    // be renumbered freely as long as the relative order is preserved.
    FetchStrategy[FetchStrategy["LoadingBoundary"] = 0] = "LoadingBoundary";
    // The App Shell variant extracted from a static per-segment prefetch
    // response: every segment's param-dependent content is reduced to pending
    // references that render as the param fallback. Less complete than
    // RuntimeShell — a static response can't include content that depends on
    // session data (cookies, headers) — and less complete than PPR at concrete
    // paths, which includes prerendered param-dependent content.
    FetchStrategy[FetchStrategy["StaticShell"] = 1] = "StaticShell";
    FetchStrategy[FetchStrategy["RuntimeShell"] = 2] = "RuntimeShell";
    FetchStrategy[FetchStrategy["PPR"] = 3] = "PPR";
    FetchStrategy[FetchStrategy["PPRRuntime"] = 4] = "PPRRuntime";
    FetchStrategy[FetchStrategy["Full"] = 5] = "Full";
    return FetchStrategy;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=types.js.map


/***/ }),

/***/ 77584:
/***/ ((module, exports) => {

"use strict";
/**
 * Create a "Thenable" that does not resolve. This is used to suspend indefinitely when data is not available yet.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unresolvedThenable", ({
    enumerable: true,
    get: function() {
        return unresolvedThenable;
    }
}));
const unresolvedThenable = {
    then: ()=>{}
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unresolved-thenable.js.map


/***/ }),

/***/ 78237:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEFAULT_SEGMENT_KEY: function() {
        return DEFAULT_SEGMENT_KEY;
    },
    NOT_FOUND_SEGMENT_KEY: function() {
        return NOT_FOUND_SEGMENT_KEY;
    },
    PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
    },
    addSearchParamsIfPageSegment: function() {
        return addSearchParamsIfPageSegment;
    },
    computeSelectedLayoutSegment: function() {
        return computeSelectedLayoutSegment;
    },
    getSegmentValue: function() {
        return getSegmentValue;
    },
    getSelectedLayoutSegmentPath: function() {
        return getSelectedLayoutSegmentPath;
    },
    isGroupSegment: function() {
        return isGroupSegment;
    },
    isParallelRouteSegment: function() {
        return isParallelRouteSegment;
    }
});
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
function isGroupSegment(segment) {
    // Use array[0] for performant purpose
    return segment[0] === '(' && segment.endsWith(')');
}
function isParallelRouteSegment(segment) {
    return segment.startsWith('@') && segment !== '@children';
}
function addSearchParamsIfPageSegment(segment, searchParams) {
    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
    if (isPageSegment) {
        const stringifiedQuery = JSON.stringify(searchParams);
        return stringifiedQuery !== '{}' ? PAGE_SEGMENT_KEY + '?' + stringifiedQuery : PAGE_SEGMENT_KEY;
    }
    return segment;
}
function computeSelectedLayoutSegment(segments, parallelRouteKey) {
    if (!segments || segments.length === 0) {
        return null;
    }
    // For 'children', use first segment; for other parallel routes, use last segment
    const rawSegment = parallelRouteKey === 'children' ? segments[0] : segments[segments.length - 1];
    // If the default slot is showing, return null since it's not technically "selected" (it's a fallback)
    // Returning an internal value like `__DEFAULT__` would be confusing
    return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
}
function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    let segmentValue = getSegmentValue(segment);
    if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
        return segmentPath;
    }
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
const PAGE_SEGMENT_KEY = '__PAGE__';
const DEFAULT_SEGMENT_KEY = '__DEFAULT__';
const NOT_FOUND_SEGMENT_KEY = '/_not-found'; //# sourceMappingURL=segment.js.map


/***/ }),

/***/ 78616:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "ClientSegmentRoot", ({
    enumerable: true,
    get: function() {
        return ClientSegmentRoot;
    }
}));
const _jsxruntime = __webpack_require__(95155);
const _approutercontextsharedruntime = __webpack_require__(22909);
const _react = __webpack_require__(12115);
const _clientboundaryparams = __webpack_require__(58956);
function ClientSegmentRoot({ Component, slots, serverProvidedParams }) {
    let params;
    if (serverProvidedParams !== null) {
        params = serverProvidedParams.params;
    } else {
        // When Cache Components is enabled, the server does not pass the params
        // as props; they are parsed on the client and passed via context.
        const layoutRouterContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
        params = layoutRouterContext !== null ? layoutRouterContext.parentParams : {};
    }
    const clientParams = (0, _clientboundaryparams.createClientParams)(params);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
        ...slots,
        params: clientParams
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-segment.js.map


/***/ }),

/***/ 79620:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    appendLayoutVaryPath: function() {
        return appendLayoutVaryPath;
    },
    clonePageVaryPathWithNewSearchParams: function() {
        return clonePageVaryPathWithNewSearchParams;
    },
    finalizeLayoutVaryPath: function() {
        return finalizeLayoutVaryPath;
    },
    finalizeMetadataVaryPath: function() {
        return finalizeMetadataVaryPath;
    },
    finalizePageVaryPath: function() {
        return finalizePageVaryPath;
    },
    getFulfilledRouteVaryPath: function() {
        return getFulfilledRouteVaryPath;
    },
    getFulfilledSegmentVaryPath: function() {
        return getFulfilledSegmentVaryPath;
    },
    getPartialLayoutVaryPath: function() {
        return getPartialLayoutVaryPath;
    },
    getPartialPageVaryPath: function() {
        return getPartialPageVaryPath;
    },
    getRenderedSearchFromVaryPath: function() {
        return getRenderedSearchFromVaryPath;
    },
    getRouteVaryPath: function() {
        return getRouteVaryPath;
    },
    getSegmentVaryPathForRequest: function() {
        return getSegmentVaryPathForRequest;
    },
    getShellSegmentVaryPath: function() {
        return getShellSegmentVaryPath;
    }
});
const _types = __webpack_require__(77565);
const _cachemap = __webpack_require__(76849);
const _segmentvalueencoding = __webpack_require__(63534);
function getRouteVaryPath(pathname, search, nextUrl) {
    // requestKey -> searchParams -> nextUrl
    const varyPath = {
        id: null,
        value: pathname,
        isRootParam: false,
        parent: {
            id: '?',
            value: search,
            isRootParam: false,
            parent: {
                id: null,
                value: nextUrl,
                isRootParam: false,
                parent: null
            }
        }
    };
    return varyPath;
}
function getFulfilledRouteVaryPath(pathname, search, nextUrl, couldBeIntercepted) {
    // This is called when a route's data is fulfilled. The cache entry will be
    // re-keyed based on which inputs the response varies by.
    // requestKey -> searchParams -> nextUrl
    const varyPath = {
        id: null,
        value: pathname,
        isRootParam: false,
        parent: {
            id: '?',
            value: search,
            isRootParam: false,
            parent: {
                id: null,
                value: couldBeIntercepted ? nextUrl : _cachemap.Fallback,
                isRootParam: false,
                parent: null
            }
        }
    };
    return varyPath;
}
function appendLayoutVaryPath(parentPath, cacheKey, paramName, isRootParam) {
    const varyPathPart = {
        id: paramName,
        value: cacheKey,
        isRootParam,
        parent: parentPath
    };
    return varyPathPart;
}
function finalizeLayoutVaryPath(requestKey, varyPath) {
    const layoutVaryPath = {
        id: null,
        value: requestKey,
        isRootParam: false,
        parent: varyPath
    };
    return layoutVaryPath;
}
function getPartialLayoutVaryPath(finalizedVaryPath) {
    // This is the inverse of finalizeLayoutVaryPath.
    return finalizedVaryPath.parent;
}
function finalizePageVaryPath(requestKey, renderedSearch, varyPath) {
    // Unlike layouts, a page segment's vary path also includes the search string.
    // requestKey -> searchParams -> pathParams
    const pageVaryPath = {
        id: null,
        value: requestKey,
        isRootParam: false,
        parent: {
            id: '?',
            value: renderedSearch,
            isRootParam: false,
            parent: varyPath
        }
    };
    return pageVaryPath;
}
function getPartialPageVaryPath(finalizedVaryPath) {
    // This is the inverse of finalizePageVaryPath.
    return finalizedVaryPath.parent.parent;
}
function finalizeMetadataVaryPath(pageRequestKey, renderedSearch, varyPath) {
    // The metadata "segment" is not a real segment because it doesn't exist in
    // the normal structure of the route tree, but in terms of caching, it
    // behaves like a page segment because it varies by all the same params as
    // a page.
    //
    // To keep the protocol for querying the server simple, the request key for
    // the metadata does not include any path information. It's unnecessary from
    // the server's perspective, because unlike page segments, there's only one
    // metadata response per URL, i.e. there's no need to distinguish multiple
    // parallel pages.
    //
    // However, this means the metadata request key is insufficient for
    // caching the the metadata in the client cache, because on the client we
    // use the request key to distinguish the metadata entry from all other
    // page's metadata entries.
    //
    // So instead we create a simulated request key based on the page segment.
    // Conceptually this is equivalent to the request key the server would have
    // assigned the metadata segment if it treated it as part of the actual
    // route structure.
    // If there are multiple parallel pages, we use whichever is the first one.
    // This is fine because the only difference between request keys for
    // different parallel pages are things like route groups and parallel
    // route slots. As long as it's always the same one, it doesn't matter.
    const pageVaryPath = {
        id: null,
        // Append the actual metadata request key to the page request key. Note
        // that we're not using a separate vary path part; it's unnecessary because
        // these are not conceptually separate inputs.
        value: pageRequestKey + _segmentvalueencoding.HEAD_REQUEST_KEY,
        isRootParam: false,
        parent: {
            id: '?',
            value: renderedSearch,
            isRootParam: false,
            parent: varyPath
        }
    };
    return pageVaryPath;
}
function getSegmentVaryPathForRequest(fetchStrategy, tree) {
    // This is used for storing pending requests in the cache. We want to choose
    // the most generic vary path based on the strategy used to fetch it, i.e.
    // static/PPR versus runtime prefetching, so that it can be reused as much
    // as possible.
    //
    // We may be able to re-key the response to something even more generic once
    // we receive it — for example, if the server tells us that the response
    // doesn't vary on a particular param — but even before we send the request,
    // we know some params are reusable based on the fetch strategy alone. For
    // example, a static prefetch will never vary on search params.
    //
    // The original vary path with all the params filled in is stored on the
    // route tree object. We will clone this one to create a new vary path
    // where certain params are replaced with Fallback.
    //
    // This result of this function is not stored anywhere. It's only used to
    // access the cache a single time.
    //
    // TODO: Rather than create a new list object just to access the cache, the
    // plan is to add the concept of a "vary mask". This will represent all the
    // params that can be treated as Fallback. (Or perhaps the inverse.)
    const originalVaryPath = tree.varyPath;
    if (fetchStrategy === _types.FetchStrategy.RuntimeShell || fetchStrategy === _types.FetchStrategy.StaticShell) {
        // Both shell strategies produce the App Shell variant of a segment —
        // RuntimeShell via a runtime render with non-root params omitted,
        // StaticShell by truncating a static per-segment response at the shell
        // byte boundary. Either way, the resulting entry is reusable across all
        // concrete values of the non-root params, so we key it at the precomputed
        // shell vary path (every non-root param substituted with Fallback; root
        // params keep their concrete value).
        return tree.shellVaryPath;
    }
    // Only page segments (and the special "metadata" segment, which is treated
    // like a page segment for the purposes of caching) may contain search
    // params. There's no reason to include them in the vary path otherwise.
    if (tree.isPage) {
        // Only a runtime prefetch will include search params in the vary path.
        // Static prefetches never include search params, so they can be reused
        // across all possible search param values.
        const doesVaryOnSearchParams = fetchStrategy === _types.FetchStrategy.Full || fetchStrategy === _types.FetchStrategy.PPRRuntime;
        if (!doesVaryOnSearchParams) {
            // The response from the the server will not vary on search params. Clone
            // the end of the original vary path to replace the search params
            // with Fallback.
            //
            // requestKey -> searchParams -> pathParams
            //               ^ This part gets replaced with Fallback
            const searchParamsVaryPath = originalVaryPath.parent;
            const pathParamsVaryPath = searchParamsVaryPath.parent;
            const patchedVaryPath = {
                id: null,
                value: originalVaryPath.value,
                isRootParam: false,
                parent: {
                    id: '?',
                    value: _cachemap.Fallback,
                    isRootParam: false,
                    parent: pathParamsVaryPath
                }
            };
            return patchedVaryPath;
        }
    }
    // The request does vary on search params. We don't need to modify anything.
    return originalVaryPath;
}
function clonePageVaryPathWithNewSearchParams(originalVaryPath, newSearch) {
    // requestKey -> searchParams -> pathParams
    //               ^ This part gets replaced with newSearch
    const searchParamsVaryPath = originalVaryPath.parent;
    const clonedVaryPath = {
        id: null,
        value: originalVaryPath.value,
        isRootParam: false,
        parent: {
            id: '?',
            value: newSearch,
            isRootParam: false,
            parent: searchParamsVaryPath.parent
        }
    };
    return clonedVaryPath;
}
function getRenderedSearchFromVaryPath(varyPath) {
    const searchParams = varyPath.parent.value;
    return typeof searchParams === 'string' ? searchParams : null;
}
function getFulfilledSegmentVaryPath(original, varyParams) {
    // Re-keys a segment's vary path based on which params the segment actually
    // depends on. Params that are NOT in the varyParams set are replaced with
    // Fallback, allowing the cache entry to be reused across different values of
    // those params.
    // This is called when a segment is fulfilled with data from the server. The
    // varyParams set comes from the server and indicates which params were
    // accessed during rendering.
    const clone = {
        id: original.id,
        // If the id is null, this node is not a param (e.g., it's a request key).
        // If the id is in the varyParams set, keep the original value.
        // Otherwise, replace with Fallback to make it reusable.
        value: original.id === null || varyParams.has(original.id) ? original.value : _cachemap.Fallback,
        isRootParam: original.isRootParam,
        parent: original.parent === null ? null : getFulfilledSegmentVaryPath(original.parent, varyParams)
    };
    return clone;
}
function getShellSegmentVaryPath(original) {
    // Re-keys a segment's vary path to identify the "App Shell" entry for this
    // segment position — a reusable loading state that can be served for any
    // concrete navigation to this segment. The shell is rendered with params
    // omitted, with one exception: root params (path params at or above the root
    // layout) may be accessed during the shell render, so the shell varies on
    // them. Accordingly, we keep the concrete value of structural nodes (request
    // keys, etc.) and root param nodes, and replace every other param node (non-
    // root path params and search params) with Fallback.
    const clone = {
        id: original.id,
        value: original.id === null || original.isRootParam === true ? original.value : _cachemap.Fallback,
        isRootParam: original.isRootParam,
        parent: original.parent === null ? null : getShellSegmentVaryPath(original.parent)
    };
    return clone;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=vary-path.js.map


/***/ }),

/***/ 80882:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    UnknownDynamicStaleTime: function() {
        return UnknownDynamicStaleTime;
    },
    computeDynamicStaleAt: function() {
        return computeDynamicStaleAt;
    },
    invalidateBfCache: function() {
        return invalidateBfCache;
    },
    readFromBFCache: function() {
        return readFromBFCache;
    },
    readFromBFCacheDuringRegularNavigation: function() {
        return readFromBFCacheDuringRegularNavigation;
    },
    updateBFCacheEntryStaleAt: function() {
        return updateBFCacheEntryStaleAt;
    },
    writeHeadToBFCache: function() {
        return writeHeadToBFCache;
    },
    writeToBFCache: function() {
        return writeToBFCache;
    }
});
const _navigatereducer = __webpack_require__(15368);
const _cachemap = __webpack_require__(76849);
const UnknownDynamicStaleTime = -1;
function computeDynamicStaleAt(now, dynamicStaleTimeSeconds) {
    return dynamicStaleTimeSeconds !== UnknownDynamicStaleTime ? now + dynamicStaleTimeSeconds * 1000 : now + _navigatereducer.DYNAMIC_STALETIME_MS;
}
const bfcacheMap = (0, _cachemap.createCacheMap)();
let currentBfCacheVersion = 0;
function invalidateBfCache() {
    if (false) {}
    currentBfCacheVersion++;
}
function writeToBFCache(now, varyPath, rsc, prefetchRsc, head, prefetchHead, dynamicStaleAt, bfcacheId) {
    if (false) {}
    const entry = {
        rsc,
        prefetchRsc,
        // TODO: These fields will be removed from both BFCacheEntry and
        // SegmentCacheEntry. The head has its own separate cache entry.
        head,
        prefetchHead,
        bfcacheId,
        ref: null,
        // TODO: This is just a heuristic. Getting the actual size of the segment
        // isn't feasible because it's part of a larger streaming response. The
        // LRU will still evict it, we just won't have a fully accurate total
        // LRU size. However, we'll probably remove the size tracking from the LRU
        // entirely and use memory pressure events instead.
        size: 100,
        navigatedAt: now,
        // A back/forward navigation will disregard the stale time. This field is
        // only relevant when staleTimes.dynamic is enabled or unstable_dynamicStaleTime
        // is exported by a page.
        staleAt: dynamicStaleAt,
        version: currentBfCacheVersion,
        status: _cachemap.EntryStatus.Fulfilled
    };
    const isRevalidation = false;
    (0, _cachemap.setInCacheMap)(bfcacheMap, varyPath, entry, isRevalidation);
}
function writeHeadToBFCache(now, varyPath, head, prefetchHead, dynamicStaleAt, bfcacheId) {
    // Read the special "segment" that represents the head data.
    writeToBFCache(now, varyPath, head, prefetchHead, null, null, dynamicStaleAt, bfcacheId);
}
function updateBFCacheEntryStaleAt(varyPath, newStaleAt) {
    if (false) {}
    const isRevalidation = false;
    // Read with staleness bypass (-1) so we can update even stale entries
    const entry = (0, _cachemap.getFromCacheMap)(-1, currentBfCacheVersion, bfcacheMap, varyPath, isRevalidation, false);
    if (entry !== null) {
        entry.staleAt = newStaleAt;
    }
}
function readFromBFCache(varyPath) {
    if (false) {}
    const isRevalidation = false;
    return (0, _cachemap.getFromCacheMap)(// might be. Pass -1 instead of the actual current time to bypass
    // staleness checks.
    -1, currentBfCacheVersion, bfcacheMap, varyPath, isRevalidation, false);
}
function readFromBFCacheDuringRegularNavigation(now, varyPath) {
    if (false) {}
    const isRevalidation = false;
    return (0, _cachemap.getFromCacheMap)(now, currentBfCacheVersion, bfcacheMap, varyPath, isRevalidation, false);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=bfcache.js.map


/***/ }),

/***/ 82676:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    WarningIcon: function() {
        return WarningIcon;
    },
    errorStyles: function() {
        return errorStyles;
    },
    errorThemeCss: function() {
        return errorThemeCss;
    }
});
const _interop_require_default = __webpack_require__(73623);
const _jsxruntime = __webpack_require__(95155);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(12115));
const errorStyles = {
    container: {
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        marginTop: '-32px',
        maxWidth: '325px',
        padding: '32px 28px',
        textAlign: 'left'
    },
    icon: {
        marginBottom: '24px'
    },
    title: {
        fontSize: '24px',
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: '32px',
        margin: '0 0 12px 0',
        color: 'var(--next-error-title)'
    },
    message: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '21px',
        margin: '0 0 20px 0',
        color: 'var(--next-error-message)'
    },
    form: {
        margin: 0
    },
    buttonGroup: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    },
    button: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        padding: '0 12px',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        borderRadius: '6px',
        cursor: 'pointer',
        color: 'var(--next-error-btn-text)',
        background: 'var(--next-error-btn-bg)',
        border: 'var(--next-error-btn-border)'
    },
    buttonSecondary: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        padding: '0 12px',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        borderRadius: '6px',
        cursor: 'pointer',
        color: 'var(--next-error-btn-secondary-text)',
        background: 'var(--next-error-btn-secondary-bg)',
        border: 'var(--next-error-btn-secondary-border)'
    },
    digestFooter: {
        position: 'fixed',
        bottom: '32px',
        left: '0',
        right: '0',
        textAlign: 'center',
        fontFamily: 'ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,monospace',
        fontSize: '12px',
        lineHeight: '18px',
        fontWeight: 400,
        margin: '0',
        color: 'var(--next-error-digest)'
    }
};
const errorThemeCss = `
:root {
  --next-error-bg: #fff;
  --next-error-text: #171717;
  --next-error-title: #171717;
  --next-error-message: #171717;
  --next-error-digest: #666666;
  --next-error-btn-text: #fff;
  --next-error-btn-bg: #171717;
  --next-error-btn-border: none;
  --next-error-btn-secondary-text: #171717;
  --next-error-btn-secondary-bg: transparent;
  --next-error-btn-secondary-border: 1px solid rgba(0,0,0,0.08);
}
@media (prefers-color-scheme: dark) {
  :root {
    --next-error-bg: #0a0a0a;
    --next-error-text: #ededed;
    --next-error-title: #ededed;
    --next-error-message: #ededed;
    --next-error-digest: #a0a0a0;
    --next-error-btn-text: #0a0a0a;
    --next-error-btn-bg: #ededed;
    --next-error-btn-border: none;
    --next-error-btn-secondary-text: #ededed;
    --next-error-btn-secondary-bg: transparent;
    --next-error-btn-secondary-border: 1px solid rgba(255,255,255,0.14);
  }
}
body { margin: 0; color: var(--next-error-text); background: var(--next-error-bg); }
`.replace(/\n\s*/g, '');
function WarningIcon() {
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("svg", {
        width: "32",
        height: "32",
        viewBox: "-0.2 -1.5 32 32",
        fill: "none",
        style: errorStyles.icon,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("path", {
            d: "M16.9328 0C18.0839 0.000116771 19.1334 0.658832 19.634 1.69531L31.4299 26.1309C32.0708 27.4588 31.1036 28.9999 29.6291 29H2.00215C0.527541 29 -0.439628 27.4588 0.201371 26.1309L11.9973 1.69531C12.4979 0.658823 13.5474 7.75066e-05 14.6984 0H16.9328ZM3.59493 26H28.0363L16.9328 3H14.6984L3.59493 26ZM15.8156 19C16.9202 19.0001 17.8156 19.8955 17.8156 21C17.8156 22.1045 16.9202 22.9999 15.8156 23C14.7111 23 13.8156 22.1046 13.8156 21C13.8156 19.8954 14.7111 19 15.8156 19ZM17.3156 16.5H14.3156V8.5H17.3156V16.5Z",
            fill: "var(--next-error-title)"
        })
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=error-styles.js.map


/***/ }),

/***/ 83180:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// http://www.cse.yorku.ca/~oz/hash.html
// More specifically, 32-bit hash via djbxor
// (ref: https://gist.github.com/eplawless/52813b1d8ad9af510d85?permalink_comment_id=3367765#gistcomment-3367765)
// This is due to number type differences between rust for turbopack to js number types,
// where rust does not have easy way to repreesnt js's 53-bit float number type for the matching
// overflow behavior. This is more `correct` in terms of having canonical hash across different runtime / implementation
// as can gaurantee determinstic output from 32bit hash.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    djb2Hash: function() {
        return djb2Hash;
    },
    hexHash: function() {
        return hexHash;
    }
});
function djb2Hash(str) {
    let hash = 5381;
    for(let i = 0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) + hash + char & 0xffffffff;
    }
    return hash >>> 0;
}
function hexHash(str) {
    return djb2Hash(str).toString(36).slice(0, 5);
} //# sourceMappingURL=hash.js.map


/***/ }),

/***/ 83861:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
// This import must go first because it needs to patch webpack chunk loading
// before React patches chunk loading.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__webpack_require__(52431);
const _appbootstrap = __webpack_require__(93294);
const instrumentationModules = __webpack_require__(42);
(0, _appbootstrap.appBootstrap)((assetPrefix)=>{
    const { hydrate } = __webpack_require__(55448);
    // Include app-router and layout-router in the main chunk
    // eslint-disable-next-line @next/internal/typechecked-require -- Why not relative imports?
    __webpack_require__(74036);
    // eslint-disable-next-line @next/internal/typechecked-require -- Why not relative imports?
    __webpack_require__(57121);
    hydrate(instrumentationModules, assetPrefix);
});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-next.js.map


/***/ }),

/***/ 84035:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "prefetch", ({
    enumerable: true,
    get: function() {
        return prefetch;
    }
}));
const _approuterutils = __webpack_require__(28720);
const _cachekey = __webpack_require__(26452);
const _scheduler = __webpack_require__(57705);
const _types = __webpack_require__(77565);
function prefetch(href, nextUrl, treeAtTimeOfPrefetch, fetchStrategy, onInvalidate) {
    const url = (0, _approuterutils.createPrefetchURL)(href);
    if (url === null) {
        // This href should not be prefetched.
        return;
    }
    const cacheKey = (0, _cachekey.createCacheKey)(url.href, nextUrl);
    (0, _scheduler.schedulePrefetchTask)(cacheKey, treeAtTimeOfPrefetch, fetchStrategy, _types.PrefetchPriority.Default, onInvalidate, null // navigationLockPrefetch
    );
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=prefetch.js.map


/***/ }),

/***/ 84344:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "forbidden", ({
    enumerable: true,
    get: function() {
        return forbidden;
    }
}));
const _httpaccessfallback = __webpack_require__(87016);
// TODO: Add `forbidden` docs
/**
 * @experimental
 * This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
 * within a route segment as well as inject a tag.
 *
 * `forbidden()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};403`;
function forbidden() {
    if (true) {
        throw Object.defineProperty(new Error(`\`forbidden()\` is experimental and only allowed to be enabled when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E488",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E1019",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=forbidden.js.map


/***/ }),

/***/ 84536:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    canonicalizeURLPart: function() {
        return canonicalizeURLPart;
    },
    doesStaticSegmentAppearInURL: function() {
        return doesStaticSegmentAppearInURL;
    },
    getCacheKeyForDynamicParam: function() {
        return getCacheKeyForDynamicParam;
    },
    getParamValueFromCacheKey: function() {
        return getParamValueFromCacheKey;
    },
    getRenderedPathname: function() {
        return getRenderedPathname;
    },
    getRenderedSearch: function() {
        return getRenderedSearch;
    },
    parseDynamicParamFromURLPart: function() {
        return parseDynamicParamFromURLPart;
    },
    urlSearchParamsToParsedUrlQuery: function() {
        return urlSearchParamsToParsedUrlQuery;
    },
    urlToUrlWithoutFlightMarker: function() {
        return urlToUrlWithoutFlightMarker;
    }
});
const _segment = __webpack_require__(78237);
const _segmentvalueencoding = __webpack_require__(63534);
const _approuterheaders = __webpack_require__(15563);
const _hasbasepath = __webpack_require__(48512);
const _removebasepath = __webpack_require__(95888);
function getRenderedSearch(response) {
    // If the server performed a rewrite, the search params used to render the
    // page will be different from the params in the request URL. In this case,
    // the response will include a header that gives the rewritten search query.
    const rewrittenQuery = response.headers.get(_approuterheaders.NEXT_REWRITTEN_QUERY_HEADER);
    if (rewrittenQuery !== null) {
        return rewrittenQuery === '' ? '' : '?' + rewrittenQuery;
    }
    // If the header is not present, there was no rewrite, so we use the search
    // query of the response URL.
    return urlToUrlWithoutFlightMarker(new URL(response.url)).search;
}
function getRenderedPathname(response) {
    // If the server performed a rewrite, the pathname used to render the
    // page will be different from the pathname in the request URL. In this case,
    // the response will include a header that gives the rewritten pathname.
    const rewrittenPath = response.headers.get(_approuterheaders.NEXT_REWRITTEN_PATH_HEADER);
    if (rewrittenPath !== null) {
        return rewrittenPath;
    }
    const pathname = urlToUrlWithoutFlightMarker(new URL(response.url)).pathname;
    return (0, _hasbasepath.hasBasePath)(pathname) ? (0, _removebasepath.removeBasePath)(pathname) : pathname;
}
function canonicalizeURLPart(part) {
    try {
        return encodeURIComponent(decodeURIComponent(part));
    } catch  {
        // `decodeURIComponent` throws on malformed sequences. Fall back to the
        // already-encoded form rather than failing the navigation.
        return part;
    }
}
function parseDynamicParamFromURLPart(paramType, pathnameParts, partIndex) {
    // This needs to match the behavior in get-dynamic-param.ts.
    switch(paramType){
        // Catchalls
        case 'c':
            {
                // Catchalls receive all the remaining URL parts. If there are no
                // remaining pathname parts, return an empty array.
                return partIndex < pathnameParts.length ? pathnameParts.slice(partIndex).map((s)=>canonicalizeURLPart(s)) : [];
            }
        // Catchall intercepted
        case 'ci(..)(..)':
        case 'ci(.)':
        case 'ci(..)':
        case 'ci(...)':
            {
                const prefix = paramType.length - 2;
                return partIndex < pathnameParts.length ? pathnameParts.slice(partIndex).map((s, i)=>{
                    if (i === 0) {
                        return canonicalizeURLPart(s.slice(prefix));
                    }
                    return canonicalizeURLPart(s);
                }) : [];
            }
        // Optional catchalls
        case 'oc':
            {
                // Optional catchalls receive all the remaining URL parts, unless this is
                // the end of the pathname, in which case they return null.
                return partIndex < pathnameParts.length ? pathnameParts.slice(partIndex).map((s)=>canonicalizeURLPart(s)) : null;
            }
        // Dynamic
        case 'd':
            {
                if (partIndex >= pathnameParts.length) {
                    // The route tree expected there to be more parts in the URL than there
                    // actually are. This could happen if the x-nextjs-rewritten-path header
                    // is incorrectly set, or potentially due to bug in Next.js. TODO:
                    // Should this be a hard error? During a prefetch, we can just abort.
                    // During a client navigation, we could trigger a hard refresh. But if
                    // it happens during initial render, we don't really have any
                    // recovery options.
                    return '';
                }
                return canonicalizeURLPart(pathnameParts[partIndex]);
            }
        // Dynamic intercepted
        case 'di(..)(..)':
        case 'di(.)':
        case 'di(..)':
        case 'di(...)':
            {
                const prefix = paramType.length - 2;
                if (partIndex >= pathnameParts.length) {
                    // The route tree expected there to be more parts in the URL than there
                    // actually are. This could happen if the x-nextjs-rewritten-path header
                    // is incorrectly set, or potentially due to bug in Next.js. TODO:
                    // Should this be a hard error? During a prefetch, we can just abort.
                    // During a client navigation, we could trigger a hard refresh. But if
                    // it happens during initial render, we don't really have any
                    // recovery options.
                    return '';
                }
                return canonicalizeURLPart(pathnameParts[partIndex].slice(prefix));
            }
        default:
            paramType;
            return '';
    }
}
function doesStaticSegmentAppearInURL(segment) {
    // This is not a parameterized segment; however, we need to determine
    // whether or not this segment appears in the URL. For example, this route
    // groups do not appear in the URL, so they should be skipped. Any other
    // special cases must be handled here.
    // TODO: Consider encoding this directly into the router tree instead of
    // inferring it on the client based on the segment type. Something like
    // a `doesAppearInURL` flag in FlightRouterState.
    if (segment === _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY || // For some reason, the loader tree sometimes includes extra __PAGE__
    // "layouts" when part of a parallel route. But it's not a leaf node.
    // Otherwise, we wouldn't need this special case because pages are
    // always leaf nodes.
    // TODO: Investigate why the loader produces these fake page segments.
    segment.startsWith(_segment.PAGE_SEGMENT_KEY) || // Route groups.
    segment[0] === '(' && segment.endsWith(')') || segment === _segment.DEFAULT_SEGMENT_KEY || segment === '/_not-found') {
        return false;
    } else {
        // All other segment types appear in the URL
        return true;
    }
}
function getCacheKeyForDynamicParam(paramValue, renderedSearch) {
    // This needs to match the logic in get-dynamic-param.ts, until we're able to
    // unify the various implementations so that these are always computed on
    // the client.
    if (typeof paramValue === 'string') {
        // TODO: Refactor or remove this helper function to accept a string rather
        // than the whole segment type. Also we can probably just append the
        // search string instead of turning it into JSON.
        const pageSegmentWithSearchParams = (0, _segment.addSearchParamsIfPageSegment)(paramValue, urlSearchParamsToParsedUrlQuery(new URLSearchParams(renderedSearch)));
        return pageSegmentWithSearchParams;
    } else if (paramValue === null) {
        return '';
    } else {
        return paramValue.join('/');
    }
}
function urlToUrlWithoutFlightMarker(url) {
    const urlWithoutFlightParameters = new URL(url);
    urlWithoutFlightParameters.searchParams.delete(_approuterheaders.NEXT_RSC_UNION_QUERY);
    if (true) {
        if (false) {}
    }
    return urlWithoutFlightParameters;
}
function getParamValueFromCacheKey(paramCacheKey, paramType) {
    // Turn the cache key string sent by the server (as part of FlightRouterState)
    // into a value that can be passed to `useParams` and client components.
    const isCatchAll = paramType === 'c' || paramType === 'oc';
    if (isCatchAll) {
        // Catch-all param keys are a concatenation of the path segments.
        // See equivalent logic in `getSelectedParams`.
        // TODO: We should just pass the array directly, rather than concatenate
        // it to a string and then split it back to an array. It needs to be an
        // array in some places, like when passing a key React, but we can convert
        // it at runtime in those places.
        return paramCacheKey.split('/');
    }
    return paramCacheKey;
}
function urlSearchParamsToParsedUrlQuery(searchParams) {
    // Converts a URLSearchParams object to the same type used by the server when
    // creating search params props, i.e. the type returned by Node's
    // "querystring" module.
    const result = {};
    for (const [key, value] of searchParams.entries()){
        if (result[key] === undefined) {
            result[key] = value;
        } else if (Array.isArray(result[key])) {
            result[key].push(value);
        } else {
            result[key] = [
                result[key],
                value
            ];
        }
    }
    return result;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=route-params.js.map


/***/ }),

/***/ 86869:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "IconMark", ({
    enumerable: true,
    get: function() {
        return IconMark;
    }
}));
const _jsxruntime = __webpack_require__(95155);
const IconMark = ()=>{
    if (true) {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
        name: "\xabnxt-icon\xbb"
    });
}; //# sourceMappingURL=icon-mark.js.map


/***/ }),

/***/ 86897:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
function jsxProd(type, config, maybeKey) {
  var key = null;
  void 0 !== maybeKey && (key = "" + maybeKey);
  void 0 !== config.key && (key = "" + config.key);
  if ("key" in config) {
    maybeKey = {};
    for (var propName in config)
      "key" !== propName && (maybeKey[propName] = config[propName]);
  } else maybeKey = config;
  config = maybeKey.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: void 0 !== config ? config : null,
    props: maybeKey
  };
}
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsxProd;
exports.jsxs = jsxProd;


/***/ }),

/***/ 87016:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTTPAccessErrorStatus: function() {
        return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
        return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
        return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
        return isHTTPAccessFallbackError;
    }
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=http-access-fallback.js.map


/***/ }),

/***/ 87491:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "serverActionReducer", ({
    enumerable: true,
    get: function() {
        return serverActionReducer;
    }
}));
const _appcallserver = __webpack_require__(77304);
const _appfindsourcemapurl = __webpack_require__(4060);
const _approuterheaders = __webpack_require__(15563);
const _unrecognizedactionerror = __webpack_require__(94454);
const _fetch = __webpack_require__(11132);
const _client = __webpack_require__(77197);
const _routerreducertypes = __webpack_require__(74616);
const _assignlocation = __webpack_require__(67841);
const _createhreffromurl = __webpack_require__(29453);
const _hasinterceptionrouteincurrenttree = __webpack_require__(60398);
const _flightdatahelpers = __webpack_require__(4103);
const _redirect = __webpack_require__(23159);
const _removebasepath = __webpack_require__(95888);
const _hasbasepath = __webpack_require__(48512);
const _serverreferenceinfo = __webpack_require__(1262);
const _cache = __webpack_require__(12506);
const _scheduler = __webpack_require__(57705);
const _deploymentid = __webpack_require__(53887);
const _navigationbuildid = __webpack_require__(97797);
const _constants = __webpack_require__(7103);
const _navigation = __webpack_require__(20354);
const _optimisticroutes = __webpack_require__(68378);
const _actionrevalidationkind = __webpack_require__(61840);
const _approuterutils = __webpack_require__(28720);
const _pprnavigations = __webpack_require__(22120);
const _fetchserverresponse = __webpack_require__(28796);
const _bfcache = __webpack_require__(80882);
const createFromFetch = _client.createFromFetch;
let createDebugChannel;
if (false) {}
async function fetchServerAction(state, nextUrl, action) {
    const { actionId, actionArgs } = action;
    const temporaryReferences = (0, _client.createTemporaryReferenceSet)();
    const info = (0, _serverreferenceinfo.extractInfoFromServerReferenceId)(actionId);
    const usedArgs = (0, _serverreferenceinfo.omitUnusedArgs)(actionArgs, info);
    const body = await (0, _client.encodeReply)(usedArgs, {
        temporaryReferences
    });
    const headers = {
        Accept: _approuterheaders.RSC_CONTENT_TYPE_HEADER,
        [_approuterheaders.ACTION_HEADER]: actionId,
        [_approuterheaders.NEXT_ROUTER_STATE_TREE_HEADER]: (0, _flightdatahelpers.prepareFlightRouterStateForRequest)(state.tree)
    };
    const deploymentId = (0, _deploymentid.getDeploymentId)();
    if (deploymentId) {
        headers['x-deployment-id'] = deploymentId;
    }
    if (nextUrl) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
    }
    if (false) {}
    let res;
    try {
        res = await (0, _fetch.fetch)(state.canonicalUrl, {
            method: 'POST',
            headers,
            body
        });
        // If the fetch succeeds while we're in the offline state, notify the
        // offline module so it can short-circuit the polling loop.
        if (false) {}
    } catch (err) {
        if (false) {}
        throw err;
    }
    // Handle server actions that the server didn't recognize.
    const unrecognizedActionHeader = res.headers.get(_approuterheaders.NEXT_ACTION_NOT_FOUND_HEADER);
    if (unrecognizedActionHeader === '1') {
        throw Object.defineProperty(new _unrecognizedactionerror.UnrecognizedActionError(`Server Action "${actionId}" was not found on the server. \nRead more: https://nextjs.org/docs/messages/failed-to-find-server-action`), "__NEXT_ERROR_CODE", {
            value: "E715",
            enumerable: false,
            configurable: true
        });
    }
    const redirectHeader = res.headers.get('x-action-redirect');
    const [location1, _redirectType] = redirectHeader?.split(';') || [];
    let redirectType;
    switch(_redirectType){
        case 'push':
            redirectType = 'push';
            break;
        case 'replace':
            redirectType = 'replace';
            break;
        default:
            redirectType = undefined;
    }
    const isPrerender = !!res.headers.get(_approuterheaders.NEXT_IS_PRERENDER_HEADER);
    let revalidationKind = _actionrevalidationkind.ActionDidNotRevalidate;
    try {
        const revalidationHeader = res.headers.get('x-action-revalidated');
        if (revalidationHeader) {
            const parsedKind = JSON.parse(revalidationHeader);
            if (parsedKind === _actionrevalidationkind.ActionDidRevalidateStaticAndDynamic || parsedKind === _actionrevalidationkind.ActionDidRevalidateDynamicOnly) {
                revalidationKind = parsedKind;
            }
        }
    } catch  {}
    const redirectLocation = location1 ? (0, _assignlocation.assignLocation)(location1, new URL(state.canonicalUrl, window.location.href)) : undefined;
    const contentType = res.headers.get('content-type');
    const isRscResponse = !!(contentType && contentType.startsWith(_approuterheaders.RSC_CONTENT_TYPE_HEADER));
    // Handle invalid server action responses.
    // A valid response must have `content-type: text/x-component`, unless it's an external redirect.
    // (external redirects have an 'x-action-redirect' header, but the body is an empty 'text/plain')
    if (!isRscResponse && !redirectLocation) {
        // The server can respond with a text/plain error message, but we'll fallback to something generic
        // if there isn't one.
        const message = res.status >= 400 && contentType === 'text/plain' ? await res.text() : 'An unexpected response was received from the server.';
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    let actionResult;
    let actionFlightData;
    let actionFlightDataRenderedSearch;
    let couldBeIntercepted = false;
    if (isRscResponse) {
        // Server action redirect responses carry the Flight data of the redirect
        // target, which may be prerendered with a completeness marker byte
        // prepended. Strip it before passing to Flight.
        const responsePromise = redirectLocation ? (0, _fetchserverresponse.processFetch)(res).then(({ response: r })=>r) : Promise.resolve(res);
        const response = await createFromFetch(responsePromise, {
            callServer: _appcallserver.callServer,
            findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
            temporaryReferences,
            debugChannel: createDebugChannel && createDebugChannel(headers)
        });
        // An internal redirect can send an RSC response, but does not have a useful `actionResult`.
        actionResult = redirectLocation ? undefined : response.a;
        couldBeIntercepted = response.i;
        // Check if the response build ID matches the client build ID.
        // In a multi-zone setup, when a server action triggers a redirect,
        // the server pre-fetches the redirect target as RSC. If the redirect
        // target is served by a different Next.js zone (different build), the
        // pre-fetched RSC data will have a foreign build ID. We must discard
        // the flight data in that case so the redirect triggers an MPA
        // navigation (full page load) instead of trying to apply the foreign
        // RSC payload — which would result in a blank page.
        const responseBuildId = res.headers.get(_constants.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? response.b;
        if (responseBuildId !== undefined && responseBuildId !== (0, _navigationbuildid.getNavigationBuildId)()) {
        // Build ID mismatch — discard the flight data. The redirect will
        // still be processed, and the absence of flight data will cause an
        // MPA navigation via completeHardNavigation().
        } else {
            const maybeFlightData = (0, _flightdatahelpers.normalizeFlightData)(response.f);
            if (maybeFlightData !== '') {
                actionFlightData = maybeFlightData;
                actionFlightDataRenderedSearch = response.q;
            }
        }
    } else {
        // An external redirect doesn't contain RSC data.
        actionResult = undefined;
        actionFlightData = undefined;
        actionFlightDataRenderedSearch = undefined;
    }
    return {
        actionResult,
        actionFlightData,
        actionFlightDataRenderedSearch,
        redirectLocation,
        redirectType,
        revalidationKind,
        isPrerender,
        couldBeIntercepted
    };
}
function serverActionReducer(state, action) {
    const { resolve, reject } = action;
    // only pass along the `nextUrl` param (used for interception routes) if the current route was intercepted.
    // If the route has been intercepted, the action should be as well.
    // Otherwise the server action might be intercepted with the wrong action id
    // (ie, one that corresponds with the intercepted route)
    const nextUrl = // performing a dynamic request. This is because we update
    // the next-url after a navigation, but we want the same
    // interception route to be matched that used the last
    // next-url.
    (state.previousNextUrl || state.nextUrl) && (0, _hasinterceptionrouteincurrenttree.hasInterceptionRouteInCurrentTree)(state.tree) ? state.previousNextUrl || state.nextUrl : null;
    return fetchServerAction(state, nextUrl, action).then(async ({ revalidationKind, actionResult, actionFlightData: flightData, actionFlightDataRenderedSearch: flightDataRenderedSearch, redirectLocation, redirectType, isPrerender, couldBeIntercepted })=>{
        if (revalidationKind !== _actionrevalidationkind.ActionDidNotRevalidate) {
            // There was either a revalidation or a refresh, or maybe both.
            // Evict the BFCache, which may contain dynamic data.
            (0, _bfcache.invalidateBfCache)();
            // Store whether this action triggered any revalidation
            // The action queue will use this information to potentially
            // trigger a refresh action if the action was discarded
            // (ie, due to a navigation, before the action completed)
            action.didRevalidate = true;
            // If there was a revalidation, evict the prefetch cache.
            // TODO: Evict only segments with matching tags and/or paths.
            // TODO: We should only invalidate the route cache if cookies were
            // mutated, since route trees may vary based on cookies. For now we
            // invalidate both caches until we have a way to detect cookie
            // mutations on the client.
            if (revalidationKind === _actionrevalidationkind.ActionDidRevalidateStaticAndDynamic) {
                (0, _cache.invalidateEntirePrefetchCache)(nextUrl, state.tree);
            }
            // Start a cooldown before re-prefetching to allow CDN cache
            // propagation.
            (0, _scheduler.startRevalidationCooldown)();
        }
        const navigateType = redirectType || 'push';
        if (redirectLocation !== undefined) {
            // If the action triggered a redirect, the action promise will be rejected with
            // a redirect so that it's handled by RedirectBoundary as we won't have a valid
            // action result to resolve the promise with. This will effectively reset the state of
            // the component that called the action as the error boundary will remount the tree.
            // The status code doesn't matter here as the action handler will have already sent
            // a response with the correct status code.
            if ((0, _approuterutils.isExternalURL)(redirectLocation)) {
                // External redirect. Triggers an MPA navigation.
                const redirectHref = redirectLocation.href;
                const redirectError = createRedirectErrorForAction(redirectHref, navigateType);
                reject(redirectError);
                return (0, _navigation.completeHardNavigation)(state, redirectLocation, navigateType);
            } else {
                // Internal redirect. Triggers an SPA navigation.
                const redirectWithBasepath = (0, _createhreffromurl.createHrefFromUrl)(redirectLocation, false);
                const redirectHref = (0, _hasbasepath.hasBasePath)(redirectWithBasepath) ? (0, _removebasepath.removeBasePath)(redirectWithBasepath) : redirectWithBasepath;
                const redirectError = createRedirectErrorForAction(redirectHref, navigateType);
                reject(redirectError);
            }
        } else {
            // If there's no redirect, resolve the action with the result.
            resolve(actionResult);
        }
        // Check if we can bail out without updating any state.
        if (redirectLocation === undefined && // Did the action revalidate any data?
        revalidationKind === _actionrevalidationkind.ActionDidNotRevalidate && // Did the server render new data?
        flightData === undefined) {
            // The action did not trigger any revalidations or redirects. No
            // navigation is required.
            return state;
        }
        if (flightData === undefined && redirectLocation !== undefined) {
            // The server redirected, but did not send any Flight data. This implies
            // an external redirect.
            // TODO: We should refactor the action response type to be more explicit
            // about the various response types.
            return (0, _navigation.completeHardNavigation)(state, redirectLocation, navigateType);
        }
        if (typeof flightData === 'string') {
            // If the flight data is just a string, something earlier in the
            // response handling triggered an external redirect.
            return (0, _navigation.completeHardNavigation)(state, new URL(flightData, location.origin), navigateType);
        }
        // The action triggered a navigation — either a redirect, a revalidation,
        // or both.
        // If there was no redirect, then the target URL is the same as the
        // current URL.
        const currentUrl = new URL(state.canonicalUrl, location.origin);
        const currentRenderedSearch = state.renderedSearch;
        const redirectUrl = redirectLocation !== undefined ? redirectLocation : currentUrl;
        const currentFlightRouterState = state.tree;
        const scrollBehavior = _routerreducertypes.ScrollBehavior.Default;
        // If the action triggered a revalidation of the cache, we should also
        // refresh all the dynamic data.
        const freshnessPolicy = revalidationKind === _actionrevalidationkind.ActionDidNotRevalidate ? _pprnavigations.FreshnessPolicy.Default : _pprnavigations.FreshnessPolicy.RefreshAll;
        // The server may have sent back new data. If so, we will perform a
        // "seeded" navigation that uses the data from the response.
        // TODO: Currently the server always renders from the root in
        // response to a Server Action. In the case of a normal redirect
        // with no revalidation, it should skip over the shared layouts.
        if (flightData !== undefined && flightDataRenderedSearch !== undefined) {
            // The server sent back new route data as part of the response. We
            // will use this to render the new page. If this happens to be only a
            // subset of the data needed to render the new page, we'll initiate a
            // new fetch, like we would for a normal navigation.
            const redirectCanonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(redirectUrl);
            const now = Date.now();
            // TODO: Store the dynamic stale time on the top-level state so it's
            // known during restores and refreshes.
            const redirectSeed = (0, _navigation.convertServerPatchToFullTree)(now, currentFlightRouterState, flightData, flightDataRenderedSearch, _bfcache.UnknownDynamicStaleTime);
            // Learn the route pattern so we can predict it for future navigations.
            const metadataVaryPath = redirectSeed.metadataVaryPath;
            if (metadataVaryPath !== null) {
                (0, _optimisticroutes.discoverKnownRoute)(now, redirectUrl.pathname, redirectUrl.search, nextUrl, null, redirectSeed.routeTree, metadataVaryPath, couldBeIntercepted, redirectCanonicalUrl, isPrerender, false // hasDynamicRewrite
                );
            }
            const navigationLock = (0, _pprnavigations.getCurrentNavigationLock)();
            return (0, _navigation.navigateToKnownRoute)(now, state, redirectUrl, redirectCanonicalUrl, redirectSeed, currentUrl, currentRenderedSearch, state.cache, currentFlightRouterState, freshnessPolicy, nextUrl, scrollBehavior, navigateType, navigationLock, _cache.segmentCacheMap, null, // have the route tree from the server response. If a mismatch occurs
            // during dynamic data fetch, the retry handler will traverse the
            // known route tree to mark the entry as having a dynamic rewrite.
            null, undefined);
        }
        // The server did not send back new data. We'll perform a regular, non-
        // seeded navigation — effectively the same as <Link> or router.push().
        return (0, _navigation.navigate)(state, redirectUrl, currentUrl, currentRenderedSearch, state.cache, currentFlightRouterState, nextUrl, freshnessPolicy, scrollBehavior, navigateType);
    }, (e)=>{
        // When the server action is rejected we don't update the state and instead call the reject handler of the promise.
        reject(e);
        return state;
    });
}
function createRedirectErrorForAction(redirectHref, resolvedRedirectType) {
    const redirectError = (0, _redirect.getRedirectError)(redirectHref, resolvedRedirectType);
    redirectError.handled = true;
    return redirectError;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-action-reducer.js.map


/***/ }),

/***/ 89226:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    compareAppPaths: function() {
        return compareAppPaths;
    },
    normalizeAppPath: function() {
        return normalizeAppPath;
    },
    normalizeRscURL: function() {
        return normalizeRscURL;
    }
});
const _ensureleadingslash = __webpack_require__(21315);
const _segment = __webpack_require__(78237);
function normalizeAppPath(route) {
    return (0, _ensureleadingslash.ensureLeadingSlash)(route.split('/').reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if ((0, _segment.isGroupSegment)(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === '@') {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === 'page' || segment === 'route') && index === segments.length - 1) {
            return pathname;
        }
        return `${pathname}/${segment}`;
    }, ''));
}
function compareAppPaths(a, b) {
    const aHasSlot = a.includes('/@');
    const bHasSlot = b.includes('/@');
    if (aHasSlot && !bHasSlot) return -1;
    if (!aHasSlot && bHasSlot) return 1;
    return a.localeCompare(b);
}
function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, '$1');
} //# sourceMappingURL=app-paths.js.map


/***/ }),

/***/ 90484:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MetadataBoundary: function() {
        return MetadataBoundary;
    },
    OutletBoundary: function() {
        return OutletBoundary;
    },
    RootLayoutBoundary: function() {
        return RootLayoutBoundary;
    },
    ViewportBoundary: function() {
        return ViewportBoundary;
    }
});
const _boundaryconstants = __webpack_require__(45653);
// We use a namespace object to allow us to recover the name of the function
// at runtime even when production bundling/minification is used.
const NameSpace = {
    [_boundaryconstants.METADATA_BOUNDARY_NAME]: function({ children }) {
        return children;
    },
    [_boundaryconstants.VIEWPORT_BOUNDARY_NAME]: function({ children }) {
        return children;
    },
    [_boundaryconstants.OUTLET_BOUNDARY_NAME]: function({ children }) {
        return children;
    },
    [_boundaryconstants.ROOT_LAYOUT_BOUNDARY_NAME]: function({ children }) {
        return children;
    }
};
const MetadataBoundary = // so it retains the name inferred from the namespace object
NameSpace[_boundaryconstants.METADATA_BOUNDARY_NAME.slice(0)];
const ViewportBoundary = // so it retains the name inferred from the namespace object
NameSpace[_boundaryconstants.VIEWPORT_BOUNDARY_NAME.slice(0)];
const OutletBoundary = // so it retains the name inferred from the namespace object
NameSpace[_boundaryconstants.OUTLET_BOUNDARY_NAME.slice(0)];
const RootLayoutBoundary = // so it retains the name inferred from the namespace object
NameSpace[_boundaryconstants.ROOT_LAYOUT_BOUNDARY_NAME.slice(0)]; //# sourceMappingURL=boundary-components.js.map


/***/ }),

/***/ 90603:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Removes the trailing slash for a given route or page path. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *
 * Uses charCodeAt (47 === '/') instead of regex to avoid the overhead of
 * compiling and executing a RegExp on every call (~3-5x faster).
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "removeTrailingSlash", ({
    enumerable: true,
    get: function() {
        return removeTrailingSlash;
    }
}));
function removeTrailingSlash(route) {
    return route.charCodeAt(route.length - 1) === 47 && route.length > 1 ? route.slice(0, -1) : route;
} //# sourceMappingURL=remove-trailing-slash.js.map


/***/ }),

/***/ 92512:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    refreshDynamicData: function() {
        return refreshDynamicData;
    },
    refreshReducer: function() {
        return refreshReducer;
    }
});
const _routerreducertypes = __webpack_require__(74616);
const _navigation = __webpack_require__(20354);
const _cache = __webpack_require__(12506);
const _hasinterceptionrouteincurrenttree = __webpack_require__(60398);
const _pprnavigations = __webpack_require__(22120);
const _bfcache = __webpack_require__(80882);
function refreshReducer(state, action) {
    // During a refresh, we invalidate the segment cache but not the route cache.
    // The route cache contains the tree structure (which segments exist at a
    // given URL) which doesn't change during a refresh. The segment cache
    // contains the actual RSC data which needs to be re-fetched.
    //
    // The Instant Navigation Testing API can bypass cache invalidation to
    // preserve prefetched data when refreshing after an MPA navigation. This is
    // only used for testing and is not exposed in production builds by default.
    const bypassCacheInvalidation =  false && 0;
    if (!bypassCacheInvalidation) {
        const currentNextUrl = state.nextUrl;
        const currentRouterState = state.tree;
        (0, _cache.invalidateSegmentCacheEntries)(currentNextUrl, currentRouterState);
    }
    // A full refresh has no HMR generation to cancel.
    return refreshDynamicData(state, _pprnavigations.FreshnessPolicy.RefreshAll, undefined);
}
function refreshDynamicData(state, freshnessPolicy, signal) {
    // During a refresh, invalidate the BFCache, which may contain dynamic data.
    (0, _bfcache.invalidateBfCache)();
    const currentNextUrl = state.nextUrl;
    // We always send the last next-url, not the current when performing a dynamic
    // request. This is because we update the next-url after a navigation, but we
    // want the same interception route to be matched that used the last next-url.
    const nextUrlForRefresh = (0, _hasinterceptionrouteincurrenttree.hasInterceptionRouteInCurrentTree)(state.tree) ? state.previousNextUrl || currentNextUrl : null;
    // A refresh is modeled as a navigation to the current URL, but where any
    // existing dynamic data (including in shared layouts) is re-fetched.
    const currentCanonicalUrl = state.canonicalUrl;
    const currentUrl = new URL(currentCanonicalUrl, location.origin);
    const currentRenderedSearch = state.renderedSearch;
    const currentFlightRouterState = state.tree;
    const scrollBehavior = _routerreducertypes.ScrollBehavior.NoScroll;
    const navigationLock = (0, _pprnavigations.getCurrentNavigationLock)();
    // Create a NavigationSeed from the current FlightRouterState.
    // TODO: Eventually we will store this type directly on the state object
    // instead of reconstructing it on demand. Part of a larger series of
    // refactors to unify the various tree types that the client deals with.
    const now = Date.now();
    // TODO: Store the dynamic stale time on the top-level state so it's known
    // during restores and refreshes.
    const refreshSeed = (0, _navigation.convertServerPatchToFullTree)(now, currentFlightRouterState, null, currentRenderedSearch, _bfcache.UnknownDynamicStaleTime);
    // If the previous navigation hasn't pushed its history entry yet (React
    // hasn't committed its state), this refresh may commit in its place, so it
    // takes over the push. If the navigation does commit first, HistoryUpdater
    // sees that the URL already matches and replaces instead.
    const navigateType = state.pushRef.pendingPush ? 'push' : 'replace';
    return (0, _navigation.navigateToKnownRoute)(now, state, currentUrl, currentCanonicalUrl, refreshSeed, currentUrl, currentRenderedSearch, state.cache, currentFlightRouterState, freshnessPolicy, nextUrlForRefresh, scrollBehavior, navigateType, navigationLock, _cache.segmentCacheMap, null, // cache entry to mark as having a dynamic rewrite on mismatch. If a
    // mismatch occurs, the retry handler will traverse the known route tree
    // to find and mark the entry.
    null, signal);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=refresh-reducer.js.map


/***/ }),

/***/ 93294:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/**
 * Before starting the Next.js runtime and requiring any module, we need to make
 * sure the following scripts are executed in the correct order:
 * - Polyfills
 * - next/script with `beforeInteractive` strategy
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "appBootstrap", ({
    enumerable: true,
    get: function() {
        return appBootstrap;
    }
}));
const _assetprefix = __webpack_require__(24281);
const _setattributesfromprops = __webpack_require__(3584);
const version = "16.3.3";
window.next = {
    version,
    appDir: true
};
function loadScriptsInSequence(scripts, hydrate) {
    if (!scripts || !scripts.length) {
        return hydrate();
    }
    return scripts.reduce((promise, [src, props])=>{
        return promise.then(()=>{
            return new Promise((resolve, reject)=>{
                const el = document.createElement('script');
                if (props) {
                    (0, _setattributesfromprops.setAttributesFromProps)(el, props);
                }
                if (src) {
                    el.src = src;
                    el.onload = ()=>resolve();
                    el.onerror = reject;
                } else if (props) {
                    el.innerHTML = props.children;
                    setTimeout(resolve);
                }
                document.head.appendChild(el);
            });
        });
    }, Promise.resolve()).catch((err)=>{
        console.error(err);
    // Still try to hydrate even if there's an error.
    }).then(()=>{
        hydrate();
    });
}
function appBootstrap(hydrate) {
    const assetPrefix = (0, _assetprefix.getAssetPrefix)();
    loadScriptsInSequence(self.__next_s, ()=>{
        // If the static shell is being debugged, skip hydration if the
        // `__nextppronly` query is present. This is only enabled when the
        // environment variable `__NEXT_EXPERIMENTAL_STATIC_SHELL_DEBUGGING` is
        // set to `1`. Otherwise the following is optimized out.
        if (false) {}
        hydrate(assetPrefix);
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-bootstrap.js.map


/***/ }),

/***/ 93350:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    GracefulDegradeBoundary: function() {
        return GracefulDegradeBoundary;
    },
    default: function() {
        return _default;
    }
});
const _jsxruntime = __webpack_require__(95155);
const _react = __webpack_require__(12115);
function getDomNodeAttributes(node) {
    const result = {};
    for(let i = 0; i < node.attributes.length; i++){
        const attr = node.attributes[i];
        result[attr.name] = attr.value;
    }
    return result;
}
class GracefulDegradeBoundary extends _react.Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
        this.rootHtml = '';
        this.htmlAttributes = {};
        this.htmlRef = /*#__PURE__*/ (0, _react.createRef)();
    }
    static getDerivedStateFromError(_) {
        return {
            hasError: true
        };
    }
    componentDidMount() {
        const htmlNode = this.htmlRef.current;
        if (this.state.hasError && htmlNode) {
            // Reapply the cached HTML attributes to the root element
            Object.entries(this.htmlAttributes).forEach(([key, value])=>{
                htmlNode.setAttribute(key, value);
            });
        }
    }
    render() {
        const { hasError } = this.state;
        // Cache the root HTML content on the first render
        if ( true && !this.rootHtml) {
            this.rootHtml = document.documentElement.innerHTML;
            this.htmlAttributes = getDomNodeAttributes(document.documentElement);
        }
        if (hasError) {
            // Render the current HTML content without hydration
            return /*#__PURE__*/ (0, _jsxruntime.jsx)("html", {
                ref: this.htmlRef,
                suppressHydrationWarning: true,
                dangerouslySetInnerHTML: {
                    __html: this.rootHtml
                }
            });
        }
        return this.props.children;
    }
}
const _default = GracefulDegradeBoundary;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=graceful-degrade-boundary.js.map


/***/ }),

/***/ 94062:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    initializeRouterTransitionModules: function() {
        return initializeRouterTransitionModules;
    },
    startRouterTransition: function() {
        return startRouterTransition;
    }
});
const _segment = __webpack_require__(78237);
const _computechangedpath = __webpack_require__(62496);
let instrumentationModules = [];
let nextTransitionId = 0;
function initializeRouterTransitionModules(modules) {
    instrumentationModules = modules.filter((module1)=>module1 != null);
}
function callHooks(invoke) {
    for (const hooks of instrumentationModules){
        try {
            invoke(hooks);
        } catch (error) {
            console.error('An instrumentation-client router transition hook failed', error);
        }
    }
}
function timestamp() {
    return performance.timeOrigin + performance.now();
}
function startRouterTransition(url, type, fromTree, prefetchIntent) {
    // Positive flag check so the instrumentation-only path is removed by DCE when disabled.
    if (false) {} else {
        callHooks((hooks)=>hooks.onRouterTransitionStart?.(url, type, null));
    }
}
function classifySegment(segment) {
    const sourceSegment = (0, _computechangedpath.segmentToSourcePagePathname)(segment);
    if (sourceSegment === 'page') {
        return {
            path: null,
            isPage: true
        };
    }
    if (sourceSegment === '' || sourceSegment === '(__SLOT__)' || (0, _segment.isGroupSegment)(sourceSegment)) {
        return {
            path: null,
            isPage: false
        };
    }
    if (sourceSegment === _segment.DEFAULT_SEGMENT_KEY) {
        return {
            path: 'default',
            isPage: false
        };
    }
    if (sourceSegment === _segment.NOT_FOUND_SEGMENT_KEY) {
        return {
            path: '_not-found',
            isPage: false
        };
    }
    return {
        path: sourceSegment,
        isPage: false
    };
}
function getActiveRoutePaths(tree) {
    const routes = [];
    function visit(node, segments, primary) {
        const segment = classifySegment(node[0]);
        const nextSegments = segment.path === null ? segments : [
            ...segments,
            segment.path
        ];
        const parallelRoutes = node[1];
        const keys = Object.keys(parallelRoutes);
        if (keys.length === 0 || segment.isPage) {
            routes.push({
                path: `/${nextSegments.join('/')}`,
                primary
            });
            return;
        }
        if (parallelRoutes.children !== undefined) {
            visit(parallelRoutes.children, nextSegments, primary);
        }
        for (const key of keys.sort()){
            if (key === 'children') {
                continue;
            }
            visit(parallelRoutes[key], [
                ...nextSegments,
                `@${key}`
            ], false);
        }
    }
    visit(tree, [], true);
    return routes.sort((a, b)=>{
        if (a.primary !== b.primary) {
            return a.primary ? -1 : 1;
        }
        return a.path.localeCompare(b.path);
    }).map((route)=>route.path);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-transition.js.map


/***/ }),

/***/ 94454:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    UnrecognizedActionError: function() {
        return UnrecognizedActionError;
    },
    unstable_isUnrecognizedActionError: function() {
        return unstable_isUnrecognizedActionError;
    }
});
class UnrecognizedActionError extends Error {
    constructor(...args){
        super(...args);
        this.name = 'UnrecognizedActionError';
    }
}
function unstable_isUnrecognizedActionError(error) {
    return !!(error && typeof error === 'object' && error instanceof UnrecognizedActionError);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unrecognized-action-error.js.map


/***/ }),

/***/ 95155:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(86897);
} else {}


/***/ }),

/***/ 95888:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "removeBasePath", ({
    enumerable: true,
    get: function() {
        return removeBasePath;
    }
}));
const _hasbasepath = __webpack_require__(48512);
const basePath =  false || '';
function removeBasePath(path) {
    if (false) {}
    // Can't trim the basePath if it has zero length!
    if (basePath.length === 0) return path;
    path = path.slice(basePath.length);
    if (!path.startsWith('/')) path = `/${path}`;
    return path;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=remove-base-path.js.map


/***/ }),

/***/ 97797:
/***/ ((module, exports) => {

"use strict";
// This gets assigned as a side-effect during app initialization. Because it
// represents the build used to create the JS bundle, it should never change
// after being set, so we store it in a global variable.
//
// When performing RSC requests, if the incoming data has a different build ID,
// we perform an MPA navigation/refresh to load the updated build and ensure
// that the client and server in sync.
//
// Starts as an empty string. In practice, because setNavigationBuildId is called during initialization
// before hydration starts, this will always get reassigned to the actual ID before it's ever needed
// by a navigation. If for some reasons it didn't, due to a bug or race condition, then on
// navigation the build comparision would fail and trigger an MPA navigation.
//
// Note that this can also be initialized with the deployment id instead (if available). So it's not
// the same as "the build id", but we are running out of alternative names for "build id or
// deployment id".

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getNavigationBuildId: function() {
        return getNavigationBuildId;
    },
    setNavigationBuildId: function() {
        return setNavigationBuildId;
    }
});
let globalBuildId = '';
function setNavigationBuildId(buildId) {
    globalBuildId = buildId;
}
function getNavigationBuildId() {
    return globalBuildId;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation-build-id.js.map


/***/ }),

/***/ 97880:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isNavigatingToNewRootLayout", ({
    enumerable: true,
    get: function() {
        return isNavigatingToNewRootLayout;
    }
}));
const _approutertypes = __webpack_require__(76731);
function isNavigatingToNewRootLayout(currentTree, nextTree) {
    // Decides whether navigating from currentTree to nextTree crosses into a
    // different root layout, which requires a full-page (MPA-style) navigation.
    //
    // The "root layout" is the highest-level layout in the tree. The segments at
    // or above it form the "root layout prefix", which the server marks with the
    // IsRootLayoutOrAbove hint. Two routes share a root layout iff their root
    // layout prefixes are structurally identical — same segments (ignoring
    // dynamic param *values*) for the same depth. So we walk the prefix in
    // lockstep and report a change as soon as the prefixes diverge.
    const currentInPrefix = ((currentTree[4] ?? 0) & _approutertypes.PrefetchHint.IsRootLayoutOrAbove) !== 0;
    const nextInPrefix = (nextTree.prefetchHints & _approutertypes.PrefetchHint.IsRootLayoutOrAbove) !== 0;
    // Both trees have descended past the root layout with everything above
    // matching — same root layout.
    if (!currentInPrefix && !nextInPrefix) {
        return false;
    }
    // One tree's root layout prefix is deeper than the other's, so the root
    // layout boundary moved — it must have changed.
    // E.g. /[lang]/layout.js -> /[lang]/[region]/layout.js
    if (currentInPrefix !== nextInPrefix) {
        return true;
    }
    // Both segments are still inside the root layout prefix. They must match.
    // Compare dynamic param name and type but ignore the value: different values
    // (e.g. /[name] for slug1 vs slug2) still resolve to the same /[name]/layout.
    // E.g. /same/(group1)/layout.js -> /same/(group2)/layout.js: (group1) changed
    // to (group2) inside the prefix, so the root layout changed.
    const currentTreeSegment = currentTree[0];
    const nextTreeSegment = nextTree.segment;
    if (Array.isArray(currentTreeSegment) && Array.isArray(nextTreeSegment)) {
        if (currentTreeSegment[0] !== nextTreeSegment[0] || currentTreeSegment[2] !== nextTreeSegment[2]) {
            return true;
        }
    } else if (currentTreeSegment !== nextTreeSegment) {
        return true;
    }
    // Keep walking the prefix. (Above the root layout there is only a `children`
    // slot, but we traverse all slots defensively.)
    const slots = nextTree.slots;
    const currentTreeChildren = currentTree[1];
    if (slots !== null) {
        for (const [slot, nextTreeChild] of slots){
            const currentTreeChild = currentTreeChildren[slot];
            if (currentTreeChild === undefined || isNavigatingToNewRootLayout(currentTreeChild, nextTreeChild)) {
                return true;
            }
        }
    }
    return false;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-navigating-to-new-root-layout.js.map


/***/ }),

/***/ 98080:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTML_LIMITED_BOT_UA_RE: function() {
        return _htmlbots.HTML_LIMITED_BOT_UA_RE;
    },
    HTML_LIMITED_BOT_UA_RE_STRING: function() {
        return HTML_LIMITED_BOT_UA_RE_STRING;
    },
    getBotType: function() {
        return getBotType;
    },
    isBot: function() {
        return isBot;
    }
});
const _htmlbots = __webpack_require__(24382);
// Bot crawler that will spin up a headless browser and execute JS.
// Only the main Googlebot search crawler executes JavaScript, not other Google crawlers.
// x-ref: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
// This regex specifically matches "Googlebot" but NOT "Mediapartners-Google", "AdsBot-Google", etc.
const HEADLESS_BROWSER_BOT_UA_RE = /Googlebot(?!-)|Googlebot$/i;
const HTML_LIMITED_BOT_UA_RE_STRING = _htmlbots.HTML_LIMITED_BOT_UA_RE.source;
function isDomBotUA(userAgent) {
    return HEADLESS_BROWSER_BOT_UA_RE.test(userAgent);
}
function isHtmlLimitedBotUA(userAgent) {
    return _htmlbots.HTML_LIMITED_BOT_UA_RE.test(userAgent);
}
function isBot(userAgent) {
    return isDomBotUA(userAgent) || isHtmlLimitedBotUA(userAgent);
}
function getBotType(userAgent) {
    if (isDomBotUA(userAgent)) {
        return 'dom';
    }
    if (isHtmlLimitedBotUA(userAgent)) {
        return 'html';
    }
    return undefined;
} //# sourceMappingURL=is-bot.js.map


/***/ }),

/***/ 98127:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createRenderParamsFromClient", ({
    enumerable: true,
    get: function() {
        return createRenderParamsFromClient;
    }
}));
const CachedParams = new WeakMap();
function makeUntrackedParams(underlyingParams) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const promise = Promise.resolve(underlyingParams);
    CachedParams.set(underlyingParams, promise);
    return promise;
}
function createRenderParamsFromClient(clientParams) {
    return makeUntrackedParams(clientParams);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=params.browser.prod.js.map


/***/ }),

/***/ 99062:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-server-dom-webpack-client.browser.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactDOM = __webpack_require__(47650);
function formatProdErrorMessage(code) {
  var url = "https://react.dev/errors/" + code;
  if (1 < arguments.length) {
    url += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var i = 2; i < arguments.length; i++)
      url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return (
    "Minified React error #" +
    code +
    "; visit " +
    url +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var decoderOptions = { stream: !0 },
  hasOwnProperty = Object.prototype.hasOwnProperty;
function resolveClientReference(bundlerConfig, metadata) {
  if (bundlerConfig) {
    var moduleExports = bundlerConfig[metadata[0]];
    if ((bundlerConfig = moduleExports && moduleExports[metadata[2]]))
      moduleExports = bundlerConfig.name;
    else {
      bundlerConfig = moduleExports && moduleExports["*"];
      if (!bundlerConfig) throw Error(formatProdErrorMessage(588, metadata[0]));
      moduleExports = metadata[2];
    }
    return 4 === metadata.length
      ? [bundlerConfig.id, bundlerConfig.chunks, moduleExports, 1]
      : [bundlerConfig.id, bundlerConfig.chunks, moduleExports];
  }
  return metadata;
}
function resolveServerReference(bundlerConfig, id) {
  var name = "",
    resolvedModuleData = bundlerConfig[id];
  if (resolvedModuleData) name = resolvedModuleData.name;
  else {
    var idx = id.lastIndexOf("#");
    -1 !== idx &&
      ((name = id.slice(idx + 1)),
      (resolvedModuleData = bundlerConfig[id.slice(0, idx)]));
    if (!resolvedModuleData) throw Error(formatProdErrorMessage(589, id));
  }
  return resolvedModuleData.async
    ? [resolvedModuleData.id, resolvedModuleData.chunks, name, 1]
    : [resolvedModuleData.id, resolvedModuleData.chunks, name];
}
var chunkCache = new Map();
function requireAsyncModule(id) {
  var promise = __webpack_require__(id);
  if ("function" !== typeof promise.then || "fulfilled" === promise.status)
    return null;
  promise.then(
    function (value) {
      promise.status = "fulfilled";
      promise.value = value;
    },
    function (reason) {
      promise.status = "rejected";
      promise.reason = reason;
    }
  );
  return promise;
}
function ignoreReject() {}
function preloadModule(metadata) {
  for (var chunks = metadata[1], promises = [], i = 0; i < chunks.length; ) {
    var chunkId = chunks[i++],
      chunkFilename = chunks[i++],
      entry = chunkCache.get(chunkId);
    void 0 === entry
      ? (chunkMap.set(chunkId, chunkFilename),
        (chunkFilename = __webpack_require__.e(chunkId)),
        promises.push(chunkFilename),
        (entry = chunkCache.set.bind(chunkCache, chunkId, null)),
        chunkFilename.then(entry, ignoreReject),
        chunkCache.set(chunkId, chunkFilename))
      : null !== entry && promises.push(entry);
  }
  return 4 === metadata.length
    ? 0 === promises.length
      ? requireAsyncModule(metadata[0])
      : Promise.all(promises).then(function () {
          return requireAsyncModule(metadata[0]);
        })
    : 0 < promises.length
      ? Promise.all(promises)
      : null;
}
function requireModule(metadata) {
  var moduleExports = __webpack_require__(metadata[0]);
  if (4 === metadata.length && "function" === typeof moduleExports.then)
    if ("fulfilled" === moduleExports.status)
      moduleExports = moduleExports.value;
    else throw moduleExports.reason;
  if ("*" === metadata[2]) return moduleExports;
  if ("" === metadata[2])
    return moduleExports.__esModule ? moduleExports.default : moduleExports;
  if (hasOwnProperty.call(moduleExports, metadata[2]))
    return moduleExports[metadata[2]];
}
var chunkMap = new Map(),
  webpackGetChunkFilename = __webpack_require__.u;
__webpack_require__.u = function (chunkId) {
  var flightChunk = chunkMap.get(chunkId);
  return void 0 !== flightChunk
    ? flightChunk
    : webpackGetChunkFilename(chunkId);
};
var ReactDOMSharedInternals =
    ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var ASYNC_ITERATOR = Symbol.asyncIterator,
  isArrayImpl = Array.isArray,
  getPrototypeOf = Object.getPrototypeOf,
  ObjectPrototype$1 = Object.prototype,
  knownServerReferences = new WeakMap();
function serializeNumber(number) {
  return Number.isFinite(number)
    ? 0 === number && -Infinity === 1 / number
      ? "$-0"
      : number
    : Infinity === number
      ? "$Infinity"
      : -Infinity === number
        ? "$-Infinity"
        : "$NaN";
}
function processReply(
  root,
  formFieldPrefix,
  temporaryReferences,
  resolve,
  reject
) {
  function serializeTypedArray(tag, typedArray) {
    typedArray = new Blob([
      new Uint8Array(
        typedArray.buffer,
        typedArray.byteOffset,
        typedArray.byteLength
      )
    ]);
    var blobId = nextPartId++;
    null === formData && (formData = new FormData());
    formData.append(formFieldPrefix + blobId, typedArray);
    return "$" + tag + blobId.toString(16);
  }
  function serializeBinaryReader(reader) {
    function progress(entry) {
      entry.done
        ? ((entry = nextPartId++),
          data.append(formFieldPrefix + entry, new Blob(buffer)),
          data.append(
            formFieldPrefix + streamId,
            '"$o' + entry.toString(16) + '"'
          ),
          data.append(formFieldPrefix + streamId, "C"),
          pendingParts--,
          0 === pendingParts && resolve(data))
        : (buffer.push(entry.value),
          reader.read(new Uint8Array(1024)).then(progress, reject));
    }
    null === formData && (formData = new FormData());
    var data = formData;
    pendingParts++;
    var streamId = nextPartId++,
      buffer = [];
    reader.read(new Uint8Array(1024)).then(progress, reject);
    return "$r" + streamId.toString(16);
  }
  function serializeReader(reader) {
    function progress(entry) {
      if (entry.done)
        data.append(formFieldPrefix + streamId, "C"),
          pendingParts--,
          0 === pendingParts && resolve(data);
      else
        try {
          var partJSON = JSON.stringify(entry.value, resolveToJSON);
          data.append(formFieldPrefix + streamId, partJSON);
          reader.read().then(progress, reject);
        } catch (x) {
          reject(x);
        }
    }
    null === formData && (formData = new FormData());
    var data = formData;
    pendingParts++;
    var streamId = nextPartId++;
    reader.read().then(progress, reject);
    return "$R" + streamId.toString(16);
  }
  function serializeReadableStream(stream) {
    try {
      var binaryReader = stream.getReader({ mode: "byob" });
    } catch (x) {
      return serializeReader(stream.getReader());
    }
    return serializeBinaryReader(binaryReader);
  }
  function serializeAsyncIterable(iterable, iterator) {
    function progress(entry) {
      if (entry.done) {
        if (void 0 === entry.value)
          data.append(formFieldPrefix + streamId, "C");
        else
          try {
            var partJSON = JSON.stringify(entry.value, resolveToJSON);
            data.append(formFieldPrefix + streamId, "C" + partJSON);
          } catch (x) {
            reject(x);
            return;
          }
        pendingParts--;
        0 === pendingParts && resolve(data);
      } else
        try {
          var partJSON$21 = JSON.stringify(entry.value, resolveToJSON);
          data.append(formFieldPrefix + streamId, partJSON$21);
          iterator.next().then(progress, reject);
        } catch (x$22) {
          reject(x$22);
        }
    }
    null === formData && (formData = new FormData());
    var data = formData;
    pendingParts++;
    var streamId = nextPartId++;
    iterable = iterable === iterator;
    iterator.next().then(progress, reject);
    return "$" + (iterable ? "x" : "X") + streamId.toString(16);
  }
  function resolveToJSON(key, value) {
    if (null === value) return null;
    if ("object" === typeof value) {
      switch (value.$$typeof) {
        case REACT_ELEMENT_TYPE:
          if (void 0 !== temporaryReferences && -1 === key.indexOf(":")) {
            var parentReference = writtenObjects.get(this);
            if (void 0 !== parentReference)
              return (
                temporaryReferences.set(parentReference + ":" + key, value),
                "$T"
              );
          }
          if (void 0 !== temporaryReferences && modelRoot === value)
            return (modelRoot = null), "$T";
          throw Error(formatProdErrorMessage(510, ""));
        case REACT_LAZY_TYPE:
          parentReference = value._payload;
          var init = value._init;
          null === formData && (formData = new FormData());
          pendingParts++;
          try {
            var resolvedModel = init(parentReference),
              lazyId = nextPartId++,
              partJSON = serializeModel(resolvedModel, lazyId);
            formData.append(formFieldPrefix + lazyId, partJSON);
            return "$" + lazyId.toString(16);
          } catch (x) {
            if (
              "object" === typeof x &&
              null !== x &&
              "function" === typeof x.then
            ) {
              pendingParts++;
              var lazyId$23 = nextPartId++;
              parentReference = function () {
                try {
                  var partJSON$24 = serializeModel(value, lazyId$23),
                    data$25 = formData;
                  data$25.append(formFieldPrefix + lazyId$23, partJSON$24);
                  pendingParts--;
                  0 === pendingParts && resolve(data$25);
                } catch (reason) {
                  reject(reason);
                }
              };
              x.then(parentReference, parentReference);
              return "$" + lazyId$23.toString(16);
            }
            reject(x);
            return null;
          } finally {
            pendingParts--;
          }
      }
      parentReference = writtenObjects.get(value);
      if ("function" === typeof value.then) {
        if (void 0 !== parentReference)
          if (modelRoot === value) modelRoot = null;
          else return parentReference;
        null === formData && (formData = new FormData());
        pendingParts++;
        var promiseId = nextPartId++;
        key = "$@" + promiseId.toString(16);
        writtenObjects.set(value, key);
        value.then(function (partValue) {
          try {
            var previousReference = writtenObjects.get(partValue);
            var partJSON$27 =
              void 0 !== previousReference
                ? JSON.stringify(previousReference)
                : serializeModel(partValue, promiseId);
            partValue = formData;
            partValue.append(formFieldPrefix + promiseId, partJSON$27);
            pendingParts--;
            0 === pendingParts && resolve(partValue);
          } catch (reason) {
            reject(reason);
          }
        }, reject);
        return key;
      }
      if (void 0 !== parentReference)
        if (modelRoot === value) modelRoot = null;
        else return parentReference;
      else
        -1 === key.indexOf(":") &&
          ((parentReference = writtenObjects.get(this)),
          void 0 !== parentReference &&
            ((key = parentReference + ":" + key),
            writtenObjects.set(value, key),
            void 0 !== temporaryReferences &&
              temporaryReferences.set(key, value)));
      if (isArrayImpl(value)) return value;
      if (value instanceof FormData) {
        null === formData && (formData = new FormData());
        var data$31 = formData;
        key = nextPartId++;
        var prefix = formFieldPrefix + "_" + key + "_";
        value.forEach(function (originalValue, originalKey) {
          data$31.append(prefix + originalKey, originalValue);
        });
        return "$K" + key.toString(16);
      }
      if (value instanceof Map)
        return (
          (key = nextPartId++),
          (parentReference = serializeModel(Array.from(value), key)),
          null === formData && (formData = new FormData()),
          formData.append(formFieldPrefix + key, parentReference),
          "$Q" + key.toString(16)
        );
      if (value instanceof Set)
        return (
          (key = nextPartId++),
          (parentReference = serializeModel(Array.from(value), key)),
          null === formData && (formData = new FormData()),
          formData.append(formFieldPrefix + key, parentReference),
          "$W" + key.toString(16)
        );
      if (value instanceof ArrayBuffer)
        return (
          (key = new Blob([value])),
          (parentReference = nextPartId++),
          null === formData && (formData = new FormData()),
          formData.append(formFieldPrefix + parentReference, key),
          "$A" + parentReference.toString(16)
        );
      if (value instanceof Int8Array) return serializeTypedArray("O", value);
      if (value instanceof Uint8Array) return serializeTypedArray("o", value);
      if (value instanceof Uint8ClampedArray)
        return serializeTypedArray("U", value);
      if (value instanceof Int16Array) return serializeTypedArray("S", value);
      if (value instanceof Uint16Array) return serializeTypedArray("s", value);
      if (value instanceof Int32Array) return serializeTypedArray("L", value);
      if (value instanceof Uint32Array) return serializeTypedArray("l", value);
      if (value instanceof Float32Array) return serializeTypedArray("G", value);
      if (value instanceof Float64Array) return serializeTypedArray("g", value);
      if (value instanceof BigInt64Array)
        return serializeTypedArray("M", value);
      if (value instanceof BigUint64Array)
        return serializeTypedArray("m", value);
      if (value instanceof DataView) return serializeTypedArray("V", value);
      if ("function" === typeof Blob && value instanceof Blob)
        return (
          null === formData && (formData = new FormData()),
          (key = nextPartId++),
          formData.append(formFieldPrefix + key, value),
          "$B" + key.toString(16)
        );
      if ((key = getIteratorFn(value)))
        return (
          (parentReference = key.call(value)),
          parentReference === value
            ? ((key = nextPartId++),
              (parentReference = serializeModel(
                Array.from(parentReference),
                key
              )),
              null === formData && (formData = new FormData()),
              formData.append(formFieldPrefix + key, parentReference),
              "$i" + key.toString(16))
            : Array.from(parentReference)
        );
      if (
        "function" === typeof ReadableStream &&
        value instanceof ReadableStream
      )
        return serializeReadableStream(value);
      key = value[ASYNC_ITERATOR];
      if ("function" === typeof key)
        return serializeAsyncIterable(value, key.call(value));
      key = getPrototypeOf(value);
      if (
        key !== ObjectPrototype$1 &&
        (null === key || null !== getPrototypeOf(key))
      ) {
        if (void 0 === temporaryReferences)
          throw Error(formatProdErrorMessage(499, ""));
        return "$T";
      }
      return value;
    }
    if ("string" === typeof value) {
      if ("Z" === value[value.length - 1] && this[key] instanceof Date)
        return "$D" + value;
      key = "$" === value[0] ? "$" + value : value;
      return key;
    }
    if ("boolean" === typeof value) return value;
    if ("number" === typeof value) return serializeNumber(value);
    if ("undefined" === typeof value) return "$undefined";
    if ("function" === typeof value) {
      parentReference = knownServerReferences.get(value);
      if (void 0 !== parentReference) {
        key = writtenObjects.get(value);
        if (void 0 !== key) return key;
        key = JSON.stringify(
          { id: parentReference.id, bound: parentReference.bound },
          resolveToJSON
        );
        null === formData && (formData = new FormData());
        parentReference = nextPartId++;
        formData.set(formFieldPrefix + parentReference, key);
        key = "$h" + parentReference.toString(16);
        writtenObjects.set(value, key);
        return key;
      }
      if (
        void 0 !== temporaryReferences &&
        -1 === key.indexOf(":") &&
        ((parentReference = writtenObjects.get(this)),
        void 0 !== parentReference)
      )
        return (
          temporaryReferences.set(parentReference + ":" + key, value), "$T"
        );
      throw Error(formatProdErrorMessage(469));
    }
    if ("symbol" === typeof value) {
      if (
        void 0 !== temporaryReferences &&
        -1 === key.indexOf(":") &&
        ((parentReference = writtenObjects.get(this)),
        void 0 !== parentReference)
      )
        return (
          temporaryReferences.set(parentReference + ":" + key, value), "$T"
        );
      throw Error(formatProdErrorMessage(517, ""));
    }
    if ("bigint" === typeof value) return "$n" + value.toString(10);
    throw Error(formatProdErrorMessage(472, typeof value));
  }
  function serializeModel(model, id) {
    "object" === typeof model &&
      null !== model &&
      ((id = "$" + id.toString(16)),
      writtenObjects.set(model, id),
      void 0 !== temporaryReferences && temporaryReferences.set(id, model));
    modelRoot = model;
    return JSON.stringify(model, resolveToJSON);
  }
  var nextPartId = 1,
    pendingParts = 0,
    formData = null,
    writtenObjects = new WeakMap(),
    modelRoot = root,
    json = serializeModel(root, 0);
  null === formData
    ? resolve(json)
    : (formData.set(formFieldPrefix + "0", json),
      0 === pendingParts && resolve(formData));
  return function () {
    0 < pendingParts &&
      ((pendingParts = 0),
      null === formData ? resolve(json) : resolve(formData));
  };
}
function registerBoundServerReference(reference, id, bound) {
  knownServerReferences.has(reference) ||
    knownServerReferences.set(reference, {
      id: id,
      originalBind: reference.bind,
      bound: bound
    });
}
function createBoundServerReference(metaData, callServer) {
  function action() {
    var args = Array.prototype.slice.call(arguments);
    return bound
      ? "fulfilled" === bound.status
        ? callServer(id, bound.value.concat(args))
        : Promise.resolve(bound).then(function (boundArgs) {
            return callServer(id, boundArgs.concat(args));
          })
      : callServer(id, args);
  }
  var id = metaData.id,
    bound = metaData.bound;
  registerBoundServerReference(action, id, bound);
  return action;
}
var ObjectPrototype = Object.prototype,
  ArrayPrototype = Array.prototype;
function ReactPromise(status, value, reason) {
  this.status = status;
  this.value = value;
  this.reason = reason;
}
ReactPromise.prototype = Object.create(Promise.prototype);
Object.defineProperty(ReactPromise.prototype, "then", {
  writable: !0,
  enumerable: !0,
  configurable: !0,
  value: function (resolve, reject) {
    switch (this.status) {
      case "resolved_model":
        initializeModelChunk(this);
        break;
      case "resolved_module":
        initializeModuleChunk(this);
    }
    switch (this.status) {
      case "fulfilled":
        "function" === typeof resolve && resolve(this.value);
        break;
      case "pending":
      case "blocked":
        "function" === typeof resolve &&
          (null === this.value && (this.value = []), this.value.push(resolve));
        "function" === typeof reject &&
          (null === this.reason && (this.reason = []),
          this.reason.push(reject));
        break;
      case "halted":
        break;
      default:
        "function" === typeof reject && reject(this.reason);
    }
  }
});
function readChunk(chunk) {
  switch (chunk.status) {
    case "resolved_model":
      initializeModelChunk(chunk);
      break;
    case "resolved_module":
      initializeModuleChunk(chunk);
  }
  switch (chunk.status) {
    case "fulfilled":
      return chunk.value;
    case "pending":
    case "blocked":
    case "halted":
      throw chunk;
    default:
      throw chunk.reason;
  }
}
function createPendingChunk() {
  return new ReactPromise("pending", null, null);
}
function wakeChunk(response, listeners, value, chunk) {
  for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    "function" === typeof listener
      ? listener(value)
      : fulfillReference(response, listener, value, chunk);
  }
}
function rejectChunk(response, listeners, error) {
  for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    "function" === typeof listener
      ? listener(error)
      : rejectReference(response, listener.handler, error);
  }
}
function resolveBlockedCycle(resolvedChunk, reference) {
  var referencedChunk = reference.handler.chunk;
  if (null === referencedChunk) return null;
  if (referencedChunk === resolvedChunk) return reference.handler;
  reference = referencedChunk.value;
  if (null !== reference)
    for (
      referencedChunk = 0;
      referencedChunk < reference.length;
      referencedChunk++
    ) {
      var listener = reference[referencedChunk];
      if (
        "function" !== typeof listener &&
        ((listener = resolveBlockedCycle(resolvedChunk, listener)),
        null !== listener)
      )
        return listener;
    }
  return null;
}
function wakeChunkIfInitialized(
  response,
  chunk,
  resolveListeners,
  rejectListeners
) {
  switch (chunk.status) {
    case "fulfilled":
      wakeChunk(response, resolveListeners, chunk.value, chunk);
      break;
    case "blocked":
      for (var i = 0; i < resolveListeners.length; i++) {
        var listener = resolveListeners[i];
        if ("function" !== typeof listener) {
          var cyclicHandler = resolveBlockedCycle(chunk, listener);
          if (null !== cyclicHandler)
            switch (
              (fulfillReference(response, listener, cyclicHandler.value, chunk),
              resolveListeners.splice(i, 1),
              i--,
              null !== rejectListeners &&
                ((listener = rejectListeners.indexOf(listener)),
                -1 !== listener && rejectListeners.splice(listener, 1)),
              chunk.status)
            ) {
              case "fulfilled":
                wakeChunk(response, resolveListeners, chunk.value, chunk);
                return;
              case "rejected":
                null !== rejectListeners &&
                  rejectChunk(response, rejectListeners, chunk.reason);
                return;
            }
        }
      }
    case "pending":
      if (chunk.value)
        for (response = 0; response < resolveListeners.length; response++)
          chunk.value.push(resolveListeners[response]);
      else chunk.value = resolveListeners;
      if (chunk.reason) {
        if (rejectListeners)
          for (
            resolveListeners = 0;
            resolveListeners < rejectListeners.length;
            resolveListeners++
          )
            chunk.reason.push(rejectListeners[resolveListeners]);
      } else chunk.reason = rejectListeners;
      break;
    case "rejected":
      rejectListeners && rejectChunk(response, rejectListeners, chunk.reason);
  }
}
function triggerErrorOnChunk(response, chunk, error) {
  if ("pending" !== chunk.status && "blocked" !== chunk.status)
    chunk.reason.error(error);
  else {
    var listeners = chunk.reason;
    chunk.status = "rejected";
    chunk.reason = error;
    null !== listeners && rejectChunk(response, listeners, error);
  }
}
function createResolvedIteratorResultChunk(response, value, done) {
  return new ReactPromise(
    "resolved_model",
    (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}",
    response
  );
}
function resolveIteratorResultChunk(response, chunk, value, done) {
  resolveModelChunk(
    response,
    chunk,
    (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}"
  );
}
function resolveModelChunk(response, chunk, value) {
  if ("pending" !== chunk.status) chunk.reason.enqueueModel(value);
  else {
    var resolveListeners = chunk.value,
      rejectListeners = chunk.reason;
    chunk.status = "resolved_model";
    chunk.value = value;
    chunk.reason = response;
    null !== resolveListeners &&
      (initializeModelChunk(chunk),
      wakeChunkIfInitialized(
        response,
        chunk,
        resolveListeners,
        rejectListeners
      ));
  }
}
function resolveModuleChunk(response, chunk, value) {
  if ("pending" === chunk.status || "blocked" === chunk.status) {
    var resolveListeners = chunk.value,
      rejectListeners = chunk.reason;
    chunk.status = "resolved_module";
    chunk.value = value;
    chunk.reason = null;
    null !== resolveListeners &&
      (initializeModuleChunk(chunk),
      wakeChunkIfInitialized(
        response,
        chunk,
        resolveListeners,
        rejectListeners
      ));
  }
}
var initializingHandler = null;
function initializeModelChunk(chunk) {
  var prevHandler = initializingHandler;
  initializingHandler = null;
  var resolvedModel = chunk.value,
    response = chunk.reason;
  chunk.status = "blocked";
  chunk.value = null;
  chunk.reason = null;
  try {
    var value = parseModel(response, resolvedModel),
      resolveListeners = chunk.value;
    if (null !== resolveListeners)
      for (
        chunk.value = null, chunk.reason = null, resolvedModel = 0;
        resolvedModel < resolveListeners.length;
        resolvedModel++
      ) {
        var listener = resolveListeners[resolvedModel];
        "function" === typeof listener
          ? listener(value)
          : fulfillReference(response, listener, value, chunk);
      }
    if (null !== initializingHandler) {
      if (initializingHandler.errored) throw initializingHandler.reason;
      if (0 < initializingHandler.deps) {
        initializingHandler.value = value;
        initializingHandler.chunk = chunk;
        return;
      }
    }
    chunk.status = "fulfilled";
    chunk.value = value;
    chunk.reason = null;
  } catch (error) {
    (chunk.status = "rejected"), (chunk.reason = error);
  } finally {
    initializingHandler = prevHandler;
  }
}
function initializeModuleChunk(chunk) {
  try {
    var value = requireModule(chunk.value);
    chunk.status = "fulfilled";
    chunk.value = value;
    chunk.reason = null;
  } catch (error) {
    (chunk.status = "rejected"), (chunk.reason = error);
  }
}
function reportGlobalError(weakResponse, error) {
  weakResponse._closed = !0;
  weakResponse._closedReason = error;
  weakResponse._chunks.forEach(function (chunk) {
    "pending" === chunk.status
      ? triggerErrorOnChunk(weakResponse, chunk, error)
      : "fulfilled" === chunk.status &&
        null !== chunk.reason &&
        chunk.reason.error(error);
  });
}
function createLazyChunkWrapper(chunk) {
  return { $$typeof: REACT_LAZY_TYPE, _payload: chunk, _init: readChunk };
}
function getChunk(response, id) {
  var chunks = response._chunks,
    chunk = chunks.get(id);
  chunk ||
    (response._closed
      ? response._allowPartialStream
        ? ((response = chunk = createPendingChunk()),
          (response.status = "halted"),
          (response.value = null),
          (response.reason = null))
        : (chunk = new ReactPromise("rejected", null, response._closedReason))
      : (chunk = createPendingChunk()),
    chunks.set(id, chunk));
  return chunk;
}
function fulfillReference(response, reference, value) {
  var handler = reference.handler,
    parentObject = reference.parentObject,
    key = reference.key,
    map = reference.map,
    path = reference.path;
  try {
    for (var i = 1; i < path.length; i++) {
      for (
        ;
        "object" === typeof value &&
        null !== value &&
        value.$$typeof === REACT_LAZY_TYPE;

      ) {
        var referencedChunk = value._payload;
        if (referencedChunk === handler.chunk) value = handler.value;
        else {
          switch (referencedChunk.status) {
            case "resolved_model":
              initializeModelChunk(referencedChunk);
              break;
            case "resolved_module":
              initializeModuleChunk(referencedChunk);
          }
          switch (referencedChunk.status) {
            case "fulfilled":
              value = referencedChunk.value;
              continue;
            case "blocked":
              var cyclicHandler = resolveBlockedCycle(
                referencedChunk,
                reference
              );
              if (null !== cyclicHandler) {
                value = cyclicHandler.value;
                continue;
              }
            case "pending":
              path.splice(0, i - 1);
              null === referencedChunk.value
                ? (referencedChunk.value = [reference])
                : referencedChunk.value.push(reference);
              null === referencedChunk.reason
                ? (referencedChunk.reason = [reference])
                : referencedChunk.reason.push(reference);
              return;
            case "halted":
              return;
            default:
              rejectReference(
                response,
                reference.handler,
                referencedChunk.reason
              );
              return;
          }
        }
      }
      var name = path[i];
      if (
        "object" === typeof value &&
        null !== value &&
        hasOwnProperty.call(value, name)
      )
        value = value[name];
      else throw Error(formatProdErrorMessage(570));
    }
    for (
      ;
      "object" === typeof value &&
      null !== value &&
      value.$$typeof === REACT_LAZY_TYPE;

    ) {
      var referencedChunk$44 = value._payload;
      if (referencedChunk$44 === handler.chunk) value = handler.value;
      else {
        switch (referencedChunk$44.status) {
          case "resolved_model":
            initializeModelChunk(referencedChunk$44);
            break;
          case "resolved_module":
            initializeModuleChunk(referencedChunk$44);
        }
        switch (referencedChunk$44.status) {
          case "fulfilled":
            value = referencedChunk$44.value;
            continue;
        }
        break;
      }
    }
    var mappedValue = map(response, value, parentObject, key);
    "__proto__" !== key && (parentObject[key] = mappedValue);
    "" === key && null === handler.value && (handler.value = mappedValue);
    if (
      parentObject[0] === REACT_ELEMENT_TYPE &&
      "object" === typeof handler.value &&
      null !== handler.value &&
      handler.value.$$typeof === REACT_ELEMENT_TYPE
    ) {
      var element = handler.value;
      switch (key) {
        case "3":
          element.props = mappedValue;
      }
    }
  } catch (error) {
    rejectReference(response, reference.handler, error);
    return;
  }
  handler.deps--;
  0 === handler.deps &&
    ((reference = handler.chunk),
    null !== reference &&
      "blocked" === reference.status &&
      ((value = reference.value),
      (reference.status = "fulfilled"),
      (reference.value = handler.value),
      (reference.reason = handler.reason),
      null !== value && wakeChunk(response, value, handler.value, reference)));
}
function rejectReference(response, handler, error) {
  handler.errored ||
    ((handler.errored = !0),
    (handler.value = null),
    (handler.reason = error),
    (handler = handler.chunk),
    null !== handler &&
      "blocked" === handler.status &&
      triggerErrorOnChunk(response, handler, error));
}
function waitForReference(
  referencedChunk,
  parentObject,
  key,
  response,
  map,
  path
) {
  initializingHandler
    ? ((response = initializingHandler), response.deps++)
    : (response = initializingHandler =
        {
          parent: null,
          chunk: null,
          value: null,
          reason: null,
          deps: 1,
          errored: !1
        });
  parentObject = {
    handler: response,
    parentObject: parentObject,
    key: key,
    map: map,
    path: path
  };
  null === referencedChunk.value
    ? (referencedChunk.value = [parentObject])
    : referencedChunk.value.push(parentObject);
  null === referencedChunk.reason
    ? (referencedChunk.reason = [parentObject])
    : referencedChunk.reason.push(parentObject);
  return null;
}
function loadServerReference(response, metaData, parentObject, key) {
  if (!response._serverReferenceConfig)
    return createBoundServerReference(metaData, response._callServer);
  var serverReference = resolveServerReference(
      response._serverReferenceConfig,
      metaData.id
    ),
    promise = preloadModule(serverReference);
  if (promise)
    metaData.bound && (promise = Promise.all([promise, metaData.bound]));
  else if (metaData.bound) promise = Promise.resolve(metaData.bound);
  else
    return (
      (promise = requireModule(serverReference)),
      registerBoundServerReference(promise, metaData.id, metaData.bound),
      promise
    );
  if (initializingHandler) {
    var handler = initializingHandler;
    handler.deps++;
  } else
    handler = initializingHandler = {
      parent: null,
      chunk: null,
      value: null,
      reason: null,
      deps: 1,
      errored: !1
    };
  promise.then(
    function () {
      var resolvedValue = requireModule(serverReference);
      if (metaData.bound) {
        var boundArgs = metaData.bound.value.slice(0);
        boundArgs.unshift(null);
        resolvedValue = resolvedValue.bind.apply(resolvedValue, boundArgs);
      }
      registerBoundServerReference(resolvedValue, metaData.id, metaData.bound);
      "__proto__" !== key && (parentObject[key] = resolvedValue);
      "" === key && null === handler.value && (handler.value = resolvedValue);
      if (
        parentObject[0] === REACT_ELEMENT_TYPE &&
        "object" === typeof handler.value &&
        null !== handler.value &&
        handler.value.$$typeof === REACT_ELEMENT_TYPE
      )
        switch (((boundArgs = handler.value), key)) {
          case "3":
            boundArgs.props = resolvedValue;
        }
      handler.deps--;
      0 === handler.deps &&
        ((resolvedValue = handler.chunk),
        null !== resolvedValue &&
          "blocked" === resolvedValue.status &&
          ((boundArgs = resolvedValue.value),
          (resolvedValue.status = "fulfilled"),
          (resolvedValue.value = handler.value),
          (resolvedValue.reason = null),
          null !== boundArgs &&
            wakeChunk(response, boundArgs, handler.value, resolvedValue)));
    },
    function (error) {
      if (!handler.errored) {
        handler.errored = !0;
        handler.value = null;
        handler.reason = error;
        var chunk = handler.chunk;
        null !== chunk &&
          "blocked" === chunk.status &&
          triggerErrorOnChunk(response, chunk, error);
      }
    }
  );
  return null;
}
function getOutlinedModel(response, reference, parentObject, key, map) {
  reference = reference.split(":");
  var id = parseInt(reference[0], 16);
  id = getChunk(response, id);
  switch (id.status) {
    case "resolved_model":
      initializeModelChunk(id);
      break;
    case "resolved_module":
      initializeModuleChunk(id);
  }
  switch (id.status) {
    case "fulfilled":
      id = id.value;
      for (var i = 1; i < reference.length; i++) {
        for (
          ;
          "object" === typeof id &&
          null !== id &&
          id.$$typeof === REACT_LAZY_TYPE;

        ) {
          id = id._payload;
          switch (id.status) {
            case "resolved_model":
              initializeModelChunk(id);
              break;
            case "resolved_module":
              initializeModuleChunk(id);
          }
          switch (id.status) {
            case "fulfilled":
              id = id.value;
              break;
            case "blocked":
            case "pending":
              return waitForReference(
                id,
                parentObject,
                key,
                response,
                map,
                reference.slice(i - 1)
              );
            case "halted":
              return (
                initializingHandler
                  ? ((response = initializingHandler), response.deps++)
                  : (initializingHandler = {
                      parent: null,
                      chunk: null,
                      value: null,
                      reason: null,
                      deps: 1,
                      errored: !1
                    }),
                null
              );
            default:
              return (
                initializingHandler
                  ? ((initializingHandler.errored = !0),
                    (initializingHandler.value = null),
                    (initializingHandler.reason = id.reason))
                  : (initializingHandler = {
                      parent: null,
                      chunk: null,
                      value: null,
                      reason: id.reason,
                      deps: 0,
                      errored: !0
                    }),
                null
              );
          }
        }
        var name = reference[i];
        if (
          "object" !== typeof id ||
          null === id ||
          (getPrototypeOf(id) !== ObjectPrototype &&
            getPrototypeOf(id) !== ArrayPrototype) ||
          !hasOwnProperty.call(id, name)
        )
          throw Error(formatProdErrorMessage(570));
        id = id[name];
      }
      for (
        ;
        "object" === typeof id &&
        null !== id &&
        id.$$typeof === REACT_LAZY_TYPE;

      ) {
        reference = id._payload;
        switch (reference.status) {
          case "resolved_model":
            initializeModelChunk(reference);
            break;
          case "resolved_module":
            initializeModuleChunk(reference);
        }
        switch (reference.status) {
          case "fulfilled":
            id = reference.value;
            continue;
        }
        break;
      }
      return map(response, id, parentObject, key);
    case "pending":
    case "blocked":
      return waitForReference(id, parentObject, key, response, map, reference);
    case "halted":
      return (
        initializingHandler
          ? ((response = initializingHandler), response.deps++)
          : (initializingHandler = {
              parent: null,
              chunk: null,
              value: null,
              reason: null,
              deps: 1,
              errored: !1
            }),
        null
      );
    default:
      return (
        initializingHandler
          ? ((initializingHandler.errored = !0),
            (initializingHandler.value = null),
            (initializingHandler.reason = id.reason))
          : (initializingHandler = {
              parent: null,
              chunk: null,
              value: null,
              reason: id.reason,
              deps: 0,
              errored: !0
            }),
        null
      );
  }
}
function createMap(response, model) {
  return new Map(model);
}
function createSet(response, model) {
  return new Set(model);
}
function createBlob(response, model) {
  return new Blob(model.slice(1), { type: model[0] });
}
function createFormData(response, model) {
  response = new FormData();
  for (var i = 0; i < model.length; i++)
    response.append(model[i][0], model[i][1]);
  return response;
}
function extractIterator(response, model) {
  return model[Symbol.iterator]();
}
function createModel(response, model) {
  return model;
}
function parseModelString(response, parentObject, key, value) {
  if ("$" === value[0]) {
    if ("$" === value)
      return (
        null !== initializingHandler &&
          "0" === key &&
          (initializingHandler = {
            parent: initializingHandler,
            chunk: null,
            value: null,
            reason: null,
            deps: 0,
            errored: !1
          }),
        REACT_ELEMENT_TYPE
      );
    switch (value[1]) {
      case "$":
        return value.slice(1);
      case "L":
        return (
          (parentObject = parseInt(value.slice(2), 16)),
          (response = getChunk(response, parentObject)),
          createLazyChunkWrapper(response)
        );
      case "@":
        return (
          (parentObject = parseInt(value.slice(2), 16)),
          getChunk(response, parentObject)
        );
      case "S":
        return Symbol.for(value.slice(2));
      case "h":
        return (
          (value = value.slice(2)),
          getOutlinedModel(
            response,
            value,
            parentObject,
            key,
            loadServerReference
          )
        );
      case "T":
        parentObject = "$" + value.slice(2);
        response = response._tempRefs;
        if (null == response) throw Error(formatProdErrorMessage(511));
        return response.get(parentObject);
      case "Q":
        return (
          (value = value.slice(2)),
          getOutlinedModel(response, value, parentObject, key, createMap)
        );
      case "W":
        return (
          (value = value.slice(2)),
          getOutlinedModel(response, value, parentObject, key, createSet)
        );
      case "B":
        return (
          (value = value.slice(2)),
          getOutlinedModel(response, value, parentObject, key, createBlob)
        );
      case "K":
        return (
          (value = value.slice(2)),
          getOutlinedModel(response, value, parentObject, key, createFormData)
        );
      case "Z":
        return resolveErrorProd();
      case "i":
        return (
          (value = value.slice(2)),
          getOutlinedModel(response, value, parentObject, key, extractIterator)
        );
      case "I":
        return Infinity;
      case "-":
        return "$-0" === value ? -0 : -Infinity;
      case "N":
        return NaN;
      case "u":
        return;
      case "D":
        return new Date(Date.parse(value.slice(2)));
      case "n":
        return BigInt(value.slice(2));
      default:
        return (
          (value = value.slice(1)),
          getOutlinedModel(response, value, parentObject, key, createModel)
        );
    }
  }
  return value;
}
function missingCall() {
  throw Error(formatProdErrorMessage(466));
}
function ResponseInstance(
  bundlerConfig,
  serverReferenceConfig,
  moduleLoading,
  callServer,
  encodeFormAction,
  nonce,
  temporaryReferences,
  allowPartialStream
) {
  var chunks = new Map();
  this._bundlerConfig = bundlerConfig;
  this._serverReferenceConfig = serverReferenceConfig;
  this._moduleLoading = moduleLoading;
  this._callServer = void 0 !== callServer ? callServer : missingCall;
  this._encodeFormAction = encodeFormAction;
  this._nonce = nonce;
  this._chunks = chunks;
  this._stringDecoder = new TextDecoder();
  this._closed = !1;
  this._closedReason = null;
  this._allowPartialStream = allowPartialStream;
  this._tempRefs = temporaryReferences;
}
function resolveBuffer(response, id, buffer) {
  response = response._chunks;
  var chunk = response.get(id);
  chunk && "pending" !== chunk.status
    ? chunk.reason.enqueueValue(buffer)
    : ((buffer = new ReactPromise("fulfilled", buffer, null)),
      response.set(id, buffer));
}
function resolveModule(response, id, model) {
  var chunks = response._chunks,
    chunk = chunks.get(id);
  model = parseModel(response, model);
  var clientReference = resolveClientReference(response._bundlerConfig, model);
  if ((model = preloadModule(clientReference))) {
    if (chunk) {
      var blockedChunk = chunk;
      blockedChunk.status = "blocked";
    } else
      (blockedChunk = new ReactPromise("blocked", null, null)),
        chunks.set(id, blockedChunk);
    model.then(
      function () {
        return resolveModuleChunk(response, blockedChunk, clientReference);
      },
      function (error) {
        return triggerErrorOnChunk(response, blockedChunk, error);
      }
    );
  } else
    chunk
      ? resolveModuleChunk(response, chunk, clientReference)
      : ((chunk = new ReactPromise("resolved_module", clientReference, null)),
        chunks.set(id, chunk));
}
function resolveStream(response, id, stream, controller) {
  var chunks = response._chunks,
    chunk = chunks.get(id);
  chunk
    ? "pending" === chunk.status &&
      ((id = chunk.value),
      (chunk.status = "fulfilled"),
      (chunk.value = stream),
      (chunk.reason = controller),
      null !== id && wakeChunk(response, id, chunk.value, chunk))
    : ((response = new ReactPromise("fulfilled", stream, controller)),
      chunks.set(id, response));
}
function startReadableStream(response, id, type) {
  var controller = null,
    closed = !1;
  type = new ReadableStream({
    type: type,
    start: function (c) {
      controller = c;
    }
  });
  var previousBlockedChunk = null;
  resolveStream(response, id, type, {
    enqueueValue: function (value) {
      null === previousBlockedChunk
        ? controller.enqueue(value)
        : previousBlockedChunk.then(function () {
            controller.enqueue(value);
          });
    },
    enqueueModel: function (json) {
      if (null === previousBlockedChunk) {
        var chunk = new ReactPromise("resolved_model", json, response);
        initializeModelChunk(chunk);
        "fulfilled" === chunk.status
          ? controller.enqueue(chunk.value)
          : (chunk.then(
              function (v) {
                return controller.enqueue(v);
              },
              function (e) {
                return controller.error(e);
              }
            ),
            (previousBlockedChunk = chunk));
      } else {
        chunk = previousBlockedChunk;
        var chunk$55 = createPendingChunk();
        chunk$55.then(
          function (v) {
            return controller.enqueue(v);
          },
          function (e) {
            return controller.error(e);
          }
        );
        previousBlockedChunk = chunk$55;
        chunk.then(function () {
          previousBlockedChunk === chunk$55 && (previousBlockedChunk = null);
          resolveModelChunk(response, chunk$55, json);
        });
      }
    },
    close: function () {
      if (!closed)
        if (((closed = !0), null === previousBlockedChunk)) controller.close();
        else {
          var blockedChunk = previousBlockedChunk;
          previousBlockedChunk = null;
          blockedChunk.then(function () {
            return controller.close();
          });
        }
    },
    error: function (error) {
      if (!closed)
        if (((closed = !0), null === previousBlockedChunk))
          controller.error(error);
        else {
          var blockedChunk = previousBlockedChunk;
          previousBlockedChunk = null;
          blockedChunk.then(function () {
            return controller.error(error);
          });
        }
    }
  });
}
function asyncIterator() {
  return this;
}
function createIterator(next) {
  next = { next: next };
  next[ASYNC_ITERATOR] = asyncIterator;
  return next;
}
function startAsyncIterable(response, id, iterator) {
  var buffer = [],
    closed = !1,
    nextWriteIndex = 0,
    iterable = {};
  iterable[ASYNC_ITERATOR] = function () {
    var nextReadIndex = 0;
    return createIterator(function (arg) {
      if (void 0 !== arg) throw Error(formatProdErrorMessage(524));
      if (nextReadIndex === buffer.length) {
        if (closed)
          return new ReactPromise(
            "fulfilled",
            { done: !0, value: void 0 },
            null
          );
        buffer[nextReadIndex] = createPendingChunk();
      }
      return buffer[nextReadIndex++];
    });
  };
  resolveStream(
    response,
    id,
    iterator ? iterable[ASYNC_ITERATOR]() : iterable,
    {
      enqueueValue: function (value) {
        if (nextWriteIndex === buffer.length)
          buffer[nextWriteIndex] = new ReactPromise(
            "fulfilled",
            { done: !1, value: value },
            null
          );
        else {
          var chunk = buffer[nextWriteIndex],
            resolveListeners = chunk.value,
            rejectListeners = chunk.reason;
          chunk.status = "fulfilled";
          chunk.value = { done: !1, value: value };
          chunk.reason = null;
          null !== resolveListeners &&
            wakeChunkIfInitialized(
              response,
              chunk,
              resolveListeners,
              rejectListeners
            );
        }
        nextWriteIndex++;
      },
      enqueueModel: function (value) {
        nextWriteIndex === buffer.length
          ? (buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
              response,
              value,
              !1
            ))
          : resolveIteratorResultChunk(
              response,
              buffer[nextWriteIndex],
              value,
              !1
            );
        nextWriteIndex++;
      },
      close: function (value) {
        if (!closed)
          for (
            closed = !0,
              nextWriteIndex === buffer.length
                ? (buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
                    response,
                    value,
                    !0
                  ))
                : resolveIteratorResultChunk(
                    response,
                    buffer[nextWriteIndex],
                    value,
                    !0
                  ),
              nextWriteIndex++;
            nextWriteIndex < buffer.length;

          )
            resolveIteratorResultChunk(
              response,
              buffer[nextWriteIndex++],
              '"$undefined"',
              !0
            );
      },
      error: function (error) {
        if (!closed)
          for (
            closed = !0,
              nextWriteIndex === buffer.length &&
                (buffer[nextWriteIndex] = createPendingChunk());
            nextWriteIndex < buffer.length;

          )
            triggerErrorOnChunk(response, buffer[nextWriteIndex++], error);
      }
    }
  );
}
function resolveErrorProd() {
  var error = Error(formatProdErrorMessage(441));
  error.stack = "Error: " + error.message;
  return error;
}
function mergeBuffer(buffer, lastChunk) {
  for (var l = buffer.length, byteLength = lastChunk.length, i = 0; i < l; i++)
    byteLength += buffer[i].byteLength;
  byteLength = new Uint8Array(byteLength);
  for (var i$56 = (i = 0); i$56 < l; i$56++) {
    var chunk = buffer[i$56];
    byteLength.set(chunk, i);
    i += chunk.byteLength;
  }
  byteLength.set(lastChunk, i);
  return byteLength;
}
function resolveTypedArray(
  response,
  id,
  buffer,
  lastChunk,
  constructor,
  bytesPerElement
) {
  buffer =
    0 === buffer.length && 0 === lastChunk.byteOffset % bytesPerElement
      ? lastChunk
      : mergeBuffer(buffer, lastChunk);
  constructor = new constructor(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength / bytesPerElement
  );
  resolveBuffer(response, id, constructor);
}
function processFullBinaryRow(response, streamState, id, tag, buffer, chunk) {
  switch (tag) {
    case 65:
      resolveBuffer(response, id, mergeBuffer(buffer, chunk).buffer);
      return;
    case 79:
      resolveTypedArray(response, id, buffer, chunk, Int8Array, 1);
      return;
    case 111:
      resolveBuffer(
        response,
        id,
        0 === buffer.length ? chunk : mergeBuffer(buffer, chunk)
      );
      return;
    case 85:
      resolveTypedArray(response, id, buffer, chunk, Uint8ClampedArray, 1);
      return;
    case 83:
      resolveTypedArray(response, id, buffer, chunk, Int16Array, 2);
      return;
    case 115:
      resolveTypedArray(response, id, buffer, chunk, Uint16Array, 2);
      return;
    case 76:
      resolveTypedArray(response, id, buffer, chunk, Int32Array, 4);
      return;
    case 108:
      resolveTypedArray(response, id, buffer, chunk, Uint32Array, 4);
      return;
    case 71:
      resolveTypedArray(response, id, buffer, chunk, Float32Array, 4);
      return;
    case 103:
      resolveTypedArray(response, id, buffer, chunk, Float64Array, 8);
      return;
    case 77:
      resolveTypedArray(response, id, buffer, chunk, BigInt64Array, 8);
      return;
    case 109:
      resolveTypedArray(response, id, buffer, chunk, BigUint64Array, 8);
      return;
    case 86:
      resolveTypedArray(response, id, buffer, chunk, DataView, 1);
      return;
  }
  streamState = response._stringDecoder;
  for (var row = "", i = 0; i < buffer.length; i++)
    row += streamState.decode(buffer[i], decoderOptions);
  buffer = row += streamState.decode(chunk);
  switch (tag) {
    case 73:
      resolveModule(response, id, buffer);
      break;
    case 72:
      id = buffer[0];
      buffer = buffer.slice(1);
      response = parseModel(response, buffer);
      buffer = ReactDOMSharedInternals.d;
      switch (id) {
        case "D":
          buffer.D(response);
          break;
        case "C":
          "string" === typeof response
            ? buffer.C(response)
            : buffer.C(response[0], response[1]);
          break;
        case "L":
          id = response[0];
          tag = response[1];
          3 === response.length
            ? buffer.L(id, tag, response[2])
            : buffer.L(id, tag);
          break;
        case "m":
          "string" === typeof response
            ? buffer.m(response)
            : buffer.m(response[0], response[1]);
          break;
        case "X":
          "string" === typeof response
            ? buffer.X(response)
            : buffer.X(response[0], response[1]);
          break;
        case "S":
          "string" === typeof response
            ? buffer.S(response)
            : buffer.S(
                response[0],
                0 === response[1] ? void 0 : response[1],
                3 === response.length ? response[2] : void 0
              );
          break;
        case "M":
          "string" === typeof response
            ? buffer.M(response)
            : buffer.M(response[0], response[1]);
      }
      break;
    case 69:
      tag = response._chunks;
      chunk = tag.get(id);
      buffer = JSON.parse(buffer);
      streamState = resolveErrorProd();
      streamState.digest = buffer.digest;
      chunk
        ? triggerErrorOnChunk(response, chunk, streamState)
        : ((response = new ReactPromise("rejected", null, streamState)),
          tag.set(id, response));
      break;
    case 84:
      response = response._chunks;
      (tag = response.get(id)) && "pending" !== tag.status
        ? tag.reason.enqueueValue(buffer)
        : ((buffer = new ReactPromise("fulfilled", buffer, null)),
          response.set(id, buffer));
      break;
    case 78:
    case 68:
    case 74:
    case 87:
      throw Error(formatProdErrorMessage(504));
    case 82:
      startReadableStream(response, id, void 0);
      break;
    case 114:
      startReadableStream(response, id, "bytes");
      break;
    case 88:
      startAsyncIterable(response, id, !1);
      break;
    case 120:
      startAsyncIterable(response, id, !0);
      break;
    case 67:
      (id = response._chunks.get(id)) &&
        "fulfilled" === id.status &&
        id.reason.close("" === buffer ? '"$undefined"' : buffer);
      break;
    default:
      (tag = response._chunks),
        (chunk = tag.get(id))
          ? resolveModelChunk(response, chunk, buffer)
          : ((response = new ReactPromise("resolved_model", buffer, response)),
            tag.set(id, response));
  }
}
function parseModel(response, json) {
  json = JSON.parse(json);
  return reviveModel(response, json, { "": json }, "");
}
function reviveModel(response, value, parentObject, key) {
  if ("string" === typeof value)
    return "$" === value[0]
      ? parseModelString(response, parentObject, key, value)
      : value;
  if ("object" !== typeof value || null === value) return value;
  if (isArrayImpl(value)) {
    for (var i = 0; i < value.length; i++)
      value[i] = reviveModel(response, value[i], value, "" + i);
    return value[0] === REACT_ELEMENT_TYPE
      ? (value[0] === REACT_ELEMENT_TYPE
          ? ((response = {
              $$typeof: REACT_ELEMENT_TYPE,
              type: value[1],
              key: value[2],
              ref: null,
              props: value[3]
            }),
            null !== initializingHandler &&
              ((value = initializingHandler),
              (initializingHandler = value.parent),
              value.errored
                ? ((response = new ReactPromise(
                    "rejected",
                    null,
                    value.reason
                  )),
                  (response = createLazyChunkWrapper(response)))
                : 0 < value.deps &&
                  ((i = new ReactPromise("blocked", null, null)),
                  (value.value = response),
                  (value.chunk = i),
                  (response = createLazyChunkWrapper(i)))))
          : (response = value),
        response)
      : value;
  }
  for (i in value)
    hasOwnProperty.call(value, i) &&
      ("__proto__" === i
        ? delete value[i]
        : ((parentObject = reviveModel(response, value[i], value, i)),
          void 0 !== parentObject
            ? (value[i] = parentObject)
            : delete value[i]));
  return value;
}
function close(weakResponse) {
  weakResponse._allowPartialStream
    ? ((weakResponse._closed = !0),
      weakResponse._chunks.forEach(function (chunk) {
        "pending" === chunk.status
          ? ((chunk.status = "halted"),
            (chunk.value = null),
            (chunk.reason = null))
          : "fulfilled" === chunk.status &&
            null !== chunk.reason &&
            chunk.reason.close('"$undefined"');
      }))
    : reportGlobalError(weakResponse, Error(formatProdErrorMessage(412)));
}
function createResponseFromOptions(options) {
  return new ResponseInstance(
    null,
    null,
    null,
    options && options.callServer ? options.callServer : void 0,
    void 0,
    void 0,
    options && options.temporaryReferences
      ? options.temporaryReferences
      : void 0,
    options && options.unstable_allowPartialStream
      ? options.unstable_allowPartialStream
      : !1
  );
}
function startReadingFromStream(response, stream, onDone) {
  function progress(_ref2) {
    var value = _ref2.value;
    if (_ref2.done) return onDone();
    var i = 0,
      rowState = streamState._rowState;
    _ref2 = streamState._rowID;
    for (
      var rowTag = streamState._rowTag,
        rowLength = streamState._rowLength,
        buffer = streamState._buffer,
        chunkLength = value.length;
      i < chunkLength;

    ) {
      var lastIdx = -1;
      switch (rowState) {
        case 0:
          lastIdx = value[i++];
          58 === lastIdx
            ? (rowState = 1)
            : (_ref2 =
                (_ref2 << 4) | (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
          continue;
        case 1:
          rowState = value[i];
          84 === rowState ||
          65 === rowState ||
          79 === rowState ||
          111 === rowState ||
          98 === rowState ||
          85 === rowState ||
          83 === rowState ||
          115 === rowState ||
          76 === rowState ||
          108 === rowState ||
          71 === rowState ||
          103 === rowState ||
          77 === rowState ||
          109 === rowState ||
          86 === rowState
            ? ((rowTag = rowState), (rowState = 2), i++)
            : (64 < rowState && 91 > rowState) ||
                35 === rowState ||
                114 === rowState ||
                120 === rowState
              ? ((rowTag = rowState), (rowState = 3), i++)
              : ((rowTag = 0), (rowState = 3));
          continue;
        case 2:
          lastIdx = value[i++];
          44 === lastIdx
            ? (rowState = 4)
            : (rowLength =
                (rowLength << 4) |
                (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
          continue;
        case 3:
          lastIdx = value.indexOf(10, i);
          break;
        case 4:
          (lastIdx = i + rowLength), lastIdx > value.length && (lastIdx = -1);
      }
      var offset = value.byteOffset + i;
      if (-1 < lastIdx)
        (rowLength = new Uint8Array(value.buffer, offset, lastIdx - i)),
          98 === rowTag
            ? resolveBuffer(
                response,
                _ref2,
                lastIdx === chunkLength ? rowLength : rowLength.slice()
              )
            : processFullBinaryRow(
                response,
                streamState,
                _ref2,
                rowTag,
                buffer,
                rowLength
              ),
          (i = lastIdx),
          3 === rowState && i++,
          (rowLength = _ref2 = rowTag = rowState = 0),
          (buffer.length = 0);
      else {
        value = new Uint8Array(value.buffer, offset, value.byteLength - i);
        98 === rowTag
          ? ((rowLength -= value.byteLength),
            resolveBuffer(response, _ref2, value))
          : (buffer.push(value), (rowLength -= value.byteLength));
        break;
      }
    }
    streamState._rowState = rowState;
    streamState._rowID = _ref2;
    streamState._rowTag = rowTag;
    streamState._rowLength = rowLength;
    return reader.read().then(progress).catch(error);
  }
  function error(e) {
    reportGlobalError(response, e);
  }
  var streamState = {
      _rowState: 0,
      _rowID: 0,
      _rowTag: 0,
      _rowLength: 0,
      _buffer: []
    },
    reader = stream.getReader();
  reader.read().then(progress).catch(error);
}
exports.createFromFetch = function (promiseForResponse, options) {
  var response = createResponseFromOptions(options);
  promiseForResponse.then(
    function (r) {
      startReadingFromStream(response, r.body, close.bind(null, response));
    },
    function (e) {
      reportGlobalError(response, e);
    }
  );
  return getChunk(response, 0);
};
exports.createFromReadableStream = function (stream, options) {
  options = createResponseFromOptions(options);
  startReadingFromStream(options, stream, close.bind(null, options));
  return getChunk(options, 0);
};
exports.createServerReference = function (id, callServer) {
  function action() {
    var args = Array.prototype.slice.call(arguments);
    return callServer(id, args);
  }
  registerBoundServerReference(action, id, null);
  return action;
};
exports.createTemporaryReferenceSet = function () {
  return new Map();
};
exports.encodeReply = function (value, options) {
  return new Promise(function (resolve, reject) {
    var abort = processReply(
      value,
      "",
      options && options.temporaryReferences
        ? options.temporaryReferences
        : void 0,
      resolve,
      reject
    );
    if (options && options.signal) {
      var signal = options.signal;
      if (signal.aborted) abort(signal.reason);
      else {
        var listener = function () {
          abort(signal.reason);
          signal.removeEventListener("abort", listener);
        };
        signal.addEventListener("abort", listener);
      }
    }
  });
};
exports.registerServerReference = function (reference, id) {
  registerBoundServerReference(reference, id, null);
  return reference;
};


/***/ }),

/***/ 99297:
/***/ ((module, exports) => {

"use strict";
/**
 * ReadonlyURLSearchParams implementation shared between client and server.
 * This file is intentionally not marked as 'use client' or 'use server'
 * so it can be imported by both environments.
 */ /** @internal */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "ReadonlyURLSearchParams", ({
    enumerable: true,
    get: function() {
        return ReadonlyURLSearchParams;
    }
}));
class ReadonlyURLSearchParamsError extends Error {
    constructor(){
        super('Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams');
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1174",
            enumerable: false,
            configurable: true
        });
    }
}
class ReadonlyURLSearchParams extends URLSearchParams {
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
        throw new ReadonlyURLSearchParamsError();
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=readonly-url-search-params.js.map


/***/ }),

/***/ 99786:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "RedirectStatusCode", ({
    enumerable: true,
    get: function() {
        return RedirectStatusCode;
    }
}));
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-status-code.js.map


/***/ })

}]);