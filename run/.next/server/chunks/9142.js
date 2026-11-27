"use strict";
exports.id = 9142;
exports.ids = [9142];
exports.modules = {

/***/ 32962:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ SelectItemText)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(614128);
/* harmony import */ var _item_SelectItemContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(876878);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(671775);
/* __next_internal_client_entry_do_not_use__ SelectItemText auto */ 



/**
 * A text label of the select item.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectItemText = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.memo(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectItemText(componentProps, forwardedRef) {
    const { index, textRef, selectedByFocus } = (0,_item_SelectItemContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useSelectItemContext */ .G)();
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useSelectRootContext */ .ll)();
    const { render, className, style, ...elementProps } = componentProps;
    const localRef = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node)=>{
        if (!node) {
            return;
        }
        if (index === 0) {
            store.context.firstItemTextRef.current = node;
        }
        if (selectedByFocus) {
            store.context.selectedItemTextRef.current = node;
        }
    }, [
        store,
        index,
        selectedByFocus
    ]);
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useRenderElement */ .o)('div', componentProps, {
        ref: [
            localRef,
            forwardedRef,
            textRef
        ],
        props: elementProps
    });
    return element;
}));
if (false) {}


/***/ }),

/***/ 67380:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ SelectScrollArrow)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(324077);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(816942);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(614128);
/* harmony import */ var _positioner_SelectPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(288576);
/* harmony import */ var _internals_useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(529118);
/* harmony import */ var _internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(562340);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(671775);
/* harmony import */ var _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(583758);
/* harmony import */ var _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(511218);
/* __next_internal_client_entry_do_not_use__ SelectScrollArrow auto */ 









/**
 * @internal
 */ const SelectScrollArrow = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectScrollArrow(componentProps, forwardedRef) {
    const { render, className, style, direction, keepMounted, ...elementProps } = componentProps;
    const isUp = direction === 'up';
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useSelectRootContext */ .ll)();
    const { side, scrollDownArrowRef, scrollUpArrowRef } = (0,_positioner_SelectPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useSelectPositionerContext */ .H)();
    const visibleSelector = isUp ? 'scrollUpArrowVisible' : 'scrollDownArrowVisible';
    const stateVisible = store.useState(visibleSelector);
    const openMethod = store.useState('openMethod');
    // Scroll arrows are disabled for touch modality as they are a hover-only element.
    const visible = stateVisible && openMethod !== 'touch';
    const timeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__/* .useTimeout */ .Z)();
    const scrollArrowRef = isUp ? scrollUpArrowRef : scrollDownArrowRef;
    const { mounted, transitionStatus, setMounted } = (0,_internals_useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useTransitionStatus */ .$)(visible);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__/* .useIsoLayoutEffect */ .g)(()=>{
        store.context.scrollArrowsMountedCountRef.current += 1;
        store.set('hasScrollArrows', true);
        return ()=>{
            store.context.scrollArrowsMountedCountRef.current = Math.max(0, store.context.scrollArrowsMountedCountRef.current - 1);
            if (store.context.scrollArrowsMountedCountRef.current === 0) {
                store.set('hasScrollArrows', false);
            }
        };
    }, [
        store
    ]);
    (0,_internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useOpenChangeComplete */ .v)({
        open: visible,
        ref: scrollArrowRef,
        onComplete () {
            if (!visible) {
                setMounted(false);
            }
        }
    });
    const state = {
        direction,
        visible,
        side,
        transitionStatus
    };
    const defaultProps = {
        'aria-hidden': true,
        children: isUp ? '▲' : '▼',
        style: {
            position: 'absolute'
        },
        onMouseMove (event) {
            if (event.movementX === 0 && event.movementY === 0 || timeout.isStarted()) {
                return;
            }
            store.set('activeIndex', null);
            function scrollNextItem() {
                const scroller = store.state.listElement ?? store.context.popupRef.current;
                if (!scroller) {
                    return;
                }
                store.set('activeIndex', null);
                store.context.handleScrollArrowVisibility(scroller);
                const maxScrollTop = (0,_utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_7__/* .getMaxScrollOffset */ .XF)(scroller.scrollHeight, scroller.clientHeight);
                const scrollTop = (0,_utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_7__/* .normalizeScrollOffset */ .Qw)(scroller.scrollTop, maxScrollTop);
                const isScrolledToEdge = scrollTop === (isUp ? 0 : maxScrollTop);
                const items = store.context.listRef.current;
                if (scrollTop !== scroller.scrollTop) {
                    scroller.scrollTop = scrollTop;
                }
                if (isScrolledToEdge) {
                    timeout.clear();
                    return;
                }
                if (items.length > 0) {
                    const scrollArrowHeight = scrollArrowRef.current?.offsetHeight || 0;
                    scroller.scrollTop = getTargetScrollTop(items, isUp, scrollTop, scroller.clientHeight, scrollArrowHeight, maxScrollTop);
                }
                timeout.start(40, scrollNextItem);
            }
            timeout.start(40, scrollNextItem);
        },
        onMouseLeave () {
            timeout.clear();
        }
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useRenderElement */ .o)('div', componentProps, {
        ref: [
            forwardedRef,
            scrollArrowRef
        ],
        state,
        props: [
            defaultProps,
            elementProps
        ],
        stateAttributesMapping: _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_9__/* .transitionStatusMapping */ .G
    });
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return element;
});
if (false) {}
function getTargetScrollTop(items, isUp, scrollTop, clientHeight, scrollArrowHeight, maxScrollTop) {
    if (isUp) {
        let firstVisibleIndex = 0;
        const visibleTop = scrollTop + scrollArrowHeight - _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_7__/* .SCROLL_EDGE_TOLERANCE_PX */ .Pv;
        for(let i = 0; i < items.length; i += 1){
            const item = items[i];
            if (item && item.offsetTop >= visibleTop) {
                firstVisibleIndex = i;
                break;
            }
        }
        const targetIndex = Math.max(0, firstVisibleIndex - 1);
        const targetItem = items[targetIndex];
        return targetIndex < firstVisibleIndex && targetItem ? (0,_utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_7__/* .normalizeScrollOffset */ .Qw)(targetItem.offsetTop - scrollArrowHeight, maxScrollTop) : 0;
    }
    let lastVisibleIndex = items.length - 1;
    const visibleBottom = scrollTop + clientHeight - scrollArrowHeight + _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_7__/* .SCROLL_EDGE_TOLERANCE_PX */ .Pv;
    for(let i = 0; i < items.length; i += 1){
        const item = items[i];
        if (item && item.offsetTop + item.offsetHeight > visibleBottom) {
            lastVisibleIndex = Math.max(0, i - 1);
            break;
        }
    }
    const targetIndex = Math.min(items.length - 1, lastVisibleIndex + 1);
    const targetItem = items[targetIndex];
    return targetIndex > lastVisibleIndex && targetItem ? (0,_utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_7__/* .normalizeScrollOffset */ .Qw)(targetItem.offsetTop + targetItem.offsetHeight - clientHeight + scrollArrowHeight, maxScrollTop) : maxScrollTop;
}


/***/ }),

/***/ 86779:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ SelectScrollDownArrow)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _scroll_arrow_SelectScrollArrow_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67380);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ SelectScrollDownArrow auto */ 


/**
 * An element that scrolls the select popup down when hovered. Does not render when using touch input.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectScrollDownArrow = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectScrollDownArrow(props, forwardedRef) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_scroll_arrow_SelectScrollArrow_mjs__WEBPACK_IMPORTED_MODULE_2__/* .SelectScrollArrow */ .f, {
        ...props,
        ref: forwardedRef,
        direction: "down"
    });
});
if (false) {}


/***/ }),

/***/ 135633:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ SelectSeparator)
/* harmony export */ });
/* harmony import */ var _utils_listbox_separator_ListboxSeparator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(570051);
/* __next_internal_client_entry_do_not_use__ SelectSeparator auto */ 
/**
 * A visual separator between items or groups.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectSeparator = _utils_listbox_separator_ListboxSeparator_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ListboxSeparator */ .J;


/***/ }),

/***/ 140350:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wI: () => (/* binding */ popupSide)
/* harmony export */ });
/* unused harmony exports popupOpen, pressed, disabled, readonly, required, valid, invalid, touched, dirty, filled, focused, placeholder */
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(275671);


/**
 * Present when the corresponding select is open.
 */
const popupOpen = _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__/* .popupOpen */ .L;
/**
 * Present when the trigger is pressed.
 */
const pressed = _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__/* .pressed */ .V;
/**
 * Present when the select is disabled.
 */
const disabled = 'data-disabled';
/**
 * Present when the select is readonly.
 */
const readonly = 'data-readonly';
/**
 * Indicates which side the corresponding popup is positioned relative to its anchor.
 * @type {'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start' | null}
 */
const popupSide = 'data-popup-side';
/**
 * Present when the select is required.
 */
const required = 'data-required';
/**
 * Present when the select is in a valid state (when wrapped in Field.Root).
 */
const valid = 'data-valid';
/**
 * Present when the select is in an invalid state (when wrapped in Field.Root).
 */
const invalid = 'data-invalid';
/**
 * Present when the select has been touched (when wrapped in Field.Root).
 */
const touched = 'data-touched';
/**
 * Present when the select's value has changed (when wrapped in Field.Root).
 */
const dirty = 'data-dirty';
/**
 * Present when the select has a value (when wrapped in Field.Root).
 */
const filled = 'data-filled';
/**
 * Present when the select trigger is focused (when wrapped in Field.Root).
 */
const focused = 'data-focused';
/**
 * Present when the select doesn't have a value.
 */
const placeholder = 'data-placeholder';

/***/ }),

/***/ 173230:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ SelectGroupLabel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(816942);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8231);
/* harmony import */ var _group_SelectGroupContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(420582);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(671775);
/* __next_internal_client_entry_do_not_use__ SelectGroupLabel auto */ 




/**
 * An accessible label that is automatically associated with its parent group.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectGroupLabel = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectGroupLabel(componentProps, forwardedRef) {
    const { render, className, style, id: idProp, ...elementProps } = componentProps;
    const { setLabelId } = (0,_group_SelectGroupContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useSelectGroupContext */ .M)();
    const id = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useBaseUiId */ .e)(idProp);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(()=>{
        setLabelId(id);
        return ()=>{
            setLabelId((currentId)=>currentId === id ? undefined : currentId);
        };
    }, [
        id,
        setLabelId
    ]);
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useRenderElement */ .o)('div', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id,
                'aria-hidden': true
            },
            elementProps
        ]
    });
    return element;
});
if (false) {}


/***/ }),

/***/ 185448:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronUp)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165667);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "chevron-up",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m18 15-6-6-6 6",
                key: "153udz"
            }
        ]
    ]
};
__iconData.node;
const ChevronUp = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=chevron-up.mjs.map


/***/ }),

/***/ 214165:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ serializeValue)
/* harmony export */ });
function serializeValue(value) {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

/***/ }),

/***/ 221376:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ useCSPContext)
/* harmony export */ });
/* unused harmony export CSPContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ CSPContext,useCSPContext auto */ 
const CSPContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
const DEFAULT_CSP_CONTEXT_VALUE = {
    disableStyleElements: false
};
function useCSPContext() {
    return react__WEBPACK_IMPORTED_MODULE_0__.useContext(CSPContext) ?? DEFAULT_CSP_CONTEXT_VALUE;
}


/***/ }),

/***/ 224281:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ SelectItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(816942);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(614128);
/* harmony import */ var _internals_composite_list_useCompositeListItem_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(472276);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(671775);
/* harmony import */ var _SelectItemContext_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(876878);
/* harmony import */ var _internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(640902);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(369827);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(460485);
/* harmony import */ var _internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(973241);
/* harmony import */ var _floating_ui_react_utils_event_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(206683);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ SelectItem auto */ 










