"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[57932],{

/***/ 2728:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ useMenuPositionerContext),
/* harmony export */   r: () => (/* binding */ MenuPositionerContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ MenuPositionerContext,useMenuPositionerContext auto */ 

const MenuPositionerContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useMenuPositionerContext(optional) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MenuPositionerContext);
    if (context === undefined && !optional) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(33));
    }
    return context;
}


/***/ }),

/***/ 7118:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ safePolygon)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64951);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93093);
/* harmony import */ var _utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(92044);





/* eslint-disable no-nested-ternary */

const CURSOR_SPEED_THRESHOLD = 0.1;
const CURSOR_SPEED_THRESHOLD_SQUARED = CURSOR_SPEED_THRESHOLD * CURSOR_SPEED_THRESHOLD;
const POLYGON_BUFFER = 0.5;
function hasIntersectingEdge(pointX, pointY, xi, yi, xj, yj) {
  return yi >= pointY !== yj >= pointY && pointX <= (xj - xi) * (pointY - yi) / (yj - yi) + xi;
}
function isPointInQuadrilateral(pointX, pointY, x1, y1, x2, y2, x3, y3, x4, y4) {
  let isInsideValue = false;
  if (hasIntersectingEdge(pointX, pointY, x1, y1, x2, y2)) {
    isInsideValue = !isInsideValue;
  }
  if (hasIntersectingEdge(pointX, pointY, x2, y2, x3, y3)) {
    isInsideValue = !isInsideValue;
  }
  if (hasIntersectingEdge(pointX, pointY, x3, y3, x4, y4)) {
    isInsideValue = !isInsideValue;
  }
  if (hasIntersectingEdge(pointX, pointY, x4, y4, x1, y1)) {
    isInsideValue = !isInsideValue;
  }
  return isInsideValue;
}
function isInsideRect(pointX, pointY, rect) {
  return pointX >= rect.x && pointX <= rect.x + rect.width && pointY >= rect.y && pointY <= rect.y + rect.height;
}
function isInsideAxisAlignedRect(pointX, pointY, x1, y1, x2, y2) {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  return pointX >= minX && pointX <= maxX && pointY >= minY && pointY <= maxY;
}
/**
 * Generates a safe polygon area that the user can traverse without closing the
 * floating element once leaving the reference element.
 * @see https://floating-ui.com/docs/useHover#safepolygon
 */
function safePolygon(options = {}) {
  const {
    blockPointerEvents = false
  } = options;
  const timeout = new _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_0__/* .Timeout */ .E();
  const fn = ({
    x,
    y,
    placement,
    elements,
    onClose,
    nodeId,
    tree
  }) => {
    const side = placement?.split('-')[0];
    let hasLanded = false;
    let lastX = null;
    let lastY = null;
    let lastCursorTime = typeof performance !== 'undefined' ? performance.now() : 0;
    function isCursorMovingSlowly(nextX, nextY) {
      const currentTime = performance.now();
      const elapsedTime = currentTime - lastCursorTime;
      if (lastX === null || lastY === null || elapsedTime === 0) {
        lastX = nextX;
        lastY = nextY;
        lastCursorTime = currentTime;
        return false;
      }
      const deltaX = nextX - lastX;
      const deltaY = nextY - lastY;
      const distanceSquared = deltaX * deltaX + deltaY * deltaY;
      const thresholdSquared = elapsedTime * elapsedTime * CURSOR_SPEED_THRESHOLD_SQUARED;
      lastX = nextX;
      lastY = nextY;
      lastCursorTime = currentTime;
      return distanceSquared < thresholdSquared;
    }
    function close() {
      timeout.clear();
      onClose();
    }
    return function onMouseMove(event) {
      timeout.clear();
      const domReference = elements.domReference;
      const floating = elements.floating;
      if (!domReference || !floating || side == null || x == null || y == null) {
        return undefined;
      }
      const {
        clientX,
        clientY
      } = event;
      const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getTarget */ .EW)(event);
      const isLeave = event.type === 'mouseleave';
      const isOverFloatingEl = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .contains */ .gR)(floating, target);
      const isOverReferenceEl = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .contains */ .gR)(domReference, target);
      if (isOverFloatingEl) {
        hasLanded = true;
        if (!isLeave) {
          return undefined;
        }
      }
      if (isOverReferenceEl) {
        hasLanded = false;
        if (!isLeave) {
          hasLanded = true;
          return undefined;
        }
      }

      // Prevent overlapping floating element from being stuck in an open-close
      // loop: https://github.com/floating-ui/floating-ui/issues/1910
      if (isLeave && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__/* .isElement */ .vq)(event.relatedTarget) && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .contains */ .gR)(floating, event.relatedTarget)) {
        return undefined;
      }
      function hasOpenChildNode() {
        return Boolean(tree && (0,_utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getNodeChildren */ .C)(tree.nodesRef.current, nodeId).length > 0);
      }
      function closeIfNoOpenChild() {
        if (!hasOpenChildNode()) {
          close();
        }
      }

      // If any nested child is open, abort.
      if (hasOpenChildNode()) {
        return undefined;
      }
      const refRect = domReference.getBoundingClientRect();
      const rect = floating.getBoundingClientRect();
      const cursorLeaveFromRight = x > rect.right - rect.width / 2;
      const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
      const isFloatingWider = rect.width > refRect.width;
      const isFloatingTaller = rect.height > refRect.height;
      const left = (isFloatingWider ? refRect : rect).left;
      const right = (isFloatingWider ? refRect : rect).right;
      const top = (isFloatingTaller ? refRect : rect).top;
      const bottom = (isFloatingTaller ? refRect : rect).bottom;

      // If the pointer is leaving from the opposite side, the "buffer" logic
      // creates a point where the floating element remains open, but should be
      // ignored.
      // A constant of 1 handles floating point rounding errors.
      if (side === 'top' && y >= refRect.bottom - 1 || side === 'bottom' && y <= refRect.top + 1 || side === 'left' && x >= refRect.right - 1 || side === 'right' && x <= refRect.left + 1) {
        closeIfNoOpenChild();
        return undefined;
      }

      // Ignore when the cursor is within the rectangular trough between the
      // two elements. Since the triangle is created from the cursor point,
      // which can start beyond the ref element's edge, traversing back and
      // forth from the ref to the floating element can cause it to close. This
      // ensures it always remains open in that case.
      let isInsideTroughRect = false;
      switch (side) {
        case 'top':
          isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, refRect.top + 1, right, rect.bottom - 1);
          break;
        case 'bottom':
          isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, rect.top + 1, right, refRect.bottom - 1);
          break;
        case 'left':
          isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, rect.right - 1, bottom, refRect.left + 1, top);
          break;
        case 'right':
          isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, refRect.right - 1, bottom, rect.left + 1, top);
          break;
        default:
      }
      if (isInsideTroughRect) {
        return undefined;
      }
      if (hasLanded && !isInsideRect(clientX, clientY, refRect)) {
        closeIfNoOpenChild();
        return undefined;
      }
      if (!isLeave && isCursorMovingSlowly(clientX, clientY)) {
        closeIfNoOpenChild();
        return undefined;
      }
      let isInsidePolygon = false;
      switch (side) {
        case 'top':
          {
            const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
            const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
            const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
            const cursorPointY = y + POLYGON_BUFFER + 1;
            const commonYLeft = cursorLeaveFromRight ? rect.bottom - POLYGON_BUFFER : isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top;
            const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top : rect.bottom - POLYGON_BUFFER;
            isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
            break;
          }
        case 'bottom':
          {
            const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
            const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
            const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
            const cursorPointY = y - POLYGON_BUFFER;
            const commonYLeft = cursorLeaveFromRight ? rect.top + POLYGON_BUFFER : isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom;
            const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom : rect.top + POLYGON_BUFFER;
            isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
            break;
          }
        case 'left':
          {
            const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
            const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
            const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
            const cursorPointX = x + POLYGON_BUFFER + 1;
            const commonXTop = cursorLeaveFromBottom ? rect.right - POLYGON_BUFFER : isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left;
            const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left : rect.right - POLYGON_BUFFER;
            isInsidePolygon = isPointInQuadrilateral(clientX, clientY, commonXTop, rect.top, commonXBottom, rect.bottom, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY);
            break;
          }
        case 'right':
          {
            const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
            const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
            const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
            const cursorPointX = x - POLYGON_BUFFER;
            const commonXTop = cursorLeaveFromBottom ? rect.left + POLYGON_BUFFER : isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right;
            const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right : rect.left + POLYGON_BUFFER;
            isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY, commonXTop, rect.top, commonXBottom, rect.bottom);
            break;
          }
        default:
      }
      if (!isInsidePolygon) {
        closeIfNoOpenChild();
      } else if (!hasLanded) {
        timeout.start(40, closeIfNoOpenChild);
      }
      return undefined;
    };
  };

  // eslint-disable-next-line no-underscore-dangle
  fn.__options = {
    ...options,
    blockPointerEvents
  };
  return fn;
}

/***/ }),

/***/ 8613:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ MenuPopup)
/* harmony export */ });
/* unused harmony export MenuPopupPlain */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(62081);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(84905);
/* harmony import */ var _root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39048);
/* harmony import */ var _positioner_MenuPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2728);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(88401);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(84052);
/* harmony import */ var _internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(72924);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(76175);
/* harmony import */ var _toolbar_root_ToolbarRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(95846);
/* harmony import */ var _internals_composite_composite_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5313);
/* harmony import */ var _internals_getDisabledMountTransitionStyles_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(36050);
/* harmony import */ var _submenu_root_MenuSubmenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37677);
/* harmony import */ var _internals_resolveRenderedId_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(85712);
/* harmony import */ var _internals_resolvePopupLabel_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(35876);
/* harmony import */ var _filter_root_MenuFilterContext_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(27053);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ MenuPopupPlain,MenuPopup auto */ 
















/**
 * @internal
 */ const MenuPopupPlain = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function MenuPopupPlain(componentProps, forwardedRef) {
    const { render, className, style, finalFocus, id: idProp, initialFocus: initialFocusProp, ...elementProps } = componentProps;
    const { store, defaultFloatingId, setRenderedFloatingId, virtualFocus, orientation } = (0,_root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useMenuRootContext */ .Y)();
    const inheritedSubmenuRootContext = (0,_submenu_root_MenuSubmenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useMenuSubmenuRootContext */ .B)();
    const { side, align } = (0,_positioner_MenuPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useMenuPositionerContext */ .O)();
    const insideToolbar = (0,_toolbar_root_ToolbarRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useToolbarRootContext */ .S)(true) != null;
    const open = store.useState('open');
    const transitionStatus = store.useState('transitionStatus');
    const popupProps = store.useState('popupProps');
    const mounted = store.useState('mounted');
    const instantType = store.useState('instantType');
    const activeTriggerElement = store.useState('activeTriggerElement');
    const parent = store.useState('parent');
    const lastOpenChangeReason = store.useState('lastOpenChangeReason');
    const rootId = store.useState('rootId');
    const floatingContext = store.useState('floatingRootContext');
    const floatingTreeRoot = store.useState('floatingTreeRoot');
    const closeDelay = store.useState('closeDelay');
    const hoverEnabled = store.useState('hoverEnabled');
    const disabled = store.useState('disabled');
    const openMethod = store.useState('openMethod');
    const activeTriggerId = store.useState('activeTriggerId');
    const listElement = store.useState('listElement');
    const [id, registerIdRef] = (0,_internals_resolveRenderedId_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useRenderedId */ .E)(componentProps, defaultFloatingId, setRenderedFloatingId);
    const ariaLabelledBy = (0,_internals_resolvePopupLabel_mjs__WEBPACK_IMPORTED_MODULE_7__/* .resolvePopupLabel */ .L)(componentProps, activeTriggerElement, activeTriggerId);
    // A dialog's menu can render under a submenu provider; only the actual submenu inherits it.
    const submenuRootContext = parent.type === 'menu' ? inheritedSubmenuRootContext : undefined;
    const isContextMenu = parent.type === 'context-menu';
    let initialFocus = initialFocusProp ?? parent.type !== 'menu';
    if (initialFocusProp === undefined && listElement && parent.type !== 'menu') {
        initialFocus = ()=>{
            // A keyboard or screen reader open highlights an item, which list navigation focuses.
            if (store.state.activeIndex !== null) {
                return false;
            }
            // The list holds the `menu` role, so a pointer open lands focus on it rather than on the
            // presentational popup.
            return listElement;
        };
    }
    (0,_internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useOpenChangeComplete */ .v)({
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (open) {
                store.context.onOpenChangeComplete?.(true);
            }
        }
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        function handleClose(event) {
            store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_9__/* .createChangeEventDetails */ .d)(event.reason, event.domEvent));
        }
        floatingTreeRoot.events.on('close', handleClose);
        return ()=>{
            floatingTreeRoot.events.off('close', handleClose);
        };
    }, [
        floatingTreeRoot.events,
        store
    ]);
    (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useHoverFloatingInteraction */ .a)(floatingContext, {
        enabled: hoverEnabled && !disabled && !isContextMenu && parent.type !== 'menubar',
        closeDelay
    });
    const setPopupElement = store.useStateSetter('popupElement');
    // Only a menu under a filter root bundles the handoff to a filterable parent. Whether one is
    // above is fixed for a mounted popup, so the hook doesn't change between renders.
    const useParentHandoff = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_filter_root_MenuFilterContext_mjs__WEBPACK_IMPORTED_MODULE_11__/* .MenuFilterImplContext */ .ls)?.useParentHandoff ?? useNoParentHandoff;
    const { parentVirtualFocusRef, handleFocus } = useParentHandoff(store, parent, open, virtualFocus);
    const state = {
        transitionStatus,
        side,
        align,
        open,
        nested: parent.type === 'menu',
        instant: instantType
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_12__/* .useRenderElement */ .o)('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            store.context.popupRef,
            setPopupElement,
            registerIdRef
        ],
        stateAttributesMapping: _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_13__/* .popupTransitionStateMapping */ .LM,
        props: [
            popupProps,
            {
                id,
                // A rendered `Menu.List` carries the `menu` semantics instead.
                ...listElement ? {
                    role: 'presentation'
                } : {
                    role: 'menu',
                    // `menu` is implicitly vertical, so only the non-default value needs to be
                    // rendered.
                    'aria-orientation': orientation === 'horizontal' ? 'horizontal' : undefined,
                    'aria-labelledby': ariaLabelledBy
                },
                onKeyDown (event) {
                    submenuRootContext?.onPopupKeyDown?.(event);
                    if (insideToolbar && _internals_composite_composite_mjs__WEBPACK_IMPORTED_MODULE_14__/* .COMPOSITE_KEYS */ .jF.has(event.key)) {
                        event.stopPropagation();
                    }
                },
                onFocus: handleFocus
            },
            (0,_internals_getDisabledMountTransitionStyles_mjs__WEBPACK_IMPORTED_MODULE_15__/* .getDisabledMountTransitionStyles */ .d)(transitionStatus),
            elementProps,
            {
                'data-rootownerid': rootId
            }
        ]
    });
    let returnFocus = parent.type === undefined || isContextMenu;
    if (activeTriggerElement || parent.type === 'menubar' && lastOpenChangeReason !== _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .outsidePress */ .Np) {
        returnFocus = true;
    }
    // Internal defaults rather than consumer targets, so focus that already moved is respected.
    const dynamicReturnFocus = submenuRootContext?.getReturnElement ?? parentVirtualFocusRef;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_17__/* .FloatingFocusManager */ .s, {
        context: floatingContext,
        openInteractionType: openMethod,
        modal: isContextMenu,
        disabled: !mounted,
        returnFocus: finalFocus ?? dynamicReturnFocus ?? returnFocus,
        explicitReturnFocus: finalFocus === undefined && dynamicReturnFocus ? false : undefined,
        initialFocus: initialFocus,
        restoreFocus: true,
        getInsideElements: parent.type === undefined ? ()=>[
                store.context.beforeTriggerFocusGuardRef.current
            ] : undefined,
        externalTree: parent.type !== 'menubar' ? floatingTreeRoot : undefined,
        previousFocusableElement: activeTriggerElement,
        nextFocusableElement: parent.type === undefined ? store.context.triggerFocusTargetRef : undefined,
        beforeContentFocusGuardRef: store.context.beforeContentFocusGuardRef,
        children: element
    });
});
if (false) {}
const NO_PARENT_HANDOFF = {
    parentVirtualFocusRef: undefined,
    handleFocus: undefined
};
function useNoParentHandoff() {
    return NO_PARENT_HANDOFF;
}
/**
 * A container for the menu items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuPopup = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function MenuPopup(props, forwardedRef) {
    const Popup = (0,_filter_root_MenuFilterContext_mjs__WEBPACK_IMPORTED_MODULE_11__/* .useMenuFilterImpl */ .DK)()?.Popup ?? MenuPopupPlain;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Popup, {
        ...props,
        ref: forwardedRef
    });
});
if (false) {}


/***/ }),

/***/ 11974:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ useTriggerFocusGuards)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47650);
/* harmony import */ var _floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(99226);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76175);
/* __next_internal_client_entry_do_not_use__ useTriggerFocusGuards auto */ 



