(() => {
var exports = {};
exports.id = 2539;
exports.ids = [2539,4543];
exports.modules = {

/***/ 7323:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(819099);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(490314);
/* harmony import */ var _barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(269357);
/* harmony import */ var _lib_medq_nav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(227874);
/* __next_internal_client_entry_do_not_use__ default auto */ 





/**
 * /home — the MedQ dashboard.
 *
 * Previously this page rendered the sidebar chrome with a completely EMPTY
 * <main> (the dashboard content only existed inside the SPA root at "/").
 * Clicking "Home" in the sidebar navigated here and the user saw nothing.
 *
 * Now the page renders the real DashboardTab component (the same one the
 * SPA loads through the group-study tab loader). The shell chrome (sidebar,
 * header, bottom nav) comes from the (app) route group layout — this page
 * only owns the content area.
 *
 * The DashboardTab is lazy-loaded so the layout's first paint stays fast;
 * 'ssr: false' matches the SPA behavior (the dashboard fetches its data
 * client-side from /api/dashboard).
 */ const DashboardTab = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(async ()=>{
     true && /*require.resolve*/(583171);
}, {
    loadableGenerated: {
        modules: [
            "app/(app)/home/page.tsx -> " + "@/components/medq/DashboardTab"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex items-center justify-center py-24",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "w-6 h-6 animate-spin text-[#00e5a0]"
            })
        })
});
function HomePage() {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    /*
   * DashboardTab navigates via onNavigateToTab(tab) — e.g. "Continue
   * studying" cards, quick actions, streak CTAs. Route real-page tabs to
   * their routes (staying inside this layout); SPA tabs hop to /?tab=.
   */ const handleNavigate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((tab)=>{
        (0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_4__/* .navigateToTab */ .s2)((p)=>router.push(p), tab);
    }, [
        router
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "animate-fade-in",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DashboardTab, {
            onNavigateToTab: handleNavigate
        })
    });
}


/***/ }),

/***/ 7638:
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

/***/ 52220:
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
const _redirectstatuscode = __webpack_require__(981494);
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

/***/ 55591:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 74075:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 78335:
/***/ (() => {



/***/ }),

/***/ 106284:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 713025));


/***/ }),

/***/ 108128:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 134631:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 176484:
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
const _httpaccessfallback = __webpack_require__(7638);
const _redirecterror = __webpack_require__(52220);
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

/***/ 192864:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   routeModule: () => (/* binding */ routeModule)
/* harmony export */ });
/* harmony import */ var next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121635);
/* harmony import */ var next_dist_build_templates_app_page_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(986315);
/* harmony import */ var next_dist_server_app_render_interop_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(301020);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(961287);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","__next_app__","routeModule","handler"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

const module0 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 376537)));
const module1 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 695127)));
const module2 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const module3 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 308979)));
const module4 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 145270, 23)));
const module5 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 628193, 23)));
const module6 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 929604)));
const module7 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const module8 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 145270, 23)));
const module9 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 628193, 23)));
const module10 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 401274)));
const module11 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const page12 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 713025)));
const default13 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 297219)));


