"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[43342],{

/***/ 11539:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ DialogStore)
/* harmony export */ });
/* unused harmony export createNullDialogStore */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98419);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27050);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52313);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26713);




const selectors = {
  ..._utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .popupStoreSelectors */ .o,
  modal: state => state.modal,
  nested: state => state.nested,
  nestedOpenDialogCount: state => state.nestedOpenDialogCount,
  nestedOpenDrawerCount: state => state.nestedOpenDrawerCount,
  disablePointerDismissal: state => state.disablePointerDismissal,
  openMethod: state => state.openMethod,
  descriptionElementId: state => state.descriptionElementId,
  titleElementId: state => state.titleElementId,
  viewportElement: state => state.viewportElement,
  role: state => state.role
};

/**
 * The subset of `DialogStore` that detached handle-backed triggers rely on. Both the real
 * `DialogStore` and the inert fallback store satisfy it, so a trigger can read from whichever
 * store the handle currently exposes.
 */

class DialogStore extends _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_2__/* .ReactStore */ .H {
  constructor(initialState, floatingId, nested) {
    const triggerElements = new _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .PopupTriggerMap */ .Z();
    const state = createInitialState(initialState, triggerElements, floatingId, nested);
    super(state, createInitialContext(triggerElements), selectors);
  }
  setOpen = (nextOpen, eventDetails) => {
    eventDetails.preventUnmountOnClose = () => {
      this.set('preventUnmountingOnClose', true);
    };
    if (!nextOpen && eventDetails.trigger == null && this.state.activeTriggerId != null) {
      // When closing the dialog, pass the old trigger to the onOpenChange event
      // so it's not reset too early (potentially causing focus issues in controlled scenarios).
      eventDetails.trigger = this.state.activeTriggerElement ?? undefined;
    }
    this.context.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
    this.update((0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .createPopupOpenState */ .cQ)(this.state, nextOpen, eventDetails.trigger));
  };
}

/**
 * Creates the inert fallback store used by detached handle-backed triggers while no
 * `Dialog.Root` is attached. It preserves a dialog-specific trigger registry in context so
 * detached triggers can register before migrating to the live root store.
 */
function createNullDialogStore() {
  const triggerElements = new PopupTriggerMap();
  return new NullStore(Object.freeze(createInitialState(undefined, triggerElements)), Object.freeze(createInitialContext(triggerElements)), selectors);
}
function createInitialState(initialState, triggerElements, floatingId, nested = false) {
  const state = {
    ...(0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .createInitialPopupStoreState */ .r)(triggerElements, floatingId, nested),
    modal: true,
    disablePointerDismissal: false,
    viewportElement: null,
    descriptionElementId: undefined,
    titleElementId: undefined,
    openMethod: null,
    nested: false,
    nestedOpenDialogCount: 0,
    nestedOpenDrawerCount: 0,
    role: 'dialog',
    ...initialState
  };
  return state;
}
function createInitialContext(triggerElements) {
  return {
    popupRef: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef(),
    backdropRef: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef(),
    internalBackdropRef: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef(),
    outsidePressEnabledRef: {
      current: true
    },
    triggerElements,
    onOpenChange: undefined,
    onOpenChangeComplete: undefined
  };
}

/***/ }),

/***/ 11975:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ DialogTitle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85516);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(88401);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(62955);
/* __next_internal_client_entry_do_not_use__ DialogTitle auto */ 



/**
 * A heading that labels the dialog.
 * Renders an `<h2>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ const DialogTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function DialogTitle(componentProps, forwardedRef) {
    const { render, className, style, id: idProp, ...elementProps } = componentProps;
    const store = (0,_root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useDialogRootContext */ .P)();
    const id = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useBaseUiId */ .e)(idProp);
    store.useSyncedValueWithCleanup('titleElementId', id);
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useRenderElement */ .o)('h2', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if (false) {}


/***/ }),

