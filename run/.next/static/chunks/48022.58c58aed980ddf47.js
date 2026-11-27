"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[48022],{

/***/ 48022:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CallOverlayBoundary)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_PhoneOff_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4705);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * CallOverlayBoundary — a React error boundary scoped to the call overlay.
 *
 * Why: a render error anywhere inside the call overlay (e.g. a missing import,
 * like the `Calendar is not defined` crash that shipped because
 * `next.config.ts` sets `typescript.ignoreBuildErrors: true`) unmounts the
 * component tree up to the NEAREST error boundary. Without this boundary
 * the nearest one is at the app root, so one bad icon reference blanked the
 * whole messages page.
 *
 * With it, the blast radius is the overlay itself: the chat keeps working,
 * and the user sees a dismissible notice explaining the call UI failed.
 */ 

class CallOverlayBoundary extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            message: error?.message || String(error)
        };
    }
    componentDidCatch(error) {
        // Surface it in the console for debugging, same prefix as the call overlay's
        // own logging so the two read as one stream.
        console.error('[Call overlay] Call UI crashed:', error);
    }
    // Reset the boundary when a new call starts (resetKey changed) or when the
    // parent remounts children after dismissing the fallback.
    componentDidUpdate(prev) {
        if (this.state.hasError && prev.resetKey !== this.props.resetKey) {
            this.setState({
                hasError: false,
                message: null
            });
        }
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0d12]/95 p-6",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-md w-full rounded-2xl border border-[#ff5757]/30 bg-[#151821] p-6 text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5757]/15",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_PhoneOff_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                className: "h-6 w-6 text-[#ff5757]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                            className: "text-base font-semibold text-[#e8ecf4]",
                            children: "Call interface error"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "mt-2 text-xs leading-relaxed text-[#8b95a8]",
                            children: [
                                "The call window hit an unexpected error and was closed to protect your chat. Messaging is unaffected. Details:",
                                ' ',
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "break-all text-[#ff5757]/80",
                                    children: this.state.message
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: this.props.onFallbackClose,
                            className: "mt-5 w-full rounded-xl bg-[#00e5a0] px-4 py-2.5 text-sm font-medium text-[#0c0e14] hover:brightness-110",
                            children: "Back to chat"
                        })
                    ]
                })
            });
        }
        return this.props.children;
    }
    constructor(...args){
        super(...args), this.state = {
            hasError: false,
            message: null
        };
    }
}


/***/ })

}]);