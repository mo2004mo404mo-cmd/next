"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[59644],{

/***/ 3683:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ TooltipProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(61566);
/* harmony import */ var _TooltipProviderContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69690);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ TooltipProvider auto */ 


/**
 * Provides a shared delay for multiple tooltips. The grouping logic ensures that
 * once a tooltip becomes visible, the adjacent tooltips will be shown instantly.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */ 
const TooltipProvider = function TooltipProvider(props) {
    const { delay, closeDelay, timeout = 400 } = props;
    const delayValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            open: delay,
            close: closeDelay
        }), [
        delay,
        closeDelay
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_TooltipProviderContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .TooltipProviderContext */ .K.Provider, {
        value: delay,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .FloatingDelayGroup */ .T, {
            delay: delayValue,
            timeoutMs: timeout,
            children: props.children
        })
    });
};
if (false) {}


/***/ }),

/***/ 4390:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ TooltipRootContext),
/* harmony export */   g: () => (/* binding */ useTooltipRootContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ TooltipRootContext,useTooltipRootContext auto */ 

const TooltipRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useTooltipRootContext(optional) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(TooltipRootContext);
    if (context === undefined && !optional) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(72));
    }
    return context;
}


/***/ }),

/***/ 15383:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ TooltipPortal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4390);
/* harmony import */ var _TooltipPortalContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(96206);
/* harmony import */ var _utils_FloatingPortalLite_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62953);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ TooltipPortal auto */ 




/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */ const TooltipPortal = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function TooltipPortal(props, forwardedRef) {
    const { keepMounted = false, ...portalProps } = props;
    const store = (0,_root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useTooltipRootContext */ .g)();
    const mounted = store.useState('mounted');
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_TooltipPortalContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .TooltipPortalContext */ .$.Provider, {
        value: keepMounted,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_FloatingPortalLite_mjs__WEBPACK_IMPORTED_MODULE_4__/* .FloatingPortalLite */ .F, {
            ref: forwardedRef,
            ...portalProps
        })
    });
});
if (false) {}


/***/ }),

/***/ 21608:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ useClientPoint)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14718);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23068);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6791);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(93093);
/* harmony import */ var _utils_event_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17947);
/* __next_internal_client_entry_do_not_use__ useClientPoint auto */ 





function createVirtualElement(domElement, data) {
    let offsetX = null;
    let offsetY = null;
    let isAutoUpdateEvent = false;
    return {
        contextElement: domElement || undefined,
        getBoundingClientRect () {
            const domRect = domElement?.getBoundingClientRect() || {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            };
            const isXAxis = data.axis === 'x' || data.axis === 'both';
            const isYAxis = data.axis === 'y' || data.axis === 'both';
            const canTrackCursorOnAutoUpdate = [
                'mouseenter',
                'mousemove'
            ].includes(data.dataRef.current.openEvent?.type || '') && data.pointerType !== 'touch';
            const width = data.axis === 'y' ? domRect.width : 0;
            const height = data.axis === 'x' ? domRect.height : 0;
            let x = domRect.x;
            let y = domRect.y;
            if (offsetX == null && data.x && isXAxis) {
                offsetX = domRect.x - data.x;
            }
            if (offsetY == null && data.y && isYAxis) {
                offsetY = domRect.y - data.y;
            }
            x -= offsetX || 0;
            y -= offsetY || 0;
            if (!isAutoUpdateEvent || canTrackCursorOnAutoUpdate) {
                x = isXAxis && data.x != null ? data.x : x;
                y = isYAxis && data.y != null ? data.y : y;
            }
            isAutoUpdateEvent = true;
            return {
                width,
                height,
                x,
                y,
                top: y,
                right: x + width,
                bottom: y + height,
                left: x
            };
        }
    };
}
function isMouseBasedEvent(event) {
    return event != null && event.clientX != null;
}
/**
 * Positions the floating element relative to a client point (in the viewport),
 * such as the mouse position. By default, it follows the mouse cursor.
 * @see https://floating-ui.com/docs/useClientPoint
 */ function useClientPoint(store, props = {}) {
    const { enabled = true, axis = 'both' } = props;
    const open = store.useState('open');
    const floating = store.useState('floatingElement');
    const domReference = store.useState('domReferenceElement');
    const dataRef = store.context.dataRef;
    const initialRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const cleanupListenerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const [pointerType, setPointerType] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    const [reactive, setReactive] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);
    const resetReference = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)((reference)=>{
        store.set('positionReference', reference);
    });
    const setReference = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)((newX, newY, referenceElement)=>{
        if (initialRef.current) {
            return;
        }
        // Prevent setting if the open event was not a mouse-like one
        // (e.g. focus to open, then hover over the reference element).
        // Only apply if the event exists.
        if (dataRef.current.openEvent && !isMouseBasedEvent(dataRef.current.openEvent)) {
            return;
        }
        store.set('positionReference', createVirtualElement(referenceElement ?? domReference, {
            x: newX,
            y: newY,
            axis,
            dataRef,
            pointerType
        }));
    });
    const handleReferenceEnterOrMove = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)((event)=>{
        if (!open) {
            setReference(event.clientX, event.clientY, event.currentTarget);
        } else if (!cleanupListenerRef.current) {
            // If there's no cleanup, there's no listener, but we want to ensure
            // we add the listener if the cursor landed on the floating element and
            // then back on the reference (i.e. it's interactive).
            setReference(event.clientX, event.clientY, event.currentTarget);
            setReactive([]);
        }
    });
    // If the pointer is a mouse-like pointer, we want to continue following the
    // mouse even if the floating element is transitioning out. On touch
    // devices, this is undesirable because the floating element will move to
    // the dismissal touch point.
    const openCheck = (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isMouseLikePointerType */ .Go)(pointerType) ? floating : open;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!enabled) {
            resetReference(domReference);
            return undefined;
        }
        if (!openCheck) {
            return undefined;
        }
        function cleanupListener() {
            cleanupListenerRef.current?.();
            cleanupListenerRef.current = null;
        }
        const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_3__/* .getWindow */ .zk)(floating);
        function handleMouseMove(event) {
            const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getTarget */ .EW)(event);
            if (!(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_4__/* .contains */ .gR)(floating, target)) {
                setReference(event.clientX, event.clientY);
            } else {
                cleanupListener();
            }
        }
        if (!dataRef.current.openEvent || isMouseBasedEvent(dataRef.current.openEvent)) {
            cleanupListenerRef.current = (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_5__/* .addEventListener */ .q)(win, 'mousemove', handleMouseMove);
        } else {
            resetReference(domReference);
        }
        return cleanupListener;
    }, [
        openCheck,
        enabled,
        floating,
        dataRef,
        domReference,
        store,
        setReference,
        resetReference,
        reactive
    ]);
    // Clear virtual cursor references when the hook unmounts. Enabled flips are handled above.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>()=>{
            store.set('positionReference', null);
        }, [
        store
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (enabled && !floating) {
            initialRef.current = false;
        }
    }, [
        enabled,
        floating
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!enabled && open) {
            initialRef.current = true;
        }
    }, [
        enabled,
        open
    ]);
    const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        function setPointerTypeRef(event) {
            setPointerType(event.pointerType);
        }
        return {
            onPointerDown: setPointerTypeRef,
            onPointerEnter: setPointerTypeRef,
            onMouseMove: handleReferenceEnterOrMove,
            onMouseEnter: handleReferenceEnterOrMove
        };
    }, [
        handleReferenceEnterOrMove
    ]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>enabled ? {
            reference,
            trigger: reference
        } : {}, [
        enabled,
        reference
    ]);
}