/**
 * Minimal store interface required by the focus guard hook.
 * Both PopoverStore and MenuStore satisfy this interface.
 */ /**
 * Provides focus guard handlers for popup triggers (Popover, Menu).
 *
 * When the popup is open, invisible focus guard elements are placed before and after
 * the trigger. These handlers close the popup and move focus to the appropriate
 * tabbable element when the guards receive focus (i.e. when the user tabs out).
 */ function useTriggerFocusGuards(store, triggerElementRef) {
    function closeAndFocus(event, direction, positionerElement) {
        const guard = event.currentTarget;
        react_dom__WEBPACK_IMPORTED_MODULE_0__.flushSync(()=>{
            store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_1__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_2__/* .focusOut */ .Xn, event.nativeEvent, guard));
        });
        // The close callback may change the tab order. Resolve it after the flush, using
        // the trigger as the anchor if the guard unmounted, even when its tabIndex is -1.
        (0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getTabbableNearElement */ .Qe)(guard.isConnected ? guard : triggerElementRef.current, direction, positionerElement)?.focus();
    }
    function handlePreFocusGuardFocus(event) {
        closeAndFocus(event, -1, store.select('positionerElement'));
    }
    function handleFocusTargetFocus(event) {
        const positionerElement = store.select('positionerElement');
        if (positionerElement && (0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isOutsideEvent */ .Qp)(event, positionerElement)) {
            store.context.beforeContentFocusGuardRef.current?.focus();
        } else {
            closeAndFocus(event, 1, positionerElement);
        }
    }
    return {
        handlePreFocusGuardFocus,
        handleFocusTargetFocus
    };
}


/***/ }),

/***/ 20167:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ MenuFilterProviderContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ MenuFilterProviderContext auto */ 
/**
 * What `Menu.FilterProvider` hands to the root directly inside it: the filterable root
 * implementations (the provider is their only importer) and the filter props.
 */ /**
 * Non-null only directly below a provider. The root that consumes it resets it, so a plain
 * `Menu.SubmenuRoot` inside a filterable menu stays plain.
 */ const MenuFilterProviderContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (false) {}


/***/ }),

/***/ 27050:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ popupStoreSelectors),
/* harmony export */   r: () => (/* binding */ createInitialPopupStoreState)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8994);
/* harmony import */ var _floating_ui_react_components_FloatingRootStore_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1149);



/**
 * State common to all popup stores.
 */

function createInitialPopupStoreState(triggerElements, floatingId, nested = false) {
  return {
    open: false,
    openProp: undefined,
    mounted: false,
    transitionStatus: undefined,
    floatingRootContext: new _floating_ui_react_components_FloatingRootStore_mjs__WEBPACK_IMPORTED_MODULE_0__/* .FloatingRootStore */ .K({
      open: false,
      transitionStatus: undefined,
      floatingElement: null,
      referenceElement: null,
      triggerElements,
      floatingId,
      syncOnly: true,
      nested,
      onOpenChange: undefined
    }),
    floatingId,
    triggerCount: 0,
    preventUnmountingOnClose: false,
    payload: undefined,
    activeTriggerId: null,
    activeTriggerElement: null,
    openedWithoutTrigger: false,
    triggerIdProp: undefined,
    popupElement: null,
    positionerElement: null,
    activeTriggerProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0,
    inactiveTriggerProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0,
    popupProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0
  };
}
const activeTriggerIdSelector = state => state.triggerIdProp ?? state.activeTriggerId;
const openSelector = state => state.openProp ?? state.open;
const popupIdSelector = state => {
  const popupId = state.popupElement?.id ?? state.floatingId;
  return popupId || undefined;
};
function triggerOwnsOpenPopup(state, triggerId) {
  return triggerId !== undefined && openSelector(state) && activeTriggerIdSelector(state) === triggerId;
}
function triggerOwnsOpenPopupOrIsOnlyTrigger(state, triggerId) {
  if (triggerOwnsOpenPopup(state, triggerId)) {
    return true;
  }
  return triggerId !== undefined && openSelector(state) && activeTriggerIdSelector(state) == null && !state.openedWithoutTrigger && state.triggerCount === 1;
}
const popupStoreSelectors = {
  open: openSelector,
  mounted: state => state.mounted,
  // `open` is written synchronously on an open change; `mounted`/`transitionStatus` sync in a
  // layout effect. Match useTransitionStatus so a retained popup does not miss its starting phase.
  transitionStatus: state => openSelector(state) && !state.mounted ? 'starting' : state.transitionStatus,
  floatingRootContext: state => state.floatingRootContext,
  triggerCount: state => state.triggerCount,
  preventUnmountingOnClose: state => state.preventUnmountingOnClose,
  payload: state => state.payload,
  activeTriggerId: activeTriggerIdSelector,
  activeTriggerElement: state => state.mounted ? state.activeTriggerElement : null,
  popupId: popupIdSelector,
  /**
   * Whether the trigger with the given ID was used to open the popup.
   */
  isTriggerActive: (state, triggerId) => triggerId !== undefined && activeTriggerIdSelector(state) === triggerId,
  /**
   * Whether the popup is open and was activated by a trigger with the given ID.
   */
  isOpenedByTrigger: (state, triggerId) => triggerOwnsOpenPopup(state, triggerId),
  /**
   * Whether the popup is mounted and was activated by a trigger with the given ID.
   */
  isMountedByTrigger: (state, triggerId) => triggerId !== undefined && activeTriggerIdSelector(state) === triggerId && state.mounted,
  triggerProps: (state, isActive) => isActive ? state.activeTriggerProps : state.inactiveTriggerProps,
  /**
   * Popup id for the trigger that currently owns the open popup.
   */
  triggerPopupId: (state, triggerId) => triggerOwnsOpenPopupOrIsOnlyTrigger(state, triggerId) ? popupIdSelector(state) : undefined,
  popupProps: state => state.popupProps,
  popupElement: state => state.popupElement,
  positionerElement: state => state.positionerElement
};

/**
 * Store members a detached handle-backed trigger reads or invokes for trigger registration and data
 * forwarding. `set`/`update` are included only for trigger-count and trigger-data bookkeeping; on a
 * detached (inert) store they are intentionally no-ops, so a write through them is not guaranteed to
 * be durable. Component handle-store views Pick these from their concrete store (preserving its
 * context and selectors) and add any component-specific trigger-invoked members such as `setOpen`.
 */

/**
 * The subset of a popup store that trigger registration and data forwarding rely on. Narrow enough
 * that an inert store can be passed while detached.
 */

/***/ }),

/***/ 27053:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DK: () => (/* binding */ useMenuFilterImpl),
/* harmony export */   c4: () => (/* binding */ useMenuFilterItem),
/* harmony export */   ls: () => (/* binding */ MenuFilterImplContext)
/* harmony export */ });
/* unused harmony export useMenuFilterPart */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55218);
/* harmony import */ var _root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39048);
/* __next_internal_client_entry_do_not_use__ MenuFilterImplContext,useMenuFilterImpl,useMenuFilterPart,useMenuFilterItem auto */ 



/**
 * The filter implementation that a filterable root hands to the parts below it. Only the roots
 * `Menu.FilterProvider` renders import it, so a plain menu never bundles it. Parts whose whole
 * structure differs are swapped as components; parts that only register with the filter call an
 * injected hook, so a menu that never renders them doesn't bundle a second implementation.
 */ /** Static below a filter root: the implementation never changes, so subscribers never re-render. */ const MenuFilterImplContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (false) {}
/**
 * The filter implementation when the menu this part belongs to is filterable, otherwise `null`.
 * `virtualFocus` marks a filter root; a plain `Menu.Root` never sets it. The result is fixed for
 * a mounted part: a filter root can't appear above it without remounting it.
 */ function useMenuFilterImpl(scope = 'root') {
    const impl = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MenuFilterImplContext);
    const root = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .MenuRootContext */ .J);
    if (impl === null || root === undefined) {
        return null;
    }
    const filterable = scope === 'submenu-trigger' ? root.virtualFocus || root.parentVirtualFocus : root.virtualFocus;
    return filterable ? impl : null;
}
/**
 * Throws unless the menu this part renders in is filterable, naming the part and the provider.
 */ function useMenuFilterPart(part) {
    if (useMenuFilterImpl() === null) {
        throw new Error( false ? 0 : _formatErrorMessage(104, part));
    }
}
const UNFILTERED = {
    visible: true,
    ref: null
};
function useUnfilteredItem() {
    return UNFILTERED;
}
/**
 * Registers an item part with the filter of the menu it belongs to. A plain menu's items are
 * always visible.
 */ function useMenuFilterItem(props, forwardedRef, scope = 'root') {
    const impl = useMenuFilterImpl(scope);
    const useItem = (scope === 'submenu-trigger' ? impl?.useSubmenuTrigger : impl?.useItem) ?? useUnfilteredItem;
    const item = useItem({
        label: props.label,
        children: props.children,
        render: props.render
    });
    const ref = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_2__/* .useMergedRefs */ .a)(forwardedRef, item.ref);
    return {
        visible: item.visible,
        ref,
        props: item.props
    };
}


/***/ }),

/***/ 30030:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ Separator)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88401);
/* __next_internal_client_entry_do_not_use__ Separator auto */ 

/**
 * A separator element accessible to screen readers.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Separator](https://base-ui.com/react/components/separator)
 */ const Separator = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SeparatorComponent(componentProps, forwardedRef) {
    const { className, render, orientation = 'horizontal', style, ...elementProps } = componentProps;
    const state = {
        orientation
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useRenderElement */ .o)('div', componentProps, {
        state,
        ref: forwardedRef,
        props: [
            {
                role: 'separator',
                'aria-orientation': orientation
            },
            elementProps
        ]
    });
    return element;
});
if (false) {}


/***/ }),

/***/ 33018:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ useMenuItem),
/* harmony export */   z: () => (/* binding */ REGULAR_ITEM)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55218);
/* harmony import */ var _internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42176);
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40253);
/* harmony import */ var _useMenuItemCommonProps_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89691);
/* __next_internal_client_entry_do_not_use__ REGULAR_ITEM,useMenuItem auto */ 




const REGULAR_ITEM = {
    type: 'regular-item'
};
function useMenuItem(params) {
    const { closeOnClick, disabled, highlighted, id, store, typingRef = store.context.typingRef, nativeButton, itemMetadata, nodeId } = params;
    const itemRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const { getButtonProps, buttonRef } = (0,_internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useButton */ .s)({
        disabled,
        focusableWhenDisabled: true,
        native: nativeButton,
        composite: true
    });
    const commonProps = (0,_useMenuItemCommonProps_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useMenuItemCommonProps */ .F)({
        closeOnClick,
        highlighted,
        id,
        nodeId,
        store,
        typingRef,
        itemRef,
        itemMetadata
    });
    const getItemProps = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((externalProps)=>{
        return (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .mergeProps */ .v6)(commonProps, {
            onMouseEnter (event) {
                if (itemMetadata.type !== 'submenu-trigger') {
                    return;
                }
                itemMetadata.setActive(event.nativeEvent);
            }
        }, externalProps, getButtonProps);
    }, [
        commonProps,
        getButtonProps,
        itemMetadata
    ]);
    const mergedRef = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_4__/* .useMergedRefs */ .a)(itemRef, buttonRef);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            getItemProps,
            itemRef: mergedRef
        }), [
        getItemProps,
        mergedRef
    ]);
}


/***/ }),

/***/ 33417:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ MenuTrigger)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(64951);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(81456);
/* harmony import */ var _base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27243);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(8994);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(80120);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(66610);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(7118);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(9569);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(77805);
/* harmony import */ var _floating_ui_react_components_FloatingTreeStore_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(54285);
/* harmony import */ var _floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(93093);
/* harmony import */ var _root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39048);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(84052);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(88401);
/* harmony import */ var _internals_use_button_useButton_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(42176);
/* harmony import */ var _utils_getPseudoElementBounds_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(8272);
/* harmony import */ var _internals_composite_item_CompositeItem_mjs__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(61134);
/* harmony import */ var _internals_composite_root_CompositeRootContext_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(70481);
/* harmony import */ var _utils_findRootOwnerId_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(59236);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(95327);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(26713);
/* harmony import */ var _utils_popups_useTriggerFocusGuards_mjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(11974);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62955);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(76175);
/* harmony import */ var _utils_useMixedToggleClickHandler_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(34111);
/* harmony import */ var _menubar_MenubarContext_mjs__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(58453);
/* harmony import */ var _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(69679);
/* harmony import */ var _utils_FocusGuard_mjs__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(6522);
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(40253);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ MenuTrigger auto */ 



























