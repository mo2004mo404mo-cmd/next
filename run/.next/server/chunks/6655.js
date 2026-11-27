"use strict";
exports.id = 6655;
exports.ids = [6655];
exports.modules = {

/***/ 8777:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EW: () => (/* binding */ getTarget),
/* harmony export */   RS: () => (/* binding */ activeElement),
/* harmony export */   gR: () => (/* binding */ contains),
/* harmony export */   kp: () => (/* binding */ closest)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(960977);

function activeElement(doc) {
  let element = doc.activeElement;
  while (element?.shadowRoot?.activeElement != null) {
    element = element.shadowRoot.activeElement;
  }
  return element;
}
function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode?.();

  // First, attempt with the faster native method.
  if (parent.contains(child)) {
    return true;
  }

  // Then fall back to traversing out of shadow roots when needed.
  if (rootNode && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isShadowRoot */ .Ng)(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}

/**
 * Finds the closest matching element in the composed tree, crossing slots and shadow roots.
 * `:scope` is not supported.
 */

function closest(node, selector) {
  let current = node;
  while (current) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(current) && current.matches(selector)) {
      return current;
    }
    current = current.assignedSlot ?? current.parentNode ?? ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isShadowRoot */ .Ng)(current) ? current.host : null);
  }
  return null;
}
function getTarget(event) {
  if ('composedPath' in event) {
    // The composed path is empty once the event is no longer being dispatched,
    // so fall back to `target` for handlers running after dispatch completes.
    return event.composedPath()[0] ?? event.target;
  }

  // TS assumes `composedPath()` always exists, but older browsers without
  // shadow DOM support still fall back to `target`.
  return event.target;
}

/***/ }),

/***/ 16507:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ useCompositeItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(92806);
/* harmony import */ var _root_CompositeRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(858441);
/* harmony import */ var _list_useCompositeListItem_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(472276);
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

/***/ 33408:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ inertValue)
/* harmony export */ });
/* harmony import */ var _reactVersion_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(143476);

function inertValue(value) {
  if ((0,_reactVersion_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isReactVersionAtLeast */ ._)(19)) {
    return value;
  }
  // compatibility with React < 19
  return value ? 'true' : undefined;
}

/***/ }),

/***/ 35471:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Check)
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
    name: "check",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M20 6 9 17l-5-5",
                key: "1gmf2c"
            }
        ]
    ]
};
__iconData.node;
const Check = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=check.mjs.map


/***/ }),

/***/ 69394:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ Separator)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(671775);
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

/***/ 229813:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Search)
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
    name: "search",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m21 21-4.34-4.34",
                key: "14j7rj"
            }
        ],
        [
            "circle",
            {
                cx: "11",
                cy: "11",
                r: "8",
                key: "4ej97u"
            }
        ]
    ]
};
__iconData.node;
const Search = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=search.mjs.map


/***/ }),

/***/ 238240:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ CompositeList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(925685);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(943512);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(816942);
/* harmony import */ var _CompositeListContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(679153);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* eslint-disable no-bitwise */ /* __next_internal_client_entry_do_not_use__ CompositeList auto */ 





