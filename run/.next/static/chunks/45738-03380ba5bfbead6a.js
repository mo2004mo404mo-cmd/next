"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[45738],{

/***/ 5210:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ BottomNavCustomizer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(58274);
/* harmony import */ var _barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(36565);
/* harmony import */ var _barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(92298);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92747);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(85542);
/* __next_internal_client_entry_do_not_use__ BottomNavCustomizer auto */ 




const AVAILABLE_BOTTOM_NAV_ITEMS = (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .buildBottomNavDefinitions */ .lA)();
function BottomNavCustomizer({ selectedItems, onChange, onClose }) {
    const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [draggedId, setDraggedId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const selectedDefinitions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return selectedItems.map((id)=>AVAILABLE_BOTTOM_NAV_ITEMS.find((item)=>item.id === id)).filter((item)=>Boolean(item));
    }, [
        selectedItems
    ]);
    const availableDefinitions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const query = search.trim().toLowerCase();
        return AVAILABLE_BOTTOM_NAV_ITEMS.filter((item)=>{
            // Don't show items already selected.
            if (selectedItems.includes(item.id)) {
                return false;
            }
            // No search query = show everything.
            if (!query) {
                return true;
            }
            return item.label.toLowerCase().includes(query) || String(item.id).toLowerCase().includes(query);
        });
    }, [
        search,
        selectedItems
    ]);
    const addItem = (id)=>{
        if (selectedItems.length >= _config__WEBPACK_IMPORTED_MODULE_2__/* .MAX_BOTTOM_NAV_ITEMS */ .QT) {
            return;
        }
        if (selectedItems.includes(id)) {
            return;
        }
        onChange([
            ...selectedItems,
            id
        ]);
    };
    const removeItem = (id)=>{
        onChange(selectedItems.filter((itemId)=>itemId !== id));
    };
    const moveItem = (sourceId, targetId)=>{
        if (sourceId === targetId) {
            return;
        }
        const next = [
            ...selectedItems
        ];
        const sourceIndex = next.indexOf(sourceId);
        const targetIndex = next.indexOf(targetId);
        if (sourceIndex === -1 || targetIndex === -1) {
            return;
        }
        next.splice(sourceIndex, 1);
        next.splice(targetIndex, 0, sourceId);
        onChange(next);
    };
    const reset = ()=>{
        onChange([
            ..._config__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_BOTTOM_NAV */ .aF
        ]);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed inset-0 z-[100] flex items-end lg:items-center justify-center",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "bottom-nav-customizer-title",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute inset-0 bg-black/70 backdrop-blur-md",
                onClick: onClose,
                "aria-hidden": "true"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative w-full lg:w-[520px] max-h-[90vh] lg:max-h-[820px] rounded-t-3xl lg:rounded-3xl border border-white/[0.08] shadow-2xl overflow-hidden",
                style: {
                    background: 'linear-gradient(180deg, #11151e 0%, #0c0e14 100%)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between px-5 py-4 border-b border-white/[0.06]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        id: "bottom-nav-customizer-title",
                                        className: "text-base font-bold text-[#e8ecf4]",
                                        children: "Customize Navigation"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-[11px] text-[#5a6478] mt-0.5",
                                        children: [
                                            "Choose and reorder up to",
                                            ' ',
                                            _config__WEBPACK_IMPORTED_MODULE_2__/* .MAX_BOTTOM_NAV_ITEMS */ .QT,
                                            ' ',
                                            "shortcuts"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                type: "button",
                                onClick: onClose,
                                className: "w-9 h-9 rounded-xl flex items-center justify-center text-[#8b95a8] hover:text-white hover:bg-white/[0.06] transition-colors",
                                "aria-label": "Close customization",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                    className: "w-5 h-5"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "overflow-y-auto max-h-[calc(90vh-75px)] lg:max-h-[745px] p-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between mb-2.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "text-[10px] font-bold uppercase tracking-widest text-[#5a6478]",
                                                children: "Your Bottom Navigation"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "text-[10px] font-semibold text-[#00e5a0]",
                                                children: [
                                                    selectedItems.length,
                                                    "/",
                                                    _config__WEBPACK_IMPORTED_MODULE_2__/* .MAX_BOTTOM_NAV_ITEMS */ .QT
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                            selectedDefinitions.map((item, index)=>{
                                                const Icon = item.icon;
                                                const color = item.color || '#00e5a0';
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    draggable: true,
                                                    onDragStart: ()=>setDraggedId(item.id),
                                                    onDragEnd: ()=>setDraggedId(null),
                                                    onDragOver: (event)=>{
                                                        event.preventDefault();
                                                    },
                                                    onDrop: ()=>{
                                                        if (draggedId) {
                                                            moveItem(draggedId, item.id);
                                                        }
                                                        setDraggedId(null);
                                                    },
                                                    className: `flex items-center gap-3 p-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing ${draggedId === item.id ? 'opacity-40 border-[#00e5a0]/30 bg-[#00e5a0]/5' : 'border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.045]'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                            className: "w-4 h-4 text-[#3f4658] flex-shrink-0",
                                                            "aria-hidden": "true"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "w-9 h-9 rounded-lg flex items-center justify-center",
                                                            style: {
                                                                background: `${color}12`,
                                                                color
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                                                                className: "w-4.5 h-4.5"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                    className: "text-[13px] font-semibold text-[#dce2ed] truncate",
                                                                    children: item.label
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "text-[9px] text-[#4f576a]",
                                                                    children: [
                                                                        "Position",
                                                                        ' ',
                                                                        index + 1
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: ()=>removeItem(item.id),
                                                            className: "w-8 h-8 rounded-lg flex items-center justify-center text-[#687186] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-colors",
                                                            "aria-label": `Remove ${item.label}`,
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                                className: "w-4 h-4"
                                                            })
                                                        })
                                                    ]
                                                }, item.id);
                                            }),
                                            selectedDefinitions.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "py-8 rounded-xl border border-dashed border-white/[0.08] text-center",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[11px] text-[#4f576a]",
                                                    children: "No navigation shortcuts selected."
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between mb-2.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "text-[10px] font-bold uppercase tracking-widest text-[#5a6478]",
                                                children: "Available Navigation"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "text-[9px] text-[#3f4658]",
                                                children: "Drag to reorder above"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative mb-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f576a]",
                                                "aria-hidden": "true"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                type: "search",
                                                value: search,
                                                onChange: (event)=>setSearch(event.target.value),
                                                placeholder: "Search navigation...",
                                                "aria-label": "Search navigation",
                                                className: "w-full h-10 rounded-xl border border-white/[0.06] bg-white/[0.025] pl-9 pr-3 text-[12px] text-[#dce2ed] placeholder:text-[#4f576a] outline-none focus:border-[#00e5a0]/30 focus:bg-white/[0.04]"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "grid grid-cols-1 gap-1.5",
                                        children: availableDefinitions.map((item)=>{
                                            const Icon = item.icon;
                                            const disabled = selectedItems.length >= _config__WEBPACK_IMPORTED_MODULE_2__/* .MAX_BOTTOM_NAV_ITEMS */ .QT;
                                            const color = item.color || '#8b95a8';
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                type: "button",
                                                onClick: ()=>addItem(item.id),
                                                disabled: disabled,
                                                className: `w-full flex items-center gap-3 p-2.5 rounded-xl text-left border border-transparent transition-all ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/[0.04] hover:border-white/[0.05]'}`,
                                                "aria-label": `Add ${item.label} to bottom navigation`,
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                                        style: {
                                                            background: `${color}10`,
                                                            color
                                                        },
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                                                            className: "w-4 h-4"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "flex-1 text-[12px] font-medium text-[#8b95a8]",
                                                        children: item.label
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#3f4658]",
                                                        "aria-hidden": "true"
                                                    })
                                                ]
                                            }, item.id);
                                        })
                                    }),
                                    availableDefinitions.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "py-10 text-center text-[11px] text-[#4f576a]",
                                        children: "No navigation items found."
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 px-4 py-3 border-t border-white/[0.06] bg-black/10",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: reset,
                                className: "flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold text-[#8b95a8] hover:text-[#dce2ed] hover:bg-white/[0.05] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_GripVertical_Minus_Plus_RotateCcw_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Reset"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex-1"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                type: "button",
                                onClick: onClose,
                                className: "px-5 py-2 rounded-lg bg-[#00e5a0] text-[#07120f] text-[11px] font-bold hover:bg-[#19edb0] transition-colors",
                                children: "Done"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 5656:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ useBottomNav)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92747);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85542);
/* __next_internal_client_entry_do_not_use__ useBottomNav auto */ 


const AVAILABLE_BOTTOM_NAV_ITEMS = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .buildBottomNavDefinitions */ .lA)();
function useBottomNav() {
    const [bottomNavIds, setBottomNavIds] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_config__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_BOTTOM_NAV */ .aF);
    const [customizerOpen, setCustomizerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setBottomNavIds((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .loadBottomNav */ .Fz)(AVAILABLE_BOTTOM_NAV_ITEMS));
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .saveBottomNav */ .Ci)(bottomNavIds);
    }, [
        bottomNavIds
    ]);
    const bottomNavItems = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>bottomNavIds.map((id)=>AVAILABLE_BOTTOM_NAV_ITEMS.find((item)=>item.id === id)).filter((item)=>Boolean(item)), [
        bottomNavIds
    ]);
    const setItems = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((items)=>{
        setBottomNavIds((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .sanitizeBottomNav */ .aZ)(items, AVAILABLE_BOTTOM_NAV_ITEMS));
    }, []);
    const reset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        setBottomNavIds([
            ..._config__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_BOTTOM_NAV */ .aF
        ]);
    }, []);
    return {
        items: bottomNavItems,
        itemIds: bottomNavIds,
        setItems,
        reset,
        customizerOpen,
        openCustomizer: ()=>setCustomizerOpen(true),
        closeCustomizer: ()=>setCustomizerOpen(false),
        maxItems: _config__WEBPACK_IMPORTED_MODULE_1__/* .MAX_BOTTOM_NAV_ITEMS */ .QT
    };
}


/***/ }),

/***/ 17940:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ useNotificationStream)
/* harmony export */ });
/* unused harmony export useDecrementUnreadCount */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useNotificationStream,useDecrementUnreadCount auto */ /**
 * useNotificationStream — subscribes to the real-time notification SSE
 * endpoint and exposes the latest unread count + a stream of new
 * notifications as they arrive.
 *
 * Usage:
 *   const { unreadCount, lastNotification } = useNotificationStream({ enabled: isAuthenticated });
 *
 * The hook opens ONE EventSource per enabled=true mount and closes it on
 * unmount or when enabled flips to false. It is safe to mount this in
 * multiple components — the browser dedupes EventSource connections to
 * the same URL (though we explicitly dedupe via a module-level singleton
 * to be extra safe).
 *
 * OFFLINE BEHAVIOR:
 *   EventSource auto-reconnects on failure with a browser-controlled
 *   backoff (typically 3s). When the network is down, this creates an
 *   infinite reconnect storm — every 3s the SW returns a 503, EventSource
 *   fires `error`, and immediately tries again. This wastes battery and
 *   spams the console. To avoid this, we DON'T open the EventSource at
 *   all when `navigator.onLine === false`, and we close it immediately
 *   when the `offline` event fires. When `online` fires, we reopen it.
 */ 
const subscribers = new Set();
let es = null;
let lastUnreadCount = 0;
let connectionRefCount = 0;
function ensureStream() {
    if (es) return;
    try {
        es = new EventSource('/api/notifications/stream');
        es.addEventListener('open', ()=>{
            for (const s of subscribers)s.onConnectedChange?.(true);
        });
        es.addEventListener('hello', (e)=>{
            try {
                const data = JSON.parse(e.data);
                if (typeof data.unreadCount === 'number') {
                    lastUnreadCount = data.unreadCount;
                    for (const s of subscribers)s.onUnreadCount?.(data.unreadCount);
                }
            } catch  {}
        });
        es.addEventListener('unread-count', (e)=>{
            try {
                const data = JSON.parse(e.data);
                if (typeof data.unreadCount === 'number') {
                    lastUnreadCount = data.unreadCount;
                    for (const s of subscribers)s.onUnreadCount?.(data.unreadCount);
                }
            } catch  {}
        });
        es.addEventListener('notification', (e)=>{
            try {
                const n = JSON.parse(e.data);
                for (const s of subscribers)s.onNotification?.(n);
            } catch  {}
        });
        es.addEventListener('error', ()=>{
            for (const s of subscribers)s.onConnectedChange?.(false);
        // EventSource auto-reconnects; we just update the connected flag.
        });
    } catch (err) {
        console.error('[useNotificationStream] failed to open EventSource:', err);
    }
}
function maybeCloseStream() {
    if (connectionRefCount <= 0 && es) {
        try {
            es.close();
        } catch  {}
        es = null;
    }
}
function useNotificationStream(options) {
    const { enabled, onNotification, onUnreadCount } = options;
    const [unreadCount, setUnreadCount] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(lastUnreadCount);
    const [lastNotification, setLastNotification] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [connected, setConnected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    // Keep latest callbacks in refs so the subscriber object doesn't churn.
    const onNotificationRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onNotification);
    const onUnreadCountRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onUnreadCount);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        onNotificationRef.current = onNotification;
    }, [
        onNotification
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        onUnreadCountRef.current = onUnreadCount;
    }, [
        onUnreadCount
    ]);
    // Track online/offline state. When offline, we DON'T open the EventSource
    // — see the OFFLINE BEHAVIOR note in the file header.
    const [isOnline, setIsOnline] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(typeof navigator !== 'undefined' ? navigator.onLine : true);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const handleOnline = ()=>setIsOnline(true);
        const handleOffline = ()=>{
            setIsOnline(false);
            // Immediately close any open EventSource so we don't burn cycles
            // on auto-reconnect attempts that will all fail.
            if (es) {
                try {
                    es.close();
                } catch  {}
                es = null;
                for (const s of subscribers)s.onConnectedChange?.(false);
            }
        };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return ()=>{
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        // Don't open the stream if disabled OR offline. The `isOnline` dep
        // means this effect re-runs when connectivity changes, so the stream
        // auto-opens on reconnect and auto-closes on disconnect.
        if (!enabled || !isOnline) return;
        const sub = {
            onNotification: (n)=>{
                setLastNotification(n);
                onNotificationRef.current?.(n);
            },
            onUnreadCount: (c)=>{
                setUnreadCount(c);
                onUnreadCountRef.current?.(c);
            },
            onConnectedChange: setConnected
        };
        subscribers.add(sub);
        connectionRefCount += 1;
        // Prime local state with the latest known count (in case the stream is
        // already open from another subscriber).
        setUnreadCount(lastUnreadCount);
        ensureStream();
        return ()=>{
            subscribers.delete(sub);
            connectionRefCount = Math.max(0, connectionRefCount - 1);
            maybeCloseStream();
        };
    }, [
        enabled,
        isOnline
    ]);
    return {
        unreadCount,
        lastNotification,
        connected
    };
}
/**
 * Helper: optimistically decrement the local unread count (e.g. when the
 * user marks a notification as read in the UI). Useful so the bell badge
 * updates instantly without waiting for the next SSE poll.
 */ function useDecrementUnreadCount() {
    return useCallback(()=>{
        lastUnreadCount = Math.max(0, lastUnreadCount - 1);
        for (const s of subscribers)s.onUnreadCount?.(lastUnreadCount);
    }, []);
} /**
 * Helper: optimistically reset the local unread count to zero (e.g. when
 * the user clicks "Mark all as read").
 */  // export function useResetUnreadCount() {
 //   return useCallback(() => {
 //     lastUnreadCount = 0;
 //     for (const s of subscribers) s.onUnreadCount?.(0);
 //   }, []);
 // }


