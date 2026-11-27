"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[68298],{

/***/ 1748:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ resolveClassName)
/* harmony export */ });
/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */
function resolveClassName(className, state) {
  return typeof className === 'function' ? className(state) : className;
}

/***/ }),

/***/ 6791:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $4: () => (/* binding */ getParentNode),
/* harmony export */   CP: () => (/* binding */ getNodeScroll),
/* harmony export */   L9: () => (/* binding */ getComputedStyle),
/* harmony export */   Ll: () => (/* binding */ isNode),
/* harmony export */   Lv: () => (/* binding */ isTableElement),
/* harmony export */   Ng: () => (/* binding */ isShadowRoot),
/* harmony export */   Tc: () => (/* binding */ isWebKit),
/* harmony export */   Tf: () => (/* binding */ isTopLayer),
/* harmony export */   ZU: () => (/* binding */ isOverflowElement),
/* harmony export */   _m: () => (/* binding */ getFrameElement),
/* harmony export */   ep: () => (/* binding */ getDocumentElement),
/* harmony export */   eu: () => (/* binding */ isLastTraversableNode),
/* harmony export */   gJ: () => (/* binding */ getContainingBlock),
/* harmony export */   mq: () => (/* binding */ getNodeName),
/* harmony export */   sQ: () => (/* binding */ isContainingBlock),
/* harmony export */   sb: () => (/* binding */ isHTMLElement),
/* harmony export */   v9: () => (/* binding */ getOverflowAncestors),
/* harmony export */   vq: () => (/* binding */ isElement),
/* harmony export */   zk: () => (/* binding */ getWindow)
/* harmony export */ });
/* unused harmony export getNearestOverflowAncestor */
function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== 'inline' && display !== 'contents';
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(':popover-open')) {
      return true;
    }
  } catch (_e) {
    // no-op
  }
  try {
    return element.matches(':modal');
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = value => !!value && value !== 'none';
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || '') || containRe.test(css.contain || '');
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none');
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return (node.ownerDocument || node).body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}




/***/ }),

/***/ 7862:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ useFocusableWhenDisabled)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useFocusableWhenDisabled auto */ 
function useFocusableWhenDisabled(parameters) {
    const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
    const isFocusableComposite = composite && focusableWhenDisabled !== false;
    const isNonFocusableComposite = composite && focusableWhenDisabled === false;
    // we can't explicitly assign `undefined` to any of these props because it
    // would otherwise prevent subsequently merged props from setting them
    const props = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        const additionalProps = {
            // allow Tabbing away from focusableWhenDisabled elements
            onKeyDown (event) {
                if (disabled && focusableWhenDisabled && event.key !== 'Tab') {
                    event.preventDefault();
                }
            }
        };
        if (!composite) {
            additionalProps.tabIndex = tabIndexProp;
            if (!isNativeButton && disabled) {
                additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
            }
        }
        if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) {
            additionalProps['aria-disabled'] = disabled;
        }
        if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
            additionalProps.disabled = disabled;
        }
        return additionalProps;
    }, [
        composite,
        disabled,
        focusableWhenDisabled,
        isFocusableComposite,
        isNonFocusableComposite,
        isNativeButton,
        tabIndexProp
    ]);
    return {
        props
    };
}


/***/ }),

/***/ 8994:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ml: () => (/* binding */ EMPTY_ARRAY),
/* harmony export */   t0: () => (/* binding */ EMPTY_OBJECT),
/* harmony export */   tE: () => (/* binding */ NOOP)
/* harmony export */ });
function NOOP() {}

// Typed as mutable `never[]` so it is assignable to any `T[]` fallback (for example
// `defaultValue ?? EMPTY_ARRAY` in `useControlled` callers) without widening `T`.
// Frozen so a write through a widened alias throws instead of mutating the shared singleton.
const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

/***/ }),

/***/ 14187:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ useRefWithInit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useRefWithInit auto */ 
const UNINITIALIZED = {};
/**
 * A React.useRef() that is initialized with a function. Note that it accepts an optional
 * initialization argument, so the initialization function doesn't need to be an inline closure.
 *
 * @usage
 *   const ref = useRefWithInit(sortColumns, columns)
 */ function useRefWithInit(init, initArg) {
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(UNINITIALIZED);
    if (ref.current === UNINITIALIZED) {
        ref.current = init(initArg);
    }
    return ref;
}