/**
 * Provides context for a list of items in a composite component.
 */ function CompositeList(props) {
    const { children, elementsRef, labelsRef, onMapChange: onMapChangeProp } = props;
    const onMapChange = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)(onMapChangeProp);
    const [, setMapTick] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    const listeners = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__/* .useRefWithInit */ .j)(createListeners).current;
    const map = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__/* .useRefWithInit */ .j)(createMap).current;
    const nextIndexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    const isDirtyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const itemsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const mutationObserverRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    // Item effects can run without their parent rendering. Schedule one synchronous
    // parent update for the whole commit so refs are rebuilt before paint and while
    // the originating React event is still inside `act()` in tests.
    const scheduleMapUpdate = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)(()=>{
        if (isDirtyRef.current) {
            return;
        }
        isDirtyRef.current = true;
        setMapTick((tick)=>tick + 1);
    });
    const register = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((node, registration)=>{
        map.set(node, registration);
        scheduleMapUpdate();
    });
    const unregister = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((node)=>{
        map.delete(node);
        scheduleMapUpdate();
    });
    const syncRefs = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((items)=>{
        const nextMap = new Map();
        elementsRef.current.length = 0;
        if (labelsRef) {
            labelsRef.current.length = 0;
        }
        items.forEach((item)=>{
            nextMap.set(item.element, {
                ...item.registration.metadata ?? {},
                index: item.index
            });
            elementsRef.current[item.index] = item.element;
            if (labelsRef) {
                labelsRef.current[item.index] = item.registration.label !== undefined ? item.registration.label : item.registration.textRef?.current?.textContent ?? item.element.textContent;
            }
        });
        nextIndexRef.current = elementsRef.current.length;
        return nextMap;
    });
    function observe(sortedNodes) {
        mutationObserverRef.current?.disconnect();
        mutationObserverRef.current = null;
        // A single item can't reorder.
        if (typeof MutationObserver !== 'function' || sortedNodes.length < 2) {
            return;
        }
        const mutationObserver = new MutationObserver((entries)=>{
            // Only verify the order after a move: a node that was removed and later
            // re-added within the same batch. Additions and removals alone can't
            // change the relative order of the remaining items, and items that mount
            // or unmount re-sort through `register`/`unregister`.
            if (!hasMovedNode(entries)) {
                return;
            }
            let previousConnectedNode = null;
            // If any connected node now appears before the previous connected node,
            // wrappers/items moved and the index map needs to be rebuilt.
            for (const node of sortedNodes){
                if (!node.isConnected) {
                    continue;
                }
                if (previousConnectedNode && sortByDocumentPosition(previousConnectedNode, node) > 0) {
                    mutationObserver.disconnect();
                    scheduleMapUpdate();
                    return;
                }
                previousConnectedNode = node;
            }
        });
        mutationObserverRef.current = mutationObserver;
        // A reorder that changes item indexes must invert at least one adjacent pair
        // from the previous sorted order. Observing each pair's common parent catches
        // both direct item moves and ancestor wrapper moves at the boundary.
        const roots = new Set();
        for(let i = 1; i < sortedNodes.length; i += 1){
            const root = getCommonAncestor(sortedNodes[i - 1], sortedNodes[i]);
            if (root) {
                roots.add(root);
            }
        }
        roots.forEach((root)=>mutationObserver.observe(root, {
                childList: true
            }));
    }
    const flush = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)(()=>{
        const [items, automaticNodes] = getCompositeListSnapshot(map);
        const nextMap = syncRefs(items);
        const previousItems = itemsRef.current;
        const changed = !previousItems || previousItems.length !== items.length || items.some((item, index)=>{
            const previousItem = previousItems[index];
            return item.index !== previousItem.index || item.element !== previousItem.element || item.registration.index !== previousItem.registration.index || item.registration.metadata !== previousItem.registration.metadata;
        });
        observe(automaticNodes);
        itemsRef.current = items;
        isDirtyRef.current = false;
        if (!changed) {
            return;
        }
        listeners.forEach((listener)=>listener(nextMap));
        onMapChange(nextMap);
    });
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__/* .useIsoLayoutEffect */ .g)(()=>{
        // Re-copy the last committed snapshot when the ref objects change or Strict Mode replays
        // effects without reattaching callback refs.
        if (!isDirtyRef.current && itemsRef.current) {
            syncRefs(itemsRef.current);
        }
        return ()=>{
            elementsRef.current = [];
            if (labelsRef) {
                labelsRef.current = [];
            }
        };
    }, [
        elementsRef,
        labelsRef,
        syncRefs
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__/* .useIsoLayoutEffect */ .g)(()=>{
        if (isDirtyRef.current) {
            flush();
        }
    });
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__/* .useIsoLayoutEffect */ .g)(()=>{
        return ()=>{
            mutationObserverRef.current?.disconnect();
            // React 18 Strict Mode replays effects without replaying callback refs.
            // Mark the retained map dirty so the replay rebuilds refs and observation.
            isDirtyRef.current = true;
        };
    }, []);
    const subscribeMapChange = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__/* .useStableCallback */ .K)((fn)=>{
        listeners.add(fn);
        return ()=>{
            listeners.delete(fn);
        };
    });
    const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            register,
            unregister,
            subscribeMapChange,
            nextIndexRef
        }), [
        register,
        unregister,
        subscribeMapChange,
        nextIndexRef
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_CompositeListContext_mjs__WEBPACK_IMPORTED_MODULE_5__/* .CompositeListContext */ .D.Provider, {
        value: contextValue,
        children: children
    });
}
function createMap() {
    return new Map();
}
function createListeners() {
    return new Set();
}
function getCompositeListSnapshot(map) {
    const reservedIndices = new Set();
    const items = [];
    const automaticItems = [];
    map.forEach((registration, node)=>{
        if (!node.isConnected) {
            return;
        }
        const index = registration.index;
        const item = {
            index: index ?? -1,
            element: node,
            registration
        };
        if (index === null) {
            automaticItems.push(item);
        } else if (index >= 0) {
            reservedIndices.add(index);
            items.push(item);
        }
    });
    let nextAutomaticIndex = 0;
    automaticItems.sort((a, b)=>sortByDocumentPosition(a.element, b.element));
    automaticItems.forEach((item)=>{
        while(reservedIndices.has(nextAutomaticIndex)){
            nextAutomaticIndex += 1;
        }
        item.index = nextAutomaticIndex;
        items.push(item);
        nextAutomaticIndex += 1;
    });
    if (reservedIndices.size > 0) {
        items.sort((a, b)=>a.index - b.index);
    }
    return [
        items,
        automaticItems.map((item)=>item.element)
    ];
}
function getCommonAncestor(firstNode, lastNode) {
    let ancestor = firstNode.parentElement;
    // The `parentElement` walk cannot cross shadow boundaries, so the native
    // `contains` is sufficient here.
    while(ancestor && !ancestor.contains(lastNode)){
        ancestor = ancestor.parentElement;
    }
    return ancestor;
}
function hasMovedNode(entries) {
    for (const entry of entries){
        for(let i = 0; i < entry.removedNodes.length; i += 1){
            if (entry.removedNodes[i].isConnected) {
                return true;
            }
        }
    }
    return false;
}
function sortByDocumentPosition(a, b) {
    // Adjacent siblings are the common case for lists that are already in order, and
    // `compareDocumentPosition` scans siblings from the parent's first child, so sorting
    // a long flat list would otherwise be quadratic.
    if (a.nextElementSibling === b) {
        return -1;
    }
    if (b.nextElementSibling === a) {
        return 1;
    }
    // `DOCUMENT_POSITION_CONTAINED_BY` is always reported alongside `FOLLOWING`, and `CONTAINS`
    // alongside `PRECEDING`, so testing `FOLLOWING` alone orders siblings and nested items alike.
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}


