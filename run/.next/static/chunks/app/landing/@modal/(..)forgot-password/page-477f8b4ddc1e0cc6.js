(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[28671],{

/***/ 27445:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 69403));


/***/ }),

/***/ 69403:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ForgotPasswordModalPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73321);
/* harmony import */ var _components_medq_ForgotPasswordForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59336);
/* __next_internal_client_entry_do_not_use__ default auto */ 


/**
 * Intercepting route — renders ForgotPasswordForm as a modal overlay
 * when navigating to /forgot-password from within the SPA.
 */ function ForgotPasswordModalPage() {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
                onClick: ()=>router.back()
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "relative z-10 w-full max-w-md",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ForgotPasswordForm__WEBPACK_IMPORTED_MODULE_2__["default"], {})
            })
        ]
    });
}


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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [18409,68298,33697,98500,35008,17525,59336,28441,93794,77358], () => (__webpack_exec__(27445)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);