/***/ }),

/***/ 18153:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ SafeReact)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


/**
 * A clone of the React namespace for reading APIs that may be missing in older
 * supported React versions. Bundlers can rewrite direct `React.someNewApi`
 * reads into named imports, which breaks React 17. Reading from this cloned
 * object keeps those lookups optional.
 *
 * @see https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
 */
const SafeReact = {
  .../*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))
};

/***/ }),

/***/ 23068:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ useStableCallback)
/* harmony export */ });
/* harmony import */ var _safeReact_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18153);
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14187);
/* __next_internal_client_entry_do_not_use__ useStableCallback auto */ 

const useInsertionEffect = _safeReact_mjs__WEBPACK_IMPORTED_MODULE_0__/* .SafeReact */ .X.useInsertionEffect;
const useSafeInsertionEffect = // React 17 doesn't have useInsertionEffect.
useInsertionEffect && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
useInsertionEffect !== _safeReact_mjs__WEBPACK_IMPORTED_MODULE_0__/* .SafeReact */ .X.useLayoutEffect ? useInsertionEffect : (fn)=>fn();
/**
 * Stabilizes the function passed so it's always the same between renders.
 *
 * The function becomes non-reactive to any values it captures.
 * It can safely be passed as a dependency of `React.useMemo` and `React.useEffect` without re-triggering them if its captured values change.
 *
 * The function must only be called inside effects and event handlers, never during render (which throws an error).
 *
 * This hook is a more permissive version of React 19.2's `React.useEffectEvent` in that it can be passed through contexts and called in event handler props, not just effects.
 */ function useStableCallback(callback) {
    const stable = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useRefWithInit */ .j)(createStableCallback).current;
    stable.next = callback;
    useSafeInsertionEffect(stable.effect);
    return stable.trampoline;
}
function createStableCallback() {
    const stable = {
        next: undefined,
        callback: assertNotCalled,
        trampoline: (...args)=>stable.callback?.(...args),
        effect: ()=>{
            stable.callback = stable.next;
        }
    };
    return stable;
}
function assertNotCalled() {
    if (false) {}
}


/***/ }),

/***/ 23974:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ getStateAttributesProps)
/* harmony export */ });
function getStateAttributesProps(state, customMapping) {
  const props = {};

  /* eslint-disable-next-line guard-for-in */
  for (const key in state) {
    const value = state[key];
    if (customMapping?.hasOwnProperty(key)) {
      const customProps = customMapping[key](value);
      if (customProps != null) {
        Object.assign(props, customProps);
      }
      continue;
    }
    if (value === true) {
      props[`data-${key.toLowerCase()}`] = '';
    } else if (value) {
      props[`data-${key.toLowerCase()}`] = value.toString();
    }
  }
  return props;
}

/***/ }),

/***/ 25803:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export createFormatErrorMessage */
/**
 * Creates a formatErrorMessage function with a custom URL and prefix.
 * @param baseUrl - The base URL for the error page (e.g., 'https://base-ui.com/production-error')
 * @param prefix - The prefix for the error message (e.g., 'Base UI')
 * @returns A function that formats error messages with the given URL and prefix
 */
function createFormatErrorMessage(baseUrl, prefix) {
  return function formatErrorMessage(code, ...args) {
    const url = new URL(baseUrl);
    url.searchParams.set('code', code.toString());
    args.forEach(arg => url.searchParams.append('args[]', arg));
    return `${prefix} error #${code}; visit ${url} for the full message.`;
  };
}

/**
 * WARNING: Don't import this directly. It's imported by the code generated by
 * `@mui/internal-babel-plugin-minify-errors`. Make sure to always use string literals in `Error`
 * constructors to ensure the plugin works as expected. Supported patterns include:
 *   throw new Error('My message');
 *   throw new Error(`My message: ${foo}`);
 *   throw new Error(`My message: ${foo}` + 'another string');
 *   ...
 */
const formatErrorMessage = createFormatErrorMessage('https://base-ui.com/production-error', 'Base UI');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatErrorMessage);

/***/ }),

/***/ 26243:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ getReactElementRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _reactVersion_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39034);



/**
 * Extracts the `ref` from a React element, handling different React versions.
 */