/**
 * A button that opens the menu.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ 
const MenuTrigger = (0,_base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_2__/* .fastComponentRef */ .nk)(function MenuTrigger(componentProps, forwardedRef) {
    const { render, className, style, disabled: disabledProp = false, nativeButton = true, id: idProp, openOnHover: openOnHoverProp, delay = 100, closeDelay = 0, handle, payload, ...elementProps } = componentProps;
    const rootContext = (0,_root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useMenuRootContext */ .Y)(true);
    const handleStore = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .usePopupHandleStore */ .f)(handle);
    const store = handleStore ?? rootContext?.store;
    if (!store) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(85));
    }
    const thisTriggerId = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useBaseUiId */ .e)(idProp);
    const isTriggerActive = store.useState('isTriggerActive', thisTriggerId);
    const floatingRootContext = store.useState('floatingRootContext');
    const isOpenedByThisTrigger = store.useState('isOpenedByTrigger', thisTriggerId);
    const controlsId = store.useState('triggerControlsId', thisTriggerId);
    const triggerElementRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const parent = useMenuParent();
    const compositeRootContext = (0,_internals_composite_root_CompositeRootContext_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useCompositeRootContext */ .G)(true);
    const floatingTreeRootFromContext = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useFloatingTree */ .cq)();
    const floatingTreeRoot = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        return floatingTreeRootFromContext ?? new _floating_ui_react_components_FloatingTreeStore_mjs__WEBPACK_IMPORTED_MODULE_9__/* .FloatingTreeStore */ .k();
    }, [
        floatingTreeRootFromContext
    ]);
    const floatingNodeId = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useFloatingNodeId */ .fI)(floatingTreeRoot);
    const floatingParentNodeId = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useFloatingParentNodeId */ .R1)();
    const { registerTrigger, isMountedByThisTrigger } = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useTriggerDataForwarding */ .L_)(thisTriggerId, triggerElementRef, store, {
        payload,
        closeDelay,
        parent,
        floatingTreeRoot,
        floatingNodeId,
        floatingParentNodeId,
        keyboardEventRelay: compositeRootContext?.relayKeyboardEvent
    });
    const isInMenubar = parent.type === 'menubar';
    const rootDisabled = store.useState('disabled');
    const disabled = disabledProp || rootDisabled || isInMenubar && parent.context.disabled;
    const { getButtonProps, buttonRef } = (0,_internals_use_button_useButton_mjs__WEBPACK_IMPORTED_MODULE_11__/* .useButton */ .s)({
        disabled,
        native: nativeButton
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!isOpenedByThisTrigger && parent.type === undefined) {
            store.context.allowMouseUpTriggerRef.current = false;
        }
    }, [
        store,
        isOpenedByThisTrigger,
        parent.type
    ]);
    const triggerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const allowMouseUpTriggerTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__/* .useTimeout */ .Z)();
    const handleDocumentMouseUp = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_13__/* .useStableCallback */ .K)((mouseEvent)=>{
        if (!triggerRef.current) {
            return;
        }
        allowMouseUpTriggerTimeout.clear();
        store.context.allowMouseUpTriggerRef.current = false;
        const mouseUpTarget = mouseEvent.target;
        if ((0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_14__/* .contains */ .gR)(triggerRef.current, mouseUpTarget) || (0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_14__/* .contains */ .gR)(store.select('positionerElement'), mouseUpTarget) || mouseUpTarget === triggerRef.current) {
            return;
        }
        if (mouseUpTarget != null && (0,_utils_findRootOwnerId_mjs__WEBPACK_IMPORTED_MODULE_15__/* .findRootOwnerId */ .Q)(mouseUpTarget) === store.select('rootId')) {
            return;
        }
        if ((0,_utils_getPseudoElementBounds_mjs__WEBPACK_IMPORTED_MODULE_16__/* .isMouseWithinBounds */ .U)(mouseEvent, triggerRef.current)) {
            return;
        }
        floatingTreeRoot.events.emit('close', {
            domEvent: mouseEvent,
            reason: _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_17__/* .cancelOpen */ .LO
        });
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_18__/* .ownerDocument */ .R)(triggerRef.current);
        if (isOpenedByThisTrigger && store.select('lastOpenChangeReason') === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_17__/* .triggerHover */ .N7) {
            doc.addEventListener('mouseup', handleDocumentMouseUp, {
                once: true
            });
            return ()=>{
                doc.removeEventListener('mouseup', handleDocumentMouseUp);
            };
        }
        return undefined;
    }, [
        isOpenedByThisTrigger,
        handleDocumentMouseUp,
        store
    ]);
    const parentMenubarHasSubmenuOpen = isInMenubar && parent.context.hasSubmenuOpen;
    const openOnHover = openOnHoverProp ?? parentMenubarHasSubmenuOpen;
    const hoverProps = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_19__/* .useHoverReferenceInteraction */ .j)(floatingRootContext, {
        enabled: openOnHover && !disabled && (!isInMenubar || parentMenubarHasSubmenuOpen && !isMountedByThisTrigger),
        handleClose: (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_20__/* .safePolygon */ .i)({
            blockPointerEvents: !isInMenubar
        }),
        mouseOnly: true,
        move: false,
        restMs: parent.type === undefined ? delay : undefined,
        delay: {
            close: closeDelay
        },
        triggerElementRef,
        externalTree: floatingTreeRoot,
        isActiveTrigger: isTriggerActive,
        isClosing: ()=>store.select('transitionStatus') === 'ending'
    });
    // Whether to ignore clicks to open the menu.
    // `lastOpenChangeReason` doesn't need to be reactive here, as we need to run this
    // only when `isOpenedByThisTrigger` changes.
    const stickIfOpen = useStickIfOpen(isOpenedByThisTrigger, store.select('lastOpenChangeReason'));
    const click = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_21__/* .useClick */ .k)(floatingRootContext, {
        enabled: !disabled,
        event: isOpenedByThisTrigger && isInMenubar ? 'click' : 'mousedown',
        toggle: true,
        ignoreMouse: false,
        stickIfOpen: parent.type === undefined ? stickIfOpen : false
    });
    const focus = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_22__/* .useFocus */ .i)(floatingRootContext, {
        enabled: !disabled && parentMenubarHasSubmenuOpen
    });
    const mixedToggleHandlers = (0,_utils_useMixedToggleClickHandler_mjs__WEBPACK_IMPORTED_MODULE_23__/* .useMixedToggleClickHandler */ .d)({
        open: isOpenedByThisTrigger,
        enabled: isInMenubar,
        mouseDownAction: 'open'
    });
    const localInteractionProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>(0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_24__/* .mergeProps */ .v6)(focus.reference, click.reference), [
        focus.reference,
        click.reference
    ]);
    const rootTriggerProps = store.useState('triggerProps', isMountedByThisTrigger);
    // A filterable menu keeps real focus inside its popup and publishes what its trigger needs.
    const filterTriggerProps = store.useState('filterTriggerProps');
    const { handlePreFocusGuardFocus, handleFocusTargetFocus } = (0,_utils_popups_useTriggerFocusGuards_mjs__WEBPACK_IMPORTED_MODULE_25__/* .useTriggerFocusGuards */ .a)(store, triggerElementRef);
    const state = {
        disabled,
        open: isOpenedByThisTrigger
    };
    const ref = [
        triggerRef,
        forwardedRef,
        buttonRef,
        registerTrigger,
        triggerElementRef
    ];
    const props = [
        localInteractionProps,
        hoverProps ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_26__/* .EMPTY_OBJECT */ .t0,
        rootTriggerProps,
        {
            'aria-haspopup': 'menu',
            'aria-controls': controlsId,
            id: thisTriggerId,
            onMouseDown: (event)=>{
                if (store.select('open')) {
                    return;
                }
                // mousedown -> mouseup on menu item should not trigger it within 200ms.
                allowMouseUpTriggerTimeout.start(200, ()=>{
                    store.context.allowMouseUpTriggerRef.current = true;
                });
                const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_18__/* .ownerDocument */ .R)(event.currentTarget);
                doc.addEventListener('mouseup', handleDocumentMouseUp, {
                    once: true
                });
            }
        },
        filterTriggerProps,
        isInMenubar ? {
            role: 'menuitem'
        } : {},
        mixedToggleHandlers,
        elementProps,
        getButtonProps
    ];
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_27__/* .useRenderElement */ .o)('button', componentProps, {
        enabled: !isInMenubar,
        stateAttributesMapping: _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_28__/* .pressableTriggerOpenStateMapping */ .jL,
        state,
        ref,
        props
    });
    if (isInMenubar) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_internals_composite_item_CompositeItem_mjs__WEBPACK_IMPORTED_MODULE_29__/* .CompositeItem */ .l, {
            tag: "button",
            render: render,
            className: className,
            style: style,
            state: state,
            refs: ref,
            props: props,
            stateAttributesMapping: _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_28__/* .pressableTriggerOpenStateMapping */ .jL
        });
    }
    // A fragment with key is required to ensure that the `element` is mounted to the same DOM node
    // regardless of whether the focus guards are rendered or not.
    if (isOpenedByThisTrigger) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_FocusGuard_mjs__WEBPACK_IMPORTED_MODULE_30__/* .FocusGuard */ .U, {
                    ref: store.context.beforeTriggerFocusGuardRef,
                    onFocus: handlePreFocusGuardFocus
                }, `${thisTriggerId}-pre-focus-guard`),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: element
                }, thisTriggerId),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_FocusGuard_mjs__WEBPACK_IMPORTED_MODULE_30__/* .FocusGuard */ .U, {
                    ref: store.context.triggerFocusTargetRef,
                    onFocus: handleFocusTargetFocus
                }, `${thisTriggerId}-post-focus-guard`)
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: element
    }, thisTriggerId);
});
if (false) {}
/**
 * Determines whether to ignore clicks after a hover-open.
 */ function useStickIfOpen(open, openReason) {
    const stickIfOpenTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__/* .useTimeout */ .Z)();
    const [stickIfOpen, setStickIfOpen] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_31__/* .useIsoLayoutEffect */ .g)(()=>{
        if (open && openReason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_17__/* .triggerHover */ .N7) {
            // Only allow "patient" clicks to close the menu if it's open.
            // If they clicked within 500ms of the menu opening, keep it open.
            setStickIfOpen(true);
            stickIfOpenTimeout.start(_internals_constants_mjs__WEBPACK_IMPORTED_MODULE_32__/* .PATIENT_CLICK_THRESHOLD */ .X3, ()=>{
                setStickIfOpen(false);
            });
        } else if (!open) {
            stickIfOpenTimeout.clear();
            setStickIfOpen(false);
        }
    }, [
        open,
        openReason,
        stickIfOpenTimeout
    ]);
    return stickIfOpen;
}
function useMenuParent() {
    const menubarContext = (0,_menubar_MenubarContext_mjs__WEBPACK_IMPORTED_MODULE_33__/* .useMenubarContext */ .t)(true);
    const parent = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        if (menubarContext) {
            return {
                type: 'menubar',
                context: menubarContext
            };
        }
        return {
            type: undefined
        };
    }, [
        menubarContext
    ]);
    return parent;
}


/***/ }),

/***/ 34111:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ useMixedToggleClickHandler)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(81456);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8994);
/* __next_internal_client_entry_do_not_use__ useMixedToggleClickHandler auto */ 


/**
 * Returns `click` and `mousedown` handlers that fix the behavior of triggers of popups that are toggled by different events.
 * For example, a button that opens a popup on mousedown and closes it on click.
 * This hook prevents the popup from closing immediately after the mouse button is released.
 */ function useMixedToggleClickHandler(params) {
    const { enabled = true, mouseDownAction, open } = params;
    const ignoreClickRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        if (!enabled) {
            return _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0;
        }
        return {
            onMouseDown: (event)=>{
                if (mouseDownAction === 'open' && !open || mouseDownAction === 'close' && open) {
                    ignoreClickRef.current = true;
                    (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .ownerDocument */ .R)(event.currentTarget).addEventListener('click', ()=>{
                        ignoreClickRef.current = false;
                    }, {
                        once: true
                    });
                }
            },
            onClick: (event)=>{
                if (ignoreClickRef.current) {
                    ignoreClickRef.current = false;
                    event.preventBaseUIHandler();
                }
            }
        };
    }, [
        enabled,
        mouseDownAction,
        open
    ]);
}


/***/ }),

/***/ 35876:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ resolvePopupLabel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88401);


function resolvePopupLabel(props, activeTriggerElement, activeTriggerId) {
  const render = (0,_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_1__/* .unwrapLazyRenderProp */ .x)(props.render);
  const renderedElementProps = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(render) ? render.props : undefined;
  const ariaLabel = props['aria-label'] ?? renderedElementProps?.['aria-label'];
  let ariaLabelledBy = props['aria-labelledby'] ?? renderedElementProps?.['aria-labelledby'];
  if (ariaLabelledBy == null && !ariaLabel) {
    // Prefer the element's live id: a `render` element's own id wins over the registered one.
    ariaLabelledBy = activeTriggerElement ? activeTriggerElement.id || undefined : activeTriggerId || undefined;
  }
  return ariaLabelledBy;
}

/***/ }),

/***/ 37677:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ useMenuSubmenuRootContext)
/* harmony export */ });
/* unused harmony export MenuSubmenuRootContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ MenuSubmenuRootContext,useMenuSubmenuRootContext auto */ 
const MenuSubmenuRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useMenuSubmenuRootContext() {
    return react__WEBPACK_IMPORTED_MODULE_0__.useContext(MenuSubmenuRootContext);
}


/***/ }),

/***/ 39048:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ MenuRootContext),
/* harmony export */   Y: () => (/* binding */ useMenuRootContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ MenuRootContext,useMenuRootContext auto */ 

const MenuRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useMenuRootContext(optional) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MenuRootContext);
    if (context === undefined && !optional) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(36));
    }
    return context;
}


/***/ }),

/***/ 39186:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ isKeyboardClick),
/* harmony export */   u: () => (/* binding */ isKeyboardOpen)
/* harmony export */ });
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(76175);


/**
 * Keyboard and assistive-technology activations produce `detail === 0` clicks; mouse-gesture
 * clicks (including the synthesized drag-release click from `useMenuItemCommonProps`) carry
 * `detail >= 1`.
 */
function isKeyboardClick(reason, event) {
  return (reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_0__/* .triggerPress */ .Ui || reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_0__/* .itemPress */ .Bo) && event?.detail === 0;
}

/**
 * Whether a menu opens from the keyboard, which lands focus in the popup. Arrow keys report
 * `list-navigation`; Enter and Space dispatch a click carrying no pointer detail.
 */
function isKeyboardOpen(reason, event) {
  return reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_0__/* .listNavigation */ .Dq || isKeyboardClick(reason, event);
}

/***/ }),

/***/ 41049:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ MenuStore)
/* harmony export */ });
/* unused harmony export createNullMenuStore */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(98419);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8994);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15495);
/* harmony import */ var _floating_ui_react_components_FloatingTreeStore_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(54285);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27050);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52313);







const selectors = {
  ..._utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .popupStoreSelectors */ .o,
  disabled: state => state.parent.type === 'menubar' ? state.parent.context.disabled || state.disabled : state.disabled,
  modal: state => (state.parent.type === undefined || state.parent.type === 'context-menu') && (state.modal ?? true),
  openMethod: state => state.openMethod,
  keyboardOpen: state => state.keyboardOpen,
  allowMouseEnter: state => state.allowMouseEnter,
  highlightItemOnHover: state => state.highlightItemOnHover,
  parent: state => state.parent,
  rootId: state => {
    if (state.parent.type === 'menu') {
      return state.parent.store.select('rootId');
    }
    return state.parent.type !== undefined ? state.parent.context.rootId : state.rootId;
  },
  activeIndex: state => state.activeIndex,
  listElement: state => state.listElement,
  /** The trigger's `aria-controls`: the list when one holds the `menu` role, else the popup. */
  triggerControlsId: (state, triggerId) => {
    const popupId = _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .popupStoreSelectors */ .o.triggerPopupId(state, triggerId);
    return popupId ? state.listElement?.id || popupId : undefined;
  },
  filterTriggerProps: state => state.filterTriggerProps,
  inputProps: state => state.inputProps,
  // `aria-selected` is invalid on `menuitem`, but Safari VoiceOver needs it for arrow-key
  // navigation. Limit it to WebKit while the input has focus so normal VoiceOver navigation
  // does not encounter the invalid attribute.
  webkitAriaSelected: (state, highlighted) => _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_2__/* .webkit */ .Fp && state.inputFocused && highlighted ? true : undefined,
  highlightedItemId: state => state.highlightedItem?.id || undefined,
  isActive: (state, itemIndex) => state.activeIndex === itemIndex,
  hoverEnabled: state => state.hoverEnabled,
  // `trigger-change` describes a popup moving between triggers, which only has
  // meaning while it is open. Dropping it once closed keeps a late or stale
  // restoration from marking a closing popup instant and skipping its exit
  // transition, including on close paths that never reach `setOpen` — a
  // controlled consumer committing `open={false}` goes straight through the prop.
  instantType: state => state.instantType === 'trigger-change' && !_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .popupStoreSelectors */ .o.open(state) ? undefined : state.instantType,
  lastOpenChangeReason: state => state.openChangeReason,
  floatingTreeRoot: state => {
    if (state.parent.type === 'menu') {
      return state.parent.store.select('floatingTreeRoot');
    }
    return state.floatingTreeRoot;
  },
  floatingNodeId: state => state.floatingNodeId,
  floatingParentNodeId: state => state.floatingParentNodeId,
  itemProps: state => state.itemProps,
  closeDelay: state => state.closeDelay,
  adaptiveOrigin: state => state.adaptiveOrigin,
  keyboardEventRelay: state => {
    if (state.keyboardEventRelay) {
      return state.keyboardEventRelay;
    }
    if (state.parent.type === 'menu') {
      return state.parent.store.select('keyboardEventRelay');
    }
    return undefined;
  }
};

/**
 * The store view that detached handle-backed triggers read from. Both the real `MenuStore` and the
 * inert fallback store satisfy it, so a trigger can read from whichever store the handle currently
 * exposes. Narrowed to the members a trigger actually uses — the trigger-data members plus `setOpen`
 * (called by the focus guards) — so the exposed surface can't bypass the open-change pipeline; on
 * the detached fallback store every one of these mutations is a no-op.
 */

class MenuStore extends _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_3__/* .ReactStore */ .H {
  constructor(initialState, floatingId, nested = false) {
    const triggerElements = new _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .PopupTriggerMap */ .Z();
    const state = createInitialState(triggerElements, floatingId, nested, initialState);
    super(state, createInitialContext(triggerElements), selectors);

    // Share the mouse-up trigger ref of the parent menu, if any. This observes the store's own
    // state, so the subscription lives exactly as long as the store and needs no cleanup.
    void this.observe('parent', parent => {
      if (parent.type === 'menu') {
        this.context.allowMouseUpTriggerRef = parent.store.context.allowMouseUpTriggerRef;
      } else if (parent.type !== undefined) {
        this.context.allowMouseUpTriggerRef = parent.context.allowMouseUpTriggerRef;
      }
    });
  }

  /**
   * Propagates changes of the parent menu's shared tree state to this store's subscribers.
   * The owning `Menu.Root` calls it from an effect so the parent store subscription is released
   * when the submenu unmounts.
   * @returns A function that removes the parent store subscription.
   */
  subscribeToParentMenu() {
    const parent = this.state.parent;
    if (parent.type !== 'menu') {
      return undefined;
    }
    let rootId = parent.store.select('rootId');
    let floatingTreeRoot = parent.store.select('floatingTreeRoot');
    let keyboardEventRelay = parent.store.select('keyboardEventRelay');
    return parent.store.subscribe(() => {
      const nextRootId = parent.store.select('rootId');
      const nextFloatingTreeRoot = parent.store.select('floatingTreeRoot');
      const nextKeyboardEventRelay = parent.store.select('keyboardEventRelay');
      if (rootId === nextRootId && floatingTreeRoot === nextFloatingTreeRoot && keyboardEventRelay === nextKeyboardEventRelay) {
        return;
      }
      rootId = nextRootId;
      floatingTreeRoot = nextFloatingTreeRoot;
      keyboardEventRelay = nextKeyboardEventRelay;
      this.notifyAll();
    });
  }
  setOpen(open, eventDetails) {
    this.state.floatingRootContext.context.events.emit('setOpen', {
      open,
      eventDetails
    });
  }
  setActiveIndex(activeIndex, reason, event) {
    // Only a write that changes the index is reported. Tagging a no-op, or a write back to the
    // reported item before the change commits, would let a later registry-driven re-emit report
    // this reason instead of `none`.
    if (this.state.activeIndex !== activeIndex) {
      const item = activeIndex === null ? undefined : this.context.itemDomElements.current[activeIndex];
      const isWriteBack = item === this.context.reportedItem;
      this.context.highlightReason = isWriteBack ? 'none' : reason;
      this.context.highlightEvent = isWriteBack ? undefined : event;
    }
    this.set('activeIndex', activeIndex);
  }
  highlightItem(element, reason, event) {
    const index = this.context.itemDomElements.current.indexOf(element);
    if (index > -1) {
      this.setActiveIndex(index, reason, event);
    }
  }
}

/**
 * Creates the inert fallback store used by detached handle-backed triggers while no `Menu.Root` is
 * attached. It preserves a menu-specific trigger registry in context so detached triggers can
 * register before migrating to the live root store. `setOpen` is a no-op (matching the inert
 * reads/writes of `NullStore`), so a trigger can hand the store to focus-guard helpers that expect
 * `setOpen` without it ever taking effect while detached.
 */
function createNullMenuStore() {
  const triggerElements = new PopupTriggerMap();
  const store = new NullStore(Object.freeze(createInitialState(triggerElements)), Object.freeze(createInitialContext(triggerElements)), selectors);
  return Object.assign(store, {
    setOpen: NOOP
  });
}
function createInitialContext(triggerElements) {
  return {
    positionerRef: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef(),
    popupRef: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef(),
    typingRef: {
      current: false
    },
    itemDomElements: {
      current: []
    },
    itemLabels: {
      current: []
    },
    highlightReason: 'none',
    highlightEvent: undefined,
    reportedItem: undefined,
    allowMouseUpTriggerRef: {
      current: false
    },
    virtualFocusRef: undefined,
    triggerFocusTargetRef: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef(),
    beforeTriggerFocusGuardRef: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef(),
    beforeContentFocusGuardRef: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef(),
    onOpenChangeComplete: undefined,
    triggerElements
  };
}
function createInitialState(triggerElements, floatingId, nested = false, initialState) {
  return {
    ...(0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .createInitialPopupStoreState */ .r)(triggerElements, floatingId, nested),
    disabled: false,
    modal: true,
    openMethod: null,
    keyboardOpen: false,
    allowMouseEnter: false,
    highlightItemOnHover: true,
    parent: {
      type: undefined
    },
    rootId: undefined,
    activeIndex: null,
    listElement: null,
    filterTriggerProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__/* .EMPTY_OBJECT */ .t0,
    inputProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__/* .EMPTY_OBJECT */ .t0,
    inputFocused: false,
    highlightedItem: undefined,
    hoverEnabled: true,
    instantType: undefined,
    openChangeReason: null,
    floatingTreeRoot: new _floating_ui_react_components_FloatingTreeStore_mjs__WEBPACK_IMPORTED_MODULE_6__/* .FloatingTreeStore */ .k(),
    floatingNodeId: undefined,
    floatingParentNodeId: null,
    itemProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__/* .EMPTY_OBJECT */ .t0,
    keyboardEventRelay: undefined,
    closeDelay: 0,
    adaptiveOrigin: undefined,
    ...initialState
  };
}

