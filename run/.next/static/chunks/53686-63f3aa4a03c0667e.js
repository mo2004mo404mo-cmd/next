"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[53686],{

/***/ 1149:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ FloatingRootStore)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98419);
/* harmony import */ var _utils_createEventEmitter_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20061);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17947);



const selectors = {
  open: state => state.open,
  transitionStatus: state => state.transitionStatus,
  domReferenceElement: state => state.domReferenceElement,
  referenceElement: state => state.positionReference ?? state.referenceElement,
  floatingElement: state => state.floatingElement,
  floatingId: state => state.floatingId
};
class FloatingRootStore extends _base_ui_utils_store__WEBPACK_IMPORTED_MODULE_0__/* .ReactStore */ .H {
  constructor(options) {
    const {
      syncOnly,
      nested,
      onOpenChange,
      triggerElements,
      ...initialState
    } = options;
    super({
      ...initialState,
      positionReference: initialState.referenceElement,
      domReferenceElement: initialState.referenceElement
    }, {
      onOpenChange,
      dataRef: {
        current: {}
      },
      events: (0,_utils_createEventEmitter_mjs__WEBPACK_IMPORTED_MODULE_1__/* .createEventEmitter */ .d)(),
      nested,
      triggerElements
    }, selectors);
    this.syncOnly = syncOnly;
  }

  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (newOpen, event) => {
    if (!newOpen || !this.state.open ||
    // Prevent a pending hover-open from overwriting a click-open event, while allowing
    // click events to upgrade a hover-open.
    event != null && (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isClickLikeEvent */ .Ev)(event)) {
      this.context.dataRef.current.openEvent = newOpen ? event : undefined;
    }
  };

  /**
   * Runs the root-owned side effects for an open state change.
   */
  dispatchOpenChange = (newOpen, eventDetails) => {
    this.syncOpenEvent(newOpen, eventDetails.event);
    const details = {
      open: newOpen,
      reason: eventDetails.reason,
      nativeEvent: eventDetails.event,
      nested: this.context.nested,
      triggerElement: eventDetails.trigger
    };
    this.context.events.emit('openchange', details);
  };

  /**
   * Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
   *
   * @param newOpen The new open state.
   * @param eventDetails Details about the event that triggered the open state change.
   */
  setOpen = (newOpen, eventDetails) => {
    if (this.syncOnly) {
      this.context.onOpenChange?.(newOpen, eventDetails);
      return;
    }
    this.dispatchOpenChange(newOpen, eventDetails);
    this.context.onOpenChange?.(newOpen, eventDetails);
  };
}

/***/ }),

/***/ 1339:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NL: () => (/* binding */ anchorHeight),
/* harmony export */   QJ: () => (/* binding */ availableWidth),
/* harmony export */   Td: () => (/* binding */ transformOrigin),
/* harmony export */   cn: () => (/* binding */ anchorWidth),
/* harmony export */   px: () => (/* binding */ availableHeight)
/* harmony export */ });
/* unused harmony exports positionerWidth, positionerHeight */
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
/**
 * The width of the popup's positioner.
 * It is important to set `width` to this value when using CSS to animate size changes.
 * @type {number}
 */
const positionerWidth = '--positioner-width';
/**
 * The height of the popup's positioner.
 * It is important to set `height` to this value when using CSS to animate size changes.
 * @type {number}
 */
const positionerHeight = '--positioner-height';

/***/ }),

/***/ 2368:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _useStore_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30271);

/**
 * A data store implementation that allows subscribing to state changes and updating the state.
 * It uses an observer pattern to notify subscribers when the state changes.
 */
class Store {
  /**
   * Creates a store with the given initial state, constructing the class it is called on.
   * Calling it on a generic base class (e.g. `ReactStore.create(...)`) constructs that
   * class but degrades the inferred instance type to `Store`; use `new` there instead.
   */
  static create(state) {
    return new this(state);
  }

  /**
   * The current state of the store.
   * This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
   * To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
   * The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
   *
   * Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
   */

  // Internal state to handle recursive `setState()` calls

  constructor(state) {
    this.state = state;
    this.listeners = new Set();
    this.updateTick = 0;
  }

  /**
   * Registers a listener that will be called whenever the store's state changes.
   *
   * @param fn The listener function to be called on state changes.
   * @returns A function to unsubscribe the listener.
   */
  subscribe = fn => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  /**
   * Returns the current state of the store.
   */
  getSnapshot = () => {
    return this.state;
  };

  /**
   * Updates the entire store's state and notifies all registered listeners.
   *
   * @param newState The new state to set for the store.
   */
  setState(newState) {
    if (this.state === newState) {
      return;
    }
    this.state = newState;
    this.updateTick += 1;
    const currentTick = this.updateTick;
    for (const listener of this.listeners) {
      if (currentTick !== this.updateTick) {
        // If the tick has changed, a recursive `setState` call has been made,
        // and it has already notified all listeners.
        return;
      }
      listener(newState);
    }
  }

  /**
   * Merges the provided changes into the current state and notifies listeners if there are changes.
   * Each value must match its state key. Pass an exact known subset rather than a broad
   * `Partial<State>`, which may contain `undefined` for required state fields.
   *
   * @param changes An object containing the changes to apply to the current state.
   */
  update(changes) {
    for (const key in changes) {
      if (!Object.is(this.state[key], changes[key])) {
        this.setState({
          ...this.state,
          ...changes
        });
        return;
      }
    }
  }

  /**
   * Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
   *
   * @param key The key in the store's state to update.
   * @param value The new value to set for the specified key.
   */
  set(key, value) {
    if (!Object.is(this.state[key], value)) {
      this.setState({
        ...this.state,
        [key]: value
      });
    }
  }

  /**
   * Gives the state a new reference and updates all registered listeners.
   */
  notifyAll() {
    const newState = {
      ...this.state
    };
    this.setState(newState);
  }
  use(selector, a1, a2, a3) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (0,_useStore_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useStore */ .P)(this, selector, a1, a2, a3);
  }
}

/***/ }),

/***/ 2474:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ useValueAsRef)
/* harmony export */ });
/* harmony import */ var _useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66652);
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14187);
/* __next_internal_client_entry_do_not_use__ useValueAsRef auto */ 

/**
 * Untracks the provided value by turning it into a ref to remove its reactivity.
 *
 * Used to access the passed value inside `React.useEffect` without causing the effect to re-run when the value changes.
 */ function useValueAsRef(value) {
    const latest = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useRefWithInit */ .j)(createLatestRef, value).current;
    latest.next = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0,_useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useIsoLayoutEffect */ .g)(latest.effect);
    return latest;
}
function createLatestRef(value) {
    const latest = {
        current: value,
        next: value,
        effect: ()=>{
            latest.current = latest.next;
        }
    };
    return latest;
}


/***/ }),

/***/ 3940:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BT: () => (/* binding */ TYPEABLE_SELECTOR),
/* harmony export */   Ed: () => (/* binding */ FOCUSABLE_ATTRIBUTE),
/* harmony export */   Jd: () => (/* binding */ ARROW_DOWN),
/* harmony export */   RJ: () => (/* binding */ ARROW_RIGHT),
/* harmony export */   eR: () => (/* binding */ ARROW_LEFT),
/* harmony export */   il: () => (/* binding */ ARROW_UP)
/* harmony export */ });
/* unused harmony exports ACTIVE_KEY, SELECTED_KEY */
const FOCUSABLE_ATTRIBUTE = 'data-base-ui-focusable';
const ACTIVE_KEY = 'active';
const SELECTED_KEY = 'selected';
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';

/***/ }),

/***/ 4802:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ useEnhancedClickHandler)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useEnhancedClickHandler auto */ 
/**
 * Provides a cross-browser way to determine the type of the pointer used to click.
 * Safari and Firefox do not provide the PointerEvent to the click handler (they use MouseEvent) yet.
 * Additionally, this implementation detects if the click was triggered by the keyboard.
 *
 * @param handler The function to be called when the button is clicked. The first parameter is the original event and the second parameter is the pointer type.
 */ function useEnhancedClickHandler(handler) {
    const lastClickInteractionTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef('');
    const handlePointerDown = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((event)=>{
        if (event.defaultPrevented) {
            return;
        }
        lastClickInteractionTypeRef.current = event.pointerType;
        handler(event, event.pointerType);
    }, [
        handler
    ]);
    const handleClick = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((event)=>{
        // event.detail has the number of clicks performed on the element. 0 means it was triggered by the keyboard.
        if (event.detail === 0) {
            handler(event, 'keyboard');
            return;
        }
        if ('pointerType' in event) {
            // Chrome and Edge correctly use PointerEvent
            handler(event, event.pointerType);
        } else {
            handler(event, lastClickInteractionTypeRef.current);
        }
        lastClickInteractionTypeRef.current = '';
    }, [
        handler
    ]);
    return {
        onClick: handleClick,
        onPointerDown: handlePointerDown
    };
}


/***/ }),

/***/ 4842:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ DEFAULT_SIDES)
/* harmony export */ });
const DEFAULT_SIDES = {
  sideX: 'left',
  sideY: 'top'
};

// Self-contained stand-in for Floating UI's `Middleware` type. Referencing the real type in
// store state makes `tsc` declaration emit reference `Platform`/`detectOverflow` from
// `@floating-ui/core` internals, which fails as non-portable (TS2883) in consuming builds.

/***/ }),

/***/ 6522:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ FocusGuard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95161);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15495);
/* harmony import */ var _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(46468);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ FocusGuard auto */ 



/**
 * @internal
 */ 
const FocusGuard = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function FocusGuard(props, ref) {
    const [role, setRole] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        // Unlike NVDA and JAWS, VoiceOver's virtual cursor triggers `onFocus` as
        // it moves — but only on focusable/role-button elements through WebKit's
        // NSAccessibility path. Setting `role="button"` lets the focus trap catch
        // the cursor.
        if (_base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_3__/* .voiceOver */ .N && _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_4__/* .webkit */ .Fp) {
            setRole('button');
        }
    }, []);
    const restProps = {
        tabIndex: 0,
        // Role is only for VoiceOver
        role
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        ...props,
        ref: ref,
        style: _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_5__/* .visuallyHidden */ .Q,
        "aria-hidden": role ? undefined : true,
        ...restProps,
        "data-base-ui-focus-guard": ""
    });
});
if (false) {}


/***/ }),

/***/ 8039:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(65538);
} else {}


/***/ }),

/***/ 8272:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ isMouseWithinBounds)
/* harmony export */ });
/* unused harmony export getPseudoElementBounds */
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48232);


// Tolerance around the element bounds so a fast click whose pointer drifts slightly
// during press-release isn't mistaken for a drag-off-and-release cancellation.
// Matches typical OS/browser drag-initiation thresholds.
const BOUNDARY_OFFSET = 5;

/**
 * Determines if a mouse event occurred within the bounds of an element
 * (including its pseudo-elements), with a small tolerance for pointer drift.
 */
function isMouseWithinBounds(event, element) {
  const bounds = getPseudoElementBounds(element);
  return event.clientX >= bounds.left - BOUNDARY_OFFSET && event.clientX <= bounds.right + BOUNDARY_OFFSET && event.clientY >= bounds.top - BOUNDARY_OFFSET && event.clientY <= bounds.bottom + BOUNDARY_OFFSET;
}
function getPseudoElementBounds(element) {
  const elementRect = element.getBoundingClientRect();
  const win = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(element);

  // Avoid "Not implemented: window.getComputedStyle(elt, pseudoElt)" in jsdom.
  if (_base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_1__/* .jsdom */ .I) {
    return elementRect;
  }
  const beforeStyles = win.getComputedStyle(element, '::before');
  const afterStyles = win.getComputedStyle(element, '::after');
  const hasPseudoElements = beforeStyles.content !== 'none' || afterStyles.content !== 'none';
  if (!hasPseudoElements) {
    return elementRect;
  }

  // Get dimensions of pseudo-elements
  const beforeWidth = parseFloat(beforeStyles.width) || 0;
  const beforeHeight = parseFloat(beforeStyles.height) || 0;
  const afterWidth = parseFloat(afterStyles.width) || 0;
  const afterHeight = parseFloat(afterStyles.height) || 0;

  // Calculate max dimensions including pseudo-elements
  const totalWidth = Math.max(elementRect.width, beforeWidth, afterWidth);
  const totalHeight = Math.max(elementRect.height, beforeHeight, afterHeight);

  // Calculate the differences to extend the bounds
  const widthDiff = totalWidth - elementRect.width;
  const heightDiff = totalHeight - elementRect.height;
  return {
    left: elementRect.left - widthDiff / 2,
    right: elementRect.right + widthDiff / 2,
    top: elementRect.top - heightDiff / 2,
    bottom: elementRect.bottom + heightDiff / 2
  };
}

/***/ }),

/***/ 9569:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ useClick)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18813);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64951);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8994);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93093);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83323);
/* harmony import */ var _utils_event_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17947);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76175);
/* __next_internal_client_entry_do_not_use__ useClick auto */ 







/**
 * Opens or closes the floating element when clicking the reference element.
 * @see https://floating-ui.com/docs/useClick
 */ function useClick(store, props = {}) {
    const { enabled = true, event: eventOption = 'click', toggle = true, ignoreMouse = false, stickIfOpen = true, touchOpenDelay = 0, reason = _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_1__/* .triggerPress */ .Ui } = props;
    const dataRef = store.context.dataRef;
    const pointerTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const frame = (0,_base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__/* .useAnimationFrame */ .NR)();
    const touchOpenTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__/* .useTimeout */ .Z)();
    const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        function setOpenWithTouchDelay(nextOpen, nativeEvent, target, pointerType) {
            const details = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_4__/* .createChangeEventDetails */ .d)(reason, nativeEvent, target);
            if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
                touchOpenTimeout.start(touchOpenDelay, ()=>{
                    store.setOpen(true, details);
                });
            } else {
                store.setOpen(nextOpen, details);
            }
        }
        function getNextOpen(open, currentTarget, isClickLikeOpenEvent) {
            const openEvent = dataRef.current.openEvent;
            const hasClickedOnInactiveTrigger = store.select('domReferenceElement') !== currentTarget;
            if (open && hasClickedOnInactiveTrigger) {
                // Moving between triggers should always open the newly active one.
                return true;
            }
            if (!open) {
                // A closed popup should open on the next press.
                return true;
            }
            if (!toggle) {
                // Non-toggle mode never closes on a repeated trigger press.
                return true;
            }
            if (openEvent && (typeof stickIfOpen === 'function' ? stickIfOpen() : stickIfOpen)) {
                // Preserve hover/focus-opened popups until the matching click-like event closes them.
                return !isClickLikeOpenEvent(openEvent.type);
            }
            // Otherwise, a repeated click toggles the popup closed.
            return false;
        }
        return {
            onPointerDown (event) {
                // Screen reader activations (Android TalkBack, desktop screen readers) report a
                // mouse-like `pointerType`, but `ignoreMouse` must not drop them: hover logic cannot
                // open for a virtual press since there is no real pointer movement to wait for.
                // Virtual `touch` presses (iOS VoiceOver) keep their type so `touchOpenDelay` applies.
                pointerTypeRef.current = (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isMouseLikePointerType */ .Go)(event.pointerType, true) && (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isVirtualPointerEvent */ .Pg)(event.nativeEvent) ? 'virtual' : event.pointerType;
            },
            onMouseDown (event) {
                const pointerType = pointerTypeRef.current;
                const nativeEvent = event.nativeEvent;
                const open = store.select('open');
                // Ignore all buttons except for the "main" button.
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
                if (event.button !== 0 || eventOption === 'click' || (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isMouseLikePointerType */ .Go)(pointerType, true) && ignoreMouse) {
                    return;
                }
                const nextOpen = getNextOpen(open, event.currentTarget, (openEventType)=>openEventType === 'click' || openEventType === 'mousedown');
                // Animations sometimes won't run on a typeable element if using a rAF.
                // Focus is always set on these elements. For touch, we may delay opening.
                // A screen reader press opens synchronously, so the popup's focus lands before the reader
                // re-syncs focus to its cursor, which would otherwise read as a stray move.
                const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_6__/* .getTarget */ .EW)(nativeEvent);
                const isTypeable = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .isTypeableElement */ .$u)(target);
                if (isTypeable || pointerType === 'virtual') {
                    // A virtual press may target a descendant of the trigger; the trigger is what opened.
                    setOpenWithTouchDelay(nextOpen, nativeEvent, isTypeable ? target : event.currentTarget, pointerType);
                    return;
                }
                // Capture the currentTarget before the rAF.
                // as React sets it to null after the event handler completes.
                const eventCurrentTarget = event.currentTarget;
                // Wait until focus is set on the element. This is an alternative to
                // `event.preventDefault()` to avoid :focus-visible from appearing when using a pointer.
                frame.request(()=>{
                    setOpenWithTouchDelay(nextOpen, nativeEvent, eventCurrentTarget, pointerType);
                });
            },
            onClick (event) {
                if (eventOption === 'mousedown-only') {
                    return;
                }
                const pointerType = pointerTypeRef.current;
                if (eventOption === 'mousedown' && pointerType) {
                    pointerTypeRef.current = undefined;
                    return;
                }
                if ((0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isMouseLikePointerType */ .Go)(pointerType, true) && ignoreMouse) {
                    return;
                }
                const open = store.select('open');
                const nextOpen = getNextOpen(open, event.currentTarget, (openEventType)=>openEventType === 'click' || openEventType === 'mousedown' || openEventType === 'keydown' || openEventType === 'keyup');
                setOpenWithTouchDelay(nextOpen, event.nativeEvent, event.currentTarget, pointerType);
            },
            onKeyDown () {
                pointerTypeRef.current = undefined;
            }
        };
    }, [
        dataRef,
        eventOption,
        ignoreMouse,
        reason,
        store,
        stickIfOpen,
        toggle,
        frame,
        touchOpenTimeout,
        touchOpenDelay
    ]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>enabled ? {
            reference
        } : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_8__/* .EMPTY_OBJECT */ .t0, [
        enabled,
        reference
    ]);
}


/***/ }),

/***/ 9683:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BN: () => (/* binding */ shift),
/* harmony export */   ER: () => (/* binding */ limitShift),
/* harmony export */   Ej: () => (/* binding */ size),
/* harmony export */   UE: () => (/* binding */ arrow),
/* harmony export */   UU: () => (/* binding */ flip),
/* harmony export */   cY: () => (/* binding */ offset),
/* harmony export */   jD: () => (/* binding */ hide),
/* harmony export */   we: () => (/* binding */ useFloating)
/* harmony export */ });
/* unused harmony exports autoPlacement, inline */
/* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43479);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47650);






var isClient = typeof document !== 'undefined';

var noop = function noop() {};
var index = isClient ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : noop;

// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'function' && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0;) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0;) {
      const key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}

function getDPR(element) {
  if (typeof window === 'undefined') {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}

function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}

function useLatestRef(value) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/useFloating
 */
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = react__WEBPACK_IMPORTED_MODULE_0__.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const [_floating, _setFloating] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const setReference = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(node => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(node => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const floatingRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const dataRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform);
  const openRef = useLatestRef(open);
  const update = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__/* .computePosition */ .rD)(referenceRef.current, floatingRef.current, config).then(data => {
      const fullData = {
        ...data,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData(data => ({
        ...data,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...(getDPR(elements.floating) >= 1.5 && {
          willChange: 'transform'
        })
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, 'current');
  }
  return {
    name: 'arrow',
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === 'function' ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__/* .arrow */ .UE)({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__/* .arrow */ .UE)({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = (options, deps) => {
  const result = (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__/* .offset */ .cY)(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = (options, deps) => {
  const result = (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__/* .shift */ .BN)(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = (options, deps) => {
  const result = (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__/* .limitShift */ .ER)(options);
  return {
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = (options, deps) => {
  const result = (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__/* .flip */ .UU)(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = (options, deps) => {
  const result = (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__/* .size */ .Ej)(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = (options, deps) => {
  const result = autoPlacement$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = (options, deps) => {
  const result = (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__/* .hide */ .jD)(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = (options, deps) => {
  const result = inline$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = (options, deps) => {
  const result = arrow$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};




/***/ }),

/***/ 12046:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ mergeCleanups)
/* harmony export */ });
/**
 * Combines multiple cleanup functions into a single cleanup function.
 */
function mergeCleanups(...cleanups) {
  return () => {
    for (let i = 0; i < cleanups.length; i += 1) {
      const cleanup = cleanups[i];
      if (cleanup) {
        cleanup();
      }
    }
  };
}

/***/ }),

/***/ 14718:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ addEventListener)
/* harmony export */ });
/**
 * Adds an event listener and returns a cleanup function to remove it.
 */

function addEventListener(target, type, listener, options) {
  target.addEventListener(type, listener, options);
  return () => {
    target.removeEventListener(type, listener, options);
  };
}

/***/ }),

/***/ 15495:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fp: () => (/* binding */ webkit)
/* harmony export */ });
/* unused harmony exports gecko, blink */
/* harmony import */ var _shared_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77450);


// WebKit (Safari, all iOS browsers, GNOME Web). Distinguished from Blink by
// the legacy `-webkit-backdrop-filter` name — Blink forked from WebKit in 2013
// and only ships the unprefixed `backdrop-filter`.
/** WebKit: Safari, all iOS browsers, GNOME Web. Excludes Blink. */
const webkit = typeof CSS !== 'undefined' && !!CSS.supports?.('-webkit-backdrop-filter:none');

// Anchored to `!webkit` so engines are mutually exclusive by construction.
// Firefox-on-iOS uses WebKit (its UA marker is `FxiOS/`, not `Firefox/`); the
// `!webkit` prefix also defends against future iOS-browser UA changes that
// might inject `Firefox` into a WebKit-based UA.
/** Gecko: Firefox. */
const gecko = !webkit && _shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerUserAgent */ .ST.includes('firefox');

// All Chromium-based browsers ship `Chrome/` or `Chromium/` in their UA — both
// share the `chrom` prefix, so a single substring check covers Chrome, Edge,
// Opera, Brave, etc. Chrome-on-iOS uses `CriOS/` and stays WebKit. The positive
// UA check also makes this SSR-safe — an empty UA matches nothing.
/** Blink: Chrome, Edge, Opera, Brave, and other Chromium-based browsers. */
const blink = !webkit && _shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerUserAgent */ .ST.includes('chrom');

/***/ }),

/***/ 15702:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ useAnchoredPopupScrollLock)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(81456);
/* harmony import */ var _base_ui_utils_useScrollLock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31814);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66652);
/* __next_internal_client_entry_do_not_use__ useAnchoredPopupScrollLock auto */ 



// Touch-opened popups normally avoid scroll locking so users can still swipe outside to dismiss.
// This hook re-enables scroll lock only when the popup is effectively full-width.
// Treat popups with up to 20px of total horizontal gutter as full-width so common ~10px side
// padding still locks scroll, since that leaves too little outside space for a reliable swipe.
const VIEWPORT_WIDTH_TOLERANCE_PX = 20;
/**
 * Manages scroll lock for anchored popups. For non-touch opens, scroll lock is applied when
 * enabled. For touch opens, scroll lock is applied only when the positioner width is effectively
 * viewport-sized.
 */ function useAnchoredPopupScrollLock(enabled, touchOpen, positionerElement, referenceElement) {
    const [touchOpenShouldLockScroll, setTouchOpenShouldLockScroll] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!enabled || !touchOpen || positionerElement == null) {
            setTouchOpenShouldLockScroll(false);
            return;
        }
        const viewportWidth = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .ownerDocument */ .R)(positionerElement).documentElement.clientWidth;
        const popupWidth = positionerElement.offsetWidth;
        setTouchOpenShouldLockScroll(viewportWidth > 0 && popupWidth > 0 && popupWidth >= viewportWidth - VIEWPORT_WIDTH_TOLERANCE_PX);
    }, [
        enabled,
        touchOpen,
        positionerElement
    ]);
    (0,_base_ui_utils_useScrollLock__WEBPACK_IMPORTED_MODULE_3__/* .useScrollLock */ .K)(enabled && (!touchOpen || touchOpenShouldLockScroll), referenceElement);
}


/***/ }),

/***/ 17947:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ev: () => (/* binding */ isClickLikeEvent),
/* harmony export */   Go: () => (/* binding */ isMouseLikePointerType),
/* harmony export */   O_: () => (/* binding */ isReactEvent),
/* harmony export */   Pg: () => (/* binding */ isVirtualPointerEvent),
/* harmony export */   YF: () => (/* binding */ isVirtualClick),
/* harmony export */   jo: () => (/* binding */ stopEvent)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97827);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48232);

function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
function isReactEvent(event) {
  return 'nativeEvent' in event;
}

// License: https://github.com/adobe/react-spectrum/blob/main/packages/@react-aria/utils/src/isVirtualEvent.ts
function isVirtualClick(event) {
  if (event.pointerType === '' && event.isTrusted) {
    return true;
  }
  if (_base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_0__/* .android */ .yA && event.pointerType) {
    return event.type === 'click' && event.buttons === 1;
  }
  return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
  if (_base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_1__/* .jsdom */ .I) {
    return false;
  }
  return !_base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_0__/* .android */ .yA && event.width === 0 && event.height === 0 ||
  // Chrome synthesizes a screen reader press (TalkBack, VoiceOver, NVDA) as a 1x1 mouse
  // `pointerdown` with no pressure. TalkBack can report a pressed button, while desktop
  // mouse presses can report no pressure, so only require no pressed button off Android.
  event.type === 'pointerdown' && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'mouse' && (_base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_0__/* .android */ .yA || event.buttons === 0) ||
  // iOS VoiceOver returns 0.333• for width/height.
  event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'touch';
}
function isMouseLikePointerType(pointerType, strict) {
  // On some Linux machines with Chromium, mouse inputs return a `pointerType`
  // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
  const values = ['mouse', 'pen'];
  if (!strict) {
    values.push('', undefined);
  }
  return values.includes(pointerType);
}
function isClickLikeEvent(event) {
  const type = event.type;
  return type === 'click' || type === 'mousedown' || type === 'keydown' || type === 'keyup';
}

/***/ }),

/***/ 20061:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ createEventEmitter)
/* harmony export */ });
function createEventEmitter() {
  const map = new Map();
  return {
    emit(event, data) {
      map.get(event)?.forEach(listener => listener(data));
    },
    on(event, listener) {
      if (!map.has(event)) {
        map.set(event, new Set());
      }
      map.get(event).add(listener);
    },
    off(event, listener) {
      map.get(event)?.delete(listener);
    }
  };
}

/***/ }),

/***/ 22193:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ markOthers)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81456);
// Modified to add conditional `aria-hidden` support:
// https://github.com/theKashey/aria-hidden/blob/9220c8f4a4fd35f63bee5510a9f41a37264382d4/src/index.ts


const markerName = 'data-base-ui-inert';
let ariaHiddenCounterMap = new WeakMap();
let uncontrolledElementsSet = new WeakSet();
let markerCounterMap = new WeakMap();
let lockCount = 0;
function unwrapHost(node) {
  if (!node) {
    return null;
  }
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isShadowRoot */ .Ng)(node) ? node.host : unwrapHost(node.parentNode);
}
const correctElements = (parent, targets) => targets.map(target => {
  if (parent.contains(target)) {
    return target;
  }
  const correctedTarget = unwrapHost(target);
  if (parent.contains(correctedTarget)) {
    return correctedTarget;
  }
  return null;
}).filter(x => x != null);
const buildKeepSet = targets => {
  const keep = new Set();
  targets.forEach(target => {
    let node = target;
    while (node && !keep.has(node)) {
      keep.add(node);
      node = node.parentNode;
    }
  });
  return keep;
};
const collectOutsideElements = (root, keepElements, stopElements) => {
  const outside = [];
  const walk = parent => {
    if (!parent || stopElements.has(parent)) {
      return;
    }
    Array.from(parent.children).forEach(node => {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(node) === 'script') {
        return;
      }
      if (keepElements.has(node)) {
        walk(node);
      } else {
        outside.push(node);
      }
    });
  };
  walk(root);
  return outside;
};
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, {
  mark = true
}) {
  const avoidElements = correctElements(body, uncorrectedAvoidElements);
  const markerTargets = mark ? collectOutsideElements(body, buildKeepSet(avoidElements), new Set(avoidElements)) : [];
  const hiddenElements = [];
  const markedElements = [];
  if (ariaHidden) {
    const ariaLiveElements = correctElements(body, Array.from(body.querySelectorAll('[aria-live]')));
    const controlElements = avoidElements.concat(ariaLiveElements);
    const controlTargets = collectOutsideElements(body, buildKeepSet(controlElements), new Set(controlElements));
    controlTargets.forEach(node => {
      const attr = node.getAttribute('aria-hidden');
      const alreadyHidden = attr !== null && attr !== 'false';
      const counterValue = (ariaHiddenCounterMap.get(node) || 0) + 1;
      ariaHiddenCounterMap.set(node, counterValue);
      hiddenElements.push(node);
      if (counterValue === 1 && alreadyHidden) {
        uncontrolledElementsSet.add(node);
      }
      if (!alreadyHidden) {
        node.setAttribute('aria-hidden', 'true');
      }
    });
  }
  if (mark) {
    markerTargets.forEach(node => {
      const markerValue = (markerCounterMap.get(node) || 0) + 1;
      markerCounterMap.set(node, markerValue);
      markedElements.push(node);
      if (markerValue === 1) {
        node.setAttribute(markerName, '');
      }
    });
  }
  lockCount += 1;
  return () => {
    hiddenElements.forEach(element => {
      const counterValue = (ariaHiddenCounterMap.get(element) || 0) - 1;
      ariaHiddenCounterMap.set(element, counterValue);
      if (!counterValue) {
        if (!uncontrolledElementsSet.has(element)) {
          element.removeAttribute('aria-hidden');
        }
        uncontrolledElementsSet.delete(element);
      }
    });
    if (mark) {
      markedElements.forEach(element => {
        const markerValue = (markerCounterMap.get(element) || 0) - 1;
        markerCounterMap.set(element, markerValue);
        if (!markerValue) {
          element.removeAttribute(markerName);
        }
      });
    }
    lockCount -= 1;
    if (!lockCount) {
      ariaHiddenCounterMap = new WeakMap();
      uncontrolledElementsSet = new WeakSet();
      markerCounterMap = new WeakMap();
    }
  };
}
function markOthers(avoidElements, options = {}) {
  const {
    ariaHidden = false,
    mark = true
  } = options;
  const body = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_1__/* .ownerDocument */ .R)(avoidElements[0]).body;
  return applyAttributeToOthers(avoidElements, body, ariaHidden, {
    mark
  });
}

/***/ }),