/**
 * An individual option in the select popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ 
const SelectItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.memo(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectItem(componentProps, forwardedRef) {
    const { render, className, style, value: itemValue = null, label, disabled: disabledProp = false, nativeButton = false, ...elementProps } = componentProps;
    const textRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const listItem = (0,_internals_composite_list_useCompositeListItem_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useCompositeListItem */ .q)({
        guess: true,
        label,
        textRef
    });
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useSelectRootContext */ .ll)();
    const { props: itemProps, multiple, disabled: selectDisabled, readOnly, isItemEqualToValue } = store.useState('itemRoot');
    const disabled = selectDisabled || disabledProp;
    const highlighted = store.useState('isActive', listItem.index);
    const open = store.useState('open');
    const selected = store.useState('isSelected', itemValue);
    const selectedByFocus = store.useState('isSelectedByFocus', listItem.index);
    const index = listItem.index;
    const itemRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__/* .useIsoLayoutEffect */ .g)(()=>{
        const values = store.context.valuesRef.current;
        values[index] = itemValue;
        return ()=>{
            delete values[index];
        };
    }, [
        index,
        itemValue,
        store
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__/* .useIsoLayoutEffect */ .g)(()=>{
        const selectedValue = store.state.value;
        const currentIndex = store.state.selectedIndex;
        let nextIndex = currentIndex;
        let claims;
        if (multiple && Array.isArray(selectedValue)) {
            // The claiming item also owns the text ref that aligns the popup.
            nextIndex = (0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_5__/* .resolveSelectedIndex */ .Q0)(index, itemValue, store.context.valuesRef.current, selectedValue, isItemEqualToValue, currentIndex);
            claims = nextIndex === index;
            if (index === currentIndex && !claims) {
                store.context.selectedItemTextRef.current = null;
            }
        } else {
            claims = selectedValue !== undefined && (0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_5__/* .compareItemEquality */ .tl)(itemValue, selectedValue, isItemEqualToValue);
            if (claims) {
                nextIndex = index;
            }
        }
        store.set('selectedIndex', nextIndex);
        // Make sure SelectPopup can measure the selected item on first open.
        // SelectItemText can still update this ref later when focus moves.
        if (claims && textRef.current) {
            store.context.selectedItemTextRef.current = textRef.current;
        }
    }, [
        index,
        multiple,
        isItemEqualToValue,
        store,
        itemValue
    ]);
    const pointerTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef('mouse');
    const allowMouseSelectionRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const { getButtonProps, buttonRef } = (0,_internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useButton */ .s)({
        disabled,
        focusableWhenDisabled: true,
        native: nativeButton,
        composite: true
    });
    const state = {
        disabled,
        selected,
        highlighted
    };
    function commitSelection(event) {
        // A forced-open select (`open`/`defaultOpen`) can still receive item activations even
        // when the root is disabled or read-only, so guard the commit here too.
        if (selectDisabled || readOnly) {
            return;
        }
        const selectedValue = store.state.value;
        if (multiple) {
            const currentValue = Array.isArray(selectedValue) ? selectedValue : [];
            const nextValue = selected ? (0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_5__/* .removeItem */ .Ai)(currentValue, itemValue, isItemEqualToValue) : [
                ...currentValue,
                itemValue
            ];
            store.context.setValue(nextValue, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_7__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__/* .itemPress */ .Bo, event));
        } else {
            store.context.setValue(itemValue, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_7__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__/* .itemPress */ .Bo, event));
            store.context.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_7__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_8__/* .itemPress */ .Bo, event));
        }
    }
    function resetDragMovement() {
        store.context.selectionRef.current.dragY = 0;
    }
    const defaultProps = {
        role: 'option',
        'aria-selected': selected,
        tabIndex: open && highlighted ? 0 : -1,
        onKeyDown (event) {
            store.set('activeIndex', index);
            if (event.key === ' ' && store.context.typingRef.current) {
                // `useButton` skips Space activation for `role="option"` items when the keydown
                // is `defaultPrevented`, keeping typeahead spaces from committing a selection.
                event.preventDefault();
            }
        },
        onClick (event) {
            const isMouseClick = pointerTypeRef.current !== 'touch';
            const clickPointerType = event.nativeEvent.pointerType;
            const isVirtualMouseClick = isMouseClick && (0,_floating_ui_react_utils_event_mjs__WEBPACK_IMPORTED_MODULE_9__/* .isVirtualClick */ .YF)(event.nativeEvent) && // Generic no-pointer `detail === 0` clicks stay tied to highlight state. Virtual
            // clicks that carry browser pointer data, including an empty string from assistive
            // technology, can activate unhighlighted items.
            (clickPointerType !== undefined || highlighted);
            // With alignItemWithTrigger, opening can place an item under the cursor. Real mouse
            // clicks must start on the item, while virtual clicks represent explicit keyboard or
            // assistive technology activation.
            const isInvalidMouseClick = isMouseClick && !isVirtualMouseClick && !allowMouseSelectionRef.current;
            allowMouseSelectionRef.current = false;
            if (disabled || isInvalidMouseClick) {
                return;
            }
            commitSelection(event.nativeEvent);
        },
        onPointerEnter (event) {
            pointerTypeRef.current = event.pointerType;
        },
        onPointerMove (event) {
            if (event.pointerType === 'mouse' && event.buttons === 1) {
                const selection = store.context.selectionRef.current;
                selection.dragY += event.movementY;
                if (selection.dragY ** 2 >= 64) {
                    selection.allowUnselectedMouseUp = true;
                }
            }
        },
        onPointerDown (event) {
            pointerTypeRef.current = event.pointerType;
            allowMouseSelectionRef.current = true;
            resetDragMovement();
        },
        onMouseUp () {
            resetDragMovement();
            if (disabled || pointerTypeRef.current === 'touch') {
                return;
            }
            // Regular clicks are committed by the click event.
            if (allowMouseSelectionRef.current) {
                return;
            }
            const disallowSelectedMouseUp = !store.context.selectionRef.current.allowSelectedMouseUp && selected;
            const disallowUnselectedMouseUp = !store.context.selectionRef.current.allowUnselectedMouseUp && !selected;
            if (disallowSelectedMouseUp || disallowUnselectedMouseUp) {
                return;
            }
            allowMouseSelectionRef.current = true;
            itemRef.current?.click();
            allowMouseSelectionRef.current = false;
        }
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useRenderElement */ .o)('div', componentProps, {
        ref: [
            buttonRef,
            forwardedRef,
            listItem.ref,
            itemRef
        ],
        state,
        props: [
            itemProps,
            defaultProps,
            elementProps,
            getButtonProps
        ]
    });
    const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            selected,
            index,
            textRef,
            selectedByFocus
        }), [
        selected,
        index,
        textRef,
        selectedByFocus
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_SelectItemContext_mjs__WEBPACK_IMPORTED_MODULE_11__/* .SelectItemContext */ .z.Provider, {
        value: contextValue,
        children: element
    });
}));
if (false) {}


/***/ }),

/***/ 288576:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useSelectPositionerContext),
/* harmony export */   i: () => (/* binding */ SelectPositionerContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(854729);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ SelectPositionerContext,useSelectPositionerContext auto */ 

const SelectPositionerContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useSelectPositionerContext() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SelectPositionerContext);
    if (!context) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(59));
    }
    return context;
}


/***/ }),

/***/ 334644:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronLeft)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165667);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "chevron-left",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m15 18-6-6 6-6",
                key: "1wnfg3"
            }
        ]
    ]
};
__iconData.node;
const ChevronLeft = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=chevron-left.mjs.map


/***/ }),

/***/ 368056:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ useFloatingRootContext)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(960977);
/* harmony import */ var _base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3299);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(925685);
/* harmony import */ var _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(549259);
/* harmony import */ var _components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(451032);
/* harmony import */ var _components_FloatingRootStore_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(721027);
/* __next_internal_client_entry_do_not_use__ useFloatingRootContext auto */ 






function useFloatingRootContext(options) {
    const { open = false, onOpenChange, elements = {} } = options;
    const floatingId = (0,_base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_0__/* .useId */ .B)();
    const nested = (0,_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useFloatingParentNodeId */ .R1)() != null;
    if (false) {}
    const store = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_2__/* .useRefWithInit */ .j)(()=>new _components_FloatingRootStore_mjs__WEBPACK_IMPORTED_MODULE_3__/* .FloatingRootStore */ .K({
            open,
            transitionStatus: undefined,
            onOpenChange,
            referenceElement: elements.reference ?? null,
            floatingElement: elements.floating ?? null,
            triggerElements: new _utils_popups_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .PopupTriggerMap */ .Z(),
            floatingId,
            syncOnly: false,
            nested
        })).current;
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__/* .useIsoLayoutEffect */ .g)(()=>{
        const valuesToSync = {
            open,
            floatingId
        };
        if (elements.reference !== undefined) {
            valuesToSync.referenceElement = elements.reference;
            valuesToSync.domReferenceElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_6__/* .isElement */ .vq)(elements.reference) ? elements.reference : null;
        }
        if (elements.floating !== undefined) {
            valuesToSync.floatingElement = elements.floating;
        }
        store.update(valuesToSync);
    }, [
        open,
        floatingId,
        elements.reference,
        elements.floating,
        store
    ]);
    store.context.onOpenChange = onOpenChange;
    store.context.nested = nested;
    return store;
}


/***/ }),

/***/ 392091:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ SelectPositioner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_inertValue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(33408);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(943512);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(614128);
/* harmony import */ var _internals_composite_list_CompositeList_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(238240);
/* harmony import */ var _internals_useAnchorPositioning_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(316533);
/* harmony import */ var _SelectPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(288576);
/* harmony import */ var _utils_InternalBackdrop_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(275514);
/* harmony import */ var _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49219);
/* harmony import */ var _popup_utils_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(770980);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(369827);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(460485);
/* harmony import */ var _internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(973241);
/* harmony import */ var _utils_usePositioner_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(174636);
/* harmony import */ var _utils_useAnchoredPopupScrollLock_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(331768);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ SelectPositioner auto */ 
















const FIXED = {
    position: 'fixed'
};
/**
 * Positions the select popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectPositioner = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectPositioner(componentProps, forwardedRef) {
    const { anchor, className, render, // `useAnchorPositioning` applies the same defaults to the undefined values; the names
    // remain destructured to exclude the props from `elementProps`.
    positionMethod, side, align, sideOffset, alignOffset, collisionBoundary = 'clipping-ancestors', collisionPadding, arrowPadding, sticky, disableAnchorTracking, alignItemWithTrigger = true, collisionAvoidance = _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .DROPDOWN_COLLISION_AVOIDANCE */ .uD, style, ...elementProps } = componentProps;
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useSelectRootContext */ .ll)();
    const floatingRootContext = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useSelectFloatingContext */ .hG)();
    const open = store.useState('open');
    const mounted = store.useState('mounted');
    const modal = store.useState('modal');
    const value = store.useState('value');
    const openMethod = store.useState('openMethod');
    const positionerElement = store.useState('positionerElement');
    const triggerElement = store.useState('triggerElement');
    const isItemEqualToValue = store.useState('isItemEqualToValue');
    const transitionStatus = store.useState('transitionStatus');
    const scrollUpArrowRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const scrollDownArrowRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const [controlledAlignItemWithTrigger, setControlledAlignItemWithTrigger] = react__WEBPACK_IMPORTED_MODULE_0__.useState(alignItemWithTrigger);
    const alignItemWithTriggerActive = mounted && controlledAlignItemWithTrigger && openMethod !== 'touch';
    if (!mounted && controlledAlignItemWithTrigger !== alignItemWithTrigger) {
        setControlledAlignItemWithTrigger(alignItemWithTrigger);
    }
    react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(store.context.alignItemWithTriggerActiveRef, ()=>alignItemWithTriggerActive);
    (0,_utils_useAnchoredPopupScrollLock_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useAnchoredPopupScrollLock */ .G)((alignItemWithTriggerActive || modal) && open, openMethod === 'touch', positionerElement, triggerElement);
    const positioning = (0,_internals_useAnchorPositioning_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useAnchorPositioning */ .s)({
        anchor,
        floatingRootContext,
        positionMethod,
        mounted,
        side,
        sideOffset,
        align,
        alignOffset,
        arrowPadding,
        collisionBoundary,
        collisionPadding,
        sticky,
        disableAnchorTracking: disableAnchorTracking ?? alignItemWithTriggerActive,
        collisionAvoidance,
        keepMounted: true
    });
    const renderedSide = alignItemWithTriggerActive ? 'none' : positioning.side;
    const positionerStyles = alignItemWithTriggerActive ? FIXED : positioning.positionerStyles;
    const state = {
        open,
        side: renderedSide,
        align: positioning.align,
        anchorHidden: positioning.anchorHidden
    };
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__/* .useIsoLayoutEffect */ .g)(()=>{
        store.set('popupSide', positioning.side);
    }, [
        store,
        positioning.side
    ]);
    const setPositionerElement = store.useStateSetter('positionerElement');
    const element = (0,_utils_usePositioner_mjs__WEBPACK_IMPORTED_MODULE_7__/* .usePositioner */ .i)(componentProps, state, {
        styles: positionerStyles,
        transitionStatus,
        props: elementProps,
        refs: [
            forwardedRef,
            setPositionerElement
        ],
        hidden: !mounted,
        inert: !open
    });
    const prevMapSizeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    const onMapChange = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_8__/* .useStableCallback */ .K)((map)=>{
        if (store.context.valuesRef.current.length === 0) {
            return;
        }
        const prevSize = prevMapSizeRef.current;
        prevMapSizeRef.current = map.size;
        const eventDetails = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_9__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__/* .none */ .dv);
        if (prevSize !== 0 && !store.state.multiple && value !== null) {
            const selectedValueIndex = (0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_11__/* .findItemIndex */ .Vz)(store.context.valuesRef.current, value, isItemEqualToValue);
            if (selectedValueIndex === -1) {
                const initialSelectedValue = store.context.initialValueRef.current;
                const hasInitial = initialSelectedValue != null && (0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_11__/* .findItemIndex */ .Vz)(store.context.valuesRef.current, initialSelectedValue, isItemEqualToValue) !== -1;
                const nextValue = hasInitial ? initialSelectedValue : null;
                store.context.setValue(nextValue, eventDetails);
                if (nextValue === null) {
                    store.set('selectedIndex', null);
                    store.context.selectedItemTextRef.current = null;
                }
            }
        }
        if (prevSize !== 0 && store.state.multiple && Array.isArray(value)) {
            const nextValue = value.filter((selectedItemValue)=>(0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_11__/* .findItemIndex */ .Vz)(store.context.valuesRef.current, selectedItemValue, isItemEqualToValue) !== -1);
            if (nextValue.length !== value.length) {
                store.context.setValue(nextValue, eventDetails);
                if (nextValue.length === 0) {
                    store.set('selectedIndex', null);
                    store.context.selectedItemTextRef.current = null;
                }
            }
        }
        if (open && alignItemWithTriggerActive) {
            store.update({
                scrollUpArrowVisible: false,
                scrollDownArrowVisible: false
            });
            const stylesToClear = {
                height: ''
            };
            (0,_popup_utils_mjs__WEBPACK_IMPORTED_MODULE_12__/* .clearStyles */ .Y)(positionerElement, stylesToClear);
            (0,_popup_utils_mjs__WEBPACK_IMPORTED_MODULE_12__/* .clearStyles */ .Y)(store.context.popupRef.current, stylesToClear);
        }
    });
    const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            ...positioning,
            side: renderedSide,
            alignItemWithTriggerActive,
            setControlledAlignItemWithTrigger,
            scrollUpArrowRef,
            scrollDownArrowRef
        }), [
        positioning,
        renderedSide,
        alignItemWithTriggerActive,
        setControlledAlignItemWithTrigger
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_internals_composite_list_CompositeList_mjs__WEBPACK_IMPORTED_MODULE_13__/* .CompositeList */ .u, {
        elementsRef: store.context.listRef,
        labelsRef: store.context.labelsRef,
        onMapChange: onMapChange,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_SelectPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_14__/* .SelectPositionerContext */ .i.Provider, {
            value: contextValue,
            children: [
                mounted && modal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_InternalBackdrop_mjs__WEBPACK_IMPORTED_MODULE_15__/* .InternalBackdrop */ .W, {
                    inert: (0,_base_ui_utils_inertValue__WEBPACK_IMPORTED_MODULE_16__/* .inertValue */ .Y)(!open),
                    cutout: triggerElement
                }),
                element
            ]
        })
    });
});
if (false) {}


