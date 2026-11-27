(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[82539],{

/***/ 5214:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "workAsyncStorage", ({
    enumerable: true,
    get: function() {
        return _workasyncstorageinstance.workAsyncStorageInstance;
    }
}));
const _workasyncstorageinstance = __webpack_require__(17828);

//# sourceMappingURL=work-async-storage.external.js.map

/***/ }),

/***/ 5828:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 33079));


/***/ }),

/***/ 16857:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ buildLucideIconForReact)
/* harmony export */ });
/* harmony import */ var _buildLucideIconNode_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91963);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
function buildLucideIconForReact(icon, params = {}) {
    return (0,_buildLucideIconNode_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(icon, {
        ...params,
        attributeNames: {
            ...params.attributeNames,
            class: "className",
            "stroke-width": "strokeWidth",
            "stroke-linecap": "strokeLinecap",
            "stroke-linejoin": "strokeLinejoin",
            "vector-effect": "vectorEffect"
        }
    });
}
 //# sourceMappingURL=buildLucideIconForReact.mjs.map


/***/ }),

/***/ 17179:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ toLucideIconData)
/* harmony export */ });
/* harmony import */ var _toKebabCase_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42997);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
function toLucideIconData(iconName, iconNode, aliases = []) {
    if (iconNode == null) {
        throw new Error("[lucide]: iconNode is required when icon name is used");
    }
    return {
        name: (0,_toKebabCase_mjs__WEBPACK_IMPORTED_MODULE_0__/* .toKebabCase */ .f)(iconName),
        size: 24,
        node: iconNode,
        ...aliases.length > 0 ? {
            aliases
        } : {}
    };
}
 //# sourceMappingURL=toLucideIconData.mjs.map


/***/ }),

/***/ 17828:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "workAsyncStorageInstance", ({
    enumerable: true,
    get: function() {
        return workAsyncStorageInstance;
    }
}));
const _asynclocalstorage = __webpack_require__(64054);
const workAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();

//# sourceMappingURL=work-async-storage-instance.js.map

/***/ }),

/***/ 21957:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "PreloadChunks", ({
    enumerable: true,
    get: function() {
        return PreloadChunks;
    }
}));
const _jsxruntime = __webpack_require__(95155);
const _reactdom = __webpack_require__(47650);
const _workasyncstorageexternal = __webpack_require__(5214);
const _encodeuripath = __webpack_require__(2451);
const _deploymentid = __webpack_require__(53887);
function PreloadChunks({ moduleIds }) {
    // Early return in client compilation and only load requestStore on server side
    if (true) {
        return null;
    }
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore === undefined) {
        return null;
    }
    const allFiles = [];
    // Search the current dynamic call unique key id in react loadable manifest,
    // and find the corresponding CSS files to preload
    if (workStore.reactLoadableManifest && moduleIds) {
        const manifest = workStore.reactLoadableManifest;
        for (const key of moduleIds){
            if (!manifest[key]) continue;
            const chunks = manifest[key].files;
            allFiles.push(...chunks);
        }
    }
    if (allFiles.length === 0) {
        return null;
    }
    const query = (0, _deploymentid.getAssetTokenQuery)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: allFiles.map((chunk)=>{
            const href = `${workStore.assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(chunk)}${query}`;
            const isCss = chunk.endsWith('.css');
            // If it's stylesheet we use `precedence` o help hoist with React Float.
            // For stylesheets we actually need to render the CSS because nothing else is going to do it so it needs to be part of the component tree.
            // The `preload` for stylesheet is not optional.
            if (isCss) {
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    // @ts-ignore
                    precedence: "dynamic",
                    href: href,
                    rel: "stylesheet",
                    as: "style",
                    nonce: workStore.nonce
                }, chunk);
            } else {
                // If it's script we use ReactDOM.preload to preload the resources
                (0, _reactdom.preload)(href, {
                    as: 'script',
                    fetchPriority: 'low',
                    nonce: workStore.nonce
                });
                return null;
            }
        })
    });
} //# sourceMappingURL=preload-chunks.js.map


/***/ }),

/***/ 23252:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ toCamelCase)
/* harmony export */ });
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toCamelCase = (string)=>{
    let out = "";
    let upperNext = false;
    for (const ch of string){
        if (ch === "-" || ch === "_" || ch <= " ") {
            upperNext = out.length > 0;
            continue;
        }
        if (out.length === 0) {
            out += ch.toLowerCase();
        } else {
            out += upperNext ? ch.toUpperCase() : ch;
        }
        upperNext = false;
    }
    return out;
};
 //# sourceMappingURL=toCamelCase.mjs.map


/***/ }),