/***/ }),

/***/ 41657:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D8: () => (/* binding */ applySafePolygonPointerEventsMutation),
/* harmony export */   GH: () => (/* binding */ clearSafePolygonPointerEventsMutation),
/* harmony export */   uu: () => (/* binding */ useHoverInteractionSharedState)
/* harmony export */ });
/* unused harmony export HoverInteraction */
/* harmony import */ var _base_ui_utils_useOnMount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92592);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14187);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64951);
/* __next_internal_client_entry_do_not_use__ isInteractiveElement,HoverInteraction,clearSafePolygonPointerEventsMutation,applySafePolygonPointerEventsMutation,useHoverInteractionSharedState auto */ 




class HoverInteraction {
    static create() {
        return new HoverInteraction();
    }
    constructor(){
        this.pointerType = undefined;
        this.interactedInside = false;
        this.handler = undefined;
        this.blockMouseMove = true;
        this.performedPointerEventsMutation = false;
        this.pointerEventsScopeElement = null;
        this.pointerEventsReferenceElement = null;
        this.pointerEventsFloatingElement = null;
        this.restTimeoutPending = false;
        this.openChangeTimeout = new _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_0__/* .Timeout */ .E();
        this.restTimeout = new _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_0__/* .Timeout */ .E();
        this.handleCloseOptions = undefined;
        this.dispose = ()=>{
            this.openChangeTimeout.clear();
            this.restTimeout.clear();
        };
        this.disposeEffect = ()=>{
            return this.dispose;
        };
    }
}
const pointerEventsMutationOwnerByScopeElement = new WeakMap();
function clearSafePolygonPointerEventsMutation(instance) {
    if (!instance.performedPointerEventsMutation) {
        return;
    }
    const scopeElement = instance.pointerEventsScopeElement;
    if (scopeElement && pointerEventsMutationOwnerByScopeElement.get(scopeElement) === instance) {
        instance.pointerEventsScopeElement?.style.removeProperty('pointer-events');
        instance.pointerEventsReferenceElement?.style.removeProperty('pointer-events');
        instance.pointerEventsFloatingElement?.style.removeProperty('pointer-events');
        pointerEventsMutationOwnerByScopeElement.delete(scopeElement);
    }
    instance.performedPointerEventsMutation = false;
    instance.pointerEventsScopeElement = null;
    instance.pointerEventsReferenceElement = null;
    instance.pointerEventsFloatingElement = null;
}
function applySafePolygonPointerEventsMutation(instance, options) {
    const { scopeElement, referenceElement, floatingElement } = options;
    const existingOwner = pointerEventsMutationOwnerByScopeElement.get(scopeElement);
    if (existingOwner && existingOwner !== instance) {
        clearSafePolygonPointerEventsMutation(existingOwner);
    }
    clearSafePolygonPointerEventsMutation(instance);
    instance.performedPointerEventsMutation = true;
    instance.pointerEventsScopeElement = scopeElement;
    instance.pointerEventsReferenceElement = referenceElement;
    instance.pointerEventsFloatingElement = floatingElement;
    pointerEventsMutationOwnerByScopeElement.set(scopeElement, instance);
    scopeElement.style.pointerEvents = 'none';
    referenceElement.style.pointerEvents = 'auto';
    floatingElement.style.pointerEvents = 'auto';
}
function useHoverInteractionSharedState(store) {
    const data = store.context.dataRef.current;
    const instance = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_1__/* .useRefWithInit */ .j)(()=>data.hoverInteractionState ?? HoverInteraction.create()).current;
    if (!data.hoverInteractionState) {
        data.hoverInteractionState = instance;
    }
    (0,_base_ui_utils_useOnMount__WEBPACK_IMPORTED_MODULE_2__/* .useOnMount */ .y)(data.hoverInteractionState.disposeEffect);
    return data.hoverInteractionState;
}


/***/ }),

/***/ 41948:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ MenuPortalContext),
/* harmony export */   y: () => (/* binding */ useMenuPortalContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ MenuPortalContext,useMenuPortalContext auto */ 

const MenuPortalContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useMenuPortalContext() {
    const value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MenuPortalContext);
    if (value === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(32));
    }
    return value;
}


/***/ }),

/***/ 43981:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ MenuGroup)
/* harmony export */ });
/* unused harmony export MenuGroupPlain */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _filter_root_MenuFilterContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27053);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88401);
/* harmony import */ var _MenuGroupContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83780);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ MenuGroupPlain,MenuGroup auto */ 



/**
 * @internal
 */ 
const MenuGroupPlain = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function MenuGroupPlain(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps;
    const [labelId, setLabelId] = react__WEBPACK_IMPORTED_MODULE_0__.useState(undefined);
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)('div', componentProps, {
        ref: forwardedRef,
        props: {
            role: 'group',
            'aria-labelledby': labelId,
            ...elementProps
        }
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuGroupContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .MenuGroupContext */ .c.Provider, {
        value: setLabelId,
        children: element
    });
});
/**
 * Groups related menu items with the corresponding label.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ if (false) {}
const MenuGroup = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function MenuGroup(props, forwardedRef) {
    const Group = (0,_filter_root_MenuFilterContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useMenuFilterImpl */ .DK)()?.Group ?? MenuGroupPlain;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Group, {
        ...props,
        ref: forwardedRef
    });
});
if (false) {}


/***/ }),

/***/ 46104:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ useTriggerSwitchTransition)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66652);
/* harmony import */ var _useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73070);
/* __next_internal_client_entry_do_not_use__ useTriggerSwitchTransition auto */ 


/**
 * Popover and Menu declare different `instantType` unions, so only the members
 * this hook touches are typed.
 */ /**
 * Lets the positioner animate while a popup moves between detached triggers.
 *
 * The positioner is normally marked instant, so a hand-off from one trigger to
 * another would teleport. Clearing `instantType` for the duration of the move
 * lets it transition, and `trigger-change` is restored once the move finishes.
 *
 * The restoration is deferred until the move's animations finish, so it can
 * outlive the move that scheduled it. The trigger element is retained through
 * the exit transition, so a close alone does not change `domReference` and
 * nothing would otherwise re-run this effect to abort it — a popup that closes
 * and reopens on the same trigger mid-exit would inherit the stale callback and
 * lose its own transition. Closing therefore cancels the pending restoration
 * explicitly.
 *
 * Applying `trigger-change` to a closed popup is prevented separately, by the
 * stores' `instantType` selector, since a controlled `open={false}` commit
 * reaches the popup without passing through `setOpen`.
 */ function useTriggerSwitchTransition(parameters) {
    const { store, domReference, positionerElement, open } = parameters;
    const previousTriggerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const pendingSwitchRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const runOnceAnimationsFinish = (0,_useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useAnimationsFinished */ .V)(positionerElement);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        if (open) {
            return;
        }
        pendingSwitchRef.current?.abort();
        pendingSwitchRef.current = null;
        // `trigger-change` belongs to the open cycle that scheduled it. The selector
        // stops a closed popup from rendering it, but the value has to be dropped
        // too: a controlled reopen changes only `openProp`, so neither this effect
        // nor `setOpen` would run again to replace it, and the selector would start
        // exposing the old value against the new cycle.
        if (store.state.instantType === 'trigger-change') {
            store.set('instantType', undefined);
        }
    }, [
        open,
        store
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        const currentTrigger = domReference;
        const previousTrigger = previousTriggerRef.current;
        if (currentTrigger) {
            previousTriggerRef.current = currentTrigger;
        }
        if (!previousTrigger || !currentTrigger || currentTrigger === previousTrigger) {
            return undefined;
        }
        // The trigger element can also change while the popup is closing, when a
        // trigger is replaced by a new element. There is no move to animate, and
        // the cancellation effect above has already run for this commit, so a
        // restoration scheduled here would survive into whatever opens next.
        if (!store.select('open')) {
            return undefined;
        }
        store.set('instantType', undefined);
        const abortController = new AbortController();
        pendingSwitchRef.current = abortController;
        runOnceAnimationsFinish(()=>{
            // The abort above covers a committed close, but the animations can finish
            // in the same frame the close commits. Writing `trigger-change` then would
            // leave stale state behind for the next open to inherit.
            if (store.select('open')) {
                store.set('instantType', 'trigger-change');
            }
        }, abortController.signal);
        return ()=>{
            abortController.abort();
        };
    }, [
        domReference,
        runOnceAnimationsFinish,
        store
    ]);
}


/***/ }),

/***/ 56385:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ MenuPositioner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_inertValue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(96354);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(64951);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(80120);
/* harmony import */ var _MenuPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2728);
/* harmony import */ var _root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39048);
/* harmony import */ var _internals_useAnchorPositioning_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(99779);
/* harmony import */ var _internals_composite_list_CompositeList_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(67894);
/* harmony import */ var _utils_InternalBackdrop_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(53976);
/* harmony import */ var _portal_MenuPortalContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41948);
/* harmony import */ var _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69679);
/* harmony import */ var _context_menu_root_ContextMenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(98339);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(76175);
/* harmony import */ var _internals_useTriggerSwitchTransition_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(46104);
/* harmony import */ var _utils_usePositioner_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(62424);
/* harmony import */ var _utils_useAnchoredPopupScrollLock_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(15702);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ MenuPositioner auto */ 
















/**
 * Positions the menu popup against the trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ 
const MenuPositioner = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function MenuPositioner(componentProps, forwardedRef) {
    const { anchor: anchorProp, positionMethod: positionMethodProp = 'absolute', className, render, side, align: alignProp, sideOffset: sideOffsetProp = 0, alignOffset: alignOffsetProp = 0, collisionBoundary = 'clipping-ancestors', collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance: collisionAvoidanceProp = _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .DROPDOWN_COLLISION_AVOIDANCE */ .uD, style, ...elementProps } = componentProps;
    const { store, virtualFocus, syncHighlightedItem } = (0,_root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useMenuRootContext */ .Y)();
    const keepMounted = (0,_portal_MenuPortalContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useMenuPortalContext */ .y)();
    const contextMenuContext = (0,_context_menu_root_ContextMenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useContextMenuRootContext */ .v)(true);
    const parent = store.useState('parent');
    const floatingRootContext = store.useState('floatingRootContext');
    const floatingTreeRoot = store.useState('floatingTreeRoot');
    const mounted = store.useState('mounted');
    const open = store.useState('open');
    const modal = store.useState('modal');
    const openMethod = store.useState('openMethod');
    const triggerElement = store.useState('activeTriggerElement');
    const transitionStatus = store.useState('transitionStatus');
    const positionerElement = store.useState('positionerElement');
    const instantType = store.useState('instantType');
    const adaptiveOrigin = store.useState('adaptiveOrigin');
    const lastOpenChangeReason = store.useState('lastOpenChangeReason');
    const floatingNodeId = store.useState('floatingNodeId');
    const floatingParentNodeId = store.useState('floatingParentNodeId');
    const domReference = floatingRootContext.useState('domReferenceElement');
    let anchor = anchorProp;
    let sideOffset = sideOffsetProp;
    let alignOffset = alignOffsetProp;
    let align = alignProp;
    let collisionAvoidance = collisionAvoidanceProp;
    if (parent.type === 'context-menu') {
        anchor = anchorProp ?? parent.context?.anchor;
        align = align ?? 'start';
        if (!side && align !== 'center') {
            alignOffset = componentProps.alignOffset ?? 2;
            sideOffset = componentProps.sideOffset ?? -5;
        }
    }
    let computedSide = side;
    let computedAlign = align;
    if (parent.type === 'menu') {
        computedSide = computedSide ?? 'inline-end';
        computedAlign = computedAlign ?? 'start';
        collisionAvoidance = componentProps.collisionAvoidance ?? _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .POPUP_COLLISION_AVOIDANCE */ .Pe;
    } else if (parent.type === 'menubar') {
        computedSide = computedSide ?? (parent.context.orientation === 'vertical' ? 'inline-end' : 'bottom');
        computedAlign = computedAlign ?? 'start';
    }
    const contextMenu = parent.type === 'context-menu';
    const positioner = (0,_internals_useAnchorPositioning_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useAnchorPositioning */ .s)({
        anchor,
        floatingRootContext,
        positionMethod: contextMenuContext ? 'fixed' : positionMethodProp,
        mounted,
        side: computedSide,
        sideOffset,
        align: computedAlign,
        alignOffset,
        arrowPadding: contextMenu ? 0 : arrowPadding,
        collisionBoundary,
        collisionPadding,
        sticky,
        nodeId: floatingNodeId,
        keepMounted,
        disableAnchorTracking,
        collisionAvoidance,
        shift: contextMenu ? {
            crossAxis: !('side' in collisionAvoidance && collisionAvoidance.side === 'flip'),
            rootBoundary: 'layoutViewport'
        } : undefined,
        externalTree: floatingTreeRoot,
        adaptiveOrigin,
        lazyFlip: virtualFocus ? 'placement' : false
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        function onMenuOpenChange(details) {
            if (details.open) {
                if (details.parentNodeId === floatingNodeId) {
                    store.set('hoverEnabled', false);
                }
                if (details.nodeId !== floatingNodeId && details.parentNodeId === store.select('floatingParentNodeId')) {
                    store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_7__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__/* .siblingOpen */ .p));
                }
            }
        }
        floatingTreeRoot.events.on('menuopenchange', onMenuOpenChange);
        return ()=>{
            floatingTreeRoot.events.off('menuopenchange', onMenuOpenChange);
        };
    }, [
        store,
        floatingTreeRoot.events,
        floatingNodeId
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (store.select('floatingParentNodeId') == null) {
            return undefined;
        }
        function onParentClose(details) {
            if (details.open || details.nodeId !== store.select('floatingParentNodeId')) {
                return;
            }
            const reason = details.reason ?? _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__/* .siblingOpen */ .p;
            store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_7__/* .createChangeEventDetails */ .d)(reason));
        }
        floatingTreeRoot.events.on('menuopenchange', onParentClose);
        return ()=>{
            floatingTreeRoot.events.off('menuopenchange', onParentClose);
        };
    }, [
        floatingTreeRoot.events,
        store
    ]);
    const closeTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_9__/* .useTimeout */ .Z)();
    // Clear pending close timeout when the menu closes.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!open) {
            closeTimeout.clear();
        }
    }, [
        open,
        closeTimeout
    ]);
    // Close unrelated child submenus when hovering a different item in the parent menu.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        function onItemHover(event) {
            // If an item within our parent menu is hovered, and this menu's trigger is not that item,
            // close this submenu. This ensures hovering a different item in the parent closes other branches.
            if (!open || event.nodeId !== store.select('floatingParentNodeId')) {
                return;
            }
            if (event.target && triggerElement && triggerElement !== event.target) {
                const delay = store.select('closeDelay');
                if (delay > 0) {
                    if (!closeTimeout.isStarted()) {
                        closeTimeout.start(delay, ()=>{
                            store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_7__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__/* .siblingOpen */ .p));
                        });
                    }
                } else {
                    store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_7__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__/* .siblingOpen */ .p));
                }
            } else {
                // User re-hovered the submenu trigger, cancel pending close.
                closeTimeout.clear();
            }
        }
        floatingTreeRoot.events.on('itemhover', onItemHover);
        return ()=>{
            floatingTreeRoot.events.off('itemhover', onItemHover);
        };
    }, [
        floatingTreeRoot.events,
        open,
        triggerElement,
        store,
        closeTimeout
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const eventDetails = {
            open,
            nodeId: floatingNodeId,
            parentNodeId: floatingParentNodeId,
            reason: store.select('lastOpenChangeReason')
        };
        floatingTreeRoot.events.emit('menuopenchange', eventDetails);
    }, [
        floatingTreeRoot.events,
        open,
        store,
        floatingNodeId,
        floatingParentNodeId
    ]);
    (0,_internals_useTriggerSwitchTransition_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useTriggerSwitchTransition */ .t)({
        store,
        domReference,
        positionerElement,
        open
    });
    const state = {
        open,
        side: positioner.side,
        align: positioner.align,
        anchorHidden: positioner.anchorHidden,
        nested: parent.type === 'menu',
        instant: instantType
    };
    const menubarModal = parent.type === 'menubar' && parent.context.modal;
    const popupModal = modal && lastOpenChangeReason !== _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__/* .triggerHover */ .N7;
    (0,_utils_useAnchoredPopupScrollLock_mjs__WEBPACK_IMPORTED_MODULE_11__/* .useAnchoredPopupScrollLock */ .G)(open && (menubarModal || popupModal), openMethod === 'touch', positionerElement, triggerElement);
    const element = (0,_utils_usePositioner_mjs__WEBPACK_IMPORTED_MODULE_12__/* .usePositioner */ .i)(componentProps, state, {
        styles: positioner.positionerStyles,
        transitionStatus,
        props: elementProps,
        refs: [
            forwardedRef,
            store.useStateSetter('positionerElement')
        ],
        hidden: !mounted,
        inert: !open
    });
    const shouldRenderBackdrop = mounted && parent.type !== 'menu' && (parent.type !== 'menubar' && modal && lastOpenChangeReason !== _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__/* .triggerHover */ .N7 || parent.type === 'menubar' && parent.context.modal);
    // cuts a hole in the backdrop to allow pointer interaction with the menubar or dropdown menu trigger element
    let backdropCutout = null;
    if (parent.type === 'menubar') {
        backdropCutout = parent.context.contentElement;
    } else if (parent.type === undefined) {
        backdropCutout = triggerElement;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_MenuPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_13__/* .MenuPositionerContext */ .r.Provider, {
        value: positioner,
        children: [
            shouldRenderBackdrop && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_InternalBackdrop_mjs__WEBPACK_IMPORTED_MODULE_14__/* .InternalBackdrop */ .W, {
                ref: parent.type === 'context-menu' || parent.type === 'nested-context-menu' ? parent.context.internalBackdropRef : null,
                inert: (0,_base_ui_utils_inertValue__WEBPACK_IMPORTED_MODULE_15__/* .inertValue */ .Y)(!open),
                cutout: backdropCutout
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_16__/* .FloatingNode */ .$c, {
                id: floatingNodeId,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_internals_composite_list_CompositeList_mjs__WEBPACK_IMPORTED_MODULE_17__/* .CompositeList */ .u, {
                    elementsRef: store.context.itemDomElements,
                    labelsRef: store.context.itemLabels,
                    onMapChange: syncHighlightedItem,
                    children: element
                })
            })
        ]
    });
});
if (false) {}


