"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[85061],{

/***/ 85061:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fortran_free_form_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94823);


const lang = Object.freeze(JSON.parse("{\"displayName\":\"Fortran (Fixed Form)\",\"fileTypes\":[\"f\",\"F\",\"f77\",\"F77\",\"for\",\"FOR\"],\"injections\":{\"source.fortran.fixed - ( string | comment )\":{\"patterns\":[{\"include\":\"#line-header\"},{\"include\":\"#line-end-comment\"}]}},\"name\":\"fortran-fixed-form\",\"patterns\":[{\"include\":\"#comments\"},{\"begin\":\"(?i)^(?=.{5}|(?<!^)\\\\t)\\\\s*(?:([0-9]{1,5})\\\\s+)?(format)\\\\b\",\"beginCaptures\":{\"1\":{\"name\":\"constant.numeric.fortran\"},\"2\":{\"name\":\"keyword.control.format.fortran\"}},\"end\":\"(?=^(?![^\\\\n!#]{5}\\\\S))\",\"name\":\"meta.statement.IO.fortran\",\"patterns\":[{\"include\":\"#comments\"},{\"include\":\"#line-header\"},{\"match\":\"!.*$\",\"name\":\"comment.line.fortran\"},{\"include\":\"source.fortran.free#string-constant\"},{\"include\":\"source.fortran.free#numeric-constant\"},{\"include\":\"source.fortran.free#operators\"},{\"include\":\"source.fortran.free#format-parentheses\"}]},{\"include\":\"#line-header\"},{\"include\":\"source.fortran.free\"}],\"repository\":{\"comments\":{\"patterns\":[{\"begin\":\"^[*Cc]\",\"end\":\"\\\\n\",\"name\":\"comment.line.fortran\"},{\"begin\":\"^ *!\",\"end\":\"\\\\n\",\"name\":\"comment.line.fortran\"}]},\"line-end-comment\":{\"begin\":\"(?<=^.{72})(?!\\\\n)\",\"end\":\"(?=\\\\n)\",\"name\":\"comment.line-end.fortran\"},\"line-header\":{\"captures\":{\"1\":{\"name\":\"constant.numeric.fortran\"},\"2\":{\"name\":\"keyword.line-continuation-operator.fortran\"},\"3\":{\"name\":\"source.fortran.free\"},\"4\":{\"name\":\"invalid.error.fortran\"}},\"match\":\"^(?!\\\\s*[!#])(?:([ \\\\d]{5} )|( {5}.)|(\\\\t)|(.{1,5}))\"}},\"scopeName\":\"source.fortran.fixed\",\"embeddedLangs\":[\"fortran-free-form\"],\"aliases\":[\"f\",\"for\",\"f77\"]}"))

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
..._fortran_free_form_mjs__WEBPACK_IMPORTED_MODULE_0__["default"],
lang
]);


/***/ })

}]);