function getReactElementRef(element) {
  if (! /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(element)) {
    return null;
  }
  const reactElement = element;
  const propsWithRef = reactElement.props;
  return ((0,_reactVersion_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isReactVersionAtLeast */ ._)(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}

/***/ }),

/***/ 39034:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ isReactVersionAtLeast)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);

const majorVersion = parseInt(react__WEBPACK_IMPORTED_MODULE_0__.version, 10);
function isReactVersionAtLeast(reactVersionToCheck) {
  return majorVersion >= reactVersionToCheck;
}

/***/ }),

/***/ 40253:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PT: () => (/* binding */ makeEventPreventable),
/* harmony export */   VN: () => (/* binding */ mergeClassNames),
/* harmony export */   lZ: () => (/* binding */ mergePropsN),
/* harmony export */   v6: () => (/* binding */ mergeProps)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51909);

const EMPTY_PROPS = {};

/* eslint-disable id-denylist */
/**
 * Merges multiple sets of React props. It follows the Object.assign pattern where the rightmost object's fields overwrite
 * the conflicting ones from others. This doesn't apply to event handlers, `className` and `style` props.
 *
 * Event handlers are merged and called in right-to-left order (rightmost handler executes first, leftmost last).
 * For React synthetic events, the rightmost handler can prevent prior (left-positioned) handlers from executing
 * by calling `event.preventBaseUIHandler()`. For non-synthetic events (custom events with primitive/object values),
 * all handlers always execute without prevention capability.
 *
 * The `className` prop is merged by concatenating classes in right-to-left order (rightmost class appears first in the string).
 * The `style` prop is merged with rightmost styles overwriting the prior ones.
 *
 * Props can either be provided as objects or as functions that take the previous props as an argument.
 * The function will receive the merged props up to that point (going from left to right):
 * so in the case of `(obj1, obj2, fn, obj3)`, `fn` will receive the merged props of `obj1` and `obj2`.
 * The function is responsible for chaining event handlers if needed (that is, we don't run the merge logic).
 *
 * Event handlers returned by the functions are not automatically prevented when `preventBaseUIHandler` is called.
 * They must check `event.baseUIHandlerPrevented` themselves and bail out if it's true.
 *
 * @important **`ref` is not merged.**
 * @param a Props object to merge.
 * @param b Props object to merge. The function will overwrite conflicting props from `a`.
 * @param c Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @param d Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @param e Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @returns The merged props.
 * @public
 */

function mergeProps(a, b, c, d, e) {
  if (!c && !d && !e && !a) {
    return createInitialMergedProps(b);
  }

  // We need to mutably own `merged`.
  let merged = createInitialMergedProps(a);
  if (b) {
    merged = mergeInto(merged, b);
  }
  if (c) {
    merged = mergeInto(merged, c);
  }
  if (d) {
    merged = mergeInto(merged, d);
  }
  if (e) {
    merged = mergeInto(merged, e);
  }
  return merged;
}
/* eslint-enable id-denylist */

/**
 * Merges an arbitrary number of React props using the same logic as {@link mergeProps}.
 * This function accepts an array of props instead of individual arguments.
 *
 * This has slightly lower performance than {@link mergeProps} due to accepting an array
 * instead of a fixed number of arguments. Prefer {@link mergeProps} when merging 5 or
 * fewer prop sets for better performance.
 *
 * @param props Array of props to merge.
 * @returns The merged props.
 * @see mergeProps
 * @public
 */
function mergePropsN(props) {
  if (props.length === 0) {
    return EMPTY_PROPS;
  }
  if (props.length === 1) {
    return createInitialMergedProps(props[0]);
  }

  // We need to mutably own `merged`.
  let merged = createInitialMergedProps(props[0]);
  for (let i = 1; i < props.length; i += 1) {
    merged = mergeInto(merged, props[i]);
  }
  return merged;
}
function createInitialMergedProps(inputProps) {
  if (isPropsGetter(inputProps)) {
    // Getter-returned handlers intentionally keep their existing semantics.
    return {
      ...inputProps(EMPTY_PROPS)
    };
  }
  return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
  if (isPropsGetter(inputProps)) {
    return inputProps(merged);
  }
  return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
  const copiedProps = {
    ...inputProps
  };

  // `copiedProps` is our fresh own-object copy, so iterating with `for...in` is safe here.
  // eslint-disable-next-line guard-for-in
  for (const propName in copiedProps) {
    const propValue = copiedProps[propName];
    if (isEventHandler(propName, propValue)) {
      copiedProps[propName] = wrapEventHandler(propValue);
    }
  }
  return copiedProps;
}

