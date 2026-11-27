"use strict";
exports.id = 6069;
exports.ids = [6069];
exports.modules = {

/***/ 22622:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ useIsomorphicLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(494122);
/* __next_internal_client_entry_do_not_use__ useIsomorphicLayoutEffect auto */ 

const useIsomorphicLayoutEffect = _is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isBrowser */ .B ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
 //# sourceMappingURL=use-isomorphic-effect.mjs.map


/***/ }),

/***/ 35214:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ GraduationCap)
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
    name: "graduation-cap",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
                key: "j76jl0"
            }
        ],
        [
            "path",
            {
                d: "M22 10v6",
                key: "1lu8f3"
            }
        ],
        [
            "path",
            {
                d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
                key: "1r8lef"
            }
        ]
    ]
};
__iconData.node;
const GraduationCap = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=graduation-cap.mjs.map


/***/ }),

/***/ 120208:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ EyeOff)
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

/***/ 134795:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ useComposedRefs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);


/**
 * Taken from https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
 */
/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    }
    else if (ref !== null && ref !== undefined) {
        ref.current = value;
    }
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs(...refs) {
    return (node) => {
        let hasCleanup = false;
        const cleanups = refs.map((ref) => {
            const cleanup = setRef(ref, node);
            if (!hasCleanup && typeof cleanup === "function") {
                hasCleanup = true;
            }
            return cleanup;
        });
        // React <19 will log an error to the console if a callback ref returns a
        // value. We don't use ref cleanups internally so this will only happen if a
        // user's ref callback returns a value, which we only expect if they are
        // using the cleanup functionality added in React 19.
        if (hasCleanup) {
            return () => {
                for (let i = 0; i < cleanups.length; i++) {
                    const cleanup = cleanups[i];
                    if (typeof cleanup === "function") {
                        cleanup();
                    }
                    else {
                        setRef(refs[i], null);
                    }
                }
            };
        }
    };
}
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
function useComposedRefs(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(composeRefs(...refs), refs);
}


//# sourceMappingURL=use-composed-ref.mjs.map


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

/***/ 201494:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ PresenceChild)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var _context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(364337);
/* harmony import */ var _utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(982423);
/* harmony import */ var _utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22622);
/* harmony import */ var _PopChild_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(932594);
/* __next_internal_client_entry_do_not_use__ PresenceChild auto */ 






const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root })=>{
    const presenceChildren = (0,_utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useConstant */ .M)(newChildrenMap);
    const id = (0,react__WEBPACK_IMPORTED_MODULE_1__.useId)();
    // Written in a layout effect (not render) so discarded concurrent
    // renders can't leave the refs pointing at uncommitted state.
    const isPresentRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(isPresent);
    const onExitCompleteRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(onExitComplete);
    (0,_utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useIsomorphicLayoutEffect */ .E)(()=>{
        isPresentRef.current = isPresent;
        onExitCompleteRef.current = onExitComplete;
    });
    let isReusedContext = true;
    let context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        isReusedContext = false;
        return {
            id,
            initial,
            isPresent,
            custom,
            onExitComplete: (childId)=>{
                presenceChildren.set(childId, true);
                for (const isComplete of presenceChildren.values()){
                    if (!isComplete) return; // can stop searching when any is incomplete
                }
                onExitComplete && onExitComplete();
            },
            register: (childId)=>{
                presenceChildren.set(childId, false);
                return ()=>{
                    presenceChildren.delete(childId);
                    !isPresentRef.current && !presenceChildren.size && onExitCompleteRef.current?.();
                };
            }
        };
    }, [
        isPresent,
        presenceChildren,
        onExitComplete
    ]);
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */ if (presenceAffectsLayout && isReusedContext) {
        context = {
            ...context
        };
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        presenceChildren.forEach((_, key)=>presenceChildren.set(key, false));
    }, [
        isPresent
    ]);
    /**
     * If there's no `motion` components to fire exit animations, we want to remove this
     * component immediately.
     */ react__WEBPACK_IMPORTED_MODULE_1__.useEffect(()=>{
        !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
    }, [
        isPresent
    ]);
    children = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PopChild_mjs__WEBPACK_IMPORTED_MODULE_4__/* .PopChild */ .C, {
        pop: mode === "popLayout",
        isPresent: isPresent,
        anchorX: anchorX,
        anchorY: anchorY,
        root: root,
        children: children
    });
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_5__/* .PresenceContext */ .t.Provider, {
        value: context,
        children: children
    });
};
function newChildrenMap() {
    return new Map();
}
 //# sourceMappingURL=PresenceChild.mjs.map


/***/ }),

/***/ 269627:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronDown)
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
    name: "chevron-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m6 9 6 6 6-6",
                key: "qrunsl"
            }
        ]
    ]
};
__iconData.node;
const ChevronDown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=chevron-down.mjs.map


/***/ }),

/***/ 317441:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ AnimatePresence)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var _context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(179875);
/* harmony import */ var _utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(982423);
/* harmony import */ var _utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22622);
/* harmony import */ var _PresenceChild_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(201494);
/* harmony import */ var _use_presence_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(577514);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(820834);
/* __next_internal_client_entry_do_not_use__ AnimatePresence auto */ 