const tree = {
        children: [
        '',
        {
        children: [
        '(app)',
        {
        children: [
        'home',
        {
        children: ['__PAGE__', {}, {
          page: [page12, "/workspaces/next/run/src/app/(app)/home/page.tsx"],
          
        }]
      },
        {
        'layout': [module10, "/workspaces/next/run/src/app/(app)/home/layout.tsx"],
'global-error': [module11, "next/dist/client/components/builtin/global-error.js"],
        
      },
        []
      ],
modal: [
          '__DEFAULT__',
          {},
          {
            defaultPage: [default13, "/workspaces/next/run/src/app/(app)/@modal/default.tsx"],
          }
        ]
      },
        {
        'layout': [module6, "/workspaces/next/run/src/app/(app)/layout.tsx"],
'global-error': [module7, "next/dist/client/components/builtin/global-error.js"],
'forbidden': [module8, "next/dist/client/components/builtin/forbidden.js"],
'unauthorized': [module9, "next/dist/client/components/builtin/unauthorized.js"],
        metadata: {
    icon: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 770440)))()).default(props))],
    apple: [],
    openGraph: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 998558)))()).default(props))],
    twitter: [],
    manifest: undefined
  }
      },
        []
      ]
      },
        {
        'layout': [module0, "/workspaces/next/run/src/app/layout.tsx"],
'loading': [module1, "/workspaces/next/run/src/app/loading.tsx"],
'global-error': [module2, "next/dist/client/components/builtin/global-error.js"],
'not-found': [module3, "/workspaces/next/run/src/app/not-found.tsx"],
'forbidden': [module4, "next/dist/client/components/builtin/forbidden.js"],
'unauthorized': [module5, "next/dist/client/components/builtin/unauthorized.js"],
        metadata: {
    icon: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 770440)))()).default(props))],
    apple: [],
    openGraph: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 998558)))()).default(props))],
    twitter: [],
    manifest: undefined
  }
      },
        []
      ]
      }.children;
const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const entrypoint = (0,next_dist_build_templates_app_page_runtime__WEBPACK_IMPORTED_MODULE_1__/* .createAppPageEntrypoint */ .H)({
    tree,
    page: "/(app)/home/page",
    pathname: "/home",
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__,
    interopDefault: next_dist_server_app_render_interop_default__WEBPACK_IMPORTED_MODULE_2__/* .interopDefault */ .T
});
const __next_app__ = entrypoint.__next_app__;
const routeModule = entrypoint.routeModule;
const handler = entrypoint.handler;


//# sourceMappingURL=app-page.js.map


/***/ }),

/***/ 296487:
/***/ (() => {



/***/ }),

/***/ 297219:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalDefault)
/* harmony export */ });
/**
 * @modal parallel route default.
 *
 * Rendered when no modal route is active (the common case). Must return
 * null so the slot contributes nothing to the layout tree.
 *
 * When an intercepted route IS active — e.g. the user clicked a question in
 * /bank and was soft-navigated to /bank/[id] — Next.js renders
 * (app)/@modal/(.)bank/[id]/page.tsx into this slot instead, showing the
 * question detail as a modal over the still-mounted bank list. Pressing
 * Back (or closing the modal) soft-navigates back to /bank, the slot
 * re-renders to this default, and the modal disappears — with the list's
 * state (filters, scroll, pagination) preserved because it never unmounted.
 */ function ModalDefault() {
    return null;
}


/***/ }),

/***/ 320503:
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
    MutableRequestCookiesAdapter: function() {
        return MutableRequestCookiesAdapter;
    },
    ReadonlyRequestCookiesError: function() {
        return ReadonlyRequestCookiesError;
    },
    RequestCookiesAdapter: function() {
        return RequestCookiesAdapter;
    },
    appendMutableCookies: function() {
        return appendMutableCookies;
    },
    areCookiesMutableInCurrentPhase: function() {
        return areCookiesMutableInCurrentPhase;
    },
    createCookiesWithMutableAccessCheck: function() {
        return createCookiesWithMutableAccessCheck;
    },
    getModifiedCookieValues: function() {
        return getModifiedCookieValues;
    },
    responseCookiesToRequestCookies: function() {
        return responseCookiesToRequestCookies;
    }
});
const _cookies = __webpack_require__(191488);
const _reflect = __webpack_require__(120445);
const _workasyncstorageexternal = __webpack_require__(529294);
const _actionrevalidationkind = __webpack_require__(943014);
class ReadonlyRequestCookiesError extends Error {
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
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
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
                return _reflect.ReflectAdapter.get(target, prop, receiver);
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
    const resCookies = new _cookies.ResponseCookies(headers);
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
        const responseCookies = new _cookies.ResponseCookies(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting workStore
            const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
            if (workStore) {
                workStore.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateStaticAndDynamic;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _cookies.ResponseCookies(new Headers());
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
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
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
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
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
    const requestCookies = new _cookies.RequestCookies(new Headers());
    for (const cookie of responseCookies.getAll()){
        requestCookies.set(cookie);
    }
    return requestCookies;
}

//# sourceMappingURL=request-cookies.js.map

/***/ }),