/***/ 26713:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ae: () => (/* binding */ PopupHandleAttachment),
/* harmony export */   DU: () => (/* binding */ applyPopupOpenChange),
/* harmony export */   L_: () => (/* binding */ useTriggerDataForwarding),
/* harmony export */   Ls: () => (/* binding */ FOCUSABLE_POPUP_PROPS),
/* harmony export */   T1: () => (/* binding */ attachPreventUnmountOnClose),
/* harmony export */   UM: () => (/* binding */ createDefaultInitialFocus),
/* harmony export */   cQ: () => (/* binding */ createPopupOpenState),
/* harmony export */   i6: () => (/* binding */ usePopupInteractionProps),
/* harmony export */   l$: () => (/* binding */ useOpenStateTransitions),
/* harmony export */   tr: () => (/* binding */ useImplicitActiveTrigger),
/* harmony export */   xp: () => (/* binding */ usePopupRootStore),
/* harmony export */   xs: () => (/* binding */ usePopupRootSync)
/* harmony export */ });
/* unused harmony export useTriggerRegistration */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47650);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8994);
/* harmony import */ var _base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47247);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14187);
/* harmony import */ var _floating_ui_react_utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3940);
/* harmony import */ var _floating_ui_react_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(80120);
/* harmony import */ var _floating_ui_react_hooks_useSyncedFloatingRootContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(88648);
/* harmony import */ var _internals_useUnmountAfterClose_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(47563);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76175);
/* __next_internal_client_entry_do_not_use__ FOCUSABLE_POPUP_PROPS,createDefaultInitialFocus,usePopupRootStore,PopupHandleAttachment,useTriggerRegistration,createPopupOpenState,attachPreventUnmountOnClose,applyPopupOpenChange,useTriggerDataForwarding,useImplicitActiveTrigger,useOpenStateTransitions,usePopupInteractionProps,usePopupRootSync auto */ 












const FOCUSABLE_POPUP_PROPS = {
    tabIndex: -1,
    [_floating_ui_react_utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .FOCUSABLE_ATTRIBUTE */ .Ed]: ''
};
/**
 * Returns the default `initialFocus` resolver for a popup. When opened by touch it focuses the
 * popup element itself to prevent the virtual keyboard from opening (required for Android
 * specifically; iOS handles this automatically). Otherwise it falls back to the default behavior.
 */ function createDefaultInitialFocus(popupRef) {
    return (interactionType)=>interactionType === 'touch' ? popupRef.current : true;
}
/**
 * The subset of a popup handle that a Root needs to bind its store to. Both the real handle classes
 * and any test double satisfy it.
 */ /**
 * Creates and owns a popup store on behalf of a Root part. The store is created exactly once, with
 * controlled props and root state synced separately after creation. Sets up the synced floating
 * root context and returns the store.
 *
 * @param createStore Factory that builds the store. Called exactly once, receiving the floating id
 * and whether the popup is nested inside another floating element, both resolved on the first render.
 * @param treatPopupAsFloatingElement Whether the popup element is passed to Floating UI as the
 * floating element instead of the default positioner.
 */ function usePopupRootStore(createStore, treatPopupAsFloatingElement = false) {
    const floatingId = (0,_base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_3__/* .useId */ .B)();
    const nested = (0,_floating_ui_react_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useFloatingParentNodeId */ .R1)() != null;
    const store = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_5__/* .useRefWithInit */ .j)(()=>createStore(floatingId, nested)).current;
    (0,_floating_ui_react_hooks_useSyncedFloatingRootContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useSyncedFloatingRootContext */ .D)({
        popupStore: store,
        treatPopupAsFloatingElement,
        floatingRootContext: store.state.floatingRootContext,
        floatingId,
        nested,
        onOpenChange: store.setOpen
    });
    return store;
}
/**
 * Attaches a Root's store to a handle for this component's committed lifetime. Popup Roots render
 * it before their interactions and user children so its layout effect runs before descendant layout
 * effects. This lets descendants call the handle during the Root's initial commit without attaching
 * during render, which would leak suspended or abandoned stores. Store subscribers are notified by
 * `attachStore` in this ordinary layout phase, where React permits synchronous updates.
 *
 * Popup Roots must render this component only when a handle is present so handle-less Roots avoid
 * mounting an extra fiber and layout effect.
 */ function PopupHandleAttachment({ handle, store }) {
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        return handle.attachStore(store);
    }, [
        handle,
        store
    ]);
    return null;
}
function syncTriggerCount(store) {
    const triggerCount = store.context.triggerElements.size;
    if (store.select('open') && store.state.triggerCount !== triggerCount) {
        store.set('triggerCount', triggerCount);
    }
}
/**
 * Returns a stable callback ref that registers/unregisters the trigger element in the store.
 *
 * Stable so a downstream ref merger that retains the callback it was first given still reaches the
 * trigger's current store. The registration is tracked as a `(store, id, element)` triple, so
 * unregistering targets the store the element was actually registered in.
 *
 * Since the callback never changes, the caller must re-run it from a layout effect keyed on
 * `[store, id]` to migrate an already-registered element. That effect is also what registers the
 * element in the first place when `id` only resolves after the first commit (React 17's `useId`
 * fallback), because the register call made while the id is still `undefined` does nothing.
 *
 * @param id Id of the trigger.
 * @param store The Store instance where the trigger should be registered.
 */ function useTriggerRegistration(id, store) {
    const registrationRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    return (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_8__/* .useStableCallback */ .K)((element)=>{
        const registration = registrationRef.current;
        if (registration !== null) {
            if (registration.element === element && registration.store === store && registration.id === id) {
                // Already registered where it belongs, so the caller's migration effect is free on mount.
                return;
            }
            registrationRef.current = null;
            const registeredStore = registration.store;
            if (registeredStore.context.triggerElements.getById(registration.id) === registration.element) {
                registeredStore.context.triggerElements.delete(registration.id);
                syncTriggerCount(registeredStore);
            }
        }
        if (element !== null && id !== undefined) {
            registrationRef.current = {
                store,
                id,
                element
            };
            store.context.triggerElements.add(id, element);
            syncTriggerCount(store);
        }
    });
}
function createPopupOpenState(state, open, trigger, preventUnmountOnClose = false) {
    let preventUnmountingOnClose = state.preventUnmountingOnClose;
    if (open) {
        // Opening starts a new close cycle, so clear any previous request to keep the popup mounted.
        preventUnmountingOnClose = false;
    } else if (preventUnmountOnClose) {
        preventUnmountingOnClose = true;
    }
    const triggerId = trigger?.id ?? null;
    let activeTriggerId = state.activeTriggerId;
    let activeTriggerElement = state.activeTriggerElement;
    // If a popup is closing, the `trigger` may be undefined.
    // We want to keep the previous value so that exit animations are played and focus is returned correctly.
    if (triggerId || open) {
        activeTriggerId = triggerId;
        activeTriggerElement = trigger ?? null;
    }
    return {
        open,
        preventUnmountingOnClose,
        activeTriggerId,
        activeTriggerElement,
        // An open request without a trigger (a handle's `open(null)` or `openWithPayload()`) must not
        // be reassociated with a lone registered trigger later on. Controlled and default opens never
        // pass through here, so they keep claiming a lone trigger. A close request keeps the flag: a
        // controlled root may decline it and stay open, so the Root clears the flag only once the
        // popup is effectively closed.
        openedWithoutTrigger: open ? trigger == null : state.openedWithoutTrigger
    };
}
function attachPreventUnmountOnClose(eventDetails) {
    let preventUnmountOnClose = false;
    eventDetails.preventUnmountOnClose = ()=>{
        preventUnmountOnClose = true;
    };
    return ()=>preventUnmountOnClose;
}
/**
 * Runs the shared open-change sequence for a popup store: notifies `onOpenChange`,
 * honors cancellation, dispatches the floating root change, maps the reason to an
 * `instantType`, and commits the state update (synchronously for hover so
 * `getAnimations()` observes it). Stores supply their own differences via
 * `extraState` (e.g. the last change reason) and `onBeforeDispatch` (e.g. updating
 * inline-rect coordinates).
 */ function applyPopupOpenChange(store, nextOpen, eventDetails, options = {}) {
    const reason = eventDetails.reason;
    const isHover = reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .triggerHover */ .N7;
    const isFocusOpen = nextOpen && reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .triggerFocus */ .F4;
    const isDismissClose = !nextOpen && (reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .triggerPress */ .Ui || reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .escapeKey */ .jv);
    const shouldPreventUnmountOnClose = attachPreventUnmountOnClose(eventDetails);
    store.context.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
        return;
    }
    options.onBeforeDispatch?.();
    store.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
    const changeState = ()=>{
        const popupOpenState = createPopupOpenState(store.state, nextOpen, eventDetails.trigger, shouldPreventUnmountOnClose());
        const updatedState = {
            ...options.extraState,
            ...popupOpenState
        };
        if (isFocusOpen) {
            updatedState.instantType = 'focus';
        } else if (isDismissClose) {
            updatedState.instantType = 'dismiss';
        } else if (isHover) {
            updatedState.instantType = undefined;
        }
        store.update(updatedState);
    };
    if (isHover) {
        // Flush synchronously for hover so `node.getAnimations()` sees the new state.
        react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(changeState);
    } else {
        changeState();
    }
}
/**
 * Sets up trigger data forwarding to the store.
 *
 * @param triggerId Id of the trigger.
 * @param triggerElementRef Ref for the trigger DOM element.
 * @param store The Store instance managing the popup state.
 * @param stateUpdates An object with state updates to apply when the trigger is active.
 */ function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
    const isMountedByThisTrigger = store.useState('isMountedByTrigger', triggerId);
    const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
    // Applies trigger-owned state (active-trigger ownership and payload) when the trigger registers.
    // Stable so payload/`stateUpdates` changes do not change the ref identity (which would needlessly
    // churn registration); it reads the latest closure values when invoked.
    const applyTriggerData = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_8__/* .useStableCallback */ .K)((element)=>{
        const open = store.select('open');
        const activeTriggerId = store.select('activeTriggerId');
        if (activeTriggerId === triggerId) {
            const changes = {
                activeTriggerElement: element,
                ...open ? stateUpdates : null
            };
            store.update(changes);
            return;
        }
        if (activeTriggerId == null && open && !store.state.openedWithoutTrigger) {
            // If a popup is already open, a detached trigger can mount before any active trigger
            // has been established. Claim the first registered trigger so trigger-owned focus
            // management and ARIA relationships work. A popup opened deliberately without a trigger
            // stays unassociated so the trigger's `payload` does not replace the programmatic one.
            const changes = {
                activeTriggerId: triggerId ?? null,
                activeTriggerElement: element,
                ...stateUpdates
            };
            store.update(changes);
        }
    });
    // Stable, so the merged ref on the rendered element keeps its identity for the trigger's whole
    // lifetime.
    const registerTrigger = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_8__/* .useStableCallback */ .K)((element)=>{
        baseRegisterTrigger(element);
        if (element) {
            applyTriggerData(element);
        }
    });
    // A stable ref does not re-fire on a store or id change, so migrate here instead: unregister from
    // the previous store, then register the element the trigger still renders into the current one.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        registerTrigger(triggerElementRef.current);
        return ()=>registerTrigger(null);
    }, [
        registerTrigger,
        triggerElementRef,
        store,
        triggerId
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        if (isMountedByThisTrigger) {
            const changes = {
                activeTriggerElement: triggerElementRef.current,
                ...stateUpdates
            };
            store.update(changes);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isMountedByThisTrigger,
        store,
        triggerElementRef,
        ...Object.values(stateUpdates)
    ]);
    return {
        registerTrigger,
        isMountedByThisTrigger
    };
}
/**
 * Keeps trigger registration state synchronized while the popup is open.
 *
 * When a popup opens without an explicit trigger id and exactly one trigger is registered, that
 * trigger is claimed as the active trigger, unless the open request deliberately carried no trigger
 * (`openedWithoutTrigger`). When the active trigger id is still registered but its
 * element changed, the active element is refreshed. When the active trigger id is missing from the
 * registry but the same element is still registered under a different id (e.g. the rendered trigger
 * carries its own DOM `id` that differs from Base UI's internal trigger id), the active id is
 * reassociated to the registered id instead of being treated as lost. When the active trigger
 * unregisters, the default path preserves existing ownership so non-closing popup families do not
 * silently claim a different trigger while staying open.
 *
 * If `closeOnActiveTriggerUnmount` is enabled, unregistering a previously resolved active trigger
 * requests a close after a microtask so a same-tick replacement trigger with the same id can
 * register first. An active trigger id that has not matched a registered trigger yet is treated as
 * pending and does not request a close.
 *
 * This should be called on the Root part.
 *
 * @param store The Store instance managing the popup state.
 * @param options Options for active trigger unmount behavior.
 */ function useImplicitActiveTrigger(store, options = {}) {
    const { closeOnActiveTriggerUnmount = false } = options;
    // Distinguishes a trigger that unmounted from a new active trigger that has not hydrated yet.
    const resolvedActiveTriggerIdRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const open = store.useState('open');
    const reactiveTriggerCount = store.useState('triggerCount');
    // Subscribe to the active trigger id so the reconciliation below reruns when ownership moves to
    // another trigger while the popup stays open (e.g. a focus/hover handoff between triggers).
    const activeTriggerId = store.useState('activeTriggerId');
    // Subscribe to the active trigger element so the reconciliation reruns when a pending active
    // trigger registers in a commit where the trigger count nets out unchanged (registration
    // forwards the element to the store when the registering trigger matches the active id).
    // Without this, the id would never be marked resolved and a later genuine unmount would be
    // misclassified as pending, disabling `closeOnActiveTriggerUnmount`.
    const reactiveActiveTriggerElement = store.useState('activeTriggerElement');
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open) {
            resolvedActiveTriggerIdRef.current = null;
            if (store.state.triggerCount !== 0) {
                store.set('triggerCount', 0);
            }
            // The flag is cleared only here, once the popup is effectively closed: a controlled root may
            // decline a close request and stay open, and a controlled close never reaches
            // `createPopupOpenState` at all.
            if (store.state.openedWithoutTrigger) {
                store.set('openedWithoutTrigger', false);
            }
            return;
        }
        const triggerCount = store.context.triggerElements.size;
        const stateUpdates = {};
        if (store.state.triggerCount !== triggerCount) {
            stateUpdates.triggerCount = triggerCount;
        }
        const currentActiveTriggerId = store.select('activeTriggerId');
        let lostActiveTriggerId = null;
        if (currentActiveTriggerId) {
            const activeTriggerElement = store.context.triggerElements.getById(currentActiveTriggerId);
            if (!activeTriggerElement) {
                for (const [triggerId, triggerElement] of store.context.triggerElements.entries()){
                    if (triggerElement === store.state.activeTriggerElement) {
                        stateUpdates.activeTriggerId = triggerId;
                        stateUpdates.activeTriggerElement = triggerElement;
                        resolvedActiveTriggerIdRef.current = triggerId;
                        break;
                    }
                }
                if (stateUpdates.activeTriggerId === undefined) {
                    if (resolvedActiveTriggerIdRef.current === currentActiveTriggerId) {
                        lostActiveTriggerId = currentActiveTriggerId;
                    } else {
                        resolvedActiveTriggerIdRef.current = null;
                    }
                }
            } else {
                resolvedActiveTriggerIdRef.current = currentActiveTriggerId;
                if (activeTriggerElement !== store.state.activeTriggerElement) {
                    stateUpdates.activeTriggerElement = activeTriggerElement;
                }
            }
        } else {
            resolvedActiveTriggerIdRef.current = null;
        }
        if (!lostActiveTriggerId && !currentActiveTriggerId && !store.state.openedWithoutTrigger && triggerCount === 1) {
            const iteratorResult = store.context.triggerElements.entries().next();
            if (!iteratorResult.done) {
                const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
                stateUpdates.activeTriggerId = implicitTriggerId;
                stateUpdates.activeTriggerElement = implicitTriggerElement;
                resolvedActiveTriggerIdRef.current = implicitTriggerId;
            }
        }
        if (stateUpdates.triggerCount !== undefined || stateUpdates.activeTriggerId !== undefined || stateUpdates.activeTriggerElement !== undefined) {
            store.update(stateUpdates);
        }
        if (lostActiveTriggerId) {
            if (closeOnActiveTriggerUnmount) {
                // Defer so a same-tick replacement trigger with the same id can register first.
                queueMicrotask(()=>{
                    if (store.select('open') && store.select('activeTriggerId') === lostActiveTriggerId && !store.context.triggerElements.getById(lostActiveTriggerId)) {
                        const eventDetails = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_10__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_9__/* .none */ .dv);
                        store.setOpen(false, eventDetails);
                        // If closing is canceled, keep the previous active trigger ownership for the
                        // still-open popup instead of claiming another trigger implicitly.
                        if (!eventDetails.isCanceled) {
                            store.update({
                                activeTriggerId: null,
                                activeTriggerElement: null
                            });
                        }
                    }
                });
            }
        }
    }, [
        open,
        store,
        reactiveTriggerCount,
        activeTriggerId,
        reactiveActiveTriggerElement,
        closeOnActiveTriggerUnmount
    ]);
}
/**
 * Manages the mounted state of the popup.
 * Sets up the transition status listeners and handles unmounting when needed.
 * Updates the `mounted`, `transitionStatus`, and `preventUnmountingOnClose` states in the store.
 *
 * @param open Whether the popup is open.
 * @param store The Store instance managing the popup state.
 * @param onUnmount Optional callback to be called when the popup is unmounted.
 * @param animateInitialOpen Whether a popup that mounts already open should still play its enter
 *   transition. Defaults to `false`, so content that was open on the first render (a `defaultOpen`
 *   popup on page load, SSR'd markup) appears without animating. Opt in for popups whose subtree
 *   only mounts in response to something the user did, such as a submenu inside a menu popup.
 *
 * @returns A function to forcibly unmount the popup. It is a no-op once the popup is already
 *   unmounted, so calling it after the automatic unmount doesn't repeat the completion callback.
 */ function useOpenStateTransitions(open, store, onUnmount, animateInitialOpen) {
    const { mounted, transitionStatus, forceUnmount } = (0,_internals_useUnmountAfterClose_mjs__WEBPACK_IMPORTED_MODULE_11__/* .useUnmountAfterClose */ .Y)({
        open,
        ref: store.context.popupRef,
        preventUnmountOnClose: store.useState('preventUnmountingOnClose'),
        setPreventUnmountOnClose: (preventUnmountOnClose)=>store.set('preventUnmountingOnClose', preventUnmountOnClose),
        animateInitialOpen,
        onUnmount () {
            store.update({
                activeTriggerId: null,
                activeTriggerElement: null,
                mounted: false,
                preventUnmountingOnClose: false
            });
            onUnmount?.();
            store.context.onOpenChangeComplete?.(false);
        }
    });
    // Seed the Root-owned store before parts subscribe, matching the hook's initial mounted state.
    // Otherwise, an initially open Root looks like a reopen until the layout effect syncs the store.
    (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_5__/* .useRefWithInit */ .j)(()=>{
        store.set('mounted', mounted);
        return null;
    });
    store.useSyncedValues({
        mounted,
        transitionStatus
    });
    return {
        forceUnmount,
        transitionStatus
    };
}
function usePopupInteractionProps(store, statePart) {
    store.useSyncedValues(statePart);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>()=>{
            store.update({
                activeTriggerProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_12__/* .EMPTY_OBJECT */ .t0,
                inactiveTriggerProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_12__/* .EMPTY_OBJECT */ .t0,
                popupProps: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_12__/* .EMPTY_OBJECT */ .t0
            });
        }, [
        store
    ]);
}
function usePopupRootSync(store, open) {
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open && store.state.openMethod !== null) {
            store.set('openMethod', null);
        }
    }, [
        open,
        store
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>()=>{
            if (store.state.openMethod !== null) {
                store.set('openMethod', null);
            }
        }, [
        store
    ]);
}


/***/ }),

/***/ 26837:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BN: () => (/* binding */ shift),
/* harmony export */   ER: () => (/* binding */ limitShift),
/* harmony export */   Ej: () => (/* binding */ size),
/* harmony export */   UE: () => (/* binding */ arrow),
/* harmony export */   UU: () => (/* binding */ flip),
/* harmony export */   cY: () => (/* binding */ offset),
/* harmony export */   jD: () => (/* binding */ hide),
/* harmony export */   rD: () => (/* binding */ computePosition)
/* harmony export */ });
/* unused harmony exports autoPlacement, detectOverflow, inline */
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92681);



function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSideAxis */ .TV)(placement);
  const alignmentAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAlignmentAxis */ .Dz)(placement);
  const alignLength = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAxisLength */ .sq)(alignmentAxis);
  const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSide */ .C0)(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAlignment */ .Sg)(placement);
  if (alignment) {
    coords[alignmentAxis] += commonAlign * (alignment === 'end' ? 1 : -1) * (rtl && isVertical ? -1 : 1);
  }
  return coords;
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(options, state);
  const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getPaddingObject */ .nI)(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .rectToClientRect */ .B1)(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) && (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  };
  const elementClientRect = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .rectToClientRect */ .B1)(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

// Maximum number of resets that can occur before bailing to avoid infinite reset loops.
const MAX_RESET_COUNT = 50;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const platformWithDetectOverflow = platform.detectOverflow ? platform : {
    ...platform,
    detectOverflow
  };
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getPaddingObject */ .nI)(padding);
    const coords = {
      x,
      y
    };
    const axis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAlignmentAxis */ .Dz)(placement);
    const length = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAxisLength */ .sq)(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .min */ .jk)(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .min */ .jk)(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .clamp */ .qE)(minPadding, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAlignment */ .Sg)(placement) != null && center !== offset && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'autoPlacement',
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== undefined || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }

      // Make `computeCoords` start from the right place.
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];

      // There are more placements to check.
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map(d => {
        const alignment = getAlignment(d.placement);
        return [d.placement, alignment && crossAxis ?
        // Check along the mainAxis and main crossAxis side.
        d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
        // Check only the mainAxis.
        d.overflows[0], d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
      // Aligned placements should not check their opposite crossAxis
      // side.
      getAlignment(d[0]) ? 2 : 3).every(v => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSide */ .C0)(placement);
      const initialSideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSideAxis */ .TV)(initialPlacement);
      const isBasePlacement = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSide */ .C0)(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getOppositePlacement */ .bV)(initialPlacement)] : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getExpandedPlacements */ .WJ)(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getOppositeAxisPlacements */ .lP)(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAlignmentSides */ .w7)(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSideAxis */ .TV)(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow ||
          // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every(d => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSideAxis */ .TV)(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSideAxis */ .TV)(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .sides */ .r_.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects,
        platform
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

function getBoundingRect(rects) {
  const minX = min(...rects.map(rect => rect.left));
  const minY = min(...rects.map(rect => rect.top));
  const maxX = max(...rects.map(rect => rect.right));
  const maxY = max(...rects.map(rect => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
}
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'inline',
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform,
        strategy
      } = state;
      // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
      // ClientRect's bounds, despite the event listener being triggered. A
      // padding of 2 seems to handle this issue.
      const {
        padding = 2,
        x,
        y
      } = evaluate(options, state);
      const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);

      // No rects (e.g. a hidden or detached reference, or a collapsed range) —
      // keep the existing reference rect rather than resetting to an invalid
      // one with non-finite values.
      if (!nativeClientRects.length) {
        return {};
      }
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect() {
        // There are two rects and they are disjoined.
        if (clientRects.length === 2 && (clientRects[0].left > clientRects[1].right || clientRects[1].left > clientRects[0].right) && x != null && y != null) {
          // Find the first rect in which the point is fully inside.
          return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }

        // There are 2 or more connected rects.
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === 'y') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === 'top';
            const top = firstRect.top;
            const bottom = lastRect.bottom;
            const left = isTop ? firstRect.left : lastRect.left;
            const right = isTop ? firstRect.right : lastRect.right;
            return rectToClientRect({
              x: left,
              y: top,
              width: right - left,
              height: bottom - top
            });
          }
          const isLeftSide = getSide(placement) === 'left';
          const maxRight = max(...clientRects.map(rect => rect.right));
          const minLeft = min(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          return rectToClientRect({
            x: minLeft,
            y: top,
            width: maxRight - minLeft,
            height: bottom - top
          });
        }
        return fallback;
      }
      const resetRects = await platform.getElementRects({
        reference: {
          getBoundingClientRect
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};

const originSides = /*#__PURE__*/new Set(['left', 'top']);

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSide */ .C0)(placement);
  const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAlignment */ .Sg)(placement);
  const isVertical = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSideAxis */ .TV)(placement) === 'y';
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const crossAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSideAxis */ .TV)(placement);
      const mainAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getOppositeAxis */ .PG)(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const clampCoord = (axis, coord) => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .clamp */ .qE)(coord + overflow[axis === 'y' ? 'top' : 'left'], coord, coord - overflow[axis === 'y' ? 'bottom' : 'right']);
      if (checkMainAxis) {
        mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
      }
      if (checkCrossAxis) {
        crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      var _rawOffset$mainAxis, _rawOffset$crossAxis;
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSideAxis */ .TV)(placement);
      const mainAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getOppositeAxis */ .PG)(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(offset, state);
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
        crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
      };
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = originSides.has((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSide */ .C0)(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

// Method syntax keeps callback parameters bivariant, but expressing the
// explicit `| undefined` required by `exactOptionalPropertyTypes` needs
// property syntax, which is contravariant under `strictFunctionTypes`.
// Extracting the function from a method position restores that bivariance so
// consumers can still assign callbacks with narrower parameter types.

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(options, state);
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSide */ .C0)(placement);
      const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAlignment */ .Sg)(placement);
      const isYAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getSideAxis */ .TV)(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .min */ .jk)(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .min */ .jk)(width - overflow[widthSide], maximumClippingWidth);
      const shiftData = state.middlewareData.shift;
      const noShift = !shiftData;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (shiftData != null && shiftData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if (shiftData != null && shiftData.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        if (isYAxis) {
          availableWidth = width - 2 * (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .max */ .T9)(overflow.left, overflow.right);
        } else {
          availableHeight = height - 2 * (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .max */ .T9)(overflow.top, overflow.bottom);
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};




/***/ }),

/***/ 26863:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ arrow)
/* harmony export */ });
/* unused harmony export baseArrow */
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92681);

/**
 * Fork of the original `arrow` middleware from Floating UI that always uses the floating element
 * as the arrow's offset parent.
 */
const baseArrow = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .evaluate */ ._3)(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getPaddingObject */ .nI)(padding);
    const coords = {
      x,
      y
    };
    const axis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAlignmentAxis */ .Dz)(placement);
    const length = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAxisLength */ .sq)(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const clientSize = elements.floating[clientProp] || rects.floating[length];
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = Math.min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = Math.min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .clamp */ .qE)(min, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__/* .getAlignment */ .Sg)(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    // eslint-disable-next-line no-nested-ternary
    const alignmentOffset = shouldAddOffset ? center < min ? center - min : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = (options, deps) => {
  const {
    name,
    fn
  } = baseArrow(options);
  return {
    name,
    fn,
    options: [options, deps]
  };
};

/***/ }),

/***/ 27243:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G1: () => (/* binding */ fastComponent),
/* harmony export */   iE: () => (/* binding */ getInstance),
/* harmony export */   kz: () => (/* binding */ register),
/* harmony export */   nk: () => (/* binding */ fastComponentRef)
/* harmony export */ });
/* unused harmony export setInstance */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14187);


const hooks = [];
let currentInstance = undefined;
function getInstance() {
  return currentInstance;
}
function setInstance(instance) {
  currentInstance = instance;
}
function register(hook) {
  hooks.push(hook);
}

/**
 * Wraps a component function to enable performance optimizations for internal hooks.
 *
 * **Performance Optimization:**
 * Components wrapped with `fastComponent` have access to a shared "instance" context that enables
 * specialized hook implementations to batch operations and reduce overhead. The wrapper creates a
 * stable instance object that persists across renders, sets it as the current context, calls
 * registered hooks before and after rendering, then clears the context. The primary benefit is
 * with `useStore`, where multiple store subscriptions within the same component are collapsed into
 * a single `useSyncExternalStore` subscription per store, significantly reducing re-render overhead.
 * This optimization is only active on React 19+; on earlier versions `useStore` falls back to a
 * separate subscription per call.
 *
 * **Requirements:**
 * - The component function should follow standard React component patterns
 * - `useStore` calls must keep a stable order and count across renders, as batched hooks are
 *   matched by call index
 * - Do not rely on the instance context outside of specialized hooks
 *
 * @param fn - The component function to wrap
 * @returns A wrapped component with the same signature as the input function
 *
 * @example
 * ```tsx
 * // Wrapping a component to enable optimized useStore batching
 * export const TooltipRoot = fastComponent(function TooltipRoot(props) {
 *   // These useStore calls share a single subscription
 *   const open = useStore(store, (state) => state.open);
 *   const disabled = useStore(store, (state) => state.disabled);
 *   const value = useStore(store, (state) => state.value);
 *   // ...
 * });
 * ```
 */
function fastComponent(fn) {
  const FastComponent = (props, forwardedRef) => {
    const instance = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useRefWithInit */ .j)(createInstance).current;
    let result;
    try {
      currentInstance = instance;
      for (const hook of hooks) {
        hook.before(instance);
      }
      result = fn(props, forwardedRef);
      for (const hook of hooks) {
        hook.after(instance);
      }
      instance.didInitialize = true;
    } finally {
      currentInstance = undefined;
    }
    return result;
  };
  FastComponent.displayName = fn.displayName || fn.name;
  return FastComponent;
}

/**
 * Wraps a component function with ref forwarding to enable performance optimizations for internal hooks.
 *
 * This is a convenience wrapper that combines `fastComponent` with `React.forwardRef`, enabling
 * both performance optimizations and proper ref forwarding. See `fastComponent` for details on
 * the performance benefits.
 *
 * @param fn - The component function that accepts props and a forwarded ref
 * @returns A wrapped component with ref forwarding enabled
 *
 * @example
 * ```tsx
 * // Wrapping a component with ref forwarding and optimized hooks
 * export const TooltipTrigger = fastComponentRef(function TooltipTrigger(
 *   props,
 *   forwardedRef
 * ) {
 *   const store = useContext(TooltipContext);
 *   const open = useStore(store, (state) => state.open);
 *   // ... component logic with ref
 *   return <button ref={forwardedRef} {...props} />;
 * });
 * ```
 */
function fastComponentRef(fn) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(fastComponent(fn));
}
function createInstance() {
  return {
    didInitialize: false
  };
}

/***/ }),

/***/ 30271:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var use_sync_external_store_shim__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8039);
/* harmony import */ var use_sync_external_store_shim_with_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(94577);
/* harmony import */ var _reactVersion_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39034);
/* harmony import */ var _fastHooks_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27243);

/* We need to import the shim because React 17 does not support the `useSyncExternalStore` API.
 * More info: https://github.com/mui/mui-x/issues/18303#issuecomment-2958392341 */




/* Some tests fail in R18 with the raw useSyncExternalStore. It may be possible to make it work
 * but for now we only enable it for R19+. */
