"use strict";
exports.id = 8021;
exports.ids = [8021];
exports.modules = {

/***/ 128021:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_actions_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(345131);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(502116);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(288877);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(925297);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(90863);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(456052);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(120208);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(880592);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(472597);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(185448);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(269627);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(35214);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(504635);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(948581);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(495210);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(317441);
/* __next_internal_client_entry_do_not_use__ default auto */ 









function LoginForm() {
    const [state, formAction, pending] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useActionState)(_app_actions_auth__WEBPACK_IMPORTED_MODULE_6__/* .loginAction */ .i, {});
    const [showPassword, setShowPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showDemo, setShowDemo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const formRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleDemoSignIn = (email)=>{
        const form = formRef.current;
        if (!form) return;
        const emailInput = form.elements.namedItem('email');
        const passwordInput = form.elements.namedItem('password');
        if (!(emailInput instanceof HTMLInputElement) || !(passwordInput instanceof HTMLInputElement)) return;
        emailInput.value = email;
        passwordInput.value = 'test123';
        form.requestSubmit();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("main", {
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
                            className: "w-14 h-14 bg-gradient-to-br from-[#00e5a0] to-[#00b87a] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#00e5a0]/25",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: "w-7 h-7 text-[#0c0e14]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                            className: "text-2xl font-bold text-[#e8ecf4]",
                            children: "Welcome back"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-sm text-[#8b95a8] mt-1",
                            children: "Sign in to your MedQ account"
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
                            ref: formRef,
                            action: formAction,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                            htmlFor: "email",
                                            className: "text-xs text-[#8b95a8] mb-1.5 block",
                                            children: "Email address"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                            id: "email",
                                            name: "email",
                                            type: "email",
                                            placeholder: "you@example.com",
                                            autoComplete: "email",
                                            className: "h-11 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#6b7590] focus:border-[#00e5a0]/60 focus:ring-2 focus:ring-[#00e5a0]",
                                            required: true
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between mb-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                                    htmlFor: "password",
                                                    className: "text-xs text-[#8b95a8]",
                                                    children: "Password"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    href: "/forgot-password",
                                                    className: "text-xs text-[#00e5a0] hover:text-[#00d090] transition-colors",
                                                    children: "Forgot password?"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                    id: "password",
                                                    name: "password",
                                                    type: showPassword ? 'text' : 'password',
                                                    placeholder: "Enter your password",
                                                    autoComplete: "current-password",
                                                    className: "h-11 pr-14 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#6b7590] focus:border-[#00e5a0]/60 focus:ring-2 focus:ring-[#00e5a0]",
                                                    required: true
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>setShowPassword(!showPassword),
                                                    "aria-label": showPassword ? 'Hide password' : 'Show password',
                                                    "aria-pressed": showPassword,
                                                    className: "absolute right-1.5 top-1/2 -translate-y-1/2 flex min-h-[44px] min-w-[44px] items-center justify-center text-[#8b95a8] hover:text-[#e8ecf4] transition-colors",
                                                    children: showPassword ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                state.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
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
                                    className: "w-full h-11 bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50",
                                    children: pending ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "w-4 h-4 border-2 border-[#0c0e14]/30 border-t-[#0c0e14] rounded-full animate-spin"
                                            }),
                                            "Signing in..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-4 h-4 mr-2"
                                            }),
                                            "Sign In"
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3 my-5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex-1 h-px bg-white/[0.06]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] text-[#8b95a8] uppercase tracking-wider",
                                    children: "or"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex-1 h-px bg-white/[0.06]"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "border rounded-xl overflow-hidden",
                            style: {
                                borderColor: 'rgba(0,229,160,0.15)',
                                background: 'rgba(0,229,160,0.03)'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setShowDemo(!showDemo),
                                    className: "w-full flex items-center justify-between px-4 py-3 text-xs hover:bg-white/[0.02] transition-all",
                                    style: {
                                        color: '#00e5a0'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-semibold",
                                                    children: "Try a demo account"
                                                })
                                            ]
                                        }),
                                        showDemo ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_14__/* .AnimatePresence */ .N, {
                                    children: showDemo && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
                                        initial: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        animate: {
                                            height: 'auto',
                                            opacity: 1
                                        },
                                        exit: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        transition: {
                                            duration: 0.2
                                        },
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "px-4 pb-3 pt-1 space-y-2",
                                            children: [
                                                {
                                                    label: 'Student',
                                                    email: 'student@medq.com',
                                                    icon: _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A,
                                                    color: '#00e5a0'
                                                },
                                                {
                                                    label: 'Educator',
                                                    email: 'educator@medq.com',
                                                    icon: _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A,
                                                    color: '#8b5cf6'
                                                },
                                                {
                                                    label: 'Admin',
                                                    email: 'admin@medq.com',
                                                    icon: _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A,
                                                    color: '#f59e0b'
                                                }
                                            ].map((demo)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                    type: "button",
                                                    onClick: ()=>handleDemoSignIn(demo.email),
                                                    className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all hover:scale-[1.01] active:scale-[0.99]",
                                                    style: {
                                                        background: `${demo.color}10`,
                                                        border: `1px solid ${demo.color}20`
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                                            style: {
                                                                background: `${demo.color}20`
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(demo.icon, {
                                                                className: "w-4 h-4",
                                                                style: {
                                                                    color: demo.color
                                                                }
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                    className: "text-xs font-semibold text-[#e8ecf4]",
                                                                    children: demo.label
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                    className: "text-[10px] text-[#8b95a8] truncate",
                                                                    children: demo.email
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, demo.email))
                                        })
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-center text-xs text-[#8b95a8] mt-5",
                            children: [
                                "Don't have an account?",
                                ' ',
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                    href: "/signup",
                                    className: "text-[#00e5a0] hover:text-[#00d090] font-semibold transition-colors",
                                    children: "Create an account"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    className: "text-center text-[10px] text-[#8b95a8] mt-4 flex items-center justify-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
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

/***/ 345131:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ loginAction)
/* harmony export */ });
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(799829);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__);

const loginAction = /*#__PURE__*/(0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.createServerReference)("600a7820a3909e721c05ed4d6c5507d05b85ab2688", private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.callServer, undefined, private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.findSourceMapURL, "loginAction")

/***/ })

};
;