/**
 * Merges two sets of props. In case of conflicts, the external props take precedence.
 */
function mutablyMergeInto(mergedProps, externalProps) {
  if (!externalProps) {
    return mergedProps;
  }

  // eslint-disable-next-line guard-for-in
  for (const propName in externalProps) {
    const externalPropValue = externalProps[propName];
    switch (propName) {
      case 'style':
        {
          mergedProps[propName] = (0,_base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_0__/* .mergeObjects */ .r)(mergedProps.style, externalPropValue);
          break;
        }
      case 'className':
        {
          mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
          break;
        }
      default:
        {
          if (isEventHandler(propName, externalPropValue)) {
            mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
          } else {
            mergedProps[propName] = externalPropValue;
          }
        }
    }
  }
  return mergedProps;
}
function isEventHandler(key, value) {
  // This approach is more efficient than using a regex.
  const code0 = key.charCodeAt(0);
  const code1 = key.charCodeAt(1);
  const code2 = key.charCodeAt(2);
  return code0 === 111 /* o */ && code1 === 110 /* n */ && code2 >= 65 /* A */ && code2 <= 90 /* Z */ && (typeof value === 'function' || typeof value === 'undefined');
}
function isPropsGetter(inputProps) {
  return typeof inputProps === 'function';
}
function mergeEventHandlers(ourHandler, theirHandler) {
  if (!theirHandler) {
    return ourHandler;
  }
  if (!ourHandler) {
    return wrapEventHandler(theirHandler);
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      const baseUIEvent = event;
      makeEventPreventable(baseUIEvent);
      const result = theirHandler(...args);
      if (!baseUIEvent.baseUIHandlerPrevented) {
        ourHandler?.(...args);
      }
      return result;
    }
    const result = theirHandler(...args);
    ourHandler?.(...args);
    return result;
  };
}
function wrapEventHandler(handler) {
  if (!handler) {
    return handler;
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      makeEventPreventable(event);
    }
    return handler(...args);
  };
}
function makeEventPreventable(event) {
  event.preventBaseUIHandler = () => {
    event.baseUIHandlerPrevented = true;
  };
  return event;
}
function mergeClassNames(ourClassName, theirClassName) {
  if (theirClassName) {
    if (ourClassName) {
      // eslint-disable-next-line prefer-template
      return theirClassName + ' ' + ourClassName;
    }
    return theirClassName;
  }
  return ourClassName;
}
function isSyntheticEvent(event) {
  return event != null && typeof event === 'object' && 'nativeEvent' in event;
}

/***/ }),

/***/ 42176:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ useButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6791);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66652);
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40253);
/* harmony import */ var _composite_root_CompositeRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70481);
/* harmony import */ var _utils_useFocusableWhenDisabled_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7862);
/* harmony import */ var _utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44137);
/* __next_internal_client_entry_do_not_use__ useButton auto */ 