/***/ }),

/***/ 415073:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ SelectIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(671775);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(614128);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(643704);
/* __next_internal_client_entry_do_not_use__ SelectIcon auto */ 



/**
 * An icon that indicates that the trigger button opens a select popup.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectIcon = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectIcon(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps;
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useSelectRootContext */ .ll)();
    const open = store.useState('open');
    const state = {
        open
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)('span', componentProps, {
        state,
        ref: forwardedRef,
        props: [
            {
                'aria-hidden': true,
                children: '▼'
            },
            elementProps
        ],
        stateAttributesMapping: _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_3__/* .triggerOpenStateMapping */ .qV
    });
    return element;
});
if (false) {}


/***/ }),

/***/ 420582:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ useSelectGroupContext),
/* harmony export */   z: () => (/* binding */ SelectGroupContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(854729);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ SelectGroupContext,useSelectGroupContext auto */ 

const SelectGroupContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useSelectGroupContext() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SelectGroupContext);
    if (context === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(56));
    }
    return context;
}


/***/ }),

/***/ 451121:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ ItemIndicator)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _internals_useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(529118);
/* harmony import */ var _internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(562340);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(671775);
/* harmony import */ var _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(583758);
/* __next_internal_client_entry_do_not_use__ ItemIndicator auto */ 




// The public wrappers mount this component only when selected or kept mounted, avoiding the
// hook costs for unselected items. Pass selection as a prop so memoization observes changes.
const ItemIndicator = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.memo(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function ItemIndicator(componentProps, forwardedRef) {
    const { render, className, style, keepMounted, selected, ...elementProps } = componentProps;
    const indicatorRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const { transitionStatus, setMounted } = (0,_internals_useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useTransitionStatus */ .$)(selected);
    const state = {
        selected,
        transitionStatus
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)('span', componentProps, {
        ref: [
            forwardedRef,
            indicatorRef
        ],
        state,
        props: [
            {
                'aria-hidden': true,
                children: '✔️'
            },
            elementProps
        ],
        stateAttributesMapping: _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_3__/* .transitionStatusMapping */ .G
    });
    (0,_internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useOpenChangeComplete */ .v)({
        batch: true,
        enabled: !selected,
        open: selected,
        ref: indicatorRef,
        onComplete () {
            if (!selected) {
                setMounted(false);
            }
        }
    });
    return element;
}));
if (false) {}


/***/ }),

/***/ 511218:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pv: () => (/* binding */ SCROLL_EDGE_TOLERANCE_PX),
/* harmony export */   Qw: () => (/* binding */ normalizeScrollOffset),
/* harmony export */   XF: () => (/* binding */ getMaxScrollOffset)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_clamp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(903932);

const SCROLL_EDGE_TOLERANCE_PX = 1;
function getMaxScrollOffset(scrollSize, clientSize) {
  return Math.max(0, scrollSize - clientSize);
}
function normalizeScrollOffset(value, max) {
  if (max <= 0) {
    return 0;
  }
  const clamped = (0,_base_ui_utils_clamp__WEBPACK_IMPORTED_MODULE_0__/* .clamp */ .q)(value, 0, max);
  const startDistance = clamped;
  const endDistance = max - clamped;
  const withinStartTolerance = startDistance <= SCROLL_EDGE_TOLERANCE_PX;
  const withinEndTolerance = endDistance <= SCROLL_EDGE_TOLERANCE_PX;
  if (withinStartTolerance && withinEndTolerance) {
    return startDistance <= endDistance ? 0 : max;
  }
  if (withinStartTolerance) {
    return 0;
  }
  if (withinEndTolerance) {
    return max;
  }
  return clamped;
}

/***/ }),

/***/ 534656:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ SelectItemIndicator)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _item_SelectItemContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(876878);
/* harmony import */ var _utils_ItemIndicator_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(451121);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ SelectItemIndicator auto */ 


/**
 * Indicates whether the select item is selected.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ 
const SelectItemIndicator = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectItemIndicator(componentProps, forwardedRef) {
    const { selected } = (0,_item_SelectItemContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useSelectItemContext */ .G)();
    const shouldRender = componentProps.keepMounted || selected;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_ItemIndicator_mjs__WEBPACK_IMPORTED_MODULE_3__/* .ItemIndicator */ .V, {
        ...componentProps,
        selected: selected,
        ref: forwardedRef
    });
});
if (false) {}


/***/ }),

/***/ 566359:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ SelectPortal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(660982);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(614128);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ SelectPortal auto */ 


/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ 
const SelectPortal = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectPortal(portalProps, forwardedRef) {
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useSelectRootContext */ .ll)();
    const mounted = store.useState('mounted');
    const forceMount = store.useState('forceMount');
    const shouldRender = mounted || forceMount;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .FloatingPortal */ .XF, {
        ref: forwardedRef,
        ...portalProps
    });
});
if (false) {}


/***/ }),

/***/ 570051:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ ListboxSeparator)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(671775);
/* __next_internal_client_entry_do_not_use__ ListboxSeparator auto */ 

/**
 * A visual separator between items.
 * Renders a `<div>` element.
 *
 * @internal
 */ const ListboxSeparator = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function ListboxSeparator(componentProps, forwardedRef) {
    const { className, render, orientation = 'horizontal', style, ...elementProps } = componentProps;
    const state = {
        orientation
    };
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useRenderElement */ .o)('div', componentProps, {
        state,
        ref: forwardedRef,
        props: [
            {
                role: 'presentation'
            },
            elementProps
        ]
    });
});
if (false) {}


/***/ }),

/***/ 587991:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ useOnFirstRender)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ useOnFirstRender auto */ 
function useOnFirstRender(fn) {
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    if (ref.current) {
        ref.current = false;
        fn();
    }
}


/***/ }),

/***/ 614128:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CG: () => (/* binding */ SelectRootContext),
/* harmony export */   hG: () => (/* binding */ useSelectFloatingContext),
/* harmony export */   iP: () => (/* binding */ SelectFloatingContext),
/* harmony export */   ll: () => (/* binding */ useSelectRootContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(854729);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ SelectRootContext,SelectFloatingContext,useSelectRootContext,useSelectFloatingContext auto */ 

const SelectRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
const SelectFloatingContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useSelectRootContext() {
    const store = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SelectRootContext);
    if (store === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(60));
    }
    return store;
}
function useSelectFloatingContext() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SelectFloatingContext);
    if (context === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(61));
    }
    return context;
}


/***/ }),

/***/ 653574:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ useControlled)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ useControlled auto */ // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- process.env never changes, dependency arrays are intentionally ignored
/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */ 

// A defined default guarantees a defined value. Otherwise, preserve `undefined`,
// including when callers pass an explicit generic argument.
function useControlled({ controlled, default: defaultProp, name, state = 'value' }) {
    // isControlled is ignored in the hook dependency lists as it should never change.
    const { current: isControlled } = react__WEBPACK_IMPORTED_MODULE_0__.useRef(controlled !== undefined);
    // Wrap the default so a function value is stored as-is instead of being called as an initializer.
    const [valueState, setValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(()=>defaultProp);
    // Keep the initial mode, but use the initial default if a controlled value disappears.
    // This preserves the defined-default overload while the mode-switch warning is emitted below.
    const value = isControlled && controlled !== undefined ? controlled : valueState;
    if (false) {}
    const setValueIfUncontrolled = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((newValue)=>{
        if (!isControlled) {
            setValue(newValue);
        }
    }, []);
    return [
        value,
        setValueIfUncontrolled
    ];
}
function serializeToDevModeString(input) {
    let nextId = 0;
    const seen = new WeakMap();
    try {
        const result = JSON.stringify(input, function replacer(key, value) {
            if (key === '_owner' && this != null && typeof this === 'object' && '$$typeof' in this) {
                return undefined;
            }
            if (typeof value === 'bigint') {
                return `__bigint__:${value}`;
            }
            if (value !== null && typeof value === 'object') {
                const id = seen.get(value);
                if (id !== undefined) {
                    return `__object__:${id}`;
                }
                seen.set(value, nextId);
                nextId += 1;
            }
            return value;
        });
        return result ?? `__top__:${typeof input}`;
    } catch  {
        return '__unserializable__';
    }
}


/***/ }),

/***/ 691995:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronRight)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165667);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "chevron-right",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m9 18 6-6-6-6",
                key: "mthhwq"
            }
        ]
    ]
};
__iconData.node;
const ChevronRight = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=chevron-right.mjs.map


/***/ }),

/***/ 694225:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ SelectGroup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _SelectGroupContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(420582);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(671775);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ SelectGroup auto */ 


/**
 * Groups related select items with the corresponding label.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ 
const SelectGroup = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectGroup(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps;
    const [labelId, setLabelId] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            labelId,
            setLabelId
        }), [
        labelId,
        setLabelId
    ]);
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)('div', componentProps, {
        ref: forwardedRef,
        props: [
            {
                role: 'group',
                'aria-labelledby': labelId
            },
            elementProps
        ]
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_SelectGroupContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .SelectGroupContext */ .z.Provider, {
        value: contextValue,
        children: element
    });
});
if (false) {}


/***/ }),

/***/ 696169:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ styleDisableScrollbar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);

const DISABLE_SCROLLBAR_CLASS_NAME = 'base-ui-disable-scrollbar';
const styleDisableScrollbar = {
  className: DISABLE_SCROLLBAR_CLASS_NAME,
  getElement(nonce) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
      nonce: nonce,
      href: DISABLE_SCROLLBAR_CLASS_NAME,
      precedence: "base-ui:low",
      children: `.${DISABLE_SCROLLBAR_CLASS_NAME}{scrollbar-width:none}.${DISABLE_SCROLLBAR_CLASS_NAME}::-webkit-scrollbar{display:none}`
    });
  }
};
if (false) {}

/***/ }),

/***/ 699095:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ areArraysEqual)
/* harmony export */ });
// https://github.com/mui/mui-x/blob/master/packages/x-internals/src/fastArrayCompare/fastArrayCompare.ts

