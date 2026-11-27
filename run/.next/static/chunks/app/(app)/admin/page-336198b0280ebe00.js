(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[4271],{

/***/ 13276:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $v: () => (/* binding */ AlertDialogDescription),
/* harmony export */   EO: () => (/* binding */ AlertDialogContent),
/* harmony export */   Lt: () => (/* binding */ AlertDialog),
/* harmony export */   Rx: () => (/* binding */ AlertDialogAction),
/* harmony export */   Zr: () => (/* binding */ AlertDialogCancel),
/* harmony export */   ck: () => (/* binding */ AlertDialogFooter),
/* harmony export */   r7: () => (/* binding */ AlertDialogTitle),
/* harmony export */   wd: () => (/* binding */ AlertDialogHeader)
/* harmony export */ });
/* unused harmony exports AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTrigger */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58546);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32949);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45477);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(49387);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11975);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31799);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(52579);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89239);
/* __next_internal_client_entry_do_not_use__ AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogMedia,AlertDialogOverlay,AlertDialogPortal,AlertDialogTitle,AlertDialogTrigger auto */ 




function AlertDialog({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialogRoot */ .V, {
        "data-slot": "alert-dialog",
        ...props
    });
}
function AlertDialogTrigger({ ...props }) {
    return /*#__PURE__*/ _jsx(AlertDialogPrimitive.Trigger, {
        "data-slot": "alert-dialog-trigger",
        ...props
    });
}
function AlertDialogPortal({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogPortal */ .Z, {
        "data-slot": "alert-dialog-portal",
        ...props
    });
}
function AlertDialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogBackdrop */ .X, {
        "data-slot": "alert-dialog-overlay",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
        ...props
    });
}
function AlertDialogContent({ className, size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(AlertDialogPortal, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AlertDialogOverlay, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogPopup */ .h, {
                "data-slot": "alert-dialog-content",
                "data-size": size,
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props
            })
        ]
    });
}
function AlertDialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "alert-dialog-header",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
        ...props
    });
}
function AlertDialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "alert-dialog-footer",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
        ...props
    });
}
function AlertDialogMedia({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "alert-dialog-media",
        className: cn("mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6", className),
        ...props
    });
}
function AlertDialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_8__/* .DialogTitle */ .L, {
        "data-slot": "alert-dialog-title",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
        ...props
    });
}
function AlertDialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .DialogDescription */ .r, {
        "data-slot": "alert-dialog-description",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
        ...props
    });
}
function AlertDialogAction({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        "data-slot": "alert-dialog-action",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)(className),
        ...props
    });
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogClose */ .H, {
        "data-slot": "alert-dialog-cancel",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)(className),
        render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
            variant: variant,
            size: size
        }),
        ...props
    });
}



/***/ }),

/***/ 24985:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AnalyticsTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6170);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(36338);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(57465);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(93954);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(44539);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(19707);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(90639);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(28408);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(32539);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(59656);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(73140);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(90123);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(48035);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(96415);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(16746);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(70468);
/* harmony import */ var _TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64336);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66609);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31447);
/* harmony import */ var _barrel_optimize_names_Cell_recharts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(67389);
/* __next_internal_client_entry_do_not_use__ default auto */ 







/* ────────────────────── Component ────────────────────── */ function AnalyticsTab() {
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [refreshing, setRefreshing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [windowDays, setWindowDays] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(30);
    const fetchData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (showRefresh = false)=>{
        if (showRefresh) setRefreshing(true);
        else setLoading(true);
        try {
            const res = await fetch(`/api/admin/analytics?days=${windowDays}`);
            if (!res.ok) throw new Error('Failed to fetch analytics');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to load analytics');
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    }, [
        windowDays
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchData();
    }, [
        fetchData
    ]);
    /* ── Loading state ── */ if (loading && !data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                    children: [
                        0,
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-28 rounded-2xl animate-pulse",
                            style: {
                                background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                            }
                        }, i))
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "h-72 rounded-2xl animate-pulse",
                    style: {
                        background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                        border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                    }
                })
            ]
        });
    }
    if (!data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-center py-12",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: "No analytics data available."
            })
        });
    }
    const summaryCards = [
        {
            label: 'DAU (24h)',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.dau),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green
        },
        {
            label: 'MAU (30d)',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.mau),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue
        },
        {
            label: 'Total Users',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.totalUsers),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
        },
        {
            label: `New in ${windowDays}d`,
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.newUsersLastWindow),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
        }
    ];
    // Shorten date keys for x-axis labels
    const fmtDay = (s)=>{
        const d = new Date(s);
        return isNaN(d.getTime()) ? s : `${d.getMonth() + 1}/${d.getDate()}`;
    };
    // Tier breakdown chart data
    const tierData = [
        'free',
        'premium',
        'pro'
    ].map((t)=>({
            tier: t,
            users: data.tierBreakdown[t] ?? 0
        }));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: "Analytics Dashboard"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    "Generated ",
                                    (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(data.generatedAt),
                                    " \xb7 Window: ",
                                    data.windowDays,
                                    "d"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center gap-1 p-1 rounded-lg border",
                                style: {
                                    background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                    borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
                                },
                                children: [
                                    7,
                                    30,
                                    90
                                ].map((d)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setWindowDays(d),
                                        disabled: refreshing,
                                        className: "px-2.5 py-1 rounded-md text-[10px] font-medium transition-all",
                                        style: {
                                            background: windowDays === d ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green : 'transparent',
                                            color: windowDays === d ? '#0c0e14' : _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        },
                                        children: [
                                            d,
                                            "d"
                                        ]
                                    }, d))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>fetchData(true),
                                disabled: refreshing,
                                className: "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border",
                                style: {
                                    background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                    borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: `w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "hidden sm:inline",
                                        children: "Refresh"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                children: summaryCards.map((card, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            y: 16
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.35,
                            delay: i * 0.06
                        },
                        className: "rounded-2xl p-4 border",
                        style: {
                            background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                            borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center justify-between mb-2",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-9 h-9 rounded-lg flex items-center justify-center",
                                    style: {
                                        background: `${card.color}15`
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            color: card.color
                                        },
                                        children: card.icon
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-2xl font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: card.value
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] mt-0.5",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: card.label
                            })
                        ]
                    }, card.label))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                title: "Daily Active Users",
                subtitle: `DAU over the last ${data.windowDays} days`,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green
                    }
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                    width: "100%",
                    height: 260,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__/* .AreaChart */ .Q, {
                        data: data.dauSeries,
                        margin: {
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                                    id: "dauGradient",
                                    x1: "0",
                                    y1: "0",
                                    x2: "0",
                                    y2: "1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            offset: "0%",
                                            stopColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                            stopOpacity: 0.4
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            offset: "100%",
                                            stopColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                            stopOpacity: 0
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                strokeDasharray: "3 3",
                                stroke: "rgba(255,255,255,0.04)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                dataKey: "date",
                                tickFormatter: fmtDay,
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                allowDecimals: false
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                contentStyle: {
                                    background: '#1a1e2b',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                labelStyle: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                labelFormatter: (l)=>`Date: ${(0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(l)}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__/* .Area */ .Gk, {
                                type: "monotone",
                                dataKey: "users",
                                stroke: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                strokeWidth: 2,
                                fill: "url(#dauGradient)",
                                name: "DAU"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                title: "New Signups",
                subtitle: `Signups per day over the last ${data.windowDays} days`,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue
                    }
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                    width: "100%",
                    height: 240,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .BarChart */ .E, {
                        data: data.newUsersSeries,
                        margin: {
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                strokeDasharray: "3 3",
                                stroke: "rgba(255,255,255,0.04)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                dataKey: "date",
                                tickFormatter: fmtDay,
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                allowDecimals: false
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                contentStyle: {
                                    background: '#1a1e2b',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                labelStyle: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                labelFormatter: (l)=>`Date: ${(0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(l)}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__/* .Bar */ .yP, {
                                dataKey: "signups",
                                fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue,
                                name: "Signups",
                                radius: [
                                    4,
                                    4,
                                    0,
                                    0
                                ]
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "7-Day Retention",
                        subtitle: `Cohort: ${data.summary.cohortSize} user${data.summary.cohortSize === 1 ? '' : 's'} who signed up 7 days ago`,
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
                            }
                        }),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                            width: "100%",
                            height: 240,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_19__/* .LineChart */ .b, {
                                data: data.retentionCurve,
                                margin: {
                                    top: 10,
                                    right: 10,
                                    left: -10,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                        strokeDasharray: "3 3",
                                        stroke: "rgba(255,255,255,0.04)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                        dataKey: "day",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        tickFormatter: (v)=>`${v}%`,
                                        domain: [
                                            0,
                                            100
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                        contentStyle: {
                                            background: '#1a1e2b',
                                            border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                            borderRadius: 8,
                                            fontSize: 11,
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        labelStyle: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        },
                                        formatter: (v, n)=>n === 'pct' ? [
                                                `${v}%`,
                                                'Retention'
                                            ] : [
                                                v,
                                                n
                                            ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_20__/* .Line */ .N1, {
                                        type: "monotone",
                                        dataKey: "pct",
                                        stroke: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple,
                                        strokeWidth: 2.5,
                                        dot: {
                                            r: 4,
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
                                        }
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "Tier Breakdown",
                        subtitle: "Users by subscription tier (snapshot)",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
                            }
                        }),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                            width: "100%",
                            height: 240,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .BarChart */ .E, {
                                data: tierData,
                                margin: {
                                    top: 10,
                                    right: 10,
                                    left: -10,
                                    bottom: 0
                                },
                                layout: "vertical",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                        strokeDasharray: "3 3",
                                        stroke: "rgba(255,255,255,0.04)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                        type: "number",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        allowDecimals: false
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                        type: "category",
                                        dataKey: "tier",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        width: 60
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                        contentStyle: {
                                            background: '#1a1e2b',
                                            border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                            borderRadius: 8,
                                            fontSize: 11,
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        labelStyle: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__/* .Bar */ .yP, {
                                        dataKey: "users",
                                        name: "Users",
                                        radius: [
                                            0,
                                            4,
                                            4,
                                            0
                                        ],
                                        children: tierData.map((entry, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Cell_recharts__WEBPACK_IMPORTED_MODULE_22__/* .Cell */ .f, {
                                                fill: entry.tier === 'pro' ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber : entry.tier === 'premium' ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple : _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                            }, idx))
                                    })
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                title: "Feature Usage",
                subtitle: `Aggregated feature usage by category over the last ${data.windowDays} days`,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cyan
                    }
                }),
                children: data.featureUsage.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "py-10 text-center",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: "No feature usage recorded in this window."
                    })
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                    width: "100%",
                    height: Math.max(220, data.featureUsage.length * 36),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .BarChart */ .E, {
                        data: data.featureUsage,
                        layout: "vertical",
                        margin: {
                            top: 10,
                            right: 30,
                            left: 30,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                strokeDasharray: "3 3",
                                stroke: "rgba(255,255,255,0.04)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                type: "number",
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                allowDecimals: false
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                type: "category",
                                dataKey: "category",
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                width: 130
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                contentStyle: {
                                    background: '#1a1e2b',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                labelStyle: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__/* .Bar */ .yP, {
                                dataKey: "count",
                                name: "Usage Count",
                                fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cyan,
                                radius: [
                                    0,
                                    4,
                                    4,
                                    0
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}
/* ────────────────────── Helpers ────────────────────── */ // Local import of Cell — kept inline to avoid bloating the top-level import list.

function ChartCard({ title, subtitle, icon, children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .P.div, {
        initial: {
            opacity: 0,
            y: 16
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.35
        },
        className: "rounded-2xl border p-4",
        style: {
            background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
            borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-1",
                children: [
                    icon,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                        className: "text-xs font-bold",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                        },
                        children: title
                    })
                ]
            }),
            subtitle && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[10px] mb-3",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: subtitle
            }),
            children
        ]
    });
}


/***/ }),

/***/ 29991:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TR: () => (/* binding */ SelectLabel),
/* harmony export */   bq: () => (/* binding */ SelectTrigger),
/* harmony export */   eb: () => (/* binding */ SelectItem),
/* harmony export */   gC: () => (/* binding */ SelectContent),
/* harmony export */   l6: () => (/* binding */ Select),
/* harmony export */   mi: () => (/* binding */ SelectSeparator),
/* harmony export */   s3: () => (/* binding */ SelectGroup),
/* harmony export */   yv: () => (/* binding */ SelectValue)
/* harmony export */ });
/* unused harmony exports SelectScrollDownButton, SelectScrollUpButton */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(87925);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(59739);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(70943);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4835);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11699);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(29381);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(34181);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(50955);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(58585);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(76286);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(73255);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(19766);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(43208);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(54235);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(8651);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(40633);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40980);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(94088);
/* __next_internal_client_entry_do_not_use__ Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectScrollDownButton,SelectScrollUpButton,SelectSeparator,SelectTrigger,SelectValue auto */ 




const Select = _base_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .SelectRoot */ .H;
function SelectGroup({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectGroup */ .s, {
        "data-slot": "select-group",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("scroll-my-1 p-1", className),
        ...props
    });
}
function SelectValue({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_5__/* .SelectValue */ .y, {
        "data-slot": "select-value",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex flex-1 text-left", className),
        ...props
    });
}
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .b, {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_7__/* .SelectIcon */ .w, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                    className: "pointer-events-none size-4 text-muted-foreground"
                })
            })
        ]
    });
}
function SelectContent({ className, children, side = "bottom", sideOffset = 4, align = "center", alignOffset = 0, alignItemWithTrigger = true, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_9__/* .SelectPortal */ .V, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_10__/* .SelectPositioner */ .l, {
            side: side,
            sideOffset: sideOffset,
            align: align,
            alignOffset: alignOffset,
            alignItemWithTrigger: alignItemWithTrigger,
            className: "isolate z-50",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_11__/* .SelectPopup */ .t, {
                "data-slot": "select-content",
                "data-align-trigger": alignItemWithTrigger,
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollUpButton, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_12__/* .SelectList */ .B, {
                        children: children
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollDownButton, {})
                ]
            })
        })
    });
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_13__/* .SelectGroupLabel */ .M, {
        "data-slot": "select-label",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("px-1.5 py-1 text-xs text-muted-foreground", className),
        ...props
    });
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_14__/* .SelectItem */ .e, {
        "data-slot": "select-item",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_15__/* .SelectItemText */ .h, {
                className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
                children: children
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_16__/* .SelectItemIndicator */ .h, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center"
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                    className: "pointer-events-none"
                })
            })
        ]
    });
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectSeparator */ .m, {
        "data-slot": "select-separator",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("pointer-events-none -mx-1 my-1 h-px bg-border", className),
        ...props
    });
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_19__/* .SelectScrollUpArrow */ .w, {
        "data-slot": "select-scroll-up-button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {})
    });
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_21__/* .SelectScrollDownArrow */ .d, {
        "data-slot": "select-scroll-down-button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {})
    });
}



/***/ }),

/***/ 31447:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DL: () => (/* binding */ REPORT_REASON_COLORS),
/* harmony export */   IM: () => (/* binding */ getInitials),
/* harmony export */   Lp: () => (/* binding */ ADMIN_COLORS),
/* harmony export */   UK: () => (/* binding */ formatUsd),
/* harmony export */   Yq: () => (/* binding */ formatDate),
/* harmony export */   ZV: () => (/* binding */ formatNumber),
/* harmony export */   om: () => (/* binding */ formatRelative),
/* harmony export */   zC: () => (/* binding */ REPORT_STATUS_COLORS)
/* harmony export */ });
/* unused harmony exports ROLE_COLORS, TIER_COLORS, USER_STATUS_COLORS, formatDateTime */
// Shared constants & helpers for admin sub-tabs.
// Kept in one place so the sub-tab files can stay focused on layout/logic.
const ADMIN_COLORS = {
    bg: '#0c0e14',
    card: '#151821',
    cardBorder: 'rgba(255,255,255,0.06)',
    green: '#00e5a0',
    cyan: '#22d3ee',
    purple: '#8b5cf6',
    amber: '#f59e0b',
    blue: '#4fc3f7',
    red: '#ff5757',
    text: '#e8ecf4',
    muted: '#5a6478',
    dimmed: '#3a4055'
};
const ROLE_COLORS = {
    admin: ADMIN_COLORS.red,
    educator: ADMIN_COLORS.blue,
    student: ADMIN_COLORS.green
};
const TIER_COLORS = {
    free: ADMIN_COLORS.muted,
    premium: ADMIN_COLORS.purple,
    pro: ADMIN_COLORS.amber
};
const USER_STATUS_COLORS = {
    active: ADMIN_COLORS.green,
    suspended: ADMIN_COLORS.amber,
    banned: ADMIN_COLORS.red
};
const REPORT_REASON_COLORS = {
    incorrect: ADMIN_COLORS.red,
    outdated: ADMIN_COLORS.amber,
    offensive: ADMIN_COLORS.purple,
    duplicate: ADMIN_COLORS.cyan,
    other: ADMIN_COLORS.muted
};
const REPORT_STATUS_COLORS = {
    pending: ADMIN_COLORS.amber,
    reviewed: ADMIN_COLORS.blue,
    resolved: ADMIN_COLORS.green
};
function getInitials(name, email) {
    if (name) {
        const parts = name.trim().split(/\s+/);
        return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return '??';
}
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function formatDateTime(dateStr) {
    if (!dateStr) return '—';
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function formatNumber(n) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
}
function formatUsd(n) {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(2)}k`;
    return `$${n.toFixed(2)}`;
}
function formatRelative(dateStr) {
    if (!dateStr) return '—';
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return '—';
    const diff = Date.now() - d.getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return `${day}d ago`;
    return formatDate(d);
}


/***/ }),

/***/ 32792:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ TabVisibilityContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);

const TabVisibilityContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(true);


/***/ }),

/***/ 40980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29722);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(622);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .$)(inputs));
}


/***/ }),

/***/ 42763:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cf: () => (/* binding */ DialogContent),
/* harmony export */   Es: () => (/* binding */ DialogFooter),
/* harmony export */   L3: () => (/* binding */ DialogTitle),
/* harmony export */   c7: () => (/* binding */ DialogHeader),
/* harmony export */   lG: () => (/* binding */ Dialog),
/* harmony export */   rr: () => (/* binding */ DialogDescription)
/* harmony export */ });
/* unused harmony exports DialogClose, DialogOverlay, DialogPortal, DialogTrigger */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82741);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32949);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45477);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(49387);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(52579);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11975);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(31799);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89239);
/* harmony import */ var _barrel_optimize_names_XIcon_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9005);
/* __next_internal_client_entry_do_not_use__ Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogOverlay,DialogPortal,DialogTitle,DialogTrigger auto */ 





function Dialog({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .DialogRoot */ .D, {
        "data-slot": "dialog",
        ...props
    });
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ _jsx(DialogPrimitive.Trigger, {
        "data-slot": "dialog-trigger",
        ...props
    });
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogPortal */ .Z, {
        "data-slot": "dialog-portal",
        ...props
    });
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ _jsx(DialogPrimitive.Close, {
        "data-slot": "dialog-close",
        ...props
    });
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogBackdrop */ .X, {
        "data-slot": "dialog-overlay",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
        ...props
    });
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DialogPortal, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DialogOverlay, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogPopup */ .h, {
                "data-slot": "dialog-content",
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_8__/* .DialogClose */ .H, {
                        "data-slot": "dialog-close",
                        render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                            variant: "ghost",
                            className: "absolute top-2 right-2",
                            size: "icon-sm"
                        }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_XIcon_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "sr-only",
                                children: "Close"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "dialog-header",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("flex flex-col gap-2", className),
        ...props
    });
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        "data-slot": "dialog-footer",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", className),
        ...props,
        children: [
            children,
            showCloseButton && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_8__/* .DialogClose */ .H, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                    variant: "outline"
                }),
                children: "Close"
            })
        ]
    });
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogTitle */ .L, {
        "data-slot": "dialog-title",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("font-heading text-base leading-none font-medium", className),
        ...props
    });
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_11__/* .DialogDescription */ .r, {
        "data-slot": "dialog-description",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
        ...props
    });
}