/***/ 321820:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 328354:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 333873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 379551:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 393132:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7323));


/***/ }),

/***/ 401274:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomeLayout),
/* harmony export */   metadata: () => (/* binding */ metadata)
/* harmony export */ });
/**
 * Per-route metadata for /home (the dashboard).
 */ const metadata = {
    title: 'MedQ — Medical Question Generator',
    description: 'Your MedQ study dashboard — streaks, weak areas, recommended practice and quick actions.'
};
function HomeLayout({ children }) {
    return children;
}


/***/ }),

/***/ 419121:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 464491:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isPostpone", ({
    enumerable: true,
    get: function() {
        return isPostpone;
    }
}));
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
}

//# sourceMappingURL=is-postpone.js.map

/***/ }),

/***/ 491645:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 492305:
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
    isRequestApiAllowedInCurrentPhase: function() {
        return isRequestApiAllowedInCurrentPhase;
    },
    throwForSearchParamsAccessInUseCache: function() {
        return throwForSearchParamsAccessInUseCache;
    },
    throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
        return throwWithStaticGenerationBailoutErrorWithDynamicError;
    }
});
const _staticgenerationbailout = __webpack_require__(315693);
const _actionasyncstorageexternal = __webpack_require__(419121);
const _aftertaskasyncstorageexternal = __webpack_require__(903295);
function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
    throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
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
                const actionStore = _actionasyncstorageexternal.actionAsyncStorage.getStore();
                if (actionStore && (actionStore.isAppRoute || actionStore.isAction)) {
                    return true;
                }
                const afterTaskStore = _aftertaskasyncstorageexternal.afterTaskAsyncStorage.getStore();
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

/***/ 529294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 579646:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 583997:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 589768:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createDedupedByCallsiteServerErrorLoggerDev", ({
    enumerable: true,
    get: function() {
        return createDedupedByCallsiteServerErrorLoggerDev;
    }
}));
const _react = /*#__PURE__*/ _interop_require_wildcard(__webpack_require__(391986));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const errorRef = {
    current: null
};
// React.cache is currently only available in canary/experimental React channels.
const cache = typeof _react.cache === 'function' ? _react.cache : (fn)=>fn;
// When Cache Components is enabled, we record these as errors so that they
// are captured by the dev overlay as it's more critical to fix these
// when enabled.
const logErrorOrWarn =  false ? 0 : console.warn;
// We don't want to dedupe across requests.
// The developer might've just attempted to fix the warning so we should warn again if it still happens.
const flushCurrentErrorIfNew = cache(// eslint-disable-next-line @typescript-eslint/no-unused-vars -- cache key
(key)=>{
    try {
        logErrorOrWarn(errorRef.current);
    } finally{
        errorRef.current = null;
    }
});
function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
    return function logDedupedError(...args) {
        const message = getMessage(...args);
        if (false) { var _stack; } else {
            logErrorOrWarn(message);
        }
    };
}

//# sourceMappingURL=create-deduped-by-callsite-server-error-logger.js.map

/***/ }),

/***/ 594735:
/***/ ((module) => {

"use strict";
module.exports = require("events");

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

/***/ 646060:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external.js");

/***/ }),

/***/ 663033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 710846:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 713025:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777943);
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__);
// This file is generated by the Webpack next-flight-loader.

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"/workspaces/next/run/src/app/(app)/home/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/app/(app)/home/page.tsx",
"default",
));


/***/ }),

/***/ 741025:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");

/***/ }),

/***/ 781630:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 903295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 927910:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 943014:
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

/***/ 979428:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,4515,476,799,6655,7043,6455,2976,1068,5362,3396], () => (__webpack_exec__(192864)));
module.exports = __webpack_exports__;

})();