/***/ 23963:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ useLucideContext)
/* harmony export */ });
/* unused harmony export LucideProvider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ LucideProvider,useLucideContext auto */ 
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const LucideContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
function LucideProvider({ children, size, color, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className }) {
    const value = useMemo(()=>({
            size,
            color,
            strokeWidth,
            absoluteStrokeWidth,
            nonScalingStroke,
            className
        }), [
        size,
        color,
        strokeWidth,
        absoluteStrokeWidth,
        nonScalingStroke,
        className
    ]);
    return /*#__PURE__*/ createElement(LucideContext.Provider, {
        value
    }, children);
}
const useLucideContext = ()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(LucideContext);
 //# sourceMappingURL=context.mjs.map


/***/ }),

/***/ 26846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I3: () => (/* binding */ hasRealPage),
/* harmony export */   s2: () => (/* binding */ navigateToTab),
/* harmony export */   tW: () => (/* binding */ tabHref),
/* harmony export */   ud: () => (/* binding */ REAL_PAGE_TABS)
/* harmony export */ });
/* __next_internal_client_entry_do_not_use__ REAL_PAGE_TABS,tabHref,navigateToTab,hasRealPage auto */ /**
 * Tabs extracted to real App Router pages. Those inside the (app) route
 * group render within the shared AppShellLayout, so navigating between any
 * of them keeps the sidebar/header mounted (App Router layouts persist
 * across route changes within the same layout). '/freellm' is a real route
 * that owns its full-screen dashboard layout.
 *
 * NOTE 'take-exam' is deliberately NOT here: /exam/take is only a deep-link
 * forwarding shim to /?tab=take-exam — linking there directly would add a
 * pointless redirect hop. The sidebar targets the real /?tab= URL.
 */ const REAL_PAGE_TABS = {
    'dashboard': '/home',
    'bank': '/bank',
    'generate': '/generate',
    'flashcards': '/flashcards',
    'advanced-chat': '/messages',
    'admin': '/admin',
    'ai-classroom': '/ai-classroom',
    'exam-sim': '/exam-sim',
    'pricing': '/pricing',
    'freellm': '/freellm',
    'osce': '/osce'
};
/**
 * The REAL href a navigation surface (sidebar link, bottom-nav link,
 * programmatic router.push) uses for a tab.
 *
 *   'bank'  → '/bank'   (real (app) route)
 *   'tutor' → '/?tab=tutor' (real URL — the SPA shell renders that tab)
 *
 * Every href this returns is a genuine, refresh-safe App-Router URL.
 */ function tabHref(tabId) {
    const id = String(tabId);
    if (REAL_PAGE_TABS[id]) return REAL_PAGE_TABS[id];
    return `/?tab=${encodeURIComponent(id)}`;
}
/**
 * Navigate to a MedQ tab from anywhere (command palette, AI agent events,
 * header actions). Real-page tabs stay inside the (app) layout; SPA tabs
 * hop to their real "/?tab=" URL.
 */ function navigateToTab(push, tabId) {
    push(tabHref(tabId));
}
/** True when the tab has a real standalone page (used for <Link> decisions). */ function hasRealPage(tabId) {
    return Boolean(REAL_PAGE_TABS[String(tabId)]);
}


/***/ }),

/***/ 28268:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ toPascalCase)
/* harmony export */ });
/* harmony import */ var _toCamelCase_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23252);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const toPascalCase = (string)=>{
    const camelCase = (0,_toCamelCase_mjs__WEBPACK_IMPORTED_MODULE_0__/* .toCamelCase */ .C)(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
 //# sourceMappingURL=toPascalCase.mjs.map


/***/ }),

/***/ 30071:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _shared_src_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30907);
/* harmony import */ var _shared_src_build_buildLucideIconForReact_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16857);
/* harmony import */ var _shared_src_utils_hasA11yProp_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31388);
/* harmony import */ var _context_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23963);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 




const Icon = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({ color, size, width, height, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className = "", children, iconNode = [], icon = {
    node: iconNode,
    aliases: [],
    size: 24
}, ...rest }, ref)=>{
    const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, nonScalingStroke: contextNonScalingStroke = false, color: contextColor = "currentColor", className: contextClass = "" } = (0,_context_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useLucideContext */ .T)() ?? {};
    const hasAccessibleProp = Boolean(children) || (0,_shared_src_utils_hasA11yProp_mjs__WEBPACK_IMPORTED_MODULE_2__/* .hasA11yProp */ .m)(rest);
    const [name, svgAttributes, builtIconNode = []] = (0,_shared_src_build_buildLucideIconForReact_mjs__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(icon, {
        color: color ?? contextColor,
        width: width ?? size ?? contextSize,
        height: height ?? size ?? contextSize,
        strokeWidth: strokeWidth ?? contextStrokeWidth,
        absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
        nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
        className: (0,_shared_src_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_4__/* .mergeClasses */ .z)(contextClass, className),
        hasA11yProp: hasAccessibleProp,
        attributes: rest
    });
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(name, {
        ref,
        ...svgAttributes
    }, [
        ...builtIconNode.map(([tag, attrs])=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]);
});
 //# sourceMappingURL=Icon.mjs.map