/***/ }),

/***/ 58453:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ useMenubarContext)
/* harmony export */ });
/* unused harmony export MenubarContext */
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ MenubarContext,useMenubarContext auto */ 

const MenubarContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (false) {}
function useMenubarContext(optional) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MenubarContext);
    if (context === null && !optional) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(5));
    }
    return context;
}


/***/ }),

/***/ 59236:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ findRootOwnerId)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);

function findRootOwnerId(node) {
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(node) && node.hasAttribute('data-rootownerid')) {
    return node.getAttribute('data-rootownerid');
  }
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isLastTraversableNode */ .eu)(node)) {
    return undefined;
  }
  return findRootOwnerId((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getParentNode */ .$4)(node));
}

/***/ }),

/***/ 61134:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ CompositeItem)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8994);
/* harmony import */ var _useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88401);
/* harmony import */ var _useCompositeItem_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87799);
/* __next_internal_client_entry_do_not_use__ CompositeItem auto */ 


function CompositeItem(componentProps) {
    const { render, className, style, state = _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__/* .EMPTY_OBJECT */ .t0, props = _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__/* .EMPTY_ARRAY */ .Ml, refs = _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__/* .EMPTY_ARRAY */ .Ml, metadata, stateAttributesMapping, tag = 'div', ...elementProps } = componentProps;
    const { compositeProps, compositeRef } = (0,_useCompositeItem_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useCompositeItem */ .k)({
        metadata
    });
    return (0,_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)(tag, componentProps, {
        state,
        // The composite ref attaches first so an outer item wins when nested items share a DOM node.
        ref: [
            compositeRef,
            ...refs
        ],
        props: [
            compositeProps,
            ...props,
            elementProps
        ],
        stateAttributesMapping
    });
}


/***/ }),

/***/ 62081:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ useHoverFloatingInteraction)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(14718);
/* harmony import */ var _base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(12046);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(81456);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64951);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6791);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(76175);
/* harmony import */ var _components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80120);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(93093);
/* harmony import */ var _utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(92044);
/* harmony import */ var _useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41657);
/* harmony import */ var _useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(83323);
/* harmony import */ var _useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(96836);
/* __next_internal_client_entry_do_not_use__ useHoverFloatingInteraction auto */ 














/**
 * Provides hover interactions that should be attached to the floating element.
 */ function useHoverFloatingInteraction(store, parameters = {}) {
    const { enabled = true, closeDelay: closeDelayProp = 0, nodeId: nodeIdProp } = parameters;
    const open = store.useState('open');
    const floatingElement = store.useState('floatingElement');
    const domReferenceElement = store.useState('domReferenceElement');
    const { dataRef } = store.context;
    const tree = (0,_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useFloatingTree */ .cq)();
    const parentId = (0,_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useFloatingParentNodeId */ .R1)();
    const instance = (0,_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useHoverInteractionSharedState */ .uu)(store);
    const childClosedTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__/* .useTimeout */ .Z)();
    const isClickLikeOpenEvent = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__/* .useStableCallback */ .K)(()=>{
        return (0,_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isClickLikeOpenEvent */ .GI)(dataRef.current.openEvent?.type, instance.interactedInside);
    });
    const isHoverOpen = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__/* .useStableCallback */ .K)(()=>{
        return (0,_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isHoverOpenEvent */ .h$)(dataRef.current.openEvent?.type);
    });
    const clearPointerEvents = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__/* .useStableCallback */ .K)(()=>{
        (0,_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_2__/* .clearSafePolygonPointerEventsMutation */ .GH)(instance);
    });
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open) {
            instance.pointerType = undefined;
            instance.restTimeoutPending = false;
            instance.interactedInside = false;
            clearPointerEvents();
        }
    }, [
        open,
        instance,
        clearPointerEvents
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        return clearPointerEvents;
    }, [
        clearPointerEvents
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!enabled) {
            return undefined;
        }
        if (open && instance.handleCloseOptions?.blockPointerEvents && isHoverOpen() && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_7__/* .isElement */ .vq)(domReferenceElement) && floatingElement) {
            const ref = domReferenceElement;
            const floatingEl = floatingElement;
            const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_8__/* .ownerDocument */ .R)(floatingElement);
            const parentFloating = tree?.nodesRef.current.find((node)=>node.id === parentId)?.context?.elements.floating;
            if (parentFloating) {
                parentFloating.style.pointerEvents = '';
            }
            // A keep-mounted submenu can appear in the tree before it opens, so a
            // cached scope or parent lookup may resolve to the submenu itself. That
            // would not shield sibling items in the parent menu.
            const cachedScopeElement = instance.pointerEventsScopeElement !== floatingEl ? instance.pointerEventsScopeElement : null;
            const parentScopeElement = parentFloating !== floatingEl ? parentFloating : null;
            const scopeElement = instance.handleCloseOptions?.getScope?.() ?? cachedScopeElement ?? parentScopeElement ?? (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .closest */ .kp)(ref, '[data-rootownerid]') ?? doc.body;
            (0,_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_2__/* .applySafePolygonPointerEventsMutation */ .D8)(instance, {
                scopeElement,
                referenceElement: ref,
                floatingElement: floatingEl
            });
            return ()=>{
                clearPointerEvents();
            };
        }
        return undefined;
    }, [
        enabled,
        open,
        domReferenceElement,
        floatingElement,
        instance,
        isHoverOpen,
        tree,
        parentId,
        clearPointerEvents
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!enabled) {
            return undefined;
        }
        function hasParentChildren() {
            return !!(tree && parentId && (0,_utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getNodeChildren */ .C)(tree.nodesRef.current, parentId).length > 0);
        }
        function closeWithDelay(event) {
            const closeDelay = (0,_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_5__/* .getDelay */ .uf)(closeDelayProp, 'close', instance.pointerType);
            const close = ()=>{
                store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_12__/* .triggerHover */ .N7, event));
                tree?.events.emit('floating.closed', event);
            };
            if (closeDelay) {
                instance.openChangeTimeout.start(closeDelay, close);
            } else {
                instance.openChangeTimeout.clear();
                close();
            }
        }
        function handleInteractInside(event) {
            const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .getTarget */ .EW)(event);
            if (!(0,_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_13__/* .isInteractiveElement */ .H5)(target)) {
                instance.interactedInside = false;
                return;
            }
            instance.interactedInside = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .closest */ .kp)(target, '[aria-haspopup]') != null;
        }
        function onFloatingMouseEnter() {
            instance.openChangeTimeout.clear();
            childClosedTimeout.clear();
            tree?.events.off('floating.closed', onNodeClosed);
            clearPointerEvents();
        }
        function onFloatingMouseLeave(event) {
            if (hasParentChildren() && tree) {
                tree.events.on('floating.closed', onNodeClosed);
                return;
            }
            if ((0,_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_13__/* .isTargetInsideEnabledTrigger */ .Hi)(event.relatedTarget, store.context.triggerElements)) {
                // If the mouse is leaving the reference element to another trigger, don't explicitly close the popup
                // as it will be moved.
                return;
            }
            const currentNodeId = dataRef.current.floatingContext?.nodeId ?? nodeIdProp;
            const relatedTarget = event.relatedTarget;
            const isMovingIntoDescendantFloating = tree && currentNodeId && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_7__/* .isElement */ .vq)(relatedTarget) && (0,_utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getNodeChildren */ .C)(tree.nodesRef.current, currentNodeId, false).some((node)=>(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .contains */ .gR)(node.context?.elements.floating, relatedTarget));
            if (isMovingIntoDescendantFloating) {
                return;
            }
            // If the safePolygon handler is active, let it handle the close logic.
            if (instance.handler) {
                instance.handler(event);
                return;
            }
            clearPointerEvents();
            if (isHoverOpen() && !isClickLikeOpenEvent()) {
                closeWithDelay(event);
            }
        }
        function onNodeClosed(event) {
            if (!tree || !parentId || hasParentChildren()) {
                return;
            }
            // Allow the mouseenter event to fire in case child was closed because mouse moved into parent.
            childClosedTimeout.start(0, ()=>{
                tree.events.off('floating.closed', onNodeClosed);
                store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_12__/* .triggerHover */ .N7, event));
                tree.events.emit('floating.closed', event);
            });
        }
        const floating = floatingElement;
        return (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_14__/* .mergeCleanups */ .g)(floating && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(floating, 'mouseenter', onFloatingMouseEnter), floating && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(floating, 'mouseleave', onFloatingMouseLeave), floating && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(floating, 'pointerdown', handleInteractInside, true), ()=>{
            tree?.events.off('floating.closed', onNodeClosed);
        });
    }, [
        enabled,
        floatingElement,
        store,
        dataRef,
        closeDelayProp,
        nodeIdProp,
        isHoverOpen,
        isClickLikeOpenEvent,
        clearPointerEvents,
        instance,
        tree,
        parentId,
        childClosedTimeout
    ]);
}


/***/ }),

/***/ 66610:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ useHoverReferenceInteraction)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47650);
/* harmony import */ var _base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(14718);
/* harmony import */ var _base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(12046);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(81456);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2474);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6791);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(76175);
/* harmony import */ var _components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80120);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(93093);
/* harmony import */ var _utils_event_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(17947);
/* harmony import */ var _useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41657);
/* harmony import */ var _useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(96836);
/* harmony import */ var _useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(83323);
/* __next_internal_client_entry_do_not_use__ useHoverReferenceInteraction auto */ 














