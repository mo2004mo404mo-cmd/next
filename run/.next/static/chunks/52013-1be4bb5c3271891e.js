"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[52013],{

/***/ 29730:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ loginAction)
/* harmony export */ });
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9339);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__);

const loginAction = /*#__PURE__*/(0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.createServerReference)("600a7820a3909e721c05ed4d6c5507d05b85ab2688", private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.callServer, undefined, private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_0__.findSourceMapURL, "loginAction")

/***/ }),

/***/ 33807:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ Label)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ Label auto */ 


function Label({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
        "data-slot": "label",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    });
}



/***/ }),

/***/ 40980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29722);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(622);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .$)(inputs));
}


/***/ }),

/***/ 52013:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _app_actions_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29730);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98500);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60529);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33807);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(27898);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(89034);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(90467);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(94088);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(13626);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(40557);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_ChevronDown_ChevronUp_Eye_EyeOff_GraduationCap_ShieldCheck_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(50981);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6170);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(52681);
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

/***/ 60529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44886);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);




function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_input__WEBPACK_IMPORTED_MODULE_2__/* .Input */ .p, {
        type: type,
        "data-slot": "input",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
        ...props
    });
}



/***/ }),

/***/ 89239:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button),
/* harmony export */   r: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35684);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18460);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);




const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_1__/* .cva */ .F)("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            icon: "size-8",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            "icon-lg": "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        "data-slot": "button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    });
}



/***/ })

}]);