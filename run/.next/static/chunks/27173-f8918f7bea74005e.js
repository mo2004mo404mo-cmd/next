"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[27173],{

/***/ 34:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ useForcedRerendering)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useForcedRerendering auto */ 
/**
 * Returns a function that forces a rerender.
 */ function useForcedRerendering() {
    const [, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({});
    return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        setState({});
    }, []);
}


/***/ }),

/***/ 5122:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ endingStyle),
/* harmony export */   e: () => (/* binding */ startingStyle)
/* harmony export */ });
/**
 * Present when the component begins animating in.
 */
const startingStyle = 'data-starting-style';

/**
 * Present when the component is animating out.
 */
const endingStyle = 'data-ending-style';

/***/ }),

/***/ 7049:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ createGenericEventDetails),
/* harmony export */   d: () => (/* binding */ createChangeEventDetails)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8994);


/**
 * Maps a change `reason` string to the corresponding native event type.
 */

/**
 * Details of custom change events emitted by Base UI components.
 */

/**
 * Details of custom generic events emitted by Base UI components.
 */

/** Highlight navigation uses mouse events for hover and pointer events for leaving an item. */

/**
 * Creates a Base UI event details object with the given reason and utilities
 * for preventing Base UI's internal event handling.
 */
function createChangeEventDetails(reason, event, trigger, customProperties) {
  let canceled = false;
  let allowPropagation = false;
  const custom = customProperties ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__/* .EMPTY_OBJECT */ .t0;
  const details = {
    reason,
    event: event ?? new Event('base-ui'),
    cancel() {
      canceled = true;
    },
    allowPropagation() {
      allowPropagation = true;
    },
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return allowPropagation;
    },
    trigger,
    ...custom
  };
  return details;
}
function createGenericEventDetails(reason, event, customProperties) {
  const custom = customProperties ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__/* .EMPTY_OBJECT */ .t0;
  const details = {
    reason,
    event: event ?? new Event('base-ui'),
    ...custom
  };
  return details;
}

/***/ }),

/***/ 18813:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KP: () => (/* binding */ AnimationFrame),
/* harmony export */   NR: () => (/* binding */ useAnimationFrame)
/* harmony export */ });
/* unused harmony export resetAnimationFrameScheduler */
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14187);
/* harmony import */ var _useOnMount_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92592);
/* __next_internal_client_entry_do_not_use__ resetAnimationFrameScheduler,AnimationFrame,useAnimationFrame auto */ 

/** Unlike `setTimeout`, rAF doesn't guarantee a positive integer return value, so we can't have
 * a monomorphic `uint` type with `0` meaning empty.
 * See warning note at:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#return_value */ const EMPTY = null;