/***/ }),

/***/ 25044:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ Toaster)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70460);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66609);
/* harmony import */ var _barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14577);
/* harmony import */ var _barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11012);
/* harmony import */ var _barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92367);
/* harmony import */ var _barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(92571);
/* __next_internal_client_entry_do_not_use__ Toaster auto */ 



const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0,next_themes__WEBPACK_IMPORTED_MODULE_1__/* .useTheme */ .D)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(sonner__WEBPACK_IMPORTED_MODULE_2__.Toaster, {
        theme: theme,
        className: "toaster group",
        icons: {
            success: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                className: "size-4"
            }),
            info: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                className: "size-4"
            }),
            warning: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "size-4"
            }),
            error: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "size-4"
            }),
            loading: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CircleCheckIcon_InfoIcon_Loader2Icon_OctagonXIcon_TriangleAlertIcon_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                className: "size-4 animate-spin"
            })
        },
        style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)"
        },
        toastOptions: {
            classNames: {
                toast: "cn-toast"
            }
        },
        ...props
    });
};



/***/ }),

/***/ 26846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I3: () => (/* binding */ hasRealPage),
/* harmony export */   s2: () => (/* binding */ navigateToTab),
/* harmony export */   tW: () => (/* binding */ tabHref),
/* harmony export */   ud: () => (/* binding */ REAL_PAGE_TABS)
/* harmony export */ });
/* __next_internal_client_entry_do_not_use__ REAL_PAGE_TABS,tabHref,navigateToTab,hasRealPage auto */ /**
 * Tabs extracted to real App Router pages. Those inside the (app) route
 * group render within the shared AppShellLayout, so navigating between any
 * of them keeps the sidebar/header mounted (App Router layouts persist
 * across route changes within the same layout). '/freellm' is a real route
 * that owns its full-screen dashboard layout.
 *
 * NOTE 'take-exam' is deliberately NOT here: /exam/take is only a deep-link
 * forwarding shim to /?tab=take-exam — linking there directly would add a
 * pointless redirect hop. The sidebar targets the real /?tab= URL.
 */ const REAL_PAGE_TABS = {
    'dashboard': '/home',
    'bank': '/bank',
    'generate': '/generate',
    'flashcards': '/flashcards',
    'advanced-chat': '/messages',
    'admin': '/admin',
    'ai-classroom': '/ai-classroom',
    'exam-sim': '/exam-sim',
    'pricing': '/pricing',
    'freellm': '/freellm',
    'osce': '/osce'
};
/**
 * The REAL href a navigation surface (sidebar link, bottom-nav link,
 * programmatic router.push) uses for a tab.
 *
 *   'bank'  → '/bank'   (real (app) route)
 *   'tutor' → '/?tab=tutor' (real URL — the SPA shell renders that tab)
 *
 * Every href this returns is a genuine, refresh-safe App-Router URL.
 */ function tabHref(tabId) {
    const id = String(tabId);
    if (REAL_PAGE_TABS[id]) return REAL_PAGE_TABS[id];
    return `/?tab=${encodeURIComponent(id)}`;
}
/**
 * Navigate to a MedQ tab from anywhere (command palette, AI agent events,
 * header actions). Real-page tabs stay inside the (app) layout; SPA tabs
 * hop to their real "/?tab=" URL.
 */ function navigateToTab(push, tabId) {
    push(tabHref(tabId));
}
/** True when the tab has a real standalone page (used for <Link> decisions). */ function hasRealPage(tabId) {
    return Boolean(REAL_PAGE_TABS[String(tabId)]);
}


/***/ }),

/***/ 38463:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73321);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(84507);
/* harmony import */ var _lib_medq_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(83557);
/* harmony import */ var _components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(27436);
/* harmony import */ var _components_medq_PremiumBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42184);
/* harmony import */ var _components_medq_ThemeToggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(49779);
/* harmony import */ var _components_medq_NotificationsPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(66926);
/* harmony import */ var _components_medq_UserMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(50568);
/* harmony import */ var _components_medq_navigation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(79379);
/* harmony import */ var _barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(71019);
/* harmony import */ var _barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(94774);
/* harmony import */ var _barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(50981);
/* harmony import */ var _barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(96304);
/* harmony import */ var _barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(15298);
/* __next_internal_client_entry_do_not_use__ default auto */ 