function useButton(parameters = {}) {
    const { disabled = false, focusableWhenDisabled, tabIndex = 0, native: isNativeButton = true, composite: compositeProp } = parameters;
    const elementRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const compositeRootContext = (0,_composite_root_CompositeRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useCompositeRootContext */ .G)(true);
    const isCompositeItem = compositeProp ?? compositeRootContext !== undefined;
    const { props: focusableWhenDisabledProps } = (0,_utils_useFocusableWhenDisabled_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useFocusableWhenDisabled */ .S)({
        focusableWhenDisabled,
        disabled,
        composite: isCompositeItem,
        tabIndex,
        isNativeButton
    });
    if (false) {}
    // handles a disabled composite button rendering another button, e.g.
    // <Toolbar.Button disabled render={<Menu.Trigger />} />
    // the `disabled` prop needs to pass through 2 `useButton`s then finally
    // delete the `disabled` attribute from DOM
    const updateDisabled = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        const element = elementRef.current;
        if (!isButtonElement(element)) {
            return;
        }
        if (isCompositeItem && disabled && focusableWhenDisabledProps.disabled === undefined && element.disabled) {
            element.disabled = false;
        }
    }, [
        disabled,
        focusableWhenDisabledProps.disabled,
        isCompositeItem
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsoLayoutEffect */ .g)(updateDisabled, [
        updateDisabled
    ]);
    const getButtonProps = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((externalProps = {})=>{
        const { onClick: externalOnClick, onMouseDown: externalOnMouseDown, onKeyUp: externalOnKeyUp, onKeyDown: externalOnKeyDown, onPointerDown: externalOnPointerDown, ...otherExternalProps } = externalProps;
        return (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .mergeProps */ .v6)({
            onClick (event) {
                if (disabled) {
                    event.preventDefault();
                    return;
                }
                externalOnClick?.(event);
            },
            onMouseDown (event) {
                if (!disabled) {
                    externalOnMouseDown?.(event);
                }
            },
            onKeyDown (event) {
                if (disabled) {
                    return;
                }
                (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .makeEventPreventable */ .PT)(event);
                externalOnKeyDown?.(event);
                if (event.baseUIHandlerPrevented) {
                    return;
                }
                const isCurrentTarget = event.target === event.currentTarget;
                const currentTarget = event.currentTarget;
                const isButton = isButtonElement(currentTarget);
                const isLink = !isNativeButton && isValidLinkElement(currentTarget);
                const shouldClick = isCurrentTarget && (isNativeButton ? isButton : !isLink);
                const isEnterKey = event.key === 'Enter';
                const isSpaceKey = event.key === ' ';
                const role = currentTarget.getAttribute('role');
                const isTextNavigationRole = role?.startsWith('menuitem') || role === 'option' || role === 'gridcell';
                if (isCurrentTarget && isCompositeItem && isSpaceKey) {
                    if (event.defaultPrevented && isTextNavigationRole) {
                        return;
                    }
                    event.preventDefault();
                    // Only a native-mode item that isn't a real <button> is excluded.
                    if (!isNativeButton || isButton) {
                        event.preventBaseUIHandler();
                        (0,_utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_5__/* .dispatchClickWithModifiers */ .B)(currentTarget, event);
                    }
                    return;
                }
                // Keyboard accessibility for native and non-native elements.
                if (!shouldClick || isNativeButton || !isSpaceKey && !isEnterKey) {
                    // Space activates links on keyup (`role="button"` semantics, matching the
                    // composite path); prevent the page scroll Space would otherwise trigger.
                    // Enter is left to the browser's native link activation.
                    if (isCurrentTarget && isLink && isSpaceKey) {
                        event.preventDefault();
                    }
                    return;
                }
                // Match native buttons: preventing the keydown's default cancels activation.
                if (event.defaultPrevented) {
                    return;
                }
                event.preventDefault();
                if (isEnterKey) {
                    event.preventBaseUIHandler();
                    (0,_utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_5__/* .dispatchClickWithModifiers */ .B)(currentTarget, event);
                }
            },
            onKeyUp (event) {
                if (disabled) {
                    return;
                }
                // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
                // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
                (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .makeEventPreventable */ .PT)(event);
                externalOnKeyUp?.(event);
                if (event.target === event.currentTarget && isNativeButton && isCompositeItem && isButtonElement(event.currentTarget) && event.key === ' ') {
                    event.preventDefault();
                    return;
                }
                if (event.baseUIHandlerPrevented) {
                    return;
                }
                // Keyboard accessibility for non interactive elements.
                // Match native buttons: preventing the keyup's default cancels Space activation.
                // Limitation: unlike a native <button>, a prevented *keydown* cannot cancel the
                // activation — no state is kept between keydown and keyup, so we can't tell
                // whether the keydown was prevented or even happened on this element.
                if (event.target === event.currentTarget && !isNativeButton && !isCompositeItem && !event.defaultPrevented && event.key === ' ') {
                    event.preventBaseUIHandler();
                    (0,_utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_5__/* .dispatchClickWithModifiers */ .B)(event.currentTarget, event);
                }
            },
            onPointerDown (event) {
                if (disabled) {
                    event.preventDefault();
                    return;
                }
                externalOnPointerDown?.(event);
            }
        }, isNativeButton ? {
            type: 'button'
        } : {
            role: 'button'
        }, focusableWhenDisabledProps, otherExternalProps);
    }, [
        disabled,
        focusableWhenDisabledProps,
        isCompositeItem,
        isNativeButton
    ]);
    const buttonRef = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_6__/* .useStableCallback */ .K)((element)=>{
        elementRef.current = element;
        updateDisabled();
    });
    return {
        getButtonProps,
        buttonRef
    };
}
function isButtonElement(elem) {
    return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_7__/* .isHTMLElement */ .sb)(elem) && elem.tagName === 'BUTTON';
}
function isValidLinkElement(elem) {
    return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_7__/* .isHTMLElement */ .sb)(elem) && elem.tagName === 'A' && Boolean(elem.href);
}


