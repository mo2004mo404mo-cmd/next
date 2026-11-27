(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[550],{

/***/ 69:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports isBot, userAgentFromString, userAgent */
/* harmony import */ var next_dist_compiled_ua_parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4990);
/* harmony import */ var next_dist_compiled_ua_parser_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_compiled_ua_parser_js__WEBPACK_IMPORTED_MODULE_0__);

function isBot(input) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver|GPTBot/i.test(input);
}
function userAgentFromString(input) {
    return {
        ...parseua(input),
        isBot: input === undefined ? false : isBot(input)
    };
}
function userAgent({ headers }) {
    return userAgentFromString(headers.get('user-agent') || undefined);
}

//# sourceMappingURL=user-agent.js.map

/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports prefixes, bootstrap, wait, error, warn, ready, info, event, trace, warnOnce, errorOnce */
/* harmony import */ var _lib_picocolors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5760);
/* harmony import */ var _server_lib_lru_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2401);


const prefixes = {
    wait: (0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .white */ .ON)((0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .bold */ .Cr)('○')),
    error: (0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .red */ .wv)((0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .bold */ .Cr)('⨯')),
    warn: (0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .yellow */ .D9)((0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .bold */ .Cr)('⚠')),
    ready: '▲',
    info: (0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .white */ .ON)((0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .bold */ .Cr)(' ')),
    event: (0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .green */ .wL)((0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .bold */ .Cr)('✓')),
    trace: (0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .magenta */ .GC)((0,_lib_picocolors__WEBPACK_IMPORTED_MODULE_0__/* .bold */ .Cr)('»'))
};
const LOGGING_METHOD = {
    log: 'log',
    warn: 'warn',
    error: 'error'
};
function prefixedLog(prefixType, ...message) {
    if ((message[0] === '' || message[0] === undefined) && message.length === 1) {
        message.shift();
    }
    const consoleMethod = prefixType in LOGGING_METHOD ? LOGGING_METHOD[prefixType] : 'log';
    const prefix = prefixes[prefixType];
    // If there's no message, don't print the prefix but a new line
    if (message.length === 0) {
        console[consoleMethod]('');
    } else {
        // Ensure if there's ANSI escape codes it's concatenated into one string.
        // Chrome DevTool can only handle color if it's in one string.
        if (message.length === 1 && typeof message[0] === 'string') {
            console[consoleMethod](prefix + ' ' + message[0]);
        } else {
            console[consoleMethod](prefix, ...message);
        }
    }
}
function bootstrap(message) {
    console.log(message);
}
function wait(...message) {
    prefixedLog('wait', ...message);
}
function error(...message) {
    prefixedLog('error', ...message);
}
function warn(...message) {
    prefixedLog('warn', ...message);
}
function ready(...message) {
    prefixedLog('ready', ...message);
}
function info(...message) {
    prefixedLog('info', ...message);
}
function event(...message) {
    prefixedLog('event', ...message);
}
function trace(...message) {
    prefixedLog('trace', ...message);
}
const warnOnceCache = new _server_lib_lru_cache__WEBPACK_IMPORTED_MODULE_1__/* .LRUCache */ .q(10000, (value)=>value.length);
function warnOnce(...message) {
    const key = message.join(' ');
    if (!warnOnceCache.has(key)) {
        warnOnceCache.set(key, key);
        warn(...message);
    }
}
const errorOnceCache = new _server_lib_lru_cache__WEBPACK_IMPORTED_MODULE_1__/* .LRUCache */ .q(10000, (value)=>value.length);
function errorOnce(...message) {
    const key = message.join(' ');
    if (!errorOnceCache.has(key)) {
        errorOnceCache.set(key, key);
        error(...message);
    }
}

//# sourceMappingURL=log.js.map

/***/ }),

/***/ 228:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export parseUrl */
/* harmony import */ var _parse_relative_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1095);


function parseUrl(url) {
    if (url.startsWith('/')) {
        return parseRelativeUrl(url);
    }
    const parsedURL = new URL(url);
    const username = parsedURL.username;
    const password = parsedURL.password;
    const auth = username ? password ? `${username}:${password}` : username : null;
    const pathname = parsedURL.pathname;
    const search = parsedURL.search;
    return {
        auth,
        hash: parsedURL.hash,
        hostname: parsedURL.hostname,
        href: parsedURL.href,
        pathname,
        port: parsedURL.port,
        protocol: parsedURL.protocol,
        query: searchParamsToUrlQuery(parsedURL.searchParams),
        search,
        origin: parsedURL.origin,
        slashes: parsedURL.href.slice(parsedURL.protocol.length, parsedURL.protocol.length + 2) === '//'
    };
} //# sourceMappingURL=parse-url.js.map


/***/ }),

/***/ 266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gx: () => (/* binding */ checkIsOnDemandRevalidate),
/* harmony export */   Ic: () => (/* binding */ COOKIE_NAME_PRERENDER_BYPASS)
/* harmony export */ });
/* unused harmony exports wrapApiHandler, sendStatusCode, redirect, COOKIE_NAME_PRERENDER_DATA, RESPONSE_LIMIT_DEFAULT, SYMBOL_PREVIEW_DATA, SYMBOL_CLEARED_COOKIES, clearPreviewData, ApiError, sendError, setLazyProp */
/* harmony import */ var _web_spec_extension_adapters_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6271);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1276);
/* harmony import */ var _lib_trace_tracer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5342);
/* harmony import */ var _lib_trace_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4738);




function wrapApiHandler(page, handler) {
    return (...args)=>{
        getTracer().setRootSpanAttribute('next.route', page);
        // Call API route method
        return getTracer().trace(NodeSpan.runHandler, {
            spanName: `executing api route (pages) ${page}`
        }, ()=>handler(...args));
    };
}
/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */ function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
/**
 *
 * @param res response object
 * @param [statusOrUrl] `HTTP` status code of redirect
 * @param url URL of redirect
 */ function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === 'string') {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
        throw Object.defineProperty(new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`), "__NEXT_ERROR_CODE", {
            value: "E389",
            enumerable: false,
            configurable: true
        });
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(rawHeaders, previewProps) {
    // Headers is a plain object for Node.js, Headers object in Edge runtime
    if (typeof rawHeaders.get === 'function') {
        const headers = _web_spec_extension_adapters_headers__WEBPACK_IMPORTED_MODULE_0__/* .HeadersAdapter */ .o.from(rawHeaders);
        const previewModeId = headers.get(_lib_constants__WEBPACK_IMPORTED_MODULE_1__/* .PRERENDER_REVALIDATE_HEADER */ .kz);
        const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
        const revalidateOnlyGenerated = headers.has(_lib_constants__WEBPACK_IMPORTED_MODULE_1__/* .PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER */ .r4);
        return {
            isOnDemandRevalidate,
            revalidateOnlyGenerated
        };
    }
    const headers = rawHeaders;
    const previewModeId = headers[_lib_constants__WEBPACK_IMPORTED_MODULE_1__/* .PRERENDER_REVALIDATE_HEADER */ .kz];
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.hasOwnProperty(_lib_constants__WEBPACK_IMPORTED_MODULE_1__/* .PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER */ .r4);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = (/* unused pure expression or super */ null && (4 * 1024 * 1024));
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __webpack_require__(7852);
    const previous = res.getHeader('Set-Cookie');
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === 'string' ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? 'none' : 0,
            secure: "production" !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? 'none' : 0,
            secure: "production" !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
/**
 * Custom error class
 */ class ApiError extends Error {
    constructor(statusCode, message){
        super(message);
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
        this.statusCode = statusCode;
    }
}
/**
 * Sends error in `response`
 * @param res response object
 * @param statusCode of response
 * @param message of response
 */ function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
/**
 * Execute getter function only if its needed
 * @param LazyProps `req` and `params` for lazyProp
 * @param prop name of property
 * @param getter function to get data
 */ function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 332:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ normalizeLocalePath)
/* harmony export */ });
/**
 * A cache of lowercased locales for each list of locales. This is stored as a
 * WeakMap so if the locales are garbage collected, the cache entry will be
 * removed as well.
 */ const cache = new WeakMap();
/**
 * For a pathname that may include a locale from a list of locales, it
 * removes the locale from the pathname returning it alongside with the
 * detected locale.
 *
 * @param pathname A pathname that may include a locale.
 * @param locales A list of locales.
 * @returns The detected locale and pathname without locale
 */ function normalizeLocalePath(pathname, locales) {
    // If locales is undefined, return the pathname as is.
    if (!locales) return {
        pathname
    };
    // Get the cached lowercased locales or create a new cache entry.
    let lowercasedLocales = cache.get(locales);
    if (!lowercasedLocales) {
        lowercasedLocales = locales.map((locale)=>locale.toLowerCase());
        cache.set(locales, lowercasedLocales);
    }
    let detectedLocale;
    // The first segment will be empty, because it has a leading `/`. If
    // there is no further segment, there is no locale (or it's the default).
    const segments = pathname.split('/', 2);
    // If there's no second segment (ie, the pathname is just `/`), there's no
    // locale.
    if (!segments[1]) return {
        pathname
    };
    // The second segment will contain the locale part if any.
    const segment = segments[1].toLowerCase();
    // See if the segment matches one of the locales. If it doesn't, there is
    // no locale (or it's the default).
    const index = lowercasedLocales.indexOf(segment);
    if (index < 0) return {
        pathname
    };
    // Return the case-sensitive locale.
    detectedLocale = locales[index];
    // Remove the `/${locale}` part of the pathname.
    pathname = pathname.slice(detectedLocale.length + 1) || '/';
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map


/***/ }),

/***/ 337:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ NextResponse)
/* harmony export */ });
/* harmony import */ var _web_spec_extension_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4387);
/* harmony import */ var _next_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2193);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9535);
/* harmony import */ var _adapters_reflect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3058);





const INTERNALS = Symbol('internal response');
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw Object.defineProperty(new Error('request.headers must be an instance of Headers'), "__NEXT_ERROR_CODE", {
                value: "E119",
                enumerable: false,
                configurable: true
            });
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set('x-middleware-request-' + key, value);
            keys.push(key);
        }
        headers.set('x-middleware-override-headers', keys.join(','));
    }
}
/**
 * This class extends the [Web `Response` API](https://developer.mozilla.org/docs/Web/API/Response) with additional convenience methods.
 *
 * Read more: [Next.js Docs: `NextResponse`](https://nextjs.org/docs/app/api-reference/functions/next-response)
 */ class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        const headers = this.headers;
        const cookies = new _web_spec_extension_cookies__WEBPACK_IMPORTED_MODULE_0__/* .ResponseCookies */ .VO(headers);
        const cookiesProxy = new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'delete':
                    case 'set':
                        {
                            return (...args)=>{
                                const result = Reflect.apply(target[prop], target, args);
                                const newHeaders = new Headers(headers);
                                if (result instanceof _web_spec_extension_cookies__WEBPACK_IMPORTED_MODULE_0__/* .ResponseCookies */ .VO) {
                                    headers.set('x-middleware-set-cookie', result.getAll().map((cookie)=>(0,_web_spec_extension_cookies__WEBPACK_IMPORTED_MODULE_0__/* .stringifyCookie */ .Ud)(cookie)).join(','));
                                }
                                handleMiddlewareField(init, newHeaders);
                                return result;
                            };
                        }
                    default:
                        return _adapters_reflect__WEBPACK_IMPORTED_MODULE_3__/* .ReflectAdapter */ .l.get(target, prop, receiver);
                }
            }
        });
        this[INTERNALS] = {
            cookies: cookiesProxy,
            url: init.url ? new _next_url__WEBPACK_IMPORTED_MODULE_1__/* .NextURL */ .X(init.url, {
                headers: (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .toNodeOutgoingHttpHeaders */ .Cu)(headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === 'number' ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw Object.defineProperty(new RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", {
                value: "E529",
                enumerable: false,
                configurable: true
            });
        }
        const initObj = typeof init === 'object' ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set('Location', (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .validateURL */ .qU)(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-rewrite', (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .validateURL */ .qU)(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-next', '1');
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
}

//# sourceMappingURL=response.js.map

/***/ }),

/***/ 345:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(7417);
} else {}


/***/ }),

/***/ 478:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ getImplicitTags)
/* harmony export */ });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1276);
/* harmony import */ var _use_cache_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5403);
/* harmony import */ var _encode_header_safe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2361);
/* harmony import */ var _lazy_result__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7059);




const getDerivedTags = (pathname)=>{
    const derivedTags = [
        `/layout`
    ];
    // we automatically add the current path segments as tags
    // for revalidatePath handling
    if (pathname.startsWith('/')) {
        let end = pathname.indexOf('/', 1);
        while(true){
            if (end === -1) {
                end = pathname.length;
            }
            let curPathname = pathname.slice(0, end);
            if (curPathname) {
                // all derived tags other than the page are layout tags
                if (!curPathname.endsWith('/page') && !curPathname.endsWith('/route')) {
                    curPathname = `${curPathname}${!curPathname.endsWith('/') ? '/' : ''}layout`;
                }
                derivedTags.push(curPathname);
            }
            if (end === pathname.length) {
                break;
            }
            end = pathname.indexOf('/', end + 1);
        }
    }
    return derivedTags;
};
/**
 * Creates a map with lazy results that fetch the expiration value for the given
 * tags and respective cache kind when they're awaited for the first time.
 */ function createTagsExpirationsByCacheKind(tags) {
    const expirationsByCacheKind = new Map();
    const cacheHandlers = (0,_use_cache_handlers__WEBPACK_IMPORTED_MODULE_1__/* .getCacheHandlerEntries */ .fs)();
    if (cacheHandlers) {
        for (const [kind, cacheHandler] of cacheHandlers){
            if ('getExpiration' in cacheHandler) {
                expirationsByCacheKind.set(kind, (0,_lazy_result__WEBPACK_IMPORTED_MODULE_2__/* .createLazyResult */ .a)(async ()=>cacheHandler.getExpiration(tags)));
            }
        }
    }
    return expirationsByCacheKind;
}
async function getImplicitTags(page, pathname, fallbackRouteParams) {
    const tags = new Set();
    // Add the derived tags from the page. Encode each tag so a non-ASCII
    // pathname doesn't trip header validation when written to
    // `x-next-cache-tags`. Idempotent on already-ASCII input.
    const derivedTags = getDerivedTags(page);
    for (let tag of derivedTags){
        tag = (0,_encode_header_safe__WEBPACK_IMPORTED_MODULE_3__/* .encodeHeaderSafe */ .R)(`${_lib_constants__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_CACHE_IMPLICIT_TAG_ID */ .gW}${tag}`);
        tags.add(tag);
    }
    // Add the tags from the pathname. If the route has unknown params, we don't
    // want to add the pathname as a tag, as it will be invalid.
    if (pathname && (!fallbackRouteParams || fallbackRouteParams.size === 0)) {
        const tag = (0,_encode_header_safe__WEBPACK_IMPORTED_MODULE_3__/* .encodeHeaderSafe */ .R)(`${_lib_constants__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_CACHE_IMPLICIT_TAG_ID */ .gW}${pathname}`);
        tags.add(tag);
    }
    if (tags.has(`${_lib_constants__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_CACHE_IMPLICIT_TAG_ID */ .gW}/`)) {
        tags.add(`${_lib_constants__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_CACHE_IMPLICIT_TAG_ID */ .gW}/index`);
    }
    if (tags.has(`${_lib_constants__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_CACHE_IMPLICIT_TAG_ID */ .gW}/index`)) {
        tags.add(`${_lib_constants__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_CACHE_IMPLICIT_TAG_ID */ .gW}/`);
    }
    const tagsArray = Array.from(tags);
    return {
        tags: tagsArray,
        expirationsByCacheKind: createTagsExpirationsByCacheKind(tagsArray)
    };
}

//# sourceMappingURL=implicit-tags.js.map

/***/ }),

/***/ 481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ IncrementalCacheKind),
/* harmony export */   y: () => (/* binding */ CachedRouteKind)
/* harmony export */ });
var CachedRouteKind = /*#__PURE__*/ function(CachedRouteKind) {
    CachedRouteKind["APP_PAGE"] = "APP_PAGE";
    CachedRouteKind["APP_ROUTE"] = "APP_ROUTE";
    CachedRouteKind["PAGES"] = "PAGES";
    CachedRouteKind["FETCH"] = "FETCH";
    CachedRouteKind["REDIRECT"] = "REDIRECT";
    CachedRouteKind["IMAGE"] = "IMAGE";
    return CachedRouteKind;
}({});
var IncrementalCacheKind = /*#__PURE__*/ function(IncrementalCacheKind) {
    IncrementalCacheKind["APP_PAGE"] = "APP_PAGE";
    IncrementalCacheKind["APP_ROUTE"] = "APP_ROUTE";
    IncrementalCacheKind["PAGES"] = "PAGES";
    IncrementalCacheKind["FETCH"] = "FETCH";
    IncrementalCacheKind["IMAGE"] = "IMAGE";
    return IncrementalCacheKind;
}({});

//# sourceMappingURL=types.js.map

/***/ }),

/***/ 625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports interpolateParallelRouteParams, getDynamicParam, PARAMETER_PATTERN, parseParameter, parseMatchedParameter */
/* harmony import */ var _invariant_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1520);
/* harmony import */ var _routes_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5593);
/* harmony import */ var _resolve_param_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4497);




/**
 * Gets the value of a param from the params object. This correctly handles the
 * case where the param is a fallback route param and encodes the resulting
 * value.
 *
 * @param interpolatedParams - The params object.
 * @param segmentKey - The key of the segment.
 * @param fallbackRouteParams - The fallback route params.
 * @returns The value of the param.
 */ function getParamValue(interpolatedParams, segmentKey, fallbackRouteParams) {
    let value = interpolatedParams[segmentKey];
    if (fallbackRouteParams?.has(segmentKey)) {
        // We know that the fallback route params has the segment key because we
        // checked that above.
        const [searchValue] = fallbackRouteParams.get(segmentKey);
        value = searchValue;
    } else if (Array.isArray(value)) {
        value = value.map((i)=>encodeURIComponent(i));
    } else if (typeof value === 'string') {
        value = encodeURIComponent(value);
    }
    return value;
}
function interpolateParallelRouteParams(loaderTree, params, pagePath, fallbackRouteParams) {
    const interpolated = structuredClone(params);
    // Stack-based traversal with depth tracking
    const stack = [
        {
            tree: loaderTree,
            depth: 0
        }
    ];
    // Parse the route from the provided page path.
    const route = parseNormalizedAppRoute(pagePath);
    while(stack.length > 0){
        const { tree, depth } = stack.pop();
        const { segment, parallelRoutes } = parseLoaderTree(tree);
        const appSegment = parseAppRouteSegment(segment);
        if (appSegment?.type === 'dynamic' && !interpolated.hasOwnProperty(appSegment.param.paramName) && // If the param is in the fallback route params, we don't need to
        // interpolate it because it's already marked as being unknown.
        !fallbackRouteParams?.has(appSegment.param.paramName)) {
            const { paramName, paramType } = appSegment.param;
            const paramValue = resolveParamValue(paramName, paramType, depth, route, interpolated);
            if (paramValue !== undefined) {
                interpolated[paramName] = paramValue;
            } else if (paramType !== 'optional-catchall') {
                throw Object.defineProperty(new InvariantError(`Could not resolve param value for segment: ${paramName}`), "__NEXT_ERROR_CODE", {
                    value: "E932",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        // Calculate next depth - increment if this is not a route group and not empty
        let nextDepth = depth;
        if (appSegment && appSegment.type !== 'route-group' && appSegment.type !== 'parallel-route') {
            nextDepth++;
        }
        // Add all parallel routes to the stack for processing
        for (const parallelRoute of Object.values(parallelRoutes)){
            stack.push({
                tree: parallelRoute,
                depth: nextDepth
            });
        }
    }
    return interpolated;
}
/**
 *
 * Shared logic on client and server for creating a dynamic param value.
 *
 * This code needs to be shared with the client so it can extract dynamic route
 * params from the URL without a server request.
 *
 * Because everything in this module is sent to the client, we should aim to
 * keep this code as simple as possible. The special case handling for catchall
 * and optional is, alas, unfortunate.
 */ function getDynamicParam(interpolatedParams, segmentKey, dynamicParamType, fallbackRouteParams, staticSiblings) {
    let value = getParamValue(interpolatedParams, segmentKey, fallbackRouteParams);
    // handle the case where an optional catchall does not have a value,
    // e.g. `/dashboard/[[...slug]]` when requesting `/dashboard`
    if (!value || value.length === 0) {
        if (dynamicParamType === 'oc') {
            return {
                param: segmentKey,
                value: null,
                type: dynamicParamType,
                treeSegment: [
                    segmentKey,
                    '',
                    dynamicParamType,
                    staticSiblings
                ]
            };
        }
        throw Object.defineProperty(new InvariantError(`Missing value for segment key: "${segmentKey}" with dynamic param type: ${dynamicParamType}`), "__NEXT_ERROR_CODE", {
            value: "E864",
            enumerable: false,
            configurable: true
        });
    }
    const paramCacheKey = Array.isArray(value) ? value.join('/') : value;
    return {
        param: segmentKey,
        // The value that is passed to user code.
        value,
        // The value that is rendered in the router tree.
        // TODO: If the number of static siblings exceeds some threshold (e.g.,
        // dozens or hundreds), consider sending a Bloom filter instead of the full
        // array to reduce payload size. The client would then use the Bloom filter
        // to check membership with a small false positive rate.
        treeSegment: [
            segmentKey,
            paramCacheKey,
            dynamicParamType,
            staticSiblings
        ],
        type: dynamicParamType
    };
}
/**
 * Regular expression pattern used to match route parameters.
 * Matches both single parameters and parameter groups.
 * Examples:
 *   - `[[...slug]]` matches parameter group with key 'slug', repeat: true, optional: true
 *   - `[...slug]` matches parameter group with key 'slug', repeat: true, optional: false
 *   - `[[foo]]` matches parameter with key 'foo', repeat: false, optional: true
 *   - `[bar]` matches parameter with key 'bar', repeat: false, optional: false
 */ const PARAMETER_PATTERN = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
/**
 * Parses a given parameter from a route to a data structure that can be used
 * to generate the parametrized route.
 * Examples:
 *   - `[[...slug]]` -> `{ key: 'slug', repeat: true, optional: true }`
 *   - `[...slug]` -> `{ key: 'slug', repeat: true, optional: false }`
 *   - `[[foo]]` -> `{ key: 'foo', repeat: false, optional: true }`
 *   - `[bar]` -> `{ key: 'bar', repeat: false, optional: false }`
 *   - `fizz` -> `{ key: 'fizz', repeat: false, optional: false }`
 * @param param - The parameter to parse.
 * @returns The parsed parameter as a data structure.
 */ function parseParameter(param) {
    const match = param.match(PARAMETER_PATTERN);
    if (!match) {
        return parseMatchedParameter(param);
    }
    return parseMatchedParameter(match[2]);
}
/**
 * Parses a matched parameter from the PARAMETER_PATTERN regex to a data structure that can be used
 * to generate the parametrized route.
 * Examples:
 *   - `[...slug]` -> `{ key: 'slug', repeat: true, optional: true }`
 *   - `...slug` -> `{ key: 'slug', repeat: true, optional: false }`
 *   - `[foo]` -> `{ key: 'foo', repeat: false, optional: true }`
 *   - `bar` -> `{ key: 'bar', repeat: false, optional: false }`
 * @param param - The matched parameter to parse.
 * @returns The parsed parameter as a data structure.
 */ function parseMatchedParameter(param) {
    const optional = param.startsWith('[') && param.endsWith(']');
    if (optional) {
        param = param.slice(1, -1);
    }
    const repeat = param.startsWith('...');
    if (repeat) {
        param = param.slice(3);
    }
    return {
        key: param,
        repeat,
        optional
    };
} //# sourceMappingURL=get-dynamic-param.js.map


/***/ }),

/***/ 650:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ parsePath)
/* harmony export */ });
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ function parsePath(path) {
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

/***/ 654:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/**
 * This module is for next.js server internal usage of path module.
 * It will use native path module for nodejs runtime.
 * It will use path-browserify polyfill for edge runtime.
 */ let path;
if (true) {
    path = __webpack_require__(4042);
} else {}
module.exports = path; //# sourceMappingURL=path.js.map


/***/ }),

/***/ 709:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VD: () => (/* binding */ CloseController)
/* harmony export */ });
/* unused harmony exports trackBodyConsumed, trackStreamConsumed */
/** Monitor when the consumer finishes reading the response body.
that's as close as we can get to `res.on('close')` using web APIs.
*/ function trackBodyConsumed(body, onEnd) {
    if (typeof body === 'string') {
        const generator = async function* generate() {
            const encoder = new TextEncoder();
            yield encoder.encode(body);
            onEnd();
        };
        // @ts-expect-error BodyInit typings doesn't seem to include AsyncIterables even though it's supported in practice
        return generator();
    } else {
        return trackStreamConsumed(body, onEnd);
    }
}
function trackStreamConsumed(stream, onEnd) {
    // NOTE: This function must handle `stream` being aborted or cancelled,
    // so it can't just be this:
    //
    //   return stream.pipeThrough(new TransformStream({ flush() { onEnd() } }))
    //
    // because that doesn't handle cancellations.
    // (and cancellation handling via `Transformer.cancel` is only available in node >20)
    const dest = new TransformStream();
    const runOnEnd = ()=>onEnd();
    stream.pipeTo(dest.writable).then(runOnEnd, runOnEnd);
    return dest.readable;
}
class CloseController {
    onClose(callback) {
        if (this.isClosed) {
            throw Object.defineProperty(new Error('Cannot subscribe to a closed CloseController'), "__NEXT_ERROR_CODE", {
                value: "E365",
                enumerable: false,
                configurable: true
            });
        }
        this.target.addEventListener('close', callback);
        this.listeners++;
    }
    dispatchClose() {
        if (this.isClosed) {
            throw Object.defineProperty(new Error('Cannot close a CloseController multiple times'), "__NEXT_ERROR_CODE", {
                value: "E229",
                enumerable: false,
                configurable: true
            });
        }
        if (this.listeners > 0) {
            this.target.dispatchEvent(new Event('close'));
        }
        this.isClosed = true;
    }
    constructor(){
        this.target = new EventTarget();
        this.listeners = 0;
        this.isClosed = false;
    }
}

//# sourceMappingURL=web-on-close.js.map

/***/ }),

/***/ 808:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ensureLeadingSlash)
/* harmony export */ });
/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */ function ensureLeadingSlash(path) {
    return path.startsWith('/') ? path : `/${path}`;
} //# sourceMappingURL=ensure-leading-slash.js.map


/***/ }),

/***/ 860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ removeTrailingSlash)
/* harmony export */ });
/**
 * Removes the trailing slash for a given route or page path. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *
 * Uses charCodeAt (47 === '/') instead of regex to avoid the overhead of
 * compiling and executing a RegExp on every call (~3-5x faster).
 */ function removeTrailingSlash(route) {
    return route.charCodeAt(route.length - 1) === 47 && route.length > 1 ? route.slice(0, -1) : route;
} //# sourceMappingURL=remove-trailing-slash.js.map


/***/ }),

/***/ 953:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export RouteKind */
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({});

//# sourceMappingURL=route-kind.js.map

/***/ }),

/***/ 955:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _action_async_storage_instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2615);
// Share the instance module in the next-shared layer



//# sourceMappingURL=action-async-storage.external.js.map

/***/ }),

/***/ 1020:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports StaticGenBailoutError, isStaticGenBailoutError */
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
} //# sourceMappingURL=static-generation-bailout.js.map


/***/ }),

/***/ 1095:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export parseRelativeUrl */
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6214);


function parseRelativeUrl(url, base, parseQuery = true) {
    const globalBase = new URL( true ? 'http://n' : 0);
    const resolvedBase = base ? new URL(base, globalBase) : url.startsWith('.') ? new URL( true ? 'http://n' : 0) : globalBase;
    const { pathname, searchParams, search, hash, href, origin } = url.startsWith('/') ? // Not using `origin` to support other protocols
    new URL(`${resolvedBase.protocol}//${resolvedBase.host}${url}`) : new URL(url, resolvedBase);
    if (origin !== globalBase.origin) {
        throw Object.defineProperty(new Error(`invariant: invalid relative URL, router received ${url}`), "__NEXT_ERROR_CODE", {
            value: "E159",
            enumerable: false,
            configurable: true
        });
    }
    return {
        auth: null,
        host: null,
        hostname: null,
        pathname,
        port: null,
        protocol: null,
        query: parseQuery ? searchParamsToUrlQuery(searchParams) : undefined,
        search,
        hash,
        href: href.slice(origin.length),
        // We don't know for relative URLs at this point since we set a custom, internal
        // base that isn't surfaced to users.
        slashes: null
    };
} //# sourceMappingURL=parse-relative-url.js.map


/***/ }),

/***/ 1276:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AA: () => (/* binding */ NEXT_QUERY_PARAM_PREFIX),
/* harmony export */   EP: () => (/* binding */ NEXT_META_SUFFIX),
/* harmony export */   RM: () => (/* binding */ RSC_SUFFIX),
/* harmony export */   VC: () => (/* binding */ NEXT_CACHE_TAGS_HEADER),
/* harmony export */   c1: () => (/* binding */ NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER),
/* harmony export */   eM: () => (/* binding */ CACHE_ONE_YEAR_SECONDS),
/* harmony export */   gW: () => (/* binding */ NEXT_CACHE_IMPLICIT_TAG_ID),
/* harmony export */   h: () => (/* binding */ NEXT_INTERCEPTION_MARKER_PREFIX),
/* harmony export */   kz: () => (/* binding */ PRERENDER_REVALIDATE_HEADER),
/* harmony export */   mH: () => (/* binding */ RSC_SEGMENTS_DIR_SUFFIX),
/* harmony export */   r4: () => (/* binding */ PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER),
/* harmony export */   tz: () => (/* binding */ RSC_SEGMENT_SUFFIX),
/* harmony export */   vS: () => (/* binding */ NEXT_CACHE_REVALIDATED_TAGS_HEADER),
/* harmony export */   x3: () => (/* binding */ NEXT_DATA_SUFFIX)
/* harmony export */ });
/* unused harmony exports TEXT_PLAIN_CONTENT_TYPE_HEADER, HTML_CONTENT_TYPE_HEADER, JSON_CONTENT_TYPE_HEADER, MATCHED_PATH_HEADER, ACTION_SUFFIX, NEXT_BODY_SUFFIX, NEXT_NAV_DEPLOYMENT_ID_HEADER, NEXT_RESUME_HEADER, NEXT_RESUME_STATE_LENGTH_HEADER, NEXT_CACHE_TAG_MAX_ITEMS, NEXT_CACHE_TAG_MAX_LENGTH, NEXT_CACHE_SOFT_TAG_MAX_LENGTH, NEXT_CACHE_ROOT_PARAM_TAG_ID, INFINITE_CACHE, MIDDLEWARE_FILENAME, MIDDLEWARE_LOCATION_REGEXP, PROXY_FILENAME, PROXY_LOCATION_REGEXP, INSTRUMENTATION_HOOK_FILENAME, PAGES_DIR_ALIAS, DOT_NEXT_ALIAS, ROOT_DIR_ALIAS, APP_DIR_ALIAS, RSC_MOD_REF_PROXY_ALIAS, RSC_ACTION_VALIDATE_ALIAS, RSC_ACTION_PROXY_ALIAS, RSC_CACHE_WRAPPER_ALIAS, RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS, RSC_ACTION_ENCRYPTION_ALIAS, RSC_ACTION_CLIENT_WRAPPER_ALIAS, PUBLIC_DIR_MIDDLEWARE_CONFLICT, SSG_GET_INITIAL_PROPS_CONFLICT, SERVER_PROPS_GET_INIT_PROPS_CONFLICT, SERVER_PROPS_SSG_CONFLICT, STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR, SERVER_PROPS_EXPORT_ERROR, GSP_NO_RETURNED_VALUE, GSSP_NO_RETURNED_VALUE, UNSTABLE_REVALIDATE_RENAME_ERROR, GSSP_COMPONENT_MEMBER_ERROR, NON_STANDARD_NODE_ENV, SSG_FALLBACK_EXPORT_ERROR, ESLINT_DEFAULT_DIRS, SERVER_RUNTIME, WEB_SOCKET_MAX_RECONNECTIONS, WEBPACK_LAYERS, WEBPACK_RESOURCE_QUERIES */
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
// if these change make sure we update the related
// documentation as well
const NEXT_CACHE_TAG_MAX_ITEMS = 128;
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = '_N_T_';
const NEXT_CACHE_ROOT_PARAM_TAG_ID = '_N_RP_';
// in seconds
const CACHE_ONE_YEAR_SECONDS = 31536000;
// in seconds, represents revalidate=false. I.e. never revaliate.
// We use this value since it can be represented as a V8 SMI for optimal performance.
// It can also be serialized as JSON if it ever leaks accidentally as an actual value.
const INFINITE_CACHE = 0xfffffffe;
// Patterns to detect middleware files
const MIDDLEWARE_FILENAME = 'middleware';
const MIDDLEWARE_LOCATION_REGEXP = (/* unused pure expression or super */ null && (`(?:src/)?${MIDDLEWARE_FILENAME}`));
// Patterns to detect proxy files (replacement for middleware)
const PROXY_FILENAME = 'proxy';
const PROXY_LOCATION_REGEXP = (/* unused pure expression or super */ null && (`(?:src/)?${PROXY_FILENAME}`));
// Pattern to detect instrumentation hooks file
const INSTRUMENTATION_HOOK_FILENAME = 'instrumentation';
// Because on Windows absolute paths in the generated code can break because of numbers, eg 1 in the path,
// we have to use a private alias
const PAGES_DIR_ALIAS = 'private-next-pages';
const DOT_NEXT_ALIAS = 'private-dot-next';
const ROOT_DIR_ALIAS = 'private-next-root-dir';
const APP_DIR_ALIAS = 'private-next-app-dir';
const RSC_MOD_REF_PROXY_ALIAS = 'next/dist/build/webpack/loaders/next-flight-loader/module-proxy';
const RSC_ACTION_VALIDATE_ALIAS = 'private-next-rsc-action-validate';
const RSC_ACTION_PROXY_ALIAS = 'private-next-rsc-server-reference';
const RSC_CACHE_WRAPPER_ALIAS = 'private-next-rsc-cache-wrapper';
const RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS = 'private-next-rsc-track-dynamic-import';
const RSC_ACTION_ENCRYPTION_ALIAS = 'private-next-rsc-action-encryption';
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = 'private-next-rsc-action-client-wrapper';
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = (/* unused pure expression or super */ null && (`You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`));
const SSG_GET_INITIAL_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`));
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`));
const SERVER_PROPS_SSG_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`));
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = (/* unused pure expression or super */ null && (`can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`));
const SERVER_PROPS_EXPORT_ERROR = (/* unused pure expression or super */ null && (`pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`));
const GSP_NO_RETURNED_VALUE = 'Your `getStaticProps` function did not return an object. Did you forget to add a `return`?';
const GSSP_NO_RETURNED_VALUE = 'Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?';
const UNSTABLE_REVALIDATE_RENAME_ERROR = (/* unused pure expression or super */ null && ('The `unstable_revalidate` property is available for general use.\n' + 'Please use `revalidate` instead.'));
const GSSP_COMPONENT_MEMBER_ERROR = (/* unused pure expression or super */ null && (`can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`));
const NON_STANDARD_NODE_ENV = (/* unused pure expression or super */ null && (`You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`));
const SSG_FALLBACK_EXPORT_ERROR = (/* unused pure expression or super */ null && (`Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`));
const ESLINT_DEFAULT_DIRS = (/* unused pure expression or super */ null && ([
    'app',
    'pages',
    'components',
    'lib',
    'src'
]));
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

/***/ 1318:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(5356)["Buffer"];

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
    handleFetch: function() {
        return handleFetch;
    },
    interceptFetch: function() {
        return interceptFetch;
    },
    reader: function() {
        return reader;
    }
});
const _context = __webpack_require__(2643);
const reader = {
    url (req) {
        return req.url;
    },
    header (req, name) {
        return req.headers.get(name);
    }
};
function getTestStack() {
    let stack = (new Error().stack ?? '').split('\n');
    // Skip the first line and find first non-empty line.
    for(let i = 1; i < stack.length; i++){
        if (stack[i].length > 0) {
            stack = stack.slice(i);
            break;
        }
    }
    // Filter out franmework lines.
    stack = stack.filter((f)=>!f.includes('/next/dist/'));
    // At most 5 lines.
    stack = stack.slice(0, 5);
    // Cleanup some internal info and trim.
    stack = stack.map((s)=>s.replace('webpack-internal:///(rsc)/', '').trim());
    return stack.join('    ');
}
async function buildProxyRequest(testData, request) {
    const { url, method, headers, body, cache, credentials, integrity, mode, redirect, referrer, referrerPolicy } = request;
    return {
        testData,
        api: 'fetch',
        request: {
            url,
            method,
            headers: [
                ...Array.from(headers),
                [
                    'next-test-stack',
                    getTestStack()
                ]
            ],
            body: body ? Buffer.from(await request.arrayBuffer()).toString('base64') : null,
            cache,
            credentials,
            integrity,
            mode,
            redirect,
            referrer,
            referrerPolicy
        }
    };
}
function buildResponse(proxyResponse) {
    const { status, headers, body } = proxyResponse.response;
    return new Response(body ? Buffer.from(body, 'base64') : null, {
        status,
        headers: new Headers(headers)
    });
}
async function handleFetch(originalFetch, request) {
    const testInfo = (0, _context.getTestReqInfo)(request, reader);
    if (!testInfo) {
        // Passthrough non-test requests.
        return originalFetch(request);
    }
    const { testData, proxyPort } = testInfo;
    const proxyRequest = await buildProxyRequest(testData, request);
    const resp = await originalFetch(`http://localhost:${proxyPort}`, {
        method: 'POST',
        body: JSON.stringify(proxyRequest),
        // The header lets the ClientRequest interception in `httpget.ts` identify
        // this request as part of the test proxy protocol. @mswjs/interceptors
        // intercepts at the TCP level, so this request would otherwise be
        // intercepted again when it's sent from within an interception listener,
        // recursing indefinitely.
        headers: {
            'next-test-internal': '1'
        },
        next: {
            // @ts-ignore
            internal: true
        }
    });
    if (!resp.ok) {
        throw Object.defineProperty(new Error(`Proxy request failed: ${resp.status}`), "__NEXT_ERROR_CODE", {
            value: "E146",
            enumerable: false,
            configurable: true
        });
    }
    const proxyResponse = await resp.json();
    const { api } = proxyResponse;
    switch(api){
        case 'continue':
            return originalFetch(request);
        case 'abort':
        case 'unhandled':
            throw Object.defineProperty(new Error(`Proxy request aborted [${request.method} ${request.url}]`), "__NEXT_ERROR_CODE", {
                value: "E145",
                enumerable: false,
                configurable: true
            });
        case 'fetch':
            return buildResponse(proxyResponse);
        default:
            return api;
    }
}
function interceptFetch(originalFetch) {
    __webpack_require__.g.fetch = function testFetch(input, init) {
        var _init_next;
        // Passthrough internal requests.
        // @ts-ignore
        if (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) {
            return originalFetch(input, init);
        }
        return handleFetch(originalFetch, new Request(input, init));
    };
    return ()=>{
        __webpack_require__.g.fetch = originalFetch;
    };
}

//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ 1434:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l5: () => (/* binding */ getPreviouslyRevalidatedTags)
/* harmony export */ });
/* unused harmony exports normalizeCdnUrl, interpolateDynamicPath, normalizeDynamicRouteParams, getServerUtils */
/* harmony import */ var _shared_lib_i18n_normalize_locale_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(332);
/* harmony import */ var _shared_lib_router_utils_path_match__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7012);
/* harmony import */ var _shared_lib_router_utils_route_regex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4188);
/* harmony import */ var _shared_lib_router_utils_route_matcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1639);
/* harmony import */ var _shared_lib_router_utils_prepare_destination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5643);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1276);
/* harmony import */ var _web_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9535);
/* harmony import */ var _lib_url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2652);












function filterInternalQuery(query, paramKeys) {
    // this is used to pass query information in rewrites
    // but should not be exposed in final query
    delete query['nextInternalLocale'];
    for(const key in query){
        const isNextQueryPrefix = key !== NEXT_QUERY_PARAM_PREFIX && key.startsWith(NEXT_QUERY_PARAM_PREFIX);
        const isNextInterceptionMarkerPrefix = key !== NEXT_INTERCEPTION_MARKER_PREFIX && key.startsWith(NEXT_INTERCEPTION_MARKER_PREFIX);
        if (isNextQueryPrefix || isNextInterceptionMarkerPrefix || paramKeys.includes(key)) {
            delete query[key];
        }
    }
}
function normalizeCdnUrl(req, paramKeys) {
    // make sure to normalize req.url from CDNs to strip dynamic and rewrite
    // params from the query which are added during routing
    const _parsedUrl = parseReqUrl(req.url);
    // we can't normalize if we can't parse
    if (!_parsedUrl) {
        return req.url;
    }
    delete _parsedUrl.search;
    filterInternalQuery(_parsedUrl.query, paramKeys);
    req.url = formatUrl(_parsedUrl);
}
function interpolateDynamicPath(pathname, params, defaultRouteRegex) {
    if (!defaultRouteRegex) return pathname;
    for (const param of Object.keys(defaultRouteRegex.groups)){
        const { optional, repeat } = defaultRouteRegex.groups[param];
        let builtParam = `[${repeat ? '...' : ''}${param}]`;
        if (optional) {
            builtParam = `[${builtParam}]`;
        }
        let paramValue;
        const value = params[param];
        if (Array.isArray(value)) {
            paramValue = value.map((v)=>v && encodeURIComponent(v)).join('/');
        } else if (value) {
            paramValue = encodeURIComponent(value);
        } else {
            paramValue = '';
        }
        if (paramValue || optional) {
            pathname = pathname.replaceAll(builtParam, paramValue);
        }
    }
    return pathname;
}
function normalizeDynamicRouteParams(query, defaultRouteRegex, defaultRouteMatches, ignoreMissingOptional) {
    const isDefaultValueMatch = (candidateValue, defaultValue)=>{
        if (!candidateValue) {
            return false;
        }
        let normalizedCandidateValue = normalizeRscURL(candidateValue);
        for(let i = 0; i < 3; i++){
            if (normalizedCandidateValue === defaultValue) {
                return true;
            }
            const decodedCandidateValue = decodeQueryPathParameter(normalizedCandidateValue);
            if (decodedCandidateValue === normalizedCandidateValue) {
                break;
            }
            normalizedCandidateValue = decodedCandidateValue;
        }
        return false;
    };
    let hasValidParams = true;
    let params = {};
    for (const key of Object.keys(defaultRouteRegex.groups)){
        let value = query[key];
        if (typeof value === 'string') {
            value = normalizeRscURL(value);
        } else if (Array.isArray(value)) {
            value = value.map(normalizeRscURL);
        }
        // if the value matches the default value we can't rely
        // on the parsed params, this is used to signal if we need
        // to parse x-now-route-matches or not
        const defaultValue = defaultRouteMatches[key];
        const isOptional = defaultRouteRegex.groups[key].optional;
        const isDefaultValue = Array.isArray(defaultValue) ? defaultValue.some((defaultVal)=>{
            return Array.isArray(value) ? value.some((val)=>isDefaultValueMatch(val, defaultVal)) : isDefaultValueMatch(value, defaultVal);
        }) : Array.isArray(value) ? value.some((val)=>isDefaultValueMatch(val, defaultValue)) : isDefaultValueMatch(value, defaultValue);
        if (isDefaultValue || typeof value === 'undefined' && !(isOptional && ignoreMissingOptional)) {
            return {
                params: {},
                hasValidParams: false
            };
        }
        // non-provided optional values should be undefined so normalize
        // them to undefined
        if (isOptional && (!value || Array.isArray(value) && value.length === 1 && // fallback optional catch-all SSG pages have
        // [[...paramName]] for the root path on Vercel
        (value[0] === 'index' || value[0] === `[[...${key}]]`) || value === 'index' || value === `[[...${key}]]`)) {
            value = undefined;
            delete query[key];
        }
        // query values from the proxy aren't already split into arrays
        // so make sure to normalize catch-all values
        if (value && typeof value === 'string' && defaultRouteRegex.groups[key].repeat) {
            value = value.split('/');
        }
        if (value) {
            params[key] = value;
        }
    }
    return {
        params,
        hasValidParams
    };
}
function getServerUtils({ page, i18n, basePath, rewrites, pageIsDynamic, trailingSlash, caseSensitive }) {
    let defaultRouteRegex;
    let dynamicRouteMatcher;
    let defaultRouteMatches;
    if (pageIsDynamic) {
        defaultRouteRegex = getNamedRouteRegex(page, {
            prefixRouteKeys: false
        });
        dynamicRouteMatcher = getRouteMatcher(defaultRouteRegex);
        defaultRouteMatches = dynamicRouteMatcher(page);
    }
    function handleRewrites(req, parsedUrl) {
        // Here we deep clone the parsedUrl to avoid mutating the original. We also
        // cast this to a mutable type so we can mutate it within this scope.
        const rewrittenParsedUrl = structuredClone(parsedUrl);
        const rewriteParams = {};
        let fsPathname = rewrittenParsedUrl.pathname;
        const matchesPage = ()=>{
            const fsPathnameNoSlash = removeTrailingSlash(fsPathname || '');
            return fsPathnameNoSlash === removeTrailingSlash(page) || (dynamicRouteMatcher == null ? void 0 : dynamicRouteMatcher(fsPathnameNoSlash));
        };
        const checkRewrite = (rewrite)=>{
            const matcher = getPathMatch(rewrite.source + (trailingSlash ? '(/)?' : ''), {
                removeUnnamedParams: true,
                strict: true,
                sensitive: !!caseSensitive
            });
            if (!rewrittenParsedUrl.pathname) return false;
            let params = matcher(rewrittenParsedUrl.pathname);
            if ((rewrite.has || rewrite.missing) && params) {
                const hasParams = matchHas(req, rewrittenParsedUrl.query, rewrite.has, rewrite.missing);
                if (hasParams) {
                    Object.assign(params, hasParams);
                } else {
                    params = false;
                }
            }
            if (params) {
                const { parsedDestination, destQuery } = prepareDestination({
                    appendParamsToQuery: true,
                    destination: rewrite.destination,
                    params: params,
                    query: rewrittenParsedUrl.query
                });
                // if the rewrite destination is external break rewrite chain
                if (parsedDestination.protocol) {
                    return true;
                }
                Object.assign(rewriteParams, destQuery, params);
                Object.assign(rewrittenParsedUrl.query, parsedDestination.query);
                delete parsedDestination.query;
                Object.assign(rewrittenParsedUrl, parsedDestination);
                fsPathname = rewrittenParsedUrl.pathname;
                if (!fsPathname) return false;
                if (basePath) {
                    fsPathname = fsPathname.replace(new RegExp(`^${basePath}`), '') || '/';
                }
                if (i18n) {
                    const result = normalizeLocalePath(fsPathname, i18n.locales);
                    fsPathname = result.pathname;
                    rewrittenParsedUrl.query.nextInternalLocale = result.detectedLocale || params.nextInternalLocale;
                }
                if (fsPathname === page) {
                    return true;
                }
                if (pageIsDynamic && dynamicRouteMatcher) {
                    const dynamicParams = dynamicRouteMatcher(fsPathname);
                    if (dynamicParams) {
                        rewrittenParsedUrl.query = {
                            ...rewrittenParsedUrl.query,
                            ...dynamicParams
                        };
                        return true;
                    }
                }
            }
            return false;
        };
        for (const rewrite of rewrites.beforeFiles || []){
            checkRewrite(rewrite);
        }
        if (fsPathname !== page) {
            let finished = false;
            for (const rewrite of rewrites.afterFiles || []){
                finished = checkRewrite(rewrite);
                if (finished) break;
            }
            if (!finished && !matchesPage()) {
                for (const rewrite of rewrites.fallback || []){
                    finished = checkRewrite(rewrite);
                    if (finished) break;
                }
            }
        }
        return {
            rewriteParams,
            rewrittenParsedUrl
        };
    }
    function getParamsFromRouteMatches(routeMatchesHeader) {
        // If we don't have a default route regex, we can't get params from route
        // matches
        if (!defaultRouteRegex) return null;
        const { groups, routeKeys } = defaultRouteRegex;
        const matcher = getRouteMatcher({
            re: {
                // Simulate a RegExp match from the \`req.url\` input
                exec: (str)=>{
                    // Normalize all the prefixed query params.
                    const obj = Object.fromEntries(new URLSearchParams(str));
                    for (const [key, value] of Object.entries(obj)){
                        const normalizedKey = normalizeNextQueryParam(key);
                        if (!normalizedKey) continue;
                        obj[normalizedKey] = value;
                        delete obj[key];
                    }
                    // Use all the named route keys.
                    const result = {};
                    for (const keyName of Object.keys(routeKeys)){
                        const paramName = routeKeys[keyName];
                        // If this param name is not a valid parameter name, then skip it.
                        if (!paramName) continue;
                        const group = groups[paramName];
                        const value = obj[keyName];
                        // When we're missing a required param, we can't match the route.
                        if (!group.optional && !value) return null;
                        result[group.pos] = value;
                    }
                    return result;
                }
            },
            groups
        });
        const routeMatches = matcher(routeMatchesHeader);
        if (!routeMatches) return null;
        return routeMatches;
    }
    function normalizeQueryParams(query, routeParamKeys) {
        // this is used to pass query information in rewrites
        // but should not be exposed in final query
        delete query['nextInternalLocale'];
        for (const [key, value] of Object.entries(query)){
            const normalizedKey = normalizeNextQueryParam(key);
            if (!normalizedKey) continue;
            // Remove the prefixed key from the query params because we want
            // to consume it for the dynamic route matcher.
            delete query[key];
            routeParamKeys.add(normalizedKey);
            if (typeof value === 'undefined') continue;
            query[normalizedKey] = Array.isArray(value) ? value.map((v)=>decodeQueryPathParameter(v)) : decodeQueryPathParameter(value);
        }
    }
    return {
        handleRewrites,
        defaultRouteRegex,
        dynamicRouteMatcher,
        defaultRouteMatches,
        normalizeQueryParams,
        getParamsFromRouteMatches,
        /**
     * Normalize dynamic route params.
     *
     * @param query - The query params to normalize.
     * @param ignoreMissingOptional - Whether to ignore missing optional params.
     * @returns The normalized params and whether they are valid.
     */ normalizeDynamicRouteParams: (query, ignoreMissingOptional)=>{
            if (!defaultRouteRegex || !defaultRouteMatches) {
                return {
                    params: {},
                    hasValidParams: false
                };
            }
            return normalizeDynamicRouteParams(query, defaultRouteRegex, defaultRouteMatches, ignoreMissingOptional);
        },
        normalizeCdnUrl: (req, paramKeys)=>normalizeCdnUrl(req, paramKeys),
        interpolateDynamicPath: (pathname, params)=>interpolateDynamicPath(pathname, params, defaultRouteRegex),
        filterInternalQuery: (query, paramKeys)=>filterInternalQuery(query, paramKeys)
    };
}
function getPreviouslyRevalidatedTags(headers, previewModeId) {
    return typeof headers[_lib_constants__WEBPACK_IMPORTED_MODULE_5__/* .NEXT_CACHE_REVALIDATED_TAGS_HEADER */ .vS] === 'string' && headers[_lib_constants__WEBPACK_IMPORTED_MODULE_5__/* .NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER */ .c1] === previewModeId ? headers[_lib_constants__WEBPACK_IMPORTED_MODULE_5__/* .NEXT_CACHE_REVALIDATED_TAGS_HEADER */ .vS].split(',') : [];
}

//# sourceMappingURL=server-utils.js.map

/***/ }),

/***/ 1520:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ InvariantError)
/* harmony export */ });
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

/***/ 1558:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ parseRelativeURL),
/* harmony export */   W: () => (/* binding */ getRelativeURL)
/* harmony export */ });
/**
 * The result of parsing a URL relative to a base URL.
 */ function parseRelativeURL(url, base) {
    const baseURL = typeof base === 'string' ? new URL(base) : base;
    const relative = new URL(url, base);
    // The URL is relative if the origin is the same as the base URL.
    const isRelative = relative.origin === baseURL.origin;
    return {
        url: isRelative ? relative.toString().slice(baseURL.origin.length) : relative.toString(),
        isRelative
    };
}
/**
 * Given a URL as a string and a base URL it will make the URL relative
 * if the parsed protocol and host is the same as the one in the base
 * URL. Otherwise it returns the same URL string.
 */ function getRelativeURL(url, base) {
    const relative = parseRelativeURL(url, base);
    return relative.url;
} //# sourceMappingURL=relativize-url.js.map


/***/ }),

/***/ 1639:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export getRouteMatcher */
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6214);
/* harmony import */ var _route_match_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8814);


function getRouteMatcher({ re, groups }) {
    const rawMatcher = (pathname)=>{
        const routeMatch = re.exec(pathname);
        if (!routeMatch) return false;
        const decode = (param)=>{
            try {
                return decodeURIComponent(param);
            } catch  {
                throw Object.defineProperty(new DecodeError('failed to decode param'), "__NEXT_ERROR_CODE", {
                    value: "E528",
                    enumerable: false,
                    configurable: true
                });
            }
        };
        const params = {};
        for (const [key, group] of Object.entries(groups)){
            const match = routeMatch[group.pos];
            if (match !== undefined) {
                if (group.repeat) {
                    params[key] = match.split('/').map((entry)=>decode(entry));
                } else {
                    params[key] = decode(match);
                }
            }
        }
        return params;
    };
    // Wrap with safe matcher to handle parameter cleaning
    return safeRouteMatcher(rawMatcher);
} //# sourceMappingURL=route-matcher.js.map


/***/ }),

/***/ 2058:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   xl: () => (/* binding */ createAsyncLocalStorage)
/* harmony export */ });
/* unused harmony exports bindSnapshot, createSnapshot */
const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available'), "__NEXT_ERROR_CODE", {
    value: "E504",
    enumerable: false,
    configurable: true
});
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    static bind(fn) {
        return fn;
    }
}
const maybeGlobalAsyncLocalStorage = typeof globalThis !== 'undefined' && globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
}
function bindSnapshot(// WARNING: Don't pass a named function to this argument! See: https://github.com/facebook/react/pull/34911
fn) {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.bind(fn);
    }
    return FakeAsyncLocalStorage.bind(fn);
}
function createSnapshot() {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.snapshot();
    }
    return function(fn, ...args) {
        return fn(...args);
    };
}

//# sourceMappingURL=async-local-storage.js.map

/***/ }),

/***/ 2086:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TU: () => (/* binding */ pipeNodeReadableToNodeResponse),
/* harmony export */   p$: () => (/* binding */ pipeToNodeResponse),
/* harmony export */   zf: () => (/* binding */ isAbortError)
/* harmony export */ });
/* harmony import */ var _web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2266);
/* harmony import */ var _lib_detached_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9113);
/* harmony import */ var _lib_trace_tracer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5342);
/* harmony import */ var _lib_trace_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4738);
/* harmony import */ var _client_component_renderer_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8053);





function isAbortError(e) {
    return (e == null ? void 0 : e.name) === 'AbortError' || (e == null ? void 0 : e.name) === _web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_0__/* .ResponseAbortedName */ .iL;
}
const HAS_CLIENT_COMPONENT_METRICS_ENABLED = 'performance' in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
function createWriterFromResponse(res, waitUntilForEnd) {
    let started = false;
    // Create a promise that will resolve once the response has drained. See
    // https://nodejs.org/api/stream.html#stream_event_drain
    let drained = new _lib_detached_promise__WEBPACK_IMPORTED_MODULE_3__/* .DetachedPromise */ .q();
    function onDrain() {
        drained.resolve();
    }
    res.on('drain', onDrain);
    // If the finish event fires, it means we shouldn't block and wait for the
    // drain event.
    res.once('close', ()=>{
        res.off('drain', onDrain);
        drained.resolve();
    });
    // Create a promise that will resolve once the response has finished. See
    // https://nodejs.org/api/http.html#event-finish_1
    const finished = new _lib_detached_promise__WEBPACK_IMPORTED_MODULE_3__/* .DetachedPromise */ .q();
    res.once('finish', ()=>{
        finished.resolve();
    });
    // Create a writable stream that will write to the response.
    return new WritableStream({
        write: async (chunk)=>{
            // You'd think we'd want to use `start` instead of placing this in `write`
            // but this ensures that we don't actually flush the headers until we've
            // started writing chunks.
            if (!started) {
                started = true;
                if (HAS_CLIENT_COMPONENT_METRICS_ENABLED) {
                    const metrics = (0,_client_component_renderer_logger__WEBPACK_IMPORTED_MODULE_4__/* .getClientComponentLoaderMetrics */ .J)();
                    if (metrics) {
                        performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, {
                            start: metrics.clientComponentLoadStart,
                            end: metrics.clientComponentLoadStart + metrics.clientComponentLoadTimes
                        });
                    }
                }
                res.flushHeaders();
                (0,_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_1__/* .getTracer */ .EK)().trace(_lib_trace_constants__WEBPACK_IMPORTED_MODULE_2__/* .NextNodeServerSpan */ .Fx.startResponse, {
                    spanName: 'start response'
                }, ()=>undefined);
            }
            try {
                const ok = res.write(chunk);
                // Added by the `compression` middleware, this is a function that will
                // flush the partially-compressed response to the client.
                if ('flush' in res && typeof res.flush === 'function') {
                    res.flush();
                }
                // If the write returns false, it means there's some backpressure, so
                // wait until it's streamed before continuing.
                if (!ok) {
                    await drained.promise;
                    // Reset the drained promise so that we can wait for the next drain event.
                    drained = new _lib_detached_promise__WEBPACK_IMPORTED_MODULE_3__/* .DetachedPromise */ .q();
                }
            } catch (err) {
                res.end();
                throw Object.defineProperty(new Error('failed to write chunk to response', {
                    cause: err
                }), "__NEXT_ERROR_CODE", {
                    value: "E321",
                    enumerable: false,
                    configurable: true
                });
            }
        },
        abort: (err)=>{
            if (res.writableFinished) return;
            res.destroy(err);
        },
        close: async ()=>{
            // if a waitUntil promise was passed, wait for it to resolve before
            // ending the response.
            if (waitUntilForEnd) {
                await waitUntilForEnd;
            }
            if (res.writableFinished) return;
            res.end();
            return finished.promise;
        }
    });
}
async function pipeToNodeResponse(readable, res, waitUntilForEnd) {
    try {
        // If the response has already errored, then just return now.
        const { errored, destroyed } = res;
        if (errored || destroyed) return;
        // Create a new AbortController so that we can abort the readable if the
        // client disconnects.
        const controller = (0,_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_0__/* .createAbortController */ .Vy)(res);
        const writer = createWriterFromResponse(res, waitUntilForEnd);
        await readable.pipeTo(writer, {
            signal: controller.signal
        });
    } catch (err) {
        // If this isn't related to an abort error, re-throw it.
        if (isAbortError(err)) return;
        throw Object.defineProperty(new Error('failed to pipe response', {
            cause: err
        }), "__NEXT_ERROR_CODE", {
            value: "E180",
            enumerable: false,
            configurable: true
        });
    }
}
async function pipeNodeReadableToNodeResponse(readable, res, waitUntilForEnd) {
    try {
        const { errored, destroyed } = res;
        if (errored || destroyed) return;
        let started = false;
        const finished = new _lib_detached_promise__WEBPACK_IMPORTED_MODULE_3__/* .DetachedPromise */ .q();
        res.once('close', ()=>{
            readable.destroy();
            finished.resolve();
        });
        readable.on('data', (chunk)=>{
            if (!started) {
                started = true;
                if ('performance' in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                    const metrics = (0,_client_component_renderer_logger__WEBPACK_IMPORTED_MODULE_4__/* .getClientComponentLoaderMetrics */ .J)();
                    if (metrics) {
                        performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, {
                            start: metrics.clientComponentLoadStart,
                            end: metrics.clientComponentLoadStart + metrics.clientComponentLoadTimes
                        });
                    }
                }
                res.flushHeaders();
                (0,_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_1__/* .getTracer */ .EK)().trace(_lib_trace_constants__WEBPACK_IMPORTED_MODULE_2__/* .NextNodeServerSpan */ .Fx.startResponse, {
                    spanName: 'start response'
                }, ()=>undefined);
            }
            const ok = res.write(chunk);
            if ('flush' in res && typeof res.flush === 'function') {
                res.flush();
            }
            if (!ok) {
                readable.pause();
                res.once('drain', ()=>{
                    readable.resume();
                });
            }
        });
        readable.on('end', async ()=>{
            if (waitUntilForEnd) {
                await waitUntilForEnd;
            }
            if (!res.writableFinished) {
                res.end();
            }
            finished.resolve();
        });
        readable.on('error', (err)=>{
            if (isAbortError(err)) {
                finished.resolve();
                return;
            }
            res.destroy(err);
            finished.resolve();
        });
        await finished.promise;
    } catch (err) {
        if (isAbortError(err)) return;
        throw Object.defineProperty(new Error('failed to pipe response', {
            cause: err
        }), "__NEXT_ERROR_CODE", {
            value: "E180",
            enumerable: false,
            configurable: true
        });
    }
}

//# sourceMappingURL=pipe-readable.js.map

/***/ }),

/***/ 2165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export connection */
/* harmony import */ var _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2736);
/* harmony import */ var _app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2381);
/* harmony import */ var _app_render_dynamic_rendering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3256);
/* harmony import */ var _client_components_static_generation_bailout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1020);
/* harmony import */ var _dynamic_rendering_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9743);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6930);
/* harmony import */ var _app_render_staged_rendering__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5507);
/* harmony import */ var _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1520);









/**
 * This function allows you to indicate that you require an actual user Request before continuing.
 *
 * During prerendering it will never resolve and during rendering it resolves immediately.
 */ function connection() {
    const callingExpression = 'connection';
    const workStore = workAsyncStorage.getStore();
    const workUnitStore = workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && !isRequestApiAllowedInCurrentPhase(workUnitStore)) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside \`after()\` while rendering. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but \`after()\` executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E1377",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic, we override all other logic and always just
            // return a resolving promise without tracking.
            return Promise.resolve(undefined);
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E847",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'cache':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual request, but caches must be able to be produced before a request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E841",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, connection);
                        applyOwnerStack(error);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'private-cache':
                    {
                        // It might not be intuitive to throw for private caches as well, but
                        // we don't consider runtime prefetches as "actual requests" (in the
                        // navigation sense), despite allowing them to read cookies.
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside "use cache: private". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual navigation request, but caches must be able to be produced before a navigation request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E837",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, connection);
                        applyOwnerStack(error);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'unstable-cache':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside a function cached with \`unstable_cache()\`. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                        value: "E840",
                        enumerable: false,
                        configurable: true
                    });
                case 'generate-static-params':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
                        value: "E1125",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender':
                case 'prerender-client':
                case 'prerender-runtime':
                    // We return a promise that never resolves to allow the prerender to
                    // stall at this point.
                    return makeDynamicHangingPromise(workUnitStore.renderSignal, workStore.route, '`connection()`');
                case 'validation-client':
                    {
                        // TODO(NAR-789): make this consistent with the actual browser behavior when we change it.
                        // Until then, erroring is fine.
                        const exportName = '`connection`';
                        throw Object.defineProperty(new InvariantError(`${exportName} must not be used within a Client Component. Next.js should be preventing ${exportName} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                            value: "E1063",
                            enumerable: false,
                            configurable: true
                        });
                    }
                case 'prerender-ppr':
                    // We use React's postpone API to interrupt rendering here to create a
                    // dynamic hole
                    return postponeWithTracking(workStore.route, 'connection', workUnitStore.dynamicTracking);
                case 'prerender-legacy':
                    // We throw an error here to interrupt prerendering to mark the route
                    // as dynamic
                    return throwToInterruptStaticGeneration('connection', workStore, workUnitStore);
                case 'request':
                    trackDynamicDataInDynamicRender(workUnitStore);
                    if (false) {} else if (workUnitStore.asyncApiPromises) {
                        return workUnitStore.asyncApiPromises.connection;
                    } else {
                        return Promise.resolve(undefined);
                    }
                default:
                    workUnitStore;
            }
        }
    }
    // If we end up here, there was no work store or work unit store present.
    // TODO(NAR-789): connection() is not currently statically prevented from being imported in client components,
    // so we always error about a missing work unit store.
    throwForMissingRequestStore(callingExpression);
} //# sourceMappingURL=connection.js.map


/***/ }),

/***/ 2193:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ NextURL)
/* harmony export */ });
/* harmony import */ var _shared_lib_i18n_detect_domain_locale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9891);
/* harmony import */ var _shared_lib_router_utils_format_next_pathname_info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9414);
/* harmony import */ var _shared_lib_get_hostname__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9503);
/* harmony import */ var _shared_lib_router_utils_get_next_pathname_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4745);




const REGEX_LOCALHOST_HOSTNAME = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
function parseURL(url, base) {
    const parsed = new URL(String(url), base && String(base));
    if (REGEX_LOCALHOST_HOSTNAME.test(parsed.hostname)) {
        parsed.hostname = 'localhost';
    }
    return parsed;
}
const Internal = Symbol('NextURLInternal');
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === 'object' && 'pathname' in baseOrOpts || typeof baseOrOpts === 'string') {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ''
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = (0,_shared_lib_router_utils_get_next_pathname_info__WEBPACK_IMPORTED_MODULE_0__/* .getNextPathnameInfo */ .e)(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !undefined,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = (0,_shared_lib_get_hostname__WEBPACK_IMPORTED_MODULE_1__/* .getHostname */ .E)(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0,_shared_lib_i18n_detect_domain_locale__WEBPACK_IMPORTED_MODULE_2__/* .detectDomainLocale */ .C)((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? '';
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return (0,_shared_lib_router_utils_format_next_pathname_info__WEBPACK_IMPORTED_MODULE_3__/* .formatNextPathnameInfo */ .V)({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? '';
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${locale}"`), "__NEXT_ERROR_CODE", {
                value: "E597",
                enumerable: false,
                configurable: true
            });
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith('/') ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
}

//# sourceMappingURL=next-url.js.map

/***/ }),

/***/ 2196:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export ENCODED_TAGS */
const ENCODED_TAGS = {
    // opening tags do not have the closing `>` since they can contain other attributes such as `<body className=''>`
    OPENING: {
        // <html
        HTML: new Uint8Array([
            60,
            104,
            116,
            109,
            108
        ]),
        // <head
        HEAD: new Uint8Array([
            60,
            104,
            101,
            97,
            100
        ]),
        // <body
        BODY: new Uint8Array([
            60,
            98,
            111,
            100,
            121
        ])
    },
    CLOSED: {
        // </head>
        HEAD: new Uint8Array([
            60,
            47,
            104,
            101,
            97,
            100,
            62
        ]),
        // </body>
        BODY: new Uint8Array([
            60,
            47,
            98,
            111,
            100,
            121,
            62
        ]),
        // </html>
        HTML: new Uint8Array([
            60,
            47,
            104,
            116,
            109,
            108,
            62
        ]),
        // </body></html>
        BODY_AND_HTML: new Uint8Array([
            60,
            47,
            98,
            111,
            100,
            121,
            62,
            60,
            47,
            104,
            116,
            109,
            108,
            62
        ])
    },
    META: {
        // Only the match the prefix cause the suffix can be different wether it's xml compatible or not ">" or "/>"
        // <meta name="«nxt-icon»"
        // This is a special mark that will be replaced by the icon insertion script tag.
        ICON_MARK: new Uint8Array([
            60,
            109,
            101,
            116,
            97,
            32,
            110,
            97,
            109,
            101,
            61,
            34,
            194,
            171,
            110,
            120,
            116,
            45,
            105,
            99,
            111,
            110,
            194,
            187,
            34
        ])
    }
};

//# sourceMappingURL=encoded-tags.js.map

/***/ }),

/***/ 2223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ workUnitAsyncStorageInstance)
/* harmony export */ });
/* harmony import */ var _async_local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2058);

const workUnitAsyncStorageInstance = (0,_async_local_storage__WEBPACK_IMPORTED_MODULE_0__/* .createAsyncLocalStorage */ .xl)();

//# sourceMappingURL=work-unit-async-storage-instance.js.map

/***/ }),

/***/ 2266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vy: () => (/* binding */ createAbortController),
/* harmony export */   iL: () => (/* binding */ ResponseAbortedName)
/* harmony export */ });
/* unused harmony exports ResponseAborted, signalFromNodeResponse, NextRequestAdapter */
/* harmony import */ var _request_meta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8368);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9535);
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4133);




const ResponseAbortedName = 'ResponseAborted';
class ResponseAborted extends Error {
    constructor(...args){
        super(...args), this.name = ResponseAbortedName;
    }
}
/**
 * Creates an AbortController tied to the closing of a ServerResponse (or other
 * appropriate Writable).
 *
 * If the `close` event is fired before the `finish` event, then we'll send the
 * `abort` signal.
 */ function createAbortController(response) {
    const controller = new AbortController();
    // If `finish` fires first, then `res.end()` has been called and the close is
    // just us finishing the stream on our side. If `close` fires first, then we
    // know the client disconnected before we finished.
    response.once('close', ()=>{
        if (response.writableFinished) return;
        controller.abort(new ResponseAborted());
    });
    return controller;
}
/**
 * Creates an AbortSignal tied to the closing of a ServerResponse (or other
 * appropriate Writable).
 *
 * This cannot be done with the request (IncomingMessage or Readable) because
 * the `abort` event will not fire if to data has been fully read (because that
 * will "close" the readable stream and nothing fires after that).
 */ function signalFromNodeResponse(response) {
    const { errored, destroyed } = response;
    if (errored || destroyed) {
        return AbortSignal.abort(errored ?? new ResponseAborted());
    }
    const { signal } = createAbortController(response);
    return signal;
}
class NextRequestAdapter {
    static fromBaseNextRequest(request, signal) {
        if (// The type check here ensures that `req` is correctly typed, and the
        // environment variable check provides dead code elimination.
         true && isWebNextRequest(request)) {
            return NextRequestAdapter.fromWebNextRequest(request);
        } else if (// The type check here ensures that `req` is correctly typed, and the
        // environment variable check provides dead code elimination.
        false) {} else {
            throw Object.defineProperty(new Error('Invariant: Unsupported NextRequest type'), "__NEXT_ERROR_CODE", {
                value: "E345",
                enumerable: false,
                configurable: true
            });
        }
    }
    static fromNodeNextRequest(request, signal) {
        // HEAD and GET requests can not have a body.
        let body = null;
        if (request.method !== 'GET' && request.method !== 'HEAD' && request.body) {
            // @ts-expect-error - this is handled by undici, when streams/web land use it instead
            body = request.body;
        }
        let url;
        if (request.url.startsWith('http')) {
            url = new URL(request.url);
        } else {
            // Grab the full URL from the request metadata.
            const base = getRequestMeta(request, 'initURL');
            if (!base || !base.startsWith('http')) {
                // Because the URL construction relies on the fact that the URL provided
                // is absolute, we need to provide a base URL. We can't use the request
                // URL because it's relative, so we use a dummy URL instead.
                url = new URL(request.url, 'http://n');
            } else {
                url = new URL(request.url, base);
            }
        }
        return new NextRequest(url, {
            method: request.method,
            headers: fromNodeOutgoingHttpHeaders(request.headers),
            duplex: 'half',
            signal,
            // geo
            // ip
            // nextConfig
            // body can not be passed if request was aborted
            // or we get a Request body was disturbed error
            ...signal.aborted ? {} : {
                body
            }
        });
    }
    static fromWebNextRequest(request) {
        // HEAD and GET requests can not have a body.
        let body = null;
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            body = request.body;
        }
        return new NextRequest(request.url, {
            method: request.method,
            headers: fromNodeOutgoingHttpHeaders(request.headers),
            duplex: 'half',
            signal: request.request.signal,
            // geo
            // ip
            // nextConfig
            // body can not be passed if request was aborted
            // or we get a Request body was disturbed error
            ...request.request.signal.aborted ? {} : {
                body
            }
        });
    }
}

//# sourceMappingURL=next-request.js.map

/***/ }),

/***/ 2361:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ encodeHeaderSafe)
/* harmony export */ });
/**
 * Percent-encode every character other than horizontal tab and printable ASCII
 * so a value can be safely serialized into an HTTP header.
 *
 * Node's `validateHeaderValue` and `fetch`'s ByteString conversion accept
 * different character ranges. Restricting values to `\t\x20-\x7e` produces a
 * conservative representation that both can serialize. Characters outside a
 * transport's accepted range (Hebrew, Arabic, Chinese, emoji, …) would
 * otherwise throw `ERR_INVALID_CHAR` or a `TypeError`, which crashes ISR or
 * fails a cache read on every affected request.
 *
 * Cache tags are encoded at the public boundaries — tag construction
 * (`getImplicitTags`, `validateTags`) and invalidation input
 * (`revalidatePath`, `revalidateTag`, `updateTag`) — so storage, comparison,
 * and the wire all see the same canonical form.
 *
 * The class is narrower than either transport accepts. Everything inside it
 * passes through byte-for-byte, including `,`, `/`, `%`, `[`, `]`, `_`, `-` and
 * `\t`, which preserves the comma-separated header format and the
 * dynamic-segment markers in derived tags (`_N_T_/[slug]/page`).
 *
 * Properties:
 * - Fast-path: input that already fits the class is returned unchanged. This
 *   makes the encoder idempotent on already-encoded `%xx` sequences.
 * - Matches *runs* of out-of-class code units so surrogate pairs (e.g. an
 *   emoji) are handed to `encodeURIComponent` as a complete code point — a
 *   per-code-unit regex would split the pair and throw `URIError`.
 */ const OUT_OF_CLASS_CHAR = /[^\t\x20-\x7e]/;
const OUT_OF_CLASS_RUN = /[^\t\x20-\x7e]+/g;
function encodeHeaderSafe(value) {
    return OUT_OF_CLASS_CHAR.test(value) ? value.replace(OUT_OF_CLASS_RUN, (run)=>encodeURIComponent(run)) : value;
}

//# sourceMappingURL=encode-header-safe.js.map

/***/ }),

/***/ 2381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FP: () => (/* reexport safe */ _work_unit_async_storage_instance__WEBPACK_IMPORTED_MODULE_0__.e),
/* harmony export */   Kr: () => (/* binding */ getResumeDataCache)
/* harmony export */ });
/* unused harmony exports throwForMissingRequestStore, throwInvariantForMissingStore, getHmrRefreshHash, isHmrRefresh, getServerComponentsHmrCache, getDraftModeProviderForCacheScope, getStagedRenderingController, getCacheSignal, getVaryParamsAccumulator */
/* harmony import */ var _work_unit_async_storage_instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2223);
/* harmony import */ var _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6446);
// Share the instance module in the next-shared layer



function throwForMissingRequestStore(callingExpression) {
    throw Object.defineProperty(new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
        value: "E251",
        enumerable: false,
        configurable: true
    });
}
function throwInvariantForMissingStore() {
    throw Object.defineProperty(new InvariantError('Expected workUnitAsyncStorage to have a store.'), "__NEXT_ERROR_CODE", {
        value: "E696",
        enumerable: false,
        configurable: true
    });
}
/**
 * Returns the resume data cache for the given work unit store, regardless of
 * whether it is mutable (`PrerenderResumeDataCache`) or read-only
 * (`RenderResumeDataCache`). Use `resumeDataCache.mutable` to narrow.
 */ function getResumeDataCache(workUnitStore) {
    switch(workUnitStore.type){
        case 'request':
        case 'prerender':
        case 'prerender-runtime':
        case 'prerender-client':
        case 'validation-client':
        case 'prerender-ppr':
            return workUnitStore.resumeDataCache;
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'prerender-legacy':
        case 'generate-static-params':
            return null;
        default:
            return workUnitStore;
    }
}
function getHmrRefreshHash(workUnitStore) {
    if (false) {}
    return undefined;
}
function isHmrRefresh(workUnitStore) {
    if (false) {}
    return false;
}
function getServerComponentsHmrCache(workUnitStore) {
    if (false) {}
    return undefined;
}
/**
 * Returns a draft mode provider only if draft mode is enabled.
 */ function getDraftModeProviderForCacheScope(workStore, workUnitStore) {
    if (workStore.isDraftMode) {
        switch(workUnitStore.type){
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
            case 'prerender-runtime':
            case 'request':
                return workUnitStore.draftMode;
            case 'prerender':
            case 'prerender-client':
            case 'validation-client':
            case 'prerender-ppr':
            case 'prerender-legacy':
            case 'generate-static-params':
                break;
            default:
                workUnitStore;
        }
    }
    return undefined;
}
function getStagedRenderingController(workUnitStore) {
    switch(workUnitStore.type){
        case 'request':
        case 'prerender-runtime':
        case 'prerender':
            return workUnitStore.stagedRendering ?? null;
        case 'prerender-client':
        case 'validation-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
            return null;
        default:
            return workUnitStore;
    }
}
function getCacheSignal(workUnitStore) {
    switch(workUnitStore.type){
        case 'prerender':
        case 'prerender-client':
        case 'validation-client':
        case 'prerender-runtime':
            return workUnitStore.cacheSignal;
        case 'request':
            {
                // In dev, we might fill caches even during a dynamic request.
                if (workUnitStore.cacheSignal) {
                    return workUnitStore.cacheSignal;
                }
            // fallthrough
            }
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
            return null;
        default:
            return workUnitStore;
    }
}
function getVaryParamsAccumulator(workUnitStore) {
    switch(workUnitStore.type){
        case 'prerender':
        case 'prerender-runtime':
        case 'request':
            {
                return workUnitStore.varyParamsAccumulator ?? null;
            }
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'cache':
        case 'private-cache':
        case 'prerender-client':
        case 'validation-client':
        case 'unstable-cache':
        case 'generate-static-params':
            return null;
        default:
            workUnitStore;
            return null;
    }
}

//# sourceMappingURL=work-unit-async-storage.external.js.map

/***/ }),

/***/ 2401:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ LRUCache)
/* harmony export */ });
/**
 * Node in the doubly-linked list used for LRU tracking.
 * Each node represents a cache entry with bidirectional pointers.
 */ class LRUNode {
    constructor(key, data, size){
        this.prev = null;
        this.next = null;
        this.key = key;
        this.data = data;
        this.size = size;
    }
}
/**
 * Sentinel node used for head/tail boundaries.
 * These nodes don't contain actual cache data but simplify list operations.
 */ class SentinelNode {
    constructor(){
        this.prev = null;
        this.next = null;
    }
}
/**
 * LRU (Least Recently Used) Cache implementation using a doubly-linked list
 * and hash map for O(1) operations.
 *
 * Algorithm:
 * - Uses a doubly-linked list to maintain access order (most recent at head)
 * - Hash map provides O(1) key-to-node lookup
 * - Sentinel head/tail nodes simplify edge case handling
 * - Size-based eviction supports custom size calculation functions
 *
 * Data Structure Layout:
 * HEAD <-> [most recent] <-> ... <-> [least recent] <-> TAIL
 *
 * Operations:
 * - get(): Move accessed node to head (mark as most recent)
 * - set(): Add new node at head, evict from tail if over capacity
 * - Eviction: Remove least recent node (tail.prev) when size exceeds limit
 */ class LRUCache {
    constructor(maxSize, calculateSize, onEvict){
        this.cache = new Map();
        this.totalSize = 0;
        this.maxSize = maxSize;
        this.calculateSize = calculateSize;
        this.onEvict = onEvict;
        // Create sentinel nodes to simplify doubly-linked list operations
        // HEAD <-> TAIL (empty list)
        this.head = new SentinelNode();
        this.tail = new SentinelNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    /**
   * Adds a node immediately after the head (marks as most recently used).
   * Used when inserting new items or when an item is accessed.
   * PRECONDITION: node must be disconnected (prev/next should be null)
   */ addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        // head.next is always non-null (points to tail or another node)
        this.head.next.prev = node;
        this.head.next = node;
    }
    /**
   * Removes a node from its current position in the doubly-linked list.
   * Updates the prev/next pointers of adjacent nodes to maintain list integrity.
   * PRECONDITION: node must be connected (prev/next are non-null)
   */ removeNode(node) {
        // Connected nodes always have non-null prev/next
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    /**
   * Moves an existing node to the head position (marks as most recently used).
   * This is the core LRU operation - accessed items become most recent.
   */ moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }
    /**
   * Removes and returns the least recently used node (the one before tail).
   * This is called during eviction when the cache exceeds capacity.
   * PRECONDITION: cache is not empty (ensured by caller)
   */ removeTail() {
        const lastNode = this.tail.prev;
        // tail.prev is always non-null and always LRUNode when cache is not empty
        this.removeNode(lastNode);
        return lastNode;
    }
    /**
   * Sets a key-value pair in the cache.
   * If the key exists, updates the value and moves to head.
   * If new, adds at head and evicts from tail if necessary.
   *
   * Time Complexity:
   * - O(1) for uniform item sizes
   * - O(k) where k is the number of items evicted (can be O(N) for variable sizes)
   */ set(key, value) {
        const size = (this.calculateSize == null ? void 0 : this.calculateSize.call(this, value, key)) ?? 1;
        if (size <= 0) {
            throw Object.defineProperty(new Error(`LRUCache: calculateSize returned ${size}, but size must be > 0. ` + `Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", {
                value: "E1045",
                enumerable: false,
                configurable: true
            });
        }
        if (size > this.maxSize) {
            console.warn('Single item size exceeds maxSize');
            return false;
        }
        const existing = this.cache.get(key);
        if (existing) {
            // Update existing node: adjust size and move to head (most recent)
            existing.data = value;
            this.totalSize = this.totalSize - existing.size + size;
            existing.size = size;
            this.moveToHead(existing);
        } else {
            // Add new node at head (most recent position)
            const newNode = new LRUNode(key, value, size);
            this.cache.set(key, newNode);
            this.addToHead(newNode);
            this.totalSize += size;
        }
        // Evict least recently used items until under capacity
        while(this.totalSize > this.maxSize && this.cache.size > 0){
            const tail = this.removeTail();
            this.cache.delete(tail.key);
            this.totalSize -= tail.size;
            this.onEvict == null ? void 0 : this.onEvict.call(this, tail.key, tail.data);
        }
        return true;
    }
    /**
   * Checks if a key exists in the cache.
   * This is a pure query operation - does NOT update LRU order.
   *
   * Time Complexity: O(1)
   */ has(key) {
        return this.cache.has(key);
    }
    /**
   * Retrieves a value by key and marks it as most recently used.
   * Moving to head maintains the LRU property for future evictions.
   *
   * Time Complexity: O(1)
   */ get(key) {
        const node = this.cache.get(key);
        if (!node) return undefined;
        // Mark as most recently used by moving to head
        this.moveToHead(node);
        return node.data;
    }
    /**
   * Returns an iterator over the cache entries. The order is outputted in the
   * order of most recently used to least recently used.
   */ *[Symbol.iterator]() {
        let current = this.head.next;
        while(current && current !== this.tail){
            // Between head and tail, current is always LRUNode
            const node = current;
            yield [
                node.key,
                node.data
            ];
            current = current.next;
        }
    }
    /**
   * Removes a specific key from the cache.
   * Updates both the hash map and doubly-linked list.
   *
   * Note: This is an explicit removal and does NOT trigger the `onEvict`
   * callback. Use this for intentional deletions where eviction tracking
   * is not needed.
   *
   * Time Complexity: O(1)
   */ remove(key) {
        const node = this.cache.get(key);
        if (!node) return;
        this.removeNode(node);
        this.cache.delete(key);
        this.totalSize -= node.size;
    }
    /**
   * Returns the number of items in the cache.
   */ get size() {
        return this.cache.size;
    }
    /**
   * Returns the current total size of all cached items.
   * This uses the custom size calculation if provided.
   */ get currentSize() {
        return this.totalSize;
    }
}

//# sourceMappingURL=lru-cache.js.map

/***/ }),

/***/ 2554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BH: () => (/* binding */ INSTANT_VALIDATION_BOUNDARY_NAME),
/* harmony export */   qp: () => (/* binding */ INSTANT_SLOT_MARKER_SUFFIX),
/* harmony export */   v0: () => (/* binding */ INSTANT_SLOT_MARKER_PREFIX)
/* harmony export */ });
const INSTANT_VALIDATION_BOUNDARY_NAME = '__next_instant_validation_boundary__';
const INSTANT_SLOT_MARKER_PREFIX = '__next_instant_slot_';
const INSTANT_SLOT_MARKER_SUFFIX = '__';

//# sourceMappingURL=boundary-constants.js.map

/***/ }),

/***/ 2609:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rp: () => (/* reexport safe */ _server_web_exports_index__WEBPACK_IMPORTED_MODULE_0__.Rp)
/* harmony export */ });
/* harmony import */ var _server_web_exports_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5975);


//# sourceMappingURL=server.js.map

/***/ }),

/***/ 2615:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export actionAsyncStorageInstance */
/* harmony import */ var _async_local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2058);

const actionAsyncStorageInstance = (0,_async_local_storage__WEBPACK_IMPORTED_MODULE_0__/* .createAsyncLocalStorage */ .xl)();

//# sourceMappingURL=action-async-storage-instance.js.map

/***/ }),

/***/ 2643:
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
    getTestReqInfo: function() {
        return getTestReqInfo;
    },
    withRequest: function() {
        return withRequest;
    }
});
const _nodeasync_hooks = __webpack_require__(5521);
const testStorage = new _nodeasync_hooks.AsyncLocalStorage();
function extractTestInfoFromRequest(req, reader) {
    const proxyPortHeader = reader.header(req, 'next-test-proxy-port');
    if (!proxyPortHeader) {
        return undefined;
    }
    const url = reader.url(req);
    const proxyPort = Number(proxyPortHeader);
    const testData = reader.header(req, 'next-test-data') || '';
    return {
        url,
        proxyPort,
        testData
    };
}
function withRequest(req, reader, fn) {
    const testReqInfo = extractTestInfoFromRequest(req, reader);
    if (!testReqInfo) {
        return fn();
    }
    return testStorage.run(testReqInfo, fn);
}
function getTestReqInfo(req, reader) {
    const testReqInfo = testStorage.getStore();
    if (testReqInfo) {
        return testReqInfo;
    }
    if (req && reader) {
        return extractTestInfoFromRequest(req, reader);
    }
    return undefined;
}

//# sourceMappingURL=context.js.map

/***/ }),

/***/ 2652:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports isFullStringUrl, parseUrl, parseReqUrl, stripNextRscUnionQuery */
/* harmony import */ var _client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2728);

const DUMMY_ORIGIN = 'http://n';
function isFullStringUrl(url) {
    return /https?:\/\//.test(url);
}
function parseUrl(url) {
    let parsed = undefined;
    try {
        parsed = new URL(url, DUMMY_ORIGIN);
    } catch  {}
    return parsed;
}
function parseReqUrl(url) {
    const parsedUrl = parseUrl(url);
    if (!parsedUrl) {
        return;
    }
    const query = {};
    for (const key of parsedUrl.searchParams.keys()){
        const values = parsedUrl.searchParams.getAll(key);
        query[key] = values.length > 1 ? values : values[0];
    }
    const legacyUrl = {
        query,
        hash: parsedUrl.hash,
        search: parsedUrl.search,
        path: parsedUrl.pathname,
        pathname: parsedUrl.pathname,
        href: `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`,
        host: '',
        hostname: '',
        auth: '',
        protocol: '',
        slashes: null,
        port: ''
    };
    return legacyUrl;
}
function stripNextRscUnionQuery(relativeUrl) {
    const urlInstance = new URL(relativeUrl, DUMMY_ORIGIN);
    urlInstance.searchParams.delete(NEXT_RSC_UNION_QUERY);
    return urlInstance.pathname + urlInstance.search;
}

//# sourceMappingURL=url.js.map

/***/ }),

/***/ 2728:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KD: () => (/* binding */ FLIGHT_HEADERS),
/* harmony export */   Kb: () => (/* binding */ NEXT_HTML_REQUEST_ID_HEADER),
/* harmony export */   Wc: () => (/* binding */ NEXT_REWRITTEN_QUERY_HEADER),
/* harmony export */   _A: () => (/* binding */ NEXT_RSC_UNION_QUERY),
/* harmony export */   _V: () => (/* binding */ NEXT_ROUTER_PREFETCH_HEADER),
/* harmony export */   e9: () => (/* binding */ NEXT_REQUEST_ID_HEADER),
/* harmony export */   hY: () => (/* binding */ RSC_HEADER),
/* harmony export */   j9: () => (/* binding */ NEXT_REWRITTEN_PATH_HEADER)
/* harmony export */ });
/* unused harmony exports ACTION_HEADER, NEXT_ROUTER_STATE_TREE_HEADER, NEXT_ROUTER_SEGMENT_PREFETCH_HEADER, NEXT_HMR_REFRESH_HEADER, NEXT_URL, RSC_CONTENT_TYPE_HEADER, NEXT_INSTANT_TEST_COOKIE, NEXT_ROUTER_STALE_TIME_HEADER, NEXT_DID_POSTPONE_HEADER, NEXT_IS_PRERENDER_HEADER, NEXT_ACTION_NOT_FOUND_HEADER, NEXT_ACTION_REVALIDATED_HEADER */
const RSC_HEADER = 'rsc';
const ACTION_HEADER = 'next-action';
// TODO: Instead of sending the full router state, we only need to send the
// segment path. Saves bytes. Then we could also use this field for segment
// prefetches, which also need to specify a particular segment.
const NEXT_ROUTER_STATE_TREE_HEADER = 'next-router-state-tree';
const NEXT_ROUTER_PREFETCH_HEADER = 'next-router-prefetch';
// This contains the path to the segment being prefetched.
// TODO: If we change next-router-state-tree to be a segment path, we can use
// that instead. Then next-router-prefetch and next-router-segment-prefetch can
// be merged into a single enum.
const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = 'next-router-segment-prefetch';
const NEXT_HMR_REFRESH_HEADER = 'next-hmr-refresh';
const NEXT_URL = 'next-url';
const RSC_CONTENT_TYPE_HEADER = 'text/x-component';
// Cookie for the Instant Navigation Testing API. Sent automatically with all
// requests while a navigation lock is held; the server uses its presence to
// render only the shell. Not exposed in production builds by default.
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
// TODO: Should this include nextjs in the name, like the others?
const NEXT_ACTION_REVALIDATED_HEADER = 'x-action-revalidated'; //# sourceMappingURL=app-router-headers.js.map


/***/ }),

/***/ 2736:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* reexport safe */ _work_async_storage_instance__WEBPACK_IMPORTED_MODULE_0__.I)
/* harmony export */ });
/* harmony import */ var _work_async_storage_instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5912);
// Share the instance module in the next-shared layer



//# sourceMappingURL=work-async-storage.external.js.map

/***/ }),

/***/ 2795:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ IncrementalCache)
/* harmony export */ });
/* unused harmony export CacheHandler */
/* harmony import */ var _response_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6018);
/* harmony import */ var _file_system_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8114);
/* harmony import */ var _shared_lib_page_path_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8822);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1276);
/* harmony import */ var _to_route__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9428);
/* harmony import */ var _shared_cache_controls_external__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7411);
/* harmony import */ var _app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2381);
/* harmony import */ var _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1520);
/* harmony import */ var _server_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1434);
/* harmony import */ var _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2736);
/* harmony import */ var _lib_detached_promise__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9113);
/* harmony import */ var _tags_manifest_external__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4713);












function toHex(buffer) {
    // Hex-encode body bytes losslessly: decoding as UTF-8 would collapse
    // distinct bytes (0xff/0xfe to U+FFFD) and collide; Buffer isn't on edge.
    const bytes = isArrayBuffer(buffer) ? new Uint8Array(buffer) : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let hex = '';
    for (const byte of bytes){
        hex += byte.toString(16).padStart(2, '0');
    }
    return hex;
}
// Duck typing to support Edge runtime
// TODO: Switch to instanceof checks once Edge runtime is removed.
function isArrayBuffer(buffer) {
    return !('buffer' in buffer);
}
function isBodyByteSequence(body) {
    return typeof body === 'object' && 'byteLength' in body;
}
function isBodyReadableStream(body) {
    return typeof body.getReader === 'function';
}
function isBodyFormDataOrURLSearchParams(body) {
    return typeof body.keys === 'function';
}
function isBodyBlob(body) {
    return typeof body.arrayBuffer === 'function';
}
class CacheHandler {
    // eslint-disable-next-line
    constructor(_ctx){}
    async get(_cacheKey, _ctx) {
        return {};
    }
    async set(_cacheKey, _data, _ctx) {}
    async revalidateTag(_tags, _durations) {}
    resetRequestCache() {}
}
async function hashString(cacheString) {
    if (true) {
        const encoder = new TextEncoder();
        const buffer = encoder.encode(cacheString);
        return toHex(await crypto.subtle.digest('SHA-256', buffer));
    } else {}
}
// this should be bumped anytime a fix is made to cache entries
// that should bust the cache
const MAIN_KEY_PREFIX = 'v4';
class IncrementalCache {
    static #_ = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
    constructor({ fs, dev, flushToDisk, minimalMode, serverDistDir, requestHeaders, maxMemoryCacheSize, getPrerenderManifest, fetchCacheKeyPrefix, CurCacheHandler, allowedRevalidateHeaderKeys }){
        var _this_prerenderManifest_preview, _this_prerenderManifest;
        this.locks = new Map();
        this.hasCustomCacheHandler = Boolean(CurCacheHandler);
        const cacheHandlersSymbol = Symbol.for('@next/cache-handlers');
        const _globalThis = globalThis;
        if (!CurCacheHandler) {
            // if we have a global cache handler available leverage it
            const globalCacheHandler = _globalThis[cacheHandlersSymbol];
            if (globalCacheHandler == null ? void 0 : globalCacheHandler.FetchCache) {
                CurCacheHandler = globalCacheHandler.FetchCache;
                if (IncrementalCache.debug) {
                    console.log('IncrementalCache: using global FetchCache cache handler');
                }
            } else {
                if (fs && serverDistDir) {
                    if (IncrementalCache.debug) {
                        console.log('IncrementalCache: using filesystem cache handler');
                    }
                    CurCacheHandler = _file_system_cache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A;
                }
            }
        } else if (IncrementalCache.debug) {
            console.log('IncrementalCache: using custom cache handler', CurCacheHandler.name);
        }
        if (process.env.__NEXT_TEST_MAX_ISR_CACHE) {
            // Allow cache size to be overridden for testing purposes
            maxMemoryCacheSize = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10);
        }
        this.dev = dev;
        this.disableForTestmode = process.env.NEXT_PRIVATE_TEST_PROXY === 'true';
        // this is a hack to avoid Webpack knowing this is equal to this.minimalMode
        // because we replace this.minimalMode to true in production bundles.
        const minimalModeKey = 'minimalMode';
        this[minimalModeKey] = minimalMode;
        this.requestHeaders = requestHeaders;
        this.allowedRevalidateHeaderKeys = allowedRevalidateHeaderKeys;
        this.prerenderManifest = getPrerenderManifest();
        this.cacheControls = new _shared_cache_controls_external__WEBPACK_IMPORTED_MODULE_4__/* .SharedCacheControls */ .G(this.prerenderManifest);
        this.fetchCacheKeyPrefix = fetchCacheKeyPrefix;
        let revalidatedTags = [];
        if (requestHeaders[_lib_constants__WEBPACK_IMPORTED_MODULE_3__/* .PRERENDER_REVALIDATE_HEADER */ .kz] === ((_this_prerenderManifest = this.prerenderManifest) == null ? void 0 : (_this_prerenderManifest_preview = _this_prerenderManifest.preview) == null ? void 0 : _this_prerenderManifest_preview.previewModeId)) {
            this.isOnDemandRevalidate = true;
        }
        if (minimalMode) {
            var _this_prerenderManifest_preview1, _this_prerenderManifest1;
            revalidatedTags = this.revalidatedTags = (0,_server_utils__WEBPACK_IMPORTED_MODULE_7__/* .getPreviouslyRevalidatedTags */ .l5)(requestHeaders, (_this_prerenderManifest1 = this.prerenderManifest) == null ? void 0 : (_this_prerenderManifest_preview1 = _this_prerenderManifest1.preview) == null ? void 0 : _this_prerenderManifest_preview1.previewModeId);
        }
        if (CurCacheHandler) {
            this.cacheHandler = new CurCacheHandler({
                dev,
                fs,
                flushToDisk,
                serverDistDir,
                revalidatedTags,
                maxMemoryCacheSize,
                _requestHeaders: requestHeaders,
                fetchCacheKeyPrefix
            });
        }
    }
    calculateRevalidate(pathname, fromTime, dev, isFallback) {
        // in development we don't have a prerender-manifest
        // and default to always revalidating to allow easier debugging
        if (dev) return Math.floor(performance.timeOrigin + performance.now() - 1000);
        const cacheControl = this.cacheControls.get((0,_to_route__WEBPACK_IMPORTED_MODULE_10__/* .toRoute */ .P)(pathname));
        // if an entry isn't present in routes we fallback to a default
        // of revalidating after 1 second unless it's a fallback request.
        const initialRevalidateSeconds = cacheControl ? cacheControl.revalidate : isFallback ? false : 1;
        const revalidateAfter = typeof initialRevalidateSeconds === 'number' ? initialRevalidateSeconds * 1000 + fromTime : initialRevalidateSeconds;
        return revalidateAfter;
    }
    _getPathname(pathname, fetchCache) {
        return fetchCache ? pathname : (0,_shared_lib_page_path_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__/* .normalizePagePath */ .i)(pathname);
    }
    resetRequestCache() {
        var _this_cacheHandler_resetRequestCache, _this_cacheHandler;
        (_this_cacheHandler = this.cacheHandler) == null ? void 0 : (_this_cacheHandler_resetRequestCache = _this_cacheHandler.resetRequestCache) == null ? void 0 : _this_cacheHandler_resetRequestCache.call(_this_cacheHandler);
    }
    async lock(cacheKey) {
        // Wait for any existing lock on this cache key to be released
        // This implements a simple queue-based locking mechanism
        while(true){
            const lock = this.locks.get(cacheKey);
            if (IncrementalCache.debug) {
                console.log('IncrementalCache: lock get', cacheKey, !!lock);
            }
            // If no lock exists, we can proceed to acquire it
            if (!lock) break;
            // Wait for the existing lock to be released before trying again
            await lock;
        }
        // Create a new detached promise that will represent this lock
        // The resolve function (unlock) will be returned to the caller
        const { resolve, promise } = new _lib_detached_promise__WEBPACK_IMPORTED_MODULE_11__/* .DetachedPromise */ .q();
        if (IncrementalCache.debug) {
            console.log('IncrementalCache: successfully locked', cacheKey);
        }
        // Store the lock promise in the locks map
        this.locks.set(cacheKey, promise);
        return ()=>{
            // Resolve the promise to release the lock.
            resolve();
            // Remove the lock from the map once it's released so that future gets
            // can acquire the lock.
            this.locks.delete(cacheKey);
        };
    }
    async revalidateTag(tags, durations) {
        var _this_cacheHandler;
        return (_this_cacheHandler = this.cacheHandler) == null ? void 0 : _this_cacheHandler.revalidateTag(tags, durations);
    }
    async generateSimpleCacheKey(input) {
        const cacheString = JSON.stringify([
            MAIN_KEY_PREFIX,
            this.fetchCacheKeyPrefix || '',
            input
        ]);
        return hashString(cacheString);
    }
    // x-ref: https://github.com/facebook/react/blob/2655c9354d8e1c54ba888444220f63e836925caa/packages/react/src/ReactFetch.js#L23
    async generateCacheKey(url, init = {}) {
        const bodyChunks = [];
        const encoder = new TextEncoder();
        // Will be set implementing https://fetch.spec.whatwg.org/#concept-bodyinit-extract
        let bodyType = null;
        const body = init.body;
        if (body) {
            if (isBodyByteSequence(body)) {
                bodyChunks.push(`bytes:${toHex(body)}`);
                init._ogBody = body;
            } else if (isBodyReadableStream(body)) {
                const readableBody = body;
                const chunks = [];
                try {
                    await readableBody.pipeTo(new WritableStream({
                        write (chunk) {
                            chunks.push(typeof chunk === 'string' ? encoder.encode(chunk) : chunk);
                        }
                    }));
                    // Create a new buffer with all the chunks.
                    const length = chunks.reduce((total, arr)=>total + arr.length, 0);
                    const arrayBuffer = new Uint8Array(length);
                    // Push each of the chunks into the new array buffer.
                    let offset = 0;
                    for (const chunk of chunks){
                        arrayBuffer.set(chunk, offset);
                        offset += chunk.length;
                    }
                    bodyChunks.push(`bytes:${toHex(arrayBuffer)}`);
                    init._ogBody = arrayBuffer;
                } catch (err) {
                    console.error('Problem reading body', err);
                }
            } else if (isBodyFormDataOrURLSearchParams(body)) {
                bodyType = String(body) === '[object FormData]' ? 'multipart/form-data; boundary=' : 'application/x-www-form-urlencoded;charset=UTF-8';
                const iterable = body;
                init._ogBody = body;
                // Separate, tagged chunks so `["a","b"]` can't collide with `["a,b"]`.
                for (const [key, val] of iterable.entries()){
                    bodyChunks.push(`key:${key}`);
                    if (typeof val === 'string') {
                        bodyChunks.push(`str:${val}`);
                    } else {
                        bodyChunks.push('file', val.name, val.type, `bytes:${toHex(await val.arrayBuffer())}`);
                    }
                }
            // handle blob body
            } else if (isBodyBlob(body)) {
                const blob = body;
                const arrayBuffer = await blob.arrayBuffer();
                bodyChunks.push('blob', blob.type, `bytes:${toHex(arrayBuffer)}`);
                init._ogBody = new Blob([
                    arrayBuffer
                ], {
                    type: blob.type
                });
                bodyType = blob.type;
            } else if (typeof body === 'string') {
                bodyChunks.push(`str:${body}`);
                init._ogBody = body;
                bodyType = 'text/plain;charset=UTF-8';
            } else {
                body;
                throw Object.defineProperty(new Error(`Unsupported body type: ${typeof body}`), "__NEXT_ERROR_CODE", {
                    value: "E1443",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        const headers = typeof (init.headers || {}).keys === 'function' ? Object.fromEntries(init.headers) : Object.assign({}, init.headers);
        // w3c trace context headers can break request caching and deduplication
        // so we remove them from the cache key
        if ('traceparent' in headers) delete headers['traceparent'];
        if ('tracestate' in headers) delete headers['tracestate'];
        const cacheString = JSON.stringify([
            MAIN_KEY_PREFIX,
            this.fetchCacheKeyPrefix || '',
            url,
            init.method,
            // Ensures default Content-Type is part of the cache key
            // TODO: Only necessary when headers are not used from the Request instance
            bodyType,
            headers,
            init.mode,
            init.redirect,
            init.credentials,
            init.referrer,
            init.referrerPolicy,
            init.integrity,
            init.cache,
            bodyChunks
        ]);
        return hashString(cacheString);
    }
    async get(cacheKey, ctx) {
        var _this_cacheHandler, _cacheData_value;
        // Unlike other caches if we have a resume data cache, we use it even if
        // testmode would normally disable it or if requestHeaders say 'no-cache'.
        if (ctx.kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.FETCH) {
            const workUnitStore = _app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_5__/* .workUnitAsyncStorage */ .FP.getStore();
            const resumeDataCache = workUnitStore ? (0,_app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_5__/* .getResumeDataCache */ .Kr)(workUnitStore) : null;
            if (resumeDataCache) {
                const memoryCacheData = resumeDataCache.fetch.get(cacheKey);
                if ((memoryCacheData == null ? void 0 : memoryCacheData.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.FETCH) {
                    // Check if any tags were recently revalidated before returning RDC entry.
                    // When a server action calls updateTag(), the re-render should see fresh
                    // data instead of stale RDC data.
                    const workStore = _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_8__/* .workAsyncStorage */ .J.getStore();
                    const combinedTags = [
                        ...ctx.tags || [],
                        ...ctx.softTags || []
                    ];
                    const hasRevalidatedTag = combinedTags.some((tag)=>{
                        var _this_revalidatedTags, _workStore_pendingRevalidatedTags;
                        return ((_this_revalidatedTags = this.revalidatedTags) == null ? void 0 : _this_revalidatedTags.includes(tag)) || (workStore == null ? void 0 : (_workStore_pendingRevalidatedTags = workStore.pendingRevalidatedTags) == null ? void 0 : _workStore_pendingRevalidatedTags.some((item)=>item.tag === tag));
                    });
                    if (hasRevalidatedTag) {
                        if (IncrementalCache.debug) {
                            console.log('IncrementalCache: rdc:revalidated-tag', cacheKey);
                        }
                    // Fall through to cacheHandler lookup
                    } else {
                        if (IncrementalCache.debug) {
                            console.log('IncrementalCache: rdc:hit', cacheKey);
                        }
                        return {
                            isStale: false,
                            value: memoryCacheData
                        };
                    }
                } else if (IncrementalCache.debug) {
                    console.log('IncrementalCache: rdc:miss', cacheKey);
                }
            } else {
                if (IncrementalCache.debug) {
                    console.log('IncrementalCache: rdc:no-resume-data');
                }
            }
        }
        // we don't leverage the prerender cache in dev mode
        // so that getStaticProps is always called for easier debugging
        if (this.disableForTestmode || this.dev && (ctx.kind !== _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.FETCH || this.requestHeaders['cache-control'] === 'no-cache')) {
            return null;
        }
        cacheKey = this._getPathname(cacheKey, ctx.kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.FETCH);
        const cacheData = await ((_this_cacheHandler = this.cacheHandler) == null ? void 0 : _this_cacheHandler.get(cacheKey, ctx));
        if (ctx.kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.FETCH) {
            var _cacheData_value1;
            if (!cacheData) {
                return null;
            }
            if (((_cacheData_value1 = cacheData.value) == null ? void 0 : _cacheData_value1.kind) !== _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.FETCH) {
                var _cacheData_value2;
                throw Object.defineProperty(new _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_6__/* .InvariantError */ .z(`Expected cached value for cache key ${JSON.stringify(cacheKey)} to be a "FETCH" kind, got ${JSON.stringify((_cacheData_value2 = cacheData.value) == null ? void 0 : _cacheData_value2.kind)} instead.`), "__NEXT_ERROR_CODE", {
                    value: "E653",
                    enumerable: false,
                    configurable: true
                });
            }
            const workStore = _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_8__/* .workAsyncStorage */ .J.getStore();
            const combinedTags = [
                ...ctx.tags || [],
                ...ctx.softTags || []
            ];
            // if a tag was revalidated we don't return stale data
            if (combinedTags.some((tag)=>{
                var _this_revalidatedTags, _workStore_pendingRevalidatedTags;
                return ((_this_revalidatedTags = this.revalidatedTags) == null ? void 0 : _this_revalidatedTags.includes(tag)) || (workStore == null ? void 0 : (_workStore_pendingRevalidatedTags = workStore.pendingRevalidatedTags) == null ? void 0 : _workStore_pendingRevalidatedTags.some((item)=>item.tag === tag));
            })) {
                if (IncrementalCache.debug) {
                    console.log('IncrementalCache: expired tag', cacheKey);
                }
                return null;
            }
            // As we're able to get the cache entry for this fetch, and the prerender
            // resume data cache (RDC) is available, it must have been populated by a
            // previous fetch, but was not yet present in the in-memory cache. This
            // could be the case when performing multiple renders in parallel during
            // build time where we de-duplicate the fetch calls.
            //
            // We add it to the RDC so that the next fetch call will be able to use it
            // and it won't have to reach into the fetch cache implementation.
            const workUnitStore = _app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_5__/* .workUnitAsyncStorage */ .FP.getStore();
            if (workUnitStore) {
                const resumeDataCache = (0,_app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_5__/* .getResumeDataCache */ .Kr)(workUnitStore);
                if (resumeDataCache == null ? void 0 : resumeDataCache.mutable) {
                    if (IncrementalCache.debug) {
                        console.log('IncrementalCache: rdc:set', cacheKey);
                    }
                    resumeDataCache.fetch.set(cacheKey, cacheData.value);
                }
            }
            const revalidate = ctx.revalidate || cacheData.value.revalidate;
            const age = (performance.timeOrigin + performance.now() - (cacheData.lastModified || 0)) / 1000;
            let isStale = age > revalidate;
            const data = cacheData.value.data;
            if ((0,_tags_manifest_external__WEBPACK_IMPORTED_MODULE_9__/* .areTagsExpired */ .Nw)(combinedTags, cacheData.lastModified)) {
                return null;
            } else if ((0,_tags_manifest_external__WEBPACK_IMPORTED_MODULE_9__/* .areTagsStale */ .xm)(combinedTags, cacheData.lastModified)) {
                isStale = true;
            }
            return {
                isStale,
                value: {
                    kind: _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.FETCH,
                    data,
                    revalidate
                }
            };
        } else if ((cacheData == null ? void 0 : (_cacheData_value = cacheData.value) == null ? void 0 : _cacheData_value.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.FETCH) {
            throw Object.defineProperty(new _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_6__/* .InvariantError */ .z(`Expected cached value for cache key ${JSON.stringify(cacheKey)} not to be a ${JSON.stringify(ctx.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", {
                value: "E652",
                enumerable: false,
                configurable: true
            });
        }
        let entry = null;
        const { isFallback } = ctx;
        const cacheControl = this.cacheControls.get((0,_to_route__WEBPACK_IMPORTED_MODULE_10__/* .toRoute */ .P)(cacheKey));
        let isStale;
        let revalidateAfter;
        if ((cacheData == null ? void 0 : cacheData.lastModified) === -1) {
            isStale = -1;
            revalidateAfter = -1 * _lib_constants__WEBPACK_IMPORTED_MODULE_3__/* .CACHE_ONE_YEAR_SECONDS */ .eM * 1000;
        } else {
            const now = performance.timeOrigin + performance.now();
            const lastModified = (cacheData == null ? void 0 : cacheData.lastModified) || now;
            revalidateAfter = this.calculateRevalidate(cacheKey, lastModified, this.dev ?? false, ctx.isFallback);
            // If the route's `expire` time has passed, force a blocking revalidation
            // by signalling `isStale = -1`. The response cache treats `-1` as "skip
            // the early SWR resolve" and awaits a fresh render before the user sees a
            // response.
            const expireAfter = typeof (cacheControl == null ? void 0 : cacheControl.expire) === 'number' ? cacheControl.expire * 1000 + lastModified : undefined;
            if (expireAfter !== undefined && expireAfter < now) {
                isStale = -1;
            } else {
                var _cacheData_value3, _cacheData_value4;
                isStale = revalidateAfter !== false && revalidateAfter < now ? true : undefined;
                // If the stale time couldn't be determined based on the revalidation
                // time, we check if the tags are expired or stale.
                if (isStale === undefined && ((cacheData == null ? void 0 : (_cacheData_value3 = cacheData.value) == null ? void 0 : _cacheData_value3.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.APP_PAGE || (cacheData == null ? void 0 : (_cacheData_value4 = cacheData.value) == null ? void 0 : _cacheData_value4.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.APP_ROUTE)) {
                    var _cacheData_value_headers;
                    const tagsHeader = (_cacheData_value_headers = cacheData.value.headers) == null ? void 0 : _cacheData_value_headers[_lib_constants__WEBPACK_IMPORTED_MODULE_3__/* .NEXT_CACHE_TAGS_HEADER */ .VC];
                    if (typeof tagsHeader === 'string') {
                        const cacheTags = tagsHeader.split(',');
                        if (cacheTags.length > 0) {
                            if ((0,_tags_manifest_external__WEBPACK_IMPORTED_MODULE_9__/* .areTagsExpired */ .Nw)(cacheTags, lastModified)) {
                                isStale = -1;
                            } else if ((0,_tags_manifest_external__WEBPACK_IMPORTED_MODULE_9__/* .areTagsStale */ .xm)(cacheTags, lastModified)) {
                                isStale = true;
                            }
                        }
                    }
                }
            }
        }
        if (cacheData) {
            entry = {
                isStale,
                cacheControl,
                revalidateAfter,
                value: cacheData.value,
                isFallback
            };
        }
        if (!cacheData && this.prerenderManifest.notFoundRoutes.includes(cacheKey)) {
            // for the first hit after starting the server the cache
            // may not have a way to save notFound: true so if
            // the prerender-manifest marks this as notFound then we
            // return that entry and trigger a cache set to give it a
            // chance to update in-memory entries
            entry = {
                isStale,
                value: null,
                cacheControl,
                revalidateAfter,
                isFallback
            };
            this.set(cacheKey, entry.value, {
                ...ctx,
                cacheControl
            });
        }
        return entry;
    }
    async set(pathname, data, ctx) {
        // Even if we otherwise disable caching for testMode or if no fetchCache is
        // configured we still always stash results in the resume data cache if one
        // exists. This is because this is a transient in memory cache that
        // populates caches ahead of a dynamic render in dev mode to allow the RSC
        // debug info to have the right environment associated to it.
        if ((data == null ? void 0 : data.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.FETCH) {
            const workUnitStore = _app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_5__/* .workUnitAsyncStorage */ .FP.getStore();
            const resumeDataCache = workUnitStore ? (0,_app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_5__/* .getResumeDataCache */ .Kr)(workUnitStore) : null;
            if (resumeDataCache == null ? void 0 : resumeDataCache.mutable) {
                if (IncrementalCache.debug) {
                    console.log('IncrementalCache: rdc:set', pathname);
                }
                resumeDataCache.fetch.set(pathname, data);
            }
        }
        if (this.disableForTestmode || this.dev && !ctx.fetchCache) return;
        pathname = this._getPathname(pathname, ctx.fetchCache);
        // FetchCache has upper limit of 2MB per-entry currently
        const itemSize = JSON.stringify(data).length;
        if (ctx.fetchCache && itemSize > 2 * 1024 * 1024 && // We ignore the size limit when custom cache handler is being used, as it
        // might not have this limit
        !this.hasCustomCacheHandler && // We also ignore the size limit when it's an implicit build-time-only
        // caching that the user isn't even aware of.
        !ctx.isImplicitBuildTimeCache) {
            const warningText = `Failed to set Next.js data cache for ${ctx.fetchUrl || pathname}, items over 2MB can not be cached (${itemSize} bytes)`;
            if (this.dev) {
                throw Object.defineProperty(new Error(warningText), "__NEXT_ERROR_CODE", {
                    value: "E1003",
                    enumerable: false,
                    configurable: true
                });
            }
            console.warn(warningText);
            return;
        }
        try {
            var _this_cacheHandler;
            if (!ctx.fetchCache && ctx.cacheControl) {
                this.cacheControls.set((0,_to_route__WEBPACK_IMPORTED_MODULE_10__/* .toRoute */ .P)(pathname), ctx.cacheControl);
            }
            await ((_this_cacheHandler = this.cacheHandler) == null ? void 0 : _this_cacheHandler.set(pathname, data, ctx));
        } catch (error) {
            console.warn('Failed to update prerender cache for', pathname, error);
        }
    }
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2976:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ek: () => (/* binding */ edgeInstrumentationOnRequestError),
/* harmony export */   p9: () => (/* binding */ ensureInstrumentationRegistered)
/* harmony export */ });
/* unused harmony export getEdgeInstrumentationModule */
async function getEdgeInstrumentationModule() {
    const instrumentation = '_ENTRIES' in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
    return instrumentation;
}
let instrumentationModulePromise = null;
async function registerInstrumentation() {
    // Ensure registerInstrumentation is not called in production build
    if (process.env.NEXT_PHASE === 'phase-production-build') return;
    if (!instrumentationModulePromise) {
        instrumentationModulePromise = getEdgeInstrumentationModule();
    }
    const instrumentation = await instrumentationModulePromise;
    if (instrumentation == null ? void 0 : instrumentation.register) {
        try {
            await instrumentation.register();
        } catch (err) {
            err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
            throw err;
        }
    }
}
async function edgeInstrumentationOnRequestError(...args) {
    const instrumentation = await getEdgeInstrumentationModule();
    try {
        var _instrumentation_onRequestError;
        await (instrumentation == null ? void 0 : (_instrumentation_onRequestError = instrumentation.onRequestError) == null ? void 0 : _instrumentation_onRequestError.call(instrumentation, ...args));
    } catch (err) {
        // Log the soft error and continue, since the original error has already been thrown
        console.error('Error in instrumentation.onRequestError:', err);
    }
}
let registerInstrumentationPromise = null;
function ensureInstrumentationRegistered() {
    if (!registerInstrumentationPromise) {
        registerInstrumentationPromise = registerInstrumentation();
    }
    return registerInstrumentationPromise;
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === 'then') {
                return {};
            }
            throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        },
        construct () {
            throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        },
        apply (_target, _this, args) {
            if (typeof args[0] === 'function') {
                return args[0](proxy);
            }
            throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function enhanceGlobals() {
    if (false) {}
    // The condition is true when the "process" module is provided
    if (process !== __webpack_require__.g.process) {
        // prefer local process but global.process has correct "env"
        process.env = __webpack_require__.g.process.env;
        __webpack_require__.g.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    try {
        Object.defineProperty(globalThis, '__import_unsupported', {
            value: __import_unsupported,
            enumerable: false,
            configurable: false
        });
    } catch  {}
    // Eagerly fire instrumentation hook to make the startup faster.
    void ensureInstrumentationRegistered();
}
enhanceGlobals();

//# sourceMappingURL=globals.js.map

/***/ }),

/***/ 3058:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ ReflectAdapter)
/* harmony export */ });
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
}

//# sourceMappingURL=reflect.js.map

/***/ }),

/***/ 3256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports createDynamicTrackingState, createDynamicValidationState, getFirstDynamicReason, markCurrentScopeAsDynamic, throwToInterruptStaticGeneration, trackDynamicDataInDynamicRender, abortOnSynchronousPlatformIOAccess, abortAndThrowOnSynchronousRequestDataAccess, Postpone, postponeWithTracking, isDynamicPostpone, isPrerenderInterruptedError, accessedDynamicData, consumeDynamicAccess, formatDynamicAPIAccesses, createRenderInBrowserAbortSignal, createHangingInputAbortSignal, annotateDynamicAccess, useDynamicRouteParams, useDynamicSearchParams, trackAllowedDynamicAccess, DynamicHoleKind, createInstantValidationState, trackDynamicHoleInNavigation, trackThrownErrorInNavigation, trackDynamicHoleInRuntimeShell, trackDynamicHoleInStaticShell, PreludeState, logDisallowedDynamicError, throwIfSyncIOUsed, throwIfDisallowedDynamic, getStaticShellDisallowedDynamicReasons, getNavigationDisallowedDynamicReasons */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(345);
/* harmony import */ var _client_components_hooks_server_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4502);
/* harmony import */ var _client_components_static_generation_bailout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1020);
/* harmony import */ var _work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2381);
/* harmony import */ var _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2736);
/* harmony import */ var _dynamic_rendering_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9743);
/* harmony import */ var _lib_framework_boundary_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9478);
/* harmony import */ var _shared_lib_lazy_dynamic_bailout_to_csr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3297);
/* harmony import */ var _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1520);
/* harmony import */ var _instant_validation_boundary_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2554);
/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ // Once postpone is in stable we should switch to importing the postpone export directly














const hasPostpone = typeof react__WEBPACK_IMPORTED_MODULE_0__.unstable_postpone === 'function';
function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null,
        syncDynamicErrorWithStackPostMicrotask: false
    };
}
function createDynamicValidationState() {
    return {
        hasSuspenseAboveBody: false,
        hasDynamicMetadata: false,
        dynamicMetadata: null,
        hasDynamicViewport: false,
        hasAllowedDynamic: false,
        dynamicErrors: []
    };
}
function getPendingClientSyncDynamicError(clientDynamic) {
    return clientDynamic.syncDynamicErrorWithStackPostMicrotask ? null : clientDynamic.syncDynamicErrorWithStack;
}
function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
}
/**
 * This function communicates that the current scope should be treated as dynamic.
 *
 * In most cases this function is a no-op but if called during
 * a PPR prerender it will postpone the current sub-tree and calling
 * it during a normal prerender will cause the entire prerender to abort
 */ function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'cache':
            case 'unstable-cache':
                // Inside cache scopes, marking a scope as dynamic has no effect,
                // because the outer cache scope creates a cache boundary. This is
                // subtly different from reading a dynamic data source, which is
                // forbidden inside a cache scope.
                return;
            case 'private-cache':
                // A private cache scope is already dynamic by definition.
                return;
            case 'prerender-legacy':
            case 'prerender-ppr':
            case 'request':
            case 'generate-static-params':
                break;
            default:
                workUnitStore;
        }
    }
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw Object.defineProperty(new StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
        });
    }
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-ppr':
                return postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
            case 'prerender-legacy':
                workUnitStore.revalidate = 0;
                // We aren't prerendering, but we are generating a static page. We need
                // to bail out of static generation.
                const err = Object.defineProperty(new DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E550",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            case 'request':
                if (false) {}
                break;
            case 'generate-static-params':
                break;
            default:
                workUnitStore;
        }
    }
}
/**
 * This function is meant to be used when prerendering without cacheComponents or PPR.
 * When called during a build it will cause Next.js to consider the route as dynamic.
 *
 * @internal
 */ function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
/**
 * This function should be used to track whether something dynamic happened even when
 * we are in a dynamic render. This is useful for Dev where all renders are dynamic but
 * we still track whether dynamic APIs were accessed for helpful messaging
 *
 * @internal
 */ function trackDynamicDataInDynamicRender(workUnitStore) {
    switch(workUnitStore.type){
        case 'cache':
        case 'unstable-cache':
            // Inside cache scopes, marking a scope as dynamic has no effect,
            // because the outer cache scope creates a cache boundary. This is
            // subtly different from reading a dynamic data source, which is
            // forbidden inside a cache scope.
            return;
        case 'private-cache':
            // A private cache scope is already dynamic by definition.
            return;
        case 'prerender':
        case 'prerender-runtime':
        case 'prerender-legacy':
        case 'prerender-ppr':
        case 'prerender-client':
        case 'validation-client':
        case 'generate-static-params':
            break;
        case 'request':
            if (false) {}
            break;
        default:
            workUnitStore;
    }
}
function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking && dynamicTracking.syncDynamicErrorWithStack === null) {
        dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        // React completes the task that is currently rendering before scheduled
        // abort cleanup. Client tracking can attribute the sync IO only during
        // that current task; server tracking keeps the error regardless.
        queueMicrotask(()=>{
            dynamicTracking.syncDynamicErrorWithStackPostMicrotask = true;
        });
    }
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
}
/**
 * use this function when prerendering with cacheComponents. If we are doing a
 * prospective prerender we don't actually abort because we want to discover
 * all caches for the shell. If this is the actual prerender we do abort.
 *
 * This function accepts a prerenderStore but the caller should ensure we're
 * actually running in cacheComponents mode.
 *
 * @internal
 */ function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    // The synchronously accessed request data would have been available during
    // a runtime prerender, which would have rendered past this point instead of
    // aborting — so a runtime prefetch would produce more content than this
    // render. Record that, same as when request data access creates a hanging
    // promise (see makeRuntimeHangingPromise). Unlike
    // `abortOnSynchronousPlatformIOAccess`, which aborts a runtime prerender
    // all the same and therefore must not record anything.
    trackRuntimeDataAccessed(prerenderStore);
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
        // TODO it would be better to move this aborted check into the callsite so we can avoid making
        // the error object when it isn't relevant to the aborting of the prerender however
        // since we need the throw semantics regardless of whether we abort it is easier to land
        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
        // to ideal implementation
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
        // Preserve the exact server-side dynamic access for final validation after
        // interrupting this render.
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
            }
        }
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
}
function Postpone({ reason, route }) {
    const prerenderStore = workUnitAsyncStorage.getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
}
function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
    React.unstable_postpone(createPostponeReason(route, expression));
}
function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
}
function isDynamicPostpone(err) {
    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
        return isDynamicPostponeReason(err.message);
    }
    return false;
}
function isDynamicPostponeReason(reason) {
    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
}
if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: false,
        configurable: true
    });
}
const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
}
function isPrerenderInterruptedError(error) {
    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
}
function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
}
function consumeDynamicAccess(serverDynamic, clientDynamic) {
    // We mutate because we only call this once we are no longer writing
    // to the dynamicTrackingState and it's more efficient than creating a new
    // array.
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
}
function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n') // Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
        });
    }
}
/**
 * This is a bit of a hack to allow us to abort a render using a Postpone instance instead of an Error which changes React's
 * abort semantics slightly.
 */ function createRenderInBrowserAbortSignal() {
    const controller = new AbortController();
    controller.abort(Object.defineProperty(new BailoutToCSRError('Render in Browser'), "__NEXT_ERROR_CODE", {
        value: "E721",
        enumerable: false,
        configurable: true
    }));
    return controller.signal;
}
function createHangingInputAbortSignal(workUnitStore) {
    switch(workUnitStore.type){
        case 'prerender':
        case 'prerender-runtime':
            const controller = new AbortController();
            if (workUnitStore.cacheSignal) {
                // If we have a cacheSignal it means we're in a prospective render. If
                // the input we're waiting on is coming from another cache, we do want
                // to wait for it so that we can resolve this cache entry too.
                workUnitStore.cacheSignal.inputReady().then(()=>{
                    controller.abort();
                });
            } else {
                // Otherwise we're in the final render and we should already have all
                // our caches filled.
                // If the prerender uses stages, we have wait until the final stage.
                // if an input didn't resolve at that point, then we can assume it never will.
                //
                // We might still be waiting on some microtasks so we
                // wait one tick before giving up. When we give up, we still want to
                // render the content of this cache as deeply as we can so that we can
                // suspend as deeply as possible in the tree or not at all if we don't
                // end up waiting for the input.
                const stagedRendering = getStagedRenderingController(workUnitStore);
                if (stagedRendering && stagedRendering.finalStage !== null) {
                    stagedRendering.waitForStage(stagedRendering.finalStage).then(()=>scheduleOnNextTick(()=>controller.abort()), noop);
                } else {
                    scheduleOnNextTick(()=>controller.abort());
                }
            }
            return controller.signal;
        case 'prerender-client':
        case 'validation-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
            return undefined;
        default:
            workUnitStore;
    }
}
function noop() {}
function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function useDynamicRouteParams(expression) {
    const workStore = workAsyncStorage.getStore();
    const workUnitStore = workUnitAsyncStorage.getStore();
    if (workStore && workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-client':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        // We are in a prerender with cacheComponents semantics. We are going to
                        // hang here and never resolve. This will cause the currently
                        // rendering component to effectively be a dynamic hole.
                        React.use(makeClientHookHangingPromise(workUnitStore.renderSignal, new ClientHookDynamicError(workStore.route, expression)));
                    }
                    break;
                }
            case 'prerender':
                throw Object.defineProperty(new InvariantError(`\`${expression}\` was called from a Server Component. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E795",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-ppr':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        return postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
                    }
                    break;
                }
            case 'validation-client':
                {
                    break;
                }
            case 'prerender-runtime':
                throw Object.defineProperty(new InvariantError(`\`${expression}\` was called during a runtime prerender. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E771",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
                throw Object.defineProperty(new InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E745",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new InvariantError(`\`${expression}\` was called in \`generateStaticParams\`. Next.js should be preventing ${expression} from being included in server component files statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E1130",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-legacy':
            case 'request':
            case 'unstable-cache':
                break;
            default:
                workUnitStore;
        }
    }
}
function useDynamicSearchParams(expression) {
    const workStore = workAsyncStorage.getStore();
    const workUnitStore = workUnitAsyncStorage.getStore();
    if (!workStore) {
        // We assume pages router context and just return
        return;
    }
    if (!workUnitStore) {
        throwForMissingRequestStore(expression);
    }
    switch(workUnitStore.type){
        case 'validation-client':
            // During instant validation we try to behave as close to client as possible,
            // so this shouldn't hang during SSR.
            return;
        case 'prerender-client':
            {
                React.use(makeClientHookHangingPromise(workUnitStore.renderSignal, new ClientHookDynamicError(workStore.route, expression)));
                break;
            }
        case 'prerender-legacy':
        case 'prerender-ppr':
            {
                if (workStore.forceStatic) {
                    return;
                }
                throw Object.defineProperty(new BailoutToCSRError(expression), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-runtime':
            throw Object.defineProperty(new InvariantError(`\`${expression}\` was called from a Server Component. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E795",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'unstable-cache':
        case 'private-cache':
            throw Object.defineProperty(new InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E745",
                enumerable: false,
                configurable: true
            });
        case 'generate-static-params':
            throw Object.defineProperty(new InvariantError(`\`${expression}\` was called in \`generateStaticParams\`. Next.js should be preventing ${expression} from being included in server component files statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E1130",
                enumerable: false,
                configurable: true
            });
        case 'request':
            return;
        default:
            workUnitStore;
    }
}
const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
// Common implicit body tags that React will treat as body when placed directly in html
const bodyAndImplicitTags = 'body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6';
// Detects when RootLayoutBoundary (our framework marker component) appears
// after Suspense in the component stack, indicating the root layout is wrapped
// within a Suspense boundary. Ensures no body/html/implicit-body components are in between.
//
// Example matches:
//   at Suspense (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
//
// Or with other components in between (but not body/html/implicit-body):
//   at Suspense (<anonymous>)
//   at SomeComponent (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
const hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex = new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:${bodyAndImplicitTags}) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${_lib_framework_boundary_constants__WEBPACK_IMPORTED_MODULE_8__/* .ROOT_LAYOUT_BOUNDARY_NAME */ .ri} \\([^\\n]*\\)`);
const hasMetadataRegex = new RegExp(`\\n\\s+at ${_lib_framework_boundary_constants__WEBPACK_IMPORTED_MODULE_8__/* .METADATA_BOUNDARY_NAME */ .NJ}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${_lib_framework_boundary_constants__WEBPACK_IMPORTED_MODULE_8__/* .VIEWPORT_BOUNDARY_NAME */ .A$}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${_lib_framework_boundary_constants__WEBPACK_IMPORTED_MODULE_8__/* .OUTLET_BOUNDARY_NAME */ .DQ}[\\n\\s]`);
const hasInstantValidationBoundaryRegex = new RegExp(`\\n\\s+at ${_instant_validation_boundary_constants__WEBPACK_IMPORTED_MODULE_9__/* .INSTANT_VALIDATION_BOUNDARY_NAME */ .BH}[\\n\\s]`);
const slotMarkerRegex = new RegExp(`\\n\\s+at ${_instant_validation_boundary_constants__WEBPACK_IMPORTED_MODULE_9__/* .INSTANT_SLOT_MARKER_PREFIX */ .v0}(\\d+)${_instant_validation_boundary_constants__WEBPACK_IMPORTED_MODULE_9__/* .INSTANT_SLOT_MARKER_SUFFIX */ .qp}[\\n\\s]`);
/** Look up the config factory for the slot this error belongs to.
 * Checks the component stack for a slot marker (__next_instant_slot_N__)
 * and returns the config at that index. Falls back to index 0 (root
 * config) when no slot marker is found or the slot has no config. */ function resolveInstantStack(componentStack, dynamicValidation) {
    const { slotStacks } = dynamicValidation;
    if (slotStacks.length > 1) {
        const match = slotMarkerRegex.exec(componentStack);
        if (match) {
            // Slot markers are 0-indexed in the component name but
            // slotStacks is 1-indexed (index 0 is the root config).
            const slotIndex = parseInt(match[1], 10) + 1;
            const slotStack = slotStacks[slotIndex];
            if (slotStack != null) {
                return slotStack;
            }
        }
    }
    // Fall back to root config (index 0)
    return slotStacks[0] ?? null;
}
/**
 * Inspects the component stack of an outlet boundary to discover whether the
 * user placed a Suspense boundary above the document body, and records the
 * opt-in on `dynamicValidation.hasSuspenseAboveBody` if so.
 *
 * The outlet itself isn't a meaningful source of dynamic — it only resolves
 * when metadata/viewport are dynamic, which we track via their own boundaries.
 * However, the outlet renders alongside the page content, so its stack passes
 * through the user's layout chain (typically reaching into `<body>` via the
 * root layout). That makes the outlet stack our best opportunity to spot a
 * Suspense boundary above the body, even when no real body content is dynamic.
 * Without this, a route whose only dynamic source is `generateViewport()` would
 * miss the Suspense-above-body opt-in, because the viewport's stack lives in
 * the head and never sees the user's root layout.
 *
 * We deliberately only set `hasSuspenseAboveBody`, not `hasAllowedDynamic`. The
 * latter tracks whether the body has dynamic content that's been wrapped in
 * Suspense (i.e., the page is partially dynamic). The outlet rendering tells us
 * about the structural opt-in for an empty shell, not about the body being
 * partially dynamic. The distinction matters because dynamic metadata is only
 * acceptable when the page is partially dynamic (via real body holes), and we
 * don't want this outlet-based detection to mask that case.
 */ function trackOutletSuspenseAboveBody(componentStack, dynamicValidation) {
    if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        dynamicValidation.hasSuspenseAboveBody = true;
    }
}
function trackAllowedDynamicAccess(dynamicReason, workStore, componentStack, dynamicValidation, clientDynamic) {
    const syncDynamicError = getPendingClientSyncDynamicError(clientDynamic);
    if (hasOutletRegex.test(componentStack)) {
        trackOutletSuspenseAboveBody(componentStack, dynamicValidation);
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        dynamicValidation.hasDynamicMetadata = true;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        dynamicValidation.hasDynamicViewport = true;
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (syncDynamicError) {
        dynamicValidation.dynamicErrors.push(syncDynamicError);
        return;
    }
    if (isClientHookDynamicError(dynamicReason)) {
        dynamicValidation.dynamicErrors.push(addErrorContext(dynamicReason, componentStack, null));
        return;
    }
    const error = addErrorContext(createDynamicOrRuntimeBodyError(workStore.route), componentStack, null);
    dynamicValidation.dynamicErrors.push(error);
    return;
}
var DynamicHoleKind = /*#__PURE__*/ function(DynamicHoleKind) {
    /** We know that this hole is caused by link data. */ DynamicHoleKind[DynamicHoleKind["Link"] = 1] = "Link";
    /** We know that this hole is caused by runtime data. */ DynamicHoleKind[DynamicHoleKind["Runtime"] = 2] = "Runtime";
    /** We know that this hole is caused by dynamic data. */ DynamicHoleKind[DynamicHoleKind["Dynamic"] = 3] = "Dynamic";
    return DynamicHoleKind;
}({});
function createInstantValidationState(slotStacks) {
    return {
        hasDynamicMetadata: false,
        hasAllowedClientDynamicAboveBoundary: false,
        dynamicMetadata: null,
        hasDynamicViewport: false,
        hasAllowedDynamic: false,
        dynamicErrors: [],
        validationPreventingErrors: [],
        thrownErrorsOutsideBoundary: [],
        slotStacks
    };
}
function trackDynamicHoleInNavigation(dynamicReason, workStore, componentStack, dynamicValidation, clientDynamic, kind, boundaryState) {
    const syncDynamicError = getPendingClientSyncDynamicError(clientDynamic);
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    }
    // Resolve the config stack for this specific error. If the error
    // is inside a slot marker, use that slot's config. Otherwise fall
    // back to the default.
    const effectiveCreateInstantStack = resolveInstantStack(componentStack, dynamicValidation);
    if (hasMetadataRegex.test(componentStack)) {
        const error = addErrorContext(kind === 1 ? createLinkMetadataError(workStore.route) : kind === 2 ? createRuntimeMetadataError(workStore.route) : createDynamicMetadataError(workStore.route), componentStack, effectiveCreateInstantStack);
        dynamicValidation.dynamicMetadata = error;
        return;
    }
    if (hasViewportRegex.test(componentStack)) {
        const error = addErrorContext(kind === 1 ? createLinkViewportError(workStore.route) : kind === 2 ? createRuntimeViewportError(workStore.route) : createDynamicViewportError(workStore.route), componentStack, effectiveCreateInstantStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
    const boundaryLocation = hasInstantValidationBoundaryRegex.exec(componentStack);
    if (!boundaryLocation) {
        // We don't see the validation boundary in the component stack,
        // so this hole must be coming from a shared parent.
        // Shared parents are fully resolved and don't have RSC holes,
        // but they can still suspend in a client component during SSR.
        // If we managed to render all the validation boundaries, that means
        // that the client holes aren't blocking validation and we can disregard them.
        // Note that we don't even care whether they have suspense or not.
        if (allRequiredBoundariesRendered(boundaryState)) {
            dynamicValidation.hasAllowedClientDynamicAboveBoundary = true;
            dynamicValidation.hasAllowedDynamic = true // Holes outside the boundary contribute to allowing dynamic metadata
            ;
            return;
        } else {
            // TODO(instant-validation) TODO(NAR-787)
            // If shared parents blocked us from validating, we should only log
            // the errors from the innermost (segments), i.e. omit layouts whose
            // slots managed to render (because clearly they didn't block validation)
            const message = `Route "${workStore.route}": Could not validate \`instant\` because a Client Component in a parent segment prevented the page from rendering.`;
            const error = addErrorContext(Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E1331",
                enumerable: false,
                configurable: true
            }), componentStack, effectiveCreateInstantStack);
            dynamicValidation.validationPreventingErrors.push(error);
            return;
        }
    } else {
        // The hole originates inside the validation boundary.
        //
        // Check if we have a Suspense above the hole, but below the validation boundary.
        // If we do, then this dynamic usage wouldn't block a navigation to this subtree.
        // Conversely, if the nearest suspense is above the validation boundary, then this subtree would block.
        //
        // Note that in the component stack, children come before parents.
        //
        // Valid:
        //   ...
        //   at Suspense
        //   ...
        //   at __next_prefetch_validation_boundary__
        //
        // Invalid:
        //   ...
        //   at __next_prefetch_validation_boundary__
        //   ...
        //   at Suspense
        //
        const suspenseLocation = hasSuspenseRegex.exec(componentStack);
        if (suspenseLocation) {
            if (suspenseLocation.index < boundaryLocation.index) {
                dynamicValidation.hasAllowedDynamic = true;
                return;
            } else {
            // invalid - fallthrough
            }
        }
    }
    if (syncDynamicError) {
        if (effectiveCreateInstantStack !== null && syncDynamicError.cause === undefined) {
            syncDynamicError.cause = effectiveCreateInstantStack();
        }
        dynamicValidation.dynamicErrors.push(syncDynamicError);
        return;
    }
    if (isClientHookDynamicError(dynamicReason)) {
        dynamicValidation.dynamicErrors.push(addErrorContext(dynamicReason, componentStack, effectiveCreateInstantStack));
        return;
    }
    const error = addErrorContext(kind === 1 ? createLinkBodyErrorInNavigation(workStore.route) : kind === 2 ? createRuntimeBodyErrorInNavigation(workStore.route) : createDynamicBodyErrorInNavigation(workStore.route), componentStack, effectiveCreateInstantStack);
    dynamicValidation.dynamicErrors.push(error);
    return;
}
function trackThrownErrorInNavigation(workStore, dynamicValidation, thrownValue, componentStack) {
    const boundaryLocation = hasInstantValidationBoundaryRegex.exec(componentStack);
    if (!boundaryLocation) {
        // There's no validation boundary on the component stack.
        // This error may have blocked a boundary from rendering.
        // Wrap the error to provide component context.
        // This helps for errors from node_modules which would otherwise
        // have no useful stack information due to ignore-listing,
        // e.g. next/dynamic with `ssr: false`.
        const error = addErrorContext(Object.defineProperty(new Error('An error occurred while attempting to validate instant UI. This error may be preventing the validation from completing.', {
            cause: thrownValue
        }), "__NEXT_ERROR_CODE", {
            value: "E1118",
            enumerable: false,
            configurable: true
        }), componentStack, null);
        dynamicValidation.thrownErrorsOutsideBoundary.push(error);
    } else {
        // There's validation boundary on the component stack,
        // so we know this error didn't block a validation boundary from rendering.
        // However, this error might be hiding be hiding dynamic content that would
        // cause validation to fail.
        const suspenseLocation = hasSuspenseRegex.exec(componentStack);
        if (suspenseLocation) {
            if (suspenseLocation.index < boundaryLocation.index) {
                // There's a Suspense below the validation boundary but above this error's location.
                // This subtree can't fail instant validation because any potential
                // dynamic holes would be guarded by the Suspense anyway,
                // so we can allow this.
                return;
            } else {
            // invalid - fallthrough
            }
        }
        const message = `Route "${workStore.route}": Could not validate \`instant\` because an error prevented the target segment from rendering.`;
        const error = addErrorContext(Object.defineProperty(new Error(message, {
            cause: thrownValue
        }), "__NEXT_ERROR_CODE", {
            value: "E1338",
            enumerable: false,
            configurable: true
        }), componentStack, null // TODO(instant-validation-build): conflicting use of cause
        );
        dynamicValidation.validationPreventingErrors.push(error);
    }
}
function trackDynamicHoleInRuntimeShell(dynamicReason, workStore, componentStack, dynamicValidation, clientDynamic) {
    const syncDynamicError = getPendingClientSyncDynamicError(clientDynamic);
    if (hasOutletRegex.test(componentStack)) {
        trackOutletSuspenseAboveBody(componentStack, dynamicValidation);
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        const error = addErrorContext(createDynamicMetadataError(workStore.route), componentStack, null);
        dynamicValidation.dynamicMetadata = error;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        const error = addErrorContext(createDynamicViewportError(workStore.route), componentStack, null);
        dynamicValidation.dynamicErrors.push(error);
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (syncDynamicError) {
        dynamicValidation.dynamicErrors.push(syncDynamicError);
        return;
    }
    if (isClientHookDynamicError(dynamicReason)) {
        dynamicValidation.dynamicErrors.push(addErrorContext(dynamicReason, componentStack, null));
        return;
    }
    const error = addErrorContext(createDynamicBodyError(workStore.route), componentStack, null);
    dynamicValidation.dynamicErrors.push(error);
    return;
}
function trackDynamicHoleInStaticShell(dynamicReason, workStore, componentStack, dynamicValidation, clientDynamic) {
    const syncDynamicError = getPendingClientSyncDynamicError(clientDynamic);
    if (hasOutletRegex.test(componentStack)) {
        trackOutletSuspenseAboveBody(componentStack, dynamicValidation);
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        const error = addErrorContext(createRuntimeMetadataError(workStore.route), componentStack, null);
        dynamicValidation.dynamicMetadata = error;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        const error = addErrorContext(createRuntimeViewportError(workStore.route), componentStack, null);
        dynamicValidation.dynamicErrors.push(error);
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (syncDynamicError) {
        dynamicValidation.dynamicErrors.push(syncDynamicError);
        return;
    }
    if (isClientHookDynamicError(dynamicReason)) {
        dynamicValidation.dynamicErrors.push(addErrorContext(dynamicReason, componentStack, null));
        return;
    }
    const error = addErrorContext(createRuntimeBodyError(workStore.route), componentStack, null);
    dynamicValidation.dynamicErrors.push(error);
    return;
}
/**
 * In dev mode, we prefer using the owner stack, otherwise the provided
 * component stack is used.
 *
 * Accepts an already-created Error so the SWC error-code plugin can see the
 * `new Error(...)` call at each call site and auto-assign error codes.
 */ function addErrorContext(error, componentStack, createInstantStack) {
    const ownerStack =  false ? 0 : null;
    if (createInstantStack !== null) {
        error.cause = createInstantStack();
    }
    // TODO go back to owner stack here if available. This is temporarily using componentStack to get the right
    //
    error.stack = error.name + ': ' + error.message + (ownerStack || componentStack);
    return error;
}
var PreludeState = /*#__PURE__*/ function(PreludeState) {
    PreludeState[PreludeState["Full"] = 0] = "Full";
    PreludeState[PreludeState["Empty"] = 1] = "Empty";
    PreludeState[PreludeState["Errored"] = 2] = "Errored";
    return PreludeState;
}({});
function logDisallowedDynamicError(workStore, error) {
    console.error(error);
    logBuildDebugHint(workStore.route);
}
function throwIfSyncIOUsed(workStore, serverDynamic) {
    if (serverDynamic.syncDynamicErrorWithStack) {
        logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
        throw new StaticGenBailoutError();
    }
}
function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic, allowEmptyStaticShell) {
    throwIfSyncIOUsed(workStore, serverDynamic);
    // The dynamic metadata error is a mistake-detection signal. It fires when the
    // rest of the shell is otherwise fully static apart from metadata, suggesting
    // the dynamic data access in `generateMetadata` was probably unintentional.
    // That condition is independent of whether the user or build phase accepted
    // an empty shell, so we surface it before any opt-in bypass.
    if (prelude === 0 && dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
        console.error(createDynamicOrRuntimeMetadataError(workStore.route).message);
        throw new StaticGenBailoutError();
    }
    // Either flag expresses "this shell is allowed to be empty/blocking":
    //   - `allowEmptyStaticShell` covers `instant = false` (user opt-in)
    //     and the build-phase fallback-shell case.
    //   - `hasSuspenseAboveBody` is the structural opt-in inside the user's root
    //     layout.
    // Treat them as synonyms for the purpose of bypassing shell-failure errors.
    if (allowEmptyStaticShell || dynamicValidation.hasSuspenseAboveBody) {
        return;
    }
    if (prelude !== 0) {
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            for(let i = 0; i < dynamicErrors.length; i++){
                logDisallowedDynamicError(workStore, dynamicErrors[i]);
            }
            throw new StaticGenBailoutError();
        }
        // If we got this far then the only other thing that could be blocking
        // the root is dynamic Viewport. If this is dynamic then
        // you need to opt into that by adding a Suspense boundary above the body
        // to indicate your are ok with fully dynamic rendering.
        if (dynamicValidation.hasDynamicViewport) {
            console.error(createDynamicOrRuntimeViewportError(workStore.route).message);
            throw new StaticGenBailoutError();
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
            throw new StaticGenBailoutError();
        }
    }
}
function getStaticShellDisallowedDynamicReasons(workStore, prelude, dynamicValidation, allowEmptyStaticShell) {
    // The dynamic metadata error is a mistake-detection signal. It fires when the
    // rest of the shell is otherwise fully static apart from metadata, suggesting
    // the dynamic data access in `generateMetadata` was probably unintentional.
    // That condition is independent of whether the user or build phase accepted
    // an empty shell, so we surface it before any opt-in bypass.
    if (prelude === 0 && dynamicValidation.hasAllowedDynamic === false && dynamicValidation.dynamicErrors.length === 0 && dynamicValidation.dynamicMetadata) {
        return [
            dynamicValidation.dynamicMetadata
        ];
    }
    // Either flag expresses "this shell is allowed to be empty/blocking":
    //   - `allowEmptyStaticShell` covers `instant = false` (user opt-in)
    //     and the build-phase fallback-shell case.
    //   - `hasSuspenseAboveBody` is the structural opt-in inside the user's root
    //     layout.
    // Treat them as synonyms for the purpose of bypassing shell-failure errors.
    if (allowEmptyStaticShell || dynamicValidation.hasSuspenseAboveBody) {
        return [];
    }
    if (prelude !== 0) {
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            return dynamicErrors;
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            return [
                Object.defineProperty(new InvariantError(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
                    value: "E936",
                    enumerable: false,
                    configurable: true
                })
            ];
        }
    }
    // We had a non-empty prelude and there are no dynamic holes
    return [];
}
function getNavigationDisallowedDynamicReasons(workStore, prelude, dynamicValidation, validationSampleTracking, boundaryState, devRenderDidError) {
    // If we have errors related to missing samples, those should take precedence over everything else.
    if (validationSampleTracking) {
        const { missingSampleErrors } = validationSampleTracking;
        if (missingSampleErrors.length > 0) {
            return missingSampleErrors;
        }
    }
    const { validationPreventingErrors } = dynamicValidation;
    if (validationPreventingErrors.length > 0) {
        if (false) {}
        return validationPreventingErrors;
    }
    // NOTE: We don't care about Suspense above body here,
    // we're only concerned with the validation boundary
    if (prelude !== 0) {
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            return dynamicErrors;
        }
        if (prelude === 1 && !dynamicValidation.hasAllowedClientDynamicAboveBoundary && allRequiredBoundariesRendered(boundaryState)) {
            // If we ever get this far then we messed up the tracking of invalid
            // dynamic. (When boundaries are missing the deferred fallback below
            // will surface a more useful error.)
            return Object.defineProperty(new InvariantError(`Route "${workStore.route}" failed to render during instant validation and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
                value: "E1055",
                enumerable: false,
                configurable: true
            });
        }
    } else {
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            return dynamicErrors;
        }
        if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.dynamicMetadata) {
            return [
                dynamicValidation.dynamicMetadata
            ];
        }
    }
    // Missing boundaries on their own aren't a strong signal — a parent
    // layout may legitimately omit a slot. Defer this so the caller can
    // try shallower validation depths first; if every depth comes up
    // empty we still want to surface this so the user is made aware that
    // validation didn't complete. When we add a markers API, the
    // marker-based variant of this check can become strict again.
    if (!allRequiredBoundariesRendered(boundaryState)) {
        const { thrownErrorsOutsideBoundary } = dynamicValidation;
        const rootInstantStack = dynamicValidation.slotStacks[0];
        if (thrownErrorsOutsideBoundary.length === 0) {
            const missingFiles = [];
            for (const [id, filePaths] of boundaryState.requiredIds){
                if (!boundaryState.renderedIds.has(id)) {
                    for (const filePath of filePaths){
                        let normalized = filePath.replace(/^\[project\][\\/]?/, '').replace(process.cwd() + '/', '').replace(process.cwd() + '\\', '');
                        missingFiles.push(normalized);
                    }
                }
            }
            missingFiles.sort();
            return createUnrenderedSegmentError(workStore.route, missingFiles);
        } else if (false) {} else if (thrownErrorsOutsideBoundary.length === 1) {
            const message = `Route "${workStore.route}": Could not validate \`instant\` because the target segment was prevented from rendering, likely due to the following error.`;
            const error = rootInstantStack !== null ? rootInstantStack() : new Error();
            error.name = 'Error';
            error.message = message;
            return new AggregateError([
                error,
                thrownErrorsOutsideBoundary[0]
            ]);
        } else {
            const message = `Route "${workStore.route}": Could not validate \`instant\` because the target segment was prevented from rendering, likely due to one of the following errors.`;
            const error = rootInstantStack !== null ? rootInstantStack() : new Error();
            error.name = 'Error';
            error.message = message;
            return new AggregateError([
                error,
                ...thrownErrorsOutsideBoundary
            ]);
        }
    }
    // We had a non-empty prelude and there are no dynamic holes
    return [];
} //# sourceMappingURL=dynamic-rendering.js.map


/***/ }),

/***/ 3259:
/***/ ((module) => {

var __dirname = "/";
(()=>{"use strict";if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var e={};(()=>{var n=e;Object.defineProperty(n,"__esModule",{value:true});n.pathToRegexp=n.tokensToRegexp=n.regexpToFunction=n.match=n.tokensToFunction=n.compile=n.parse=void 0;function lexer(e){var n=[];var r=0;while(r<e.length){var t=e[r];if(t==="*"||t==="+"||t==="?"){n.push({type:"MODIFIER",index:r,value:e[r++]});continue}if(t==="\\"){n.push({type:"ESCAPED_CHAR",index:r++,value:e[r++]});continue}if(t==="{"){n.push({type:"OPEN",index:r,value:e[r++]});continue}if(t==="}"){n.push({type:"CLOSE",index:r,value:e[r++]});continue}if(t===":"){var a="";var i=r+1;while(i<e.length){var o=e.charCodeAt(i);if(o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122||o===95){a+=e[i++];continue}break}if(!a)throw new TypeError("Missing parameter name at ".concat(r));n.push({type:"NAME",index:r,value:a});r=i;continue}if(t==="("){var c=1;var f="";var i=r+1;if(e[i]==="?"){throw new TypeError('Pattern cannot start with "?" at '.concat(i))}while(i<e.length){if(e[i]==="\\"){f+=e[i++]+e[i++];continue}if(e[i]===")"){c--;if(c===0){i++;break}}else if(e[i]==="("){c++;if(e[i+1]!=="?"){throw new TypeError("Capturing groups are not allowed at ".concat(i))}}f+=e[i++]}if(c)throw new TypeError("Unbalanced pattern at ".concat(r));if(!f)throw new TypeError("Missing pattern at ".concat(r));n.push({type:"PATTERN",index:r,value:f});r=i;continue}n.push({type:"CHAR",index:r,value:e[r++]})}n.push({type:"END",index:r,value:""});return n}function parse(e,n){if(n===void 0){n={}}var r=lexer(e);var t=n.prefixes,a=t===void 0?"./":t,i=n.delimiter,o=i===void 0?"/#?":i;var c=[];var f=0;var u=0;var p="";var tryConsume=function(e){if(u<r.length&&r[u].type===e)return r[u++].value};var mustConsume=function(e){var n=tryConsume(e);if(n!==undefined)return n;var t=r[u],a=t.type,i=t.index;throw new TypeError("Unexpected ".concat(a," at ").concat(i,", expected ").concat(e))};var consumeText=function(){var e="";var n;while(n=tryConsume("CHAR")||tryConsume("ESCAPED_CHAR")){e+=n}return e};var isSafe=function(e){for(var n=0,r=o;n<r.length;n++){var t=r[n];if(e.indexOf(t)>-1)return true}return false};var safePattern=function(e){var n=c[c.length-1];var r=e||(n&&typeof n==="string"?n:"");if(n&&!r){throw new TypeError('Must have text between two parameters, missing text after "'.concat(n.name,'"'))}if(!r||isSafe(r))return"[^".concat(escapeString(o),"]+?");return"(?:(?!".concat(escapeString(r),")[^").concat(escapeString(o),"])+?")};while(u<r.length){var v=tryConsume("CHAR");var s=tryConsume("NAME");var d=tryConsume("PATTERN");if(s||d){var g=v||"";if(a.indexOf(g)===-1){p+=g;g=""}if(p){c.push(p);p=""}c.push({name:s||f++,prefix:g,suffix:"",pattern:d||safePattern(g),modifier:tryConsume("MODIFIER")||""});continue}var x=v||tryConsume("ESCAPED_CHAR");if(x){p+=x;continue}if(p){c.push(p);p=""}var h=tryConsume("OPEN");if(h){var g=consumeText();var l=tryConsume("NAME")||"";var m=tryConsume("PATTERN")||"";var T=consumeText();mustConsume("CLOSE");c.push({name:l||(m?f++:""),pattern:l&&!m?safePattern(g):m,prefix:g,suffix:T,modifier:tryConsume("MODIFIER")||""});continue}mustConsume("END")}return c}n.parse=parse;function compile(e,n){return tokensToFunction(parse(e,n),n)}n.compile=compile;function tokensToFunction(e,n){if(n===void 0){n={}}var r=flags(n);var t=n.encode,a=t===void 0?function(e){return e}:t,i=n.validate,o=i===void 0?true:i;var c=e.map((function(e){if(typeof e==="object"){return new RegExp("^(?:".concat(e.pattern,")$"),r)}}));return function(n){var r="";for(var t=0;t<e.length;t++){var i=e[t];if(typeof i==="string"){r+=i;continue}var f=n?n[i.name]:undefined;var u=i.modifier==="?"||i.modifier==="*";var p=i.modifier==="*"||i.modifier==="+";if(Array.isArray(f)){if(!p){throw new TypeError('Expected "'.concat(i.name,'" to not repeat, but got an array'))}if(f.length===0){if(u)continue;throw new TypeError('Expected "'.concat(i.name,'" to not be empty'))}for(var v=0;v<f.length;v++){var s=a(f[v],i);if(o&&!c[t].test(s)){throw new TypeError('Expected all "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(s,'"'))}r+=i.prefix+s+i.suffix}continue}if(typeof f==="string"||typeof f==="number"){var s=a(String(f),i);if(o&&!c[t].test(s)){throw new TypeError('Expected "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(s,'"'))}r+=i.prefix+s+i.suffix;continue}if(u)continue;var d=p?"an array":"a string";throw new TypeError('Expected "'.concat(i.name,'" to be ').concat(d))}return r}}n.tokensToFunction=tokensToFunction;function match(e,n){var r=[];var t=pathToRegexp(e,r,n);return regexpToFunction(t,r,n)}n.match=match;function regexpToFunction(e,n,r){if(r===void 0){r={}}var t=r.decode,a=t===void 0?function(e){return e}:t;return function(r){var t=e.exec(r);if(!t)return false;var i=t[0],o=t.index;var c=Object.create(null);var _loop_1=function(e){if(t[e]===undefined)return"continue";var r=n[e-1];if(r.modifier==="*"||r.modifier==="+"){c[r.name]=t[e].split(r.prefix+r.suffix).map((function(e){return a(e,r)}))}else{c[r.name]=a(t[e],r)}};for(var f=1;f<t.length;f++){_loop_1(f)}return{path:i,index:o,params:c}}}n.regexpToFunction=regexpToFunction;function escapeString(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function flags(e){return e&&e.sensitive?"":"i"}function regexpToRegexp(e,n){if(!n)return e;var r=/\((?:\?<(.*?)>)?(?!\?)/g;var t=0;var a=r.exec(e.source);while(a){n.push({name:a[1]||t++,prefix:"",suffix:"",modifier:"",pattern:""});a=r.exec(e.source)}return e}function arrayToRegexp(e,n,r){var t=e.map((function(e){return pathToRegexp(e,n,r).source}));return new RegExp("(?:".concat(t.join("|"),")"),flags(r))}function stringToRegexp(e,n,r){return tokensToRegexp(parse(e,r),n,r)}function tokensToRegexp(e,n,r){if(r===void 0){r={}}var t=r.strict,a=t===void 0?false:t,i=r.start,o=i===void 0?true:i,c=r.end,f=c===void 0?true:c,u=r.encode,p=u===void 0?function(e){return e}:u,v=r.delimiter,s=v===void 0?"/#?":v,d=r.endsWith,g=d===void 0?"":d;var x="[".concat(escapeString(g),"]|$");var h="[".concat(escapeString(s),"]");var l=o?"^":"";for(var m=0,T=e;m<T.length;m++){var E=T[m];if(typeof E==="string"){l+=escapeString(p(E))}else{var w=escapeString(p(E.prefix));var y=escapeString(p(E.suffix));if(E.pattern){if(n)n.push(E);if(w||y){if(E.modifier==="+"||E.modifier==="*"){var R=E.modifier==="*"?"?":"";l+="(?:".concat(w,"((?:").concat(E.pattern,")(?:").concat(y).concat(w,"(?:").concat(E.pattern,"))*)").concat(y,")").concat(R)}else{l+="(?:".concat(w,"(").concat(E.pattern,")").concat(y,")").concat(E.modifier)}}else{if(E.modifier==="+"||E.modifier==="*"){throw new TypeError('Can not repeat "'.concat(E.name,'" without a prefix and suffix'))}l+="(".concat(E.pattern,")").concat(E.modifier)}}else{l+="(?:".concat(w).concat(y,")").concat(E.modifier)}}}if(f){if(!a)l+="".concat(h,"?");l+=!r.endsWith?"$":"(?=".concat(x,")")}else{var A=e[e.length-1];var _=typeof A==="string"?h.indexOf(A[A.length-1])>-1:A===undefined;if(!a){l+="(?:".concat(h,"(?=").concat(x,"))?")}if(!_){l+="(?=".concat(h,"|").concat(x,")")}}return new RegExp(l,flags(r))}n.tokensToRegexp=tokensToRegexp;function pathToRegexp(e,n,r){if(e instanceof RegExp)return regexpToRegexp(e,n);if(Array.isArray(e))return arrayToRegexp(e,n,r);return stringToRegexp(e,n,r)}n.pathToRegexp=pathToRegexp})();module.exports=e})();

/***/ }),

/***/ 3297:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports BailoutToCSRError, isBailoutToCSRError */
// This has to be a shared module which is shared between client component error boundary and dynamic component
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
/** An error that should be thrown when we want to bail out to client-side rendering. */ class BailoutToCSRError extends Error {
    constructor(reason){
        super(`Bail out to client-side rendering: ${reason}`), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
/** Checks if a passed argument is an error that is thrown if we want to bail out to client-side rendering. */ function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map


/***/ }),

/***/ 3645:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q9: () => (/* binding */ createRequestStoreForAPI)
/* harmony export */ });
/* unused harmony exports createRequestStoreForRender, createRequestStore, synchronizeMutableCookies */
/* harmony import */ var _client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2728);
/* harmony import */ var _web_spec_extension_adapters_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6271);
/* harmony import */ var _web_spec_extension_adapters_request_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6208);
/* harmony import */ var _web_spec_extension_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4387);
/* harmony import */ var _draft_mode_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8961);
/* harmony import */ var _web_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9535);






/**
 * Internal request headers that userland `headers()` must not expose. They stay
 * on the shared request headers for framework plumbing.
 *
 * Every internal header that the client can send must be listed here. The
 * sealed userland view reads through to the shared request headers, so an
 * omission leaks the header to userland.
 *
 * The names are lowercased because `HeadersAdapter.seal` matches them in
 * lowercase.
 */ const HIDDEN_REQUEST_HEADERS = new Set([
    ..._client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_0__/* .FLIGHT_HEADERS */ .KD,
    // The client sends these dev-only request IDs so the server can route debug
    // information back to the originating request. Like the flight headers,
    // they are internal plumbing.
    _client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_REQUEST_ID_HEADER */ .e9,
    _client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_HTML_REQUEST_ID_HEADER */ .Kb
].map((header)=>header.toLowerCase()));
function getHeaders(headers) {
    // The sealed userland view must not copy the request headers.
    // `HeadersAdapter.from` returns a `Headers` instance unchanged, so the view
    // reads through to `NextRequest.headers`. A copy detaches `headers()` from
    // the writes that Proxy makes to `NextRequest.headers` afterwards.
    //
    // The view must also not delete the internal headers. Because
    // `HeadersAdapter.from` does not copy, a delete removes them from the shared
    // `req.headers`. The dev server reads the request-id headers from the raw
    // request again, for example when it renders a redirect target after a server
    // action. Their removal breaks the dev debug channel routing.
    return _web_spec_extension_adapters_headers__WEBPACK_IMPORTED_MODULE_1__/* .HeadersAdapter */ .o.seal(_web_spec_extension_adapters_headers__WEBPACK_IMPORTED_MODULE_1__/* .HeadersAdapter */ .o.from(headers), HIDDEN_REQUEST_HEADERS);
}
function getMutableCookies(headers, onUpdateCookies) {
    const cookies = new _web_spec_extension_cookies__WEBPACK_IMPORTED_MODULE_3__/* .RequestCookies */ .tm(_web_spec_extension_adapters_headers__WEBPACK_IMPORTED_MODULE_1__/* .HeadersAdapter */ .o.from(headers));
    return _web_spec_extension_adapters_request_cookies__WEBPACK_IMPORTED_MODULE_2__/* .MutableRequestCookiesAdapter */ .K8.wrap(cookies, onUpdateCookies);
}
/**
 * If middleware set cookies in this request (indicated by `x-middleware-set-cookie`),
 * then merge those into the existing cookie object, so that when `cookies()` is accessed
 * it's able to read the newly set cookies.
 */ function mergeMiddlewareCookies(headers, existingCookies) {
    // TODO: this only fires for `IncomingHttpHeaders`; `Headers` instances
    // silently fall through (the `in` check and bracket access don't reach header
    // values stored in internal slots). Confirm whether edge / Web `Headers`
    // callers need this merge or already handle it elsewhere.
    if ('x-middleware-set-cookie' in headers && typeof headers['x-middleware-set-cookie'] === 'string') {
        const setCookieValue = headers['x-middleware-set-cookie'];
        const responseHeaders = new Headers();
        for (const cookie of (0,_web_utils__WEBPACK_IMPORTED_MODULE_5__/* .splitCookiesString */ .RD)(setCookieValue)){
            responseHeaders.append('set-cookie', cookie);
        }
        const responseCookies = new _web_spec_extension_cookies__WEBPACK_IMPORTED_MODULE_3__/* .ResponseCookies */ .VO(responseHeaders);
        // Transfer cookies from ResponseCookies to RequestCookies
        for (const cookie of responseCookies.getAll()){
            existingCookies.set(cookie);
        }
    }
}
function createRequestStoreForRender(req, res, url, rootParams, implicitTags, onUpdateCookies, previewProps, isHmrRefresh, serverComponentsHmrCache, resumeDataCache, fallbackParams, hmrRefreshHash) {
    return createRequestStore({
        // Pages start in render phase by default
        phase: 'render',
        headers: req.headers,
        onUpdateCookies: onUpdateCookies ?? (res ? (cookies)=>{
            res.setHeader('Set-Cookie', cookies);
        } : undefined),
        url,
        rootParams,
        implicitTags,
        resumeDataCache,
        previewProps,
        isHmrRefresh,
        serverComponentsHmrCache,
        hmrRefreshHash,
        fallbackParams
    });
}
function createRequestStoreForAPI(req, url, implicitTags, onUpdateCookies, previewProps, hmrRefreshHash) {
    return createRequestStore({
        // API routes start in action phase by default
        phase: 'action',
        headers: req.headers,
        onUpdateCookies,
        url,
        rootParams: {},
        implicitTags,
        resumeDataCache: null,
        previewProps,
        isHmrRefresh: false,
        serverComponentsHmrCache: undefined,
        hmrRefreshHash,
        fallbackParams: null
    });
}
/**
 * Build a `RequestStore` from a serializable, request-shaped input. Used
 * directly by the existing `createRequestStoreForRender` /
 * `createRequestStoreForAPI` wrappers, and by side-process consumers like the
 * `'use cache'` deadlock probe worker that don't have a real `req`/`res` pair
 * but do have a forwarded snapshot of the outer request's headers etc.
 */ function createRequestStore(inputs) {
    const { phase, headers, onUpdateCookies, url, rootParams, implicitTags, resumeDataCache, previewProps, isHmrRefresh, serverComponentsHmrCache, hmrRefreshHash, fallbackParams } = inputs;
    const cache = {};
    return {
        type: 'request',
        phase,
        implicitTags,
        // Rather than just using the whole `url` here, we pull the parts we want
        // to ensure we don't use parts of the URL that we shouldn't. This also
        // lets us avoid requiring an empty string for `search` in the type.
        url: {
            pathname: url.pathname,
            search: url.search ?? ''
        },
        rootParams,
        get headers () {
            if (!cache.headers) {
                // Seal the headers object that'll freeze out any methods that could
                // mutate the underlying data.
                cache.headers = getHeaders(headers);
            }
            return cache.headers;
        },
        get cookies () {
            if (!cache.cookies) {
                // if middleware is setting cookie(s), then include those in
                // the initial cached cookies so they can be read in render
                const requestCookies = new _web_spec_extension_cookies__WEBPACK_IMPORTED_MODULE_3__/* .RequestCookies */ .tm(_web_spec_extension_adapters_headers__WEBPACK_IMPORTED_MODULE_1__/* .HeadersAdapter */ .o.from(headers));
                mergeMiddlewareCookies(headers, requestCookies);
                // Seal the cookies object that'll freeze out any methods that could
                // mutate the underlying data.
                cache.cookies = _web_spec_extension_adapters_request_cookies__WEBPACK_IMPORTED_MODULE_2__/* .RequestCookiesAdapter */ .Ck.seal(requestCookies);
            }
            return cache.cookies;
        },
        set cookies (value){
            cache.cookies = value;
        },
        get mutableCookies () {
            if (!cache.mutableCookies) {
                const mutableCookies = getMutableCookies(headers, onUpdateCookies);
                mergeMiddlewareCookies(headers, mutableCookies);
                cache.mutableCookies = mutableCookies;
            }
            return cache.mutableCookies;
        },
        get userspaceMutableCookies () {
            if (!cache.userspaceMutableCookies) {
                const userspaceMutableCookies = (0,_web_spec_extension_adapters_request_cookies__WEBPACK_IMPORTED_MODULE_2__/* .createCookiesWithMutableAccessCheck */ .EJ)(this);
                cache.userspaceMutableCookies = userspaceMutableCookies;
            }
            return cache.userspaceMutableCookies;
        },
        get draftMode () {
            if (!cache.draftMode) {
                cache.draftMode = new _draft_mode_provider__WEBPACK_IMPORTED_MODULE_4__/* .DraftModeProvider */ .U(previewProps, headers, this.cookies, this.mutableCookies);
            }
            return cache.draftMode;
        },
        resumeDataCache: resumeDataCache ?? null,
        isHmrRefresh,
        serverComponentsHmrCache: serverComponentsHmrCache || globalThis.__serverComponentsHmrCache,
        hmrRefreshHash,
        fallbackParams
    };
}
function synchronizeMutableCookies(store) {
    // TODO: does this need to update headers as well?
    store.cookies = RequestCookiesAdapter.seal(responseCookiesToRequestCookies(store.mutableCookies));
} //# sourceMappingURL=request-store.js.map


/***/ }),

/***/ 3914:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $8: () => (/* binding */ extractInterceptionRouteInformation),
/* harmony export */   m1: () => (/* binding */ isInterceptionRouteAppPath)
/* harmony export */ });
/* unused harmony export INTERCEPTION_ROUTE_MARKERS */
/* harmony import */ var _app_paths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8947);

// order matters here, the first match will be used
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
    interceptingRoute = (0,_app_paths__WEBPACK_IMPORTED_MODULE_0__/* .normalizeAppPath */ .Yr)(interceptingRoute) // normalize the path, e.g. /(blog)/feed -> /feed
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

/***/ 3987:
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
    interceptTestApis: function() {
        return interceptTestApis;
    },
    wrapRequestHandler: function() {
        return wrapRequestHandler;
    }
});
const _context = __webpack_require__(2643);
const _fetch = __webpack_require__(1318);
function interceptTestApis() {
    return (0, _fetch.interceptFetch)(__webpack_require__.g.fetch);
}
function wrapRequestHandler(handler) {
    return (req, fn)=>(0, _context.withRequest)(req, _fetch.reader, ()=>handler(req, fn));
}

//# sourceMappingURL=server-edge.js.map

/***/ }),

/***/ 4042:
/***/ ((module) => {

var __dirname = "/";
(function(){"use strict";var e={431:function(e){function assertPath(e){if(typeof e!=="string"){throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}}function normalizeStringPosix(e,r){var t="";var i=0;var n=-1;var a=0;var f;for(var l=0;l<=e.length;++l){if(l<e.length)f=e.charCodeAt(l);else if(f===47)break;else f=47;if(f===47){if(n===l-1||a===1){}else if(n!==l-1&&a===2){if(t.length<2||i!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){var s=t.lastIndexOf("/");if(s!==t.length-1){if(s===-1){t="";i=0}else{t=t.slice(0,s);i=t.length-1-t.lastIndexOf("/")}n=l;a=0;continue}}else if(t.length===2||t.length===1){t="";i=0;n=l;a=0;continue}}if(r){if(t.length>0)t+="/..";else t="..";i=2}}else{if(t.length>0)t+="/"+e.slice(n+1,l);else t=e.slice(n+1,l);i=l-n-1}n=l;a=0}else if(f===46&&a!==-1){++a}else{a=-1}}return t}function _format(e,r){var t=r.dir||r.root;var i=r.base||(r.name||"")+(r.ext||"");if(!t){return i}if(t===r.root){return t+i}return t+e+i}var r={resolve:function resolve(){var e="";var r=false;var t;for(var i=arguments.length-1;i>=-1&&!r;i--){var n;if(i>=0)n=arguments[i];else{if(t===undefined)t="";n=t}assertPath(n);if(n.length===0){continue}e=n+"/"+e;r=n.charCodeAt(0)===47}e=normalizeStringPosix(e,!r);if(r){if(e.length>0)return"/"+e;else return"/"}else if(e.length>0){return e}else{return"."}},normalize:function normalize(e){assertPath(e);if(e.length===0)return".";var r=e.charCodeAt(0)===47;var t=e.charCodeAt(e.length-1)===47;e=normalizeStringPosix(e,!r);if(e.length===0&&!r)e=".";if(e.length>0&&t)e+="/";if(r)return"/"+e;return e},isAbsolute:function isAbsolute(e){assertPath(e);return e.length>0&&e.charCodeAt(0)===47},join:function join(){if(arguments.length===0)return".";var e;for(var t=0;t<arguments.length;++t){var i=arguments[t];assertPath(i);if(i.length>0){if(e===undefined)e=i;else e+="/"+i}}if(e===undefined)return".";return r.normalize(e)},relative:function relative(e,t){assertPath(e);assertPath(t);if(e===t)return"";e=r.resolve(e);t=r.resolve(t);if(e===t)return"";var i=1;for(;i<e.length;++i){if(e.charCodeAt(i)!==47)break}var n=e.length;var a=n-i;var f=1;for(;f<t.length;++f){if(t.charCodeAt(f)!==47)break}var l=t.length;var s=l-f;var o=a<s?a:s;var u=-1;var h=0;for(;h<=o;++h){if(h===o){if(s>o){if(t.charCodeAt(f+h)===47){return t.slice(f+h+1)}else if(h===0){return t.slice(f+h)}}else if(a>o){if(e.charCodeAt(i+h)===47){u=h}else if(h===0){u=0}}break}var c=e.charCodeAt(i+h);var v=t.charCodeAt(f+h);if(c!==v)break;else if(c===47)u=h}var g="";for(h=i+u+1;h<=n;++h){if(h===n||e.charCodeAt(h)===47){if(g.length===0)g+="..";else g+="/.."}}if(g.length>0)return g+t.slice(f+u);else{f+=u;if(t.charCodeAt(f)===47)++f;return t.slice(f)}},_makeLong:function _makeLong(e){return e},dirname:function dirname(e){assertPath(e);if(e.length===0)return".";var r=e.charCodeAt(0);var t=r===47;var i=-1;var n=true;for(var a=e.length-1;a>=1;--a){r=e.charCodeAt(a);if(r===47){if(!n){i=a;break}}else{n=false}}if(i===-1)return t?"/":".";if(t&&i===1)return"//";return e.slice(0,i)},basename:function basename(e,r){if(r!==undefined&&typeof r!=="string")throw new TypeError('"ext" argument must be a string');assertPath(e);var t=0;var i=-1;var n=true;var a;if(r!==undefined&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var f=r.length-1;var l=-1;for(a=e.length-1;a>=0;--a){var s=e.charCodeAt(a);if(s===47){if(!n){t=a+1;break}}else{if(l===-1){n=false;l=a+1}if(f>=0){if(s===r.charCodeAt(f)){if(--f===-1){i=a}}else{f=-1;i=l}}}}if(t===i)i=l;else if(i===-1)i=e.length;return e.slice(t,i)}else{for(a=e.length-1;a>=0;--a){if(e.charCodeAt(a)===47){if(!n){t=a+1;break}}else if(i===-1){n=false;i=a+1}}if(i===-1)return"";return e.slice(t,i)}},extname:function extname(e){assertPath(e);var r=-1;var t=0;var i=-1;var n=true;var a=0;for(var f=e.length-1;f>=0;--f){var l=e.charCodeAt(f);if(l===47){if(!n){t=f+1;break}continue}if(i===-1){n=false;i=f+1}if(l===46){if(r===-1)r=f;else if(a!==1)a=1}else if(r!==-1){a=-1}}if(r===-1||i===-1||a===0||a===1&&r===i-1&&r===t+1){return""}return e.slice(r,i)},format:function format(e){if(e===null||typeof e!=="object"){throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e)}return _format("/",e)},parse:function parse(e){assertPath(e);var r={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return r;var t=e.charCodeAt(0);var i=t===47;var n;if(i){r.root="/";n=1}else{n=0}var a=-1;var f=0;var l=-1;var s=true;var o=e.length-1;var u=0;for(;o>=n;--o){t=e.charCodeAt(o);if(t===47){if(!s){f=o+1;break}continue}if(l===-1){s=false;l=o+1}if(t===46){if(a===-1)a=o;else if(u!==1)u=1}else if(a!==-1){u=-1}}if(a===-1||l===-1||u===0||u===1&&a===l-1&&a===f+1){if(l!==-1){if(f===0&&i)r.base=r.name=e.slice(1,l);else r.base=r.name=e.slice(f,l)}}else{if(f===0&&i){r.name=e.slice(1,a);r.base=e.slice(1,l)}else{r.name=e.slice(f,a);r.base=e.slice(f,l)}r.ext=e.slice(a,l)}if(f>0)r.dir=e.slice(0,f-1);else if(i)r.dir="/";return r},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r;e.exports=r}};var r={};function __nccwpck_require__(t){var i=r[t];if(i!==undefined){return i.exports}var n=r[t]={exports:{}};var a=true;try{e[t](n,n.exports,__nccwpck_require__);a=false}finally{if(a)delete r[t]}return n.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var t=__nccwpck_require__(431);module.exports=t})();

/***/ }),

/***/ 4133:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ NextRequest)
/* harmony export */ });
/* unused harmony export INTERNALS */
/* harmony import */ var _next_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2193);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9535);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9802);
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4387);




const INTERNALS = Symbol('internal request');
/**
 * This class extends the [Web `Request` API](https://developer.mozilla.org/docs/Web/API/Request) with additional convenience methods.
 *
 * Read more: [Next.js Docs: `NextRequest`](https://nextjs.org/docs/app/api-reference/functions/next-request)
 */ class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== 'string' && 'url' in input ? input.url : String(input);
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .validateURL */ .qU)(url);
        // node Request instance requires duplex option when a body
        // is present or it errors, we don't handle this for
        // Request being passed in since it would have already
        // errored if this wasn't configured
        if (false) {}
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new _next_url__WEBPACK_IMPORTED_MODULE_0__/* .NextURL */ .X(url, {
            headers: (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .toNodeOutgoingHttpHeaders */ .Cu)(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new _cookies__WEBPACK_IMPORTED_MODULE_3__/* .RequestCookies */ .tm(this.headers),
            nextUrl,
            url:  false ? 0 : nextUrl.toString()
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new _error__WEBPACK_IMPORTED_MODULE_2__/* .RemovedPageError */ .Yq();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new _error__WEBPACK_IMPORTED_MODULE_2__/* .RemovedUAError */ .l_();
    }
    get url() {
        return this[INTERNALS].url;
    }
}

//# sourceMappingURL=request.js.map

/***/ }),

/***/ 4188:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports getRouteRegex, getNamedRouteRegex, getNamedMiddlewareRegex */
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1276);
/* harmony import */ var _get_dynamic_param__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);





function getParametrizedRoute(route, includeSuffix, includePrefix) {
    const groups = {};
    let groupIndex = 1;
    const segments = [];
    for (const segment of removeTrailingSlash(route).slice(1).split('/')){
        const markerMatch = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        const paramMatches = segment.match(PARAMETER_PATTERN) // Check for parameters
        ;
        if (markerMatch && paramMatches && paramMatches[2]) {
            const { key, optional, repeat } = parseMatchedParameter(paramMatches[2]);
            groups[key] = {
                pos: groupIndex++,
                repeat,
                optional
            };
            segments.push(`/${escapeStringRegexp(markerMatch)}([^/]+?)`);
        } else if (paramMatches && paramMatches[2]) {
            const { key, repeat, optional } = parseMatchedParameter(paramMatches[2]);
            groups[key] = {
                pos: groupIndex++,
                repeat,
                optional
            };
            if (includePrefix && paramMatches[1]) {
                segments.push(`/${escapeStringRegexp(paramMatches[1])}`);
            }
            let s = repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
            // Remove the leading slash if includePrefix already added it.
            if (includePrefix && paramMatches[1]) {
                s = s.substring(1);
            }
            segments.push(s);
        } else {
            segments.push(`/${escapeStringRegexp(segment)}`);
        }
        // If there's a suffix, add it to the segments if it's enabled.
        if (includeSuffix && paramMatches && paramMatches[3]) {
            segments.push(escapeStringRegexp(paramMatches[3]));
        }
    }
    return {
        parameterizedRoute: segments.join(''),
        groups
    };
}
/**
 * From a normalized route this function generates a regular expression and
 * a corresponding groups object intended to be used to store matching groups
 * from the regular expression.
 */ function getRouteRegex(normalizedRoute, { includeSuffix = false, includePrefix = false, excludeOptionalTrailingSlash = false } = {}) {
    const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute, includeSuffix, includePrefix);
    let re = parameterizedRoute;
    if (!excludeOptionalTrailingSlash) {
        re += '(?:/)?';
    }
    return {
        re: new RegExp(`^${re}$`),
        groups: groups
    };
}
/**
 * Builds a function to generate a minimal routeKey using only a-z and minimal
 * number of characters.
 */ function buildGetSafeRouteKey() {
    let i = 0;
    return ()=>{
        let routeKey = '';
        let j = ++i;
        while(j > 0){
            routeKey += String.fromCharCode(97 + (j - 1) % 26);
            j = Math.floor((j - 1) / 26);
        }
        return routeKey;
    };
}
function getSafeKeyFromSegment({ interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix, backreferenceDuplicateKeys }) {
    const { key, optional, repeat } = parseMatchedParameter(segment);
    // replace any non-word characters since they can break
    // the named regex
    let cleanedKey = key.replace(/\W/g, '');
    if (keyPrefix) {
        cleanedKey = `${keyPrefix}${cleanedKey}`;
    }
    let invalidKey = false;
    // check if the key is still invalid and fallback to using a known
    // safe key
    if (cleanedKey.length === 0 || cleanedKey.length > 30) {
        invalidKey = true;
    }
    if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
        invalidKey = true;
    }
    if (invalidKey) {
        cleanedKey = getSafeRouteKey();
    }
    const duplicateKey = cleanedKey in routeKeys;
    if (keyPrefix) {
        routeKeys[cleanedKey] = `${keyPrefix}${key}`;
    } else {
        routeKeys[cleanedKey] = key;
    }
    // if the segment has an interception marker, make sure that's part of the regex pattern
    // this is to ensure that the route with the interception marker doesn't incorrectly match
    // the non-intercepted route (ie /app/(.)[username] should not match /app/[username])
    const interceptionPrefix = interceptionMarker ? escapeStringRegexp(interceptionMarker) : '';
    let pattern;
    if (duplicateKey && backreferenceDuplicateKeys) {
        // Use a backreference to the key to ensure that the key is the same value
        // in each of the placeholders.
        pattern = `\\k<${cleanedKey}>`;
    } else if (repeat) {
        pattern = `(?<${cleanedKey}>.+?)`;
    } else {
        pattern = `(?<${cleanedKey}>[^/]+?)`;
    }
    return {
        key,
        pattern: optional ? `(?:/${interceptionPrefix}${pattern})?` : `/${interceptionPrefix}${pattern}`,
        cleanedKey: cleanedKey,
        optional,
        repeat
    };
}
function getNamedParametrizedRoute(route, prefixRouteKeys, includeSuffix, includePrefix, backreferenceDuplicateKeys, reference = {
    names: {},
    intercepted: {}
}) {
    const getSafeRouteKey = buildGetSafeRouteKey();
    const routeKeys = {};
    const segments = [];
    const inverseParts = [];
    // Ensure we don't mutate the original reference object.
    reference = structuredClone(reference);
    for (const segment of removeTrailingSlash(route).slice(1).split('/')){
        const hasInterceptionMarker = INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m));
        const paramMatches = segment.match(PARAMETER_PATTERN) // Check for parameters
        ;
        const interceptionMarker = hasInterceptionMarker ? paramMatches?.[1] : undefined;
        let keyPrefix;
        if (interceptionMarker && paramMatches?.[2]) {
            keyPrefix = prefixRouteKeys ? NEXT_INTERCEPTION_MARKER_PREFIX : undefined;
            reference.intercepted[paramMatches[2]] = interceptionMarker;
        } else if (paramMatches?.[2] && reference.intercepted[paramMatches[2]]) {
            keyPrefix = prefixRouteKeys ? NEXT_INTERCEPTION_MARKER_PREFIX : undefined;
        } else {
            keyPrefix = prefixRouteKeys ? NEXT_QUERY_PARAM_PREFIX : undefined;
        }
        if (interceptionMarker && paramMatches && paramMatches[2]) {
            // If there's an interception marker, add it to the segments.
            const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
                getSafeRouteKey,
                interceptionMarker,
                segment: paramMatches[2],
                routeKeys,
                keyPrefix,
                backreferenceDuplicateKeys
            });
            segments.push(pattern);
            inverseParts.push(`/${paramMatches[1]}:${reference.names[key] ?? cleanedKey}${repeat ? optional ? '*' : '+' : ''}`);
            reference.names[key] ??= cleanedKey;
        } else if (paramMatches && paramMatches[2]) {
            // If there's a prefix, add it to the segments if it's enabled.
            if (includePrefix && paramMatches[1]) {
                segments.push(`/${escapeStringRegexp(paramMatches[1])}`);
                inverseParts.push(`/${paramMatches[1]}`);
            }
            const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
                getSafeRouteKey,
                segment: paramMatches[2],
                routeKeys,
                keyPrefix,
                backreferenceDuplicateKeys
            });
            // Remove the leading slash if includePrefix already added it.
            let s = pattern;
            if (includePrefix && paramMatches[1]) {
                s = s.substring(1);
            }
            segments.push(s);
            inverseParts.push(`/:${reference.names[key] ?? cleanedKey}${repeat ? optional ? '*' : '+' : ''}`);
            reference.names[key] ??= cleanedKey;
        } else {
            segments.push(`/${escapeStringRegexp(segment)}`);
            inverseParts.push(`/${segment}`);
        }
        // If there's a suffix, add it to the segments if it's enabled.
        if (includeSuffix && paramMatches && paramMatches[3]) {
            segments.push(escapeStringRegexp(paramMatches[3]));
            inverseParts.push(paramMatches[3]);
        }
    }
    return {
        namedParameterizedRoute: segments.join(''),
        routeKeys,
        pathToRegexpPattern: inverseParts.join(''),
        reference
    };
}
/**
 * This function extends `getRouteRegex` generating also a named regexp where
 * each group is named along with a routeKeys object that indexes the assigned
 * named group with its corresponding key. When the routeKeys need to be
 * prefixed to uniquely identify internally the "prefixRouteKey" arg should
 * be "true" currently this is only the case when creating the routes-manifest
 * during the build
 */ function getNamedRouteRegex(normalizedRoute, options) {
    const result = getNamedParametrizedRoute(normalizedRoute, options.prefixRouteKeys, options.includeSuffix ?? false, options.includePrefix ?? false, options.backreferenceDuplicateKeys ?? false, options.reference);
    let namedRegex = result.namedParameterizedRoute;
    if (!options.excludeOptionalTrailingSlash) {
        namedRegex += '(?:/)?';
    }
    return {
        ...getRouteRegex(normalizedRoute, options),
        namedRegex: `^${namedRegex}$`,
        routeKeys: result.routeKeys,
        pathToRegexpPattern: result.pathToRegexpPattern,
        reference: result.reference
    };
}
/**
 * Generates a named regexp.
 * This is intended to be using for build time only.
 */ function getNamedMiddlewareRegex(normalizedRoute, options) {
    const { parameterizedRoute } = getParametrizedRoute(normalizedRoute, false, false);
    const { catchAll = true } = options;
    if (parameterizedRoute === '/') {
        let catchAllRegex = catchAll ? '.*' : '';
        return {
            namedRegex: `^/${catchAllRegex}$`
        };
    }
    const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false, false, false, false, undefined);
    let catchAllGroupedRegex = catchAll ? '(?:(/.*)?)' : '';
    return {
        namedRegex: `^${namedParameterizedRoute}${catchAllGroupedRegex}$`
    };
} //# sourceMappingURL=route-regex.js.map


/***/ }),

/***/ 4352:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ removePathPrefix)
/* harmony export */ });
/* harmony import */ var _path_has_prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9866);

/**
 * Given a path and a prefix it will remove the prefix when it exists in the
 * given path. It ensures it matches exactly without containing extra chars
 * and if the prefix is not there it will be noop.
 *
 * @param path The path to remove the prefix from.
 * @param prefix The prefix to be removed.
 */ function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!(0,_path_has_prefix__WEBPACK_IMPORTED_MODULE_0__/* .pathHasPrefix */ .m)(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith('/')) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return `/${withoutPrefix}`;
} //# sourceMappingURL=remove-path-prefix.js.map


/***/ }),

/***/ 4387:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ud: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.stringifyCookie),
/* harmony export */   VO: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.ResponseCookies),
/* harmony export */   tm: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.RequestCookies)
/* harmony export */ });
/* harmony import */ var next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5918);
/* harmony import */ var next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__);


//# sourceMappingURL=cookies.js.map

/***/ }),

/***/ 4413:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Du: () => (/* binding */ ActionDidRevalidateStaticAndDynamic)
/* harmony export */ });
/* unused harmony exports ActionDidNotRevalidate, ActionDidRevalidateDynamicOnly */
const ActionDidNotRevalidate = 0;
const ActionDidRevalidateStaticAndDynamic = 1;
const ActionDidRevalidateDynamicOnly = 2; //# sourceMappingURL=action-revalidation-kind.js.map


/***/ }),

/***/ 4497:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export resolveParamValue */
/* harmony import */ var _invariant_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1520);


/**
 * Extracts the param value from a path segment, handling interception markers
 * based on the expected param type.
 *
 * @param pathSegment - The path segment to extract the value from
 * @param params - The current params object for resolving dynamic param references
 * @param paramType - The expected param type which may include interception marker info
 * @returns The extracted param value
 */ function getParamValueFromSegment(pathSegment, params, paramType) {
    // If the segment is dynamic, resolve it from the params object
    if (pathSegment.type === 'dynamic') {
        return params[pathSegment.param.paramName];
    }
    // If the paramType indicates this is an intercepted param, strip the marker
    // that matches the interception marker in the param type
    const interceptionPrefix = interceptionPrefixFromParamType(paramType);
    if (interceptionPrefix === pathSegment.interceptionMarker) {
        return pathSegment.name.replace(pathSegment.interceptionMarker, '');
    }
    // For static segments, use the name
    return pathSegment.name;
}
/**
 * Resolves a route parameter value from the route segments at the given depth.
 * This shared logic is used by both extractPathnameRouteParamSegmentsFromLoaderTree
 * and resolveRouteParamsFromTree.
 *
 * @param paramName - The parameter name to resolve
 * @param paramType - The parameter type (dynamic, catchall, etc.)
 * @param depth - The current depth in the route tree
 * @param route - The normalized route containing segments
 * @param params - The current params object (used to resolve embedded param references)
 * @param options - Configuration options
 * @returns The resolved parameter value, or undefined if it cannot be resolved
 */ function resolveParamValue(paramName, paramType, depth, route, params) {
    switch(paramType){
        case 'catchall':
        case 'optional-catchall':
        case 'catchall-intercepted-(..)(..)':
        case 'catchall-intercepted-(.)':
        case 'catchall-intercepted-(..)':
        case 'catchall-intercepted-(...)':
            // For catchall routes, derive from pathname using depth to determine
            // which segments to use
            const processedSegments = [];
            // Process segments to handle any embedded dynamic params
            for(let index = depth; index < route.segments.length; index++){
                const pathSegment = route.segments[index];
                if (pathSegment.type === 'static') {
                    let value = pathSegment.name;
                    // For intercepted catch-all params, strip the marker from the first segment
                    const interceptionPrefix = interceptionPrefixFromParamType(paramType);
                    if (interceptionPrefix && index === depth && interceptionPrefix === pathSegment.interceptionMarker) {
                        // Strip the interception marker from the value
                        value = value.replace(pathSegment.interceptionMarker, '');
                    }
                    processedSegments.push(value);
                } else {
                    // If the segment is a param placeholder, check if we have its value
                    if (!params.hasOwnProperty(pathSegment.param.paramName)) {
                        // If the segment is an optional catchall, we can break out of the
                        // loop because it's optional!
                        if (pathSegment.param.paramType === 'optional-catchall') {
                            break;
                        }
                        // Unknown param placeholder in pathname - can't derive full value
                        return undefined;
                    }
                    // If the segment matches a param, use the param value
                    // We don't encode values here as that's handled during retrieval.
                    const paramValue = params[pathSegment.param.paramName];
                    if (Array.isArray(paramValue)) {
                        processedSegments.push(...paramValue);
                    } else {
                        processedSegments.push(paramValue);
                    }
                }
            }
            if (processedSegments.length > 0) {
                return processedSegments;
            } else if (paramType === 'optional-catchall') {
                return undefined;
            } else {
                // We shouldn't be able to match a catchall segment without any path
                // segments if it's not an optional catchall
                throw Object.defineProperty(new InvariantError(`Unexpected empty path segments match for a route "${route.pathname}" with param "${paramName}" of type "${paramType}"`), "__NEXT_ERROR_CODE", {
                    value: "E931",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'dynamic':
        case 'dynamic-intercepted-(..)(..)':
        case 'dynamic-intercepted-(.)':
        case 'dynamic-intercepted-(..)':
        case 'dynamic-intercepted-(...)':
            // For regular dynamic parameters, take the segment at this depth
            if (depth < route.segments.length) {
                const pathSegment = route.segments[depth];
                // Check if the segment at this depth is a placeholder for an unknown param
                if (pathSegment.type === 'dynamic' && !params.hasOwnProperty(pathSegment.param.paramName)) {
                    // The segment is a placeholder like [category] and we don't have the value
                    return undefined;
                }
                // If the segment matches a param, use the param value from params object
                // Otherwise it's a static segment, just use it directly
                // We don't encode values here as that's handled during retrieval
                return getParamValueFromSegment(pathSegment, params, paramType);
            }
            return undefined;
        default:
            paramType;
    }
} //# sourceMappingURL=resolve-param-value.js.map


/***/ }),

/***/ 4502:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports DynamicServerError, isDynamicServerError */
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super(`Dynamic server usage: ${description}`), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
} //# sourceMappingURL=hooks-server-context.js.map


/***/ }),

/***/ 4713:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Nw: () => (/* binding */ areTagsExpired),
/* harmony export */   nZ: () => (/* binding */ tagsManifest),
/* harmony export */   xm: () => (/* binding */ areTagsStale)
/* harmony export */ });
// We share the tags manifest between the "use cache" handlers and the previous
// file-system cache.
const tagsManifest = new Map();
const areTagsExpired = (tags, timestamp)=>{
    for (const tag of tags){
        const entry = tagsManifest.get(tag);
        const expiredAt = entry == null ? void 0 : entry.expired;
        if (typeof expiredAt === 'number') {
            const now = performance.timeOrigin + performance.now();
            // For immediate expiration (expiredAt <= now) and tag was invalidated after entry was created
            // OR for future expiration that has now passed (expiredAt > timestamp && expiredAt <= now)
            const isImmediatelyExpired = expiredAt <= now && expiredAt > timestamp;
            if (isImmediatelyExpired) {
                return true;
            }
        }
    }
    return false;
};
const areTagsStale = (tags, timestamp)=>{
    for (const tag of tags){
        const entry = tagsManifest.get(tag);
        const staleAt = (entry == null ? void 0 : entry.stale) ?? 0;
        if (typeof staleAt === 'number' && staleAt > timestamp) {
            return true;
        }
    }
    return false;
}; //# sourceMappingURL=tags-manifest.external.js.map


/***/ }),

/***/ 4730:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ addPathSuffix)
/* harmony export */ });
/* harmony import */ var _parse_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(650);

/**
 * Similarly to `addPathPrefix`, this function adds a suffix at the end on the
 * provided path. It also works only for paths ensuring the argument starts
 * with a slash.
 */ function addPathSuffix(path, suffix) {
    if (!path.startsWith('/') || !suffix) {
        return path;
    }
    const { pathname, query, hash } = (0,_parse_path__WEBPACK_IMPORTED_MODULE_0__/* .parsePath */ .R)(path);
    return `${pathname}${suffix}${query}${hash}`;
} //# sourceMappingURL=add-path-suffix.js.map


/***/ }),

/***/ 4738:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EI: () => (/* binding */ LogSpanAllowList),
/* harmony export */   Fx: () => (/* binding */ NextNodeServerSpan),
/* harmony export */   KK: () => (/* binding */ NextVanillaSpanAllowlist),
/* harmony export */   rd: () => (/* binding */ MiddlewareSpan)
/* harmony export */ });
/* unused harmony exports BaseServerSpan, LoadComponentsSpan, NextServerSpan, StartServerSpan, RenderSpan, RouterSpan, AppRenderSpan, NodeSpan, AppRouteRouteHandlersSpan, ResolveMetadataSpan */
/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
var BaseServerSpan = /*#__PURE__*/ function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
    return BaseServerSpan;
}(BaseServerSpan || {});
var LoadComponentsSpan = /*#__PURE__*/ function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
    return LoadComponentsSpan;
}(LoadComponentsSpan || {});
var NextServerSpan = /*#__PURE__*/ function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getRequestHandlerWithMetadata"] = "NextServer.getRequestHandlerWithMetadata";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
    return NextServerSpan;
}(NextServerSpan || {});
var NextNodeServerSpan = /*#__PURE__*/ function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["createComponentTree"] = "NextNodeServer.createComponentTree";
    NextNodeServerSpan["clientComponentLoading"] = "NextNodeServer.clientComponentLoading";
    NextNodeServerSpan["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["startResponse"] = "NextNodeServer.startResponse";
    // nested inner span, does not require parent scope name
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
    NextNodeServerSpan["internalFetch"] = "internalFetch";
    return NextNodeServerSpan;
}(NextNodeServerSpan || {});
var StartServerSpan = /*#__PURE__*/ function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
    return StartServerSpan;
}(StartServerSpan || {});
var RenderSpan = /*#__PURE__*/ function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
    return RenderSpan;
}(RenderSpan || {});
var AppRenderSpan = /*#__PURE__*/ function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
    AppRenderSpan["waitShellReady"] = "AppRender.waitShellReady";
    AppRenderSpan["renderToNodeFizzStream"] = "AppRender.renderToNodeFizzStream";
    AppRenderSpan["instantInsights"] = "AppRender.instantInsights";
    AppRenderSpan["instantInsightsPrepareValidation"] = "AppRender.instantInsights.prepareValidation";
    AppRenderSpan["instantInsightsRunValidation"] = "AppRender.instantInsights.runValidation";
    return AppRenderSpan;
}(AppRenderSpan || {});
var RouterSpan = /*#__PURE__*/ function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
    return RouterSpan;
}(RouterSpan || {});
var NodeSpan = /*#__PURE__*/ function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
    return NodeSpan;
}(NodeSpan || {});
var AppRouteRouteHandlersSpan = /*#__PURE__*/ function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
    return AppRouteRouteHandlersSpan;
}(AppRouteRouteHandlersSpan || {});
var ResolveMetadataSpan = /*#__PURE__*/ function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
    ResolveMetadataSpan["generateViewport"] = "ResolveMetadata.generateViewport";
    return ResolveMetadataSpan;
}(ResolveMetadataSpan || {});
var MiddlewareSpan = /*#__PURE__*/ function(MiddlewareSpan) {
    MiddlewareSpan["execute"] = "Middleware.execute";
    return MiddlewareSpan;
}(MiddlewareSpan || {});
// This list is used to filter out spans that are not relevant to the user
const NextVanillaSpanAllowlist = new Set([
    "Middleware.execute",
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata",
    "ResolveMetadata.generateViewport",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.findPageComponents",
    "NextNodeServer.getLayoutOrPageModule",
    "NextNodeServer.startResponse",
    "NextNodeServer.clientComponentLoading"
]);
// These Spans are allowed to be always logged
// when the otel log prefix env is set
const LogSpanAllowList = new Set([
    "NextNodeServer.findPageComponents",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.clientComponentLoading"
]);


//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 4745:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ getNextPathnameInfo)
/* harmony export */ });
/* harmony import */ var _i18n_normalize_locale_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(332);
/* harmony import */ var _remove_path_prefix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4352);
/* harmony import */ var _path_has_prefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9866);



function getNextPathnameInfo(pathname, options) {
    const { basePath, i18n, trailingSlash } = options.nextConfig ?? {};
    const info = {
        pathname,
        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
    };
    if (basePath && (0,_path_has_prefix__WEBPACK_IMPORTED_MODULE_1__/* .pathHasPrefix */ .m)(info.pathname, basePath)) {
        info.pathname = (0,_remove_path_prefix__WEBPACK_IMPORTED_MODULE_2__/* .removePathPrefix */ .y)(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
        const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== 'index' ? `/${paths.slice(1).join('/')}` : '/';
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : (0,_i18n_normalize_locale_path__WEBPACK_IMPORTED_MODULE_0__/* .normalizeLocalePath */ .d)(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        info.pathname = result.pathname ?? info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0,_i18n_normalize_locale_path__WEBPACK_IMPORTED_MODULE_0__/* .normalizeLocalePath */ .d)(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map


/***/ }),

/***/ 4814:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export after */
/* harmony import */ var _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2736);
/* harmony import */ var _app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2381);


/**
 * This function allows you to schedule callbacks to be executed after the current request finishes.
 */ function after(task) {
    const workStore = workAsyncStorage.getStore();
    const workUnitStore = workUnitAsyncStorage.getStore();
    if (!workStore || !workUnitStore) {
        // TODO(after): the linked docs page talks about *dynamic* APIs, which after soon won't be anymore
        throw Object.defineProperty(new Error('`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context'), "__NEXT_ERROR_CODE", {
            value: "E468",
            enumerable: false,
            configurable: true
        });
    }
    const { afterContext } = workStore;
    return afterContext.after(task, workUnitStore);
}

//# sourceMappingURL=after.js.map

/***/ }),

/***/ 4976:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JT: () => (/* binding */ streamFromBuffer),
/* harmony export */   hP: () => (/* binding */ chainStreams),
/* harmony export */   jP: () => (/* binding */ streamToString),
/* harmony export */   q0: () => (/* binding */ streamFromString)
/* harmony export */ });
/* unused harmony exports webstreamToUint8Array, nodestreamToUint8Array, streamToUint8Array, streamToBuffer, createBufferedTransformStream, renderToInitialFizzStream, createMetadataTransformStream, createHeadInsertionTransformStream, createDeferredSuffixStream, createFlightDataInjectionTransformStream, CLOSE_TAG, createMoveSuffixStream, createHtmlDataDplIdTransformStream, createRootLayoutValidatorStream, chainTransformers, continueFizzStream, continueDynamicPrerender, continueStaticPrerender, continueStaticFallbackPrerender, continueDynamicHTMLResume, createDocumentClosingStream, createRuntimePrefetchTransformStream */
/* harmony import */ var _lib_trace_tracer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5342);
/* harmony import */ var _lib_trace_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4738);
/* harmony import */ var _encoded_tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2196);
/* harmony import */ var _uint8array_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5015);
/* harmony import */ var _client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2728);
/* harmony import */ var _shared_lib_router_utils_cache_busting_search_param__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8017);
/* provided dependency */ var Buffer = __webpack_require__(5356)["Buffer"];









function voidCatch() {
// this catcher is designed to be used with pipeTo where we expect the underlying
// pipe implementation to forward errors but we don't want the pipeTo promise to reject
// and be unhandled
}
// We can share the same encoder instance everywhere
// Notably we cannot do the same for TextDecoder because it is stateful
// when handling streaming data
const encoder = new TextEncoder();
function chainStreams(...streams) {
    // If we have no streams, return an empty stream. This behavior is
    // intentional as we're now providing the `RenderResult.EMPTY` value.
    if (streams.length === 0) {
        return new ReadableStream({
            start (controller) {
                controller.close();
            }
        });
    }
    // If we only have 1 stream we fast path it by returning just this stream
    if (streams.length === 1) {
        return streams[0];
    }
    const { readable, writable } = new TransformStream();
    // We always initiate pipeTo immediately. We know we have at least 2 streams
    // so we need to avoid closing the writable when this one finishes.
    let promise = streams[0].pipeTo(writable, {
        preventClose: true
    });
    let i = 1;
    for(; i < streams.length - 1; i++){
        const nextStream = streams[i];
        promise = promise.then(()=>nextStream.pipeTo(writable, {
                preventClose: true
            }));
    }
    // We can omit the length check because we halted before the last stream and there
    // is at least two streams so the lastStream here will always be defined
    const lastStream = streams[i];
    promise = promise.then(()=>lastStream.pipeTo(writable));
    // Catch any errors from the streams and ignore them, they will be handled
    // by whatever is consuming the readable stream.
    promise.catch(voidCatch);
    return readable;
}
function streamFromString(str) {
    return new ReadableStream({
        start (controller) {
            controller.enqueue(encoder.encode(str));
            controller.close();
        }
    });
}
function streamFromBuffer(chunk) {
    return new ReadableStream({
        start (controller) {
            controller.enqueue(chunk);
            controller.close();
        }
    });
}
async function streamToChunks(stream) {
    const reader = stream.getReader();
    const chunks = [];
    while(true){
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }
    return chunks;
}
function concatUint8Arrays(chunks) {
    const totalLength = chunks.reduce((sum, chunk)=>sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks){
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}
async function webstreamToUint8Array(stream) {
    return concatUint8Arrays(await streamToChunks(stream));
}
function webToReadable(stream) {
    if (true) {
        throw Object.defineProperty(new Error('webToReadable cannot be used in the edge runtime'), "__NEXT_ERROR_CODE", {
            value: "E1148",
            enumerable: false,
            configurable: true
        });
    } else {}
}
async function nodestreamToUint8Array(stream) {
    const chunks = [];
    for await (const chunk of webToReadable(stream)){
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}
async function streamToUint8Array(stream) {
    if (true) {
        // Edge runtime always uses web streams
        return webstreamToUint8Array(stream);
    } else {}
}
async function streamToBuffer(stream) {
    return Buffer.concat(await streamToChunks(stream));
}
async function streamToString(stream, signal) {
    const decoder = new TextDecoder('utf-8', {
        fatal: true
    });
    let string = '';
    for await (const chunk of stream){
        if (signal == null ? void 0 : signal.aborted) {
            return string;
        }
        string += decoder.decode(chunk, {
            stream: true
        });
    }
    string += decoder.decode();
    return string;
}
function createBufferedTransformStream(options = {}) {
    const { maxBufferByteLength = Infinity } = options;
    let bufferedChunks = [];
    let bufferByteLength = 0;
    let pending;
    const flush = (controller)=>{
        try {
            if (bufferedChunks.length === 0) {
                return;
            }
            const chunk = new Uint8Array(bufferByteLength);
            let copiedBytes = 0;
            for(let i = 0; i < bufferedChunks.length; i++){
                const bufferedChunk = bufferedChunks[i];
                chunk.set(bufferedChunk, copiedBytes);
                copiedBytes += bufferedChunk.byteLength;
            }
            // We just wrote all the buffered chunks so we need to reset the bufferedChunks array
            // and our bufferByteLength to prepare for the next round of buffered chunks
            bufferedChunks.length = 0;
            bufferByteLength = 0;
            controller.enqueue(chunk);
        } catch  {
        // If an error occurs while enqueuing, it can't be due to this
        // transformer. It's most likely caused by the controller having been
        // errored (for example, if the stream was cancelled).
        }
    };
    const scheduleFlush = (controller)=>{
        if (pending) {
            return;
        }
        const detached = new DetachedPromise();
        pending = detached;
        scheduleImmediate(()=>{
            try {
                flush(controller);
            } finally{
                pending = undefined;
                detached.resolve();
            }
        });
    };
    return new TransformStream({
        transform (chunk, controller) {
            // Combine the previous buffer with the new chunk.
            bufferedChunks.push(chunk);
            bufferByteLength += chunk.byteLength;
            if (bufferByteLength >= maxBufferByteLength) {
                flush(controller);
            } else {
                scheduleFlush(controller);
            }
        },
        flush () {
            return pending == null ? void 0 : pending.promise;
        }
    });
}
// TODO this is currently unused but once we add proper output:export support, it needs to be
// revisited. See https://github.com/vercel/next.js/pull/89478 for more details
//
// function createPrefetchCommentStream(
//   isBuildTimePrerendering: boolean,
//   buildId: string
// ): TransformStream<Uint8Array, Uint8Array> {
//   // Insert an extra comment at the beginning of the HTML document. This must
//   // come after the DOCTYPE, which is inserted by React.
//   //
//   // The first chunk sent by React will contain the doctype. After that, we can
//   // pass through the rest of the chunks as-is.
//   let didTransformFirstChunk = false
//   return new TransformStream({
//     transform(chunk, controller) {
//       if (isBuildTimePrerendering && !didTransformFirstChunk) {
//         didTransformFirstChunk = true
//         const decoder = new TextDecoder('utf-8', { fatal: true })
//         const chunkStr = decoder.decode(chunk, {
//           stream: true,
//         })
//         const updatedChunkStr = insertBuildIdComment(chunkStr, buildId)
//         controller.enqueue(encoder.encode(updatedChunkStr))
//         return
//       }
//       controller.enqueue(chunk)
//     },
//   })
// }
function renderToInitialFizzStream({ ReactDOMServer, element, streamOptions }) {
    return getTracer().trace(AppRenderSpan.renderToReadableStream, async ()=>ReactDOMServer.renderToReadableStream(element, streamOptions));
}
function createMetadataTransformStream(insert) {
    let chunkIndex = -1;
    let isMarkRemoved = false;
    return new TransformStream({
        async transform (chunk, controller) {
            let iconMarkIndex = -1;
            let closedHeadIndex = -1;
            chunkIndex++;
            if (isMarkRemoved) {
                controller.enqueue(chunk);
                return;
            }
            let iconMarkLength = 0;
            // Only search for the closed head tag once
            if (iconMarkIndex === -1) {
                iconMarkIndex = indexOfUint8Array(chunk, ENCODED_TAGS.META.ICON_MARK);
                if (iconMarkIndex === -1) {
                    controller.enqueue(chunk);
                    return;
                } else {
                    // When we found the `<meta name="«nxt-icon»"` tag prefix, we will remove it from the chunk.
                    // Its close tag could either be `/>` or `>`, checking the next char to ensure we cover both cases.
                    iconMarkLength = ENCODED_TAGS.META.ICON_MARK.length;
                    // Check if next char is /, this is for xml mode.
                    if (chunk[iconMarkIndex + iconMarkLength] === 47) {
                        iconMarkLength += 2;
                    } else {
                        // The last char is `>`
                        iconMarkLength++;
                    }
                }
            }
            // Check if icon mark is inside <head> tag in the first chunk.
            if (chunkIndex === 0) {
                closedHeadIndex = indexOfUint8Array(chunk, ENCODED_TAGS.CLOSED.HEAD);
                if (iconMarkIndex !== -1) {
                    // The mark icon is located in the 1st chunk before the head tag.
                    // We do not need to insert the script tag in this case because it's in the head.
                    // Just remove the icon mark from the chunk.
                    if (iconMarkIndex < closedHeadIndex) {
                        const replaced = new Uint8Array(chunk.length - iconMarkLength);
                        // Remove the icon mark from the chunk.
                        replaced.set(chunk.subarray(0, iconMarkIndex));
                        replaced.set(chunk.subarray(iconMarkIndex + iconMarkLength), iconMarkIndex);
                        chunk = replaced;
                    } else {
                        // The icon mark is after the head tag, replace and insert the script tag at that position.
                        const insertion = await insert();
                        const encodedInsertion = encoder.encode(insertion);
                        const insertionLength = encodedInsertion.length;
                        const replaced = new Uint8Array(chunk.length - iconMarkLength + insertionLength);
                        replaced.set(chunk.subarray(0, iconMarkIndex));
                        replaced.set(encodedInsertion, iconMarkIndex);
                        replaced.set(chunk.subarray(iconMarkIndex + iconMarkLength), iconMarkIndex + insertionLength);
                        chunk = replaced;
                    }
                    isMarkRemoved = true;
                }
            // If there's no icon mark located, it will be handled later when if present in the following chunks.
            } else {
                // When it's appeared in the following chunks, we'll need to
                // remove the mark and then insert the script tag at that position.
                const insertion = await insert();
                const encodedInsertion = encoder.encode(insertion);
                const insertionLength = encodedInsertion.length;
                // Replace the icon mark with the hoist script or empty string.
                const replaced = new Uint8Array(chunk.length - iconMarkLength + insertionLength);
                // Set the first part of the chunk, before the icon mark.
                replaced.set(chunk.subarray(0, iconMarkIndex));
                // Set the insertion after the icon mark.
                replaced.set(encodedInsertion, iconMarkIndex);
                // Set the rest of the chunk after the icon mark.
                replaced.set(chunk.subarray(iconMarkIndex + iconMarkLength), iconMarkIndex + insertionLength);
                chunk = replaced;
                isMarkRemoved = true;
            }
            controller.enqueue(chunk);
        }
    });
}
function createHeadInsertionTransformStream(insert) {
    let inserted = false;
    // We need to track if this transform saw any bytes because if it didn't
    // we won't want to insert any server HTML at all
    let hasBytes = false;
    return new TransformStream({
        async transform (chunk, controller) {
            hasBytes = true;
            const insertion = await insert();
            if (inserted) {
                if (insertion) {
                    const encodedInsertion = encoder.encode(insertion);
                    controller.enqueue(encodedInsertion);
                }
                controller.enqueue(chunk);
            } else {
                // TODO (@Ethan-Arrowood): Replace the generic `indexOfUint8Array` method with something finely tuned for the subset of things actually being checked for.
                const index = indexOfUint8Array(chunk, ENCODED_TAGS.CLOSED.HEAD);
                // In fully static rendering or non PPR rendering cases:
                // `/head>` will always be found in the chunk in first chunk rendering.
                if (index !== -1) {
                    if (insertion) {
                        const encodedInsertion = encoder.encode(insertion);
                        // Get the total count of the bytes in the chunk and the insertion
                        // e.g.
                        // chunk = <head><meta charset="utf-8"></head>
                        // insertion = <script>...</script>
                        // output = <head><meta charset="utf-8"> [ <script>...</script> ] </head>
                        const insertedHeadContent = new Uint8Array(chunk.length + encodedInsertion.length);
                        // Append the first part of the chunk, before the head tag
                        insertedHeadContent.set(chunk.slice(0, index));
                        // Append the server inserted content
                        insertedHeadContent.set(encodedInsertion, index);
                        // Append the rest of the chunk
                        insertedHeadContent.set(chunk.slice(index), index + encodedInsertion.length);
                        controller.enqueue(insertedHeadContent);
                    } else {
                        controller.enqueue(chunk);
                    }
                    inserted = true;
                } else {
                    // This will happens in PPR rendering during next start, when the page is partially rendered.
                    // When the page resumes, the head tag will be found in the middle of the chunk.
                    // Where we just need to append the insertion and chunk to the current stream.
                    // e.g.
                    // PPR-static: <head>...</head><body> [ resume content ] </body>
                    // PPR-resume: [ insertion ] [ rest content ]
                    if (insertion) {
                        controller.enqueue(encoder.encode(insertion));
                    }
                    controller.enqueue(chunk);
                    inserted = true;
                }
            }
        },
        async flush (controller) {
            // Check before closing if there's anything remaining to insert.
            if (hasBytes) {
                const insertion = await insert();
                if (insertion) {
                    controller.enqueue(encoder.encode(insertion));
                }
            }
        }
    });
}
async function createClientResumeScriptInsertionTransformStream() {
    const segmentPath = '/_full';
    const cacheBustingHeader = await computeCacheBustingSearchParam('1', '/_full', undefined, undefined //       headers[NEXT_URL]
    );
    const searchStr = `${NEXT_RSC_UNION_QUERY}=${cacheBustingHeader}`;
    const NEXT_CLIENT_RESUME_SCRIPT = `<script>__NEXT_CLIENT_RESUME=fetch(location.pathname+'?${searchStr}',{credentials:'same-origin',headers:{'${RSC_HEADER}': '1','${NEXT_ROUTER_PREFETCH_HEADER}': '1','${NEXT_ROUTER_SEGMENT_PREFETCH_HEADER}': '${segmentPath}'}})</script>`;
    let didAlreadyInsert = false;
    return new TransformStream({
        transform (chunk, controller) {
            if (didAlreadyInsert) {
                // Already inserted the script into the head. Pass through.
                controller.enqueue(chunk);
                return;
            }
            // TODO (@Ethan-Arrowood): Replace the generic `indexOfUint8Array` method with something finely tuned for the subset of things actually being checked for.
            const headClosingTagIndex = indexOfUint8Array(chunk, ENCODED_TAGS.CLOSED.HEAD);
            if (headClosingTagIndex === -1) {
                // In fully static rendering or non PPR rendering cases:
                // `/head>` will always be found in the chunk in first chunk rendering.
                controller.enqueue(chunk);
                return;
            }
            const encodedInsertion = encoder.encode(NEXT_CLIENT_RESUME_SCRIPT);
            // Get the total count of the bytes in the chunk and the insertion
            // e.g.
            // chunk = <head><meta charset="utf-8"></head>
            // insertion = <script>...</script>
            // output = <head><meta charset="utf-8"> [ <script>...</script> ] </head>
            const insertedHeadContent = new Uint8Array(chunk.length + encodedInsertion.length);
            // Append the first part of the chunk, before the head tag
            insertedHeadContent.set(chunk.slice(0, headClosingTagIndex));
            // Append the server inserted content
            insertedHeadContent.set(encodedInsertion, headClosingTagIndex);
            // Append the rest of the chunk
            insertedHeadContent.set(chunk.slice(headClosingTagIndex), headClosingTagIndex + encodedInsertion.length);
            controller.enqueue(insertedHeadContent);
            didAlreadyInsert = true;
        }
    });
}
// Suffix after main body content - scripts before </body>,
// but wait for the major chunks to be enqueued.
function createDeferredSuffixStream(suffix) {
    let flushed = false;
    let pending;
    const flush = (controller)=>{
        const detached = new DetachedPromise();
        pending = detached;
        scheduleImmediate(()=>{
            try {
                controller.enqueue(encoder.encode(suffix));
            } catch  {
            // If an error occurs while enqueuing it can't be due to this
            // transformers fault. It's likely due to the controller being
            // errored due to the stream being cancelled.
            } finally{
                pending = undefined;
                detached.resolve();
            }
        });
    };
    return new TransformStream({
        transform (chunk, controller) {
            controller.enqueue(chunk);
            // If we've already flushed, we're done.
            if (flushed) return;
            // Schedule the flush to happen.
            flushed = true;
            flush(controller);
        },
        flush (controller) {
            if (pending) return pending.promise;
            if (flushed) return;
            // Flush now.
            controller.enqueue(encoder.encode(suffix));
        }
    });
}
function createFlightDataInjectionTransformStream(stream, delayDataUntilFirstHtmlChunk) {
    let htmlStreamFinished = false;
    let pull = null;
    let donePulling = false;
    function startOrContinuePulling(controller) {
        if (!pull) {
            pull = startPulling(controller);
        }
        return pull;
    }
    async function startPulling(controller) {
        const reader = stream.getReader();
        if (delayDataUntilFirstHtmlChunk) {
            // NOTE: streaming flush
            // We are buffering here for the inlined data stream because the
            // "shell" stream might be chunkenized again by the underlying stream
            // implementation, e.g. with a specific high-water mark. To ensure it's
            // the safe timing to pipe the data stream, this extra tick is
            // necessary.
            // We don't start reading until we've left the current Task to ensure
            // that it's inserted after flushing the shell. Note that this implementation
            // might get stale if impl details of Fizz change in the future.
            await atLeastOneTask();
        }
        try {
            while(true){
                const { done, value } = await reader.read();
                if (done) {
                    donePulling = true;
                    return;
                }
                // We want to prioritize HTML over RSC data.
                // The SSR render is based on the same RSC stream, so when we get a new RSC chunk,
                // we're likely to produce an HTML chunk as well, so give it a chance to flush first.
                if (!delayDataUntilFirstHtmlChunk && !htmlStreamFinished) {
                    await atLeastOneTask();
                }
                controller.enqueue(value);
            }
        } catch (err) {
            controller.error(err);
        }
    }
    return new TransformStream({
        start (controller) {
            if (!delayDataUntilFirstHtmlChunk) {
                startOrContinuePulling(controller);
            }
        },
        transform (chunk, controller) {
            controller.enqueue(chunk);
            // Start the streaming if it hasn't already been started yet.
            if (delayDataUntilFirstHtmlChunk) {
                startOrContinuePulling(controller);
            }
        },
        flush (controller) {
            htmlStreamFinished = true;
            if (donePulling) {
                return;
            }
            return startOrContinuePulling(controller);
        }
    });
}
const CLOSE_TAG = '</body></html>';
/**
 * This transform stream moves the suffix to the end of the stream, so results
 * like `</body></html><script>...</script>` will be transformed to
 * `<script>...</script></body></html>`.
 */ function createMoveSuffixStream() {
    let foundSuffix = false;
    return new TransformStream({
        transform (chunk, controller) {
            if (foundSuffix) {
                return controller.enqueue(chunk);
            }
            const index = indexOfUint8Array(chunk, ENCODED_TAGS.CLOSED.BODY_AND_HTML);
            if (index > -1) {
                foundSuffix = true;
                // If the whole chunk is the suffix, then don't write anything, it will
                // be written in the flush.
                if (chunk.length === ENCODED_TAGS.CLOSED.BODY_AND_HTML.length) {
                    return;
                }
                // Write out the part before the suffix.
                const before = chunk.slice(0, index);
                controller.enqueue(before);
                // In the case where the suffix is in the middle of the chunk, we need
                // to split the chunk into two parts.
                if (chunk.length > ENCODED_TAGS.CLOSED.BODY_AND_HTML.length + index) {
                    // Write out the part after the suffix.
                    const after = chunk.slice(index + ENCODED_TAGS.CLOSED.BODY_AND_HTML.length);
                    controller.enqueue(after);
                }
            } else {
                controller.enqueue(chunk);
            }
        },
        flush (controller) {
            // Even if we didn't find the suffix, the HTML is not valid if we don't
            // add it, so insert it at the end.
            controller.enqueue(ENCODED_TAGS.CLOSED.BODY_AND_HTML);
        }
    });
}
function createStripDocumentClosingTagsTransform() {
    return new TransformStream({
        transform (chunk, controller) {
            // We rely on the assumption that chunks will never break across a code unit.
            // This is reasonable because we currently concat all of React's output from a single
            // flush into one chunk before streaming it forward which means the chunk will represent
            // a single coherent utf-8 string. This is not safe to use if we change our streaming to no
            // longer do this large buffered chunk
            if (isEquivalentUint8Arrays(chunk, ENCODED_TAGS.CLOSED.BODY_AND_HTML) || isEquivalentUint8Arrays(chunk, ENCODED_TAGS.CLOSED.BODY) || isEquivalentUint8Arrays(chunk, ENCODED_TAGS.CLOSED.HTML)) {
                // the entire chunk is the closing tags; return without enqueueing anything.
                return;
            }
            // We assume these tags will go at together at the end of the document and that
            // they won't appear anywhere else in the document. This is not really a safe assumption
            // but until we revamp our streaming infra this is a performant way to string the tags
            chunk = removeFromUint8Array(chunk, ENCODED_TAGS.CLOSED.BODY);
            chunk = removeFromUint8Array(chunk, ENCODED_TAGS.CLOSED.HTML);
            controller.enqueue(chunk);
        }
    });
}
function createHtmlDataDplIdTransformStream(dplId) {
    let didTransform = false;
    return new TransformStream({
        transform (chunk, controller) {
            if (didTransform) {
                controller.enqueue(chunk);
                return;
            }
            const htmlTagIndex = indexOfUint8Array(chunk, ENCODED_TAGS.OPENING.HTML);
            if (htmlTagIndex === -1) {
                controller.enqueue(chunk);
                return;
            }
            // Insert the data-dpl-id attribute right after "<html "
            const insertionPoint = htmlTagIndex + ENCODED_TAGS.OPENING.HTML.length;
            const attribute = ` data-dpl-id="${dplId}"`;
            const encodedAttribute = encoder.encode(attribute);
            const modifiedChunk = new Uint8Array(chunk.length + encodedAttribute.length);
            // Copy everything before the insertion point
            modifiedChunk.set(chunk.subarray(0, insertionPoint));
            // Insert the attribute
            modifiedChunk.set(encodedAttribute, insertionPoint);
            // Copy everything after
            modifiedChunk.set(chunk.subarray(insertionPoint), insertionPoint + encodedAttribute.length);
            controller.enqueue(modifiedChunk);
            didTransform = true;
        }
    });
}
/*
 * Checks if the root layout is missing the html or body tags
 * and if so, it will inject a script tag to throw an error in the browser, showing the user
 * the error message in the error overlay.
 */ function createRootLayoutValidatorStream() {
    let foundHtml = false;
    let foundBody = false;
    return new TransformStream({
        async transform (chunk, controller) {
            // Peek into the streamed chunk to see if the tags are present.
            if (!foundHtml && indexOfUint8Array(chunk, ENCODED_TAGS.OPENING.HTML) > -1) {
                foundHtml = true;
            }
            if (!foundBody && indexOfUint8Array(chunk, ENCODED_TAGS.OPENING.BODY) > -1) {
                foundBody = true;
            }
            controller.enqueue(chunk);
        },
        flush (controller) {
            const missingTags = [];
            if (!foundHtml) missingTags.push('html');
            if (!foundBody) missingTags.push('body');
            if (!missingTags.length) return;
            controller.enqueue(encoder.encode(`<html id="__next_error__">
            <template
              data-next-error-message="Missing ${missingTags.map((c)=>`<${c}>`).join(missingTags.length > 1 ? ' and ' : '')} tags in the root layout.\nRead more at https://nextjs.org/docs/messages/missing-root-layout-tags"
              data-next-error-digest="${MISSING_ROOT_TAGS_ERROR}"
              data-next-error-stack=""
            ></template>
          `));
        }
    });
}
function chainTransformers(readable, transformers) {
    let stream = readable;
    for (const transformer of transformers){
        if (!transformer) continue;
        stream = stream.pipeThrough(transformer);
    }
    return stream;
}
async function continueFizzStream(renderStream, { suffix, inlinedDataStream, isStaticGeneration, deploymentId, getServerInsertedHTML, getServerInsertedMetadata, validateRootLayout }) {
    // Suffix itself might contain close tags at the end, so we need to split it.
    const suffixUnclosed = suffix ? suffix.split(CLOSE_TAG, 1)[0] : null;
    if (isStaticGeneration) {
        // If we're generating static HTML we need to wait for it to resolve before continuing.
        await renderStream.allReady;
    } else {
        // Otherwise, we want to make sure Fizz is done with all microtasky work
        // before we start pulling the stream and cause a flush.
        await waitAtLeastOneReactRenderTask();
    }
    return chainTransformers(renderStream, [
        // Buffer everything to avoid flushing too frequently
        createBufferedTransformStream(),
        // Insert data-dpl-id attribute on the html tag
        deploymentId ? createHtmlDataDplIdTransformStream(deploymentId) : null,
        // Transform metadata
        createMetadataTransformStream(getServerInsertedMetadata),
        // Insert suffix content
        suffixUnclosed != null && suffixUnclosed.length > 0 ? createDeferredSuffixStream(suffixUnclosed) : null,
        // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
        inlinedDataStream ? createFlightDataInjectionTransformStream(inlinedDataStream, true) : null,
        // Validate the root layout for missing html or body tags
        validateRootLayout ? createRootLayoutValidatorStream() : null,
        // Close tags should always be deferred to the end
        createMoveSuffixStream(),
        // Special head insertions
        // TODO-APP: Insert server side html to end of head in app layout rendering, to avoid
        // hydration errors. Remove this once it's ready to be handled by react itself.
        createHeadInsertionTransformStream(getServerInsertedHTML)
    ]);
}
async function continueDynamicPrerender(prerenderStream, { getServerInsertedHTML, getServerInsertedMetadata, deploymentId }) {
    return chainTransformers(prerenderStream, [
        // Buffer everything to avoid flushing too frequently
        createBufferedTransformStream(),
        createStripDocumentClosingTagsTransform(),
        // Insert data-dpl-id attribute on the html tag
        deploymentId ? createHtmlDataDplIdTransformStream(deploymentId) : null,
        // Insert generated tags to head
        createHeadInsertionTransformStream(getServerInsertedHTML),
        // Transform metadata
        createMetadataTransformStream(getServerInsertedMetadata)
    ]);
}
async function continueStaticPrerender(prerenderStream, { inlinedDataStream, getServerInsertedHTML, getServerInsertedMetadata, deploymentId }) {
    return chainTransformers(prerenderStream, [
        // Buffer everything to avoid flushing too frequently
        createBufferedTransformStream(),
        // Add build id comment to start of the HTML document (in export mode)
        // Insert data-dpl-id attribute on the html tag
        deploymentId ? createHtmlDataDplIdTransformStream(deploymentId) : null,
        // Insert generated tags to head
        createHeadInsertionTransformStream(getServerInsertedHTML),
        // Transform metadata
        createMetadataTransformStream(getServerInsertedMetadata),
        // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
        createFlightDataInjectionTransformStream(inlinedDataStream, true),
        // Close tags should always be deferred to the end
        createMoveSuffixStream()
    ]);
}
async function continueStaticFallbackPrerender(prerenderStream, { inlinedDataStream, getServerInsertedHTML, getServerInsertedMetadata, deploymentId }) {
    // Same as `continueStaticPrerender`, but also inserts an additional script
    // to instruct the client to start fetching the hydration data as early
    // as possible.
    return chainTransformers(prerenderStream, [
        // Buffer everything to avoid flushing too frequently
        createBufferedTransformStream(),
        // Insert data-dpl-id attribute on the html tag
        deploymentId ? createHtmlDataDplIdTransformStream(deploymentId) : null,
        // Insert generated tags to head
        createHeadInsertionTransformStream(getServerInsertedHTML),
        // Insert the client resume script into the head
        await createClientResumeScriptInsertionTransformStream(),
        // Transform metadata
        createMetadataTransformStream(getServerInsertedMetadata),
        // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
        createFlightDataInjectionTransformStream(inlinedDataStream, true),
        // Close tags should always be deferred to the end
        createMoveSuffixStream()
    ]);
}
async function continueDynamicHTMLResume(renderStream, { delayDataUntilFirstHtmlChunk, inlinedDataStream, getServerInsertedHTML, getServerInsertedMetadata, deploymentId }) {
    return chainTransformers(renderStream, [
        // Buffer everything to avoid flushing too frequently
        createBufferedTransformStream(),
        // Insert data-dpl-id attribute on the html tag
        deploymentId ? createHtmlDataDplIdTransformStream(deploymentId) : null,
        // Insert generated tags to head
        createHeadInsertionTransformStream(getServerInsertedHTML),
        // Transform metadata
        createMetadataTransformStream(getServerInsertedMetadata),
        // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
        createFlightDataInjectionTransformStream(inlinedDataStream, delayDataUntilFirstHtmlChunk),
        // Close tags should always be deferred to the end
        createMoveSuffixStream()
    ]);
}
function createDocumentClosingStream() {
    return streamFromString(CLOSE_TAG);
}
// ---------------------------------------------------------------------------
// Runtime prefetch transform (Web streams)
// ---------------------------------------------------------------------------
/**
 * Web TransformStream that replaces the runtime prefetch sentinel in an RSC
 * payload stream: `[<sentinel>]` -> `[<isPartial>,<staleTime>]`.
 *
 * This is the web equivalent of createRuntimePrefetchNodeTransform
 * in node-stream-helpers.ts.
 */ function createRuntimePrefetchTransformStream(sentinel, isPartial, staleTime) {
    const enc = new TextEncoder();
    // Search for: [<sentinel>]
    // Replace with: [<isPartial>,<staleTime>]
    const search = enc.encode(`[${sentinel}]`);
    const first = search[0];
    const replace = enc.encode(`[${isPartial},${staleTime}]`);
    const searchLen = search.length;
    let currentChunk = null;
    let found = false;
    function processChunk(controller, nextChunk) {
        if (found) {
            if (nextChunk) {
                controller.enqueue(nextChunk);
            }
            return;
        }
        if (currentChunk) {
            // We can't search past the index that can contain a full match
            let exclusiveUpperBound = currentChunk.length - (searchLen - 1);
            if (nextChunk) {
                // If we have any overflow bytes we can search up to the chunk's final byte
                exclusiveUpperBound += Math.min(nextChunk.length, searchLen - 1);
            }
            if (exclusiveUpperBound < 1) {
                // we can't match the current chunk.
                controller.enqueue(currentChunk);
                currentChunk = nextChunk // advance so we don't process this chunk again
                ;
                return;
            }
            let currentIndex = currentChunk.indexOf(first);
            // check the current candidate match if it is within the bounds of our search space for the currentChunk
            candidateLoop: while(-1 < currentIndex && currentIndex < exclusiveUpperBound){
                // We already know index 0 matches because we used indexOf to find the candidateIndex so we start at index 1
                let matchIndex = 1;
                while(matchIndex < searchLen){
                    const candidateIndex = currentIndex + matchIndex;
                    const candidateValue = candidateIndex < currentChunk.length ? currentChunk[candidateIndex] : nextChunk[candidateIndex - currentChunk.length];
                    if (candidateValue !== search[matchIndex]) {
                        // No match, reset and continue the search from the next position
                        currentIndex = currentChunk.indexOf(first, currentIndex + 1);
                        continue candidateLoop;
                    }
                    matchIndex++;
                }
                // We found a complete match. currentIndex is our starting point to replace the value.
                found = true;
                // enqueue everything up to the match
                controller.enqueue(currentChunk.subarray(0, currentIndex));
                // enqueue the replacement value
                controller.enqueue(replace);
                // If there are bytes in the currentChunk after the match enqueue them
                if (currentIndex + searchLen < currentChunk.length) {
                    controller.enqueue(currentChunk.slice(currentIndex + searchLen));
                }
                // If we have a next chunk we enqueue it now
                if (nextChunk) {
                    // if replacement spills over to the next chunk we first exclude the replaced bytes
                    const overflowBytes = currentIndex + searchLen - currentChunk.length;
                    const truncatedChunk = overflowBytes > 0 ? nextChunk.subarray(overflowBytes) : nextChunk;
                    controller.enqueue(truncatedChunk);
                }
                // We are now in found mode and don't need to track currentChunk anymore
                currentChunk = null;
                return;
            }
            // No match found in this chunk, emit it and wait for the next one
            controller.enqueue(currentChunk);
        }
        // Advance to the next chunk
        currentChunk = nextChunk;
    }
    return new TransformStream({
        transform (chunk, controller) {
            processChunk(controller, chunk);
        },
        flush (controller) {
            processChunk(controller, null);
        }
    });
}

//# sourceMappingURL=node-web-streams-helper.js.map

/***/ }),

/***/ 4990:
/***/ ((module, exports, __webpack_require__) => {

var __dirname = "/";
var __WEBPACK_AMD_DEFINE_RESULT__;(()=>{var i={943:function(i,e){(function(o,a){"use strict";var r="1.0.35",t="",n="?",s="function",b="undefined",w="object",l="string",d="major",c="model",u="name",p="type",m="vendor",f="version",h="architecture",v="console",g="mobile",k="tablet",x="smarttv",_="wearable",y="embedded",q=350;var T="Amazon",S="Apple",z="ASUS",N="BlackBerry",A="Browser",C="Chrome",E="Edge",O="Firefox",U="Google",j="Huawei",P="LG",R="Microsoft",M="Motorola",B="Opera",V="Samsung",D="Sharp",I="Sony",W="Viera",F="Xiaomi",G="Zebra",H="Facebook",L="Chromium OS",Z="Mac OS";var extend=function(i,e){var o={};for(var a in i){if(e[a]&&e[a].length%2===0){o[a]=e[a].concat(i[a])}else{o[a]=i[a]}}return o},enumerize=function(i){var e={};for(var o=0;o<i.length;o++){e[i[o].toUpperCase()]=i[o]}return e},has=function(i,e){return typeof i===l?lowerize(e).indexOf(lowerize(i))!==-1:false},lowerize=function(i){return i.toLowerCase()},majorize=function(i){return typeof i===l?i.replace(/[^\d\.]/g,t).split(".")[0]:a},trim=function(i,e){if(typeof i===l){i=i.replace(/^\s\s*/,t);return typeof e===b?i:i.substring(0,q)}};var rgxMapper=function(i,e){var o=0,r,t,n,b,l,d;while(o<e.length&&!l){var c=e[o],u=e[o+1];r=t=0;while(r<c.length&&!l){if(!c[r]){break}l=c[r++].exec(i);if(!!l){for(n=0;n<u.length;n++){d=l[++t];b=u[n];if(typeof b===w&&b.length>0){if(b.length===2){if(typeof b[1]==s){this[b[0]]=b[1].call(this,d)}else{this[b[0]]=b[1]}}else if(b.length===3){if(typeof b[1]===s&&!(b[1].exec&&b[1].test)){this[b[0]]=d?b[1].call(this,d,b[2]):a}else{this[b[0]]=d?d.replace(b[1],b[2]):a}}else if(b.length===4){this[b[0]]=d?b[3].call(this,d.replace(b[1],b[2])):a}}else{this[b]=d?d:a}}}}o+=2}},strMapper=function(i,e){for(var o in e){if(typeof e[o]===w&&e[o].length>0){for(var r=0;r<e[o].length;r++){if(has(e[o][r],i)){return o===n?a:o}}}else if(has(e[o],i)){return o===n?a:o}}return i};var $={"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},X={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"};var K={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[f,[u,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[f,[u,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[u,f],[/opios[\/ ]+([\w\.]+)/i],[f,[u,B+" Mini"]],[/\bopr\/([\w\.]+)/i],[f,[u,B]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[u,f],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[f,[u,"UC"+A]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[f,[u,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[f,[u,"WeChat"]],[/konqueror\/([\w\.]+)/i],[f,[u,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[f,[u,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[f,[u,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[u,/(.+)/,"$1 Secure "+A],f],[/\bfocus\/([\w\.]+)/i],[f,[u,O+" Focus"]],[/\bopt\/([\w\.]+)/i],[f,[u,B+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[f,[u,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[f,[u,"Dolphin"]],[/coast\/([\w\.]+)/i],[f,[u,B+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[f,[u,"MIUI "+A]],[/fxios\/([-\w\.]+)/i],[f,[u,O]],[/\bqihu|(qi?ho?o?|360)browser/i],[[u,"360 "+A]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[u,/(.+)/,"$1 "+A],f],[/(comodo_dragon)\/([\w\.]+)/i],[[u,/_/g," "],f],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[u,f],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[u],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[u,H],f],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[u,f],[/\bgsa\/([\w\.]+) .*safari\//i],[f,[u,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[f,[u,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[f,[u,C+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[u,C+" WebView"],f],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[f,[u,"Android "+A]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[u,f],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[f,[u,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[f,u],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[u,[f,strMapper,$]],[/(webkit|khtml)\/([\w\.]+)/i],[u,f],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[u,"Netscape"],f],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[f,[u,O+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[u,f],[/(cobalt)\/([\w\.]+)/i],[u,[f,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[h,"amd64"]],[/(ia32(?=;))/i],[[h,lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[h,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[h,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[h,"armhf"]],[/windows (ce|mobile); ppc;/i],[[h,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[h,/ower/,t,lowerize]],[/(sun4\w)[;\)]/i],[[h,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[h,lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[c,[m,V],[p,k]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[c,[m,V],[p,g]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[c,[m,S],[p,g]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[c,[m,S],[p,k]],[/(macintosh);/i],[c,[m,S]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[c,[m,D],[p,g]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[c,[m,j],[p,k]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[c,[m,j],[p,g]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[c,/_/g," "],[m,F],[p,g]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[c,/_/g," "],[m,F],[p,k]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[c,[m,"OPPO"],[p,g]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[c,[m,"Vivo"],[p,g]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[c,[m,"Realme"],[p,g]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[c,[m,M],[p,g]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[c,[m,M],[p,k]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[c,[m,P],[p,k]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[c,[m,P],[p,g]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[c,[m,"Lenovo"],[p,k]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[c,/_/g," "],[m,"Nokia"],[p,g]],[/(pixel c)\b/i],[c,[m,U],[p,k]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[c,[m,U],[p,g]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[c,[m,I],[p,g]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[c,"Xperia Tablet"],[m,I],[p,k]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[c,[m,"OnePlus"],[p,g]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[c,[m,T],[p,k]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[c,/(.+)/g,"Fire Phone $1"],[m,T],[p,g]],[/(playbook);[-\w\),; ]+(rim)/i],[c,m,[p,k]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[c,[m,N],[p,g]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[c,[m,z],[p,k]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[c,[m,z],[p,g]],[/(nexus 9)/i],[c,[m,"HTC"],[p,k]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[m,[c,/_/g," "],[p,g]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[c,[m,"Acer"],[p,k]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[c,[m,"Meizu"],[p,g]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[m,c,[p,g]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[m,c,[p,k]],[/(surface duo)/i],[c,[m,R],[p,k]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[c,[m,"Fairphone"],[p,g]],[/(u304aa)/i],[c,[m,"AT&T"],[p,g]],[/\bsie-(\w*)/i],[c,[m,"Siemens"],[p,g]],[/\b(rct\w+) b/i],[c,[m,"RCA"],[p,k]],[/\b(venue[\d ]{2,7}) b/i],[c,[m,"Dell"],[p,k]],[/\b(q(?:mv|ta)\w+) b/i],[c,[m,"Verizon"],[p,k]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[c,[m,"Barnes & Noble"],[p,k]],[/\b(tm\d{3}\w+) b/i],[c,[m,"NuVision"],[p,k]],[/\b(k88) b/i],[c,[m,"ZTE"],[p,k]],[/\b(nx\d{3}j) b/i],[c,[m,"ZTE"],[p,g]],[/\b(gen\d{3}) b.+49h/i],[c,[m,"Swiss"],[p,g]],[/\b(zur\d{3}) b/i],[c,[m,"Swiss"],[p,k]],[/\b((zeki)?tb.*\b) b/i],[c,[m,"Zeki"],[p,k]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[m,"Dragon Touch"],c,[p,k]],[/\b(ns-?\w{0,9}) b/i],[c,[m,"Insignia"],[p,k]],[/\b((nxa|next)-?\w{0,9}) b/i],[c,[m,"NextBook"],[p,k]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[m,"Voice"],c,[p,g]],[/\b(lvtel\-)?(v1[12]) b/i],[[m,"LvTel"],c,[p,g]],[/\b(ph-1) /i],[c,[m,"Essential"],[p,g]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[c,[m,"Envizen"],[p,k]],[/\b(trio[-\w\. ]+) b/i],[c,[m,"MachSpeed"],[p,k]],[/\btu_(1491) b/i],[c,[m,"Rotor"],[p,k]],[/(shield[\w ]+) b/i],[c,[m,"Nvidia"],[p,k]],[/(sprint) (\w+)/i],[m,c,[p,g]],[/(kin\.[onetw]{3})/i],[[c,/\./g," "],[m,R],[p,g]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[c,[m,G],[p,k]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[c,[m,G],[p,g]],[/smart-tv.+(samsung)/i],[m,[p,x]],[/hbbtv.+maple;(\d+)/i],[[c,/^/,"SmartTV"],[m,V],[p,x]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[m,P],[p,x]],[/(apple) ?tv/i],[m,[c,S+" TV"],[p,x]],[/crkey/i],[[c,C+"cast"],[m,U],[p,x]],[/droid.+aft(\w)( bui|\))/i],[c,[m,T],[p,x]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[c,[m,D],[p,x]],[/(bravia[\w ]+)( bui|\))/i],[c,[m,I],[p,x]],[/(mitv-\w{5}) bui/i],[c,[m,F],[p,x]],[/Hbbtv.*(technisat) (.*);/i],[m,c,[p,x]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[m,trim],[c,trim],[p,x]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[p,x]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[m,c,[p,v]],[/droid.+; (shield) bui/i],[c,[m,"Nvidia"],[p,v]],[/(playstation [345portablevi]+)/i],[c,[m,I],[p,v]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[c,[m,R],[p,v]],[/((pebble))app/i],[m,c,[p,_]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[c,[m,S],[p,_]],[/droid.+; (glass) \d/i],[c,[m,U],[p,_]],[/droid.+; (wt63?0{2,3})\)/i],[c,[m,G],[p,_]],[/(quest( 2| pro)?)/i],[c,[m,H],[p,_]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[m,[p,y]],[/(aeobc)\b/i],[c,[m,T],[p,y]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[c,[p,g]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[c,[p,k]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[p,k]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[p,g]],[/(android[-\w\. ]{0,9});.+buil/i],[c,[m,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[f,[u,E+"HTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[f,[u,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[u,f],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[f,u]],os:[[/microsoft (windows) (vista|xp)/i],[u,f],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[u,[f,strMapper,X]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[u,"Windows"],[f,strMapper,X]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/ios;fbsv\/([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[f,/_/g,"."],[u,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[u,Z],[f,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[f,u],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[u,f],[/\(bb(10);/i],[f,[u,N]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[f,[u,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[f,[u,O+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[f,[u,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[f,[u,"watchOS"]],[/crkey\/([\d\.]+)/i],[f,[u,C+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[u,L],f],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[u,f],[/(sunos) ?([\w\.\d]*)/i],[[u,"Solaris"],f],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[u,f]]};var UAParser=function(i,e){if(typeof i===w){e=i;i=a}if(!(this instanceof UAParser)){return new UAParser(i,e).getResult()}var r=typeof o!==b&&o.navigator?o.navigator:a;var n=i||(r&&r.userAgent?r.userAgent:t);var v=r&&r.userAgentData?r.userAgentData:a;var x=e?extend(K,e):K;var _=r&&r.userAgent==n;this.getBrowser=function(){var i={};i[u]=a;i[f]=a;rgxMapper.call(i,n,x.browser);i[d]=majorize(i[f]);if(_&&r&&r.brave&&typeof r.brave.isBrave==s){i[u]="Brave"}return i};this.getCPU=function(){var i={};i[h]=a;rgxMapper.call(i,n,x.cpu);return i};this.getDevice=function(){var i={};i[m]=a;i[c]=a;i[p]=a;rgxMapper.call(i,n,x.device);if(_&&!i[p]&&v&&v.mobile){i[p]=g}if(_&&i[c]=="Macintosh"&&r&&typeof r.standalone!==b&&r.maxTouchPoints&&r.maxTouchPoints>2){i[c]="iPad";i[p]=k}return i};this.getEngine=function(){var i={};i[u]=a;i[f]=a;rgxMapper.call(i,n,x.engine);return i};this.getOS=function(){var i={};i[u]=a;i[f]=a;rgxMapper.call(i,n,x.os);if(_&&!i[u]&&v&&v.platform!="Unknown"){i[u]=v.platform.replace(/chrome os/i,L).replace(/macos/i,Z)}return i};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return n};this.setUA=function(i){n=typeof i===l&&i.length>q?trim(i,q):i;return this};this.setUA(n);return this};UAParser.VERSION=r;UAParser.BROWSER=enumerize([u,f,d]);UAParser.CPU=enumerize([h]);UAParser.DEVICE=enumerize([c,m,p,v,g,x,k,_,y]);UAParser.ENGINE=UAParser.OS=enumerize([u,f]);if(typeof e!==b){if("object"!==b&&i.exports){e=i.exports=UAParser}e.UAParser=UAParser}else{if("function"===s&&__webpack_require__.amdO){!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return UAParser}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}else if(typeof o!==b){o.UAParser=UAParser}}var Q=typeof o!==b&&(o.jQuery||o.Zepto);if(Q&&!Q.ua){var Y=new UAParser;Q.ua=Y.getResult();Q.ua.get=function(){return Y.getUA()};Q.ua.set=function(i){Y.setUA(i);var e=Y.getResult();for(var o in e){Q.ua[o]=e[o]}}}})(typeof window==="object"?window:this)}};var e={};function __nccwpck_require__(o){var a=e[o];if(a!==undefined){return a.exports}var r=e[o]={exports:{}};var t=true;try{i[o].call(r.exports,r,r.exports,__nccwpck_require__);t=false}finally{if(t)delete e[o]}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var o=__nccwpck_require__(943);module.exports=o})();

/***/ }),

/***/ 5015:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports indexOfUint8Array, isEquivalentUint8Arrays, removeFromUint8Array */
/* provided dependency */ var Buffer = __webpack_require__(5356)["Buffer"];
/**
 * Find the starting index of Uint8Array `b` within Uint8Array `a`.
 */ function indexOfUint8Array(a, b) {
    if (b.length === 0) return 0;
    if (a.length === 0 || b.length > a.length) return -1;
    // Use Node's native implementation when available.
    if (typeof Buffer !== 'undefined') {
        const haystack = Buffer.isBuffer(a) ? a : Buffer.from(a.buffer, a.byteOffset, a.byteLength);
        return haystack.indexOf(b);
    }
    // start iterating through `a`
    for(let i = 0; i <= a.length - b.length; i++){
        let completeMatch = true;
        // from index `i`, iterate through `b` and check for mismatch
        for(let j = 0; j < b.length; j++){
            // if the values do not match, then this isn't a complete match, exit `b` iteration early and iterate to next index of `a`.
            if (a[i + j] !== b[j]) {
                completeMatch = false;
                break;
            }
        }
        if (completeMatch) {
            return i;
        }
    }
    return -1;
}
/**
 * Check if two Uint8Arrays are strictly equivalent.
 */ function isEquivalentUint8Arrays(a, b) {
    if (a.length !== b.length) return false;
    for(let i = 0; i < a.length; i++){
        if (a[i] !== b[i]) return false;
    }
    return true;
}
/**
 * Remove Uint8Array `b` from Uint8Array `a`.
 *
 * If `b` is not in `a`, `a` is returned unchanged.
 *
 * Otherwise, the function returns a new Uint8Array instance with size `a.length - b.length`
 */ function removeFromUint8Array(a, b) {
    const tagIndex = indexOfUint8Array(a, b);
    if (tagIndex === 0) return a.subarray(b.length);
    if (tagIndex > -1) {
        const removed = new Uint8Array(a.length - b.length);
        removed.set(a.subarray(0, tagIndex));
        removed.set(a.subarray(tagIndex + b.length), tagIndex);
        return removed;
    } else {
        return a;
    }
}

//# sourceMappingURL=uint8array-helpers.js.map

/***/ }),

/***/ 5023:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export getCookieParser */
/**
 * Parse cookies from the `headers` of request
 * @param req request object
 */ function getCookieParser(headers) {
    return function parseCookie() {
        const { cookie } = headers;
        if (!cookie) {
            return {};
        }
        const { parse: parseCookieFn } = __webpack_require__(7852);
        return parseCookieFn(Array.isArray(cookie) ? cookie.join('; ') : cookie);
    };
}

//# sourceMappingURL=get-cookie-parser.js.map

/***/ }),

/***/ 5134:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* reexport safe */ _after_task_async_storage_instance__WEBPACK_IMPORTED_MODULE_0__.i)
/* harmony export */ });
/* harmony import */ var _after_task_async_storage_instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6329);
// Share the instance module in the next-shared layer



//# sourceMappingURL=after-task-async-storage.external.js.map

/***/ }),

/***/ 5342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EK: () => (/* binding */ getTracer)
/* harmony export */ });
/* unused harmony exports BubbledError, isBubbledError, SpanStatusCode, SpanKind */
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4738);
/* harmony import */ var _shared_lib_is_thenable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9629);


const NEXT_OTEL_PERFORMANCE_PREFIX = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
const LOCAL_SPAN_RECORDER_KEY = Symbol.for('@next/local-span-recorder');
let api;
function getLocalSpanRecorder() {
    if (false) {} else {
        return undefined;
    }
}
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if (true) {
    api = __webpack_require__(5446);
} else {}
const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
class BubbledError extends Error {
    constructor(bubble, result){
        super(), this.bubble = bubble, this.result = result;
    }
}
function isBubbledError(error) {
    if (typeof error !== 'object' || error === null) return false;
    return error instanceof BubbledError;
}
const closeSpanWithError = (span, error)=>{
    if (isBubbledError(error) && error.bubble) {
        span.setAttribute('next.bubble', true);
    } else {
        if (error) {
            span.recordException(error);
            span.setAttribute('error.type', error.name);
        }
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error == null ? void 0 : error.message
        });
    }
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey('next.rootSpanId');
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
const clientTraceDataSetter = {
    set (carrier, key, value) {
        carrier.push({
            key,
            value
        });
    }
};
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer('next.js', '0.0.1');
    }
    isOpenTelemetryEnabled() {
        var _tracerProvider_getDelegate_constructor, _tracerProvider_getDelegate;
        const activeSpan = trace.getSpan(context.active());
        if (activeSpan == null ? void 0 : activeSpan.isRecording()) {
            return true;
        }
        const tracerProvider = trace.getTracerProvider();
        if (!('getDelegate' in tracerProvider)) {
            return true;
        }
        return (tracerProvider.getDelegate == null ? void 0 : (_tracerProvider_getDelegate = tracerProvider.getDelegate.call(tracerProvider)) == null ? void 0 : (_tracerProvider_getDelegate_constructor = _tracerProvider_getDelegate.constructor) == null ? void 0 : _tracerProvider_getDelegate_constructor.name) !== 'NoopTracerProvider';
    }
    getContext() {
        return context;
    }
    getTracePropagationData() {
        const activeContext = context.active();
        const entries = [];
        propagation.inject(activeContext, entries, clientTraceDataSetter);
        return entries;
    }
    getActiveScopeSpan() {
        const localSpanRecorder = getLocalSpanRecorder();
        const activeLocalSpan = localSpanRecorder == null ? void 0 : localSpanRecorder.getActiveLocalSpan();
        if (activeLocalSpan && (localSpanRecorder == null ? void 0 : localSpanRecorder.isOpenTelemetryIsolatedSpan(activeLocalSpan))) {
            return activeLocalSpan;
        }
        const activeSpan = trace.getSpan(context.active());
        if (activeSpan || !"") {
            return activeSpan;
        }
        return activeLocalSpan;
    }
    /**
   * Run `fn` with the active span cleared, so spans created inside become new
   * roots (or parent to incoming propagated context). Used for in-process
   * Node.js middleware so its span is a sibling of the request span, matching
   * edge middleware which runs in a detached sandbox.
   */ runWithDetachedContext(fn) {
        if (!NEXT_OTEL_PERFORMANCE_PREFIX && !this.isOpenTelemetryEnabled()) {
            return fn();
        }
        return context.with(ROOT_CONTEXT, fn);
    }
    withPropagatedContext(carrier, fn, getter, force = false) {
        const activeContext = context.active();
        if (!NEXT_OTEL_PERFORMANCE_PREFIX && !this.isOpenTelemetryEnabled() && !trace.getSpanContext(activeContext)) {
            return fn();
        }
        if (force) {
            const remoteContext = propagation.extract(ROOT_CONTEXT, carrier, getter);
            if (trace.getSpanContext(remoteContext)) {
                return context.with(remoteContext, fn);
            }
            // Preserve the current active span while still merging any extracted
            // baggage/context values from the carrier.
            const mergedContext = propagation.extract(activeContext, carrier, getter);
            return context.with(mergedContext, fn);
        }
        if (trace.getSpanContext(activeContext)) {
            // Active span is already set, too late to propagate.
            return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
    }
    trace(...args) {
        const [type, fnOrOptions, fnOrEmpty] = args;
        const tracingEnabled = Boolean(NEXT_OTEL_PERFORMANCE_PREFIX) || this.isOpenTelemetryEnabled();
        const localSpanRecorder = getLocalSpanRecorder();
        const localSpanRecordingEnabled = (localSpanRecorder == null ? void 0 : localSpanRecorder.isLocalSpanRecordingEnabled()) ?? false;
        if (!tracingEnabled && !localSpanRecordingEnabled) {
            return typeof fnOrOptions === 'function' ? fnOrOptions() : fnOrEmpty();
        }
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === 'function' ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        const spanName = options.spanName ?? type;
        const parentSpan = options.parentSpan ?? this.getActiveScopeSpan();
        const isolatedParentSpan = parentSpan && (localSpanRecorder == null ? void 0 : localSpanRecorder.isOpenTelemetryIsolatedSpan(parentSpan)) ? parentSpan : undefined;
        const shouldDelegateSpan = !isolatedParentSpan && (_constants__WEBPACK_IMPORTED_MODULE_0__/* .NextVanillaSpanAllowlist */ .KK.has(type) || process.env.NEXT_OTEL_VERBOSE === '1');
        const shouldTraceSpan = shouldDelegateSpan || ((localSpanRecorder == null ? void 0 : localSpanRecorder.isRequestInsightsEnabled()) ?? false);
        if (!shouldTraceSpan || options.hideSpan) {
            return fn();
        }
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = isolatedParentSpan ? context.active() : this.getSpanContext(parentSpan);
        if (!spanContext) {
            spanContext = (context == null ? void 0 : context.active()) ?? ROOT_CONTEXT;
        }
        // Check if there's already a root span in the store for this trace
        // We are intentionally not checking whether there is an active context
        // from outside of nextjs to ensure that we can provide the same level
        // of telemetry when using a custom server
        const existingRootSpanId = spanContext.getValue(rootSpanIdKey);
        const isRootSpan = typeof existingRootSpanId !== 'number' || !rootSpanAttributesStore.has(existingRootSpanId);
        const spanId = getSpanId();
        options.attributes = {
            'next.span_category': 'nextjs',
            'next.span_name': spanName,
            'next.span_type': type,
            ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.runWithActiveSpan(spanName, options, spanContext, tracingEnabled && shouldDelegateSpan, localSpanRecordingEnabled, isolatedParentSpan, (span)=>{
                let startTime;
                if (NEXT_OTEL_PERFORMANCE_PREFIX && type && _constants__WEBPACK_IMPORTED_MODULE_0__/* .LogSpanAllowList */ .EI.has(type)) {
                    startTime = 'performance' in globalThis && 'measure' in performance ? globalThis.performance.now() : undefined;
                }
                let cleanedUp = false;
                const onCleanup = ()=>{
                    if (cleanedUp) return;
                    cleanedUp = true;
                    rootSpanAttributesStore.delete(spanId);
                    if (startTime) {
                        performance.measure(`${NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(type.split('.').pop() || '').replace(/[A-Z]/g, (match)=>'-' + match.toLowerCase())}`, {
                            start: startTime,
                            end: performance.now()
                        });
                    }
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                if (fn.length > 1) {
                    try {
                        return fn(span, (err)=>{
                            if (err) {
                                closeSpanWithError(span, err);
                            } else {
                                span.end();
                            }
                        });
                    } catch (err) {
                        closeSpanWithError(span, err);
                        throw err;
                    } finally{
                        onCleanup();
                    }
                }
                try {
                    const result = fn(span);
                    if ((0,_shared_lib_is_thenable__WEBPACK_IMPORTED_MODULE_1__/* .isThenable */ .Q)(result)) {
                        // If there's error make sure it throws
                        return result.then((res)=>{
                            span.end();
                            // Need to pass down the promise result,
                            // it could be react stream response with error { error, stream }
                            return res;
                        }).catch((err)=>{
                            closeSpanWithError(span, err);
                            throw err;
                        }).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    runWithActiveSpan(spanName, options, parentContext, tracingEnabled, localSpanRecordingEnabled, isolatedParentSpan, fn) {
        if (tracingEnabled) {
            return this.getTracerInstance().startActiveSpan(spanName, options, (span)=>fn(localSpanRecordingEnabled ? this.createLocalRecordingSpan(spanName, options, parentContext, span, isolatedParentSpan) : span));
        }
        const span = this.createLocalRecordingSpan(spanName, options, parentContext, undefined, isolatedParentSpan);
        const localSpanRecorder = getLocalSpanRecorder();
        return localSpanRecorder.withLocalSpan(span, ()=>localSpanRecorder.isOpenTelemetryIsolatedSpan(span) ? fn(span) : context.with(trace.setSpan(context.active(), span), fn, undefined, span));
    }
    createLocalRecordingSpan(name, options, parentContext, delegateSpan, isolatedParentSpan) {
        const parentSpanContext = (isolatedParentSpan == null ? void 0 : isolatedParentSpan.spanContext()) ?? trace.getSpanContext(parentContext);
        const delegateSpanContext = delegateSpan == null ? void 0 : delegateSpan.spanContext();
        return getLocalSpanRecorder().createLocalSpan({
            name,
            attributes: options.attributes,
            links: options.links,
            startTime: options.startTime,
            delegateSpan,
            traceId: (delegateSpanContext == null ? void 0 : delegateSpanContext.traceId) ?? (parentSpanContext == null ? void 0 : parentSpanContext.traceId),
            spanId: delegateSpanContext == null ? void 0 : delegateSpanContext.spanId,
            parentSpanId: parentSpanContext == null ? void 0 : parentSpanContext.spanId,
            isolateOpenTelemetry: isolatedParentSpan !== undefined
        });
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!_constants__WEBPACK_IMPORTED_MODULE_0__/* .NextVanillaSpanAllowlist */ .KK.has(name) && process.env.NEXT_OTEL_VERBOSE !== '1' && !"") {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === 'function' && typeof fn === 'function') {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === 'function') {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, passedOptions] = args;
        const options = passedOptions ? {
            ...passedOptions,
            attributes: {
                'next.span_category': 'nextjs',
                ...passedOptions.attributes
            }
        } : {
            attributes: {
                'next.span_category': 'nextjs'
            }
        };
        const localSpanRecorder = getLocalSpanRecorder();
        const parentSpan = options.parentSpan ?? this.getActiveScopeSpan();
        const isolatedParentSpan = parentSpan && (localSpanRecorder == null ? void 0 : localSpanRecorder.isOpenTelemetryIsolatedSpan(parentSpan)) ? parentSpan : undefined;
        const parentContext = (isolatedParentSpan ? undefined : this.getSpanContext(parentSpan)) ?? context.active();
        const localSpanRecordingEnabled = (localSpanRecorder == null ? void 0 : localSpanRecorder.isLocalSpanRecordingEnabled()) ?? false;
        if (!localSpanRecordingEnabled) {
            return this.getTracerInstance().startSpan(type, options, parentContext);
        }
        const delegateSpan = !isolatedParentSpan && this.isOpenTelemetryEnabled() ? this.getTracerInstance().startSpan(type, options, parentContext) : undefined;
        return this.createLocalRecordingSpan(type, options, parentContext, delegateSpan, isolatedParentSpan);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
    setRootSpanAttribute(key, value) {
        const spanId = context.active().getValue(rootSpanIdKey);
        const attributes = rootSpanAttributesStore.get(spanId);
        if (attributes && !attributes.has(key)) {
            attributes.set(key, value);
        }
        if (false) { var _getLocalSpanRecorder; }
    }
    withSpan(span, fn) {
        const recorder = getLocalSpanRecorder();
        if (recorder == null ? void 0 : recorder.isLocalRecordingSpan(span)) {
            return recorder.withLocalSpan(span, ()=>recorder.isOpenTelemetryIsolatedSpan(span) ? fn() : context.with(trace.setSpan(context.active(), span), fn));
        }
        return context.with(trace.setSpan(context.active(), span), fn);
    }
}
const getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})();


//# sourceMappingURL=tracer.js.map

/***/ }),

/***/ 5356:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 5403:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a1: () => (/* binding */ getCacheHandlers),
/* harmony export */   fs: () => (/* binding */ getCacheHandlerEntries)
/* harmony export */ });
/* unused harmony exports initializeCacheHandlers, getCacheHandler, getPrivateCacheHandler, isMemoryCacheDisabled, isCustomCacheHandler, isBuiltInCacheHandler, getDevTieredCacheHandler, setCacheHandler */
/* harmony import */ var _lib_cache_handlers_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7649);
/* harmony import */ var _tiered_cache_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5957);


const debug = process.env.NEXT_PRIVATE_DEBUG_CACHE ? (message, ...args)=>{
    console.log(`use-cache: ${message}`, ...args);
} : undefined;
const handlersSymbol = Symbol.for('@next/cache-handlers');
const handlersMapSymbol = Symbol.for('@next/cache-handlers-map');
const handlersSetSymbol = Symbol.for('@next/cache-handlers-set');
const privateHandlerSymbol = Symbol.for('@next/cache-handlers-private');
const builtInHandlersSymbol = Symbol.for('@next/cache-handlers-built-in');
const devFrontHandlersSymbol = Symbol.for('@next/cache-handlers-dev-fronts');
const devTieredHandlersSymbol = Symbol.for('@next/cache-handlers-dev-tiered');
const memoryCacheDisabledSymbol = Symbol.for('@next/cache-handlers-memory-disabled');
/**
 * The in-memory size used for the dev-only built-in handlers (the private
 * handler, the size-0 replacement, and the per-kind front handlers for custom
 * kinds). Mirrors the framework default so `cacheMaxMemorySize: 0` does not
 * disable caching in development.
 */ const DEV_MEMORY_CACHE_SIZE = (/* unused pure expression or super */ null && (50 * 1024 * 1024));
/**
 * The reference to the cache handlers. We store the cache handlers on the
 * global object so that we can access the same instance across different
 * boundaries (such as different copies of the same module).
 */ const reference = globalThis;
/**
 * Initialize the cache handlers.
 * @param cacheMaxMemorySize - The maximum memory size of the cache in bytes, if
 *  not provided, the default memory size will be used.
 * @returns `true` if the cache handlers were initialized, `false` if they were already initialized.
 */ function initializeCacheHandlers(cacheMaxMemorySize) {
    // If the cache handlers have already been initialized, don't do it again.
    if (reference[handlersMapSymbol]) {
        debug == null ? void 0 : debug('cache handlers already initialized');
        return false;
    }
    debug == null ? void 0 : debug('initializing cache handlers');
    const handlersMap = new Map();
    reference[handlersMapSymbol] = handlersMap;
    const builtInHandlers = new Set();
    reference[builtInHandlersSymbol] = builtInHandlers;
    // In development, `cacheMaxMemorySize: 0` would make the built-in default
    // handler a no-op, so every reload would miss. Use a real in-memory size
    // instead so dev stays fast; the "use cache" wrapper forces a dynamic cache
    // life for this case so it still behaves close to "no cache" (serve stale,
    // regenerate in the background). Production keeps the no-op handler.
    const builtInSize =  false ? 0 : cacheMaxMemorySize;
    // Initialize the cache from the symbol contents first.
    if (reference[handlersSymbol]) {
        let fallback;
        if (reference[handlersSymbol].DefaultCache) {
            debug == null ? void 0 : debug('setting "default" cache handler from symbol');
            fallback = reference[handlersSymbol].DefaultCache;
        } else {
            debug == null ? void 0 : debug('setting "default" cache handler from default');
            fallback = createDefaultCacheHandler(builtInSize);
            builtInHandlers.add(fallback);
        }
        handlersMap.set('default', fallback);
        if (reference[handlersSymbol].RemoteCache) {
            debug == null ? void 0 : debug('setting "remote" cache handler from symbol');
            handlersMap.set('remote', reference[handlersSymbol].RemoteCache);
        } else {
            debug == null ? void 0 : debug('setting "remote" cache handler from default');
            handlersMap.set('remote', fallback);
        }
    } else {
        const handler = createDefaultCacheHandler(builtInSize);
        builtInHandlers.add(handler);
        debug == null ? void 0 : debug('setting "default" cache handler from default');
        handlersMap.set('default', handler);
        debug == null ? void 0 : debug('setting "remote" cache handler from default');
        handlersMap.set('remote', handler);
    }
    // Create a set of the cache handlers.
    reference[handlersSetSymbol] = new Set(handlersMap.values());
    // In development we add dedicated built-in in-memory handlers so that reloads
    // are fast. These are always built-in handlers, never a user-configured one,
    // and are gated on the dev server so production behaves exactly as
    // configured.
    if (false) {}
    return true;
}
/**
 * Get a cache handler by kind.
 * @param kind - The kind of cache handler to get.
 * @returns The cache handler, or `undefined` if it does not exist.
 * @throws If the cache handlers are not initialized.
 */ function getCacheHandler(kind) {
    // This should never be called before initializeCacheHandlers.
    if (!reference[handlersMapSymbol]) {
        throw Object.defineProperty(new Error('Cache handlers not initialized'), "__NEXT_ERROR_CODE", {
            value: "E649",
            enumerable: false,
            configurable: true
        });
    }
    return reference[handlersMapSymbol].get(kind);
}
/**
 * Get the dedicated in-memory cache handler that persists private caches in
 * development. Returns `undefined` outside the dev server, where private caches
 * must not be persisted. This is intentionally not part of the kind-keyed
 * handlers map so that it can never be replaced by a user-configured handler.
 */ function getPrivateCacheHandler() {
    // This should never be called before initializeCacheHandlers.
    if (!reference[handlersMapSymbol]) {
        throw Object.defineProperty(new Error('Cache handlers not initialized'), "__NEXT_ERROR_CODE", {
            value: "E649",
            enumerable: false,
            configurable: true
        });
    }
    return reference[privateHandlerSymbol];
}
/**
 * Whether the in-memory cache is disabled (`cacheMaxMemorySize: 0`). Dev-only
 * signal used to force a dynamic cache life so that the size-0 case still
 * serves stale and regenerates in the background. Always `false` in production.
 */ function isMemoryCacheDisabled() {
    return reference[memoryCacheDisabledSymbol] ?? false;
}
/**
 * Whether `kind` is backed by a real user-configured handler rather than the
 * built-in in-memory default. Such a handler may be slow or remote, so in
 * development a built-in front handler is placed in front of it (see
 * `getDevTieredCacheHandler`) to keep cache hits microtask-fast. The presence
 * of a dev front handler is the signal, since front handlers are created
 * exactly for user-registered kinds. Always `false` in production.
 */ function isCustomCacheHandler(kind) {
    var _reference_devFrontHandlersSymbol;
    if (true) {
        return false;
    }
    return ((_reference_devFrontHandlersSymbol = reference[devFrontHandlersSymbol]) == null ? void 0 : _reference_devFrontHandlersSymbol.has(kind)) ?? false;
}
/**
 * Whether `kind` resolves to one of the in-memory handlers that
 * `initializeCacheHandlers` constructs itself, rather than one supplied by the
 * platform through the `@next/cache-handlers` global or by `cacheHandlers`
 * config. Reads from a built-in handler are map lookups, so repeating one
 * within a request costs nothing; reads from a supplied handler may be a
 * network round trip. Unlike `isCustomCacheHandler`, this holds in production.
 *
 * Tracking the instances rather than the kinds is what keeps aliasing correct:
 * self-hosted, `remote` resolves to the same handler as `default` and so
 * reports as built-in, while a platform-supplied `remote` does not.
 */ function isBuiltInCacheHandler(kind) {
    var _reference_handlersMapSymbol, _reference_builtInHandlersSymbol;
    const handler = (_reference_handlersMapSymbol = reference[handlersMapSymbol]) == null ? void 0 : _reference_handlersMapSymbol.get(kind);
    return handler !== undefined && Boolean((_reference_builtInHandlersSymbol = reference[builtInHandlersSymbol]) == null ? void 0 : _reference_builtInHandlersSymbol.has(handler));
}
/**
 * Get the dev-only tiered cache handler for a custom `kind`: a fast built-in
 * in-memory front handler in front of the user-configured backing handler, so
 * cache hits resolve in a microtask. Returns `undefined` if there is none (a
 * built-in kind, or production).
 */ function getDevTieredCacheHandler(kind) {
    var _reference_devTieredHandlersSymbol;
    if (true) {
        return undefined;
    }
    return (_reference_devTieredHandlersSymbol = reference[devTieredHandlersSymbol]) == null ? void 0 : _reference_devTieredHandlersSymbol.get(kind);
}
/**
 * Get an iterator over the cache handlers.
 * @returns An iterator over the cache handlers, or `undefined` if they are not
 * initialized.
 */ function getCacheHandlers() {
    const handlersSet = reference[handlersSetSymbol];
    if (!handlersSet) {
        return undefined;
    }
    if (false) {}
    return handlersSet.values();
}
/**
 * Yields the registered handlers plus the dev-only built-in handlers (the
 * private handler and the per-kind front handlers). The built-in handlers are
 * not part of the registered set, but tag operations must still reach them:
 * their `updateTags` writes the shared tags manifest that their `get` consults,
 * so `revalidateTag` can invalidate their entries.
 */ function* iterateCacheHandlersWithDevBuiltIns(handlersSet) {
    yield* handlersSet;
    const privateHandler = reference[privateHandlerSymbol];
    if (privateHandler) {
        yield privateHandler;
    }
    const devFrontHandlers = reference[devFrontHandlersSymbol];
    if (devFrontHandlers) {
        yield* devFrontHandlers.values();
    }
}
/**
 * Get a map iterator over the cache handlers (keyed by kind).
 * @returns An iterator over the cache handler entries, or `undefined` if they
 * are not initialized.
 * @throws If the cache handlers are not initialized.
 */ function getCacheHandlerEntries() {
    const handlersMap = reference[handlersMapSymbol];
    if (!handlersMap) {
        return undefined;
    }
    if (false) {}
    return handlersMap.entries();
}
/**
 * Yields the registered entries plus the dev-only private handler under its
 * kind, so that per-kind tag operations (`refreshTags` / `getExpiration` for
 * implicit tags) apply to private entries. Custom-kind front handlers are
 * intentionally omitted: the backing handler (already in the map) is
 * authoritative for that kind's `getExpiration`, and a front entry is discarded
 * via that same value.
 */ function* iterateCacheHandlerEntriesWithDevBuiltIns(handlersMap) {
    yield* handlersMap.entries();
    const privateHandler = reference[privateHandlerSymbol];
    if (privateHandler) {
        const privateEntry = [
            'private',
            privateHandler
        ];
        yield privateEntry;
    }
}
/**
 * Set a cache handler by kind.
 * @param kind - The kind of cache handler to set.
 * @param cacheHandler - The cache handler to set.
 */ function setCacheHandler(kind, cacheHandler) {
    // This should never be called before initializeCacheHandlers.
    if (!reference[handlersMapSymbol] || !reference[handlersSetSymbol]) {
        throw Object.defineProperty(new Error('Cache handlers not initialized'), "__NEXT_ERROR_CODE", {
            value: "E649",
            enumerable: false,
            configurable: true
        });
    }
    debug == null ? void 0 : debug('setting cache handler for "%s"', kind);
    reference[handlersMapSymbol].set(kind, cacheHandler);
    reference[handlersSetSymbol].add(cacheHandler);
    // A user-configured handler may be slow or remote. In development, give it a
    // dedicated built-in in-memory front handler so cache hits resolve in a
    // microtask, and pair the two into a tiered handler the wrapper reads
    // through. Both are created alongside registration so their lifecycle matches
    // the backing handler's, and the front handler's presence is the signal that
    // this kind is backed by a real handler (see `isCustomCacheHandler`). Being a
    // built-in default handler, the front inherits the dev minimum retention, so
    // a short-`expire` value still hits the front instead of falling through to
    // the slow backing on every read.
    if (false) { var _reference_devFrontHandlersSymbol, _reference_devTieredHandlersSymbol; }
} //# sourceMappingURL=handlers.js.map


/***/ }),

/***/ 5446:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __dirname = "/";
(()=>{"use strict";var e={912:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.ContextAPI=void 0;const n=r(108);const a=r(221);const o=r(44);const i="context";const c=new n.NoopContextManager;class ContextAPI{constructor(){}static getInstance(){if(!this._instance){this._instance=new ContextAPI}return this._instance}setGlobalContextManager(e){return(0,a.registerGlobal)(i,e,o.DiagAPI.instance())}active(){return this._getContextManager().active()}with(e,t,r,...n){return this._getContextManager().with(e,t,r,...n)}bind(e,t){return this._getContextManager().bind(e,t)}_getContextManager(){return(0,a.getGlobal)(i)||c}disable(){this._getContextManager().disable();(0,a.unregisterGlobal)(i,o.DiagAPI.instance())}}t.ContextAPI=ContextAPI},44:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.DiagAPI=void 0;const n=r(757);const a=r(412);const o=r(711);const i=r(221);const c="diag";class DiagAPI{constructor(){function _logProxy(e){return function(...t){const r=(0,i.getGlobal)("diag");if(!r)return;return r[e](...t)}}const e=this;const setLogger=(t,r={logLevel:o.DiagLogLevel.INFO})=>{var n,c,s;if(t===e){const t=new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");e.error((n=t.stack)!==null&&n!==void 0?n:t.message);return false}if(typeof r==="number"){r={logLevel:r}}const u=(0,i.getGlobal)("diag");const l=(0,a.createLogLevelDiagLogger)((c=r.logLevel)!==null&&c!==void 0?c:o.DiagLogLevel.INFO,t);if(u&&!r.suppressOverrideMessage){const e=(s=(new Error).stack)!==null&&s!==void 0?s:"<failed to generate stacktrace>";u.warn(`Current logger will be overwritten from ${e}`);l.warn(`Current logger will overwrite one already registered from ${e}`)}return(0,i.registerGlobal)("diag",l,e,true)};e.setLogger=setLogger;e.disable=()=>{(0,i.unregisterGlobal)(c,e)};e.createComponentLogger=e=>new n.DiagComponentLogger(e);e.verbose=_logProxy("verbose");e.debug=_logProxy("debug");e.info=_logProxy("info");e.warn=_logProxy("warn");e.error=_logProxy("error")}static instance(){if(!this._instance){this._instance=new DiagAPI}return this._instance}}t.DiagAPI=DiagAPI},262:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.MetricsAPI=void 0;const n=r(586);const a=r(221);const o=r(44);const i="metrics";class MetricsAPI{constructor(){}static getInstance(){if(!this._instance){this._instance=new MetricsAPI}return this._instance}setGlobalMeterProvider(e){return(0,a.registerGlobal)(i,e,o.DiagAPI.instance())}getMeterProvider(){return(0,a.getGlobal)(i)||n.NOOP_METER_PROVIDER}getMeter(e,t,r){return this.getMeterProvider().getMeter(e,t,r)}disable(){(0,a.unregisterGlobal)(i,o.DiagAPI.instance())}}t.MetricsAPI=MetricsAPI},25:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.PropagationAPI=void 0;const n=r(221);const a=r(19);const o=r(92);const i=r(398);const c=r(504);const s=r(44);const u="propagation";const l=new a.NoopTextMapPropagator;class PropagationAPI{constructor(){this.createBaggage=c.createBaggage;this.getBaggage=i.getBaggage;this.getActiveBaggage=i.getActiveBaggage;this.setBaggage=i.setBaggage;this.deleteBaggage=i.deleteBaggage}static getInstance(){if(!this._instance){this._instance=new PropagationAPI}return this._instance}setGlobalPropagator(e){return(0,n.registerGlobal)(u,e,s.DiagAPI.instance())}inject(e,t,r=o.defaultTextMapSetter){return this._getGlobalPropagator().inject(e,t,r)}extract(e,t,r=o.defaultTextMapGetter){return this._getGlobalPropagator().extract(e,t,r)}fields(){return this._getGlobalPropagator().fields()}disable(){(0,n.unregisterGlobal)(u,s.DiagAPI.instance())}_getGlobalPropagator(){return(0,n.getGlobal)(u)||l}}t.PropagationAPI=PropagationAPI},397:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.TraceAPI=void 0;const n=r(221);const a=r(498);const o=r(477);const i=r(793);const c=r(44);const s="trace";class TraceAPI{constructor(){this._proxyTracerProvider=new a.ProxyTracerProvider;this.wrapSpanContext=o.wrapSpanContext;this.isSpanContextValid=o.isSpanContextValid;this.deleteSpan=i.deleteSpan;this.getSpan=i.getSpan;this.getActiveSpan=i.getActiveSpan;this.getSpanContext=i.getSpanContext;this.setSpan=i.setSpan;this.setSpanContext=i.setSpanContext}static getInstance(){if(!this._instance){this._instance=new TraceAPI}return this._instance}setGlobalTracerProvider(e){const t=(0,n.registerGlobal)(s,this._proxyTracerProvider,c.DiagAPI.instance());if(t){this._proxyTracerProvider.setDelegate(e)}return t}getTracerProvider(){return(0,n.getGlobal)(s)||this._proxyTracerProvider}getTracer(e,t){return this.getTracerProvider().getTracer(e,t)}disable(){(0,n.unregisterGlobal)(s,c.DiagAPI.instance());this._proxyTracerProvider=new a.ProxyTracerProvider}}t.TraceAPI=TraceAPI},398:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.deleteBaggage=t.setBaggage=t.getActiveBaggage=t.getBaggage=void 0;const n=r(912);const a=r(23);const o=(0,a.createContextKey)("OpenTelemetry Baggage Key");function getBaggage(e){return e.getValue(o)||undefined}t.getBaggage=getBaggage;function getActiveBaggage(){return getBaggage(n.ContextAPI.getInstance().active())}t.getActiveBaggage=getActiveBaggage;function setBaggage(e,t){return e.setValue(o,t)}t.setBaggage=setBaggage;function deleteBaggage(e){return e.deleteValue(o)}t.deleteBaggage=deleteBaggage},152:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.BaggageImpl=void 0;class BaggageImpl{constructor(e){this._entries=e?new Map(e):new Map}getEntry(e){const t=this._entries.get(e);if(!t){return undefined}return Object.assign({},t)}getAllEntries(){return Array.from(this._entries.entries()).map((([e,t])=>[e,t]))}setEntry(e,t){const r=new BaggageImpl(this._entries);r._entries.set(e,t);return r}removeEntry(e){const t=new BaggageImpl(this._entries);t._entries.delete(e);return t}removeEntries(...e){const t=new BaggageImpl(this._entries);for(const r of e){t._entries.delete(r)}return t}clear(){return new BaggageImpl}}t.BaggageImpl=BaggageImpl},647:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.baggageEntryMetadataSymbol=void 0;t.baggageEntryMetadataSymbol=Symbol("BaggageEntryMetadata")},504:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.baggageEntryMetadataFromString=t.createBaggage=void 0;const n=r(44);const a=r(152);const o=r(647);const i=n.DiagAPI.instance();function createBaggage(e={}){return new a.BaggageImpl(new Map(Object.entries(e)))}t.createBaggage=createBaggage;function baggageEntryMetadataFromString(e){if(typeof e!=="string"){i.error(`Cannot create baggage metadata from unknown type: ${typeof e}`);e=""}return{__TYPE__:o.baggageEntryMetadataSymbol,toString(){return e}}}t.baggageEntryMetadataFromString=baggageEntryMetadataFromString},778:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.context=void 0;const n=r(912);t.context=n.ContextAPI.getInstance()},108:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NoopContextManager=void 0;const n=r(23);class NoopContextManager{active(){return n.ROOT_CONTEXT}with(e,t,r,...n){return t.call(r,...n)}bind(e,t){return t}enable(){return this}disable(){return this}}t.NoopContextManager=NoopContextManager},23:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.ROOT_CONTEXT=t.createContextKey=void 0;function createContextKey(e){return Symbol.for(e)}t.createContextKey=createContextKey;class BaseContext{constructor(e){const t=this;t._currentContext=e?new Map(e):new Map;t.getValue=e=>t._currentContext.get(e);t.setValue=(e,r)=>{const n=new BaseContext(t._currentContext);n._currentContext.set(e,r);return n};t.deleteValue=e=>{const r=new BaseContext(t._currentContext);r._currentContext.delete(e);return r}}}t.ROOT_CONTEXT=new BaseContext},304:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.diag=void 0;const n=r(44);t.diag=n.DiagAPI.instance()},757:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.DiagComponentLogger=void 0;const n=r(221);class DiagComponentLogger{constructor(e){this._namespace=e.namespace||"DiagComponentLogger"}debug(...e){return logProxy("debug",this._namespace,e)}error(...e){return logProxy("error",this._namespace,e)}info(...e){return logProxy("info",this._namespace,e)}warn(...e){return logProxy("warn",this._namespace,e)}verbose(...e){return logProxy("verbose",this._namespace,e)}}t.DiagComponentLogger=DiagComponentLogger;function logProxy(e,t,r){const a=(0,n.getGlobal)("diag");if(!a){return}r.unshift(t);return a[e](...r)}},83:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.DiagConsoleLogger=void 0;const r=[{n:"error",c:"error"},{n:"warn",c:"warn"},{n:"info",c:"info"},{n:"debug",c:"debug"},{n:"verbose",c:"trace"}];class DiagConsoleLogger{constructor(){function _consoleFunc(e){return function(...t){if(console){let r=console[e];if(typeof r!=="function"){r=console.log}if(typeof r==="function"){return r.apply(console,t)}}}}for(let e=0;e<r.length;e++){this[r[e].n]=_consoleFunc(r[e].c)}}}t.DiagConsoleLogger=DiagConsoleLogger},412:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.createLogLevelDiagLogger=void 0;const n=r(711);function createLogLevelDiagLogger(e,t){if(e<n.DiagLogLevel.NONE){e=n.DiagLogLevel.NONE}else if(e>n.DiagLogLevel.ALL){e=n.DiagLogLevel.ALL}t=t||{};function _filterFunc(r,n){const a=t[r];if(typeof a==="function"&&e>=n){return a.bind(t)}return function(){}}return{error:_filterFunc("error",n.DiagLogLevel.ERROR),warn:_filterFunc("warn",n.DiagLogLevel.WARN),info:_filterFunc("info",n.DiagLogLevel.INFO),debug:_filterFunc("debug",n.DiagLogLevel.DEBUG),verbose:_filterFunc("verbose",n.DiagLogLevel.VERBOSE)}}t.createLogLevelDiagLogger=createLogLevelDiagLogger},711:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.DiagLogLevel=void 0;var r;(function(e){e[e["NONE"]=0]="NONE";e[e["ERROR"]=30]="ERROR";e[e["WARN"]=50]="WARN";e[e["INFO"]=60]="INFO";e[e["DEBUG"]=70]="DEBUG";e[e["VERBOSE"]=80]="VERBOSE";e[e["ALL"]=9999]="ALL"})(r=t.DiagLogLevel||(t.DiagLogLevel={}))},221:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.unregisterGlobal=t.getGlobal=t.registerGlobal=void 0;const n=r(678);const a=r(652);const o=r(662);const i=a.VERSION.split(".")[0];const c=Symbol.for(`opentelemetry.js.api.${i}`);const s=n._globalThis;function registerGlobal(e,t,r,n=false){var o;const i=s[c]=(o=s[c])!==null&&o!==void 0?o:{version:a.VERSION};if(!n&&i[e]){const t=new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);r.error(t.stack||t.message);return false}if(i.version!==a.VERSION){const t=new Error(`@opentelemetry/api: Registration of version v${i.version} for ${e} does not match previously registered API v${a.VERSION}`);r.error(t.stack||t.message);return false}i[e]=t;r.debug(`@opentelemetry/api: Registered a global for ${e} v${a.VERSION}.`);return true}t.registerGlobal=registerGlobal;function getGlobal(e){var t,r;const n=(t=s[c])===null||t===void 0?void 0:t.version;if(!n||!(0,o.isCompatible)(n)){return}return(r=s[c])===null||r===void 0?void 0:r[e]}t.getGlobal=getGlobal;function unregisterGlobal(e,t){t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${a.VERSION}.`);const r=s[c];if(r){delete r[e]}}t.unregisterGlobal=unregisterGlobal},662:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.isCompatible=t._makeCompatibilityCheck=void 0;const n=r(652);const a=/^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;function _makeCompatibilityCheck(e){const t=new Set([e]);const r=new Set;const n=e.match(a);if(!n){return()=>false}const o={major:+n[1],minor:+n[2],patch:+n[3],prerelease:n[4]};if(o.prerelease!=null){return function isExactmatch(t){return t===e}}function _reject(e){r.add(e);return false}function _accept(e){t.add(e);return true}return function isCompatible(e){if(t.has(e)){return true}if(r.has(e)){return false}const n=e.match(a);if(!n){return _reject(e)}const i={major:+n[1],minor:+n[2],patch:+n[3],prerelease:n[4]};if(i.prerelease!=null){return _reject(e)}if(o.major!==i.major){return _reject(e)}if(o.major===0){if(o.minor===i.minor&&o.patch<=i.patch){return _accept(e)}return _reject(e)}if(o.minor<=i.minor){return _accept(e)}return _reject(e)}}t._makeCompatibilityCheck=_makeCompatibilityCheck;t.isCompatible=_makeCompatibilityCheck(n.VERSION)},120:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.metrics=void 0;const n=r(262);t.metrics=n.MetricsAPI.getInstance()},532:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.ValueType=void 0;var r;(function(e){e[e["INT"]=0]="INT";e[e["DOUBLE"]=1]="DOUBLE"})(r=t.ValueType||(t.ValueType={}))},440:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.createNoopMeter=t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC=t.NOOP_OBSERVABLE_GAUGE_METRIC=t.NOOP_OBSERVABLE_COUNTER_METRIC=t.NOOP_UP_DOWN_COUNTER_METRIC=t.NOOP_HISTOGRAM_METRIC=t.NOOP_COUNTER_METRIC=t.NOOP_METER=t.NoopObservableUpDownCounterMetric=t.NoopObservableGaugeMetric=t.NoopObservableCounterMetric=t.NoopObservableMetric=t.NoopHistogramMetric=t.NoopUpDownCounterMetric=t.NoopCounterMetric=t.NoopMetric=t.NoopMeter=void 0;class NoopMeter{constructor(){}createHistogram(e,r){return t.NOOP_HISTOGRAM_METRIC}createCounter(e,r){return t.NOOP_COUNTER_METRIC}createUpDownCounter(e,r){return t.NOOP_UP_DOWN_COUNTER_METRIC}createObservableGauge(e,r){return t.NOOP_OBSERVABLE_GAUGE_METRIC}createObservableCounter(e,r){return t.NOOP_OBSERVABLE_COUNTER_METRIC}createObservableUpDownCounter(e,r){return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC}addBatchObservableCallback(e,t){}removeBatchObservableCallback(e){}}t.NoopMeter=NoopMeter;class NoopMetric{}t.NoopMetric=NoopMetric;class NoopCounterMetric extends NoopMetric{add(e,t){}}t.NoopCounterMetric=NoopCounterMetric;class NoopUpDownCounterMetric extends NoopMetric{add(e,t){}}t.NoopUpDownCounterMetric=NoopUpDownCounterMetric;class NoopHistogramMetric extends NoopMetric{record(e,t){}}t.NoopHistogramMetric=NoopHistogramMetric;class NoopObservableMetric{addCallback(e){}removeCallback(e){}}t.NoopObservableMetric=NoopObservableMetric;class NoopObservableCounterMetric extends NoopObservableMetric{}t.NoopObservableCounterMetric=NoopObservableCounterMetric;class NoopObservableGaugeMetric extends NoopObservableMetric{}t.NoopObservableGaugeMetric=NoopObservableGaugeMetric;class NoopObservableUpDownCounterMetric extends NoopObservableMetric{}t.NoopObservableUpDownCounterMetric=NoopObservableUpDownCounterMetric;t.NOOP_METER=new NoopMeter;t.NOOP_COUNTER_METRIC=new NoopCounterMetric;t.NOOP_HISTOGRAM_METRIC=new NoopHistogramMetric;t.NOOP_UP_DOWN_COUNTER_METRIC=new NoopUpDownCounterMetric;t.NOOP_OBSERVABLE_COUNTER_METRIC=new NoopObservableCounterMetric;t.NOOP_OBSERVABLE_GAUGE_METRIC=new NoopObservableGaugeMetric;t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC=new NoopObservableUpDownCounterMetric;function createNoopMeter(){return t.NOOP_METER}t.createNoopMeter=createNoopMeter},586:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NOOP_METER_PROVIDER=t.NoopMeterProvider=void 0;const n=r(440);class NoopMeterProvider{getMeter(e,t,r){return n.NOOP_METER}}t.NoopMeterProvider=NoopMeterProvider;t.NOOP_METER_PROVIDER=new NoopMeterProvider},678:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){if(n===undefined)n=r;Object.defineProperty(e,n,{enumerable:true,get:function(){return t[r]}})}:function(e,t,r,n){if(n===undefined)n=r;e[n]=t[r]});var a=this&&this.__exportStar||function(e,t){for(var r in e)if(r!=="default"&&!Object.prototype.hasOwnProperty.call(t,r))n(t,e,r)};Object.defineProperty(t,"__esModule",{value:true});a(r(59),t)},460:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t._globalThis=void 0;t._globalThis=typeof globalThis==="object"?globalThis:__webpack_require__.g},59:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){if(n===undefined)n=r;Object.defineProperty(e,n,{enumerable:true,get:function(){return t[r]}})}:function(e,t,r,n){if(n===undefined)n=r;e[n]=t[r]});var a=this&&this.__exportStar||function(e,t){for(var r in e)if(r!=="default"&&!Object.prototype.hasOwnProperty.call(t,r))n(t,e,r)};Object.defineProperty(t,"__esModule",{value:true});a(r(460),t)},27:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.propagation=void 0;const n=r(25);t.propagation=n.PropagationAPI.getInstance()},19:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.NoopTextMapPropagator=void 0;class NoopTextMapPropagator{inject(e,t){}extract(e,t){return e}fields(){return[]}}t.NoopTextMapPropagator=NoopTextMapPropagator},92:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.defaultTextMapSetter=t.defaultTextMapGetter=void 0;t.defaultTextMapGetter={get(e,t){if(e==null){return undefined}return e[t]},keys(e){if(e==null){return[]}return Object.keys(e)}};t.defaultTextMapSetter={set(e,t,r){if(e==null){return}e[t]=r}}},816:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.trace=void 0;const n=r(397);t.trace=n.TraceAPI.getInstance()},374:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NonRecordingSpan=void 0;const n=r(546);class NonRecordingSpan{constructor(e=n.INVALID_SPAN_CONTEXT){this._spanContext=e}spanContext(){return this._spanContext}setAttribute(e,t){return this}setAttributes(e){return this}addEvent(e,t){return this}setStatus(e){return this}updateName(e){return this}end(e){}isRecording(){return false}recordException(e,t){}}t.NonRecordingSpan=NonRecordingSpan},637:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NoopTracer=void 0;const n=r(912);const a=r(793);const o=r(374);const i=r(477);const c=n.ContextAPI.getInstance();class NoopTracer{startSpan(e,t,r=c.active()){const n=Boolean(t===null||t===void 0?void 0:t.root);if(n){return new o.NonRecordingSpan}const s=r&&(0,a.getSpanContext)(r);if(isSpanContext(s)&&(0,i.isSpanContextValid)(s)){return new o.NonRecordingSpan(s)}else{return new o.NonRecordingSpan}}startActiveSpan(e,t,r,n){let o;let i;let s;if(arguments.length<2){return}else if(arguments.length===2){s=t}else if(arguments.length===3){o=t;s=r}else{o=t;i=r;s=n}const u=i!==null&&i!==void 0?i:c.active();const l=this.startSpan(e,o,u);const g=(0,a.setSpan)(u,l);return c.with(g,s,undefined,l)}}t.NoopTracer=NoopTracer;function isSpanContext(e){return typeof e==="object"&&typeof e["spanId"]==="string"&&typeof e["traceId"]==="string"&&typeof e["traceFlags"]==="number"}},76:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NoopTracerProvider=void 0;const n=r(637);class NoopTracerProvider{getTracer(e,t,r){return new n.NoopTracer}}t.NoopTracerProvider=NoopTracerProvider},779:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.ProxyTracer=void 0;const n=r(637);const a=new n.NoopTracer;class ProxyTracer{constructor(e,t,r,n){this._provider=e;this.name=t;this.version=r;this.options=n}startSpan(e,t,r){return this._getTracer().startSpan(e,t,r)}startActiveSpan(e,t,r,n){const a=this._getTracer();return Reflect.apply(a.startActiveSpan,a,arguments)}_getTracer(){if(this._delegate){return this._delegate}const e=this._provider.getDelegateTracer(this.name,this.version,this.options);if(!e){return a}this._delegate=e;return this._delegate}}t.ProxyTracer=ProxyTracer},498:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.ProxyTracerProvider=void 0;const n=r(779);const a=r(76);const o=new a.NoopTracerProvider;class ProxyTracerProvider{getTracer(e,t,r){var a;return(a=this.getDelegateTracer(e,t,r))!==null&&a!==void 0?a:new n.ProxyTracer(this,e,t,r)}getDelegate(){var e;return(e=this._delegate)!==null&&e!==void 0?e:o}setDelegate(e){this._delegate=e}getDelegateTracer(e,t,r){var n;return(n=this._delegate)===null||n===void 0?void 0:n.getTracer(e,t,r)}}t.ProxyTracerProvider=ProxyTracerProvider},312:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.SamplingDecision=void 0;var r;(function(e){e[e["NOT_RECORD"]=0]="NOT_RECORD";e[e["RECORD"]=1]="RECORD";e[e["RECORD_AND_SAMPLED"]=2]="RECORD_AND_SAMPLED"})(r=t.SamplingDecision||(t.SamplingDecision={}))},793:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.getSpanContext=t.setSpanContext=t.deleteSpan=t.setSpan=t.getActiveSpan=t.getSpan=void 0;const n=r(23);const a=r(374);const o=r(912);const i=(0,n.createContextKey)("OpenTelemetry Context Key SPAN");function getSpan(e){return e.getValue(i)||undefined}t.getSpan=getSpan;function getActiveSpan(){return getSpan(o.ContextAPI.getInstance().active())}t.getActiveSpan=getActiveSpan;function setSpan(e,t){return e.setValue(i,t)}t.setSpan=setSpan;function deleteSpan(e){return e.deleteValue(i)}t.deleteSpan=deleteSpan;function setSpanContext(e,t){return setSpan(e,new a.NonRecordingSpan(t))}t.setSpanContext=setSpanContext;function getSpanContext(e){var t;return(t=getSpan(e))===null||t===void 0?void 0:t.spanContext()}t.getSpanContext=getSpanContext},285:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.TraceStateImpl=void 0;const n=r(240);const a=32;const o=512;const i=",";const c="=";class TraceStateImpl{constructor(e){this._internalState=new Map;if(e)this._parse(e)}set(e,t){const r=this._clone();if(r._internalState.has(e)){r._internalState.delete(e)}r._internalState.set(e,t);return r}unset(e){const t=this._clone();t._internalState.delete(e);return t}get(e){return this._internalState.get(e)}serialize(){return this._keys().reduce(((e,t)=>{e.push(t+c+this.get(t));return e}),[]).join(i)}_parse(e){if(e.length>o)return;this._internalState=e.split(i).reverse().reduce(((e,t)=>{const r=t.trim();const a=r.indexOf(c);if(a!==-1){const o=r.slice(0,a);const i=r.slice(a+1,t.length);if((0,n.validateKey)(o)&&(0,n.validateValue)(i)){e.set(o,i)}else{}}return e}),new Map);if(this._internalState.size>a){this._internalState=new Map(Array.from(this._internalState.entries()).reverse().slice(0,a))}}_keys(){return Array.from(this._internalState.keys()).reverse()}_clone(){const e=new TraceStateImpl;e._internalState=new Map(this._internalState);return e}}t.TraceStateImpl=TraceStateImpl},240:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.validateValue=t.validateKey=void 0;const r="[_0-9a-z-*/]";const n=`[a-z]${r}{0,255}`;const a=`[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`;const o=new RegExp(`^(?:${n}|${a})$`);const i=/^[ -~]{0,255}[!-~]$/;const c=/,|=/;function validateKey(e){return o.test(e)}t.validateKey=validateKey;function validateValue(e){return i.test(e)&&!c.test(e)}t.validateValue=validateValue},87:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.createTraceState=void 0;const n=r(285);function createTraceState(e){return new n.TraceStateImpl(e)}t.createTraceState=createTraceState},546:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.INVALID_SPAN_CONTEXT=t.INVALID_TRACEID=t.INVALID_SPANID=void 0;const n=r(731);t.INVALID_SPANID="0000000000000000";t.INVALID_TRACEID="00000000000000000000000000000000";t.INVALID_SPAN_CONTEXT={traceId:t.INVALID_TRACEID,spanId:t.INVALID_SPANID,traceFlags:n.TraceFlags.NONE}},613:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.SpanKind=void 0;var r;(function(e){e[e["INTERNAL"]=0]="INTERNAL";e[e["SERVER"]=1]="SERVER";e[e["CLIENT"]=2]="CLIENT";e[e["PRODUCER"]=3]="PRODUCER";e[e["CONSUMER"]=4]="CONSUMER"})(r=t.SpanKind||(t.SpanKind={}))},477:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.wrapSpanContext=t.isSpanContextValid=t.isValidSpanId=t.isValidTraceId=void 0;const n=r(546);const a=r(374);const o=/^([0-9a-f]{32})$/i;const i=/^[0-9a-f]{16}$/i;function isValidTraceId(e){return o.test(e)&&e!==n.INVALID_TRACEID}t.isValidTraceId=isValidTraceId;function isValidSpanId(e){return i.test(e)&&e!==n.INVALID_SPANID}t.isValidSpanId=isValidSpanId;function isSpanContextValid(e){return isValidTraceId(e.traceId)&&isValidSpanId(e.spanId)}t.isSpanContextValid=isSpanContextValid;function wrapSpanContext(e){return new a.NonRecordingSpan(e)}t.wrapSpanContext=wrapSpanContext},854:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.SpanStatusCode=void 0;var r;(function(e){e[e["UNSET"]=0]="UNSET";e[e["OK"]=1]="OK";e[e["ERROR"]=2]="ERROR"})(r=t.SpanStatusCode||(t.SpanStatusCode={}))},731:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.TraceFlags=void 0;var r;(function(e){e[e["NONE"]=0]="NONE";e[e["SAMPLED"]=1]="SAMPLED"})(r=t.TraceFlags||(t.TraceFlags={}))},652:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.VERSION=void 0;t.VERSION="1.6.0"}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var a=t[r]={exports:{}};var o=true;try{e[r].call(a.exports,a,a.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return a.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:true});e.trace=e.propagation=e.metrics=e.diag=e.context=e.INVALID_SPAN_CONTEXT=e.INVALID_TRACEID=e.INVALID_SPANID=e.isValidSpanId=e.isValidTraceId=e.isSpanContextValid=e.createTraceState=e.TraceFlags=e.SpanStatusCode=e.SpanKind=e.SamplingDecision=e.ProxyTracerProvider=e.ProxyTracer=e.defaultTextMapSetter=e.defaultTextMapGetter=e.ValueType=e.createNoopMeter=e.DiagLogLevel=e.DiagConsoleLogger=e.ROOT_CONTEXT=e.createContextKey=e.baggageEntryMetadataFromString=void 0;var t=__nccwpck_require__(504);Object.defineProperty(e,"baggageEntryMetadataFromString",{enumerable:true,get:function(){return t.baggageEntryMetadataFromString}});var n=__nccwpck_require__(23);Object.defineProperty(e,"createContextKey",{enumerable:true,get:function(){return n.createContextKey}});Object.defineProperty(e,"ROOT_CONTEXT",{enumerable:true,get:function(){return n.ROOT_CONTEXT}});var a=__nccwpck_require__(83);Object.defineProperty(e,"DiagConsoleLogger",{enumerable:true,get:function(){return a.DiagConsoleLogger}});var o=__nccwpck_require__(711);Object.defineProperty(e,"DiagLogLevel",{enumerable:true,get:function(){return o.DiagLogLevel}});var i=__nccwpck_require__(440);Object.defineProperty(e,"createNoopMeter",{enumerable:true,get:function(){return i.createNoopMeter}});var c=__nccwpck_require__(532);Object.defineProperty(e,"ValueType",{enumerable:true,get:function(){return c.ValueType}});var s=__nccwpck_require__(92);Object.defineProperty(e,"defaultTextMapGetter",{enumerable:true,get:function(){return s.defaultTextMapGetter}});Object.defineProperty(e,"defaultTextMapSetter",{enumerable:true,get:function(){return s.defaultTextMapSetter}});var u=__nccwpck_require__(779);Object.defineProperty(e,"ProxyTracer",{enumerable:true,get:function(){return u.ProxyTracer}});var l=__nccwpck_require__(498);Object.defineProperty(e,"ProxyTracerProvider",{enumerable:true,get:function(){return l.ProxyTracerProvider}});var g=__nccwpck_require__(312);Object.defineProperty(e,"SamplingDecision",{enumerable:true,get:function(){return g.SamplingDecision}});var p=__nccwpck_require__(613);Object.defineProperty(e,"SpanKind",{enumerable:true,get:function(){return p.SpanKind}});var d=__nccwpck_require__(854);Object.defineProperty(e,"SpanStatusCode",{enumerable:true,get:function(){return d.SpanStatusCode}});var _=__nccwpck_require__(731);Object.defineProperty(e,"TraceFlags",{enumerable:true,get:function(){return _.TraceFlags}});var f=__nccwpck_require__(87);Object.defineProperty(e,"createTraceState",{enumerable:true,get:function(){return f.createTraceState}});var b=__nccwpck_require__(477);Object.defineProperty(e,"isSpanContextValid",{enumerable:true,get:function(){return b.isSpanContextValid}});Object.defineProperty(e,"isValidTraceId",{enumerable:true,get:function(){return b.isValidTraceId}});Object.defineProperty(e,"isValidSpanId",{enumerable:true,get:function(){return b.isValidSpanId}});var v=__nccwpck_require__(546);Object.defineProperty(e,"INVALID_SPANID",{enumerable:true,get:function(){return v.INVALID_SPANID}});Object.defineProperty(e,"INVALID_TRACEID",{enumerable:true,get:function(){return v.INVALID_TRACEID}});Object.defineProperty(e,"INVALID_SPAN_CONTEXT",{enumerable:true,get:function(){return v.INVALID_SPAN_CONTEXT}});const O=__nccwpck_require__(778);Object.defineProperty(e,"context",{enumerable:true,get:function(){return O.context}});const P=__nccwpck_require__(304);Object.defineProperty(e,"diag",{enumerable:true,get:function(){return P.diag}});const N=__nccwpck_require__(120);Object.defineProperty(e,"metrics",{enumerable:true,get:function(){return N.metrics}});const S=__nccwpck_require__(27);Object.defineProperty(e,"propagation",{enumerable:true,get:function(){return S.propagation}});const C=__nccwpck_require__(816);Object.defineProperty(e,"trace",{enumerable:true,get:function(){return C.trace}});e["default"]={context:O.context,diag:P.diag,metrics:N.metrics,propagation:S.propagation,trace:C.trace}})();module.exports=r})();

/***/ }),

/***/ 5507:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D7: () => (/* binding */ RenderStage)
/* harmony export */ });
/* unused harmony exports RENDER_STAGE_ADVANCE_ORDER, getNextStage, isAdvanceableRenderStage, SyncIOMode, StagedRenderingController */
/* harmony import */ var _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1520);


var RenderStage = /*#__PURE__*/ function(RenderStage) {
    RenderStage[RenderStage["Before"] = 1] = "Before";
    //
    RenderStage[RenderStage["ShellStatic"] = 11] = "ShellStatic";
    RenderStage[RenderStage["Static"] = 13] = "Static";
    //
    RenderStage[RenderStage["ShellRuntime"] = 21] = "ShellRuntime";
    RenderStage[RenderStage["Runtime"] = 23] = "Runtime";
    //
    RenderStage[RenderStage["Dynamic"] = 30] = "Dynamic";
    //
    RenderStage[RenderStage["Abandoned"] = 40] = "Abandoned";
    return RenderStage;
}({});
const RENDER_STAGE_ADVANCE_ORDER = (/* unused pure expression or super */ null && ([
    11,
    13,
    21,
    23,
    30
]));
function getNextStage(stage) {
    return RENDER_STAGE_ADVANCE_ORDER[RENDER_STAGE_ADVANCE_ORDER.indexOf(stage) + 1];
}
function isAdvanceableRenderStage(stage) {
    return 1 < stage && stage <= 30;
}
var SyncIOMode = /*#__PURE__*/ function(SyncIOMode) {
    /** Sync IO does not error in any stage. */ SyncIOMode[SyncIOMode["Untracked"] = 1] = "Untracked";
    /** Before `partialPrefetching`: Sync IO errors in static stages, and is allowed otherwise. */ SyncIOMode[SyncIOMode["AllowedInRuntimeOrDynamic"] = 2] = "AllowedInRuntimeOrDynamic";
    /** After `partialPrefetching`: Sync IO errors in all stages other than dynamic. */ SyncIOMode[SyncIOMode["AllowedInDynamic"] = 3] = "AllowedInDynamic";
    return SyncIOMode;
}({});
class StagedRenderingController {
    constructor({ abortSignal, abandonController, syncIO, finalStage }){
        this.currentStage = 1;
        this.syncInterruptReason = null;
        this.triggers = {
            [11]: createStageTrigger(),
            [13]: createStageTrigger(),
            //
            [21]: createStageTrigger(),
            [23]: createStageTrigger(),
            //
            [30]: createStageTrigger()
        };
        this.abortSignal = abortSignal;
        this.abandonController = abandonController;
        this.syncIOMode = syncIO;
        this.finalStage = finalStage;
        if (abortSignal) {
            abortSignal.addEventListener('abort', ()=>{
                // Reject all stage promises that haven't already been resolved.
                // `cancelStageTrigger` is a noop if the trigger already resolved.
                const { reason } = abortSignal;
                for (const trigger of Object.values(this.triggers)){
                    cancelStageTrigger(trigger, reason);
                }
            }, {
                once: true
            });
        }
        if (abandonController) {
            abandonController.signal.addEventListener('abort', ()=>{
                this.abandonRender();
            }, {
                once: true
            });
        }
    }
    onStage(stage, callback) {
        addSyncTriggerListener(this.triggers[stage], callback);
    }
    shouldTrackSyncInterrupt() {
        if (this.syncIOMode === 1) {
            return false;
        }
        switch(this.currentStage){
            case 1:
                // If we haven't started the render yet, it can't be interrupted.
                return false;
            case 11:
            case 13:
                return true;
            case 21:
            case 23:
                {
                    switch(this.syncIOMode){
                        case 2:
                            {
                                // Before `partialPrefetching`: Sync IO only errors in static stages.
                                return false;
                            }
                        case 3:
                            {
                                return true;
                            }
                    }
                // NOT a fallthrough, but eslint doesn't understand that
                }
            case 30:
            case 40:
                return false;
            default:
                this.currentStage;
                return false;
        }
    }
    /** Note: only call this if `shouldTrackSyncInterrupt()` returned true */ syncInterruptCurrentStageWithReason(reason) {
        const { currentStage } = this;
        if (currentStage === 1 || currentStage === 30 || currentStage === 40) {
            // Not interruptible. Defensive noop.
            return;
        }
        // If Sync IO occurs during an abandonable render, we trigger the abandon.
        // The abandon listener will call abandonRender which advances through
        // stages to let caches fill before marking as Abandoned.
        if (this.abandonController) {
            this.abandonController.abort();
            return;
        }
        if (this.abortSignal) {
            // If this is an abortable render, we capture the interruption reason and stop advancing.
            // We don't release any more promises.
            // The caller is expected to abort the signal.
            this.syncInterruptReason = reason;
            this.currentStage = 40;
            return;
        }
        // If we're in a non-abandonable & non-abortable render,
        // we need to advance to the Dynamic stage and capture the interruption reason.
        // (in dev, this will be the restarted render)
        this.syncInterruptReason = reason;
        this.advanceStage(30);
    }
    getSyncInterruptReason() {
        return this.syncInterruptReason;
    }
    getStageEndTime(stage) {
        return this.triggers[getNextStage(stage)].triggeredAt ?? Infinity;
    }
    abandonRender() {
        // In staged rendering, only the initial render is abandonable.
        // We can abandon the initial render if
        //   1. We notice a cache miss, and need to wait for caches to fill
        //   2. A sync IO error occurs, and the render should be interrupted
        //      (this might be a lazy intitialization of a module,
        //       so we still want to restart in this case and see if it still occurs)
        // In either case, we'll be doing another render after this one,
        // so we only want to unblock the next stage, not Dynamic, because
        // unblocking the dynamic stage would likely lead to wasted (uncached) IO.
        const { currentStage } = this;
        if (currentStage === 1) {
            throw Object.defineProperty(new InvariantError("A render that hasn't started yet cannot be abandoned"), "__NEXT_ERROR_CODE", {
                value: "E1300",
                enumerable: false,
                configurable: true
            });
        }
        if (currentStage === 30 || currentStage === 40) {
            // We shouldn't ever trigger an abandon in these. Defensive noop.
            return;
        }
        // Resolve all stages after the current one, up to runtime (excluding dynamic)
        const nextStageIx = RENDER_STAGE_ADVANCE_ORDER.indexOf(currentStage) + 1;
        const dynamicStageIx = RENDER_STAGE_ADVANCE_ORDER.indexOf(30);
        for(let i = nextStageIx; i < dynamicStageIx; i++){
            this.resolveStage(RENDER_STAGE_ADVANCE_ORDER[i]);
        }
        this.currentStage = 40;
    }
    advanceStage(targetStage) {
        if (this.finalStage !== null && targetStage > this.finalStage) {
            throw Object.defineProperty(new InvariantError(`Attempted to advance to stage ${RenderStage[targetStage]} but the render is limited to ${RenderStage[this.finalStage]}`), "__NEXT_ERROR_CODE", {
                value: "E1302",
                enumerable: false,
                configurable: true
            });
        }
        const { currentStage } = this;
        if (currentStage === 30 || currentStage === 40) {
            // Terminal stages, nowhere left to advance.
            return;
        }
        // If we're already at the target stage or beyond, do nothing.
        if (targetStage <= currentStage) {
            return;
        }
        this.currentStage = targetStage;
        // Resolve all stages between the current stage and the target.
        const nextStageIx = currentStage === 1 ? 0 : RENDER_STAGE_ADVANCE_ORDER.indexOf(currentStage) + 1;
        const targetStageIx = RENDER_STAGE_ADVANCE_ORDER.indexOf(targetStage);
        for(let i = nextStageIx; i <= targetStageIx; i++){
            this.resolveStage(RENDER_STAGE_ADVANCE_ORDER[i]);
        }
    }
    resolveStage(stage) {
        fireStageTrigger(this.triggers[stage]);
    }
    getStagePromise(stage) {
        return this.triggers[stage].promise;
    }
    waitForStage(stage) {
        return this.getStagePromise(stage);
    }
    delayUntilStage(stage, displayName, resolvedValue) {
        const stagePromise = this.getStagePromise(stage);
        const promise =  false ? 0 : stagePromise.then(()=>resolvedValue);
        // Analogously to `makeDynamicHangingPromise`, we might reject this promise if the signal is invoked.
        // (e.g. in the case where we don't want want the render to proceed to the dynamic stage and abort it).
        // We shouldn't consider this an unhandled rejection, so we attach a noop catch handler here to suppress this warning.
        if (this.abortSignal) {
            promise.catch(ignoreReject);
        }
        return promise;
    }
}
function ignoreReject() {}
// TODO(restart-on-cache-miss): the layering of `delayUntilStage`,
// `makeDevtoolsIOPromiseFromIOTrigger` and and `makeDevtoolsIOAwarePromise`
// is confusing, we should clean it up.
function makeDevtoolsIOPromiseFromIOTrigger(ioTrigger, displayName, resolvedValue) {
    // If we create a `new Promise` and give it a displayName
    // (with no userspace code above us in the stack)
    // React Devtools will use it as the IO cause when determining "suspended by".
    // In particular, it should shadow any inner IO that resolved/rejected the promise
    // (in case of staged rendering, this will be the `setTimeout` that triggers the relevant stage)
    const promise = new Promise((resolve, reject)=>{
        ioTrigger.then(resolve.bind(null, resolvedValue), reject);
    });
    if (displayName !== undefined) {
        // @ts-expect-error
        promise.displayName = displayName;
    }
    return promise;
}
function addSyncTriggerListener(trigger, listener) {
    if (trigger.state === 'pending') {
        trigger._listeners.push(listener);
    } else {
        listener();
    }
}
function createStageTrigger() {
    const { promise, resolve, reject } = createPromiseWithResolvers();
    return {
        state: 'pending',
        triggeredAt: null,
        promise,
        _listeners: [],
        _resolvePromise: resolve,
        _rejectPromise: reject
    };
}
function fireStageTrigger(trigger) {
    if (trigger.state !== 'pending') {
        return;
    }
    trigger.state = 'triggered';
    trigger.triggeredAt = performance.now() + performance.timeOrigin;
    try {
        const { _listeners: listeners } = trigger;
        for(let i = 0; i < listeners.length; i++){
            listeners[i]();
        }
        listeners.length = 0;
    } finally{
        trigger._resolvePromise();
    }
}
function cancelStageTrigger(trigger, reason) {
    if (trigger.state !== 'pending') {
        return;
    }
    trigger.state = 'cancelled';
    // we didn't trigger, so don't save `triggeredAt`.
    // We're not gonna fire the listeners, we may as well free them.
    trigger._listeners.length = 0;
    // Suppress unhandled rejection warnings for promises that no one is awaiting.
    trigger.promise.catch(ignoreReject);
    trigger._rejectPromise(reason);
}

//# sourceMappingURL=staged-rendering.js.map

/***/ }),

/***/ 5521:
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ 5593:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports parseAppRouteSegment, isNormalizedAppRoute, isInterceptionAppRoute, parseNormalizedAppRoute, parseAppRouteWithSlots */
/* harmony import */ var _invariant_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1520);



function normalizeEncodedDynamicPlaceholder(segment) {
    if (!/%5b|%5d/i.test(segment)) {
        return segment;
    }
    try {
        const decodedSegment = decodeURIComponent(segment);
        return getSegmentParam(decodedSegment) ? decodedSegment : segment;
    } catch  {
        return segment;
    }
}
function parseAppRouteSegment(segment) {
    if (segment === '') {
        return null;
    }
    // Check if the segment starts with an interception marker
    const interceptionMarker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
    const param = getSegmentParam(segment);
    if (param) {
        return {
            type: 'dynamic',
            name: segment,
            param,
            interceptionMarker
        };
    } else if (segment.startsWith('(') && segment.endsWith(')')) {
        return {
            type: 'route-group',
            name: segment,
            interceptionMarker
        };
    } else if (segment.startsWith('@')) {
        return {
            type: 'parallel-route',
            name: segment,
            interceptionMarker
        };
    } else {
        return {
            type: 'static',
            name: segment,
            interceptionMarker
        };
    }
}
function isNormalizedAppRoute(route) {
    return route.normalized;
}
function isInterceptionAppRoute(route) {
    return route.interceptionMarker !== undefined && route.interceptingRoute !== undefined && route.interceptedRoute !== undefined;
}
// Bitmask for which non-URL segment types to allow during parsing.
// By default, route groups and parallel routes are rejected because
// they should have been stripped by normalizeAppPath. These flags
// let callers opt in to allowing specific types.
const OnlyRoutableSegments = /*   */ 0;
const AllowParallelSegments = /*  */ 1;
const AllowGroupSegments = /*     */ 2;
function parseAppRouteImpl(pathname, allowedTypes) {
    const pathnameSegments = pathname.split('/').filter(Boolean);
    // Build segments array with static and dynamic segments
    const segments = [];
    // Parse if this is an interception route.
    let interceptionMarker;
    let interceptingRoute;
    let interceptedRoute;
    for (const segment of pathnameSegments){
        const normalizedSegment = normalizeEncodedDynamicPlaceholder(segment);
        // Parse the segment into an AppSegment.
        const appSegment = parseAppRouteSegment(normalizedSegment);
        if (!appSegment) {
            continue;
        }
        if (appSegment.type === 'route-group' && !(allowedTypes & AllowGroupSegments)) {
            throw Object.defineProperty(new InvariantError(`${pathname} is being parsed as a normalized route, but it has a route group segment.`), "__NEXT_ERROR_CODE", {
                value: "E1151",
                enumerable: false,
                configurable: true
            });
        }
        if (appSegment.type === 'parallel-route' && !(allowedTypes & AllowParallelSegments)) {
            throw Object.defineProperty(new InvariantError(`${pathname} is being parsed as a normalized route, but it has a parallel route segment.`), "__NEXT_ERROR_CODE", {
                value: "E1152",
                enumerable: false,
                configurable: true
            });
        }
        segments.push(appSegment);
        if (appSegment.interceptionMarker) {
            const parts = pathname.split(appSegment.interceptionMarker);
            if (parts.length !== 2) {
                throw Object.defineProperty(new Error(`Invalid interception route: ${pathname}`), "__NEXT_ERROR_CODE", {
                    value: "E924",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptingRoute = parseAppRouteImpl(parts[0], allowedTypes);
            interceptedRoute = parseAppRouteImpl(parts[1], allowedTypes);
            interceptionMarker = appSegment.interceptionMarker;
        }
    }
    const dynamicSegments = segments.filter((segment)=>segment.type === 'dynamic');
    return {
        normalized: allowedTypes === OnlyRoutableSegments,
        pathname,
        segments,
        dynamicSegments,
        interceptionMarker,
        interceptingRoute,
        interceptedRoute
    };
}
/**
 * Parse an app route that has been fully normalized (no @slot or ()
 * group segments). Throws if either is present.
 */ function parseNormalizedAppRoute(pathname) {
    return parseAppRouteImpl(pathname, OnlyRoutableSegments);
}
/**
 * Parse an app route that may contain @slot segments but not ()
 * group segments. Slot segments are preserved as parallel-route
 * type segments so callers can distinguish routes in different
 * parallel slots.
 */ function parseAppRouteWithSlots(pathname) {
    return parseAppRouteImpl(pathname, AllowParallelSegments);
} //# sourceMappingURL=app.js.map


/***/ }),

/***/ 5643:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports matchHas, compileNonPath, parseDestination, prepareDestination */
/* harmony import */ var _parse_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(228);
/* harmony import */ var _server_api_utils_get_cookie_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5023);
/* harmony import */ var _route_match_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8814);





/**
 * Ensure only a-zA-Z are used for param names for proper interpolating
 * with path-to-regexp
 */ function getSafeParamName(paramName) {
    let newParamName = '';
    for(let i = 0; i < paramName.length; i++){
        const charCode = paramName.charCodeAt(i);
        if (charCode > 64 && charCode < 91 || // A-Z
        charCode > 96 && charCode < 123 // a-z
        ) {
            newParamName += paramName[i];
        }
    }
    return newParamName;
}
function escapeSegment(str, segmentName) {
    return str.replace(new RegExp(`:${escapeStringRegexp(segmentName)}`, 'g'), `__ESC_COLON_${segmentName}`);
}
function unescapeSegments(str) {
    return str.replace(/__ESC_COLON_/gi, ':');
}
function matchHas(req, query, has = [], missing = []) {
    const params = {};
    const hasMatch = (hasItem)=>{
        let value;
        let key = hasItem.key;
        switch(hasItem.type){
            case 'header':
                {
                    key = key.toLowerCase();
                    value = req.headers[key];
                    break;
                }
            case 'cookie':
                {
                    if ('cookies' in req) {
                        value = req.cookies[hasItem.key];
                    } else {
                        const cookies = getCookieParser(req.headers)();
                        value = cookies[hasItem.key];
                    }
                    break;
                }
            case 'query':
                {
                    value = query[key];
                    break;
                }
            case 'host':
                {
                    const { host } = req?.headers || {};
                    // remove port from host if present
                    const hostname = host?.split(':', 1)[0].toLowerCase();
                    value = hostname;
                    break;
                }
            default:
                {
                    break;
                }
        }
        if (!hasItem.value && value) {
            params[getSafeParamName(key)] = value;
            return true;
        } else if (value) {
            const matcher = new RegExp(`^${hasItem.value}$`);
            const matches = Array.isArray(value) ? value.slice(-1)[0].match(matcher) : value.match(matcher);
            if (matches) {
                if (Array.isArray(matches)) {
                    if (matches.groups) {
                        Object.keys(matches.groups).forEach((groupKey)=>{
                            params[groupKey] = matches.groups[groupKey];
                        });
                    } else if (hasItem.type === 'host' && matches[0]) {
                        params.host = matches[0];
                    }
                }
                return true;
            }
        }
        return false;
    };
    const allMatch = has.every((item)=>hasMatch(item)) && !missing.some((item)=>hasMatch(item));
    if (allMatch) {
        return params;
    }
    return false;
}
function compileNonPath(value, params) {
    if (!value.includes(':')) {
        return value;
    }
    for (const key of Object.keys(params)){
        if (value.includes(`:${key}`)) {
            value = value.replace(new RegExp(`:${key}\\*`, 'g'), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(new RegExp(`:${key}\\?`, 'g'), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, 'g'), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, 'g'), `--ESCAPED_PARAM_COLON${key}`);
        }
    }
    value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, '\\$1').replace(/--ESCAPED_PARAM_PLUS/g, '+').replace(/--ESCAPED_PARAM_COLON/g, ':').replace(/--ESCAPED_PARAM_QUESTION/g, '?').replace(/--ESCAPED_PARAM_ASTERISKS/g, '*');
    // the value needs to start with a forward-slash to be compiled
    // correctly
    return safeCompile(`/${value}`, {
        validate: false
    })(params).slice(1);
}
function parseDestination(args) {
    let escaped = args.destination;
    for (const param of Object.keys({
        ...args.params,
        ...args.query
    })){
        if (!param) continue;
        escaped = escapeSegment(escaped, param);
    }
    const parsed = parseUrl(escaped);
    let pathname = parsed.pathname;
    if (pathname) {
        pathname = unescapeSegments(pathname);
    }
    let href = parsed.href;
    if (href) {
        href = unescapeSegments(href);
    }
    let hostname = parsed.hostname;
    if (hostname) {
        hostname = unescapeSegments(hostname);
    }
    let hash = parsed.hash;
    if (hash) {
        hash = unescapeSegments(hash);
    }
    let search = parsed.search;
    if (search) {
        search = unescapeSegments(search);
    }
    let origin = parsed.origin;
    if (origin) {
        origin = unescapeSegments(origin);
    }
    return {
        ...parsed,
        pathname,
        hostname,
        href,
        hash,
        search,
        origin
    };
}
function prepareDestination(args) {
    const parsedDestination = parseDestination(args);
    const { hostname: destHostname, query: destQuery, search: destSearch } = parsedDestination;
    // The following code assumes that the pathname here includes the hash if it's
    // present.
    let destPath = parsedDestination.pathname;
    if (parsedDestination.hash) {
        destPath = `${destPath}${parsedDestination.hash}`;
    }
    const destParams = [];
    const destPathParamKeys = [];
    safePathToRegexp(destPath, destPathParamKeys);
    for (const key of destPathParamKeys){
        destParams.push(key.name);
    }
    if (destHostname) {
        const destHostnameParamKeys = [];
        safePathToRegexp(destHostname, destHostnameParamKeys);
        for (const key of destHostnameParamKeys){
            destParams.push(key.name);
        }
    }
    const destPathCompiler = safeCompile(destPath, // have already validated before we got to this point and validating
    // breaks compiling destinations with named pattern params from the source
    // e.g. /something:hello(.*) -> /another/:hello is broken with validation
    // since compile validation is meant for reversing and not for inserting
    // params from a separate path-regex into another
    {
        validate: false
    });
    let destHostnameCompiler;
    if (destHostname) {
        destHostnameCompiler = safeCompile(destHostname, {
            validate: false,
            encode: encodeURIComponent
        });
    }
    // update any params in query values
    for (const [key, strOrArray] of Object.entries(destQuery)){
        // the value needs to start with a forward-slash to be compiled
        // correctly
        if (Array.isArray(strOrArray)) {
            destQuery[key] = strOrArray.map((value)=>compileNonPath(unescapeSegments(value), args.params));
        } else if (typeof strOrArray === 'string') {
            destQuery[key] = compileNonPath(unescapeSegments(strOrArray), args.params);
        }
    }
    // add path params to query if it's not a redirect and not
    // already defined in destination query or path
    let paramKeys = Object.keys(args.params).filter((name)=>name !== 'nextInternalLocale');
    if (args.appendParamsToQuery && !paramKeys.some((key)=>destParams.includes(key))) {
        for (const key of paramKeys){
            if (!(key in destQuery)) {
                destQuery[key] = args.params[key];
            }
        }
    }
    let newUrl;
    // The compiler also that the interception route marker is an unnamed param, hence '0',
    // so we need to add it to the params object.
    if (isInterceptionRouteAppPath(destPath)) {
        for (const segment of destPath.split('/')){
            const marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
            if (marker) {
                if (marker === '(..)(..)') {
                    args.params['0'] = '(..)';
                    args.params['1'] = '(..)';
                } else {
                    args.params['0'] = marker;
                }
                break;
            }
        }
    }
    try {
        newUrl = destPathCompiler(args.params);
        const [pathname, hash] = newUrl.split('#', 2);
        if (destHostnameCompiler) {
            parsedDestination.hostname = destHostnameCompiler(args.params);
        }
        parsedDestination.pathname = pathname;
        parsedDestination.hash = `${hash ? '#' : ''}${hash || ''}`;
        parsedDestination.search = destSearch ? compileNonPath(destSearch, args.params) : '';
    } catch (err) {
        if (err.message.match(/Expected .*? to not repeat, but got an array/)) {
            throw Object.defineProperty(new Error(`To use a multi-match in the destination you must add \`*\` at the end of the param name to signify it should repeat. https://nextjs.org/docs/messages/invalid-multi-match`), "__NEXT_ERROR_CODE", {
                value: "E329",
                enumerable: false,
                configurable: true
            });
        }
        throw err;
    }
    // Query merge order lowest priority to highest
    // 1. initial URL query values
    // 2. path segment values
    // 3. destination specified query values
    parsedDestination.query = {
        ...args.query,
        ...parsedDestination.query
    };
    return {
        newUrl,
        destQuery,
        parsedDestination
    };
} //# sourceMappingURL=prepare-destination.js.map


/***/ }),

/***/ 5698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ getEdgePreviewProps)
/* harmony export */ });
/**
 * In edge runtime, these props directly accessed from environment variables.
 *   - local: env vars will be injected through edge-runtime as runtime env vars
 *   - deployment: env vars will be replaced by edge build pipeline
 */ function getEdgePreviewProps() {
    return {
        previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || '',
        previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || '',
        previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || ''
    };
}

//# sourceMappingURL=get-edge-preview-props.js.map

/***/ }),

/***/ 5760:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cr: () => (/* binding */ bold),
/* harmony export */   D9: () => (/* binding */ yellow),
/* harmony export */   GC: () => (/* binding */ magenta),
/* harmony export */   ON: () => (/* binding */ white),
/* harmony export */   wL: () => (/* binding */ green),
/* harmony export */   wv: () => (/* binding */ red)
/* harmony export */ });
/* unused harmony exports reset, dim, italic, underline, inverse, hidden, strikethrough, black, blue, purple, cyan, gray, bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite */
// ISC License
// Copyright (c) 2021 Alexey Raspopov, Kostiantyn Denysov, Anton Verinov
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
// https://github.com/alexeyraspopov/picocolors/blob/b6261487e7b81aaab2440e397a356732cad9e342/picocolors.js#L1
var _globalThis;
const { env, stdout } = ((_globalThis = globalThis) == null ? void 0 : _globalThis.process) ?? {};
const enabled = env && !env.NO_COLOR && (env.FORCE_COLOR || (stdout == null ? void 0 : stdout.isTTY) && !env.CI && env.TERM !== 'dumb');
const replaceClose = (str, close, replace, index)=>{
    const start = str.substring(0, index) + replace;
    const end = str.substring(index + close.length);
    const nextIndex = end.indexOf(close);
    return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
};
const formatter = (open, close, replace = open)=>{
    if (!enabled) return String;
    return (input)=>{
        const string = '' + input;
        const index = string.indexOf(close, open.length);
        return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
};
const reset = (/* unused pure expression or super */ null && (enabled ? (s)=>`\x1b[0m${s}\x1b[0m` : String));
const bold = formatter('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m');
const dim = formatter('\x1b[2m', '\x1b[22m', '\x1b[22m\x1b[2m');
const italic = formatter('\x1b[3m', '\x1b[23m');
const underline = formatter('\x1b[4m', '\x1b[24m');
const inverse = formatter('\x1b[7m', '\x1b[27m');
const hidden = formatter('\x1b[8m', '\x1b[28m');
const strikethrough = formatter('\x1b[9m', '\x1b[29m');
const black = formatter('\x1b[30m', '\x1b[39m');
const red = formatter('\x1b[31m', '\x1b[39m');
const green = formatter('\x1b[32m', '\x1b[39m');
const yellow = formatter('\x1b[33m', '\x1b[39m');
const blue = formatter('\x1b[34m', '\x1b[39m');
const magenta = formatter('\x1b[35m', '\x1b[39m');
const purple = formatter('\x1b[38;2;173;127;168m', '\x1b[39m');
const cyan = formatter('\x1b[36m', '\x1b[39m');
const white = formatter('\x1b[37m', '\x1b[39m');
const gray = formatter('\x1b[90m', '\x1b[39m');
const bgBlack = formatter('\x1b[40m', '\x1b[49m');
const bgRed = formatter('\x1b[41m', '\x1b[49m');
const bgGreen = formatter('\x1b[42m', '\x1b[49m');
const bgYellow = formatter('\x1b[43m', '\x1b[49m');
const bgBlue = formatter('\x1b[44m', '\x1b[49m');
const bgMagenta = formatter('\x1b[45m', '\x1b[49m');
const bgCyan = formatter('\x1b[46m', '\x1b[49m');
const bgWhite = formatter('\x1b[47m', '\x1b[49m');

//# sourceMappingURL=picocolors.js.map

/***/ }),

/***/ 5792:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ isRSCRequestHeader)
/* harmony export */ });
/**
 * Normalizes the raw RSC header value. Only the literal string "1" is treated
 * as a valid RSC request marker; malformed or repeated values are ignored.
 */ function isRSCRequestHeader(value) {
    return value === '1';
}

//# sourceMappingURL=is-rsc-request.js.map

/***/ }),

/***/ 5912:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ workAsyncStorageInstance)
/* harmony export */ });
/* harmony import */ var _async_local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2058);

const workAsyncStorageInstance = (0,_async_local_storage__WEBPACK_IMPORTED_MODULE_0__/* .createAsyncLocalStorage */ .xl)();

//# sourceMappingURL=work-async-storage-instance.js.map

/***/ }),

/***/ 5918:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  RequestCookies: () => RequestCookies,
  ResponseCookies: () => ResponseCookies,
  parseCookie: () => parseCookie,
  parseSetCookie: () => parseSetCookie,
  stringifyCookie: () => stringifyCookie
});
module.exports = __toCommonJS(src_exports);

// src/serialize.ts
function stringifyCookie(c) {
  var _a;
  const attrs = [
    "path" in c && c.path && `Path=${c.path}`,
    "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
    "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
    "domain" in c && c.domain && `Domain=${c.domain}`,
    "secure" in c && c.secure && "Secure",
    "httpOnly" in c && c.httpOnly && "HttpOnly",
    "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
    "partitioned" in c && c.partitioned && "Partitioned",
    "priority" in c && c.priority && `Priority=${c.priority}`
  ].filter(Boolean);
  const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
  return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
  const map = /* @__PURE__ */ new Map();
  for (const pair of cookie.split(/; */)) {
    if (!pair)
      continue;
    const splitAt = pair.indexOf("=");
    if (splitAt === -1) {
      map.set(pair, "true");
      continue;
    }
    const [key, value] = [pair.slice(0, splitAt), pair.slice(splitAt + 1)];
    try {
      map.set(key, decodeURIComponent(value != null ? value : "true"));
    } catch {
    }
  }
  return map;
}
function parseSetCookie(setCookie) {
  if (!setCookie) {
    return void 0;
  }
  const [[name, value], ...attributes] = parseCookie(setCookie);
  const {
    domain,
    expires,
    httponly,
    maxage,
    path,
    samesite,
    secure,
    partitioned,
    priority
  } = Object.fromEntries(
    attributes.map(([key, value2]) => [
      key.toLowerCase().replace(/-/g, ""),
      value2
    ])
  );
  const cookie = {
    name,
    value: decodeURIComponent(value),
    domain,
    ...expires && { expires: new Date(expires) },
    ...httponly && { httpOnly: true },
    ...typeof maxage === "string" && { maxAge: Number(maxage) },
    path,
    ...samesite && { sameSite: parseSameSite(samesite) },
    ...secure && { secure: true },
    ...priority && { priority: parsePriority(priority) },
    ...partitioned && { partitioned: true }
  };
  return compact(cookie);
}
function compact(t) {
  const newT = {};
  for (const key in t) {
    if (t[key]) {
      newT[key] = t[key];
    }
  }
  return newT;
}
var SAME_SITE = ["strict", "lax", "none"];
function parseSameSite(string) {
  string = string.toLowerCase();
  return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = ["low", "medium", "high"];
function parsePriority(string) {
  string = string.toLowerCase();
  return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
  if (!cookiesString)
    return [];
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

// src/request-cookies.ts
var RequestCookies = class {
  constructor(requestHeaders) {
    /** @internal */
    this._parsed = /* @__PURE__ */ new Map();
    this._headers = requestHeaders;
    const header = requestHeaders.get("cookie");
    if (header) {
      const parsed = parseCookie(header);
      for (const [name, value] of parsed) {
        this._parsed.set(name, { name, value });
      }
    }
  }
  [Symbol.iterator]() {
    return this._parsed[Symbol.iterator]();
  }
  /**
   * The amount of cookies received from the client
   */
  get size() {
    return this._parsed.size;
  }
  get(...args) {
    const name = typeof args[0] === "string" ? args[0] : args[0].name;
    return this._parsed.get(name);
  }
  getAll(...args) {
    var _a;
    const all = Array.from(this._parsed);
    if (!args.length) {
      return all.map(([_, value]) => value);
    }
    const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
    return all.filter(([n]) => n === name).map(([_, value]) => value);
  }
  has(name) {
    return this._parsed.has(name);
  }
  set(...args) {
    const [name, value] = args.length === 1 ? [args[0].name, args[0].value] : args;
    const map = this._parsed;
    map.set(name, { name, value });
    this._headers.set(
      "cookie",
      Array.from(map).map(([_, value2]) => stringifyCookie(value2)).join("; ")
    );
    return this;
  }
  /**
   * Delete the cookies matching the passed name or names in the request.
   */
  delete(names) {
    const map = this._parsed;
    const result = !Array.isArray(names) ? map.delete(names) : names.map((name) => map.delete(name));
    this._headers.set(
      "cookie",
      Array.from(map).map(([_, value]) => stringifyCookie(value)).join("; ")
    );
    return result;
  }
  /**
   * Delete all the cookies in the cookies in the request.
   */
  clear() {
    this.delete(Array.from(this._parsed.keys()));
    return this;
  }
  /**
   * Format the cookies in the request as a string for logging
   */
  [Symbol.for("edge-runtime.inspect.custom")]() {
    return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
  }
  toString() {
    return [...this._parsed.values()].map((v) => `${v.name}=${encodeURIComponent(v.value)}`).join("; ");
  }
};

// src/response-cookies.ts
var ResponseCookies = class {
  constructor(responseHeaders) {
    /** @internal */
    this._parsed = /* @__PURE__ */ new Map();
    var _a, _b, _c;
    this._headers = responseHeaders;
    const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
    const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
    for (const cookieString of cookieStrings) {
      const parsed = parseSetCookie(cookieString);
      if (parsed)
        this._parsed.set(parsed.name, parsed);
    }
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */
  get(...args) {
    const key = typeof args[0] === "string" ? args[0] : args[0].name;
    return this._parsed.get(key);
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */
  getAll(...args) {
    var _a;
    const all = Array.from(this._parsed.values());
    if (!args.length) {
      return all;
    }
    const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
    return all.filter((c) => c.name === key);
  }
  has(name) {
    return this._parsed.has(name);
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */
  set(...args) {
    const [name, value, cookie] = args.length === 1 ? [args[0].name, args[0].value, args[0]] : args;
    const map = this._parsed;
    map.set(name, normalizeCookie({ name, value, ...cookie }));
    replace(map, this._headers);
    return this;
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */
  delete(...args) {
    const [name, options] = typeof args[0] === "string" ? [args[0]] : [args[0].name, args[0]];
    return this.set({ ...options, name, value: "", expires: /* @__PURE__ */ new Date(0) });
  }
  [Symbol.for("edge-runtime.inspect.custom")]() {
    return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
  }
  toString() {
    return [...this._parsed.values()].map(stringifyCookie).join("; ");
  }
};
function replace(bag, headers) {
  headers.delete("set-cookie");
  for (const [, value] of bag) {
    const serialized = stringifyCookie(value);
    headers.append("set-cookie", serialized);
  }
}
function normalizeCookie(cookie = { name: "", value: "" }) {
  if (typeof cookie.expires === "number") {
    cookie.expires = new Date(cookie.expires);
  }
  if (cookie.maxAge) {
    cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
  }
  if (cookie.path === null || cookie.path === void 0) {
    cookie.path = "/";
  }
  return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 5957:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export createTieredCacheHandler */
/* harmony import */ var _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2736);


/**
 * Development-only. Puts a fast built-in in-memory `front` handler in front of
 * a slower or persistent user-configured `backing` handler. Its only job is to
 * guarantee that cache hits resolve in a microtask (so they aren't counted as
 * cache misses at a staged-render boundary, which would otherwise surface a
 * cold cache indicator), while keeping the front in sync with the backing.
 *
 * It implements only `get` and `set` because that is all the wrapper calls on
 * its handler. Regeneration is never done here; this only reads, mirrors, and
 * writes through.
 *
 * The handler is a per-kind singleton (the front and backing are both shared),
 * so its in-flight map can serialize background front syncs for a key across
 * concurrent reads, running them one at a time instead of in parallel.
 */ function createTieredCacheHandler(front, backing) {
    // Holds the in-flight (or chained) background sync per key, so a sync for a
    // key runs after any earlier one for that key rather than in parallel.
    const inFlightSyncs = new Map();
    function scheduleBackgroundSync(cacheKey, sync) {
        // Serialize syncs per key: chain this one after any in-flight sync rather
        // than running a second in parallel. The trailing sync still re-reads the
        // backing, so the front converges to the latest state; a later read is
        // never dropped in favor of an earlier, possibly stale, in-flight read.
        const previous = inFlightSyncs.get(cacheKey);
        let pending;
        if (previous) {
            pending = previous.then(sync);
        } else {
            pending = sync();
        }
        pending = pending.finally(()=>{
            if (inFlightSyncs.get(cacheKey) === pending) {
                inFlightSyncs.delete(cacheKey);
            }
        });
        inFlightSyncs.set(cacheKey, pending);
        // Register the sync on the current request's revalidation writes so it is
        // awaited rather than left untracked. Reading the work store here (rather
        // than capturing it at construction) is what lets the handler be a shared
        // singleton; `get` always runs within the request's async context, so the
        // store is present.
        const workStore = workAsyncStorage.getStore();
        if (workStore) {
            workStore.pendingRevalidateWrites ??= [];
            workStore.pendingRevalidateWrites.push(pending);
        }
    }
    return {
        async get (cacheKey, softTags) {
            const frontEntry = await front.get(cacheKey, softTags);
            if (frontEntry) {
                // Cache hit: serve immediately (in a microtask). A background reconcile
                // keeps the front in sync with the backing for the next read;
                // reconciles for the same key are serialized, so concurrent cache hits
                // don't hit the backing in parallel.
                scheduleBackgroundSync(cacheKey, ()=>reconcileFrontFromBacking(front, backing, cacheKey, softTags, frontEntry));
                return frontEntry;
            }
            // Cold or evicted front entry: we pay the backing latency here (this is a
            // read that may legitimately surface a cold cache indicator). A miss
            // returns undefined and the "use cache" wrapper generates the entry and
            // writes it through both tiers via `set`.
            const backingEntry = await backing.get(cacheKey, softTags);
            if (!backingEntry) {
                return undefined;
            }
            // Mirror this freshly read backing entry into the front so the next read
            // hits it. The mirror is serialized per key: if a sync is already
            // running, this chains after it, so the front converges to this read even
            // if the backing changed since that sync started.
            const [servedEntry, mirroredEntry] = cloneCacheEntry(backingEntry);
            scheduleBackgroundSync(cacheKey, ()=>mirrorIntoFront(front, cacheKey, mirroredEntry));
            return servedEntry;
        },
        async set (cacheKey, pendingEntry) {
            // Write through to both tiers. The entry's value stream is single-use, so
            // tee it into one entry per tier.
            const entry = await pendingEntry;
            const [frontEntry, backingEntry] = cloneCacheEntry(entry);
            await Promise.all([
                front.set(cacheKey, Promise.resolve(frontEntry)),
                backing.set(cacheKey, Promise.resolve(backingEntry))
            ]);
        }
    };
}
/**
 * After serving a cache hit from the front, consult the backing and mirror a
 * newer entry into the front for the next read. Runs in the background;
 * failures are non-fatal.
 */ async function reconcileFrontFromBacking(front, backing, cacheKey, softTags, frontEntry) {
    try {
        const backingEntry = await backing.get(cacheKey, softTags);
        if (!backingEntry) {
            // The backing no longer has this entry (it was purged out-of-band). The
            // cache-handler interface has no per-key delete, so evict the front entry
            // by overwriting it with an already-expired copy: the next read sees a
            // front miss, falls through to the (also empty) backing, and the wrapper
            // regenerates. The entry we just served was the last stale read.
            await front.set(cacheKey, Promise.resolve(toExpiredEntry(frontEntry)));
            return;
        }
        if (backingEntry.timestamp > frontEntry.timestamp) {
            await front.set(cacheKey, Promise.resolve(backingEntry));
        } else {
            // The front is already up to date, so the backing entry goes unused.
            // Release its stream without awaiting: a teed stream's `cancel()` only
            // settles once the sibling branch (retained by the backing handler) is
            // also cancelled, so awaiting it here would hang the reconcile.
            void backingEntry.value.cancel();
        }
    } catch  {
    // Background warming; failures are non-fatal.
    }
}
/**
 * Mirror a backing entry into the front.
 */ async function mirrorIntoFront(front, cacheKey, entry) {
    try {
        await front.set(cacheKey, Promise.resolve(entry));
    } catch  {
    // Background warming; failures are non-fatal.
    }
}
/**
 * Build an already-expired copy of an entry, used to evict it from the front
 * handler (which has no per-key delete) once the backing no longer has it. The
 * default handler treats a negative `expire` as an eviction sentinel and
 * reports the entry as missing on the next read. A negative `expire` is used
 * rather than `0` because the dev front handler enforces a minimum retention,
 * so a `0` `expire` would be kept alive by that minimum instead of evicted. The
 * value is never read once the entry is evicted, but it must carry at least one
 * byte because the built-in LRU cache refuses to store size-0 entries.
 */ function toExpiredEntry(entry) {
    return {
        ...entry,
        expire: -1,
        value: new ReadableStream({
            start (controller) {
                controller.enqueue(new Uint8Array(1));
                controller.close();
            }
        })
    };
} //# sourceMappingURL=tiered-cache-handler.js.map


/***/ }),

/***/ 5975:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rp: () => (/* reexport safe */ _spec_extension_response__WEBPACK_IMPORTED_MODULE_1__.R)
/* harmony export */ });
/* harmony import */ var _spec_extension_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4133);
/* harmony import */ var _spec_extension_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(337);
/* harmony import */ var _spec_extension_user_agent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69);
/* harmony import */ var _spec_extension_url_pattern__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6028);
/* harmony import */ var _after__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6832);
/* harmony import */ var _request_connection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2165);
// Alias index file of next/server for edge runtime for tree-shaking purpose








//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6018:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bs: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_3__.B),
/* harmony export */   yD: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_3__.y)
/* harmony export */ });
/* unused harmony export default */
/* harmony import */ var _lib_lru_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2401);
/* harmony import */ var _build_output_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(112);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8157);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(481);





/**
 * Parses an environment variable as a positive integer, returning the fallback
 * if the value is missing, not a number, or not positive.
 */ function parsePositiveInt(envValue, fallback) {
    if (!envValue) return fallback;
    const parsed = parseInt(envValue, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
/**
 * Default TTL (in milliseconds) for minimal mode response cache entries.
 * Used for cache hit validation as a fallback for providers that don't
 * send the x-invocation-id header yet.
 *
 * 10 seconds chosen because:
 * - Long enough to dedupe rapid successive requests (e.g., page + data)
 * - Short enough to not serve stale data across unrelated requests
 *
 * Can be configured via `NEXT_PRIVATE_RESPONSE_CACHE_TTL` environment variable.
 */ const DEFAULT_TTL_MS = parsePositiveInt(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 10000);
/**
 * Default maximum number of entries in the response cache.
 * Can be configured via `NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE` environment variable.
 */ const DEFAULT_MAX_SIZE = parsePositiveInt(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
/**
 * Separator used in compound cache keys to join pathname and invocationID.
 * Using null byte (\0) since it cannot appear in valid URL paths or UUIDs.
 */ const KEY_SEPARATOR = '\0';
/**
 * Sentinel value used for TTL-based cache entries (when invocationID is undefined).
 * Chosen to be a clearly reserved marker for internal cache keys.
 */ const TTL_SENTINEL = '__ttl_sentinel__';
/**
 * Creates a compound cache key from pathname and invocationID.
 */ function createCacheKey(pathname, invocationID) {
    return `${pathname}${KEY_SEPARATOR}${invocationID ?? TTL_SENTINEL}`;
}
/**
 * Extracts the invocationID from a compound cache key.
 * Returns undefined if the key used TTL_SENTINEL.
 */ function extractInvocationID(compoundKey) {
    const separatorIndex = compoundKey.lastIndexOf(KEY_SEPARATOR);
    if (separatorIndex === -1) return undefined;
    const invocationID = compoundKey.slice(separatorIndex + 1);
    return invocationID === TTL_SENTINEL ? undefined : invocationID;
}

class ResponseCache {
    constructor(minimal_mode, maxSize = DEFAULT_MAX_SIZE, ttl = DEFAULT_TTL_MS){
        this.getBatcher = Batcher.create({
            // Ensure on-demand revalidate doesn't block normal requests, it should be
            // safe to run an on-demand revalidate for the same key as a normal request.
            cacheKeyFn: ({ key, isOnDemandRevalidate })=>`${key}-${isOnDemandRevalidate ? '1' : '0'}`,
            // We wait to do any async work until after we've added our promise to
            // `pendingResponses` to ensure that any any other calls will reuse the
            // same promise until we've fully finished our work.
            schedulerFn: scheduleOnNextTick
        });
        this.revalidateBatcher = Batcher.create({
            // We wait to do any async work until after we've added our promise to
            // `pendingResponses` to ensure that any any other calls will reuse the
            // same promise until we've fully finished our work.
            schedulerFn: scheduleOnNextTick
        });
        /**
   * Set of invocation IDs that have had cache entries evicted.
   * Used to detect when the cache size may be too small.
   * Bounded to prevent memory growth.
   */ this.evictedInvocationIDs = new Set();
        this.minimal_mode = minimal_mode;
        this.maxSize = maxSize;
        this.ttl = ttl;
        // Create the LRU cache with eviction tracking
        this.cache = new LRUCache(maxSize, undefined, (compoundKey)=>{
            const invocationID = extractInvocationID(compoundKey);
            if (invocationID) {
                // Bound to 100 entries to prevent unbounded memory growth.
                // FIFO eviction is acceptable here because:
                // 1. Invocations are short-lived (single request lifecycle), so older
                //    invocations are unlikely to still be active after 100 newer ones
                // 2. This warning mechanism is best-effort for developer guidance—
                //    missing occasional eviction warnings doesn't affect correctness
                // 3. If a long-running invocation is somehow evicted and then has
                //    another cache entry evicted, it will simply be re-added
                if (this.evictedInvocationIDs.size >= 100) {
                    const first = this.evictedInvocationIDs.values().next().value;
                    if (first) this.evictedInvocationIDs.delete(first);
                }
                this.evictedInvocationIDs.add(invocationID);
            }
        });
    }
    /**
   * Gets the response cache entry for the given key.
   *
   * @param key - The key to get the response cache entry for.
   * @param responseGenerator - The response generator to use to generate the response cache entry.
   * @param context - The context for the get request.
   * @returns The response cache entry.
   */ async get(key, responseGenerator, context) {
        // If there is no key for the cache, we can't possibly look this up in the
        // cache so just return the result of the response generator.
        if (!key) {
            return responseGenerator({
                hasResolved: false,
                previousCacheEntry: null
            });
        }
        // Check minimal mode cache before doing any other work.
        if (this.minimal_mode) {
            const cacheKey = createCacheKey(key, context.invocationID);
            const cachedItem = this.cache.get(cacheKey);
            if (cachedItem) {
                // With invocationID: exact match found - always a hit
                // With TTL mode: must check expiration
                if (context.invocationID !== undefined) {
                    return toResponseCacheEntry(cachedItem.entry);
                }
                // TTL mode: check expiration
                const now = Date.now();
                if (cachedItem.expiresAt > now) {
                    return toResponseCacheEntry(cachedItem.entry);
                }
                // TTL expired - clean up
                this.cache.remove(cacheKey);
            }
            // Warn if this invocation had entries evicted - indicates cache may be too small.
            if (context.invocationID && this.evictedInvocationIDs.has(context.invocationID)) {
                warnOnce(`Response cache entry was evicted for invocation ${context.invocationID}. ` + `Consider increasing NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE (current: ${this.maxSize}).`);
            }
        }
        const { incrementalCache, isOnDemandRevalidate = false, isFallback = false, isRoutePPREnabled = false, isPrefetch = false, waitUntil, routeKind, invocationID } = context;
        const response = await this.getBatcher.batch({
            key,
            isOnDemandRevalidate
        }, ({ resolve })=>{
            const promise = this.handleGet(key, responseGenerator, {
                incrementalCache,
                isOnDemandRevalidate,
                isFallback,
                isRoutePPREnabled,
                isPrefetch,
                routeKind,
                invocationID
            }, resolve);
            // We need to ensure background revalidates are passed to waitUntil.
            if (waitUntil) waitUntil(promise);
            return promise;
        });
        if (this.minimal_mode && (response == null ? void 0 : response.cacheControl)) {
            const cacheKey = createCacheKey(key, invocationID);
            this.cache.set(cacheKey, {
                entry: response,
                expiresAt: Date.now() + this.ttl
            });
        }
        return toResponseCacheEntry(response);
    }
    /**
   * Handles the get request for the response cache.
   *
   * @param key - The key to get the response cache entry for.
   * @param responseGenerator - The response generator to use to generate the response cache entry.
   * @param context - The context for the get request.
   * @param resolve - The resolve function to use to resolve the response cache entry.
   * @returns The response cache entry.
   */ async handleGet(key, responseGenerator, context, resolve) {
        let previousIncrementalCacheEntry = null;
        let resolved = false;
        try {
            // Get the previous cache entry if not in minimal mode
            previousIncrementalCacheEntry = !this.minimal_mode ? await context.incrementalCache.get(key, {
                kind: routeKindToIncrementalCacheKind(context.routeKind),
                isRoutePPREnabled: context.isRoutePPREnabled,
                isFallback: context.isFallback
            }) : null;
            // `isStale === -1` signals that the entry is past its `expire` (either
            // via an expired tag or, with `cacheLife({ expire })`, past the route's
            // expire time in the prerender manifest). In that case we must NOT
            // early-resolve with the stale value — instead we fall through to a
            // blocking revalidation so the response returned to the user is fresh.
            if (previousIncrementalCacheEntry && !context.isOnDemandRevalidate && previousIncrementalCacheEntry.isStale !== -1) {
                resolve(previousIncrementalCacheEntry);
                resolved = true;
                if (!previousIncrementalCacheEntry.isStale || context.isPrefetch) {
                    // The cached value is still valid, so we don't need to update it yet.
                    return previousIncrementalCacheEntry;
                }
            }
            // Revalidate the cache entry.
            //
            // A prefetch request that missed must run its own response generator
            // rather than joining an in-flight revalidation through the batcher. A
            // background revalidation may be regenerating the concrete (non-fallback)
            // entry for this route — e.g. an ISR fallback-shell upgrade scheduled by
            // an earlier prefetch sub-request. Joining it would serve that concrete
            // result to the prefetch instead of the fallback shell, and which segment
            // wins would depend purely on request timing. Running the generator
            // directly lets every prefetch segment take the same fallback-shell path,
            // independent of any concurrent background upgrade.
            const incrementalResponseCacheEntry = context.isPrefetch && previousIncrementalCacheEntry === null ? await this.handleRevalidate(key, context.incrementalCache, context.isRoutePPREnabled, context.isFallback, responseGenerator, previousIncrementalCacheEntry, resolved) : await this.revalidate(key, context.incrementalCache, context.isRoutePPREnabled, context.isFallback, responseGenerator, previousIncrementalCacheEntry, resolved);
            // Handle null response
            if (!incrementalResponseCacheEntry) {
                // Remove the cache item if it was set so we don't use it again.
                if (this.minimal_mode) {
                    const cacheKey = createCacheKey(key, context.invocationID);
                    this.cache.remove(cacheKey);
                }
                return null;
            }
            // Resolve for on-demand revalidation or if not already resolved
            if (context.isOnDemandRevalidate && !resolved) {
                return incrementalResponseCacheEntry;
            }
            return incrementalResponseCacheEntry;
        } catch (err) {
            // If we've already resolved the cache entry, we can't reject as we
            // already resolved the cache entry so log the error here.
            if (resolved) {
                console.error(err);
                return null;
            }
            throw err;
        }
    }
    /**
   * Revalidates the cache entry for the given key.
   *
   * @param key - The key to revalidate the cache entry for.
   * @param incrementalCache - The incremental cache to use to revalidate the cache entry.
   * @param isRoutePPREnabled - Whether the route is PPR enabled.
   * @param isFallback - Whether the route is a fallback.
   * @param responseGenerator - The response generator to use to generate the response cache entry.
   * @param previousIncrementalCacheEntry - The previous cache entry to use to revalidate the cache entry.
   * @param hasResolved - Whether the response has been resolved.
   * @param waitUntil - Optional function to register background work.
   * @param invocationID - The invocation ID for cache key scoping.
   * @returns The revalidated cache entry.
   */ async revalidate(key, incrementalCache, isRoutePPREnabled, isFallback, responseGenerator, previousIncrementalCacheEntry, hasResolved, waitUntil) {
        return this.revalidateBatcher.batch(key, ()=>{
            const promise = this.handleRevalidate(key, incrementalCache, isRoutePPREnabled, isFallback, responseGenerator, previousIncrementalCacheEntry, hasResolved);
            // We need to ensure background revalidates are passed to waitUntil.
            if (waitUntil) waitUntil(promise);
            return promise;
        });
    }
    async handleRevalidate(key, incrementalCache, isRoutePPREnabled, isFallback, responseGenerator, previousIncrementalCacheEntry, hasResolved) {
        try {
            // Generate the response cache entry using the response generator.
            const responseCacheEntry = await responseGenerator({
                hasResolved,
                previousCacheEntry: previousIncrementalCacheEntry,
                isRevalidating: true
            });
            if (!responseCacheEntry) {
                return null;
            }
            // Convert the response cache entry to an incremental response cache entry.
            const incrementalResponseCacheEntry = await fromResponseCacheEntry({
                ...responseCacheEntry,
                isMiss: !previousIncrementalCacheEntry
            });
            // We want to persist the result only if it has a cache control value
            // defined. The minimal mode LRU write is handled in get() so that
            // every caller — including batched invocations — populates the cache.
            if (incrementalResponseCacheEntry.cacheControl && !this.minimal_mode) {
                await incrementalCache.set(key, incrementalResponseCacheEntry.value, {
                    cacheControl: incrementalResponseCacheEntry.cacheControl,
                    isRoutePPREnabled,
                    isFallback
                });
            }
            return incrementalResponseCacheEntry;
        } catch (err) {
            // When a path is erroring we automatically re-set the existing cache
            // with new revalidate and expire times to prevent non-stop retrying.
            if (previousIncrementalCacheEntry == null ? void 0 : previousIncrementalCacheEntry.cacheControl) {
                const revalidate = Math.min(Math.max(previousIncrementalCacheEntry.cacheControl.revalidate || 3, 3), 30);
                const expire = previousIncrementalCacheEntry.cacheControl.expire === undefined ? undefined : Math.max(revalidate + 3, previousIncrementalCacheEntry.cacheControl.expire);
                await incrementalCache.set(key, previousIncrementalCacheEntry.value, {
                    cacheControl: {
                        revalidate: revalidate,
                        expire: expire
                    },
                    isRoutePPREnabled,
                    isFallback
                });
            }
            // We haven't resolved yet, so let's throw to indicate an error.
            throw err;
        }
    }
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6028:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export URLPattern */
const GlobalURLPattern = typeof URLPattern === 'undefined' ? undefined : URLPattern;


//# sourceMappingURL=url-pattern.js.map

/***/ }),

/***/ 6208:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ck: () => (/* binding */ RequestCookiesAdapter),
/* harmony export */   EJ: () => (/* binding */ createCookiesWithMutableAccessCheck),
/* harmony export */   K8: () => (/* binding */ MutableRequestCookiesAdapter)
/* harmony export */ });
/* unused harmony exports ReadonlyRequestCookiesError, getModifiedCookieValues, appendMutableCookies, areCookiesMutableInCurrentPhase, responseCookiesToRequestCookies */
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4387);
/* harmony import */ var _reflect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3058);
/* harmony import */ var _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2736);
/* harmony import */ var _shared_lib_action_revalidation_kind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4413);





/**
 * @internal
 */ class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super('Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options');
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1180",
            enumerable: false,
            configurable: true
        });
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'clear':
                    case 'delete':
                    case 'set':
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return _reflect__WEBPACK_IMPORTED_MODULE_2__/* .ReflectAdapter */ .l.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * @param cookies
   * @returns A fresh object identity backed by the original value
   */ static fresh(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                return _reflect__WEBPACK_IMPORTED_MODULE_2__/* .ReflectAdapter */ .l.get(target, prop, receiver);
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for('next.mutated.cookies');
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new _cookies__WEBPACK_IMPORTED_MODULE_0__/* .ResponseCookies */ .VO(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting workStore
            const workStore = _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_1__/* .workAsyncStorage */ .J.getStore();
            if (workStore) {
                workStore.pathWasRevalidated = _shared_lib_action_revalidation_kind__WEBPACK_IMPORTED_MODULE_3__/* .ActionDidRevalidateStaticAndDynamic */ .Du;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _cookies__WEBPACK_IMPORTED_MODULE_0__/* .ResponseCookies */ .VO(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        const wrappedCookies = new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case 'delete':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case 'set':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.set(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return _reflect__WEBPACK_IMPORTED_MODULE_2__/* .ReflectAdapter */ .l.get(target, prop, receiver);
                }
            }
        });
        return wrappedCookies;
    }
}
function createCookiesWithMutableAccessCheck(requestStore) {
    const wrappedCookies = new Proxy(requestStore.mutableCookies, {
        get (target, prop, receiver) {
            switch(prop){
                case 'delete':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().delete');
                        target.delete(...args);
                        return wrappedCookies;
                    };
                case 'set':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().set');
                        target.set(...args);
                        return wrappedCookies;
                    };
                default:
                    return _reflect__WEBPACK_IMPORTED_MODULE_2__/* .ReflectAdapter */ .l.get(target, prop, receiver);
            }
        }
    });
    return wrappedCookies;
}
function areCookiesMutableInCurrentPhase(requestStore) {
    return requestStore.phase === 'action';
}
/** Ensure that cookies() starts throwing on mutation
 * if we changed phases and can no longer mutate.
 *
 * This can happen when going:
 *   'render' -> 'after'
 *   'action' -> 'render'
 * */ function ensureCookiesAreStillMutable(requestStore, _callingExpression) {
    if (!areCookiesMutableInCurrentPhase(requestStore)) {
        // TODO: maybe we can give a more precise error message based on callingExpression?
        throw new ReadonlyRequestCookiesError();
    }
}
function responseCookiesToRequestCookies(responseCookies) {
    const requestCookies = new RequestCookies(new Headers());
    for (const cookie of responseCookies.getAll()){
        requestCookies.set(cookie);
    }
    return requestCookies;
}

//# sourceMappingURL=request-cookies.js.map

/***/ }),

/***/ 6213:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports REDIRECT_ERROR_CODE, isRedirectError */
/* harmony import */ var _redirect_status_code__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8507);

const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
/**
 * Checks an error to determine if it's an error generated by the
 * `redirect(url)` helper.
 *
 * @param error the error that may reference a redirect error
 * @returns true if the error is a redirect error
 */ function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in RedirectStatusCode;
} //# sourceMappingURL=redirect-error.js.map


/***/ }),

/***/ 6214:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports WEB_VITALS, execOnce, isAbsoluteUrl, getLocationOrigin, getURL, getDisplayName, isResSent, normalizeRepeatedSlashes, loadGetInitialProps, SP, ST, DecodeError, NormalizeError, PageNotFoundError, MissingStaticPage, MiddlewareNotFoundError, stringifyError */
/**
 * Web vitals provided to _app.reportWebVitals by Core Web Vitals plugin developed by Google Chrome team.
 * https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 */ const WEB_VITALS = (/* unused pure expression or super */ null && ([
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
]));
/**
 * Utils
 */ function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>{
    // Fast path: an absolute URL must start with a letter (the scheme).
    // Check for a-z and A-Z without the cost of the regex.
    const c = url.charCodeAt(0);
    const isLetter = c >= 65 /* A */  && c <= 90 || c >= 97 /* a */  && c <= 122;
    /* z */ if (!isLetter) {
        return false;
    }
    return ABSOLUTE_URL_REGEX.test(url);
};
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if (false) {}
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E1025",
            enumerable: false,
            configurable: true
        });
    }
    if (false) {}
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends (/* unused pure expression or super */ null && (Error)) {
}
class NormalizeError extends (/* unused pure expression or super */ null && (Error)) {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 6271:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ HeadersAdapter)
/* harmony export */ });
/* unused harmony export ReadonlyHeadersError */
/* harmony import */ var _reflect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3058);

/**
 * @internal
 */ class ReadonlyHeadersError extends Error {
    constructor(){
        super('Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers');
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1176",
            enumerable: false,
            configurable: true
        });
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
/**
 * Builds the read methods for a sealed view that exposes all of `target`.
 */ function createPassThroughMethods(target, sealed) {
    return {
        get: target.get.bind(target),
        has: target.has.bind(target),
        getSetCookie: target.getSetCookie.bind(target),
        keys: target.keys.bind(target),
        values: target.values.bind(target),
        entries: target.entries.bind(target),
        [Symbol.iterator]: target[Symbol.iterator].bind(target),
        // The native method passes the unsealed target as the callback's `parent`
        // argument. That is a mutable handle on the underlying headers. Pass the
        // sealed view instead.
        forEach (callbackfn, thisArg) {
            for (const [name, value] of target.entries()){
                callbackfn.call(thisArg, value, name, sealed);
            }
        }
    };
}
/**
 * Builds the read methods for a sealed view that omits the header names matched
 * by `isHidden`.
 */ function createHidingMethods(target, sealed, isHidden) {
    function* entries() {
        for (const entry of target.entries()){
            if (!isHidden(entry[0])) {
                yield entry;
            }
        }
    }
    return {
        entries,
        [Symbol.iterator]: entries,
        get: (name)=>isHidden(name) ? null : target.get(name),
        has: (name)=>isHidden(name) ? false : target.has(name),
        getSetCookie: ()=>isHidden('set-cookie') ? [] : target.getSetCookie(),
        *keys () {
            for (const name of target.keys()){
                if (!isHidden(name)) {
                    yield name;
                }
            }
        },
        *values () {
            for (const [, value] of entries()){
                yield value;
            }
        },
        // The native method passes the unsealed target as the callback's `parent`
        // argument. That is a mutable handle on the underlying headers. Pass the
        // sealed view instead.
        forEach (callbackfn, thisArg) {
            for (const [name, value] of entries()){
                callbackfn.call(thisArg, value, name, sealed);
            }
        }
    };
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === 'symbol') {
                    return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   *
   * The sealed view stays live. Later writes to `headers` remain visible
   * through it.
   *
   * `hidden` omits the given header names from every read operation (`get`,
   * `has`, `getSetCookie`, `forEach`, and iteration). The names must be
   * lowercase. The underlying headers are neither copied nor mutated, so hidden
   * headers remain available to the framework.
   */ static seal(headers, hidden) {
        const isHidden = hidden && hidden.size > 0 ? (name)=>hidden.has(name.toLowerCase()) : null;
        // The methods are built once per sealed view and reused, so repeated access
        // returns the same function instead of a fresh closure. They are assigned
        // after the proxy exists because `forEach` hands the proxy to its callback.
        // Creating the proxy runs no trap, so nothing can read them before then.
        let methods;
        const sealed = new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'append':
                    case 'delete':
                    case 'set':
                        return ReadonlyHeadersError.callable;
                    case Symbol.iterator:
                        return methods[Symbol.iterator];
                    case 'get':
                    case 'has':
                    case 'getSetCookie':
                    case 'keys':
                    case 'values':
                    case 'entries':
                    case 'forEach':
                        return methods[prop];
                    default:
                        return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.get(target, prop, receiver);
                }
            }
        });
        methods = isHidden ? createHidingMethods(headers, sealed, isHidden) : createPassThroughMethods(headers, sealed);
        return sealed;
    }
    /**
   * @param headers
   * @returns A fresh object identity backed by the original value
   */ static fresh(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.get(target, prop, receiver);
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(', ');
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === 'string') {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== 'undefined') return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== 'undefined';
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
}

//# sourceMappingURL=headers.js.map

/***/ }),

/***/ 6323:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ createWorkStore)
/* harmony export */ });
/* harmony import */ var _after_after_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8356);
/* harmony import */ var _shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8947);
/* harmony import */ var _lib_lazy_result__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7059);
/* harmony import */ var _use_cache_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5403);
/* harmony import */ var _app_render_async_local_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9722);





function createWorkStore({ page, renderOpts, isPrefetchRequest, buildId, deploymentId, previouslyRevalidatedTags, nonce }) {
    /**
   * Rules of Static & Dynamic HTML:
   *
   *    1.) We must generate static HTML unless the caller explicitly opts
   *        in to dynamic HTML support.
   *
   *    2.) If dynamic HTML support is requested, we must honor that request
   *        or throw an error. It is the sole responsibility of the caller to
   *        ensure they aren't e.g. requesting dynamic HTML for a static page.
   *
   *    3.) If the request is in draft mode, we must generate dynamic HTML.
   *
   *    4.) If the request is a server action, we must generate dynamic HTML.
   *
   * These rules help ensure that other existing features like request caching,
   * coalescing, and ISR continue working as intended.
   */ const isStaticGeneration = !renderOpts.supportsDynamicResponse && !renderOpts.isDraftMode && !renderOpts.isPossibleServerAction;
    const shouldTrackFetchMetrics =  false || // The only times we want to track fetch metrics outside of development is
    // when we are performing a static generation and we either are in debug
    // mode, or tracking fetch metrics was specifically opted into.
    isStaticGeneration && (!!process.env.NEXT_DEBUG_BUILD || process.env.NEXT_SSG_FETCH_METRICS === '1');
    const store = {
        isStaticGeneration,
        page,
        route: (0,_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_3__/* .normalizeAppPath */ .Yr)(page),
        incrementalCache: // we fallback to a global incremental cache for edge-runtime locally
        // so that it can access the fs cache without mocks
        renderOpts.incrementalCache || globalThis.__incrementalCache,
        cacheLifeProfiles: renderOpts.cacheLifeProfiles,
        useCacheTimeout: renderOpts.experimental.useCacheTimeout,
        staticPageGenerationTimeout: renderOpts.staticPageGenerationTimeout,
        isBuildTimePrerendering: renderOpts.isBuildTimePrerendering,
        fetchCache: renderOpts.fetchCache,
        isOnDemandRevalidate: renderOpts.isOnDemandRevalidate,
        requestId: undefined,
        htmlRequestId: undefined,
        isDraftMode: renderOpts.isDraftMode,
        isPrefetchRequest,
        buildId,
        deploymentId,
        reactLoadableManifest: (renderOpts == null ? void 0 : renderOpts.reactLoadableManifest) || {},
        assetPrefix: (renderOpts == null ? void 0 : renderOpts.assetPrefix) || '',
        nonce,
        afterContext: createAfterContext(renderOpts),
        cacheComponentsEnabled: renderOpts.cacheComponents,
        validationLevel: renderOpts.validationLevel,
        previouslyRevalidatedTags,
        requestStartTime: performance.timeOrigin + performance.now(),
        refreshTagsByCacheKind: createRefreshTagsByCacheKind(),
        runInCleanSnapshot: (0,_app_render_async_local_storage__WEBPACK_IMPORTED_MODULE_2__/* .createSnapshot */ .$p)(),
        shouldTrackFetchMetrics,
        reactServerErrorsByDigest: new Map()
    };
    // TODO: remove this when we resolve accessing the store outside the execution context
    renderOpts.store = store;
    return store;
}
function createAfterContext(renderOpts) {
    const { waitUntil, onClose, onAfterTaskError } = renderOpts;
    return new _after_after_context__WEBPACK_IMPORTED_MODULE_0__/* .AfterContext */ .k({
        waitUntil,
        onClose,
        onTaskError: onAfterTaskError
    });
}
/**
 * Creates a map with lazy results that refresh tags for the respective cache
 * kind when they're awaited for the first time.
 */ function createRefreshTagsByCacheKind() {
    const refreshTagsByCacheKind = new Map();
    const cacheHandlers = (0,_use_cache_handlers__WEBPACK_IMPORTED_MODULE_1__/* .getCacheHandlerEntries */ .fs)();
    if (cacheHandlers) {
        for (const [kind, cacheHandler] of cacheHandlers){
            if ('refreshTags' in cacheHandler) {
                refreshTagsByCacheKind.set(kind, (0,_lib_lazy_result__WEBPACK_IMPORTED_MODULE_4__/* .createLazyResult */ .a)(async ()=>cacheHandler.refreshTags()));
            }
        }
    }
    return refreshTagsByCacheKind;
}

//# sourceMappingURL=work-store.js.map

/***/ }),

/***/ 6329:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ afterTaskAsyncStorageInstance)
/* harmony export */ });
/* harmony import */ var _async_local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9722);

const afterTaskAsyncStorageInstance = (0,_async_local_storage__WEBPACK_IMPORTED_MODULE_0__/* .createAsyncLocalStorage */ .xl)();

//# sourceMappingURL=after-task-async-storage-instance.js.map

/***/ }),

/***/ 6381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ adapter)
/* harmony export */ });
/* unused harmony export NextRequestHint */
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9802);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9535);
/* harmony import */ var _spec_extension_fetch_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9753);
/* harmony import */ var _spec_extension_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4133);
/* harmony import */ var _spec_extension_response__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(337);
/* harmony import */ var _shared_lib_router_utils_relativize_url__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(1558);
/* harmony import */ var _next_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2193);
/* harmony import */ var _internal_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7896);
/* harmony import */ var _shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(8947);
/* harmony import */ var _client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2728);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2976);
/* harmony import */ var _async_storage_request_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3645);
/* harmony import */ var _app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2381);
/* harmony import */ var _async_storage_work_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6323);
/* harmony import */ var _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2736);
/* harmony import */ var _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1520);
/* harmony import */ var _lib_trace_tracer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5342);
/* harmony import */ var _lib_trace_constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4738);
/* harmony import */ var _web_on_close__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(709);
/* harmony import */ var _get_edge_preview_props__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(5698);
/* harmony import */ var _after_builtin_request_context__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(9099);
/* harmony import */ var _lib_implicit_tags__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(478);
/* harmony import */ var _lib_is_rsc_request__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(5792);
/* harmony import */ var _request_meta__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(8368);

























// The proxy (middleware) does not support `'use cache'`, so this work store
// never reaches the code that reads `cacheLife` (and `'use cache'` is
// disallowed on the edge runtime anyway). This sentinel satisfies the
// non-optional type while throwing if `default` is ever read, matching the
// "never read" sentinels used for the proxy's other unused renderOpts fields
// (`staticPageGenerationTimeout: 0`, `useCacheTimeout: 0`). It surfaces loudly
// rather than silently serving a misleading profile.
const proxyCacheLifeProfiles = {
    get default () {
        throw Object.defineProperty(new _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_13__/* .InvariantError */ .z('Proxy does not support `use cache`, so reading its `default` cacheLife profile is unexpected.'), "__NEXT_ERROR_CODE", {
            value: "E1406",
            enumerable: false,
            configurable: true
        });
    }
};
class NextRequestHint extends _spec_extension_request__WEBPACK_IMPORTED_MODULE_3__/* .NextRequest */ .J {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw Object.defineProperty(new _error__WEBPACK_IMPORTED_MODULE_0__/* .PageSignatureError */ .CB({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    respondWith() {
        throw Object.defineProperty(new _error__WEBPACK_IMPORTED_MODULE_0__/* .PageSignatureError */ .CB({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    waitUntil() {
        throw Object.defineProperty(new _error__WEBPACK_IMPORTED_MODULE_0__/* .PageSignatureError */ .CB({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
}
const headersGetter = {
    keys: (headers)=>Array.from(headers.keys()),
    get: (headers, key)=>headers.get(key) ?? undefined
};
let propagator = (request, fn)=>{
    const tracer = (0,_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_14__/* .getTracer */ .EK)();
    return tracer.withPropagatedContext(request.headers, fn, headersGetter);
};
let testApisIntercepted = false;
function ensureTestApisIntercepted() {
    if (!testApisIntercepted) {
        testApisIntercepted = true;
        if (process.env.NEXT_PRIVATE_TEST_PROXY === 'true') {
            const { interceptTestApis, wrapRequestHandler } = __webpack_require__(3987);
            interceptTestApis();
            propagator = wrapRequestHandler(propagator);
        }
    }
}
async function adapter(params) {
    var _getBuiltinRequestContext;
    ensureTestApisIntercepted();
    await (0,_globals__WEBPACK_IMPORTED_MODULE_8__/* .ensureInstrumentationRegistered */ .p9)();
    // TODO-APP: use explicit marker for this
    const isEdgeRendering = typeof globalThis.__BUILD_MANIFEST !== 'undefined';
    params.request.url = (0,_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_19__/* .normalizeRscURL */ .P7)(params.request.url);
    const requestURL = params.bypassNextUrl ? new URL(params.request.url) : new _next_url__WEBPACK_IMPORTED_MODULE_5__/* .NextURL */ .X(params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Iterator uses an index to keep track of the current iteration. Because of deleting and appending below we can't just use the iterator.
    // Instead we use the keys before iteration.
    const keys = [
        ...requestURL.searchParams.keys()
    ];
    for (const key of keys){
        const value = requestURL.searchParams.getAll(key);
        const normalizedKey = (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .normalizeNextQueryParam */ .wN)(key);
        if (normalizedKey) {
            requestURL.searchParams.delete(normalizedKey);
            for (const val of value){
                requestURL.searchParams.append(normalizedKey, val);
            }
            requestURL.searchParams.delete(key);
        }
    }
    // Ensure users only see page requests, never data requests.
    let buildId = process.env.__NEXT_BUILD_ID || '';
    if ('buildId' in requestURL) {
        buildId = requestURL.buildId || '';
        requestURL.buildId = '';
    }
    let deploymentId = false;
    const requestHeaders = (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .fromNodeOutgoingHttpHeaders */ .p$)(params.request.headers);
    const isNextDataRequest = requestHeaders.has('x-nextjs-data');
    const isRSCRequest = (0,_lib_is_rsc_request__WEBPACK_IMPORTED_MODULE_20__/* .isRSCRequestHeader */ .f)(requestHeaders.get(_client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_7__/* .RSC_HEADER */ .hY));
    if (isNextDataRequest && requestURL.pathname === '/index') {
        requestURL.pathname = '/';
    }
    const flightHeaders = new Map();
    // Headers should only be stripped for middleware
    if (!isEdgeRendering && !undefined) {
        for (const header of _client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_7__/* .FLIGHT_HEADERS */ .KD){
            const value = requestHeaders.get(header);
            if (value !== null) {
                flightHeaders.set(header, value);
                requestHeaders.delete(header);
            }
        }
    }
    const normalizeURL =  false ? 0 : requestURL;
    const rscHash = normalizeURL.searchParams.get(_client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_7__/* .NEXT_RSC_UNION_QUERY */ ._A);
    const request = new NextRequestHint({
        page: params.page,
        // Strip internal query parameters off the request.
        input:  false ? 0 : (0,_internal_utils__WEBPACK_IMPORTED_MODULE_6__/* .stripInternalSearchParams */ .a)(normalizeURL).toString(),
        init: {
            body: params.request.body,
            headers: requestHeaders,
            method: params.request.method,
            nextConfig: params.request.nextConfig,
            signal: params.request.signal
        }
    });
    if (params.request.requestMeta) {
        (0,_request_meta__WEBPACK_IMPORTED_MODULE_18__/* .setRequestMeta */ .Zm)(request, params.request.requestMeta);
    }
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isNextDataRequest) {
        Object.defineProperty(request, '__isData', {
            enumerable: false,
            value: true
        });
    }
    if (// leverage the shared instance if not we need
    // to create a fresh cache instance each time
    !globalThis.__incrementalCacheShared && params.IncrementalCache) {
        ;
        globalThis.__incrementalCache = new params.IncrementalCache({
            CurCacheHandler: params.incrementalCacheHandler,
            minimalMode: "production" !== 'development',
            fetchCacheKeyPrefix: "",
            dev: "production" === 'development',
            requestHeaders: params.request.headers,
            getPrerenderManifest: ()=>{
                return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: (0,_get_edge_preview_props__WEBPACK_IMPORTED_MODULE_21__/* .getEdgePreviewProps */ .g)()
                };
            }
        });
    }
    // if we're in an edge runtime sandbox, we should use the waitUntil
    // that we receive from the enclosing NextServer
    const outerWaitUntil = params.request.waitUntil ?? ((_getBuiltinRequestContext = (0,_after_builtin_request_context__WEBPACK_IMPORTED_MODULE_16__/* .getBuiltinRequestContext */ .y)()) == null ? void 0 : _getBuiltinRequestContext.waitUntil);
    const event = new _spec_extension_fetch_event__WEBPACK_IMPORTED_MODULE_2__/* .NextFetchEvent */ .O({
        request,
        page: params.page,
        context: outerWaitUntil ? {
            waitUntil: outerWaitUntil
        } : undefined
    });
    let response;
    let cookiesFromResponse;
    response = await propagator(request, ()=>{
        // we only care to make async storage available for middleware
        const isMiddleware = params.page === '/middleware' || params.page === '/src/middleware' || params.page === '/proxy' || params.page === '/src/proxy';
        if (isMiddleware) {
            // if we're in an edge function, we only get a subset of `nextConfig` (no `experimental`),
            // so we have to inject it via DefinePlugin.
            // in `next start` this will be passed normally (see `NextNodeServer.runMiddleware`).
            const waitUntil = event.waitUntil.bind(event);
            const closeController = new _web_on_close__WEBPACK_IMPORTED_MODULE_22__/* .CloseController */ .VD();
            return (0,_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_14__/* .getTracer */ .EK)().trace(_lib_trace_constants__WEBPACK_IMPORTED_MODULE_15__/* .MiddlewareSpan */ .rd.execute, {
                spanName: `middleware ${request.method}`,
                attributes: {
                    'http.target': request.nextUrl.pathname,
                    'http.method': request.method
                }
            }, async ()=>{
                try {
                    var _params_request_nextConfig_experimental, _params_request_nextConfig;
                    const onUpdateCookies = (cookies)=>{
                        cookiesFromResponse = cookies;
                    };
                    const previewProps = (0,_get_edge_preview_props__WEBPACK_IMPORTED_MODULE_21__/* .getEdgePreviewProps */ .g)();
                    const page = '/' // Fake Work
                    ;
                    const fallbackRouteParams = null;
                    const implicitTags = await (0,_lib_implicit_tags__WEBPACK_IMPORTED_MODULE_17__/* .getImplicitTags */ .l)(page, request.nextUrl.pathname, fallbackRouteParams);
                    const requestStore = (0,_async_storage_request_store__WEBPACK_IMPORTED_MODULE_9__/* .createRequestStoreForAPI */ .q9)(request, request.nextUrl, implicitTags, onUpdateCookies, previewProps, // refresh hash to thread through here.
                    undefined);
                    const workStore = (0,_async_storage_work_store__WEBPACK_IMPORTED_MODULE_11__/* .createWorkStore */ .X)({
                        page,
                        renderOpts: {
                            cacheLifeProfiles: proxyCacheLifeProfiles,
                            // Proxy doesn't do static generation, so this value does not
                            // apply here. 0 is a sentinel: if something ever reads it,
                            // it'll surface loudly instead of silently using a misleading
                            // default.
                            staticPageGenerationTimeout: 0,
                            cacheComponents: false,
                            // Proxy doesn't run instant validation; the level value is
                            // irrelevant here.
                            // TODO: remove validationLevel and other global config from renderOpts
                            validationLevel: 'warning',
                            experimental: {
                                isRoutePPREnabled: false,
                                authInterrupts: !!((_params_request_nextConfig = params.request.nextConfig) == null ? void 0 : (_params_request_nextConfig_experimental = _params_request_nextConfig.experimental) == null ? void 0 : _params_request_nextConfig_experimental.authInterrupts),
                                // Proxy doesn't fill Cache Components entries, so this value
                                // is never read. 0 is a sentinel: if something ever reads it,
                                // the cache fill will time out immediately and surface the
                                // bug.
                                useCacheTimeout: 0
                            },
                            supportsDynamicResponse: true,
                            waitUntil,
                            onClose: closeController.onClose.bind(closeController),
                            onAfterTaskError: undefined
                        },
                        isPrefetchRequest: request.headers.get(_client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_7__/* .NEXT_ROUTER_PREFETCH_HEADER */ ._V) === '1',
                        buildId: buildId ?? '',
                        deploymentId: deploymentId ?? '',
                        previouslyRevalidatedTags: []
                    });
                    return await _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_12__/* .workAsyncStorage */ .J.run(workStore, ()=>_app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_10__/* .workUnitAsyncStorage */ .FP.run(requestStore, params.handler, request, event));
                } finally{
                    // middleware cannot stream, so we can consider the response closed
                    // as soon as the handler returns.
                    // we can delay running it until a bit later --
                    // if it's needed, we'll have a `waitUntil` lock anyway.
                    setTimeout(()=>{
                        closeController.dispatchClose();
                    }, 0);
                }
            });
        }
        return params.handler(request, event);
    });
    // check if response is a Response object
    if (response && !(response instanceof Response)) {
        throw Object.defineProperty(new TypeError('Expected an instance of Response to be returned'), "__NEXT_ERROR_CODE", {
            value: "E567",
            enumerable: false,
            configurable: true
        });
    }
    if (response && cookiesFromResponse) {
        response.headers.set('set-cookie', cookiesFromResponse);
    }
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get('x-middleware-rewrite');
    if (response && rewrite && (isRSCRequest || !isEdgeRendering)) {
        var _params_request_nextConfig_experimental_clientParamParsingOrigins, _params_request_nextConfig_experimental, _params_request_nextConfig;
        const destination = new _next_url__WEBPACK_IMPORTED_MODULE_5__/* .NextURL */ .X(rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if ( true && !isEdgeRendering) {
            if (destination.host === request.nextUrl.host) {
                destination.buildId = buildId || destination.buildId;
                response.headers.set('x-middleware-rewrite', String(destination));
            }
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ const { url: relativeDestination, isRelative } = (0,_shared_lib_router_utils_relativize_url__WEBPACK_IMPORTED_MODULE_23__/* .parseRelativeURL */ .N)(destination.toString(), requestURL.toString());
        if (!isEdgeRendering && isNextDataRequest && // if the rewrite is external and external rewrite
        // resolving config is enabled don't add this header
        // so the upstream app can set it instead
        !( false && 0)) {
            response.headers.set('x-nextjs-rewrite', relativeDestination);
        }
        // Check to see if this is a non-relative rewrite. If it is, we need
        // to check to see if it's an allowed origin to receive the rewritten
        // headers.
        const isAllowedOrigin = !isRelative ? (_params_request_nextConfig = params.request.nextConfig) == null ? void 0 : (_params_request_nextConfig_experimental = _params_request_nextConfig.experimental) == null ? void 0 : (_params_request_nextConfig_experimental_clientParamParsingOrigins = _params_request_nextConfig_experimental.clientParamParsingOrigins) == null ? void 0 : _params_request_nextConfig_experimental_clientParamParsingOrigins.some((origin)=>new RegExp(origin).test(destination.origin)) : false;
        // If this is an RSC request, and the pathname or search has changed, and
        // this isn't an external rewrite, we need to set the rewritten pathname and
        // query headers.
        if (isRSCRequest && (isRelative || isAllowedOrigin)) {
            if (requestURL.pathname !== destination.pathname) {
                response.headers.set(_client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_7__/* .NEXT_REWRITTEN_PATH_HEADER */ .j9, destination.pathname);
            }
            if (requestURL.search !== destination.search) {
                response.headers.set(_client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_7__/* .NEXT_REWRITTEN_QUERY_HEADER */ .Wc, destination.search.slice(1));
            }
        }
    }
    /**
   * Always forward the `_rsc` search parameter to the rewritten URL for RSC requests,
   * unless it's already present. This is necessary to ensure that RSC hash validation
   * works correctly after a rewrite. For internal rewrites, the server can validate the
   * RSC hash using the original URL, so forwarding the `_rsc` parameter is less critical.
   * However, for external rewrites (where the request is proxied to another Next.js server),
   * the external server does not have access to the original URL or its search parameters.
   * In these cases, forwarding the `_rsc` parameter is essential so that the external server
   * can perform the correct RSC hash validation.
   */ if (response && rewrite && isRSCRequest && rscHash) {
        const rewriteURL = new URL(rewrite);
        if (!rewriteURL.searchParams.has(_client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_7__/* .NEXT_RSC_UNION_QUERY */ ._A)) {
            rewriteURL.searchParams.set(_client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_7__/* .NEXT_RSC_UNION_QUERY */ ._A, rscHash);
            response.headers.set('x-middleware-rewrite', rewriteURL.toString());
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get('Location');
    if (response && redirect && !isEdgeRendering) {
        const redirectURL = new _next_url__WEBPACK_IMPORTED_MODULE_5__/* .NextURL */ .X(redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (true) {
            if (redirectURL.host === requestURL.host) {
                redirectURL.buildId = buildId || redirectURL.buildId;
                response.headers.set('Location', (0,_shared_lib_router_utils_relativize_url__WEBPACK_IMPORTED_MODULE_23__/* .getRelativeURL */ .W)(redirectURL, requestURL));
            }
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isNextDataRequest) {
            response.headers.delete('Location');
            response.headers.set('x-nextjs-redirect', (0,_shared_lib_router_utils_relativize_url__WEBPACK_IMPORTED_MODULE_23__/* .getRelativeURL */ .W)(redirectURL.toString(), requestURL.toString()));
        }
    }
    const finalResponse = response ? response : _spec_extension_response__WEBPACK_IMPORTED_MODULE_4__/* .NextResponse */ .R.next();
    // Flight headers are not overridable / removable so they are applied at the end.
    const middlewareOverrideHeaders = finalResponse.headers.get('x-middleware-override-headers');
    const overwrittenHeaders = [];
    if (middlewareOverrideHeaders) {
        for (const [key, value] of flightHeaders){
            finalResponse.headers.set(`x-middleware-request-${key}`, value);
            overwrittenHeaders.push(key);
        }
        if (overwrittenHeaders.length > 0) {
            finalResponse.headers.set('x-middleware-override-headers', middlewareOverrideHeaders + ',' + overwrittenHeaders.join(','));
        }
    }
    return {
        response: finalResponse,
        waitUntil: (0,_spec_extension_fetch_event__WEBPACK_IMPORTED_MODULE_2__/* .getWaitUntilPromiseFromEvent */ .j)(event) ?? Promise.resolve(),
        fetchMetrics: request.fetchMetrics
    };
} //# sourceMappingURL=adapter.js.map


/***/ }),

/***/ 6446:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export InvariantError */
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

/***/ 6665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ isDynamicRoute)
/* harmony export */ });
/* harmony import */ var _interception_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3914);

// Identify /.*[param].*/ in route string
const TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
// Identify /[param]/ in route string
const TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;
/**
 * Check if a route is dynamic.
 *
 * @param route - The route to check.
 * @param strict - Whether to use strict mode which prohibits segments with prefixes/suffixes (default: true).
 * @returns Whether the route is dynamic.
 */ function isDynamicRoute(route, strict = true) {
    if ((0,_interception_routes__WEBPACK_IMPORTED_MODULE_0__/* .isInterceptionRouteAppPath */ .m1)(route)) {
        route = (0,_interception_routes__WEBPACK_IMPORTED_MODULE_0__/* .extractInterceptionRouteInformation */ .$8)(route).interceptedRoute;
    }
    if (strict) {
        return TEST_STRICT_ROUTE.test(route);
    }
    return TEST_ROUTE.test(route);
} //# sourceMappingURL=is-dynamic.js.map


/***/ }),

/***/ 6704:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ getMemoryCache)
/* harmony export */ });
/* harmony import */ var _response_cache_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(481);
/* harmony import */ var _lru_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2401);


let memoryCache;
function getBufferSize(buffer) {
    return (buffer == null ? void 0 : buffer.length) || 0;
}
function getSegmentDataSize(segmentData) {
    if (!segmentData) {
        return 0;
    }
    let size = 0;
    for (const [segmentPath, buffer] of segmentData){
        size += segmentPath.length + getBufferSize(buffer);
    }
    return size;
}
function getMemoryCache(maxMemoryCacheSize) {
    if (!memoryCache) {
        memoryCache = new _lru_cache__WEBPACK_IMPORTED_MODULE_1__/* .LRUCache */ .q(maxMemoryCacheSize, function length({ value }, cacheKey) {
            let valueSize;
            if (!value) {
                valueSize = 25;
            } else if (value.kind === _response_cache_types__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .y.REDIRECT) {
                valueSize = JSON.stringify(value.props).length;
            } else if (value.kind === _response_cache_types__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .y.IMAGE) {
                throw Object.defineProperty(new Error('invariant image should not be incremental-cache'), "__NEXT_ERROR_CODE", {
                    value: "E501",
                    enumerable: false,
                    configurable: true
                });
            } else if (value.kind === _response_cache_types__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .y.FETCH) {
                valueSize = JSON.stringify(value.data || '').length;
            } else if (value.kind === _response_cache_types__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .y.APP_ROUTE) {
                valueSize = value.body.length;
            } else if (value.kind === _response_cache_types__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .y.APP_PAGE) {
                var _value_postponed;
                // rough estimate of size of cache value
                valueSize = Math.max(1, value.html.length + getBufferSize(value.rscData) + (((_value_postponed = value.postponed) == null ? void 0 : _value_postponed.length) || 0) + getSegmentDataSize(value.segmentData));
            } else {
                var _JSON_stringify;
                valueSize = value.html.length + (((_JSON_stringify = JSON.stringify(value.pageData)) == null ? void 0 : _JSON_stringify.length) || 0);
            }
            return cacheKey.length + valueSize;
        });
    }
    return memoryCache;
}

//# sourceMappingURL=memory-cache.external.js.map

/***/ }),

/***/ 6789:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export isNextRouterError */
/* harmony import */ var _http_access_fallback_http_access_fallback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6833);
/* harmony import */ var _redirect_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6213);


/**
 * Returns true if the error is a navigation signal error. These errors are
 * thrown by user code to perform navigation operations and interrupt the React
 * render.
 */ function isNextRouterError(error) {
    return isRedirectError(error) || isHTTPAccessFallbackError(error);
} //# sourceMappingURL=is-next-router-error.js.map


/***/ }),

/***/ 6832:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _after__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4814);


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6833:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports HTTPAccessErrorStatus, HTTP_ERROR_FALLBACK_ERROR_CODE, isHTTPAccessFallbackError, getAccessFallbackHTTPStatus, getAccessFallbackErrorTypeByStatus */
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
/**
 * Checks an error to determine if it's an error generated by
 * the HTTP navigation APIs `notFound()`, `forbidden()` or `unauthorized()`.
 *
 * @param error the error that may reference a HTTP access error
 * @returns true if the error is a HTTP access error
 */ function isHTTPAccessFallbackError(error) {
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
} //# sourceMappingURL=http-access-fallback.js.map


/***/ }),

/***/ 6897:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ addLocale)
/* harmony export */ });
/* harmony import */ var _add_path_prefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9517);
/* harmony import */ var _path_has_prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9866);


/**
 * For a given path and a locale, if the locale is given, it will prefix the
 * locale. The path shouldn't be an API path. If a default locale is given the
 * prefix will be omitted if the locale is already the default locale.
 */ function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if ((0,_path_has_prefix__WEBPACK_IMPORTED_MODULE_0__/* .pathHasPrefix */ .m)(lower, '/api')) return path;
        if ((0,_path_has_prefix__WEBPACK_IMPORTED_MODULE_0__/* .pathHasPrefix */ .m)(lower, `/${locale.toLowerCase()}`)) return path;
    }
    // Add the locale prefix to the path.
    return (0,_add_path_prefix__WEBPACK_IMPORTED_MODULE_1__/* .addPathPrefix */ .B)(path, `/${locale}`);
} //# sourceMappingURL=add-locale.js.map


/***/ }),

/***/ 6930:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports throwWithStaticGenerationBailoutErrorWithDynamicError, throwForSearchParamsAccessInUseCache, isRequestApiAllowedInCurrentPhase */
/* harmony import */ var _client_components_static_generation_bailout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1020);
/* harmony import */ var _app_render_action_async_storage_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(955);
/* harmony import */ var _app_render_after_task_async_storage_external__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5134);



function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
    throw Object.defineProperty(new StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: false,
        configurable: true
    });
}
function throwForSearchParamsAccessInUseCache(workStore, constructorOpt) {
    const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`searchParams\` inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await \`searchParams\` outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E842",
        enumerable: false,
        configurable: true
    });
    Error.captureStackTrace(error, constructorOpt);
    workStore.invalidDynamicUsageError ??= error;
    throw error;
}
function isRequestApiAllowedInCurrentPhase(workUnitStore) {
    switch(workUnitStore.phase){
        case 'action':
        case 'render':
            {
                // The request is still in progress. The API may be disallowed for other reasons,
                // but not because of phase.
                return true;
            }
        case 'after':
            {
                // The request has finished.
                // If we're in a Route Handler or a Server Action,
                // request APIs can be called everywhere, even in after().
                const actionStore = actionAsyncStorage.getStore();
                if (actionStore && (actionStore.isAppRoute || actionStore.isAction)) {
                    return true;
                }
                const afterTaskStore = afterTaskAsyncStorage.getStore();
                if (afterTaskStore) {
                    // We're in an `after` callback. Request APIs are callable if
                    // the `after()` call happened in an action phase:
                    // - in a Route Handler
                    // - in a Server Action's body (but not the render after)
                    //
                    // TODO(after): Is it even possible to have `phase === 'action'` but no `actionStore`?
                    // We should revisit this setup and simplify this.
                    return afterTaskStore.rootTaskSpawnPhase === 'action';
                }
                // Otherwise, we must be in a page, in the `after` phase.
                // We don't allow calling request APIs here because we'd miss
                // them during prerendering and wouldn't know that the page is dynamic.
                return false;
            }
    }
} //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 7012:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export getPathMatch */
/* harmony import */ var next_dist_compiled_path_to_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);
/* harmony import */ var next_dist_compiled_path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_compiled_path_to_regexp__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Generates a path matcher function for a given path and options based on
 * path-to-regexp. By default the match will be case insensitive, non strict
 * and delimited by `/`.
 */ function getPathMatch(path, options) {
    const keys = [];
    const regexp = pathToRegexp(path, keys, {
        delimiter: '/',
        sensitive: typeof options?.sensitive === 'boolean' ? options.sensitive : false,
        strict: options?.strict
    });
    const matcher = regexpToFunction(options?.regexModifier ? new RegExp(options.regexModifier(regexp.source), regexp.flags) : regexp, keys);
    /**
   * A matcher function that will check if a given pathname matches the path
   * given in the builder function. When the path does not match it will return
   * `false` but if it does it will return an object with the matched params
   * merged with the params provided in the second argument.
   */ return (pathname, params)=>{
        // If no pathname is provided it's not a match.
        if (typeof pathname !== 'string') return false;
        const match = matcher(pathname);
        // If the path did not match `false` will be returned.
        if (!match) return false;
        /**
     * If unnamed params are not allowed they must be removed from
     * the matched parameters. path-to-regexp uses "string" for named and
     * "number" for unnamed parameters.
     */ if (options?.removeUnnamedParams) {
            for (const key of keys){
                if (typeof key.name === 'number') {
                    delete match.params[key.name];
                }
            }
        }
        return {
            ...params,
            ...match.params
        };
    };
} //# sourceMappingURL=path-match.js.map


/***/ }),

/***/ 7059:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ createLazyResult)
/* harmony export */ });
/* unused harmony export isResolvedLazyResult */
/**
 * Calls the given function only when the returned promise-like object is
 * awaited. Afterwards, it provides the resolved value synchronously as `value`
 * property.
 */ function createLazyResult(fn) {
    let pendingResult;
    const result = {
        then (onfulfilled, onrejected) {
            if (!pendingResult) {
                pendingResult = Promise.resolve(fn());
            }
            pendingResult.then((value)=>{
                result.value = value;
            }).catch(()=>{
            // The externally awaited result will be rejected via `onrejected`. We
            // don't need to handle it here. But we do want to avoid an unhandled
            // rejection.
            });
            return pendingResult.then(onfulfilled, onrejected);
        }
    };
    return result;
}
function isResolvedLazyResult(result) {
    return result.hasOwnProperty('value');
}

//# sourceMappingURL=lazy-result.js.map

/***/ }),

/***/ 7232:
/***/ ((module) => {

var __dirname = "/";
(()=>{"use strict";var e={234:e=>{var t=Object.prototype.hasOwnProperty,n="~";function Events(){}if(Object.create){Events.prototype=Object.create(null);if(!(new Events).__proto__)n=false}function EE(e,t,n){this.fn=e;this.context=t;this.once=n||false}function addListener(e,t,r,i,s){if(typeof r!=="function"){throw new TypeError("The listener must be a function")}var o=new EE(r,i||e,s),u=n?n+t:t;if(!e._events[u])e._events[u]=o,e._eventsCount++;else if(!e._events[u].fn)e._events[u].push(o);else e._events[u]=[e._events[u],o];return e}function clearEvent(e,t){if(--e._eventsCount===0)e._events=new Events;else delete e._events[t]}function EventEmitter(){this._events=new Events;this._eventsCount=0}EventEmitter.prototype.eventNames=function eventNames(){var e=[],r,i;if(this._eventsCount===0)return e;for(i in r=this._events){if(t.call(r,i))e.push(n?i.slice(1):i)}if(Object.getOwnPropertySymbols){return e.concat(Object.getOwnPropertySymbols(r))}return e};EventEmitter.prototype.listeners=function listeners(e){var t=n?n+e:e,r=this._events[t];if(!r)return[];if(r.fn)return[r.fn];for(var i=0,s=r.length,o=new Array(s);i<s;i++){o[i]=r[i].fn}return o};EventEmitter.prototype.listenerCount=function listenerCount(e){var t=n?n+e:e,r=this._events[t];if(!r)return 0;if(r.fn)return 1;return r.length};EventEmitter.prototype.emit=function emit(e,t,r,i,s,o){var u=n?n+e:e;if(!this._events[u])return false;var a=this._events[u],l=arguments.length,c,h;if(a.fn){if(a.once)this.removeListener(e,a.fn,undefined,true);switch(l){case 1:return a.fn.call(a.context),true;case 2:return a.fn.call(a.context,t),true;case 3:return a.fn.call(a.context,t,r),true;case 4:return a.fn.call(a.context,t,r,i),true;case 5:return a.fn.call(a.context,t,r,i,s),true;case 6:return a.fn.call(a.context,t,r,i,s,o),true}for(h=1,c=new Array(l-1);h<l;h++){c[h-1]=arguments[h]}a.fn.apply(a.context,c)}else{var _=a.length,f;for(h=0;h<_;h++){if(a[h].once)this.removeListener(e,a[h].fn,undefined,true);switch(l){case 1:a[h].fn.call(a[h].context);break;case 2:a[h].fn.call(a[h].context,t);break;case 3:a[h].fn.call(a[h].context,t,r);break;case 4:a[h].fn.call(a[h].context,t,r,i);break;default:if(!c)for(f=1,c=new Array(l-1);f<l;f++){c[f-1]=arguments[f]}a[h].fn.apply(a[h].context,c)}}}return true};EventEmitter.prototype.on=function on(e,t,n){return addListener(this,e,t,n,false)};EventEmitter.prototype.once=function once(e,t,n){return addListener(this,e,t,n,true)};EventEmitter.prototype.removeListener=function removeListener(e,t,r,i){var s=n?n+e:e;if(!this._events[s])return this;if(!t){clearEvent(this,s);return this}var o=this._events[s];if(o.fn){if(o.fn===t&&(!i||o.once)&&(!r||o.context===r)){clearEvent(this,s)}}else{for(var u=0,a=[],l=o.length;u<l;u++){if(o[u].fn!==t||i&&!o[u].once||r&&o[u].context!==r){a.push(o[u])}}if(a.length)this._events[s]=a.length===1?a[0]:a;else clearEvent(this,s)}return this};EventEmitter.prototype.removeAllListeners=function removeAllListeners(e){var t;if(e){t=n?n+e:e;if(this._events[t])clearEvent(this,t)}else{this._events=new Events;this._eventsCount=0}return this};EventEmitter.prototype.off=EventEmitter.prototype.removeListener;EventEmitter.prototype.addListener=EventEmitter.prototype.on;EventEmitter.prefixed=n;EventEmitter.EventEmitter=EventEmitter;if(true){e.exports=EventEmitter}},274:e=>{e.exports=(e,t)=>{t=t||(()=>{});return e.then((e=>new Promise((e=>{e(t())})).then((()=>e))),(e=>new Promise((e=>{e(t())})).then((()=>{throw e}))))}},294:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});function lowerBound(e,t,n){let r=0;let i=e.length;while(i>0){const s=i/2|0;let o=r+s;if(n(e[o],t)<=0){r=++o;i-=s+1}else{i=s}}return r}t["default"]=lowerBound},838:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:true});const r=n(294);class PriorityQueue{constructor(){this._queue=[]}enqueue(e,t){t=Object.assign({priority:0},t);const n={priority:t.priority,run:e};if(this.size&&this._queue[this.size-1].priority>=t.priority){this._queue.push(n);return}const i=r.default(this._queue,n,((e,t)=>t.priority-e.priority));this._queue.splice(i,0,n)}dequeue(){const e=this._queue.shift();return e===null||e===void 0?void 0:e.run}filter(e){return this._queue.filter((t=>t.priority===e.priority)).map((e=>e.run))}get size(){return this._queue.length}}t["default"]=PriorityQueue},138:(e,t,n)=>{const r=n(274);class TimeoutError extends Error{constructor(e){super(e);this.name="TimeoutError"}}const pTimeout=(e,t,n)=>new Promise(((i,s)=>{if(typeof t!=="number"||t<0){throw new TypeError("Expected `milliseconds` to be a positive number")}if(t===Infinity){i(e);return}const o=setTimeout((()=>{if(typeof n==="function"){try{i(n())}catch(e){s(e)}return}const r=typeof n==="string"?n:`Promise timed out after ${t} milliseconds`;const o=n instanceof Error?n:new TimeoutError(r);if(typeof e.cancel==="function"){e.cancel()}s(o)}),t);r(e.then(i,s),(()=>{clearTimeout(o)}))}));e.exports=pTimeout;e.exports["default"]=pTimeout;e.exports.TimeoutError=TimeoutError}};var t={};function __nccwpck_require__(n){var r=t[n];if(r!==undefined){return r.exports}var i=t[n]={exports:{}};var s=true;try{e[n](i,i.exports,__nccwpck_require__);s=false}finally{if(s)delete t[n]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n={};(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:true});const t=__nccwpck_require__(234);const r=__nccwpck_require__(138);const i=__nccwpck_require__(838);const empty=()=>{};const s=new r.TimeoutError;class PQueue extends t{constructor(e){var t,n,r,s;super();this._intervalCount=0;this._intervalEnd=0;this._pendingCount=0;this._resolveEmpty=empty;this._resolveIdle=empty;e=Object.assign({carryoverConcurrencyCount:false,intervalCap:Infinity,interval:0,concurrency:Infinity,autoStart:true,queueClass:i.default},e);if(!(typeof e.intervalCap==="number"&&e.intervalCap>=1)){throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(n=(t=e.intervalCap)===null||t===void 0?void 0:t.toString())!==null&&n!==void 0?n:""}\` (${typeof e.intervalCap})`)}if(e.interval===undefined||!(Number.isFinite(e.interval)&&e.interval>=0)){throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(s=(r=e.interval)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:""}\` (${typeof e.interval})`)}this._carryoverConcurrencyCount=e.carryoverConcurrencyCount;this._isIntervalIgnored=e.intervalCap===Infinity||e.interval===0;this._intervalCap=e.intervalCap;this._interval=e.interval;this._queue=new e.queueClass;this._queueClass=e.queueClass;this.concurrency=e.concurrency;this._timeout=e.timeout;this._throwOnTimeout=e.throwOnTimeout===true;this._isPaused=e.autoStart===false}get _doesIntervalAllowAnother(){return this._isIntervalIgnored||this._intervalCount<this._intervalCap}get _doesConcurrentAllowAnother(){return this._pendingCount<this._concurrency}_next(){this._pendingCount--;this._tryToStartAnother();this.emit("next")}_resolvePromises(){this._resolveEmpty();this._resolveEmpty=empty;if(this._pendingCount===0){this._resolveIdle();this._resolveIdle=empty;this.emit("idle")}}_onResumeInterval(){this._onInterval();this._initializeIntervalIfNeeded();this._timeoutId=undefined}_isIntervalPaused(){const e=Date.now();if(this._intervalId===undefined){const t=this._intervalEnd-e;if(t<0){this._intervalCount=this._carryoverConcurrencyCount?this._pendingCount:0}else{if(this._timeoutId===undefined){this._timeoutId=setTimeout((()=>{this._onResumeInterval()}),t)}return true}}return false}_tryToStartAnother(){if(this._queue.size===0){if(this._intervalId){clearInterval(this._intervalId)}this._intervalId=undefined;this._resolvePromises();return false}if(!this._isPaused){const e=!this._isIntervalPaused();if(this._doesIntervalAllowAnother&&this._doesConcurrentAllowAnother){const t=this._queue.dequeue();if(!t){return false}this.emit("active");t();if(e){this._initializeIntervalIfNeeded()}return true}}return false}_initializeIntervalIfNeeded(){if(this._isIntervalIgnored||this._intervalId!==undefined){return}this._intervalId=setInterval((()=>{this._onInterval()}),this._interval);this._intervalEnd=Date.now()+this._interval}_onInterval(){if(this._intervalCount===0&&this._pendingCount===0&&this._intervalId){clearInterval(this._intervalId);this._intervalId=undefined}this._intervalCount=this._carryoverConcurrencyCount?this._pendingCount:0;this._processQueue()}_processQueue(){while(this._tryToStartAnother()){}}get concurrency(){return this._concurrency}set concurrency(e){if(!(typeof e==="number"&&e>=1)){throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`)}this._concurrency=e;this._processQueue()}async add(e,t={}){return new Promise(((n,i)=>{const run=async()=>{this._pendingCount++;this._intervalCount++;try{const o=this._timeout===undefined&&t.timeout===undefined?e():r.default(Promise.resolve(e()),t.timeout===undefined?this._timeout:t.timeout,(()=>{if(t.throwOnTimeout===undefined?this._throwOnTimeout:t.throwOnTimeout){i(s)}return undefined}));n(await o)}catch(e){i(e)}this._next()};this._queue.enqueue(run,t);this._tryToStartAnother();this.emit("add")}))}async addAll(e,t){return Promise.all(e.map((async e=>this.add(e,t))))}start(){if(!this._isPaused){return this}this._isPaused=false;this._processQueue();return this}pause(){this._isPaused=true}clear(){this._queue=new this._queueClass}async onEmpty(){if(this._queue.size===0){return}return new Promise((e=>{const t=this._resolveEmpty;this._resolveEmpty=()=>{t();e()}}))}async onIdle(){if(this._pendingCount===0&&this._queue.size===0){return}return new Promise((e=>{const t=this._resolveIdle;this._resolveIdle=()=>{t();e()}}))}get size(){return this._queue.size}sizeBy(e){return this._queue.filter(e).length}get pending(){return this._pendingCount}get isPaused(){return this._isPaused}get timeout(){return this._timeout}set timeout(e){this._timeout=e}}e["default"]=PQueue})();module.exports=n})();

/***/ }),

/***/ 7411:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ SharedCacheControls)
/* harmony export */ });
/**
 * A shared cache of cache controls for routes. This cache is used so we don't
 * have to modify the prerender manifest when we want to update the cache
 * control for a route.
 */ class SharedCacheControls {
    static #_ = /**
   * The in-memory cache of cache lives for routes. This cache is populated when
   * the cache is updated with new cache lives.
   */ this.cacheControls = new Map();
    constructor(/**
     * The prerender manifest that contains the initial cache controls for
     * routes.
     */ prerenderManifest){
        this.prerenderManifest = prerenderManifest;
    }
    /**
   * Try to get the cache control value for a route. This will first try to get
   * the value from the in-memory cache. If the value is not present in the
   * in-memory cache, it will be sourced from the prerender manifest.
   *
   * @param route the route to get the cache control for
   * @returns the cache control for the route, or undefined if the values
   *          are not present in the in-memory cache or the prerender manifest
   */ get(route) {
        // This is a copy on write cache that is updated when the cache is updated.
        // If the cache is never written to, then the values will be sourced from
        // the prerender manifest.
        let cacheControl = SharedCacheControls.cacheControls.get(route);
        if (cacheControl) return cacheControl;
        let prerenderData = this.prerenderManifest.routes[route];
        if (prerenderData) {
            const { initialRevalidateSeconds, initialExpireSeconds } = prerenderData;
            if (typeof initialRevalidateSeconds !== 'undefined') {
                return {
                    revalidate: initialRevalidateSeconds,
                    expire: initialExpireSeconds
                };
            }
        }
        const dynamicPrerenderData = this.prerenderManifest.dynamicRoutes[route];
        if (dynamicPrerenderData) {
            const { fallbackRevalidate, fallbackExpire } = dynamicPrerenderData;
            if (typeof fallbackRevalidate !== 'undefined') {
                return {
                    revalidate: fallbackRevalidate,
                    expire: fallbackExpire
                };
            }
        }
        return undefined;
    }
    /**
   * Set the cache control for a route.
   *
   * @param route the route to set the cache control for
   * @param cacheControl the cache control for the route
   */ set(route, cacheControl) {
        SharedCacheControls.cacheControls.set(route, cacheControl);
    }
    /**
   * Clear the in-memory cache of cache controls for routes.
   */ clear() {
        SharedCacheControls.cacheControls.clear();
    }
}

//# sourceMappingURL=shared-cache-controls.external.js.map

/***/ }),

/***/ 7417:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react.react-server.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactSharedInternals = { H: null, A: null };
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
var isArrayImpl = Array.isArray;
function noop() {}
var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
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
var hasOwnProperty = Object.prototype.hasOwnProperty,
  assign = Object.assign;
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
      formatProdErrorMessage(
        31,
        "[object Object]" === array
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : array
      )
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
function createCacheRoot() {
  return new WeakMap();
}
function createCacheNode() {
  return { s: 0, v: void 0, o: null, p: null };
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
    if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
    return children;
  }
};
__webpack_unused_export__ = REACT_ACTIVITY_TYPE;
__webpack_unused_export__ = Children;
__webpack_unused_export__ = REACT_FRAGMENT_TYPE;
__webpack_unused_export__ = REACT_PROFILER_TYPE;
__webpack_unused_export__ = REACT_STRICT_MODE_TYPE;
__webpack_unused_export__ = REACT_SUSPENSE_TYPE;
__webpack_unused_export__ = REACT_VIEW_TRANSITION_TYPE;
__webpack_unused_export__ =
  ReactSharedInternals;
__webpack_unused_export__ = function (fn) {
  return function () {
    var dispatcher = ReactSharedInternals.A;
    if (!dispatcher) return fn.apply(null, arguments);
    var fnMap = dispatcher.getCacheForType(createCacheRoot);
    dispatcher = fnMap.get(fn);
    void 0 === dispatcher &&
      ((dispatcher = createCacheNode()), fnMap.set(fn, dispatcher));
    fnMap = 0;
    for (var l = arguments.length; fnMap < l; fnMap++) {
      var arg = arguments[fnMap];
      if (
        "function" === typeof arg ||
        ("object" === typeof arg && null !== arg)
      ) {
        var objectCache = dispatcher.o;
        null === objectCache && (dispatcher.o = objectCache = new WeakMap());
        dispatcher = objectCache.get(arg);
        void 0 === dispatcher &&
          ((dispatcher = createCacheNode()), objectCache.set(arg, dispatcher));
      } else
        (objectCache = dispatcher.p),
          null === objectCache && (dispatcher.p = objectCache = new Map()),
          (dispatcher = objectCache.get(arg)),
          void 0 === dispatcher &&
            ((dispatcher = createCacheNode()),
            objectCache.set(arg, dispatcher));
    }
    if (1 === dispatcher.s) return dispatcher.v;
    if (2 === dispatcher.s) throw dispatcher.v;
    try {
      var result = fn.apply(null, arguments);
      fnMap = dispatcher;
      fnMap.s = 1;
      return (fnMap.v = result);
    } catch (error) {
      throw ((result = dispatcher), (result.s = 2), (result.v = error), error);
    }
  };
};
__webpack_unused_export__ = function () {
  var dispatcher = ReactSharedInternals.A;
  return dispatcher ? dispatcher.cacheSignal() : null;
};
__webpack_unused_export__ = function () {
  return null;
};
__webpack_unused_export__ = function (element, config, children) {
  if (null === element || void 0 === element)
    throw Error(formatProdErrorMessage(267, element));
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
__webpack_unused_export__ = function (type, config, children) {
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
__webpack_unused_export__ = function () {
  return { current: null };
};
__webpack_unused_export__ = function (render) {
  return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };
};
__webpack_unused_export__ = isValidElement;
__webpack_unused_export__ = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: { _status: -1, _result: ctor },
    _init: lazyInitializer
  };
};
__webpack_unused_export__ = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
__webpack_unused_export__ = function (usable) {
  return ReactSharedInternals.H.use(usable);
};
__webpack_unused_export__ = function (callback, deps) {
  return ReactSharedInternals.H.useCallback(callback, deps);
};
__webpack_unused_export__ = function () {};
__webpack_unused_export__ = function () {
  return ReactSharedInternals.H.useId();
};
__webpack_unused_export__ = function (create, deps) {
  return ReactSharedInternals.H.useMemo(create, deps);
};
__webpack_unused_export__ = "19.3.0-canary-cbb046ab-20260731";


/***/ }),

/***/ 7649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export createDefaultCacheHandler */
/* harmony import */ var _lru_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2401);
/* harmony import */ var _incremental_cache_tags_manifest_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4713);
/* harmony import */ var _use_cache_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8381);
/* provided dependency */ var Buffer = __webpack_require__(5356)["Buffer"];
/**
 * This is the default "use cache" handler it defaults to an in-memory store.
 * In-memory caches are fragile and should not use stale-while-revalidate
 * semantics on the caches because it's not worth warming up an entry that's
 * likely going to get evicted before we get to use it anyway. However, we also
 * don't want to reuse a stale entry for too long so stale entries should be
 * considered expired/missing in such cache handlers.
 *
 * The dev server (`next dev`) is the exception: to keep reloads fast it serves
 * stale entries until they expire, relying on the wrapper's
 * stale-while-revalidate path to warm a fresh entry in the background. See
 * `get` for where this branches.
 */ 


function createDefaultCacheHandler(maxSize) {
    // If the max size is 0, return a cache handler that doesn't cache anything,
    // this avoids an unnecessary LRUCache instance and potential memory
    // allocation.
    if (maxSize === 0) {
        return {
            get: ()=>Promise.resolve(undefined),
            set: ()=>Promise.resolve(),
            refreshTags: ()=>Promise.resolve(),
            getExpiration: ()=>Promise.resolve(0),
            updateTags: ()=>Promise.resolve()
        };
    }
    const memoryCache = new LRUCache(maxSize, (entry, cacheKey)=>entry.size + cacheKey.length);
    const pendingSets = new Map();
    const debug = process.env.NEXT_PRIVATE_DEBUG_CACHE ? console.debug.bind(console, 'DefaultCacheHandler:') : undefined;
    return {
        async get (cacheKey) {
            const pendingPromise = pendingSets.get(cacheKey);
            if (pendingPromise) {
                debug == null ? void 0 : debug('get', cacheKey, 'pending');
                await pendingPromise;
            }
            const privateEntry = memoryCache.get(cacheKey);
            if (!privateEntry) {
                debug == null ? void 0 : debug('get', cacheKey, 'not found');
                return undefined;
            }
            const entry = privateEntry.entry;
            // A negative `expire` is an eviction sentinel: the tiered cache handler
            // (dev-only) marks a front entry for deletion by overwriting it with a
            // negative `expire`, since the cache-handler interface has no per-key
            // delete. Treat it as missing here, independently of the minimum
            // retention below (which would otherwise keep it alive). This is distinct
            // from `revalidate = -1` below, which keeps serving the entry but forces
            // a revalidation.
            if (entry.expire < 0) {
                debug == null ? void 0 : debug('get', cacheKey, 'evicted');
                return undefined;
            }
            // The dev server serves stale entries until they expire (see the file
            // overview); production drops them once past the revalidate time. In dev,
            // an entry is retained for at least `MIN_PRERENDERABLE_EXPIRE` so that
            // entries with a short `expire` (for example a `cacheLife({ expire: 0 })`
            // client-only cache) still linger long enough that a reload hits the
            // cache. That minimum is the same threshold below which the "use cache"
            // wrapper treats an entry as dynamic, so it only extends the retention of
            // entries that are dynamic anyway. It affects retention only; the
            // returned entry keeps its real `expire`, so staging decisions are
            // unchanged.
            const maxAgeSeconds =  false ? 0 : entry.revalidate;
            if (performance.timeOrigin + performance.now() > entry.timestamp + maxAgeSeconds * 1000) {
                debug == null ? void 0 : debug('get', cacheKey, 'expired');
                return undefined;
            }
            let revalidate = entry.revalidate;
            if (areTagsExpired(entry.tags, entry.timestamp)) {
                debug == null ? void 0 : debug('get', cacheKey, 'had expired tag');
                return undefined;
            }
            if (areTagsStale(entry.tags, entry.timestamp)) {
                debug == null ? void 0 : debug('get', cacheKey, 'had stale tag');
                revalidate = -1;
            }
            const [returnStream, newSaved] = entry.value.tee();
            entry.value = newSaved;
            debug == null ? void 0 : debug('get', cacheKey, 'found', {
                tags: entry.tags,
                timestamp: entry.timestamp,
                expire: entry.expire,
                revalidate
            });
            return {
                ...entry,
                revalidate,
                value: returnStream
            };
        },
        async set (cacheKey, pendingEntry) {
            debug == null ? void 0 : debug('set', cacheKey, 'start');
            let resolvePending = ()=>{};
            const pendingPromise = new Promise((resolve)=>{
                resolvePending = resolve;
            });
            pendingSets.set(cacheKey, pendingPromise);
            const entry = await pendingEntry;
            let size = 0;
            try {
                // In production an `expire: 0` entry is dynamic: the "use cache"
                // wrapper regenerates it on every read instead of serving the stored
                // copy, so persisting it would be a wasted write of a value that is
                // never served back. Skip storing it so the next read is a plain miss.
                // The dev server keeps it, because its minimum retention serves the
                // previously cached value across reloads. The `finally` below still
                // resolves the pending set.
                if ( true && entry.expire === 0) {
                    debug == null ? void 0 : debug('set', cacheKey, 'skipped dynamic entry');
                    return;
                }
                const [value, clonedValue] = entry.value.tee();
                entry.value = value;
                const reader = clonedValue.getReader();
                for(let chunk; !(chunk = await reader.read()).done;){
                    size += Buffer.from(chunk.value).byteLength;
                }
                memoryCache.set(cacheKey, {
                    entry,
                    isErrored: false,
                    errorRetryCount: 0,
                    size
                });
                debug == null ? void 0 : debug('set', cacheKey, 'done');
            } catch (err) {
                // TODO: store partial buffer with error after we retry 3 times
                debug == null ? void 0 : debug('set', cacheKey, 'failed', err);
            } finally{
                resolvePending();
                pendingSets.delete(cacheKey);
            }
        },
        async refreshTags () {
        // Nothing to do for an in-memory cache handler.
        },
        async getExpiration (tags) {
            const expirations = tags.map((tag)=>{
                const entry = tagsManifest.get(tag);
                if (!entry) return 0;
                // Return the most recent timestamp (either expired or stale)
                return entry.expired || 0;
            });
            const expiration = Math.max(...expirations, 0);
            debug == null ? void 0 : debug('getExpiration', {
                tags,
                expiration
            });
            return expiration;
        },
        async updateTags (tags, durations) {
            const now = Math.round(performance.timeOrigin + performance.now());
            debug == null ? void 0 : debug('updateTags', {
                tags,
                timestamp: now
            });
            for (const tag of tags){
                // TODO: update file-system-cache?
                const existingEntry = tagsManifest.get(tag) || {};
                if (durations) {
                    // Use provided durations directly
                    const updates = {
                        ...existingEntry
                    };
                    // mark as stale immediately
                    updates.stale = now;
                    if (durations.expire !== undefined) {
                        updates.expired = now + durations.expire * 1000 // Convert seconds to ms
                        ;
                    }
                    tagsManifest.set(tag, updates);
                } else {
                    // Update expired field for immediate expiration (default behavior when no durations provided)
                    tagsManifest.set(tag, {
                        ...existingEntry,
                        expired: now
                    });
                }
            }
        }
    };
} //# sourceMappingURL=default.js.map


/***/ }),

/***/ 7852:
/***/ ((module) => {

var __dirname = "/";
(()=>{"use strict";if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var e={};(()=>{var r=e;
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */r.parse=parse;r.serialize=serialize;var i=decodeURIComponent;var t=encodeURIComponent;var a=/; */;var n=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function parse(e,r){if(typeof e!=="string"){throw new TypeError("argument str must be a string")}var t={};var n=r||{};var o=e.split(a);var s=n.decode||i;for(var p=0;p<o.length;p++){var f=o[p];var u=f.indexOf("=");if(u<0){continue}var v=f.substr(0,u).trim();var c=f.substr(++u,f.length).trim();if('"'==c[0]){c=c.slice(1,-1)}if(undefined==t[v]){t[v]=tryDecode(c,s)}}return t}function serialize(e,r,i){var a=i||{};var o=a.encode||t;if(typeof o!=="function"){throw new TypeError("option encode is invalid")}if(!n.test(e)){throw new TypeError("argument name is invalid")}var s=o(r);if(s&&!n.test(s)){throw new TypeError("argument val is invalid")}var p=e+"="+s;if(null!=a.maxAge){var f=a.maxAge-0;if(isNaN(f)||!isFinite(f)){throw new TypeError("option maxAge is invalid")}p+="; Max-Age="+Math.floor(f)}if(a.domain){if(!n.test(a.domain)){throw new TypeError("option domain is invalid")}p+="; Domain="+a.domain}if(a.path){if(!n.test(a.path)){throw new TypeError("option path is invalid")}p+="; Path="+a.path}if(a.expires){if(typeof a.expires.toUTCString!=="function"){throw new TypeError("option expires is invalid")}p+="; Expires="+a.expires.toUTCString()}if(a.httpOnly){p+="; HttpOnly"}if(a.secure){p+="; Secure"}if(a.sameSite){var u=typeof a.sameSite==="string"?a.sameSite.toLowerCase():a.sameSite;switch(u){case true:p+="; SameSite=Strict";break;case"lax":p+="; SameSite=Lax";break;case"strict":p+="; SameSite=Strict";break;case"none":p+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return p}function tryDecode(e,r){try{return r(e)}catch(r){return e}}})();module.exports=e})();

/***/ }),

/***/ 7896:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ stripInternalSearchParams)
/* harmony export */ });
/* unused harmony export stripInternalQueries */
/* harmony import */ var _client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2728);

const INTERNAL_QUERY_NAMES = [
    _client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_RSC_UNION_QUERY */ ._A
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(url) {
    const isStringUrl = typeof url === 'string';
    const instance = isStringUrl ? new URL(url) : url;
    instance.searchParams.delete(_client_components_app_router_headers__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_RSC_UNION_QUERY */ ._A);
    return isStringUrl ? instance.toString() : instance;
}

//# sourceMappingURL=internal-utils.js.map

/***/ }),

/***/ 8017:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports computeCacheBustingSearchParam, computeLegacyCacheBustingSearchParam */

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
    return hexHash(input);
} //# sourceMappingURL=cache-busting-search-param.js.map


/***/ }),

/***/ 8053:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ getClientComponentLoaderMetrics)
/* harmony export */ });
/* unused harmony export wrapClientComponentLoader */
// Combined load times for loading client components
let clientComponentLoadStart = 0;
let clientComponentLoadTimes = 0;
let clientComponentLoadCount = 0;
function wrapClientComponentLoader(ComponentMod, isTracingEnabled) {
    if (!('performance' in globalThis) || !process.env.NEXT_OTEL_PERFORMANCE_PREFIX && !isTracingEnabled) {
        return ComponentMod.__next_app__;
    }
    return {
        require: (...args)=>{
            const startTime = performance.now();
            if (clientComponentLoadStart === 0) {
                clientComponentLoadStart = startTime;
            }
            try {
                clientComponentLoadCount += 1;
                return ComponentMod.__next_app__.require(...args);
            } finally{
                clientComponentLoadTimes += performance.now() - startTime;
            }
        },
        loadChunk: (...args)=>{
            const startTime = performance.now();
            const result = ComponentMod.__next_app__.loadChunk(...args);
            // Avoid wrapping `loadChunk`'s result in an extra promise in case something like React depends on its identity.
            // We only need to know when it's settled.
            result.finally(()=>{
                clientComponentLoadTimes += performance.now() - startTime;
            });
            return result;
        }
    };
}
function getClientComponentLoaderMetrics(options = {}) {
    const metrics = clientComponentLoadStart === 0 ? undefined : {
        clientComponentLoadStart,
        clientComponentLoadTimes,
        clientComponentLoadCount
    };
    if (options.reset) {
        clientComponentLoadStart = 0;
        clientComponentLoadTimes = 0;
        clientComponentLoadCount = 0;
    }
    return metrics;
}

//# sourceMappingURL=client-component-renderer-logger.js.map

/***/ }),

/***/ 8114:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FileSystemCache)
/* harmony export */ });
/* harmony import */ var _response_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6018);
/* harmony import */ var _shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(654);
/* harmony import */ var _shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1276);
/* harmony import */ var _tags_manifest_external__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4713);
/* harmony import */ var _lib_multi_file_writer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9125);
/* harmony import */ var _memory_cache_external__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6704);






class FileSystemCache {
    static #_ = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
    constructor(ctx){
        this.fs = ctx.fs;
        this.flushToDisk = ctx.flushToDisk;
        this.serverDistDir = ctx.serverDistDir;
        this.revalidatedTags = ctx.revalidatedTags;
        if (ctx.maxMemoryCacheSize) {
            if (!FileSystemCache.memoryCache) {
                if (FileSystemCache.debug) {
                    console.log('FileSystemCache: using memory store for fetch cache');
                }
                FileSystemCache.memoryCache = (0,_memory_cache_external__WEBPACK_IMPORTED_MODULE_5__/* .getMemoryCache */ .E)(ctx.maxMemoryCacheSize);
            } else if (FileSystemCache.debug) {
                console.log('FileSystemCache: memory store already initialized');
            }
        } else if (FileSystemCache.debug) {
            console.log('FileSystemCache: not using memory store for fetch cache');
        }
    }
    resetRequestCache() {}
    async revalidateTag(tags, durations) {
        tags = typeof tags === 'string' ? [
            tags
        ] : tags;
        if (FileSystemCache.debug) {
            console.log('FileSystemCache: revalidateTag', tags, durations);
        }
        if (tags.length === 0) {
            return;
        }
        const now = Date.now();
        for (const tag of tags){
            const existingEntry = _tags_manifest_external__WEBPACK_IMPORTED_MODULE_3__/* .tagsManifest */ .nZ.get(tag) || {};
            if (durations) {
                // Use provided durations directly
                const updates = {
                    ...existingEntry
                };
                // mark as stale immediately
                updates.stale = now;
                if (durations.expire !== undefined) {
                    updates.expired = now + durations.expire * 1000 // Convert seconds to ms
                    ;
                }
                _tags_manifest_external__WEBPACK_IMPORTED_MODULE_3__/* .tagsManifest */ .nZ.set(tag, updates);
            } else {
                // Update expired field for immediate expiration (default behavior when no durations provided)
                _tags_manifest_external__WEBPACK_IMPORTED_MODULE_3__/* .tagsManifest */ .nZ.set(tag, {
                    ...existingEntry,
                    expired: now
                });
            }
        }
    }
    async get(...args) {
        var _FileSystemCache_memoryCache, _data_value, _data_value1, _data_value2, _data_value3;
        const [key, ctx] = args;
        const { kind } = ctx;
        let data = (_FileSystemCache_memoryCache = FileSystemCache.memoryCache) == null ? void 0 : _FileSystemCache_memoryCache.get(key);
        if (FileSystemCache.debug) {
            if (kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.FETCH) {
                console.log('FileSystemCache: get', key, ctx.tags, kind, !!data);
            } else {
                console.log('FileSystemCache: get', key, kind, !!data);
            }
        }
        // let's check the disk for seed data
        if (!data && "edge" !== 'edge') { var _FileSystemCache_memoryCache1, _data_value5, _data_value4; }
        if ((data == null ? void 0 : (_data_value = data.value) == null ? void 0 : _data_value.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.APP_PAGE || (data == null ? void 0 : (_data_value1 = data.value) == null ? void 0 : _data_value1.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.APP_ROUTE || (data == null ? void 0 : (_data_value2 = data.value) == null ? void 0 : _data_value2.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.PAGES) {
            var _data_value_headers;
            const tagsHeader = (_data_value_headers = data.value.headers) == null ? void 0 : _data_value_headers[_lib_constants__WEBPACK_IMPORTED_MODULE_2__/* .NEXT_CACHE_TAGS_HEADER */ .VC];
            if (typeof tagsHeader === 'string') {
                const cacheTags = tagsHeader.split(',');
                // we trigger a blocking validation if an ISR page
                // had a tag revalidated, if we want to be a background
                // revalidation instead we return data.lastModified = -1
                if (cacheTags.length > 0 && (0,_tags_manifest_external__WEBPACK_IMPORTED_MODULE_3__/* .areTagsExpired */ .Nw)(cacheTags, data.lastModified)) {
                    if (FileSystemCache.debug) {
                        console.log('FileSystemCache: expired tags', cacheTags);
                    }
                    return null;
                }
            }
        } else if ((data == null ? void 0 : (_data_value3 = data.value) == null ? void 0 : _data_value3.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.FETCH) {
            const combinedTags = ctx.kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.FETCH ? [
                ...ctx.tags || [],
                ...ctx.softTags || []
            ] : [];
            // When revalidate tag is called we don't return stale data so it's
            // updated right away.
            if (combinedTags.some((tag)=>this.revalidatedTags.includes(tag))) {
                if (FileSystemCache.debug) {
                    console.log('FileSystemCache: was revalidated', combinedTags);
                }
                return null;
            }
            if ((0,_tags_manifest_external__WEBPACK_IMPORTED_MODULE_3__/* .areTagsExpired */ .Nw)(combinedTags, data.lastModified)) {
                if (FileSystemCache.debug) {
                    console.log('FileSystemCache: expired tags', combinedTags);
                }
                return null;
            }
        }
        return data ?? null;
    }
    async set(key, data, ctx) {
        var _FileSystemCache_memoryCache;
        (_FileSystemCache_memoryCache = FileSystemCache.memoryCache) == null ? void 0 : _FileSystemCache_memoryCache.set(key, {
            value: data,
            lastModified: Date.now()
        });
        if (FileSystemCache.debug) {
            console.log('FileSystemCache: set', key);
        }
        if (!this.flushToDisk || !data) return;
        // Create a new writer that will prepare to write all the files to disk
        // after their containing directory is created.
        const writer = new _lib_multi_file_writer__WEBPACK_IMPORTED_MODULE_4__/* .MultiFileWriter */ .J(this.fs);
        if (data.kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.APP_ROUTE) {
            const filePath = this.getFilePath(`${key}.body`, _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.APP_ROUTE);
            writer.append(filePath, data.body);
            const meta = {
                headers: data.headers,
                status: data.status,
                postponed: undefined,
                segmentPaths: undefined,
                prefetchHints: undefined
            };
            writer.append(filePath.replace(/\.body$/, _lib_constants__WEBPACK_IMPORTED_MODULE_2__/* .NEXT_META_SUFFIX */ .EP), JSON.stringify(meta, null, 2));
        } else if (data.kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.PAGES || data.kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.APP_PAGE) {
            const isAppPath = data.kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.APP_PAGE;
            const htmlPath = this.getFilePath(`${key}.html`, isAppPath ? _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.APP_PAGE : _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.PAGES);
            writer.append(htmlPath, data.html);
            // Fallbacks don't generate a data file.
            if (!ctx.fetchCache && !ctx.isFallback && !ctx.isRoutePPREnabled) {
                writer.append(this.getFilePath(`${key}${isAppPath ? _lib_constants__WEBPACK_IMPORTED_MODULE_2__/* .RSC_SUFFIX */ .RM : _lib_constants__WEBPACK_IMPORTED_MODULE_2__/* .NEXT_DATA_SUFFIX */ .x3}`, isAppPath ? _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.APP_PAGE : _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.PAGES), isAppPath ? data.rscData : JSON.stringify(data.pageData));
            }
            if ((data == null ? void 0 : data.kind) === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.APP_PAGE) {
                let segmentPaths;
                if (data.segmentData) {
                    segmentPaths = [];
                    const segmentsDir = htmlPath.replace(/\.html$/, _lib_constants__WEBPACK_IMPORTED_MODULE_2__/* .RSC_SEGMENTS_DIR_SUFFIX */ .mH);
                    for (const [segmentPath, buffer] of data.segmentData){
                        segmentPaths.push(segmentPath);
                        const segmentDataFilePath = segmentsDir + segmentPath + _lib_constants__WEBPACK_IMPORTED_MODULE_2__/* .RSC_SEGMENT_SUFFIX */ .tz;
                        writer.append(segmentDataFilePath, buffer);
                    }
                }
                const meta = {
                    headers: data.headers,
                    status: data.status,
                    postponed: data.postponed,
                    segmentPaths,
                    prefetchHints: undefined
                };
                writer.append(htmlPath.replace(/\.html$/, _lib_constants__WEBPACK_IMPORTED_MODULE_2__/* .NEXT_META_SUFFIX */ .EP), JSON.stringify(meta));
            }
        } else if (data.kind === _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .CachedRouteKind */ .yD.FETCH) {
            const filePath = this.getFilePath(key, _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.FETCH);
            writer.append(filePath, JSON.stringify({
                ...data,
                tags: ctx.fetchCache ? ctx.tags : []
            }));
        }
        // Wait for all FS operations to complete.
        await writer.wait();
    }
    getFilePath(key, kind) {
        let rootDir;
        switch(kind){
            case _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.FETCH:
                // we store in .next/cache/fetch-cache so it can be persisted
                // across deploys
                rootDir = _shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_1___default().join(this.serverDistDir, '..', 'cache', 'fetch-cache');
                break;
            case _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.PAGES:
                rootDir = _shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_1___default().join(this.serverDistDir, 'pages');
                break;
            case _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.IMAGE:
            case _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.APP_PAGE:
            case _response_cache__WEBPACK_IMPORTED_MODULE_0__/* .IncrementalCacheKind */ .Bs.APP_ROUTE:
                rootDir = _shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_1___default().join(this.serverDistDir, 'app');
                break;
            default:
                throw Object.defineProperty(new Error(`Unexpected file path kind: ${kind}`), "__NEXT_ERROR_CODE", {
                    value: "E479",
                    enumerable: false,
                    configurable: true
                });
        }
        const filePath = _shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_1___default().join(rootDir, key);
        if (!(filePath.startsWith(rootDir + (_shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_1___default().sep)) || filePath === rootDir)) {
            throw Object.defineProperty(new Error(`Invalid file path: ${filePath}`), "__NEXT_ERROR_CODE", {
                value: "E1468",
                enumerable: false,
                configurable: true
            });
        }
        return filePath;
    }
}

//# sourceMappingURL=file-system-cache.js.map

/***/ }),

/***/ 8157:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports fromResponseCacheEntry, toResponseCacheEntry, routeKindToIncrementalCacheKind */
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(481);
/* harmony import */ var _render_result__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8173);
/* harmony import */ var _route_kind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(953);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1276);




async function fromResponseCacheEntry(cacheEntry) {
    var _cacheEntry_value, _cacheEntry_value1;
    return {
        ...cacheEntry,
        value: ((_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) === CachedRouteKind.PAGES ? {
            kind: CachedRouteKind.PAGES,
            html: await cacheEntry.value.html.toUnchunkedString(true),
            pageData: cacheEntry.value.pageData,
            headers: cacheEntry.value.headers,
            status: cacheEntry.value.status
        } : ((_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind) === CachedRouteKind.APP_PAGE ? {
            kind: CachedRouteKind.APP_PAGE,
            html: await cacheEntry.value.html.toUnchunkedString(true),
            postponed: cacheEntry.value.postponed,
            rscData: cacheEntry.value.rscData,
            headers: cacheEntry.value.headers,
            status: cacheEntry.value.status,
            segmentData: cacheEntry.value.segmentData
        } : cacheEntry.value
    };
}
async function toResponseCacheEntry(response) {
    var _response_value, _response_value1;
    if (!response) return null;
    return {
        isMiss: response.isMiss,
        isStale: response.isStale,
        cacheControl: response.cacheControl,
        isFallback: response.isFallback,
        value: ((_response_value = response.value) == null ? void 0 : _response_value.kind) === CachedRouteKind.PAGES ? {
            kind: CachedRouteKind.PAGES,
            html: RenderResult.fromStatic(response.value.html, HTML_CONTENT_TYPE_HEADER),
            pageData: response.value.pageData,
            headers: response.value.headers,
            status: response.value.status
        } : ((_response_value1 = response.value) == null ? void 0 : _response_value1.kind) === CachedRouteKind.APP_PAGE ? {
            kind: CachedRouteKind.APP_PAGE,
            html: RenderResult.fromStatic(response.value.html, HTML_CONTENT_TYPE_HEADER),
            rscData: response.value.rscData,
            headers: response.value.headers,
            status: response.value.status,
            postponed: response.value.postponed,
            segmentData: response.value.segmentData
        } : response.value
    };
}
function routeKindToIncrementalCacheKind(routeKind) {
    switch(routeKind){
        case RouteKind.PAGES:
            return IncrementalCacheKind.PAGES;
        case RouteKind.APP_PAGE:
            return IncrementalCacheKind.APP_PAGE;
        case RouteKind.IMAGE:
            return IncrementalCacheKind.IMAGE;
        case RouteKind.APP_ROUTE:
            return IncrementalCacheKind.APP_ROUTE;
        case RouteKind.PAGES_API:
            // Pages Router API routes are not cached in the incremental cache.
            throw Object.defineProperty(new Error(`Unexpected route kind ${routeKind}`), "__NEXT_ERROR_CODE", {
                value: "E64",
                enumerable: false,
                configurable: true
            });
        default:
            return routeKind;
    }
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 8173:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export default */
/* harmony import */ var _stream_utils_node_web_streams_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4976);
/* harmony import */ var _pipe_readable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2086);
/* harmony import */ var _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1520);
/* provided dependency */ var Buffer = __webpack_require__(5356)["Buffer"];



function isNodeReadable(value) {
    return value !== null && typeof value === 'object' && typeof value.pipe === 'function' && typeof value.on === 'function' && !(value instanceof ReadableStream);
}
class RenderResult {
    static #_ = /**
   * A render result that represents an empty response. This is used to
   * represent a response that was not found or was already sent.
   */ this.EMPTY = new RenderResult(null, {
        metadata: {},
        contentType: null
    });
    /**
   * Creates a new RenderResult instance from a static response.
   *
   * @param value the static response value
   * @param contentType the content type of the response
   * @returns a new RenderResult instance
   */ static fromStatic(value, contentType) {
        return new RenderResult(value, {
            metadata: {},
            contentType
        });
    }
    constructor(response, { contentType, waitUntil, metadata }){
        this.response = response;
        this.contentType = contentType;
        this.metadata = metadata;
        this.waitUntil = waitUntil;
    }
    assignMetadata(metadata) {
        Object.assign(this.metadata, metadata);
    }
    /**
   * Returns true if the response is null. It can be null if the response was
   * not found or was already sent.
   */ get isNull() {
        return this.response === null;
    }
    /**
   * Returns false if the response is a string. It can be a string if the page
   * was prerendered. If it's not, then it was generated dynamically.
   */ get isDynamic() {
        return typeof this.response !== 'string';
    }
    toUnchunkedString(stream = false) {
        if (this.response === null) {
            // If the response is null, return an empty string. This behavior is
            // intentional as we're now providing the `RenderResult.EMPTY` value.
            return '';
        }
        if (typeof this.response !== 'string') {
            if (!stream) {
                throw Object.defineProperty(new _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_2__/* .InvariantError */ .z('dynamic responses cannot be unchunked. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
                    value: "E732",
                    enumerable: false,
                    configurable: true
                });
            }
            return (0,_stream_utils_node_web_streams_helper__WEBPACK_IMPORTED_MODULE_0__/* .streamToString */ .jP)(this.readable);
        }
        return this.response;
    }
    /**
   * Returns a readable stream of the response.
   */ get readable() {
        if (this.response === null) {
            // If the response is null, return an empty stream. This behavior is
            // intentional as we're now providing the `RenderResult.EMPTY` value.
            return new ReadableStream({
                start (controller) {
                    controller.close();
                }
            });
        }
        if (typeof this.response === 'string') {
            return (0,_stream_utils_node_web_streams_helper__WEBPACK_IMPORTED_MODULE_0__/* .streamFromString */ .q0)(this.response);
        }
        if (Buffer.isBuffer(this.response)) {
            return (0,_stream_utils_node_web_streams_helper__WEBPACK_IMPORTED_MODULE_0__/* .streamFromBuffer */ .JT)(this.response);
        }
        // If the response is an array of streams, then chain them together.
        if (Array.isArray(this.response)) {
            return (0,_stream_utils_node_web_streams_helper__WEBPACK_IMPORTED_MODULE_0__/* .chainStreams */ .hP)(...this.response);
        }
        if (isNodeReadable(this.response)) {
            if (true) {
                throw Object.defineProperty(new _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_2__/* .InvariantError */ .z('Node.js Readable cannot be converted to a web stream in the edge runtime'), "__NEXT_ERROR_CODE", {
                    value: "E1150",
                    enumerable: false,
                    configurable: true
                });
            } else {}
        }
        return this.response;
    }
    /**
   * Coerces the response to an array of streams. This will convert the response
   * to an array of streams if it is not already one.
   *
   * @returns An array of streams
   */ coerce() {
        if (this.response === null) {
            // If the response is null, return an empty stream. This behavior is
            // intentional as we're now providing the `RenderResult.EMPTY` value.
            return [];
        }
        if (typeof this.response === 'string') {
            return [
                (0,_stream_utils_node_web_streams_helper__WEBPACK_IMPORTED_MODULE_0__/* .streamFromString */ .q0)(this.response)
            ];
        } else if (Array.isArray(this.response)) {
            return this.response;
        } else if (Buffer.isBuffer(this.response)) {
            return [
                (0,_stream_utils_node_web_streams_helper__WEBPACK_IMPORTED_MODULE_0__/* .streamFromBuffer */ .JT)(this.response)
            ];
        } else if (isNodeReadable(this.response)) {
            if (true) {
                throw Object.defineProperty(new _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_2__/* .InvariantError */ .z('Node.js Readable cannot be converted to a web stream in the edge runtime'), "__NEXT_ERROR_CODE", {
                    value: "E1150",
                    enumerable: false,
                    configurable: true
                });
            } else {}
        } else {
            return [
                this.response
            ];
        }
    }
    /**
   * Pipes the response through a transform stream. This converts the response
   * to a single readable stream (chaining if needed) and pipes it through the
   * provided transform.
   *
   * @param transform The transform stream to pipe through
   */ pipeThrough(transform) {
        this.response = this.readable.pipeThrough(transform);
    }
    /**
   * Unshifts a new stream to the response. This will convert the response to an
   * array of streams if it is not already one and will add the new stream to
   * the start of the array. When this response is piped, all of the streams
   * will be piped one after the other.
   *
   * @param readable The new stream to unshift
   */ unshift(readable) {
        // Coerce the response to an array of streams.
        this.response = this.coerce();
        // Add the new stream to the start of the array.
        this.response.unshift(readable);
    }
    /**
   * Chains a new stream to the response. This will convert the response to an
   * array of streams if it is not already one and will add the new stream to
   * the end. When this response is piped, all of the streams will be piped
   * one after the other.
   *
   * @param readable The new stream to chain
   */ push(readable) {
        // Coerce the response to an array of streams.
        this.response = this.coerce();
        // Add the new stream to the end of the array.
        this.response.push(readable);
    }
    /**
   * Pipes the response to a writable stream. This will close/cancel the
   * writable stream if an error is encountered. If this doesn't throw, then
   * the writable stream will be closed or aborted.
   *
   * @param writable Writable stream to pipe the response to
   */ async pipeTo(writable) {
        try {
            await this.readable.pipeTo(writable, {
                // We want to close the writable stream ourselves so that we can wait
                // for the waitUntil promise to resolve before closing it. If an error
                // is encountered, we'll abort the writable stream if we swallowed the
                // error.
                preventClose: true
            });
            // If there is a waitUntil promise, wait for it to resolve before
            // closing the writable stream.
            if (this.waitUntil) await this.waitUntil;
            // Close the writable stream.
            await writable.close();
        } catch (err) {
            // If this is an abort error, we should abort the writable stream (as we
            // took ownership of it when we started piping). We don't need to re-throw
            // because we handled the error.
            if ((0,_pipe_readable__WEBPACK_IMPORTED_MODULE_1__/* .isAbortError */ .zf)(err)) {
                // Abort the writable stream if an error is encountered.
                await writable.abort(err);
                return;
            }
            // We're not aborting the writer here as when this method throws it's not
            // clear as to how so the caller should assume it's their responsibility
            // to clean up the writer.
            throw err;
        }
    }
    /**
   * Pipes the response to a node response. This will close/cancel the node
   * response if an error is encountered.
   *
   * @param res
   */ async pipeToNodeResponse(res) {
        if (this.response !== null && typeof this.response !== 'string' && !Buffer.isBuffer(this.response) && !Array.isArray(this.response) && isNodeReadable(this.response)) {
            await (0,_pipe_readable__WEBPACK_IMPORTED_MODULE_1__/* .pipeNodeReadableToNodeResponse */ .TU)(this.response, res, this.waitUntil);
            return;
        }
        await (0,_pipe_readable__WEBPACK_IMPORTED_MODULE_1__/* .pipeToNodeResponse */ .p$)(this.readable, res, this.waitUntil);
    }
}

//# sourceMappingURL=render-result.js.map

/***/ }),

/***/ 8356:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ AfterContext)
/* harmony export */ });
/* harmony import */ var next_dist_compiled_p_queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7232);
/* harmony import */ var next_dist_compiled_p_queue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_compiled_p_queue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1520);
/* harmony import */ var _shared_lib_is_thenable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9629);
/* harmony import */ var _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2736);
/* harmony import */ var _revalidation_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9661);
/* harmony import */ var _app_render_async_local_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9722);
/* harmony import */ var _app_render_after_task_async_storage_external__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5134);
/* harmony import */ var _lib_scheduler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9432);








class AfterContext {
    constructor({ waitUntil, onClose, onTaskError }){
        this.isRequestClosed = false;
        this.initialOnCloseError = null;
        this.workUnitStores = new Set();
        this.waitUntil = waitUntil;
        this.onClose = onClose;
        this.onTaskError = onTaskError;
        this.callbackQueue = new (next_dist_compiled_p_queue__WEBPACK_IMPORTED_MODULE_0___default())();
        this.callbackQueue.pause();
        try {
            onClose(()=>{
                this.isRequestClosed = true;
                // TODO(after): it's not ideal that we'll only switch the `phase` of a WorkUnitStore
                // if `after()` was called inside it. We should probably track this whenever a store is created
                for (const workUnitStore of this.workUnitStores){
                    workUnitStore.phase = 'after';
                }
            });
        } catch (err) {
            // If onClose is broken, report errors lazily, when after() is called.
            this.initialOnCloseError = {
                error: err
            };
        }
    }
    after(task, workUnitStore) {
        if (this.initialOnCloseError) {
            throw Object.defineProperty(new _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_1__/* .InvariantError */ .z(`An onClose call failed, which means after() can't work correctly.`, {
                cause: this.initialOnCloseError.error
            }), "__NEXT_ERROR_CODE", {
                value: "E1376",
                enumerable: false,
                configurable: true
            });
        }
        // Save the workUnitStore so we can switch its phase later.
        this.workUnitStores.add(workUnitStore);
        if ((0,_shared_lib_is_thenable__WEBPACK_IMPORTED_MODULE_6__/* .isThenable */ .Q)(task)) {
            this.addThenable(task);
        } else if (typeof task === 'function') {
            // TODO(after): implement tracing
            this.addCallback(task, workUnitStore);
        } else {
            throw Object.defineProperty(new Error('`after()`: Argument must be a promise or a function'), "__NEXT_ERROR_CODE", {
                value: "E50",
                enumerable: false,
                configurable: true
            });
        }
    }
    addThenable(thenable) {
        if (!this.waitUntil) {
            errorWaitUntilNotAvailable();
        }
        this.waitUntil(new Promise((resolve)=>{
            thenable.then(()=>{
                resolve();
            }, (error)=>{
                resolve();
                this.reportTaskError('promise', error);
            });
        }));
    }
    addCallback(callback, workUnitStore) {
        // if something is wrong, throw synchronously, bubbling up to the `after` callsite.
        if (!this.waitUntil) {
            errorWaitUntilNotAvailable();
        }
        const afterTaskStore = _app_render_after_task_async_storage_external__WEBPACK_IMPORTED_MODULE_5__/* .afterTaskAsyncStorage */ .Z.getStore();
        // This is used for checking if request APIs can be called inside `after`.
        // Note that we need to check the phase in which the *topmost* `after` was called (which should be "action"),
        // not the current phase (which might be "after" if we're in a nested after).
        // Otherwise, we might allow `after(() => headers())`, but not `after(() => after(() => headers()))`.
        const rootTaskSpawnPhase = afterTaskStore ? afterTaskStore.rootTaskSpawnPhase // nested after
         : workUnitStore.phase // topmost after
        ;
        // this should only happen once.
        if (!this.runCallbacksOnClosePromise) {
            this.runCallbacksOnClosePromise = this.runCallbacksOnClose();
            this.waitUntil(this.runCallbacksOnClosePromise);
        }
        // Bind the callback to the current execution context (i.e. preserve all currently available ALS-es).
        // We do this because we want all of these to be equivalent in every regard except timing:
        //   after(() => x())
        //   after(x())
        //   await x()
        const wrappedCallback = (0,_app_render_async_local_storage__WEBPACK_IMPORTED_MODULE_4__/* .bindSnapshot */ .cg)(// WARNING: Don't make this a named function. It must be anonymous.
        // See: https://github.com/facebook/react/pull/34911
        async ()=>{
            try {
                await _app_render_after_task_async_storage_external__WEBPACK_IMPORTED_MODULE_5__/* .afterTaskAsyncStorage */ .Z.run({
                    rootTaskSpawnPhase
                }, ()=>callback());
            } catch (error) {
                this.reportTaskError('function', error);
            }
        });
        this.callbackQueue.add(wrappedCallback);
    }
    async runCallbacksOnClose() {
        if (!this.isRequestClosed) {
            await new Promise((resolve)=>this.onClose(resolve));
        } else {
            // The request is already closed.
            // Avoid running the callbacks too quickly to prevent userspace from
            // e.g. relying on `after` being microtasky somewhere.
            await new Promise((resolve)=>(0,_lib_scheduler__WEBPACK_IMPORTED_MODULE_7__/* .scheduleImmediate */ .X$)(resolve));
        }
        return this.runCallbacks();
    }
    async runCallbacks() {
        if (this.callbackQueue.size === 0) return;
        const workStore = _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_2__/* .workAsyncStorage */ .J.getStore();
        if (!workStore) {
            throw Object.defineProperty(new _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_1__/* .InvariantError */ .z('Missing workStore in AfterContext.runCallbacks'), "__NEXT_ERROR_CODE", {
                value: "E547",
                enumerable: false,
                configurable: true
            });
        }
        return (0,_revalidation_utils__WEBPACK_IMPORTED_MODULE_3__/* .withExecuteRevalidates */ .Y)(workStore, ()=>{
            this.callbackQueue.start();
            return this.callbackQueue.onIdle();
        });
    }
    reportTaskError(taskKind, error) {
        // TODO(after): this is fine for now, but will need better intergration with our error reporting.
        // TODO(after): should we log this if we have a onTaskError callback?
        console.error(taskKind === 'promise' ? `A promise passed to \`after()\` rejected:` : `An error occurred in a function passed to \`after()\`:`, error);
        if (this.onTaskError) {
            // this is very defensive, but we really don't want anything to blow up in an error handler
            try {
                this.onTaskError == null ? void 0 : this.onTaskError.call(this, error);
            } catch (handlerError) {
                console.error(Object.defineProperty(new _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_1__/* .InvariantError */ .z('`onTaskError` threw while handling an error thrown from an `after` task', {
                    cause: handlerError
                }), "__NEXT_ERROR_CODE", {
                    value: "E569",
                    enumerable: false,
                    configurable: true
                }));
            }
        }
    }
}
function errorWaitUntilNotAvailable() {
    throw Object.defineProperty(new Error('`after()` will not work correctly, because `waitUntil` is not available in the current environment.'), "__NEXT_ERROR_CODE", {
        value: "E91",
        enumerable: false,
        configurable: true
    });
}

//# sourceMappingURL=after-context.js.map

/***/ }),

/***/ 8368:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Zm: () => (/* binding */ setRequestMeta)
/* harmony export */ });
/* unused harmony exports NEXT_REQUEST_META, getRequestMeta, addRequestMeta, removeRequestMeta */
// FIXME: (wyattjoh) this is a temporary solution to allow us to pass data between bundled modules
const NEXT_REQUEST_META = Symbol.for('NextInternalRequestMeta');
function getRequestMeta(req, key) {
    const meta = req[NEXT_REQUEST_META] || {};
    return typeof key === 'string' ? meta[key] : meta;
}
/**
 * Sets the request metadata.
 *
 * @param req the request to set the metadata on
 * @param meta the metadata to set
 * @returns the mutated request metadata
 */ function setRequestMeta(req, meta) {
    req[NEXT_REQUEST_META] = meta;
    return meta;
}
/**
 * Adds a value to the request metadata.
 *
 * @param request the request to mutate
 * @param key the key to set
 * @param value the value to set
 * @returns the mutated request metadata
 */ function addRequestMeta(request, key, value) {
    const meta = getRequestMeta(request);
    meta[key] = value;
    return setRequestMeta(request, meta);
}
/**
 * Removes a key from the request metadata.
 *
 * @param request the request to mutate
 * @param key the key to remove
 * @returns the mutated request metadata
 */ function removeRequestMeta(request, key) {
    const meta = getRequestMeta(request);
    delete meta[key];
    return setRequestMeta(request, meta);
}

//# sourceMappingURL=request-meta.js.map

/***/ }),

/***/ 8381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports MIN_PRERENDERABLE_EXPIRE, MIN_PREFETCHABLE_STALE, MIN_SHELL_STALE */
/* harmony import */ var _shared_lib_invariant_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1520);

const MIN_PRERENDERABLE_EXPIRE = 300 // 5 minutes
;
const MIN_PREFETCHABLE_STALE = 30 // 30 seconds
;
const MIN_SHELL_STALE = 300 // 5 minutes
;
if (false) {}

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 8507:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export RedirectStatusCode */
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({}); //# sourceMappingURL=redirect-status-code.js.map


/***/ }),

/***/ 8732:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   handler: () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var next_dist_server_web_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2976);
/* harmony import */ var next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6381);
/* harmony import */ var next_dist_server_lib_incremental_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2795);
/* harmony import */ var private_next_root_dir_src_middleware_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9172);
/* harmony import */ var next_dist_client_components_is_next_router_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6789);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9535);




const incrementalCacheHandler = null
// Import the userland code.
;



const mod = {
    ...private_next_root_dir_src_middleware_ts__WEBPACK_IMPORTED_MODULE_3__
};
const page = "/src/middleware";
const isProxy = page === '/proxy' || page === '/src/proxy';
const handlerUserland = (isProxy ? mod.proxy : mod.middleware) || mod.default;
class ProxyMissingExportError extends Error {
    constructor(message){
        super(message);
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
        // Stack isn't useful here, remove it considering it spams logs during development.
        this.stack = '';
    }
}
// TODO: This spams logs during development. Find a better way to handle this.
// Removing this will spam "fn is not a function" logs which is worse.
if (typeof handlerUserland !== 'function') {
    throw new ProxyMissingExportError(`The ${isProxy ? 'Proxy' : 'Middleware'} file "${page}" must export a function named \`${isProxy ? 'proxy' : 'middleware'}\` or a default function.`);
}
// Proxy will only sent out the FetchEvent to next server,
// so load instrumentation module here and track the error inside proxy module.
function errorHandledHandler(fn) {
    return async (...args)=>{
        try {
            return await fn(...args);
        } catch (err) {
            // In development, error the navigation API usage in runtime,
            // since it's not allowed to be used in proxy as it's outside of react component tree.
            if (false) {}
            const req = args[0];
            const url = new URL(req.url);
            const resource = url.pathname + url.search;
            await (0,next_dist_server_web_globals__WEBPACK_IMPORTED_MODULE_0__/* .edgeInstrumentationOnRequestError */ .Ek)(err, {
                path: resource,
                method: req.method,
                headers: Object.fromEntries(req.headers.entries())
            }, {
                routerKind: 'Pages Router',
                routePath: '/proxy',
                routeType: 'proxy',
                revalidateReason: undefined
            });
            throw err;
        }
    };
}
const internalHandler = async (opts)=>{
    if (false) { var _opts_request_requestMeta, _opts_request_requestMeta1; }
    return (0,next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_1__/* .adapter */ .O)({
        ...opts,
        IncrementalCache: next_dist_server_lib_incremental_cache__WEBPACK_IMPORTED_MODULE_2__/* .IncrementalCache */ .N,
        incrementalCacheHandler,
        page,
        handler: errorHandledHandler(handlerUserland)
    });
};
async function handler(request, ctx) {
    const result = await internalHandler({
        request: {
            url: request.url,
            method: request.method,
            headers: (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_5__/* .toNodeOutgoingHttpHeaders */ .Cu)(request.headers),
            nextConfig: {
                basePath: "",
                i18n: "",
                trailingSlash: Boolean(false),
                experimental: {
                    cacheLife: {"default":{"stale":300,"revalidate":900,"expire":4294967294},"seconds":{"stale":30,"revalidate":1,"expire":60},"minutes":{"stale":300,"revalidate":60,"expire":3600},"hours":{"stale":300,"revalidate":3600,"expire":86400},"days":{"stale":300,"revalidate":86400,"expire":604800},"weeks":{"stale":300,"revalidate":604800,"expire":2592000},"max":{"stale":300,"revalidate":2592000,"expire":31536000}},
                    authInterrupts: Boolean(false),
                    clientParamParsingOrigins: []
                }
            },
            page: {
                name: page
            },
            body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body ?? undefined : undefined,
            waitUntil: ctx.waitUntil,
            requestMeta: ctx.requestMeta,
            signal: ctx.signal || new AbortController().signal
        }
    });
    ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, result.waitUntil);
    return result.response;
}
// backwards compat for non-adapter setups
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (internalHandler);

//# sourceMappingURL=middleware.js.map


/***/ }),

/***/ 8814:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports safePathToRegexp, safeCompile, safeRegexpToFunction, safeRouteMatcher */
/* harmony import */ var next_dist_compiled_path_to_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3259);
/* harmony import */ var next_dist_compiled_path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_compiled_path_to_regexp__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Client-safe utilities for route matching that don't import server-side
 * utilities to avoid bundling issues with Turbopack
 */ 

/**
 * Client-safe wrapper around pathToRegexp that handles path-to-regexp 6.3.0+ validation errors.
 * This includes both "Can not repeat without prefix/suffix" and "Must have text between parameters" errors.
 */ function safePathToRegexp(route, keys, options) {
    if (typeof route !== 'string') {
        return pathToRegexp(route, keys, options);
    }
    // Check if normalization is needed and cache the result
    const needsNormalization = hasAdjacentParameterIssues(route);
    const routeToUse = needsNormalization ? normalizeAdjacentParameters(route) : route;
    try {
        return pathToRegexp(routeToUse, keys, options);
    } catch (error) {
        // Only try normalization if we haven't already normalized
        if (!needsNormalization) {
            try {
                const normalizedRoute = normalizeAdjacentParameters(route);
                return pathToRegexp(normalizedRoute, keys, options);
            } catch (retryError) {
                // If that doesn't work, fall back to original error
                throw error;
            }
        }
        throw error;
    }
}
/**
 * Client-safe wrapper around compile that handles path-to-regexp 6.3.0+ validation errors.
 * No server-side error reporting to avoid bundling issues.
 * When normalization is applied, the returned compiler function automatically strips
 * the internal separator from the output URL.
 */ function safeCompile(route, options) {
    // Check if normalization is needed and cache the result
    const needsNormalization = hasAdjacentParameterIssues(route);
    const routeToUse = needsNormalization ? normalizeAdjacentParameters(route) : route;
    try {
        const compiler = compile(routeToUse, options);
        // If we normalized the route, wrap the compiler to strip separators from output
        // The normalization inserts _NEXTSEP_ as a literal string in the pattern to satisfy
        // path-to-regexp validation, but we don't want it in the final compiled URL
        if (needsNormalization) {
            return (params)=>{
                return stripNormalizedSeparators(compiler(params));
            };
        }
        return compiler;
    } catch (error) {
        // Only try normalization if we haven't already normalized
        if (!needsNormalization) {
            try {
                const normalizedRoute = normalizeAdjacentParameters(route);
                const compiler = compile(normalizedRoute, options);
                // Wrap the compiler to strip separators from output
                return (params)=>{
                    return stripNormalizedSeparators(compiler(params));
                };
            } catch (retryError) {
                // If that doesn't work, fall back to original error
                throw error;
            }
        }
        throw error;
    }
}
/**
 * Client-safe wrapper around regexpToFunction that automatically cleans parameters.
 */ function safeRegexpToFunction(regexp, keys) {
    const originalMatcher = regexpToFunction(regexp, keys || []);
    return (pathname)=>{
        const result = originalMatcher(pathname);
        if (!result) return false;
        // Clean parameters before returning
        return {
            ...result,
            params: stripParameterSeparators(result.params)
        };
    };
}
/**
 * Safe wrapper for route matcher functions that automatically cleans parameters.
 * This is client-safe and doesn't import path-to-regexp.
 */ function safeRouteMatcher(matcherFn) {
    return (pathname)=>{
        const result = matcherFn(pathname);
        if (!result) return false;
        // Clean parameters before returning
        return stripParameterSeparators(result);
    };
} //# sourceMappingURL=route-match-utils.js.map


/***/ }),

/***/ 8822:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ normalizePagePath)
/* harmony export */ });
/* harmony import */ var _ensure_leading_slash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(808);
/* harmony import */ var _router_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6665);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6214);



/**
 * Takes a page and transforms it into its file counterpart ensuring that the
 * output is normalized. Note this function is not idempotent because a page
 * `/index` can be referencing `/index/index.js` and `/index/index` could be
 * referencing `/index/index/index.js`. Examples:
 *  - `/` -> `/index`
 *  - `/index/foo` -> `/index/index/foo`
 *  - `/index` -> `/index/index`
 */ function normalizePagePath(page) {
    const normalized = /^\/index(\/|$)/.test(page) && !(0,_router_utils__WEBPACK_IMPORTED_MODULE_1__/* .isDynamicRoute */ .F)(page) ? `/index${page}` : page === '/' ? '/index' : (0,_ensure_leading_slash__WEBPACK_IMPORTED_MODULE_2__/* .ensureLeadingSlash */ .A)(page);
    if (false) {}
    return normalized;
} //# sourceMappingURL=normalize-page-path.js.map


/***/ }),

/***/ 8947:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P7: () => (/* binding */ normalizeRscURL),
/* harmony export */   Yr: () => (/* binding */ normalizeAppPath)
/* harmony export */ });
/* unused harmony export compareAppPaths */
/* harmony import */ var _page_path_ensure_leading_slash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(808);
/* harmony import */ var _segment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9250);


/**
 * Normalizes an app route so it represents the actual request path. Essentially
 * performing the following transformations:
 *
 * - `/(dashboard)/user/[id]/page` to `/user/[id]`
 * - `/(dashboard)/account/page` to `/account`
 * - `/user/[id]/page` to `/user/[id]`
 * - `/account/page` to `/account`
 * - `/page` to `/`
 * - `/(dashboard)/user/[id]/route` to `/user/[id]`
 * - `/(dashboard)/account/route` to `/account`
 * - `/user/[id]/route` to `/user/[id]`
 * - `/account/route` to `/account`
 * - `/route` to `/`
 * - `/` to `/`
 *
 * @param route the app route to normalize
 * @returns the normalized pathname
 */ function normalizeAppPath(route) {
    return (0,_page_path_ensure_leading_slash__WEBPACK_IMPORTED_MODULE_0__/* .ensureLeadingSlash */ .A)(route.split('/').reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if ((0,_segment__WEBPACK_IMPORTED_MODULE_1__/* .isGroupSegment */ .V)(segment)) {
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
/**
 * Comparator for sorting app paths so that parallel slot paths (containing
 * `/@`) come before the children/root page path. This ensures the last item
 * is always the children page, which is what `renderPageComponent` reads via
 * `appPaths[appPaths.length - 1]`.
 *
 * Without this, route group prefixes like `(group)` (char code 0x28) sort
 * before `@` (0x40), causing the children page to sort first instead of last
 * and leading to a manifest mismatch / 404 in webpack dev mode.
 */ function compareAppPaths(a, b) {
    const aHasSlot = a.includes('/@');
    const bHasSlot = b.includes('/@');
    if (aHasSlot && !bHasSlot) return -1;
    if (!aHasSlot && bHasSlot) return 1;
    return a.localeCompare(b);
}
/**
 * Strips the `.rsc` extension if it's in the pathname.
 * Since this function is used on full urls it checks `?` for searchParams handling.
 */ function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, '$1');
} //# sourceMappingURL=app-paths.js.map


/***/ }),

/***/ 8961:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ DraftModeProvider)
/* harmony export */ });
/* harmony import */ var _api_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(266);

class DraftModeProvider {
    constructor(previewProps, headers, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && (0,_api_utils__WEBPACK_IMPORTED_MODULE_0__/* .checkIsOnDemandRevalidate */ .Gx)(headers, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(_api_utils__WEBPACK_IMPORTED_MODULE_0__/* .COOKIE_NAME_PRERENDER_BYPASS */ .Ic)) == null ? void 0 : _cookies_get.value;
        this._isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && (cookieValue === previewProps.previewModeId || // In dev mode, the cookie can be actual hash value preview id but the preview props can still be `development-id`.
         false && 0));
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    enable() {
        if (!this._previewModeId) {
            throw Object.defineProperty(new Error('Invariant: previewProps missing previewModeId this should never happen'), "__NEXT_ERROR_CODE", {
                value: "E93",
                enumerable: false,
                configurable: true
            });
        }
        this._mutableCookies.set({
            name: _api_utils__WEBPACK_IMPORTED_MODULE_0__/* .COOKIE_NAME_PRERENDER_BYPASS */ .Ic,
            value: this._previewModeId,
            httpOnly: true,
            sameSite:  true ? 'none' : 0,
            secure: "production" !== 'development',
            path: '/'
        });
        this._isEnabled = true;
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: _api_utils__WEBPACK_IMPORTED_MODULE_0__/* .COOKIE_NAME_PRERENDER_BYPASS */ .Ic,
            value: '',
            httpOnly: true,
            sameSite:  true ? 'none' : 0,
            secure: "production" !== 'development',
            path: '/',
            expires: new Date(0)
        });
        this._isEnabled = false;
    }
}

//# sourceMappingURL=draft-mode-provider.js.map

/***/ }),

/***/ 9099:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ getBuiltinRequestContext)
/* harmony export */ });
/* unused harmony export createLocalRequestContext */
/* harmony import */ var _app_render_async_local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9722);

function getBuiltinRequestContext() {
    const _globalThis = globalThis;
    const ctx = _globalThis[NEXT_REQUEST_CONTEXT_SYMBOL];
    return ctx == null ? void 0 : ctx.get();
}
const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for('@next/request-context');
/** "@next/request-context" has a different signature from AsyncLocalStorage,
 * matching [AsyncContext.Variable](https://github.com/tc39/proposal-async-context).
 * We don't need a full AsyncContext adapter here, just having `.get()` is enough
 */ function createLocalRequestContext() {
    const storage = createAsyncLocalStorage();
    return {
        get: ()=>storage.getStore(),
        run: (value, callback)=>storage.run(value, callback)
    };
}

//# sourceMappingURL=builtin-request-context.js.map

/***/ }),

/***/ 9113:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ DetachedPromise)
/* harmony export */ });
/**
 * A `Promise.withResolvers` implementation that exposes the `resolve` and
 * `reject` functions on a `Promise`.
 *
 * @see https://tc39.es/proposal-promise-with-resolvers/
 */ class DetachedPromise {
    constructor(){
        let resolve;
        let reject;
        // Create the promise and assign the resolvers to the object.
        this.promise = new Promise((res, rej)=>{
            resolve = res;
            reject = rej;
        });
        // We know that resolvers is defined because the Promise constructor runs
        // synchronously.
        this.resolve = resolve;
        this.reject = reject;
    }
}

//# sourceMappingURL=detached-promise.js.map

/***/ }),

/***/ 9125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ MultiFileWriter)
/* harmony export */ });
/* harmony import */ var _shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(654);
/* harmony import */ var _shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_0__);

/**
 * MultiFileWriter is a utility for writing multiple files in parallel that
 * guarantees that all files will be written after their containing directory
 * is created, and that the directory will only be created once.
 */ class MultiFileWriter {
    constructor(/**
     * The file system methods to use.
     */ fs){
        this.fs = fs;
        this.tasks = [];
    }
    /**
   * Finds or creates a task for a directory.
   *
   * @param directory - The directory to find or create a task for.
   * @returns The task for the directory.
   */ findOrCreateTask(directory) {
        // See if this directory already has a task to create it.
        for (const task of this.tasks){
            if (task[0] === directory) {
                return task;
            }
        }
        const promise = this.fs.mkdir(directory);
        // Attach a catch handler so that it doesn't throw an unhandled promise
        // rejection warning.
        promise.catch(()=>{});
        // Otherwise, create a new task for this directory.
        const task = [
            directory,
            promise,
            []
        ];
        this.tasks.push(task);
        return task;
    }
    /**
   * Appends a file to the writer to be written after its containing directory
   * is created. The file writer should be awaited after all the files have been
   * appended. Any async operation that occurs between appending and awaiting
   * may cause an unhandled promise rejection warning and potentially crash the
   * process.
   *
   * @param filePath - The path to the file to write.
   * @param data - The data to write to the file.
   */ append(filePath, data) {
        // Find or create a task for the directory that contains the file.
        const task = this.findOrCreateTask(_shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_0___default().dirname(filePath));
        const promise = task[1].then(()=>this.fs.writeFile(filePath, data));
        // Attach a catch handler so that it doesn't throw an unhandled promise
        // rejection warning.
        promise.catch(()=>{});
        // Add the file write to the task AFTER the directory promise has resolved.
        task[2].push(promise);
    }
    /**
   * Returns a promise that resolves when all the files have been written.
   */ wait() {
        return Promise.all(this.tasks.flatMap((task)=>task[2]));
    }
}

//# sourceMappingURL=multi-file-writer.js.map

/***/ }),

/***/ 9172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   middleware: () => (/* binding */ middleware)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2609);

/**
 * Preview-proxy host normalization.
 *
 * The sandbox preview proxy (https://preview-chat-<id>.space-z.ai) reaches the
 * dev server through an internal tunnel (ws-*.fcapp.run). The tunnel forwards
 * every request with:
 *
 *   host / x-forwarded-host  = ws-*.fcapp.run   (the TUNNEL domain, not public)
 *   x-forwarded-proto        = http
 *   abc                      = preview-chat-<id> (the public subdomain)
 *   x-session-id             = chat-<id>
 *
 * Auth.js v5 builds absolute redirect URLs from x-forwarded-host +
 * x-forwarded-proto (@auth/core/lib/utils/env.js → createActionURL), so after
 * a successful signIn() the browser was being redirected to
 * http://ws-*.fcapp.run/ — a domain it cannot reach (tunnel endpoint answers
 * 400). Next.js server-action CSRF validation also compares origin against
 * these headers.
 *
 * This middleware detects the public preview host (from the browser's Origin
 * header on POSTs, or from the proxy's `abc` subdomain header on plain GETs)
 * and rewrites the forwarded headers to the public host so all absolute-URL
 * generation (auth redirects, OAuth callbacks, canonical URLs) points where
 * the browser can actually go.
 *
 * Local dev access (localhost / 127.0.0.1) is left completely untouched.
 */ function middleware(request) {
    const headers = new Headers(request.headers);
    // Never rewrite for direct local access — preserve plain dev behavior.
    const currentForwardedHost = (request.headers.get("x-forwarded-host") ?? "").toLowerCase();
    if (currentForwardedHost.startsWith("localhost") || currentForwardedHost.startsWith("127.")) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__/* .NextResponse */ .Rp.next({
            request: {
                headers
            }
        });
    }
    let publicHost = null;
    // 1) Origin header (server-action POSTs, fetches with CORS mode) — the
    //    browser's own view of the host it is talking to. Most trustworthy.
    const origin = request.headers.get("origin");
    if (origin && origin !== "null") {
        try {
            const originUrl = new URL(origin);
            const hostname = originUrl.hostname.toLowerCase();
            if (hostname.startsWith("preview-chat-") || hostname.endsWith(".space-z.ai")) {
                publicHost = originUrl.host;
            }
        } catch  {
        /* malformed origin — ignore */ }
    }
    // 2) Proxy `abc` header (document GETs carry no Origin) — the proxy passes
    //    the public subdomain on every forwarded request.
    if (!publicHost) {
        const abc = (request.headers.get("abc") ?? "").trim().toLowerCase();
        if (abc && /^[a-z0-9][a-z0-9-]*$/.test(abc)) {
            publicHost = `${abc}.space-z.ai`;
        }
    }
    if (publicHost && currentForwardedHost !== publicHost) {
        headers.set("x-forwarded-host", publicHost);
        headers.set("x-forwarded-proto", "https");
    }
    return next_server__WEBPACK_IMPORTED_MODULE_0__/* .NextResponse */ .Rp.next({
        request: {
            headers
        }
    });
}
const config = {
    // Run on everything except static assets — pages, API routes and
    // server-action POSTs all need the corrected forwarded headers.
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|manifest.json|scripts/|generated/|sw.js).*)"
    ]
};


/***/ }),

/***/ 9250:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ isGroupSegment)
/* harmony export */ });
/* unused harmony exports getSegmentValue, isParallelRouteSegment, addSearchParamsIfPageSegment, computeSelectedLayoutSegment, getSelectedLayoutSegmentPath, PAGE_SEGMENT_KEY, DEFAULT_SEGMENT_KEY, NOT_FOUND_SEGMENT_KEY */
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
/** Get the canonical parameters from the current level to the leaf node. */ function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
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

/***/ 9414:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ formatNextPathnameInfo)
/* harmony export */ });
/* harmony import */ var _remove_trailing_slash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(860);
/* harmony import */ var _add_path_prefix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9517);
/* harmony import */ var _add_path_suffix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4730);
/* harmony import */ var _add_locale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6897);




function formatNextPathnameInfo(info) {
    let pathname = (0,_add_locale__WEBPACK_IMPORTED_MODULE_0__/* .addLocale */ .I)(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = (0,_remove_trailing_slash__WEBPACK_IMPORTED_MODULE_1__/* .removeTrailingSlash */ .U)(pathname);
    }
    if (info.buildId) {
        pathname = (0,_add_path_suffix__WEBPACK_IMPORTED_MODULE_2__/* .addPathSuffix */ .E)((0,_add_path_prefix__WEBPACK_IMPORTED_MODULE_3__/* .addPathPrefix */ .B)(pathname, `/_next/data/${info.buildId}`), info.pathname === '/' ? 'index.json' : '.json');
    }
    pathname = (0,_add_path_prefix__WEBPACK_IMPORTED_MODULE_3__/* .addPathPrefix */ .B)(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith('/') ? (0,_add_path_suffix__WEBPACK_IMPORTED_MODULE_2__/* .addPathSuffix */ .E)(pathname, '/') : pathname : (0,_remove_trailing_slash__WEBPACK_IMPORTED_MODULE_1__/* .removeTrailingSlash */ .U)(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map


/***/ }),

/***/ 9428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ toRoute)
/* harmony export */ });
/**
 * This transforms a URL pathname into a route. It removes any trailing slashes
 * and the `/index` suffix.
 *
 * @param pathname - The URL path that needs to be optimized.
 * @returns - The route
 *
 * @example
 * // returns '/example'
 * toRoute('/example/index/');
 *
 * @example
 * // returns '/example'
 * toRoute('/example/');
 *
 * @example
 * // returns '/'
 * toRoute('/index/');
 *
 * @example
 * // returns '/'
 * toRoute('/');
 */ function toRoute(pathname) {
    return pathname.replace(/(?:\/index)?\/?$/, '') || '/';
}

//# sourceMappingURL=to-route.js.map

/***/ }),

/***/ 9432:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X$: () => (/* binding */ scheduleImmediate)
/* harmony export */ });
/* unused harmony exports scheduleOnNextTick, atLeastOneTask, waitAtLeastOneReactRenderTask */
/**
 * Schedules a function to be called on the next tick after the other promises
 * have been resolved.
 *
 * @param cb the function to schedule
 */ const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if (true) {
            setTimeout(cb, 0);
        } else {}
    });
};
/**
 * Schedules a function to be called using `setImmediate` or `setTimeout` if
 * `setImmediate` is not available (like in the Edge runtime).
 *
 * @param cb the function to schedule
 */ const scheduleImmediate = (cb)=>{
    if (true) {
        setTimeout(cb, 0);
    } else {}
};
/**
 * returns a promise than resolves in a future task. There is no guarantee that the task it resolves in
 * will be the next task but if you await it you can at least be sure that the current task is over and
 * most usefully that the entire microtask queue of the current task has been emptied.
 */ function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
/**
 * This utility function is extracted to make it easier to find places where we are doing
 * specific timing tricks to try to schedule work after React has rendered. This is especially
 * important at the moment because Next.js uses the edge builds of React which use setTimeout to
 * schedule work when you might expect that something like setImmediate would do the trick.
 *
 * Long term we should switch to the node versions of React rendering when possible and then
 * update this to use setImmediate rather than setTimeout
 */ function waitAtLeastOneReactRenderTask() {
    if (true) {
        return new Promise((r)=>setTimeout(r, 0));
    } else {}
}

//# sourceMappingURL=scheduler.js.map

/***/ }),

/***/ 9478:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A$: () => (/* binding */ VIEWPORT_BOUNDARY_NAME),
/* harmony export */   DQ: () => (/* binding */ OUTLET_BOUNDARY_NAME),
/* harmony export */   NJ: () => (/* binding */ METADATA_BOUNDARY_NAME),
/* harmony export */   ri: () => (/* binding */ ROOT_LAYOUT_BOUNDARY_NAME)
/* harmony export */ });
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';
const ROOT_LAYOUT_BOUNDARY_NAME = '__next_root_layout_boundary__';

//# sourceMappingURL=boundary-constants.js.map

/***/ }),

/***/ 9503:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ getHostname)
/* harmony export */ });
/**
 * Takes an object with a hostname property (like a parsed URL) and some
 * headers that may contain Host and returns the preferred hostname.
 * @param parsed An object containing a hostname property.
 * @param headers A dictionary with headers containing a `host`.
 */ function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if (headers?.host && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(':', 1)[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map


/***/ }),

/***/ 9517:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ addPathPrefix)
/* harmony export */ });
/* harmony import */ var _parse_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(650);

/**
 * Adds the provided prefix to the given path. It first ensures that the path
 * is indeed starting with a slash.
 */ function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0,_parse_path__WEBPACK_IMPORTED_MODULE_0__/* .parsePath */ .R)(path);
    return `${prefix}${pathname}${query}${hash}`;
} //# sourceMappingURL=add-path-prefix.js.map


/***/ }),

/***/ 9535:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cu: () => (/* binding */ toNodeOutgoingHttpHeaders),
/* harmony export */   RD: () => (/* binding */ splitCookiesString),
/* harmony export */   p$: () => (/* binding */ fromNodeOutgoingHttpHeaders),
/* harmony export */   qU: () => (/* binding */ validateURL),
/* harmony export */   wN: () => (/* binding */ normalizeNextQueryParam)
/* harmony export */ });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1276);

/**
 * Converts a Node.js IncomingHttpHeaders object to a Headers object. Any
 * headers with multiple values will be joined with a comma and space. Any
 * headers that have an undefined value will be ignored and others will be
 * coerced to strings.
 *
 * @param nodeHeaders the headers object to convert
 * @returns the converted headers object
 */ function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === 'undefined') continue;
            if (typeof v === 'number') {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.
  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.
  
  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/ function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== '=' && ch !== ';' && ch !== ',';
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ',') {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
/**
 * Converts a Headers object to a Node.js OutgoingHttpHeaders object. This is
 * required to support the set-cookie header, which may have multiple values.
 *
 * @param headers the headers object to convert
 * @returns the converted headers object
 */ function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === 'set-cookie') {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
/**
 * Validate the correctness of a user-provided URL.
 */ function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw Object.defineProperty(new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        }), "__NEXT_ERROR_CODE", {
            value: "E61",
            enumerable: false,
            configurable: true
        });
    }
}
/**
 * Normalizes `nxtP` and `nxtI` query param values to remove the prefix.
 * This function does not mutate the input key.
 */ function normalizeNextQueryParam(key) {
    const prefixes = [
        _lib_constants__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_QUERY_PARAM_PREFIX */ .AA,
        _lib_constants__WEBPACK_IMPORTED_MODULE_0__/* .NEXT_INTERCEPTION_MARKER_PREFIX */ .h
    ];
    for (const prefix of prefixes){
        if (key !== prefix && key.startsWith(prefix)) {
            return key.substring(prefix.length);
        }
    }
    return null;
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 9629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ isThenable)
/* harmony export */ });
/**
 * Check to see if a value is Thenable.
 *
 * @param promise the maybe-thenable value
 * @returns true if the value is thenable
 */ function isThenable(promise) {
    return promise !== null && typeof promise === 'object' && 'then' in promise && typeof promise.then === 'function';
} //# sourceMappingURL=is-thenable.js.map


/***/ }),

/***/ 9661:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ withExecuteRevalidates)
/* harmony export */ });
/* unused harmony export executeRevalidates */
/* harmony import */ var _use_cache_handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5403);

/** Run a callback, and execute any *new* revalidations added during its runtime. */ async function withExecuteRevalidates(store, callback) {
    if (!store) {
        return callback();
    }
    // If we executed any revalidates during the request, then we don't want to execute them again.
    // save the state so we can check if anything changed after we're done running callbacks.
    const savedRevalidationState = cloneRevalidationState(store);
    try {
        return await callback();
    } finally{
        // Check if we have any new revalidates, and if so, wait until they are all resolved.
        const newRevalidates = diffRevalidationState(savedRevalidationState, cloneRevalidationState(store));
        await executeRevalidates(store, newRevalidates);
    }
}
function cloneRevalidationState(store) {
    return {
        pendingRevalidatedTags: store.pendingRevalidatedTags ? [
            ...store.pendingRevalidatedTags
        ] : [],
        pendingRevalidates: {
            ...store.pendingRevalidates
        },
        pendingRevalidateWrites: store.pendingRevalidateWrites ? [
            ...store.pendingRevalidateWrites
        ] : []
    };
}
function diffRevalidationState(prev, curr) {
    const prevTagsWithProfile = new Set(prev.pendingRevalidatedTags.map((item)=>{
        const profileKey = typeof item.profile === 'object' ? JSON.stringify(item.profile) : item.profile || '';
        return `${item.tag}:${profileKey}`;
    }));
    const prevRevalidateWrites = new Set(prev.pendingRevalidateWrites);
    return {
        pendingRevalidatedTags: curr.pendingRevalidatedTags.filter((item)=>{
            const profileKey = typeof item.profile === 'object' ? JSON.stringify(item.profile) : item.profile || '';
            return !prevTagsWithProfile.has(`${item.tag}:${profileKey}`);
        }),
        pendingRevalidates: Object.fromEntries(Object.entries(curr.pendingRevalidates).filter(([key])=>!(key in prev.pendingRevalidates))),
        pendingRevalidateWrites: curr.pendingRevalidateWrites.filter((promise)=>!prevRevalidateWrites.has(promise))
    };
}
async function revalidateTags(tagsWithProfile, incrementalCache, workStore) {
    if (tagsWithProfile.length === 0) {
        return;
    }
    const handlers = (0,_use_cache_handlers__WEBPACK_IMPORTED_MODULE_0__/* .getCacheHandlers */ .a1)();
    const promises = [];
    // Group tags by profile for batch processing
    const tagsByProfile = new Map();
    for (const item of tagsWithProfile){
        const profile = item.profile;
        // Find existing profile by comparing values
        let existingKey = undefined;
        for (const [key] of tagsByProfile){
            if (typeof key === 'string' && typeof profile === 'string' && key === profile) {
                existingKey = key;
                break;
            }
            if (typeof key === 'object' && typeof profile === 'object' && JSON.stringify(key) === JSON.stringify(profile)) {
                existingKey = key;
                break;
            }
            if (key === profile) {
                existingKey = key;
                break;
            }
        }
        const profileKey = existingKey || profile;
        if (!tagsByProfile.has(profileKey)) {
            tagsByProfile.set(profileKey, []);
        }
        tagsByProfile.get(profileKey).push(item.tag);
    }
    // Process each profile group
    for (const [profile, tagsForProfile] of tagsByProfile){
        // Look up the cache profile from workStore if available
        let durations;
        if (profile) {
            let cacheLife;
            if (typeof profile === 'object') {
                // Profile is already a cacheLife configuration object
                cacheLife = profile;
            } else if (typeof profile === 'string') {
                // Profile is a string key, look it up in workStore
                cacheLife = workStore == null ? void 0 : workStore.cacheLifeProfiles[profile];
                if (!cacheLife) {
                    throw Object.defineProperty(new Error(`Invalid profile provided "${profile}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", {
                        value: "E873",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (cacheLife) {
                durations = {
                    expire: cacheLife.expire
                };
            }
        }
        // If profile is not found and not 'max', durations will be undefined
        // which will trigger immediate expiration in the cache handler
        for (const handler of handlers || []){
            if (profile) {
                promises.push(handler.updateTags == null ? void 0 : handler.updateTags.call(handler, tagsForProfile, durations));
            } else {
                promises.push(handler.updateTags == null ? void 0 : handler.updateTags.call(handler, tagsForProfile));
            }
        }
        if (incrementalCache) {
            promises.push(incrementalCache.revalidateTag(tagsForProfile, durations));
        }
    }
    await Promise.all(promises);
}
function executeRevalidates(workStore, state) {
    const promises = [];
    const pendingRevalidatedTags = (state == null ? void 0 : state.pendingRevalidatedTags) ?? workStore.pendingRevalidatedTags ?? [];
    if (pendingRevalidatedTags.length > 0) {
        promises.push(revalidateTags(pendingRevalidatedTags, workStore.incrementalCache, workStore));
    }
    const pendingRevalidates = Object.values((state == null ? void 0 : state.pendingRevalidates) ?? workStore.pendingRevalidates ?? {});
    promises.push(...pendingRevalidates);
    const pendingRevalidateWrites = (state == null ? void 0 : state.pendingRevalidateWrites) ?? workStore.pendingRevalidateWrites ?? [];
    promises.push(...pendingRevalidateWrites);
    if (promises.length === 0) {
        return false;
    }
    return Promise.all(promises).then(()=>undefined);
}

//# sourceMappingURL=revalidation-utils.js.map

/***/ }),

/***/ 9722:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $p: () => (/* binding */ createSnapshot),
/* harmony export */   cg: () => (/* binding */ bindSnapshot),
/* harmony export */   xl: () => (/* binding */ createAsyncLocalStorage)
/* harmony export */ });
const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available'), "__NEXT_ERROR_CODE", {
    value: "E504",
    enumerable: false,
    configurable: true
});
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    static bind(fn) {
        return fn;
    }
}
const maybeGlobalAsyncLocalStorage = typeof globalThis !== 'undefined' && globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
}
function bindSnapshot(// WARNING: Don't pass a named function to this argument! See: https://github.com/facebook/react/pull/34911
fn) {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.bind(fn);
    }
    return FakeAsyncLocalStorage.bind(fn);
}
function createSnapshot() {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.snapshot();
    }
    return function(fn, ...args) {
        return fn(...args);
    };
}

//# sourceMappingURL=async-local-storage.js.map

/***/ }),

/***/ 9743:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports isHangingPromiseRejectionError, ClientHookDynamicError, isClientHookDynamicError, makeDynamicHangingPromise, makeUntrackedHangingPromise, makeRuntimeHangingPromise, makeFallbackParamsHangingPromise, makeStageHangingPromise, trackRuntimeDataAccessed, trackFallbackParamsAccessed, makeClientHookHangingPromise, makePromiseFromTrigger, makeDevtoolsIOAwarePromise, RENDER_STAGES_BY_DATA_KIND, applyOwnerStack */
/* harmony import */ var _app_render_staged_rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5507);
/* harmony import */ var _app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2381);



function isHangingPromiseRejectionError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
}
const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
class HangingPromiseRejectionError extends Error {
    constructor(route, expression){
        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${route}".`), this.route = route, this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
}
const CLIENT_HOOK_DYNAMIC = 'CLIENT_HOOK_DYNAMIC';
class ClientHookDynamicError extends Error {
    constructor(route, expression){
        super(`Route "${route}": Next.js encountered URL data \`${expression}\` in a Client Component outside of \`<Suspense>\`.\n\n` + `This blocks prerendering because the value is only available at runtime.\n\n` + `Ways to fix this:\n` + `  - [stream] Wrap the component in \`<Suspense fallback={...}>\` so the hook value streams in after prerendering\n` + `  - [block] Set \`export const instant = false\` to allow a blocking route\n\n` + `Learn more: https://nextjs.org/docs/messages/blocking-prerender-client-hook`), this.digest = CLIENT_HOOK_DYNAMIC;
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1433",
            enumerable: false,
            configurable: true
        });
    }
}
function isClientHookDynamicError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === CLIENT_HOOK_DYNAMIC;
}
const abortListenersBySignal = new WeakMap();
/**
 * Constructs a promise that never resolves, standing in for *dynamic* data:
 * data that is only available during a real dynamic request and hangs in
 * every kind of prerender — `io()`, `connection()`, uncached `fetch()`.
 *
 * This is primarily useful for cacheComponents where we use promise
 * resolution timing to determine which parts of a render can be included in a
 * prerender.
 *
 * Records nothing on the prerender store: the promise's holes are only ever
 * filled by a real dynamic request, so a runtime prefetch response would have
 * the same holes as the static one. If the data source would resolve during a
 * runtime prerender, use `makeRuntimeHangingPromise` instead.
 *
 * @internal
 */ function makeDynamicHangingPromise(signal, route, expression) {
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
function makeUntrackedHangingPromise(signal, route, expression) {
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
/**
 * Constructs a promise that never resolves, standing in for *runtime* data:
 * data that hangs during a static prerender but is available during a runtime
 * prerender (the kind that backs a runtime prefetch request: request data
 * like cookies and headers is available, but the render is still not a real
 * dynamic request). Examples: cookies, headers, fallback params,
 * searchParams, and cache entries that are excluded only from static
 * prerenders.
 *
 * Creating one of these during a static prerender records on the prerender
 * store that a runtime prefetch would produce more content than the static
 * response (`runtimeDataAccessed`), which the segment prefetch encoding uses
 * to tell the client whether a runtime prefetch request could be skipped.
 *
 * When unsure whether data is dynamic or runtime, prefer this method — the
 * cost of over-recording is a redundant runtime prefetch request; the cost of
 * under-recording is a permanently missing one.
 *
 * `workUnitStore` may be null ONLY when the caller tracks the access itself
 * at observation time instead of creation time. This is for promises the
 * framework creates eagerly whether or not anything reads them (e.g. the
 * `searchParams` prop constructed for every page): recording at creation
 * would mark every render. Such a caller MUST call `trackRuntimeDataAccessed`
 * from every path that observes the promise (e.g. the proxy traps for
 * `then`/`status`), against the work unit store active at access time.
 *
 * For fallback-param data — data a concrete (ISR-upgraded) prerender would
 * resolve — use `makeFallbackParamsHangingPromise` instead, so the access
 * is recorded with the right effect on the static-prefetch hint.
 *
 * @internal
 */ function makeRuntimeHangingPromise(signal, route, expression, workUnitStore) {
    if (workUnitStore !== null) {
        trackRuntimeDataAccessed(workUnitStore);
    }
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
/**
 * Variant of `makeRuntimeHangingPromise` for *fallback-param* data: fallback
 * route params and values derived solely from them (`params`, `rootParams`,
 * `pathname` during a fallback prerender). Like every runtime data access it
 * records the access on the prerender store's response-level flag, but its
 * effect on the build-time static-prefetch hint differs — on a
 * fallback-upgradeable route the access is transient (a concrete prerender
 * resolves it), so it leaves the hint intact. See
 * `trackFallbackParamsAccessed`.
 *
 * As with `makeRuntimeHangingPromise`, `workUnitStore` may be null ONLY when
 * the caller tracks the access itself at observation time instead of creation
 * time, by calling `trackFallbackParamsAccessed` from every path that
 * observes the promise.
 *
 * @internal
 */ function makeFallbackParamsHangingPromise(signal, route, expression, workUnitStore) {
    if (workUnitStore !== null) {
        trackFallbackParamsAccessed(workUnitStore);
    }
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
/**
 * Constructs a promise that never resolves, standing in for data that is only
 * accessible in a later *stage* of rendering than this render reaches — e.g.
 * a prefetchable short-stale cache entry that's excluded from shells when the
 * render ends at the shell stage, or params during a runtime-prefetch render
 * that stops before the stage where params resolve.
 *
 * A render that runs through the later stage would include the data; in
 * particular a runtime prefetch renders through its later stages, so on a
 * static prerender store this records `runtimeDataAccessed`, same as
 * `makeRuntimeHangingPromise`.
 *
 * @internal
 */ function makeStageHangingPromise(signal, route, expression, workUnitStore) {
    trackRuntimeDataAccessed(workUnitStore);
    return makeHangingPromiseWithError(signal, new HangingPromiseRejectionError(route, expression));
}
/**
 * Records on a static prerender store that the render accessed a data source
 * which would have resolved during a runtime prerender. No-op for all other
 * store types.
 *
 * `makeRuntimeHangingPromise` and `makeStageHangingPromise` call this
 * automatically; call it directly only where the access is observed
 * separately from the promise's creation (see the null `workUnitStore` case
 * of `makeRuntimeHangingPromise`), or where the prerender is aborted
 * synchronously instead of hanging.
 *
 * For fallback-param data, use `trackFallbackParamsAccessed` instead. When
 * unsure, this is the conservative choice: it unconditionally clears the
 * static-prefetch hint.
 */ function trackRuntimeDataAccessed(workUnitStore) {
    trackRuntimeDataAccessedImpl(workUnitStore, false);
}
/**
 * Fallback-param variant of `trackRuntimeDataAccessed`, for accesses of
 * fallback route params and values derived solely from them. It records the
 * response-level flag all the same, but only clears the build-time
 * static-prefetch hint when the route is not fallback-upgradeable — on an
 * upgradeable route the access is transient, since ISR later produces a
 * concrete prerender that resolves it.
 */ function trackFallbackParamsAccessed(workUnitStore) {
    trackRuntimeDataAccessedImpl(workUnitStore, true);
}
function trackRuntimeDataAccessedImpl(workUnitStore, isFallbackParamAccess) {
    switch(workUnitStore.type){
        case 'prerender':
            {
                var // Response-level flag (the payload's `u`, forwarded to segment
                // responses as `needsRuntimeRequest`): resolved for every kind of
                // access — a pre-upgrade fallback response must keep reporting that
                // a runtime request would return more. The fulfillment row lands at
                // the current position in the Flight stream, which is what makes the
                // value rewindable per stage. Promise resolution is idempotent, so
                // repeated accesses are free.
                _workUnitStore_runtimeDataAccessed;
                (_workUnitStore_runtimeDataAccessed = workUnitStore.runtimeDataAccessed) == null ? void 0 : _workUnitStore_runtimeDataAccessed.resolve(true);
                // Hint cell (holds the build-constant
                // PrefetchHint.ShouldAttemptStaticPrefetch value directly): a
                // fallback-param access is transient when the route is
                // fallback-upgradeable — ISR later produces the concrete prerender a
                // static prefetch attempt would hit — so it leaves the hint intact.
                // (Until that upgrade, the response-level flag above keeps directing
                // the client to a runtime fallback; the hint only costs a wasted
                // static attempt in the interim.) Every other access clears it.
                const hintCell = workUnitStore.shouldAttemptStaticPrefetch;
                if (hintCell !== null && (!isFallbackParamAccess || !workUnitStore.isFallbackUpgradeable)) {
                    hintCell.current = false;
                }
                break;
            }
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'prerender-runtime':
        case 'validation-client':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
            break;
        default:
            workUnitStore;
    }
}
function makeClientHookHangingPromise(signal, error) {
    return makeHangingPromiseWithError(signal, error);
}
function makeHangingPromiseWithError(signal, error) {
    if (signal.aborted) {
        return Promise.reject(error);
    } else {
        const hangingPromise = new Promise((_, reject)=>{
            const boundRejection = reject.bind(null, error);
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
                currentListeners.push(boundRejection);
            } else {
                const listeners = [
                    boundRejection
                ];
                abortListenersBySignal.set(signal, listeners);
                signal.addEventListener('abort', ()=>{
                    for(let i = 0; i < listeners.length; i++){
                        listeners[i]();
                    }
                }, {
                    once: true
                });
            }
        });
        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
        // your own promise out of it you'll need to ensure you handle the error when it rejects.
        hangingPromise.catch(ignoreReject);
        return hangingPromise;
    }
}
function ignoreReject() {}
/**
 * Creates a promise that will be triggered when another promise resolves.
 * It will not emit unhandled rejections, which is important if the trigger
 * is a promise that might itself get rejected (e.g. when a prerender/render
 * are aborted due to sync IO)
 */ function makePromiseFromTrigger(trigger, value) {
    const promise = trigger.then(()=>value);
    promise.catch(ignoreReject);
    return promise;
}
function makeDevtoolsIOAwarePromise(underlying, requestStore, stage) {
    if (requestStore.stagedRendering) {
        // We resolve each stage in a timeout, so React DevTools will pick this up as IO.
        return requestStore.stagedRendering.delayUntilStage(stage, undefined, underlying);
    }
    // in React DevTools if we resolve in a setTimeout we will observe
    // the promise resolution as something that can suspend a boundary or root.
    return new Promise((resolve)=>{
        // Must use setTimeout to be considered IO React DevTools. setImmediate will not work.
        setTimeout(()=>{
            resolve(underlying);
        }, 0);
    });
}
const RENDER_STAGES_BY_DATA_KIND = {
    sessionData: _app_render_staged_rendering__WEBPACK_IMPORTED_MODULE_0__/* .RenderStage */ .D7.ShellRuntime,
    staticLinkData: _app_render_staged_rendering__WEBPACK_IMPORTED_MODULE_0__/* .RenderStage */ .D7.Static,
    runtimeLinkData: _app_render_staged_rendering__WEBPACK_IMPORTED_MODULE_0__/* .RenderStage */ .D7.Runtime
};
function applyOwnerStack(error) {
    if (false) { var _getClientReact_captureOwnerStack, _getClientReact, _getServerReact_captureOwnerStack, _getServerReact; }
    return error;
}

//# sourceMappingURL=dynamic-rendering-utils.js.map

/***/ }),

/***/ 9753:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ NextFetchEvent),
/* harmony export */   j: () => (/* binding */ getWaitUntilPromiseFromEvent)
/* harmony export */ });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9802);

const responseSymbol = Symbol('response');
const passThroughSymbol = Symbol('passThrough');
const waitUntilSymbol = Symbol('waitUntil');
class FetchEvent {
    constructor(_request, waitUntil){
        this[passThroughSymbol] = false;
        this[waitUntilSymbol] = waitUntil ? {
            kind: 'external',
            function: waitUntil
        } : {
            kind: 'internal',
            promises: []
        };
    }
    // TODO: is this dead code? NextFetchEvent never lets this get called
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    // TODO: is this dead code? passThroughSymbol is unused
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        if (this[waitUntilSymbol].kind === 'external') {
            // if we received an external waitUntil, we delegate to it
            // TODO(after): this will make us not go through `getServerError(error, 'edge-server')` in `sandbox`
            const waitUntil = this[waitUntilSymbol].function;
            return waitUntil(promise);
        } else {
            // if we didn't receive an external waitUntil, we make it work on our own
            // (and expect the caller to do something with the promises)
            this[waitUntilSymbol].promises.push(promise);
        }
    }
}
function getWaitUntilPromiseFromEvent(event) {
    return event[waitUntilSymbol].kind === 'internal' ? Promise.all(event[waitUntilSymbol].promises).then(()=>{}) : undefined;
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        var _params_context;
        super(params.request, (_params_context = params.context) == null ? void 0 : _params_context.waitUntil);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw Object.defineProperty(new _error__WEBPACK_IMPORTED_MODULE_0__/* .PageSignatureError */ .CB({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw Object.defineProperty(new _error__WEBPACK_IMPORTED_MODULE_0__/* .PageSignatureError */ .CB({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
}

//# sourceMappingURL=fetch-event.js.map

/***/ }),

/***/ 9802:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CB: () => (/* binding */ PageSignatureError),
/* harmony export */   Yq: () => (/* binding */ RemovedPageError),
/* harmony export */   l_: () => (/* binding */ RemovedUAError)
/* harmony export */ });
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1177",
            enumerable: false,
            configurable: true
        });
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1178",
            enumerable: false,
            configurable: true
        });
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1172",
            enumerable: false,
            configurable: true
        });
    }
}

//# sourceMappingURL=error.js.map

/***/ }),

/***/ 9866:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ pathHasPrefix)
/* harmony export */ });
/* harmony import */ var _parse_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(650);

/**
 * Checks if a given path starts with a given prefix. It ensures it matches
 * exactly without containing extra chars. e.g. prefix /docs should replace
 * for /docs, /docs/, /docs/a but not /docsss
 * @param path The path to check.
 * @param prefix The prefix to check against.
 */ function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname } = (0,_parse_path__WEBPACK_IMPORTED_MODULE_0__/* .parsePath */ .R)(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
} //# sourceMappingURL=path-has-prefix.js.map


/***/ }),

/***/ 9891:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ detectDomainLocale)
/* harmony export */ });
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        // remove port if present
        const domainHostname = item.domain?.split(':', 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || item.locales?.some((locale)=>locale.toLowerCase() === detectedLocale)) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(8732));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES)["middleware_src/middleware"] = __webpack_exports__;
/******/ }
]);