/***/ 28576:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W5: () => (/* binding */ nestedDialogOpen)
/* harmony export */ });
/* unused harmony exports open, closed, startingStyle, endingStyle, nested */
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47733);


/**
 * Present when the dialog is open.
 */
const open = _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__/* .open */ .ho;
/**
 * Present when the dialog is closed.
 */
const closed = _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__/* .closed */ .$h;
/**
 * Present when the dialog begins animating in.
 */
const startingStyle = _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__/* .startingStyle */ .ep;
/**
 * Present when the dialog is animating out.
 */
const endingStyle = _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__/* .endingStyle */ .VJ;
/**
 * Present when the dialog is nested within another dialog.
 */
const nested = 'data-nested';
/**
 * Present when the dialog has other open dialogs nested within it.
 */
const nestedDialogOpen = 'data-nested-dialog-open';

/***/ }),

/***/ 31799:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ DialogDescription)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85516);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(88401);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(62955);
/* __next_internal_client_entry_do_not_use__ DialogDescription auto */ 



/**
 * A paragraph with additional information about the dialog.
 * Renders a `<p>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ const DialogDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function DialogDescription(componentProps, forwardedRef) {
    const { render, className, style, id: idProp, ...elementProps } = componentProps;
    const store = (0,_root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useDialogRootContext */ .P)();
    const id = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useBaseUiId */ .e)(idProp);
    store.useSyncedValueWithCleanup('descriptionElementId', id);
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useRenderElement */ .o)('p', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if (false) {}


/***/ }),

/***/ 32949:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ DialogPortal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_inertValue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(96354);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34934);
/* harmony import */ var _root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85516);
/* harmony import */ var _DialogPortalContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38220);
/* harmony import */ var _utils_InternalBackdrop_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(53976);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ DialogPortal auto */ 





/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ 
const DialogPortal = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function DialogPortal(props, forwardedRef) {
    const { keepMounted = false, ...portalProps } = props;
    const store = (0,_root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useDialogRootContext */ .P)();
    const mounted = store.useState('mounted');
    const modal = store.useState('modal');
    const open = store.useState('open');
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_DialogPortalContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .DialogPortalContext */ .m.Provider, {
        value: keepMounted,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .FloatingPortal */ .XF, {
            ref: forwardedRef,
            ...portalProps,
            children: [
                mounted && modal === true && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_InternalBackdrop_mjs__WEBPACK_IMPORTED_MODULE_5__/* .InternalBackdrop */ .W, {
                    ref: store.context.internalBackdropRef,
                    inert: (0,_base_ui_utils_inertValue__WEBPACK_IMPORTED_MODULE_6__/* .inertValue */ .Y)(!open)
                }),
                props.children
            ]
        })
    });
});
if (false) {}


/***/ }),

/***/ 35684:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _internals_use_button_useButton_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42176);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88401);
/* __next_internal_client_entry_do_not_use__ Button auto */ 


/**
 * A button component that can be used to trigger actions.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Button](https://base-ui.com/react/components/button)
 */ const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Button(componentProps, forwardedRef) {
    const { render, className, disabled = false, focusableWhenDisabled = false, nativeButton = true, style, ...elementProps } = componentProps;
    const { getButtonProps, buttonRef } = (0,_internals_use_button_useButton_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useButton */ .s)({
        disabled,
        focusableWhenDisabled,
        native: nativeButton
    });
    const state = {
        disabled
    };
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef
        ],
        props: [
            elementProps,
            getButtonProps
        ]
    });
});
if (false) {}


/***/ }),

/***/ 37316:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ DialogInteractions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useScrollLock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31814);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87541);
/* harmony import */ var _floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93093);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26713);
/* __next_internal_client_entry_do_not_use__ DialogInteractions auto */ 