/***/ }),

/***/ 44137:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ dispatchClickWithModifiers)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);

/**
 * Dispatches a constructed click on the target so it carries the source event's
 * modifier state, which `click()` always reports as unpressed. Like `click()`,
 * the untrusted click still runs native activation behavior (form submission,
 * link navigation).
 * `detail` defaults to 0 and `pointerType` to `''` (the native convention for
 * keyboard-generated clicks). When the click represents a mouse gesture, pass
 * `detail: 1` and `pointerType: 'mouse'` so consumers don't classify it as a
 * keyboard activation.
 */
function dispatchClickWithModifiers(target, sourceEvent, {
  detail = 0,
  pointerType = ''
} = {}) {
  target.dispatchEvent(new ((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_0__/* .getWindow */ .zk)(target).PointerEvent)('click', {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail,
    pointerType,
    shiftKey: sourceEvent.shiftKey,
    ctrlKey: sourceEvent.ctrlKey,
    altKey: sourceEvent.altKey,
    metaKey: sourceEvent.metaKey
  }));
}

/***/ }),

/***/ 51909:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ mergeObjects)
/* harmony export */ });
function mergeObjects(a, b) {
  if (a && !b) {
    return a;
  }
  if (!a && b) {
    return b;
  }
  if (a || b) {
    return {
      ...a,
      ...b
    };
  }
  return undefined;
}

/***/ }),

/***/ 55218:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ useMergedRefsN),
/* harmony export */   a: () => (/* binding */ useMergedRefs)
/* harmony export */ });
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14187);


/**
 * Merges refs into a single memoized callback ref or `null`.
 * This makes sure multiple refs are updated together and have the same value.
 *
 * This function accepts up to four refs. If you need to merge more, or have an unspecified number of refs to merge,
 * use `useMergedRefsN` instead.
 */

function useMergedRefs(a, b, c, d) {
  const forkRef = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useRefWithInit */ .j)(createForkRef).current;
  if (didChange(forkRef, a, b, c, d)) {
    update(forkRef, [a, b, c, d]);
  }
  return forkRef.callback;
}

/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 *
 * If you need to merge a fixed number (up to four) of refs, use `useMergedRefs` instead for better performance.
 */
function useMergedRefsN(refs) {
  const forkRef = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useRefWithInit */ .j)(createForkRef).current;
  if (didChangeN(forkRef, refs)) {
    update(forkRef, refs);
  }
  return forkRef.callback;
}
function createForkRef() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function didChange(forkRef, a, b, c, d) {
  // prettier-ignore
  return forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d;
}
function didChangeN(forkRef, newRefs) {
  return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
  forkRef.refs = refs;
  if (refs.every(ref => ref == null)) {
    forkRef.callback = null;
    return;
  }
  forkRef.callback = instance => {
    if (forkRef.cleanup) {
      forkRef.cleanup();
      forkRef.cleanup = null;
    }
    if (instance != null) {
      const cleanupCallbacks = Array(refs.length).fill(null);
      for (let i = 0; i < refs.length; i += 1) {
        const ref = refs[i];
        if (ref == null) {
          continue;
        }
        switch (typeof ref) {
          case 'function':
            {
              const refCleanup = ref(instance);
              if (typeof refCleanup === 'function') {
                cleanupCallbacks[i] = refCleanup;
              }
              break;
            }
          case 'object':
            {
              ref.current = instance;
              break;
            }
          default:
        }
      }
      forkRef.cleanup = () => {
        for (let i = 0; i < refs.length; i += 1) {
          const ref = refs[i];
          if (ref == null) {
            continue;
          }
          switch (typeof ref) {
            case 'function':
              {
                const cleanupCallback = cleanupCallbacks[i];
                if (typeof cleanupCallback === 'function') {
                  cleanupCallback();
                } else {
                  // Legacy ref with no attach-time cleanup: detach by calling it with `null`.
                  // It returns nothing; React 19 cleanups are handled in the branch above.
                  void ref(null);
                }
                break;
              }
            case 'object':
              {
                ref.current = null;
                break;
              }
            default:
          }
        }
      };
    }
  };
}