/***/ }),

/***/ 22200:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Server)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "server",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "20",
                height: "8",
                x: "2",
                y: "2",
                rx: "2",
                ry: "2",
                key: "ngkwjq"
            }
        ],
        [
            "rect",
            {
                width: "20",
                height: "8",
                x: "2",
                y: "14",
                rx: "2",
                ry: "2",
                key: "iecqi9"
            }
        ],
        [
            "line",
            {
                x1: "6",
                x2: "6.01",
                y1: "6",
                y2: "6",
                key: "16zg32"
            }
        ],
        [
            "line",
            {
                x1: "6",
                x2: "6.01",
                y1: "18",
                y2: "18",
                key: "nzw8ys"
            }
        ]
    ]
};
__iconData.node;
const Server = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=server.mjs.map


/***/ }),

/***/ 33535:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ TooltipTrigger)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27243);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(64951);
/* harmony import */ var _base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2474);
/* harmony import */ var _root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4390);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(84052);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(88401);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(95327);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(26713);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(62955);
/* harmony import */ var _provider_TooltipProviderContext_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(69690);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(61566);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(66610);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7118);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(77805);
/* harmony import */ var _floating_ui_react_utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93093);
/* harmony import */ var _floating_ui_react_utils_event_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(17947);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(76175);
/* harmony import */ var _floating_ui_react_hooks_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(41657);
/* harmony import */ var _floating_ui_react_hooks_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(96836);
/* harmony import */ var _TooltipTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(39196);
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(36778);
/* __next_internal_client_entry_do_not_use__ TooltipTrigger auto */ 




