function DialogInteractions({ store, parentContext, isDrawer }) {
    const open = store.useState('open');
    const mounted = store.useState('mounted');
    const disablePointerDismissal = store.useState('disablePointerDismissal');
    const modal = store.useState('modal');
    const popupElement = store.useState('popupElement');
    const floatingRootContext = store.useState('floatingRootContext');
    const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    const [ownNestedOpenDrawers, setOwnNestedOpenDrawers] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    const isTopmost = ownNestedOpenDialogs === 0;
    const dismiss = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useDismiss */ .s)(floatingRootContext, {
        outsidePressEvent () {
            if (store.context.internalBackdropRef.current || store.context.backdropRef.current) {
                return 'intentional';
            }
            // Ensure `aria-hidden` on outside elements is removed immediately
            // on outside press when trapping focus.
            return {
                mouse: modal === 'trap-focus' ? 'sloppy' : 'intentional',
                touch: 'sloppy'
            };
        },
        outsidePress (event) {
            if (!store.context.outsidePressEnabledRef.current) {
                return false;
            }
            // For mouse events, only accept left button (button 0)
            // For touch events, a single touch is equivalent to left button
            if ('button' in event && event.button !== 0) {
                return false;
            }
            if ('touches' in event) {
                // Outside press can be handled on `touchend`, where the lifted point is
                // reported in `changedTouches` and `touches` contains any remaining
                // active points. Treat it as a single-finger tap only when exactly one
                // touch ended and no other fingers are still down.
                if (event.type === 'touchend') {
                    if (event.changedTouches.length !== 1 || event.touches.length !== 0) {
                        return false;
                    }
                } else if (event.touches.length !== 1) {
                    return false;
                }
            }
            const target = (0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_2__/* .getTarget */ .EW)(event);
            if (isTopmost && !disablePointerDismissal) {
                // Only close if the click occurred on the dialog's owning backdrop.
                // This supports multiple modal dialogs that aren't nested in the React tree:
                // https://github.com/mui/base-ui/issues/1320
                if (modal) {
                    const internalBackdrop = store.context.internalBackdropRef.current;
                    const backdrop = store.context.backdropRef.current;
                    return internalBackdrop || backdrop ? internalBackdrop === target || backdrop === target || (0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_2__/* .contains */ .gR)(target, popupElement) && !target?.hasAttribute('data-base-ui-portal') : true;
                }
                return true;
            }
            return false;
        },
        escapeKey: isTopmost
    });
    (0,_base_ui_utils_useScrollLock__WEBPACK_IMPORTED_MODULE_3__/* .useScrollLock */ .K)(open && modal === true, popupElement);
    // Listen for nested open/close events on this store to maintain the counts.
    // A close notification is an open notification with zeroed counts.
    store.useContextCallback('onNestedDialogOpen', (dialogCount, drawerCount)=>{
        // A handle-backed root keeps these interactions mounted while closed. Ignore nested roots that
        // open meanwhile so their counts don't carry into the next open session.
        if (!store.select('open') && !store.select('mounted')) {
            return;
        }
        setOwnNestedOpenDialogs(dialogCount);
        setOwnNestedOpenDrawers(drawerCount);
    });
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open && !mounted) {
            setOwnNestedOpenDialogs(0);
            setOwnNestedOpenDrawers(0);
        }
    }, [
        open,
        mounted
    ]);
    // Notify parent of our open/close state using parent callbacks, if any
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__/* .useIsoLayoutEffect */ .g)(()=>{
        if (parentContext?.onNestedDialogOpen) {
            if (open) {
                parentContext.onNestedDialogOpen(ownNestedOpenDialogs + 1, ownNestedOpenDrawers + (isDrawer ? 1 : 0));
            }
        }
        return ()=>{
            if (parentContext?.onNestedDialogOpen && open) {
                parentContext.onNestedDialogOpen(0, 0);
            }
        };
    }, [
        isDrawer,
        open,
        ownNestedOpenDialogs,
        ownNestedOpenDrawers,
        parentContext
    ]);
    (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_5__/* .usePopupInteractionProps */ .i6)(store, {
        // `enabled` is not passed to `useDismiss`, so its props are always defined,
        // and `trigger` is the same object as `reference`.
        activeTriggerProps: dismiss.reference,
        inactiveTriggerProps: dismiss.trigger,
        // DialogPopup and DrawerPopup spread `FOCUSABLE_POPUP_PROPS` directly, so
        // this only needs to carry the dismiss handlers.
        popupProps: dismiss.floating,
        nestedOpenDialogCount: ownNestedOpenDialogs,
        nestedOpenDrawerCount: ownNestedOpenDrawers
    });
    return null;
}