/***/ }),

/***/ 269357:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LoaderCircle)
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
    name: "loader-circle",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 12a9 9 0 1 1-6.219-8.56",
                key: "13zald"
            }
        ]
    ],
    aliases: [
        "loader-2"
    ]
};
__iconData.node;
const LoaderCircle = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=loader-circle.mjs.map


/***/ }),

/***/ 313344:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ ownerDocument)
/* harmony export */ });

function ownerDocument(node) {
  return node?.ownerDocument || document;
}

/***/ }),

/***/ 320673:
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

/***/ 347352:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Sparkles)
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
    name: "sparkles",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
                key: "1s2grr"
            }
        ],
        [
            "path",
            {
                d: "M20 2v4",
                key: "1rf3ol"
            }
        ],
        [
            "path",
            {
                d: "M22 4h-4",
                key: "gwowj6"
            }
        ],
        [
            "circle",
            {
                cx: "4",
                cy: "20",
                r: "2",
                key: "6kqj1y"
            }
        ]
    ],
    aliases: [
        "stars"
    ]
};
__iconData.node;
const Sparkles = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=sparkles.mjs.map


/***/ }),

/***/ 472276:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ useCompositeListItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(816942);
/* harmony import */ var _CompositeListContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(679153);
/* __next_internal_client_entry_do_not_use__ useCompositeListItem auto */ 


/**
 * Used to register a list item and its index (DOM position) in the `CompositeList`.
 */ function useCompositeListItem(params = {}) {
    const { guess, label, metadata, textRef, index: externalIndex } = params;
    const { register, unregister, subscribeMapChange, nextIndexRef } = (0,_CompositeListContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useCompositeListContext */ .M)();
    // Guess the index from the render order. This avoids a re-render after mount for
    // flat lists rendered in DOM order; when the guess is wrong (grouped or out-of-order
    // rendering), the commit flush corrects it before paint.
    const indexRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(-1);
    const [internalIndex, setInternalIndex] = react__WEBPACK_IMPORTED_MODULE_0__.useState(externalIndex == null && guess ? ()=>{
        if (indexRef.current === -1) {
            const newIndex = nextIndexRef.current;
            nextIndexRef.current += 1;
            indexRef.current = newIndex;
        }
        return indexRef.current;
    } : -1);
    const index = externalIndex ?? internalIndex;
    const componentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    // Deliberately identity-sensitive: nested items sharing one DOM node rely on ref attachment
    // order to decide which registration wins, and republishing from an effect instead would let
    // an inner item's later update silently take ownership from the outer one.
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node)=>{
        const previousNode = componentRef.current;
        if (previousNode) {
            unregister(previousNode);
        }
        componentRef.current = node;
        if (node) {
            register(node, {
                metadata: metadata ?? null,
                index: externalIndex ?? null,
                label,
                textRef
            });
        }
    }, [
        externalIndex,
        register,
        unregister,
        metadata,
        label,
        textRef
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        if (externalIndex != null) {
            return undefined;
        }
        return subscribeMapChange((map)=>{
            const i = componentRef.current ? map.get(componentRef.current)?.index : null;
            if (i != null) {
                setInternalIndex(i);
            }
        });
    }, [
        externalIndex,
        subscribeMapChange
    ]);
    return {
        ref,
        index
    };
}