const TOOLTIP_TRIGGER_IDENTIFIER = 'data-base-ui-tooltip-trigger';
function getTargetElement(event) {
    const target = (0,_floating_ui_react_utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getTarget */ .EW)(event);
    return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__/* .isElement */ .vq)(target) ? target : null;
}
/**
 * An element to attach the tooltip to.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */ const TooltipTrigger = (0,_base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_3__/* .fastComponentRef */ .nk)(function TooltipTrigger(componentProps, forwardedRef) {
    const { render, className, style, handle, payload, disabled: disabledProp, delay, closeOnClick = true, closeDelay, id: idProp, ...elementProps } = componentProps;
    const rootContext = (0,_root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useTooltipRootContext */ .g)(true);
    const handleStore = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_5__/* .usePopupHandleStore */ .f)(handle);
    const store = handleStore ?? rootContext;
    if (!store) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(82));
    }
    const thisTriggerId = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useBaseUiId */ .e)(idProp);
    const isTriggerActive = store.useState('isTriggerActive', thisTriggerId);
    const isOpenedByThisTrigger = store.useState('isOpenedByTrigger', thisTriggerId);
    const floatingRootContext = store.useState('floatingRootContext');
    const triggerElementRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const closeDelayWithDefault = closeDelay ?? 0;
    const { registerTrigger, isMountedByThisTrigger } = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useTriggerDataForwarding */ .L_)(thisTriggerId, triggerElementRef, store, {
        payload,
        closeOnClick,
        closeDelay: closeDelayWithDefault
    });
    const providerDelay = (0,_provider_TooltipProviderContext_mjs__WEBPACK_IMPORTED_MODULE_9__/* .useTooltipProviderContext */ .n)();
    const { activeIdRef, delayRef, isInstantPhase, hasProvider } = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useDelayGroup */ .c)(floatingRootContext, {
        open: isOpenedByThisTrigger
    });
    const hoverInteraction = (0,_floating_ui_react_hooks_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_11__/* .useHoverInteractionSharedState */ .uu)(floatingRootContext);
    store.useSyncedValue('isInstantPhase', isInstantPhase);
    const rootDisabled = store.useState('disabled');
    const disabled = disabledProp ?? rootDisabled;
    const disabledRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_12__/* .useValueAsRef */ .u)(disabled);
    const trackCursorAxis = store.useState('trackCursorAxis');
    const disableHoverablePopup = store.useState('disableHoverablePopup');
    const isNestedTriggerHoveredRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const nestedTriggerOpenTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_13__/* .useTimeout */ .Z)();
    // Local copy so it can be cleared on mouseLeave without resetting the hover hook's own pointerType.
    const pointerTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    function getOpenDelay() {
        // Adjacent tooltips open instantly while the group is active.
        if (hasProvider && activeIdRef.current != null) {
            return 0;
        }
        return delay ?? providerDelay ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_14__/* .OPEN_DELAY */ .r;
    }
    function isEnabledNestedTriggerTarget(target) {
        const triggerEl = triggerElementRef.current;
        if (!triggerEl || !target) {
            return false;
        }
        const nearestTrigger = (0,_floating_ui_react_utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .closest */ .kp)(target, `[${TOOLTIP_TRIGGER_IDENTIFIER}]`);
        return nearestTrigger !== null && nearestTrigger !== triggerEl && (0,_floating_ui_react_utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .contains */ .gR)(triggerEl, nearestTrigger);
    }
    function detectNestedTriggerHover(target) {
        const nestedTriggerHovered = isEnabledNestedTriggerTarget(target);
        isNestedTriggerHoveredRef.current = nestedTriggerHovered;
        if (nestedTriggerHovered) {
            hoverInteraction.openChangeTimeout.clear();
            hoverInteraction.restTimeout.clear();
            hoverInteraction.restTimeoutPending = false;
            nestedTriggerOpenTimeout.clear();
        }
        return nestedTriggerHovered;
    }
    const hoverProps = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_15__/* .useHoverReferenceInteraction */ .j)(floatingRootContext, {
        enabled: !disabled,
        mouseOnly: true,
        move: false,
        handleClose: !disableHoverablePopup && trackCursorAxis !== 'both' ? (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_16__/* .safePolygon */ .i)() : null,
        restMs: getOpenDelay,
        delay () {
            if (closeDelay == null && hasProvider) {
                return {
                    close: (0,_floating_ui_react_hooks_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_17__/* .getDelay */ .uf)(delayRef.current, 'close')
                };
            }
            return {
                close: closeDelayWithDefault
            };
        },
        triggerElementRef,
        isActiveTrigger: isTriggerActive,
        isClosing: ()=>store.select('transitionStatus') === 'ending',
        shouldOpen () {
            return !isNestedTriggerHoveredRef.current;
        }
    });
    const focusProps = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_18__/* .useFocus */ .i)(floatingRootContext, {
        enabled: !disabled
    }).reference;
    const handleNestedTriggerHover = (event)=>{
        const wasNestedTriggerHovered = isNestedTriggerHoveredRef.current;
        const target = getTargetElement(event);
        const nestedTriggerHovered = detectNestedTriggerHover(target);
        const triggerEl = triggerElementRef.current;
        const targetInsideTrigger = triggerEl && target && (0,_floating_ui_react_utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .contains */ .gR)(triggerEl, target);
        // Only close hover-opened parents. Focus/click-like opens remain owned by
        // their original interaction and should not be clobbered by nested hover.
        if (nestedTriggerHovered && store.select('open') && store.select('lastOpenChangeReason') === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_19__/* .triggerHover */ .N7) {
            store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_20__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_19__/* .triggerHover */ .N7, event));
            return;
        }
        if (wasNestedTriggerHovered && !nestedTriggerHovered && targetInsideTrigger && !disabledRef.current && !store.select('open') && triggerEl && // Match the hover hook's non-strict mouse fallback for mouse-only event sequences.
        (0,_floating_ui_react_utils_event_mjs__WEBPACK_IMPORTED_MODULE_21__/* .isMouseLikePointerType */ .Go)(pointerTypeRef.current)) {
            const open = ()=>{
                if (!isNestedTriggerHoveredRef.current && !disabledRef.current && !store.select('open')) {
                    store.setOpen(true, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_20__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_19__/* .triggerHover */ .N7, event, triggerEl));
                }
            };
            const openDelay = getOpenDelay();
            // With `move: false`, the hover hook only listens to mouseenter/mouseleave
            // on the parent trigger. Leaving a nested child for the parent area fires
            // no event the hook can react to, so reopen locally.
            if (openDelay === 0) {
                nestedTriggerOpenTimeout.clear();
                open();
            } else {
                nestedTriggerOpenTimeout.start(openDelay, open);
            }
        }
    };
    const rootTriggerProps = store.useState('appliedTriggerProps', isMountedByThisTrigger || trackCursorAxis !== 'none');
    const state = {
        open: isOpenedByThisTrigger
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_22__/* .useRenderElement */ .o)('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            registerTrigger,
            triggerElementRef
        ],
        props: [
            hoverProps,
            focusProps,
            rootTriggerProps,
            {
                onMouseOver (event) {
                    handleNestedTriggerHover(event.nativeEvent);
                },
                onFocus (event) {
                    if (isEnabledNestedTriggerTarget(getTargetElement(event.nativeEvent))) {
                        event.preventBaseUIHandler();
                    }
                },
                onMouseLeave () {
                    isNestedTriggerHoveredRef.current = false;
                    nestedTriggerOpenTimeout.clear();
                    pointerTypeRef.current = undefined;
                },
                onPointerEnter (event) {
                    pointerTypeRef.current = event.pointerType;
                },
                onPointerDown (event) {
                    pointerTypeRef.current = event.pointerType;
                    store.set('closeOnClick', closeOnClick);
                    if (closeOnClick && !store.select('open')) {
                        store.cancelPendingOpen(event.nativeEvent);
                    }
                },
                onClick (event) {
                    if (closeOnClick && !store.select('open')) {
                        store.cancelPendingOpen(event.nativeEvent);
                    }
                },
                id: thisTriggerId,
                [_TooltipTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_23__/* .triggerDisabled */ .d]: disabled ? '' : undefined,
                [TOOLTIP_TRIGGER_IDENTIFIER]: disabled ? undefined : ''
            },
            elementProps
        ],
        stateAttributesMapping: _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_24__/* .triggerOpenStateMapping */ .qV
    });
    return element;
});
if (false) {}


/***/ }),

/***/ 36778:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ OPEN_DELAY)
/* harmony export */ });
const OPEN_DELAY = 600;

/***/ }),

/***/ 38158:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowUp)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "arrow-up",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m5 12 7-7 7 7",
                key: "hav0vg"
            }
        ],
        [
            "path",
            {
                d: "M12 19V5",
                key: "x0mq9r"
            }
        ]
    ]
};
__iconData.node;
const ArrowUp = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-up.mjs.map


/***/ }),

/***/ 39857:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ SwitchRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(50602);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55218);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(46468);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(8994);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(88401);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(62955);
/* harmony import */ var _internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(42176);
/* harmony import */ var _SwitchRootContext_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(85848);
/* harmony import */ var _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(40250);
/* harmony import */ var _utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(44137);
/* harmony import */ var _internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12991);
/* harmony import */ var _internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4402);
/* harmony import */ var _internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1272);
/* harmony import */ var _internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10232);
/* harmony import */ var _internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57960);
/* harmony import */ var _internals_labelable_provider_useAriaLabelledBy_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(48243);
/* harmony import */ var _internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3017);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(76175);
/* harmony import */ var _internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(42240);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ SwitchRoot auto */ 





















/**
 * Represents the switch itself.
 * Renders a `<span>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */ 
