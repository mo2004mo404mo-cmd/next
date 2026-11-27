(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[48148],{

/***/ 8039:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(65538);
} else {}


/***/ }),

/***/ 11707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ar-SA.json": [
		42149,
		42149
	],
	"./en-US.json": [
		56225,
		56225
	],
	"./ja-JP.json": [
		12537,
		12537
	],
	"./ko-KR.json": [
		61307,
		61307
	],
	"./pt-BR.json": [
		31796,
		31796
	],
	"./ru-RU.json": [
		58282,
		58282
	],
	"./zh-CN.json": [
		94320,
		71939
	],
	"./zh-TW.json": [
		58767,
		58767
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__.t(id, 3 | 16);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 11707;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 19015:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ supportedLocales)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/i18n/locales.ts
 *
 * Verbatim port — pure data, no deps.
 */ /**
 * Supported locales registry.
 *
 * To add a new language:
 *   1. Create `lib/i18n/locales/<code>.json` (copy an existing file as template)
 *   2. Add an entry here
 */ const supportedLocales = [
    {
        code: 'zh-CN',
        label: '简体中文',
        shortLabel: 'CN'
    },
    {
        code: 'zh-TW',
        label: '繁體中文',
        shortLabel: 'TW'
    },
    {
        code: 'en-US',
        label: 'English',
        shortLabel: 'EN'
    },
    {
        code: 'ja-JP',
        label: '日本語',
        shortLabel: 'JA'
    },
    {
        code: 'ru-RU',
        label: 'Русский',
        shortLabel: 'RU'
    },
    {
        code: 'ar-SA',
        label: 'العربية',
        shortLabel: 'AR'
    },
    {
        code: 'pt-BR',
        label: 'Português (Brasil)',
        shortLabel: 'BR'
    },
    {
        code: 'ko-KR',
        label: '한국어',
        shortLabel: 'KO'
    }
];


/***/ }),

/***/ 36188:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 71442));


/***/ }),

/***/ 63949:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ defaultLocale)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/i18n/types.ts
 *
 * Verbatim port — pure type data, no deps.
 */ const defaultLocale = 'zh-CN';


/***/ }),

/***/ 65538:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var React = __webpack_require__(12115);
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  useState = React.useState,
  useEffect = React.useEffect,
  useLayoutEffect = React.useLayoutEffect,
  useDebugValue = React.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(),
    _useState = useState({ inst: { value: value, getSnapshot: getSnapshot } }),
    inst = _useState[0].inst,
    forceUpdate = _useState[1];
  useLayoutEffect(
    function () {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect(
    function () {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      return subscribe(function () {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      });
    },
    [subscribe]
  );
  useDebugValue(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(inst, nextValue);
  } catch (error) {
    return !0;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim =
  "undefined" === typeof window ||
  "undefined" === typeof window.document ||
  "undefined" === typeof window.document.createElement
    ? useSyncExternalStore$1
    : useSyncExternalStore$2;
exports.useSyncExternalStore =
  void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;


/***/ }),

/***/ 71442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18nProvider: () => (/* binding */ I18nProvider),
/* harmony export */   s: () => (/* binding */ useI18n)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(78449);
/* harmony import */ var _lib_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95280);
/* harmony import */ var _lib_i18n_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91978);
/* __next_internal_client_entry_do_not_use__ I18nProvider,useI18n auto */ 




const LOCALE_STORAGE_KEY = 'locale';
/** Match a browser language code (e.g. 'en', 'zh-TW') to a supported locale */ function resolveLocale(lang) {
    // Exact match
    const exact = _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .supportedLocales */ .O4.find((l)=>l.code === lang);
    if (exact) return exact.code;
    // Prefix match: 'en' → 'en-US', 'zh' → 'zh-CN'
    const prefix = lang.split('-')[0].toLowerCase();
    const match = _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .supportedLocales */ .O4.find((l)=>l.code.toLowerCase().startsWith(prefix));
    return match?.code ?? _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .defaultLocale */ .q;
}
const I18nContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function I18nProvider({ children }) {
    const { t, i18n } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__/* .useTranslation */ .B)();
    const locale = i18n.language || _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .defaultLocale */ .q;
    // Detect language after hydration to avoid SSR mismatch.
    // i18next handles fallback automatically: if the detected language
    // has no matching JSON file, it falls back to fallbackLng.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
            const raw = stored || navigator.language || _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .defaultLocale */ .q;
            const target = resolveLocale(raw);
            if (target !== i18n.language) i18n.changeLanguage(target);
        } catch  {
        // localStorage unavailable, keep default
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const setLocale = (newLocale)=>{
        i18n.changeLanguage(newLocale);
        try {
            localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
        } catch  {
        // localStorage unavailable
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(I18nContext.Provider, {
        value: {
            locale,
            setLocale,
            t
        },
        children: children
    });
}
function useI18n() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within I18nProvider');
    }
    return context;
}


/***/ }),

/***/ 91978:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50931);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(94739);
/* harmony import */ var i18next_resources_to_backend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55009);
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19015);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(63949);





i18next__WEBPACK_IMPORTED_MODULE_0__/* ["default"].use */ .Ay.use(react_i18next__WEBPACK_IMPORTED_MODULE_2__/* .initReactI18next */ .r).use((0,i18next_resources_to_backend__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)((language)=>__webpack_require__(11707)(`./${language}.json`))).init({
    lng: _types__WEBPACK_IMPORTED_MODULE_4__/* .defaultLocale */ .q,
    fallbackLng: _types__WEBPACK_IMPORTED_MODULE_4__/* .defaultLocale */ .q,
    supportedLngs: _locales__WEBPACK_IMPORTED_MODULE_1__/* .supportedLocales */ .O.map((l)=>l.code),
    interpolation: {
        escapeValue: false
    }
});
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (i18n)));


/***/ }),

/***/ 95280:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O4: () => (/* reexport safe */ _locales__WEBPACK_IMPORTED_MODULE_1__.O),
/* harmony export */   q: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_0__.q)
/* harmony export */ });
/* unused harmony exports translate, getClientTranslation */
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63949);
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19015);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/i18n/index.ts
 *
 * MedQ adaptation: OpenMAIC's i18n uses i18next + react-i18next +
 * i18next-resources-to-backend to lazy-load locale JSON files. MedQ uses
 * `next-intl` (already installed) for its own UI strings and does not yet wire
 * up OpenMAIC's per-locale JSON resources. To avoid the i18next dependency tree
 * (i18next, react-i18next, i18next-resources-to-backend), this module exposes
 * the same `getClientTranslation(key)` surface as OpenMAIC's i18n, but
 * implements it as an identity function — the English fallback is returned
 * unchanged. The supported-locales registry is ported verbatim so ported
 * components that read the locale list (e.g. `use-i18n.tsx` if/when ported)
 * continue to compile.
 */ 

function translate(_locale, key) {
    return key;
}
function getClientTranslation(key) {
    return key;
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [11199,28441,93794,77358], () => (__webpack_exec__(36188)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);