/***/ }),

/***/ 529118:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ useTransitionStatus)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(603917);
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


/***/ }),

/***/ 541290:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChartColumn)
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
    name: "chart-column",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M3 3v16a2 2 0 0 0 2 2h16",
                key: "c24i48"
            }
        ],
        [
            "path",
            {
                d: "M18 17V9",
                key: "2bz60n"
            }
        ],
        [
            "path",
            {
                d: "M13 17V5",
                key: "1frdt8"
            }
        ],
        [
            "path",
            {
                d: "M8 17v-3",
                key: "17ska0"
            }
        ]
    ],
    aliases: [
        "bar-chart-3"
    ]
};
__iconData.node;
const ChartColumn = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=chart-column.mjs.map


/***/ }),

/***/ 562340:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ useOpenChangeComplete)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(943512);
/* harmony import */ var _useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(771342);
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

/***/ 570722:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BF: () => (/* binding */ findNonDisabledListIndex),
/* harmony export */   FP: () => (/* binding */ isListIndexDisabled),
/* harmony export */   J9: () => (/* binding */ isElementVisible),
/* harmony export */   SP: () => (/* binding */ getNextListIndex),
/* harmony export */   Zb: () => (/* binding */ getMinListIndex),
/* harmony export */   du: () => (/* binding */ isIndexOutOfListBounds),
/* harmony export */   vB: () => (/* binding */ getMaxListIndex)
/* harmony export */ });
/* unused harmony exports isDifferentGridRow, getGridNavigatedIndex, createGridCellMap, getGridCellIndexOfCorner, getGridCellIndices, isHiddenByStyles */
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(960977);