let LAST_RAF = globalThis.requestAnimationFrame;
class Scheduler {
    request(fn) {
        const id = this.nextId;
        this.nextId += 1;
        this.callbacks.push(fn);
        this.callbacksCount += 1;
        /* In a test environment with fake timers, a fake `requestAnimationFrame` can be called
     * but there's no guarantee that the animation frame will actually run before the fake
     * timers are teared, which leaves `isScheduled` set, but won't run our `tick()`. */ const didRAFChange =  false && (0);
        if (!this.isScheduled || didRAFChange) {
            requestAnimationFrame(this.tick);
            this.isScheduled = true;
        }
        return id;
    }
    cancel(id) {
        const index = id - this.startId;
        if (index < 0 || index >= this.callbacks.length) {
            return;
        }
        if (this.callbacks[index] === null) {
            return;
        }
        this.callbacks[index] = null;
        this.callbacksCount -= 1;
    }
    constructor(){
        /* This implementation uses an array as a backing data-structure for frame callbacks.
   * It allows `O(1)` callback cancelling by inserting a `null` in the array, though it
   * never calls the native `cancelAnimationFrame` if there are no frames left. This can
   * be much more efficient if there is a call pattern that alterns as
   * "request-cancel-request-cancel-…".
   * But in the case of "request-request-…-cancel-cancel-…", it leaves the final animation
   * frame to run anyway. We turn that frame into a `O(1)` no-op via `callbacksCount`. */ this.callbacks = [];
        this.callbacksCount = 0;
        this.nextId = 1;
        this.startId = 1;
        this.isScheduled = false;
        this.tick = (timestamp)=>{
            this.isScheduled = false;
            const currentCallbacks = this.callbacks;
            const currentCallbacksCount = this.callbacksCount;
            // Update these before iterating, callbacks could call `requestAnimationFrame` again.
            this.callbacks = [];
            this.callbacksCount = 0;
            this.startId = this.nextId;
            if (currentCallbacksCount > 0) {
                for(let i = 0; i < currentCallbacks.length; i += 1){
                    currentCallbacks[i]?.(timestamp);
                }
            }
        };
    }
}
let scheduler = new Scheduler();
/**
 * Replaces the shared scheduler and drops all pending animation frame callbacks.
 *
 * For test environments only. The scheduler is process-global, so a callback scheduled in one test
 * but never run (e.g. requested under fake timers that were torn down before the frame fired) would
 * otherwise survive into a later test and run there against stale state. Call between tests to drop
 * such leftovers.
 */ function resetAnimationFrameScheduler() {
    const previous = scheduler;
    scheduler = new Scheduler();
    // Continue the id sequence so `cancel()` calls from `AnimationFrame` instances created before the
    // reset cannot cancel callbacks scheduled after it.
    scheduler.nextId = previous.nextId;
    scheduler.startId = previous.nextId;
    // A frame requested before the reset may still be pending and holds the previous scheduler's
    // `tick`; empty its queue in place so that frame runs nothing when it eventually fires.
    previous.callbacks = [];
    previous.callbacksCount = 0;
}
class AnimationFrame {
    static create() {
        return new AnimationFrame();
    }
    static request(fn) {
        return scheduler.request(fn);
    }
    static cancel(id) {
        return scheduler.cancel(id);
    }
    /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */ request(fn) {
        this.cancel();
        this.currentId = scheduler.request(()=>{
            this.currentId = EMPTY;
            fn();
        });
    }
    constructor(){
        this.currentId = EMPTY;
        this.cancel = ()=>{
            if (this.currentId !== EMPTY) {
                scheduler.cancel(this.currentId);
                this.currentId = EMPTY;
            }
        };
        this.disposeEffect = ()=>{
            return this.cancel;
        };
    }
}
/**
 * A `requestAnimationFrame` with automatic cleanup and guard.
 */ function useAnimationFrame() {
    const timeout = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useRefWithInit */ .j)(AnimationFrame.create).current;
    (0,_useOnMount_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useOnMount */ .y)(timeout.disposeEffect);
    return timeout;
}


/***/ }),

/***/ 33654:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ resolveRef)
/* harmony export */ });
/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 */
function resolveRef(maybeRef) {
  if (maybeRef == null) {
    return maybeRef;
  }
  return 'current' in maybeRef ? maybeRef.current : maybeRef;
}

/***/ }),

/***/ 41900:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ transitionStatusMapping)
/* harmony export */ });
/* harmony import */ var _TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5122);


const STARTING_HOOK = {
  [_TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .startingStyle */ .e]: ''
};
const ENDING_HOOK = {
  [_TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .endingStyle */ .V]: ''
};
const transitionStatusMapping = {
  transitionStatus(value) {
    if (value === 'starting') {
      return STARTING_HOOK;
    }
    if (value === 'ending') {
      return ENDING_HOOK;
    }
    return null;
  }
};

/***/ }),

/***/ 42240:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ useValueChanged)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23068);
/* __next_internal_client_entry_do_not_use__ useValueChanged auto */ 


function useValueChanged(value, onChange) {
    const valueRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);
    const onChangeCallback = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)(onChange);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        if (valueRef.current !== value) {
            onChangeCallback(valueRef.current);
        }
        valueRef.current = value;
    }, [
        value,
        onChangeCallback
    ]);
}