const SwitchRoot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SwitchRoot(componentProps, forwardedRef) {
    const { checked: checkedProp, className, defaultChecked, 'aria-labelledby': ariaLabelledByProp, form, id: idProp, inputRef: externalInputRef, name: nameProp, nativeButton = false, onCheckedChange, readOnly = false, required = false, disabled: disabledProp = false, render, uncheckedValue, value, style, ...elementProps } = componentProps;
    const { clearErrors } = (0,_internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useFormContext */ .x)();
    const { state: fieldState, setTouched, setDirty, validityData, setFilled, validationMode, disabled: fieldDisabled, name: fieldName, validation } = (0,_internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useFieldRootContext */ .V$)();
    const { labelId } = (0,_internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useLabelableContext */ .H)();
    const disabled = fieldDisabled || disabledProp;
    const name = fieldName ?? nameProp;
    const inputRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const handleInputRef = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_5__/* .useMergedRefs */ .a)(inputRef, externalInputRef, validation.inputRef);
    const switchRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const setFocused = (0,_internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useSetFieldFocused */ .N)(disabled, switchRef);
    const id = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useBaseUiId */ .e)();
    const controlId = (0,_internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useLabelableId */ .l)({
        id: idProp
    });
    const hiddenInputId = nativeButton ? undefined : controlId;
    const [checked, setCheckedState] = (0,_base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_9__/* .useControlled */ .q)({
        controlled: checkedProp,
        default: Boolean(defaultChecked),
        name: 'Switch',
        state: 'checked'
    });
    (0,_internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useRegisterFieldControl */ .I)(switchRef, id, checked, undefined, !disabled, nameProp);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_11__/* .useIsoLayoutEffect */ .g)(()=>{
        setFilled(checked);
    }, [
        checked,
        setFilled
    ]);
    (0,_internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_12__/* .useValueChanged */ .x)(checked, ()=>{
        clearErrors(name);
        setDirty(checked !== validityData.initialValue);
        validation.change(checked);
    });
    const { getButtonProps, buttonRef } = (0,_internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_13__/* .useButton */ .s)({
        disabled,
        native: nativeButton
    });
    const ariaLabelledBy = (0,_internals_labelable_provider_useAriaLabelledBy_mjs__WEBPACK_IMPORTED_MODULE_14__/* .useAriaLabelledBy */ .B)(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId, elementProps['aria-label']);
    const rootProps = {
        id: nativeButton ? controlId : id,
        role: 'switch',
        'aria-checked': checked,
        'aria-readonly': readOnly || undefined,
        'aria-required': required || undefined,
        'aria-labelledby': ariaLabelledBy,
        onFocus () {
            setFocused(true);
        },
        onBlur () {
            const element = inputRef.current;
            if (!element || disabled) {
                return;
            }
            setTouched(true);
            setFocused(false);
            if (validationMode === 'onBlur') {
                validation.commit(element.checked);
            }
        },
        onClick (event) {
            if (readOnly || disabled) {
                return;
            }
            event.preventDefault();
            const input = inputRef.current;
            if (!input) {
                return;
            }
            (0,_utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_15__/* .dispatchClickWithModifiers */ .B)(input, event);
        }
    };
    const inputProps = {
        ...validation.getValidationProps(disabled),
        checked,
        disabled,
        form,
        id: hiddenInputId,
        name,
        required,
        style: name ? _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_16__/* .visuallyHiddenInput */ .a : _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_16__/* .visuallyHidden */ .Q,
        tabIndex: -1,
        type: 'checkbox',
        'aria-hidden': true,
        ref: handleInputRef,
        onChange (event) {
            // Workaround for https://github.com/react/react/issues/9023
            if (event.nativeEvent.defaultPrevented) {
                return;
            }
            if (readOnly) {
                event.preventDefault();
                return;
            }
            const nextChecked = event.currentTarget.checked;
            const eventDetails = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_17__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_18__/* .none */ .dv, event.nativeEvent);
            onCheckedChange?.(nextChecked, eventDetails);
            if (eventDetails.isCanceled) {
                return;
            }
            setCheckedState(nextChecked);
        },
        onClick (event) {
            // The click dispatched from the root's `onClick` is an implementation detail
            // and must not reach ancestors, which already receive the original click.
            event.stopPropagation();
        },
        onFocus () {
            switchRef.current?.focus();
        },
        // React <19 sets an empty value if `undefined` is passed explicitly
        // To avoid this, we only set the value if it's defined
        ...value !== undefined ? {
            value
        } : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_19__/* .EMPTY_OBJECT */ .t0
    };
    const state = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            ...fieldState,
            checked,
            disabled,
            readOnly,
            required
        }), [
        fieldState,
        checked,
        disabled,
        readOnly,
        required
    ]);
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_20__/* .useRenderElement */ .o)('span', componentProps, {
        state,
        ref: [
            forwardedRef,
            switchRef,
            buttonRef
        ],
        props: [
            rootProps,
            elementProps,
            getButtonProps,
            (props)=>validation.getValidationProps(disabled, props)
        ],
        stateAttributesMapping: _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_21__/* .stateAttributesMapping */ .P
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_SwitchRootContext_mjs__WEBPACK_IMPORTED_MODULE_22__/* .SwitchRootContext */ .u.Provider, {
        value: state,
        children: [
            element,
            !checked && name && uncheckedValue !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "hidden",
                form: form,
                name: name,
                value: uncheckedValue,
                disabled: disabled
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                ...inputProps,
                suppressHydrationWarning: true
            })
        ]
    });
});
if (false) {}


/***/ }),

/***/ 40250:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ stateAttributesMapping)
/* harmony export */ });
/* harmony import */ var _internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95478);
/* harmony import */ var _root_SwitchRootDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77658);


const stateAttributesMapping = {
  ..._internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_0__/* .fieldValidityMapping */ .dc,
  checked(value) {
    if (value) {
      return {
        [_root_SwitchRootDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .checked */ .KD]: ''
      };
    }
    return {
      [_root_SwitchRootDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .unchecked */ .VJ]: ''
    };
  }
};

/***/ }),

/***/ 42817:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ TooltipStore)
/* harmony export */ });
/* unused harmony export createNullTooltipStore */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98419);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76175);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27050);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52313);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26713);







const selectors = {
  ..._utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .popupStoreSelectors */ .o,
  disabled: state => state.disabled,
  instantType: state => state.instantType,
  isInstantPhase: state => state.isInstantPhase,
  trackCursorAxis: state => state.trackCursorAxis,
  disableHoverablePopup: state => state.disableHoverablePopup,
  lastOpenChangeReason: state => state.openChangeReason,
  closeOnClick: state => state.closeOnClick,
  // Active and inactive trigger props are the same object, so a constant for triggers that discard
  // them keeps those triggers from re-rendering when the props change.
  appliedTriggerProps: (state, apply) => apply ? state.activeTriggerProps : undefined,
  closeDelay: state => state.closeDelay,
  adaptiveOrigin: state => state.adaptiveOrigin
};