function isDifferentGridRow(index, cols, prevRow) {
  return Math.floor(index / cols) !== prevRow;
}
function isIndexOutOfListBounds(list, index) {
  return index < 0 || index >= list.length;
}
function getMinListIndex(listRef, disabledIndices) {
  return findNonDisabledListIndex(listRef.current, {
    disabledIndices
  });
}
function getMaxListIndex(listRef, disabledIndices) {
  return findNonDisabledListIndex(listRef.current, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
/**
 * The index one arrow step moves the highlight to from `currentIndex`, or `-1` when the step
 * leaves the list. `wrapped` reports a jump from one end of the list to the other.
 */
function getNextListIndex(list, currentIndex, options) {
  const {
    decrement,
    loopFocus,
    allowEscape,
    disabledIndices,
    minIndex,
    maxIndex
  } = options;
  const step = () => findNonDisabledListIndex(list, {
    startingIndex: currentIndex,
    decrement,
    disabledIndices
  });
  let index;
  let wrapped = false;
  if (!loopFocus) {
    index = decrement ? Math.max(minIndex, step()) : Math.min(maxIndex, step());
  } else if (decrement ? currentIndex <= minIndex : currentIndex >= maxIndex) {
    // Escaping is only possible from inside the list: from outside it, a step enters at the far
    // end.
    const outside = decrement ? -1 : list.length;
    if (allowEscape && currentIndex !== outside) {
      index = -1;
    } else {
      index = decrement ? maxIndex : minIndex;
      wrapped = true;
    }
  } else {
    index = step();
  }
  return {
    index: isIndexOutOfListBounds(list, index) ? -1 : index,
    wrapped
  };
}
function findNonDisabledListIndex(list, {
  startingIndex = -1,
  decrement = false,
  disabledIndices,
  amount = 1
} = {}) {
  let index = startingIndex;
  do {
    index += decrement ? -amount : amount;
  } while (index >= 0 && index <= list.length - 1 && isListIndexDisabled(list, index, disabledIndices));
  return index;
}
function getGridNavigatedIndex(list, {
  event,
  orientation,
  loopFocus,
  onLoop,
  rtl,
  cols,
  disabledIndices,
  minIndex,
  maxIndex,
  prevIndex,
  stopEvent: stop = false
}) {
  let nextIndex = prevIndex;
  let verticalDirection;
  if (event.key === ARROW_UP) {
    verticalDirection = 'up';
  } else if (event.key === ARROW_DOWN) {
    verticalDirection = 'down';
  }
  if (verticalDirection) {
    // -------------------------------------------------------------------------
    // Detect row structure only when handling vertical navigation. This keeps
    // the non-vertical key paths free from row inference work.
    // -------------------------------------------------------------------------
    const rows = [];
    const rowIndexMap = [];
    let hasRoleRow = false;
    let visibleItemCount = 0;
    {
      let currentRowEl = null;
      let currentRowIndex = -1;
      list.forEach((el, idx) => {
        if (el == null) {
          return;
        }
        visibleItemCount += 1;
        const rowEl = closest(el, '[role="row"]');
        if (rowEl) {
          hasRoleRow = true;
        }
        if (rowEl !== currentRowEl || currentRowIndex === -1) {
          currentRowEl = rowEl;
          currentRowIndex += 1;
          rows[currentRowIndex] = [];
        }
        rows[currentRowIndex].push(idx);
        rowIndexMap[idx] = currentRowIndex;
      });
    }
    let hasDomRows = false;
    let inferredDomCols = 0;
    if (hasRoleRow) {
      for (const row of rows) {
        const rowLength = row.length;
        if (rowLength > inferredDomCols) {
          inferredDomCols = rowLength;
        }
        if (rowLength !== cols) {
          hasDomRows = true;
        }
      }
    }
    const hasVirtualizedGaps = hasDomRows && visibleItemCount < list.length;
    const verticalCols = inferredDomCols || cols;
    const navigateVertically = direction => {
      if (!hasDomRows || prevIndex === -1) {
        return undefined;
      }
      const currentRow = rowIndexMap[prevIndex];
      if (currentRow == null) {
        return undefined;
      }
      const colInRow = rows[currentRow].indexOf(prevIndex);
      const step = direction === 'up' ? -1 : 1;
      for (let nextRow = currentRow + step, i = 0; i < rows.length; i += 1, nextRow += step) {
        if (nextRow < 0 || nextRow >= rows.length) {
          if (!loopFocus || hasVirtualizedGaps) {
            return undefined;
          }
          nextRow = nextRow < 0 ? rows.length - 1 : 0;
          if (onLoop) {
            const clampedCol = Math.min(colInRow, rows[nextRow].length - 1);
            const targetItemIndex = rows[nextRow][clampedCol] ?? rows[nextRow][0];
            const returnedItemIndex = onLoop(event, prevIndex, targetItemIndex);
            nextRow = rowIndexMap[returnedItemIndex] ?? nextRow;
          }
        }
        const targetRow = rows[nextRow];
        for (let col = Math.min(colInRow, targetRow.length - 1); col >= 0; col -= 1) {
          const candidate = targetRow[col];
          if (!isListIndexDisabled(list, candidate, disabledIndices)) {
            return candidate;
          }
        }
      }
      return undefined;
    };
    const navigateVerticallyWithInferredRows = direction => {
      if (!hasVirtualizedGaps || prevIndex === -1) {
        return undefined;
      }
      const colInRow = prevIndex % verticalCols;
      const rowStep = direction === 'up' ? -verticalCols : verticalCols;
      const lastRowStart = maxIndex - maxIndex % verticalCols;
      const rowCount = floor(maxIndex / verticalCols) + 1;
      for (let rowStart = prevIndex - colInRow + rowStep, i = 0; i < rowCount; i += 1, rowStart += rowStep) {
        if (rowStart < 0 || rowStart > maxIndex) {
          if (!loopFocus) {
            return undefined;
          }
          rowStart = rowStart < 0 ? lastRowStart : 0;
        }
        const rowEnd = Math.min(rowStart + verticalCols - 1, maxIndex);
        for (let candidate = Math.min(rowStart + colInRow, rowEnd); candidate >= rowStart; candidate -= 1) {
          if (!isListIndexDisabled(list, candidate, disabledIndices)) {
            return candidate;
          }
        }
      }
      return undefined;
    };
    if (stop) {
      stopEvent(event);
    }
    const verticalCandidate = navigateVertically(verticalDirection) ?? navigateVerticallyWithInferredRows(verticalDirection);
    if (verticalCandidate !== undefined) {
      nextIndex = verticalCandidate;
    } else if (prevIndex === -1) {
      nextIndex = verticalDirection === 'up' ? maxIndex : minIndex;
    } else {
      nextIndex = findNonDisabledListIndex(list, {
        startingIndex: prevIndex,
        amount: verticalCols,
        decrement: verticalDirection === 'up',
        disabledIndices
      });
      if (loopFocus) {
        if (verticalDirection === 'up' && (prevIndex - verticalCols < minIndex || nextIndex < 0)) {
          const col = prevIndex % verticalCols;
          const maxCol = maxIndex % verticalCols;
          const offset = maxIndex - (maxCol - col);
          if (maxCol === col) {
            nextIndex = maxIndex;
          } else {
            nextIndex = maxCol > col ? offset : offset - verticalCols;
          }
          if (onLoop) {
            nextIndex = onLoop(event, prevIndex, nextIndex);
          }
        }
        if (verticalDirection === 'down' && prevIndex + verticalCols > maxIndex) {
          nextIndex = findNonDisabledListIndex(list, {
            startingIndex: prevIndex % verticalCols - verticalCols,
            amount: verticalCols,
            disabledIndices
          });
          if (onLoop) {
            nextIndex = onLoop(event, prevIndex, nextIndex);
          }
        }
      }
    }
    if (isIndexOutOfListBounds(list, nextIndex)) {
      nextIndex = prevIndex;
    }
  }

  // Remains on the same row/column.
  if (orientation === 'both') {
    const prevRow = floor(prevIndex / cols);
    if (event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT)) {
      if (stop) {
        stopEvent(event);
      }
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledListIndex(list, {
          startingIndex: prevIndex,
          disabledIndices
        });
        if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledListIndex(list, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
          if (onLoop) {
            nextIndex = onLoop(event, prevIndex, nextIndex);
          }
        }
      } else if (loopFocus) {
        nextIndex = findNonDisabledListIndex(list, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
        if (onLoop) {
          nextIndex = onLoop(event, prevIndex, nextIndex);
        }
      }
      if (isDifferentGridRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT)) {
      if (stop) {
        stopEvent(event);
      }
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledListIndex(list, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices
        });
        if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledListIndex(list, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
          if (onLoop) {
            nextIndex = onLoop(event, prevIndex, nextIndex);
          }
        }
      } else if (loopFocus) {
        nextIndex = findNonDisabledListIndex(list, {
          startingIndex: prevIndex + (cols - prevIndex % cols),
          decrement: true,
          disabledIndices
        });
        if (onLoop) {
          nextIndex = onLoop(event, prevIndex, nextIndex);
        }
      }
      if (isDifferentGridRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = floor(maxIndex / cols) === prevRow;
    if (isIndexOutOfListBounds(list, nextIndex)) {
      if (loopFocus && lastRow) {
        nextIndex = event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT) ? maxIndex : findNonDisabledListIndex(list, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
        if (onLoop) {
          nextIndex = onLoop(event, prevIndex, nextIndex);
        }
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}

/** For each cell index, gets the item index that occupies that cell */
function createGridCellMap(sizes, cols, dense) {
  const cellMap = [];
  let startIndex = 0;
  sizes.forEach(({
    width,
    height
  }, index) => {
    if (width > cols) {
      if (false) {}
    }
    let itemPlaced = false;
    if (dense) {
      startIndex = 0;
    }
    while (!itemPlaced) {
      const targetCells = [];
      for (let i = 0; i < width; i += 1) {
        for (let j = 0; j < height; j += 1) {
          targetCells.push(startIndex + i + j * cols);
        }
      }
      if (startIndex % cols + width <= cols && targetCells.every(cell => cellMap[cell] == null)) {
        targetCells.forEach(cell => {
          cellMap[cell] = index;
        });
        itemPlaced = true;
      } else {
        startIndex += 1;
      }
    }
  });

  // convert into a non-sparse array
  return [...cellMap];
}

/** Gets cell index of an item's corner or -1 when index is -1. */
function getGridCellIndexOfCorner(index, sizes, cellMap, cols, corner) {
  if (index === -1) {
    return -1;
  }
  const firstCellIndex = cellMap.indexOf(index);
  const sizeItem = sizes[index];
  switch (corner) {
    case 'tl':
      return firstCellIndex;
    case 'tr':
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + sizeItem.width - 1;
    case 'bl':
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + (sizeItem.height - 1) * cols;
    case 'br':
      return cellMap.lastIndexOf(index);
    default:
      return -1;
  }
}

/** Gets all cell indices that correspond to the specified indices */
function getGridCellIndices(indices, cellMap) {
  return cellMap.flatMap((index, cellIndex) => indices.includes(index) ? [cellIndex] : []);
}
function isListIndexDisabled(list, index, disabledIndices) {
  const isExplicitlyDisabled = typeof disabledIndices === 'function' ? disabledIndices(index) : disabledIndices?.includes(index) ?? false;
  if (isExplicitlyDisabled) {
    return true;
  }
  const element = list[index];
  if (!element) {
    return false;
  }
  if (!isElementVisible(element)) {
    return true;
  }

  // A natively disabled element can never receive focus, so it must always be
  // skipped, even when `disabledIndices` marks it as enabled. Only
  // `aria-disabled` items can be focusable-while-disabled.
  if (element.matches(':disabled')) {
    return true;
  }
  return !disabledIndices && (element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true');
}
function isHiddenByStyles(styles) {
  return styles.visibility === 'hidden' || styles.visibility === 'collapse';
}
function isElementVisible(element, styles = element ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .getComputedStyle */ .L9)(element) : null) {
  if (!element || !element.isConnected || !styles || isHiddenByStyles(styles)) {
    return false;
  }
  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility();
  }
  return styles.display !== 'none' && styles.display !== 'contents';
}

/***/ }),

/***/ 583758:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ transitionStatusMapping)
/* harmony export */ });
/* harmony import */ var _TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(756532);


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