/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */ const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root })=>{
    const [isParentPresent, safeToRemove] = (0,_use_presence_mjs__WEBPACK_IMPORTED_MODULE_2__/* .usePresence */ .xQ)(propagate);
    /**
     * Filter any children that aren't ReactElements. We can only track components
     * between renders with a props.key.
     */ const presentChildren = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .onlyElements */ .i)(children), [
        children
    ]);
    /**
     * Track the keys of the currently rendered children. This is used to
     * determine which children are exiting.
     */ const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._);
    /**
     * If `initial={false}` we only want to pass this to components in the first render.
     */ const isInitialRender = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
    /**
     * Track which exiting children have finished animating out.
     */ const exitComplete = (0,_utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useConstant */ .M)(()=>new Map());
    /**
     * Track which components are currently processing exit to prevent duplicate processing.
     */ const exitingComponents = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Set());
    /**
     * Save children to render as React state. To ensure this component is concurrent-safe,
     * we check for exiting children via an effect.
     */ const [diffedChildren, setDiffedChildren] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(presentChildren);
    const [renderedChildren, setRenderedChildren] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(presentChildren);
    (0,_utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useIsomorphicLayoutEffect */ .E)(()=>{
        if (propagate && !isParentPresent && !renderedChildren.length) {
            safeToRemove?.();
        }
    }, [
        isParentPresent,
        propagate,
        renderedChildren.length,
        safeToRemove
    ]);
    (0,_utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useIsomorphicLayoutEffect */ .E)(()=>{
        isInitialRender.current = false;
        /**
         * Update complete status of exiting children.
         */ for(let i = 0; i < renderedChildren.length; i++){
            const key = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._)(renderedChildren[i]);
            if (!presentKeys.includes(key)) {
                if (exitComplete.get(key) !== true) {
                    exitComplete.set(key, false);
                }
            } else {
                exitComplete.delete(key);
                exitingComponents.current.delete(key);
            }
        }
    }, [
        renderedChildren,
        presentKeys.length,
        presentKeys.join("-")
    ]);
    const exitingChildren = [];
    if (presentChildren !== diffedChildren) {
        let nextChildren = [
            ...presentChildren
        ];
        /**
         * Loop through all the currently rendered components and decide which
         * are exiting.
         *
         * Exiting children are reinserted directly after the child they
         * previously followed. Splicing at their index within the previously
         * rendered children, as we used to, indexes into the wrong list: it
         * can interleave them with entering children and push present children
         * to new positions, remounting them (#3746).
         */ let insertionIndex = 0;
        for (const child of renderedChildren){
            const presentIndex = presentKeys.indexOf((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._)(child));
            if (presentIndex === -1) {
                nextChildren.splice(insertionIndex++, 0, child);
                exitingChildren.push(child);
            } else {
                insertionIndex = presentIndex + exitingChildren.length + 1;
            }
        }
        /**
         * Once every exiting child has finished animating out, remove them
         * all at once. Otherwise, if we're in "wait" mode, we want to only
         * render the exiting children until they've all exited.
         */ if (exitingChildren.every((child)=>exitComplete.get((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._)(child)))) {
            nextChildren = presentChildren;
        } else if (mode === "wait") {
            nextChildren = exitingChildren;
        }
        setRenderedChildren((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .onlyElements */ .i)(nextChildren));
        setDiffedChildren(presentChildren);
        /**
         * Early return to ensure once we've set state with the latest diffed
         * children, we can immediately re-render.
         */ return null;
    }
    if (false) {}
    /**
     * If we've been provided a forceRender function by the LayoutGroupContext,
     * we can use it to force a re-render amongst all surrounding components once
     * all components have finished animating out.
     */ const { forceRender } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .LayoutGroupContext */ .L);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: renderedChildren.map((child)=>{
            const key = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._)(child);
            const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
            const onExit = ()=>{
                if (exitingComponents.current.has(key)) {
                    return;
                }
                if (exitComplete.has(key)) {
                    exitingComponents.current.add(key);
                    exitComplete.set(key, true);
                } else {
                    return;
                }
                let isEveryExitComplete = true;
                exitComplete.forEach((isExitComplete)=>{
                    if (!isExitComplete) isEveryExitComplete = false;
                });
                if (isEveryExitComplete) {
                    forceRender?.();
                    /**
                     * Re-diff rather than setting the children to render
                     * directly: this update can be applied after a
                     * transition has committed new children, so any
                     * children read now could be stale by then.
                     */ setDiffedChildren([]);
                    propagate && safeToRemove?.();
                    onExitComplete && onExitComplete();
                }
            };
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PresenceChild_mjs__WEBPACK_IMPORTED_MODULE_7__/* .PresenceChild */ .O, {
                isPresent: isPresent,
                initial: !isInitialRender.current || initial ? undefined : false,
                custom: custom,
                presenceAffectsLayout: presenceAffectsLayout,
                mode: mode,
                root: root,
                onExitComplete: isPresent ? undefined : onExit,
                anchorX: anchorX,
                anchorY: anchorY,
                children: child
            }, key);
        })
    });
};
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 472597:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowRight)
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
    name: "arrow-right",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M5 12h14",
                key: "1ays0h"
            }
        ],
        [
            "path",
            {
                d: "m12 5 7 7-7 7",
                key: "xquz4c"
            }
        ]
    ]
};
__iconData.node;
const ArrowRight = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-right.mjs.map