/**
 * Compares two arrays element-wise.
 *
 * The default comparison is `Object.is`, so `NaN` equals `NaN` and `0` does not equal `-0`.
 */
function areArraysEqual(array1, array2, itemComparer = Object.is) {
  const {
    length
  } = array1;
  if (length !== array2.length) {
    return false;
  }
  for (let i = 0; i < length; i += 1) {
    if (!itemComparer(array1[i], array2[i])) {
      return false;
    }
  }
  return true;
}

/***/ }),

/***/ 707266:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ usePreviousValue)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ usePreviousValue auto */ 
/**
 * Returns a previous value of its argument.
 * @param value Current value.
 * @returns Previous value, or null if there is no previous value.
 */ function usePreviousValue(value) {
    const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
        current: value,
        previous: null
    });
    if (!Object.is(value, state.current)) {
        setState({
            current: value,
            previous: state.current
        });
    }
    return state.previous;
}


/***/ }),

/***/ 742351:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ SelectList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(614128);
/* harmony import */ var _positioner_SelectPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(288576);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(671775);
/* harmony import */ var _utils_styles_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(696169);
/* harmony import */ var _popup_utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(770980);
/* __next_internal_client_entry_do_not_use__ SelectList auto */ 





/**
 * A container for the select items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectList = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectList(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps;
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useSelectRootContext */ .ll)();
    const multiple = store.useState('multiple');
    const readOnly = store.useState('readOnly');
    const { alignItemWithTriggerActive } = (0,_positioner_SelectPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useSelectPositionerContext */ .H)();
    const hasScrollArrows = store.useState('hasScrollArrows');
    const openMethod = store.useState('openMethod');
    const id = store.useState('id');
    const defaultProps = {
        id: `${id}-list`,
        role: 'listbox',
        'aria-multiselectable': multiple || undefined,
        'aria-readonly': readOnly || undefined,
        onScroll (event) {
            store.context.scrollHandlerRef.current?.(event.currentTarget);
        },
        ...alignItemWithTriggerActive && {
            style: _popup_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .LIST_FUNCTIONAL_STYLES */ .O
        },
        className: hasScrollArrows && openMethod !== 'touch' ? _utils_styles_mjs__WEBPACK_IMPORTED_MODULE_4__/* .styleDisableScrollbar */ .E.className : undefined
    };
    const setListElement = store.useStateSetter('listElement');
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useRenderElement */ .o)('div', componentProps, {
        ref: [
            forwardedRef,
            setListElement
        ],
        props: [
            defaultProps,
            elementProps
        ]
    });
});
if (false) {}


/***/ }),

/***/ 768448:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ resolveAriaLabelledBy)
/* harmony export */ });
/* unused harmony export getDefaultLabelId */
/* __next_internal_client_entry_do_not_use__ getDefaultLabelId,resolveAriaLabelledBy auto */ function getDefaultLabelId(id) {
    return id == null ? undefined : `${id}-label`;
}
function resolveAriaLabelledBy(fieldLabelId, localLabelId) {
    return fieldLabelId ?? localLabelId;
}


/***/ }),

/***/ 770980:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ LIST_FUNCTIONAL_STYLES),
/* harmony export */   Y: () => (/* binding */ clearStyles)
/* harmony export */ });
function clearStyles(element, originalStyles) {
  if (element) {
    Object.assign(element.style, originalStyles);
  }
}
const LIST_FUNCTIONAL_STYLES = {
  position: 'relative',
  maxHeight: '100%',
  overflowX: 'hidden',
  overflowY: 'auto'
};

/***/ }),

/***/ 794501:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ SelectValue)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(671775);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(614128);
/* harmony import */ var _internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(799107);
/* __next_internal_client_entry_do_not_use__ SelectValue auto */ 



const stateAttributesMapping = {
    value: ()=>null
};
/**
 * A text label of the currently selected item.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectValue = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectValue(componentProps, forwardedRef) {
    const { className, render, children: childrenProp, placeholder, style, ...elementProps } = componentProps;
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useSelectRootContext */ .ll)();
    const value = store.useState('value');
    const items = store.useState('items');
    const itemToStringLabel = store.useState('itemToStringLabel');
    const hasSelectedValue = store.useState('hasSelectedValue');
    const shouldCheckNullItemLabel = !hasSelectedValue && placeholder != null && childrenProp == null;
    const hasNullLabel = store.useState('hasNullItemLabel', shouldCheckNullItemLabel);
    const state = {
        value,
        placeholder: !hasSelectedValue
    };
    let children = null;
    if (typeof childrenProp === 'function') {
        children = childrenProp(value);
    } else if (childrenProp != null) {
        children = childrenProp;
    } else if (shouldCheckNullItemLabel && !hasNullLabel) {
        children = placeholder;
    } else if (Array.isArray(value)) {
        children = (0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_2__/* .resolveMultipleLabels */ .u)(value, items, itemToStringLabel);
    } else {
        children = (0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_2__/* .resolveSelectedLabel */ .Md)(value, items, itemToStringLabel);
    }
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useRenderElement */ .o)('span', componentProps, {
        state,
        ref: [
            forwardedRef,
            store.context.valueRef
        ],
        props: [
            {
                children
            },
            elementProps
        ],
        stateAttributesMapping
    });
    return element;
});
if (false) {}


/***/ }),

/***/ 799107:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dp: () => (/* binding */ hasNullItemLabel),
/* harmony export */   Md: () => (/* binding */ resolveSelectedLabel),
/* harmony export */   T: () => (/* binding */ stringifyAsValue),
/* harmony export */   u: () => (/* binding */ resolveMultipleLabels),
/* harmony export */   yg: () => (/* binding */ stringifyAsLabel)
/* harmony export */ });
/* unused harmony exports isGroupedItems, flattenLeafItems */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _serializeValue_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(214165);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ isGroupedItems,flattenLeafItems,hasNullItemLabel,stringifyAsLabel,stringifyAsValue,resolveSelectedLabel,resolveMultipleLabels auto */ 


function isGroup(item) {
    return typeof item === 'object' && item != null && Array.isArray(item.items);
}
function isGroupedItems(items) {
    // A group must carry an actual `items` array: key presence alone would misclassify an item
    // with an unrelated or optional `items` field.
    return isGroup(items?.[0]);
}
function flattenLeafItems(items) {
    return isGroupedItems(items) ? items.flatMap((group)=>group.items) : items;
}
/**
 * Checks if the items array contains an item with a null value that has a non-null label.
 */ function hasNullItemLabel(items) {
    if (!Array.isArray(items)) {
        return items != null && 'null' in items;
    }
    const arrayItems = items;
    if (isGroupedItems(arrayItems)) {
        for (const group of arrayItems){
            for (const item of group.items){
                if (item && item.value == null && item.label != null) {
                    return true;
                }
            }
        }
        return false;
    }
    for (const item of arrayItems){
        if (item && item.value == null && item.label != null) {
            return true;
        }
    }
    return false;
}
function stringifyAsLabel(item, itemToStringLabel) {
    if (itemToStringLabel && item != null) {
        return itemToStringLabel(item) ?? '';
    }
    if (item && typeof item === 'object') {
        if ('label' in item && item.label != null) {
            return String(item.label);
        }
        if ('value' in item) {
            return String(item.value);
        }
    }
    return (0,_serializeValue_mjs__WEBPACK_IMPORTED_MODULE_2__/* .serializeValue */ .Q)(item);
}
function stringifyAsValue(item, itemToStringValue) {
    if (itemToStringValue && item != null) {
        return itemToStringValue(item) ?? '';
    }
    if (item && typeof item === 'object' && 'value' in item && 'label' in item) {
        return (0,_serializeValue_mjs__WEBPACK_IMPORTED_MODULE_2__/* .serializeValue */ .Q)(item.value);
    }
    return (0,_serializeValue_mjs__WEBPACK_IMPORTED_MODULE_2__/* .serializeValue */ .Q)(item);
}
function resolveSelectedLabel(value, items, itemToStringLabel) {
    function fallback() {
        return stringifyAsLabel(value, itemToStringLabel);
    }
    if (itemToStringLabel && value != null) {
        return itemToStringLabel(value);
    }
    // Custom object with explicit label takes precedence
    if (value && typeof value === 'object' && 'label' in value && value.label != null) {
        return value.label;
    }
    // Items provided as plain record map
    if (items && !Array.isArray(items)) {
        const label = Object.hasOwn(items, value) ? items[value] : undefined;
        return label ?? fallback();
    }
    // Items provided as array (flat or grouped)
    if (Array.isArray(items)) {
        const arrayItems = items;
        const flatItems = flattenLeafItems(arrayItems);
        if (value == null || typeof value !== 'object') {
            const match = flatItems.find((item)=>item.value === value);
            if (match && match.label != null) {
                return match.label;
            }
            return fallback();
        }
        // Object without explicit label: try matching by its `value` property
        if ('value' in value) {
            const match = flatItems.find((item)=>item && item.value === value.value);
            if (match && match.label != null) {
                return match.label;
            }
        }
    }
    return fallback();
}
function resolveMultipleLabels(values, items, itemToStringLabel) {
    return values.reduce((acc, value, index)=>{
        if (index > 0) {
            acc.push(', ');
        }
        acc.push(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: resolveSelectedLabel(value, items, itemToStringLabel)
        }, index));
        return acc;
    }, []);
}


/***/ }),

/***/ 822731:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ SelectRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(520618);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(92806);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(925685);
/* harmony import */ var _base_ui_utils_useOnFirstRender__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(587991);
/* harmony import */ var _base_ui_utils_usePreviousValue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(707266);
/* harmony import */ var _base_ui_utils_isElementDisabled__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(993073);
/* harmony import */ var _base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(653574);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(943512);
/* harmony import */ var _base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(543302);
/* harmony import */ var _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(707401);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(317526);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(368056);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(932595);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(569359);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(279827);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(737072);
/* harmony import */ var _SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(614128);
/* harmony import */ var _internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(389983);
/* harmony import */ var _internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(813102);
/* harmony import */ var _internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(201625);
/* harmony import */ var _internals_useUnmountAfterClose_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(555181);
/* harmony import */ var _store_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(914983);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(369827);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(460485);
/* harmony import */ var _utils_popups_popupStoreUtils_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(906787);
/* harmony import */ var _internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(425318);
/* harmony import */ var _internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(799107);
/* harmony import */ var _internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(973241);
/* harmony import */ var _internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(771788);
/* harmony import */ var _utils_useOpenInteractionType_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(961272);
/* harmony import */ var _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(511218);
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(356479);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ SelectRoot auto */ 