/***/ 603917:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KP: () => (/* binding */ AnimationFrame),
/* harmony export */   NR: () => (/* binding */ useAnimationFrame)
/* harmony export */ });
/* unused harmony export resetAnimationFrameScheduler */
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(925685);
/* harmony import */ var _useOnMount_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84594);
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

/***/ 643276:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ useDirection)
/* harmony export */ });
/* unused harmony export DirectionContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ DirectionContext,useDirection auto */ 
const DirectionContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useDirection() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DirectionContext);
    return context?.direction ?? 'ltr';
}


/***/ }),

/***/ 679153:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ CompositeListContext),
/* harmony export */   M: () => (/* binding */ useCompositeListContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ CompositeListContext,useCompositeListContext auto */ 
const CompositeListContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext({
    register: ()=>{},
    unregister: ()=>{},
    subscribeMapChange: ()=>()=>{},
    nextIndexRef: {
        current: 0
    }
});
if (false) {}
function useCompositeListContext() {
    return react__WEBPACK_IMPORTED_MODULE_0__.useContext(CompositeListContext);
}


/***/ }),

/***/ 756532:
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

/***/ 771342:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ useAnimationsFinished)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(374429);
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(603917);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(943512);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(317526);
/* harmony import */ var _utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(840280);
/* harmony import */ var _utils_getFiniteAnimations_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(320673);
/* harmony import */ var _TransitionStatusDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(756532);
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