/***/ }),

/***/ 38220:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ DialogPortalContext),
/* harmony export */   p: () => (/* binding */ useDialogPortalContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ DialogPortalContext,useDialogPortalContext auto */ 

const DialogPortalContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useDialogPortalContext() {
    const value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DialogPortalContext);
    if (value === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(26));
    }
    return value;
}


/***/ }),

/***/ 40828:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ dialogStateAttributesMapping)
/* harmony export */ });
/* harmony import */ var _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41900);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84052);
/* harmony import */ var _popup_DialogPopupDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28576);




/**
 * Shared by `Dialog.Popup` and `Dialog.Viewport`, whose states have the same shape.
 * `nested` is not mapped: unmapped `true` booleans already render as `data-nested`.
 */
const dialogStateAttributesMapping = {
  ..._utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__/* .popupStateMapping */ .GW,
  ..._internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_1__/* .transitionStatusMapping */ .G,
  nestedDialogOpen(value) {
    return value ? {
      [_popup_DialogPopupDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_2__/* .nestedDialogOpen */ .W5]: ''
    } : null;
  }
};

/***/ }),

/***/ 45236:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ nestedDialogs)
/* harmony export */ });
/**
 * Indicates how many dialogs are nested within.
 * @type {number}
 */
const nestedDialogs = '--nested-dialogs';

/***/ }),

/***/ 45477:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ DialogBackdrop)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85516);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88401);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(84052);
/* __next_internal_client_entry_do_not_use__ DialogBackdrop auto */ 



/**
 * An overlay displayed beneath the popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ const DialogBackdrop = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function DialogBackdrop(componentProps, forwardedRef) {
    const { render, className, style, forceRender = false, ...elementProps } = componentProps;
    const store = (0,_root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useDialogRootContext */ .P)();
    const open = store.useState('open');
    const nested = store.useState('nested');
    const mounted = store.useState('mounted');
    const transitionStatus = store.useState('transitionStatus');
    const state = {
        open,
        transitionStatus
    };
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)('div', componentProps, {
        state,
        ref: [
            store.context.backdropRef,
            forwardedRef
        ],
        stateAttributesMapping: _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_3__/* .popupTransitionStateMapping */ .LM,
        props: [
            {
                role: 'presentation',
                hidden: !mounted,
                style: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }
            },
            elementProps
        ],
        enabled: forceRender || !nested
    });
});
if (false) {}


/***/ }),

/***/ 49387:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ DialogPopup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(84905);
/* harmony import */ var _root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85516);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(88401);
/* harmony import */ var _portal_DialogPortalContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38220);
/* harmony import */ var _internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72924);
/* harmony import */ var _internals_composite_composite_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5313);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26713);
/* harmony import */ var _DialogPopupCssVars_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(45236);
/* harmony import */ var _utils_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(40828);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ DialogPopup auto */ 