/***/ }),

/***/ 45160:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Badge)
/* harmony export */ });
/* unused harmony export badgeVariants */
/* harmony import */ var _base_ui_react_merge_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40253);
/* harmony import */ var _base_ui_react_use_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41537);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18460);
/* harmony import */ var cn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52968);




const badgeVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_0__/* .cva */ .F)("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
            secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
            destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
            outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
            ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
            link: "text-primary underline-offset-4 hover:underline"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant = "default", render, ...props }) {
    return (0,_base_ui_react_use_render__WEBPACK_IMPORTED_MODULE_1__/* .useRender */ .C)({
        defaultTagName: "span",
        props: (0,_base_ui_react_merge_props__WEBPACK_IMPORTED_MODULE_2__/* .mergeProps */ .v6)({
            className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)(badgeVariants({
                variant
            }), className)
        }, props),
        render,
        state: {
            slot: "badge",
            variant
        }
    });
}



/***/ }),

/***/ 60529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 62369:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ModerationTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6170);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25494);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9083);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(11012);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(94890);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66609);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(45160);
/* harmony import */ var _components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13276);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(31447);
/* __next_internal_client_entry_do_not_use__ default auto */ 








/* ────────────────────── Component ────────────────────── */ function ModerationTab() {
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [refreshing, setRefreshing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [statusFilter, setStatusFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('pending');
    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const limit = 10;
    // Action state
    const [busyId, setBusyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [deleteTarget, setDeleteTarget] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [deleting, setDeleting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const fetchData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (showRefresh = false)=>{
        if (showRefresh) setRefreshing(true);
        else setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                status: statusFilter
            });
            const res = await fetch(`/api/admin/reports?${params}`);
            if (!res.ok) throw new Error('Failed to fetch reports');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to load moderation queue');
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    }, [
        page,
        statusFilter
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchData();
    }, [
        fetchData
    ]);
    const handleStatusUpdate = async (reportId, newStatus)=>{
        setBusyId(reportId);
        try {
            const res = await fetch(`/api/admin/reports/${reportId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || 'Failed to update report');
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Marked as ${newStatus}`);
            fetchData();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(err.message || 'Failed to update report');
        } finally{
            setBusyId(null);
        }
    };
    const handleDelete = async ()=>{
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/admin/reports/${deleteTarget.id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete report');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Report deleted');
            setDeleteTarget(null);
            fetchData();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete report');
        } finally{
            setDeleting(false);
        }
    };
    /* ── Loading state ── */ if (loading && !data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "space-y-4",
            children: [
                0,
                1,
                2
            ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "h-32 rounded-2xl animate-pulse",
                    style: {
                        background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                        border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                    }
                }, i))
        });
    }
    if (!data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-center py-12",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: "No moderation data available."
            })
        });
    }
    const reports = data.reports || [];
    const totalPages = data.totalPages || 1;
    const total = data.total || 0;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: "Content Moderation"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    "Review reported questions \xb7 ",
                                    total,
                                    " item",
                                    total === 1 ? '' : 's',
                                    " match current filter"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>fetchData(true),
                        disabled: refreshing,
                        className: "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border",
                        style: {
                            background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                            borderColor: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder,
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: `w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "hidden sm:inline",
                                children: "Refresh"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center gap-2 flex-wrap p-2 rounded-xl",
                style: {
                    background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                },
                children: [
                    {
                        key: 'pending',
                        label: 'Pending'
                    },
                    {
                        key: 'reviewed',
                        label: 'Reviewed'
                    },
                    {
                        key: 'resolved',
                        label: 'Resolved'
                    },
                    {
                        key: 'all',
                        label: 'All'
                    }
                ].map((opt)=>{
                    const isActive = statusFilter === opt.key;
                    const count = opt.key === 'all' ? total : data.statusBreakdown[opt.key] ?? 0;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>{
                            setStatusFilter(opt.key);
                            setPage(1);
                        },
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all",
                        style: {
                            background: isActive ? _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.amber : 'transparent',
                            color: isActive ? '#0c0e14' : _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: [
                            opt.label,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "px-1.5 py-0.5 rounded-full text-[9px] font-bold",
                                style: {
                                    background: isActive ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.05)',
                                    color: isActive ? '#0c0e14' : _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: count
                            })
                        ]
                    }, opt.key);
                })
            }),
            reports.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl py-16 text-center",
                style: {
                    background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                        className: "w-8 h-8 mx-auto mb-2",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.green
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs font-medium",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                        },
                        children: "All clear!"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] mt-1",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: "No reports match this filter."
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "space-y-3",
                children: reports.map((report, idx)=>{
                    const reasonColor = _shared__WEBPACK_IMPORTED_MODULE_6__/* .REPORT_REASON_COLORS */ .DL[report.reason] ?? _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted;
                    const statusColor = _shared__WEBPACK_IMPORTED_MODULE_6__/* .REPORT_STATUS_COLORS */ .zC[report.status] ?? _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted;
                    const isBusy = busyId === report.id;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            y: 12
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.25,
                            delay: idx * 0.03
                        },
                        className: "rounded-2xl border p-4",
                        style: {
                            background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                            borderColor: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start justify-between gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                                                style: {
                                                    background: `${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.blue}20`,
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.blue
                                                },
                                                children: (0,_shared__WEBPACK_IMPORTED_MODULE_6__/* .getInitials */ .IM)(report.user.name, report.user.email)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs font-medium",
                                                        style: {
                                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                                                        },
                                                        children: report.user.name || report.user.email || 'Unknown reporter'
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-[10px]",
                                                        style: {
                                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                                        },
                                                        children: [
                                                            (0,_shared__WEBPACK_IMPORTED_MODULE_6__/* .formatRelative */ .om)(report.createdAt),
                                                            " \xb7 ",
                                                            (0,_shared__WEBPACK_IMPORTED_MODULE_6__/* .formatDate */ .Yq)(report.createdAt)
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_4__/* .Badge */ .E, {
                                                variant: "outline",
                                                className: "text-[9px] uppercase tracking-wider font-semibold",
                                                style: {
                                                    background: `${reasonColor}15`,
                                                    color: reasonColor,
                                                    borderColor: `${reasonColor}30`
                                                },
                                                children: report.reason
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_4__/* .Badge */ .E, {
                                                variant: "outline",
                                                className: "text-[9px] uppercase tracking-wider font-semibold",
                                                style: {
                                                    background: `${statusColor}15`,
                                                    color: statusColor,
                                                    borderColor: `${statusColor}30`
                                                },
                                                children: report.status
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-lg p-3 mb-3",
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded",
                                                style: {
                                                    background: `${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.purple}15`,
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.purple
                                                },
                                                children: report.question.type
                                            }),
                                            report.question.system && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[10px]",
                                                style: {
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                                },
                                                children: [
                                                    report.question.system,
                                                    report.question.topic ? ` · ${report.question.topic}` : ''
                                                ]
                                            }),
                                            report.question.isAIGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded",
                                                style: {
                                                    background: `${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cyan}15`,
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cyan
                                                },
                                                children: "AI"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs leading-relaxed",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        children: report.question.text || /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("em", {
                                            style: {
                                                color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.dimmed
                                            },
                                            children: "(empty question text)"
                                        })
                                    })
                                ]
                            }),
                            report.comment && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-[11px] italic",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                        },
                                        children: [
                                            "“",
                                            report.comment,
                                            "”"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-end gap-2",
                                children: [
                                    report.status !== 'reviewed' && report.status !== 'resolved' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        size: "sm",
                                        variant: "ghost",
                                        onClick: ()=>handleStatusUpdate(report.id, 'reviewed'),
                                        disabled: isBusy,
                                        className: "h-7 px-2.5 text-[11px]",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.blue
                                        },
                                        children: [
                                            isBusy ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1"
                                            }),
                                            "Mark Reviewed"
                                        ]
                                    }),
                                    report.status !== 'resolved' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        size: "sm",
                                        onClick: ()=>handleStatusUpdate(report.id, 'resolved'),
                                        disabled: isBusy,
                                        className: "h-7 px-2.5 text-[11px]",
                                        style: {
                                            background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.green,
                                            color: '#0c0e14'
                                        },
                                        children: [
                                            isBusy ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1"
                                            }),
                                            "Resolve"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        size: "sm",
                                        variant: "ghost",
                                        onClick: ()=>setDeleteTarget(report),
                                        disabled: isBusy,
                                        className: "h-7 px-2.5 text-[11px]",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.red
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1"
                                            }),
                                            "Delete"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, report.id);
                })
            }),
            totalPages > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between px-4 py-3 rounded-2xl",
                style: {
                    background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "text-[10px]",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: [
                            "Page ",
                            page,
                            " of ",
                            totalPages
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>setPage(Math.max(1, page - 1)),
                                disabled: page <= 1,
                                className: "h-8 px-2 text-xs",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: "Previous"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>setPage(Math.min(totalPages, page + 1)),
                                disabled: page >= totalPages,
                                className: "h-8 px-2 text-xs",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: "Next"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialog */ .Lt, {
                open: !!deleteTarget,
                onOpenChange: (open)=>{
                    if (!open) setDeleteTarget(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: '#1a1e2b',
                        borderColor: 'rgba(255,255,255,0.1)',
                        color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.red
                                                }
                                            }),
                                            "Delete Report"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                    },
                                    children: "Permanently delete this report? This removes it from the audit queue but keeps the underlying question intact."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted,
                                        borderColor: 'rgba(255,255,255,0.1)'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDelete,
                                    disabled: deleting,
                                    style: {
                                        background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.red,
                                        color: '#fff'
                                    },
                                    children: deleting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Deleting..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Delete Report"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 64336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ TabResponsiveContainer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82069);
/* harmony import */ var _TabVisibilityContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32792);
/* __next_internal_client_entry_do_not_use__ TabResponsiveContainer auto */ 



function TabResponsiveContainer(props) {
    const isTabVisible = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_TabVisibilityContext__WEBPACK_IMPORTED_MODULE_2__/* .TabVisibilityContext */ .z);
    return isTabVisible ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_3__/* .ResponsiveContainer */ .u, {
        ...props
    }) : null;
}


/***/ }),

/***/ 65777:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RevenueTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6170);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(98993);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(63199);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16294);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(71019);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(93954);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(57465);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(35484);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(90639);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(28408);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(32539);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(59656);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(73140);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(90123);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(31962);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(68022);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(67389);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(48035);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(96415);
/* harmony import */ var _TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64336);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66609);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31447);
/* __next_internal_client_entry_do_not_use__ default auto */ 







/* ────────────────────── Component ────────────────────── */ function RevenueTab() {
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [refreshing, setRefreshing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [windowDays, setWindowDays] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(30);
    const fetchData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (showRefresh = false)=>{
        if (showRefresh) setRefreshing(true);
        else setLoading(true);
        try {
            const res = await fetch(`/api/admin/revenue?days=${windowDays}`);
            if (!res.ok) throw new Error('Failed to fetch revenue');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to load revenue data');
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    }, [
        windowDays
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchData();
    }, [
        fetchData
    ]);
    if (loading && !data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                    children: [
                        0,
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-28 rounded-2xl animate-pulse",
                            style: {
                                background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                            }
                        }, i))
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "h-72 rounded-2xl animate-pulse",
                    style: {
                        background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                        border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                    }
                })
            ]
        });
    }
    if (!data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-center py-12",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: "No revenue data available."
            })
        });
    }
    const summaryCards = [
        {
            label: 'Total Revenue (USD)',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatUsd */ .UK)(data.summary.totalUsd),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
            sub: `${data.summary.paidOrders} paid order${data.summary.paidOrders === 1 ? '' : 's'}`
        },
        {
            label: 'Credits Earned (Ad Pool)',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.totalCreditsEarned),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber,
            sub: 'GroupAdRevenueShare'
        },
        {
            label: 'Credits in Wallets',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.totalCreditsInWallets),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cyan,
            sub: `${data.summary.walletCount} wallet${data.summary.walletCount === 1 ? '' : 's'}`
        },
        {
            label: 'Pending Orders',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.pendingOrders),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple,
            sub: `${data.summary.refundedOrders} refunded`
        }
    ];
    const fmtDay = (s)=>{
        const d = new Date(s);
        return isNaN(d.getTime()) ? s : `${d.getMonth() + 1}/${d.getDate()}`;
    };
    // Pie data for payment breakdown
    const paymentPie = [
        {
            name: 'Subscription',
            value: data.paymentBreakdown.subscription.usd,
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
        },
        {
            name: 'Credits',
            value: data.paymentBreakdown.credits.usd,
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
        }
    ].filter((d)=>d.value > 0);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: "Revenue Tracking"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    "Generated ",
                                    (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(data.generatedAt),
                                    " \xb7 Window: ",
                                    data.windowDays,
                                    "d"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center gap-1 p-1 rounded-lg border",
                                style: {
                                    background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                    borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
                                },
                                children: [
                                    7,
                                    30,
                                    90
                                ].map((d)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setWindowDays(d),
                                        disabled: refreshing,
                                        className: "px-2.5 py-1 rounded-md text-[10px] font-medium transition-all",
                                        style: {
                                            background: windowDays === d ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green : 'transparent',
                                            color: windowDays === d ? '#0c0e14' : _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        },
                                        children: [
                                            d,
                                            "d"
                                        ]
                                    }, d))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>fetchData(true),
                                disabled: refreshing,
                                className: "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border",
                                style: {
                                    background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                    borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: `w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "hidden sm:inline",
                                        children: "Refresh"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                children: summaryCards.map((card, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            y: 16
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.35,
                            delay: i * 0.06
                        },
                        className: "rounded-2xl p-4 border",
                        style: {
                            background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                            borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center justify-between mb-2",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-9 h-9 rounded-lg flex items-center justify-center",
                                    style: {
                                        background: `${card.color}15`
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            color: card.color
                                        },
                                        children: card.icon
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-2xl font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: card.value
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] mt-0.5",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: card.label
                            }),
                            card.sub && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[9px] mt-1",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.dimmed
                                },
                                children: card.sub
                            })
                        ]
                    }, card.label))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                title: "Revenue (USD)",
                subtitle: `Daily revenue over the last ${data.windowDays} days`,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green
                    }
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                    width: "100%",
                    height: 260,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .AreaChart */ .Q, {
                        data: data.dailySeries,
                        margin: {
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                                    id: "usdGradient",
                                    x1: "0",
                                    y1: "0",
                                    x2: "0",
                                    y2: "1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            offset: "0%",
                                            stopColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                            stopOpacity: 0.4
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            offset: "100%",
                                            stopColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                            stopOpacity: 0
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .CartesianGrid */ .d, {
                                strokeDasharray: "3 3",
                                stroke: "rgba(255,255,255,0.04)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .XAxis */ .W, {
                                dataKey: "date",
                                tickFormatter: fmtDay,
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__/* .YAxis */ .h, {
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                tickFormatter: (v)=>`$${v}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .Tooltip */ .m, {
                                contentStyle: {
                                    background: '#1a1e2b',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                labelStyle: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                labelFormatter: (l)=>`Date: ${(0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(l)}`,
                                formatter: (v)=>[
                                        `$${Number(v).toFixed(2)}`,
                                        'Revenue'
                                    ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__/* .Area */ .Gk, {
                                type: "monotone",
                                dataKey: "usd",
                                stroke: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                strokeWidth: 2,
                                fill: "url(#usdGradient)",
                                name: "Revenue (USD)"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ChartCard, {
                        title: "Payment Breakdown",
                        subtitle: "Subscription vs credit-pack purchases",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
                            }
                        }),
                        children: [
                            paymentPie.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyChart, {
                                label: "No paid orders in this window."
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                                width: "100%",
                                height: 240,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_18__/* .PieChart */ .r, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_19__/* .Pie */ .Fq, {
                                            data: paymentPie,
                                            dataKey: "value",
                                            nameKey: "name",
                                            cx: "50%",
                                            cy: "50%",
                                            innerRadius: 50,
                                            outerRadius: 90,
                                            paddingAngle: 3,
                                            children: paymentPie.map((entry, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_20__/* .Cell */ .f, {
                                                    fill: entry.color
                                                }, idx))
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .Tooltip */ .m, {
                                            contentStyle: {
                                                background: '#1a1e2b',
                                                border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                                borderRadius: 8,
                                                fontSize: 11,
                                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                            },
                                            formatter: (v, n)=>[
                                                    `$${Number(v).toFixed(2)}`,
                                                    n
                                                ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mt-3 space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PaymentRow, {
                                        label: "Subscription",
                                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple,
                                        count: data.paymentBreakdown.subscription.count,
                                        usd: data.paymentBreakdown.subscription.usd
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PaymentRow, {
                                        label: "Credit Packs",
                                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber,
                                        count: data.paymentBreakdown.credits.count,
                                        usd: data.paymentBreakdown.credits.usd
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "Top Ad-Pool Earners",
                        subtitle: "Top 10 users by GroupAdRevenueShare credits earned",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
                            }
                        }),
                        children: data.topPayouts.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyChart, {
                            label: "No ad-pool payouts in this window."
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2 max-h-72 overflow-y-auto pr-1",
                            children: data.topPayouts.map((p, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between gap-3 p-2 rounded-lg",
                                    style: {
                                        background: 'rgba(255,255,255,0.02)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[10px] font-bold w-5 text-center flex-shrink-0",
                                                    style: {
                                                        color: idx < 3 ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber : _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.dimmed
                                                    },
                                                    children: idx + 1
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                                                    style: {
                                                        background: `${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue}20`,
                                                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue
                                                    },
                                                    children: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .getInitials */ .IM)(p.name, p.email)
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs font-medium truncate",
                                                            style: {
                                                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                                            },
                                                            children: p.name || 'Unnamed'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[10px] truncate",
                                                            style: {
                                                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                                            },
                                                            children: p.email || '—'
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs font-bold flex-shrink-0",
                                            style: {
                                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
                                            },
                                            children: [
                                                (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(p.credits),
                                                " cr"
                                            ]
                                        })
                                    ]
                                }, p.userId))
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "Credits Earned",
                        subtitle: "By category over the window",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green
                            }
                        }),
                        children: data.creditFlow.earnedByCategory.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyChart, {
                            label: "No credit earnings recorded."
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                            width: "100%",
                            height: Math.max(220, data.creditFlow.earnedByCategory.length * 36),
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_22__/* .BarChart */ .E, {
                                data: data.creditFlow.earnedByCategory,
                                layout: "vertical",
                                margin: {
                                    top: 10,
                                    right: 20,
                                    left: 30,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .CartesianGrid */ .d, {
                                        strokeDasharray: "3 3",
                                        stroke: "rgba(255,255,255,0.04)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .XAxis */ .W, {
                                        type: "number",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        allowDecimals: false
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__/* .YAxis */ .h, {
                                        type: "category",
                                        dataKey: "category",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        width: 130
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .Tooltip */ .m, {
                                        contentStyle: {
                                            background: '#1a1e2b',
                                            border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                            borderRadius: 8,
                                            fontSize: 11,
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        labelStyle: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_23__/* .Bar */ .yP, {
                                        dataKey: "amount",
                                        name: "Credits Earned",
                                        fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                        radius: [
                                            0,
                                            4,
                                            4,
                                            0
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "Credits Spent",
                        subtitle: "By category over the window",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.red
                            }
                        }),
                        children: data.creditFlow.spentByCategory.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyChart, {
                            label: "No credit spending recorded."
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                            width: "100%",
                            height: Math.max(220, data.creditFlow.spentByCategory.length * 36),
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_22__/* .BarChart */ .E, {
                                data: data.creditFlow.spentByCategory,
                                layout: "vertical",
                                margin: {
                                    top: 10,
                                    right: 20,
                                    left: 30,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .CartesianGrid */ .d, {
                                        strokeDasharray: "3 3",
                                        stroke: "rgba(255,255,255,0.04)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .XAxis */ .W, {
                                        type: "number",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        allowDecimals: false
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__/* .YAxis */ .h, {
                                        type: "category",
                                        dataKey: "category",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        width: 130
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .Tooltip */ .m, {
                                        contentStyle: {
                                            background: '#1a1e2b',
                                            border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                            borderRadius: 8,
                                            fontSize: 11,
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        labelStyle: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_23__/* .Bar */ .yP, {
                                        dataKey: "amount",
                                        name: "Credits Spent",
                                        fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.red,
                                        radius: [
                                            0,
                                            4,
                                            4,
                                            0
                                        ]
                                    })
                                ]
                            })
                        })
                    })
                ]
            }),
            data.summary.refundedOrders > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-3 p-3 rounded-xl",
                style: {
                    background: `${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber}10`,
                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber}40`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                        className: "w-4 h-4 mt-0.5 flex-shrink-0",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xs font-medium",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: [
                                    data.summary.refundedOrders,
                                    " refunded order",
                                    data.summary.refundedOrders === 1 ? '' : 's',
                                    " in this window."
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] mt-0.5",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: "Refunds are not deducted from the totals above. Investigate each refund in the audit log."
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
/* ────────────────────── Helpers ────────────────────── */ function ChartCard({ title, subtitle, icon, children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
        initial: {
            opacity: 0,
            y: 16
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.35
        },
        className: "rounded-2xl border p-4",
        style: {
            background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
            borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-1",
                children: [
                    icon,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                        className: "text-xs font-bold",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                        },
                        children: title
                    })
                ]
            }),
            subtitle && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[10px] mb-3",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: subtitle
            }),
            children
        ]
    });
}
function EmptyChart({ label }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "h-32 flex items-center justify-center",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-[11px]",
            style: {
                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.dimmed
            },
            children: label
        })
    });
}
function PaymentRow({ label, color, count, usd }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between text-[11px]",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "w-2.5 h-2.5 rounded-sm",
                        style: {
                            background: color
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                        },
                        children: label
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.dimmed
                        },
                        children: [
                            "(",
                            count,
                            ")"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "font-semibold",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                },
                children: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatUsd */ .UK)(usd)
            })
        ]
    });
}