/**
 * The store view that detached handle-backed triggers read from. Both the real `TooltipStore` and
 * the inert fallback store satisfy it, so a trigger can read from whichever store the handle
 * currently exposes. Narrowed to the members a trigger actually uses — the trigger-data members plus
 * `setOpen`/`cancelPendingOpen` (called directly by the trigger) and `useSyncedValue` — so the
 * exposed surface can't bypass the open-change pipeline; on the detached fallback store every one of
 * these mutations is a no-op.
 */

class TooltipStore extends _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_2__/* .ReactStore */ .H {
  constructor(initialState, floatingId, nested) {
    const triggerElements = new _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .PopupTriggerMap */ .Z();
    super(createInitialState(initialState, triggerElements, floatingId, nested), createInitialContext(triggerElements), selectors);
  }
  setOpen = (nextOpen, eventDetails) => {
    (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .applyPopupOpenChange */ .DU)(this, nextOpen, eventDetails, {
      extraState: {
        openChangeReason: eventDetails.reason
      }
    });
  };

  // Used by trigger clicks to clear a delayed hover open without reporting a public open-state change.
  cancelPendingOpen(event) {
    this.state.floatingRootContext.dispatchOpenChange(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_5__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_6__/* .triggerPress */ .Ui, event));
  }
}

/**
 * Creates the inert fallback store used by detached handle-backed triggers while no `Tooltip.Root`
 * is attached. It preserves a tooltip-specific trigger registry in context so detached triggers can
 * register before migrating to the live root store. `setOpen`/`cancelPendingOpen` are no-ops
 * (matching the inert reads/writes of `NullStore`), so a trigger can call them from hover/click
 * handlers while detached without any effect.
 */
function createNullTooltipStore() {
  const triggerElements = new PopupTriggerMap();
  const store = new NullStore(Object.freeze(createInitialState(undefined, triggerElements)), Object.freeze(createInitialContext(triggerElements)), selectors);
  return Object.assign(store, {
    setOpen: NOOP,
    cancelPendingOpen: NOOP
  });
}
function createInitialState(initialState, triggerElements, floatingId, nested = false) {
  const state = {
    ...(0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .createInitialPopupStoreState */ .r)(triggerElements, floatingId, nested),
    disabled: false,
    instantType: undefined,
    isInstantPhase: false,
    trackCursorAxis: 'none',
    disableHoverablePopup: false,
    openChangeReason: null,
    closeOnClick: true,
    closeDelay: 0,
    adaptiveOrigin: undefined,
    ...initialState
  };
  return state;
}
function createInitialContext(triggerElements) {
  return {
    popupRef: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef(),
    onOpenChange: undefined,
    onOpenChangeComplete: undefined,
    triggerElements
  };
}

/***/ }),

/***/ 46844:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Key)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "key",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m2 21 9.6-9.6",
                key: "9l79m3"
            }
        ],
        [
            "path",
            {
                d: "m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19",
                key: "fw8biw"
            }
        ],
        [
            "circle",
            {
                cx: "15.5",
                cy: "7.5",
                r: "5.5",
                key: "4wxmhb"
            }
        ]
    ]
};
__iconData.node;
const Key = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=key.mjs.map


/***/ }),

/***/ 55270:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ useTooltipPositionerContext),
/* harmony export */   v: () => (/* binding */ TooltipPositionerContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ TooltipPositionerContext,useTooltipPositionerContext auto */ 

const TooltipPositionerContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useTooltipPositionerContext() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(TooltipPositionerContext);
    if (context === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(71));
    }
    return context;
}


/***/ }),

/***/ 57353:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ TooltipArrow)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _positioner_TooltipPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55270);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(84052);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(88401);
/* harmony import */ var _root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4390);
/* __next_internal_client_entry_do_not_use__ TooltipArrow auto */ 




/**
 * Displays an element positioned against the tooltip anchor.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */ const TooltipArrow = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function TooltipArrow(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps;
    const store = (0,_root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useTooltipRootContext */ .g)();
    const { arrowRef, side, align, arrowUncentered, arrowStyles } = (0,_positioner_TooltipPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useTooltipPositionerContext */ .s)();
    const open = store.useState('open');
    const instantType = store.useState('instantType');
    const state = {
        open,
        side,
        align,
        uncentered: arrowUncentered,
        instant: instantType
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useRenderElement */ .o)('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            arrowRef
        ],
        props: [
            {
                style: arrowStyles,
                'aria-hidden': true
            },
            elementProps
        ],
        stateAttributesMapping: _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_4__/* .popupStateMapping */ .GW
    });
    return element;
});
if (false) {}


/***/ }),

/***/ 57991:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ TooltipPopup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4390);
/* harmony import */ var _positioner_TooltipPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55270);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84052);
/* harmony import */ var _internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72924);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88401);
/* harmony import */ var _internals_getDisabledMountTransitionStyles_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(36050);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62081);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26713);
/* __next_internal_client_entry_do_not_use__ TooltipPopup auto */ 








/**
 * A container for the tooltip contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */ const TooltipPopup = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function TooltipPopup(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps;
    const store = (0,_root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useTooltipRootContext */ .g)();
    const { side, align } = (0,_positioner_TooltipPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useTooltipPositionerContext */ .s)();
    const open = store.useState('open');
    const instantType = store.useState('instantType');
    const transitionStatus = store.useState('transitionStatus');
    const popupProps = store.useState('popupProps');
    const floatingContext = store.useState('floatingRootContext');
    const disabled = store.useState('disabled');
    const closeDelay = store.useState('closeDelay');
    (0,_internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useOpenChangeComplete */ .v)({
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (open) {
                store.context.onOpenChangeComplete?.(true);
            }
        }
    });
    (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useHoverFloatingInteraction */ .a)(floatingContext, {
        enabled: !disabled,
        closeDelay
    });
    const setPopupElement = store.useStateSetter('popupElement');
    const state = {
        open,
        side,
        align,
        instant: instantType,
        transitionStatus
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useRenderElement */ .o)('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            store.context.popupRef,
            setPopupElement
        ],
        props: [
            _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_6__/* .FOCUSABLE_POPUP_PROPS */ .Ls,
            popupProps,
            (0,_internals_getDisabledMountTransitionStyles_mjs__WEBPACK_IMPORTED_MODULE_7__/* .getDisabledMountTransitionStyles */ .d)(transitionStatus),
            elementProps
        ],
        stateAttributesMapping: _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_8__/* .popupTransitionStateMapping */ .LM
    });
    return element;
});
if (false) {}