const EMPTY_REF = {
    current: null
};
/**
 * Provides hover interactions that should be attached to reference or trigger
 * elements.
 */ function useHoverReferenceInteraction(store, props = {}) {
    const { enabled = true, delay = 0, handleClose = null, mouseOnly = false, restMs = 0, move = true, triggerElementRef = EMPTY_REF, externalTree, isActiveTrigger = true, getHandleCloseContext, isClosing, shouldOpen: shouldOpenProp, guardStaleOpen = false } = props;
    const { dataRef, events } = store.context;
    const tree = (0,_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useFloatingTree */ .cq)(externalTree);
    const instance = (0,_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useHoverInteractionSharedState */ .uu)(store);
    const isHoverCloseActiveRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const handleCloseRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(handleClose);
    const delayRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(delay);
    const restMsRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(restMs);
    const enabledRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(enabled);
    const shouldOpenRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(shouldOpenProp);
    const isClosingRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(isClosing);
    const isClickLikeOpenEvent = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__/* .useStableCallback */ .K)(()=>{
        return (0,_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_6__/* .isClickLikeOpenEvent */ .GI)(dataRef.current.openEvent?.type, instance.interactedInside);
    });
    const checkShouldOpen = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__/* .useStableCallback */ .K)(()=>{
        return shouldOpenRef.current?.() !== false;
    });
    const isOverInactiveTrigger = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__/* .useStableCallback */ .K)((currentDomReference, currentTarget, target)=>{
        const allTriggers = store.context.triggerElements;
        // Fast path for normal usage where handlers are attached directly to triggers.
        if (allTriggers.hasElement(currentTarget)) {
            return !currentDomReference || !(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .contains */ .gR)(currentDomReference, currentTarget);
        }
        // Fallback for delegated/wrapper usage where currentTarget may be outside the trigger map.
        if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__/* .isElement */ .vq)(target)) {
            return false;
        }
        const targetElement = target;
        return allTriggers.hasMatchingElement((trigger)=>(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .contains */ .gR)(trigger, targetElement)) && (!currentDomReference || !(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .contains */ .gR)(currentDomReference, targetElement));
    });
    const cleanupMouseMoveHandler = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__/* .useStableCallback */ .K)(()=>{
        if (!instance.handler) {
            return;
        }
        const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_9__/* .ownerDocument */ .R)(store.select('domReferenceElement'));
        doc.removeEventListener('mousemove', instance.handler);
        instance.handler = undefined;
    });
    const clearPointerEvents = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__/* .useStableCallback */ .K)(()=>{
        (0,_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_3__/* .clearSafePolygonPointerEventsMutation */ .GH)(instance);
    });
    if (isActiveTrigger) {
        // eslint-disable-next-line no-underscore-dangle
        instance.handleCloseOptions = handleClose?.__options;
    }
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>cleanupMouseMoveHandler, [
        cleanupMouseMoveHandler
    ]);
    // When closing before opening, clear the delay timeouts to cancel it
    // from showing.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!enabled) {
            return undefined;
        }
        function onOpenChangeLocal(details) {
            if (!details.open) {
                isHoverCloseActiveRef.current = details.reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__/* .triggerHover */ .N7;
                cleanupMouseMoveHandler();
                instance.openChangeTimeout.clear();
                instance.restTimeout.clear();
                instance.blockMouseMove = true;
                instance.restTimeoutPending = false;
            } else {
                isHoverCloseActiveRef.current = false;
            }
        }
        events.on('openchange', onOpenChangeLocal);
        return ()=>{
            events.off('openchange', onOpenChangeLocal);
        };
    }, [
        enabled,
        events,
        instance,
        cleanupMouseMoveHandler
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!enabled) {
            return undefined;
        }
        function closeWithDelay(event, runElseBranch = true) {
            const closeDelay = (0,_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_6__/* .getDelay */ .uf)(delayRef.current, 'close', instance.pointerType);
            if (closeDelay) {
                instance.openChangeTimeout.start(closeDelay, ()=>{
                    store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__/* .triggerHover */ .N7, event));
                    tree?.events.emit('floating.closed', event);
                });
            } else if (runElseBranch) {
                instance.openChangeTimeout.clear();
                store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__/* .triggerHover */ .N7, event));
                tree?.events.emit('floating.closed', event);
            }
        }
        const trigger = triggerElementRef.current ?? (isActiveTrigger ? store.select('domReferenceElement') : null);
        if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__/* .isElement */ .vq)(trigger)) {
            return undefined;
        }
        function onMouseEnter(event) {
            instance.openChangeTimeout.clear();
            instance.blockMouseMove = false;
            if (mouseOnly && !(0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_12__/* .isMouseLikePointerType */ .Go)(instance.pointerType)) {
                return;
            }
            // Only rest delay is set; there's no fallback delay.
            // This will be handled by `onMouseMove`.
            const restMsValue = (0,_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_6__/* .getRestMs */ .hq)(restMsRef.current);
            const openDelay = (0,_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_6__/* .getDelay */ .uf)(delayRef.current, 'open', instance.pointerType);
            const eventTarget = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .getTarget */ .EW)(event);
            const currentTarget = event.currentTarget ?? null;
            const currentDomReference = store.select('domReferenceElement');
            let triggerNode = currentTarget;
            // Wrapper/delegated mode: resolve the actual trigger from the event target.
            if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__/* .isElement */ .vq)(eventTarget) && !store.context.triggerElements.hasElement(eventTarget)) {
                for (const triggerElement of store.context.triggerElements.elements()){
                    if ((0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .contains */ .gR)(triggerElement, eventTarget)) {
                        triggerNode = triggerElement;
                        break;
                    }
                }
            }
            // Wrapper/delegated mode fallback: if the wrapper contains the active trigger,
            // treat this as re-entering that active trigger.
            if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__/* .isElement */ .vq)(currentTarget) && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__/* .isElement */ .vq)(currentDomReference) && !store.context.triggerElements.hasElement(currentTarget) && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .contains */ .gR)(currentTarget, currentDomReference)) {
                triggerNode = currentDomReference;
            }
            const isOverInactive = triggerNode == null ? false : isOverInactiveTrigger(currentDomReference, triggerNode, eventTarget);
            const isOpen = store.select('open');
            const isInClosingTransition = isClosingRef.current?.() ?? store.select('transitionStatus') === 'ending';
            const isHoverCloseTransition = !isOpen && isInClosingTransition && isHoverCloseActiveRef.current;
            const isReenteringSameTriggerDuringCloseTransition = !isOverInactive && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__/* .isElement */ .vq)(triggerNode) && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__/* .isElement */ .vq)(currentDomReference) && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .contains */ .gR)(currentDomReference, triggerNode) && isHoverCloseTransition;
            const isRestOnlyDelay = restMsValue > 0 && !openDelay;
            const shouldOpenImmediately = isOverInactive && (isOpen || isHoverCloseTransition) || isReenteringSameTriggerDuringCloseTransition;
            const shouldOpen = !isOpen || isOverInactive;
            // Open immediately when moving between triggers while open, or during
            // a hover-driven close transition (including same-trigger re-entry).
            if (shouldOpenImmediately) {
                if (checkShouldOpen()) {
                    store.setOpen(true, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__/* .triggerHover */ .N7, event, triggerNode));
                }
                return;
            }
            if (isRestOnlyDelay) {
                return;
            }
            if (openDelay) {
                instance.openChangeTimeout.start(openDelay, ()=>{
                    if (shouldOpen && checkShouldOpen()) {
                        store.setOpen(true, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__/* .triggerHover */ .N7, event, triggerNode));
                    }
                });
            } else if (shouldOpen) {
                if (checkShouldOpen()) {
                    store.setOpen(true, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__/* .triggerHover */ .N7, event, triggerNode));
                }
            }
        }
        function onMouseLeave(event) {
            if (isClickLikeOpenEvent()) {
                clearPointerEvents();
                return;
            }
            cleanupMouseMoveHandler();
            const domReferenceElement = store.select('domReferenceElement');
            const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_9__/* .ownerDocument */ .R)(domReferenceElement);
            instance.restTimeout.clear();
            instance.restTimeoutPending = false;
            const handleCloseContextBase = dataRef.current.floatingContext ?? getHandleCloseContext?.();
            if ((0,_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_13__/* .isTargetInsideEnabledTrigger */ .Hi)(event.relatedTarget, store.context.triggerElements)) {
                return;
            }
            if (handleCloseRef.current && handleCloseContextBase) {
                if (!store.select('open')) {
                    instance.openChangeTimeout.clear();
                }
                const currentTrigger = triggerElementRef.current;
                instance.handler = handleCloseRef.current({
                    ...handleCloseContextBase,
                    tree,
                    x: event.clientX,
                    y: event.clientY,
                    onClose () {
                        clearPointerEvents();
                        cleanupMouseMoveHandler();
                        if (enabledRef.current && !isClickLikeOpenEvent() && currentTrigger === store.select('domReferenceElement')) {
                            closeWithDelay(event, true);
                        }
                    }
                });
                doc.addEventListener('mousemove', instance.handler);
                instance.handler(event);
                return;
            }
            const shouldClose = instance.pointerType === 'touch' ? !(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .contains */ .gR)(store.select('floatingElement'), event.relatedTarget) : true;
            if (shouldClose) {
                closeWithDelay(event);
            }
        }
        // Backup cancellation for Chrome's dropped `mouseleave` — see `guardStaleOpen`.
        function onMouseOut(event) {
            if ((0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .contains */ .gR)(trigger, event.relatedTarget)) {
                return; // moved within the trigger's own subtree
            }
            instance.openChangeTimeout.clear();
            instance.restTimeout.clear();
            instance.restTimeoutPending = false;
        }
        const staleOpenGuard = guardStaleOpen ? (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(trigger, 'mouseout', onMouseOut) : undefined;
        if (move) {
            return (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_15__/* .mergeCleanups */ .g)((0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(trigger, 'mousemove', onMouseEnter, {
                once: true
            }), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(trigger, 'mouseenter', onMouseEnter), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(trigger, 'mouseleave', onMouseLeave), staleOpenGuard);
        }
        return (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_15__/* .mergeCleanups */ .g)((0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(trigger, 'mouseenter', onMouseEnter), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(trigger, 'mouseleave', onMouseLeave), staleOpenGuard);
    }, [
        cleanupMouseMoveHandler,
        clearPointerEvents,
        dataRef,
        delayRef,
        store,
        enabled,
        handleCloseRef,
        instance,
        isActiveTrigger,
        isOverInactiveTrigger,
        isClickLikeOpenEvent,
        mouseOnly,
        move,
        restMsRef,
        triggerElementRef,
        tree,
        enabledRef,
        getHandleCloseContext,
        isClosingRef,
        checkShouldOpen,
        guardStaleOpen
    ]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        if (!enabled) {
            return undefined;
        }
        function setPointerRef(event) {
            instance.pointerType = event.pointerType;
        }
        return {
            onPointerDown: setPointerRef,
            onPointerEnter: setPointerRef,
            onMouseMove (event) {
                const { nativeEvent } = event;
                const trigger = event.currentTarget;
                const currentDomReference = store.select('domReferenceElement');
                const currentOpen = store.select('open');
                const isOverInactive = isOverInactiveTrigger(currentDomReference, trigger, event.target);
                if (mouseOnly && !(0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_12__/* .isMouseLikePointerType */ .Go)(instance.pointerType)) {
                    return;
                }
                if (currentOpen && isOverInactive && instance.handleCloseOptions?.blockPointerEvents) {
                    const floatingElement = store.select('floatingElement');
                    if (floatingElement) {
                        const scopeElement = instance.handleCloseOptions?.getScope?.() ?? trigger.ownerDocument.body;
                        (0,_useHoverInteractionSharedState_mjs__WEBPACK_IMPORTED_MODULE_3__/* .applySafePolygonPointerEventsMutation */ .D8)(instance, {
                            scopeElement,
                            referenceElement: trigger,
                            floatingElement
                        });
                    }
                }
                const restMsValue = (0,_useHoverShared_mjs__WEBPACK_IMPORTED_MODULE_6__/* .getRestMs */ .hq)(restMsRef.current);
                if (currentOpen && !isOverInactive || restMsValue === 0) {
                    return;
                }
                if (!isOverInactive && instance.restTimeoutPending && event.movementX ** 2 + event.movementY ** 2 < 2) {
                    return;
                }
                instance.restTimeout.clear();
                function handleMouseMove() {
                    instance.restTimeoutPending = false;
                    // A delayed hover open should not override a click-like open that happened
                    // while the hover delay was pending.
                    if (isClickLikeOpenEvent()) {
                        return;
                    }
                    const latestOpen = store.select('open');
                    if (!instance.blockMouseMove && (!latestOpen || isOverInactive) && checkShouldOpen()) {
                        store.setOpen(true, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__/* .triggerHover */ .N7, nativeEvent, trigger));
                    }
                }
                if (instance.pointerType === 'touch') {
                    react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(()=>{
                        handleMouseMove();
                    });
                } else if (isOverInactive && currentOpen) {
                    handleMouseMove();
                } else {
                    instance.restTimeoutPending = true;
                    instance.restTimeout.start(restMsValue, handleMouseMove);
                }
            }
        };
    }, [
        enabled,
        instance,
        isClickLikeOpenEvent,
        isOverInactiveTrigger,
        mouseOnly,
        store,
        restMsRef,
        checkShouldOpen
    ]);
}


/***/ }),

/***/ 66893:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ getHighlightReason)
/* harmony export */ });
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(76175);


/**
 * The `onItemHighlighted` reason for a list navigation event, matching the event type that the
 * reason promises in its details.
 */
function getHighlightReason(event) {
  if (event == null) {
    return _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_0__/* .none */ .dv;
  }
  if (event.type.startsWith('key')) {
    return _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_0__/* .keyboard */ .QJ;
  }
  if (event.type.startsWith('mouse') || event.type.startsWith('pointer')) {
    return _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_0__/* .pointer */ .Wn;
  }
  return _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_0__/* .none */ .dv;
}

/***/ }),

/***/ 77805:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ useFocus)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14718);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(97827);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15495);
/* harmony import */ var _base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12046);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(81456);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64951);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6791);
/* harmony import */ var _utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(74831);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93093);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(83323);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76175);
/* __next_internal_client_entry_do_not_use__ useFocus auto */ 










const isMacSafari = _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_1__/* .mac */ .Md && _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_2__/* .webkit */ .Fp;
/**
 * Opens the floating element while the reference element has focus, like CSS
 * `:focus`.
 * @see https://floating-ui.com/docs/useFocus
 */ function useFocus(store, props = {}) {
    const { enabled = true, delay } = props;
    const { events, dataRef } = store.context;
    const blockFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    // Track which reference should be blocked from re-opening after Escape/press dismissal.
    const blockedReferenceRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const keyboardModalityRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const timeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__/* .useTimeout */ .Z)();
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const domReference = store.select('domReferenceElement');
        if (!enabled) {
            return undefined;
        }
        const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_4__/* .getWindow */ .zk)(domReference);
        // If the reference was focused and the user left the tab/window, and the
        // floating element was not open, the focus should be blocked when they
        // return to the tab/window.
        function onBlur() {
            const currentDomReference = store.select('domReferenceElement');
            if (!store.select('open') && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_4__/* .isHTMLElement */ .sb)(currentDomReference) && currentDomReference === (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .activeElement */ .RS)((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_6__/* .ownerDocument */ .R)(currentDomReference))) {
                blockFocusRef.current = true;
                blockedReferenceRef.current = currentDomReference;
            }
        }
        function onKeyDown() {
            keyboardModalityRef.current = true;
        }
        function onPointerDown() {
            keyboardModalityRef.current = false;
        }
        return (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_7__/* .mergeCleanups */ .g)((0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_8__/* .addEventListener */ .q)(win, 'blur', onBlur), isMacSafari && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_8__/* .addEventListener */ .q)(win, 'keydown', onKeyDown, true), isMacSafari && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_8__/* .addEventListener */ .q)(win, 'pointerdown', onPointerDown, true));
    }, [
        store,
        enabled
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!enabled) {
            return undefined;
        }
        function onOpenChangeLocal(details) {
            if (details.reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .triggerPress */ .Ui || details.reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .escapeKey */ .jv) {
                const referenceElement = store.select('domReferenceElement');
                if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_4__/* .isElement */ .vq)(referenceElement)) {
                    blockedReferenceRef.current = referenceElement;
                    blockFocusRef.current = true;
                }
            }
        }
        events.on('openchange', onOpenChangeLocal);
        return ()=>{
            events.off('openchange', onOpenChangeLocal);
        };
    }, [
        events,
        enabled,
        store
    ]);
    const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        function resetBlockedFocus() {
            blockFocusRef.current = false;
            blockedReferenceRef.current = null;
        }
        return {
            onMouseLeave () {
                resetBlockedFocus();
            },
            onFocus (event) {
                const focusTarget = event.currentTarget;
                if (blockFocusRef.current) {
                    if (blockedReferenceRef.current === focusTarget) {
                        return;
                    }
                    resetBlockedFocus();
                }
                const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .getTarget */ .EW)(event.nativeEvent);
                if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_4__/* .isElement */ .vq)(target)) {
                    // Safari fails to match `:focus-visible` if focus was initially
                    // outside the document.
                    if (isMacSafari && !event.relatedTarget) {
                        if (!keyboardModalityRef.current && !(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isTypeableElement */ .$u)(target)) {
                            return;
                        }
                    } else if (!(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_10__/* .matchesFocusVisible */ .em)(target)) {
                        return;
                    }
                }
                const movedFromOtherEnabledTrigger = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isTargetInsideEnabledTrigger */ .Hi)(event.relatedTarget, store.context.triggerElements);
                const { nativeEvent, currentTarget } = event;
                if (store.select('open') && movedFromOtherEnabledTrigger || !delay) {
                    store.setOpen(true, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .triggerFocus */ .F4, nativeEvent, currentTarget));
                    return;
                }
                timeout.start(delay, ()=>{
                    if (blockFocusRef.current) {
                        return;
                    }
                    store.setOpen(true, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .triggerFocus */ .F4, nativeEvent, currentTarget));
                });
            },
            onBlur (event) {
                resetBlockedFocus();
                const relatedTarget = event.relatedTarget;
                const nativeEvent = event.nativeEvent;
                // Hit the non-modal focus management portal guard. Focus will be
                // moved into the floating element immediately after.
                const movedToFocusGuard = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_4__/* .isElement */ .vq)(relatedTarget) && relatedTarget.hasAttribute((0,_utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_12__/* .createAttribute */ .F)('focus-guard')) && relatedTarget.getAttribute('data-type') === 'outside';
                // Wait for the window blur listener to fire.
                timeout.start(0, ()=>{
                    const domReference = store.select('domReferenceElement');
                    const activeEl = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .activeElement */ .RS)((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_6__/* .ownerDocument */ .R)(domReference));
                    // Focus left the page, keep it open.
                    if (!relatedTarget && activeEl === domReference) {
                        return;
                    }
                    // When focusing the reference element (e.g. regular click), then
                    // clicking into the floating element, prevent it from hiding.
                    // Note: it must be focusable, e.g. `tabindex="-1"`.
                    // We can not rely on relatedTarget to point to the correct element
                    // as it will only point to the shadow host of the newly focused element
                    // and not the element that actually has received focus if it is located
                    // inside a shadow root.
                    if ((0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .contains */ .gR)(dataRef.current.floatingContext?.refs.floating.current, activeEl) || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .contains */ .gR)(domReference, activeEl) || movedToFocusGuard) {
                        return;
                    }
                    // If the next focused element is one of the triggers, do not close
                    // the floating element. The focus handler of that trigger will
                    // handle the open state.
                    const nextFocusedElement = relatedTarget ?? activeEl;
                    if ((0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isTargetInsideEnabledTrigger */ .Hi)(nextFocusedElement, store.context.triggerElements)) {
                        return;
                    }
                    store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_11__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .triggerFocus */ .F4, nativeEvent));
                });
            }
        };
    }, [
        dataRef,
        delay,
        store,
        timeout
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

/***/ 83227:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ MenuItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _filter_root_MenuFilterContext_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(27053);
/* harmony import */ var _useMenuItem_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33018);
/* harmony import */ var _root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39048);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(88401);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62955);
/* harmony import */ var _internals_composite_list_useCompositeListItem_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54068);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ MenuItem auto */ 







const MenuItemPlain = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function MenuItemPlain(componentProps, forwardedRef) {
    const { render, className, id: idProp, label, nativeButton = false, disabled: disabledProp = false, closeOnClick = true, style, ...elementProps } = componentProps;
    const { store } = (0,_root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useMenuRootContext */ .Y)();
    const listItem = (0,_internals_composite_list_useCompositeListItem_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useCompositeListItem */ .q)({
        guess: true,
        label
    });
    const id = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useBaseUiId */ .e)(idProp);
    const rootDisabled = store.useState('disabled');
    const highlighted = store.useState('isActive', listItem.index);
    const nodeId = store.useState('floatingNodeId');
    const itemProps = store.useState('itemProps');
    const disabled = disabledProp || rootDisabled;
    const { getItemProps, itemRef } = (0,_useMenuItem_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useMenuItem */ .O)({
        closeOnClick,
        disabled,
        highlighted,
        id,
        store,
        nativeButton,
        nodeId,
        itemMetadata: _useMenuItem_mjs__WEBPACK_IMPORTED_MODULE_5__/* .REGULAR_ITEM */ .z
    });
    const state = {
        disabled,
        highlighted
    };
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useRenderElement */ .o)('div', componentProps, {
        state,
        props: [
            itemProps,
            elementProps,
            getItemProps
        ],
        ref: [
            itemRef,
            forwardedRef,
            listItem.ref
        ]
    });
});
/**
 * An individual interactive item in the menu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ if (false) {}
const MenuItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function MenuItem(props, forwardedRef) {
    const filterItem = (0,_filter_root_MenuFilterContext_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useMenuFilterItem */ .c4)(props, forwardedRef);
    if (!filterItem.visible) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MenuItemPlain, {
        ...props,
        ref: filterItem.ref
    });
});
if (false) {}


/***/ }),

/***/ 83780:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ MenuGroupContext)
/* harmony export */ });
/* unused harmony export useMenuGroupRootContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ MenuGroupContext,useMenuGroupRootContext auto */ 

const MenuGroupContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useMenuGroupRootContext() {
    const context = React.useContext(MenuGroupContext);
    if (context === undefined) {
        throw new Error( false ? 0 : _formatErrorMessage(31));
    }
    return context;
}


/***/ }),

/***/ 83873:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ MenuRoot)
/* harmony export */ });
/* unused harmony export MenuRootInternal */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(64951);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14187);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(8994);
/* harmony import */ var _base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27243);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(80120);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(88648);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(87541);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(61243);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(73562);
/* harmony import */ var _MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39048);
/* harmony import */ var _menubar_MenubarContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(58453);
/* harmony import */ var _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(69679);
/* harmony import */ var _internals_direction_context_DirectionContext_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(30458);
/* harmony import */ var _utils_useOpenInteractionType_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(83954);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(76175);
/* harmony import */ var _utils_getHighlightReason_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(66893);
/* harmony import */ var _context_menu_root_ContextMenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(98339);
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(40253);
/* harmony import */ var _internals_useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(73070);
/* harmony import */ var _store_MenuStore_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(41049);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(26713);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62955);
/* harmony import */ var _filter_provider_MenuFilterProviderContext_mjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(20167);
/* harmony import */ var _utils_isKeyboardOpen_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(39186);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ MenuRootInternal,MenuRoot auto */ 























/**
 * @internal
 */ 
