"use strict";
exports.id = 9440;
exports.ids = [9440];
exports.modules = {

/***/ 81038:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(532948);
/* harmony import */ var _base_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(636839);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(114490);
/* harmony import */ var _barrel_optimize_names_CheckIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35471);
/* __next_internal_client_entry_do_not_use__ Checkbox auto */ 



function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_1__/* .CheckboxRoot */ .y, {
        "data-slot": "checkbox",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_3__/* .CheckboxIndicator */ .P, {
            "data-slot": "checkbox-indicator",
            className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {})
        })
    });
}



/***/ }),

/***/ 179440:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SignupForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_actions_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(212582);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(502116);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(288877);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(925297);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(90863);
/* harmony import */ var _components_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(81038);
/* harmony import */ var _barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(347352);
/* harmony import */ var _barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(454264);
/* harmony import */ var _barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(147780);
/* harmony import */ var _barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(197432);
/* harmony import */ var _barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(120208);
/* harmony import */ var _barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(880592);
/* harmony import */ var _barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(122442);
/* harmony import */ var _barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(456052);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(495210);
/* __next_internal_client_entry_do_not_use__ default auto */ 










function getPasswordStrength(password) {
    if (!password) return {
        label: '',
        color: '',
        width: '0%'
    };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 2) return {
        label: 'Weak',
        color: '#ff5757',
        width: '33%'
    };
    if (score <= 3) return {
        label: 'Medium',
        color: '#f59e0b',
        width: '66%'
    };
    return {
        label: 'Strong',
        color: '#00e5a0',
        width: '100%'
    };
}
function SignupForm() {
    const [state, formAction, pending] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useActionState)(_app_actions_auth__WEBPACK_IMPORTED_MODULE_7__/* .registerAction */ .O, {});
    const [showPassword, setShowPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showConfirm, setShowConfirm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const pwStrength = getPasswordStrength(password);
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
                            className: "w-14 h-14 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#8b5cf6]/25",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                className: "w-7 h-7 text-white"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                            className: "text-2xl font-bold text-[#e8ecf4]",
                            children: "Create your account"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-sm text-[#5a6478] mt-1",
                            children: "Start your medical education journey"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "rounded-2xl border border-white/[0.06] p-6",
                    style: {
                        background: '#151821'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            action: formAction,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                            htmlFor: "name",
                                            className: "text-xs text-[#8b95a8] mb-1.5 block",
                                            children: "Full name"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                    id: "name",
                                                    name: "name",
                                                    type: "text",
                                                    placeholder: "John Doe",
                                                    autoComplete: "name",
                                                    className: "h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20",
                                                    required: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                            htmlFor: "signup-email",
                                            className: "text-xs text-[#8b95a8] mb-1.5 block",
                                            children: "Email address"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                    id: "signup-email",
                                                    name: "email",
                                                    type: "email",
                                                    placeholder: "you@example.com",
                                                    autoComplete: "email",
                                                    className: "h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20",
                                                    required: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                            htmlFor: "signup-password",
                                            className: "text-xs text-[#8b95a8] mb-1.5 block",
                                            children: "Password"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                    id: "signup-password",
                                                    name: "password",
                                                    type: showPassword ? 'text' : 'password',
                                                    placeholder: "Min. 6 characters",
                                                    autoComplete: "new-password",
                                                    className: "h-11 pl-9 pr-10 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20",
                                                    required: true,
                                                    onChange: (e)=>setPassword(e.target.value)
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>setShowPassword(!showPassword),
                                                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#8b95a8] transition-colors",
                                                    children: showPassword ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    })
                                                })
                                            ]
                                        }),
                                        password && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "mt-2 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-1 rounded-full overflow-hidden",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.06)'
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_14__/* .motion */ .P.div, {
                                                        initial: {
                                                            width: 0
                                                        },
                                                        animate: {
                                                            width: pwStrength.width
                                                        },
                                                        transition: {
                                                            duration: 0.3
                                                        },
                                                        className: "h-full rounded-full",
                                                        style: {
                                                            background: pwStrength.color
                                                        }
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[10px] font-medium",
                                                    style: {
                                                        color: pwStrength.color
                                                    },
                                                    children: [
                                                        "Password strength: ",
                                                        pwStrength.label
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                            htmlFor: "confirmPassword",
                                            className: "text-xs text-[#8b95a8] mb-1.5 block",
                                            children: "Confirm password"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                    id: "confirmPassword",
                                                    name: "confirmPassword",
                                                    type: showConfirm ? 'text' : 'password',
                                                    placeholder: "Re-enter password",
                                                    autoComplete: "new-password",
                                                    className: "h-11 pl-9 pr-10 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20",
                                                    required: true
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>setShowConfirm(!showConfirm),
                                                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#8b95a8] transition-colors",
                                                    children: showConfirm ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-start gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__/* .Checkbox */ .S, {
                                            id: "agreed",
                                            name: "agreed",
                                            className: "border-[#5a6478] data-[state=checked]:bg-[#8b5cf6] data-[state=checked]:border-[#8b5cf6] mt-0.5"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                            htmlFor: "agreed",
                                            className: "text-xs text-[#8b95a8] leading-relaxed cursor-pointer",
                                            children: [
                                                "I agree to the",
                                                ' ',
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#8b5cf6] underline decoration-dotted underline-offset-2",
                                                    children: "Terms of Service"
                                                }),
                                                ' ',
                                                "and",
                                                ' ',
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#8b5cf6] underline decoration-dotted underline-offset-2",
                                                    children: "Privacy Policy"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                state.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_14__/* .motion */ .P.div, {
                                    initial: {
                                        opacity: 0,
                                        y: -4
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    className: "text-xs text-[#ff5757] bg-[#ff5757]/10 border border-[#ff5757]/20 rounded-lg px-3 py-2",
                                    children: state.error
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                    type: "submit",
                                    disabled: pending,
                                    className: "w-full h-11 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50",
                                    children: pending ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                            }),
                                            "Creating account..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                className: "w-4 h-4 mr-2"
                                            }),
                                            "Create Free Account"
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-center text-xs text-[#5a6478] mt-5",
                            children: [
                                "Already have an account?",
                                ' ',
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                    href: "/login",
                                    className: "text-[#00e5a0] hover:text-[#00d090] font-semibold transition-colors",
                                    children: "Sign in"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    className: "text-center text-[10px] text-[#3a4055] mt-4 flex items-center justify-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Eye_EyeOff_Lock_Mail_Shield_Sparkles_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
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

/***/ 212582:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ registerAction)
/* harmony export */ });
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(799829);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__);

const registerAction = /*#__PURE__*/(0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.createServerReference)("607434e8055fe724c7528c9aaf22ce6ef55cb78a22", private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.callServer, undefined, private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.findSourceMapURL, "registerAction")

/***/ })

};
;