/***/ }),

/***/ 61566:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ FloatingDelayGroup),
/* harmony export */   c: () => (/* binding */ useDelayGroup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64951);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66652);
/* harmony import */ var _hooks_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(96836);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76175);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ FloatingDelayGroup,useDelayGroup auto */ 






const FloatingDelayGroupContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext({
    hasProvider: false,
    timeoutMs: 0,
    delayRef: {
        current: 0
    },
    initialDelayRef: {
        current: 0
    },
    timeout: new _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_2__/* .Timeout */ .E(),
    currentIdRef: {
        current: null
    },
    currentContextRef: {
        current: null
    }
});
if (false) {}
function resetDelayRef(delayRef, initialDelayRef) {
    delayRef.current = initialDelayRef.current;
}
/**
 * Experimental next version of `FloatingDelayGroup` to become the default
 * in the future. This component is not yet stable.
 * Provides context for a group of floating elements that should share a
 * `delay`. Unlike `FloatingDelayGroup`, `useDelayGroup` with this
 * component does not cause a re-render of unrelated consumers of the
 * context when the delay changes.
 * @see https://floating-ui.com/docs/FloatingDelayGroup
 * @internal
 */ function FloatingDelayGroup(props) {
    const { children, delay, timeoutMs = 0 } = props;
    const delayRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(delay);
    const initialDelayRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(delay);
    const currentIdRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const currentContextRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const timeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_2__/* .useTimeout */ .Z)();
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(()=>{
        initialDelayRef.current = delay;
        if (!currentIdRef.current) {
            delayRef.current = delay;
            return;
        }
        delayRef.current = {
            open: (0,_hooks_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getDelay */ .uf)(delayRef.current, 'open'),
            close: (0,_hooks_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getDelay */ .uf)(delay, 'close')
        };
    }, [
        delay,
        currentIdRef,
        delayRef,
        initialDelayRef
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FloatingDelayGroupContext.Provider, {
        value: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
                hasProvider: true,
                delayRef,
                initialDelayRef,
                currentIdRef,
                timeoutMs,
                currentContextRef,
                timeout
            }), [
            timeoutMs,
            timeout
        ]),
        children: children
    });
}
/**
 * Enables grouping when called inside a component that's a child of a
 * `FloatingDelayGroup`.
 * @see https://floating-ui.com/docs/FloatingDelayGroup
 * @internal
 */ function useDelayGroup(store, options = {
    open: false
}) {
    const { open } = options;
    const floatingId = store.useState('floatingId');
    const groupContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FloatingDelayGroupContext);
    const { currentIdRef, delayRef, timeoutMs, initialDelayRef, currentContextRef, hasProvider, timeout } = groupContext;
    const [isInstantPhase, setIsInstantPhase] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const openRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(open);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(()=>{
        openRef.current = open;
    }, [
        open
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(()=>{
        function unset() {
            currentContextRef.current?.setIsInstantPhase(false);
            currentIdRef.current = null;
            currentContextRef.current = null;
            delayRef.current = initialDelayRef.current;
            timeout.clear();
        }
        if (!currentIdRef.current) {
            return undefined;
        }
        if (!open && currentIdRef.current === floatingId) {
            setIsInstantPhase(false);
            if (timeoutMs) {
                const closingId = floatingId;
                timeout.start(timeoutMs, ()=>{
                    // If another tooltip has taken over the group, skip resetting.
                    if (store.select('open') || currentIdRef.current && currentIdRef.current !== closingId) {
                        return;
                    }
                    unset();
                });
                return ()=>{
                    if (openRef.current || currentIdRef.current !== closingId) {
                        timeout.clear();
                    }
                };
            }
            unset();
        }
        return undefined;
    }, [
        open,
        floatingId,
        currentIdRef,
        delayRef,
        timeoutMs,
        initialDelayRef,
        currentContextRef,
        timeout,
        store
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open) {
            return;
        }
        const prevContext = currentContextRef.current;
        const prevId = currentIdRef.current;
        // A new tooltip is opening, so cancel any pending timeout that would reset
        // the group's delay back to the initial value.
        timeout.clear();
        currentContextRef.current = {
            onOpenChange: store.setOpen,
            setIsInstantPhase
        };
        currentIdRef.current = floatingId;
        delayRef.current = {
            open: 0,
            close: (0,_hooks_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getDelay */ .uf)(initialDelayRef.current, 'close')
        };
        if (prevId !== null && prevId !== floatingId) {
            setIsInstantPhase(true);
            prevContext?.setIsInstantPhase(true);
            prevContext?.onOpenChange(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_5__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_6__/* .none */ .dv));
        } else {
            setIsInstantPhase(false);
            prevContext?.setIsInstantPhase(false);
        }
    }, [
        open,
        floatingId,
        store,
        currentIdRef,
        delayRef,
        initialDelayRef,
        currentContextRef,
        timeout
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(()=>{
        return ()=>{
            if (currentIdRef.current === floatingId) {
                currentContextRef.current = null;
                if (!openRef.current) {
                    return;
                }
                currentIdRef.current = null;
                resetDelayRef(delayRef, initialDelayRef);
                timeout.clear();
            }
        };
    }, [
        currentContextRef,
        currentIdRef,
        delayRef,
        floatingId,
        initialDelayRef,
        timeout
    ]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            activeIdRef: currentIdRef,
            hasProvider,
            delayRef,
            isInstantPhase
        }), [
        currentIdRef,
        hasProvider,
        delayRef,
        isInstantPhase
    ]);
}


/***/ }),

/***/ 62953:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ FloatingPortalLite)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47650);
/* harmony import */ var _floating_ui_react_components_FloatingPortal_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34934);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ FloatingPortalLite auto */ 



/**
 * `FloatingPortal` includes tabbable logic handling for focus management.
 * For components that don't need tabbable logic, use `FloatingPortalLite`.
 * @internal
 */ const FloatingPortalLite = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function FloatingPortalLite(componentProps, forwardedRef) {
    const { children, container, className, render, style, ...elementProps } = componentProps;
    const { node: portalNode, subtree: portalSubtree } = (0,_floating_ui_react_components_FloatingPortal_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useFloatingPortalNode */ .CK)({
        container,
        ref: forwardedRef,
        componentProps,
        elementProps
    });
    if (!portalSubtree && !portalNode) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            portalSubtree,
            portalNode && /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(children, portalNode)
        ]
    });
});
if (false) {}