/***/ }),

/***/ 77028:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 80562));


/***/ }),

/***/ 80562:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdminTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(6170);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(52681);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(52920);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(86210);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(58777);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(14929);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(93954);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(6073);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(36565);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(88074);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(18986);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(81402);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(11012);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(7351);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(98993);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(80167);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(36619);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(79267);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(54540);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(19928);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(32159);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(68562);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(29450);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(78780);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(76721);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(9107);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(70233);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(57465);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(69072);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(34018);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(71019);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(36338);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(6923);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(79762);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(9083);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(94774);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(58858);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(47391);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(81499);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66609);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60529);
/* harmony import */ var _components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(86846);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29991);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(37206);
/* harmony import */ var _compliance_ComplianceDashboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(85635);
/* harmony import */ var _AnalyticsTab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24985);
/* harmony import */ var _ModerationTab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(62369);
/* harmony import */ var _RevenueTab__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(65777);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(42763);
/* harmony import */ var _components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(13276);
/* __next_internal_client_entry_do_not_use__ default auto */ 










// ── New admin sub-tabs (analytics, moderation, revenue) ──



// Lazy-load the OBJ Model Viewer for preview dialogs (avoids heavy Three.js in initial bundle)
const OBJModelViewer = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_7__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(89367), __webpack_require__.e(61831), __webpack_require__.e(69970), __webpack_require__.e(49472), __webpack_require__.e(47628)]).then(__webpack_require__.bind(__webpack_require__, 47628)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(47628)
            ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex items-center justify-center h-64 rounded-lg",
            style: {
                background: 'var(--medq-app-bg, #0c0e14)'
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                        className: "w-6 h-6 animate-spin mx-auto mb-2",
                        style: {
                            color: COLORS.cyan
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px]",
                        style: {
                            color: COLORS.muted
                        },
                        children: "Loading 3D Viewer..."
                    })
                ]
            })
        })
});