/***/ }),

/***/ 66652:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ useIsoLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useIsoLayoutEffect auto */ 
const noop = ()=>{};
const useIsoLayoutEffect = typeof document !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : noop;


/***/ }),

/***/ 70481:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ useCompositeRootContext),
/* harmony export */   H: () => (/* binding */ CompositeRootContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ CompositeRootContext,useCompositeRootContext auto */ 

const CompositeRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useCompositeRootContext(optional = false) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(CompositeRootContext);
    if (context === undefined && !optional) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(16));
    }
    return context;
}


/***/ }),

/***/ 73234:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ resolveStyle)
/* harmony export */ });
/**
 * If the provided style is an object, it will be returned as is.
 * Otherwise, the function will call the style function with the state as the first argument.
 *
 * @param style
 * @param state
 */
function resolveStyle(style, state) {
  return typeof style === 'function' ? style(state) : style;
}

/***/ }),

/***/ 88401:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ useRenderElement),
/* harmony export */   x: () => (/* binding */ unwrapLazyRenderProp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(55218);
/* harmony import */ var _base_ui_utils_getReactElementRef__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(26243);
/* harmony import */ var _base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(51909);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8994);
/* harmony import */ var _getStateAttributesProps_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23974);
/* harmony import */ var _utils_resolveClassName_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1748);
/* harmony import */ var _utils_resolveStyle_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(73234);
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40253);











/**
 * Renders a Base UI element.
 *
 * @param element The default HTML element to render. Can be overridden by the `render` prop.
 * @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
 * @param params Additional parameters for rendering the element.
 */
function useRenderElement(element, componentProps, params = {}) {
  let renderProp = componentProps.render;
  if (params.enabled !== false) {
    // A pending lazy element suspends when unwrapped, so leave it wrapped while disabled.
    renderProp = unwrapLazyRenderProp(renderProp);
  }
  const outProps = useRenderElementProps(componentProps, params, renderProp);
  if (params.enabled === false) {
    return null;
  }
  const state = params.state ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0;
  return evaluateRenderProp(element, renderProp, outProps, state);
}

/**
 * Computes render element final props.
 */
function useRenderElementProps(componentProps, params, renderProp) {
  const {
    className: classNameProp,
    style: styleProp
  } = componentProps;
  const {
    state = _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0,
    ref,
    props,
    stateAttributesMapping,
    enabled = true
  } = params;
  const className = enabled ? (0,_utils_resolveClassName_mjs__WEBPACK_IMPORTED_MODULE_2__/* .resolveClassName */ .S)(classNameProp, state) : undefined;
  const style = enabled ? (0,_utils_resolveStyle_mjs__WEBPACK_IMPORTED_MODULE_3__/* .resolveStyle */ .m)(styleProp, state) : undefined;
  const stateProps = enabled ? (0,_getStateAttributesProps_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getStateAttributesProps */ .v)(state, stateAttributesMapping) : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0;
  const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : undefined;

  // Ensure outProps is always a new mutable object when enabled, never EMPTY_OBJECT.
  // This prevents potential TypeError when setting ref, className, or style properties,
  // since EMPTY_OBJECT is frozen and mutations would fail in strict mode.
  const outProps = enabled ? (0,_base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_5__/* .mergeObjects */ .r)(stateProps, resolvedProps) ?? {} : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0;

  // SAFETY: The `useMergedRefs` functions use a single hook to store the same value,
  // switching between them at runtime is safe. If this assertion fails, React will
  // throw at runtime anyway.
  // This also skips the `useMergedRefs` call on the server, which is fine because
  // refs are not used on the server side.
  /* eslint-disable react-hooks/rules-of-hooks */
  if (typeof document !== 'undefined') {
    if (!enabled) {
      // Called only to keep the hook order stable when disabled; the merged ref is unused.
      void (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_6__/* .useMergedRefs */ .a)(null, null);
    } else if (Array.isArray(ref)) {
      outProps.ref = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_6__/* .useMergedRefsN */ .U)([outProps.ref, (0,_base_ui_utils_getReactElementRef__WEBPACK_IMPORTED_MODULE_7__/* .getReactElementRef */ .v)(renderProp), ...ref]);
    } else {
      outProps.ref = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_6__/* .useMergedRefs */ .a)(outProps.ref, (0,_base_ui_utils_getReactElementRef__WEBPACK_IMPORTED_MODULE_7__/* .getReactElementRef */ .v)(renderProp), ref);
    }
  }
  if (!enabled) {
    return _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__/* .EMPTY_OBJECT */ .t0;
  }
  if (className !== undefined) {
    outProps.className = (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_8__/* .mergeClassNames */ .VN)(outProps.className, className);
  }
  if (style !== undefined) {
    outProps.style = (0,_base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_5__/* .mergeObjects */ .r)(outProps.style, style);
  }
  return outProps;
}
function resolveRenderFunctionProps(props) {
  if (Array.isArray(props)) {
    return (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_8__/* .mergePropsN */ .lZ)(props);
  }
  return (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_8__/* .mergeProps */ .v6)(undefined, props);
}