const ALL_TABS = _components_medq_navigation__WEBPACK_IMPORTED_MODULE_10__/* .SIDEBAR_NAV */ .nx.flatMap((s)=>s.items);
const SPECIAL_TABS = [
    {
        id: 'pricing',
        label: 'Pricing',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
            className: "w-4 h-4"
        })
    },
    {
        id: 'revenue',
        label: 'Revenue',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
            className: "w-4 h-4"
        })
    },
    {
        id: 'admin',
        label: 'Admin',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        adminOnly: true
    }
];
const Header = ()=>{
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__/* .useSession */ .wV)();
    const user = session?.user ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: session.user.role
    } : null;
    const activeTab = (0,_lib_medq_routing__WEBPACK_IMPORTED_MODULE_4__/* .pathToTab */ .cM)(pathname);
    const currentTab = [
        ...ALL_TABS,
        ...SPECIAL_TABS
    ].find((t)=>t.id === activeTab);
    const currentLabel = currentTab?.label || 'MedQ';
    const { settings, playSoundIfEnabled } = (0,_components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_5__.useSettings)();
    const [showNotifications, setShowNotifications] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [notifCount, setNotifCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const runHeaderAction = (action)=>{
        window.dispatchEvent(new CustomEvent('medq-header-action', {
            detail: {
                action
            }
        }));
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("header", {
        className: "medq-header-bar border-b border-white/[0.05] flex-shrink-0 z-30",
        style: {
            background: 'var(--medq-header-bg, rgba(12,14,20,0.92))',
            backdropFilter: 'blur(20px)',
            borderColor: 'var(--medq-border, rgba(255,255,255,0.05))'
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center justify-between px-4 py-3 max-w-[1200px] mx-auto w-full min-w-0",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>runHeaderAction('sidebar'),
                            className: "lg:hidden w-11 h-11 rounded-lg flex items-center justify-center hover:bg-white/[0.05] border border-white/[0.06]",
                            "aria-label": "Open menu",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#8b95a8]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-sm font-bold text-[#e8ecf4] truncate",
                                    children: currentLabel
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-[10px] text-[#5a6478] hidden lg:block",
                                    children: [
                                        "Med",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[#00e5a0]",
                                            children: "Q"
                                        }),
                                        " \xb7 Study \xb7 Compete \xb7 Connect"
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-2 flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_PremiumBadge__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            size: "sm"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_PremiumBadge__WEBPACK_IMPORTED_MODULE_6__/* .CreditDisplay */ ._, {
                            onEarnCredits: ()=>runHeaderAction('rewarded-ad'),
                            onOpenShop: ()=>runHeaderAction('credit-shop')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ThemeToggle__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>runHeaderAction('search'),
                            className: "w-11 h-11 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.05] border border-white/[0.06] transition-all",
                            "aria-label": "Search (Ctrl+K)",
                            title: "Search (Ctrl+K)",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#8b95a8]"
                            })
                        }),
                         true && settings.notifications && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: ()=>setShowNotifications(!showNotifications),
                                    className: "relative w-11 h-11 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.05] border border-white/[0.06] transition-all",
                                    "aria-label": `Notifications${notifCount > 0 ? ` (${notifCount} unread)` : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Bell_CreditCard_Menu_Search_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#8b95a8]"
                                        }),
                                        notifCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff5757] text-[8px] font-bold text-white flex items-center justify-center",
                                            children: notifCount > 9 ? '9+' : notifCount
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_NotificationsPanel__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                    open: showNotifications,
                                    onClose: ()=>setShowNotifications(false)
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_UserMenu__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                            user: user,
                            onShowProfile: ()=>runHeaderAction('profile'),
                            onShowSettings: ()=>runHeaderAction('settings'),
                            onSwitchToPricing: ()=>runHeaderAction('pricing'),
                            onShowDeviceSecurity: ()=>runHeaderAction('device-security')
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);


/***/ }),

/***/ 38984:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pT: () => (/* binding */ getTierList)
/* harmony export */ });
/* unused harmony exports AI_TOOL_CATEGORIES, AI_TOOL_IDS, getTierDefinitions, getTierDefinition, isValidTier, canUseTool, _resetTierCache */
/* provided dependency */ var process = __webpack_require__(41463);
/**
 * Subscription tier definitions & feature gating rules.
 *
 * Three tiers:
 *   - free     — $0/mo, daily-limited access to every AI tool, banner ads
 *   - premium  — $9.99/mo, 20x higher daily limits, no banner ads, priority support
 *   - pro      — $19.99/mo, effectively-unlimited daily limits, no ads at all,
 *                early-access features, monthly credit allowance
 *
 * Daily limits live in LIMITS (mirrored from src/lib/freemium-store.ts). They
 * are per-category per-day counters persisted in the UsageRecord table. When a
 * user hits their daily limit, they can either:
 *   - wait for the next UTC day (limit resets), OR
 *   - spend credits from their CreditWallet to unlock more actions of the
 *     same category (see src/lib/subscription/credits.ts → debitAICredits).
 *
 * Pro tier limits are set to 999999 (effectively unlimited). Stripe handles
 * the actual hard cap on Pro monthly usage via the metered billing API (TBD).
 *
 * Stripe price IDs are loaded from env (STRIPE_PRICE_PREMIUM, STRIPE_PRICE_PRO).
 * If unset, the checkout flow falls back to "mock mode" — see
 * src/lib/payments/stripe.ts → isStripeConfigured().
 */ /**
 * All 14 AI tools gated behind `premium: true` in MedQAppShell.tsx.
 * Used as the canonical list when checking feature access. Maps tool ID →
 * usage-tracking category (the same category stored in UsageRecord.category).
 */ const AI_TOOL_CATEGORIES = {
    generate: 'ai_generations',
    tutor: 'tutor_messages',
    cases: 'case_simulations',
    mnemonics: 'mnemonics',
    'image-analyzer': 'image_analyzer',
    voice: 'voice_study',
    files: 'ai_generations',
    video: 'video_lessons',
    'board-prep': 'board_prep_sessions',
    anatomy: 'anatomy_visuals',
    'clinical-vignettes': 'clinical_vignettes',
    'whiteboard-studio': 'whiteboard_studio',
    'video-library': 'video_library',
    planner: 'study_planner'
};
const AI_TOOL_IDS = Object.keys(AI_TOOL_CATEGORIES);
/**
 * Daily-limit values per tier. Must stay in sync with LIMITS in
 * src/lib/freemium-store.ts. Duplicated here so the tier definitions file is
 * the single source of truth for *what each tier gets*.
 */ const FREE_LIMITS = {
    ai_generations: 5,
    tutor_messages: 10,
    video_lessons: 1,
    case_simulations: 2,
    flashcard_decks: 3,
    image_analyzer: 3,
    voice_study: 5,
    board_prep_sessions: 1,
    mnemonics: 3,
    anatomy_visuals: 2,
    study_planner: 3,
    clinical_vignettes: 1,
    whiteboard_studio: 1,
    video_library: 2
};
const PREMIUM_LIMITS = Object.fromEntries(Object.entries(FREE_LIMITS).map(([k, v])=>[
        k,
        Math.max(20, v * 20)
    ]));
const PRO_LIMITS = Object.fromEntries(Object.keys(FREE_LIMITS).map((k)=>[
        k,
        999999
    ]));
function priceIdFromEnv(key) {
    // env is only readable at runtime on the server. This function is invoked
    // lazily inside getTierDefinition() so it's safe to call from client code
    // (the result is "no price id" on the client).
    if (typeof process === 'undefined') return '';
    return process.env[key] ?? '';
}
let _cachedTiers = null;
function getTierDefinitions() {
    if (_cachedTiers) return _cachedTiers;
    _cachedTiers = {
        free: {
            id: 'free',
            name: 'Free',
            tagline: 'Get started, no credit card required',
            priceUsd: 0,
            currency: 'usd',
            interval: 'forever',
            monthlyCreditAllowance: 25,
            features: [
                '5 AI question generations / day',
                '10 AI tutor messages / day',
                '1 video lesson / day',
                '2 case simulations / day',
                '3 flashcard decks / day',
                'Banner ads (removable with credits)',
                'Earn credits by watching rewarded ads',
                'Community access'
            ],
            adFree: false,
            adFreeAll: false,
            limits: FREE_LIMITS,
            stripePriceId: '',
            accentColor: '#5a6478'
        },
        premium: {
            id: 'premium',
            name: 'Premium',
            tagline: 'For serious medical students',
            priceUsd: 9.99,
            currency: 'usd',
            interval: 'month',
            monthlyCreditAllowance: 250,
            features: [
                '100 AI question generations / day',
                '100 AI tutor messages / day',
                'Unlimited video lessons',
                'Unlimited case simulations',
                'No banner ads',
                'Priority email support',
                'Advanced analytics dashboard',
                '250 bonus credits / month',
                'Custom study themes'
            ],
            adFree: true,
            adFreeAll: false,
            limits: PREMIUM_LIMITS,
            stripePriceId: priceIdFromEnv('STRIPE_PRICE_PREMIUM'),
            accentColor: '#8b5cf6',
            popular: true
        },
        pro: {
            id: 'pro',
            name: 'Pro',
            tagline: 'Maximum power for board prep',
            priceUsd: 19.99,
            currency: 'usd',
            interval: 'month',
            monthlyCreditAllowance: 1000,
            features: [
                'Unlimited AI generations',
                'Unlimited AI tutor messages',
                'Unlimited everything',
                'No ads of any kind',
                'Early access to new features',
                'Dedicated support channel',
                '1000 bonus credits / month',
                'Custom study plans & schedules',
                'API access (coming soon)',
                'Revenue dashboard'
            ],
            adFree: true,
            adFreeAll: true,
            limits: PRO_LIMITS,
            stripePriceId: priceIdFromEnv('STRIPE_PRICE_PRO'),
            accentColor: '#f59e0b'
        }
    };
    return _cachedTiers;
}
function getTierDefinition(tier) {
    return getTierDefinitions()[tier];
}
function getTierList() {
    const defs = getTierDefinitions();
    return [
        defs.free,
        defs.premium,
        defs.pro
    ];
}
function isValidTier(tier) {
    return tier === 'free' || tier === 'premium' || tier === 'pro';
}
/**
 * Returns true if the user on `tier` can use `toolId` without spending
 * credits — i.e. they're under their daily limit for that category.
 *
 * Usage:
 *   const { allowed, reason, category, used, limit } = canUseTool('premium', 'generate', 5);
 *   if (!allowed && reason === 'limit_reached') { /* prompt credit spend *\/ }
 */ function canUseTool(tier, toolId, currentUsageCount) {
    const category = AI_TOOL_CATEGORIES[toolId];
    if (!category) return {
        allowed: false,
        reason: 'unknown_tool',
        category: '',
        used: 0,
        limit: 0
    };
    const def = getTierDefinition(tier);
    const limit = def.limits[category] ?? 0;
    const allowed = currentUsageCount < limit;
    return {
        allowed,
        reason: allowed ? 'ok' : 'limit_reached',
        category,
        used: currentUsageCount,
        limit
    };
}
/**
 * Reset the tier-definition cache. Only used in tests.
 */ function _resetTierCache() {
    _cachedTiers = null;
}


/***/ }),

/***/ 40170:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ SidebarNav)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98500);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84507);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27898);
/* harmony import */ var _barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(69072);
/* harmony import */ var _barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(71019);
/* harmony import */ var _barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(50981);
/* harmony import */ var _barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9005);
/* harmony import */ var _lib_medq_nav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26846);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92747);
/* __next_internal_client_entry_do_not_use__ SidebarNav auto */ 






/**
 * REAL Next.js routing (user directive 2026-11-04): every sidebar item is a
 * plain <Link href> — no onClick interception, no preventDefault, no
 * onTabSwitch. The App Router performs a genuine client-side navigation:
 * the URL changes, back/forward works, deep links work, the (app) layout
 * (sidebar + header) persists across soft navigations.
 *
 * Tab hrefs (single source of truth: lib/medq-nav.ts → tabHref):
 *   - real-page tabs  → their (app) route (e.g. /bank, /generate)
 *   - SPA-only tabs   → the REAL /?tab=<id> URL — the SPA shell at "/"
 *                      renders that tab and the URL survives refresh
 *
 * The active item is highlighted from the URL (activeTab is derived from
 * usePathname/useSearchParams by the shells) — the URL is the source of
 * truth, not component state.
 *
 * prefetch: real-page links prefetch their route (snappy navigation);
 * SPA /?tab= links skip it — there are ~60 of them in the viewport and each
 * would re-request the heavy root-page RSC payload.
 */ function SidebarNav({ activeTab, tier, isOpen, onClose }) {
    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__/* .useSession */ .wV)();
    const isAdmin = session?.user?.role?.toLowerCase() === 'admin';
    const content = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/home",
                onClick: onClose,
                className: "flex items-center gap-3 px-4 py-4 border-b border-white/[0.05] hover:opacity-90 transition-opacity",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-9 h-9 bg-gradient-to-br from-[#00e5a0] to-[#00b87a] rounded-xl flex items-center justify-center shadow-lg shadow-[#00e5a0]/25",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-5 h-5 text-[#0c0e14]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                                className: "text-lg font-bold tracking-tight",
                                style: {
                                    fontFamily: "'Space Grotesk', sans-serif"
                                },
                                children: [
                                    "Med",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[#00e5a0]",
                                        children: "Q"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[9px] text-[#5a6478]",
                                children: "Medical Education Platform"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                "aria-label": "Main",
                className: "flex-1 overflow-y-auto py-2 px-2",
                style: {
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.08) transparent'
                },
                children: [
                    _config__WEBPACK_IMPORTED_MODULE_5__/* .SIDEBAR_NAV */ .nx.map((section, sectionIndex)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: sectionIndex > 0 ? 'mt-3' : '',
                            children: [
                                section.section && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "px-3 py-1.5 mb-1",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-bold text-[#3a4055] uppercase tracking-widest",
                                        children: section.section
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "space-y-0.5",
                                    children: section.items.map((item)=>{
                                        if (item.adminOnly && !isAdmin) {
                                            return null;
                                        }
                                        const isActive = activeTab === item.id;
                                        const isLocked = item.premium && tier === 'free';
                                        const itemColor = item.color ?? (isActive ? '#00e5a0' : '#8b95a8');
                                        // Real routing: a plain <Link> that
                                        // the App Router navigates natively.
                                        // SPA-only tabs point at the real
                                        // /?tab=<id> URL.
                                        const href = (0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_4__/* .tabHref */ .tW)(item.id);
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            href: href,
                                            prefetch: (0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_4__/* .hasRealPage */ .I3)(item.id) ? undefined : false,
                                            onClick: onClose,
                                            className: `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${isActive ? 'text-[#e8ecf4]' : 'text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.03]'}`,
                                            style: isActive ? {
                                                background: item.color ? `${item.color}12` : 'rgba(0,229,160,0.08)',
                                                borderColor: item.color ? `${item.color}20` : 'rgba(0,229,160,0.12)'
                                            } : undefined,
                                            "aria-current": isActive ? 'page' : undefined,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    style: {
                                                        color: isActive ? itemColor : undefined
                                                    },
                                                    children: item.icon
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "flex-1 text-left",
                                                    children: item.label
                                                }),
                                                item.badge === 'LIVE' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "px-1.5 py-0.5 rounded text-[8px] font-black bg-[#ff5757]/15 text-[#ff5757] animate-pulse",
                                                    children: "LIVE"
                                                }),
                                                item.badge === 'New' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#b79bff]/15 text-[#b79bff]",
                                                    children: "New"
                                                }),
                                                item.badge === 'AI' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#b79bff]/15 text-[#b79bff]",
                                                    children: "AI"
                                                }),
                                                isLocked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                    className: "w-3 h-3 text-[#f59e0b] opacity-60"
                                                })
                                            ]
                                        }, item.id);
                                    })
                                })
                            ]
                        }, section.section || sectionIndex)),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "pt-3 border-t border-white/[0.05] space-y-0.5",
                        children: [
                            tier === 'free' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/pricing",
                                onClick: onClose,
                                className: "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-bold transition-all hover:scale-[1.02]",
                                style: {
                                    background: 'linear-gradient(135deg, #8b5cf615, #f59e0b15)',
                                    border: '1px solid rgba(139,92,246,0.2)',
                                    color: '#c8d0e0'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#f59e0b]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "flex-1 text-left",
                                        children: "Upgrade to Premium"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/pricing",
                                onClick: onClose,
                                className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.03]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "flex-1 text-left",
                                        children: "Pricing"
                                    })
                                ]
                            }),
                            isAdmin && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/admin",
                                onClick: onClose,
                                className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.03]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "flex-1 text-left",
                                        children: "Admin Panel"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("aside", {
                className: "hidden lg:flex flex-col w-[240px] flex-shrink-0 border-r border-white/[0.05] h-full overflow-hidden bg-[rgba(12,14,20,0.95)] backdrop-blur-xl",
                children: content
            }),
            isOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "lg:hidden fixed inset-0 z-50 flex",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
                        onClick: onClose
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("aside", {
                        className: "relative w-[280px] h-full border-r border-white/[0.05] bg-[#0c0e14] animate-slide-in",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: onClose,
                                className: "absolute top-4 right-3 z-10 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.05]",
                                "aria-label": "Close menu",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CreditCard_Crown_ShieldCheck_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#8b95a8]"
                                })
                            }),
                            content
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 42184:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ PremiumBadge),
/* harmony export */   _: () => (/* binding */ CreditDisplay)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _SubscriptionContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10244);
/* harmony import */ var _barrel_optimize_names_Coins_Crown_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69072);
/* harmony import */ var _barrel_optimize_names_Coins_Crown_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63199);
/* __next_internal_client_entry_do_not_use__ default,CreditDisplay auto */ 


function PremiumBadge({ tier: propTier, size = 'sm' }) {
    const { tier: contextTier } = (0,_SubscriptionContext__WEBPACK_IMPORTED_MODULE_1__/* .useSubscription */ .R)();
    const tier = propTier || contextTier;
    if (tier === 'free') return null;
    const sizeClasses = size === 'sm' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-1';
    const colors = tier === 'pro' ? 'bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-[#000]' : 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: `inline-flex items-center gap-1 rounded-md font-bold ${sizeClasses} ${colors}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Coins_Crown_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                className: size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'
            }),
            tier === 'pro' ? 'PRO' : 'Premium'
        ]
    });
}
function CreditDisplay({ onEarnCredits, onOpenShop }) {
    const { credits } = (0,_SubscriptionContext__WEBPACK_IMPORTED_MODULE_1__/* .useSubscription */ .R)();
    const lowBalance = credits.balance < 20;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "inline-flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: onOpenShop || onEarnCredits,
                className: "group relative inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b] hover:bg-[#f59e0b]/20",
                "aria-label": `${credits.balance} credits — open credit shop`,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "relative inline-flex animate-[coinPulse_0.4s_ease-out]",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Coins_Crown_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                            className: `w-4 h-4 transition-transform duration-300 group-hover:rotate-12 ${lowBalance ? 'animate-pulse' : ''}`
                        })
                    }, `coin-${credits.balance}`),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "font-mono tabular-nums animate-[scaleUp_0.3s_ease-out]",
                        children: credits.balance
                    }, `bal-${credits.balance}`),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[9px] opacity-60 hidden sm:inline",
                        children: "credits"
                    })
                ]
            }),
            lowBalance && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: onEarnCredits,
                className: "text-[10px] font-semibold text-[#00e5a0]/70 hover:text-[#00e5a0] transition-colors whitespace-nowrap flex items-center gap-0.5",
                "aria-label": "Watch an ad to earn credits",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Coins_Crown_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "w-3 h-3"
                    }),
                    "Watch Ad +10"
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        @keyframes coinPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes scaleUp {
          0% { transform: scale(1); }
          40% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `
                }
            })
        ]
    });
}


/***/ }),

/***/ 43385:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ useTheme),
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ ThemeProvider,useTheme auto */ 

const ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function ThemeProvider({ children }) {
    const [theme, setThemeState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('system');
    const [systemTheme, setSystemTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('dark');
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    // Hydrate from localStorage after mount (avoids SSR mismatch)
    /* eslint-disable react-hooks/set-state-in-effect -- Hydration from localStorage must happen in effect */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const stored = localStorage.getItem('theme');
        if (stored && [
            'light',
            'dark',
            'system'
        ].includes(stored)) {
            setThemeState(stored);
        } else {
            // No stored preference → default to dark (matches layout.tsx's html className="dark")
            // so the user's first paint is the polished dark theme.
            setThemeState('dark');
        }
        setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */ // Apply theme to document
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const root = document.documentElement;
        if (resolvedTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [
        resolvedTheme
    ]);
    // Listen to system theme changes
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = ()=>{
            setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);
        return ()=>mediaQuery.removeEventListener('change', handleChange);
    }, []);
    // Save theme to localStorage
    const handleSetTheme = (newTheme)=>{
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ThemeContext.Provider, {
        value: {
            theme,
            setTheme: handleSetTheme,
            resolvedTheme
        },
        children: children
    });
}
function useTheme() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}


/***/ }),

/***/ 49779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ThemeToggle */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43385);
/* harmony import */ var _barrel_optimize_names_Moon_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47603);
/* harmony import */ var _barrel_optimize_names_Moon_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78890);
/* __next_internal_client_entry_do_not_use__ ThemeToggle,default auto */ 


/**
 * ThemeToggle — a compact icon button that flips between dark and light themes.
 * Uses the global `useTheme` hook from `@/lib/hooks/use-theme` which toggles
 * the `.dark` class on <html> and persists the choice to localStorage.
 *
 * Renders both icons and uses CSS (see globals.css `.medq-theme-toggle`)
 * to crossfade based on the active theme, so there is no hydration flash.
 */ function ThemeToggle({ className = '' }) {
    const { theme, setTheme, resolvedTheme } = (0,_lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_1__/* .useTheme */ .D)();
    const cycle = ()=>{
        // Simple dark ↔ light toggle. If currently 'system', jump to the
        // explicit opposite of the resolved theme.
        if (theme === 'system') {
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        } else {
            setTheme(theme === 'dark' ? 'light' : 'dark');
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: "button",
        onClick: cycle,
        className: `medq-theme-toggle ${className}`,
        "aria-label": `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`,
        title: `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Moon_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                className: "icon-sun"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Moon_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                className: "icon-moon"
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeToggle);


/***/ }),