const MenuRootInternal = (0,_base_ui_utils_fastHooks__WEBPACK_IMPORTED_MODULE_2__/* .fastComponent */ .G1)(function MenuRootInternal(props) {
    const { children, open: openProp, onOpenChange, onOpenChangeComplete, onItemHighlighted: onItemHighlightedProp, defaultOpen = false, disabled: disabledProp = false, modal: modalProp, loopFocus = true, orientation = 'vertical', actionsRef, closeParentOnEsc = false, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null, highlightItemOnHover = true, isSubmenu = false, virtualFocus = false, virtualFocusRef, allowEscape = true, resetOnPointerLeave = true } = props;
    const contextMenuContext = (0,_context_menu_root_ContextMenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useContextMenuRootContext */ .v)(true);
    const parentMenuRootContext = (0,_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useMenuRootContext */ .Y)(true);
    const menubarContext = (0,_menubar_MenubarContext_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useMenubarContext */ .t)(true);
    // Depend on the stable pieces rather than the parent context object, so a parent context
    // invalidation doesn't cascade into every descendant root's context.
    const enclosingMenuStore = parentMenuRootContext?.store;
    const parentVirtualFocus = parentMenuRootContext?.virtualFocus ?? false;
    const parentFromContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        if (isSubmenu && enclosingMenuStore) {
            return {
                type: 'menu',
                store: enclosingMenuStore
            };
        }
        if (menubarContext) {
            return {
                type: 'menubar',
                context: menubarContext
            };
        }
        // Ensure this is not a Menu nested inside ContextMenu.Trigger.
        // ContextMenu parentContext is always undefined as ContextMenu.Root is instantiated with
        // <MenuRootContext.Provider value={undefined}>
        if (contextMenuContext && !enclosingMenuStore) {
            return {
                type: 'context-menu',
                context: contextMenuContext
            };
        }
        return {
            type: undefined
        };
    }, [
        contextMenuContext,
        enclosingMenuStore,
        menubarContext,
        isSubmenu
    ]);
    const rootId = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useBaseUiId */ .e)();
    // React 17 resolves generated ids in an effect, so they must be read live rather than captured
    // in a state initializer.
    const defaultFloatingId = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useBaseUiId */ .e)();
    const [renderedFloatingId, setRenderedFloatingId] = react__WEBPACK_IMPORTED_MODULE_0__.useState(undefined);
    // A registered `''` means the popup rendered with an explicitly empty id, so nothing may point
    // at the generated fallback.
    const floatingId = (renderedFloatingId ?? defaultFloatingId) || undefined;
    const floatingParentNodeIdFromContext = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useFloatingParentNodeId */ .R1)();
    const parentMenuStore = parentFromContext.type === 'menu' ? parentFromContext.store : undefined;
    // An initially open submenu should animate in only when the user watches it appear, i.e. when
    // its subtree mounts because the parent popup is playing its own enter transition. A parent
    // that was `defaultOpen` at page load never passes through `'starting'`, and under a
    // `keepMounted` parent these initializers run at page load while the parent's status is still
    // `undefined` — in both cases the submenu is page-load content that must not animate. Gated on
    // being open at mount so a closed submenu doesn't seed `instantType` it would never clear. Read
    // during the first render only — consumed exclusively by first-render initializers below
    // (`useState` and the store's initial state).
    const animateInitialOpen = (openProp ?? defaultOpen) && parentMenuStore?.state.transitionStatus === 'starting';
    // Mirror an instantly-opened parent (e.g. keyboard click) so `[data-instant]` styling
    // suppresses the enter transition on both popups or neither. Captured once —
    // `animateInitialOpen` is only meaningful during the first render.
    const seededInstantType = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_8__/* .useRefWithInit */ .j)(()=>animateInitialOpen ? parentMenuStore?.state.instantType : undefined).current;
    const store = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_8__/* .useRefWithInit */ .j)(()=>{
        const menuStore = new _store_MenuStore_mjs__WEBPACK_IMPORTED_MODULE_9__/* .MenuStore */ .z({
            open: defaultOpen,
            openProp,
            activeTriggerId: defaultTriggerIdProp,
            triggerIdProp,
            parent: parentFromContext,
            disabled: disabledProp,
            highlightItemOnHover,
            modal: parentFromContext.type === undefined ? modalProp : undefined,
            rootId,
            instantType: seededInstantType
        }, floatingId, floatingParentNodeIdFromContext != null);
        // A stable ref object, so descendants can read it during render from the first commit.
        menuStore.context.virtualFocusRef = virtualFocusRef;
        return menuStore;
    }).current;
    store.useControlledProp('openProp', openProp);
    store.useControlledProp('triggerIdProp', triggerIdProp);
    store.useContextCallback('onOpenChangeComplete', onOpenChangeComplete);
    const floatingTreeRoot = store.useState('floatingTreeRoot');
    const floatingNodeIdFromContext = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useFloatingNodeId */ .fI)(floatingTreeRoot);
    const open = store.useState('open');
    const activeTriggerElement = store.useState('activeTriggerElement');
    const positionerElement = store.useState('positionerElement');
    const hoverEnabled = store.useState('hoverEnabled');
    const disabled = store.useState('disabled');
    const lastOpenChangeReason = store.useState('lastOpenChangeReason');
    const parent = store.useState('parent');
    const activeIndex = store.useState('activeIndex');
    const keyboardOpen = store.useState('keyboardOpen');
    const payload = store.useState('payload');
    const floatingParentNodeId = store.useState('floatingParentNodeId');
    const openEventRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const allowOutsidePressDismissalRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(parent.type !== 'context-menu');
    const allowOutsidePressDismissalTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_10__/* .useTimeout */ .Z)();
    const allowTouchToCloseRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const allowTouchToCloseTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_10__/* .useTimeout */ .Z)();
    const nested = floatingParentNodeId != null;
    if (false) {}
    const { openMethod, triggerProps: interactionTypeProps } = (0,_utils_useOpenInteractionType_mjs__WEBPACK_IMPORTED_MODULE_11__/* .useOpenInteractionType */ .G)(open);
    store.useSyncedValues({
        disabled: disabledProp,
        highlightItemOnHover,
        modal: parent.type === undefined ? modalProp : undefined,
        openMethod,
        rootId
    });
    (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_12__/* .useImplicitActiveTrigger */ .tr)(store);
    const { forceUnmount, transitionStatus } = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_12__/* .useOpenStateTransitions */ .l$)(open, store, ()=>{
        store.set('allowMouseEnter', false);
    }, animateInitialOpen);
    const runOnceAnimationsFinish = (0,_internals_useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_13__/* .useAnimationsFinished */ .V)(store.context.popupRef);
    // An inherited `instantType` is only for the initial reveal. A later controlled `open` flip
    // bypasses `setOpen`, so nothing would reset it and `[data-instant]` would wrongly suppress
    // every subsequent transition. Clear it once the enter phase settles, unless an interactive
    // open change already replaced it.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (seededInstantType === undefined) {
            return undefined;
        }
        const clearSeededInstantType = ()=>{
            if (store.state.instantType === seededInstantType) {
                store.set('instantType', undefined);
            }
        };
        // A controlled close can interrupt the initial enter before the animations-finished cleanup
        // below fires (its abort cancels the pending callback, and a closed popup schedules no new
        // one). Nothing is left to protect once closing starts — the exit's suppression was already
        // decided at its trigger commit — so clear now or the next reopen renders a stale
        // `[data-instant]`.
        if (!open) {
            clearSeededInstantType();
            return undefined;
        }
        if (transitionStatus !== undefined) {
            return undefined;
        }
        // With no popup element (e.g. its subtree is suspended or waiting on data), there is no
        // enter transition to protect, and `useAnimationsFinished` would return without invoking the
        // callback — a ref assignment alone would never rerun this effect, leaving the seed stuck.
        // Clear immediately: a popup that appears after the reveal settles is page-load-like content.
        if (store.context.popupRef.current == null) {
            clearSeededInstantType();
            return undefined;
        }
        const abortController = new AbortController();
        runOnceAnimationsFinish(clearSeededInstantType, abortController.signal);
        return ()=>{
            abortController.abort();
        };
    }, [
        seededInstantType,
        open,
        transitionStatus,
        runOnceAnimationsFinish,
        store
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_14__/* .useIsoLayoutEffect */ .g)(()=>{
        if (contextMenuContext && !parentMenuRootContext) {
            // This is a context menu root.
            // It doesn't support detached triggers yet, so we have to sync the parent context manually.
            store.update({
                parent: {
                    type: 'context-menu',
                    context: contextMenuContext
                },
                floatingNodeId: floatingNodeIdFromContext,
                floatingParentNodeId: floatingParentNodeIdFromContext
            });
        } else if (parentMenuRootContext || !store.select('activeTriggerElement')) {
            // Without an active trigger, the root must supply its own tree IDs.
            // Read the store here: a trigger can register after render, before this effect.
            store.update({
                floatingNodeId: floatingNodeIdFromContext,
                floatingParentNodeId: floatingParentNodeIdFromContext
            });
        }
    }, [
        contextMenuContext,
        parentMenuRootContext,
        floatingNodeIdFromContext,
        floatingParentNodeIdFromContext,
        activeTriggerElement,
        store
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!open) {
            openEventRef.current = null;
        }
        if (parent.type !== 'context-menu') {
            return;
        }
        if (!open) {
            allowOutsidePressDismissalTimeout.clear();
            allowOutsidePressDismissalRef.current = false;
            return;
        }
        // With `mousedown` outside press events and long press touch input, there
        // needs to be a grace period after opening to ensure the dismissal event
        // doesn't fire immediately after open.
        allowOutsidePressDismissalTimeout.start(500, ()=>{
            allowOutsidePressDismissalRef.current = true;
        });
    }, [
        allowOutsidePressDismissalTimeout,
        open,
        parent.type
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_14__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open && !hoverEnabled) {
            store.set('hoverEnabled', true);
        }
    }, [
        open,
        hoverEnabled,
        store
    ]);
    const setOpen = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_15__/* .useStableCallback */ .K)((nextOpen, eventDetails)=>{
        const reason = eventDetails.reason;
        // Read the store directly, as relayed tree events and stale hover timers can request
        // a close after the state changed but before this component re-rendered.
        if (!nextOpen && !store.select('open')) {
            return;
        }
        if (open === nextOpen && eventDetails.trigger === activeTriggerElement && lastOpenChangeReason === reason) {
            return;
        }
        const shouldPreventUnmountOnClose = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_12__/* .attachPreventUnmountOnClose */ .T1)(eventDetails);
        // Do not immediately reset the activeTriggerId to allow
        // exit animations to play and focus to be returned correctly.
        if (!nextOpen && eventDetails.trigger == null) {
            eventDetails.trigger = activeTriggerElement ?? undefined;
        }
        onOpenChange?.(nextOpen, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        store.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
        const nativeEvent = eventDetails.event;
        if (nextOpen === false && reason !== _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .itemPress */ .Bo && nativeEvent?.type === 'click' && nativeEvent.pointerType === 'touch' && !allowTouchToCloseRef.current) {
            return;
        }
        // Prevent the menu from closing on mobile devices that have a delayed click event.
        // In some cases the menu, when tapped, will fire the focus event first and then the click event.
        // Without this guard, the menu will close immediately after opening.
        if (nextOpen && reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .triggerFocus */ .F4) {
            allowTouchToCloseRef.current = false;
            allowTouchToCloseTimeout.start(300, ()=>{
                allowTouchToCloseRef.current = true;
            });
        } else {
            allowTouchToCloseRef.current = true;
            allowTouchToCloseTimeout.clear();
        }
        const isDismissClose = !nextOpen && (reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .escapeKey */ .jv || reason == null);
        openEventRef.current = eventDetails.event;
        const popupOpenState = (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_12__/* .createPopupOpenState */ .cQ)(store.state, nextOpen, eventDetails.trigger, shouldPreventUnmountOnClose());
        popupOpenState.openChangeReason = reason;
        popupOpenState.keyboardOpen = nextOpen && (0,_utils_isKeyboardOpen_mjs__WEBPACK_IMPORTED_MODULE_17__/* .isKeyboardOpen */ .u)(reason, nativeEvent);
        if (parent.type === 'menubar' && (reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .triggerFocus */ .F4 || reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .focusOut */ .Xn || reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .triggerHover */ .N7 || reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .listNavigation */ .Dq || reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .siblingOpen */ .p)) {
            popupOpenState.instantType = 'group';
        } else if ((0,_utils_isKeyboardOpen_mjs__WEBPACK_IMPORTED_MODULE_17__/* .isKeyboardClick */ .S)(reason, nativeEvent)) {
            popupOpenState.instantType = 'click';
        } else if (isDismissClose) {
            popupOpenState.instantType = 'dismiss';
        } else {
            popupOpenState.instantType = undefined;
        }
        // `instantType` must land in the same update that mounts the popup subtree: in React 17
        // legacy mode this `update` can flush synchronously, and a separate `instantType` write
        // after it would come too late for an initially open submenu seeding its own store from
        // this one during that flush.
        store.update(popupOpenState);
    });
    const floatingRootContext = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_18__/* .useSyncedFloatingRootContext */ .D)({
        popupStore: store,
        floatingRootContext: store.state.floatingRootContext,
        floatingId,
        nested: floatingParentNodeIdFromContext != null,
        onOpenChange: setOpen
    });
    const floatingEvents = floatingRootContext.context.events;
    // Registered in a layout effect (not a passive one) so `setOpen` emits from imperative
    // `MenuHandle.open()` calls made in the same commit this root mounts — e.g. from another layout
    // effect during a route-transition handoff — are received instead of being silently dropped.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_14__/* .useIsoLayoutEffect */ .g)(()=>{
        const handleSetOpenEvent = ({ open: nextOpen, eventDetails })=>setOpen(nextOpen, eventDetails);
        floatingEvents.on('setOpen', handleSetOpenEvent);
        return ()=>{
            floatingEvents?.off('setOpen', handleSetOpenEvent);
        };
    }, [
        floatingEvents,
        setOpen
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_14__/* .useIsoLayoutEffect */ .g)(()=>store.subscribeToParentMenu(), [
        store
    ]);
    const handleImperativeClose = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_19__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .imperativeAction */ .zJ));
    }, [
        store
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(actionsRef, ()=>({
            unmount: forceUnmount,
            close: handleImperativeClose
        }), [
        forceUnmount,
        handleImperativeClose
    ]);
    let ctx;
    if (parent.type === 'context-menu') {
        ctx = parent.context;
    }
    react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(ctx?.positionerRef, ()=>positionerElement, [
        positionerElement
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(ctx?.actionsRef, ()=>({
            setOpen
        }), [
        setOpen
    ]);
    const dismiss = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_20__/* .useDismiss */ .s)(floatingRootContext, {
        enabled: !disabled,
        bubbles: {
            escapeKey: closeParentOnEsc && parent.type === 'menu'
        },
        outsidePress () {
            if (parent.type !== 'context-menu' || openEventRef.current?.type === 'contextmenu') {
                return true;
            }
            return allowOutsidePressDismissalRef.current;
        },
        externalTree: nested ? floatingTreeRoot : undefined
    });
    const direction = (0,_internals_direction_context_DirectionContext_mjs__WEBPACK_IMPORTED_MODULE_21__/* .useDirection */ .j)();
    const listNavigation = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_22__/* .useListNavigation */ .C1)(floatingRootContext, {
        enabled: !disabled,
        listRef: store.context.itemDomElements,
        activeIndex,
        virtual: virtualFocus,
        nested: parent.type === 'menubar' || !virtualFocus && parent.type !== undefined,
        parentOrientation: parent.type === 'menubar' ? parent.context.orientation : undefined,
        loopFocus,
        // Filtered menus keep DOM focus on the input, while keyboard and virtual opens initially
        // highlight an item as ordinary menus do. The input stays in the arrow-key loop unless the
        // filter highlights automatically.
        focusItemOnOpen: virtualFocus ? keyboardOpen : undefined,
        allowEscape: virtualFocus && loopFocus && allowEscape,
        orientation,
        // A virtual-focus list can navigate on either axis, but its trigger always opens on the
        // vertical one.
        triggerOrientation: virtualFocus ? 'vertical' : orientation,
        rtl: direction === 'rtl',
        disabledIndices: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_23__/* .EMPTY_ARRAY */ .Ml,
        onNavigate (nextActiveIndex, event) {
            store.setActiveIndex(nextActiveIndex, (0,_utils_getHighlightReason_mjs__WEBPACK_IMPORTED_MODULE_24__/* .getHighlightReason */ .B)(event), event?.nativeEvent);
        },
        // A virtual-focus submenu's keyboard opening is orchestrated by its navigation wrapper based
        // on both menus' orientations; the generic arrow-key opening would also react to the parent's
        // forwarded cross-axis keys while closed.
        openOnArrowKeyDown: parent.type !== 'context-menu' && !(virtualFocus && isSubmenu),
        externalTree: !virtualFocus && nested ? floatingTreeRoot : undefined,
        nestedReturnFocusRef: parentMenuStore?.context.virtualFocusRef,
        focusItemOnHover: highlightItemOnHover,
        resetOnPointerLeave
    });
    const onTyping = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((nextTyping)=>{
        store.context.typingRef.current = nextTyping;
    }, [
        store
    ]);
    const typeahead = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_25__/* .useTypeahead */ .l)(floatingRootContext, {
        // Under virtual focus the input owns typing, so typeahead would race the filter query.
        enabled: !disabled && !virtualFocus,
        listRef: store.context.itemLabels,
        elementsRef: store.context.itemDomElements,
        activeIndex,
        resetMs: _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_26__/* .TYPEAHEAD_RESET_MS */ .HQ,
        onMatch: (index, event)=>{
            if (open && index !== activeIndex) {
                store.setActiveIndex(index, _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .keyboard */ .QJ, event.nativeEvent);
            }
        },
        onTyping
    });
    const onItemHighlighted = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_15__/* .useStableCallback */ .K)(onItemHighlightedProp);
    const lastHighlightIndexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(-1);
    // Runs when `activeIndex` commits and again when the item registry settles, since an index
    // can come to point at a different element while its value stays the same.
    const syncHighlightedItem = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_15__/* .useStableCallback */ .K)(()=>{
        const index = store.state.activeIndex;
        const item = index === null ? undefined : store.context.itemDomElements.current[index] ?? undefined;
        // An item removed in this commit stays registered until the list flushes, which calls back
        // here with the settled registry.
        if (item?.isConnected === false) {
            return;
        }
        const itemIndex = item === undefined ? -1 : index;
        if (lastHighlightIndexRef.current === itemIndex && store.context.reportedItem === item) {
            return;
        }
        lastHighlightIndexRef.current = itemIndex;
        store.context.reportedItem = item;
        // Only virtual focus renders from the highlighted element. Publishing it in every menu would
        // notify each item's subscription on every highlight change.
        if (virtualFocus) {
            store.set('highlightedItem', item);
        }
        // The tag left by the write that produced this committed value.
        const { highlightReason, highlightEvent } = store.context;
        store.context.highlightReason = _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .none */ .dv;
        store.context.highlightEvent = undefined;
        if (!onItemHighlightedProp) {
            return;
        }
        onItemHighlighted(item, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_19__/* .createGenericEventDetails */ .M)(highlightReason, highlightEvent, {
            label: item === undefined ? undefined : store.context.itemLabels.current[itemIndex] ?? undefined
        }));
    });
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_14__/* .useIsoLayoutEffect */ .g)(()=>{
        syncHighlightedItem();
    }, [
        activeIndex,
        syncHighlightedItem
    ]);
    // Under virtual focus an element inside the popup holds real focus, so it takes the
    // navigation's reference props (`aria-activedescendant` and the key handling) and the trigger
    // keeps only the props that open the menu.
    const openTriggerProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        if (!virtualFocus) {
            return listNavigation.reference;
        }
        if (!listNavigation.trigger) {
            return _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_23__/* .EMPTY_OBJECT */ .t0;
        }
        // Focusing the trigger while the menu is open must not seed the virtual highlight. This can
        // happen before a pointer press closes the menu in Safari.
        const { onFocus, ...rest } = listNavigation.trigger;
        return rest;
    }, [
        virtualFocus,
        listNavigation.reference,
        listNavigation.trigger
    ]);
    store.useSyncedValue('inputProps', virtualFocus ? listNavigation.reference ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_23__/* .EMPTY_OBJECT */ .t0 : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_23__/* .EMPTY_OBJECT */ .t0);
    const activeTriggerProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        const mergedProps = (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_27__/* .mergeProps */ .v6)(typeahead.reference, openTriggerProps, dismiss.reference, {
            onMouseMove () {
                store.set('allowMouseEnter', true);
            }
        }, interactionTypeProps);
        mergedProps['aria-haspopup'] = 'menu';
        mergedProps['aria-expanded'] = open;
        return mergedProps;
    }, [
        store,
        typeahead.reference,
        openTriggerProps,
        dismiss.reference,
        interactionTypeProps,
        open
    ]);
    const inactiveTriggerProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        const mergedProps = (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_27__/* .mergeProps */ .v6)(listNavigation.trigger, dismiss.trigger, interactionTypeProps);
        mergedProps['aria-haspopup'] = 'menu';
        mergedProps['aria-expanded'] = false;
        return mergedProps;
    }, [
        listNavigation.trigger,
        dismiss.trigger,
        interactionTypeProps
    ]);
    // The initial render has no store subscribers yet. Seed these props before triggers render so
    // the synchronization effect below doesn't make every trigger render twice in the first commit.
    (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_8__/* .useRefWithInit */ .j)(()=>{
        store.update({
            inactiveTriggerProps
        });
        return null;
    });
    const popupProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>(0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_27__/* .mergeProps */ .v6)(_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_12__/* .FOCUSABLE_POPUP_PROPS */ .Ls, {
            onMouseMove () {
                store.set('allowMouseEnter', true);
                if (parent.type === 'menu') {
                    store.set('hoverEnabled', false);
                }
            },
            onClick () {
                if (store.select('hoverEnabled')) {
                    store.set('hoverEnabled', false);
                }
            },
            onKeyDown (event) {
                // The Menubar's CompositeRoot captures keyboard events via
                // event delegation. This works well when Menu.Root is nested inside Menubar,
                // but with detached triggers we need to manually forward the event to the CompositeRoot.
                const relay = store.select('keyboardEventRelay');
                if (relay && !event.isPropagationStopped()) {
                    relay(event);
                }
            }
        }, typeahead.floating, listNavigation.floating, dismiss.floating), [
        parent.type,
        store,
        typeahead.floating,
        listNavigation.floating,
        dismiss.floating
    ]);
    const itemProps = listNavigation.item ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_23__/* .EMPTY_OBJECT */ .t0;
    (0,_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_12__/* .usePopupInteractionProps */ .i6)(store, {
        floatingRootContext,
        activeTriggerProps,
        inactiveTriggerProps,
        popupProps,
        itemProps
    });
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            store,
            parent: parentFromContext,
            orientation,
            loopFocus,
            allowEscape,
            defaultFloatingId,
            setRenderedFloatingId,
            virtualFocus,
            parentVirtualFocus,
            syncHighlightedItem
        }), [
        store,
        parentFromContext,
        orientation,
        loopFocus,
        allowEscape,
        defaultFloatingId,
        virtualFocus,
        parentVirtualFocus,
        syncHighlightedItem
    ]);
    const renderedChildren = typeof children === 'function' ? children({
        payload
    }) : children;
    let content = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .MenuRootContext */ .J.Provider, {
        value: context,
        children: [
            handle && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_12__/* .PopupHandleAttachment */ .Ae, {
                handle: handle,
                store: store
            }),
            renderedChildren
        ]
    });
    if (parent.type === undefined || parent.type === 'context-menu') {
        // set up a FloatingTree to provide the context to nested menus
        content = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__/* .FloatingTree */ .P6, {
            externalTree: floatingTreeRoot,
            children: content
        });
    }
    return content;
});
/**
 * Groups all parts of the menu.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ if (false) {}
function MenuRoot(props) {
    const filterProvider = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_filter_provider_MenuFilterProviderContext_mjs__WEBPACK_IMPORTED_MODULE_28__/* .MenuFilterProviderContext */ .C);
    if (filterProvider === null) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MenuRootInternal, {
            ...props
        });
    }
    const FilterRoot = filterProvider.Root;
    return(/*#__PURE__*/ // The root consumes its provider so a plain submenu inside doesn't inherit it.
    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_filter_provider_MenuFilterProviderContext_mjs__WEBPACK_IMPORTED_MODULE_28__/* .MenuFilterProviderContext */ .C.Provider, {
        value: null,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FilterRoot, {
            ...filterProvider.options,
            ...props
        })
    }));
}


