"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[31573],{

/***/ 5313:
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
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);


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

/***/ 30458:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ useDirection)
/* harmony export */ });
/* unused harmony export DirectionContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ DirectionContext,useDirection auto */ 
const DirectionContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useDirection() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DirectionContext);
    return context?.direction ?? 'ltr';
}


/***/ }),

/***/ 54068:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ useCompositeListItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66652);
/* harmony import */ var _CompositeListContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(82873);
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

/***/ 67894:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ CompositeList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14187);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66652);
/* harmony import */ var _CompositeListContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(82873);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
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

/***/ 81456:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ ownerDocument)
/* harmony export */ });

function ownerDocument(node) {
  return node?.ownerDocument || document;
}

/***/ }),

/***/ 82873:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ CompositeListContext),
/* harmony export */   M: () => (/* binding */ useCompositeListContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
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

/***/ 86058:
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
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);





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

/***/ 93093:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EW: () => (/* binding */ getTarget),
/* harmony export */   RS: () => (/* binding */ activeElement),
/* harmony export */   gR: () => (/* binding */ contains),
/* harmony export */   kp: () => (/* binding */ closest)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6791);

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

/***/ 96354:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ inertValue)
/* harmony export */ });
/* harmony import */ var _reactVersion_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39034);

function inertValue(value) {
  if ((0,_reactVersion_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isReactVersionAtLeast */ ._)(19)) {
    return value;
  }
  // compatibility with React < 19
  return value ? 'true' : undefined;
}

/***/ })

}]);