/***/ }),

/***/ 47247:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ useId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _safeReact_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18153);
/* harmony import */ var _useForcedRerendering_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* __next_internal_client_entry_do_not_use__ useId auto */ 


let globalId = 0;
// TODO React 17: Remove `useGlobalId` once React 17 support is removed
function useGlobalId(idOverride, prefix = 'mui') {
    const defaultId = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const forceRerender = (0,_useForcedRerendering_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useForcedRerendering */ .g)();
    const id = idOverride ?? defaultId.current;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (defaultId.current == null) {
            // Fallback to this default id when possible.
            // Use the incrementing value for client-side rendering only.
            // We can't use it server-side.
            // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
            globalId += 1;
            defaultId.current = `${prefix}-${globalId}`;
            // Generate the fallback even while `idOverride` is set.
            // Removing the override then swaps in the existing id within the same commit.
            // Deferring generation would leave one commit with no id, breaking `htmlFor` and `aria-labelledby` links.
            // Only rerender when the fallback is the value being rendered.
            if (idOverride == null) {
                forceRerender();
            }
        }
    }, [
        idOverride,
        prefix,
        forceRerender
    ]);
    return id;
}
const maybeReactUseId = _safeReact_mjs__WEBPACK_IMPORTED_MODULE_2__/* .SafeReact */ .X.useId;
/**
 *
 * @example <div id={useId()} />
 * @param {string | undefined} idOverride overrides the generated id when provided
 * @param {string | undefined} prefix prefixes the generated id when provided
 * @returns {string | undefined}
 */ function useId(idOverride, prefix) {
    // React.useId() is only available from React 18.0.0.
    if (maybeReactUseId !== undefined) {
        const reactId = maybeReactUseId();
        return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
    }
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.useId` is invariant at runtime.
    return useGlobalId(idOverride, prefix);
}


/***/ }),

/***/ 62955:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ useBaseUiId)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47247);
/* __next_internal_client_entry_do_not_use__ useBaseUiId auto */ 
/**
 * Wraps `useId` and prefixes generated `id`s with `base-ui-`
 * @param {string | undefined} idOverride overrides the generated id when provided
 * @returns {string | undefined}
 */ function useBaseUiId(idOverride) {
    return (0,_base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_0__/* .useId */ .B)(idOverride, 'base-ui');
}


/***/ }),

/***/ 64951:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Timeout),
/* harmony export */   Z: () => (/* binding */ useTimeout)
/* harmony export */ });
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14187);
/* harmony import */ var _useOnMount_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92592);
/* __next_internal_client_entry_do_not_use__ Timeout,useTimeout auto */ 

const EMPTY = 0;
class Timeout {
    static create() {
        return new Timeout();
    }
    /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */ start(delay, fn) {
        this.clear();
        this.currentId = setTimeout(()=>{
            this.currentId = EMPTY;
            fn();
        }, delay); /* Node.js types are enabled in development */ 
    }
    isStarted() {
        return this.currentId !== EMPTY;
    }
    constructor(){
        this.currentId = EMPTY;
        this.clear = ()=>{
            if (this.currentId !== EMPTY) {
                clearTimeout(this.currentId);
                this.currentId = EMPTY;
            }
        };
        this.disposeEffect = ()=>{
            return this.clear;
        };
    }
}
/**
 * A `setTimeout` with automatic cleanup and guard.
 */ function useTimeout() {
    const timeout = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useRefWithInit */ .j)(Timeout.create).current;
    (0,_useOnMount_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useOnMount */ .y)(timeout.disposeEffect);
    return timeout;
}


/***/ }),

/***/ 72905:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ getFiniteAnimations)
/* harmony export */ });
/**
 * Excludes infinite animations, whose finished promises never resolve while they run.
 */
function getFiniteAnimations(element, options) {
  return element.getAnimations(options).filter(animation => {
    const timing = animation.effect?.getTiming();
    return timing?.duration !== Infinity && timing?.iterations !== Infinity;
  });
}

/***/ }),

/***/ 72924:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ useOpenChangeComplete)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23068);
/* harmony import */ var _useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73070);
/* __next_internal_client_entry_do_not_use__ useOpenChangeComplete auto */ 


/**
 * Calls the provided function when the CSS open/close animation or transition completes.
 */ function useOpenChangeComplete(parameters) {
    const { enabled = true, open, ref, batch = false, onComplete: onCompleteParam } = parameters;
    const onComplete = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)(onCompleteParam);
    const runOnceAnimationsFinish = (0,_useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useAnimationsFinished */ .V)(ref, open, batch);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!enabled) {
            return undefined;
        }
        const abortController = new AbortController();
        runOnceAnimationsFinish(onComplete, abortController.signal);
        return ()=>{
            abortController.abort();
        };
    }, [
        enabled,
        open,
        onComplete,
        runOnceAnimationsFinish
    ]);
}


/***/ }),

/***/ 73070:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ useAnimationsFinished)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47650);
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18813);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8994);
/* harmony import */ var _utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33654);
/* harmony import */ var _utils_getFiniteAnimations_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72905);
/* harmony import */ var _TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5122);
/* __next_internal_client_entry_do_not_use__ useAnimationsFinished auto */ 






let pendingCallbacks = null;
/**
 * Runs the callback in a synchronous flush before the browser paints, so that the
 * browser doesn't paint an intermediate frame: https://github.com/mui/base-ui/issues/979
 * Callbacks that become ready within the same microtask checkpoint (e.g. multiple elements
 * whose animations finish together) are batched into a single commit:
 * https://github.com/mui/base-ui/issues/5481
 */ function flushBeforePaint(fn) {
    if (!pendingCallbacks) {
        const callbacks = [];
        pendingCallbacks = callbacks;
        queueMicrotask(()=>{
            pendingCallbacks = null;
            react_dom__WEBPACK_IMPORTED_MODULE_0__.flushSync(()=>{
                for (const callback of callbacks){
                    callback();
                }
            });
        });
    }
    pendingCallbacks.push(fn);
}
/**
 * Executes a function once all animations have finished on the provided element.
 * If an animation is canceled, waits for any replacement animations before executing.
 * @param elementOrRef - The element to watch for animations.
 * @param waitForStartingStyleRemoved - Whether to wait for [data-starting-style] to be removed before checking for animations.
 * @param batch - Whether completions ready in the same microtask may be coalesced into a single
 * commit. A batched callback runs before earlier callbacks' React updates have committed, so only
 * opt in when the callback doesn't read state that another completion can change.
 * @returns A function that takes a callback to execute once all animations have finished, and an optional AbortSignal to abort the callback
 */ function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, batch = false) {
    const frame = (0,_base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_1__/* .useAnimationFrame */ .NR)();
    return (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((fnToExecute, /**
   * An optional [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that
   * can be used to abort `fnToExecute` before all the animations have finished.
   * @default null
   */ signal = null)=>{
        frame.cancel();
        const element = (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_3__/* .resolveRef */ .q)(elementOrRef);
        if (element == null) {
            return;
        }
        const resolvedElement = element;
        const done = ()=>{
            if (!batch) {
                // Synchronously flush the unmounting of the component so that the browser doesn't
                // paint: https://github.com/mui/base-ui/issues/979
                // Each callback gets its own commit so that later completions observe the React
                // updates caused by earlier ones.
                react_dom__WEBPACK_IMPORTED_MODULE_0__.flushSync(fnToExecute);
                return;
            }
            flushBeforePaint(()=>{
                // Re-check at flush time: the signal may abort between queueing and the flush.
                if (!signal?.aborted) {
                    fnToExecute();
                }
            });
        };
        if (typeof resolvedElement.getAnimations !== 'function' || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
            fnToExecute();
            return;
        }
        function exec() {
            // Discard fulfilled Animation values so unfinished animations cannot retain their targets.
            Promise.all((0,_utils_getFiniteAnimations_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getFiniteAnimations */ .h)(resolvedElement).map((animation)=>animation.finished.then(_base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__/* .NOOP */ .tE))).then(()=>{
                if (!signal?.aborted) {
                    done();
                }
            }, ()=>{
                if (signal?.aborted) {
                    return;
                }
                const currentAnimations = (0,_utils_getFiniteAnimations_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getFiniteAnimations */ .h)(resolvedElement);
                if (currentAnimations.some((animation)=>animation.pending || animation.playState !== 'finished')) {
                    // Sometimes animations can be aborted because a property they depend on changes while the animation plays.
                    // In such cases, we need to re-check if any new animations have started.
                    exec();
                    return;
                }
                done();
            });
        }
        if (waitForStartingStyleRemoved) {
            const startingStyleAttribute = _TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_6__/* .startingStyle */ .e;
            // If `[data-starting-style]` isn't present, fall back to waiting one more frame
            // to give "open" animations a chance to be registered.
            if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
                frame.request(exec);
                return;
            }
            // Wait for `[data-starting-style]` to have been removed.
            const attributeObserver = new MutationObserver(()=>{
                if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
                    attributeObserver.disconnect();
                    exec();
                }
            });
            attributeObserver.observe(resolvedElement, {
                attributes: true,
                attributeFilter: [
                    startingStyleAttribute
                ]
            });
            signal?.addEventListener('abort', ()=>attributeObserver.disconnect(), {
                once: true
            });
            return;
        }
        frame.request(exec);
    });
}


/***/ }),

/***/ 76175:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bo: () => (/* binding */ itemPress),
/* harmony export */   Dq: () => (/* binding */ listNavigation),
/* harmony export */   F4: () => (/* binding */ triggerFocus),
/* harmony export */   L5: () => (/* binding */ windowResize),
/* harmony export */   LO: () => (/* binding */ cancelOpen),
/* harmony export */   N7: () => (/* binding */ triggerHover),
/* harmony export */   Np: () => (/* binding */ outsidePress),
/* harmony export */   QJ: () => (/* binding */ keyboard),
/* harmony export */   SR: () => (/* binding */ closePress),
/* harmony export */   Ui: () => (/* binding */ triggerPress),
/* harmony export */   Vh: () => (/* binding */ initial),
/* harmony export */   Wn: () => (/* binding */ pointer),
/* harmony export */   Xn: () => (/* binding */ focusOut),
/* harmony export */   c: () => (/* binding */ missing),
/* harmony export */   dv: () => (/* binding */ none),
/* harmony export */   jv: () => (/* binding */ escapeKey),
/* harmony export */   p: () => (/* binding */ siblingOpen),
/* harmony export */   r9: () => (/* binding */ disabled),
/* harmony export */   zJ: () => (/* binding */ imperativeAction)
/* harmony export */ });
/* unused harmony exports linkPress, clearPress, chipRemovePress, trackPress, incrementPress, decrementPress, inputChange, inputClear, inputBlur, inputPaste, inputPress, closeWatcher, drag, wheel, scrub, popupClose, swipe */
const none = 'none';
const triggerPress = 'trigger-press';
const triggerHover = 'trigger-hover';
const triggerFocus = 'trigger-focus';
const outsidePress = 'outside-press';
const itemPress = 'item-press';
const closePress = 'close-press';
const linkPress = 'link-press';
const clearPress = 'clear-press';
const chipRemovePress = 'chip-remove-press';
const trackPress = 'track-press';
const incrementPress = 'increment-press';
const decrementPress = 'decrement-press';
const inputChange = 'input-change';
const inputClear = 'input-clear';
const inputBlur = 'input-blur';
const inputPaste = 'input-paste';
const inputPress = 'input-press';
const focusOut = 'focus-out';
const escapeKey = 'escape-key';
const closeWatcher = 'close-watcher';
const listNavigation = 'list-navigation';
const keyboard = 'keyboard';
const pointer = 'pointer';
const drag = 'drag';
const wheel = 'wheel';
const scrub = 'scrub';
const popupClose = 'popup-close';
const cancelOpen = 'cancel-open';
const siblingOpen = 'sibling-open';
const disabled = 'disabled';
const missing = 'missing';
const initial = 'initial';
const imperativeAction = 'imperative-action';
const swipe = 'swipe';
const windowResize = 'window-resize';

/***/ }),

/***/ 92592:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ useOnMount)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _empty_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8994);
/* __next_internal_client_entry_do_not_use__ useOnMount auto */ 

/**
 * A React.useEffect equivalent that runs once, when the component is mounted.
 */ function useOnMount(fn) {
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- no need to put `fn` in the dependency array
    /* eslint-disable react-hooks/exhaustive-deps */ react__WEBPACK_IMPORTED_MODULE_0__.useEffect(fn, _empty_mjs__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_ARRAY */ .Ml);
/* eslint-enable react-hooks/exhaustive-deps */ }


/***/ }),

/***/ 97378:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ useTransitionStatus)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18813);
/* __next_internal_client_entry_do_not_use__ useTransitionStatus auto */ 


/**
 * Provides a status string for CSS animations.
 * @param open - a boolean that determines if the element is open.
 * @param enableIdleState - a boolean that enables the `'idle'` state between `'starting'` and `'ending'`
 * @param deferEndingState - a boolean that delays the `'ending'` state by a frame
 * @param animateInitialOpen - a boolean that makes an element which mounts already open still go
 *   through `'starting'`. Off by default so content that was open on the first render (a
 *   `defaultOpen` popup on page load, SSR'd markup) doesn't animate in.
 */ function useTransitionStatus(open, enableIdleState = false, deferEndingState = false, animateInitialOpen = false) {
    const [transitionStatus, setTransitionStatus] = react__WEBPACK_IMPORTED_MODULE_0__.useState(open && enableIdleState ? 'idle' : undefined);
    // Starting at `false` while open lets the `open && !mounted` branch below run on the first
    // render, which is what produces the `'starting'` phase. React re-renders before committing, so
    // the element is still mounted in the same pass.
    const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(open && !animateInitialOpen);
    if (open && !mounted) {
        setMounted(true);
        setTransitionStatus('starting');
    }
    if (!open && mounted && transitionStatus !== 'ending' && !deferEndingState) {
        setTransitionStatus('ending');
    }
    if (!open && !mounted && transitionStatus === 'ending') {
        setTransitionStatus(undefined);
    }
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open && mounted && transitionStatus !== 'ending' && deferEndingState) {
            const frame = _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__/* .AnimationFrame */ .KP.request(()=>{
                setTransitionStatus('ending');
            });
            return ()=>{
                _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__/* .AnimationFrame */ .KP.cancel(frame);
            };
        }
        return undefined;
    }, [
        open,
        mounted,
        transitionStatus,
        deferEndingState
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__/* .useIsoLayoutEffect */ .g)(()=>{
        // Nothing to clear when the element mounted open or reopened after its exit settled.
        if (!open || enableIdleState || transitionStatus === undefined) {
            return undefined;
        }
        const frame = _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__/* .AnimationFrame */ .KP.request(()=>{
            // Avoid `flushSync` here due to Firefox.
            // See https://github.com/mui/base-ui/pull/3424
            setTransitionStatus(undefined);
        });
        return ()=>{
            _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__/* .AnimationFrame */ .KP.cancel(frame);
        };
    }, [
        enableIdleState,
        open,
        transitionStatus
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!open || !enableIdleState) {
            return undefined;
        }
        if (open && mounted && transitionStatus !== 'idle') {
            setTransitionStatus('starting');
        }
        const frame = _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__/* .AnimationFrame */ .KP.request(()=>{
            setTransitionStatus('idle');
        });
        return ()=>{
            _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__/* .AnimationFrame */ .KP.cancel(frame);
        };
    }, [
        enableIdleState,
        open,
        mounted,
        transitionStatus
    ]);
    return {
        mounted,
        setMounted,
        transitionStatus
    };
}


/***/ })

}]);