const canUseRawUseSyncExternalStore = (0,_reactVersion_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isReactVersionAtLeast */ ._)(19);
const useStoreImplementation = canUseRawUseSyncExternalStore ? useStoreFast : useStoreLegacy;
function useStore(store, selector, a1, a2, a3) {
  return useStoreImplementation(store, selector, a1, a2, a3);
}
function useStoreR19(store, selector, a1, a2, a3) {
  const getSelection = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => selector(store.getSnapshot(), a1, a2, a3), [store, selector, a1, a2, a3]);
  return (0,use_sync_external_store_shim__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore)(store.subscribe, getSelection, getSelection);
}
(0,_fastHooks_mjs__WEBPACK_IMPORTED_MODULE_4__/* .register */ .kz)({
  before(instance) {
    instance.syncIndex = 0;
    if (!instance.didInitialize) {
      instance.syncTick = 1;
      instance.syncHooks = [];
      instance.didChangeStore = true;
      instance.getSnapshot = () => {
        let didChange = false;
        for (let i = 0; i < instance.syncHooks.length; i += 1) {
          const hook = instance.syncHooks[i];
          const value = hook.selector(hook.store.state, hook.a1, hook.a2, hook.a3);
          if (!Object.is(hook.value, value)) {
            didChange = true;
            hook.value = value;
          }
        }
        if (didChange) {
          instance.syncTick += 1;
        }
        return instance.syncTick;
      };
    }
  },
  after(instance) {
    if (instance.syncHooks.length > 0) {
      if (instance.didChangeStore) {
        instance.didChangeStore = false;
        instance.subscribe = onStoreChange => {
          const stores = new Set();
          for (const hook of instance.syncHooks) {
            stores.add(hook.store);
          }
          const unsubscribes = [];
          for (const store of stores) {
            unsubscribes.push(store.subscribe(onStoreChange));
          }
          return () => {
            for (const unsubscribe of unsubscribes) {
              unsubscribe();
            }
          };
        };
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      (0,use_sync_external_store_shim__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore)(instance.subscribe, instance.getSnapshot, instance.getSnapshot);
    }
  }
});
function useStoreFast(store, selector, a1, a2, a3) {
  const instance = (0,_fastHooks_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getInstance */ .iE)();
  if (!instance) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useStoreR19(store, selector, a1, a2, a3);
  }
  const index = instance.syncIndex;
  instance.syncIndex += 1;
  let hook;
  if (!instance.didInitialize) {
    hook = {
      store,
      selector,
      a1,
      a2,
      a3,
      value: selector(store.getSnapshot(), a1, a2, a3)
    };
    instance.syncHooks.push(hook);
  } else {
    hook = instance.syncHooks[index];
    if (hook.store !== store || hook.selector !== selector || !Object.is(hook.a1, a1) || !Object.is(hook.a2, a2) || !Object.is(hook.a3, a3)) {
      if (hook.store !== store) {
        instance.didChangeStore = true;
      }
      hook.store = store;
      hook.selector = selector;
      hook.a1 = a1;
      hook.a2 = a2;
      hook.a3 = a3;
      hook.value = selector(store.getSnapshot(), a1, a2, a3);
    }
  }
  return hook.value;
}
function useStoreLegacy(store, selector, a1, a2, a3) {
  return (0,use_sync_external_store_shim_with_selector__WEBPACK_IMPORTED_MODULE_2__.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, state => selector(state, a1, a2, a3));
}

/***/ }),

/***/ 31814:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ useScrollLock)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);
/* harmony import */ var _addEventListener_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14718);
/* harmony import */ var _platform_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15495);
/* harmony import */ var _platform_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(97827);
/* harmony import */ var _owner_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81456);
/* harmony import */ var _useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66652);
/* harmony import */ var _useTimeout_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64951);
/* harmony import */ var _useAnimationFrame_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18813);
/* __next_internal_client_entry_do_not_use__ useScrollLock auto */ 






let originalHtmlStyles = {};
let originalBodyStyles = {};
let originalHtmlScrollBehavior = '';
// The viewport's overflow comes from <html> when it establishes its own scroll container, and
// propagates from <body> otherwise. An `overflow` style on the other element doesn't lock the page.
function getViewportScroller(html, body) {
    return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isOverflowElement */ .ZU)(html) ? html : body;
}
function isPageScrollLocked(win, html, body) {
    return /hidden|clip/.test(win.getComputedStyle(getViewportScroller(html, body)).overflowY);
}
function hasInsetScrollbars(referenceElement) {
    if (typeof document === 'undefined') {
        return false;
    }
    const doc = (0,_owner_mjs__WEBPACK_IMPORTED_MODULE_1__/* .ownerDocument */ .R)(referenceElement);
    const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(doc);
    return win.innerWidth - doc.documentElement.clientWidth > 0;
}
function supportsStableScrollbarGutter(referenceElement) {
    const supported = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('scrollbar-gutter', 'stable');
    if (!supported || typeof document === 'undefined') {
        return false;
    }
    const doc = (0,_owner_mjs__WEBPACK_IMPORTED_MODULE_1__/* .ownerDocument */ .R)(referenceElement);
    const html = doc.documentElement;
    const body = doc.body;
    const scrollContainer = getViewportScroller(html, body);
    const originalScrollContainerOverflowY = scrollContainer.style.overflowY;
    const originalHtmlStyleGutter = html.style.scrollbarGutter;
    html.style.scrollbarGutter = 'stable';
    scrollContainer.style.overflowY = 'scroll';
    const before = scrollContainer.offsetWidth;
    scrollContainer.style.overflowY = 'hidden';
    const after = scrollContainer.offsetWidth;
    scrollContainer.style.overflowY = originalScrollContainerOverflowY;
    html.style.scrollbarGutter = originalHtmlStyleGutter;
    return before === after;
}
function preventScrollOverlayScrollbars(referenceElement) {
    const doc = (0,_owner_mjs__WEBPACK_IMPORTED_MODULE_1__/* .ownerDocument */ .R)(referenceElement);
    const html = doc.documentElement;
    const body = doc.body;
    // If an `overflow` style is present on <html>, we need to lock it, because a lock on <body>
    // won't have any effect.
    // But if <body> has an `overflow` style (like `overflow-x: hidden`), we need to lock it
    // instead, as sticky elements shift otherwise.
    const elementToLock = getViewportScroller(html, body);
    const originalElementToLockStyles = {
        overflowY: elementToLock.style.overflowY,
        overflowX: elementToLock.style.overflowX
    };
    Object.assign(elementToLock.style, {
        overflowY: 'hidden',
        overflowX: 'hidden'
    });
    return ()=>{
        Object.assign(elementToLock.style, originalElementToLockStyles);
    };
}
function preventScrollInsetScrollbars(referenceElement) {
    const doc = (0,_owner_mjs__WEBPACK_IMPORTED_MODULE_1__/* .ownerDocument */ .R)(referenceElement);
    const html = doc.documentElement;
    const body = doc.body;
    const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(html);
    let scrollTop = 0;
    let scrollLeft = 0;
    let updateGutterOnly = false;
    const resizeFrame = _useAnimationFrame_mjs__WEBPACK_IMPORTED_MODULE_2__/* .AnimationFrame */ .KP.create();
    // Pinch-zoom in Safari causes a shift. Just don't lock scroll if there's any pinch-zoom.
    if (_platform_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .webkit */ .Fp && (win.visualViewport?.scale ?? 1) !== 1) {
        return ()=>{};
    }
    function lockScroll() {
        /* DOM reads: */ const htmlStyles = win.getComputedStyle(html);
        const bodyStyles = win.getComputedStyle(body);
        const htmlScrollbarGutterValue = htmlStyles.scrollbarGutter || '';
        const hasBothEdges = htmlScrollbarGutterValue.includes('both-edges');
        const scrollbarGutterValue = hasBothEdges ? 'stable both-edges' : 'stable';
        scrollTop = html.scrollTop;
        scrollLeft = html.scrollLeft;
        originalHtmlStyles = {
            scrollbarGutter: html.style.scrollbarGutter,
            overflowY: html.style.overflowY,
            overflowX: html.style.overflowX
        };
        originalHtmlScrollBehavior = html.style.scrollBehavior;
        originalBodyStyles = {
            position: body.style.position,
            height: body.style.height,
            width: body.style.width,
            boxSizing: body.style.boxSizing,
            overflowY: body.style.overflowY,
            overflowX: body.style.overflowX,
            scrollBehavior: body.style.scrollBehavior
        };
        const isScrollableY = html.scrollHeight > html.clientHeight;
        const isScrollableX = html.scrollWidth > html.clientWidth;
        const hasConstantOverflowY = htmlStyles.overflowY === 'scroll' || bodyStyles.overflowY === 'scroll';
        const hasConstantOverflowX = htmlStyles.overflowX === 'scroll' || bodyStyles.overflowX === 'scroll';
        // Values can be negative in Firefox
        const scrollbarWidth = Math.max(0, win.innerWidth - body.clientWidth);
        const scrollbarHeight = Math.max(0, win.innerHeight - body.clientHeight);
        // Avoid shift due to the default <body> margin. This does cause elements to be clipped
        // with whitespace. Warn if <body> has margins?
        const marginY = parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom);
        const marginX = parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight);
        const elementToLock = getViewportScroller(html, body);
        updateGutterOnly = supportsStableScrollbarGutter(referenceElement);
        /*
     * DOM writes:
     * Do not read the DOM past this point!
     */ if (updateGutterOnly) {
            html.style.scrollbarGutter = scrollbarGutterValue;
            elementToLock.style.overflowY = 'hidden';
            elementToLock.style.overflowX = 'hidden';
            return;
        }
        Object.assign(html.style, {
            scrollbarGutter: scrollbarGutterValue,
            overflowY: 'hidden',
            overflowX: 'hidden'
        });
        if (isScrollableY || hasConstantOverflowY) {
            html.style.overflowY = 'scroll';
        }
        if (isScrollableX || hasConstantOverflowX) {
            html.style.overflowX = 'scroll';
        }
        Object.assign(body.style, {
            position: 'relative',
            height: marginY || scrollbarHeight ? `calc(100dvh - ${marginY + scrollbarHeight}px)` : '100dvh',
            width: marginX || scrollbarWidth ? `calc(100vw - ${marginX + scrollbarWidth}px)` : '100vw',
            boxSizing: 'border-box',
            // Assign the longhands that `cleanup` restores, so nothing is left behind.
            overflowY: 'hidden',
            overflowX: 'hidden',
            scrollBehavior: 'unset'
        });
        body.scrollTop = scrollTop;
        body.scrollLeft = scrollLeft;
        html.setAttribute('data-base-ui-scroll-locked', '');
        html.style.scrollBehavior = 'unset';
    }
    function cleanup() {
        Object.assign(html.style, originalHtmlStyles);
        Object.assign(body.style, originalBodyStyles);
        if (!updateGutterOnly) {
            html.scrollTop = scrollTop;
            html.scrollLeft = scrollLeft;
            html.removeAttribute('data-base-ui-scroll-locked');
            html.style.scrollBehavior = originalHtmlScrollBehavior;
        }
    }
    function handleResize() {
        cleanup();
        resizeFrame.request(lockScroll);
    }
    lockScroll();
    const unsubscribeResize = (0,_addEventListener_mjs__WEBPACK_IMPORTED_MODULE_4__/* .addEventListener */ .q)(win, 'resize', handleResize);
    return ()=>{
        resizeFrame.cancel();
        cleanup();
        // Sometimes this cleanup can run after test teardown because it is called
        // in a `setTimeout(fn, 0)`. Guard the returned cleanup to avoid calling
        // `removeEventListener` when it is no longer available in tests.
        if (typeof win.removeEventListener === 'function') {
            unsubscribeResize();
        }
    };
}
class ScrollLocker {
    acquire(referenceElement) {
        this.lockCount += 1;
        if (this.lockCount === 1 && this.restore === null) {
            this.timeoutLock.start(0, ()=>this.lock(referenceElement));
        }
        return this.release;
    }
    lock(referenceElement) {
        if (this.lockCount === 0 || this.restore !== null) {
            return;
        }
        const doc = (0,_owner_mjs__WEBPACK_IMPORTED_MODULE_1__/* .ownerDocument */ .R)(referenceElement);
        const html = doc.documentElement;
        const body = doc.body;
        const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(html);
        // The page is already locked, either by the site author or by a non-Base UI overlay that
        // hasn't cleaned up yet. Leave it alone and wait for the lock to clear before taking over,
        // otherwise we'd snapshot the locked state and restore it after our own lock is released.
        if (isPageScrollLocked(win, html, body)) {
            const observer = new win.MutationObserver(()=>{
                if (isPageScrollLocked(win, html, body)) {
                    return;
                }
                observer.disconnect();
                this.restore = null;
                this.lock(referenceElement);
            });
            // Watch every attribute: locks are applied through inline styles, classes, or attributes
            // paired with a stylesheet (`data-scroll-locked` in react-remove-scroll, for example).
            const options = {
                attributes: true
            };
            observer.observe(html, options);
            observer.observe(body, options);
            this.restore = ()=>observer.disconnect();
            return;
        }
        const hasOverlayScrollbars = _platform_index_mjs__WEBPACK_IMPORTED_MODULE_5__/* .ios */ .s4 || !hasInsetScrollbars(referenceElement);
        // On iOS, scroll locking does not work if the navbar is collapsed. Due to numerous
        // side effects and bugs that arise on iOS, it must be researched extensively before
        // being enabled to ensure it doesn't cause the following issues:
        // - Textboxes must scroll into view when focused, nor cause a glitchy scroll animation.
        // - The navbar must not force itself into view and cause layout shift.
        // - Scroll containers must not flicker upon closing a popup when it has an exit animation.
        this.restore = hasOverlayScrollbars ? preventScrollOverlayScrollbars(referenceElement) : preventScrollInsetScrollbars(referenceElement);
    }
    constructor(){
        this.lockCount = 0;
        this.restore = null;
        this.timeoutLock = _useTimeout_mjs__WEBPACK_IMPORTED_MODULE_6__/* .Timeout */ .E.create();
        this.timeoutUnlock = _useTimeout_mjs__WEBPACK_IMPORTED_MODULE_6__/* .Timeout */ .E.create();
        this.release = ()=>{
            this.lockCount -= 1;
            if (this.lockCount === 0 && this.restore) {
                this.timeoutUnlock.start(0, this.unlock);
            }
        };
        this.unlock = ()=>{
            if (this.lockCount === 0 && this.restore) {
                this.restore?.();
                this.restore = null;
            }
        };
    }
}
const SCROLL_LOCKER = new ScrollLocker();
/**
 * Locks the scroll of the document when enabled.
 *
 * @param enabled - Whether to enable the scroll lock.
 * @param referenceElement - Element to use as a reference for lock calculations.
 */ function useScrollLock(enabled = true, referenceElement = null) {
    (0,_useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!enabled) {
            return undefined;
        }
        return SCROLL_LOCKER.acquire(referenceElement);
    }, [
        enabled,
        referenceElement
    ]);
}


/***/ }),

/***/ 34934:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CK: () => (/* binding */ useFloatingPortalNode),
/* harmony export */   XF: () => (/* binding */ FloatingPortal),
/* harmony export */   vB: () => (/* binding */ usePortalContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47650);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(14718);
/* harmony import */ var _base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(12046);
/* harmony import */ var _base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(47247);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8994);
/* harmony import */ var _utils_FocusGuard_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6522);
/* harmony import */ var _utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(99226);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(76175);
/* harmony import */ var _utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(74831);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(88401);
/* harmony import */ var _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(69679);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ usePortalContext,useFloatingPortalNode,FloatingPortal auto */ 
















const PortalContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (false) {}
const usePortalContext = ()=>react__WEBPACK_IMPORTED_MODULE_0__.useContext(PortalContext);
const attr = (0,_utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_3__/* .createAttribute */ .F)('portal');
function useFloatingPortalNode(props = {}) {
    const { ref, container: containerProp, componentProps = _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_4__/* .EMPTY_OBJECT */ .t0, elementProps } = props;
    const uniqueId = (0,_base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_5__/* .useId */ .B)();
    const portalContext = usePortalContext();
    const parentPortalNode = portalContext?.portalNode;
    const [containerElement, setContainerElement] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [portalNode, setPortalNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const setPortalNodeRef = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)((node)=>{
        if (node !== null) {
            // the useIsoLayoutEffect below watching containerProp / parentPortalNode
            // sets setPortalNode(null) when the container becomes null or changes.
            // So even though the ref callback now ignores null, the portal node still gets cleared.
            setPortalNode(node);
        }
    });
    const containerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        // Wait for the container to be resolved if explicitly `null`.
        if (containerProp === null) {
            if (containerRef.current) {
                containerRef.current = null;
                setPortalNode(null);
                setContainerElement(null);
            }
            return;
        }
        const resolvedContainer = (containerProp && ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_8__/* .isNode */ .Ll)(containerProp) ? containerProp : containerProp.current)) ?? parentPortalNode ?? document.body;
        if (resolvedContainer == null) {
            if (containerRef.current) {
                containerRef.current = null;
                setPortalNode(null);
                setContainerElement(null);
            }
            return;
        }
        if (containerRef.current !== resolvedContainer) {
            containerRef.current = resolvedContainer;
            setPortalNode(null);
            setContainerElement(resolvedContainer);
        }
    }, [
        containerProp,
        parentPortalNode
    ]);
    const portalElement = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_9__/* .useRenderElement */ .o)('div', componentProps, {
        ref: [
            ref,
            setPortalNodeRef
        ],
        props: [
            {
                id: uniqueId,
                [attr]: ''
            },
            elementProps
        ]
    });
    // This `createPortal` call injects `portalElement` into the `container`.
    // Another call inside `FloatingPortal`/`FloatingPortalLite` then injects the children into `portalElement`.
    const portalSubtree = containerElement && portalElement ? /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(portalElement, containerElement) : null;
    return {
        node: portalNode,
        // `id` and `render` props can override or remove the generated ID. Use the exact
        // rendered value so `aria-owns` never points at an ID absent from the DOM.
        nodeId: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(portalElement) ? portalElement.props.id : undefined,
        subtree: portalSubtree
    };
}
/**
 * Portals the floating element into a given container element — by default,
 * outside of the app root and into the body.
 * This is necessary to ensure the floating element can appear outside any
 * potential parent containers that cause clipping (such as `overflow: hidden`),
 * while retaining its location in the React tree.
 * @see https://floating-ui.com/docs/FloatingPortal
 * @internal
 */ const FloatingPortal = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function FloatingPortal(componentProps, forwardedRef) {
    const { render, className, style, children, container, portalOwnerRole, ...elementProps } = componentProps;
    const { node: portalNode, nodeId: portalNodeId, subtree: portalSubtree } = useFloatingPortalNode({
        container,
        ref: forwardedRef,
        componentProps,
        elementProps
    });
    const beforeOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const afterOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const beforeInsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const afterInsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const [focusManagerState, setFocusManagerState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const focusInsideDisabledRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const modal = focusManagerState?.modal;
    const open = focusManagerState?.open;
    const shouldRenderGuards = !!focusManagerState && !focusManagerState.modal && focusManagerState.open && !!portalNode;
    // https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/TabbablePortal.tsx
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!portalNode || modal) {
            return undefined;
        }
        // Make sure elements inside the portal element are tabbable only when the
        // portal has already been focused, either by tabbing into a focus trap
        // element outside or using the mouse.
        function onFocus(event) {
            if (portalNode && event.relatedTarget && (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isOutsideEvent */ .Qp)(event)) {
                if (event.type === 'focusin') {
                    if (focusInsideDisabledRef.current) {
                        (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_10__/* .enableFocusInside */ .yV)(portalNode);
                        focusInsideDisabledRef.current = false;
                    }
                } else {
                    (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_10__/* .disableFocusInside */ .N)(portalNode);
                    focusInsideDisabledRef.current = true;
                }
            }
        }
        // Listen to the event on the capture phase so they run before the focus
        // trap elements onFocus prop is called.
        return (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_11__/* .mergeCleanups */ .g)((0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_12__/* .addEventListener */ .q)(portalNode, 'focusin', onFocus, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_12__/* .addEventListener */ .q)(portalNode, 'focusout', onFocus, true));
    }, [
        portalNode,
        modal
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!portalNode || open !== true || !focusInsideDisabledRef.current) {
            return;
        }
        // Restore tabbability before the focus manager's queued focus-on-open step runs.
        (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_10__/* .enableFocusInside */ .yV)(portalNode);
        focusInsideDisabledRef.current = false;
    }, [
        open,
        portalNode
    ]);
    const portalContextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            beforeOutsideRef,
            afterOutsideRef,
            beforeInsideRef,
            afterInsideRef,
            portalNode,
            setFocusManagerState
        }), [
        portalNode
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            portalSubtree,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(PortalContext.Provider, {
                value: portalContextValue,
                children: [
                    shouldRenderGuards && portalNode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_utils_FocusGuard_mjs__WEBPACK_IMPORTED_MODULE_13__/* .FocusGuard */ .U, {
                        "data-type": "outside",
                        ref: beforeOutsideRef,
                        onFocus: (event)=>{
                            if ((0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isOutsideEvent */ .Qp)(event, portalNode)) {
                                beforeInsideRef.current?.focus();
                            } else {
                                const domReference = focusManagerState ? focusManagerState.domReference : null;
                                const prevTabbable = (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getPreviousTabbable */ .XJ)(domReference);
                                prevTabbable?.focus();
                            }
                        }
                    }),
                    shouldRenderGuards && portalNode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                        role: portalOwnerRole,
                        "aria-owns": portalNodeId,
                        style: _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_14__/* .ownerVisuallyHidden */ .z_
                    }),
                    portalNode && /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(children, portalNode),
                    shouldRenderGuards && portalNode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_utils_FocusGuard_mjs__WEBPACK_IMPORTED_MODULE_13__/* .FocusGuard */ .U, {
                        "data-type": "outside",
                        ref: afterOutsideRef,
                        onFocus: (event)=>{
                            if ((0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isOutsideEvent */ .Qp)(event, portalNode)) {
                                afterInsideRef.current?.focus();
                            } else {
                                const domReference = focusManagerState ? focusManagerState.domReference : null;
                                const nextTabbable = (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getNextTabbable */ .vF)(domReference);
                                nextTabbable?.focus();
                                if (focusManagerState?.closeOnFocusOut) {
                                    focusManagerState?.onOpenChange(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_15__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_16__/* .focusOut */ .Xn, event.nativeEvent));
                                }
                            }
                        }
                    })
                ]
            })
        ]
    });
});
if (false) {}


/***/ }),

/***/ 36050:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ getDisabledMountTransitionStyles)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8994);
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69679);


function getDisabledMountTransitionStyles(transitionStatus) {
  return transitionStatus === 'starting' ? _constants_mjs__WEBPACK_IMPORTED_MODULE_0__/* .DISABLED_TRANSITIONS_STYLE */ .K2 : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0;
}

/***/ }),

/***/ 39196:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ triggerDisabled)
/* harmony export */ });
/* unused harmony export popupOpen */
/* harmony import */ var _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86211);


/**
 * Present when the corresponding tooltip is open.
 */
const popupOpen = _utils_popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__/* .popupOpen */ .L;
/**
 * Present when the trigger is disabled, either by the `disabled` prop or by a parent `<Tooltip.Root>` component.
 */
const triggerDisabled = 'data-trigger-disabled';

/***/ }),

/***/ 43479:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BN: () => (/* binding */ shift),
/* harmony export */   ER: () => (/* binding */ limitShift),
/* harmony export */   Ej: () => (/* binding */ size),
/* harmony export */   UE: () => (/* binding */ arrow),
/* harmony export */   UU: () => (/* binding */ flip),
/* harmony export */   cY: () => (/* binding */ offset),
/* harmony export */   iD: () => (/* binding */ platform),
/* harmony export */   jD: () => (/* binding */ hide),
/* harmony export */   ll: () => (/* binding */ autoUpdate),
/* harmony export */   rD: () => (/* binding */ computePosition)
/* harmony export */ });
/* unused harmony exports autoPlacement, detectOverflow, inline */
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92681);
/* harmony import */ var _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26837);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);





function getCssDimensions(element) {
  const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .round */ .LI)(width) !== offsetWidth || (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .round */ .LI)(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(domElement)) {
    return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .createCoords */ .Jx)(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .round */ .LI)(rect.width) : rect.width) / width;
  let y = ($ ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .round */ .LI)(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .createCoords */ .Jx)(0);
function getVisualOffsets(element) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isWebKit */ .Tc)() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  return !!floatingOffsetParent && isFixed && floatingOffsetParent === (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(element);
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .createCoords */ .Jx)(1);
  if (includeScale) {
    if (offsetParent) {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .createCoords */ .Jx)(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement && offsetParent) {
    const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(domElement);
    const offsetWin = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(offsetParent) ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getFrameElement */ ._m)(currentWin);
    while (currentIFrame && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(currentIFrame);
      currentIFrame = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getFrameElement */ ._m)(currentWin);
    }
  }
  return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .rectToClientRect */ .B1)({
    width,
    height,
    x,
    y
  });
}

// If <html> has a CSS width greater than the viewport, then this will be
// incorrect for RTL.
function getWindowScrollBarX(element, rect) {
  const leftScroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeScroll */ .CP)(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getDocumentElement */ .ep)(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}

function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getDocumentElement */ .ep)(offsetParent);
  const topLayer = elements ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isTopLayer */ .Tf)(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .createCoords */ .Jx)(1);
  const offsets = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .createCoords */ .Jx)(0);
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(offsetParent);
  if (isOffsetParentAnElement || !isFixed) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isOverflowElement */ .ZU)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeScroll */ .CP)(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .createCoords */ .Jx)(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}

function getClientRects(element) {
  return element.getClientRects ? Array.from(element.getClientRects()) : [];
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(html) {
  const scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeScroll */ .CP)(html);
  const body = html.ownerDocument.body;
  const width = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .max */ .T9)(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .max */ .T9)(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(html);
  const y = -scroll.scrollTop;
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(body).direction === 'rtl') {
    x += (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .max */ .T9)(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Safety check: ensure the scrollbar space is reasonable in case this
// calculation is affected by unusual styles.
// Most scrollbars leave 15-18px of space.
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
  if (rootBoundary === void 0) {
    rootBoundary = 'viewport';
  }
  const isLayoutViewport = rootBoundary === 'layoutViewport';
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(element);
  const html = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getDocumentElement */ .ep)(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    // Client coordinates are relative to the layout viewport, except in
    // WebKit with an `absolute` strategy, where they are relative to the
    // visual viewport.
    const layoutRelativeClientCoords = !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isWebKit */ .Tc)() || strategy === 'fixed';
    if (isLayoutViewport) {
      if (!layoutRelativeClientCoords) {
        x = -visualViewport.offsetLeft;
        y = -visualViewport.offsetTop;
      }
    } else {
      width = visualViewport.width;
      height = visualViewport.height;
      if (layoutRelativeClientCoords) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  // `scrollbar-gutter: stable` on the <html> reserves gutter space that shrinks
  // the visual width but isn't reflected in `html.clientWidth`, so subtract it.
  // Only the inline-end (right) gutter can hold the scrollbar; `both-edges` also
  // reserves an empty inline-start gutter that clips nothing, so exclude just
  // the one scrollbar-side gutter — halve the measured (two-gutter) total. A
  // left-side scrollbar (`windowScrollbarX > 0`) is already handled by
  // `getHTMLOffset`/`visualViewport.width`; skip it here.
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === 'CSS1Compat' ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    const gutter = getComputedStyle(html).scrollbarGutter === 'stable both-edges' ? reservedWidth / 2 : reservedWidth;
    if (gutter <= SCROLLBAR_MAX) {
      width -= gutter;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = getScale(element);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport' || clippingAncestor === 'layoutViewport') {
    rect = getViewportRect(element, strategy, clippingAncestor);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getDocumentElement */ .ep)(element));
  } else if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .rectToClientRect */ .B1)(rect);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getOverflowAncestors */ .v9)(element, [], false).filter(el => (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(el) && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(el) !== 'body');
  let lastKeptComputedStyle = null;
  const elementIsFixed = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(element).position === 'fixed';
  let currentNode = elementIsFixed ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getParentNode */ .$4)(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(currentNode) && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isLastTraversableNode */ .eu)(currentNode)) {
    const computedStyle = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(currentNode);
    const currentNodeIsContaining = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isContainingBlock */ .sQ)(currentNode);
    // Position of the containing block chain below the current node. A fixed
    // element whose containing block hasn't been found yet is a fixed chain.
    const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? 'fixed' : '';

    // A non-containing ancestor does not clip the element when the chain
    // below it escapes it: a fixed chain escapes all ancestors up to the
    // next containing block, an absolute chain escapes static ancestors.
    const shouldDropCurrentNode = !currentNodeIsContaining && (lastPosition === 'fixed' || lastPosition === 'absolute' && computedStyle.position === 'static');
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // The kept node carries the chain position for the next iteration.
      lastKeptComputedStyle = computedStyle;
    }
    currentNode = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getParentNode */ .$4)(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isTopLayer */ .Tf)(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .max */ .T9)(rect.top, top);
    right = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .min */ .jk)(rect.right, right);
    bottom = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .min */ .jk)(rect.bottom, bottom);
    left = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .max */ .T9)(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(offsetParent);
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getDocumentElement */ .ep)(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .createCoords */ .Jx)(0);
  if (isOffsetParentAnElement || !isFixed) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isOverflowElement */ .ZU)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeScroll */ .CP)(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }

  // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
  // Firefox with layout.scrollbar.side = 3 in about:config to test this.
  if (!isOffsetParentAnElement && documentElement) {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .createCoords */ .Jx)(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getDocumentElement */ .ep)(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(element);
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isTopLayer */ .Tf)(element)) {
    return win;
  }
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element)) {
    let svgOffsetParent = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getParentNode */ .$4)(element);
    while (svgOffsetParent && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isLastTraversableNode */ .eu)(svgOffsetParent)) {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getParentNode */ .$4)(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isTableElement */ .Lv)(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isLastTraversableNode */ .eu)(offsetParent) && isStaticPositioned(offsetParent) && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isContainingBlock */ .sQ)(offsetParent)) {
    return win;
  }
  return offsetParent || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getContainingBlock */ .gJ)(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getDocumentElement */ .ep,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq,
  isRTL
};