/**
 * A container for the dialog contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ 
const DialogPopup = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function DialogPopup(componentProps, forwardedRef) {
    const { render, className, style, finalFocus, initialFocus, ...elementProps } = componentProps;
    const store = (0,_root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useDialogRootContext */ .P)();
    const descriptionElementId = store.useState('descriptionElementId');
    const disablePointerDismissal = store.useState('disablePointerDismissal');
    const floatingRootContext = store.useState('floatingRootContext');
    const rootPopupProps = store.useState('popupProps');
    const modal = store.useState('modal');
    const mounted = store.useState('mounted');
    const nested = store.useState('nested');
    const nestedOpenDialogCount = store.useState('nestedOpenDialogCount');
    const open = store.useState('open');
    const openMethod = store.useState('openMethod');
    const titleElementId = store.useState('titleElementId');
    const transitionStatus = store.useState('transitionStatus');
    const role = store.useState('role');
    const floatingId = floatingRootContext.useState('floatingId');
    (0,_portal_DialogPortalContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useDialogPortalContext */ .p)();
    (0,_internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useOpenChangeComplete */ .v)({
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (open) {
                store.context.onOpenChangeComplete?.(true);
            }
        }
    });
    const resolvedInitialFocus = initialFocus === undefined ? (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_5__/* .createDefaultInitialFocus */ .UM)(store.context.popupRef) : initialFocus;
    const nestedDialogOpen = nestedOpenDialogCount > 0;
    const setPopupElement = store.useStateSetter('popupElement');
    const state = {
        open,
        nested,
        transitionStatus,
        nestedDialogOpen
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useRenderElement */ .o)('div', componentProps, {
        state,
        props: [
            rootPopupProps,
            {
                id: floatingId,
                'aria-labelledby': titleElementId,
                'aria-describedby': descriptionElementId,
                role,
                ..._utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_5__/* .FOCUSABLE_POPUP_PROPS */ .Ls,
                hidden: !mounted,
                onKeyDown (event) {
                    if (_internals_composite_composite_mjs__WEBPACK_IMPORTED_MODULE_7__/* .COMPOSITE_KEYS */ .jF.has(event.key)) {
                        event.stopPropagation();
                    }
                },
                style: {
                    [_DialogPopupCssVars_mjs__WEBPACK_IMPORTED_MODULE_8__/* .nestedDialogs */ .d]: nestedOpenDialogCount
                }
            },
            elementProps
        ],
        ref: [
            forwardedRef,
            store.context.popupRef,
            setPopupElement
        ],
        stateAttributesMapping: _utils_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_9__/* .dialogStateAttributesMapping */ .v
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_10__/* .FloatingFocusManager */ .s, {
        context: floatingRootContext,
        openInteractionType: openMethod,
        disabled: !mounted,
        closeOnFocusOut: !disablePointerDismissal,
        initialFocus: resolvedInitialFocus,
        returnFocus: finalFocus,
        modal: modal !== false,
        restoreFocus: "popup",
        children: element
    });
});
if (false) {}


/***/ }),

/***/ 50348:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ useRenderDialogRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _useDialogRoot_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(37316);
/* harmony import */ var _DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85516);
/* harmony import */ var _store_DialogStore_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11539);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76175);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26713);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ useRenderDialogRoot auto */ 