/**
 * Groups all parts of the select.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ 
function SelectRoot(props) {
    const { id, value: valueProp, defaultValue = null, onValueChange, open: openProp, defaultOpen = false, onOpenChange, name: nameProp, form, autoComplete, disabled: disabledProp = false, readOnly = false, required = false, modal = true, actionsRef, inputRef, onOpenChangeComplete, items, multiple = false, itemToStringLabel, itemToStringValue, isItemEqualToValue = _internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_2__/* .defaultItemEquality */ .jd, highlightItemOnHover = true, children } = props;
    const { clearErrors } = (0,_internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useFormContext */ .x)();
    const { setDirty, setTouched, setFocused, validityData, setFilled, name: fieldName, disabled: fieldDisabled, validation, validationMode } = (0,_internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useFieldRootContext */ .V$)();
    const generatedId = (0,_internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useLabelableId */ .l)({
        id
    });
    const disabled = fieldDisabled || disabledProp;
    const name = fieldName ?? nameProp;
    const [value, setValueUnwrapped] = (0,_base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_6__/* .useControlled */ .q)({
        controlled: valueProp,
        default: multiple ? defaultValue ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .EMPTY_ARRAY */ .Ml : defaultValue,
        name: 'Select',
        state: 'value'
    });
    const [open, setOpenUnwrapped] = (0,_base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_6__/* .useControlled */ .q)({
        controlled: openProp,
        default: defaultOpen,
        name: 'Select',
        state: 'open'
    });
    const listRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([]);
    const labelsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([]);
    const popupRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const scrollHandlerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const scrollArrowsMountedCountRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    const valueRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const valuesRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([]);
    const typingRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const firstItemTextRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const selectedItemTextRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const selectionRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
        allowSelectedMouseUp: false,
        allowUnselectedMouseUp: false,
        dragY: 0
    });
    const alignItemWithTriggerActiveRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const initialValueRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);
    const { openMethod, triggerProps: interactionTypeProps } = (0,_utils_useOpenInteractionType_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useOpenInteractionType */ .G)(open);
    const store = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_9__/* .useRefWithInit */ .j)(()=>new _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_10__/* .ReactStore */ .H({
            id: generatedId,
            labelId: undefined,
            modal,
            multiple,
            disabled,
            readOnly,
            required,
            highlightItemOnHover,
            itemToStringLabel,
            itemToStringValue,
            isItemEqualToValue,
            value,
            open,
            // Seeded with the initial values of `useUnmountAfterClose`, which is called after the
            // store because its unmount cleanup writes to it. `useSyncedValues` keeps them in sync.
            mounted: open,
            transitionStatus: undefined,
            items,
            forceMount: false,
            openMethod: null,
            activeIndex: null,
            selectedIndex: null,
            popupProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .EMPTY_OBJECT */ .t0,
            triggerProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .EMPTY_OBJECT */ .t0,
            itemRoot: {
                props: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .EMPTY_OBJECT */ .t0,
                multiple,
                disabled,
                readOnly,
                isItemEqualToValue
            },
            triggerElement: null,
            positionerElement: null,
            listElement: null,
            popupSide: null,
            scrollUpArrowVisible: false,
            scrollDownArrowVisible: false,
            hasScrollArrows: false
        }, {
            setValue: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .NOOP */ .tE,
            setOpen: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .NOOP */ .tE,
            handleScrollArrowVisibility: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .NOOP */ .tE,
            onOpenChangeComplete: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .NOOP */ .tE,
            listRef,
            popupRef,
            scrollHandlerRef,
            scrollArrowsMountedCountRef,
            valueRef,
            valuesRef,
            labelsRef,
            typingRef,
            selectionRef,
            firstItemTextRef,
            selectedItemTextRef,
            alignItemWithTriggerActiveRef,
            initialValueRef
        }, _store_mjs__WEBPACK_IMPORTED_MODULE_11__/* .selectors */ .T)).current;
    const [preventUnmountOnClose, setPreventUnmountOnClose] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const { mounted, transitionStatus, forceUnmount: handleUnmount } = (0,_internals_useUnmountAfterClose_mjs__WEBPACK_IMPORTED_MODULE_12__/* .useUnmountAfterClose */ .Y)({
        open,
        ref: popupRef,
        preventUnmountOnClose,
        setPreventUnmountOnClose,
        onUnmount () {
            store.update({
                activeIndex: null,
                openMethod: null,
                scrollUpArrowVisible: false,
                scrollDownArrowVisible: false
            });
            onOpenChangeComplete?.(false);
        }
    });
    const activeIndex = store.useState('activeIndex');
    const selectedIndex = store.useState('selectedIndex');
    const triggerElement = store.useState('triggerElement');
    const positionerElement = store.useState('positionerElement');
    const previousOpenMethod = (0,_base_ui_utils_usePreviousValue__WEBPACK_IMPORTED_MODULE_13__/* .usePreviousValue */ .S)(openMethod);
    const renderedOpenMethod = openMethod ?? previousOpenMethod;
    const serializedValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        // In multiple mode the shared input is nameless; per-value entries are submitted via
        // `hiddenInputs`. Its value is therefore irrelevant, and passing the whole array to
        // `stringifyAsValue` would invoke a user `itemToStringValue` with an array it doesn't expect.
        if (multiple) {
            return '';
        }
        return (0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_14__/* .stringifyAsValue */ .T)(value, itemToStringValue);
    }, [
        multiple,
        value,
        itemToStringValue
    ]);
    const fieldStringValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        if (multiple && Array.isArray(value)) {
            return value.map((currentValue)=>(0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_14__/* .stringifyAsValue */ .T)(currentValue, itemToStringValue));
        }
        return (0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_14__/* .stringifyAsValue */ .T)(value, itemToStringValue);
    }, [
        multiple,
        value,
        itemToStringValue
    ]);
    const controlRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_15__/* .useValueAsRef */ .u)(triggerElement);
    const getStringifiedValueForForm = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_16__/* .useStableCallback */ .K)(()=>fieldStringValue);
    (0,_internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_17__/* .useRegisterFieldControl */ .I)(controlRef, generatedId, value, getStringifiedValueForForm, !disabled, nameProp);
    // Mirror the `hasSelectedValue` store selector so the Field's filled state agrees with the
    // trigger/value placeholder semantics (a value serializing to `''` counts as empty).
    const hasSelectedValue = multiple ? Array.isArray(value) && value.length > 0 : value != null && serializedValue !== '';
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_18__/* .useIsoLayoutEffect */ .g)(()=>{
        setFilled(hasSelectedValue);
    }, [
        hasSelectedValue,
        setFilled
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_18__/* .useIsoLayoutEffect */ .g)(function syncSelectedIndex() {
        const nextIndex = (0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_2__/* .findSelectionIndex */ .Gu)(valuesRef.current, value, isItemEqualToValue, multiple);
        if (nextIndex === null) {
            selectedItemTextRef.current = null;
        }
        if (open) {
            return;
        }
        store.set('selectedIndex', nextIndex);
    }, [
        multiple,
        open,
        value,
        isItemEqualToValue,
        store
    ]);
    (0,_internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_19__/* .useValueChanged */ .x)(value, ()=>{
        clearErrors(name);
        setDirty((0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isSelectedValueDirty */ .DI)(value, validityData.initialValue, isItemEqualToValue));
        validation.change(value);
    });
    const setOpen = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_16__/* .useStableCallback */ .K)((nextOpen, eventDetails)=>{
        const openEventDetails = eventDetails;
        const shouldPreventUnmountOnClose = (0,_utils_popups_popupStoreUtils_mjs__WEBPACK_IMPORTED_MODULE_20__/* .attachPreventUnmountOnClose */ .T1)(openEventDetails);
        onOpenChange?.(nextOpen, openEventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        if (!nextOpen) {
            setPreventUnmountOnClose(shouldPreventUnmountOnClose());
        }
        setOpenUnwrapped(nextOpen);
        if (!nextOpen && (eventDetails.reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_21__/* .focusOut */ .Xn || eventDetails.reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_21__/* .outsidePress */ .Np)) {
            setTouched(true);
            setFocused(false);
            if (validationMode === 'onBlur') {
                validation.commit(value);
            }
        }
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(actionsRef, ()=>({
            unmount: handleUnmount,
            close: ()=>{
                if (store.state.open) {
                    setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_22__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_21__/* .imperativeAction */ .zJ));
                }
            }
        }), [
        handleUnmount,
        setOpen,
        store
    ]);
    const setValue = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_16__/* .useStableCallback */ .K)((nextValue, eventDetails)=>{
        onValueChange?.(nextValue, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        setValueUnwrapped(nextValue);
    });
    const handleScrollArrowVisibility = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_16__/* .useStableCallback */ .K)((scroller)=>{
        const maxScrollTop = (0,_utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_23__/* .getMaxScrollOffset */ .XF)(scroller.scrollHeight, scroller.clientHeight);
        const scrollTop = (0,_utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_23__/* .normalizeScrollOffset */ .Qw)(scroller.scrollTop, maxScrollTop);
        const shouldShowUp = scrollTop > 0;
        const shouldShowDown = scrollTop < maxScrollTop;
        store.set('scrollUpArrowVisible', shouldShowUp);
        store.set('scrollDownArrowVisible', shouldShowDown);
    });
    const floatingContext = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_24__/* .useFloatingRootContext */ .P)({
        open,
        onOpenChange: setOpen,
        elements: {
            reference: triggerElement,
            floating: positionerElement
        }
    });
    // `readOnly` locks the value, not the interaction: the popup can be opened and browsed so the
    // user can see the available options and which one is selected. Committing a value is blocked
    // separately in `SelectItem` and in the hidden input's autofill handler.
    const click = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_25__/* .useClick */ .k)(floatingContext, {
        enabled: !disabled,
        event: 'mousedown'
    });
    const dismiss = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_26__/* .useDismiss */ .s)(floatingContext);
    const listNavigation = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_27__/* .useListNavigation */ .C1)(floatingContext, {
        enabled: !disabled,
        listRef,
        activeIndex,
        selectedIndex,
        disabledIndices: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .EMPTY_ARRAY */ .Ml,
        onNavigate (nextActiveIndex) {
            // Retain the highlight while transitioning out.
            if (nextActiveIndex === null && !open) {
                return;
            }
            store.set('activeIndex', nextActiveIndex);
        },
        focusItemOnHover: highlightItemOnHover
    });
    const typeahead = (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_28__/* .useTypeahead */ .l)(floatingContext, {
        // Typeahead on an open popup only moves the highlight, so it remains available while
        // `readOnly`. The closed-trigger variant commits a value instead, so it doesn't.
        enabled: !disabled && (open || !readOnly && !multiple),
        listRef: labelsRef,
        activeIndex,
        selectedIndex,
        // Skip disabled items while matching so typeahead advances to the next selectable item
        // (a click can never select a disabled item and native `<select>` skips them too). Resolve
        // the disabled state from the element via the attribute-only `isElementDisabled` so the
        // hidden, force-mounted items used for closed-trigger typeahead aren't dropped by the
        // `elementsRef`/visibility filter that `disabledIndices` deliberately sidesteps.
        disabledIndices: (index)=>(0,_base_ui_utils_isElementDisabled__WEBPACK_IMPORTED_MODULE_29__/* .isElementDisabled */ .F)(listRef.current[index]),
        onMatch (index) {
            if (open) {
                store.set('activeIndex', index);
            } else {
                setValue(valuesRef.current[index], (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_22__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_21__/* .none */ .dv));
            }
        },
        onTyping (typing) {
            typingRef.current = typing;
        }
    });
    // `Select.Trigger` applies the id itself from the store, so it's deliberately not merged here.
    const mergedTriggerProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>(0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_30__/* .mergeProps */ .v6)(typeahead.reference, listNavigation.reference, dismiss.reference, click.reference, interactionTypeProps), [
        click.reference,
        typeahead.reference,
        listNavigation.reference,
        dismiss.reference,
        interactionTypeProps
    ]);
    const popupProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>(0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_30__/* .mergeProps */ .v6)(_utils_popups_popupStoreUtils_mjs__WEBPACK_IMPORTED_MODULE_20__/* .FOCUSABLE_POPUP_PROPS */ .Ls, typeahead.floating, listNavigation.floating, dismiss.floating), [
        typeahead.floating,
        listNavigation.floating,
        dismiss.floating
    ]);
    const itemProps = listNavigation.item ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_7__/* .EMPTY_OBJECT */ .t0;
    const itemRoot = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            props: itemProps,
            multiple,
            disabled,
            readOnly,
            isItemEqualToValue
        }), [
        itemProps,
        multiple,
        disabled,
        readOnly,
        isItemEqualToValue
    ]);
    store.useContextCallback('setValue', setValue);
    store.useContextCallback('setOpen', setOpen);
    store.useContextCallback('handleScrollArrowVisibility', handleScrollArrowVisibility);
    store.useContextCallback('onOpenChangeComplete', onOpenChangeComplete);
    // The prop bags must be in the store before the parts render. `useSyncedValues` writes in a
    // layout effect, after all descendants have rendered.
    (0,_base_ui_utils_useOnFirstRender__WEBPACK_IMPORTED_MODULE_31__/* .useOnFirstRender */ .j)(()=>{
        store.update({
            popupProps,
            triggerProps: mergedTriggerProps,
            itemRoot
        });
    });
    store.useSyncedValues({
        id: generatedId,
        modal,
        multiple,
        disabled,
        readOnly,
        required,
        highlightItemOnHover,
        value,
        open,
        mounted,
        transitionStatus,
        popupProps,
        triggerProps: mergedTriggerProps,
        itemRoot,
        items,
        itemToStringLabel,
        itemToStringValue,
        isItemEqualToValue,
        openMethod: renderedOpenMethod
    });
    const ref = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_32__/* .useMergedRefs */ .a)(inputRef, validation.inputRef);
    const hiddenInputName = multiple ? undefined : name;
    const hiddenInputs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        if (!multiple || !Array.isArray(value) || !name) {
            return null;
        }
        return value.map((v)=>{
            const currentSerializedValue = (0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_14__/* .stringifyAsValue */ .T)(v, itemToStringValue);
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "hidden",
                form: form,
                name: name,
                value: currentSerializedValue,
                disabled: disabled
            }, currentSerializedValue);
        });
    }, [
        multiple,
        value,
        form,
        name,
        itemToStringValue,
        disabled
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_33__/* .SelectRootContext */ .CG.Provider, {
        value: store,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_33__/* .SelectFloatingContext */ .iP.Provider, {
                value: floatingContext,
                children: children
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                ...validation.getValidationProps(disabled, {
                    onFocus () {
                        // Move focus to the trigger element when the hidden input is focused.
                        store.state.triggerElement?.focus({
                            // Supported in Chrome from 144 (January 2026)
                            focusVisible: true
                        });
                    },
                    // Handle browser autofill.
                    onChange (event) {
                        // Workaround for https://github.com/react/react/issues/9023
                        if (event.nativeEvent.defaultPrevented || disabled || readOnly) {
                            return;
                        }
                        const nextValue = event.currentTarget.value;
                        const details = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_22__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_21__/* .none */ .dv, event.nativeEvent);
                        function handleChange() {
                            if (multiple) {
                                // Browser autofill only writes a single scalar value.
                                return;
                            }
                            // Preserve the original serialized matching, then fall back to rendered text,
                            // which browsers can autofill for primitive values like
                            // `value="US">United States`.
                            const nextValueLower = nextValue.toLowerCase();
                            let matchingIndex = valuesRef.current.findIndex((candidate)=>(0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_14__/* .stringifyAsValue */ .T)(candidate, itemToStringValue).toLowerCase() === nextValueLower || (0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_14__/* .stringifyAsLabel */ .yg)(candidate, itemToStringLabel).toLowerCase() === nextValueLower);
                            if (matchingIndex === -1) {
                                matchingIndex = valuesRef.current.findIndex((_, index)=>{
                                    const renderedLabel = labelsRef.current[index];
                                    return renderedLabel != null && renderedLabel.toLowerCase() === nextValueLower;
                                });
                            }
                            const matchingValue = valuesRef.current[matchingIndex];
                            if (matchingValue != null) {
                                // `setValue` may be canceled by `onValueChange`; rely on `useValueChanged` to
                                // mark the field dirty and run validation only when the value actually changes.
                                setValue(matchingValue, details);
                            }
                        }
                        store.set('forceMount', true);
                        queueMicrotask(handleChange);
                    }
                }),
                id: generatedId && hiddenInputName == null ? `${generatedId}-hidden-input` : undefined,
                form: form,
                name: hiddenInputName,
                autoComplete: autoComplete,
                value: serializedValue,
                disabled: disabled,
                required: required && !(multiple && hasSelectedValue),
                readOnly: readOnly,
                ref: ref,
                style: name ? _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_34__/* .visuallyHiddenInput */ .a : _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_34__/* .visuallyHidden */ .Q,
                tabIndex: -1,
                "aria-hidden": true,
                suppressHydrationWarning: true
            }),
            hiddenInputs
        ]
    });
}