/***/ }),

/***/ 30907:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ mergeClasses)
/* harmony export */ });
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
 //# sourceMappingURL=mergeClasses.mjs.map


/***/ }),

/***/ 31388:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ hasA11yProp)
/* harmony export */ });
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
    return false;
};
 //# sourceMappingURL=hasA11yProp.mjs.map


/***/ }),

/***/ 33079:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73321);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37206);
/* harmony import */ var _barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92571);
/* harmony import */ var _lib_medq_nav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26846);
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
 */ const DashboardTab = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(18409), __webpack_require__.e(85833), __webpack_require__.e(24728), __webpack_require__.e(67984), __webpack_require__.e(63865), __webpack_require__.e(56576)]).then(__webpack_require__.bind(__webpack_require__, 63865)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(63865)
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

/***/ 34019:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ createLucideIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _shared_src_utils_toLucideIconData_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17179);
/* harmony import */ var _shared_src_utils_toPascalCase_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28268);
/* harmony import */ var _Icon_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30071);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 



function createLucideIcon(iconDataOrName, iconNode = [], aliases = []) {
    const iconData = typeof iconDataOrName === "string" ? (0,_shared_src_utils_toLucideIconData_mjs__WEBPACK_IMPORTED_MODULE_1__/* .toLucideIconData */ .d)(iconDataOrName, iconNode, aliases) : iconDataOrName;
    const Component = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon_mjs__WEBPACK_IMPORTED_MODULE_2__["default"], {
            ref,
            icon: iconData,
            className,
            ...props
        }));
    if (iconData.name) {
        Component.displayName = (0,_shared_src_utils_toPascalCase_mjs__WEBPACK_IMPORTED_MODULE_3__/* .toPascalCase */ .M)(iconData.name);
    }
    return Component;
}
 //# sourceMappingURL=createLucideIcon.mjs.map


/***/ }),

/***/ 37206:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport default from dynamic */ _shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0___default.a)
/* harmony export */ });
/* harmony import */ var _shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75707);
/* harmony import */ var _shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0__);



//# sourceMappingURL=app-dynamic.js.map

/***/ }),

/***/ 41112:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "BailoutToCSR", ({
    enumerable: true,
    get: function() {
        return BailoutToCSR;
    }
}));
const _bailouttocsr = __webpack_require__(1980);
function BailoutToCSR({ reason, children }) {
    if (false) {}
    return children;
} //# sourceMappingURL=dynamic-bailout-to-csr.js.map


/***/ }),

/***/ 42997:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ toKebabCase)
/* harmony export */ });
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toKebabCase = (string)=>string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
 //# sourceMappingURL=toKebabCase.mjs.map


/***/ }),

/***/ 52800:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
};
 //# sourceMappingURL=defaultAttributes.mjs.map


/***/ }),

/***/ 64054:
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
    bindSnapshot: function() {
        return bindSnapshot;
    },
    createAsyncLocalStorage: function() {
        return createAsyncLocalStorage;
    },
    createSnapshot: function() {
        return createSnapshot;
    }
});
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

/***/ 68635:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _default;
    }
}));
const _jsxruntime = __webpack_require__(95155);
const _react = __webpack_require__(12115);
const _dynamicbailouttocsr = __webpack_require__(41112);
const _preloadchunks = __webpack_require__(21957);
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    // Check "default" prop before accessing it, as it could be client reference proxy that could break it reference.
    // Cases:
    // mod: { default: Component }
    // mod: Component
    // mod: { default: proxy(Component) }
    // mod: proxy(Component)
    const hasDefault = mod && 'default' in mod;
    return {
        default: hasDefault ? mod.default : mod
    };
}
const defaultOptions = {
    loader: ()=>Promise.resolve(convertModule(()=>null)),
    loading: null,
    ssr: true
};
function Loadable(options) {
    const opts = {
        ...defaultOptions,
        ...options
    };
    const Lazy = /*#__PURE__*/ (0, _react.lazy)(()=>opts.loader().then(convertModule));
    const Loading = opts.loading;
    function LoadableComponent(props) {
        const fallbackElement = Loading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        // If it's non-SSR or provided a loading component, wrap it in a suspense boundary
        const hasSuspenseBoundary = !opts.ssr || !!opts.loading;
        const Wrap = hasSuspenseBoundary ? _react.Suspense : _react.Fragment;
        const wrapProps = hasSuspenseBoundary ? {
            fallback: fallbackElement
        } : {};
        const children = opts.ssr ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                 false ? /*#__PURE__*/ 0 : null,
                /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                    ...props
                })
            ]
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSR, {
            reason: "next/dynamic",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                ...props
            })
        });
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Wrap, {
            ...wrapProps,
            children: children
        });
    }
    LoadableComponent.displayName = 'LoadableComponent';
    return LoadableComponent;
}
const _default = Loadable; //# sourceMappingURL=loadable.js.map