/***/ 50568:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ UserMenu)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5772);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84507);
/* harmony import */ var _components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72264);
/* harmony import */ var _barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69072);
/* harmony import */ var _barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93744);
/* harmony import */ var _barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(88074);
/* harmony import */ var _barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(71019);
/* harmony import */ var _barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(16092);
/* harmony import */ var _barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7428);
/* __next_internal_client_entry_do_not_use__ default auto */ 




function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
}
function getRoleBadge(role) {
    switch(role){
        case 'admin':
            return {
                label: 'Admin',
                color: '#ff5757'
            };
        case 'educator':
            return {
                label: 'Educator',
                color: '#4fc3f7'
            };
        case 'premium':
            return {
                label: 'Premium',
                color: '#8b5cf6'
            };
        case 'pro':
            return {
                label: 'Pro',
                color: '#f59e0b'
            };
        default:
            return {
                label: 'Student',
                color: '#00e5a0'
            };
    }
}
function UserMenu({ user, onShowProfile, onSwitchToPricing, onShowSettings, onShowDeviceSecurity }) {
    if (!user) return null;
    const roleBadge = getRoleBadge(user.role);
    const initials = getInitials(user.name);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenu */ .rI, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuTrigger */ .ty, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    className: "flex items-center gap-2 px-2 py-1.5 rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all hover:bg-white/[0.02] active:scale-95 cursor-pointer"
                }),
                children: [
                    user.image ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_1__["default"], {
                            src: user.image,
                            alt: user.name || 'User',
                            fill: true,
                            className: "object-cover",
                            sizes: "28px",
                            // Avatar is above-the-fold in the user menu trigger — load eagerly.
                            loading: "eager"
                        })
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                        style: {
                            background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
                            color: '#0c0e14'
                        },
                        children: initials
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs font-semibold text-[#e8ecf4] max-w-[80px] truncate hidden sm:inline",
                        children: user.name || 'User'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                        className: "w-3 h-3 text-[#5a6478]"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuContent */ .SQ, {
                align: "end",
                sideOffset: 8,
                className: "w-64 rounded-xl border-white/[0.06] p-1.5",
                style: {
                    background: '#1a1e2b'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuLabel */ .lp, {
                        className: "p-3 rounded-lg cursor-default",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                                user.image ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                        src: user.image,
                                        alt: user.name || 'User',
                                        fill: true,
                                        className: "object-cover",
                                        sizes: "40px",
                                        loading: "eager"
                                    })
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                                    style: {
                                        background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
                                        color: '#0c0e14'
                                    },
                                    children: initials
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-sm font-bold text-[#e8ecf4] truncate",
                                            children: user.name || 'User'
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#5a6478] truncate",
                                            children: user.email
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold",
                                            style: {
                                                background: `${roleBadge.color}15`,
                                                color: roleBadge.color,
                                                border: `1px solid ${roleBadge.color}30`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                    className: "w-2.5 h-2.5"
                                                }),
                                                roleBadge.label
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuSeparator */ .mB, {
                        className: "bg-white/[0.06]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuGroup */ .I, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuItem */ ._2, {
                                onClick: onShowProfile,
                                className: "rounded-lg px-3 py-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] focus:text-[#e8ecf4] focus:bg-white/[0.04] cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-4 h-4 mr-2"
                                    }),
                                    "My Profile"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuItem */ ._2, {
                                onClick: onShowSettings,
                                className: "rounded-lg px-3 py-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] focus:text-[#e8ecf4] focus:bg-white/[0.04] cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-4 h-4 mr-2"
                                    }),
                                    "Settings"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuItem */ ._2, {
                                onClick: onSwitchToPricing,
                                className: "rounded-lg px-3 py-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] focus:text-[#e8ecf4] focus:bg-white/[0.04] cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4 mr-2"
                                    }),
                                    "Subscription"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuItem */ ._2, {
                                onClick: onShowDeviceSecurity,
                                className: "rounded-lg px-3 py-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] focus:text-[#e8ecf4] focus:bg-white/[0.04] cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-4 h-4 mr-2"
                                    }),
                                    "Device Security"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuSeparator */ .mB, {
                        className: "bg-white/[0.06]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuItem */ ._2, {
                        onClick: async ()=>{
                            // Use redirect:false so Auth.js does NOT navigate to the built-in
                            // /api/auth/signout?csrf=true HTML page. We revoke the session
                            // server-side, then navigate manually to '/'.
                            // This avoids the "stuck on signout confirmation page" symptom
                            // that happens when AUTH_URL doesn't match the current host
                            // (CSRF cookie domain mismatch makes the auto-submit form fail).
                            try {
                                await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__/* .signOut */ .CI)({
                                    redirect: false
                                });
                            } catch (e) {
                                // Even if the network call fails, force-navigate to home so the
                                // user is not stuck on a broken auth page.
                                console.error('signOut failed:', e);
                            }
                            window.location.href = '/';
                        },
                        className: "rounded-lg px-3 py-2 text-xs text-[#ff5757] hover:text-[#ff5757] focus:text-[#ff5757] focus:bg-[#ff5757]/10 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_CreditCard_Crown_Fingerprint_LogOut_Settings_User_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "w-4 h-4 mr-2"
                            }),
                            "Sign Out"
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 57434:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TR: () => (/* binding */ useAppSettingsOpener),
/* harmony export */   eK: () => (/* binding */ openAuthModal),
/* harmony export */   vx: () => (/* binding */ openAppSettings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93714);
/**
 * App-level UI event bus.
 *
 * Decouples deeply-nested children (e.g. the OpenMAIC SettingsDialog rendered
 * inside the AI Classroom tab) from the top-level MedQ page state that owns
 * the app-wide SettingsDialog. Without this bus, a child would need to climb
 * ~6 component layers to ask the page to open Settings → BYOK.
 *
 * Use `useAppEvents()` in the top-level page to subscribe, and
 * `openAppSettings()` / `openAppByok()` from anywhere to dispatch.
 */ 

const emitter = (0,mitt__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)();
/** Dispatch from anywhere in the app. */ function openAppSettings(section) {
    emitter.emit('OPEN_APP_SETTINGS', {
        section
    });
}
/**
 * Open the app-wide AuthModal from anywhere in the app.
 *
 * This mirrors the same window-event pattern the AI agent uses
 * (`medq-agent-open-dialog` with `dialogId: 'auth-modal'`), which is
 * handled by MedQAppShell. Use this when a child component needs to
 * prompt sign-in (e.g. BYOK settings when the user is unauthenticated)
 * without prop-drilling the setShowAuthModal setter.
 */ function openAuthModal(tab) {
    if (false) {}
    window.dispatchEvent(new CustomEvent('medq-agent-open-dialog', {
        detail: {
            dialogId: 'auth-modal',
            data: {
                tab
            }
        }
    }));
}
/** Subscribe in a top-level component (e.g. src/app/page.tsx). */ function useAppSettingsOpener(onOpen) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const handler = (payload)=>{
            onOpen(payload?.section);
        };
        emitter.on('OPEN_APP_SETTINGS', handler);
        return ()=>{
            emitter.off('OPEN_APP_SETTINGS', handler);
        };
    }, [
        onOpen
    ]);
}


/***/ }),

/***/ 64012:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ UpgradeModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _SubscriptionContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10244);
/* harmony import */ var _barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69072);
/* harmony import */ var _barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(34018);
/* harmony import */ var _barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(92571);
/* harmony import */ var _lib_subscription_tiers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38984);
/* __next_internal_client_entry_do_not_use__ default auto */ 




function UpgradeModal() {
    const { showUpgradeModal, setShowUpgradeModal, tier, refresh } = (0,_SubscriptionContext__WEBPACK_IMPORTED_MODULE_2__/* .useSubscription */ .R)();
    const [upgrading, setUpgrading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    if (!showUpgradeModal) return null;
    const plans = (0,_lib_subscription_tiers__WEBPACK_IMPORTED_MODULE_3__/* .getTierList */ .pT)().map((def)=>({
            id: def.id,
            name: def.name,
            tagline: def.tagline,
            price: def.priceUsd === 0 ? '$0' : `$${def.priceUsd.toFixed(2)}`,
            period: def.interval === 'forever' ? '/forever' : '/month',
            features: def.features,
            icon: def.id === 'free' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }) : def.id === 'premium' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: def.accentColor,
            popular: def.popular,
            current: tier === def.id
        }));
    const handleUpgrade = async (planId)=>{
        setError(null);
        if (planId === 'free') {
            // Downgrade is a direct API call (no checkout needed).
            setUpgrading(planId);
            try {
                const res = await fetch('/api/subscription', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tier: planId
                    })
                });
                if (res.ok) {
                    await refresh();
                    setTimeout(()=>setShowUpgradeModal(false), 500);
                } else {
                    setError('Failed to downgrade. Please try again.');
                }
            } catch (e) {
                console.error('Downgrade error:', e);
                setError('Network error during downgrade.');
            } finally{
                setUpgrading(null);
            }
            return;
        }
        // Premium / Pro — create Stripe Checkout (or mock-success redirect).
        setUpgrading(planId);
        try {
            const res = await fetch('/api/subscription/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tier: planId
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Failed to start checkout.');
                setUpgrading(null);
                return;
            }
            // Redirect to Stripe Checkout (or mock-success in dev).
            if (data.url) {
                window.location.assign(data.url);
                return;
            }
            // No URL — shouldn't happen, but handle gracefully.
            setError('Checkout did not return a redirect URL.');
            setUpgrading(null);
        } catch (e) {
            console.error('Checkout error:', e);
            setError('Network error during checkout.');
            setUpgrading(null);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
        style: {
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)'
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "relative w-full max-w-2xl bg-[#151821] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    onClick: ()=>setShowUpgradeModal(false),
                    className: "absolute top-4 right-4 text-white/30 hover:text-white/60 z-10",
                    "aria-label": "Close",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                        className: "w-5 h-5"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "text-center pt-8 pb-4 px-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#8b5cf6]/25",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-7 h-7 text-white"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                            className: "text-xl font-bold text-[#e8ecf4]",
                            children: "Unlock Your Full Potential"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-sm text-[#8b95a8] mt-1",
                            children: "Choose the plan that fits your study needs"
                        }),
                        error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ff5757]/10 border border-[#ff5757]/20 text-[#ff5757] text-[11px] font-semibold",
                            children: error
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4 p-6",
                    children: plans.map((plan)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: `relative rounded-xl border p-4 transition-all ${plan.current ? 'border-[#00e5a0]/40 bg-[#00e5a0]/[0.03]' : plan.popular ? 'border-[#8b5cf6]/40 bg-[#8b5cf6]/[0.03]' : 'border-white/[0.06] bg-[#1a1e2b]'}`,
                            children: [
                                plan.popular && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold px-3 py-0.5 rounded-full bg-[#8b5cf6] text-white",
                                    children: "MOST POPULAR"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-center mb-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "mx-auto mb-2",
                                            style: {
                                                color: plan.color
                                            },
                                            children: plan.icon
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "text-sm font-bold text-[#e8ecf4]",
                                            children: plan.name
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#5a6478] mt-0.5 leading-tight h-6",
                                            children: plan.tagline
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "mt-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-xl font-bold text-[#e8ecf4]",
                                                    children: plan.price
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-xs text-[#5a6478]",
                                                    children: plan.period
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
                                    className: "space-y-1.5 mb-4",
                                    children: plan.features.map((f, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                            className: "flex items-start gap-1.5 text-xs text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: "w-3 h-3 mt-0.5 flex-shrink-0",
                                                    style: {
                                                        color: plan.color
                                                    }
                                                }),
                                                f
                                            ]
                                        }, i))
                                }),
                                plan.current ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-full py-2 rounded-lg bg-[#00e5a0]/10 border border-[#00e5a0]/20 text-[#00e5a0] text-xs font-bold text-center",
                                    children: "Current Plan"
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>handleUpgrade(plan.id),
                                    disabled: upgrading === plan.id,
                                    className: "w-full py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5",
                                    style: {
                                        background: plan.color,
                                        color: plan.id === 'free' ? '#e8ecf4' : '#000'
                                    },
                                    children: upgrading === plan.id ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Crown_Loader2_Shield_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                className: "w-3 h-3 animate-spin"
                                            }),
                                            plan.id === 'free' ? 'Downgrading...' : 'Redirecting to checkout...'
                                        ]
                                    }) : plan.id === 'free' ? 'Downgrade' : 'Upgrade Now'
                                })
                            ]
                        }, plan.id))
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "px-6 pb-6 text-center",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] text-[#5a6478]",
                        children: "Secure checkout powered by Stripe. Cancel anytime from Settings → Subscription."
                    })
                })
            ]
        })
    });
}


/***/ }),

/***/ 66284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ OfflineIndicator)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Check_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64577);
/* harmony import */ var _lib_offline_queue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69776);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * OfflineIndicator — Telegram-style minimal offline UX.
 *
 * DESIGN PHILOSOPHY (v2 — "appear normal like Telegram"):
 *   The previous version showed persistent chips like "Offline · 3 queued"
 *   and "N queued · Sync" whenever the user was offline or had pending
 *   writes. Users reported this made the app feel broken when offline.
 *
 *   Telegram's approach: when you send a message offline, it silently
 *   queues it, shows a tiny clock icon on the message itself (handled
 *   by the chat UI, not this component), and only briefly shows a
 *   "Connecting..." status when the connection drops. Once reconnect
 *   succeeds, a subtle "Back online" confirmation appears for ~2s.
 *
 *   This component now ONLY shows:
 *     1. A brief green "Back online" chip for 2.5s after reconnecting
 *        (so the user knows queued writes were flushed)
 *     2. NOTHING while offline — the app should look completely normal
 *     3. NOTHING when there are pending queued writes — they'll auto-sync
 *        when connectivity returns, no need to bother the user
 *
 *   The queue infrastructure (broadcastQueueStatus, triggerReplay, etc.)
 *   is still used internally to know when sync completes — we just don't
 *   surface that as visible UI anymore.
 *
 * WHY KEEP THE COMPONENT AT ALL:
 *   - The "Back online" green chip is genuinely useful feedback (the user
 *     knows their queued actions were delivered).
 *   - The internal logic (subscribing to queue status, posting
 *     medq:client-online/offline to the SW) has useful side effects.
 *   - Removing the component entirely would require moving that logic
 *     elsewhere; keeping it as a "transparent" component is simpler.
 */ 