/***/ }),

/***/ 69690:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ TooltipProviderContext),
/* harmony export */   n: () => (/* binding */ useTooltipProviderContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ TooltipProviderContext,useTooltipProviderContext auto */ 
/**
 * Holds the provider's `delay` value. `closeDelay` is handled by the delay group.
 */ const TooltipProviderContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useTooltipProviderContext() {
    return react__WEBPACK_IMPORTED_MODULE_0__.useContext(TooltipProviderContext);
}


/***/ }),

/***/ 77658:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KD: () => (/* binding */ checked),
/* harmony export */   VJ: () => (/* binding */ unchecked)
/* harmony export */ });
/* unused harmony exports disabled, readonly, required, valid, invalid, touched, dirty, filled, focused */
/**
 * Present when the switch is checked.
 */
const checked = 'data-checked';
/**
 * Present when the switch is not checked.
 */
const unchecked = 'data-unchecked';
/**
 * Present when the switch is disabled.
 */
const disabled = 'data-disabled';
/**
 * Present when the switch is readonly.
 */
const readonly = 'data-readonly';
/**
 * Present when the switch is required.
 */
const required = 'data-required';
/**
 * Present when the switch is in a valid state (when wrapped in Field.Root).
 */
const valid = 'data-valid';
/**
 * Present when the switch is in an invalid state (when wrapped in Field.Root).
 */
const invalid = 'data-invalid';
/**
 * Present when the switch has been touched (when wrapped in Field.Root).
 */
const touched = 'data-touched';
/**
 * Present when the switch's value has changed (when wrapped in Field.Root).
 */
const dirty = 'data-dirty';
/**
 * Present when the switch is active (when wrapped in Field.Root).
 */
const filled = 'data-filled';
/**
 * Present when the switch is focused (when wrapped in Field.Root).
 */
const focused = 'data-focused';

/***/ }),

/***/ 85848:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ useSwitchRootContext),
/* harmony export */   u: () => (/* binding */ SwitchRootContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ SwitchRootContext,useSwitchRootContext auto */ 

const SwitchRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useSwitchRootContext() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SwitchRootContext);
    if (context === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(63));
    }
    return context;
}


/***/ }),

/***/ 89034:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ EyeOff)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "eye-off",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
                key: "ct8e1f"
            }
        ],
        [
            "path",
            {
                d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
                key: "151rxh"
            }
        ],
        [
            "path",
            {
                d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
                key: "13bj9a"
            }
        ],
        [
            "path",
            {
                d: "m2 2 20 20",
                key: "1ooewy"
            }
        ]
    ]
};
__iconData.node;
const EyeOff = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=eye-off.mjs.map


/***/ }),

/***/ 89455:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ SwitchThumb)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _root_SwitchRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85848);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88401);
/* harmony import */ var _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40250);
/* __next_internal_client_entry_do_not_use__ SwitchThumb auto */ 



/**
 * The movable part of the switch that indicates whether the switch is on or off.
 * Renders a `<span>`.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */ const SwitchThumb = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SwitchThumb(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps;
    const state = (0,_root_SwitchRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useSwitchRootContext */ .b)();
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)('span', componentProps, {
        state,
        ref: forwardedRef,
        stateAttributesMapping: _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_3__/* .stateAttributesMapping */ .P,
        props: elementProps
    });
});
if (false) {}


/***/ }),

/***/ 90710:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Bot)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "bot",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 8V4H8",
                key: "hb8ula"
            }
        ],
        [
            "rect",
            {
                width: "16",
                height: "12",
                x: "4",
                y: "8",
                rx: "2",
                key: "enze0r"
            }
        ],
        [
            "path",
            {
                d: "M2 14h2",
                key: "vft8re"
            }
        ],
        [
            "path",
            {
                d: "M20 14h2",
                key: "4cs60a"
            }
        ],
        [
            "path",
            {
                d: "M15 13v2",
                key: "1xurst"
            }
        ],
        [
            "path",
            {
                d: "M9 13v2",
                key: "rq6x2g"
            }
        ]
    ]
};
__iconData.node;
const Bot = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=bot.mjs.map


/***/ }),

/***/ 93295:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ TooltipPositioner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4390);
/* harmony import */ var _TooltipPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(55270);
/* harmony import */ var _internals_useAnchorPositioning_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(99779);
/* harmony import */ var _portal_TooltipPortalContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(96206);
/* harmony import */ var _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69679);
/* harmony import */ var _utils_usePositioner_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62424);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ TooltipPositioner auto */ 






/**
 * Positions the tooltip against the trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */ 
const TooltipPositioner = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function TooltipPositioner(componentProps, forwardedRef) {
    const { render, className, anchor, positionMethod = 'absolute', side = 'top', align = 'center', sideOffset = 0, alignOffset = 0, collisionBoundary = 'clipping-ancestors', collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance = _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .POPUP_COLLISION_AVOIDANCE */ .Pe, style, ...elementProps } = componentProps;
    const store = (0,_root_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useTooltipRootContext */ .g)();
    const keepMounted = (0,_portal_TooltipPortalContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useTooltipPortalContext */ .a)();
    const open = store.useState('open');
    const mounted = store.useState('mounted');
    const trackCursorAxis = store.useState('trackCursorAxis');
    const disableHoverablePopup = store.useState('disableHoverablePopup');
    const floatingRootContext = store.useState('floatingRootContext');
    const instantType = store.useState('instantType');
    const transitionStatus = store.useState('transitionStatus');
    const adaptiveOrigin = store.useState('adaptiveOrigin');
    const positioning = (0,_internals_useAnchorPositioning_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useAnchorPositioning */ .s)({
        anchor,
        positionMethod,
        floatingRootContext,
        mounted,
        side,
        sideOffset,
        align,
        alignOffset,
        collisionBoundary,
        collisionPadding,
        sticky,
        arrowPadding,
        disableAnchorTracking,
        keepMounted,
        collisionAvoidance,
        adaptiveOrigin
    });
    const state = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            open,
            side: positioning.side,
            align: positioning.align,
            anchorHidden: positioning.anchorHidden,
            instant: trackCursorAxis !== 'none' ? 'tracking-cursor' : instantType
        }), [
        open,
        positioning.side,
        positioning.align,
        positioning.anchorHidden,
        trackCursorAxis,
        instantType
    ]);
    const element = (0,_utils_usePositioner_mjs__WEBPACK_IMPORTED_MODULE_6__/* .usePositioner */ .i)(componentProps, state, {
        styles: positioning.positionerStyles,
        transitionStatus,
        props: elementProps,
        refs: [
            forwardedRef,
            store.useStateSetter('positionerElement')
        ],
        hidden: !mounted,
        inert: !open || trackCursorAxis === 'both' || disableHoverablePopup
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_TooltipPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_7__/* .TooltipPositionerContext */ .v.Provider, {
        value: positioning,
        children: element
    });
});
if (false) {}