function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove, ancestorResize) {
  let io = null;
  let timeoutId;
  const root = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getDocumentElement */ .ep)(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .floor */ .RI)(top);
    const insetRight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .floor */ .RI)(root.clientWidth - (left + width));
    const insetBottom = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .floor */ .RI)(root.clientHeight - (top + height));
    const insetLeft = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .floor */ .RI)(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .max */ .T9)(0, (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_1__/* .min */ .jk)(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;

      // The entry is a snapshot, so the reference may have moved since the
      // intersection was computed (under performance constraints, or between
      // consecutive frames of a multi-frame layout shift). The reported ratio
      // and the observed area are stale in that case and cannot be trusted to
      // detect subsequent movement, so refresh regardless of the ratio.
      if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        return refresh();
      }
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped in place, the ratio is 0. Throttle
          // the refresh to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(element);
  // The window is a resize ancestor, so when `ancestorResize` is enabled its
  // listener already runs the update on resize. Here we only need to rebuild
  // the `IntersectionObserver` for the new root size, skipping a redundant
  // update. When `ancestorResize` is disabled, this becomes the sole update.
  const handleResize = () => refresh(ancestorResize);
  win.addEventListener('resize', handleResize);
  refresh(true);
  return () => {
    win.removeEventListener('resize', handleResize);
    cleanup();
  };
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getOverflowAncestors */ .v9)(referenceEl) : []), ...(floating ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getOverflowAncestors */ .v9)(floating) : [])] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update);
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
const detectOverflow = (/* unused pure expression or super */ null && (detectOverflow$1));

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .offset */ .cY;

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = (/* unused pure expression or super */ null && (autoPlacement$1));

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .shift */ .BN;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .flip */ .UU;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .size */ .Ej;

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .hide */ .jD;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .arrow */ .UE;

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = (/* unused pure expression or super */ null && (inline$1));

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = _floating_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .limitShift */ .ER;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = options != null ? options : {};
  const platformWithCache = {
    ...platform,
    ...mergedOptions.platform,
    _c: cache
  };
  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .computePosition */ .rD)(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};




/***/ }),

/***/ 46468:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ visuallyHidden),
/* harmony export */   a: () => (/* binding */ visuallyHiddenInput)
/* harmony export */ });
const visuallyHiddenBase = {
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
};
const visuallyHidden = {
  ...visuallyHiddenBase,
  position: 'fixed',
  margin: 0,
  top: 0,
  left: 0
};
const visuallyHiddenInput = {
  ...visuallyHiddenBase,
  position: 'absolute'
};

/***/ }),

/***/ 47563:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ useUnmountAfterClose)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useForcedRerendering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34);
/* harmony import */ var _useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97378);
/* harmony import */ var _useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(72924);
/* __next_internal_client_entry_do_not_use__ useUnmountAfterClose auto */ 





/**
 * Keeps a popup mounted through its closing animation and unmounts it once the animation
 * finishes, unless the close cycle opted out through `preventUnmountOnClose`.
 * Store-agnostic: hosts sync `mounted` and `transitionStatus` wherever they need them.
 *
 * @returns `forceUnmount` unmounts the popup immediately. It is a no-op once the popup is already
 *   unmounted, so calling it after the automatic unmount doesn't repeat the completion callback,
 *   and a call while the popup is open only takes effect if a close commits in the same batch.
 */ function useUnmountAfterClose(parameters) {
    const { open, ref, preventUnmountOnClose, setPreventUnmountOnClose: setPreventUnmountOnCloseParam, onUnmount, animateInitialOpen } = parameters;
    const setPreventUnmountOnClose = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)(setPreventUnmountOnCloseParam);
    const { mounted, setMounted, transitionStatus } = (0,_useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useTransitionStatus */ .$)(open, false, false, animateInitialOpen);
    // Opening starts a new close cycle. Derive during render so the close-completion hook below
    // reads the value on the same pass, and clear the stored value so it doesn't leak into the next
    // close. The effect only runs when `open` changes, so an opt-out recorded while a controlled
    // close is still pending (for example in a transition) is not cleared by the render that still
    // sees `open`.
    const preventUnmountingOnClose = open ? false : preventUnmountOnClose;
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(()=>{
        if (open) {
            setPreventUnmountOnClose(false);
        }
    }, [
        open,
        setPreventUnmountOnClose
    ]);
    // Mirrors `mounted` synchronously so repeated `forceUnmount()` calls in one batch complete
    // closing once. Resynced on every commit: `setMounted(false)` while open re-mounts on the next
    // render without changing the committed `mounted`, so a `[mounted]` dependency would leave the
    // mirror stale and block every later unmount.
    const mountedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(mounted);
    const pendingUnmountRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const rerender = (0,_base_ui_utils_useForcedRerendering__WEBPACK_IMPORTED_MODULE_4__/* .useForcedRerendering */ .g)();
    const unmount = ()=>{
        mountedRef.current = false;
        setMounted(false);
        onUnmount();
    };
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(()=>{
        mountedRef.current = mounted;
        if (pendingUnmountRef.current) {
            pendingUnmountRef.current = false;
            if (!open && mounted) {
                unmount();
            }
        }
    });
    const forceUnmount = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)(()=>{
        if (!mountedRef.current) {
            return;
        }
        if (open) {
            // The rendered `open` can't tell a stale exit-animation callback after a quick reopen from a
            // close batched with this call (`close(); unmount()`). Decide once the batch commits: unmount
            // if the popup closed, otherwise drop the call rather than run the host's unmount cleanup and
            // the close completion against a live popup.
            pendingUnmountRef.current = true;
            rerender();
            return;
        }
        unmount();
    });
    (0,_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useOpenChangeComplete */ .v)({
        enabled: mounted && !open && !preventUnmountingOnClose,
        open,
        ref,
        onComplete () {
            if (!open) {
                forceUnmount();
            }
        }
    });
    return {
        mounted,
        transitionStatus,
        preventUnmountingOnClose,
        forceUnmount
    };
}


/***/ }),

/***/ 47733:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $h: () => (/* binding */ closed),
/* harmony export */   VJ: () => (/* binding */ endingStyle),
/* harmony export */   ep: () => (/* binding */ startingStyle),
/* harmony export */   ho: () => (/* binding */ open),
/* harmony export */   ii: () => (/* binding */ anchorHidden)
/* harmony export */ });
/* unused harmony exports side, align */
/* harmony import */ var _internals_TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5122);


/**
 * Present when the popup is open.
 */
const open = 'data-open';

/**
 * Present when the popup is closed.
 */
const closed = 'data-closed';

/**
 * Present when the popup begins animating in.
 */
const startingStyle = _internals_TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .startingStyle */ .e;

/**
 * Present when the popup is animating out.
 */
const endingStyle = _internals_TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .endingStyle */ .V;

/**
 * Present when the anchor is hidden.
 */
const anchorHidden = 'data-anchor-hidden';

/**
 * Indicates which side the popup is positioned relative to the trigger.
 * @type { 'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start'}
 */
const side = 'data-side';

/**
 * Indicates how the popup is aligned relative to specified side.
 * @type {'start' | 'center' | 'end'}
 */
const align = 'data-align';

/***/ }),

/***/ 48232:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ jsdom)
/* harmony export */ });
/* harmony import */ var _shared_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77450);


/** Running in jsdom or HappyDOM (used by unit tests). */
const jsdom = /jsdom|happydom/.test(_shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerUserAgent */ .ST);

/***/ }),

/***/ 52313:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ PopupTriggerMap)
/* harmony export */ });
/**
 * Development-only reverse index of element to registered id, keyed by the owning map.
 *
 * Registration would otherwise have to scan every entry to detect an element claimed by two ids,
 * making the mount of many triggers sharing one handle quadratic. Kept module-scoped, lazily
 * initialized, and read only from `process.env.NODE_ENV` guards so production builds drop it along
 * with the checks.
 */
let devElementIdsByMap;
function getDevElementIds(map) {
  devElementIdsByMap ??= new WeakMap();
  let elementIds = devElementIdsByMap.get(map);
  if (!elementIds) {
    elementIds = new WeakMap();
    devElementIdsByMap.set(map, elementIds);
  }
  return elementIds;
}

/**
 * Data structure to keep track of popup trigger elements by their IDs.
 *
 * Element lookups iterate the id map rather than maintaining a parallel Set. Registration is O(1),
 * while `hasElement` and `hasMatchingElement` are linear in the number of triggers.
 */
class PopupTriggerMap {
  idMap = new Map();

  /**
   * Adds a trigger element with the given ID.
   *
   * Note: The provided element is assumed to not be registered under multiple IDs.
   */
  add(id, element) {
    if (false) {}
    this.idMap.set(id, element);
  }

  /**
   * Removes the trigger element with the given ID.
   */
  delete(id) {
    if (false) {}
    this.idMap.delete(id);
  }

  /**
   * Whether the given element is registered as a trigger.
   */
  hasElement(element) {
    for (const registered of this.idMap.values()) {
      if (registered === element) {
        return true;
      }
    }
    return false;
  }

  /**
   * Whether there is a registered trigger element matching the given predicate.
   */
  hasMatchingElement(predicate) {
    for (const element of this.idMap.values()) {
      if (predicate(element)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the trigger element associated with the given ID, or undefined if no such element exists.
   */
  getById(id) {
    return this.idMap.get(id);
  }

  /**
   * Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
   */
  entries() {
    return this.idMap.entries();
  }

  /**
   * Returns an iterable of all registered trigger elements.
   */
  elements() {
    return this.idMap.values();
  }

  /**
   * Returns the number of registered trigger elements.
   */
  get size() {
    return this.idMap.size;
  }
}

/***/ }),

/***/ 53976:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ InternalBackdrop)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);


/**
 * @internal
 */

