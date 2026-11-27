// runtime can't be in strict mode because a global variable is assign and maybe created.
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[183],{

/***/ 1454:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   register: () => (/* binding */ register)
/* harmony export */ });
/**
 * Next.js instrumentation hook — runs once when the server process boots
 * (dev and production, node runtime only).
 *
 * Starts the agent queue worker + scheduler tick eagerly so scheduled agent
 * jobs ("every Sunday 9pm, generate 20 MCQs on my weak topics") fire on time
 * without needing a first API call. Intervals are unref'd in the worker, so
 * this never holds the process open or interferes with builds.
 *
 * Edge-runtime note: Next.js compiles instrumentation for BOTH the nodejs
 * and edge runtimes. The actual startup code lives in
 * `./instrumentation-nodejs` and is dynamic-imported inside the nodejs
 * guard below (canonical Next.js pattern) so the edge bundle drops it and
 * never tries to resolve sharp/dotenv/prisma (node-only modules).
 */ async function register() {
    if (false) {}
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(1454));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES).middleware_instrumentation = __webpack_exports__;
/******/ }
]);