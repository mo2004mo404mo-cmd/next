"use strict";
exports.id = 2490;
exports.ids = [2490];
exports.modules = {

/***/ 170170:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ resetPasswordAction)
/* harmony export */ });
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(799829);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__);

const resetPasswordAction = /*#__PURE__*/(0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.createServerReference)("60cfe8903d4892f48ca74eb8ef3343a213c4732930", private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.callServer, undefined, private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.findSourceMapURL, "resetPasswordAction")

/***/ }),

/***/ 252490:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ForgotPasswordForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_actions_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(715851);
/* harmony import */ var _app_actions_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(170170);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(502116);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(288877);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(925297);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(90863);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(147780);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(179899);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(304870);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(197432);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(456052);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(317441);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(495210);
/* __next_internal_client_entry_do_not_use__ default auto */ 









/**
 * 3-step forgot-password flow:
 *   Step 1: Enter email → requestPasswordResetAction
 *   Step 2: Success message (in production, an email is sent)
 *   Step 3: (Dev only) If server returns devToken, show reset form
 */ function ForgotPasswordForm() {
    const [requestState, requestFormAction, requestPending] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useActionState)(_app_actions_auth__WEBPACK_IMPORTED_MODULE_6__/* .requestPasswordResetAction */ .U, {});
    const [resetState, resetFormAction, resetPending] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useActionState)(_app_actions_auth__WEBPACK_IMPORTED_MODULE_7__/* .resetPasswordAction */ .h, {});
    const [step, setStep] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [devToken, setDevToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [userId, setUserId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // When step 1 succeeds, move to step 2 (or step 3 if dev token returned)
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (requestState.success && step === 1) {
            if (requestState.devToken && requestState.userId) {
                setDevToken(requestState.devToken);
                setUserId(requestState.userId);
                setStep(3);
            } else {
                setStep(2);
            }
        }
    }, [
        requestState.success,
        requestState.devToken,
        requestState.userId,
        step
    ]);
    // When step 3 (reset) succeeds
    const resetSuccess = resetState.success && step === 3;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "min-h-screen flex items-center justify-center p-4",
        style: {
            background: '#0c0e14'
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "w-full max-w-md",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-14 h-14 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#f59e0b]/25",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                className: "w-7 h-7 text-[#0c0e14]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                            className: "text-2xl font-bold text-[#e8ecf4]",
                            children: "Reset password"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-sm text-[#5a6478] mt-1",
                            children: [
                                step === 1 && 'Enter your email to receive a reset link',
                                step === 2 && 'Check your email for the reset link',
                                step === 3 && !resetSuccess && 'Enter your new password',
                                resetSuccess && 'Password reset successfully'
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "rounded-2xl border border-white/[0.06] p-6",
                    style: {
                        background: '#151821'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__/* .AnimatePresence */ .N, {
                            mode: "wait",
                            children: [
                                step === 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
                                    initial: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: -20
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                        action: requestFormAction,
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                                        htmlFor: "reset-email",
                                                        className: "text-xs text-[#8b95a8] mb-1.5 block",
                                                        children: "Email address"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                                id: "reset-email",
                                                                name: "email",
                                                                type: "email",
                                                                placeholder: "you@example.com",
                                                                autoComplete: "email",
                                                                className: "h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#f59e0b]/30 focus:ring-[#f59e0b]/20",
                                                                required: true
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            requestState.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: -4
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                className: "text-xs text-[#ff5757] bg-[#ff5757]/10 border border-[#ff5757]/20 rounded-lg px-3 py-2",
                                                children: requestState.error
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                type: "submit",
                                                disabled: requestPending,
                                                className: "w-full h-11 bg-[#f59e0b] hover:bg-[#d97706] text-[#0c0e14] font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50",
                                                children: requestPending ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "flex items-center justify-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "w-4 h-4 border-2 border-[#0c0e14]/30 border-t-[#0c0e14] rounded-full animate-spin"
                                                        }),
                                                        "Sending..."
                                                    ]
                                                }) : 'Send Reset Link'
                                            })
                                        ]
                                    })
                                }, "step1"),
                                step === 2 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
                                    initial: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: -20
                                    },
                                    className: "text-center py-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-16 h-16 rounded-full bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-8 h-8 text-[#00e5a0]"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-sm text-[#e8ecf4] mb-1",
                                            children: "Reset link sent!"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6478] mb-6",
                                            children: "If an account exists with that email, you will receive a password reset link within a few minutes."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            href: "/login",
                                            className: "inline-flex items-center gap-1.5 text-xs text-[#00e5a0] hover:text-[#00d090] font-semibold transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                "Back to sign in"
                                            ]
                                        })
                                    ]
                                }, "step2"),
                                step === 3 && !resetSuccess && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
                                    initial: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: -20
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                        action: resetFormAction,
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                type: "hidden",
                                                name: "userId",
                                                value: userId
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                                        htmlFor: "newPassword",
                                                        className: "text-xs text-[#8b95a8] mb-1.5 block",
                                                        children: "New password"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                                id: "newPassword",
                                                                name: "newPassword",
                                                                type: "password",
                                                                placeholder: "Min. 6 characters",
                                                                autoComplete: "new-password",
                                                                className: "h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#f59e0b]/30 focus:ring-[#f59e0b]/20",
                                                                required: true,
                                                                minLength: 6
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                                        htmlFor: "confirmResetPassword",
                                                        className: "text-xs text-[#8b95a8] mb-1.5 block",
                                                        children: "Confirm new password"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                                id: "confirmResetPassword",
                                                                name: "confirmPassword",
                                                                type: "password",
                                                                placeholder: "Re-enter new password",
                                                                autoComplete: "new-password",
                                                                className: "h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#f59e0b]/30 focus:ring-[#f59e0b]/20",
                                                                required: true,
                                                                minLength: 6
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            resetState.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: -4
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                className: "text-xs text-[#ff5757] bg-[#ff5757]/10 border border-[#ff5757]/20 rounded-lg px-3 py-2",
                                                children: resetState.error
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                type: "submit",
                                                disabled: resetPending,
                                                className: "w-full h-11 bg-[#f59e0b] hover:bg-[#d97706] text-[#0c0e14] font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50",
                                                children: resetPending ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "flex items-center justify-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "w-4 h-4 border-2 border-[#0c0e14]/30 border-t-[#0c0e14] rounded-full animate-spin"
                                                        }),
                                                        "Resetting..."
                                                    ]
                                                }) : 'Reset Password'
                                            })
                                        ]
                                    })
                                }, "step3"),
                                resetSuccess && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    className: "text-center py-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-16 h-16 rounded-full bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-8 h-8 text-[#00e5a0]"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-sm text-[#e8ecf4] mb-1",
                                            children: "Password updated!"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6478] mb-6",
                                            children: "You can now sign in with your new password."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            href: "/login",
                                            className: "inline-flex items-center gap-1.5 text-xs text-[#00e5a0] hover:text-[#00d090] font-semibold transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                "Back to sign in"
                                            ]
                                        })
                                    ]
                                }, "step3b")
                            ]
                        }),
                        step === 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-center mt-5",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                href: "/login",
                                className: "inline-flex items-center gap-1.5 text-xs text-[#5a6478] hover:text-[#8b95a8] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Back to sign in"
                                ]
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    className: "text-center text-[10px] text-[#3a4055] mt-4 flex items-center justify-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle_Lock_Mail_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                            className: "w-3 h-3"
                        }),
                        "Secured with 256-bit encryption"
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 715851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ requestPasswordResetAction)
/* harmony export */ });
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(799829);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__);

const requestPasswordResetAction = /*#__PURE__*/(0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.createServerReference)("604052d047930d4367f08f43d60690b6c9181d1f1e", private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.callServer, undefined, private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.findSourceMapURL, "requestPasswordResetAction")

/***/ })

};
;