function OfflineIndicator() {
    const [isOnline, setIsOnline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>{
        if (true) return navigator.onLine;
        return true;
    });
    const [showRestored, setShowRestored] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Track pending count internally so we know whether the "Back online"
    // chip should appear (only show it if we actually had queued writes
    // that needed syncing — otherwise a brief network blip doesn't need
    // a "Back online" banner).
    const [hadPendingWhileOffline, setHadPendingWhileOffline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleOnline = ()=>{
            setIsOnline(true);
            // Only show the "Back online" chip if we actually had pending
            // writes queued while offline. If the user was just browsing
            // (no queued actions), a silent reconnect is more polished.
            if (hadPendingWhileOffline) {
                setShowRestored(true);
                window.setTimeout(()=>{
                    setShowRestored(false);
                    setHadPendingWhileOffline(false);
                }, 2500);
            }
            // Notify the SW that we're back online so it can reset its
            // _lastFetchFailAt flag (otherwise it'll keep skipping the network
            // try for 8s after the actual reconnect).
            if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((reg)=>{
                    reg.active?.postMessage({
                        type: 'medq:client-online'
                    });
                }).catch(()=>{});
            }
        };
        const handleOffline = ()=>{
            setIsOnline(false);
            setShowRestored(false);
            // Notify the SW that this client is now offline so its
            // _onlineClientCount is accurate (used by the SW to decide whether
            // to try the network or short-circuit to cache/503).
            if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((reg)=>{
                    reg.active?.postMessage({
                        type: 'medq:client-offline'
                    });
                }).catch(()=>{});
            }
        };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        // We still subscribe to queue-status events so we know whether any
        // writes are pending. If there are pending writes while offline,
        // we'll want to show the "Back online" confirmation when reconnect
        // happens (otherwise the user has no idea their writes flushed).
        const unsubscribe = (0,_lib_offline_queue__WEBPACK_IMPORTED_MODULE_2__/* .subscribeToQueueStatus */ .fY)((count)=>{
            if (count > 0 && !isOnline) {
                setHadPendingWhileOffline(true);
            }
        });
        return ()=>{
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            unsubscribe();
        };
    }, [
        isOnline
    ]);
    // ── Compute the visible state ──
    // Telegram-style: ONLY show "Back online" briefly after reconnect.
    // Never show offline/pending/syncing chips — the app should appear
    // completely normal when offline, exactly like Telegram.
    let state;
    if (showRestored) {
        state = {
            kind: 'restored'
        };
    } else {
        state = {
            kind: 'hidden'
        };
    }
    if (state.kind === 'hidden') return null;
    const base = 'fixed top-3 right-3 z-[100] pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-200 animate-fade-in';
    let content = null;
    let className = base;
    if (state.kind === 'restored') {
        className += ' bg-[#00e5a0] text-[#0c0e14]';
        content = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "w-3.5 h-3.5 flex-shrink-0"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    children: "Back online"
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: className,
        role: "status",
        "aria-live": "polite",
        children: content
    });
}


/***/ }),

/***/ 66797:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ MobileBottomNav)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98500);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_MoreHorizontal_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(59680);
/* harmony import */ var _lib_medq_nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26846);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(85542);
/* __next_internal_client_entry_do_not_use__ MobileBottomNav auto */ 




/**
 * REAL Next.js routing (user directive 2026-11-04): every bottom-nav item
 * is a plain <Link href> — no click interception, no preventDefault, no
 * onTabSwitch. Real-page tabs navigate to their (app) route; SPA tabs
 * navigate to the REAL /?tab=<id> URL (refresh-safe, back/forward works).
 * The shell derives the active item from the URL.
 */ function MobileBottomNav({ activeTab, unreadNotifs, items, onCustomize }) {
    const activeNavId = (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .getActiveBottomNavId */ .kE)(activeTab, items);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
        className: "lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] flex items-center justify-around py-1 px-1",
        style: {
            background: 'rgba(12,14,20,0.97)',
            backdropFilter: 'blur(20px)',
            paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))'
        },
        "aria-label": "Mobile navigation",
        children: [
            items.map((item)=>{
                const isActive = activeNavId === item.id;
                const Icon = item.icon;
                const color = item.color ?? '#00e5a0';
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: (0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_2__/* .tabHref */ .tW)(item.id),
                    prefetch: (0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_2__/* .hasRealPage */ .I3)(item.id) ? undefined : false,
                    className: `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all min-w-[56px] relative ${isActive ? '' : 'text-[#5a6478] hover:text-[#8b95a8]'}`,
                    style: isActive ? {
                        color
                    } : undefined,
                    "aria-current": isActive ? 'page' : undefined,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                            className: `w-5 h-5 ${isActive ? 'scale-110' : ''}`
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-[10px] font-semibold",
                            style: isActive ? {
                                color
                            } : undefined,
                            children: item.label
                        }),
                        item.id === 'advanced-chat' && unreadNotifs > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "absolute top-0 right-0.5 min-w-4 h-4 px-0.5 rounded-full bg-[#ff5757] text-[8px] font-bold text-white flex items-center justify-center",
                            children: unreadNotifs > 9 ? '9+' : unreadNotifs
                        })
                    ]
                }, item.id);
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: onCustomize,
                className: "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all min-w-[56px] text-[#5a6478] hover:text-[#8b95a8]",
                "aria-label": "Customize navigation",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_MoreHorizontal_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                        className: "w-5 h-5"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px] font-semibold",
                        children: "More"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 66926:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ NotificationsPanel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_medq_useNotificationStream__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17940);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57465);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12643);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(35302);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54757);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24551);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(83254);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(36083);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(15298);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(92048);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(65878);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(68394);
/* harmony import */ var _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(9005);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66609);
/* __next_internal_client_entry_do_not_use__ default auto */ 