/***/ }),

/***/ 73321:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74645);
/* harmony import */ var _client_components_navigation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__, "usePathname")) __webpack_require__.d(__webpack_exports__, { usePathname: function() { return _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__.usePathname; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__, "useRouter")) __webpack_require__.d(__webpack_exports__, { useRouter: function() { return _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__.useRouter; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__, "useSearchParams")) __webpack_require__.d(__webpack_exports__, { useSearchParams: function() { return _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__.useSearchParams; } });


//# sourceMappingURL=navigation.js.map

/***/ }),

/***/ 75707:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return dynamic;
    }
}));
const _interop_require_default = __webpack_require__(73623);
const _loadable = /*#__PURE__*/ _interop_require_default._(__webpack_require__(68635));
function dynamic(dynamicOptions, options) {
    const loadableOptions = {};
    if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    }
    const mergedOptions = {
        ...loadableOptions,
        ...options
    };
    return (0, _loadable.default)({
        ...mergedOptions,
        modules: mergedOptions.loadableGenerated?.modules
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-dynamic.js.map


/***/ }),

/***/ 91963:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ buildLucideIconNode)
/* harmony export */ });
/* harmony import */ var _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52800);
/* harmony import */ var _utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30907);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 

function isDefined(value) {
    return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
    const attributeNames = params.attributeNames ?? {};
    const getAttributeName = (attributeName)=>attributeNames[attributeName] ?? attributeName;
    const viewBoxWidth = icon.size ?? icon.width ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["width"];
    const viewBoxHeight = icon.size ?? icon.height ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["height"];
    const aliasClassNames = icon.aliases?.filter((alias)=>typeof alias === "string" && alias.trim() !== "").map((alias)=>`lucide-${alias}`) ?? [];
    const iconClassNames = [
        ...icon.name ? [
            `lucide-${icon.name}`
        ] : [],
        ...aliasClassNames
    ];
    const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
    const className = params.includeDefaultClasses === false ? (0,_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mergeClasses */ .z)(...classNamesFromClassName) : (0,_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mergeClasses */ .z)("lucide", ...iconClassNames, ...classNamesFromClassName);
    const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["stroke-width"]) * Number(icon.size ?? icon.width ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["width"]) / Number(params.size ?? params.width ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["width"]) : params.strokeWidth ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["stroke-width"];
    const attributes = {
        ...Object.entries(_defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A).reduce((attrs, [attrName, value])=>{
            attrs[getAttributeName(attrName)] = value;
            return attrs;
        }, {}),
        ..."color" in params && params.color && {
            [getAttributeName("stroke")]: params.color
        },
        ..."size" in params && isDefined(params.size) && {
            [getAttributeName("width")]: params.size,
            [getAttributeName("height")]: params.size
        },
        ..."width" in params && isDefined(params.width) && {
            [getAttributeName("width")]: params.width
        },
        ..."height" in params && isDefined(params.height) && {
            [getAttributeName("height")]: params.height
        },
        [getAttributeName("stroke-width")]: calculatedStrokeWidth,
        ...className && {
            [getAttributeName("class")]: className
        },
        [getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
        ...params.hasA11yProp === false ? {
            [getAttributeName("aria-hidden")]: "true"
        } : {},
        ..."attributes" in params && params.attributes
    };
    return [
        "svg",
        attributes,
        icon.node.map((child)=>{
            const [name, attrs, children] = child;
            const nextAttrs = params.nonScalingStroke ? {
                [getAttributeName("vector-effect")]: "non-scaling-stroke",
                ...attrs
            } : attrs;
            return children ? [
                name,
                nextAttrs,
                children
            ] : [
                name,
                nextAttrs
            ];
        })
    ];
}
 //# sourceMappingURL=buildLucideIconNode.mjs.map


/***/ }),

/***/ 92571:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LoaderCircle)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "loader-circle",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 12a9 9 0 1 1-6.219-8.56",
                key: "13zald"
            }
        ]
    ],
    aliases: [
        "loader-2"
    ]
};
__iconData.node;
const LoaderCircle = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=loader-circle.mjs.map


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [28441,93794,77358], () => (__webpack_exec__(5828)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);