/***/ 827677:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $v: () => (/* binding */ scrollIntoViewIfNeeded),
/* harmony export */   Jd: () => (/* binding */ ARROW_DOWN),
/* harmony export */   Kp: () => (/* binding */ END),
/* harmony export */   Qi: () => (/* binding */ isNativeInput),
/* harmony export */   RJ: () => (/* binding */ ARROW_RIGHT),
/* harmony export */   eR: () => (/* binding */ ARROW_LEFT),
/* harmony export */   il: () => (/* binding */ ARROW_UP),
/* harmony export */   jF: () => (/* binding */ COMPOSITE_KEYS),
/* harmony export */   rT: () => (/* binding */ MODIFIER_KEYS),
/* harmony export */   yZ: () => (/* binding */ HOME)
/* harmony export */ });
/* unused harmony exports PAGE_UP, PAGE_DOWN, SHIFT */
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(960977);


const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const HOME = 'Home';
const END = 'End';
const PAGE_UP = 'PageUp';
const PAGE_DOWN = 'PageDown';
const COMPOSITE_KEYS = new Set([ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, HOME, END]);
const SHIFT = 'Shift';
const MODIFIER_KEYS = [SHIFT, 'Control', 'Alt', 'Meta'];
function isInputElement(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element) && element.tagName === 'INPUT';
}
function isNativeInput(element) {
  if (isInputElement(element) && element.selectionStart != null) {
    return true;
  }
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element) && element.tagName === 'TEXTAREA') {
    return true;
  }
  return false;
}
function scrollIntoViewIfNeeded(scrollContainer, element, direction, orientation) {
  if (!scrollContainer || !element || !element.scrollTo) {
    return;
  }
  let targetX = scrollContainer.scrollLeft;
  let targetY = scrollContainer.scrollTop;
  const isOverflowingX = scrollContainer.clientWidth < scrollContainer.scrollWidth;
  const isOverflowingY = scrollContainer.clientHeight < scrollContainer.scrollHeight;
  if (isOverflowingX && orientation !== 'vertical') {
    const elementOffsetLeft = getOffset(scrollContainer, element, 'left');
    const containerStyles = getStyles(scrollContainer);
    const elementStyles = getStyles(element);
    if (direction === 'ltr') {
      if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
        // overflow to the right, scroll to align right edges
        targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
      } else if (elementOffsetLeft - elementStyles.scrollMarginLeft < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
        // overflow to the left, scroll to align left edges
        targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
      }
    }
    if (direction === 'rtl') {
      if (elementOffsetLeft - elementStyles.scrollMarginLeft < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
        // overflow to the left, scroll to align left edges
        targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
      } else if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
        // overflow to the right, scroll to align right edges
        targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
      }
    }
  }
  if (isOverflowingY && orientation !== 'horizontal') {
    const elementOffsetTop = getOffset(scrollContainer, element, 'top');
    const containerStyles = getStyles(scrollContainer);
    const elementStyles = getStyles(element);
    if (elementOffsetTop - elementStyles.scrollMarginTop < scrollContainer.scrollTop + containerStyles.scrollPaddingTop) {
      // overflow upwards, align top edges
      targetY = elementOffsetTop - elementStyles.scrollMarginTop - containerStyles.scrollPaddingTop;
    } else if (elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom > scrollContainer.scrollTop + scrollContainer.clientHeight - containerStyles.scrollPaddingBottom) {
      // overflow downwards, align bottom edges
      targetY = elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom - scrollContainer.clientHeight + containerStyles.scrollPaddingBottom;
    }
  }
  scrollContainer.scrollTo({
    left: targetX,
    top: targetY,
    behavior: 'auto'
  });
}
function getOffset(ancestor, element, side) {
  const propName = side === 'left' ? 'offsetLeft' : 'offsetTop';
  let result = 0;
  while (element.offsetParent) {
    result += element[propName];
    if (element.offsetParent === ancestor) {
      break;
    }
    element = element.offsetParent;
  }
  return result;
}
function getStyles(element) {
  const styles = getComputedStyle(element);
  return {
    scrollMarginTop: parseFloat(styles.scrollMarginTop) || 0,
    scrollMarginRight: parseFloat(styles.scrollMarginRight) || 0,
    scrollMarginBottom: parseFloat(styles.scrollMarginBottom) || 0,
    scrollMarginLeft: parseFloat(styles.scrollMarginLeft) || 0,
    scrollPaddingTop: parseFloat(styles.scrollPaddingTop) || 0,
    scrollPaddingRight: parseFloat(styles.scrollPaddingRight) || 0,
    scrollPaddingBottom: parseFloat(styles.scrollPaddingBottom) || 0,
    scrollPaddingLeft: parseFloat(styles.scrollPaddingLeft) || 0
  };
}

/***/ }),

/***/ 840280:
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

/***/ 915741:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FileText)
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
    name: "file-text",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
                key: "1oefj6"
            }
        ],
        [
            "path",
            {
                d: "M14 2v5a1 1 0 0 0 1 1h5",
                key: "wfsgrz"
            }
        ],
        [
            "path",
            {
                d: "M10 9H8",
                key: "b1mrlr"
            }
        ],
        [
            "path",
            {
                d: "M16 13H8",
                key: "t4e002"
            }
        ],
        [
            "path",
            {
                d: "M16 17H8",
                key: "z1uh3a"
            }
        ]
    ]
};
__iconData.node;
const FileText = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file-text.mjs.map


/***/ }),

/***/ 916664:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Globe)
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
    name: "globe",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "path",
            {
                d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
                key: "13o1zl"
            }
        ],
        [
            "path",
            {
                d: "M2 12h20",
                key: "9i4pu4"
            }
        ]
    ]
};
__iconData.node;
const Globe = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=globe.mjs.map


/***/ })

};
;