/***/ }),

/***/ 860418:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Td: () => (/* binding */ transformOrigin)
/* harmony export */ });
/* unused harmony exports availableWidth, availableHeight, anchorWidth, anchorHeight */
/**
 * The available width between the trigger and the edge of the viewport.
 * @type {number}
 */
const availableWidth = '--available-width';
/**
 * The available height between the trigger and the edge of the viewport.
 * @type {number}
 */
const availableHeight = '--available-height';
/**
 * The anchor's width.
 * @type {number}
 */
const anchorWidth = '--anchor-width';
/**
 * The anchor's height.
 * @type {number}
 */
const anchorHeight = '--anchor-height';
/**
 * The coordinates that this element is anchored to. Used for animations and transitions.
 * @type {string}
 */
const transformOrigin = '--transform-origin';

/***/ }),

/***/ 860617:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ SelectScrollUpArrow)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _scroll_arrow_SelectScrollArrow_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67380);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ SelectScrollUpArrow auto */ 


/**
 * An element that scrolls the select popup up when hovered. Does not render when using touch input.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectScrollUpArrow = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectScrollUpArrow(props, forwardedRef) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_scroll_arrow_SelectScrollArrow_mjs__WEBPACK_IMPORTED_MODULE_2__/* .SelectScrollArrow */ .f, {
        ...props,
        ref: forwardedRef,
        direction: "up"
    });
});
if (false) {}


/***/ }),

/***/ 876878:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ useSelectItemContext),
/* harmony export */   z: () => (/* binding */ SelectItemContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(854729);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ SelectItemContext,useSelectItemContext auto */ 

const SelectItemContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useSelectItemContext() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SelectItemContext);
    if (!context) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(57));
    }
    return context;
}


/***/ }),

/***/ 903932:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ clamp)
/* harmony export */ });
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(val, max));
}

/***/ }),

/***/ 914983:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ selectors)
/* harmony export */ });
/* harmony import */ var _internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(973241);
/* harmony import */ var _internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(799107);



/**
 * Non-reactive values shared with the select parts. Nothing here is observable through
 * `selectors`, so writing to a ref never notifies subscribers.
 */

const selectors = {
  id: state => state.id,
  labelId: state => state.labelId,
  modal: state => state.modal,
  multiple: state => state.multiple,
  disabled: state => state.disabled,
  readOnly: state => state.readOnly,
  required: state => state.required,
  highlightItemOnHover: state => state.highlightItemOnHover,
  items: state => state.items,
  itemToStringLabel: state => state.itemToStringLabel,
  isItemEqualToValue: state => state.isItemEqualToValue,
  value: state => state.value,
  hasSelectedValue: state => {
    const {
      value,
      multiple,
      itemToStringValue
    } = state;
    if (value == null) {
      return false;
    }
    if (multiple && Array.isArray(value)) {
      return value.length > 0;
    }
    return (0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_0__/* .stringifyAsValue */ .T)(value, itemToStringValue) !== '';
  },
  hasNullItemLabel: (state, enabled) => {
    return enabled ? (0,_internals_resolveValueLabel_mjs__WEBPACK_IMPORTED_MODULE_0__/* .hasNullItemLabel */ .Dp)(state.items) : false;
  },
  open: state => state.open,
  mounted: state => state.mounted,
  forceMount: state => state.forceMount,
  transitionStatus: state => state.transitionStatus,
  openMethod: state => state.openMethod,
  activeIndex: state => state.activeIndex,
  selectedIndex: state => state.selectedIndex,
  isActive: (state, index) => state.activeIndex === index,
  isSelected: (state, itemValue) => {
    const comparer = state.isItemEqualToValue;
    const storeValue = state.value;
    if (state.multiple) {
      return Array.isArray(storeValue) && storeValue.some(selectedItem => (0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_1__/* .compareItemEquality */ .tl)(itemValue, selectedItem, comparer));
    }

    // The value is the source of truth: a stale `selectedIndex` (e.g. the controlled
    // value changes while the popup is open, where the index sync is deferred) must not
    // keep a previously selected item marked as selected.
    return (0,_internals_itemEquality_mjs__WEBPACK_IMPORTED_MODULE_1__/* .compareItemEquality */ .tl)(itemValue, storeValue, comparer);
  },
  isSelectedByFocus: (state, index) => {
    return state.selectedIndex === index;
  },
  popupProps: state => state.popupProps,
  triggerProps: state => state.triggerProps,
  itemRoot: state => state.itemRoot,
  triggerElement: state => state.triggerElement,
  positionerElement: state => state.positionerElement,
  listElement: state => state.listElement,
  popupSide: state => state.popupSide,
  scrollUpArrowVisible: state => state.scrollUpArrowVisible,
  scrollDownArrowVisible: state => state.scrollDownArrowVisible,
  hasScrollArrows: state => state.hasScrollArrows
};

/***/ }),

/***/ 940625:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ SelectPopup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(203283);
/* harmony import */ var _base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(963664);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(536139);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(943512);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(313344);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(960977);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(603917);
/* harmony import */ var _base_ui_utils_clamp__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(903932);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(273429);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(155321);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(614128);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(643704);
/* harmony import */ var _positioner_SelectPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(288576);
/* harmony import */ var _utils_styles_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(696169);
/* harmony import */ var _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(583758);
/* harmony import */ var _internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(562340);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(671775);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(770980);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(369827);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(460485);
/* harmony import */ var _toolbar_root_ToolbarRootContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(533638);
/* harmony import */ var _internals_composite_composite_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(827677);
/* harmony import */ var _internals_getDisabledMountTransitionStyles_mjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(872936);
/* harmony import */ var _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(511218);
/* harmony import */ var _internals_csp_context_CSPContext_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(221376);
/* harmony import */ var _internals_direction_context_DirectionContext_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(643276);
/* harmony import */ var _positioner_SelectPositionerCssVars_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(860418);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ SelectPopup auto */ 



