const InternalBackdrop = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function InternalBackdrop(props, ref) {
  const {
    cutout,
    ...otherProps
  } = props;
  let clipPath;
  if (cutout) {
    const rect = cutout.getBoundingClientRect();
    clipPath = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${rect.left}px ${rect.top}px,${rect.left}px ${rect.bottom}px,${rect.right}px ${rect.bottom}px,${rect.right}px ${rect.top}px,${rect.left}px ${rect.top}px)`;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ref: ref,
    role: "presentation"
    // Ensures Floating UI's outside press detection runs, as it considers
    // it an element that existed when the popup rendered.
    ,
    "data-base-ui-inert": "",
    ...otherProps,
    style: {
      position: 'fixed',
      inset: 0,
      userSelect: 'none',
      WebkitUserSelect: 'none',
      clipPath
    }
  });
});
if (false) {}

/***/ }),

/***/ 54285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ FloatingTreeStore)
/* harmony export */ });
/* harmony import */ var _utils_createEventEmitter_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20061);


/**
 * Stores and manages floating elements in a tree structure.
 * This is a backing store for the `FloatingTree` component.
 */
class FloatingTreeStore {
  nodesRef = {
    current: []
  };
  events = (0,_utils_createEventEmitter_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createEventEmitter */ .d)();
  addNode(node) {
    this.nodesRef.current.push(node);
  }
  removeNode(node) {
    const index = this.nodesRef.current.findIndex(n => n === node);
    if (index !== -1) {
      this.nodesRef.current.splice(index, 1);
    }
  }
}

/***/ }),

/***/ 61243:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C1: () => (/* binding */ useListNavigation)
/* harmony export */ });
/* unused harmony exports isMainOrientationKey, isMainOrientationToEndKey, isCrossOrientationOpenKey, isCrossOrientationCloseKey */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18813);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(81456);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2474);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15495);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(6791);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(76175);
/* harmony import */ var _components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(80120);
/* harmony import */ var _utils_composite_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(86058);
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3940);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83323);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(93093);
/* harmony import */ var _utils_enqueueFocus_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(85489);
/* harmony import */ var _utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(17947);
/* __next_internal_client_entry_do_not_use__ isMainOrientationKey,isMainOrientationToEndKey,isCrossOrientationOpenKey,isCrossOrientationCloseKey,useListNavigation auto */ 















// WebKit fires zero-delta `mousemove`/`pointermove` events when the list scrolls
// beneath a stationary pointer, moving the highlight during keyboard navigation.
// https://github.com/mui/base-ui/issues/4002
function isStationaryWebKitPointer(event) {
    return _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_1__/* .webkit */ .Fp && event.movementX === 0 && event.movementY === 0;
}
function doSwitch(orientation, vertical, horizontal) {
    switch(orientation){
        case 'vertical':
            return vertical;
        case 'horizontal':
            return horizontal;
        default:
            return vertical || horizontal;
    }
}
function isMainOrientationKey(key, orientation) {
    const vertical = key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_UP */ .il || key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_DOWN */ .Jd;
    const horizontal = key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_LEFT */ .eR || key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_RIGHT */ .RJ;
    return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
    const vertical = key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_DOWN */ .Jd;
    const horizontal = rtl ? key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_LEFT */ .eR : key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_RIGHT */ .RJ;
    return doSwitch(orientation, vertical, horizontal) || key === 'Enter' || key === ' ' || key === '';
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
    const vertical = rtl ? key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_LEFT */ .eR : key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_RIGHT */ .RJ;
    const horizontal = key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_DOWN */ .Jd;
    return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl, grid) {
    const vertical = rtl ? key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_RIGHT */ .RJ : key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_LEFT */ .eR;
    const horizontal = key === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ARROW_UP */ .il;
    if (orientation === 'both' || orientation === 'horizontal' && grid) {
        return key === 'Escape';
    }
    return doSwitch(orientation, vertical, horizontal);
}
/**
 * Adds arrow key-based navigation of a list of items, either using real DOM
 * focus or virtual focus.
 * @see https://floating-ui.com/docs/useListNavigation
 */ function useListNavigation(store, props) {
    const { listRef, activeIndex, onNavigate: onNavigateProp = ()=>{}, enabled = true, selectedIndex = null, allowEscape = false, loopFocus = false, nested = false, rtl = false, virtual = false, focusItemOnOpen = 'auto', focusItemOnHover = true, openOnArrowKeyDown = true, disabledIndices = undefined, orientation = 'vertical', triggerOrientation = orientation, parentOrientation, id, resetOnPointerLeave = true, externalTree, nestedReturnFocusRef, grid: navigateGrid } = props;
    const isGrid = navigateGrid != null;
    if (false) {}
    const open = store.useState('open');
    const floatingElement = store.useState('floatingElement');
    const domReferenceElement = store.useState('domReferenceElement');
    const dataRef = store.context.dataRef;
    const floatingFocusElement = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getFloatingFocusElement */ .nd)(floatingElement);
    const typeableComboboxReference = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isTypeableCombobox */ .WZ)(domReferenceElement);
    const floatingFocusElementRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(floatingFocusElement);
    const parentId = (0,_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useFloatingParentNodeId */ .R1)();
    const tree = (0,_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useFloatingTree */ .cq)(externalTree);
    const focusItemOnOpenRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(focusItemOnOpen);
    const indexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(selectedIndex ?? -1);
    const keyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const isPointerModalityRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const onNavigate = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)((event)=>{
        onNavigateProp(indexRef.current === -1 ? null : indexRef.current, event);
    });
    const previousMountedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(!!floatingElement);
    const previousOpenRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(open);
    const forceSyncFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const forceScrollIntoViewRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const cancelQueuedFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const disabledIndicesRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(disabledIndices);
    const latestOpenRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(open);
    const selectedIndexRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(selectedIndex);
    const resetOnPointerLeaveRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_4__/* .useValueAsRef */ .u)(resetOnPointerLeave);
    const focusFrame = (0,_base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_7__/* .useAnimationFrame */ .NR)();
    const waitForListPopulatedFrame = (0,_base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_7__/* .useAnimationFrame */ .NR)();
    const focusItem = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)(()=>{
        // Synchronous navigation must also supersede any deferred focus from an earlier update.
        focusFrame.cancel();
        function runFocus(item) {
            if (!virtual) {
                cancelQueuedFocusRef.current = (0,_utils_enqueueFocus_mjs__WEBPACK_IMPORTED_MODULE_8__/* .enqueueFocus */ .p)(item, {
                    sync: forceSyncFocusRef.current,
                    preventScroll: true
                });
            }
        }
        const initialItem = listRef.current[indexRef.current];
        const forceScrollIntoView = forceScrollIntoViewRef.current;
        if (initialItem) {
            runFocus(initialItem);
        }
        const scheduler = forceSyncFocusRef.current ? (callback)=>callback() : (callback)=>focusFrame.request(callback);
        scheduler(()=>{
            const waitedItem = listRef.current[indexRef.current] || initialItem;
            if (!waitedItem) {
                return;
            }
            if (!initialItem) {
                runFocus(waitedItem);
            }
            const shouldScrollIntoView = // eslint-disable-next-line @typescript-eslint/no-use-before-define
            item && (forceScrollIntoView || !isPointerModalityRef.current);
            if (shouldScrollIntoView) {
                // JSDOM doesn't support `.scrollIntoView()` but it's widely supported
                // by all browsers.
                waitedItem.scrollIntoView?.({
                    block: 'nearest',
                    inline: 'nearest'
                });
            }
        });
    });
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_9__/* .useIsoLayoutEffect */ .g)(()=>{
        dataRef.current.orientation = orientation;
    }, [
        dataRef,
        orientation
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_9__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open) {
            keyRef.current = null;
        }
        // Explicit values can change with the opening interaction. Keep an inferred 'auto' value
        // from the trigger event, but apply a boolean before the initial highlight is synchronized.
        if (!open || focusItemOnOpen !== 'auto') {
            focusItemOnOpenRef.current = focusItemOnOpen;
        }
    }, [
        open,
        focusItemOnOpen
    ]);
    // Sync `selectedIndex` to be the `activeIndex` upon opening the floating
    // element. Also, reset `activeIndex` upon closing the floating element.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_9__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!enabled) {
            return;
        }
        if (open && floatingElement) {
            indexRef.current = selectedIndex ?? -1;
            if (focusItemOnOpenRef.current && selectedIndex != null) {
                // Regardless of the pointer modality, we want to ensure the selected
                // item comes into view when the floating element is opened.
                forceScrollIntoViewRef.current = true;
                onNavigate();
            }
        } else if (previousMountedRef.current) {
            // Reset the active index when the list is no longer open and mounted (closing or
            // unmounting). `onNavigate` is a stable callback that always forwards to the latest
            // `onNavigate` prop.
            indexRef.current = -1;
            onNavigate();
        }
    }, [
        enabled,
        open,
        floatingElement,
        selectedIndex,
        onNavigate
    ]);
    // Sync `activeIndex` to be the focused item while the floating element is
    // open.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_9__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!enabled) {
            return;
        }
        if (!open) {
            forceSyncFocusRef.current = false;
            return;
        }
        if (!floatingElement) {
            return;
        }
        if (activeIndex == null) {
            forceSyncFocusRef.current = false;
            if (selectedIndexRef.current != null) {
                return;
            }
            // Reset while the floating element was open (e.g. the list changed).
            if (previousMountedRef.current) {
                indexRef.current = -1;
                focusItem();
            }
            // Initial sync.
            if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
                let runs = 0;
                const waitForListPopulated = ()=>{
                    if (listRef.current[0] == null) {
                        // Avoid letting the browser paint if possible on the first try,
                        // otherwise use rAF. Don't try more than twice, since something
                        // is wrong otherwise.
                        if (runs < 2) {
                            const scheduler = runs ? (callback)=>waitForListPopulatedFrame.request(callback) : queueMicrotask;
                            scheduler(waitForListPopulated);
                        }
                        runs += 1;
                    } else {
                        // Initially focus the first non-disabled item. `disabledIndices` is deliberately
                        // omitted here so attribute-disabled items (`disabled`/`aria-disabled`) are skipped
                        // on open even when the consumer passes an empty `disabledIndices` array. Passing it
                        // would regress that behavior (see mui/base-ui#2604).
                        // The key came from the trigger, so it is read on the trigger's orientation.
                        indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, triggerOrientation, rtl) || nested ? (0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getMinListIndex */ .Zb)(listRef) : (0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getMaxListIndex */ .vB)(listRef);
                        keyRef.current = null;
                        onNavigate();
                    }
                };
                waitForListPopulated();
            }
        } else if (!(0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isIndexOutOfListBounds */ .du)(listRef.current, activeIndex)) {
            indexRef.current = activeIndex;
            focusItem();
            forceScrollIntoViewRef.current = false;
        }
    }, [
        enabled,
        open,
        floatingElement,
        activeIndex,
        selectedIndexRef,
        nested,
        listRef,
        triggerOrientation,
        rtl,
        onNavigate,
        focusItem,
        waitForListPopulatedFrame
    ]);
    // Ensure the parent floating element has focus when a nested child closes
    // to allow arrow key navigation to work after the pointer leaves the child.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_9__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!enabled || floatingElement || !tree || virtual || !previousMountedRef.current) {
            return;
        }
        const nodes = tree.nodesRef.current;
        const parent = nodes.find((node)=>node.id === parentId)?.context?.elements.floating;
        // `floatingElement` is null here (see the guard above), so resolve the owner document from an
        // in-DOM element for realm-safety (shadow DOM/iframes): the reference element, falling back to
        // the parent floating element when the reference is virtual (`domReferenceElement` is null).
        const activeEl = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__/* .activeElement */ .RS)((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_12__/* .ownerDocument */ .R)(domReferenceElement ?? parent ?? null));
        const treeContainsActiveEl = nodes.some((node)=>node.context && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__/* .contains */ .gR)(node.context.elements.floating, activeEl));
        if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
            parent.focus({
                preventScroll: true
            });
        }
    }, [
        enabled,
        floatingElement,
        domReferenceElement,
        tree,
        parentId,
        virtual
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_9__/* .useIsoLayoutEffect */ .g)(()=>{
        previousOpenRef.current = open;
        previousMountedRef.current = !!floatingElement;
    });
    const hasActiveIndex = activeIndex != null;
    const syncCurrentTarget = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)((event)=>{
        if (!latestOpenRef.current) {
            return;
        }
        const index = listRef.current.indexOf(event.currentTarget);
        if (index !== -1 && (indexRef.current !== index || activeIndex !== index)) {
            indexRef.current = index;
            onNavigate(event);
        }
    });
    const getParentOrientation = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)(()=>{
        return parentOrientation ?? tree?.nodesRef.current.find((node)=>node.id === parentId)?.context?.dataRef?.current.orientation;
    });
    const getMinEnabledIndex = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)(()=>{
        return (0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getMinListIndex */ .Zb)(listRef, disabledIndicesRef.current);
    });
    const commonOnKeyDown = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)((event)=>{
        isPointerModalityRef.current = false;
        forceSyncFocusRef.current = true;
        // When composing a character, Chrome fires ArrowDown twice. Firefox/Safari
        // don't appear to suffer from this. `event.isComposing` is avoided due to
        // Safari not supporting it properly (although it's not needed in the first
        // place for Safari, just avoiding any possible issues).
        if (event.which === 229) {
            return;
        }
        // If the floating element is animating out, ignore navigation. Otherwise,
        // the `activeIndex` gets set to 0 despite not being open so the next time
        // the user ArrowDowns, the first item won't be focused.
        if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) {
            return;
        }
        if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl, isGrid)) {
            // If the nested list's close key is also the parent navigation key,
            // let the parent navigate. Otherwise, stop propagating the event.
            if (!isMainOrientationKey(event.key, getParentOrientation())) {
                (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__/* .stopEvent */ .jo)(event);
            }
            store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_14__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_15__/* .listNavigation */ .Dq, event.nativeEvent));
            const returnElement = nestedReturnFocusRef?.current ?? domReferenceElement;
            if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_16__/* .isHTMLElement */ .sb)(returnElement)) {
                returnElement.focus();
            }
            return;
        }
        // The consumer owns `activeIndex` and may decline a navigation this hook proposed, such as a
        // virtual list keeping its highlight when the reference is refocused. Declining produces no
        // re-render, so reconcile here: otherwise the cursor drifts from the rendered highlight and
        // this key moves from the wrong position.
        if (activeIndex != null && activeIndex !== indexRef.current && !(0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isIndexOutOfListBounds */ .du)(listRef.current, activeIndex)) {
            indexRef.current = activeIndex;
        }
        const currentIndex = indexRef.current;
        const minIndex = (0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getMinListIndex */ .Zb)(listRef, disabledIndices);
        const maxIndex = (0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getMaxListIndex */ .vB)(listRef, disabledIndices);
        if (!typeableComboboxReference) {
            if (event.key === 'Home') {
                (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__/* .stopEvent */ .jo)(event);
                indexRef.current = minIndex;
                onNavigate(event);
            }
            if (event.key === 'End') {
                (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__/* .stopEvent */ .jo)(event);
                indexRef.current = maxIndex;
                onNavigate(event);
            }
        }
        // Grid navigation is injected by grid-capable consumers so non-grid
        // consumers (menu, select) tree-shake the grid helpers out.
        if (navigateGrid != null) {
            const index = navigateGrid(event, indexRef.current, listRef, orientation, loopFocus, rtl, disabledIndices, minIndex, maxIndex);
            // The grid navigator returns the unchanged index for keys it does not handle, and
            // reporting that as a navigation would re-emit the current highlight on every keydown.
            if (index != null && index !== indexRef.current) {
                indexRef.current = index;
                onNavigate(event);
            }
            if (orientation === 'both') {
                return;
            }
        }
        if (isMainOrientationKey(event.key, orientation)) {
            (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__/* .stopEvent */ .jo)(event);
            // Reset the index if no item is focused. Focus can also rest on a container inside the
            // popup, such as a list that holds the `menu` role. Keys bubbling from a portaled nested
            // popup are not in this popup's DOM, so they navigate from the current index.
            const focusedElement = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__/* .activeElement */ .RS)(event.currentTarget.ownerDocument);
            if (open && !virtual && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__/* .contains */ .gR)(event.currentTarget, focusedElement) && !listRef.current.some((item)=>item != null && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__/* .contains */ .gR)(item, focusedElement))) {
                indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
                onNavigate(event);
                // The boundary item may already be highlighted, so `activeIndex` won't change and the
                // effect that moves focus to the highlighted item won't run.
                if (activeIndex === indexRef.current) {
                    focusItem();
                }
                return;
            }
            const { index, wrapped } = (0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getNextListIndex */ .SP)(listRef.current, currentIndex, {
                decrement: !isMainOrientationToEndKey(event.key, orientation, rtl),
                loopFocus,
                allowEscape,
                disabledIndices,
                minIndex,
                maxIndex
            });
            if (wrapped) {
                // Give time for virtualizers to update the listRef.
                forceSyncFocusRef.current = false;
            }
            indexRef.current = index;
            onNavigate(event);
        }
    });
    const item = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        const itemProps = {
            onFocus (event) {
                forceSyncFocusRef.current = true;
                syncCurrentTarget(event);
            },
            onClick ({ currentTarget }) {
                // Safari. Skipped under virtual focus, which must keep real focus on the reference.
                if (!virtual) {
                    currentTarget.focus({
                        preventScroll: true
                    });
                }
            },
            onMouseMove (event) {
                if (isStationaryWebKitPointer(event)) {
                    return;
                }
                forceSyncFocusRef.current = true;
                forceScrollIntoViewRef.current = false;
                if (focusItemOnHover) {
                    syncCurrentTarget(event);
                }
            },
            onPointerLeave (event) {
                if (!latestOpenRef.current || !isPointerModalityRef.current || event.pointerType === 'touch') {
                    return;
                }
                forceSyncFocusRef.current = true;
                const relatedTarget = event.relatedTarget;
                if (!focusItemOnHover || listRef.current.includes(relatedTarget)) {
                    return;
                }
                if (!resetOnPointerLeaveRef.current) {
                    return;
                }
                cancelQueuedFocusRef.current?.();
                cancelQueuedFocusRef.current = null;
                indexRef.current = -1;
                onNavigate(event);
                if (!virtual) {
                    const floatingFocusEl = floatingFocusElementRef.current;
                    const activeEl = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__/* .activeElement */ .RS)((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_12__/* .ownerDocument */ .R)(floatingFocusEl));
                    if (floatingFocusEl && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__/* .contains */ .gR)(floatingFocusEl, activeEl)) {
                        floatingFocusEl.focus({
                            preventScroll: true
                        });
                    }
                }
            }
        };
        return itemProps;
    }, [
        syncCurrentTarget,
        latestOpenRef,
        floatingFocusElementRef,
        focusItemOnHover,
        listRef,
        onNavigate,
        resetOnPointerLeaveRef,
        virtual
    ]);
    const ariaActiveDescendantProp = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        return virtual && open && hasActiveIndex && {
            'aria-activedescendant': `${id}-${activeIndex}`
        };
    }, [
        virtual,
        open,
        hasActiveIndex,
        id,
        activeIndex
    ]);
    const floating = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        return {
            ...!typeableComboboxReference ? ariaActiveDescendantProp : {},
            onKeyDown (event) {
                // Close submenu on Shift+Tab
                if (event.key === 'Tab' && event.shiftKey && open && !virtual) {
                    // If the event originated from within a nested element (e.g., a Dialog opened from
                    // within the menu), don't close the menu. The nested element has its own focus
                    // management and should handle the Tab key.
                    const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__/* .getTarget */ .EW)(event.nativeEvent);
                    if (target && !(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_11__/* .contains */ .gR)(floatingFocusElementRef.current, target)) {
                        return;
                    }
                    (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__/* .stopEvent */ .jo)(event);
                    const details = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_14__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_15__/* .focusOut */ .Xn, event.nativeEvent);
                    store.setOpen(false, details);
                    const returnElement = nestedReturnFocusRef?.current ?? domReferenceElement;
                    if (!details.isCanceled && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_16__/* .isHTMLElement */ .sb)(returnElement)) {
                        returnElement.focus();
                    }
                    return;
                }
                commonOnKeyDown(event);
            },
            onPointerMove (event) {
                if (isStationaryWebKitPointer(event)) {
                    return;
                }
                isPointerModalityRef.current = true;
            }
        };
    }, [
        ariaActiveDescendantProp,
        commonOnKeyDown,
        floatingFocusElementRef,
        typeableComboboxReference,
        store,
        open,
        virtual,
        domReferenceElement,
        nestedReturnFocusRef
    ]);
    const trigger = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        function openOnNavigationKeyDown(event) {
            store.setOpen(true, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_14__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_15__/* .listNavigation */ .Dq, event.nativeEvent, event.currentTarget));
        }
        function checkVirtualMouse(event) {
            if (focusItemOnOpen === 'auto' && (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__/* .isVirtualClick */ .YF)(event.nativeEvent)) {
                focusItemOnOpenRef.current = !virtual;
            }
        }
        function checkVirtualPointer(event) {
            // `pointerdown` fires first, reset the state then perform the checks.
            focusItemOnOpenRef.current = focusItemOnOpen;
            if (focusItemOnOpen === 'auto' && (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__/* .isVirtualPointerEvent */ .Pg)(event.nativeEvent)) {
                focusItemOnOpenRef.current = true;
            }
        }
        return {
            onKeyDown (event) {
                // non-reactive open state (to prevent re-creation of the handler)
                const currentOpen = store.select('open');
                isPointerModalityRef.current = false;
                const isArrowKey = event.key.startsWith('Arrow');
                const isParentCrossOpenKey = isCrossOrientationOpenKey(event.key, getParentOrientation(), rtl);
                const isMainKey = isMainOrientationKey(event.key, currentOpen ? orientation : triggerOrientation);
                const isNavigationKey = (nested ? isParentCrossOpenKey : isMainKey) || event.key === 'Enter' || event.key.trim() === '';
                if (virtual && currentOpen && (!nested || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isTypeableElement */ .$u)(event.currentTarget))) {
                    return commonOnKeyDown(event);
                }
                // If a floating element should not open on arrow key down, avoid
                // setting `activeIndex` while it's closed.
                if (!currentOpen && !openOnArrowKeyDown && isArrowKey) {
                    return undefined;
                }
                if (isNavigationKey) {
                    const isParentMainKey = isMainOrientationKey(event.key, getParentOrientation());
                    keyRef.current = nested && isParentMainKey ? null : event.key;
                }
                if (nested) {
                    if (isParentCrossOpenKey) {
                        (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__/* .stopEvent */ .jo)(event);
                        if (currentOpen) {
                            indexRef.current = getMinEnabledIndex();
                            onNavigate(event);
                            if (virtual) {
                                floatingFocusElementRef.current?.focus();
                            }
                        } else {
                            openOnNavigationKeyDown(event);
                        }
                    }
                    return undefined;
                }
                if (isMainKey) {
                    if (selectedIndexRef.current != null) {
                        indexRef.current = selectedIndexRef.current;
                    }
                    (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_13__/* .stopEvent */ .jo)(event);
                    if (!currentOpen && openOnArrowKeyDown) {
                        openOnNavigationKeyDown(event);
                    } else {
                        commonOnKeyDown(event);
                    }
                    if (currentOpen) {
                        onNavigate(event);
                    }
                }
                return undefined;
            },
            onFocus (event) {
                if (event.target !== event.currentTarget) {
                    return;
                }
                if (store.select('open') && !virtual) {
                    indexRef.current = -1;
                    onNavigate(event);
                }
            },
            onPointerDown: checkVirtualPointer,
            onPointerEnter: checkVirtualPointer,
            onMouseDown: checkVirtualMouse,
            onClick: checkVirtualMouse
        };
    }, [
        commonOnKeyDown,
        focusItemOnOpen,
        getMinEnabledIndex,
        nested,
        onNavigate,
        store,
        openOnArrowKeyDown,
        orientation,
        triggerOrientation,
        getParentOrientation,
        rtl,
        selectedIndexRef,
        virtual,
        floatingFocusElementRef
    ]);
    const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        return {
            ...ariaActiveDescendantProp,
            ...trigger
        };
    }, [
        ariaActiveDescendantProp,
        trigger
    ]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>enabled ? {
            reference,
            floating,
            item,
            trigger
        } : {}, [
        enabled,
        reference,
        floating,
        trigger,
        item
    ]);
}


/***/ }),

/***/ 61769:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ hide)
/* harmony export */ });
const hide = {
  name: 'hide',
  async fn(state) {
    const {
      width,
      height,
      x,
      y
    } = state.rects.reference;
    const anchorHidden = width === 0 && height === 0 && x === 0 && y === 0;
    // Mirrors Floating UI's `hide()` referenceHidden strategy. Floating UI injects
    // `detectOverflow` into the middleware platform before invoking middleware.
    const overflow = await state.platform.detectOverflow(state, {
      elementContext: 'reference'
    });
    const referenceHidden = overflow.top - height >= 0 || overflow.right - width >= 0 || overflow.bottom - height >= 0 || overflow.left - width >= 0;
    return {
      data: {
        referenceHidden: referenceHidden || anchorHidden
      }
    };
  }
};

/***/ }),

/***/ 62424:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ usePositioner)
/* harmony export */ });
/* harmony import */ var _popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84052);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88401);
/* harmony import */ var _internals_getDisabledMountTransitionStyles_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36050);
/* __next_internal_client_entry_do_not_use__ usePositioner auto */ 


/**
 * Renders the shared outer Positioner element used by popup components.
 * Applies the common role, hidden state, transition styles, state attributes, and optional inert styling.
 */ function usePositioner(componentProps, state, { styles, transitionStatus, props, refs, hidden, inert = false }) {
    const style = {
        ...styles
    };
    if (inert) {
        style.pointerEvents = 'none';
    }
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useRenderElement */ .o)('div', componentProps, {
        state,
        ref: refs,
        props: [
            {
                role: 'presentation',
                hidden,
                style
            },
            (0,_internals_getDisabledMountTransitionStyles_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getDisabledMountTransitionStyles */ .d)(transitionStatus),
            props
        ],
        stateAttributesMapping: _popupStateMapping_mjs__WEBPACK_IMPORTED_MODULE_2__/* .popupStateMapping */ .GW
    });
}


/***/ }),

/***/ 65538:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var React = __webpack_require__(12115);
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  useState = React.useState,
  useEffect = React.useEffect,
  useLayoutEffect = React.useLayoutEffect,
  useDebugValue = React.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(),
    _useState = useState({ inst: { value: value, getSnapshot: getSnapshot } }),
    inst = _useState[0].inst,
    forceUpdate = _useState[1];
  useLayoutEffect(
    function () {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect(
    function () {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      return subscribe(function () {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      });
    },
    [subscribe]
  );
  useDebugValue(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(inst, nextValue);
  } catch (error) {
    return !0;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim =
  "undefined" === typeof window ||
  "undefined" === typeof window.document ||
  "undefined" === typeof window.document.createElement
    ? useSyncExternalStore$1
    : useSyncExternalStore$2;
exports.useSyncExternalStore =
  void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;


/***/ }),

/***/ 69679:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HQ: () => (/* binding */ TYPEAHEAD_RESET_MS),
/* harmony export */   K2: () => (/* binding */ DISABLED_TRANSITIONS_STYLE),
/* harmony export */   Kd: () => (/* binding */ CLICK_TRIGGER_IDENTIFIER),
/* harmony export */   Pe: () => (/* binding */ POPUP_COLLISION_AVOIDANCE),
/* harmony export */   X3: () => (/* binding */ PATIENT_CLICK_THRESHOLD),
/* harmony export */   uD: () => (/* binding */ DROPDOWN_COLLISION_AVOIDANCE),
/* harmony export */   z_: () => (/* binding */ ownerVisuallyHidden)
/* harmony export */ });
/* unused harmony exports BASE_UI_SWIPE_IGNORE_ATTRIBUTE, LEGACY_SWIPE_IGNORE_ATTRIBUTE, BASE_UI_SWIPE_IGNORE_SELECTOR, LEGACY_SWIPE_IGNORE_SELECTOR */
const TYPEAHEAD_RESET_MS = 500;
const PATIENT_CLICK_THRESHOLD = 500;
const DISABLED_TRANSITIONS_STYLE = {
  style: {
    transition: 'none'
  }
};
const CLICK_TRIGGER_IDENTIFIER = 'data-base-ui-click-trigger';
const BASE_UI_SWIPE_IGNORE_ATTRIBUTE = 'data-base-ui-swipe-ignore';
const LEGACY_SWIPE_IGNORE_ATTRIBUTE = 'data-swipe-ignore';
const BASE_UI_SWIPE_IGNORE_SELECTOR = (/* unused pure expression or super */ null && (`[${BASE_UI_SWIPE_IGNORE_ATTRIBUTE}]`));
const LEGACY_SWIPE_IGNORE_SELECTOR = (/* unused pure expression or super */ null && (`[${LEGACY_SWIPE_IGNORE_ATTRIBUTE}]`));

/**
 * Used for dropdowns that usually strictly prefer top/bottom placements and
 * use `var(--available-height)` to limit their height.
 */
const DROPDOWN_COLLISION_AVOIDANCE = {
  fallbackAxisSide: 'none'
};

/**
 * Used by regular popups that usually aren't scrollable and are allowed to
 * freely flip to any axis of placement.
 */
const POPUP_COLLISION_AVOIDANCE = {
  fallbackAxisSide: 'end'
};

/**
 * Special visually hidden styles for the aria-owns owner element to ensure owned element
 * accessibility in iOS/Safari/VoiceControl.
 * The owner element is an empty span, so most of the common visually hidden styles are not needed.
 * @see https://github.com/floating-ui/floating-ui/issues/3403
 */
const ownerVisuallyHidden = {
  clipPath: 'inset(50%)',
  position: 'fixed',
  top: 0,
  left: 0
};

/***/ }),

/***/ 73562:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ useTypeahead)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64951);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8994);
/* harmony import */ var _utils_composite_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(86058);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93093);
/* harmony import */ var _utils_event_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17947);
/* __next_internal_client_entry_do_not_use__ useTypeahead auto */ 







/**
 * Provides a matching callback that can be used to focus an item as the user
 * types, often used in tandem with `useListNavigation()`.
 * @see https://floating-ui.com/docs/useTypeahead
 */ function useTypeahead(store, props) {
    const { listRef, elementsRef, activeIndex, onMatch: onMatchProp, disabledIndices, onTyping: onTypingProp, enabled = true, resetMs = 750, selectedIndex = null } = props;
    const onTyping = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)(onTypingProp);
    const open = store.useState('open');
    const timeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_2__/* .useTimeout */ .Z)();
    const stringRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef('');
    const prevIndexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(selectedIndex ?? activeIndex ?? -1);
    const matchIndexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const onKeyDown = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)((event)=>{
        function getElement(index) {
            return elementsRef?.current[index];
        }
        function isItemAvailable(index) {
            const element = getElement(index);
            if (element && !(0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isElementVisible */ .J9)(element) || element?.matches(':disabled')) {
                return false;
            }
            // Visibility and native disabled state are handled above; pass an empty
            // element list so `isListIndexDisabled` resolves only the explicit
            // `disabledIndices` (array/predicate) and skips its own fallbacks.
            // Consumers that don't pass `disabledIndices` keep matching every visible
            // item except native disabled elements provided through `elementsRef`.
            return disabledIndices == null || !(0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isListIndexDisabled */ .FP)(_base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_4__/* .EMPTY_ARRAY */ .Ml, index, disabledIndices);
        }
        function getMatchingIndex(list, string, startIndex = 0) {
            if (list.length === 0) {
                return -1;
            }
            const normalizedStartIndex = (startIndex % list.length + list.length) % list.length;
            const lowerString = string.toLowerCase();
            for(let offset = 0; offset < list.length; offset += 1){
                const index = (normalizedStartIndex + offset) % list.length;
                const text = list[index];
                if (!text?.toLowerCase().startsWith(lowerString) || !isItemAvailable(index)) {
                    continue;
                }
                return index;
            }
            return -1;
        }
        const listContent = listRef.current;
        if (stringRef.current.length > 0 && event.key === ' ') {
            // Space should continue the in-progress typeahead session.
            (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_5__/* .stopEvent */ .jo)(event);
            onTyping?.(true);
        }
        if (stringRef.current.length > 0 && stringRef.current[0] !== ' ') {
            if (getMatchingIndex(listContent, stringRef.current) === -1 && event.key !== ' ') {
                onTyping?.(false);
            }
        }
        if (listContent == null || // Character key.
        event.key.length !== 1 || // Modifier key.
        event.ctrlKey || event.metaKey || event.altKey) {
            return;
        }
        if (open && event.key !== ' ') {
            (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_5__/* .stopEvent */ .jo)(event);
            onTyping?.(true);
        }
        // Capture whether this is a new typing session before mutating the string.
        const isNewSession = stringRef.current === '';
        if (isNewSession) {
            prevIndexRef.current = selectedIndex ?? activeIndex ?? -1;
        }
        // Bail out if the list contains a word like "llama" or "aaron". TODO:
        // allow it in this case, too. Unavailable items are skipped while matching, so
        // they must be ignored here as well — otherwise a hidden or disabled double-letter
        // label would block rapid cycling through the available items.
        const allowRapidSuccessionOfFirstLetter = listContent.every((text, index)=>text && isItemAvailable(index) ? text[0]?.toLowerCase() !== text[1]?.toLowerCase() : true);
        // Allows the user to cycle through items that start with the same letter
        // in rapid succession.
        if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
            stringRef.current = '';
            prevIndexRef.current = matchIndexRef.current;
        }
        stringRef.current += event.key;
        timeout.start(resetMs, ()=>{
            stringRef.current = '';
            prevIndexRef.current = matchIndexRef.current;
            onTyping?.(false);
        });
        // Compute the starting index for this search.
        // If this is a new typing session (string is empty), base it on the current
        // selection/active item; otherwise continue from the last matched index.
        const prevIndex = isNewSession ? selectedIndex ?? activeIndex ?? -1 : prevIndexRef.current;
        const startIndex = (prevIndex ?? 0) + 1;
        const index = getMatchingIndex(listContent, stringRef.current, startIndex);
        if (index !== -1) {
            onMatchProp?.(index, event);
            matchIndexRef.current = index;
        } else if (event.key !== ' ') {
            stringRef.current = '';
            onTyping?.(false);
        }
    });
    const onBlur = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)((event)=>{
        const next = event.relatedTarget;
        const currentDomReferenceElement = store.select('domReferenceElement');
        const currentFloatingElement = store.select('floatingElement');
        const withinComposite = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_6__/* .contains */ .gR)(currentDomReferenceElement, next) || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_6__/* .contains */ .gR)(currentFloatingElement, next);
        // Keep the session if focus moves within the composite (reference <-> floating).
        if (withinComposite) {
            return;
        }
        // End the current typing session when focus leaves the composite entirely.
        timeout.clear();
        stringRef.current = '';
        prevIndexRef.current = matchIndexRef.current;
        onTyping?.(false);
    });
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open && selectedIndex !== null) {
            return;
        }
        timeout.clear();
        matchIndexRef.current = null;
        if (stringRef.current !== '') {
            stringRef.current = '';
            onTyping?.(false);
        }
    }, [
        open,
        selectedIndex,
        timeout,
        onTyping
    ]);
    const sharedProps = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            onKeyDown,
            onBlur
        }), [
        onKeyDown,
        onBlur
    ]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>enabled ? {
            reference: sharedProps,
            floating: sharedProps
        } : {}, [
        enabled,
        sharedProps
    ]);
}


/***/ }),

/***/ 74831:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ createAttribute)
/* harmony export */ });
function createAttribute(name) {
  return `data-base-ui-${name}`;
}

/***/ }),

/***/ 77450:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JG: () => (/* binding */ lowerPlatform),
/* harmony export */   RT: () => (/* binding */ maxTouchPoints),
/* harmony export */   ST: () => (/* binding */ lowerUserAgent)
/* harmony export */ });
/**
 * Reads `navigator.userAgent` / `navigator.platform` (legacy but universally
 * supported) into a normalized shape. In development, prefers the modern
 * `navigator.userAgentData` API on Chromium to avoid DevTools warnings about
 * the deprecated reads; that branch is dead-code-eliminated in production
 * builds to keep the bundle small.
 *
 * Returns empty/zero values when `navigator` is undefined (SSR), so every
 * derived flag safely evaluates to `false`.
 */
function readRawData() {
  if (typeof navigator === 'undefined') {
    return {
      userAgent: '',
      platform: '',
      maxTouchPoints: 0
    };
  }
  if (false) {}
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform ?? '',
    maxTouchPoints: navigator.maxTouchPoints ?? 0
  };
}
const {
  userAgent,
  platform,
  maxTouchPoints
} = readRawData();
const lowerUserAgent = userAgent.toLowerCase();
const lowerPlatform = platform.toLowerCase();


/***/ }),

/***/ 78791:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ useBaseUIFloating)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66652);
/* harmony import */ var _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9683);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6791);
/* harmony import */ var _components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80120);
/* __next_internal_client_entry_do_not_use__ useBaseUIFloating auto */ 




/**
 * Provides data to position a floating element and context to add interactions.
 * The caller supplies the root store, which owns the reference and floating elements.
 * @see https://floating-ui.com/docs/useFloating
 */ function useBaseUIFloating(options) {
    const { nodeId, externalTree, rootContext: store } = options;
    const referenceElement = store.useState('referenceElement');
    const floatingElement = store.useState('floatingElement');
    const domReferenceElement = store.useState('domReferenceElement');
    const open = store.useState('open');
    const floatingId = store.useState('floatingId');
    const [positionReference, setPositionReferenceRaw] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const domReferenceRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const tree = (0,_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useFloatingTree */ .cq)(externalTree);
    const storeElements = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            reference: referenceElement,
            floating: floatingElement,
            domReference: domReferenceElement
        }), [
        referenceElement,
        floatingElement,
        domReferenceElement
    ]);
    const position = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_2__/* .useFloating */ .we)({
        ...options,
        elements: {
            ...storeElements,
            ...positionReference && {
                reference: positionReference
            }
        }
    });
    const setPositionReference = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node)=>{
        const computedPositionReference = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_3__/* .isElement */ .vq)(node) ? {
            getBoundingClientRect: ()=>node.getBoundingClientRect(),
            getClientRects: ()=>node.getClientRects(),
            contextElement: node
        } : node;
        // Store the positionReference in state if the DOM reference is specified externally via the
        // `elements.reference` option. This ensures that it won't be overridden on future renders.
        setPositionReferenceRaw(computedPositionReference);
        position.refs.setReference(computedPositionReference);
    }, [
        position.refs
    ]);
    const refs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            ...position.refs,
            setPositionReference,
            domReference: domReferenceRef
        }), [
        position.refs,
        setPositionReference
    ]);
    const elements = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            ...position.elements,
            domReference: domReferenceElement
        }), [
        position.elements,
        domReferenceElement
    ]);
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            ...position,
            dataRef: store.context.dataRef,
            open,
            onOpenChange: store.setOpen,
            events: store.context.events,
            floatingId,
            refs,
            elements,
            nodeId,
            rootStore: store
        }), [
        position,
        refs,
        elements,
        nodeId,
        store,
        open,
        floatingId
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__/* .useIsoLayoutEffect */ .g)(()=>{
        if (domReferenceElement) {
            domReferenceRef.current = domReferenceElement;
        }
    }, [
        domReferenceElement
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__/* .useIsoLayoutEffect */ .g)(()=>{
        store.context.dataRef.current.floatingContext = context;
        const node = tree?.nodesRef.current.find((n)=>n.id === nodeId);
        if (node) {
            node.context = context;
        }
    });
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            ...position,
            context,
            refs,
            elements,
            rootStore: store
        }), [
        position,
        refs,
        elements,
        context,
        store
    ]);
}


/***/ }),

/***/ 80120:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $c: () => (/* binding */ FloatingNode),
/* harmony export */   P6: () => (/* binding */ FloatingTree),
/* harmony export */   R1: () => (/* binding */ useFloatingParentNodeId),
/* harmony export */   cq: () => (/* binding */ useFloatingTree),
/* harmony export */   fI: () => (/* binding */ useFloatingNodeId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47247);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14187);
/* harmony import */ var _FloatingTreeStore_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(54285);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ useFloatingParentNodeId,useFloatingTree,useFloatingNodeId,FloatingNode,FloatingTree auto */ 





const FloatingNodeContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (false) {}
const FloatingTreeContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
/**
 * Returns the parent node id for nested floating elements, if available.
 * Returns `null` for top-level floating elements.
 */ if (false) {}
const useFloatingParentNodeId = ()=>react__WEBPACK_IMPORTED_MODULE_0__.useContext(FloatingNodeContext)?.id || null;
/**
 * Returns the nearest floating tree context, if available.
 */ const useFloatingTree = (externalTree)=>{
    const contextTree = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FloatingTreeContext);
    return externalTree ?? contextTree;
};
/**
 * Registers a node into the `FloatingTree`, returning its id.
 * @see https://floating-ui.com/docs/FloatingTree
 */ function useFloatingNodeId(externalTree) {
    const id = (0,_base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_2__/* .useId */ .B)();
    const tree = useFloatingTree(externalTree);
    const parentId = useFloatingParentNodeId();
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!id) {
            return undefined;
        }
        const node = {
            id,
            parentId
        };
        tree?.addNode(node);
        return ()=>{
            tree?.removeNode(node);
        };
    }, [
        tree,
        id,
        parentId
    ]);
    return id;
}
/**
 * Provides parent node context for nested floating elements.
 * @see https://floating-ui.com/docs/FloatingTree
 * @internal
 */ function FloatingNode(props) {
    const { children, id } = props;
    const parentId = useFloatingParentNodeId();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FloatingNodeContext.Provider, {
        value: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
                id,
                parentId
            }), [
            id,
            parentId
        ]),
        children: children
    });
}
/**
 * Provides context for nested floating elements when they are not children of
 * each other on the DOM.
 * This is not necessary in all cases, except when there must be explicit communication between parent and child floating elements. It is necessary for:
 * - The `bubbles` option in the `useDismiss()` Hook
 * - Nested virtual list navigation
 * - Nested floating elements that each open on hover
 * - Custom communication between parent and child floating elements
 * @see https://floating-ui.com/docs/FloatingTree
 * @internal
 */ function FloatingTree(props) {
    const { children, externalTree } = props;
    const tree = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_4__/* .useRefWithInit */ .j)(()=>externalTree ?? new _FloatingTreeStore_mjs__WEBPACK_IMPORTED_MODULE_5__/* .FloatingTreeStore */ .k()).current;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FloatingTreeContext.Provider, {
        value: tree,
        children: children
    });
}


/***/ }),

/***/ 83323:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $u: () => (/* binding */ isTypeableElement),
/* harmony export */   F2: () => (/* binding */ isEventTargetWithin),
/* harmony export */   H5: () => (/* binding */ isInteractiveElement),
/* harmony export */   Hi: () => (/* binding */ isTargetInsideEnabledTrigger),
/* harmony export */   WZ: () => (/* binding */ isTypeableCombobox),
/* harmony export */   em: () => (/* binding */ matchesFocusVisible),
/* harmony export */   nd: () => (/* binding */ getFloatingFocusElement),
/* harmony export */   tZ: () => (/* binding */ isRootElement)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48232);
/* harmony import */ var _base_ui_utils_shadowDom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93093);
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3940);
/* harmony import */ var _tooltip_trigger_TooltipTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39196);






function isTargetInsideEnabledTrigger(target, triggerElements) {
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(target)) {
    return false;
  }
  const targetElement = target;
  if (triggerElements.hasElement(targetElement)) {
    return !targetElement.hasAttribute(_tooltip_trigger_TooltipTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .triggerDisabled */ .d);
  }
  for (const [, trigger] of triggerElements.entries()) {
    if ((0,_base_ui_utils_shadowDom__WEBPACK_IMPORTED_MODULE_2__/* .contains */ .gR)(trigger, targetElement)) {
      return !trigger.hasAttribute(_tooltip_trigger_TooltipTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .triggerDisabled */ .d);
    }
  }
  return false;
}
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }
  if ('composedPath' in event) {
    return event.composedPath().includes(node);
  }

  // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
  const eventAgain = event;
  return eventAgain.target != null && node.contains(eventAgain.target);
}
function isRootElement(element) {
  return element.matches('html,body');
}
function isTypeableElement(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element) && element.matches(_constants_mjs__WEBPACK_IMPORTED_MODULE_3__/* .TYPEABLE_SELECTOR */ .BT);
}
function isInteractiveElement(element) {
  return (0,_base_ui_utils_shadowDom__WEBPACK_IMPORTED_MODULE_2__/* .closest */ .kp)(element, `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${_constants_mjs__WEBPACK_IMPORTED_MODULE_3__/* .TYPEABLE_SELECTOR */ .BT}`) != null;
}
function isTypeableCombobox(element) {
  if (!element) {
    return false;
  }
  return element.getAttribute('role') === 'combobox' && isTypeableElement(element);
}
function matchesFocusVisible(element) {
  // We don't want to block focus from working with `visibleOnly`
  // (JSDOM doesn't match `:focus-visible` when the element has `:focus`)
  if (!element || _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_4__/* .jsdom */ .I) {
    return true;
  }
  try {
    return element.matches(':focus-visible');
  } catch (_e) {
    return true;
  }
}
function getFloatingFocusElement(floatingElement) {
  if (!floatingElement) {
    return null;
  }
  // Try to find the element that has `{...getFloatingProps()}` spread on it.
  // This indicates the floating element is acting as a positioning wrapper, and
  // so focus should be managed on the child element with the event handlers and
  // aria props.
  return floatingElement.hasAttribute(_constants_mjs__WEBPACK_IMPORTED_MODULE_3__/* .FOCUSABLE_ATTRIBUTE */ .Ed) ? floatingElement : floatingElement.querySelector(`[${_constants_mjs__WEBPACK_IMPORTED_MODULE_3__/* .FOCUSABLE_ATTRIBUTE */ .Ed}]`) || floatingElement;
}

/***/ }),

/***/ 83954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ useOpenInteractionType),
/* harmony export */   L: () => (/* binding */ useOpenMethodTriggerProps)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useEnhancedClickHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4802);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97827);
/* harmony import */ var _internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42240);
/* __next_internal_client_entry_do_not_use__ useOpenMethodTriggerProps,useOpenInteractionType auto */ 




function useOpenMethodTriggerProps(open, setOpenMethod) {
    const handleTriggerClick = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)((_, interactionType)=>{
        const isOpen = typeof open === 'function' ? open() : open;
        if (!isOpen) {
            setOpenMethod(interactionType || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
            // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
            // will be "" in that case.
            (_base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_2__/* .ios */ .s4 ? 'touch' : ''));
        }
    });
    const { onClick, onPointerDown } = (0,_base_ui_utils_useEnhancedClickHandler__WEBPACK_IMPORTED_MODULE_3__/* .useEnhancedClickHandler */ .O)(handleTriggerClick);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            onClick,
            onPointerDown
        }), [
        onClick,
        onPointerDown
    ]);
}
/**
 * Determines the interaction type (keyboard, mouse, touch, etc.) that opened the component.
 *
 * @param open The open state of the component.
 */ function useOpenInteractionType(open) {
    const [openMethod, setOpenMethod] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const triggerProps = useOpenMethodTriggerProps(open, setOpenMethod);
    (0,_internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useValueChanged */ .x)(open, (previousOpen)=>{
        if (previousOpen && !open) {
            setOpenMethod(null);
        }
    });
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            openMethod,
            triggerProps
        }), [
        openMethod,
        triggerProps
    ]);
}


/***/ }),

/***/ 84052:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GW: () => (/* binding */ popupStateMapping),
/* harmony export */   LM: () => (/* binding */ popupTransitionStateMapping),
/* harmony export */   jL: () => (/* binding */ pressableTriggerOpenStateMapping),
/* harmony export */   qV: () => (/* binding */ triggerOpenStateMapping)
/* harmony export */ });
/* harmony import */ var _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41900);
/* harmony import */ var _CommonPopupDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47733);
/* harmony import */ var _CommonTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86211);




const TRIGGER_HOOK = {
  [_CommonTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .popupOpen */ .L]: ''
};
const PRESSABLE_TRIGGER_HOOK = {
  [_CommonTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .popupOpen */ .L]: '',
  [_CommonTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .pressed */ .V]: ''
};
const POPUP_OPEN_HOOK = {
  [_CommonPopupDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .open */ .ho]: ''
};
const POPUP_CLOSED_HOOK = {
  [_CommonPopupDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .closed */ .$h]: ''
};
const ANCHOR_HIDDEN_HOOK = {
  [_CommonPopupDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .anchorHidden */ .ii]: ''
};
const triggerOpenStateMapping = {
  open(value) {
    if (value) {
      return TRIGGER_HOOK;
    }
    return null;
  }
};
const pressableTriggerOpenStateMapping = {
  open(value) {
    if (value) {
      return PRESSABLE_TRIGGER_HOOK;
    }
    return null;
  }
};
const popupStateMapping = {
  open(value) {
    if (value) {
      return POPUP_OPEN_HOOK;
    }
    return POPUP_CLOSED_HOOK;
  },
  anchorHidden(value) {
    if (value) {
      return ANCHOR_HIDDEN_HOOK;
    }
    return null;
  }
};
const popupTransitionStateMapping = {
  ...popupStateMapping,
  ..._internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_2__/* .transitionStatusMapping */ .G
};

/***/ }),

/***/ 84905:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ FloatingFocusManager)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(14718);
/* harmony import */ var _base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(12046);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(55218);
/* harmony import */ var _base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2474);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(64951);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(15495);
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(18813);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(81456);
/* harmony import */ var _utils_FocusGuard_mjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(6522);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(93093);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83323);
/* harmony import */ var _utils_event_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17947);
/* harmony import */ var _utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(99226);
/* harmony import */ var _utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(92044);
/* harmony import */ var _utils_composite_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(86058);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(76175);
/* harmony import */ var _utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(74831);
/* harmony import */ var _utils_enqueueFocus_mjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(85489);
/* harmony import */ var _utils_markOthers_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(22193);
/* harmony import */ var _FloatingPortal_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(34934);
/* harmony import */ var _FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(80120);
/* harmony import */ var _internals_constants_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(69679);
/* harmony import */ var _utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(33654);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ FloatingFocusManager auto */ 



























function getEventType(event, lastInteractionType) {
    const win = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .getWindow */ .zk)((0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getTarget */ .EW)(event));
    if (event instanceof win.KeyboardEvent) {
        return 'keyboard';
    }
    if (event instanceof win.FocusEvent) {
        // Focus events can be caused by a preceding pointer interaction (e.g., focusout on outside press).
        // Prefer the last known pointer type if provided, else treat as keyboard.
        return lastInteractionType || 'keyboard';
    }
    if ('pointerType' in event) {
        // A trusted click without a pointerType is keyboard/AT; only synthesized
        // clicks (e.g. a test harness) pair an empty pointerType with a click count.
        return event.pointerType || ((0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_4__/* .isVirtualClick */ .YF)(event) ? 'keyboard' : lastInteractionType || 'mouse');
    }
    if ('touches' in event) {
        return 'touch';
    }
    if (event instanceof win.MouseEvent) {
        // onClick events may not contain pointer events, and will fall through to here
        return lastInteractionType || (event.detail === 0 ? 'keyboard' : 'mouse');
    }
    return '';
}
const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function clearDisconnectedPreviouslyFocusedElements() {
    previouslyFocusedElements = previouslyFocusedElements.filter((entry)=>{
        return entry.deref()?.isConnected;
    });
}
function addPreviouslyFocusedElement(element) {
    clearDisconnectedPreviouslyFocusedElements();
    if (element && (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .getNodeName */ .mq)(element) !== 'body') {
        previouslyFocusedElements.push(new WeakRef(element));
        if (previouslyFocusedElements.length > LIST_LIMIT) {
            previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
        }
    }
}
function getPreviouslyFocusedElement() {
    clearDisconnectedPreviouslyFocusedElements();
    return previouslyFocusedElements[previouslyFocusedElements.length - 1]?.deref();
}
function getFirstTabbableElement(container) {
    if (!container) {
        return null;
    }
    if ((0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isTabbable */ .AO)(container)) {
        return container;
    }
    return (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .tabbable */ .Kr)(container)[0] || container;
}
function handleTabIndex(floatingFocusElement) {
    if (floatingFocusElement.hasAttribute('tabindex') && !floatingFocusElement.hasAttribute('data-tabindex')) {
        return;
    }
    if (!floatingFocusElement.getAttribute('role')?.includes('dialog')) {
        return;
    }
    const focusableElements = (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .focusable */ .nq)(floatingFocusElement);
    const tabbableContent = focusableElements.filter((element)=>{
        const dataTabIndex = element.getAttribute('data-tabindex') || '';
        return (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isTabbable */ .AO)(element) || element.hasAttribute('data-tabindex') && !dataTabIndex.startsWith('-');
    });
    const tabIndex = floatingFocusElement.getAttribute('tabindex');
    if (tabbableContent.length === 0) {
        if (tabIndex !== '0') {
            floatingFocusElement.setAttribute('tabindex', '0');
            // Mark our own write so the externally-managed early-return above doesn't
            // mistake it for a user-authored `tabindex` and freeze management.
            floatingFocusElement.setAttribute('data-tabindex', '0');
        }
    } else if (tabIndex !== '-1' || floatingFocusElement.hasAttribute('data-tabindex') && floatingFocusElement.getAttribute('data-tabindex') !== '-1') {
        floatingFocusElement.setAttribute('tabindex', '-1');
        floatingFocusElement.setAttribute('data-tabindex', '-1');
    }
}
/**
 * Provides focus management for the floating element.
 * @see https://floating-ui.com/docs/FloatingFocusManager
 * @internal
 */ function FloatingFocusManager(props) {
    const { context: store, children, disabled = false, initialFocus = true, returnFocus = true, explicitReturnFocus, restoreFocus = false, modal = true, closeOnFocusOut = true, openInteractionType = '', nextFocusableElement, previousFocusableElement, beforeContentFocusGuardRef, externalTree, getInsideElements } = props;
    const open = store.useState('open');
    const domReference = store.useState('domReferenceElement');
    const floating = store.useState('floatingElement');
    const { events, dataRef } = store.context;
    const getNodeId = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)(()=>dataRef.current.floatingContext?.nodeId);
    const ignoreInitialFocus = initialFocus === false;
    // A typeable combobox reference (e.g. input/textarea) with `initialFocus={false}`
    // has different focus semantics: focus is not trapped inside the floating element,
    // so in the modal case the guards are not rendered, but `aria-hidden` is still
    // applied to the outside nodes.
    const isUntrappedTypeableCombobox = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .isTypeableCombobox */ .WZ)(domReference) && ignoreInitialFocus;
    const initialFocusRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_8__/* .useValueAsRef */ .u)(initialFocus);
    const returnFocusRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_8__/* .useValueAsRef */ .u)(returnFocus);
    // Read through a ref so a mid-open change can't re-run the return-focus effect, whose cleanup
    // would move focus while the floating element is still open.
    const explicitReturnFocusRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_8__/* .useValueAsRef */ .u)(explicitReturnFocus);
    const openInteractionTypeRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_8__/* .useValueAsRef */ .u)(openInteractionType);
    const openRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_8__/* .useValueAsRef */ .u)(open);
    const tree = (0,_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_9__/* .useFloatingTree */ .cq)(externalTree);
    const portalContext = (0,_FloatingPortal_mjs__WEBPACK_IMPORTED_MODULE_10__/* .usePortalContext */ .vB)();
    const preventReturnFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const isPointerDownRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const pointerDownOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const lastFocusedTabbableRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const closeTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef('');
    const lastInteractionTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef('');
    const beforeGuardRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const afterGuardRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const mergedBeforeGuardRef = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_11__/* .useMergedRefs */ .a)(beforeGuardRef, beforeContentFocusGuardRef, portalContext?.beforeInsideRef);
    const mergedAfterGuardRef = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_11__/* .useMergedRefs */ .a)(afterGuardRef, portalContext?.afterInsideRef);
    const blurTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__/* .useTimeout */ .Z)();
    const pointerDownTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_12__/* .useTimeout */ .Z)();
    const restoreFocusFrame = (0,_base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_13__/* .useAnimationFrame */ .NR)();
    const isInsidePortal = portalContext != null;
    const floatingFocusElement = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .getFloatingFocusElement */ .nd)(floating);
    const getTabbableContent = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)((container = floatingFocusElement)=>{
        return container ? (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .tabbable */ .Kr)(container) : [];
    });
    const getResolvedInsideElements = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)(()=>getInsideElements?.().filter((element)=>element != null) ?? []);
    // Prevent Tab from escaping the modal when there are no tabbable elements.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (disabled || !modal) {
            return undefined;
        }
        function onKeyDown(event) {
            if (event.key === 'Tab') {
                // The focus guards have nothing to focus, so we need to stop the event.
                if ((0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(floatingFocusElement, (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .activeElement */ .RS)((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_14__/* .ownerDocument */ .R)(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
                    (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_4__/* .stopEvent */ .jo)(event);
                }
            }
        }
        const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_14__/* .ownerDocument */ .R)(floatingFocusElement);
        return (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(doc, 'keydown', onKeyDown);
    }, [
        disabled,
        floatingFocusElement,
        modal,
        isUntrappedTypeableCombobox,
        getTabbableContent
    ]);
    // Track pointer/keyboard interactions to disambiguate focus and outside presses.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (disabled || !open) {
            return undefined;
        }
        const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_14__/* .ownerDocument */ .R)(floatingFocusElement);
        function clearPointerDownOutside() {
            pointerDownOutsideRef.current = false;
        }
        function onPointerDown(event) {
            const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getTarget */ .EW)(event);
            const insideElements = getResolvedInsideElements();
            const pointerTargetInside = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(floating, target) || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(domReference, target) || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(portalContext?.portalNode, target) || insideElements.some((element)=>element === target || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(element, target));
            pointerDownOutsideRef.current = !pointerTargetInside;
            lastInteractionTypeRef.current = event.pointerType || 'keyboard';
            if ((0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .closest */ .kp)(target, `[${_internals_constants_mjs__WEBPACK_IMPORTED_MODULE_16__/* .CLICK_TRIGGER_IDENTIFIER */ .Kd}]`)) {
                isPointerDownRef.current = true;
                // Reset on the next tick so a single click on a click-trigger doesn't
                // permanently suppress focus-out closing for the lifetime of the instance.
                pointerDownTimeout.start(0, ()=>{
                    isPointerDownRef.current = false;
                });
            }
        }
        function onKeyDown() {
            lastInteractionTypeRef.current = 'keyboard';
        }
        return (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_17__/* .mergeCleanups */ .g)((0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(doc, 'pointerdown', onPointerDown, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(doc, 'pointerup', clearPointerDownOutside, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(doc, 'pointercancel', clearPointerDownOutside, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(doc, 'keydown', onKeyDown, true), // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
        // if the popup dismissed between pointerdown and pointerup.
        clearPointerDownOutside);
    }, [
        disabled,
        floating,
        domReference,
        floatingFocusElement,
        open,
        portalContext,
        pointerDownTimeout,
        getResolvedInsideElements
    ]);
    // Close on focus out and restore focus within the floating tree when needed.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (disabled || !closeOnFocusOut) {
            return undefined;
        }
        const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_14__/* .ownerDocument */ .R)(floatingFocusElement);
        // In Safari, buttons lose focus when pressing them.
        function handlePointerDown() {
            isPointerDownRef.current = true;
            pointerDownTimeout.start(0, ()=>{
                isPointerDownRef.current = false;
            });
        }
        function handleFocusIn(event) {
            const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getTarget */ .EW)(event);
            if ((0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isTabbable */ .AO)(target)) {
                lastFocusedTabbableRef.current = target;
            }
        }
        function handleFocusOutside(event) {
            const relatedTarget = event.relatedTarget;
            const currentTarget = event.currentTarget;
            const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getTarget */ .EW)(event);
            // When focus is lost to the body (e.g. on a backdrop press), record the element that
            // had focus so a confirmation dialog opened while the body is focused can return focus
            // to it. Scoped to `modal` to avoid non-modal popups polluting the shared stack.
            if (modal && relatedTarget == null && target != null && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(floating, target)) {
                addPreviouslyFocusedElement(target);
            }
            queueMicrotask(()=>{
                const nodeId = getNodeId();
                const triggers = store.context.triggerElements;
                const insideElements = getResolvedInsideElements();
                const isRelatedFocusGuard = relatedTarget?.hasAttribute((0,_utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createAttribute */ .F)('focus-guard')) && [
                    beforeGuardRef.current,
                    afterGuardRef.current,
                    portalContext?.beforeInsideRef.current,
                    portalContext?.afterInsideRef.current,
                    portalContext?.beforeOutsideRef.current,
                    portalContext?.afterOutsideRef.current,
                    (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_19__/* .resolveRef */ .q)(previousFocusableElement),
                    (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_19__/* .resolveRef */ .q)(nextFocusableElement)
                ].includes(relatedTarget);
                const movedToUnrelatedNode = !((0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(domReference, relatedTarget) || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(floating, relatedTarget) || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(relatedTarget, floating) || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(portalContext?.portalNode, relatedTarget) || insideElements.some((element)=>element === relatedTarget || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(element, relatedTarget)) || triggers.hasMatchingElement((trigger)=>(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(trigger, relatedTarget)) || isRelatedFocusGuard || tree && ((0,_utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_20__/* .getNodeChildren */ .C)(tree.nodesRef.current, nodeId).find((node)=>(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(node.context?.elements.floating, relatedTarget) || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(node.context?.elements.domReference, relatedTarget)) || (0,_utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_20__/* .getNodeAncestors */ .$)(tree.nodesRef.current, nodeId).find((node)=>[
                        node.context?.elements.floating,
                        (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .getFloatingFocusElement */ .nd)(node.context?.elements.floating)
                    ].includes(relatedTarget) || node.context?.elements.domReference === relatedTarget)));
                if (currentTarget === domReference && floatingFocusElement) {
                    handleTabIndex(floatingFocusElement);
                }
                // Restore focus to the previously focused tabbable element to prevent
                // focus from being lost outside the floating tree.
                if (restoreFocus && currentTarget !== domReference && !(0,_utils_composite_mjs__WEBPACK_IMPORTED_MODULE_21__/* .isElementVisible */ .J9)(target) && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .activeElement */ .RS)(doc) === doc.body) {
                    // Let `FloatingPortal` effect knows that focus is still inside the
                    // floating tree.
                    if ((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .sb)(floatingFocusElement)) {
                        floatingFocusElement.focus();
                        // If explicitly requested to restore focus to the popup container, do not search
                        // for the next/previous tabbable element.
                        if (restoreFocus === 'popup') {
                            // If the focused element is removed on pointerdown, the browser
                            // tries to move focus to it right after the `.focus()` call above,
                            // but because it's removed in the same tick, focus is lost instead.
                            // Re-focusing asynchronously (next frame) wins that race.
                            restoreFocusFrame.request(()=>{
                                floatingFocusElement.focus();
                            });
                            return;
                        }
                    }
                    const tabbableContent = getTabbableContent();
                    const prevTabbable = lastFocusedTabbableRef.current;
                    const nodeToFocus = (prevTabbable && tabbableContent.includes(prevTabbable) ? prevTabbable : null) || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
                    if ((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .sb)(nodeToFocus)) {
                        nodeToFocus.focus();
                    }
                }
                // https://github.com/floating-ui/floating-ui/issues/3060
                if (dataRef.current.insideReactTree) {
                    dataRef.current.insideReactTree = false;
                    return;
                }
                // Focus did not move inside the floating tree, and there are no tabbable
                // portal guards to handle closing.
                if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
                // For an "untrapped" typeable combobox (input role=combobox with
                // initialFocus=false), re-opening the popup and tabbing out should still close it even
                // when the previously focused element (e.g. the next tabbable outside the popup) is
                // focused again. Otherwise, the popup remains open on the second Tab sequence:
                // click input -> Tab (closes) -> click input -> Tab.
                // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
                (isUntrappedTypeableCombobox || relatedTarget !== getPreviouslyFocusedElement())) {
                    preventReturnFocusRef.current = true;
                    store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_22__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_23__/* .focusOut */ .Xn, event));
                }
            });
        }
        function markInsideReactTree() {
            if (pointerDownOutsideRef.current) {
                return;
            }
            dataRef.current.insideReactTree = true;
            blurTimeout.start(0, ()=>{
                dataRef.current.insideReactTree = false;
            });
        }
        const domReferenceElement = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .sb)(domReference) ? domReference : null;
        if (!floating && !domReferenceElement) {
            return undefined;
        }
        return (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_17__/* .mergeCleanups */ .g)(domReferenceElement && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(domReferenceElement, 'focusout', handleFocusOutside), domReferenceElement && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(domReferenceElement, 'pointerdown', handlePointerDown), floating && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(floating, 'focusin', handleFocusIn), floating && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(floating, 'focusout', handleFocusOutside), floating && portalContext && (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_15__/* .addEventListener */ .q)(floating, 'focusout', markInsideReactTree, true));
    }, [
        disabled,
        domReference,
        floating,
        floatingFocusElement,
        modal,
        tree,
        portalContext,
        store,
        closeOnFocusOut,
        restoreFocus,
        getTabbableContent,
        isUntrappedTypeableCombobox,
        getNodeId,
        dataRef,
        blurTimeout,
        pointerDownTimeout,
        restoreFocusFrame,
        nextFocusableElement,
        previousFocusableElement,
        getResolvedInsideElements
    ]);
    // Hide everything outside the floating tree from assistive tech while open.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (disabled || !floating || !open) {
            return undefined;
        }
        // Don't hide portals nested within the parent portal.
        const portalNodes = Array.from(portalContext?.portalNode?.querySelectorAll(`[${(0,_utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createAttribute */ .F)('portal')}]`) || []);
        const ancestors = tree ? (0,_utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_20__/* .getNodeAncestors */ .$)(tree.nodesRef.current, getNodeId()) : [];
        const rootAncestorComboboxDomReference = ancestors.find((node)=>(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .isTypeableCombobox */ .WZ)(node.context?.elements.domReference || null))?.context?.elements.domReference;
        const controlInsideElements = [
            floating,
            ...portalNodes,
            beforeGuardRef.current,
            afterGuardRef.current,
            portalContext?.beforeOutsideRef.current,
            portalContext?.afterOutsideRef.current,
            ...getResolvedInsideElements()
        ];
        const insideElements = [
            ...controlInsideElements,
            rootAncestorComboboxDomReference,
            (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_19__/* .resolveRef */ .q)(previousFocusableElement),
            (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_19__/* .resolveRef */ .q)(nextFocusableElement),
            isUntrappedTypeableCombobox ? domReference : null
        ].filter((x)=>x != null);
        const ariaHiddenCleanup = (0,_utils_markOthers_mjs__WEBPACK_IMPORTED_MODULE_24__/* .markOthers */ .X)(insideElements, {
            ariaHidden: modal || isUntrappedTypeableCombobox,
            mark: false
        });
        const markerInsideElements = [
            floating,
            ...portalNodes
        ].filter((x)=>x != null);
        const markerCleanup = (0,_utils_markOthers_mjs__WEBPACK_IMPORTED_MODULE_24__/* .markOthers */ .X)(markerInsideElements);
        return ()=>{
            markerCleanup();
            ariaHiddenCleanup();
        };
    }, [
        open,
        disabled,
        domReference,
        floating,
        modal,
        portalContext,
        isUntrappedTypeableCombobox,
        tree,
        getNodeId,
        nextFocusableElement,
        previousFocusableElement,
        getResolvedInsideElements
    ]);
    // Focus the initial element when the floating element opens.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_25__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open || disabled || !(0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .sb)(floatingFocusElement)) {
            return;
        }
        closeTypeRef.current = '';
        lastInteractionTypeRef.current = '';
        const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_14__/* .ownerDocument */ .R)(floatingFocusElement);
        const previouslyFocusedElement = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .activeElement */ .RS)(doc);
        // Wait for any layout effect state setters to execute to set `tabIndex`.
        queueMicrotask(()=>{
            const initialFocusValueOrFn = initialFocusRef.current;
            const resolvedInitialFocus = typeof initialFocusValueOrFn === 'function' ? initialFocusValueOrFn(openInteractionTypeRef.current || '') : initialFocusValueOrFn;
            // `null` should fallback to default behavior in case of an empty ref.
            if (resolvedInitialFocus === undefined || resolvedInitialFocus === false) {
                return;
            }
            const focusAlreadyInsideFloatingEl = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(floatingFocusElement, previouslyFocusedElement);
            if (focusAlreadyInsideFloatingEl) {
                return;
            }
            let focusableElements = null;
            const getDefaultFocusElement = ()=>{
                if (focusableElements == null) {
                    focusableElements = getTabbableContent(floatingFocusElement);
                }
                return focusableElements[0] || floatingFocusElement;
            };
            let elToFocus;
            if (resolvedInitialFocus === true || resolvedInitialFocus === null) {
                elToFocus = getDefaultFocusElement();
            } else {
                elToFocus = (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_19__/* .resolveRef */ .q)(resolvedInitialFocus);
            }
            elToFocus = elToFocus || getDefaultFocusElement();
            const hadFocusInside = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(floatingFocusElement, (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .activeElement */ .RS)(doc));
            // Screen readers re-sync focus to their cursor right after a synthesized press. A focus
            // that lands a frame later reads as a stray move and gets pulled back to the reference.
            const openEvent = dataRef.current.openEvent;
            const openedByVirtualPress = openEvent?.type === 'mousedown' && (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_4__/* .isVirtualClick */ .YF)(openEvent);
            // enqueueFocus returns a rAF-cancel function; we intentionally don't cancel this focus.
            void (0,_utils_enqueueFocus_mjs__WEBPACK_IMPORTED_MODULE_26__/* .enqueueFocus */ .p)(elToFocus, {
                sync: openedByVirtualPress,
                preventScroll: elToFocus === floatingFocusElement,
                shouldFocus () {
                    // If the floating element has closed before this runs — e.g. tabbing out of a
                    // kept-mounted popup — don't pull focus back onto the initial element after it has
                    // legitimately moved elsewhere.
                    if (!openRef.current) {
                        return false;
                    }
                    if (hadFocusInside) {
                        return true;
                    }
                    const currentActiveElement = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .activeElement */ .RS)(doc);
                    const focusMovedInside = currentActiveElement !== elToFocus && (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(floatingFocusElement, currentActiveElement);
                    return !focusMovedInside;
                }
            });
        });
    }, [
        disabled,
        open,
        floatingFocusElement,
        getTabbableContent,
        initialFocusRef,
        openInteractionTypeRef,
        openRef,
        dataRef
    ]);
    // A return-focus queued by the effect cleanup. If the effect re-arms in the same commit, a
    // dependency changed while the popup stayed open, so the cleanup was not a close.
    const pendingReturnFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    // Track return focus targets and restore focus on unmount/close.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_25__/* .useIsoLayoutEffect */ .g)(()=>{
        if (disabled || !floatingFocusElement) {
            pendingReturnFocusRef.current = null;
            return undefined;
        }
        if (pendingReturnFocusRef.current) {
            pendingReturnFocusRef.current.cancelled = true;
            pendingReturnFocusRef.current = null;
        }
        const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_14__/* .ownerDocument */ .R)(floatingFocusElement);
        const elementFocusedBeforeOpen = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .activeElement */ .RS)(doc);
        // Only an explicit `null` interaction type represents a programmatic open.
        // `undefined` is normalized to `''` by the prop default, so it never reaches
        // here as nullish and is intentionally not treated as programmatic.
        const preferPreviousFocus = openInteractionTypeRef.current == null;
        addPreviouslyFocusedElement(elementFocusedBeforeOpen);
        function onOpenChangeLocal(details) {
            if (!details.open) {
                closeTypeRef.current = getEventType(details.nativeEvent, lastInteractionTypeRef.current);
            }
            // Focus guards transfer focus themselves; other close handlers may still need return focus.
            if (details.reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_23__/* .focusOut */ .Xn && details.triggerElement?.hasAttribute((0,_utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createAttribute */ .F)('focus-guard')) || details.reason === _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_23__/* .triggerHover */ .N7 && details.nativeEvent.type === 'mouseleave') {
                preventReturnFocusRef.current = true;
            }
            if (details.reason !== _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_23__/* .outsidePress */ .Np) {
                return;
            }
            if (details.nested) {
                preventReturnFocusRef.current = false;
            } else if ((0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_4__/* .isVirtualClick */ .YF)(details.nativeEvent) || (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_4__/* .isVirtualPointerEvent */ .Pg)(details.nativeEvent)) {
                preventReturnFocusRef.current = false;
            } else {
                // On outside press, only return focus to the reference when the browser supports the
                // `focus({ preventScroll })` option; without it, restoring focus scrolls the page.
                // Chrome on Android and Samsung Internet still don't support `preventScroll`
                // (https://issues.chromium.org/issues/41453122), so the runtime check keeps return
                // focus disabled there to avoid the scroll jump.
                let isPreventScrollSupported = false;
                (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_14__/* .ownerDocument */ .R)(floatingFocusElement).createElement('div').focus({
                    get preventScroll () {
                        isPreventScrollSupported = true;
                        return false;
                    }
                });
                if (isPreventScrollSupported) {
                    preventReturnFocusRef.current = false;
                } else {
                    preventReturnFocusRef.current = true;
                }
            }
        }
        events.on('openchange', onOpenChangeLocal);
        function getReturnElement(closeType) {
            const returnFocusValueOrFn = returnFocusRef.current;
            let resolvedReturnFocusValue = typeof returnFocusValueOrFn === 'function' ? returnFocusValueOrFn(closeType) : returnFocusValueOrFn;
            // `null` should fallback to default behavior in case of an empty ref.
            if (resolvedReturnFocusValue === undefined || resolvedReturnFocusValue === false) {
                return null;
            }
            if (resolvedReturnFocusValue === null) {
                resolvedReturnFocusValue = true;
            }
            const referenceReturnElement = domReference?.isConnected ? domReference : null;
            const previousReturnElement = elementFocusedBeforeOpen?.isConnected && (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .getNodeName */ .mq)(elementFocusedBeforeOpen) !== 'body' ? elementFocusedBeforeOpen : null;
            let defaultReturnElement = preferPreviousFocus ? previousReturnElement || referenceReturnElement : referenceReturnElement || previousReturnElement;
            if (!defaultReturnElement) {
                defaultReturnElement = getPreviouslyFocusedElement() || null;
            }
            if (typeof resolvedReturnFocusValue === 'boolean') {
                return defaultReturnElement;
            }
            return (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_19__/* .resolveRef */ .q)(resolvedReturnFocusValue) || defaultReturnElement || null;
        }
        return ()=>{
            events.off('openchange', onOpenChangeLocal);
            const activeEl = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .activeElement */ .RS)(doc);
            const insideElements = getResolvedInsideElements();
            const isFocusInsideFloatingTree = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(floating, activeEl) || insideElements.some((element)=>element === activeEl || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(element, activeEl)) || tree && (0,_utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_20__/* .getNodeChildren */ .C)(tree.nodesRef.current, getNodeId(), false).some((node)=>(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(node.context?.elements.floating, activeEl));
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const returnFocusValueOrFn = returnFocusRef.current;
            const closeType = closeTypeRef.current;
            const returnElement = getReturnElement(closeType);
            const job = {
                cancelled: false
            };
            pendingReturnFocusRef.current = job;
            queueMicrotask(()=>{
                if (pendingReturnFocusRef.current === job) {
                    pendingReturnFocusRef.current = null;
                }
                // `returnElement` if it is tabbable, otherwise its first tabbable child,
                // otherwise `returnElement` itself (which may not be tabbable at all).
                const tabbableReturnElement = getFirstTabbableElement(returnElement);
                // Read in the cleanup on purpose: the latest `explicitReturnFocus` decides.
                const hasExplicitReturnFocus = // eslint-disable-next-line react-hooks/exhaustive-deps
                explicitReturnFocusRef.current ?? typeof returnFocusValueOrFn !== 'boolean';
                if (!job.cancelled && returnFocusValueOrFn && !preventReturnFocusRef.current && (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .sb)(tabbableReturnElement) && // If the focus moved somewhere else after mount, avoid returning focus
                // since it likely entered a different element which should be
                // respected: https://github.com/floating-ui/floating-ui/issues/2607
                (!hasExplicitReturnFocus && tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) {
                    const focusOptions = {
                        preventScroll: true
                    };
                    if (closeType === 'keyboard') {
                        focusOptions.focusVisible = true;
                    }
                    tabbableReturnElement.focus(focusOptions);
                }
                // A cancelled return must also clear suppression before the next close.
                preventReturnFocusRef.current = false;
            });
        };
    }, [
        disabled,
        floating,
        floatingFocusElement,
        returnFocusRef,
        explicitReturnFocusRef,
        openInteractionTypeRef,
        events,
        tree,
        domReference,
        getNodeId,
        getResolvedInsideElements
    ]);
    // Safari may randomly scroll to the bottom of the page if an input inside a popup has focus
    // when the popup unmounts from the DOM.
    // By blurring it before the popup unmounts, we can prevent this behavior.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_25__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!_base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_27__/* .webkit */ .Fp || open || !floating) {
            return;
        }
        const activeEl = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .activeElement */ .RS)((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_14__/* .ownerDocument */ .R)(floating));
        if (!(0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .sb)(activeEl) || !(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .isTypeableElement */ .$u)(activeEl)) {
            return;
        }
        if ((0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_3__/* .contains */ .gR)(floating, activeEl)) {
            activeEl.blur();
        }
    }, [
        open,
        floating
    ]);
    // Synchronize the focus manager state (modal, closeOnFocusOut, open, etc.) to the
    // FloatingPortal context, which uses it to decide whether to render its own guards.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_25__/* .useIsoLayoutEffect */ .g)(()=>{
        if (disabled || !portalContext) {
            return undefined;
        }
        portalContext.setFocusManagerState({
            modal,
            closeOnFocusOut,
            open,
            onOpenChange: store.setOpen,
            domReference
        });
        return ()=>{
            portalContext.setFocusManagerState(null);
        };
    }, [
        disabled,
        portalContext,
        modal,
        open,
        store,
        closeOnFocusOut,
        domReference
    ]);
    // Keep the floating element tabIndex in sync and clear stale focus records.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_25__/* .useIsoLayoutEffect */ .g)(()=>{
        if (disabled || !floatingFocusElement) {
            return undefined;
        }
        handleTabIndex(floatingFocusElement);
        return ()=>{
            queueMicrotask(clearDisconnectedPreviouslyFocusedElements);
        };
    }, [
        disabled,
        floatingFocusElement
    ]);
    const shouldRenderGuards = !disabled && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            shouldRenderGuards && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_FocusGuard_mjs__WEBPACK_IMPORTED_MODULE_28__/* .FocusGuard */ .U, {
                "data-type": "inside",
                ref: mergedBeforeGuardRef,
                onFocus: (event)=>{
                    if (modal) {
                        const els = getTabbableContent();
                        // enqueueFocus returns a rAF-cancel function we don't need here.
                        void (0,_utils_enqueueFocus_mjs__WEBPACK_IMPORTED_MODULE_26__/* .enqueueFocus */ .p)(els[els.length - 1]);
                    } else if (portalContext?.portalNode) {
                        preventReturnFocusRef.current = false;
                        if ((0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isOutsideEvent */ .Qp)(event, portalContext.portalNode)) {
                            const nextTabbable = (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .getNextTabbable */ .vF)(domReference);
                            nextTabbable?.focus();
                        } else {
                            (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_19__/* .resolveRef */ .q)(previousFocusableElement ?? portalContext.beforeOutsideRef)?.focus();
                        }
                    }
                }
            }),
            children,
            shouldRenderGuards && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_utils_FocusGuard_mjs__WEBPACK_IMPORTED_MODULE_28__/* .FocusGuard */ .U, {
                "data-type": "inside",
                ref: mergedAfterGuardRef,
                onFocus: (event)=>{
                    if (modal) {
                        // enqueueFocus returns a rAF-cancel function we don't need here.
                        void (0,_utils_enqueueFocus_mjs__WEBPACK_IMPORTED_MODULE_26__/* .enqueueFocus */ .p)(getTabbableContent()[0]);
                    } else if (portalContext?.portalNode) {
                        if (closeOnFocusOut) {
                            preventReturnFocusRef.current = true;
                        }
                        if ((0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isOutsideEvent */ .Qp)(event, portalContext.portalNode)) {
                            const prevTabbable = (0,_utils_tabbable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .getPreviousTabbable */ .XJ)(domReference);
                            prevTabbable?.focus();
                        } else {
                            (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_19__/* .resolveRef */ .q)(nextFocusableElement ?? portalContext.afterOutsideRef)?.focus();
                        }
                    }
                }
            })
        ]
    });
}


/***/ }),

/***/ 85489:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ enqueueFocus)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8994);

let rafId = 0;
function enqueueFocus(el, options = {}) {
  const {
    preventScroll = false,
    sync = false,
    shouldFocus
  } = options;
  cancelAnimationFrame(rafId);
  function exec() {
    if (shouldFocus && !shouldFocus()) {
      return;
    }
    el?.focus({
      preventScroll
    });
  }
  if (sync) {
    exec();
    return _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__/* .NOOP */ .tE;
  }
  const currentRafId = requestAnimationFrame(exec);
  rafId = currentRafId;
  return () => {
    if (rafId === currentRafId) {
      cancelAnimationFrame(currentRafId);
      rafId = 0;
    }
  };
}

/***/ }),

/***/ 86211:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ popupOpen),
/* harmony export */   V: () => (/* binding */ pressed)
/* harmony export */ });
/**
 * Present when the popup is open.
 */
const popupOpen = 'data-popup-open';

/**
 * Present when a pressable trigger is pressed.
 */
const pressed = 'data-pressed';

/***/ }),

/***/ 87541:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ useDismiss)
/* harmony export */ });
/* unused harmony export normalizeProp */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(14718);
/* harmony import */ var _base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(12046);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(81456);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64951);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(15495);
/* harmony import */ var _components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80120);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(76175);
/* harmony import */ var _utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(74831);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(83323);
/* harmony import */ var _utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(93093);
/* harmony import */ var _utils_event_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17947);
/* harmony import */ var _utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(92044);
/* __next_internal_client_entry_do_not_use__ normalizeProp,useDismiss auto */ /* eslint-disable no-underscore-dangle */ 














function alwaysFalse() {
    return false;
}
function normalizeProp(normalizable) {
    return {
        escapeKey: typeof normalizable === 'boolean' ? normalizable : normalizable?.escapeKey ?? false,
        outsidePress: typeof normalizable === 'boolean' ? normalizable : normalizable?.outsidePress ?? true
    };
}
/**
 * Closes the floating element when a dismissal is requested — by default, when
 * the user presses the `escape` key or outside of the floating element.
 * @see https://floating-ui.com/docs/useDismiss
 */ function useDismiss(store, props = {}) {
    const { enabled = true, escapeKey = true, outsidePress: outsidePressProp = true, outsidePressEvent = 'sloppy', referencePress = alwaysFalse, bubbles, externalTree } = props;
    const open = store.useState('open');
    const floatingElement = store.useState('floatingElement');
    const { dataRef, events } = store.context;
    const tree = (0,_components_FloatingTree_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useFloatingTree */ .cq)(externalTree);
    const outsidePressFn = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)(typeof outsidePressProp === 'function' ? outsidePressProp : ()=>false);
    const outsidePress = typeof outsidePressProp === 'function' ? outsidePressFn : outsidePressProp;
    const outsidePressEnabled = outsidePress !== false;
    const getOutsidePressEventProp = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)(()=>outsidePressEvent);
    const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
    const pressStartedInsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const pressStartPreventedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    // Ignore only the very next outside click after dragging from inside to outside.
    const suppressNextOutsideClickRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    // A click whose press began before the floating element opened is the tail of that
    // gesture (e.g. the drag-release that opened it), not a new outside press.
    const sawPressWhileOpenRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const isComposingRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const currentPointerTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef('');
    const touchStateRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const cancelDismissOnEndTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__/* .useTimeout */ .Z)();
    const clearInsideReactTreeTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__/* .useTimeout */ .Z)();
    // Outlives effect re-runs so a pending reset can't leave `isComposingRef` stuck.
    const compositionTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__/* .useTimeout */ .Z)();
    const clearInsideReactTree = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)(()=>{
        clearInsideReactTreeTimeout.clear();
        dataRef.current.insideReactTree = false;
    });
    const hasBlockingChild = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((bubbleKey)=>{
        const nodeId = dataRef.current.floatingContext?.nodeId;
        const children = tree ? (0,_utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getNodeChildren */ .C)(tree.nodesRef.current, nodeId) : [];
        return children.some((child)=>child.context?.open && !child.context.dataRef.current[bubbleKey]);
    });
    const isEventWithinOwnElements = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((event)=>{
        return (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isEventTargetWithin */ .F2)(event, store.select('floatingElement')) || (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isEventTargetWithin */ .F2)(event, store.select('domReferenceElement'));
    });
    const closeOnReferencePress = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((event)=>{
        if (!referencePress()) {
            return;
        }
        store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_6__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_7__/* .triggerPress */ .Ui, event.nativeEvent));
    });
    const closeOnEscapeKeyDown = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((event)=>{
        if (!open || !enabled || !escapeKey || event.key !== 'Escape') {
            return;
        }
        const native = (0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_8__/* .isReactEvent */ .O_)(event) ? event.nativeEvent : event;
        // Wait until IME is settled. Pressing `Escape` while composing should
        // close the compose menu, but not the floating element. The ref covers Safari, which fires
        // `compositionend` before `keydown`; `isComposing` covers compositions that began while closed.
        if (isComposingRef.current || native.isComposing) {
            return;
        }
        if (!escapeKeyBubbles && hasBlockingChild('__escapeKeyBubbles')) {
            return;
        }
        const eventDetails = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_6__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_7__/* .escapeKey */ .jv, native);
        store.setOpen(false, eventDetails);
        if (!eventDetails.isCanceled) {
            event.preventDefault();
        }
        if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) {
            event.stopPropagation();
        }
    });
    const markInsideReactTree = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)(()=>{
        dataRef.current.insideReactTree = true;
        clearInsideReactTreeTimeout.start(0, clearInsideReactTree);
    });
    const markPressStartedInsideReactTree = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((event)=>{
        if (!open || !enabled || event.button !== 0) {
            return;
        }
        const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .getTarget */ .EW)(event.nativeEvent);
        // Only treat presses that start within the floating DOM subtree as inside.
        // This avoids suppressing parent dismissal when interacting with nested portals.
        if (!(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .contains */ .gR)(store.select('floatingElement'), target)) {
            return;
        }
        if (!pressStartedInsideRef.current) {
            pressStartedInsideRef.current = true;
            pressStartPreventedRef.current = false;
        }
    });
    const markInsidePressStartPrevented = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((event)=>{
        if (!open || !enabled) {
            return;
        }
        if (!(event.defaultPrevented || event.nativeEvent.defaultPrevented)) {
            return;
        }
        if (pressStartedInsideRef.current) {
            pressStartPreventedRef.current = true;
        }
    });
    // A same-batch close+reopen never renders `open === false`, so only `openchange` can
    // observe that session boundary. The effect below covers controlled flips.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        function handleOpenChange(details) {
            // Only the closing half ends the session: `setOpen(true)` on an already-open
            // element (hovering an inactive trigger) must not drop a press mid-gesture.
            if (!details.open) {
                sawPressWhileOpenRef.current = false;
            }
        }
        events.on('openchange', handleOpenChange);
        return ()=>{
            events.off('openchange', handleOpenChange);
        };
    }, [
        events
    ]);
    // Not cleared in the listener effect's cleanup, which can run mid-press when a dependency
    // changes. In a closed shadow root, the marker is the only inside-press signal.
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>clearInsideReactTree, [
        clearInsideReactTree
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!open || !enabled) {
            // Reset in the effect body, not the cleanup, which also runs when a dependency
            // changes mid-gesture.
            if (!open) {
                sawPressWhileOpenRef.current = false;
                isComposingRef.current = false;
                currentPointerTypeRef.current = '';
                touchStateRef.current = null;
            }
            return clearInsideReactTree;
        }
        dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
        dataRef.current.__outsidePressBubbles = outsidePressBubbles;
        const preventedPressSuppressionTimeout = new _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_3__/* .Timeout */ .E();
        const doc = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_10__/* .ownerDocument */ .R)(floatingElement);
        function handleCompositionStart() {
            compositionTimeout.clear();
            isComposingRef.current = true;
        }
        function handleCompositionEnd() {
            // Safari fires `compositionend` before `keydown`, so we need to wait
            // until the next tick to set `isComposing` to `false`. Set it here too, since closing
            // resets it while a composition can continue into the next open session.
            // https://bugs.webkit.org/show_bug.cgi?id=165004
            isComposingRef.current = true;
            compositionTimeout.start(// 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
            // Only apply to WebKit for the test to remain 0ms.
            _base_ui_utils_platform__WEBPACK_IMPORTED_MODULE_11__/* .webkit */ .Fp ? 5 : 0, ()=>{
                isComposingRef.current = false;
            });
        }
        function suppressImmediateOutsideClickAfterPreventedStart() {
            suppressNextOutsideClickRef.current = true;
            // Firefox can emit the synthetic outside click in a later task after
            // pointer lock exit, so microtask clearing is too early here.
            preventedPressSuppressionTimeout.start(0, ()=>{
                suppressNextOutsideClickRef.current = false;
            });
        }
        function resetPressStartState() {
            pressStartedInsideRef.current = false;
            pressStartPreventedRef.current = false;
        }
        function getOutsidePressEvent() {
            const type = currentPointerTypeRef.current;
            const computedType = type === 'pen' || !type ? 'mouse' : type;
            const outsidePressEventValue = getOutsidePressEventProp();
            const resolved = typeof outsidePressEventValue === 'function' ? outsidePressEventValue() : outsidePressEventValue;
            if (typeof resolved === 'string') {
                return resolved;
            }
            return resolved[computedType];
        }
        function shouldIgnoreEvent(event) {
            const computedOutsidePressEvent = getOutsidePressEvent();
            return computedOutsidePressEvent === 'intentional' && event.type !== 'click' || computedOutsidePressEvent === 'sloppy' && event.type === 'click';
        }
        function isEventWithinFloatingTree(event) {
            const nodeId = dataRef.current.floatingContext?.nodeId;
            const targetIsInsideChildren = tree && (0,_utils_nodes_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getNodeChildren */ .C)(tree.nodesRef.current, nodeId).some((node)=>(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isEventTargetWithin */ .F2)(event, node.context?.elements.floating));
            return isEventWithinOwnElements(event) || targetIsInsideChildren;
        }
        function closeOnPressOutside(event) {
            if (shouldIgnoreEvent(event)) {
                // A new press began outside the floating element and its trigger. Clear any
                // leftover drag-out suppression so this press's eventual click can dismiss.
                if (event.type !== 'click' && !isEventWithinOwnElements(event)) {
                    preventedPressSuppressionTimeout.clear();
                    suppressNextOutsideClickRef.current = false;
                }
                clearInsideReactTree();
                return;
            }
            if (dataRef.current.insideReactTree) {
                clearInsideReactTree();
                return;
            }
            const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .getTarget */ .EW)(event);
            const inertSelector = `[${(0,_utils_createAttribute_mjs__WEBPACK_IMPORTED_MODULE_12__/* .createAttribute */ .F)('inert')}]`;
            const targetRoot = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .isElement */ .vq)(target) ? target.getRootNode() : null;
            const markers = Array.from(((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .isShadowRoot */ .Ng)(targetRoot) ? targetRoot : (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_10__/* .ownerDocument */ .R)(store.select('floatingElement'))).querySelectorAll(inertSelector));
            const triggers = store.context.triggerElements;
            // If another trigger is clicked, don't close the floating element.
            if (target && (triggers.hasElement(target) || triggers.hasMatchingElement((trigger)=>(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .contains */ .gR)(trigger, target)))) {
                return;
            }
            let targetRootAncestor = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .isElement */ .vq)(target) ? target : null;
            while(targetRootAncestor && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .isLastTraversableNode */ .eu)(targetRootAncestor)){
                const nextParent = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .getParentNode */ .$4)(targetRootAncestor);
                if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .isLastTraversableNode */ .eu)(nextParent) || !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .isElement */ .vq)(nextParent)) {
                    break;
                }
                targetRootAncestor = nextParent;
            }
            // Check if the click occurred on a third-party element injected after the
            // floating element rendered.
            if (markers.length && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .isElement */ .vq)(target) && !(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isRootElement */ .tZ)(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
            !(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .contains */ .gR)(target, store.select('floatingElement')) && // If the target root element contains none of the markers, then the
            // element was injected after the floating element rendered.
            markers.every((marker)=>!(0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .contains */ .gR)(targetRootAncestor, marker))) {
                return;
            }
            // Check if the click occurred on the scrollbar
            // Skip for touch events: scrollbars don't receive touch events on most platforms
            if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .isHTMLElement */ .sb)(target) && !('touches' in event)) {
                const lastTraversableNode = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .isLastTraversableNode */ .eu)(target);
                const style = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_13__/* .getComputedStyle */ .L9)(target);
                const scrollRe = /auto|scroll/;
                const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
                const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
                const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
                const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
                const isRTL = style.direction === 'rtl';
                // Check click position relative to scrollbar.
                // In some browsers it is possible to change the <body> (or window)
                // scrollbar to the left side, but is very rare and is difficult to
                // check for. Plus, for modal dialogs with backdrops, it is more
                // important that the backdrop is checked but not so much the window.
                const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
                const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
                if (pressedVerticalScrollbar || pressedHorizontalScrollbar) {
                    return;
                }
            }
            if (isEventWithinFloatingTree(event)) {
                return;
            }
            // Only `click` events reach this point in intentional mode.
            if (getOutsidePressEvent() === 'intentional') {
                // Press-less clicks (keyboard, assistive technology, `element.click()`) report no
                // click count; `isVirtualClick` also catches the ones that do.
                if (event.detail !== 0 && !(0,_utils_event_mjs__WEBPACK_IMPORTED_MODULE_8__/* .isVirtualClick */ .YF)(event) && !sawPressWhileOpenRef.current) {
                    return;
                }
                // A press that starts inside and ends outside gets one suppressed
                // outside click. Run this after inside-target checks so inside clicks
                // don't consume the one-shot suppression.
                if (suppressNextOutsideClickRef.current) {
                    preventedPressSuppressionTimeout.clear();
                    suppressNextOutsideClickRef.current = false;
                    return;
                }
            }
            if (typeof outsidePress === 'function' && !outsidePress(event)) {
                return;
            }
            if (hasBlockingChild('__outsidePressBubbles')) {
                return;
            }
            store.setOpen(false, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_6__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_7__/* .outsidePress */ .Np, event));
            clearInsideReactTree();
        }
        function handlePointerDown(event) {
            if (getOutsidePressEvent() !== 'sloppy' || event.pointerType === 'touch' || !store.select('open') || !enabled || isEventWithinOwnElements(event)) {
                return;
            }
            closeOnPressOutside(event);
        }
        function handleTouchStart(event) {
            if (getOutsidePressEvent() !== 'sloppy' || !store.select('open') || !enabled || isEventWithinOwnElements(event)) {
                return;
            }
            const touch = event.touches[0];
            if (touch) {
                touchStateRef.current = {
                    startTime: Date.now(),
                    startX: touch.clientX,
                    startY: touch.clientY,
                    dismissOnTouchEnd: false,
                    dismissOnMouseDown: true
                };
                cancelDismissOnEndTimeout.start(1000, ()=>{
                    if (touchStateRef.current) {
                        touchStateRef.current.dismissOnTouchEnd = false;
                        touchStateRef.current.dismissOnMouseDown = false;
                    }
                });
            }
        }
        function addTargetEventListenerOnce(event, listener) {
            const target = (0,_utils_element_mjs__WEBPACK_IMPORTED_MODULE_9__/* .getTarget */ .EW)(event);
            if (!target) {
                return;
            }
            const unsubscribe = (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(target, event.type, ()=>{
                listener(event);
                unsubscribe();
            });
        }
        function handleTouchStartCapture(event) {
            currentPointerTypeRef.current = 'touch';
            addTargetEventListenerOnce(event, handleTouchStart);
        }
        function closeOnPressOutsideCapture(event) {
            cancelDismissOnEndTimeout.clear();
            // Only `pointerdown` marks a press; `mousedown` is its compatibility event, and
            // counting it would misattribute a gesture that started before open.
            if (event.type === 'pointerdown') {
                // Only a primary press can produce a `click`.
                if (event.button === 0) {
                    sawPressWhileOpenRef.current = true;
                }
                currentPointerTypeRef.current = event.pointerType;
            }
            if (event.type === 'mousedown' && touchStateRef.current && !touchStateRef.current.dismissOnMouseDown) {
                return;
            }
            addTargetEventListenerOnce(event, (targetEvent)=>{
                if (targetEvent.type === 'pointerdown') {
                    handlePointerDown(targetEvent);
                } else {
                    closeOnPressOutside(targetEvent);
                }
            });
        }
        function handlePressEndCapture(event) {
            // A cancelled gesture produces no click. Not cleared on `pointerup`: the click
            // fires after it and must still find the press.
            if (event.type === 'pointercancel') {
                sawPressWhileOpenRef.current = false;
            }
            if (!pressStartedInsideRef.current) {
                return;
            }
            const pressStartedInsideDefaultPrevented = pressStartPreventedRef.current;
            resetPressStartState();
            if (getOutsidePressEvent() !== 'intentional') {
                return;
            }
            if (event.type === 'pointercancel') {
                if (pressStartedInsideDefaultPrevented) {
                    suppressImmediateOutsideClickAfterPreventedStart();
                }
                return;
            }
            if (isEventWithinFloatingTree(event)) {
                return;
            }
            // If pointerdown was prevented, no click may be generated for that
            // interaction. However, Firefox may still emit an immediate click after
            // pointerup (e.g. NumberField scrub with pointer lock), so suppress for
            // one tick to absorb that synthetic click only.
            if (pressStartedInsideDefaultPrevented) {
                suppressImmediateOutsideClickAfterPreventedStart();
                return;
            }
            // Avoid suppressing when outsidePress explicitly ignores this target.
            if (typeof outsidePress === 'function' && !outsidePress(event)) {
                return;
            }
            preventedPressSuppressionTimeout.clear();
            suppressNextOutsideClickRef.current = true;
            clearInsideReactTree();
        }
        function handleTouchMove(event) {
            if (getOutsidePressEvent() !== 'sloppy' || !touchStateRef.current || isEventWithinOwnElements(event)) {
                return;
            }
            const touch = event.touches[0];
            if (!touch) {
                return;
            }
            const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX);
            const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY);
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            if (distance > 5) {
                touchStateRef.current.dismissOnTouchEnd = true;
            }
            if (distance > 10) {
                closeOnPressOutside(event);
                cancelDismissOnEndTimeout.clear();
                touchStateRef.current = null;
            }
        }
        function handleTouchMoveCapture(event) {
            addTargetEventListenerOnce(event, handleTouchMove);
        }
        function handleTouchEnd(event) {
            if (getOutsidePressEvent() !== 'sloppy' || !touchStateRef.current || isEventWithinOwnElements(event)) {
                return;
            }
            if (touchStateRef.current.dismissOnTouchEnd) {
                closeOnPressOutside(event);
            }
            cancelDismissOnEndTimeout.clear();
            touchStateRef.current = null;
        }
        function handleTouchEndCapture(event) {
            addTargetEventListenerOnce(event, handleTouchEnd);
        }
        const unsubscribe = (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_15__/* .mergeCleanups */ .g)(escapeKey && (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_15__/* .mergeCleanups */ .g)((0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'keydown', closeOnEscapeKeyDown), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'compositionstart', handleCompositionStart), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'compositionend', handleCompositionEnd)), outsidePressEnabled && (0,_base_ui_utils_mergeCleanups__WEBPACK_IMPORTED_MODULE_15__/* .mergeCleanups */ .g)((0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'click', closeOnPressOutsideCapture, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'pointerdown', closeOnPressOutsideCapture, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'pointerup', handlePressEndCapture, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'pointercancel', handlePressEndCapture, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'mousedown', closeOnPressOutsideCapture, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'mouseup', handlePressEndCapture, true), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'touchstart', handleTouchStartCapture, {
            capture: true,
            passive: true
        }), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'touchmove', handleTouchMoveCapture, {
            capture: true,
            passive: true
        }), (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_14__/* .addEventListener */ .q)(doc, 'touchend', handleTouchEndCapture, {
            capture: true,
            passive: true
        })));
        return ()=>{
            unsubscribe();
            preventedPressSuppressionTimeout.clear();
            resetPressStartState();
            suppressNextOutsideClickRef.current = false;
        };
    }, [
        dataRef,
        floatingElement,
        escapeKey,
        outsidePressEnabled,
        outsidePress,
        open,
        enabled,
        escapeKeyBubbles,
        outsidePressBubbles,
        closeOnEscapeKeyDown,
        clearInsideReactTree,
        getOutsidePressEventProp,
        hasBlockingChild,
        isEventWithinOwnElements,
        tree,
        store,
        cancelDismissOnEndTimeout,
        compositionTimeout
    ]);
    const reference = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            onKeyDown: closeOnEscapeKeyDown,
            onPointerDown: closeOnReferencePress,
            onClick: closeOnReferencePress
        }), [
        closeOnEscapeKeyDown,
        closeOnReferencePress
    ]);
    const floating = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            onKeyDown: closeOnEscapeKeyDown,
            // `onMouseDown` may be blocked if `event.preventDefault()` is called in
            // `onPointerDown`, such as with <NumberField.ScrubArea>.
            // See https://github.com/mui/base-ui/pull/3379
            onPointerDown: markInsidePressStartPrevented,
            onMouseDown: markInsidePressStartPrevented,
            onClickCapture: markInsideReactTree,
            onMouseDownCapture (event) {
                markInsideReactTree();
                markPressStartedInsideReactTree(event);
            },
            onPointerDownCapture (event) {
                markInsideReactTree();
                markPressStartedInsideReactTree(event);
            },
            onMouseUpCapture: markInsideReactTree,
            onTouchEndCapture: markInsideReactTree,
            onTouchMoveCapture: markInsideReactTree
        }), [
        closeOnEscapeKeyDown,
        markInsideReactTree,
        markPressStartedInsideReactTree,
        markInsidePressStartPrevented
    ]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>enabled ? {
            reference,
            floating,
            trigger: reference
        } : {}, [
        enabled,
        reference,
        floating
    ]);
}


/***/ }),

/***/ 88648:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ useSyncedFloatingRootContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66652);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6791);
/* __next_internal_client_entry_do_not_use__ useSyncedFloatingRootContext auto */ 

/**
 * Narrowed to the store members this hook uses so consumers do not need to provide
 * unrelated store capabilities.
 */ /**
 * Keeps the provided FloatingRootStore in sync with the provided PopupStore.
 */ function useSyncedFloatingRootContext(options) {
    const { popupStore, treatPopupAsFloatingElement = false, floatingRootContext: store, floatingId, nested, onOpenChange } = options;
    const open = popupStore.useState('open');
    const referenceElement = popupStore.useState('activeTriggerElement');
    const floatingElement = popupStore.useState(treatPopupAsFloatingElement ? 'popupElement' : 'positionerElement');
    const handleOpenChange = onOpenChange;
    popupStore.useSyncedValue('floatingId', floatingId);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_0__/* .useIsoLayoutEffect */ .g)(()=>{
        const valuesToSync = {
            open,
            floatingId,
            referenceElement,
            floatingElement
        };
        if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__/* .isElement */ .vq)(referenceElement)) {
            valuesToSync.domReferenceElement = referenceElement;
        }
        if (store.state.positionReference === store.state.referenceElement) {
            valuesToSync.positionReference = referenceElement;
        }
        store.update(valuesToSync);
    }, [
        open,
        floatingId,
        referenceElement,
        floatingElement,
        store
    ]);
    // Keep non-reactive context values fresh for interactions that call `store.setOpen`.
    store.context.onOpenChange = handleOpenChange;
    store.context.nested = nested;
    return store;
}


/***/ }),

/***/ 92044:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ getNodeAncestors),
/* harmony export */   C: () => (/* binding */ getNodeChildren)
/* harmony export */ });
/* eslint-disable @typescript-eslint/no-loop-func */

function getNodeChildren(nodes, id, onlyOpenChildren = true) {
  const directChildren = nodes.filter(node => node.parentId === id);
  return directChildren.flatMap(child => [...(!onlyOpenChildren || child.context?.open ? [child] : []), ...getNodeChildren(nodes, child.id, onlyOpenChildren)]);
}
function getNodeAncestors(nodes, id) {
  let allAncestors = [];
  let currentParentId = nodes.find(node => node.id === id)?.parentId;
  while (currentParentId) {
    const currentNode = nodes.find(node => node.id === currentParentId);
    currentParentId = currentNode?.parentId;
    if (currentNode) {
      allAncestors = allAncestors.concat(currentNode);
    }
  }
  return allAncestors;
}

/***/ }),

/***/ 92681:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B1: () => (/* binding */ rectToClientRect),
/* harmony export */   C0: () => (/* binding */ getSide),
/* harmony export */   Dz: () => (/* binding */ getAlignmentAxis),
/* harmony export */   Jx: () => (/* binding */ createCoords),
/* harmony export */   LI: () => (/* binding */ round),
/* harmony export */   PG: () => (/* binding */ getOppositeAxis),
/* harmony export */   RI: () => (/* binding */ floor),
/* harmony export */   Sg: () => (/* binding */ getAlignment),
/* harmony export */   T9: () => (/* binding */ max),
/* harmony export */   TV: () => (/* binding */ getSideAxis),
/* harmony export */   WJ: () => (/* binding */ getExpandedPlacements),
/* harmony export */   _3: () => (/* binding */ evaluate),
/* harmony export */   bV: () => (/* binding */ getOppositePlacement),
/* harmony export */   jk: () => (/* binding */ min),
/* harmony export */   lP: () => (/* binding */ getOppositeAxisPlacements),
/* harmony export */   nI: () => (/* binding */ getPaddingObject),
/* harmony export */   qE: () => (/* binding */ clamp),
/* harmony export */   r_: () => (/* binding */ sides),
/* harmony export */   sq: () => (/* binding */ getAxisLength),
/* harmony export */   w7: () => (/* binding */ getAlignmentSides)
/* harmony export */ });
/* unused harmony exports alignments, expandPaddingObject, getOppositeAlignmentPlacement, placements */
/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const sides = ['top', 'right', 'bottom', 'left'];
const alignments = (/* unused pure expression or super */ null && (['start', 'end']));
const placements = /*#__PURE__*/(/* unused pure expression or super */ null && (sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), [])));
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === 't' || firstChar === 'b' ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes('start') ? placement.replace('start', 'end') : placement.replace('end', 'start');
}
const lrPlacement = ['left', 'right'];
const rlPlacement = ['right', 'left'];
const tbPlacement = ['top', 'bottom'];
const btPlacement = ['bottom', 'top'];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  var _padding$top, _padding$right, _padding$bottom, _padding$left;
  return {
    top: (_padding$top = padding.top) != null ? _padding$top : 0,
    right: (_padding$right = padding.right) != null ? _padding$right : 0,
    bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
    left: (_padding$left = padding.left) != null ? _padding$left : 0
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}




/***/ }),

/***/ 94577:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(99617);
} else {}


/***/ }),

/***/ 95161:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ voiceOver)
/* harmony export */ });
/* harmony import */ var _os_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97827);


// Whether a screen reader is *actually* running cannot be detected. These flags
// identify platforms where a specific screen reader could be active. VoiceOver
// is the system screen reader on Apple platforms and works with every browser
// there, so the flag is purely an OS check; engine-specific quirks (e.g. the
// NSAccessibility virtual-cursor focus path) should be gated at the call site.
/**
 * The user *may* be using VoiceOver — actual activation is not detectable.
 * True on any Apple platform (macOS, iOS, iPadOS).
 */
const voiceOver = _os_mjs__WEBPACK_IMPORTED_MODULE_0__/* .apple */ .Bt;

/***/ }),

/***/ 95846:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ useToolbarRootContext)
/* harmony export */ });
/* unused harmony export ToolbarRootContext */
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ ToolbarRootContext,useToolbarRootContext auto */ 

const ToolbarRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useToolbarRootContext(optional) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ToolbarRootContext);
    if (context === undefined && !optional) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(69));
    }
    return context;
}


/***/ }),

/***/ 97827:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bt: () => (/* binding */ apple),
/* harmony export */   Md: () => (/* binding */ mac),
/* harmony export */   s4: () => (/* binding */ ios),
/* harmony export */   yA: () => (/* binding */ android)
/* harmony export */ });
/* unused harmony exports windows, linux */
/* harmony import */ var _shared_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77450);


// iPadOS 13+ reports `MacIntel` for `navigator.platform`; disambiguated via
// `maxTouchPoints` so iPad is classified as iOS, not macOS.
// https://github.com/mui/base-ui/issues/1309
/** iPhone, iPad (including iPadOS 13+ reporting as macOS), iPod. */
const ios = /^i(os$|p)/.test(_shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerPlatform */ .JG) || _shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerPlatform */ .JG === 'macintel' && _shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .maxTouchPoints */ .RT > 1;

/** Android phones, tablets, and embedded Android browsers. */
const ANDROID_STRING = 'android';
const android = _shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerPlatform */ .JG === ANDROID_STRING || _shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerUserAgent */ .ST.includes(ANDROID_STRING);

/** macOS desktop. Excludes iPadOS, which reports as `MacIntel`. */
const mac = !ios && _shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerPlatform */ .JG.startsWith('mac');

/** Windows desktop. */
const windows = _shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerPlatform */ .JG.startsWith('win');

/** Linux desktop (including Chrome OS). */
const linux = !android && /^(linux|chrome os)/.test(_shared_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowerPlatform */ .JG);

/** Any Apple OS (`mac || ios`). */
const apple = mac || ios;

/***/ }),

/***/ 98419:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ ReactStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _Store_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2368);
/* harmony import */ var _useStore_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30271);
/* harmony import */ var _useStableCallback_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23068);
/* harmony import */ var _useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66652);
/* harmony import */ var _empty_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8994);
/* False positives - ESLint thinks we're calling a hook from a class component. */ /* eslint-disable react-hooks/rules-of-hooks */ /* __next_internal_client_entry_do_not_use__ ReactStore auto */ 





/**
 * A Store that supports controlled state keys, non-reactive values and provides utility methods for React.
 */ class ReactStore extends _Store_mjs__WEBPACK_IMPORTED_MODULE_1__/* .Store */ .i {
    /**
   * Creates a new ReactStore instance.
   *
   * @param state Initial state of the store.
   * @param context Non-reactive context values.
   * @param selectors Optional selectors for use with `useState`.
   */ constructor(state, context = {}, selectors){
        super(state);
        this.context = context;
        this.selectors = selectors;
    }
    /**
   * Non-reactive values such as refs, callbacks, etc.
   */ /**
   * Synchronizes a single external value into the store.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */ useSyncedValue(key, value) {
        react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(key);
        // eslint-disable-next-line consistent-this
        const store = this;
        (0,_useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
            if (store.state[key] !== value) {
                store.set(key, value);
            }
        }, [
            store,
            key,
            value
        ]);
    }
    /**
   * Synchronizes a single external value into the store and
   * cleans it up (sets to `undefined`) on unmount.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */ useSyncedValueWithCleanup(key, value) {
        // eslint-disable-next-line consistent-this
        const store = this;
        (0,_useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
            if (store.state[key] !== value) {
                store.set(key, value);
            }
            return ()=>{
                store.set(key, undefined);
            };
        }, [
            store,
            key,
            value
        ]);
    }
    /**
   * Synchronizes multiple external values into the store.
   * Each value must match its state key. Pass an exact known subset rather than a broad
   * `Partial<State>`, which may contain `undefined` for required state fields.
   *
   * Note that the while the values in `state` are updated immediately, the values returned
   * by `useState` are updated before the next render (similarly to React's `useState`).
   *
   * @param statePart An exact subset of state fields to synchronize. Unknown keys are not accepted.
   */ useSyncedValues(statePart) {
        // eslint-disable-next-line consistent-this
        const store = this;
        if (false) {}
        const dependencies = Object.values(statePart);
        (0,_useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
            store.update(statePart);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            store,
            ...dependencies
        ]);
    }
    /**
   * Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
   * is non-undefined, the store's state at `key` is updated to match `controlled`.
   */ useControlledProp(key, controlled) {
        react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(key);
        // eslint-disable-next-line consistent-this
        const store = this;
        const isControlled = controlled !== undefined;
        (0,_useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
            if (isControlled && !Object.is(store.state[key], controlled)) {
                // Set the internal state to match the controlled value.
                store.setState({
                    ...store.state,
                    [key]: controlled
                });
            }
        }, [
            store,
            key,
            controlled,
            isControlled
        ]);
        if (false) {}
    }
    /** Gets the current value from the store using a selector with the provided key.
   *
   * @param key Key of the selector to use.
   */ select(key, a1, a2, a3) {
        const selector = this.selectors[key];
        return selector(this.state, a1, a2, a3);
    }
    /**
   * Returns a value from the store's state using a selector function.
   * Used to subscribe to specific parts of the state.
   * This methods causes a rerender whenever the selected state changes.
   *
   * @param key Key of the selector to use.
   */ useState(key, a1, a2, a3) {
        react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(key);
        return (0,_useStore_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useStore */ .P)(this, this.selectors[key], a1, a2, a3);
    }
    /**
   * Wraps a function with `useStableCallback` to ensure it has a stable reference
   * and assigns it to the context.
   *
   * @param key Key of the event callback. Must be a function in the context.
   * @param fn Function to assign.
   */ useContextCallback(key, fn) {
        react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(key);
        const stableFunction = (0,_useStableCallback_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useStableCallback */ .K)(fn ?? _empty_mjs__WEBPACK_IMPORTED_MODULE_5__/* .NOOP */ .tE);
        this.context[key] = stableFunction;
    }
    /**
   * Returns a stable setter function for a specific key in the store's state.
   * It's commonly used to pass as a ref callback to React elements.
   *
   * @param key Key of the state to set.
   */ useStateSetter(key) {
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
        if (ref.current === undefined) {
            ref.current = (value)=>{
                this.set(key, value);
            };
        }
        return ref.current;
    }
    /**
   * Observes changes derived from the store's selectors and calls the listener when the selected value changes.
   *
   * @param key Key of the selector to observe.
   * @param listener Listener function called when the selector result changes.
   */ observe(selector, listener) {
        let selectFn;
        if (typeof selector === 'function') {
            selectFn = selector;
        } else {
            selectFn = this.selectors[selector];
        }
        let prevValue = selectFn(this.state);
        listener(prevValue, prevValue, this);
        return this.subscribe((nextState)=>{
            const nextValue = selectFn(nextState);
            if (!Object.is(prevValue, nextValue)) {
                const oldValue = prevValue;
                prevValue = nextValue;
                listener(nextValue, oldValue, this);
            }
        });
    }
}


/***/ }),

/***/ 99226:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AO: () => (/* binding */ isTabbable),
/* harmony export */   Kr: () => (/* binding */ tabbable),
/* harmony export */   N: () => (/* binding */ disableFocusInside),
/* harmony export */   Qe: () => (/* binding */ getTabbableNearElement),
/* harmony export */   Qp: () => (/* binding */ isOutsideEvent),
/* harmony export */   XJ: () => (/* binding */ getPreviousTabbable),
/* harmony export */   nq: () => (/* binding */ focusable),
/* harmony export */   vF: () => (/* binding */ getNextTabbable),
/* harmony export */   yV: () => (/* binding */ enableFocusInside)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(81456);
/* harmony import */ var _element_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93093);
/* harmony import */ var _composite_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86058);




const CANDIDATE_SELECTOR = 'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';
function getParentElement(element) {
  const assignedSlot = element.assignedSlot;
  if (assignedSlot) {
    return assignedSlot;
  }
  if (element.parentElement) {
    return element.parentElement;
  }
  const rootNode = element.getRootNode();
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isShadowRoot */ .Ng)(rootNode) ? rootNode.host : null;
}
function getDetailsSummary(details) {
  for (const child of Array.from(details.children)) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(child) === 'summary') {
      return child;
    }
  }
  return null;
}
function isWithinOpenDetailsSummary(element, details) {
  const summary = getDetailsSummary(details);
  return !!summary && (element === summary || (0,_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .contains */ .gR)(summary, element));
}
function isFocusableCandidate(element) {
  const nodeName = element ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(element) : '';
  return element != null && element.matches(CANDIDATE_SELECTOR) && (nodeName !== 'summary' || element.parentElement != null && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(element.parentElement) === 'details' && getDetailsSummary(element.parentElement) === element) && (nodeName !== 'details' || getDetailsSummary(element) == null) && (nodeName !== 'input' || element.type !== 'hidden');
}
function isFocusableElement(element) {
  if (!isFocusableCandidate(element) || !element.isConnected || element.matches(':disabled')) {
    return false;
  }
  for (let current = element; current; current = getParentElement(current)) {
    const isAncestor = current !== element;
    const isSlot = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(current) === 'slot';
    if (current.hasAttribute('inert')) {
      return false;
    }
    if (isAncestor && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(current) === 'details' && !current.open && !isWithinOpenDetailsSummary(element, current) || current.hasAttribute('hidden') || !isSlot && !isVisibleInTabbableTree(current, isAncestor)) {
      return false;
    }
  }
  return true;
}
function isVisibleInTabbableTree(element, isAncestor) {
  const styles = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(element);
  if (!isAncestor) {
    return (0,_composite_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isElementVisible */ .J9)(element, styles);
  }
  return styles.display !== 'none';
}
function getTabIndex(element) {
  const tabIndex = element.tabIndex;
  if (tabIndex < 0) {
    const nodeName = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(element);
    if (nodeName === 'details' || nodeName === 'audio' || nodeName === 'video' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element) && element.isContentEditable) {
      return 0;
    }
  }
  return tabIndex;
}
function getNamedRadioInput(element) {
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(element) !== 'input') {
    return null;
  }
  const input = element;
  return input.type === 'radio' && input.name !== '' ? input : null;
}
function isTabbableRadio(element, candidates) {
  const input = getNamedRadioInput(element);
  if (!input) {
    return true;
  }
  const checkedRadio = candidates.find(candidate => {
    const radio = getNamedRadioInput(candidate);
    return radio?.name === input.name && radio.form === input.form && radio.checked;
  });
  if (checkedRadio) {
    return checkedRadio === input;
  }
  return candidates.find(candidate => {
    const radio = getNamedRadioInput(candidate);
    return radio?.name === input.name && radio.form === input.form;
  }) === input;
}
function getComposedChildren(container) {
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(container) && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getNodeName */ .mq)(container) === 'slot') {
    const assignedElements = container.assignedElements({
      flatten: true
    });
    if (assignedElements.length > 0) {
      return assignedElements;
    }
  }
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(container) && container.shadowRoot) {
    return Array.from(container.shadowRoot.children);
  }
  return Array.from(container.children);
}
function appendCandidates(container, list) {
  getComposedChildren(container).forEach(child => {
    if (isFocusableCandidate(child)) {
      list.push(child);
    }
    appendCandidates(child, list);
  });
}
function appendMatchingElements(container, selector, list) {
  getComposedChildren(container).forEach(child => {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(child) && child.matches(selector)) {
      list.push(child);
    }
    appendMatchingElements(child, selector, list);
  });
}
function isTabbable(element) {
  return isFocusableElement(element) && getTabIndex(element) >= 0;
}
function focusable(container) {
  const candidates = [];
  appendCandidates(container, candidates);
  return candidates.filter(isFocusableElement);
}
function tabbable(container) {
  const candidates = focusable(container);
  return candidates.filter(element => getTabIndex(element) >= 0 && isTabbableRadio(element, candidates));
}
function getTabbableIn(container, dir) {
  const list = tabbable(container);
  const len = list.length;
  if (len === 0) {
    return undefined;
  }
  const active = (0,_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .activeElement */ .RS)((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_3__/* .ownerDocument */ .R)(container));
  const index = list.indexOf(active);
  // eslint-disable-next-line no-nested-ternary
  const nextIndex = index === -1 ? dir === 1 ? 0 : len - 1 : index + dir;
  return list[nextIndex];
}
function getNextTabbable(referenceElement) {
  return getTabbableIn((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_3__/* .ownerDocument */ .R)(referenceElement).body, 1) || referenceElement;
}
function getPreviousTabbable(referenceElement) {
  return getTabbableIn((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_3__/* .ownerDocument */ .R)(referenceElement).body, -1) || referenceElement;
}
function getTabbableNearElement(referenceElement, direction, exclude) {
  if (!referenceElement) {
    return null;
  }

  // Keep the anchor's composed-tree position separate from the focusable radio candidates.
  const list = [];
  appendCandidates((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_3__/* .ownerDocument */ .R)(referenceElement).body, list);
  const index = list.indexOf(referenceElement);
  if (index === -1) {
    return null;
  }
  const candidates = list.filter(isFocusableElement);
  for (let offset = 1; offset < list.length; offset += 1) {
    const element = list[(index + direction * offset + list.length) % list.length];
    if (!(0,_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .contains */ .gR)(exclude, element) && isTabbable(element) && isTabbableRadio(element, candidates)) {
      return element;
    }
  }
  return list[index];
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !(0,_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .contains */ .gR)(containerElement, relatedTarget);
}
function disableFocusInside(container) {
  const tabbableElements = tabbable(container);
  tabbableElements.forEach(element => {
    element.dataset.tabindex = element.getAttribute('tabindex') || '';
    element.setAttribute('tabindex', '-1');
  });
}
function enableFocusInside(container) {
  const elements = [];
  appendMatchingElements(container, '[data-tabindex]', elements);
  elements.forEach(element => {
    const tabindex = element.dataset.tabindex;
    delete element.dataset.tabindex;
    if (tabindex) {
      element.setAttribute('tabindex', tabindex);
    } else {
      element.removeAttribute('tabindex');
    }
  });
}

/***/ }),

/***/ 99617:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var React = __webpack_require__(12115),
  shim = __webpack_require__(8039);
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  useSyncExternalStore = shim.useSyncExternalStore,
  useRef = React.useRef,
  useEffect = React.useEffect,
  useMemo = React.useMemo,
  useDebugValue = React.useDebugValue;
exports.useSyncExternalStoreWithSelector = function (
  subscribe,
  getSnapshot,
  getServerSnapshot,
  selector,
  isEqual
) {
  var instRef = useRef(null);
  if (null === instRef.current) {
    var inst = { hasValue: !1, value: null };
    instRef.current = inst;
  } else inst = instRef.current;
  instRef = useMemo(
    function () {
      function memoizedSelector(nextSnapshot) {
        if (!hasMemo) {
          hasMemo = !0;
          memoizedSnapshot = nextSnapshot;
          nextSnapshot = selector(nextSnapshot);
          if (void 0 !== isEqual && inst.hasValue) {
            var currentSelection = inst.value;
            if (isEqual(currentSelection, nextSnapshot))
              return (memoizedSelection = currentSelection);
          }
          return (memoizedSelection = nextSnapshot);
        }
        currentSelection = memoizedSelection;
        if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
        var nextSelection = selector(nextSnapshot);
        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
          return (memoizedSnapshot = nextSnapshot), currentSelection;
        memoizedSnapshot = nextSnapshot;
        return (memoizedSelection = nextSelection);
      }
      var hasMemo = !1,
        memoizedSnapshot,
        memoizedSelection,
        maybeGetServerSnapshot =
          void 0 === getServerSnapshot ? null : getServerSnapshot;
      return [
        function () {
          return memoizedSelector(getSnapshot());
        },
        null === maybeGetServerSnapshot
          ? void 0
          : function () {
              return memoizedSelector(maybeGetServerSnapshot());
            }
      ];
    },
    [getSnapshot, getServerSnapshot, selector, isEqual]
  );
  var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
  useEffect(
    function () {
      inst.hasValue = !0;
      inst.value = value;
    },
    [value]
  );
  useDebugValue(value);
  return value;
};


/***/ }),

/***/ 99779:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ useAnchorPositioning)
/* harmony export */ });
/* unused harmony export useAnchorPositioningWithHook */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92681);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(81456);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2474);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23068);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9683);
/* harmony import */ var _floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(43479);
/* harmony import */ var _floating_ui_react_hooks_useFloating_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78791);
/* harmony import */ var _direction_context_DirectionContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30458);
/* harmony import */ var _floating_ui_react_middleware_arrow_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(26863);
/* harmony import */ var _utils_hideMiddleware_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(61769);
/* harmony import */ var _utils_adaptiveOriginConstants_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4842);
/* harmony import */ var _utils_CommonPositionerCssVars_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1339);
/* __next_internal_client_entry_do_not_use__ useAnchorPositioning,useAnchorPositioningWithHook auto */ 












const AVAILABLE_WIDTH_VAR = _utils_CommonPositionerCssVars_mjs__WEBPACK_IMPORTED_MODULE_1__/* .availableWidth */ .QJ;
const AVAILABLE_HEIGHT_VAR = _utils_CommonPositionerCssVars_mjs__WEBPACK_IMPORTED_MODULE_1__/* .availableHeight */ .px;
function getLogicalSide(sideParam, renderedSide, isRtl) {
    const isLogicalSideParam = sideParam === 'inline-start' || sideParam === 'inline-end';
    const logicalRight = isRtl ? 'inline-start' : 'inline-end';
    const logicalLeft = isRtl ? 'inline-end' : 'inline-start';
    return ({
        top: 'top',
        right: isLogicalSideParam ? logicalRight : 'right',
        bottom: 'bottom',
        left: isLogicalSideParam ? logicalLeft : 'left'
    })[renderedSide];
}
function getOffsetData(state, sideParam, isRtl) {
    const { rects, placement } = state;
    const data = {
        side: getLogicalSide(sideParam, (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getSide */ .C0)(placement), isRtl),
        align: (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getAlignment */ .Sg)(placement) || 'center',
        anchor: {
            width: rects.reference.width,
            height: rects.reference.height
        },
        positioner: {
            width: rects.floating.width,
            height: rects.floating.height
        }
    };
    return data;
}
/**
 * Provides standardized anchor positioning behavior for floating elements. Wraps Floating UI's
 * `useFloating` hook.
 */ function useAnchorPositioning(params) {
    return useAnchorPositioningWithHook(params, _floating_ui_react_hooks_useFloating_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useBaseUIFloating */ .r);
}
function useAnchorPositioningWithHook(params, useFloatingHook) {
    const { // Public parameters
    anchor, positionMethod = 'absolute', side: sideParam = 'bottom', sideOffset = 0, align = 'center', alignOffset = 0, collisionBoundary, collisionPadding: collisionPaddingParam = 5, sticky = false, arrowPadding = 5, disableAnchorTracking = false, inline: inlineMiddleware, // Private parameters
    keepMounted = false, floatingRootContext, mounted, collisionAvoidance, shift, nodeId, adaptiveOrigin, lazyFlip = false, externalTree } = params;
    const collisionAvoidanceSide = collisionAvoidance.side || 'flip';
    const collisionAvoidanceAlign = collisionAvoidance.align || 'flip';
    const collisionAvoidanceFallbackAxisSide = collisionAvoidance.fallbackAxisSide || 'end';
    const shiftCrossAxis = shift?.crossAxis ?? false;
    const shiftRootBoundary = shift?.rootBoundary;
    const anchorFn = typeof anchor === 'function' ? anchor : undefined;
    const anchorFnCallback = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__/* .useStableCallback */ .K)(anchorFn);
    const anchorDep = anchorFn ? anchorFnCallback : anchor;
    const anchorValueRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_5__/* .useValueAsRef */ .u)(anchor);
    const mountedRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_5__/* .useValueAsRef */ .u)(mounted);
    const direction = (0,_direction_context_DirectionContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useDirection */ .j)();
    const isRtl = direction === 'rtl';
    const [mountPlacement, setMountPlacement] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    if (!mounted && mountPlacement !== null) {
        setMountPlacement(null);
    }
    const lockAlign = lazyFlip === 'placement';
    const mountSide = mountPlacement ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getSide */ .C0)(mountPlacement) : null;
    const mountAlign = mountPlacement && lockAlign ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getAlignment */ .Sg)(mountPlacement) || 'center' : null;
    const side = mountSide || ({
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left',
        'inline-end': isRtl ? 'left' : 'right',
        'inline-start': isRtl ? 'right' : 'left'
    })[sideParam];
    const placementAlign = mountAlign || align;
    const placement = placementAlign === 'center' ? side : `${side}-${placementAlign}`;
    let collisionPadding = collisionPaddingParam;
    if (typeof collisionPadding === 'number') {
        collisionPadding = {
            top: collisionPadding,
            right: collisionPadding,
            bottom: collisionPadding,
            left: collisionPadding
        };
    } else if (collisionPadding) {
        collisionPadding = {
            top: collisionPadding.top || 0,
            right: collisionPadding.right || 0,
            bottom: collisionPadding.bottom || 0,
            left: collisionPadding.left || 0
        };
    }
    // Create a bias to the preferred side.
    // On iOS, when the mobile software keyboard opens, the input is exactly centered
    // in the viewport, but this can cause it to flip to the top undesirably.
    // The bias is only applied to `flip()` so it doesn't shift the resting position
    // computed by `shift()` and `size()` away from the requested `collisionPadding`.
    const bias = 1;
    const biasTop = sideParam === 'bottom' ? bias : 0;
    const biasBottom = sideParam === 'top' ? bias : 0;
    const biasLeft = sideParam === 'right' ? bias : 0;
    const biasRight = sideParam === 'left' ? bias : 0;
    const commonCollisionProps = {
        boundary: collisionBoundary === 'clipping-ancestors' ? 'clippingAncestors' : collisionBoundary,
        padding: collisionPadding
    };
    // Using a ref assumes that the arrow element is always present in the DOM for the lifetime of the
    // popup. If this assumption ends up being false, we can switch to state to manage the arrow's
    // presence.
    const arrowRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    // Keep these reactive if they're not functions
    const sideOffsetRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_5__/* .useValueAsRef */ .u)(sideOffset);
    const alignOffsetRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_5__/* .useValueAsRef */ .u)(alignOffset);
    const sideOffsetDep = typeof sideOffset !== 'function' ? sideOffset : 0;
    const alignOffsetDep = typeof alignOffset !== 'function' ? alignOffset : 0;
    const middleware = [];
    if (inlineMiddleware) {
        middleware.push(inlineMiddleware);
    }
    middleware.push((0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__/* .offset */ .cY)((state)=>{
        const data = getOffsetData(state, sideParam, isRtl);
        const sideAxis = typeof sideOffsetRef.current === 'function' ? sideOffsetRef.current(data) : sideOffsetRef.current;
        const alignAxis = typeof alignOffsetRef.current === 'function' ? alignOffsetRef.current(data) : alignOffsetRef.current;
        return {
            mainAxis: sideAxis,
            crossAxis: alignAxis,
            alignmentAxis: alignAxis
        };
    }, [
        sideOffsetDep,
        alignOffsetDep,
        isRtl,
        sideParam
    ]));
    const shiftDisabled = collisionAvoidanceAlign === 'none' && collisionAvoidanceSide !== 'shift';
    const crossAxisShiftEnabled = !shiftDisabled && (sticky || shiftCrossAxis || collisionAvoidanceSide === 'shift');
    const flipMiddleware = collisionAvoidanceSide === 'none' ? null : (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__/* .flip */ .UU)({
        ...commonCollisionProps,
        // Ensure the popup flips if it's been limited by its --available-height and it resizes.
        // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
        padding: {
            top: collisionPadding.top + bias + biasTop,
            right: collisionPadding.right + bias + biasRight,
            bottom: collisionPadding.bottom + bias + biasBottom,
            left: collisionPadding.left + bias + biasLeft
        },
        mainAxis: !shiftCrossAxis && collisionAvoidanceSide === 'flip',
        crossAxis: collisionAvoidanceAlign === 'flip' ? 'alignment' : false,
        fallbackAxisSideDirection: collisionAvoidanceFallbackAxisSide
    });
    const shiftMiddleware = shiftDisabled ? null : (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__/* .shift */ .BN)({
        ...commonCollisionProps,
        // Use the Layout Viewport to avoid shifting around when pinch-zooming.
        rootBoundary: shiftRootBoundary,
        mainAxis: collisionAvoidanceAlign !== 'none',
        crossAxis: crossAxisShiftEnabled,
        limiter: sticky || shiftCrossAxis ? undefined : (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__/* .limitShift */ .ER)((limitData)=>{
            if (!arrowRef.current) {
                return {};
            }
            const { width, height } = arrowRef.current.getBoundingClientRect();
            const sideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getSideAxis */ .TV)((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getSide */ .C0)(limitData.placement));
            const arrowSize = sideAxis === 'y' ? width : height;
            const offsetAmount = sideAxis === 'y' ? collisionPadding.left + collisionPadding.right : collisionPadding.top + collisionPadding.bottom;
            return {
                offset: arrowSize / 2 + offsetAmount / 2
            };
        })
    }, [
        commonCollisionProps,
        sticky,
        shiftCrossAxis,
        shiftRootBoundary,
        collisionPadding,
        collisionAvoidanceAlign
    ]);
    // https://floating-ui.com/docs/flip#combining-with-shift
    // Keyed on the alignment actually being requested, not the raw prop: a locked alignment can
    // differ from `align`, and the ordering has to match the placement that is asked for.
    if (collisionAvoidanceSide === 'shift' || collisionAvoidanceAlign === 'shift' || placementAlign === 'center') {
        middleware.push(shiftMiddleware, flipMiddleware);
    } else {
        middleware.push(flipMiddleware, shiftMiddleware);
    }
    middleware.push((0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_7__/* .size */ .Ej)({
        ...commonCollisionProps,
        apply ({ elements: { floating }, availableWidth, availableHeight, rects }) {
            if (!mountedRef.current) {
                return;
            }
            const floatingStyle = floating.style;
            floatingStyle.setProperty(AVAILABLE_WIDTH_VAR, `${availableWidth}px`);
            floatingStyle.setProperty(AVAILABLE_HEIGHT_VAR, `${availableHeight}px`);
            // Snap anchor dimensions to device pixels to ensure the popup's visual width matches the anchor's one.
            const dpr = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_8__/* .getWindow */ .zk)(floating).devicePixelRatio || 1;
            const { x, y, width, height } = rects.reference;
            const anchorWidth = (Math.round((x + width) * dpr) - Math.round(x * dpr)) / dpr;
            const anchorHeight = (Math.round((y + height) * dpr) - Math.round(y * dpr)) / dpr;
            floatingStyle.setProperty(_utils_CommonPositionerCssVars_mjs__WEBPACK_IMPORTED_MODULE_1__/* .anchorWidth */ .cn, `${anchorWidth}px`);
            floatingStyle.setProperty(_utils_CommonPositionerCssVars_mjs__WEBPACK_IMPORTED_MODULE_1__/* .anchorHeight */ .NL, `${anchorHeight}px`);
        }
    }), (0,_floating_ui_react_middleware_arrow_mjs__WEBPACK_IMPORTED_MODULE_9__/* .arrow */ .U)((state)=>({
            // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
            // we'll create a fake element.
            element: arrowRef.current || (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_10__/* .ownerDocument */ .R)(state.elements.floating).createElement('div'),
            // No padding for the fake arrow: it would displace aligned popups on narrow anchors.
            padding: arrowRef.current ? arrowPadding : 0
        }), [
        arrowPadding
    ]), {
        name: 'transformOrigin',
        fn (state) {
            const { elements: { floating }, middlewareData, placement: renderedPlacement, platform, rects, y } = state;
            const renderedSide = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getSide */ .C0)(renderedPlacement);
            const renderedAlign = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getAlignment */ .Sg)(renderedPlacement);
            const isVertical = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getSideAxis */ .TV)(renderedSide) === 'y';
            const arrowEl = arrowRef.current;
            const sideOffsetValue = typeof sideOffset === 'function' ? sideOffset(getOffsetData(state, sideParam, isRtl)) : sideOffset;
            // An aligned arrowless popup grows from its aligned edge, until a shift (beyond subpixel)
            // breaks its alignment with the anchor. Everything else grows from the arrow, real or fake.
            let crossOrigin;
            if (!arrowEl && renderedAlign && Math.abs(isVertical ? middlewareData.shift?.x || 0 : middlewareData.shift?.y || 0) <= 1) {
                // The platform direction, not `isRtl`: it must match what Floating UI placed with.
                crossOrigin = renderedAlign === 'start' === (isVertical && platform.isRTL?.(floating) === true) ? '100%' : '0%';
            } else {
                const arrowOffset = isVertical ? middlewareData.arrow?.x || 0 : middlewareData.arrow?.y || 0;
                const arrowSize = isVertical ? arrowEl?.clientWidth || 0 : arrowEl?.clientHeight || 0;
                crossOrigin = `${arrowOffset + arrowSize / 2}px`;
            }
            // Side axis: the anchor-facing edge, or the anchor's center when the popup overlaps it.
            let sideOrigin = renderedSide === 'top' || renderedSide === 'left' ? `calc(100% + ${sideOffsetValue}px)` : `${-sideOffsetValue}px`;
            if (crossAxisShiftEnabled && isVertical && Math.abs(middlewareData.shift?.y || 0) > sideOffsetValue) {
                sideOrigin = `${rects.reference.y + rects.reference.height / 2 - y}px`;
            }
            floating.style.setProperty(_utils_CommonPositionerCssVars_mjs__WEBPACK_IMPORTED_MODULE_1__/* .transformOrigin */ .Td, isVertical ? `${crossOrigin} ${sideOrigin}` : `${sideOrigin} ${crossOrigin}`);
            return {};
        }
    }, _utils_hideMiddleware_mjs__WEBPACK_IMPORTED_MODULE_11__/* .hide */ .j, adaptiveOrigin);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_12__/* .useIsoLayoutEffect */ .g)(()=>{
        // Ensure positioning doesn't run initially for `keepMounted` elements that
        // aren't initially open.
        if (!mounted && floatingRootContext) {
            floatingRootContext.update({
                referenceElement: null,
                floatingElement: null,
                domReferenceElement: null,
                positionReference: null
            });
        }
    }, [
        mounted,
        floatingRootContext
    ]);
    const autoUpdateOptions = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            ancestorScroll: !disableAnchorTracking,
            elementResize: !disableAnchorTracking && typeof ResizeObserver !== 'undefined',
            layoutShift: !disableAnchorTracking && typeof IntersectionObserver !== 'undefined'
        }), [
        disableAnchorTracking
    ]);
    const { refs, elements, x, y, middlewareData, update, placement: renderedPlacement, context, isPositioned, floatingStyles: originalFloatingStyles } = useFloatingHook({
        rootContext: floatingRootContext,
        open: keepMounted ? mounted : undefined,
        placement,
        middleware,
        strategy: positionMethod,
        whileElementsMounted: keepMounted ? undefined : (...args)=>(0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_13__/* .autoUpdate */ .ll)(...args, autoUpdateOptions),
        nodeId,
        externalTree
    });
    const { sideX, sideY } = middlewareData.adaptiveOrigin || _utils_adaptiveOriginConstants_mjs__WEBPACK_IMPORTED_MODULE_14__/* .DEFAULT_SIDES */ .j;
    // Default to `fixed` when not positioned to prevent `autoFocus` scroll jumps.
    // This ensures the popup is inside the viewport initially before it gets positioned.
    const resolvedPosition = isPositioned ? positionMethod : 'fixed';
    const floatingStyles = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        let base;
        if (!isPositioned) {
            // Until a position for the current open is computed, ignore any coordinates retained from a
            // previous open (or from a pass that measured the hidden popup as 0x0). Rendering the
            // full-size popup at such stale coordinates can overflow the layout viewport, which makes
            // mobile Chrome zoom the page out and reflow everything the popup is anchored to.
            base = {
                position: resolvedPosition,
                top: 0,
                left: 0
            };
        } else if (adaptiveOrigin) {
            base = {
                position: resolvedPosition,
                [sideX]: x,
                [sideY]: y
            };
        } else {
            base = {
                ...originalFloatingStyles,
                position: resolvedPosition
            };
        }
        // Seed the available size vars so consumer `max-height: min(x, var(--available-height))` rules
        // resolve to a valid length on the first positioning pass, before `size()` writes the real
        // values. Without a fallback the unresolved `var()` invalidates the whole declaration, so the
        // popup is measured unconstrained while `flip()` picks its side, against the full content
        // height rather than the capped one. Seeded unconditionally (not only while `!isPositioned`):
        // the keys must stay present with a constant value so React's per-property style diff never
        // rewrites them after mount, preserving the px values `size()` sets imperatively. Moving them
        // into the `!isPositioned` branch makes React remove them once positioned, wiping `size()`'s
        // values and leaving the popup unconstrained.
        base[AVAILABLE_WIDTH_VAR] = '100vw';
        base[AVAILABLE_HEIGHT_VAR] = '100vh';
        if (!isPositioned) {
            base.opacity = 0;
        }
        return base;
    }, [
        adaptiveOrigin,
        resolvedPosition,
        sideX,
        x,
        sideY,
        y,
        originalFloatingStyles,
        isPositioned
    ]);
    const registeredPositionReferenceRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_12__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!mounted) {
            return;
        }
        const anchorValue = anchorValueRef.current;
        const resolvedAnchor = typeof anchorValue === 'function' ? anchorValue() : anchorValue;
        const unwrappedElement = (isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor) || null;
        const finalAnchor = unwrappedElement || null;
        if (finalAnchor !== registeredPositionReferenceRef.current) {
            refs.setPositionReference(finalAnchor);
            registeredPositionReferenceRef.current = finalAnchor;
        }
    }, [
        mounted,
        refs,
        anchorDep,
        anchorValueRef
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!mounted) {
            return;
        }
        const anchorValue = anchorValueRef.current;
        // Refs from parent components are set after useLayoutEffect runs and are available in useEffect.
        // Therefore, if the anchor is a ref, we need to update the position reference in useEffect.
        if (typeof anchorValue === 'function') {
            return;
        }
        if (isRef(anchorValue) && anchorValue.current !== registeredPositionReferenceRef.current) {
            refs.setPositionReference(anchorValue.current);
            registeredPositionReferenceRef.current = anchorValue.current;
        }
    }, [
        mounted,
        refs,
        anchorDep,
        anchorValueRef
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (keepMounted && mounted && elements.reference && elements.floating) {
            return (0,_floating_ui_react_index_mjs__WEBPACK_IMPORTED_MODULE_13__/* .autoUpdate */ .ll)(elements.reference, elements.floating, update, autoUpdateOptions);
        }
        return undefined;
    }, [
        keepMounted,
        mounted,
        elements,
        update,
        autoUpdateOptions
    ]);
    const renderedSide = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getSide */ .C0)(renderedPlacement);
    const logicalRenderedSide = getLogicalSide(sideParam, renderedSide, isRtl);
    const renderedAlign = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_2__/* .getAlignment */ .Sg)(renderedPlacement) || 'center';
    const anchorHidden = Boolean(middlewareData.hide?.referenceHidden);
    // Locks the flipped side, and the alignment too when the consumer opts in, while filtering
    // resizes the popup.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_12__/* .useIsoLayoutEffect */ .g)(()=>{
        if (lazyFlip && mounted && isPositioned && (renderedSide !== side || lockAlign && renderedAlign !== placementAlign)) {
            setMountPlacement(renderedPlacement);
        }
    }, [
        lazyFlip,
        lockAlign,
        mounted,
        isPositioned,
        renderedPlacement,
        renderedSide,
        renderedAlign,
        side,
        placementAlign
    ]);
    const arrowStyles = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            position: 'absolute',
            top: middlewareData.arrow?.y,
            left: middlewareData.arrow?.x
        }), [
        middlewareData.arrow
    ]);
    const arrowUncentered = middlewareData.arrow?.centerOffset !== 0;
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            positionerStyles: floatingStyles,
            arrowStyles,
            arrowRef,
            arrowUncentered,
            side: logicalRenderedSide,
            align: renderedAlign,
            physicalSide: renderedSide,
            anchorHidden,
            refs,
            context,
            isPositioned,
            update
        }), [
        floatingStyles,
        arrowStyles,
        arrowRef,
        arrowUncentered,
        logicalRenderedSide,
        renderedAlign,
        renderedSide,
        anchorHidden,
        refs,
        context,
        isPositioned,
        update
    ]);
}
function isRef(param) {
    return param != null && 'current' in param;
}


/***/ })

}]);