/***/ }),

/***/ 85712:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ useRenderedId)
/* harmony export */ });
/* unused harmony export resolveRenderedId */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88401);


/**
 * Resolves an element's id using the same precedence as `useRenderElement`.
 * Returns `''` when the element renders with an explicitly empty id, which consumers must treat
 * as "no id" rather than falling back to the generated one, so ARIA relationships never reference
 * an id no element carries. Render callbacks are opaque and are expected to use the id passed to
 * them.
 *
 * @internal
 */
function resolveRenderedId(props, fallbackId) {
  const render = (0,_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_1__/* .unwrapLazyRenderProp */ .x)(props.render);
  if (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(render)) {
    const renderProps = render.props;
    if (Object.hasOwn(renderProps, 'id')) {
      return renderProps.id ?? '';
    }
  }
  return props.id ?? fallbackId;
}

/**
 * Resolves the element's id and returns a ref that publishes it to the owner while mounted.
 * A generated fallback is never published as an override, so removing an explicit id lets the
 * element return to the generated one.
 *
 * @internal
 */
function useRenderedId(props, defaultId, setId) {
  const id = resolveRenderedId(props, defaultId);
  const registeredId = id === defaultId ? undefined : id;
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(element => setId?.(element ? registeredId : undefined), [registeredId, setId]);
  return [id, ref];
}

/***/ }),

/***/ 87799:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ useCompositeItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55218);
/* harmony import */ var _root_CompositeRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70481);
/* harmony import */ var _list_useCompositeListItem_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54068);
/* __next_internal_client_entry_do_not_use__ useCompositeItem auto */ 



function useCompositeItem(params = {}) {
    const { highlightItemOnHover, highlightedIndex, onHighlightedIndexChange } = (0,_root_CompositeRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useCompositeRootContext */ .G)();
    const { ref, index } = (0,_list_useCompositeListItem_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useCompositeListItem */ .q)(params);
    const isHighlighted = highlightedIndex === index;
    const itemRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const mergedRef = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__/* .useMergedRefs */ .a)(ref, itemRef);
    const compositeProps = {
        tabIndex: isHighlighted ? 0 : -1,
        onFocus () {
            onHighlightedIndexChange(index);
        },
        onMouseMove () {
            const item = itemRef.current;
            if (!highlightItemOnHover || !item) {
                return;
            }
            const disabled = item.hasAttribute('disabled') || item.ariaDisabled === 'true';
            if (!isHighlighted && !disabled) {
                item.focus();
            }
        }
    };
    return {
        compositeProps,
        compositeRef: mergedRef,
        index
    };
}


/***/ }),

/***/ 89691:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ useMenuItemCommonProps)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(97827);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76175);
/* harmony import */ var _context_menu_root_ContextMenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98339);
/* harmony import */ var _root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39048);
/* harmony import */ var _utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44137);
/* __next_internal_client_entry_do_not_use__ useMenuItemCommonProps auto */ 





function preventMouseDownDefault(event) {
    event.preventDefault();
}
/**
 * Returns common props shared by all menu item types.
 * This hook extracts the shared logic for id, role, tabIndex, and interaction handlers.
 */ function useMenuItemCommonProps(params) {
    const { closeOnClick, highlighted, id, nodeId, store, typingRef, itemRef, itemMetadata } = params;
    const rootContext = (0,_root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useMenuRootContext */ .Y)();
    const contextMenuContext = (0,_context_menu_root_ContextMenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useContextMenuRootContext */ .v)(true);
    // A submenu trigger is an item of the parent menu's list, so it follows that list's focus model.
    const isSubmenuTrigger = itemMetadata.type === 'submenu-trigger';
    const virtualFocus = isSubmenuTrigger ? rootContext.parentVirtualFocus : rootContext.virtualFocus;
    const selectionStore = isSubmenuTrigger && rootContext.parent.type === 'menu' ? rootContext.parent.store : rootContext.store;
    const ariaSelected = selectionStore.useState('webkitAriaSelected', highlighted);
    const { events: menuEvents } = store.useState('floatingTreeRoot');
    const open = store.useState('open');
    const isContextMenu = contextMenuContext !== undefined;
    // `-1` rather than omitting it, which leaves links and buttons in the tab order.
    const tabIndex = !virtualFocus && open && highlighted ? 0 : -1;
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            id,
            role: 'menuitem',
            tabIndex,
            'aria-selected': ariaSelected,
            // Real focus stays on the input or list that owns virtual navigation.
            onMouseDown: virtualFocus ? preventMouseDownDefault : undefined,
            onKeyDown (event) {
                if (event.key === ' ' && typingRef?.current) {
                    event.preventDefault();
                }
            },
            onMouseMove (event) {
                if (!nodeId) {
                    return;
                }
                // Inform the floating tree that a menu item within this menu was hovered/moved over
                // so unrelated descendant submenus can be closed.
                menuEvents.emit('itemhover', {
                    nodeId,
                    target: event.currentTarget
                });
            },
            onClick (event) {
                if (closeOnClick) {
                    menuEvents.emit('close', {
                        domEvent: event.nativeEvent,
                        reason: _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_3__/* .itemPress */ .Bo
                    });
                }
            },
            onMouseUp (event) {
                if (contextMenuContext) {
                    const initialCursorPoint = contextMenuContext.initialCursorPointRef.current;
                    contextMenuContext.initialCursorPointRef.current = null;
                    if (isContextMenu && initialCursorPoint && Math.abs(event.clientX - initialCursorPoint.x) <= 1 && Math.abs(event.clientY - initialCursorPoint.y) <= 1) {
                        return;
                    }
                    // On non-macOS platforms, this mouseup belongs to the right-click gesture
                    // that opened the context menu, so it must not activate an item.
                    if (isContextMenu && !_base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_4__/* .mac */ .Md && event.button === 2) {
                        return;
                    }
                }
                if (itemRef.current && store.context.allowMouseUpTriggerRef.current && (!isContextMenu || event.button === 2)) {
                    // This fires whenever the user clicks on the trigger, moves the cursor, and releases it over the item.
                    // We trigger the click and override the `closeOnClick` preference to always close the menu.
                    if (itemMetadata.type === 'regular-item') {
                        // `detail: 1` and `pointerType: 'mouse'` mark this as a mouse-gesture click so
                        // MenuRoot and FloatingFocusManager don't treat it as a keyboard activation.
                        (0,_utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_5__/* .dispatchClickWithModifiers */ .B)(itemRef.current, event, {
                            detail: 1,
                            pointerType: 'mouse'
                        });
                    }
                }
            }
        }), [
        closeOnClick,
        tabIndex,
        id,
        menuEvents,
        nodeId,
        store.context.allowMouseUpTriggerRef,
        typingRef,
        itemRef,
        contextMenuContext,
        isContextMenu,
        itemMetadata.type,
        ariaSelected,
        virtualFocus
    ]);
}


/***/ }),

/***/ 90469:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ MenuPortal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34934);
/* harmony import */ var _root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39048);
/* harmony import */ var _MenuPortalContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41948);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ MenuPortal auto */ 



/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ 
const MenuPortal = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function MenuPortal(props, forwardedRef) {
    const { keepMounted = false, ...portalProps } = props;
    const { store, parent } = (0,_root_MenuRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useMenuRootContext */ .Y)();
    const mounted = store.useState('mounted');
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
        return null;
    }
    // The hidden `aria-owns` owner renders here, in the React tree, so the role must be decided by
    // where this portal sits, not by the active trigger. `parent` comes from context (the `Menu.Root`
    // position), unlike the store's `parent`, which a detached trigger overwrites with its own.
    const portalOwnerRole = parent.type === 'menu' || parent.type === 'menubar' ? 'group' : undefined;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_MenuPortalContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .MenuPortalContext */ .V.Provider, {
        value: keepMounted,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .FloatingPortal */ .XF, {
            ref: forwardedRef,
            ...portalProps,
            portalOwnerRole: portalOwnerRole
        })
    });
});
if (false) {}


/***/ }),

/***/ 95327:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ usePopupHandleStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var use_sync_external_store_shim__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8039);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8994);
/* __next_internal_client_entry_do_not_use__ usePopupHandleStore auto */ 


/**
 * Reads the store currently exposed by a popup handle and subscribes to store-pointer changes.
 * Detached triggers use this to follow a handle as a root attaches or detaches: while no root is
 * attached, the handle exposes its fallback store; once a root attaches, subscribers re-render and
 * read from the live root store.
 *
 * Returns `undefined` when no handle is provided so callers can fall back to their root context.
 *
 * @param handle The popup handle to read from, or `undefined` when the trigger is not handle-bound.
 */ function usePopupHandleStore(handle) {
    const subscribe = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((listener)=>{
        if (handle === undefined) {
            return _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE;
        }
        return handle.subscribeStore(listener);
    }, [
        handle
    ]);
    const getSnapshot = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        return handle === undefined ? undefined : handle.store;
    }, [
        handle
    ]);
    return (0,use_sync_external_store_shim__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore)(subscribe, getSnapshot, ()=>handle?.serverStore);
}


/***/ }),

/***/ 96836:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GI: () => (/* binding */ isClickLikeOpenEvent),
/* harmony export */   h$: () => (/* binding */ isHoverOpenEvent),
/* harmony export */   hq: () => (/* binding */ getRestMs),
/* harmony export */   uf: () => (/* binding */ getDelay)
/* harmony export */ });
/* harmony import */ var _utils_event_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17947);


function resolveValue(value, pointerType) {
  if (pointerType != null && !(0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isMouseLikePointerType */ .Go)(pointerType)) {
    return 0;
  }
  if (typeof value === 'function') {
    return value();
  }
  return value;
}
function getDelay(value, prop, pointerType) {
  const result = resolveValue(value, pointerType);
  if (typeof result === 'number') {
    return result;
  }
  return result?.[prop];
}
function getRestMs(value) {
  if (typeof value === 'function') {
    return value();
  }
  return value;
}
function isClickLikeOpenEvent(openEventType, interactedInside) {
  return interactedInside || openEventType === 'click' || openEventType === 'mousedown';
}
function isHoverOpenEvent(openEventType) {
  return openEventType?.includes('mouse') && openEventType !== 'mousedown';
}

/***/ }),

/***/ 98339:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ useContextMenuRootContext)
/* harmony export */ });
/* unused harmony export ContextMenuRootContext */
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ ContextMenuRootContext,useContextMenuRootContext auto */ 

const ContextMenuRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useContextMenuRootContext(optional = true) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ContextMenuRootContext);
    if (context === undefined && !optional) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(25));
    }
    return context;
}


/***/ })

}]);