const stateAttributesMapping = {
    ..._utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_2__/* .popupStateMapping */ .GW,
    ..._internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_3__/* .transitionStatusMapping */ .G
};
/**
 * A container for the select list.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectPopup = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectPopup(componentProps, forwardedRef) {
    const { render, className, style, finalFocus, ...elementProps } = componentProps;
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useSelectRootContext */ .ll)();
    const multiple = store.useState('multiple');
    const readOnly = store.useState('readOnly');
    const highlightItemOnHover = store.useState('highlightItemOnHover');
    const floatingRootContext = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useSelectFloatingContext */ .hG)();
    const { side, align, alignItemWithTriggerActive, isPositioned, setControlledAlignItemWithTrigger } = (0,_positioner_SelectPositionerContext_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useSelectPositionerContext */ .H)();
    const insideToolbar = (0,_toolbar_root_ToolbarRootContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useToolbarRootContext */ .S)(true) != null;
    const direction = (0,_internals_direction_context_DirectionContext_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useDirection */ .j)();
    const { nonce, disableStyleElements } = (0,_internals_csp_context_CSPContext_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useCSPContext */ .n)();
    const id = store.useState('id');
    const open = store.useState('open');
    const openMethod = store.useState('openMethod');
    const mounted = store.useState('mounted');
    const popupProps = store.useState('popupProps');
    const transitionStatus = store.useState('transitionStatus');
    const triggerElement = store.useState('triggerElement');
    const positionerElement = store.useState('positionerElement');
    const listElement = store.useState('listElement');
    const reachedMaxHeightRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const initialPlacedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const originalPositionerStylesRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef({});
    const scrollArrowFrame = (0,_base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_9__/* .useAnimationFrame */ .NR)();
    const handleScroll = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_10__/* .useStableCallback */ .K)((scroller)=>{
        if (!positionerElement || !store.context.popupRef.current || !initialPlacedRef.current) {
            return;
        }
        const isTopPositioned = positionerElement.style.top === '0px';
        const isBottomPositioned = positionerElement.style.bottom === '0px';
        if (reachedMaxHeightRef.current || !alignItemWithTriggerActive || !isTopPositioned && !isBottomPositioned) {
            store.context.handleScrollArrowVisibility(scroller);
            return;
        }
        const scale = getScale(positionerElement);
        const currentHeight = normalizeSize(positionerElement.getBoundingClientRect().height, 'y', scale);
        const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_11__/* .ownerDocument */ .R)(positionerElement);
        const win = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_12__/* .getWindow */ .zk)(positionerElement);
        const positionerStyles = win.getComputedStyle(positionerElement);
        const marginTop = parseFloat(positionerStyles.marginTop);
        const marginBottom = parseFloat(positionerStyles.marginBottom);
        const maxPopupHeight = getMaxPopupHeight(win.getComputedStyle(store.context.popupRef.current));
        const maxAvailableHeight = Math.min(doc.documentElement.clientHeight - marginTop - marginBottom, maxPopupHeight);
        const scrollTop = scroller.scrollTop;
        const maxScrollTop = getMaxScrollTop(scroller);
        // `Infinity` requests a scroll to the recomputed maximum offset.
        let nextScrollTop = null;
        const setHeight = (height)=>{
            positionerElement.style.height = `${height}px`;
        };
        const diff = isTopPositioned ? maxScrollTop - scrollTop : scrollTop;
        const nextHeight = Math.min(currentHeight + diff, maxAvailableHeight);
        if (diff <= _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_13__/* .SCROLL_EDGE_TOLERANCE_PX */ .Pv) {
            const heightDelta = (0,_base_ui_utils_clamp__WEBPACK_IMPORTED_MODULE_14__/* .clamp */ .q)(diff, 0, maxAvailableHeight - currentHeight);
            if (heightDelta > 0) {
                // Consume the remaining scroll in height.
                setHeight(currentHeight + heightDelta);
            }
            scroller.scrollTop = isTopPositioned ? maxScrollTop : 0;
            if (maxAvailableHeight - (currentHeight + heightDelta) <= _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_13__/* .SCROLL_EDGE_TOLERANCE_PX */ .Pv) {
                reachedMaxHeightRef.current = true;
            }
            store.context.handleScrollArrowVisibility(scroller);
            return;
        }
        if (maxAvailableHeight - nextHeight > _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_13__/* .SCROLL_EDGE_TOLERANCE_PX */ .Pv) {
            nextScrollTop = isTopPositioned ? Infinity : 0;
        } else if (isBottomPositioned && scrollTop < maxScrollTop) {
            const overshoot = currentHeight + diff - maxAvailableHeight;
            nextScrollTop = scrollTop - (diff - overshoot);
        }
        const nextPositionerHeight = Math.ceil(nextHeight);
        if (nextPositionerHeight !== 0) {
            setHeight(nextPositionerHeight);
        }
        if (nextScrollTop != null) {
            // Recompute bounds after resizing (clientHeight likely changed).
            const target = (0,_base_ui_utils_clamp__WEBPACK_IMPORTED_MODULE_14__/* .clamp */ .q)(nextScrollTop, 0, getMaxScrollTop(scroller));
            // Avoid adjustments that re-trigger scroll events forever.
            if (Math.abs(scroller.scrollTop - target) > _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_13__/* .SCROLL_EDGE_TOLERANCE_PX */ .Pv) {
                scroller.scrollTop = target;
            }
        }
        if (nextPositionerHeight >= maxAvailableHeight - _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_13__/* .SCROLL_EDGE_TOLERANCE_PX */ .Pv) {
            reachedMaxHeightRef.current = true;
        }
        store.context.handleScrollArrowVisibility(scroller);
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(store.context.scrollHandlerRef, ()=>handleScroll, [
        handleScroll
    ]);
    (0,_internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_15__/* .useOpenChangeComplete */ .v)({
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (open) {
                store.context.onOpenChangeComplete(true);
            }
        }
    });
    const state = {
        open,
        transitionStatus,
        side,
        align
    };
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_16__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!positionerElement || !store.context.popupRef.current || Object.keys(originalPositionerStylesRef.current).length) {
            return;
        }
        originalPositionerStylesRef.current = {
            top: positionerElement.style.top || '0',
            left: positionerElement.style.left || '0',
            right: positionerElement.style.right,
            height: positionerElement.style.height,
            bottom: positionerElement.style.bottom,
            minHeight: positionerElement.style.minHeight,
            maxHeight: positionerElement.style.maxHeight,
            marginTop: positionerElement.style.marginTop,
            marginBottom: positionerElement.style.marginBottom
        };
    }, [
        store,
        positionerElement
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_16__/* .useIsoLayoutEffect */ .g)(()=>{
        if (open || alignItemWithTriggerActive) {
            return;
        }
        initialPlacedRef.current = false;
        reachedMaxHeightRef.current = false;
        (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_17__/* .clearStyles */ .Y)(positionerElement, originalPositionerStylesRef.current);
    }, [
        open,
        alignItemWithTriggerActive,
        positionerElement
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_16__/* .useIsoLayoutEffect */ .g)(()=>{
        const popupElement = store.context.popupRef.current;
        // Wait for Floating UI's first positioning pass before reading DOM geometry.
        // We replace the final coordinates for aligned selects, but still need middleware
        // like `size()` to set CSS variables such as `--anchor-width`.
        if (!open || !triggerElement || !positionerElement || !popupElement || alignItemWithTriggerActive && !isPositioned || store.state.transitionStatus === 'ending') {
            return;
        }
        initialPlacedRef.current = true;
        popupElement.style.removeProperty(_positioner_SelectPositionerCssVars_mjs__WEBPACK_IMPORTED_MODULE_18__/* .transformOrigin */ .Td);
        if (!alignItemWithTriggerActive) {
            // The wrapper supplies the scroller: the list owns scrolling once it has mounted, and
            // this effect re-runs (cancelling the stale frame) when that happens.
            scrollArrowFrame.request(()=>store.context.handleScrollArrowVisibility(listElement || popupElement));
            return;
        }
        // Ensure we remove any transforms that can affect the location of the popup
        // and therefore the calculations.
        const restoreTransformStyles = unsetTransformStyles(popupElement);
        try {
            let textElement = store.context.selectedItemTextRef.current;
            if (!textElement?.isConnected) {
                const hasSelectedValue = store.select('hasSelectedValue');
                textElement = !hasSelectedValue && store.context.firstItemTextRef.current?.isConnected ? store.context.firstItemTextRef.current : null;
            }
            const valueElement = store.context.valueRef.current;
            const win = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_12__/* .getWindow */ .zk)(positionerElement);
            const positionerStyles = win.getComputedStyle(positionerElement);
            const popupStyles = win.getComputedStyle(popupElement);
            const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_11__/* .ownerDocument */ .R)(triggerElement);
            const scale = getScale(triggerElement);
            const triggerRect = normalizeRect(triggerElement.getBoundingClientRect(), scale);
            const positionerRect = normalizeRect(positionerElement.getBoundingClientRect(), scale);
            const triggerHeight = triggerRect.height;
            const scroller = listElement || popupElement;
            const scrollHeight = scroller.scrollHeight;
            const borderBottom = parseFloat(popupStyles.borderBottomWidth);
            // The `|| N` fallbacks cover an unset/`auto` value (parses to `NaN`). Note a literal `0`
            // also resolves to the fallback, so an explicit `margin: 0` or `min-height: 0` still takes
            // the default below.
            const marginTop = parseFloat(positionerStyles.marginTop) || 10;
            const marginBottom = parseFloat(positionerStyles.marginBottom) || 10;
            const minHeight = parseFloat(positionerStyles.minHeight) || 100;
            const maxPopupHeight = getMaxPopupHeight(popupStyles);
            const paddingLeft = 5;
            const paddingRight = 5;
            const triggerCollisionThreshold = 20;
            const viewportHeight = doc.documentElement.clientHeight - marginTop - marginBottom;
            const viewportWidth = doc.documentElement.clientWidth;
            const availableSpaceBeneathTrigger = viewportHeight - triggerRect.bottom + triggerHeight;
            let textRect;
            let alignedLeft = direction === 'rtl' ? triggerRect.right - positionerRect.width : triggerRect.left;
            let offsetY = 0;
            if (textElement && valueElement) {
                const valueRect = normalizeRect(valueElement.getBoundingClientRect(), scale);
                textRect = normalizeRect(textElement.getBoundingClientRect(), scale);
                alignedLeft = positionerRect.left + (direction === 'rtl' ? valueRect.right - textRect.right : valueRect.left - textRect.left);
                const valueCenterFromTriggerTop = valueRect.top - triggerRect.top + valueRect.height / 2;
                const textCenterFromPositionerTop = textRect.top - positionerRect.top + textRect.height / 2;
                offsetY = textCenterFromPositionerTop - valueCenterFromTriggerTop;
            }
            const idealHeight = availableSpaceBeneathTrigger + offsetY + marginBottom + borderBottom;
            let height = Math.min(viewportHeight, idealHeight);
            const maxHeight = viewportHeight - marginTop - marginBottom;
            const scrollTop = idealHeight - height;
            const maxRight = viewportWidth - paddingRight;
            positionerElement.style.left = `${(0,_base_ui_utils_clamp__WEBPACK_IMPORTED_MODULE_14__/* .clamp */ .q)(alignedLeft, paddingLeft, maxRight - positionerRect.width)}px`;
            positionerElement.style.height = `${height}px`;
            // `none` (not the invalid `auto`) so the explicit height governs in align mode and isn't
            // clamped by a `max-height` from user CSS.
            positionerElement.style.maxHeight = 'none';
            positionerElement.style.marginTop = `${marginTop}px`;
            positionerElement.style.marginBottom = `${marginBottom}px`;
            popupElement.style.height = '100%';
            const maxScrollTop = getMaxScrollTop(scroller);
            const isTopPositioned = scrollTop >= maxScrollTop - _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_13__/* .SCROLL_EDGE_TOLERANCE_PX */ .Pv;
            if (isTopPositioned) {
                height = Math.min(viewportHeight, positionerRect.height) - (scrollTop - maxScrollTop);
            }
            // When the trigger is too close to the top or bottom of the viewport, or the minHeight is
            // reached, we fallback to aligning the popup to the trigger as the UX is poor otherwise.
            const fallbackToAlignPopupToTrigger = triggerRect.top < triggerCollisionThreshold || triggerRect.bottom > viewportHeight - triggerCollisionThreshold || Math.ceil(height) + _utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_13__/* .SCROLL_EDGE_TOLERANCE_PX */ .Pv < Math.min(scrollHeight, minHeight);
            // Safari doesn't position the popup correctly when pinch-zoomed.
            const isPinchZoomed = (win.visualViewport?.scale ?? 1) !== 1 && _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_19__/* .webkit */ .Fp;
            if (fallbackToAlignPopupToTrigger || isPinchZoomed) {
                (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_17__/* .clearStyles */ .Y)(positionerElement, originalPositionerStylesRef.current);
                setControlledAlignItemWithTrigger(false);
                return;
            }
            const initialHeight = Math.max(minHeight, height);
            if (isTopPositioned) {
                const topOffset = Math.max(0, viewportHeight - idealHeight);
                positionerElement.style.top = positionerRect.height >= maxHeight ? '0' : `${topOffset}px`;
                positionerElement.style.height = `${height}px`;
                scroller.scrollTop = getMaxScrollTop(scroller);
            } else {
                positionerElement.style.bottom = '0';
                scroller.scrollTop = scrollTop;
            }
            if (textRect) {
                const popupTop = positionerRect.top;
                const popupHeight = positionerRect.height;
                const textCenterY = textRect.top + textRect.height / 2;
                const clampedY = (0,_base_ui_utils_clamp__WEBPACK_IMPORTED_MODULE_14__/* .clamp */ .q)(popupHeight > 0 ? (textCenterY - popupTop) / popupHeight * 100 : 50, 0, 100);
                popupElement.style.setProperty(_positioner_SelectPositionerCssVars_mjs__WEBPACK_IMPORTED_MODULE_18__/* .transformOrigin */ .Td, `50% ${clampedY}%`);
            }
            if (initialHeight === viewportHeight || height >= maxPopupHeight) {
                reachedMaxHeightRef.current = true;
            }
            store.context.handleScrollArrowVisibility(scroller);
            if (highlightItemOnHover && store.state.selectedIndex === null && store.state.activeIndex === null && store.context.listRef.current[0] != null) {
                store.set('activeIndex', 0);
            }
        } finally{
            restoreTransformStyles();
        }
    }, [
        store,
        open,
        positionerElement,
        triggerElement,
        alignItemWithTriggerActive,
        setControlledAlignItemWithTrigger,
        scrollArrowFrame,
        listElement,
        highlightItemOnHover,
        direction,
        isPositioned
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!alignItemWithTriggerActive || !positionerElement || !open) {
            return undefined;
        }
        const win = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_12__/* .getWindow */ .zk)(positionerElement);
        function handleResize(event) {
            store.context.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_20__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_21__/* .windowResize */ .L5, event));
        }
        return (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_22__/* .addEventListener */ .q)(win, 'resize', handleResize);
    }, [
        store,
        alignItemWithTriggerActive,
        positionerElement,
        open
    ]);
    const defaultProps = {
        ...listElement ? {
            role: 'presentation'
        } : {
            role: 'listbox',
            'aria-multiselectable': multiple || undefined,
            'aria-readonly': readOnly || undefined,
            id: `${id}-list`
        },
        onKeyDown (event) {
            if (insideToolbar && _internals_composite_composite_mjs__WEBPACK_IMPORTED_MODULE_23__/* .COMPOSITE_KEYS */ .jF.has(event.key)) {
                event.stopPropagation();
            }
        },
        onScroll (event) {
            if (listElement) {
                return;
            }
            handleScroll(event.currentTarget);
        },
        ...alignItemWithTriggerActive && {
            style: listElement ? {
                height: '100%'
            } : _utils_mjs__WEBPACK_IMPORTED_MODULE_17__/* .LIST_FUNCTIONAL_STYLES */ .O
        },
        className: !listElement && alignItemWithTriggerActive ? _utils_styles_mjs__WEBPACK_IMPORTED_MODULE_24__/* .styleDisableScrollbar */ .E.className : undefined
    };
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_25__/* .useRenderElement */ .o)('div', componentProps, {
        ref: [
            forwardedRef,
            store.context.popupRef
        ],
        state,
        stateAttributesMapping,
        props: [
            popupProps,
            defaultProps,
            (0,_internals_getDisabledMountTransitionStyles_mjs__WEBPACK_IMPORTED_MODULE_26__/* .getDisabledMountTransitionStyles */ .d)(transitionStatus),
            elementProps
        ]
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            !disableStyleElements && _utils_styles_mjs__WEBPACK_IMPORTED_MODULE_24__/* .styleDisableScrollbar */ .E.getElement(nonce),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_27__/* .FloatingFocusManager */ .s, {
                context: floatingRootContext,
                modal: false,
                disabled: !mounted,
                openInteractionType: openMethod,
                returnFocus: finalFocus,
                restoreFocus: true,
                children: element
            })
        ]
    });
});
if (false) {}
function getMaxPopupHeight(popupStyles) {
    const maxHeightStyle = popupStyles.maxHeight;
    return maxHeightStyle.endsWith('px') ? parseFloat(maxHeightStyle) || Infinity : Infinity;
}
function getMaxScrollTop(scroller) {
    return (0,_utils_scrollEdges_mjs__WEBPACK_IMPORTED_MODULE_13__/* .getMaxScrollOffset */ .XF)(scroller.scrollHeight, scroller.clientHeight);
}
function getScale(element) {
    // The platform API is async-capable, but the DOM platform returns a plain scale object.
    return _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_28__/* .platform */ .iD.getScale(element);
}
function normalizeSize(size, axis, scale) {
    return size / scale[axis];
}
function normalizeRect(rect, scale) {
    return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_29__/* .rectToClientRect */ .B1)({
        x: normalizeSize(rect.x, 'x', scale),
        y: normalizeSize(rect.y, 'y', scale),
        width: normalizeSize(rect.width, 'x', scale),
        height: normalizeSize(rect.height, 'y', scale)
    });
}
const TRANSFORM_STYLE_RESETS = [
    [
        'transform',
        'none'
    ],
    [
        'scale',
        '1'
    ],
    [
        'translate',
        '0 0'
    ]
];
function unsetTransformStyles(popupElement) {
    const { style } = popupElement;
    const originalStyles = {};
    for (const [property, value] of TRANSFORM_STYLE_RESETS){
        originalStyles[property] = style.getPropertyValue(property);
        style.setProperty(property, value, 'important');
    }
    return ()=>{
        for (const [property] of TRANSFORM_STYLE_RESETS){
            const originalValue = originalStyles[property];
            if (originalValue) {
                style.setProperty(property, originalValue);
            } else {
                style.removeProperty(property);
            }
        }
    };
}