/***/ }),

/***/ 494122:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ isBrowser)
/* harmony export */ });
const isBrowser = typeof window !== "undefined";


//# sourceMappingURL=is-browser.mjs.map


/***/ }),

/***/ 504635:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ BookOpen)
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
    name: "book-open",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 5v16",
                key: "1f6ucr"
            }
        ],
        [
            "path",
            {
                d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
                key: "1fyvmf"
            }
        ]
    ]
};
__iconData.node;
const BookOpen = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=book-open.mjs.map


/***/ }),

/***/ 820834:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ getChildKey),
/* harmony export */   i: () => (/* binding */ onlyElements)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);


const getChildKey = (child) => child.key || "";
function onlyElements(children) {
    const filtered = [];
    // We use forEach here instead of map as map mutates the component key by prepending `.$`
    react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, (child) => {
        if ((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child))
            filtered.push(child);
    });
    return filtered;
}


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ 880592:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Eye)
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
    name: "eye",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
                key: "1nclc0"
            }
        ],
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "3",
                key: "1v7zrd"
            }
        ]
    ]
};
__iconData.node;
const Eye = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=eye.mjs.map


/***/ }),

/***/ 932594:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ PopChild)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(673109);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var _context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(469320);
/* harmony import */ var _utils_use_composed_ref_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134795);
/* __next_internal_client_entry_do_not_use__ PopChild auto */ 





/**
 * Measurement functionality has to be within a separate component
 * to leverage snapshot lifecycle.
 */ class PopChildMeasure extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    getSnapshotBeforeUpdate(prevProps) {
        const element = this.props.childRef.current;
        if ((0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .s)(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
            const parent = element.offsetParent;
            const parentWidth = (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .s)(parent) ? parent.offsetWidth || 0 : 0;
            const parentHeight = (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .s)(parent) ? parent.offsetHeight || 0 : 0;
            const computedStyle = getComputedStyle(element);
            const size = this.props.sizeRef.current;
            size.height = parseFloat(computedStyle.height);
            size.width = parseFloat(computedStyle.width);
            size.top = element.offsetTop;
            size.left = element.offsetLeft;
            size.right = parentWidth - size.width - size.left;
            size.bottom = parentHeight - size.height - size.top;
            size.direction = computedStyle.direction;
        }
        return null;
    }
    /**
     * Required with getSnapshotBeforeUpdate to stop React complaining.
     */ componentDidUpdate() {}
    render() {
        return this.props.children;
    }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
    const id = (0,react__WEBPACK_IMPORTED_MODULE_1__.useId)();
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const size = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        direction: "ltr"
    });
    const { nonce } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .MotionConfigContext */ .Q);
    /**
     * In React 19, refs are passed via props.ref instead of element.ref.
     * We check props.ref first (React 19) and fall back to element.ref (React 18).
     *
     * The composed ref is only used when popping the child out (pop !== false),
     * so we avoid reading children.props.ref otherwise. In React 18.3 that read
     * triggers a spurious "`ref` is not a prop" warning getter (#3745).
     */ const childRef = pop !== false ? children.props?.ref ?? children?.ref : undefined;
    const composedRef = (0,_utils_use_composed_ref_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(ref, childRef);
    /**
     * We create and inject a style block so we can apply this explicit
     * sizing in a non-destructive manner by just deleting the style block.
     *
     * We can't apply size via render as the measurement happens
     * in getSnapshotBeforeUpdate (post-render), likewise if we apply the
     * styles directly on the DOM node, we might be overwriting
     * styles set via the style prop.
     */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useInsertionEffect)(()=>{
        const { width, height, top, left, right, bottom, direction } = size.current;
        if (isPresent || pop === false || !ref.current || !width || !height) return;
        const isRTL = direction === "rtl";
        const x = anchorX === "left" ? isRTL ? `right: ${right}` : `left: ${left}` : isRTL ? `left: ${left}` : `right: ${right}`;
        const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
        ref.current.dataset.motionPopId = id;
        const style = document.createElement("style");
        if (nonce) style.nonce = nonce;
        const parent = root ?? document.head;
        parent.appendChild(style);
        if (style.sheet) {
            style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
        }
        return ()=>{
            ref.current?.removeAttribute("data-motion-pop-id");
            if (parent.contains(style)) {
                parent.removeChild(style);
            }
        };
    }, [
        isPresent
    ]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PopChildMeasure, {
        isPresent: isPresent,
        childRef: ref,
        sizeRef: size,
        pop: pop,
        children: pop === false ? children : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.cloneElement(children, {
            ref: composedRef
        })
    });
}
 //# sourceMappingURL=PopChild.mjs.map


/***/ })

};
;