// The symbol React uses internally for lazy components
// https://github.com/react/react/blob/a0566250b210499b4c5677f5ac2eedbd71d51a1b/packages/shared/ReactSymbols.js#L31
//
// TODO delete once https://github.com/react/react/issues/32392 is fixed
const REACT_LAZY_TYPE = Symbol.for('react.lazy');
const COMPONENT_IDENTIFIER_PATTERN = /^[A-Z][A-Za-z0-9$]*$/;
const LOWERCASE_CHARACTER_PATTERN = /[a-z]/;

// Workaround for https://github.com/react/react/issues/32392
// The Flight client hands over a lazy wrapper in place of a render element created in a
// Server Component. The wrapper exposes no `.props` or `.ref`, so it must be unwrapped
// before those are read. This works because the toArray() logic unwraps the lazy
// element type in
// https://github.com/react/react/blob/a0566250b210499b4c5677f5ac2eedbd71d51a1b/packages/react/src/ReactChildren.js#L186
function unwrapLazyRenderProp(render) {
  // `$$typeof` is a React internal, absent from the public element types.
  if (render?.$$typeof !== REACT_LAZY_TYPE) {
    return render;
  }
  // Keep the wrapper unless it unwraps to an element, so an invalid render prop is still
  // reported as one instead of silently falling back to the default element.
  const unwrapped = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(render)[0];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(unwrapped) ? unwrapped : render;
}
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === 'function') {
      if (false) {}
      return render(props, state);
    }
    const mergedProps = (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_8__/* .mergeProps */ .v6)(props, render.props);
    mergedProps.ref = props.ref;

    // There is a high number of indirections, the error message thrown by React.cloneElement() is
    // hard to use for developers, this logic provides a better context.
    //
    // Our general guideline is to never change the control flow depending on the environment.
    // However, React.cloneElement() throws if React.isValidElement() is false,
    // so we can throw before with custom message.
    if (false) {}
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(render, mergedProps);
  }
  // `element` is always provided when there is no `render` prop.
  return renderTag(element, props);
}
function warnIfRenderPropLooksLikeComponent(renderFn) {
  const functionName = renderFn.name;
  if (functionName.length === 0) {
    return;
  }
  if (!COMPONENT_IDENTIFIER_PATTERN.test(functionName)) {
    return;
  }
  if (!LOWERCASE_CHARACTER_PATTERN.test(functionName)) {
    return;
  }
  warn(`The \`render\` prop received a function named \`${functionName}\` that starts with an uppercase letter.`, 'This usually means a React component was passed directly as `render={Component}`.', 'Base UI calls `render` as a plain function, which can break the Rules of Hooks during reconciliation.', 'If this is an intentional render callback, rename it to start with a lowercase letter.', 'Use `render={<Component />}` or `render={(props) => <Component {...props} />}` instead.', 'https://base-ui.com/r/invalid-render-prop');
}
function renderTag(Tag, props) {
  if (Tag === 'button') {
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      ...props,
      key: props.key
    });
  }
  if (Tag === 'img') {
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      alt: "",
      ...props,
      key: props.key
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag, props);
}

/***/ })

}]);