/***/ }),

/***/ 96206:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ TooltipPortalContext),
/* harmony export */   a: () => (/* binding */ useTooltipPortalContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ TooltipPortalContext,useTooltipPortalContext auto */ 

const TooltipPortalContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useTooltipPortalContext() {
    const value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(TooltipPortalContext);
    if (value === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(70));
    }
    return value;
}


/***/ }),

/***/ 97615:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ TooltipRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27243);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8994);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66652);
/* harmony import */ var _TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4390);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(87541);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21608);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7049);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26713);
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(40253);
/* harmony import */ var _store_TooltipStore_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42817);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(76175);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ TooltipRoot auto */ 










/**
 * Groups all parts of the tooltip.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */ 
const TooltipRoot = (0,_base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_2__/* .fastComponent */ .G1)(function TooltipRoot(props) {
    const { disabled = false, defaultOpen = false, open: openProp, disableHoverablePopup = false, trackCursorAxis = 'none', actionsRef, onOpenChange, onOpenChangeComplete, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null, children } = props;
    const store = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .usePopupRootStore */ .xp)((floatingId, nested)=>new _store_TooltipStore_mjs__WEBPACK_IMPORTED_MODULE_4__/* .TooltipStore */ .h({
            open: defaultOpen,
            openProp,
            activeTriggerId: defaultTriggerIdProp,
            triggerIdProp
        }, floatingId, nested));
    store.useControlledProp('openProp', openProp);
    store.useControlledProp('triggerIdProp', triggerIdProp);
    store.useContextCallback('onOpenChange', onOpenChange);
    store.useContextCallback('onOpenChangeComplete', onOpenChangeComplete);
    const openState = store.useState('open');
    const open = !disabled && openState;
    const activeTriggerId = store.useState('activeTriggerId');
    const mounted = store.useState('mounted');
    const payload = store.useState('payload');
    store.useSyncedValues({
        trackCursorAxis,
        disableHoverablePopup,
        disabled
    });
    (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useImplicitActiveTrigger */ .tr)(store, {
        closeOnActiveTriggerUnmount: true
    });
    const { forceUnmount, transitionStatus } = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useOpenStateTransitions */ .l$)(open, store);
    const isInstantPhase = store.useState('isInstantPhase');
    const instantType = store.useState('instantType');
    const lastOpenChangeReason = store.useState('lastOpenChangeReason');
    // Animations should be instant in two cases:
    // 1) Opening during the provider's instant phase (adjacent tooltip opens instantly)
    // 2) Closing because another tooltip opened (reason === 'none')
    // Otherwise, allow the animation to play. In particular, do not disable animations
    // during the 'ending' phase unless it's due to a sibling opening.
    const previousInstantTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__/* .useIsoLayoutEffect */ .g)(()=>{
        if (openState && disabled) {
            store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_6__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_7__/* .disabled */ .r9));
        }
    }, [
        openState,
        disabled,
        store
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__/* .useIsoLayoutEffect */ .g)(()=>{
        if (transitionStatus === 'ending' && lastOpenChangeReason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_7__/* .none */ .dv || transitionStatus !== 'ending' && isInstantPhase) {
            // Capture the current instant type so we can restore it later
            // and set to 'delay' to disable animations while moving from one trigger to another
            // within a delay group.
            if (instantType !== 'delay') {
                previousInstantTypeRef.current = instantType;
            }
            store.set('instantType', 'delay');
        } else if (previousInstantTypeRef.current !== null) {
            store.set('instantType', previousInstantTypeRef.current);
            previousInstantTypeRef.current = null;
        }
    }, [
        transitionStatus,
        isInstantPhase,
        lastOpenChangeReason,
        instantType,
        store
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__/* .useIsoLayoutEffect */ .g)(()=>{
        if (open) {
            if (activeTriggerId == null) {
                store.set('payload', undefined);
            }
        }
    }, [
        store,
        activeTriggerId,
        open
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(actionsRef, ()=>({
            unmount: forceUnmount,
            close: ()=>store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_6__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_7__/* .imperativeAction */ .zJ))
        }), [
        forceUnmount,
        store
    ]);
    const shouldRenderInteractions = open || mounted || !disabled && trackCursorAxis !== 'none';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_TooltipRootContext_mjs__WEBPACK_IMPORTED_MODULE_8__/* .TooltipRootContext */ .B.Provider, {
        value: store,
        children: [
            handle && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .PopupHandleAttachment */ .Ae, {
                handle: handle,
                store: store
            }),
            shouldRenderInteractions && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipInteractions, {
                store: store,
                disabled: disabled,
                trackCursorAxis: trackCursorAxis
            }),
            typeof children === 'function' ? children({
                payload
            }) : children
        ]
    });
});
if (false) {}
function TooltipInteractions({ store, disabled, trackCursorAxis }) {
    const floatingRootContext = store.useState('floatingRootContext');
    const dismiss = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_9__/* .useDismiss */ .s)(floatingRootContext, {
        enabled: !disabled,
        referencePress: ()=>store.select('closeOnClick')
    });
    const clientPoint = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useClientPoint */ .j)(floatingRootContext, {
        enabled: !disabled && trackCursorAxis !== 'none',
        axis: trackCursorAxis === 'none' ? undefined : trackCursorAxis
    });
    // Both hooks return `trigger: reference` (same object identity), so the active and
    // inactive trigger props can never differ. `useClientPoint` has no floating-side props.
    const triggerProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>(0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_11__/* .mergeProps */ .v6)(clientPoint.reference, dismiss.reference), [
        clientPoint.reference,
        dismiss.reference
    ]);
    (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .usePopupInteractionProps */ .i6)(store, {
        activeTriggerProps: triggerProps,
        inactiveTriggerProps: triggerProps,
        popupProps: dismiss.floating ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_12__/* .EMPTY_OBJECT */ .t0
    });
    return null;
}


/***/ })

}]);