/***/ }),

/***/ 973241:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ai: () => (/* binding */ removeItem),
/* harmony export */   DI: () => (/* binding */ isSelectedValueDirty),
/* harmony export */   Gu: () => (/* binding */ findSelectionIndex),
/* harmony export */   Q0: () => (/* binding */ resolveSelectedIndex),
/* harmony export */   Vz: () => (/* binding */ findItemIndex),
/* harmony export */   jd: () => (/* binding */ defaultItemEquality),
/* harmony export */   tl: () => (/* binding */ compareItemEquality)
/* harmony export */ });
/* unused harmony export selectedValueIncludes */
/* harmony import */ var _base_ui_utils_areArraysEqual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(699095);

// Compared by identity in `findSelectionIndex`; don't wrap it.
const defaultItemEquality = (itemValue, selectedValue) => Object.is(itemValue, selectedValue);
function compareItemEquality(itemValue, selectedValue, comparer) {
  if (itemValue == null || selectedValue == null) {
    return Object.is(itemValue, selectedValue);
  }
  return comparer(itemValue, selectedValue);
}
function isSelectedValueDirty(currentValue, initialValue, comparer) {
  if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
    return !(0,_base_ui_utils_areArraysEqual__WEBPACK_IMPORTED_MODULE_0__/* .areArraysEqual */ .B)(currentValue, initialValue, (itemValue, initialItemValue) => compareItemEquality(itemValue, initialItemValue, comparer));
  }
  return currentValue !== initialValue;
}
function selectedValueIncludes(selectedValues, itemValue, comparer) {
  if (!selectedValues) {
    return false;
  }
  return selectedValues.some(selectedValue => {
    if (selectedValue === undefined) {
      return false;
    }
    return compareItemEquality(itemValue, selectedValue, comparer);
  });
}
function findItemIndex(itemValues, selectedValue, comparer) {
  if (!itemValues) {
    return -1;
  }
  return itemValues.findIndex(itemValue => {
    if (itemValue === undefined) {
      return false;
    }
    return compareItemEquality(itemValue, selectedValue, comparer);
  });
}

// The default comparer is `Object.is`, so the values can be indexed instead of rescanned
// for every item. A custom comparer may match values that don't hash alike.
function createSelectionMatcher(selectedValues, comparer) {
  if (comparer !== defaultItemEquality) {
    return itemValue => selectedValueIncludes(selectedValues, itemValue, comparer);
  }
  const index = new Set(selectedValues);
  index.delete(undefined);
  // `Set` treats +0 and -0 as equal; `Object.is` does not.
  return itemValue => index.has(itemValue) && (itemValue !== 0 || selectedValues.some(v => Object.is(itemValue, v)));
}
function findSelectionIndex(itemValues, selectedValue, comparer, multiple) {
  // Only treat the value as a list in multiple mode: an array can itself be a valid
  // single-select value.
  const index = multiple && Array.isArray(selectedValue) ?
  // Anchor to the first selected item in rendered order so the index does not depend
  // on the order in which the values were added to the array.
  itemValues.findIndex(createSelectionMatcher(selectedValue, comparer)) : findItemIndex(itemValues, selectedValue, comparer);
  return index === -1 ? null : index;
}

/** Resolves the first selected index as items register or change. */
function resolveSelectedIndex(index, itemValue, registry, selectedValues, comparer, currentIndex) {
  if (selectedValueIncludes(selectedValues, itemValue, comparer)) {
    // A later item only takes over once the current anchor stops being selected.
    return currentIndex != null && index > currentIndex && selectedValueIncludes(selectedValues, registry[currentIndex], comparer) ? currentIndex : index;
  }
  // The holder re-elects the anchor once it stops being selected.
  return index === currentIndex ? findSelectionIndex(registry, selectedValues, comparer, true) : currentIndex;
}
function removeItem(selectedValues, itemValue, comparer) {
  return selectedValues.filter(selectedValue => !compareItemEquality(itemValue, selectedValue, comparer));
}

/***/ }),

/***/ 976305:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ SelectTrigger)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(313344);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(324077);
/* harmony import */ var _base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(543302);
/* harmony import */ var _root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(614128);
/* harmony import */ var _internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(389983);
/* harmony import */ var _internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(668854);
/* harmony import */ var _internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(650484);
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(643704);
/* harmony import */ var _internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(847310);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(671775);
/* harmony import */ var _utils_getPseudoElementBounds_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(364150);
/* harmony import */ var _floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(666611);
/* harmony import */ var _floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(8777);
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(356479);
/* harmony import */ var _internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(640902);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(369827);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(460485);
/* harmony import */ var _internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(201625);
/* harmony import */ var _utils_resolveAriaLabelledBy_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(768448);
/* harmony import */ var _SelectTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(140350);
/* __next_internal_client_entry_do_not_use__ SelectTrigger auto */ 



















const SELECTED_DELAY = 400;
const stateAttributesMapping = {
    ..._utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_1__/* .pressableTriggerOpenStateMapping */ .jL,
    ..._internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .fieldValidityMapping */ .dc,
    popupSide: (side)=>side ? {
            [_SelectTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_3__/* .popupSide */ .wI]: side
        } : null,
    value: ()=>null
};
/**
 * A button that opens the select popup.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */ const SelectTrigger = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SelectTrigger(componentProps, forwardedRef) {
    const { render, className, id: idProp, disabled: disabledProp = false, nativeButton = true, style, ...elementProps } = componentProps;
    const { setTouched, validationMode, validation, state: fieldState, disabled: fieldDisabled } = (0,_internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useFieldRootContext */ .V$)();
    const { labelId: fieldLabelId } = (0,_internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useLabelableContext */ .H)();
    const store = (0,_root_SelectRootContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useSelectRootContext */ .ll)();
    const readOnly = store.useState('readOnly');
    const required = store.useState('required');
    const selectDisabled = store.useState('disabled');
    const disabled = fieldDisabled || selectDisabled || disabledProp;
    const open = store.useState('open');
    const mounted = store.useState('mounted');
    const value = store.useState('value');
    const triggerProps = store.useState('triggerProps');
    const positionerElement = store.useState('positionerElement');
    const listElement = store.useState('listElement');
    const popupSideValue = store.useState('popupSide');
    const rootId = store.useState('id');
    const selectLabelId = store.useState('labelId');
    const hasSelectedValue = store.useState('hasSelectedValue');
    const popupSide = mounted && positionerElement ? popupSideValue : null;
    const id = idProp ?? rootId;
    const ariaLabelledBy = (0,_utils_resolveAriaLabelledBy_mjs__WEBPACK_IMPORTED_MODULE_7__/* .resolveAriaLabelledBy */ ._)(fieldLabelId, selectLabelId);
    (0,_internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useLabelableId */ .l)({
        id: idProp
    });
    const positionerRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_9__/* .useValueAsRef */ .u)(positionerElement);
    const triggerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const setFocused = (0,_internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useSetFieldFocused */ .N)(disabled, triggerRef);
    const { getButtonProps, buttonRef } = (0,_internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_11__/* .useButton */ .s)({
        disabled,
        native: nativeButton
    });
    const setTriggerElement = store.useStateSetter('triggerElement');
    const timeoutFocus = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__/* .useTimeout */ .Z)();
    const timeoutMouseDown = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__/* .useTimeout */ .Z)();
    const selectedDelayTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__/* .useTimeout */ .Z)();
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (open) {
            // A mousedown on the trigger can open the popup under the cursor. Keep mouseup selection
            // disabled briefly so releasing over either the selected item or a neighboring item doesn't
            // commit an accidental selection. SelectItem can still opt into unselected mouseup sooner
            // after a real drag over the item.
            selectedDelayTimeout.start(SELECTED_DELAY, ()=>{
                store.context.selectionRef.current.allowUnselectedMouseUp = true;
                store.context.selectionRef.current.allowSelectedMouseUp = true;
            });
            return ()=>{
                selectedDelayTimeout.clear();
            };
        }
        store.context.selectionRef.current = {
            allowSelectedMouseUp: false,
            allowUnselectedMouseUp: false,
            dragY: 0
        };
        timeoutMouseDown.clear();
        return undefined;
    }, [
        open,
        store,
        timeoutMouseDown,
        selectedDelayTimeout
    ]);
    const mergedProps = (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_13__/* .mergeProps */ .v6)(triggerProps, {
        id,
        role: 'combobox',
        'aria-expanded': open,
        'aria-haspopup': 'listbox',
        'aria-controls': open ? listElement?.id ?? (0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_14__/* .getFloatingFocusElement */ .nd)(positionerElement)?.id : undefined,
        'aria-labelledby': ariaLabelledBy,
        'aria-readonly': readOnly || undefined,
        'aria-required': required || undefined,
        tabIndex: disabled ? -1 : 0,
        onFocus (event) {
            setFocused(true);
            // The popup element shouldn't obscure the focused trigger.
            if (open && store.context.alignItemWithTriggerActiveRef.current) {
                store.context.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_15__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .none */ .dv, event.nativeEvent));
            }
            // Saves a re-render on initial click: `forceMount === true` mounts
            // the items before `open === true`. We could sync those cycles better
            // without a timeout, but this is enough for now.
            timeoutFocus.start(0, ()=>{
                store.set('forceMount', true);
            });
        },
        onBlur (event) {
            // If focus is moving into the popup, don't count it as a blur.
            if ((0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_17__/* .contains */ .gR)(positionerElement, event.relatedTarget)) {
                return;
            }
            setTouched(true);
            setFocused(false);
            if (validationMode === 'onBlur') {
                validation.commit(value);
            }
        },
        onMouseDown (event) {
            if (open) {
                return;
            }
            const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_18__/* .ownerDocument */ .R)(event.currentTarget);
            function handleMouseUp(mouseEvent) {
                if (!triggerRef.current) {
                    return;
                }
                const mouseUpTarget = mouseEvent.target;
                // Don't treat the release as an outside press when it lands on the trigger or inside
                // the popup positioner (or their children).
                if ((0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_17__/* .contains */ .gR)(triggerRef.current, mouseUpTarget) || (0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_17__/* .contains */ .gR)(positionerRef.current, mouseUpTarget)) {
                    return;
                }
                if ((0,_utils_getPseudoElementBounds_mjs__WEBPACK_IMPORTED_MODULE_19__/* .isMouseWithinBounds */ .U)(mouseEvent, triggerRef.current)) {
                    return;
                }
                store.context.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_15__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .cancelOpen */ .LO, mouseEvent));
            }
            // Firefox can fire this upon mousedown
            timeoutMouseDown.start(0, ()=>{
                doc.addEventListener('mouseup', handleMouseUp, {
                    once: true
                });
            });
        }
    }, elementProps, getButtonProps);
    const props = validation.getValidationProps(disabled, mergedProps);
    // ensure nested useButton does not overwrite the combobox role:
    // <Toolbar.Button render={<Select.Trigger />} />
    props.role = 'combobox';
    const state = {
        ...fieldState,
        open,
        disabled,
        value,
        readOnly,
        popupSide,
        placeholder: !hasSelectedValue
    };
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_20__/* .useRenderElement */ .o)('button', componentProps, {
        ref: [
            forwardedRef,
            triggerRef,
            buttonRef,
            setTriggerElement
        ],
        state,
        stateAttributesMapping,
        props
    });
});
if (false) {}


/***/ }),

/***/ 993073:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ isElementDisabled)
/* harmony export */ });
function isElementDisabled(element) {
  return element == null || element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
}

/***/ })

};
;