/* ───────── Config ───────── */ const NOTIFICATION_CONFIG = {
    friend_request: {
        icon: _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
        color: '#4fc3f7'
    },
    challenge: {
        icon: _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A,
        color: '#ff5757'
    },
    group_invite: {
        icon: _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A,
        color: '#8b5cf6'
    },
    post_like: {
        icon: _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A,
        color: '#ec4899'
    },
    post_comment: {
        icon: _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A,
        color: '#4fc3f7'
    },
    mention: {
        icon: _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A,
        color: '#f59e0b'
    },
    achievement: {
        icon: _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A,
        color: '#f59e0b'
    },
    system: {
        icon: _barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A,
        color: '#5a6478'
    }
};
const NAVIGATION_MAP = {
    friend_request: 'friends',
    challenge: 'arena',
    group_invite: 'groups',
    // Social Feed tab was removed — route post/mention notifications to Groups
    // (the closest still-existing social surface) instead of the removed 'feed' tab.
    post_like: 'groups',
    post_comment: 'groups',
    mention: 'groups',
    achievement: 'erc',
    system: 'dashboard'
};
/* ───────── Helpers ───────── */ function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
}
/* ───────── Sub-components ───────── */ function NotificationItem({ notification, onRead, onNavigate, onClose }) {
    const config = NOTIFICATION_CONFIG[notification.type] || NOTIFICATION_CONFIG.system;
    const Icon = config.icon;
    const handleClick = ()=>{
        if (!notification.isRead) {
            onRead(notification.id);
        }
        const tab = NAVIGATION_MAP[notification.type] || 'dashboard';
        // onNavigate(tab);
        onClose();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: handleClick,
        className: "w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all group",
        style: {
            background: notification.isRead ? 'transparent' : 'rgba(0,229,160,0.04)',
            border: notification.isRead ? '1px solid transparent' : '1px solid rgba(0,229,160,0.08)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                style: {
                    background: `${config.color}15`,
                    color: config.color
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                    className: "w-4.5 h-4.5",
                    style: {
                        width: '18px',
                        height: '18px'
                    }
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-bold truncate",
                                style: {
                                    color: notification.isRead ? '#5a6478' : '#e8ecf4'
                                },
                                children: notification.title
                            }),
                            !notification.isRead && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "w-2 h-2 rounded-full flex-shrink-0",
                                style: {
                                    background: '#00e5a0'
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[11px] mt-0.5 line-clamp-2",
                        style: {
                            color: notification.isRead ? '#3a4055' : '#8b95a8'
                        },
                        children: notification.message
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] mt-1",
                        style: {
                            color: '#3a4055'
                        },
                        children: timeAgo(notification.createdAt)
                    })
                ]
            })
        ]
    });
}
function NotificationSkeleton() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-start gap-3 p-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-9 h-9 rounded-lg animate-pulse flex-shrink-0",
                style: {
                    background: 'rgba(255,255,255,0.05)'
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-3 w-28 rounded animate-pulse mb-2",
                        style: {
                            background: 'rgba(255,255,255,0.05)'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-3 w-full rounded animate-pulse mb-1",
                        style: {
                            background: 'rgba(255,255,255,0.04)'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-2.5 w-12 rounded animate-pulse",
                        style: {
                            background: 'rgba(255,255,255,0.03)'
                        }
                    })
                ]
            })
        ]
    });
}
/* ───────── Main Component ───────── */ function NotificationsPanel({ open, onClose, onNavigate }) {
    // const { isAuthenticated } = useAuth();
    const isAuthenticated = true;
    const [notifications, setNotifications] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>[]);
    const [unreadCount, setUnreadCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>0);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>false);
    const [markingAll, setMarkingAll] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>false);
    const [filter, setFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const panelRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /* ── Real-time push via SSE ──
   * When the panel is open and the user is authenticated, subscribe to the
   * notification stream so new notifications appear instantly without a
   * manual refresh. The hook is a singleton, so opening/closing the panel
   * doesn't churn connections. */ const { connected: sseConnected } = (0,_components_medq_useNotificationStream__WEBPACK_IMPORTED_MODULE_2__/* .useNotificationStream */ .n)({
        enabled: !!isAuthenticated && open,
        onUnreadCount: (c)=>setUnreadCount(c),
        onNotification: (n)=>{
            // Prepend new notifications to the local list (only if it matches the
            // current filter — unread always shows; "all" always shows).
            setNotifications((prev)=>{
                // De-dupe: if the notification is already in the list (e.g. backfill
                // sent it again), don't double-add.
                if (prev.some((p)=>p.id === n.id)) return prev;
                const next = {
                    ...n
                };
                return [
                    next,
                    ...prev
                ].slice(0, 50); // cap at 50
            });
        }
    });
    /* ── Fetch notifications ── */ const fetchNotifications = async ()=>{
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.set('limit', '30');
            if (filter === 'unread') params.set('unread', 'true');
            const res = await fetch(`/api/notifications?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setNotifications(data.notifications || []);
                setUnreadCount(data.unreadCount || 0);
            }
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
        } finally{
            setLoading(false);
        }
    };
    /* ── Mark single as read ── */ const markAsRead = async (id)=>{
        // Optimistic update
        setNotifications((prev)=>prev.map((n)=>n.id === id ? {
                    ...n,
                    isRead: true
                } : n));
        setUnreadCount((prev)=>Math.max(0, prev - 1));
        try {
            const res = await fetch(`/api/notifications/${id}/read`, {
                method: 'PUT'
            });
            if (!res.ok) {
                // Revert on failure
                setNotifications((prev)=>prev.map((n)=>n.id === id ? {
                            ...n,
                            isRead: false
                        } : n));
                setUnreadCount((prev)=>prev + 1);
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to mark notification');
            }
        } catch  {
            // Revert on error
            setNotifications((prev)=>prev.map((n)=>n.id === id ? {
                        ...n,
                        isRead: false
                    } : n));
            setUnreadCount((prev)=>prev + 1);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to mark notification');
        }
    };
    /* ── Mark all as read ── */ const markAllAsRead = async ()=>{
        if (unreadCount === 0) return;
        setMarkingAll(true);
        // Optimistic update
        const prevUnread = unreadCount;
        setNotifications((prev)=>prev.map((n)=>({
                    ...n,
                    isRead: true
                })));
        setUnreadCount(0);
        try {
            const res = await fetch('/api/notifications', {
                method: 'PUT'
            });
            if (res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('All notifications marked as read');
            } else {
                // Revert
                setNotifications((prev)=>prev.map((n, i)=>i < prevUnread ? {
                            ...n,
                            isRead: false
                        } : n));
                setUnreadCount(prevUnread);
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to mark all as read');
            }
        } catch  {
            // Revert
            setNotifications((prev)=>prev.map((n, i)=>i < prevUnread ? {
                        ...n,
                        isRead: false
                    } : n));
            setUnreadCount(prevUnread);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to mark all as read');
        } finally{
            setMarkingAll(false);
        }
    };
    /* ── Effects ── */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (open && isAuthenticated) {
            fetchNotifications();
        }
    }, [
        open,
        isAuthenticated,
        filter
    ]);
    // Close on click outside
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        const handleClickOutside = (e)=>{
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                onClose();
            }
        };
        // Delay to avoid closing immediately from the trigger click
        const timer = setTimeout(()=>{
            document.addEventListener('mousedown', handleClickOutside);
        }, 100);
        return ()=>{
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        open,
        onClose
    ]);
    // Close on Escape
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        const handleEscape = (e)=>{
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return ()=>document.removeEventListener('keydown', handleEscape);
    }, [
        open,
        onClose
    ]);
    // Auto-refresh every 2 min while open (SSE handles real-time; this is a
    // safety net so the list re-syncs if any SSE events were missed).
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open || !isAuthenticated) return;
        const interval = setInterval(()=>{
            fetchNotifications();
        }, 120000);
        return ()=>clearInterval(interval);
    }, [
        open,
        isAuthenticated,
        filter
    ]);
    /* ── Render ── */ if (!open) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "fixed inset-0 z-40 lg:hidden",
                style: {
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)'
                },
                onClick: onClose
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                ref: panelRef,
                className: "fixed right-4 top-16 z-50 w-[360px] max-w-[calc(100vw-32px)] rounded-2xl shadow-2xl overflow-hidden",
                style: {
                    background: '#12141c',
                    border: '1px solid rgba(255,255,255,0.08)',
                    maxHeight: 'calc(100vh - 80px)',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between px-4 py-3 flex-shrink-0",
                        style: {
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            background: 'rgba(255,255,255,0.02)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                        style: {
                                            background: 'rgba(0,229,160,0.1)'
                                        },
                                        children: unreadCount > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#00e5a0]"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#5a6478]"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                        className: "text-sm font-bold text-[#e8ecf4]",
                                                        children: "Notifications"
                                                    }),
                                                    sseConnected ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider",
                                                        style: {
                                                            background: 'rgba(0,229,160,0.12)',
                                                            color: '#00e5a0'
                                                        },
                                                        title: "Real-time connection active",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse"
                                                            }),
                                                            "Live"
                                                        ]
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider",
                                                        style: {
                                                            background: 'rgba(255,255,255,0.05)',
                                                            color: '#5a6478'
                                                        },
                                                        title: "Reconnecting…",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                                className: "w-2.5 h-2.5"
                                                            }),
                                                            "Sync"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            unreadCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-[10px] text-[#00e5a0] font-semibold",
                                                children: [
                                                    unreadCount,
                                                    " unread"
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    unreadCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: markAllAsRead,
                                        disabled: markingAll,
                                        className: "flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all disabled:opacity-50 hover:bg-white/[0.05]",
                                        style: {
                                            color: '#00e5a0'
                                        },
                                        title: "Mark all as read",
                                        children: [
                                            markingAll ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "hidden sm:inline",
                                                children: "Mark all"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: onClose,
                                        className: "w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/[0.05]",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#5a6478]"
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex items-center gap-1 px-4 py-2 flex-shrink-0",
                        style: {
                            borderBottom: '1px solid rgba(255,255,255,0.04)'
                        },
                        children: [
                            'all',
                            'unread'
                        ].map((f)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setFilter(f),
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all",
                                style: {
                                    background: filter === f ? 'rgba(0,229,160,0.08)' : 'transparent',
                                    color: filter === f ? '#00e5a0' : '#5a6478',
                                    border: filter === f ? '1px solid rgba(0,229,160,0.15)' : '1px solid transparent'
                                },
                                children: [
                                    f === 'all' ? 'All' : 'Unread',
                                    f === 'unread' && unreadCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold",
                                        style: {
                                            background: 'rgba(0,229,160,0.15)',
                                            color: '#00e5a0'
                                        },
                                        children: unreadCount
                                    })
                                ]
                            }, f))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex-1 overflow-y-auto p-2 space-y-1",
                        style: {
                            maxHeight: '420px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.08) transparent'
                        },
                        children: loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationSkeleton, {}),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationSkeleton, {}),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationSkeleton, {}),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationSkeleton, {}),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationSkeleton, {})
                            ]
                        }) : notifications.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-center py-10",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)'
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AtSign_Bell_BellDot_CheckCheck_Heart_Loader2_MessageCircle_Swords_Trophy_Users_UsersRound_WifiOff_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-6 h-6 text-[#3a4055]"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs font-semibold text-[#5a6478]",
                                    children: filter === 'unread' ? 'No unread notifications' : 'No notifications yet'
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[10px] text-[#3a4055] mt-1",
                                    children: filter === 'unread' ? 'You\u2019re all caught up!' : 'We\u2019ll notify you about friend requests, challenges, and more'
                                })
                            ]
                        }) : notifications.map((n)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationItem, {
                                notification: n,
                                onRead: markAsRead,
                                // onNavigate={onNavigate}
                                onClose: onClose
                            }, n.id))
                    }),
                    notifications.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "px-4 py-2.5 flex-shrink-0 text-center",
                        style: {
                            borderTop: '1px solid rgba(255,255,255,0.04)',
                            background: 'rgba(255,255,255,0.01)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-[10px] text-[#3a4055]",
                            children: [
                                notifications.length,
                                " notification",
                                notifications.length !== 1 ? 's' : '',
                                unreadCount > 0 ? ` \u00B7 ${unreadCount} unread` : ''
                            ]
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 69776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J1: () => (/* binding */ subscribeToReplayForPath),
/* harmony export */   Rs: () => (/* binding */ initOfflineQueue),
/* harmony export */   aU: () => (/* binding */ subscribeToReplaySuccess),
/* harmony export */   fY: () => (/* binding */ subscribeToQueueStatus)
/* harmony export */ });
/* unused harmony exports triggerReplay, getPendingCount, isOnline */
/* __next_internal_client_entry_do_not_use__ initOfflineQueue,subscribeToQueueStatus,subscribeToReplaySuccess,subscribeToReplayForPath,triggerReplay,getPendingCount,isOnline auto */ const statusListeners = new Set();
const replayListeners = new Set();
let currentPending = 0;
let initialized = false;
function handleServiceWorkerMessage(event) {
    const data = event.data || {};
    if (data.type === 'medq:queue-status') {
        currentPending = typeof data.pending === 'number' ? data.pending : 0;
        statusListeners.forEach((fn)=>{
            try {
                fn(currentPending);
            } catch (e) {}
        });
    } else if (data.type === 'medq:queue-replay-success') {
        replayListeners.forEach((fn)=>{
            try {
                fn({
                    url: data.url,
                    method: data.method,
                    status: data.status,
                    body: data.body || ''
                });
            } catch (e) {}
        });
    }
}
function handleOnline() {
    // Browser is back online — ask the SW to:
    //   1. Reset its _lastFetchFailAt flag (so it stops assuming the network
    //      is down and starts trying fetches again)
    //   2. Replay the queued outbox
    // This is the fallback path for browsers without Background Sync.
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration)=>{
            registration.active?.postMessage({
                type: 'medq:client-online'
            });
            registration.active?.postMessage({
                type: 'medq:replay-now'
            });
        }).catch(()=>{});
    }
}
function handleOffline() {
    // Browser reports offline — notify the SW so its _onlineClientCount
    // stays accurate. The SW uses this count to decide whether to try the
    // network or short-circuit to cache/503.
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration)=>{
            registration.active?.postMessage({
                type: 'medq:client-offline'
            });
        }).catch(()=>{});
    }
}
/**
 * Initialize the offline-queue listener. Safe to call multiple times —
 * subsequent calls are no-ops.
 */ function initOfflineQueue() {
    if (initialized) return;
    if (false) {}
    if (!('serviceWorker' in navigator)) return;
    initialized = true;
    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    // Request an initial status broadcast from the SW
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'medq:get-queue-status'
        });
        // Also report our current online/offline state so the SW's
        // _onlineClientCount is accurate from the start
        if (typeof navigator !== 'undefined') {
            navigator.serviceWorker.controller.postMessage({
                type: navigator.onLine ? 'medq:client-online' : 'medq:client-offline'
            });
        }
    } else {
        // The SW might not have taken control yet — try again on controllerchange
        navigator.serviceWorker.addEventListener('controllerchange', ()=>{
            navigator.serviceWorker.controller?.postMessage({
                type: 'medq:get-queue-status'
            });
            if (typeof navigator !== 'undefined') {
                navigator.serviceWorker.controller?.postMessage({
                    type: navigator.onLine ? 'medq:client-online' : 'medq:client-offline'
                });
            }
        });
    }
}
/**
 * Subscribe to pending-queue-count changes.
 * Returns an unsubscribe function.
 */ function subscribeToQueueStatus(listener) {
    statusListeners.add(listener);
    // Immediately invoke with the current value
    try {
        listener(currentPending);
    } catch (e) {}
    return ()=>{
        statusListeners.delete(listener);
    };
}
/**
 * Subscribe to "queued write replayed successfully" events.
 * Chat components use this to refetch messages/rooms after a reconnect.
 * Returns an unsubscribe function.
 */ function subscribeToReplaySuccess(listener) {
    replayListeners.add(listener);
    return ()=>{
        replayListeners.delete(listener);
    };
}
/**
 * Subscribe to replay-success events filtered by URL substring.
 *
 * Convenience wrapper around `subscribeToReplaySuccess` for components
 * that only care about a specific API path (e.g. `/api/notes`,
 * `/api/bookmarks`, `/api/quick-notes`, `/api/study-streaks/check-in`).
 *
 * Example:
 *   useEffect(() => subscribeToReplayForPath('/api/notes', () => refetchNotes()), []);
 */ function subscribeToReplayForPath(pathSubstring, listener) {
    const wrapped = (info)=>{
        if (info.url.includes(pathSubstring)) {
            try {
                listener();
            } catch (e) {}
        }
    };
    replayListeners.add(wrapped);
    return ()=>{
        replayListeners.delete(wrapped);
    };
}
/**
 * Manually trigger a queue replay (e.g. from a "Retry now" button).
 */ function triggerReplay() {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.ready.then((registration)=>{
        registration.active?.postMessage({
            type: 'medq:replay-now'
        });
    }).catch(()=>{});
}
/**
 * Current pending count (read-only snapshot).
 */ function getPendingCount() {
    return currentPending;
}
/**
 * Returns true if the browser is currently offline.
 */ function isOnline() {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
}


/***/ }),

/***/ 79379:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MN: () => (/* reexport safe */ _useBottomNav__WEBPACK_IMPORTED_MODULE_3__.M),
/* harmony export */   Xb: () => (/* reexport safe */ _MobileBottomNav__WEBPACK_IMPORTED_MODULE_1__.X),
/* harmony export */   gV: () => (/* reexport safe */ _BottomNavCustomizer__WEBPACK_IMPORTED_MODULE_2__.g),
/* harmony export */   nx: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_4__.nx),
/* harmony export */   wZ: () => (/* reexport safe */ _SidebarNav__WEBPACK_IMPORTED_MODULE_0__.w)
/* harmony export */ });
/* harmony import */ var _SidebarNav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40170);
/* harmony import */ var _MobileBottomNav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66797);
/* harmony import */ var _BottomNavCustomizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5210);
/* harmony import */ var _useBottomNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5656);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(92747);







/***/ }),

/***/ 83557:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UN: () => (/* binding */ resolveNavigationTarget),
/* harmony export */   cM: () => (/* binding */ pathToTab)
/* harmony export */ });
/* unused harmony exports tabToPath, isMedQTabPath, DIALOG_TARGETS */
/**
 * URL routing utility for MedQ SPA.
 *
 * Maps the 73+ TabId values to clean URL paths and provides
 * helpers for syncing browser URL ↔ activeTab state.
 *
 * Design:
 * - Most tabs map directly: TabId → /{tabId} (e.g. 'bank' → '/bank')
 * - A few friendly aliases for common tabs (e.g. 'dashboard' → '/home')
 * - Special tabs have unique paths (e.g. 'take-exam' → '/exam/take')
 * - All paths are served by the same page.tsx via a catch-all rewrite
 */ // ── TabId → URL path mapping ───────────────────────────────────
// Friendly aliases for the most common/landing tabs
const TAB_PATH_ALIASES = {
    'dashboard': '/home',
    'advanced-chat': '/messages',
    'take-exam': '/exam/take',
    'pricing': '/pricing',
    'revenue': '/revenue',
    'admin': '/admin',
    // Batch C — SEO-friendly URL for the daily challenge page.
    // The 'challenge' tab id lives at /daily-challenge (not /challenge).
    // /challenge is kept as a 308 redirect → /daily-challenge (see
    // src/app/challenge/page.tsx).
    'challenge': '/daily-challenge'
};
// ── URL path → TabId reverse mapping ───────────────────────────
// Built from aliases + default rule (path = '/' + tabId)
const PATH_TO_TAB = {};
const TAB_TO_PATH = {};
// Populate both maps from the aliases
for (const [tab, path] of Object.entries(TAB_PATH_ALIASES)){
    PATH_TO_TAB[path] = tab;
    TAB_TO_PATH[tab] = path;
}
// For all other tabs, the path is simply '/' + tabId
// We don't enumerate all 73 tabs here — instead we use a fallback rule
// But we do need the reverse map for the common aliases
/**
 * Get the URL path for a given TabId.
 * Examples: 'dashboard' → '/home', 'bank' → '/bank', 'take-exam' → '/exam/take'
 *
 * Defensive: if a caller passes a value that already looks like a URL path
 * (starts with '/' or matches /^https?:\/\//), we return it as-is rather
 * than prepending another '/'. This prevents the bug where a download URL
 * like '/generated/user/file.pdf' becomes '//generated/user/file.pdf' which
 * the browser parses as a protocol-relative URL → 'https://generated/...'
 * → pushState throws a cross-origin SecurityError.
 */ function tabToPath(tabId) {
    if (TAB_TO_PATH[tabId]) return TAB_TO_PATH[tabId];
    const s = String(tabId);
    // If it already looks like an absolute path or URL, don't double-prefix.
    if (s.startsWith('/') || /^https?:\/\//i.test(s) || s.startsWith('//')) {
        return s;
    }
    return `/${s}`;
}
/**
 * Get the TabId for a given URL path.
 * Examples: '/home' → 'dashboard', '/bank' → 'bank', '/exam/take' → 'take-exam'
 * Returns 'dashboard' as fallback for unknown paths.
 */ function pathToTab(path) {
    // Normalize: remove trailing slash, ensure leading slash
    const normalized = (path || '').replace(/\/+$/, '') || '/';
    // Empty input → dashboard
    if (normalized === '/' || normalized === '') {
        return 'dashboard';
    }
    // Check explicit aliases first
    if (PATH_TO_TAB[normalized]) return PATH_TO_TAB[normalized];
    // Default rule: strip leading '/' and use as tabId
    if (normalized.startsWith('/')) {
        const candidate = normalized.slice(1);
        // Validate it's a real TabId by checking if it appears in known tabs
        // We accept any string that looks like a tabId — the MedQAppShell
        // will fall back to 'dashboard' if it's invalid
        return candidate;
    }
    return 'dashboard';
}
/**
 * Check if a URL path corresponds to a valid MedQ tab.
 * Used by the catch-all rewrite to distinguish MedQ routes from
 * other routes (API, static assets, classroom, etc.)
 */ function isMedQTabPath(path) {
    const normalized = path.replace(/\/+$/, '') || '/';
    if (normalized === '/') return true; // root = home/dashboard
    if (PATH_TO_TAB[normalized]) return true;
    // Check if the path segment matches a known tab pattern
    const segment = normalized.slice(1);
    // Exclude paths that belong to other Next.js routes
    if (segment.startsWith('api/') || segment.startsWith('_next/')) return false;
    if (segment === 'classroom' || segment === 'openmaic-generation-preview' || segment === 'offline') return false;
    if (segment.startsWith('classroom/') || segment === 'openmaic-generation-preview/') return false;
    // Any other single-segment or known multi-segment path is a MedQ tab
    return true;
}
// ─── TabId validation & alias resolution ──────────────────────
//
// The LLM often emits free-text tab names like 'profile', 'messages',
// 'calendar', 'schedule', 'drug-lookup', etc. that don't exist as real
// TabIds. Without remapping, these get pushed into `setActiveTab()` and
// either silently no-op or break the URL sync. This section provides a
// single source of truth for "what the LLM calls X" → "the real TabId".
//
// The map also covers a few cases that should NOT be a tab at all but a
// dialog (profile, settings, search, upgrade) — for those we return a
// special marker so the route handler can emit `open_dialog` instead.
const TAB_ALIAS_TO_TAB = {
    // Aliases the LLM tends to emit for tabs that have different real names
    home: 'dashboard',
    main: 'dashboard',
    start: 'dashboard',
    overview: 'dashboard',
    messages: 'advanced-chat',
    chat: 'med-chat',
    inbox: 'advanced-chat',
    dm: 'advanced-chat',
    calendar: 'planner',
    schedule: 'planner',
    'study-plan': 'planner',
    'study-planner': 'planner',
    planner: 'planner',
    'flashcard': 'flashcards',
    deck: 'flashcards',
    decks: 'flashcards',
    cards: 'flashcards',
    quiz: 'speed-quiz',
    'speed-quiz': 'speed-quiz',
    'quick-quiz': 'speed-quiz',
    exam: 'exams',
    test: 'exams',
    tests: 'exams',
    'question-bank': 'bank',
    bank: 'bank',
    questions: 'bank',
    'question-generator': 'generate',
    generator: 'generate',
    create: 'create',
    'new-question': 'create',
    'drug-lookup': 'drug-interactions',
    'drug-info': 'drug-interactions',
    drugs: 'drug-interactions',
    medication: 'drug-interactions',
    medications: 'drug-interactions',
    interactions: 'drug-interactions',
    'medicine-prices': 'medicine-prices',
    calculator: 'medical-calculator',
    calculators: 'medical-calculator',
    'medical-calculator': 'medical-calculator',
    notes: 'quick-notes',
    note: 'quick-notes',
    'quick-notes': 'quick-notes',
    timer: 'study-timer',
    pomodoro: 'study-timer',
    'study-timer': 'study-timer',
    anatomy: 'anatomy',
    'anatomy-labeling': 'anatomy',
    cases: 'cases',
    'clinical-cases': 'cases',
    'case-study': 'cases',
    tutor: 'tutor',
    'ai-tutor': 'tutor',
    'tutoring': 'tutor',
    weak: 'weak-areas',
    'weak-areas': 'weak-areas',
    'weak-topics': 'weak-areas',
    'review-weak': 'weak-areas',
    stats: 'study-stats',
    'study-stats': 'study-stats',
    'my-stats': 'study-stats',
    analytics: 'study-stats',
    performance: 'study-stats',
    'insights': 'insights',
    'my-performance': 'study-stats',
    dictionary: 'medical-dictionary',
    'medical-dictionary': 'medical-dictionary',
    ecg: 'ecg-challenge',
    'ecg-challenge': 'ecg-challenge',
    'ekg': 'ecg-challenge',
    lab: 'lab-values',
    'labs': 'lab-values',
    'lab-values': 'lab-values',
    'clinical-pathways': 'clinical-pathways',
    pathway: 'clinical-pathways',
    pathways: 'clinical-pathways',
    'diff-diagnosis': 'diff-diagnosis',
    'differential': 'diff-diagnosis',
    'differentials': 'diff-diagnosis',
    'oral-exam': 'oral-exam',
    viva: 'oral-exam',
    'ai-mode': 'ai-mode',
    'image-analyzer': 'image-analyzer',
    image: 'image-analyzer',
    'medical-image': 'image-analyzer',
    files: 'files',
    'my-files': 'files',
    uploads: 'files',
    'knowledge-map': 'knowledge-map',
    'knowledge-graph': 'knowledge-map',
    'revision-scheduler': 'revision-scheduler',
    'revision': 'revision-scheduler',
    'review': 'review',
    'review-cards': 'review',
    'study': 'dashboard',
    'social': 'feed',
    community: 'feed',
    friends: 'friends',
    leaderboard: 'leaderboard',
    ranks: 'leaderboard',
    'ranking': 'leaderboard',
    groups: 'groups',
    meeting: 'meeting',
    meetings: 'meeting',
    'live-class': 'meeting',
    classroom: 'meeting',
    achievements: 'achievements',
    badges: 'achievements',
    'streak-calendar': 'streak-calendar',
    streak: 'streak-calendar',
    'study-streaks': 'study-streaks',
    streaks: 'study-streaks',
    'exam-countdown': 'exam-countdown',
    countdown: 'exam-countdown',
    'image-occlusion': 'image-occlusion',
    'decision-tree': 'decision-tree',
    'decision-making-tree': 'decision-making-tree',
    'guideline-library': 'guideline-library',
    guidelines: 'guideline-library',
    'procedure-player': 'procedure-player',
    procedures: 'procedure-player',
    'cme-tracker': 'cme-tracker',
    cme: 'cme-tracker',
    'knowledge-gap-analyzer': 'knowledge-gap-analyzer',
    'gap-analyzer': 'knowledge-gap-analyzer',
    'medication-tables': 'medication-tables',
    'micro-lessons': 'micro-lessons',
    'ai-classroom': 'ai-classroom',
    'freellm': 'freellm',
    'freellmapi': 'freellm',
    'free-llm': 'freellm',
    'llm-router': 'freellm',
    'byok-hub': 'freellm',
    'video-library': 'video-library',
    videos: 'video-library',
    'video': 'video',
    voice: 'voice',
    audio: 'voice',
    mnemonics: 'mnemonics',
    'mnemonic-maker': 'mnemonic-maker',
    'whiteboard-studio': 'whiteboard-studio',
    whiteboard: 'whiteboard-studio',
    'board-prep': 'board-prep',
    'clinical-vignettes': 'clinical-vignettes',
    vignettes: 'clinical-vignettes',
    qotd: 'qotd',
    'question-of-the-day': 'qotd',
    challenge: 'challenge',
    'daily-challenge': 'challenge',
    arena: 'arena',
    'live-battle': 'live-battle',
    battle: 'live-battle',
    'flashcard-arena': 'flashcard-arena',
    'medical-trivia': 'medical-trivia',
    trivia: 'medical-trivia',
    'med-memorize': 'med-memorize',
    'study-playlist': 'study-playlist',
    playlist: 'study-playlist',
    'peer-compare': 'peer-compare',
    compare: 'peer-compare',
    'performance-coach': 'performance-coach',
    coach: 'performance-coach',
    'med-chat': 'med-chat',
    'advanced-chat': 'advanced-chat',
    news: 'news',
    'medical-news': 'news',
    'symptom-checker': 'symptom-checker',
    symptoms: 'symptom-checker',
    'drug-zoom': 'drug-zoom',
    'openfda-drugs': 'openfda-drugs',
    'drug-zoom-labs': 'drug-zoom-labs',
    collections: 'collections',
    'my-collections': 'collections',
    folders: 'collections'
};
// Things the LLM might call "tabs" that are actually dialogs.
// We expose them as a special token so the caller can decide to emit
// `open_dialog` instead of `navigate`.
const DIALOG_TARGETS = new Set([
    'profile',
    'settings',
    'search',
    'upgrade',
    'credit-shop',
    'auth-modal',
    'auth',
    'login',
    'signin',
    'sign-in',
    'create-exam',
    'create-collection'
]);
// Free-text dialog aliases → canonical dialogId.
const DIALOG_ALIAS_TO_ID = {
    'auth': 'auth-modal',
    'login': 'auth-modal',
    'signin': 'auth-modal',
    'sign-in': 'auth-modal'
};
/**
 * Resolve a free-text navigation target (from the LLM) into either a real
 * TabId or a dialog ID. Always returns a valid target — unknown inputs
 * fall back to the dashboard tab.
 *
 * Examples:
 *   'profile'     → { kind: 'dialog', target: 'profile', remapped: false }
 *   'messages'    → { kind: 'tab', target: 'advanced-chat', remapped: true }
 *   'flashcards'  → { kind: 'tab', target: 'flashcards', remapped: false }
 *   'foobar'      → { kind: 'tab', target: 'dashboard', remapped: true }
 */ function resolveNavigationTarget(input) {
    if (!input || typeof input !== 'string') {
        return {
            kind: 'tab',
            target: 'dashboard',
            remapped: true
        };
    }
    const raw = input.trim().toLowerCase().replace(/\s+/g, '-');
    // 1. Direct dialog match (canonical dialogId, e.g. 'profile', 'settings')
    if (DIALOG_TARGETS.has(raw)) {
        // Resolve aliases like 'login' → 'auth-modal'
        const canonicalId = DIALOG_ALIAS_TO_ID[raw] || raw;
        return {
            kind: 'dialog',
            target: canonicalId,
            remapped: canonicalId !== raw
        };
    }
    // 2. Alias map (covers LLM-common synonyms)
    if (TAB_ALIAS_TO_TAB[raw]) {
        return {
            kind: 'tab',
            target: TAB_ALIAS_TO_TAB[raw],
            remapped: raw !== TAB_ALIAS_TO_TAB[raw]
        };
    }
    // 3. Already a valid TabId (verify against the known type list at runtime
    //    by checking the alias map's values + the canonical TabId list)
    const allTabs = new Set([
        // Mirror the TabId union from medq-tabid.ts to avoid an import cycle
        'dashboard',
        'generate',
        'files',
        'bank',
        'flashcards',
        'review',
        'lab-values',
        'collections',
        'challenge',
        'arena',
        'live-battle',
        'leaderboard',
        'insights',
        'weak-areas',
        'planner',
        'knowledge-map',
        'create',
        'exams',
        'take-exam',
        'tutor',
        'cases',
        'board-prep',
        'video',
        'image-analyzer',
        'voice',
        'mnemonics',
        'news',
        'anatomy',
        'friends',
        'chat',
        'erc',
        'feed',
        'groups',
        'achievements',
        'pricing',
        'revenue',
        'admin',
        'drug-interactions',
        'medicine-prices',
        'openfda-drugs',
        'drug-zoom',
        'drug-zoom-labs',
        'exam-countdown',
        'medical-calculator',
        'symptom-checker',
        'study-stats',
        'clinical-vignettes',
        'qotd',
        'speed-quiz',
        'streak-calendar',
        'quick-notes',
        'study-timer',
        'mnemonic-maker',
        'medical-dictionary',
        'peer-compare',
        'revision-scheduler',
        'flashcard-arena',
        'study-playlist',
        'medical-trivia',
        'performance-coach',
        'ecg-challenge',
        'clinical-pathways',
        'diff-diagnosis',
        'study-streaks',
        'med-memorize',
        'med-chat',
        'meeting',
        'oral-exam',
        'advanced-chat',
        'whiteboard-studio',
        'video-library',
        'image-occlusion',
        'decision-tree',
        'guideline-library',
        'procedure-player',
        'cme-tracker',
        'knowledge-gap-analyzer',
        'decision-making-tree',
        'medication-tables',
        'ai-mode',
        'micro-lessons',
        'ai-classroom',
        'freellm'
    ]);
    if (allTabs.has(raw)) {
        return {
            kind: 'tab',
            target: raw,
            remapped: false
        };
    }
    // 4. Try a few fuzzy normalizations: drop "my-" prefix, "tab-" prefix,
    //    trailing "-page", "-tab", "-view"
    const stripped = raw.replace(/^my-/, '').replace(/^tab-/, '').replace(/-page$/, '').replace(/-tab$/, '').replace(/-view$/, '');
    if (TAB_ALIAS_TO_TAB[stripped]) {
        return {
            kind: 'tab',
            target: TAB_ALIAS_TO_TAB[stripped],
            remapped: true
        };
    }
    if (allTabs.has(stripped)) {
        return {
            kind: 'tab',
            target: stripped,
            remapped: true
        };
    }
    if (DIALOG_TARGETS.has(stripped)) {
        return {
            kind: 'dialog',
            target: stripped,
            remapped: true
        };
    }
    // 5. Unknown — fall back to dashboard rather than letting a bogus value
    //    leak into setActiveTab() and break the URL sync.
    return {
        kind: 'unknown',
        target: 'dashboard',
        remapped: true
    };
}


/***/ }),

/***/ 85542:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ci: () => (/* binding */ saveBottomNav),
/* harmony export */   Fz: () => (/* binding */ loadBottomNav),
/* harmony export */   aZ: () => (/* binding */ sanitizeBottomNav),
/* harmony export */   kE: () => (/* binding */ getActiveBottomNavId),
/* harmony export */   lA: () => (/* binding */ buildBottomNavDefinitions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92747);


function getIconComponent(item) {
    const icon = item.icon;
    return function DynamicIcon(props) {
        return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(icon, props);
    };
}
function buildBottomNavDefinitions() {
    const definitions = [];
    const seen = new Set();
    for (const section of _config__WEBPACK_IMPORTED_MODULE_1__/* .SIDEBAR_NAV */ .nx){
        for (const item of section.items){
            if (seen.has(item.id)) {
                continue;
            }
            if (_config__WEBPACK_IMPORTED_MODULE_1__/* .EXCLUDED_BOTTOM_NAV_ITEMS */ .AW.has(item.id)) {
                continue;
            }
            if (item.adminOnly) {
                continue;
            }
            seen.add(item.id);
            definitions.push({
                id: item.id,
                label: item.label,
                icon: getIconComponent(item),
                color: item.color,
                subTabs: _config__WEBPACK_IMPORTED_MODULE_1__/* .BOTTOM_NAV_SUBTABS */ .hK[item.id] ?? [
                    item.id
                ]
            });
        }
    }
    return definitions;
}
function sanitizeBottomNav(value, availableItems) {
    if (!Array.isArray(value)) {
        return [
            ..._config__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_BOTTOM_NAV */ .aF
        ];
    }
    const validIds = new Set(availableItems.map((item)=>item.id));
    const result = [];
    for (const id of value){
        if (typeof id !== 'string' || !validIds.has(id)) {
            continue;
        }
        if (result.includes(id)) {
            continue;
        }
        result.push(id);
        if (result.length >= _config__WEBPACK_IMPORTED_MODULE_1__/* .MAX_BOTTOM_NAV_ITEMS */ .QT) {
            break;
        }
    }
    for (const id of _config__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_BOTTOM_NAV */ .aF){
        if (result.length >= _config__WEBPACK_IMPORTED_MODULE_1__/* .MAX_BOTTOM_NAV_ITEMS */ .QT) {
            break;
        }
        if (!result.includes(id)) {
            result.push(id);
        }
    }
    return result;
}
function getActiveBottomNavId(activeTab, items) {
    for (const item of items){
        if (item.subTabs?.includes(activeTab)) {
            return item.id;
        }
    }
    return 'dashboard';
}
function loadBottomNav(availableItems) {
    try {
        const saved = window.localStorage.getItem(_config__WEBPACK_IMPORTED_MODULE_1__/* .BOTTOM_NAV_STORAGE_KEY */ .Q_);
        if (!saved) {
            return [
                ..._config__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_BOTTOM_NAV */ .aF
            ];
        }
        return sanitizeBottomNav(JSON.parse(saved), availableItems);
    } catch  {
        return [
            ..._config__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_BOTTOM_NAV */ .aF
        ];
    }
}
function saveBottomNav(items) {
    try {
        window.localStorage.setItem(_config__WEBPACK_IMPORTED_MODULE_1__/* .BOTTOM_NAV_STORAGE_KEY */ .Q_, JSON.stringify(items));
    } catch  {
    // localStorage may be unavailable.
    }
}


/***/ }),

/***/ 92747:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AW: () => (/* binding */ EXCLUDED_BOTTOM_NAV_ITEMS),
/* harmony export */   QT: () => (/* binding */ MAX_BOTTOM_NAV_ITEMS),
/* harmony export */   Q_: () => (/* binding */ BOTTOM_NAV_STORAGE_KEY),
/* harmony export */   aF: () => (/* binding */ DEFAULT_BOTTOM_NAV),
/* harmony export */   hK: () => (/* binding */ BOTTOM_NAV_SUBTABS),
/* harmony export */   nx: () => (/* binding */ SIDEBAR_NAV)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45425);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24551);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40557);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6923);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5045);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27898);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(45216);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84824);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(95660);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(58081);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(81499);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(41442);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(15688);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(15298);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(70924);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(13626);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(39979);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(12980);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(36083);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(48869);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(12643);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(15532);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(57465);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(35302);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(34000);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(17494);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(86154);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(52427);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(83599);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(12572);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(50248);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(23876);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(50626);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(19707);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(19057);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(51452);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(28342);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(61491);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(64694);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(8143);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(6059);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(74222);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(17356);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(93954);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(36338);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(15480);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(55420);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(46185);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(73246);
/* harmony import */ var _barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(25494);


const SIDEBAR_NAV = [
    {
        section: '',
        items: [
            {
                id: 'dashboard',
                label: 'Home',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#00e5a0'
            },
            {
                id: 'advanced-chat',
                label: 'Messages',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#8b5cf6',
                badge: 'New'
            }
        ]
    },
    {
        section: 'Study',
        items: [
            {
                id: 'bank',
                label: 'Question Bank',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'take-exam',
                label: 'Exam Simulator',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#4fc3f7',
                badge: 'New'
            },
            {
                id: 'flashcards',
                label: 'Flashcards',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'osce',
                label: 'OSCE Trainer',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#10b981',
                badge: 'New'
            },
            {
                id: 'review',
                label: 'Review Hub',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b'
            },
            {
                id: 'lab-values',
                label: 'Lab Values',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#06b6d4'
            },
            {
                id: 'exams',
                label: 'Exams',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'collections',
                label: 'Collections',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'create',
                label: 'Create',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            }
        ]
    },
    {
        section: 'AI Tools',
        items: [
            {
                id: 'freellm',
                label: 'AI Router · BYOK',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#00e5a0',
                badge: 'New'
            },
            {
                id: 'generate',
                label: 'Generate Questions',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'tutor',
                label: 'AI Tutor',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'cases',
                label: 'Case Simulator',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'mnemonics',
                label: 'AI Mnemonics',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'image-analyzer',
                label: 'Image Analyzer',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'voice',
                label: 'Voice Study',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'files',
                label: 'From Files',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'video',
                label: 'Video Lessons',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'board-prep',
                label: 'Board Prep',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'anatomy',
                label: 'Anatomy 3D',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'clinical-vignettes',
                label: 'Clinical Vignettes',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true,
                color: '#ff5757',
                badge: 'New'
            },
            {
                id: 'whiteboard-studio',
                label: 'Whiteboard Studio',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true,
                color: '#4fc3f7',
                badge: 'New'
            },
            {
                id: 'video-library',
                label: 'Video Library',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true,
                color: '#8b5cf6',
                badge: 'New'
            }
        ]
    },
    {
        section: 'Compete',
        items: [
            {
                id: 'qotd',
                label: 'Question of the Day',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b',
                badge: 'New'
            },
            {
                id: 'challenge',
                label: 'Daily Challenge',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'speed-quiz',
                label: 'Speed Quiz',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#00e5a0',
                badge: 'New'
            },
            {
                id: 'arena',
                label: 'Challenge Arena',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'live-battle',
                label: 'Live Battle',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                badge: 'LIVE',
                color: '#ff5757'
            },
            {
                id: 'leaderboard',
                label: 'Leaderboard',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b'
            }
        ]
    },
    {
        section: 'Community',
        items: [
            {
                id: 'friends',
                label: 'Friends',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'groups',
                label: 'Groups',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                badge: 'New',
                color: '#8b5cf6'
            },
            {
                id: 'meeting',
                label: 'Live Meeting',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                badge: 'LIVE',
                color: '#ff5757'
            }
        ]
    },
    {
        section: 'Progress',
        items: [
            {
                id: 'insights',
                label: 'Insights',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'weak-areas',
                label: 'Weak Areas',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ff5757'
            },
            {
                id: 'achievements',
                label: 'Achievements',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b'
            },
            {
                id: 'planner',
                label: 'Study Planner',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                premium: true
            },
            {
                id: 'knowledge-map',
                label: 'Knowledge Map',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'streak-calendar',
                label: 'Streak Calendar',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ff6b35',
                badge: 'New'
            },
            {
                id: 'news',
                label: 'Medical News',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                })
            },
            {
                id: 'study-streaks',
                label: 'Study Streaks',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ff6b35',
                badge: 'New'
            }
        ]
    },
    {
        section: 'Tools',
        items: [
            {
                id: 'drug-interactions',
                label: 'Drug Interactions',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ff5757',
                badge: 'New'
            },
            {
                id: 'medication-tables',
                label: 'Medication Tables',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#22d3ee',
                badge: 'New'
            },
            {
                id: 'ai-mode',
                label: 'AI Study Mode',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#8b5cf6',
                badge: 'AI'
            },
            {
                id: 'micro-lessons',
                label: 'Micro-Lessons',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ec4899',
                badge: 'New'
            },
            {
                id: 'ai-classroom',
                label: 'OpenMAIC Classroom',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#8b5cf6',
                badge: 'New'
            },
            {
                id: 'medicine-prices',
                label: 'Medicine Prices',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#00e5a0',
                badge: 'New'
            },
            {
                id: 'openfda-drugs',
                label: 'Drug Reference',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#4fc3f7',
                badge: 'New'
            },
            {
                id: 'drug-zoom',
                label: 'Drug Zoom',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#a456dd',
                badge: 'New'
            },
            {
                id: 'drug-zoom-labs',
                label: 'Lab Search',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ec4899',
                badge: 'New'
            },
            {
                id: 'image-occlusion',
                label: 'Image Occlusion',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ec4899',
                badge: 'New'
            },
            {
                id: 'medical-calculator',
                label: 'Medical Calculators',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#4fc3f7'
            },
            {
                id: 'symptom-checker',
                label: 'Symptom Checker',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#8b5cf6'
            },
            {
                id: 'exam-countdown',
                label: 'Exam Countdown',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b'
            },
            {
                id: 'study-stats',
                label: 'Study Statistics',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#00e5a0'
            },
            {
                id: 'study-timer',
                label: 'Study Timer',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#10b981',
                badge: 'New'
            },
            {
                id: 'quick-notes',
                label: 'Quick Notes',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#4fc3f7',
                badge: 'New'
            },
            {
                id: 'mnemonic-maker',
                label: 'Mnemonic Maker',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b',
                badge: 'New'
            },
            {
                id: 'medical-dictionary',
                label: 'Medical Dictionary',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#06b6d4',
                badge: 'New'
            },
            {
                id: 'revision-scheduler',
                label: 'Revision Scheduler',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ff6b35',
                badge: 'New'
            },
            {
                id: 'peer-compare',
                label: 'Peer Compare',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#8b5cf6',
                badge: 'New'
            },
            {
                id: 'flashcard-arena',
                label: 'Flashcard Arena',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ff5757',
                badge: 'New'
            },
            {
                id: 'study-playlist',
                label: 'Study Playlist',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_46__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#4fc3f7',
                badge: 'New'
            },
            {
                id: 'medical-trivia',
                label: 'Medical Trivia',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b',
                badge: 'New'
            },
            {
                id: 'performance-coach',
                label: 'Performance Coach',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_48__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#10b981',
                badge: 'New'
            },
            {
                id: 'ecg-challenge',
                label: 'ECG Challenge',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_49__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ff5757',
                badge: 'New'
            },
            {
                id: 'clinical-pathways',
                label: 'Clinical Pathways',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#06b6d4',
                badge: 'New'
            },
            {
                id: 'diff-diagnosis',
                label: 'Diff Diagnosis',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#8b5cf6',
                badge: 'New'
            },
            {
                id: 'decision-tree',
                label: 'Decision Tree',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#22d3ee',
                badge: 'New'
            },
            {
                id: 'decision-making-tree',
                label: 'Clinical Reasoning',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#8b5cf6',
                badge: 'New'
            },
            {
                id: 'guideline-library',
                label: 'Guideline Library',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b',
                badge: 'New'
            },
            {
                id: 'procedure-player',
                label: 'Procedure Player',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ec4899',
                badge: 'New'
            },
            {
                id: 'cme-tracker',
                label: 'CME Tracker',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#00e5a0',
                badge: 'New'
            },
            {
                id: 'knowledge-gap-analyzer',
                label: 'Gap Analyzer',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#22d3ee',
                badge: 'New'
            },
            {
                id: 'med-memorize',
                label: 'Med Memorize',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_53__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b',
                badge: 'New'
            },
            {
                id: 'med-chat',
                label: 'Med Chat AI',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_54__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#00e5a0',
                badge: 'New'
            },
            {
                id: 'oral-exam',
                label: 'Oral Exam',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#ff5757',
                badge: 'New'
            }
        ]
    },
    {
        section: 'Rewards',
        items: [
            {
                id: 'erc',
                label: 'Earn Rewards',
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Award_BarChart2_Bell_BookOpen_BookOpenCheck_Brain_Calculator_CalendarDays_Clapperboard_Clock_Eye_FileText_Film_Flame_FlaskConical_FolderOpen_Gamepad2_GitBranch_GitCompare_Globe_GraduationCap_HelpCircle_Home_KeyRound_Layers_Lightbulb_ListChecks_MessageCircle_MessageSquare_Mic_Music_Network_Newspaper_PenLine_Pill_Radar_Radio_ScanEye_Scissors_ShuffleIcon_Sparkles_Stethoscope_Swords_Table2_Target_Timer_TrendingUp_Trophy_Users_UsersRound_Video_Wand2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                    className: "w-4.5 h-4.5"
                }),
                color: '#f59e0b'
            }
        ]
    }
];
/**
 * Default mobile navigation.
 */ const DEFAULT_BOTTOM_NAV = [
    'dashboard',
    'bank',
    'advanced-chat',
    'arena',
    'groups'
];
const MAX_BOTTOM_NAV_ITEMS = 5;
const BOTTOM_NAV_STORAGE_KEY = 'medq-mobile-bottom-nav';
const EXCLUDED_BOTTOM_NAV_ITEMS = new Set([
    'meeting'
]);
/**
 * Related pages that should keep the same
 * bottom-navigation item highlighted.
 */ const BOTTOM_NAV_SUBTABS = {
    dashboard: [
        'dashboard',
        'erc',
        'insights',
        'weak-areas',
        'achievements',
        'planner',
        'knowledge-map',
        'news',
        'study-stats',
        'exam-countdown',
        'qotd',
        'streak-calendar',
        'quick-notes',
        'study-timer',
        'peer-compare',
        'performance-coach',
        'study-streaks'
    ],
    bank: [
        'bank',
        'flashcards',
        'review',
        'lab-values',
        'collections',
        'exams',
        'create',
        'generate',
        'files',
        'tutor',
        'mnemonics',
        'cases',
        'image-analyzer',
        'voice',
        'anatomy',
        'video',
        'board-prep',
        'take-exam',
        'drug-interactions',
        'medicine-prices',
        'openfda-drugs',
        'drug-zoom',
        'drug-zoom-labs',
        'medical-calculator',
        'symptom-checker',
        'clinical-vignettes',
        'speed-quiz',
        'mnemonic-maker',
        'medical-dictionary',
        'revision-scheduler',
        'flashcard-arena',
        'study-playlist',
        'medical-trivia',
        'ecg-challenge',
        'clinical-pathways',
        'diff-diagnosis',
        'med-memorize',
        'med-chat',
        'oral-exam',
        'whiteboard-studio',
        'video-library',
        'image-occlusion',
        'decision-tree',
        'decision-making-tree',
        'guideline-library',
        'procedure-player',
        'cme-tracker',
        'knowledge-gap-analyzer',
        'medication-tables',
        'ai-mode',
        'micro-lessons',
        'ai-classroom'
    ],
    'advanced-chat': [
        'advanced-chat',
        'friends'
    ],
    arena: [
        'qotd',
        'challenge',
        'speed-quiz',
        'arena',
        'live-battle',
        'leaderboard'
    ],
    groups: [
        'groups',
        'meeting'
    ]
};


/***/ })

}]);