/* ────────────────────────────── Color Constants ────────────────────────────── */ const COLORS = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    amber: 'var(--medq-accent-amber, #f59e0b)',
    blue: '#4fc3f7',
    red: 'var(--medq-accent-danger, #ff5757)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    dimmed: 'var(--medq-dimmed, #3a4055)'
};
const ROLE_COLORS = {
    admin: COLORS.red,
    educator: COLORS.blue,
    student: COLORS.green
};
const TIER_COLORS = {
    free: COLORS.muted,
    premium: COLORS.purple,
    pro: COLORS.amber
};
const STATUS_COLORS = {
    active: COLORS.green,
    paused: COLORS.amber,
    archived: COLORS.muted
};
// User moderation status colors (ban/suspend system)
const USER_STATUS_COLORS = {
    active: COLORS.green,
    suspended: COLORS.amber,
    banned: COLORS.red
};
const ADTYPE_COLORS = {
    banner: COLORS.blue,
    interstitial: COLORS.purple,
    rewarded: COLORS.amber,
    native: COLORS.cyan
};
/* ────────────────────────────── Helpers ────────────────────────────── */ function getInitials(name, email) {
    if (name) {
        const parts = name.trim().split(/\s+/);
        return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return '??';
}
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function formatNumber(n) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
}
function getTypeIcon(type) {
    switch(type){
        case 'color':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                className: "w-3.5 h-3.5"
            });
        case 'image':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                className: "w-3.5 h-3.5"
            });
        case 'json':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                className: "w-3.5 h-3.5"
            });
        default:
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                className: "w-3.5 h-3.5"
            });
    }
}
function getTypeColor(type) {
    switch(type){
        case 'color':
            return COLORS.purple;
        case 'image':
            return COLORS.cyan;
        case 'json':
            return COLORS.amber;
        default:
            return COLORS.green;
    }
}
/* ────────────────────────────── Trend Indicator ────────────────────────────── */ function TrendIndicator({ value }) {
    if (value > 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "inline-flex items-center gap-0.5 text-[10px] font-medium",
            style: {
                color: COLORS.green
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                    className: "w-3 h-3"
                }),
                "+",
                value,
                "%"
            ]
        });
    }
    if (value < 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "inline-flex items-center gap-0.5 text-[10px] font-medium",
            style: {
                color: COLORS.red
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                    className: "w-3 h-3"
                }),
                value,
                "%"
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: "inline-flex items-center gap-0.5 text-[10px] font-medium",
        style: {
            color: COLORS.muted
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                className: "w-3 h-3"
            }),
            "0%"
        ]
    });
}
/* ────────────────────────────── Stat Card ────────────────────────────── */ function StatCard({ label, value, icon, color, bgColor, trend, index }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.4,
            delay: index * 0.08,
            ease: 'easeOut'
        },
        className: "rounded-2xl p-4 border transition-all hover:border-white/[0.1]",
        style: {
            background: COLORS.card,
            borderColor: COLORS.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-9 h-9 rounded-lg flex items-center justify-center",
                        style: {
                            background: bgColor,
                            color
                        },
                        children: icon
                    }),
                    trend !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TrendIndicator, {
                        value: trend
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-2xl font-bold tracking-tight",
                style: {
                    color: COLORS.text
                },
                children: typeof value === 'number' ? formatNumber(value) : value
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[10px] mt-0.5 font-medium",
                style: {
                    color: COLORS.muted
                },
                children: label
            })
        ]
    });
}
/* ────────────────────────────── Loading Skeletons ────────────────────────────── */ function StatsSkeleton() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3",
        children: Array.from({
            length: 5
        }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl p-4 border",
                style: {
                    background: COLORS.card,
                    borderColor: COLORS.cardBorder
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                        className: "h-9 w-9 rounded-lg mb-3",
                        style: {
                            background: 'rgba(255,255,255,0.06)'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                        className: "h-7 w-16 mb-1",
                        style: {
                            background: 'rgba(255,255,255,0.06)'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                        className: "h-3 w-20",
                        style: {
                            background: 'rgba(255,255,255,0.04)'
                        }
                    })
                ]
            }, i))
    });
}
function TableSkeleton() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-2xl border p-6",
        style: {
            background: COLORS.card,
            borderColor: COLORS.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center gap-3 mb-4",
                children: Array.from({
                    length: 3
                }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                        className: "h-9 w-32 rounded-lg",
                        style: {
                            background: 'rgba(255,255,255,0.06)'
                        }
                    }, i))
            }),
            Array.from({
                length: 8
            }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                    className: "h-12 w-full mb-2 rounded-lg",
                    style: {
                        background: 'rgba(255,255,255,0.03)'
                    }
                }, i))
        ]
    });
}
/* ══════════════════════════════════════════════════════════════════════════════
   SETTINGS TAB
   ══════════════════════════════════════════════════════════════════════════════ */ function SettingsTab() {
    const [settings, setSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [editSetting, setEditSetting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editValue, setEditValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editLabel, setEditLabel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editType, setEditType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('text');
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showCreate, setShowCreate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [newKey, setNewKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [newValue, setNewValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [newLabel, setNewLabel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [newType, setNewType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('text');
    const [deleteKey, setDeleteKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const fetchSettings = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/admin/settings');
            if (res.ok) {
                const data = await res.json();
                setSettings(data.settings || []);
            }
        } catch (err) {
            console.error('Failed to fetch settings:', err);
        } finally{
            setLoading(false);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchSettings();
    }, [
        fetchSettings
    ]);
    const handleEdit = (setting)=>{
        setEditSetting(setting);
        setEditValue(setting.value);
        setEditLabel(setting.label);
        setEditType(setting.type);
    };
    const handleSaveEdit = async ()=>{
        if (!editSetting) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/settings/${encodeURIComponent(editSetting.key)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: editValue,
                    label: editLabel,
                    type: editType
                })
            });
            if (!res.ok) throw new Error('Failed to update setting');
            // If favicon_url was changed, update the document favicon
            if (editSetting.key === 'favicon_url' && editValue) {
                const link = document.querySelector('link[rel="icon"]');
                if (link) {
                    link.setAttribute('href', editValue);
                } else {
                    const newLink = document.createElement('link');
                    newLink.rel = 'icon';
                    newLink.href = editValue;
                    document.head.appendChild(newLink);
                }
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Setting "${editSetting.key}" updated`);
            setEditSetting(null);
            fetchSettings();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update setting');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleCreate = async ()=>{
        if (!newKey.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Key is required');
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key: newKey,
                    value: newValue,
                    type: newType,
                    label: newLabel
                })
            });
            if (!res.ok) throw new Error('Failed to create setting');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Setting "${newKey}" created`);
            setShowCreate(false);
            setNewKey('');
            setNewValue('');
            setNewLabel('');
            setNewType('text');
            fetchSettings();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to create setting');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleDelete = async ()=>{
        if (!deleteKey) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/settings/${encodeURIComponent(deleteKey)}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete setting');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Setting "${deleteKey}" deleted`);
            setDeleteKey(null);
            fetchSettings();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete setting');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            children: Array.from({
                length: 6
            }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "rounded-2xl p-5 border",
                    style: {
                        background: COLORS.card,
                        borderColor: COLORS.cardBorder
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                            className: "h-5 w-24 mb-3",
                            style: {
                                background: 'rgba(255,255,255,0.06)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                            className: "h-4 w-full mb-2",
                            style: {
                                background: 'rgba(255,255,255,0.04)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                            className: "h-8 w-20",
                            style: {
                                background: 'rgba(255,255,255,0.04)'
                            }
                        })
                    ]
                }, i))
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: COLORS.text
                                },
                                children: "Application Settings"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Configure app behavior without code changes"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                        onClick: ()=>setShowCreate(true),
                        className: "text-xs font-medium h-8",
                        style: {
                            background: COLORS.green,
                            color: '#0c0e14'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 mr-1.5"
                            }),
                            "New Setting"
                        ]
                    })
                ]
            }),
            settings.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl border p-12 text-center",
                style: {
                    background: COLORS.card,
                    borderColor: COLORS.cardBorder
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                        className: "w-8 h-8 mx-auto mb-2",
                        style: {
                            color: COLORS.dimmed
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs mb-1",
                        style: {
                            color: COLORS.dimmed
                        },
                        children: "No settings configured yet"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px]",
                        style: {
                            color: COLORS.muted
                        },
                        children: 'Click "New Setting" or seed defaults to get started'
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: settings.map((setting, i)=>{
                    const typeColor = getTypeColor(setting.type);
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            y: 12
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.3,
                            delay: i * 0.04
                        },
                        className: "rounded-2xl p-5 border transition-all hover:border-white/[0.1]",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-7 h-7 rounded-md flex items-center justify-center",
                                                style: {
                                                    background: `${typeColor}15`,
                                                    color: typeColor
                                                },
                                                children: getTypeIcon(setting.type)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs font-semibold",
                                                        style: {
                                                            color: COLORS.text
                                                        },
                                                        children: setting.label || setting.key
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-[9px] font-mono",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: setting.key
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
                                        style: {
                                            background: `${typeColor}15`,
                                            color: typeColor,
                                            border: `1px solid ${typeColor}30`
                                        },
                                        children: setting.type
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "mb-3",
                                children: setting.type === 'color' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-8 h-8 rounded-lg border",
                                            style: {
                                                background: setting.value || '#000',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-xs font-mono",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: setting.value || '(empty)'
                                        })
                                    ]
                                }) : setting.type === 'image' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        setting.value ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                            src: setting.value,
                                            alt: setting.label || setting.key,
                                            className: "w-full h-20 object-cover rounded-lg mb-1",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)'
                                            },
                                            onError: (e)=>{
                                                e.target.style.display = 'none';
                                            }
                                        }) : null,
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] truncate",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: setting.value || '(no image)'
                                        })
                                    ]
                                }) : setting.type === 'json' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                                    className: "text-[10px] p-2 rounded-lg max-h-20 overflow-auto",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)',
                                        color: COLORS.muted
                                    },
                                    children: setting.value ? setting.value.slice(0, 120) + (setting.value.length > 120 ? '...' : '') : '(empty)'
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs truncate",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: setting.value || '(empty)'
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[8px]",
                                        style: {
                                            color: COLORS.dimmed
                                        },
                                        children: [
                                            "Updated ",
                                            formatDate(setting.updatedAt)
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>handleEdit(setting),
                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                title: "Edit Setting",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                    className: "w-3 h-3",
                                                    style: {
                                                        color: COLORS.purple
                                                    }
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>setDeleteKey(setting.key),
                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                title: "Delete Setting",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                    className: "w-3 h-3",
                                                    style: {
                                                        color: COLORS.red
                                                    }
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, setting.id);
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editSetting,
                onOpenChange: (open)=>{
                    if (!open) setEditSetting(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit Setting"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        'Update value for "',
                                        editSetting?.label || editSetting?.key,
                                        '"'
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Label"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editLabel,
                                            onChange: (e)=>setEditLabel(e.target.value),
                                            className: "text-xs",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Type"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: editType,
                                            onValueChange: setEditType,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "text",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Text"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "color",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Color"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "image",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Image URL"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "json",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "JSON"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Value"
                                        }),
                                        editType === 'color' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "color",
                                                    value: editValue || '#000000',
                                                    onChange: (e)=>setEditValue(e.target.value),
                                                    className: "w-10 h-10 rounded-lg border cursor-pointer",
                                                    style: {
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        background: 'transparent'
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                    value: editValue,
                                                    onChange: (e)=>setEditValue(e.target.value),
                                                    className: "text-xs font-mono flex-1",
                                                    placeholder: "#00e5a0",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    }
                                                })
                                            ]
                                        }) : editType === 'json' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: editValue,
                                            onChange: (e)=>setEditValue(e.target.value),
                                            rows: 5,
                                            className: "w-full text-xs font-mono p-3 rounded-lg outline-none border resize-y",
                                            placeholder: "{}",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editValue,
                                            onChange: (e)=>setEditValue(e.target.value),
                                            className: "text-xs",
                                            placeholder: editType === 'image' ? 'https://example.com/image.png' : 'Enter value...',
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        }),
                                        editType === 'image' && editValue && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                            src: editValue,
                                            alt: "Preview",
                                            className: "w-full h-24 object-cover rounded-lg mt-2",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)'
                                            },
                                            onError: (e)=>{
                                                e.target.style.display = 'none';
                                            }
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditSetting(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleSaveEdit,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Saving..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Save"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: showCreate,
                onOpenChange: setShowCreate,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "New Setting"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Add a new configurable setting"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Key"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: newKey,
                                            onChange: (e)=>setNewKey(e.target.value),
                                            className: "text-xs font-mono",
                                            placeholder: "e.g. favicon_url",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Label"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: newLabel,
                                            onChange: (e)=>setNewLabel(e.target.value),
                                            className: "text-xs",
                                            placeholder: "e.g. Favicon URL",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Type"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: newType,
                                            onValueChange: setNewType,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "text",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Text"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "color",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Color"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "image",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Image URL"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "json",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "JSON"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Value"
                                        }),
                                        newType === 'color' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "color",
                                                    value: newValue || '#000000',
                                                    onChange: (e)=>setNewValue(e.target.value),
                                                    className: "w-10 h-10 rounded-lg border cursor-pointer",
                                                    style: {
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        background: 'transparent'
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                    value: newValue,
                                                    onChange: (e)=>setNewValue(e.target.value),
                                                    className: "text-xs font-mono flex-1",
                                                    placeholder: "#00e5a0",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    }
                                                })
                                            ]
                                        }) : newType === 'json' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: newValue,
                                            onChange: (e)=>setNewValue(e.target.value),
                                            rows: 4,
                                            className: "w-full text-xs font-mono p-3 rounded-lg outline-none border resize-y",
                                            placeholder: "{}",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: newValue,
                                            onChange: (e)=>setNewValue(e.target.value),
                                            className: "text-xs",
                                            placeholder: newType === 'image' ? 'https://example.com/image.png' : 'Enter value...',
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setShowCreate(false),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleCreate,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Creating..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Create"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialog */ .Lt, {
                open: !!deleteKey,
                onOpenChange: (open)=>{
                    if (!open) setDeleteKey(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            "Delete Setting"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Are you sure you want to delete the setting ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: deleteKey
                                        }),
                                        "? This may affect app behavior if this setting is used elsewhere."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: COLORS.muted,
                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDelete,
                                    disabled: saving,
                                    style: {
                                        background: COLORS.red,
                                        color: '#fff'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : 'Delete'
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
/* ══════════════════════════════════════════════════════════════════════════════
   ADS TAB
   ══════════════════════════════════════════════════════════════════════════════ */ const EMPTY_CAMPAIGN = {
    name: '',
    advertiser: '',
    adType: 'banner',
    placement: 'dashboard_top',
    status: 'active',
    cpm: 0,
    cpc: 0,
    targetUrl: '',
    imageUrl: '',
    title: '',
    subtitle: '',
    ctaText: '',
    priority: 0,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: ''
};
function AdsTab() {
    const [campaigns, setCampaigns] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [showCreate, setShowCreate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editCampaign, setEditCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [deleteCampaign, setDeleteCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Form state for create/edit
    const [form, setForm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(EMPTY_CAMPAIGN);
    const fetchCampaigns = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/ads/campaigns?all=true');
            if (res.ok) {
                const data = await res.json();
                setCampaigns(data.campaigns || []);
            }
        } catch (err) {
            console.error('Failed to fetch campaigns:', err);
        } finally{
            setLoading(false);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchCampaigns();
    }, [
        fetchCampaigns
    ]);
    const openCreate = ()=>{
        setForm(EMPTY_CAMPAIGN);
        setShowCreate(true);
    };
    const openEdit = (c)=>{
        setForm({
            name: c.name,
            advertiser: c.advertiser,
            adType: c.adType,
            placement: c.placement,
            status: c.status,
            cpm: c.cpm,
            cpc: c.cpc,
            targetUrl: c.targetUrl,
            imageUrl: c.imageUrl,
            title: c.title,
            subtitle: c.subtitle,
            ctaText: c.ctaText,
            priority: c.priority,
            startDate: new Date(c.startDate).toISOString().slice(0, 10),
            endDate: c.endDate ? new Date(c.endDate).toISOString().slice(0, 10) : ''
        });
        setEditCampaign(c);
    };
    const handleCreate = async ()=>{
        if (!form.name.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Campaign name is required');
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/ads/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Failed to create campaign');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${form.name}" created`);
            setShowCreate(false);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to create campaign');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleUpdate = async ()=>{
        if (!editCampaign) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/ads/campaigns/${editCampaign.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Failed to update campaign');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${form.name}" updated`);
            setEditCampaign(null);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update campaign');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleToggleStatus = async (c)=>{
        const nextStatus = c.status === 'active' ? 'paused' : c.status === 'paused' ? 'active' : 'active';
        try {
            const res = await fetch(`/api/ads/campaigns/${c.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: nextStatus
                })
            });
            if (!res.ok) throw new Error('Failed to toggle status');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${c.name}" is now ${nextStatus}`);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update status');
            console.error(err);
        }
    };
    const handleArchive = async (c)=>{
        try {
            const res = await fetch(`/api/ads/campaigns/${c.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'archived'
                })
            });
            if (!res.ok) throw new Error('Failed to archive campaign');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${c.name}" archived`);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to archive campaign');
            console.error(err);
        }
    };
    const handleDelete = async ()=>{
        if (!deleteCampaign) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/ads/campaigns/${deleteCampaign.id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete campaign');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${deleteCampaign.name}" deleted`);
            setDeleteCampaign(null);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete campaign');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    // Aggregate stats
    const totalImpressions = campaigns.reduce((s, c)=>s + c.impressions, 0);
    const totalClicks = campaigns.reduce((s, c)=>s + c.clicks, 0);
    const totalRevenue = campaigns.reduce((s, c)=>s + c.revenue, 0);
    const activeCampaigns = campaigns.filter((c)=>c.status === 'active').length;
    if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TableSkeleton, {});
    }
    const campaignFormFields = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-1",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2 col-span-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Campaign Name *"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                value: form.name,
                                onChange: (e)=>setForm({
                                        ...form,
                                        name: e.target.value
                                    }),
                                className: "text-xs",
                                placeholder: "e.g. PharmaCo Banner",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Advertiser"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                value: form.advertiser,
                                onChange: (e)=>setForm({
                                        ...form,
                                        advertiser: e.target.value
                                    }),
                                className: "text-xs",
                                placeholder: "Company name",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Status"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: form.status,
                                onValueChange: (v)=>setForm({
                                        ...form,
                                        status: v
                                    }),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "active",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Active"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "paused",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Paused"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "archived",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Archived"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Ad Type"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: form.adType,
                                onValueChange: (v)=>setForm({
                                        ...form,
                                        adType: v
                                    }),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "banner",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Banner"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "interstitial",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Interstitial"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "rewarded",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Rewarded"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "native",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Native"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Placement"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: form.placement,
                                onValueChange: (v)=>setForm({
                                        ...form,
                                        placement: v
                                    }),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "dashboard_top",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Dashboard Top"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "tab_bottom",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Tab Bottom"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "quiz_result",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Quiz Result"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "tab_switch",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Tab Switch"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "CPM ($)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "number",
                                value: form.cpm,
                                onChange: (e)=>setForm({
                                        ...form,
                                        cpm: parseFloat(e.target.value) || 0
                                    }),
                                className: "text-xs",
                                step: "0.01",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "CPC ($)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "number",
                                value: form.cpc,
                                onChange: (e)=>setForm({
                                        ...form,
                                        cpc: parseFloat(e.target.value) || 0
                                    }),
                                className: "text-xs",
                                step: "0.01",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Priority"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "number",
                                value: form.priority,
                                onChange: (e)=>setForm({
                                        ...form,
                                        priority: parseInt(e.target.value) || 0
                                    }),
                                className: "text-xs",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium",
                        style: {
                            color: COLORS.muted
                        },
                        children: "Target URL"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                        value: form.targetUrl,
                        onChange: (e)=>setForm({
                                ...form,
                                targetUrl: e.target.value
                            }),
                        className: "text-xs",
                        placeholder: "https://...",
                        style: {
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                            color: COLORS.text
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium",
                        style: {
                            color: COLORS.muted
                        },
                        children: "Image URL"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                        value: form.imageUrl,
                        onChange: (e)=>setForm({
                                ...form,
                                imageUrl: e.target.value
                            }),
                        className: "text-xs",
                        placeholder: "https://...",
                        style: {
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                            color: COLORS.text
                        }
                    }),
                    form.imageUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                        src: form.imageUrl,
                        alt: "Preview",
                        className: "w-full h-20 object-cover rounded-lg",
                        style: {
                            background: 'rgba(255,255,255,0.03)'
                        },
                        onError: (e)=>{
                            e.target.style.display = 'none';
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Title"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                value: form.title,
                                onChange: (e)=>setForm({
                                        ...form,
                                        title: e.target.value
                                    }),
                                className: "text-xs",
                                placeholder: "Ad headline",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Subtitle"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                value: form.subtitle,
                                onChange: (e)=>setForm({
                                        ...form,
                                        subtitle: e.target.value
                                    }),
                                className: "text-xs",
                                placeholder: "Ad description",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium",
                        style: {
                            color: COLORS.muted
                        },
                        children: "CTA Text"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                        value: form.ctaText,
                        onChange: (e)=>setForm({
                                ...form,
                                ctaText: e.target.value
                            }),
                        className: "text-xs",
                        placeholder: "e.g. Learn More",
                        style: {
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                            color: COLORS.text
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Start Date"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "date",
                                value: form.startDate,
                                onChange: (e)=>setForm({
                                        ...form,
                                        startDate: e.target.value
                                    }),
                                className: "text-xs",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "End Date"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "date",
                                value: form.endDate,
                                onChange: (e)=>setForm({
                                        ...form,
                                        endDate: e.target.value
                                    }),
                                className: "text-xs",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: COLORS.text
                                },
                                children: "Ad Campaigns"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Manage ad campaigns and track performance"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                        onClick: openCreate,
                        className: "text-xs font-medium h-8",
                        style: {
                            background: COLORS.green,
                            color: '#0c0e14'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 mr-1.5"
                            }),
                            "New Campaign"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-3 border",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: COLORS.blue
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-medium",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Impressions"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-lg font-bold",
                                style: {
                                    color: COLORS.text
                                },
                                children: formatNumber(totalImpressions)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-3 border",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: COLORS.purple
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-medium",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Clicks"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-lg font-bold",
                                style: {
                                    color: COLORS.text
                                },
                                children: formatNumber(totalClicks)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-3 border",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: COLORS.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-medium",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Revenue"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-lg font-bold",
                                style: {
                                    color: COLORS.text
                                },
                                children: [
                                    "$",
                                    totalRevenue.toFixed(2)
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-3 border",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: COLORS.amber
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-medium",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Active"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-lg font-bold",
                                style: {
                                    color: COLORS.text
                                },
                                children: activeCampaigns
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-2xl border overflow-hidden",
                style: {
                    background: COLORS.card,
                    borderColor: COLORS.cardBorder
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                        className: "w-full text-sm",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                    className: "border-b",
                                    style: {
                                        borderColor: COLORS.cardBorder
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Campaign"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Type"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Placement"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Status"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-right px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Impr."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-right px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Clicks"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-right px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Revenue"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-right px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Actions"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
                                children: campaigns.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                        colSpan: 8,
                                        className: "px-4 py-12 text-center",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                className: "w-8 h-8 mx-auto mb-2",
                                                style: {
                                                    color: COLORS.dimmed
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs",
                                                style: {
                                                    color: COLORS.dimmed
                                                },
                                                children: "No ad campaigns yet"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] mt-1",
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: 'Click "New Campaign" to create one'
                                            })
                                        ]
                                    })
                                }) : campaigns.map((c)=>{
                                    const statusColor = STATUS_COLORS[c.status] || COLORS.muted;
                                    const adTypeColor = ADTYPE_COLORS[c.adType] || COLORS.muted;
                                    const ctr = c.impressions > 0 ? (c.clicks / c.impressions * 100).toFixed(2) : '0.00';
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                        className: "border-b transition-colors hover:bg-white/[0.02]",
                                        style: {
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.04))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs font-medium",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: c.name || 'Unnamed'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[9px]",
                                                            style: {
                                                                color: COLORS.dimmed
                                                            },
                                                            children: c.advertiser || 'No advertiser'
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${adTypeColor}15`,
                                                        color: adTypeColor,
                                                        border: `1px solid ${adTypeColor}30`
                                                    },
                                                    children: c.adType
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[10px]",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: c.placement.replace(/_/g, ' ')
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${statusColor}15`,
                                                        color: statusColor,
                                                        border: `1px solid ${statusColor}30`
                                                    },
                                                    children: [
                                                        c.status === 'active' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                            className: "w-2.5 h-2.5"
                                                        }),
                                                        c.status === 'paused' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                            className: "w-2.5 h-2.5"
                                                        }),
                                                        c.status === 'archived' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                            className: "w-2.5 h-2.5"
                                                        }),
                                                        c.status
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3 text-right",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: formatNumber(c.impressions)
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                className: "px-4 py-3 text-right",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-xs font-medium",
                                                        style: {
                                                            color: COLORS.text
                                                        },
                                                        children: formatNumber(c.clicks)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-[8px] ml-1",
                                                        style: {
                                                            color: COLORS.muted
                                                        },
                                                        children: [
                                                            "(",
                                                            ctr,
                                                            "%)"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3 text-right",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.green
                                                    },
                                                    children: [
                                                        "$",
                                                        c.revenue.toFixed(2)
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center justify-end gap-1",
                                                    children: [
                                                        c.status !== 'archived' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>handleToggleStatus(c),
                                                            className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                            title: c.status === 'active' ? 'Pause' : 'Activate',
                                                            children: c.status === 'active' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.green
                                                                }
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.amber
                                                                }
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>openEdit(c),
                                                            className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                            title: "Edit Campaign",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.purple
                                                                }
                                                            })
                                                        }),
                                                        c.status !== 'archived' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>handleArchive(c),
                                                            className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                            title: "Archive",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.muted
                                                                }
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>setDeleteCampaign(c),
                                                            className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                            title: "Delete",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.red
                                                                }
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    }, c.id);
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: showCreate,
                onOpenChange: setShowCreate,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-lg",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "New Ad Campaign"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Create a new advertising campaign"
                                })
                            ]
                        }),
                        campaignFormFields,
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setShowCreate(false),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleCreate,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: [
                                        saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5"
                                        }),
                                        "Create Campaign"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editCampaign,
                onOpenChange: (open)=>{
                    if (!open) setEditCampaign(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-lg",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit Campaign"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        'Update "',
                                        editCampaign?.name,
                                        '"'
                                    ]
                                })
                            ]
                        }),
                        campaignFormFields,
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditCampaign(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleUpdate,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: [
                                        saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5"
                                        }),
                                        "Save Changes"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialog */ .Lt, {
                open: !!deleteCampaign,
                onOpenChange: (open)=>{
                    if (!open) setDeleteCampaign(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            "Delete Campaign"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Are you sure you want to delete ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: deleteCampaign?.name
                                        }),
                                        "? This will also remove all impression and click data."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: COLORS.muted,
                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDelete,
                                    disabled: saving,
                                    style: {
                                        background: COLORS.red,
                                        color: '#fff'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : 'Delete'
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
const BUILTIN_CATEGORIES = [
    {
        value: 'skeletal',
        label: 'Skeletal',
        emoji: '🦴',
        color: '#f5f0e0'
    },
    {
        value: 'muscular',
        label: 'Muscular',
        emoji: '💪',
        color: '#c0392b'
    },
    {
        value: 'cardiovascular',
        label: 'Cardiovascular',
        emoji: '🩸',
        color: '#e74c3c'
    },
    {
        value: 'nervous',
        label: 'Nervous',
        emoji: '🧠',
        color: '#f1c40f'
    },
    {
        value: 'digestive',
        label: 'Digestive',
        emoji: '🫁',
        color: '#d4956a'
    },
    {
        value: 'respiratory',
        label: 'Respiratory',
        emoji: '🌬️',
        color: '#f0a0a0'
    },
    {
        value: 'urinary',
        label: 'Urinary',
        emoji: '💧',
        color: '#b05050'
    },
    {
        value: 'reproductive',
        label: 'Reproductive',
        emoji: '🧬',
        color: '#ec4899'
    },
    {
        value: 'endocrine',
        label: 'Endocrine',
        emoji: '🦋',
        color: '#a855f7'
    },
    {
        value: 'lymphatic',
        label: 'Lymphatic',
        emoji: '🛡️',
        color: '#06b6d4'
    },
    {
        value: 'integumentary',
        label: 'Integumentary',
        emoji: '🧍',
        color: '#e8b89d'
    }
];
const MODEL_CATEGORIES = [
    {
        value: 'custom',
        label: 'Custom',
        color: COLORS.cyan
    },
    {
        value: 'skeletal',
        label: 'Skeletal',
        color: '#f5f0e0'
    },
    {
        value: 'muscular',
        label: 'Muscular',
        color: '#c0392b'
    },
    {
        value: 'cardiovascular',
        label: 'Cardiovascular',
        color: '#e74c3c'
    },
    {
        value: 'nervous',
        label: 'Nervous',
        color: '#f1c40f'
    },
    {
        value: 'digestive',
        label: 'Digestive',
        color: '#d4956a'
    },
    {
        value: 'respiratory',
        label: 'Respiratory',
        color: '#f0a0a0'
    },
    {
        value: 'urinary',
        label: 'Urinary',
        color: '#b05050'
    }
];
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function ModelsTab() {
    // ── Tab toggle: built-in vs custom ──
    const [modelTab, setModelTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('builtin');
    // ── Custom models state ──
    const [models, setModels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showUpload, setShowUpload] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editModel, setEditModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [deleteModel, setDeleteModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [categoryFilter, setCategoryFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    // ── Built-in models state ──
    const [builtInModels, setBuiltInModels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [builtInLoading, setBuiltInLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [builtInSearch, setBuiltInSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [builtInCategoryFilter, setBuiltInCategoryFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [builtInTotal, setBuiltInTotal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [builtInOffset, setBuiltInOffset] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [builtInLimit] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(60);
    const [previewModel, setPreviewModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editingBuiltIn, setEditingBuiltIn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editBuiltInName, setEditBuiltInName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editBuiltInCategory, setEditBuiltInCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editBuiltInTags, setEditBuiltInTags] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editBuiltInSaving, setEditBuiltInSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Upload form state
    const [uploadName, setUploadName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [uploadDescription, setUploadDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [uploadCategory, setUploadCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('custom');
    const [uploadColor, setUploadColor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('#c0c0c0');
    const [uploadTags, setUploadTags] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [uploadFile, setUploadFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Edit form state
    const [editName, setEditName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editDescription, setEditDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editCategory, setEditCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('custom');
    const [editColor, setEditColor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('#c0c0c0');
    const [editTags, setEditTags] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editIsPublic, setEditIsPublic] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    // ── Fetch built-in models (debounced search) ──
    const builtInSearchTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const fetchBuiltInModels = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setBuiltInLoading(true);
        try {
            const params = new URLSearchParams({
                action: 'catalog',
                limit: builtInLimit.toString(),
                offset: builtInOffset.toString()
            });
            if (builtInCategoryFilter !== 'all') params.set('category', builtInCategoryFilter);
            if (builtInSearch.trim()) params.set('search', builtInSearch.trim());
            const res = await fetch(`/api/anatomy-3d?${params}`);
            if (res.ok) {
                const data = await res.json();
                setBuiltInModels(data.models || []);
                setBuiltInTotal(data.pagination?.total || 0);
            }
        } catch (err) {
            console.error('Failed to fetch built-in models:', err);
        } finally{
            setBuiltInLoading(false);
        }
    }, [
        builtInLimit,
        builtInOffset,
        builtInCategoryFilter,
        builtInSearch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (modelTab === 'builtin') {
            fetchBuiltInModels();
        }
    }, [
        modelTab,
        fetchBuiltInModels
    ]);
    const fetchModels = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/admin/models');
            if (res.ok) {
                const data = await res.json();
                setModels(data.models || []);
            }
        } catch (err) {
            console.error('Failed to fetch models:', err);
        } finally{
            setLoading(false);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (modelTab === 'custom') {
            fetchModels();
        }
    }, [
        fetchModels,
        modelTab
    ]);
    const handleUpload = async ()=>{
        if (!uploadFile) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Please select a file to upload');
            return;
        }
        if (!uploadName.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Model name is required');
            return;
        }
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('name', uploadName);
            formData.append('description', uploadDescription);
            formData.append('category', uploadCategory);
            formData.append('color', uploadColor);
            formData.append('tags', JSON.stringify(uploadTags.split(',').map((t)=>t.trim()).filter(Boolean)));
            formData.append('file', uploadFile);
            const res = await fetch('/api/admin/models', {
                method: 'POST',
                body: formData
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to upload model');
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Model "${uploadName}" uploaded`);
            setShowUpload(false);
            resetUploadForm();
            fetchModels();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(err instanceof Error ? err.message : 'Failed to upload model');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const resetUploadForm = ()=>{
        setUploadName('');
        setUploadDescription('');
        setUploadCategory('custom');
        setUploadColor('#c0c0c0');
        setUploadTags('');
        setUploadFile(null);
    };
    const openEdit = (model)=>{
        setEditModel(model);
        setEditName(model.name);
        setEditDescription(model.description);
        setEditCategory(model.category);
        setEditColor(model.color);
        try {
            const parsed = JSON.parse(model.tags);
            setEditTags(Array.isArray(parsed) ? parsed.join(', ') : '');
        } catch  {
            setEditTags('');
        }
        setEditIsPublic(model.isPublic);
    };
    const handleUpdate = async ()=>{
        if (!editModel) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/models/${editModel.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editName,
                    description: editDescription,
                    category: editCategory,
                    color: editColor,
                    tags: JSON.stringify(editTags.split(',').map((t)=>t.trim()).filter(Boolean)),
                    isPublic: editIsPublic
                })
            });
            if (!res.ok) throw new Error('Failed to update model');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Model "${editName}" updated`);
            setEditModel(null);
            fetchModels();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update model');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleDelete = async ()=>{
        if (!deleteModel) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/models/${deleteModel.id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete model');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Model "${deleteModel.name}" deleted`);
            setDeleteModel(null);
            fetchModels();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete model');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    // Filter models
    const filteredModels = models.filter((m)=>{
        const matchesSearch = !searchQuery.trim() || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.description.toLowerCase().includes(searchQuery.toLowerCase()) || m.fileName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    // Stats
    const totalModels = models.length;
    const totalSize = models.reduce((s, m)=>s + m.fileSize, 0);
    const publicModels = models.filter((m)=>m.isPublic).length;
    const categoryCounts = {};
    models.forEach((m)=>{
        categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
    });
    // Built-in pagination
    const builtInTotalPages = Math.ceil(builtInTotal / builtInLimit);
    if (modelTab === 'custom' && loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TableSkeleton, {});
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: COLORS.text
                                },
                                children: "3D Model Manager"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Browse built-in and manage custom 3D anatomy models"
                            })
                        ]
                    }),
                    modelTab === 'custom' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                        onClick: ()=>{
                            resetUploadForm();
                            setShowUpload(true);
                        },
                        className: "text-xs font-medium h-8",
                        style: {
                            background: COLORS.green,
                            color: '#0c0e14'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 mr-1.5"
                            }),
                            "Upload Model"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1 p-1 rounded-xl",
                style: {
                    background: COLORS.card,
                    border: `1px solid ${COLORS.cardBorder}`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setModelTab('builtin'),
                        className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                        style: {
                            background: modelTab === 'builtin' ? `${COLORS.cyan}15` : 'transparent',
                            border: `1px solid ${modelTab === 'builtin' ? `${COLORS.cyan}30` : 'transparent'}`,
                            color: modelTab === 'builtin' ? COLORS.cyan : COLORS.muted
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Built-in Models",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] px-1.5 py-0.5 rounded-full",
                                style: {
                                    background: `${COLORS.cyan}15`,
                                    color: COLORS.cyan
                                },
                                children: builtInTotal > 0 ? formatNumber(builtInTotal) : '2,234'
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setModelTab('custom'),
                        className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                        style: {
                            background: modelTab === 'custom' ? `${COLORS.purple}15` : 'transparent',
                            border: `1px solid ${modelTab === 'custom' ? `${COLORS.purple}30` : 'transparent'}`,
                            color: modelTab === 'custom' ? COLORS.purple : COLORS.muted
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Custom Models",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] px-1.5 py-0.5 rounded-full",
                                style: {
                                    background: `${COLORS.purple}15`,
                                    color: COLORS.purple
                                },
                                children: totalModels
                            })
                        ]
                    })
                ]
            }),
            modelTab === 'builtin' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col sm:flex-row items-start sm:items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative flex-1 w-full sm:max-w-xs",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                                        style: {
                                            color: COLORS.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        placeholder: "Search built-in models...",
                                        value: builtInSearch,
                                        onChange: (e)=>{
                                            setBuiltInSearch(e.target.value);
                                            setBuiltInOffset(0);
                                            // Debounce search
                                            if (builtInSearchTimeoutRef.current) clearTimeout(builtInSearchTimeoutRef.current);
                                            builtInSearchTimeoutRef.current = setTimeout(()=>{
                                                fetchBuiltInModels();
                                            }, 400);
                                        },
                                        className: "w-full h-9 pl-9 pr-3 rounded-lg text-xs outline-none transition-all border",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: COLORS.cardBorder,
                                            color: COLORS.text
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: builtInCategoryFilter,
                                onValueChange: (v)=>{
                                    setBuiltInCategoryFilter(v);
                                    setBuiltInOffset(0);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full sm:w-[180px] text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: COLORS.cardBorder,
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                            placeholder: "Category"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "all",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "All Categories"
                                            }),
                                            BUILTIN_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                    value: cat.value,
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: [
                                                        cat.emoji,
                                                        " ",
                                                        cat.label
                                                    ]
                                                }, cat.value))
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[10px] ml-auto",
                                style: {
                                    color: COLORS.muted
                                },
                                children: [
                                    builtInTotal,
                                    " model",
                                    builtInTotal !== 1 ? 's' : '',
                                    " found"
                                ]
                            })
                        ]
                    }),
                    builtInLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: Array.from({
                            length: 6
                        }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-2xl p-5 border",
                                style: {
                                    background: COLORS.card,
                                    borderColor: COLORS.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                                        className: "h-5 w-24 mb-3",
                                        style: {
                                            background: 'rgba(255,255,255,0.06)'
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                                        className: "h-4 w-full mb-2",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)'
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                                        className: "h-4 w-16",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)'
                                        }
                                    })
                                ]
                            }, i))
                    }) : builtInModels.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl border p-12 text-center",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                className: "w-8 h-8 mx-auto mb-2",
                                style: {
                                    color: COLORS.dimmed
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs mb-1",
                                style: {
                                    color: COLORS.dimmed
                                },
                                children: "No built-in models found"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Try adjusting your search or category filter"
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto",
                                style: {
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: `${COLORS.dimmed} transparent`
                                },
                                children: builtInModels.map((model, i)=>{
                                    const catMeta = BUILTIN_CATEGORIES.find((c)=>c.value === model.category);
                                    const catColor = catMeta?.color || COLORS.cyan;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                                        initial: {
                                            opacity: 0,
                                            y: 12
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.3,
                                            delay: i * 0.02
                                        },
                                        className: "rounded-2xl p-4 border transition-all hover:border-white/[0.1]",
                                        style: {
                                            background: COLORS.card,
                                            borderColor: COLORS.cardBorder
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-2 min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0",
                                                                style: {
                                                                    background: `${catColor}15`,
                                                                    color: catColor
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "min-w-0",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-[11px] font-semibold truncate",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: model.name
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "inline-flex items-center px-1.5 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider flex-shrink-0",
                                                        style: {
                                                            background: `${catColor}15`,
                                                            color: catColor,
                                                            border: `1px solid ${catColor}30`
                                                        },
                                                        children: "OBJ"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-[9px]",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: [
                                                            catMeta?.emoji,
                                                            " ",
                                                            catMeta?.label || model.category
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[9px] font-mono",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: model.id
                                                    }),
                                                    model.mirrored && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[7px] px-1 py-0.5 rounded",
                                                        style: {
                                                            background: `${COLORS.amber}15`,
                                                            color: COLORS.amber,
                                                            border: `1px solid ${COLORS.amber}20`
                                                        },
                                                        children: "Mirror"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center justify-end gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        onClick: ()=>setPreviewModel(model),
                                                        className: "flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-semibold transition-all hover:brightness-110",
                                                        style: {
                                                            background: `${COLORS.cyan}10`,
                                                            border: `1px solid ${COLORS.cyan}20`,
                                                            color: COLORS.cyan
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                                className: "w-2.5 h-2.5"
                                                            }),
                                                            "3D View"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        onClick: ()=>{
                                                            setEditingBuiltIn(model);
                                                            setEditBuiltInName(model.name);
                                                            setEditBuiltInCategory(model.category);
                                                            setEditBuiltInTags('');
                                                        },
                                                        className: "flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-semibold transition-all hover:brightness-110",
                                                        style: {
                                                            background: `${COLORS.amber}10`,
                                                            border: `1px solid ${COLORS.amber}20`,
                                                            color: COLORS.amber
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                                className: "w-2.5 h-2.5"
                                                            }),
                                                            "Edit"
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, model.id);
                                })
                            }),
                            builtInTotalPages > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setBuiltInOffset(Math.max(0, builtInOffset - builtInLimit)),
                                        disabled: builtInOffset === 0,
                                        className: "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-30",
                                        style: {
                                            background: COLORS.card,
                                            border: `1px solid ${COLORS.cardBorder}`,
                                            color: COLORS.text
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            "Prev"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[10px] px-2",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: [
                                            "Page ",
                                            Math.floor(builtInOffset / builtInLimit) + 1,
                                            " of ",
                                            builtInTotalPages
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setBuiltInOffset(builtInOffset + builtInLimit),
                                        disabled: builtInOffset + builtInLimit >= builtInTotal,
                                        className: "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-30",
                                        style: {
                                            background: COLORS.card,
                                            border: `1px solid ${COLORS.cardBorder}`,
                                            color: COLORS.text
                                        },
                                        children: [
                                            "Next",
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            modelTab === 'custom' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                        children: [
                            {
                                label: 'Total Models',
                                value: totalModels,
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                color: COLORS.cyan,
                                bgColor: `${COLORS.cyan}15`
                            },
                            {
                                label: 'Total Size',
                                value: formatFileSize(totalSize),
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                color: COLORS.purple,
                                bgColor: `${COLORS.purple}15`
                            },
                            {
                                label: 'Public',
                                value: publicModels,
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                color: COLORS.green,
                                bgColor: `${COLORS.green}15`
                            },
                            {
                                label: 'Categories',
                                value: Object.keys(categoryCounts).length,
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                color: COLORS.amber,
                                bgColor: `${COLORS.amber}15`
                            }
                        ].map((stat, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                label: stat.label,
                                value: stat.value,
                                icon: stat.icon,
                                color: stat.color,
                                bgColor: stat.bgColor,
                                index: i
                            }, stat.label))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col sm:flex-row items-start sm:items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative flex-1 w-full sm:max-w-xs",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                                        style: {
                                            color: COLORS.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        placeholder: "Search models...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "w-full h-9 pl-9 pr-3 rounded-lg text-xs outline-none transition-all border",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: COLORS.cardBorder,
                                            color: COLORS.text
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: categoryFilter,
                                onValueChange: setCategoryFilter,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full sm:w-[160px] text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: COLORS.cardBorder,
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                            placeholder: "Category"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "all",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "All Categories"
                                            }),
                                            MODEL_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                    value: cat.value,
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: cat.label
                                                }, cat.value))
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[10px] ml-auto",
                                style: {
                                    color: COLORS.muted
                                },
                                children: [
                                    filteredModels.length,
                                    " model",
                                    filteredModels.length !== 1 ? 's' : ''
                                ]
                            })
                        ]
                    }),
                    filteredModels.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl border p-12 text-center",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                className: "w-8 h-8 mx-auto mb-2",
                                style: {
                                    color: COLORS.dimmed
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs mb-1",
                                style: {
                                    color: COLORS.dimmed
                                },
                                children: models.length === 0 ? 'No models uploaded yet' : 'No models match your search'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: models.length === 0 ? 'Click "Upload Model" to add your first 3D model' : 'Try adjusting your search or category filter'
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: filteredModels.map((model, i)=>{
                            const catMeta = MODEL_CATEGORIES.find((c)=>c.value === model.category);
                            const catColor = catMeta?.color || COLORS.cyan;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                                initial: {
                                    opacity: 0,
                                    y: 12
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.3,
                                    delay: i * 0.04
                                },
                                className: "rounded-2xl p-5 border transition-all hover:border-white/[0.1]",
                                style: {
                                    background: COLORS.card,
                                    borderColor: COLORS.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between mb-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "w-7 h-7 rounded-md flex items-center justify-center",
                                                        style: {
                                                            background: `${catColor}15`,
                                                            color: catColor
                                                        },
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                                            className: "w-3.5 h-3.5"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.text
                                                                },
                                                                children: model.name
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-[9px] font-mono",
                                                                style: {
                                                                    color: COLORS.dimmed
                                                                },
                                                                children: model.fileName
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
                                                        style: {
                                                            background: `${catColor}15`,
                                                            color: catColor,
                                                            border: `1px solid ${catColor}30`
                                                        },
                                                        children: model.fileType
                                                    }),
                                                    !model.isPublic && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
                                                        style: {
                                                            background: `${COLORS.amber}15`,
                                                            color: COLORS.amber,
                                                            border: `1px solid ${COLORS.amber}30`
                                                        },
                                                        children: "Private"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-3 space-y-1",
                                        children: [
                                            model.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] truncate",
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: model.description
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[9px]",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: catMeta?.label || model.category
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[9px]",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: formatFileSize(model.fileSize)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "flex items-center gap-1",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "w-3 h-3 rounded-full border",
                                                            style: {
                                                                background: model.color,
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            }
                                                        })
                                                    })
                                                ]
                                            }),
                                            (()=>{
                                                try {
                                                    const parsedTags = JSON.parse(model.tags);
                                                    if (Array.isArray(parsedTags) && parsedTags.length > 0) {
                                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-1 flex-wrap mt-1",
                                                            children: [
                                                                parsedTags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "px-1.5 py-0.5 rounded text-[7px] font-medium",
                                                                        style: {
                                                                            background: `${COLORS.cyan}10`,
                                                                            color: COLORS.cyan,
                                                                            border: `1px solid ${COLORS.cyan}20`
                                                                        },
                                                                        children: tag
                                                                    }, tag)),
                                                                parsedTags.length > 3 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "text-[7px]",
                                                                    style: {
                                                                        color: COLORS.dimmed
                                                                    },
                                                                    children: [
                                                                        "+",
                                                                        parsedTags.length - 3
                                                                    ]
                                                                })
                                                            ]
                                                        });
                                                    }
                                                } catch  {}
                                                return null;
                                            })()
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[8px]",
                                                style: {
                                                    color: COLORS.dimmed
                                                },
                                                children: formatDate(model.createdAt)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        onClick: ()=>openEdit(model),
                                                        className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                        title: "Edit Model",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                            className: "w-3 h-3",
                                                            style: {
                                                                color: COLORS.purple
                                                            }
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        onClick: ()=>setDeleteModel(model),
                                                        className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                        title: "Delete Model",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                            className: "w-3 h-3",
                                                            style: {
                                                                color: COLORS.red
                                                            }
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }, model.id);
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!previewModel,
                onOpenChange: (open)=>{
                    if (!open) setPreviewModel(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-3xl max-h-[90vh]",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: [
                                                    "Preview: ",
                                                    previewModel?.name
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: [
                                                    "Built-in BodyParts3D model — ",
                                                    previewModel?.category
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "inline-flex items-center px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider",
                                                style: {
                                                    background: `${BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.color || COLORS.cyan}15`,
                                                    color: BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.color || COLORS.cyan,
                                                    border: `1px solid ${BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.color || COLORS.cyan}30`
                                                },
                                                children: [
                                                    BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.emoji,
                                                    " ",
                                                    BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.label || previewModel?.category
                                                ]
                                            }),
                                            previewModel?.mirrored && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] px-1.5 py-0.5 rounded",
                                                style: {
                                                    background: `${COLORS.amber}15`,
                                                    color: COLORS.amber,
                                                    border: `1px solid ${COLORS.amber}20`
                                                },
                                                children: "Mirrored"
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                previewModel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-full h-[450px] rounded-lg overflow-hidden border",
                                    style: {
                                        borderColor: COLORS.cardBorder
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OBJModelViewer, {
                                        modelId: previewModel.id,
                                        fjId: previewModel.fjId,
                                        category: previewModel.category,
                                        modelName: previewModel.name,
                                        showHeader: false
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[9px] font-mono",
                                            style: {
                                                color: COLORS.dimmed
                                            },
                                            children: [
                                                "FJ ID: ",
                                                previewModel?.fjId
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[9px]",
                                            style: {
                                                color: COLORS.dimmed
                                            },
                                            children: [
                                                "ID: ",
                                                previewModel?.id
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                variant: "ghost",
                                onClick: ()=>setPreviewModel(null),
                                className: "text-xs",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Close"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editingBuiltIn,
                onOpenChange: (open)=>{
                    if (!open) setEditingBuiltIn(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-lg",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit Built-in Model"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Update properties for ",
                                        editingBuiltIn?.name
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                editingBuiltIn && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-full h-40 rounded-lg overflow-hidden border",
                                    style: {
                                        borderColor: COLORS.cardBorder
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OBJModelViewer, {
                                        modelId: editingBuiltIn.id,
                                        fjId: editingBuiltIn.fjId,
                                        category: editingBuiltIn.category,
                                        modelName: editingBuiltIn.name,
                                        showHeader: false
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Model Name"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editBuiltInName,
                                            onChange: (e)=>setEditBuiltInName(e.target.value),
                                            className: "text-sm",
                                            style: {
                                                background: COLORS.card,
                                                borderColor: COLORS.cardBorder,
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Category"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: editBuiltInCategory,
                                            onValueChange: setEditBuiltInCategory,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    style: {
                                                        background: COLORS.card,
                                                        borderColor: COLORS.cardBorder,
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: COLORS.cardBorder
                                                    },
                                                    children: BUILTIN_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: cat.value,
                                                            children: [
                                                                cat.emoji,
                                                                " ",
                                                                cat.label
                                                            ]
                                                        }, cat.value))
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Tags (comma separated)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editBuiltInTags,
                                            onChange: (e)=>setEditBuiltInTags(e.target.value),
                                            placeholder: "e.g., bone, upper limb, anatomy",
                                            className: "text-sm",
                                            style: {
                                                background: COLORS.card,
                                                borderColor: COLORS.cardBorder,
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3 text-[9px]",
                                    style: {
                                        color: COLORS.dimmed
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            children: [
                                                "FJ ID: ",
                                                editingBuiltIn?.fjId
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            children: "•"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            children: [
                                                "Internal ID: ",
                                                editingBuiltIn?.id
                                            ]
                                        }),
                                        editingBuiltIn?.mirrored && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    children: "•"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    style: {
                                                        color: COLORS.amber
                                                    },
                                                    children: "Mirrored"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditingBuiltIn(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: async ()=>{
                                        if (!editingBuiltIn) return;
                                        setEditBuiltInSaving(true);
                                        try {
                                            const res = await fetch('/api/admin/models', {
                                                method: 'PATCH',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    id: editingBuiltIn.id,
                                                    fjId: editingBuiltIn.fjId,
                                                    name: editBuiltInName,
                                                    category: editBuiltInCategory,
                                                    tags: editBuiltInTags,
                                                    isBuiltIn: true
                                                })
                                            });
                                            if (res.ok) {
                                                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Model updated successfully');
                                                // Update local state
                                                setBuiltInModels((prev)=>prev.map((m)=>m.id === editingBuiltIn.id ? {
                                                            ...m,
                                                            name: editBuiltInName,
                                                            category: editBuiltInCategory
                                                        } : m));
                                                setEditingBuiltIn(null);
                                            } else {
                                                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update model');
                                            }
                                        } catch  {
                                            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update model');
                                        }
                                        setEditBuiltInSaving(false);
                                    },
                                    disabled: editBuiltInSaving,
                                    className: "text-xs",
                                    style: {
                                        background: COLORS.cyan,
                                        color: '#000'
                                    },
                                    children: [
                                        editBuiltInSaving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3 h-3 animate-spin mr-1"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                            className: "w-3 h-3 mr-1"
                                        }),
                                        "Save Changes"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: showUpload,
                onOpenChange: setShowUpload,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Upload 3D Model"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Upload an OBJ, STL, or GLB file for the anatomy viewer"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Model Name *"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: uploadName,
                                            onChange: (e)=>setUploadName(e.target.value),
                                            className: "text-xs",
                                            placeholder: "e.g. Custom Femur Model",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Description"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: uploadDescription,
                                            onChange: (e)=>setUploadDescription(e.target.value),
                                            rows: 3,
                                            className: "w-full text-xs p-3 rounded-lg outline-none border resize-y",
                                            placeholder: "Brief description of the model...",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Category"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: uploadCategory,
                                                    onValueChange: setUploadCategory,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.05)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: MODEL_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: cat.value,
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: cat.label
                                                                }, cat.value))
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Display Color"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                            type: "color",
                                                            value: uploadColor,
                                                            onChange: (e)=>setUploadColor(e.target.value),
                                                            className: "w-8 h-8 rounded-lg border cursor-pointer flex-shrink-0",
                                                            style: {
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                background: 'transparent'
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                            value: uploadColor,
                                                            onChange: (e)=>setUploadColor(e.target.value),
                                                            className: "text-xs font-mono flex-1",
                                                            placeholder: "#c0c0c0",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.05)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                color: COLORS.text
                                                            }
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Tags (comma separated)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: uploadTags,
                                            onChange: (e)=>setUploadTags(e.target.value),
                                            className: "text-xs",
                                            placeholder: "anatomy, femur, bone",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Model File *"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "border-2 border-dashed rounded-lg p-4 text-center transition-colors",
                                            style: {
                                                borderColor: uploadFile ? `${COLORS.green}40` : 'rgba(255,255,255,0.1)',
                                                background: uploadFile ? `${COLORS.green}05` : 'rgba(255,255,255,0.02)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "file",
                                                    accept: ".obj,.stl,.glb",
                                                    onChange: (e)=>setUploadFile(e.target.files?.[0] || null),
                                                    className: "hidden",
                                                    id: "model-file-input"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    htmlFor: "model-file-input",
                                                    className: "cursor-pointer",
                                                    children: uploadFile ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                                                className: "w-6 h-6 mx-auto mb-1",
                                                                style: {
                                                                    color: COLORS.green
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs font-medium",
                                                                style: {
                                                                    color: COLORS.green
                                                                },
                                                                children: uploadFile.name
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-[9px]",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: formatFileSize(uploadFile.size)
                                                            })
                                                        ]
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                                className: "w-6 h-6 mx-auto mb-1",
                                                                style: {
                                                                    color: COLORS.dimmed
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs",
                                                                style: {
                                                                    color: COLORS.dimmed
                                                                },
                                                                children: "Click to select file"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-[9px]",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "OBJ, STL, or GLB"
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setShowUpload(false),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleUpload,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Uploading..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Upload"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editModel,
                onOpenChange: (open)=>{
                    if (!open) setEditModel(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit Model"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        'Update details for "',
                                        editModel?.name,
                                        '"'
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Name"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editName,
                                            onChange: (e)=>setEditName(e.target.value),
                                            className: "text-xs",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Description"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: editDescription,
                                            onChange: (e)=>setEditDescription(e.target.value),
                                            rows: 3,
                                            className: "w-full text-xs p-3 rounded-lg outline-none border resize-y",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Category"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: editCategory,
                                                    onValueChange: setEditCategory,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.05)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: MODEL_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: cat.value,
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: cat.label
                                                                }, cat.value))
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Color"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                            type: "color",
                                                            value: editColor,
                                                            onChange: (e)=>setEditColor(e.target.value),
                                                            className: "w-8 h-8 rounded-lg border cursor-pointer flex-shrink-0",
                                                            style: {
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                background: 'transparent'
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                            value: editColor,
                                                            onChange: (e)=>setEditColor(e.target.value),
                                                            className: "text-xs font-mono flex-1",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.05)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                color: COLORS.text
                                                            }
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Tags (comma separated)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editTags,
                                            onChange: (e)=>setEditTags(e.target.value),
                                            className: "text-xs",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-center gap-2",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setEditIsPublic(!editIsPublic),
                                        className: "flex items-center gap-2",
                                        children: [
                                            editIsPublic ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.green
                                                }
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.muted
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs",
                                                style: {
                                                    color: editIsPublic ? COLORS.green : COLORS.muted
                                                },
                                                children: editIsPublic ? 'Public' : 'Private'
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditModel(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleUpdate,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Saving..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Save"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialog */ .Lt, {
                open: !!deleteModel,
                onOpenChange: (open)=>{
                    if (!open) setDeleteModel(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            "Delete Model"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Are you sure you want to delete ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: deleteModel?.name
                                        }),
                                        "? The file will be permanently removed from the server."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: COLORS.muted,
                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDelete,
                                    disabled: saving,
                                    style: {
                                        background: COLORS.red,
                                        color: '#fff'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : 'Delete'
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
/* ══════════════════════════════════════════════════════════════════════════════
   MAIN ADMIN TAB COMPONENT
   ══════════════════════════════════════════════════════════════════════════════ */ function AdminTab() {
    /* ── Tab state ── */ const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('users');
    /* ── User management state ── */ const [stats, setStats] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [usersData, setUsersData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [refreshing, setRefreshing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Filters & pagination
    const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [roleFilter, setRoleFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [tierFilter, setTierFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const limit = 20;
    // Edit dialog
    const [editUser, setEditUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editRole, setEditRole] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editTier, setEditTier] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Delete confirmation
    const [deleteUser, setDeleteUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [deleting, setDeleting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // View profile dialog
    const [viewUser, setViewUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // ── Moderation state (suspend/ban/reset-password) ──
    const [moderateUser, setModerateUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [moderateAction, setModerateAction] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('suspend');
    const [moderateReason, setModerateReason] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [moderateDuration, setModerateDuration] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('24'); // hours
    const [moderating, setModerating] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // ── Reset password state ──
    const [resetUser, setResetUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [resetCustomPassword, setResetCustomPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [resetUseCustom, setResetUseCustom] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [resetting, setResetting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [resetResult, setResetResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // ── Status filter ──
    const [statusFilter, setStatusFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    // Debounce search
    const searchTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [searchInput, setSearchInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    /* ── Data Fetching ── */ const fetchStats = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/admin/stats');
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (err) {
            console.error('Failed to fetch admin stats:', err);
        }
    }, []);
    const fetchUsers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (showRefresh = false)=>{
        if (showRefresh) setRefreshing(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                search,
                role: roleFilter === 'all' ? '' : roleFilter,
                tier: tierFilter === 'all' ? '' : tierFilter,
                status: statusFilter === 'all' ? '' : statusFilter
            });
            const res = await fetch(`/api/admin/users?${params}`);
            if (res.ok) {
                const data = await res.json();
                setUsersData(data);
            }
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    }, [
        page,
        search,
        roleFilter,
        tierFilter,
        statusFilter
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchStats();
    }, [
        fetchStats
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchUsers();
    }, [
        fetchUsers
    ]);
    // Re-fetch stats on visibility
    const lastFetchRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handler = (e)=>{
            if (e.detail === 'admin' && Date.now() - lastFetchRef.current > 30000) {
                fetchStats();
                fetchUsers();
            }
        };
        window.addEventListener('medq-tab-visible', handler);
        return ()=>window.removeEventListener('medq-tab-visible', handler);
    }, [
        fetchStats,
        fetchUsers
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        lastFetchRef.current = Date.now();
    }, [
        fetchStats,
        fetchUsers
    ]);
    /* ── Handlers ── */ const handleSearchChange = (value)=>{
        setSearchInput(value);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(()=>{
            setSearch(value);
            setPage(1);
        }, 300);
    };
    const handleRoleFilterChange = (value)=>{
        setRoleFilter(value);
        setPage(1);
    };
    const handleTierFilterChange = (value)=>{
        setTierFilter(value);
        setPage(1);
    };
    const handleRefresh = ()=>{
        setRefreshing(true);
        Promise.all([
            fetchStats(),
            fetchUsers(true)
        ]);
    };
    const handleEditUser = (user)=>{
        setEditUser(user);
        setEditRole(user.role);
        setEditTier(user.tier);
    };
    const handleSaveEdit = async ()=>{
        if (!editUser) return;
        setSaving(true);
        try {
            // Update role
            if (editRole !== editUser.role) {
                const res = await fetch(`/api/admin/users/${editUser.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        role: editRole
                    })
                });
                if (!res.ok) throw new Error('Failed to update role');
            }
            // Update tier
            if (editTier !== editUser.tier) {
                const res = await fetch(`/api/admin/users/${editUser.id}/subscription`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tier: editTier
                    })
                });
                if (!res.ok) throw new Error('Failed to update subscription');
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('User updated successfully');
            setEditUser(null);
            fetchUsers();
            fetchStats();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update user');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleDeleteUser = async ()=>{
        if (!deleteUser) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/admin/users/${deleteUser.id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete user');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('User deleted successfully');
            setDeleteUser(null);
            fetchUsers();
            fetchStats();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete user');
            console.error(err);
        } finally{
            setDeleting(false);
        }
    };
    /* ── Moderation handlers (suspend / ban / activate) ── */ const handleOpenModerate = (user, action)=>{
        setModerateUser(user);
        setModerateAction(action);
        setModerateReason('');
        setModerateDuration('24');
    };
    const handleConfirmModerate = async ()=>{
        if (!moderateUser) return;
        setModerating(true);
        try {
            const body = {
                status: moderateAction === 'activate' ? 'active' : moderateAction
            };
            if (moderateAction !== 'activate') {
                if (moderateReason.trim()) body.reason = moderateReason.trim();
                if (moderateAction === 'suspend') {
                    const hrs = parseInt(moderateDuration, 10);
                    if (!isNaN(hrs) && hrs > 0) body.durationHours = hrs;
                }
            }
            const res = await fetch(`/api/admin/users/${moderateUser.id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || 'Failed to update user status');
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(moderateAction === 'activate' ? 'User reactivated' : moderateAction === 'ban' ? 'User banned' : 'User suspended');
            setModerateUser(null);
            fetchUsers();
            fetchStats();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(err.message || 'Failed to update user status');
        } finally{
            setModerating(false);
        }
    };
    /* ── Reset password handler ── */ const handleOpenReset = (user)=>{
        setResetUser(user);
        setResetCustomPassword('');
        setResetUseCustom(false);
        setResetResult(null);
    };
    const handleConfirmReset = async ()=>{
        if (!resetUser) return;
        setResetting(true);
        setResetResult(null);
        try {
            const body = {};
            if (resetUseCustom) {
                if (resetCustomPassword.length < 8) {
                    sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Password must be at least 8 characters');
                    setResetting(false);
                    return;
                }
                body.newPassword = resetCustomPassword;
            }
            const res = await fetch(`/api/admin/users/${resetUser.id}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || 'Failed to reset password');
            }
            const data = await res.json();
            setResetResult(data.temporaryPassword);
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Password reset successfully');
            fetchUsers();
            fetchStats();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(err.message || 'Failed to reset password');
        } finally{
            setResetting(false);
        }
    };
    /* ── Stat Cards Config ── */ const statCards = stats ? [
        {
            label: 'Total Users',
            value: stats.totalUsers,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.green,
            bgColor: `${COLORS.green}15`,
            trend: stats.usersTrend
        },
        {
            label: 'Premium Users',
            value: stats.premiumUsers,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_46__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.purple,
            bgColor: `${COLORS.purple}15`
        },
        {
            label: 'Pro Users',
            value: stats.proUsers,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.amber,
            bgColor: `${COLORS.amber}15`
        },
        {
            label: 'Total Revenue',
            value: `${formatNumber(stats.totalRevenue)} cr`,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_48__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.blue,
            bgColor: `${COLORS.blue}15`,
            trend: stats.revenueTrend
        },
        {
            label: 'Active Today',
            value: stats.activeToday,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_49__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.red,
            bgColor: `${COLORS.red}15`,
            trend: stats.activeTrend
        },
        // ── Moderation cards (shown when there's something to action) ──
        ...stats.suspendedCount && stats.suspendedCount > 0 ? [
            {
                label: 'Suspended',
                value: stats.suspendedCount,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                    className: "w-5 h-5"
                }),
                color: COLORS.amber,
                bgColor: `${COLORS.amber}15`
            }
        ] : [],
        ...stats.bannedCount && stats.bannedCount > 0 ? [
            {
                label: 'Banned',
                value: stats.bannedCount,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                    className: "w-5 h-5"
                }),
                color: COLORS.red,
                bgColor: `${COLORS.red}15`
            }
        ] : [],
        ...stats.pendingReportsCount && stats.pendingReportsCount > 0 ? [
            {
                label: 'Pending Reports',
                value: stats.pendingReportsCount,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                    className: "w-5 h-5"
                }),
                color: COLORS.purple,
                bgColor: `${COLORS.purple}15`
            }
        ] : []
    ] : [];
    /* ── Loading State ── */ if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatsSkeleton, {}),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TableSkeleton, {})
            ]
        });
    }
    const users = usersData?.users || [];
    const totalPages = usersData?.totalPages || 1;
    const totalUsers = usersData?.total || 0;
    const tabs = [
        {
            key: 'users',
            label: 'Users',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'analytics',
            label: 'Analytics',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_53__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'moderation',
            label: 'Moderation',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                className: "w-4 h-4"
            }),
            badge: stats?.pendingReportsCount
        },
        {
            key: 'revenue',
            label: 'Revenue',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'settings',
            label: 'Settings',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'ads',
            label: 'Ads',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'models',
            label: '3D Models',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'compliance',
            label: 'Compliance',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl flex items-center justify-center",
                                style: {
                                    background: `${COLORS.red}15`
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                                    className: "w-5 h-5",
                                    style: {
                                        color: COLORS.red
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold",
                                        style: {
                                            color: COLORS.text
                                        },
                                        children: "Admin Dashboard"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Manage users, settings, and ads"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: handleRefresh,
                        disabled: refreshing,
                        className: "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                        style: {
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: COLORS.cardBorder,
                            color: COLORS.muted
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_54__/* ["default"] */ .A, {
                                className: `w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "hidden sm:inline",
                                children: "Refresh"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center gap-1 p-1 rounded-xl overflow-x-auto",
                style: {
                    background: COLORS.card,
                    border: `1px solid ${COLORS.cardBorder}`
                },
                children: tabs.map((tab)=>{
                    const isActive = activeTab === tab.key;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setActiveTab(tab.key),
                        className: "relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all flex-1 justify-center whitespace-nowrap",
                        style: {
                            color: isActive ? '#0c0e14' : COLORS.muted,
                            background: isActive ? COLORS.green : 'transparent'
                        },
                        children: [
                            tab.icon,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: tab.label
                            }),
                            typeof tab.badge === 'number' && tab.badge > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "ml-0.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold",
                                style: {
                                    background: isActive ? 'rgba(0,0,0,0.2)' : `${COLORS.red}25`,
                                    color: isActive ? '#0c0e14' : COLORS.red
                                },
                                children: tab.badge > 99 ? '99+' : tab.badge
                            })
                        ]
                    }, tab.key);
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_55__/* .AnimatePresence */ .N, {
                mode: "wait",
                children: [
                    activeTab === 'users' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3",
                                children: statCards.map((stat, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                        label: stat.label,
                                        value: stat.value,
                                        icon: stat.icon,
                                        color: stat.color,
                                        bgColor: stat.bgColor,
                                        trend: stat.trend,
                                        index: i
                                    }, stat.label))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                                initial: {
                                    opacity: 0,
                                    y: 16
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.4,
                                    delay: 0.4
                                },
                                className: "rounded-2xl border",
                                style: {
                                    background: COLORS.card,
                                    borderColor: COLORS.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "p-4 border-b",
                                        style: {
                                            borderColor: COLORS.cardBorder
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex flex-col sm:flex-row items-start sm:items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "relative flex-1 w-full sm:max-w-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                                                            style: {
                                                                color: COLORS.muted
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                            type: "text",
                                                            placeholder: "Search users...",
                                                            value: searchInput,
                                                            onChange: (e)=>handleSearchChange(e.target.value),
                                                            className: "w-full h-9 pl-9 pr-3 rounded-lg text-xs outline-none transition-all border",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.03)',
                                                                borderColor: COLORS.cardBorder,
                                                                color: COLORS.text
                                                            }
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: roleFilter,
                                                    onValueChange: handleRoleFilterChange,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full sm:w-[140px] text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.03)',
                                                                borderColor: COLORS.cardBorder,
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                                                placeholder: "Role"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "all",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "All Roles"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "student",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Student"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "educator",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Educator"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "admin",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Admin"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: tierFilter,
                                                    onValueChange: handleTierFilterChange,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full sm:w-[140px] text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.03)',
                                                                borderColor: COLORS.cardBorder,
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                                                placeholder: "Tier"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "all",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "All Tiers"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "free",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Free"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "premium",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Premium"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "pro",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Pro"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: statusFilter,
                                                    onValueChange: (v)=>{
                                                        setStatusFilter(v);
                                                        setPage(1);
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full sm:w-[140px] text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.03)',
                                                                borderColor: COLORS.cardBorder,
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                                                placeholder: "Status"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "all",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "All Statuses"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "active",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Active"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "suspended",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Suspended"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "banned",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Banned"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[10px] ml-auto",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: [
                                                        totalUsers,
                                                        " user",
                                                        totalUsers !== 1 ? 's' : '',
                                                        " found"
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "overflow-x-auto",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                                            className: "w-full text-sm",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                        className: "border-b",
                                                        style: {
                                                            borderColor: COLORS.cardBorder
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "User"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Email"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Role"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Tier"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Status"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Credits"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Joined"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-right px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Actions"
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
                                                    children: users.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                            colSpan: 8,
                                                            className: "px-4 py-12 text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                                                                    className: "w-8 h-8 mx-auto mb-2",
                                                                    style: {
                                                                        color: COLORS.dimmed
                                                                    }
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs",
                                                                    style: {
                                                                        color: COLORS.dimmed
                                                                    },
                                                                    children: "No users found. Try adjusting your search or filters."
                                                                })
                                                            ]
                                                        })
                                                    }) : users.map((user)=>{
                                                        const initials = getInitials(user.name, user.email);
                                                        const roleColor = ROLE_COLORS[user.role] || COLORS.muted;
                                                        const tierColor = TIER_COLORS[user.tier] || COLORS.muted;
                                                        const userStatus = user.status || 'active';
                                                        const statusColor = USER_STATUS_COLORS[userStatus] || COLORS.muted;
                                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                            className: "border-b transition-colors hover:bg-white/[0.02]",
                                                            style: {
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.04))'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                                className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                                                                                style: {
                                                                                    background: `${roleColor}20`,
                                                                                    color: roleColor
                                                                                },
                                                                                children: initials
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "text-xs font-medium truncate max-w-[120px]",
                                                                                style: {
                                                                                    color: COLORS.text
                                                                                },
                                                                                children: user.name || 'Unnamed'
                                                                            })
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "text-xs truncate max-w-[160px] block",
                                                                        style: {
                                                                            color: COLORS.muted
                                                                        },
                                                                        children: user.email || '—'
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                                        style: {
                                                                            background: `${roleColor}15`,
                                                                            color: roleColor,
                                                                            border: `1px solid ${roleColor}30`
                                                                        },
                                                                        children: user.role
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                                        style: {
                                                                            background: `${tierColor}15`,
                                                                            color: tierColor,
                                                                            border: `1px solid ${tierColor}30`
                                                                        },
                                                                        children: user.tier
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                                            style: {
                                                                                background: `${statusColor}15`,
                                                                                color: statusColor,
                                                                                border: `1px solid ${statusColor}30`
                                                                            },
                                                                            title: user.suspendedReason || user.bannedReason || undefined,
                                                                            children: [
                                                                                userStatus === 'suspended' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                                                                    className: "w-2.5 h-2.5"
                                                                                }),
                                                                                userStatus === 'banned' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                                                                    className: "w-2.5 h-2.5"
                                                                                }),
                                                                                userStatus
                                                                            ]
                                                                        }),
                                                                        userStatus === 'suspended' && user.suspendedUntil && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                            className: "text-[9px] mt-1",
                                                                            style: {
                                                                                color: COLORS.dimmed
                                                                            },
                                                                            children: [
                                                                                "until ",
                                                                                formatDate(user.suspendedUntil)
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "text-xs font-medium",
                                                                        style: {
                                                                            color: COLORS.text
                                                                        },
                                                                        children: formatNumber(user.credits)
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "text-xs",
                                                                        style: {
                                                                            color: COLORS.muted
                                                                        },
                                                                        children: formatDate(user.createdAt)
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center justify-end gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>setViewUser(user),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "View Profile",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.blue
                                                                                    }
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>handleEditUser(user),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "Edit User",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_56__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.purple
                                                                                    }
                                                                                })
                                                                            }),
                                                                            userStatus === 'active' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                        onClick: ()=>handleOpenModerate(user, 'suspend'),
                                                                                        className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                        title: "Suspend User",
                                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                                                                            className: "w-3.5 h-3.5",
                                                                                            style: {
                                                                                                color: COLORS.amber
                                                                                            }
                                                                                        })
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                        onClick: ()=>handleOpenModerate(user, 'ban'),
                                                                                        className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                        title: "Ban User",
                                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                                                                            className: "w-3.5 h-3.5",
                                                                                            style: {
                                                                                                color: COLORS.red
                                                                                            }
                                                                                        })
                                                                                    })
                                                                                ]
                                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>handleOpenModerate(user, 'activate'),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "Reactivate User",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_57__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.green
                                                                                    }
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>handleOpenReset(user),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "Reset Password",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_58__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.cyan
                                                                                    }
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>setDeleteUser(user),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "Delete User",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.red
                                                                                    }
                                                                                })
                                                                            })
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        }, user.id);
                                                    })
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between px-4 py-3 border-t",
                                        style: {
                                            borderColor: COLORS.cardBorder
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[10px]",
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: [
                                                    "Page ",
                                                    page,
                                                    " of ",
                                                    totalPages
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                                        variant: "ghost",
                                                        size: "sm",
                                                        onClick: ()=>setPage(Math.max(1, page - 1)),
                                                        disabled: page <= 1,
                                                        className: "h-8 px-2 text-xs",
                                                        style: {
                                                            color: COLORS.muted
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                                                className: "w-4 h-4 mr-1"
                                                            }),
                                                            "Previous"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                                        variant: "ghost",
                                                        size: "sm",
                                                        onClick: ()=>setPage(Math.min(totalPages, page + 1)),
                                                        disabled: page >= totalPages,
                                                        className: "h-8 px-2 text-xs",
                                                        style: {
                                                            color: COLORS.muted
                                                        },
                                                        children: [
                                                            "Next",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                                                className: "w-4 h-4 ml-1"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, "users"),
                    activeTab === 'analytics' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AnalyticsTab__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {})
                    }, "analytics"),
                    activeTab === 'moderation' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ModerationTab__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {})
                    }, "moderation"),
                    activeTab === 'revenue' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_RevenueTab__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {})
                    }, "revenue"),
                    activeTab === 'models' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModelsTab, {})
                    }, "models"),
                    activeTab === 'settings' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsTab, {})
                    }, "settings"),
                    activeTab === 'ads' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AdsTab, {})
                    }, "ads"),
                    activeTab === 'compliance' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_compliance_ComplianceDashboard__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {})
                    }, "compliance")
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editUser,
                onOpenChange: (open)=>{
                    if (!open) setEditUser(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit User"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Change role and subscription tier for ",
                                        editUser?.name || editUser?.email
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Role"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: editRole,
                                            onValueChange: setEditRole,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "student",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Student"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "educator",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Educator"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "admin",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Admin"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Subscription Tier"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: editTier,
                                            onValueChange: setEditTier,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "free",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Free"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "premium",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Premium"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "pro",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Pro"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditUser(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleSaveEdit,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Saving..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Save Changes"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialog */ .Lt, {
                open: !!deleteUser,
                onOpenChange: (open)=>{
                    if (!open) setDeleteUser(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            "Delete User"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Are you sure you want to delete ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: deleteUser?.name || deleteUser?.email
                                        }),
                                        "? This action cannot be undone. All user data including subscriptions, credits, and study history will be permanently removed."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: COLORS.muted,
                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDeleteUser,
                                    disabled: deleting,
                                    style: {
                                        background: COLORS.red,
                                        color: '#fff'
                                    },
                                    children: deleting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Deleting..."
                                        ]
                                    }) : 'Delete User'
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!viewUser,
                onOpenChange: (open)=>{
                    if (!open) setViewUser(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                style: {
                                    color: COLORS.text
                                },
                                children: "User Profile"
                            })
                        }),
                        viewUser && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0",
                                            style: {
                                                background: `${ROLE_COLORS[viewUser.role] || COLORS.muted}20`,
                                                color: ROLE_COLORS[viewUser.role] || COLORS.muted
                                            },
                                            children: getInitials(viewUser.name, viewUser.email)
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-sm font-bold",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: viewUser.name || 'Unnamed User'
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-xs",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: viewUser.email || 'No email'
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Role"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${ROLE_COLORS[viewUser.role] || COLORS.muted}15`,
                                                        color: ROLE_COLORS[viewUser.role] || COLORS.muted,
                                                        border: `1px solid ${ROLE_COLORS[viewUser.role] || COLORS.muted}30`
                                                    },
                                                    children: viewUser.role
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Tier"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${TIER_COLORS[viewUser.tier] || COLORS.muted}15`,
                                                        color: TIER_COLORS[viewUser.tier] || COLORS.muted,
                                                        border: `1px solid ${TIER_COLORS[viewUser.tier] || COLORS.muted}30`
                                                    },
                                                    children: viewUser.tier
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Status"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${USER_STATUS_COLORS[viewUser.status || 'active'] || COLORS.muted}15`,
                                                        color: USER_STATUS_COLORS[viewUser.status || 'active'] || COLORS.muted,
                                                        border: `1px solid ${USER_STATUS_COLORS[viewUser.status || 'active'] || COLORS.muted}30`
                                                    },
                                                    children: viewUser.status || 'active'
                                                }),
                                                viewUser.status === 'suspended' && viewUser.suspendedUntil && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[10px] mt-1",
                                                    style: {
                                                        color: COLORS.dimmed
                                                    },
                                                    children: [
                                                        "Until ",
                                                        formatDate(viewUser.suspendedUntil)
                                                    ]
                                                }),
                                                viewUser.status === 'suspended' && viewUser.suspendedReason && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[10px] mt-1 italic",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: [
                                                        "“",
                                                        viewUser.suspendedReason,
                                                        "”"
                                                    ]
                                                }),
                                                viewUser.status === 'banned' && viewUser.bannedReason && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[10px] mt-1 italic",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: [
                                                        "“",
                                                        viewUser.bannedReason,
                                                        "”"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Credits"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-sm font-bold",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: viewUser.credits
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Joined"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: formatDate(viewUser.createdAt)
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Last Active"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: viewUser.lastActiveAt ? formatDate(viewUser.lastActiveAt) : '—'
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "rounded-lg p-3 border",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)',
                                        borderColor: COLORS.cardBorder
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] font-medium mb-1",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "User ID"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] font-mono",
                                            style: {
                                                color: COLORS.dimmed
                                            },
                                            children: viewUser.id
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setViewUser(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Close"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: ()=>{
                                        if (viewUser) {
                                            handleEditUser(viewUser);
                                            setViewUser(null);
                                        }
                                    },
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.purple,
                                        color: '#fff'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_56__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5"
                                        }),
                                        "Edit User"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!moderateUser,
                onOpenChange: (open)=>{
                    if (!open) setModerateUser(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            moderateAction === 'suspend' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.amber
                                                }
                                            }),
                                            moderateAction === 'ban' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            moderateAction === 'activate' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_57__/* ["default"] */ .A, {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.green
                                                }
                                            }),
                                            moderateAction === 'suspend' && 'Suspend User',
                                            moderateAction === 'ban' && 'Ban User',
                                            moderateAction === 'activate' && 'Reactivate User'
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: moderateAction === 'activate' ? `This will lift any suspension or ban on ${moderateUser?.name || moderateUser?.email}.` : moderateAction === 'ban' ? `Permanently ban ${moderateUser?.name || moderateUser?.email}. They will be unable to sign in.` : `Temporarily suspend ${moderateUser?.name || moderateUser?.email}. They will be unable to sign in until reinstated.`
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                moderateAction === 'suspend' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Duration (hours)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: moderateDuration,
                                            onValueChange: setModerateDuration,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "1",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "1 hour"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "6",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "6 hours"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "24",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "24 hours"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "72",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "3 days"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "168",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "7 days"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "720",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "30 days"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "indefinite",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Indefinite"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                moderateAction !== 'activate' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: [
                                                "Reason ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    style: {
                                                        color: COLORS.dimmed
                                                    },
                                                    children: "(optional)"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: moderateReason,
                                            onChange: (e)=>setModerateReason(e.target.value),
                                            placeholder: "e.g. Spamming study group chats, abusive language, etc.",
                                            rows: 3,
                                            className: "w-full p-2 rounded-lg text-xs outline-none transition-all border resize-none",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setModerateUser(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleConfirmModerate,
                                    disabled: moderating,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: moderateAction === 'activate' ? COLORS.green : moderateAction === 'ban' ? COLORS.red : COLORS.amber,
                                        color: moderateAction === 'activate' ? '#0c0e14' : '#fff'
                                    },
                                    children: moderating ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Processing..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            moderateAction === 'suspend' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            moderateAction === 'ban' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            moderateAction === 'activate' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_57__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Confirm ",
                                            moderateAction === 'activate' ? 'Reactivate' : moderateAction
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!resetUser,
                onOpenChange: (open)=>{
                    if (!open) {
                        setResetUser(null);
                        setResetResult(null);
                    }
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_58__/* ["default"] */ .A, {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.cyan
                                                }
                                            }),
                                            "Reset Password"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Reset the password for ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: resetUser?.name || resetUser?.email
                                        }),
                                        ". The user will need to use the new password to sign in."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-4 py-2",
                            children: resetResult ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-lg p-3 border",
                                style: {
                                    background: `${COLORS.green}10`,
                                    borderColor: `${COLORS.green}40`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] font-semibold uppercase tracking-wider mb-1",
                                        style: {
                                            color: COLORS.green
                                        },
                                        children: "Temporary Password"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-sm font-mono font-bold break-all",
                                        style: {
                                            color: COLORS.text
                                        },
                                        children: resetResult
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] mt-2",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Copy this password and share it securely with the user. It will not be shown again."
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>setResetUseCustom(false),
                                                className: "flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                                                style: {
                                                    background: !resetUseCustom ? `${COLORS.cyan}15` : 'transparent',
                                                    borderColor: !resetUseCustom ? `${COLORS.cyan}40` : COLORS.cardBorder,
                                                    color: !resetUseCustom ? COLORS.cyan : COLORS.muted
                                                },
                                                children: "Auto-generate"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>setResetUseCustom(true),
                                                className: "flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                                                style: {
                                                    background: resetUseCustom ? `${COLORS.cyan}15` : 'transparent',
                                                    borderColor: resetUseCustom ? `${COLORS.cyan}40` : COLORS.cardBorder,
                                                    color: resetUseCustom ? COLORS.cyan : COLORS.muted
                                                },
                                                children: "Custom password"
                                            })
                                        ]
                                    }),
                                    resetUseCustom && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                className: "text-xs font-medium",
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: "New password (min 8 characters)"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                type: "text",
                                                value: resetCustomPassword,
                                                onChange: (e)=>setResetCustomPassword(e.target.value),
                                                placeholder: "Enter new password...",
                                                className: "w-full h-9 px-3 rounded-lg text-xs outline-none transition-all border",
                                                style: {
                                                    background: 'rgba(255,255,255,0.05)',
                                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                    color: COLORS.text
                                                }
                                            })
                                        ]
                                    }),
                                    !resetUseCustom && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px]",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "A random 12-character password will be generated and shown to you once the reset is complete."
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: resetResult ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        variant: "ghost",
                                        onClick: ()=>{
                                            setResetUser(null);
                                            setResetResult(null);
                                        },
                                        className: "text-xs",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Close"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        onClick: ()=>{
                                            if (resetResult) {
                                                navigator.clipboard.writeText(resetResult).then(()=>{
                                                    sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Password copied to clipboard');
                                                }).catch(()=>{
                                                    sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to copy');
                                                });
                                            }
                                        },
                                        className: "text-xs font-medium",
                                        style: {
                                            background: COLORS.green,
                                            color: '#0c0e14'
                                        },
                                        children: "Copy Password"
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        variant: "ghost",
                                        onClick: ()=>setResetUser(null),
                                        className: "text-xs",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Cancel"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        onClick: handleConfirmReset,
                                        disabled: resetting,
                                        className: "text-xs font-medium",
                                        style: {
                                            background: COLORS.cyan,
                                            color: '#0c0e14'
                                        },
                                        children: resetting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                                }),
                                                "Resetting..."
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_58__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 mr-1.5"
                                                }),
                                                "Reset Password"
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 85635:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ComplianceDashboard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5736);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34018);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(81402);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6923);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(11012);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(50825);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96391);
/* __next_internal_client_entry_do_not_use__ default auto */ 