function useRenderDialogRoot(mode, props) {
    const { children, open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, disablePointerDismissal: disablePointerDismissalProp = false, modal: modalProp = true, actionsRef, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null } = props;
    const isDrawer = mode === 'drawer';
    const isAlertDialog = mode === 'alert-dialog';
    const modal = isAlertDialog ? true : modalProp;
    const disablePointerDismissal = isAlertDialog || disablePointerDismissalProp;
    const role = isAlertDialog ? 'alertdialog' : 'dialog';
    const parentStore = (0,_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useDialogRootContext */ .P)(true);
    const nested = parentStore != null;
    const rootState = {
        modal,
        disablePointerDismissal,
        nested,
        role
    };
    // The store is owned by this Root instance and created exactly once. It is not tied to the handle:
    // the handle attaches to it, so swapping the handle re-attaches rather than recreating state.
    // Default values are only initial values; controlled values and root state are synced after creation.
    // Dialogs pass the popup element to Floating UI as the floating element (`treatPopupAsFloatingElement`).
    const store = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .usePopupRootStore */ .xp)((floatingId, floatingNested)=>new _store_DialogStore_mjs__WEBPACK_IMPORTED_MODULE_4__/* .DialogStore */ .Y({
            open: defaultOpen,
            openProp,
            activeTriggerId: defaultTriggerIdProp,
            triggerIdProp,
            ...rootState
        }, floatingId, floatingNested), true);
    store.useControlledProp('openProp', openProp);
    store.useControlledProp('triggerIdProp', triggerIdProp);
    store.useSyncedValues(rootState);
    store.useContextCallback('onOpenChange', onOpenChange);
    store.useContextCallback('onOpenChangeComplete', onOpenChangeComplete);
    const open = store.useState('open');
    const mounted = store.useState('mounted');
    const payload = store.useState('payload');
    (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .usePopupRootSync */ .xs)(store, open);
    (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useImplicitActiveTrigger */ .tr)(store);
    const { forceUnmount } = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useOpenStateTransitions */ .l$)(open, store);
    react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(actionsRef, ()=>({
            unmount: forceUnmount,
            close: ()=>store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_5__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_6__/* .imperativeAction */ .zJ))
        }), [
        forceUnmount,
        store
    ]);
    // Detached triggers share this one Root, so mounting its interactions eagerly is cheap. The
    // trigger props they publish then stay stable, so opening and closing doesn't re-render inactive
    // triggers.
    const shouldRenderInteractions = open || mounted || handle != null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .DialogRootContext */ .a.Provider, {
        value: store,
        children: [
            handle && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .PopupHandleAttachment */ .Ae, {
                handle: handle,
                store: store
            }),
            shouldRenderInteractions && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_useDialogRoot_mjs__WEBPACK_IMPORTED_MODULE_7__/* .DialogInteractions */ .C, {
                store: store,
                parentContext: parentStore?.context,
                isDrawer: isDrawer
            }),
            typeof children === 'function' ? children({
                payload
            }) : children
        ]
    });
}


/***/ }),

/***/ 52579:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ DialogClose)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85516);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88401);
/* harmony import */ var _internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42176);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76175);
/* __next_internal_client_entry_do_not_use__ DialogClose auto */ 





/**
 * A button that closes the dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ const DialogClose = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function DialogClose(componentProps, forwardedRef) {
    const { render, className, style, disabled = false, nativeButton = true, ...elementProps } = componentProps;
    const store = (0,_root_DialogRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useDialogRootContext */ .P)();
    const open = store.useState('open');
    const { getButtonProps, buttonRef } = (0,_internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useButton */ .s)({
        disabled,
        native: nativeButton
    });
    const state = {
        disabled
    };
    function handleClick(event) {
        if (open) {
            store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_3__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_4__/* .closePress */ .SR, event.nativeEvent));
        }
    }
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useRenderElement */ .o)('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef
        ],
        props: [
            {
                onClick: handleClick
            },
            elementProps,
            getButtonProps
        ]
    });
});
if (false) {}


/***/ }),

/***/ 82741:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ DialogRoot)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27243);
/* harmony import */ var _useRenderDialogRoot_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50348);
/* __next_internal_client_entry_do_not_use__ DialogRoot auto */ 

/**
 * Groups all parts of the dialog.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ const DialogRoot = (0,_base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_0__/* .fastComponent */ .G1)(function DialogRoot(props) {
    return (0,_useRenderDialogRoot_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useRenderDialogRoot */ .G)('dialog', props);
});
if (false) {}


/***/ }),

/***/ 85516:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ useDialogRootContext),
/* harmony export */   a: () => (/* binding */ DialogRootContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ DialogRootContext,useDialogRootContext auto */ 

const DialogRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useDialogRootContext(optional) {
    const store = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DialogRootContext);
    if (!optional && store === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(27));
    }
    return store;
}


/***/ })

}]);