/* ═══════════════════════════════════════════════════════════════
   COLOR CONSTANTS (MedQ Dark Theme)
   ═══════════════════════════════════════════════════════════════ */ const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, rgba(255,255,255,0.03))',
    cardSolid: '#151821',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    amber: 'var(--medq-accent-amber, #f59e0b)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    orange: 'var(--medq-accent-amber, #f97316)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: '#8b95a8',
    dimmed: '#5a6478',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    purple: 'var(--medq-accent-purple, #8b5cf6)'
};
const SEVERITY_CONFIG = {
    info: {
        color: C.cyan,
        bg: 'rgba(34,211,238,0.08)',
        border: 'rgba(34,211,238,0.2)'
    },
    warning: {
        color: C.amber,
        bg: 'rgba(245,158,11,0.08)',
        border: 'rgba(245,158,11,0.2)'
    },
    critical: {
        color: C.danger,
        bg: 'rgba(255,87,87,0.08)',
        border: 'rgba(255,87,87,0.2)'
    }
};
const ENCRYPTION_LEVELS = [
    {
        value: 'none',
        label: 'None',
        description: 'No encryption. Messages stored and transmitted in plaintext. Not recommended for healthcare.',
        color: C.danger
    },
    {
        value: 'transport',
        label: 'Transport (TLS)',
        description: 'Messages encrypted in transit via TLS. Server can read messages. Standard for most web apps.',
        color: C.amber
    },
    {
        value: 'e2e',
        label: 'End-to-End',
        description: 'Client-side encryption using Signal Protocol. Server cannot read messages. Recommended for HIPAA compliance.',
        color: C.green
    }
];
/* ═══════════════════════════════════════════════════════════════
   COMPLIANCE DASHBOARD
   ═══════════════════════════════════════════════════════════════ */ function ComplianceDashboard() {
    const store = (0,_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y)();
    const [activeSection, setActiveSection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('settings');
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [severityFilter, setSeverityFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [retentionRunning, setRetentionRunning] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Load settings on mount
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const loadSettings = async ()=>{
            _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setLoading(true);
            try {
                const res = await fetch('/api/compliance');
                if (res.ok) {
                    const data = await res.json();
                    _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setSettings(data.settings);
                }
            } catch (e) {
                console.error('Failed to load compliance settings:', e);
            } finally{
                _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setLoading(false);
            }
        };
        loadSettings();
    }, []);
    // Load audit logs
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const loadLogs = async ()=>{
            try {
                const res = await fetch(`/api/audit/log?limit=100`);
                if (res.ok) {
                    const data = await res.json();
                    _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setAuditLogs(data.logs || []);
                }
            } catch (e) {
                console.error('Failed to load audit logs:', e);
            }
        };
        if (activeSection === 'audit') loadLogs();
    }, [
        activeSection
    ]);
    // Save settings
    const saveSettings = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setSaving(true);
        try {
            const res = await fetch('/api/compliance', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(store.settings)
            });
            if (res.ok) {
                const data = await res.json();
                _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setSettings(data.settings);
            }
        } catch (e) {
            console.error('Failed to save settings:', e);
        } finally{
            setSaving(false);
        }
    }, [
        store.settings
    ]);
    // Execute retention
    const executeRetention = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setRetentionRunning(true);
        try {
            const res = await fetch('/api/compliance/retention', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    retentionDays: store.settings.retentionDays
                })
            });
            if (res.ok) {
                const data = await res.json();
                alert(`Retention executed: ${data.messagesPurged} messages purged.`);
            }
        } catch (e) {
            console.error('Retention error:', e);
        } finally{
            setRetentionRunning(false);
        }
    }, [
        store.settings.retentionDays
    ]);
    // Filter audit logs
    const filteredLogs = store.auditLogs.filter((log)=>{
        if (severityFilter !== 'all' && log.severity !== severityFilter) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return (log.details || '').toLowerCase().includes(q) || (log.action || '').toLowerCase().includes(q) || (log.eventType || '').toLowerCase().includes(q) || (log.resource || '').toLowerCase().includes(q);
        }
        return true;
    });
    const sections = [
        {
            key: 'settings',
            label: 'Encryption & Settings',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'audit',
            label: 'Audit Logs',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'retention',
            label: 'Data Retention',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'baa',
            label: 'BAA Document',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-10 h-10 rounded-xl flex items-center justify-center",
                        style: {
                            background: 'rgba(139,92,246,0.12)',
                            border: '1px solid rgba(139,92,246,0.2)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                            className: "w-5 h-5",
                            style: {
                                color: C.purple
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-bold",
                                style: {
                                    color: C.text
                                },
                                children: "HIPAA Compliance"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[11px]",
                                style: {
                                    color: C.dimmed
                                },
                                children: "Encryption, audit logging, data retention, and BAA management"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex gap-1 p-1 rounded-xl",
                style: {
                    background: C.cardSolid
                },
                children: sections.map((sec)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setActiveSection(sec.key),
                        className: "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[12px] font-medium transition-all",
                        style: {
                            background: activeSection === sec.key ? 'rgba(139,92,246,0.12)' : 'transparent',
                            color: activeSection === sec.key ? C.purple : C.dimmed,
                            border: activeSection === sec.key ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent'
                        },
                        children: [
                            sec.icon,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "hidden sm:inline",
                                children: sec.label
                            })
                        ]
                    }, sec.key))
            }),
            activeSection === 'settings' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-5",
                        style: {
                            background: C.cardSolid,
                            border: `1px solid ${C.cardBorder}`
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold mb-3",
                                style: {
                                    color: C.text
                                },
                                children: "Encryption Level"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "space-y-2",
                                children: ENCRYPTION_LEVELS.map((level)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('encryptionLevel', level.value),
                                        className: "w-full text-left p-3 rounded-lg transition-all",
                                        style: {
                                            background: store.settings.encryptionLevel === level.value ? `${level.color}10` : C.card,
                                            border: `1px solid ${store.settings.encryptionLevel === level.value ? `${level.color}30` : C.cardBorder}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "w-3 h-3 rounded-full flex-shrink-0",
                                                        style: {
                                                            background: level.color
                                                        }
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-sm font-semibold",
                                                        style: {
                                                            color: level.color
                                                        },
                                                        children: level.label
                                                    }),
                                                    store.settings.encryptionLevel === level.value && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 ml-auto",
                                                        style: {
                                                            color: level.color
                                                        }
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[11px] ml-5",
                                                style: {
                                                    color: C.dimmed
                                                },
                                                children: level.description
                                            })
                                        ]
                                    }, level.value))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-xl p-4",
                                style: {
                                    background: C.cardSolid,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        className: "text-sm font-semibold mb-2",
                                        style: {
                                            color: C.text
                                        },
                                        children: "Data Retention"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[11px] mb-3",
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "Messages older than this period will be automatically purged"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                type: "number",
                                                min: 30,
                                                max: 3650,
                                                value: store.settings.retentionDays,
                                                onChange: (e)=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('retentionDays', parseInt(e.target.value) || 365),
                                                className: "flex-1 px-3 py-2 rounded-lg text-sm outline-none",
                                                style: {
                                                    background: C.card,
                                                    border: `1px solid ${C.cardBorder}`,
                                                    color: C.text
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[11px]",
                                                style: {
                                                    color: C.dimmed
                                                },
                                                children: "days"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-xl p-4",
                                style: {
                                    background: C.cardSolid,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        className: "text-sm font-semibold mb-2",
                                        style: {
                                            color: C.text
                                        },
                                        children: "Audit Logging"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[11px] mb-3",
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "Record all access events and compliance actions"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('auditLogging', !store.settings.auditLogging),
                                        className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                                        style: {
                                            background: store.settings.auditLogging ? `${C.green}12` : `${C.danger}12`,
                                            color: store.settings.auditLogging ? C.green : C.danger,
                                            border: `1px solid ${store.settings.auditLogging ? `${C.green}25` : `${C.danger}25`}`
                                        },
                                        children: [
                                            store.settings.auditLogging ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            }),
                                            store.settings.auditLogging ? 'Enabled' : 'Disabled'
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: saveSettings,
                        disabled: saving,
                        className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                        style: {
                            background: `${C.purple}15`,
                            color: C.purple,
                            border: `1px solid ${C.purple}30`
                        },
                        children: [
                            saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "w-4 h-4 animate-spin"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            "Save Compliance Settings"
                        ]
                    })
                ]
            }),
            activeSection === 'audit' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                                        style: {
                                            color: C.dimmed
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        placeholder: "Search audit logs...",
                                        className: "w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none",
                                        style: {
                                            background: C.cardSolid,
                                            border: `1px solid ${C.cardBorder}`,
                                            color: C.text
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                value: severityFilter,
                                onChange: (e)=>setSeverityFilter(e.target.value),
                                className: "px-3 py-2 rounded-lg text-sm outline-none",
                                style: {
                                    background: C.cardSolid,
                                    border: `1px solid ${C.cardBorder}`,
                                    color: C.text
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        value: "all",
                                        children: "All Severity"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        value: "info",
                                        children: "Info"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        value: "warning",
                                        children: "Warning"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        value: "critical",
                                        children: "Critical"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "rounded-xl overflow-hidden",
                        style: {
                            border: `1px solid ${C.cardBorder}`
                        },
                        children: filteredLogs.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-center py-8",
                            style: {
                                color: C.dimmed
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                    className: "w-8 h-8 mx-auto mb-2 opacity-30"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-sm",
                                    children: "No audit logs found"
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "divide-y",
                            style: {
                                borderColor: C.cardBorder
                            },
                            children: filteredLogs.slice(0, 50).map((log)=>{
                                const sevConfig = SEVERITY_CONFIG[log.severity] || SEVERITY_CONFIG.info;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "p-3 hover:bg-white/[0.02] transition-colors",
                                    style: {
                                        background: C.cardSolid
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                                                style: {
                                                    background: sevConfig.color
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-2 flex-wrap",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[12px] font-semibold",
                                                                style: {
                                                                    color: sevConfig.color
                                                                },
                                                                children: log.eventType
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[10px] px-1.5 py-0.5 rounded",
                                                                style: {
                                                                    background: sevConfig.bg,
                                                                    color: sevConfig.color,
                                                                    border: `1px solid ${sevConfig.border}`
                                                                },
                                                                children: log.severity
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[10px]",
                                                                style: {
                                                                    color: C.dimmed
                                                                },
                                                                children: log.resource
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-[11px] mt-0.5",
                                                        style: {
                                                            color: C.muted
                                                        },
                                                        children: log.details
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-3 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "text-[10px]",
                                                                style: {
                                                                    color: C.dimmed
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                                        className: "w-3 h-3 inline mr-0.5"
                                                                    }),
                                                                    new Date(log.timestamp).toLocaleString()
                                                                ]
                                                            }),
                                                            log.userId && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "text-[10px]",
                                                                style: {
                                                                    color: C.dimmed
                                                                },
                                                                children: [
                                                                    "User: ",
                                                                    log.userId.slice(0, 8),
                                                                    "..."
                                                                ]
                                                            }),
                                                            log.ipAddress && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "text-[10px]",
                                                                style: {
                                                                    color: C.dimmed
                                                                },
                                                                children: [
                                                                    "IP: ",
                                                                    log.ipAddress
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }, log.id);
                            })
                        })
                    })
                ]
            }),
            activeSection === 'retention' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-5",
                        style: {
                            background: C.cardSolid,
                            border: `1px solid ${C.cardBorder}`
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold mb-3",
                                style: {
                                    color: C.text
                                },
                                children: "Data Retention Policy"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-[11px] mb-4",
                                style: {
                                    color: C.dimmed
                                },
                                children: [
                                    "Messages older than ",
                                    store.settings.retentionDays,
                                    " days will be permanently purged. This action cannot be undone. HIPAA requires a minimum of 6 years (2,190 days) for some record types."
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "grid grid-cols-2 gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "p-3 rounded-lg",
                                        style: {
                                            background: C.card,
                                            border: `1px solid ${C.cardBorder}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] uppercase",
                                                style: {
                                                    color: C.dimmed
                                                },
                                                children: "Retention Period"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-lg font-bold",
                                                style: {
                                                    color: C.cyan
                                                },
                                                children: [
                                                    store.settings.retentionDays,
                                                    " days"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "p-3 rounded-lg",
                                        style: {
                                            background: C.card,
                                            border: `1px solid ${C.cardBorder}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] uppercase",
                                                style: {
                                                    color: C.dimmed
                                                },
                                                children: "Policy Status"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-lg font-bold",
                                                style: {
                                                    color: C.green
                                                },
                                                children: "Active"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: executeRetention,
                                disabled: retentionRunning,
                                className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                                style: {
                                    background: `${C.danger}12`,
                                    color: C.danger,
                                    border: `1px solid ${C.danger}25`
                                },
                                children: [
                                    retentionRunning ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-4 h-4 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    "Execute Retention Now"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "rounded-xl p-4",
                        style: {
                            background: 'rgba(245,158,11,0.06)',
                            border: '1px solid rgba(245,158,11,0.15)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-start gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                    className: "w-5 h-5 flex-shrink-0",
                                    style: {
                                        color: C.amber
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-sm font-semibold",
                                            style: {
                                                color: C.amber
                                            },
                                            children: "Important Notice"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[11px] mt-1",
                                            style: {
                                                color: C.muted
                                            },
                                            children: "Executing retention will permanently modify messages older than the retention period. Ensure you have proper backups and that your retention policy complies with applicable regulations (HIPAA requires minimum 6-year retention for designated record sets). This action is logged in the audit trail."
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            }),
            activeSection === 'baa' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "space-y-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "rounded-xl p-5",
                    style: {
                        background: C.cardSolid,
                        border: `1px solid ${C.cardBorder}`
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                            className: "text-sm font-semibold mb-3",
                            style: {
                                color: C.text
                            },
                            children: "Business Associate Agreement (BAA)"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[11px] mb-4",
                            style: {
                                color: C.dimmed
                            },
                            children: "A BAA is required between a covered entity (healthcare organization) and a business associate (this platform) for HIPAA compliance when handling PHI. Without a signed BAA, this platform should not be used for protected health information."
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-[10px] font-bold uppercase mb-1 block",
                                            style: {
                                                color: C.dimmed
                                            },
                                            children: "Organization Name"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "text",
                                            value: store.settings.baaOrganization || '',
                                            onChange: (e)=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('baaOrganization', e.target.value),
                                            placeholder: "Enter organization name...",
                                            className: "w-full px-3 py-2 rounded-lg text-sm outline-none",
                                            style: {
                                                background: C.card,
                                                border: `1px solid ${C.cardBorder}`,
                                                color: C.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: ()=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('baaSigned', !store.settings.baaSigned),
                                            className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                                            style: {
                                                background: store.settings.baaSigned ? `${C.green}12` : `${C.danger}12`,
                                                color: store.settings.baaSigned ? C.green : C.danger,
                                                border: `1px solid ${store.settings.baaSigned ? `${C.green}25` : `${C.danger}25`}`
                                            },
                                            children: [
                                                store.settings.baaSigned ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                }),
                                                "BAA ",
                                                store.settings.baaSigned ? 'Signed' : 'Not Signed'
                                            ]
                                        }),
                                        store.settings.baaSigned && store.settings.baaSignedDate && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[11px]",
                                            style: {
                                                color: C.dimmed
                                            },
                                            children: [
                                                "Signed on: ",
                                                new Date(store.settings.baaSignedDate).toLocaleDateString()
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>{
                                // Generate and download BAA template
                                const baaText = generateBAATemplate(store.settings.baaOrganization || '[Organization Name]');
                                const blob = new Blob([
                                    baaText
                                ], {
                                    type: 'text/plain'
                                });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `BAA-${(store.settings.baaOrganization || 'template').replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.txt`;
                                a.click();
                                URL.revokeObjectURL(url);
                            },
                            className: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
                            style: {
                                background: `${C.purple}12`,
                                color: C.purple,
                                border: `1px solid ${C.purple}25`
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                "Download BAA Template"
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
/* ═══════════════════════════════════════════════════════════════
   BAA DOCUMENT TEMPLATE GENERATOR
   ═══════════════════════════════════════════════════════════════ */ function generateBAATemplate(organizationName) {
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return `
BUSINESS ASSOCIATE AGREEMENT
==============================

This Business Associate Agreement ("BAA") is entered into as of ${date}
("Effective Date"), by and between:

COVERED ENTITY:  ${organizationName}
                 ("Covered Entity")

BUSINESS ASSOCIATE:  MedQ Platform
                     ("Business Associate")

RECITALS
--------

WHEREAS, Covered Entity is a covered entity as defined under the Health
Insurance Portability and Accountability Act of 1996 ("HIPAA"),
as amended by the Health Information Technology for Economic and Clinical
Health Act ("HITECH Act"); and

WHEREAS, Business Associate provides certain services to Covered Entity
that involve the creation, receipt, maintenance, or transmission of
Protected Health Information ("PHI"); and

WHEREAS, the parties desire to comply with the requirements of HIPAA,
the HITECH Act, and implementing regulations at 45 CFR Parts 160 and 164;

NOW, THEREFORE, the parties agree as follows:

1. DEFINITIONS
--------------

1.1 "Protected Health Information" or "PHI" means individually identifiable
health information held by or on behalf of Business Associate that is
created, received, maintained, or transmitted on behalf of Covered Entity.

1.2 "Breach" means the acquisition, access, use, or disclosure of PHI
in a manner not permitted by HIPAA which compromises the security or
privacy of such PHI.

1.3 "Data Aggregation" means the combining of PHI created or received
by Business Associate on behalf of Covered Entity.

1.4 "Designated Record Set" means a group of records maintained by or
for a covered entity that is the medical or billing records about
individuals; enrollment, payment, claims adjudication, and case
management records; or records used to make decisions about individuals.

1.5 "Security Incident" means the attempted or successful unauthorized
access, use, disclosure, modification, or destruction of information
or interference with system operations in an information system.

1.6 All other capitalized terms not defined herein shall have the same
meaning as those terms in the HIPAA Rules.

2. OBLIGATIONS OF BUSINESS ASSOCIATE
-------------------------------------

2.1 Business Associate shall not use or disclose PHI other than as
permitted or required by this Agreement or as required by law.

2.2 Business Associate shall use appropriate safeguards to prevent use
or disclosure of PHI other than as provided for by this Agreement.

2.3 Business Associate shall implement administrative, physical, and
technical safeguards that reasonably and appropriately protect the
confidentiality, integrity, and availability of PHI.

2.4 Business Associate shall ensure that any agent or subcontractor
to whom it provides PHI agrees to the same restrictions and conditions
that apply to Business Associate under this Agreement.

2.5 Business Associate shall report to Covered Entity any Security
Incident or Breach of which it becomes aware, without unreasonable
delay, and in no event later than thirty (30) calendar days after
discovery.

2.6 Business Associate shall make available to Covered Entity PHI in
a Designated Record Set, as necessary for Covered Entity to fulfill
its obligations under 45 CFR § 164.524 (access) and § 164.526
(amendment).

2.7 Business Associate shall make available to Covered Entity
information required to provide an accounting of disclosures of PHI
in accordance with 45 CFR § 164.528.

3. OBLIGATIONS OF COVERED ENTITY
----------------------------------

3.1 Covered Entity shall notify Business Associate of any limitation
in the notice of privacy practices of Covered Entity, in accordance
with 45 CFR § 164.520, or any changes in such limitation, that may
affect Business Associate's use or disclosure of PHI.

3.2 Covered Entity shall notify Business Associate of any changes in,
or revocation of, permission by an individual to use or disclose PHI,
to the extent that such changes may affect Business Associate's use
or disclosure of PHI.

3.3 Covered Entity shall notify Business Associate of any restriction
on the use or disclosure of PHI to which Covered Entity has agreed
in accordance with 45 CFR § 164.522.

4. PERMITTED USES AND DISCLOSURES
-----------------------------------

4.1 Business Associate may use or disclose PHI as necessary to perform
the services described in the underlying service agreement.

4.2 Business Associate may use PHI for the proper management and
administration of Business Associate or to carry out the legal
responsibilities of Business Associate.

4.3 Business Associate may use or disclose PHI for Data Aggregation
purposes for the lawful purposes of Covered Entity, provided that
such use is consistent with the applicable requirements of HIPAA.

4.4 Business Associate may de-identify PHI in accordance with
45 CFR § 164.514(b) and use or disclose such de-identified information
for any purpose.

5. TERM AND TERMINATION
-------------------------

5.1 This Agreement shall be effective as of the Effective Date and
shall terminate upon the earlier of: (a) the termination of the
underlying service agreement; or (b) mutual written agreement.

5.2 Upon termination of this Agreement, Business Associate shall
return or destroy all PHI received from Covered Entity, or created
or received by Business Associate on behalf of Covered Entity, that
Business Associate still maintains in any form.

5.3 If return or destruction of PHI is not feasible, Business
Associate shall continue to protect such PHI in accordance with the
terms of this Agreement for as long as Business Associate retains
such PHI.

6. ENCRYPTION AND SECURITY STANDARDS
---------------------------------------

6.1 Business Associate shall implement end-to-end encryption for all
PHI transmitted between parties using the Signal Protocol (Double
Ratchet Algorithm) with AES-256-GCM encryption.

6.2 Business Associate shall use WebRTC with SRTP encryption for all
video communications involving PHI, with key verification via Short
Authentication Strings (SAS).

6.3 Business Associate shall maintain audit logging of all access
to PHI, including user identification, timestamp, and action performed.

6.4 Business Associate shall implement data retention policies in
accordance with applicable federal and state requirements, with a
minimum retention period as specified by Covered Entity.

6.5 Business Associate shall conduct regular security risk assessments
and implement remediation measures as required by 45 CFR § 164.308(a)(1).

7. BREACH NOTIFICATION
------------------------

7.1 Business Associate shall notify Covered Entity of any Breach
of unsecured PHI without unreasonable delay, and in no event later
than thirty (30) calendar days after discovery of such Breach.

7.2 Such notification shall include: (a) identification of each
individual whose unsecured PHI has been, or is reasonably believed
to have been, accessed, acquired, used, or disclosed; (b) a brief
description of what happened; (c) a description of the types of
PHI involved; (d) steps individuals should take to protect themselves;
and (e) what Business Associate is doing to investigate and mitigate
harm.

8. INDEMNIFICATION
--------------------

8.1 Business Associate shall indemnify and hold harmless Covered Entity
from and against any and all claims, damages, losses, costs, and
expenses arising out of or relating to Business Associate's breach
of this Agreement or any use or disclosure of PHI by Business
Associate not permitted by this Agreement.

9. MISCELLANEOUS
------------------

9.1 This Agreement shall be governed by and construed in accordance
with the laws of the jurisdiction in which Covered Entity is located.

9.2 Any amendment to this Agreement shall be in writing and signed
by both parties.

9.3 If any provision of this Agreement is held to be invalid or
unenforceable, the remaining provisions shall remain in full force
and effect.

9.4 This Agreement constitutes the entire agreement between the
parties with respect to the subject matter hereof and supersedes
all prior agreements and understandings, whether written or oral.


IN WITNESS WHEREOF, the parties have executed this Agreement as of
the Effective Date.

COVERED ENTITY:

Name:    ${organizationName}
By:      __________________________
Title:   __________________________
Date:    __________________________

BUSINESS ASSOCIATE:

Name:    MedQ Platform
By:      __________________________
Title:   __________________________
Date:    __________________________

---
This BAA template is provided for informational purposes only and does not
constitute legal advice. Both parties should consult with qualified legal
counsel before executing this agreement.
`.trim();
}


/***/ }),

/***/ 86846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Skeleton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40980);


function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "skeleton",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)("animate-pulse rounded-md bg-muted", className),
        ...props
    });
}



/***/ }),

/***/ 89239:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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



/***/ }),

/***/ 96391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ useComplianceStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41535);

const defaultSettings = {
    encryptionLevel: 'transport',
    retentionDays: 365,
    auditLogging: true,
    baaSigned: false
};
const defaultRetentionStats = {
    totalMessages: 0,
    messagesToDelete: 0,
    oldestMessage: null,
    lastRetentionRun: null,
    nextScheduledRun: null
};
const useComplianceStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .v)((set)=>({
        settings: defaultSettings,
        auditLogs: [],
        retentionStats: defaultRetentionStats,
        loading: false,
        error: null,
        setSettings: (settings)=>set({
                settings
            }),
        updateSetting: (key, value)=>set((s)=>({
                    settings: {
                        ...s.settings,
                        [key]: value
                    }
                })),
        setAuditLogs: (logs)=>set({
                auditLogs: logs
            }),
        addAuditLog: (entry)=>set((s)=>({
                    auditLogs: [
                        entry,
                        ...s.auditLogs
                    ].slice(0, 500)
                })),
        setRetentionStats: (stats)=>set({
                retentionStats: stats
            }),
        setLoading: (loading)=>set({
                loading
            }),
        setError: (error)=>set({
                error
            }),
        reset: ()=>set({
                settings: defaultSettings,
                auditLogs: [],
                retentionStats: defaultRetentionStats,
                loading: false,
                error: null
            })
    }));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [18409,68298,27173,33697,2595,31573,53686,52968,43342,40379,35008,85833,3610,28441,93794,77358], () => (__webpack_exec__(77028)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);