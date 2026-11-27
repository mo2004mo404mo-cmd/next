"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[3610],{

/***/ 1919:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ useRechartsTheme)
/* harmony export */ });
/* unused harmony export RechartsThemeProvider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _legacyTheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62417);


var RechartsThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(_legacyTheme__WEBPACK_IMPORTED_MODULE_1__/* .legacyTheme */ .b);
/**
 * Applies the provided theme to all charts in the children tree.
 *
 * @experimental
 */ var RechartsThemeProvider = RechartsThemeContext.Provider;
/**
 * Reads the currently active theme in the children tree.
 *
 * @experimental
 */ var useRechartsTheme = ()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(RechartsThemeContext);


/***/ }),

/***/ 2125:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Plus)
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
    name: "plus",
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
                d: "M12 5v14",
                key: "s699le"
            }
        ]
    ]
};
__iconData.node;
const Plus = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=plus.mjs.map


/***/ }),

/***/ 3087:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ useComposedRefs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


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

/***/ 5214:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "workAsyncStorage", ({
    enumerable: true,
    get: function() {
        return _workasyncstorageinstance.workAsyncStorageInstance;
    }
}));
const _workasyncstorageinstance = __webpack_require__(17828);

//# sourceMappingURL=work-async-storage.external.js.map

/***/ }),

/***/ 5736:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Lock)
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
    name: "lock",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "11",
                x: "3",
                y: "11",
                rx: "2",
                ry: "2",
                key: "1w4ew1"
            }
        ],
        [
            "path",
            {
                d: "M7 11V7a5 5 0 0 1 10 0v4",
                key: "fwvmzm"
            }
        ]
    ]
};
__iconData.node;
const Lock = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=lock.mjs.map


/***/ }),

/***/ 5808:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ PopChild)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78757);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24866);
/* harmony import */ var _utils_use_composed_ref_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3087);
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


/***/ }),

/***/ 6073:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ TrendingDown)
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
    name: "trending-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M16 17h6v-6",
                key: "t6n2it"
            }
        ],
        [
            "path",
            {
                d: "m22 17-8.5-8.5-5 5L2 7",
                key: "x473p"
            }
        ]
    ]
};
__iconData.node;
const TrendingDown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=trending-down.mjs.map


/***/ }),

/***/ 6923:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Clock)
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
    name: "clock",
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
                d: "M12 6v6l4 2",
                key: "mmk7yg"
            }
        ]
    ]
};
__iconData.node;
const Clock = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=clock.mjs.map


/***/ }),

/***/ 7351:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MousePointerClick)
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
    name: "mouse-pointer-click",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M14 4.1 12 6",
                key: "ita8i4"
            }
        ],
        [
            "path",
            {
                d: "m5.1 8-2.9-.8",
                key: "1go3kf"
            }
        ],
        [
            "path",
            {
                d: "m6 12-1.9 2",
                key: "mnht97"
            }
        ],
        [
            "path",
            {
                d: "M7.2 2.2 8 5.1",
                key: "1cfko1"
            }
        ],
        [
            "path",
            {
                d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
                key: "s0h3yz"
            }
        ]
    ]
};
__iconData.node;
const MousePointerClick = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=mouse-pointer-click.mjs.map


/***/ }),

/***/ 9005:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ X)
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
    name: "x",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M18 6 6 18",
                key: "1bl5f8"
            }
        ],
        [
            "path",
            {
                d: "m6 6 12 12",
                key: "d8bk6v"
            }
        ]
    ]
};
__iconData.node;
const X = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=x.mjs.map


/***/ }),

/***/ 9083:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Flag)
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
    name: "flag",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
                key: "1jaruq"
            }
        ]
    ]
};
__iconData.node;
const Flag = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=flag.mjs.map


/***/ }),

/***/ 9107:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ File)
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
    name: "file",
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
        ]
    ]
};
__iconData.node;
const File = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file.mjs.map


/***/ }),

/***/ 11012:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ TriangleAlert)
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
    name: "triangle-alert",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
                key: "wmoenq"
            }
        ],
        [
            "path",
            {
                d: "M12 9v4",
                key: "juzpu7"
            }
        ],
        [
            "path",
            {
                d: "M12 17h.01",
                key: "p32p05"
            }
        ]
    ],
    aliases: [
        "alert-triangle"
    ]
};
__iconData.node;
const TriangleAlert = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=triangle-alert.mjs.map


/***/ }),

/***/ 14929:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Type)
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
    name: "type",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 4v16",
                key: "1654pz"
            }
        ],
        [
            "path",
            {
                d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",
                key: "e0r10z"
            }
        ],
        [
            "path",
            {
                d: "M9 20h6",
                key: "s66wpe"
            }
        ]
    ]
};
__iconData.node;
const Type = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=type.mjs.map


/***/ }),

/***/ 16294:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Wallet)
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
    name: "wallet",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
                key: "18etb6"
            }
        ],
        [
            "path",
            {
                d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
                key: "xoc0q4"
            }
        ]
    ]
};
__iconData.node;
const Wallet = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=wallet.mjs.map


/***/ }),

/***/ 16746:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ LineChart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95295);
/* harmony import */ var _CartesianChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80598);




var allowedTooltipTypes = [
    'axis'
];
/**
 * @consumes ResponsiveContainerContext
 * @provides CartesianViewBoxContext
 * @provides CartesianChartContext
 */ var LineChart = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref)=>{
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CartesianChart__WEBPACK_IMPORTED_MODULE_1__/* .CartesianChart */ .P, {
        chartName: "LineChart",
        defaultTooltipEventType: "axis",
        validateTooltipEventTypes: allowedTooltipTypes,
        tooltipPayloadSearcher: _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__/* .arrayTooltipSearcher */ .uN,
        categoricalChartProps: props,
        ref: ref
    });
});


/***/ }),

/***/ 17828:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "workAsyncStorageInstance", ({
    enumerable: true,
    get: function() {
        return workAsyncStorageInstance;
    }
}));
const _asynclocalstorage = __webpack_require__(64054);
const workAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();

//# sourceMappingURL=work-async-storage-instance.js.map

/***/ }),

/***/ 18986:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Pencil)
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
    name: "pencil",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
                key: "1a8usu"
            }
        ],
        [
            "path",
            {
                d: "m15 5 4 4",
                key: "1mk7zo"
            }
        ]
    ]
};
__iconData.node;
const Pencil = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=pencil.mjs.map


/***/ }),

/***/ 19707:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Layers)
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
    name: "layers",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
                key: "zw3jo"
            }
        ],
        [
            "path",
            {
                d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
                key: "1wduqc"
            }
        ],
        [
            "path",
            {
                d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
                key: "kqbvx6"
            }
        ]
    ],
    aliases: [
        "layers-3"
    ]
};
__iconData.node;
const Layers = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=layers.mjs.map


/***/ }),

/***/ 19928:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ToggleRight)
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
    name: "toggle-right",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "15",
                cy: "12",
                r: "3",
                key: "1afu0r"
            }
        ],
        [
            "rect",
            {
                width: "20",
                height: "14",
                x: "2",
                y: "5",
                rx: "7",
                key: "g7kal2"
            }
        ]
    ]
};
__iconData.node;
const ToggleRight = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=toggle-right.mjs.map


/***/ }),

/***/ 21957:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "PreloadChunks", ({
    enumerable: true,
    get: function() {
        return PreloadChunks;
    }
}));
const _jsxruntime = __webpack_require__(95155);
const _reactdom = __webpack_require__(47650);
const _workasyncstorageexternal = __webpack_require__(5214);
const _encodeuripath = __webpack_require__(2451);
const _deploymentid = __webpack_require__(53887);
function PreloadChunks({ moduleIds }) {
    // Early return in client compilation and only load requestStore on server side
    if (true) {
        return null;
    }
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore === undefined) {
        return null;
    }
    const allFiles = [];
    // Search the current dynamic call unique key id in react loadable manifest,
    // and find the corresponding CSS files to preload
    if (workStore.reactLoadableManifest && moduleIds) {
        const manifest = workStore.reactLoadableManifest;
        for (const key of moduleIds){
            if (!manifest[key]) continue;
            const chunks = manifest[key].files;
            allFiles.push(...chunks);
        }
    }
    if (allFiles.length === 0) {
        return null;
    }
    const query = (0, _deploymentid.getAssetTokenQuery)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: allFiles.map((chunk)=>{
            const href = `${workStore.assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(chunk)}${query}`;
            const isCss = chunk.endsWith('.css');
            // If it's stylesheet we use `precedence` o help hoist with React Float.
            // For stylesheets we actually need to render the CSS because nothing else is going to do it so it needs to be part of the component tree.
            // The `preload` for stylesheet is not optional.
            if (isCss) {
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    // @ts-ignore
                    precedence: "dynamic",
                    href: href,
                    rel: "stylesheet",
                    as: "style",
                    nonce: workStore.nonce
                }, chunk);
            } else {
                // If it's script we use ReactDOM.preload to preload the resources
                (0, _reactdom.preload)(href, {
                    as: 'script',
                    fetchPriority: 'low',
                    nonce: workStore.nonce
                });
                return null;
            }
        })
    });
} //# sourceMappingURL=preload-chunks.js.map


/***/ }),

/***/ 25182:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Eye)
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

/***/ 25494:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MessageSquare)
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
    name: "message-square",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
                key: "18887p"
            }
        ]
    ]
};
__iconData.node;
const MessageSquare = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=message-square.mjs.map


/***/ }),

/***/ 25879:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Trash)
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
    name: "trash",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 11v6",
                key: "nco0om"
            }
        ],
        [
            "path",
            {
                d: "M14 11v6",
                key: "outv1u"
            }
        ],
        [
            "path",
            {
                d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
                key: "miytrc"
            }
        ],
        [
            "path",
            {
                d: "M3 6h18",
                key: "d0wm0j"
            }
        ],
        [
            "path",
            {
                d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
                key: "e791ji"
            }
        ]
    ],
    aliases: [
        "trash-2"
    ]
};
__iconData.node;
const Trash = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=trash.mjs.map


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

/***/ 28408:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ CartesianGrid)
/* harmony export */ });
/* unused harmony export defaultCartesianGridProps */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _util_LogUtils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(43077);
/* harmony import */ var _util_DataUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(92191);
/* harmony import */ var _util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88559);
/* harmony import */ var _getTicks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35368);
/* harmony import */ var _CartesianAxis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(59329);
/* harmony import */ var _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(65372);
/* harmony import */ var _state_selectors_axisSelectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(63477);
/* harmony import */ var _state_hooks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(10365);
/* harmony import */ var _context_PanoramaContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(64105);
/* harmony import */ var _util_resolveDefaultProps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(43527);
/* harmony import */ var _util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23651);
/* harmony import */ var _util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(99498);
/* harmony import */ var _zIndex_ZIndexLayer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(10483);
/* harmony import */ var _zIndex_DefaultZIndexes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(51531);
/* harmony import */ var _theme_RechartsThemeContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1919);
var _excluded = [
    "x1",
    "y1",
    "x2",
    "y2",
    "key"
], _excluded2 = [
    "offset"
], _excluded3 = [
    "xAxisId",
    "yAxisId"
], _excluded4 = [
    "xAxisId",
    "yAxisId"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n) {
        for(var e = 1; e < arguments.length; e++){
            var t = arguments[e];
            for(var r in t)({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
    }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
















/**
 * The <CartesianGrid horizontal
 */ // We exclude strokeDasharray here because Recharts allows array of numbers while DOM does not
var Background = (props)=>{
    var fill = props.fill;
    if (!fill || fill === 'none') {
        return null;
    }
    var fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, ry = props.ry;
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
        x: x,
        y: y,
        ry: ry,
        width: width,
        height: height,
        stroke: "none",
        fill: fill,
        fillOpacity: fillOpacity,
        className: "recharts-cartesian-grid-bg"
    });
};
function LineItem(_ref) {
    var option = _ref.option, lineItemProps = _ref.lineItemProps;
    var lineItem;
    if (/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(option)) {
        // @ts-expect-error typescript does not see the props type when cloning an element
        lineItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(option, lineItemProps);
    } else if (typeof option === 'function') {
        lineItem = option(lineItemProps);
    } else {
        var _svgPropertiesNoEvent;
        var x1 = lineItemProps.x1, y1 = lineItemProps.y1, x2 = lineItemProps.x2, y2 = lineItemProps.y2, key = lineItemProps.key, others = _objectWithoutProperties(lineItemProps, _excluded);
        var _ref2 = (_svgPropertiesNoEvent = (0,_util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_1__/* .svgPropertiesNoEvents */ .uZ)(others)) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {}, __ = _ref2.offset, restOfFilteredProps = _objectWithoutProperties(_ref2, _excluded2);
        var strokeDasharray = Array.isArray(restOfFilteredProps.strokeDasharray) ? restOfFilteredProps.strokeDasharray.join(',') : restOfFilteredProps.strokeDasharray;
        lineItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("line", _extends({}, restOfFilteredProps, {
            strokeDasharray: strokeDasharray,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            fill: "none",
            key: key
        }));
    }
    return lineItem;
}
function HorizontalGridLines(props) {
    var x = props.x, width = props.width, _props$horizontal = props.horizontal, horizontal = _props$horizontal === void 0 ? true : _props$horizontal, horizontalPoints = props.horizontalPoints;
    if (!horizontal || !horizontalPoints || !horizontalPoints.length) {
        return null;
    }
    var xAxisId = props.xAxisId, yAxisId = props.yAxisId, otherLineItemProps = _objectWithoutProperties(props, _excluded3);
    var items = horizontalPoints.map((entry, i)=>{
        var lineItemProps = _objectSpread(_objectSpread({}, otherLineItemProps), {}, {
            x1: x,
            y1: entry,
            x2: x + width,
            y2: entry,
            key: "line-".concat(i),
            index: i
        });
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(LineItem, {
            key: "line-".concat(i),
            option: horizontal,
            lineItemProps: lineItemProps
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-grid-horizontal"
    }, items);
}
function VerticalGridLines(props) {
    var y = props.y, height = props.height, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? true : _props$vertical, verticalPoints = props.verticalPoints;
    if (!vertical || !verticalPoints || !verticalPoints.length) {
        return null;
    }
    var xAxisId = props.xAxisId, yAxisId = props.yAxisId, otherLineItemProps = _objectWithoutProperties(props, _excluded4);
    var items = verticalPoints.map((entry, i)=>{
        var lineItemProps = _objectSpread(_objectSpread({}, otherLineItemProps), {}, {
            x1: entry,
            y1: y,
            x2: entry,
            y2: y + height,
            key: "line-".concat(i),
            index: i
        });
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(LineItem, {
            option: vertical,
            lineItemProps: lineItemProps,
            key: "line-".concat(i)
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-grid-vertical"
    }, items);
}
function HorizontalStripes(props) {
    var horizontalFill = props.horizontalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, horizontalPoints = props.horizontalPoints, _props$horizontal2 = props.horizontal, horizontal = _props$horizontal2 === void 0 ? true : _props$horizontal2;
    if (!horizontal || !horizontalFill || !horizontalFill.length || horizontalPoints == null) {
        return null;
    }
    var roundedSortedHorizontalPoints = horizontalPoints.map((e)=>Math.round(e + y - y)).sort((a, b)=>a - b);
    // Why is this condition `!==` instead of `<=` ?
    if (y !== roundedSortedHorizontalPoints[0]) {
        roundedSortedHorizontalPoints.unshift(0);
    }
    var items = roundedSortedHorizontalPoints.map((entry, i)=>{
        // Why do we strip only the last stripe if it is invisible, and not all invisible stripes?
        var nextPoint = roundedSortedHorizontalPoints[i + 1];
        var lastStripe = nextPoint == null;
        var lineHeight = lastStripe ? y + height - entry : nextPoint - entry;
        if (lineHeight <= 0) {
            return null;
        }
        var colorIndex = i % horizontalFill.length;
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            key: "react-".concat(i),
            y: entry,
            x: x,
            height: lineHeight,
            width: width,
            stroke: "none",
            fill: horizontalFill[colorIndex],
            fillOpacity: fillOpacity,
            className: "recharts-cartesian-grid-bg"
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-gridstripes-horizontal"
    }, items);
}
function VerticalStripes(props) {
    var _props$vertical2 = props.vertical, vertical = _props$vertical2 === void 0 ? true : _props$vertical2, verticalFill = props.verticalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, verticalPoints = props.verticalPoints;
    if (!vertical || !verticalFill || !verticalFill.length) {
        return null;
    }
    var roundedSortedVerticalPoints = verticalPoints.map((e)=>Math.round(e + x - x)).sort((a, b)=>a - b);
    if (x !== roundedSortedVerticalPoints[0]) {
        roundedSortedVerticalPoints.unshift(0);
    }
    var items = roundedSortedVerticalPoints.map((entry, i)=>{
        var nextPoint = roundedSortedVerticalPoints[i + 1];
        var lastStripe = nextPoint == null;
        var lineWidth = lastStripe ? x + width - entry : nextPoint - entry;
        if (lineWidth <= 0) {
            return null;
        }
        var colorIndex = i % verticalFill.length;
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            key: "react-".concat(i),
            x: entry,
            y: y,
            width: lineWidth,
            height: height,
            stroke: "none",
            fill: verticalFill[colorIndex],
            fillOpacity: fillOpacity,
            className: "recharts-cartesian-grid-bg"
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-gridstripes-vertical"
    }, items);
}
var defaultVerticalCoordinatesGenerator = (_ref3, syncWithTicks)=>{
    var xAxis = _ref3.xAxis, width = _ref3.width, height = _ref3.height, offset = _ref3.offset;
    return (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__/* .getCoordinatesOfGrid */ .PW)((0,_getTicks__WEBPACK_IMPORTED_MODULE_3__/* .getTicks */ .f)(_objectSpread(_objectSpread(_objectSpread({}, _CartesianAxis__WEBPACK_IMPORTED_MODULE_4__/* .defaultCartesianAxisProps */ .F), xAxis), {}, {
        ticks: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__/* .getTicksOfAxis */ .Rh)(xAxis, true),
        viewBox: {
            x: 0,
            y: 0,
            width,
            height
        }
    })), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = (_ref4, syncWithTicks)=>{
    var yAxis = _ref4.yAxis, width = _ref4.width, height = _ref4.height, offset = _ref4.offset;
    return (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__/* .getCoordinatesOfGrid */ .PW)((0,_getTicks__WEBPACK_IMPORTED_MODULE_3__/* .getTicks */ .f)(_objectSpread(_objectSpread(_objectSpread({}, _CartesianAxis__WEBPACK_IMPORTED_MODULE_4__/* .defaultCartesianAxisProps */ .F), yAxis), {}, {
        ticks: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__/* .getTicksOfAxis */ .Rh)(yAxis, true),
        viewBox: {
            x: 0,
            y: 0,
            width,
            height
        }
    })), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultCartesianGridProps = {
    horizontal: true,
    vertical: true,
    // The ordinates of horizontal grid lines
    horizontalPoints: [],
    // The abscissas of vertical grid lines
    verticalPoints: [],
    // The fill of colors of grid lines
    verticalFill: [],
    horizontalFill: [],
    xAxisId: 0,
    yAxisId: 0,
    syncWithTicks: false,
    zIndex: _zIndex_DefaultZIndexes__WEBPACK_IMPORTED_MODULE_5__/* .DefaultZIndexes */ .I.grid
};
/**
 * Renders background grid with lines and fill colors in a Cartesian chart.
 *
 * @consumes CartesianChartContext
 */ function CartesianGrid(props) {
    var _propsIncludingDefaul, _propsIncludingDefaul2, _propsIncludingDefaul3, _propsIncludingDefaul4, _propsIncludingDefaul5, _propsIncludingDefaul6;
    var chartWidth = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_6__/* .useChartWidth */ .yi)();
    var chartHeight = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_6__/* .useChartHeight */ .rY)();
    var offset = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_6__/* .useOffsetInternal */ .W7)();
    var propsIncludingDefaults = _objectSpread(_objectSpread({}, (0,_util_resolveDefaultProps__WEBPACK_IMPORTED_MODULE_7__/* .resolveDefaultProps */ .e)(props, defaultCartesianGridProps)), {}, {
        x: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(props.x) ? props.x : offset.left,
        y: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(props.y) ? props.y : offset.top,
        width: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(props.width) ? props.width : offset.width,
        height: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(props.height) ? props.height : offset.height
    });
    var xAxisId = propsIncludingDefaults.xAxisId, yAxisId = propsIncludingDefaults.yAxisId, x = propsIncludingDefaults.x, y = propsIncludingDefaults.y, width = propsIncludingDefaults.width, height = propsIncludingDefaults.height, syncWithTicks = propsIncludingDefaults.syncWithTicks, horizontalValues = propsIncludingDefaults.horizontalValues, verticalValues = propsIncludingDefaults.verticalValues;
    var isPanorama = (0,_context_PanoramaContext__WEBPACK_IMPORTED_MODULE_9__/* .useIsPanorama */ .r)();
    var xAxis = (0,_state_hooks__WEBPACK_IMPORTED_MODULE_10__/* .useAppSelector */ .G)((state)=>(0,_state_selectors_axisSelectors__WEBPACK_IMPORTED_MODULE_11__/* .selectAxisPropsNeededForCartesianGridTicksGenerator */ .ZB)(state, 'xAxis', xAxisId, isPanorama));
    var yAxis = (0,_state_hooks__WEBPACK_IMPORTED_MODULE_10__/* .useAppSelector */ .G)((state)=>(0,_state_selectors_axisSelectors__WEBPACK_IMPORTED_MODULE_11__/* .selectAxisPropsNeededForCartesianGridTicksGenerator */ .ZB)(state, 'yAxis', yAxisId, isPanorama));
    var theme = (0,_theme_RechartsThemeContext__WEBPACK_IMPORTED_MODULE_12__/* .useRechartsTheme */ .f)();
    var themeProps = {
        stroke: (_propsIncludingDefaul = propsIncludingDefaults.stroke) !== null && _propsIncludingDefaul !== void 0 ? _propsIncludingDefaul : theme.grid.stroke,
        strokeWidth: (_propsIncludingDefaul2 = propsIncludingDefaults.strokeWidth) !== null && _propsIncludingDefaul2 !== void 0 ? _propsIncludingDefaul2 : theme.grid.strokeWidth,
        strokeOpacity: (_propsIncludingDefaul3 = propsIncludingDefaults.strokeOpacity) !== null && _propsIncludingDefaul3 !== void 0 ? _propsIncludingDefaul3 : theme.grid.strokeOpacity,
        strokeDasharray: (_propsIncludingDefaul4 = propsIncludingDefaults.strokeDasharray) !== null && _propsIncludingDefaul4 !== void 0 ? _propsIncludingDefaul4 : theme.grid.strokeDasharray
    };
    if (!(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_13__/* .isPositiveNumber */ .F)(width) || !(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_13__/* .isPositiveNumber */ .F)(height) || !(0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(x) || !(0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(y)) {
        return null;
    }
    /*
   * verticalCoordinatesGenerator and horizontalCoordinatesGenerator are defined
   * outside the propsIncludingDefaults because they were never part of the original props
   * and they were never passed as a prop down to horizontal/vertical custom elements.
   * If we add these two to propsIncludingDefaults then we are changing public API.
   * Not a bad thing per se but also not necessary.
   */ var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
    var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
    var horizontalPoints = propsIncludingDefaults.horizontalPoints, verticalPoints = propsIncludingDefaults.verticalPoints;
    // No horizontal points are specified
    if ((!horizontalPoints || !horizontalPoints.length) && typeof horizontalCoordinatesGenerator === 'function') {
        var isHorizontalValues = horizontalValues && horizontalValues.length;
        var generatorResult = horizontalCoordinatesGenerator({
            yAxis: yAxis ? _objectSpread(_objectSpread({}, yAxis), {}, {
                ticks: isHorizontalValues ? horizontalValues : yAxis.ticks
            }) : undefined,
            width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
            height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
            offset
        }, isHorizontalValues ? true : syncWithTicks);
        (0,_util_LogUtils__WEBPACK_IMPORTED_MODULE_14__/* .warn */ .R)(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof generatorResult, "]"));
        if (Array.isArray(generatorResult)) {
            horizontalPoints = generatorResult;
        }
    }
    // No vertical points are specified
    if ((!verticalPoints || !verticalPoints.length) && typeof verticalCoordinatesGenerator === 'function') {
        var isVerticalValues = verticalValues && verticalValues.length;
        var _generatorResult = verticalCoordinatesGenerator({
            xAxis: xAxis ? _objectSpread(_objectSpread({}, xAxis), {}, {
                ticks: isVerticalValues ? verticalValues : xAxis.ticks
            }) : undefined,
            width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
            height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
            offset
        }, isVerticalValues ? true : syncWithTicks);
        (0,_util_LogUtils__WEBPACK_IMPORTED_MODULE_14__/* .warn */ .R)(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof _generatorResult, "]"));
        if (Array.isArray(_generatorResult)) {
            verticalPoints = _generatorResult;
        }
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_zIndex_ZIndexLayer__WEBPACK_IMPORTED_MODULE_15__/* .ZIndexLayer */ .g, {
        zIndex: propsIncludingDefaults.zIndex
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-grid"
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Background, {
        fill: (_propsIncludingDefaul5 = propsIncludingDefaults.fill) !== null && _propsIncludingDefaul5 !== void 0 ? _propsIncludingDefaul5 : theme.grid.fill,
        fillOpacity: (_propsIncludingDefaul6 = propsIncludingDefaults.fillOpacity) !== null && _propsIncludingDefaul6 !== void 0 ? _propsIncludingDefaul6 : theme.grid.fillOpacity,
        x: propsIncludingDefaults.x,
        y: propsIncludingDefaults.y,
        width: propsIncludingDefaults.width,
        height: propsIncludingDefaults.height,
        ry: propsIncludingDefaults.ry
    }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(HorizontalStripes, _extends({}, propsIncludingDefaults, {
        horizontalPoints: horizontalPoints
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(VerticalStripes, _extends({}, propsIncludingDefaults, {
        verticalPoints: verticalPoints
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(HorizontalGridLines, _extends({}, propsIncludingDefaults, themeProps, {
        offset: offset,
        horizontalPoints: horizontalPoints,
        xAxis: xAxis,
        yAxis: yAxis
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(VerticalGridLines, _extends({}, propsIncludingDefaults, themeProps, {
        offset: offset,
        verticalPoints: verticalPoints,
        xAxis: xAxis,
        yAxis: yAxis
    }))));
}
CartesianGrid.displayName = 'CartesianGrid';


/***/ }),

/***/ 29450:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Box)
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
    name: "box",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
                key: "hh9hay"
            }
        ],
        [
            "path",
            {
                d: "m3.3 7 8.7 5 8.7-5",
                key: "g66t2b"
            }
        ],
        [
            "path",
            {
                d: "M12 22V12",
                key: "d0xqtd"
            }
        ]
    ]
};
__iconData.node;
const Box = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=box.mjs.map


/***/ }),

/***/ 32159:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ToggleLeft)
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
    name: "toggle-left",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "9",
                cy: "12",
                r: "3",
                key: "u3jwor"
            }
        ],
        [
            "rect",
            {
                width: "20",
                height: "14",
                x: "2",
                y: "5",
                rx: "7",
                key: "g7kal2"
            }
        ]
    ]
};
__iconData.node;
const ToggleLeft = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=toggle-left.mjs.map


/***/ }),

/***/ 34018:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Shield)
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
    name: "shield",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
                key: "oel41y"
            }
        ]
    ]
};
__iconData.node;
const Shield = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=shield.mjs.map


/***/ }),

/***/ 35484:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleAlert)
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
    name: "circle-alert",
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
            "line",
            {
                x1: "12",
                x2: "12",
                y1: "8",
                y2: "12",
                key: "1pkeuh"
            }
        ],
        [
            "line",
            {
                x1: "12",
                x2: "12.01",
                y1: "16",
                y2: "16",
                key: "4dfq90"
            }
        ]
    ],
    aliases: [
        "alert-circle"
    ]
};
__iconData.node;
const CircleAlert = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=circle-alert.mjs.map


/***/ }),

/***/ 36338:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Activity)
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
    name: "activity",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
                key: "169zse"
            }
        ]
    ]
};
__iconData.node;
const Activity = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=activity.mjs.map


/***/ }),

/***/ 36483:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FileText)
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

/***/ 36565:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Minus)
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
    name: "minus",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M5 12h14",
                key: "1ays0h"
            }
        ]
    ]
};
__iconData.node;
const Minus = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=minus.mjs.map


/***/ }),

/***/ 36619:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Play)
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
    name: "play",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
                key: "10ikf1"
            }
        ]
    ]
};
__iconData.node;
const Play = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=play.mjs.map


/***/ }),

/***/ 37206:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport default from dynamic */ _shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0___default.a)
/* harmony export */ });
/* harmony import */ var _shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75707);
/* harmony import */ var _shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0__);



//# sourceMappingURL=app-dynamic.js.map

/***/ }),

/***/ 41112:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "BailoutToCSR", ({
    enumerable: true,
    get: function() {
        return BailoutToCSR;
    }
}));
const _bailouttocsr = __webpack_require__(1980);
function BailoutToCSR({ reason, children }) {
    if (false) {}
    return children;
} //# sourceMappingURL=dynamic-bailout-to-csr.js.map


/***/ }),

/***/ 41537:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ useRender)
/* harmony export */ });
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88401);

/**
 * Renders a Base UI element.
 *
 * @public
 */
function useRender(params) {
  return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useRenderElement */ .o)(params.defaultTagName ?? 'div', params, params);
}

/***/ }),

/***/ 44539:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Calendar)
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
    name: "calendar",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M8 2v3",
                key: "1ioesn"
            }
        ],
        [
            "path",
            {
                d: "M16 2v3",
                key: "otl347"
            }
        ],
        [
            "rect",
            {
                x: "3",
                y: "3",
                width: "18",
                height: "18",
                rx: "2",
                key: "h1oib"
            }
        ],
        [
            "path",
            {
                d: "M3 9h18",
                key: "1pudct"
            }
        ]
    ]
};
__iconData.node;
const Calendar = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=calendar.mjs.map


/***/ }),

/***/ 47391:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LockOpen)
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
    name: "lock-open",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "11",
                x: "3",
                y: "11",
                rx: "2",
                ry: "2",
                key: "1w4ew1"
            }
        ],
        [
            "path",
            {
                d: "M7 11V7a5 5 0 0 1 9.9-1",
                key: "1mm8w8"
            }
        ]
    ],
    aliases: [
        "unlock"
    ]
};
__iconData.node;
const LockOpen = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=lock-open.mjs.map


/***/ }),

/***/ 48035:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ BarChart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95295);
/* harmony import */ var _CartesianChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80598);




var allowedTooltipTypes = [
    'axis',
    'item'
];
/**
 * @consumes ResponsiveContainerContext
 * @provides CartesianViewBoxContext
 * @provides CartesianChartContext
 */ var BarChart = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref)=>{
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CartesianChart__WEBPACK_IMPORTED_MODULE_1__/* .CartesianChart */ .P, {
        chartName: "BarChart",
        defaultTooltipEventType: "axis",
        validateTooltipEventTypes: allowedTooltipTypes,
        tooltipPayloadSearcher: _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__/* .arrayTooltipSearcher */ .uN,
        categoricalChartProps: props,
        ref: ref
    });
});


/***/ }),

/***/ 50825:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Download)
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
    name: "download",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 15V3",
                key: "m9g1x1"
            }
        ],
        [
            "path",
            {
                d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                key: "ih7n3h"
            }
        ],
        [
            "path",
            {
                d: "m7 10 5 5 5-5",
                key: "brsn70"
            }
        ]
    ]
};
__iconData.node;
const Download = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=download.mjs.map


/***/ }),

/***/ 52681:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ AnimatePresence)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(39551);
/* harmony import */ var _utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28819);
/* harmony import */ var _utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4524);
/* harmony import */ var _PresenceChild_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(89166);
/* harmony import */ var _use_presence_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79196);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91766);
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

/***/ 52920:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Palette)
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
    name: "palette",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
                key: "e79jfc"
            }
        ],
        [
            "circle",
            {
                cx: "13.5",
                cy: "6.5",
                r: ".5",
                fill: "currentColor",
                key: "1okk4w"
            }
        ],
        [
            "circle",
            {
                cx: "17.5",
                cy: "10.5",
                r: ".5",
                fill: "currentColor",
                key: "f64h9f"
            }
        ],
        [
            "circle",
            {
                cx: "6.5",
                cy: "12.5",
                r: ".5",
                fill: "currentColor",
                key: "qy21gx"
            }
        ],
        [
            "circle",
            {
                cx: "8.5",
                cy: "7.5",
                r: ".5",
                fill: "currentColor",
                key: "fotxhn"
            }
        ]
    ]
};
__iconData.node;
const Palette = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=palette.mjs.map


/***/ }),

/***/ 54540:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Archive)
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
    name: "archive",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "20",
                height: "5",
                x: "2",
                y: "3",
                rx: "1",
                key: "1wp1u1"
            }
        ],
        [
            "path",
            {
                d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
                key: "1s80jp"
            }
        ],
        [
            "path",
            {
                d: "M10 12h4",
                key: "a56b0p"
            }
        ]
    ]
};
__iconData.node;
const Archive = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=archive.mjs.map


/***/ }),

/***/ 57465:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Users)
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
    name: "users",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
                key: "1yyitq"
            }
        ],
        [
            "path",
            {
                d: "M16 3.128a4 4 0 0 1 0 7.744",
                key: "16gr8j"
            }
        ],
        [
            "path",
            {
                d: "M22 21v-2a4 4 0 0 0-3-3.87",
                key: "kshegd"
            }
        ],
        [
            "circle",
            {
                cx: "9",
                cy: "7",
                r: "4",
                key: "nufk8"
            }
        ]
    ]
};
__iconData.node;
const Users = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=users.mjs.map


/***/ }),

/***/ 58546:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ AlertDialogRoot)
/* harmony export */ });
/* harmony import */ var _dialog_root_useRenderDialogRoot_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50348);
/* __next_internal_client_entry_do_not_use__ AlertDialogRoot auto */ 
/**
 * Groups all parts of the alert dialog.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */ function AlertDialogRoot(props) {
    return (0,_dialog_root_useRenderDialogRoot_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useRenderDialogRoot */ .G)('alert-dialog', props);
}


/***/ }),

/***/ 58777:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Braces)
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
    name: "braces",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
                key: "ezmyqa"
            }
        ],
        [
            "path",
            {
                d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
                key: "e1hn23"
            }
        ]
    ],
    aliases: [
        "curly-braces"
    ]
};
__iconData.node;
const Braces = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=braces.mjs.map


/***/ }),

/***/ 58858:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ UserCog)
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
    name: "user-cog",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 15H6a4 4 0 0 0-4 4v2",
                key: "1nfge6"
            }
        ],
        [
            "path",
            {
                d: "m14.305 16.53.923-.382",
                key: "1itpsq"
            }
        ],
        [
            "path",
            {
                d: "m15.228 13.852-.923-.383",
                key: "eplpkm"
            }
        ],
        [
            "path",
            {
                d: "m16.852 12.228-.383-.923",
                key: "13v3q0"
            }
        ],
        [
            "path",
            {
                d: "m16.852 17.772-.383.924",
                key: "1i8mnm"
            }
        ],
        [
            "path",
            {
                d: "m19.148 12.228.383-.923",
                key: "1q8j1v"
            }
        ],
        [
            "path",
            {
                d: "m19.53 18.696-.382-.924",
                key: "vk1qj3"
            }
        ],
        [
            "path",
            {
                d: "m20.772 13.852.924-.383",
                key: "n880s0"
            }
        ],
        [
            "path",
            {
                d: "m20.772 16.148.924.383",
                key: "1g6xey"
            }
        ],
        [
            "circle",
            {
                cx: "18",
                cy: "15",
                r: "3",
                key: "gjjjvw"
            }
        ],
        [
            "circle",
            {
                cx: "9",
                cy: "7",
                r: "4",
                key: "nufk8"
            }
        ]
    ]
};
__iconData.node;
const UserCog = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=user-cog.mjs.map


/***/ }),

/***/ 62417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ legacyTheme)
/* harmony export */ });
/**
 * This is the theme as was the default in 2.x and 3.x branches.
 *
 * It's not very consistent, colors are all over the place and overall exists only for backwards compatibility.
 * Prefer to use either {@link lightTheme} or {@link darkTheme} instead.
 *
 * @deprecated
 * @experimental
 */ var legacyTheme = {
    grid: {
        stroke: '#ccc',
        fill: 'none'
    }
};


/***/ }),

/***/ 63199:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Coins)
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
    name: "coins",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M13.744 17.736a6 6 0 1 1-7.48-7.48",
                key: "bq4yh3"
            }
        ],
        [
            "path",
            {
                d: "M15 6h1v4",
                key: "11y1tn"
            }
        ],
        [
            "path",
            {
                d: "m6.134 14.768.866-.5 2 3.464",
                key: "17snzx"
            }
        ],
        [
            "circle",
            {
                cx: "16",
                cy: "8",
                r: "6",
                key: "14bfc9"
            }
        ]
    ]
};
__iconData.node;
const Coins = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=coins.mjs.map


/***/ }),

/***/ 64054:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    bindSnapshot: function() {
        return bindSnapshot;
    },
    createAsyncLocalStorage: function() {
        return createAsyncLocalStorage;
    },
    createSnapshot: function() {
        return createSnapshot;
    }
});
const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available'), "__NEXT_ERROR_CODE", {
    value: "E504",
    enumerable: false,
    configurable: true
});
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    static bind(fn) {
        return fn;
    }
}
const maybeGlobalAsyncLocalStorage = typeof globalThis !== 'undefined' && globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
}
function bindSnapshot(// WARNING: Don't pass a named function to this argument! See: https://github.com/facebook/react/pull/34911
fn) {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.bind(fn);
    }
    return FakeAsyncLocalStorage.bind(fn);
}
function createSnapshot() {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.snapshot();
    }
    return function(fn, ...args) {
        return fn(...args);
    };
}

//# sourceMappingURL=async-local-storage.js.map

/***/ }),

/***/ 64577:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Check)
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

/***/ 64962:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleCheck)
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
    name: "circle-check",
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
                d: "m16 9-5.5 5.5L8 12",
                key: "xofnsj"
            }
        ]
    ],
    aliases: [
        "check-circle-2"
    ]
};
__iconData.node;
const CircleCheck = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=circle-check.mjs.map


/***/ }),

/***/ 65377:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Search)
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

/***/ 68562:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Upload)
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
    name: "upload",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 3v12",
                key: "1x0j5s"
            }
        ],
        [
            "path",
            {
                d: "m17 8-5-5-5 5",
                key: "7q97r8"
            }
        ],
        [
            "path",
            {
                d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                key: "ih7n3h"
            }
        ]
    ]
};
__iconData.node;
const Upload = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=upload.mjs.map


/***/ }),

/***/ 68635:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _default;
    }
}));
const _jsxruntime = __webpack_require__(95155);
const _react = __webpack_require__(12115);
const _dynamicbailouttocsr = __webpack_require__(41112);
const _preloadchunks = __webpack_require__(21957);
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    // Check "default" prop before accessing it, as it could be client reference proxy that could break it reference.
    // Cases:
    // mod: { default: Component }
    // mod: Component
    // mod: { default: proxy(Component) }
    // mod: proxy(Component)
    const hasDefault = mod && 'default' in mod;
    return {
        default: hasDefault ? mod.default : mod
    };
}
const defaultOptions = {
    loader: ()=>Promise.resolve(convertModule(()=>null)),
    loading: null,
    ssr: true
};
function Loadable(options) {
    const opts = {
        ...defaultOptions,
        ...options
    };
    const Lazy = /*#__PURE__*/ (0, _react.lazy)(()=>opts.loader().then(convertModule));
    const Loading = opts.loading;
    function LoadableComponent(props) {
        const fallbackElement = Loading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        // If it's non-SSR or provided a loading component, wrap it in a suspense boundary
        const hasSuspenseBoundary = !opts.ssr || !!opts.loading;
        const Wrap = hasSuspenseBoundary ? _react.Suspense : _react.Fragment;
        const wrapProps = hasSuspenseBoundary ? {
            fallback: fallbackElement
        } : {};
        const children = opts.ssr ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                 false ? /*#__PURE__*/ 0 : null,
                /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                    ...props
                })
            ]
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSR, {
            reason: "next/dynamic",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                ...props
            })
        });
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Wrap, {
            ...wrapProps,
            children: children
        });
    }
    LoadableComponent.displayName = 'LoadableComponent';
    return LoadableComponent;
}
const _default = Loadable; //# sourceMappingURL=loadable.js.map


/***/ }),

/***/ 69072:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Crown)
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
    name: "crown",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
                key: "1vdc57"
            }
        ],
        [
            "path",
            {
                d: "M5 21h14",
                key: "11awu3"
            }
        ]
    ]
};
__iconData.node;
const Crown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=crown.mjs.map


/***/ }),

/***/ 69947:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ AreaRevealShape)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _util_DataUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92191);
/* harmony import */ var _shape_Curve__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7718);
/* harmony import */ var _util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99498);
/* harmony import */ var _container_Layer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11058);
/* harmony import */ var _util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23651);
/* harmony import */ var _util_useId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76144);
var _excluded = [
    "animationElapsedTime",
    "isAnimating",
    "isEntrance",
    "layout",
    "isRange",
    "stroke",
    "connectNulls"
], _excluded2 = [
    "id",
    "baseLine"
];
function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n) {
        for(var e = 1; e < arguments.length; e++){
            var t = arguments[e];
            for(var r in t)({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
    }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}







/**
 * Props for the clip-path rect computation.
 * @internal
 */ function HorizontalClipRect(_ref) {
    var _points$, _points;
    var alpha = _ref.alpha, baseLine = _ref.baseLine, points = _ref.points, strokeWidth = _ref.strokeWidth;
    var startX = (_points$ = points[0]) === null || _points$ === void 0 ? void 0 : _points$.x;
    var endX = (_points = points[points.length - 1]) === null || _points === void 0 ? void 0 : _points.x;
    if (!(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__/* .isWellBehavedNumber */ .H)(startX) || !(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__/* .isWellBehavedNumber */ .H)(endX)) {
        return null;
    }
    var width = alpha * Math.abs(startX - endX);
    var maxY = Math.max(...points.map((entry)=>entry.y || 0));
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .Et)(baseLine)) {
        maxY = Math.max(baseLine, maxY);
    } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxY = Math.max(...baseLine.map((entry)=>entry.y || 0), maxY);
    }
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .Et)(maxY)) {
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            x: startX < endX ? startX : startX - width,
            y: 0,
            width: width,
            height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
        });
    }
    return null;
}
function VerticalClipRect(_ref2) {
    var _points$2, _points2;
    var alpha = _ref2.alpha, baseLine = _ref2.baseLine, points = _ref2.points, strokeWidth = _ref2.strokeWidth;
    var startY = (_points$2 = points[0]) === null || _points$2 === void 0 ? void 0 : _points$2.y;
    var endY = (_points2 = points[points.length - 1]) === null || _points2 === void 0 ? void 0 : _points2.y;
    if (!(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__/* .isWellBehavedNumber */ .H)(startY) || !(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__/* .isWellBehavedNumber */ .H)(endY)) {
        return null;
    }
    var height = alpha * Math.abs(startY - endY);
    var maxX = Math.max(...points.map((entry)=>entry.x || 0));
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .Et)(baseLine)) {
        maxX = Math.max(baseLine, maxX);
    } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxX = Math.max(...baseLine.map((entry)=>entry.x || 0), maxX);
    }
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .Et)(maxX)) {
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            x: 0,
            y: startY < endY ? startY : startY - height,
            width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
            height: Math.floor(height)
        });
    }
    return null;
}
function RevealClipRect(_ref3) {
    var alpha = _ref3.alpha, layout = _ref3.layout, points = _ref3.points, baseLine = _ref3.baseLine, strokeWidth = _ref3.strokeWidth;
    if (layout === 'vertical') {
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(VerticalClipRect, {
            alpha: alpha,
            points: points,
            baseLine: baseLine,
            strokeWidth: strokeWidth
        });
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(HorizontalClipRect, {
        alpha: alpha,
        points: points,
        baseLine: baseLine,
        strokeWidth: strokeWidth
    });
}
/**
 * The default shape for Area that reveals the chart with a left-to-right (or top-to-bottom)
 * clip-path animation on entrance, and renders the plain curve otherwise.
 *
 * This component renders the complete Area visual: the filled area curve, the stroke curve,
 * and (for range areas) the baseline stroke curve. During entrance animation, all curves are
 * wrapped in a clip-path that progressively reveals the area.
 *
 * This is the built-in entrance animation for Area. It is automatically used when no custom
 * `shape` prop is provided. You can import and reuse it as a starting point for custom shapes.
 *
 * @example
 * ```tsx
 * import { Area, AreaRevealShape } from 'recharts';
 *
 * // Use the default shape explicitly (same as providing no shape prop)
 * <Area dataKey="value" shape={AreaRevealShape} />
 * ```
 *
 * @see {@link https://recharts.github.io/en-US/guide/animations Animation guide}
 *
 * @since 3.9
 */ function AreaRevealShape(props) {
    var _props$animationElaps = props.animationElapsedTime, animationElapsedTime = _props$animationElaps === void 0 ? 1 : _props$animationElaps, _props$isAnimating = props.isAnimating, isAnimating = _props$isAnimating === void 0 ? false : _props$isAnimating, _props$isEntrance = props.isEntrance, isEntrance = _props$isEntrance === void 0 ? false : _props$isEntrance, layoutProp = props.layout, isRange = props.isRange, stroke = props.stroke, connectNulls = props.connectNulls, restProps = _objectWithoutProperties(props, _excluded);
    var layout = layoutProp === 'vertical' ? 'vertical' : 'horizontal';
    var finalConnectNulls = connectNulls !== null && connectNulls !== void 0 ? connectNulls : false;
    var clipId = (0,_util_useId__WEBPACK_IMPORTED_MODULE_3__/* .useId */ .B)();
    var id = restProps.id, baseLine = restProps.baseLine, propsWithoutIdBaseline = _objectWithoutProperties(restProps, _excluded2);
    var strokeSvgProps = (0,_util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_4__/* .svgPropertiesNoEvents */ .uZ)(propsWithoutIdBaseline);
    var fillCurve = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shape_Curve__WEBPACK_IMPORTED_MODULE_5__/* .Curve */ .Ip, _extends({}, restProps, {
        id: id,
        baseLine: baseLine,
        connectNulls: finalConnectNulls,
        stroke: "none",
        className: "recharts-area-area",
        layout: layout
    }));
    var strokeCurve = stroke !== 'none' && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shape_Curve__WEBPACK_IMPORTED_MODULE_5__/* .Curve */ .Ip, _extends({}, strokeSvgProps, {
        className: "recharts-area-curve",
        layout: layout,
        type: restProps.type,
        connectNulls: finalConnectNulls,
        fill: "none",
        stroke: stroke,
        points: restProps.points
    }));
    var baselineCurve = stroke !== 'none' && isRange && Array.isArray(baseLine) && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shape_Curve__WEBPACK_IMPORTED_MODULE_5__/* .Curve */ .Ip, _extends({}, strokeSvgProps, {
        className: "recharts-area-curve",
        layout: layout,
        type: restProps.type,
        connectNulls: finalConnectNulls,
        fill: "none",
        stroke: stroke,
        points: baseLine
    }));
    if (isEntrance && (isAnimating || animationElapsedTime < 1)) {
        var _restProps$points;
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_container_Layer__WEBPACK_IMPORTED_MODULE_6__/* .Layer */ .W, null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
            id: clipId
        }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RevealClipRect, {
            alpha: animationElapsedTime,
            points: (_restProps$points = restProps.points) !== null && _restProps$points !== void 0 ? _restProps$points : [],
            baseLine: baseLine,
            layout: layout,
            strokeWidth: restProps.strokeWidth
        }))), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_container_Layer__WEBPACK_IMPORTED_MODULE_6__/* .Layer */ .W, {
            clipPath: "url(#".concat(clipId, ")")
        }, fillCurve, strokeCurve, baselineCurve));
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, fillCurve, strokeCurve, baselineCurve);
}


/***/ }),

/***/ 70233:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Funnel)
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
    name: "funnel",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
                key: "sc7q7i"
            }
        ]
    ],
    aliases: [
        "filter"
    ]
};
__iconData.node;
const Funnel = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=funnel.mjs.map


/***/ }),

/***/ 71019:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CreditCard)
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
    name: "credit-card",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "20",
                height: "14",
                x: "2",
                y: "5",
                rx: "2",
                key: "ynyp8z"
            }
        ],
        [
            "line",
            {
                x1: "2",
                x2: "22",
                y1: "10",
                y2: "10",
                key: "1b3vmo"
            }
        ],
        [
            "path",
            {
                d: "M6 14h2",
                key: "mk7k0u"
            }
        ]
    ]
};
__iconData.node;
const CreditCard = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=credit-card.mjs.map


/***/ }),

/***/ 75707:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return dynamic;
    }
}));
const _interop_require_default = __webpack_require__(73623);
const _loadable = /*#__PURE__*/ _interop_require_default._(__webpack_require__(68635));
function dynamic(dynamicOptions, options) {
    const loadableOptions = {};
    if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    }
    const mergedOptions = {
        ...loadableOptions,
        ...options
    };
    return (0, _loadable.default)({
        ...mergedOptions,
        modules: mergedOptions.loadableGenerated?.modules
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-dynamic.js.map


/***/ }),

/***/ 76721:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronRight)
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

/***/ 78780:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronLeft)
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

/***/ 79267:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Pause)
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
    name: "pause",
    size: 24,
    node: [
        [
            "rect",
            {
                x: "14",
                y: "3",
                width: "5",
                height: "18",
                rx: "1",
                key: "kaeet6"
            }
        ],
        [
            "rect",
            {
                x: "5",
                y: "3",
                width: "5",
                height: "18",
                rx: "1",
                key: "1wsw3u"
            }
        ]
    ]
};
__iconData.node;
const Pause = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=pause.mjs.map


/***/ }),

/***/ 79762:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Ban)
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
    name: "ban",
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
                d: "M4.929 4.929 19.07 19.071",
                key: "196cmz"
            }
        ]
    ]
};
__iconData.node;
const Ban = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=ban.mjs.map


/***/ }),

/***/ 80167:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Megaphone)
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
    name: "megaphone",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
                key: "q8bfy3"
            }
        ],
        [
            "path",
            {
                d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14",
                key: "1853fq"
            }
        ],
        [
            "path",
            {
                d: "M8 6v8",
                key: "15ugcq"
            }
        ]
    ]
};
__iconData.node;
const Megaphone = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=megaphone.mjs.map


/***/ }),

/***/ 81402:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Save)
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
    name: "save",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
                key: "1c8476"
            }
        ],
        [
            "path",
            {
                d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
                key: "1ydtos"
            }
        ],
        [
            "path",
            {
                d: "M7 3v4a1 1 0 0 0 1 1h7",
                key: "t51u73"
            }
        ]
    ]
};
__iconData.node;
const Save = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=save.mjs.map


/***/ }),

/***/ 81499:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ KeyRound)
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
    name: "key-round",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
                key: "1s6t7t"
            }
        ],
        [
            "circle",
            {
                cx: "16.5",
                cy: "7.5",
                r: ".5",
                fill: "currentColor",
                key: "w0ekpg"
            }
        ]
    ]
};
__iconData.node;
const KeyRound = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=key-round.mjs.map


/***/ }),

/***/ 82749:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RefreshCw)
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
    name: "refresh-cw",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
                key: "v9h5vc"
            }
        ],
        [
            "path",
            {
                d: "M21 3v5h-5",
                key: "1q7to0"
            }
        ],
        [
            "path",
            {
                d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
                key: "3uifl3"
            }
        ],
        [
            "path",
            {
                d: "M8 16H3v5",
                key: "1cv678"
            }
        ]
    ]
};
__iconData.node;
const RefreshCw = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=refresh-cw.mjs.map


/***/ }),

/***/ 86210:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Image)
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
    name: "image",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "18",
                x: "3",
                y: "3",
                rx: "2",
                ry: "2",
                key: "1m3agn"
            }
        ],
        [
            "circle",
            {
                cx: "9",
                cy: "9",
                r: "2",
                key: "af1f0g"
            }
        ],
        [
            "path",
            {
                d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
                key: "1xmnt7"
            }
        ]
    ]
};
__iconData.node;
const Image = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=image.mjs.map


/***/ }),

/***/ 88074:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Settings)
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
    name: "settings",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
                key: "1i5ecw"
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
const Settings = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=settings.mjs.map


/***/ }),

/***/ 89166:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ PresenceChild)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15131);
/* harmony import */ var _utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28819);
/* harmony import */ var _utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4524);
/* harmony import */ var _PopChild_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5808);
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

/***/ 90123:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gk: () => (/* binding */ Area),
/* harmony export */   Vf: () => (/* binding */ computeArea)
/* harmony export */ });
/* unused harmony exports defaultAreaProps, getBaseValue */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(29722);
/* harmony import */ var _container_Layer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(11058);
/* harmony import */ var _component_LabelList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(85545);
/* harmony import */ var _component_Dots__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(48661);
/* harmony import */ var _util_DataUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92191);
/* harmony import */ var _util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88559);
/* harmony import */ var _util_ReactUtils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(21966);
/* harmony import */ var _component_ActivePoints__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(46664);
/* harmony import */ var _state_SetTooltipEntrySettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(96561);
/* harmony import */ var _GraphicalItemClipPath__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(36793);
/* harmony import */ var _state_selectors_areaSelectors__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(98261);
/* harmony import */ var _context_PanoramaContext__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(64105);
/* harmony import */ var _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(65372);
/* harmony import */ var _state_selectors_selectors__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(96530);
/* harmony import */ var _state_SetLegendPayload__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(45970);
/* harmony import */ var _state_hooks__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(10365);
/* harmony import */ var _animation_AnimatedItems__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(89045);
/* harmony import */ var _animation_matchBy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60106);
/* harmony import */ var _animation_useAnimationStartSnapshot__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(4607);
/* harmony import */ var _util_resolveDefaultProps__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(43527);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(25135);
/* harmony import */ var _context_RegisterGraphicalItemId__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(45475);
/* harmony import */ var _state_SetGraphicalItem__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(9629);
/* harmony import */ var _util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23651);
/* harmony import */ var _util_getRadiusAndStrokeWidthFromDot__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(21454);
/* harmony import */ var _util_svgPropertiesAndEvents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(55359);
/* harmony import */ var _util_ActiveShapeUtils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(59318);
/* harmony import */ var _zIndex_ZIndexLayer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(10483);
/* harmony import */ var _zIndex_DefaultZIndexes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(51531);
/* harmony import */ var _util_propsAreEqual__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(46574);
/* harmony import */ var _AreaRevealShape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(69947);
var _excluded = [
    "id"
], _excluded2 = [
    "activeDot",
    "animationBegin",
    "animationDuration",
    "animationEasing",
    "connectNulls",
    "dot",
    "fill",
    "fillOpacity",
    "hide",
    "isAnimationActive",
    "legendType",
    "stroke",
    "xAxisId",
    "yAxisId"
];
function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n) {
        for(var e = 1; e < arguments.length; e++){
            var t = arguments[e];
            for(var r in t)({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
    }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}

































/**
 * @inline
 */ /**
 * Our base value array has payload in it, and we expose it externally too.
 */ /**
 * Internal props, combination of external props + defaultProps + private Recharts state
 */ /**
 * External props, intended for end users to fill in
 */ var defaultAreaAnimateItems = (items, animationElapsedTime)=>{
    if (items == null) {
        // First render: return items as-is, clip-path animation handles the reveal
        return [];
    }
    if (animationElapsedTime === 1) {
        return items.flatMap((item)=>item.status === 'removed' ? [] : [
                item.next
            ]);
    }
    return items.flatMap((item)=>{
        if (item.status === 'matched') {
            return [
                _objectSpread(_objectSpread({}, item.next), {}, {
                    x: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .interpolate */ .GW)(item.prev.x, item.next.x, animationElapsedTime),
                    y: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .interpolate */ .GW)(item.prev.y, item.next.y, animationElapsedTime)
                })
            ];
        }
        if (item.status === 'added') {
            /*
       * Here we just return the final position without interpolating
       * so that we can allow the default initial animation that is done by clipPath in AreaRevealShape.
       * If you want your own custom animations then you may want to interpolate this one as well.
       */ return [
                item.next
            ];
        }
        // removed: drop
        return [];
    });
};
var defaultAreaProps = {
    activeDot: true,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease',
    animationMatchBy: _animation_matchBy__WEBPACK_IMPORTED_MODULE_2__/* .matchByIndex */ .hC,
    animationInterpolateFn: defaultAreaAnimateItems,
    connectNulls: false,
    dot: false,
    fill: '#3182bd',
    fillOpacity: 0.6,
    hide: false,
    isAnimationActive: 'auto',
    legendType: 'line',
    stroke: '#3182bd',
    strokeWidth: 1,
    type: 'linear',
    label: false,
    shape: _AreaRevealShape__WEBPACK_IMPORTED_MODULE_3__/* .AreaRevealShape */ .q,
    xAxisId: 0,
    yAxisId: 0,
    zIndex: _zIndex_DefaultZIndexes__WEBPACK_IMPORTED_MODULE_4__/* .DefaultZIndexes */ .I.area
};
/**
 * Because of naming conflict, we are forced to ignore certain (valid) SVG attributes.
 */ function getLegendItemColor(stroke, fill) {
    return stroke && stroke !== 'none' ? stroke : fill;
}
var computeLegendPayloadFromAreaData = (props)=>{
    var dataKey = props.dataKey, name = props.name, stroke = props.stroke, fill = props.fill, legendType = props.legendType, hide = props.hide;
    return [
        {
            inactive: hide,
            dataKey,
            type: legendType,
            color: getLegendItemColor(stroke, fill),
            value: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getTooltipNameProp */ .uM)(name, dataKey),
            payload: props
        }
    ];
};
var SetAreaTooltipEntrySettings = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.memo((_ref)=>{
    var dataKey = _ref.dataKey, data = _ref.data, stroke = _ref.stroke, strokeWidth = _ref.strokeWidth, fill = _ref.fill, name = _ref.name, hide = _ref.hide, unit = _ref.unit, formatter = _ref.formatter, tooltipType = _ref.tooltipType, id = _ref.id;
    var tooltipEntrySettings = {
        dataDefinedOnItem: data,
        getPosition: _util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .noop */ .lQ,
        settings: {
            stroke,
            strokeWidth,
            fill,
            dataKey,
            nameKey: undefined,
            name: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getTooltipNameProp */ .uM)(name, dataKey),
            hide,
            type: tooltipType,
            color: getLegendItemColor(stroke, fill),
            unit,
            formatter,
            graphicalItemId: id
        }
    };
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_state_SetTooltipEntrySettings__WEBPACK_IMPORTED_MODULE_6__/* .SetTooltipEntrySettings */ .r, {
        tooltipEntrySettings: tooltipEntrySettings
    });
});
function AreaDotsWrapper(_ref2) {
    var clipPathId = _ref2.clipPathId, points = _ref2.points, props = _ref2.props;
    var needClip = props.needClip, dot = props.dot, dataKey = props.dataKey;
    var areaProps = (0,_util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_7__/* .svgPropertiesNoEvents */ .uZ)(props);
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_Dots__WEBPACK_IMPORTED_MODULE_8__/* .Dots */ .n, {
        points: points,
        dot: dot,
        className: "recharts-area-dots",
        dotClassName: "recharts-area-dot",
        dataKey: dataKey,
        baseProps: areaProps,
        needClip: needClip,
        clipPathId: clipPathId
    });
}
function AreaLabelListProvider(_ref3) {
    var showLabels = _ref3.showLabels, children = _ref3.children, points = _ref3.points;
    var labelListEntries = points.map((point)=>{
        var _point$x, _point$y;
        var viewBox = {
            x: (_point$x = point.x) !== null && _point$x !== void 0 ? _point$x : 0,
            y: (_point$y = point.y) !== null && _point$y !== void 0 ? _point$y : 0,
            width: 0,
            lowerWidth: 0,
            upperWidth: 0,
            height: 0
        };
        return _objectSpread(_objectSpread({}, viewBox), {}, {
            value: point.value,
            payload: point.payload,
            parentViewBox: undefined,
            viewBox,
            fill: undefined
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_LabelList__WEBPACK_IMPORTED_MODULE_9__/* .CartesianLabelListContextProvider */ .h8, {
        value: showLabels ? labelListEntries : undefined
    }, children);
}
function StaticArea(_ref4) {
    var points = _ref4.points, baseLine = _ref4.baseLine, needClip = _ref4.needClip, clipPathId = _ref4.clipPathId, props = _ref4.props, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance;
    var layout = props.layout, type = props.type, stroke = props.stroke, connectNulls = props.connectNulls, isRange = props.isRange, shape = props.shape;
    var id = props.id, propsWithoutId = _objectWithoutProperties(props, _excluded);
    var propsWithEvents = (0,_util_svgPropertiesAndEvents__WEBPACK_IMPORTED_MODULE_10__/* .svgPropertiesAndEvents */ .a)(propsWithoutId);
    var curveProps = _objectSpread(_objectSpread({}, propsWithEvents), {}, {
        id,
        points,
        connectNulls,
        type,
        baseLine,
        layout,
        stroke,
        isRange,
        animationElapsedTime,
        isAnimating,
        isEntrance
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_container_Layer__WEBPACK_IMPORTED_MODULE_11__/* .Layer */ .W, {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : undefined
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_util_ActiveShapeUtils__WEBPACK_IMPORTED_MODULE_12__/* .Shape */ .y, {
        option: shape,
        DefaultShape: defaultAreaProps.shape,
        shapeProps: curveProps
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaDotsWrapper, {
        points: points,
        props: propsWithoutId,
        clipPathId: clipPathId
    }));
}
function interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime) {
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNumber */ .Et)(baseLine)) {
        var previousNumberBaseLine = (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNumber */ .Et)(prevBaseLine) ? prevBaseLine : undefined;
        return (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .interpolate */ .GW)(previousNumberBaseLine, baseLine, animationElapsedTime);
    }
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNullish */ .uy)(baseLine) || (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNan */ .M8)(baseLine)) {
        var _previousNumberBaseLine = (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNumber */ .Et)(prevBaseLine) ? prevBaseLine : undefined;
        return (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .interpolate */ .GW)(_previousNumberBaseLine, 0, animationElapsedTime);
    }
    return baseLine;
}
function AreaWithAnimation(_ref5) {
    var needClip = _ref5.needClip, clipPathId = _ref5.clipPathId, props = _ref5.props, previousPointsRef = _ref5.previousPointsRef, previousBaselineRef = _ref5.previousBaselineRef;
    var points = props.points, baseLine = props.baseLine, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn;
    var animationInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            points,
            baseLine
        }), [
        points,
        baseLine
    ]);
    var baseLineAnimationState = (0,_animation_useAnimationStartSnapshot__WEBPACK_IMPORTED_MODULE_13__/* .useAnimationStartSnapshot */ .U)(animationInput, previousBaselineRef);
    var layout = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_14__/* .useCartesianChartLayout */ .kz)();
    var _useAnimationCallback = (0,_animation_AnimatedItems__WEBPACK_IMPORTED_MODULE_15__/* .useAnimationCallbacks */ .I)(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
    var prevBaseLine = baseLineAnimationState.startValue;
    if (layout == null) {
        return null;
    }
    var baseLineAnimationItems;
    if (Array.isArray(baseLine) && Array.isArray(prevBaseLine)) {
        baseLineAnimationItems = (0,_animation_matchBy__WEBPACK_IMPORTED_MODULE_2__/* .matchAnimationItems */ .qe)(prevBaseLine, baseLine, animationMatchBy);
    } else if (Array.isArray(baseLine)) {
        baseLineAnimationItems = (0,_animation_matchBy__WEBPACK_IMPORTED_MODULE_2__/* .matchAnimationItems */ .qe)(null, baseLine, animationMatchBy);
    } else {
        baseLineAnimationItems = null;
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_animation_AnimatedItems__WEBPACK_IMPORTED_MODULE_15__/* .AnimatedItems */ .U, {
        animationInput: animationInput,
        animationIdPrefix: "recharts-area-",
        items: points,
        previousItemsRef: previousPointsRef,
        isAnimationActive: isAnimationActive,
        animationBegin: animationBegin,
        animationDuration: animationDuration,
        animationEasing: animationEasing,
        onAnimationStart: handleAnimationStart,
        onAnimationEnd: handleAnimationEnd,
        animationInterpolateFn: animationInterpolateFn,
        animationMatchBy: animationMatchBy,
        layout: layout
    }, (stepPoints, animationElapsedTime, isEntrance)=>{
        var stepBaseLine;
        if (animationElapsedTime === 1) {
            stepBaseLine = baseLine;
        } else if (Array.isArray(baseLine)) {
            stepBaseLine = animationInterpolateFn(baseLineAnimationItems, animationElapsedTime, layout);
        } else {
            stepBaseLine = isEntrance ? baseLine : interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime);
        }
        baseLineAnimationState.syncStepValue(stepBaseLine, animationElapsedTime);
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaLabelListProvider, {
            showLabels: !isAnimating,
            points: points
        }, props.children, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(StaticArea, {
            points: stepPoints,
            baseLine: stepBaseLine,
            needClip: needClip,
            clipPathId: clipPathId,
            props: props,
            animationElapsedTime: animationElapsedTime,
            isAnimating: isAnimating || animationElapsedTime < 1,
            isEntrance: isEntrance
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_LabelList__WEBPACK_IMPORTED_MODULE_9__/* .LabelListFromLabelProp */ .qY, {
            label: props.label
        }));
    });
}
/*
 * This component decides if the area should be animated or not.
 * It also holds the state of the animation.
 */ function RenderArea(_ref6) {
    var needClip = _ref6.needClip, clipPathId = _ref6.clipPathId, props = _ref6.props;
    /*
   * These two must be refs, not state!
   * Because we want to store the most recent shape of the animation in case we have to interrupt the animation;
   * that happens when user initiates another animation before the current one finishes.
   *
   * If this was a useState, then every step in the animation would trigger a re-render.
   * So, useRef it is.
   */ var previousPointsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    var previousBaselineRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaWithAnimation, {
        needClip: needClip,
        clipPathId: clipPathId,
        props: props,
        previousPointsRef: previousPointsRef,
        previousBaselineRef: previousBaselineRef
    });
}
class AreaWithState extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
    render() {
        var _this$props = this.props, hide = _this$props.hide, dot = _this$props.dot, points = _this$props.points, className = _this$props.className, top = _this$props.top, left = _this$props.left, needClip = _this$props.needClip, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, width = _this$props.width, height = _this$props.height, id = _this$props.id, baseLine = _this$props.baseLine, zIndex = _this$props.zIndex;
        if (hide) {
            return null;
        }
        var layerClass = (0,clsx__WEBPACK_IMPORTED_MODULE_16__/* .clsx */ .$)('recharts-area', className);
        var clipPathId = id;
        var _getRadiusAndStrokeWi = (0,_util_getRadiusAndStrokeWidthFromDot__WEBPACK_IMPORTED_MODULE_17__/* .getRadiusAndStrokeWidthFromDot */ .x)(dot), r = _getRadiusAndStrokeWi.r, strokeWidth = _getRadiusAndStrokeWi.strokeWidth;
        var clipDot = (0,_util_ReactUtils__WEBPACK_IMPORTED_MODULE_18__/* .isClipDot */ .y$)(dot);
        var dotSize = r * 2 + strokeWidth;
        var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? '' : 'dots-').concat(clipPathId, ")") : undefined;
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_zIndex_ZIndexLayer__WEBPACK_IMPORTED_MODULE_19__/* .ZIndexLayer */ .g, {
            zIndex: zIndex
        }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_container_Layer__WEBPACK_IMPORTED_MODULE_11__/* .Layer */ .W, {
            className: layerClass
        }, needClip && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_GraphicalItemClipPath__WEBPACK_IMPORTED_MODULE_20__/* .GraphicalItemClipPath */ .Q, {
            clipPathId: clipPathId,
            xAxisId: xAxisId,
            yAxisId: yAxisId
        }), !clipDot && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
            id: "clipPath-dots-".concat(clipPathId)
        }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            x: left - dotSize / 2,
            y: top - dotSize / 2,
            width: width + dotSize,
            height: height + dotSize
        }))), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderArea, {
            needClip: needClip,
            clipPathId: clipPathId,
            props: this.props
        })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_ActivePoints__WEBPACK_IMPORTED_MODULE_21__/* .ActivePoints */ .W, {
            points: points,
            mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
            itemDataKey: this.props.dataKey,
            activeDot: this.props.activeDot,
            clipPath: activePointsClipPath
        }), this.props.isRange && Array.isArray(baseLine) && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_ActivePoints__WEBPACK_IMPORTED_MODULE_21__/* .ActivePoints */ .W, {
            points: baseLine,
            mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
            itemDataKey: this.props.dataKey,
            activeDot: this.props.activeDot,
            clipPath: activePointsClipPath
        }));
    }
}
function AreaImpl(props) {
    var _useAppSelector;
    var activeDot = props.activeDot, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, connectNulls = props.connectNulls, dot = props.dot, fill = props.fill, fillOpacity = props.fillOpacity, hide = props.hide, isAnimationActive = props.isAnimationActive, legendType = props.legendType, stroke = props.stroke, xAxisId = props.xAxisId, yAxisId = props.yAxisId, everythingElse = _objectWithoutProperties(props, _excluded2);
    var layout = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_14__/* .useChartLayout */ .WX)();
    var chartName = (0,_state_selectors_selectors__WEBPACK_IMPORTED_MODULE_22__/* .useChartName */ .fW)();
    var _useNeedsClip = (0,_GraphicalItemClipPath__WEBPACK_IMPORTED_MODULE_20__/* .useNeedsClip */ .l)(xAxisId, yAxisId), needClip = _useNeedsClip.needClip;
    var isPanorama = (0,_context_PanoramaContext__WEBPACK_IMPORTED_MODULE_23__/* .useIsPanorama */ .r)();
    var _ref7 = (_useAppSelector = (0,_state_hooks__WEBPACK_IMPORTED_MODULE_24__/* .useAppSelector */ .G)((state)=>(0,_state_selectors_areaSelectors__WEBPACK_IMPORTED_MODULE_25__/* .selectArea */ .k)(state, props.id, isPanorama))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {}, points = _ref7.points, isRange = _ref7.isRange, baseLine = _ref7.baseLine;
    var plotArea = (0,_hooks__WEBPACK_IMPORTED_MODULE_26__/* .usePlotArea */ .oM)();
    if (layout !== 'horizontal' && layout !== 'vertical' || plotArea == null) {
        // Can't render Area in an unsupported layout
        return null;
    }
    if (chartName !== 'AreaChart' && chartName !== 'ComposedChart') {
        // There is nothing stopping us from rendering Area in other charts, except for historical reasons. Do we want to allow that?
        return null;
    }
    var height = plotArea.height, width = plotArea.width, left = plotArea.x, top = plotArea.y;
    if (!points || !points.length) {
        return null;
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaWithState, _extends({}, everythingElse, {
        activeDot: activeDot,
        animationBegin: animationBegin,
        animationDuration: animationDuration,
        animationEasing: animationEasing,
        baseLine: baseLine,
        connectNulls: connectNulls,
        dot: dot,
        fill: fill,
        fillOpacity: fillOpacity,
        height: height,
        hide: hide,
        layout: layout,
        isAnimationActive: isAnimationActive,
        isRange: isRange,
        legendType: legendType,
        needClip: needClip,
        points: points,
        stroke: stroke,
        width: width,
        left: left,
        top: top,
        xAxisId: xAxisId,
        yAxisId: yAxisId
    }));
}
var getBaseValue = (layout, chartBaseValue, itemBaseValue, xAxis, yAxis)=>{
    // The baseValue can be defined both on the AreaChart, and on the Area.
    // The value for the item takes precedence.
    var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNumber */ .Et)(baseValue)) {
        return baseValue;
    }
    var numericAxis = layout === 'horizontal' ? yAxis : xAxis;
    // @ts-expect-error d3scale .domain() returns unknown, Math.max expects number
    var domain = numericAxis.scale.domain();
    if (numericAxis.type === 'number') {
        var domainMax = Math.max(domain[0], domain[1]);
        var domainMin = Math.min(domain[0], domain[1]);
        if (baseValue === 'dataMin') {
            return domainMin;
        }
        if (baseValue === 'dataMax') {
            return domainMax;
        }
        return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
    }
    if (baseValue === 'dataMin') {
        return domain[0];
    }
    if (baseValue === 'dataMax') {
        return domain[1];
    }
    return domain[0];
};
function computeArea(_ref8) {
    var _ref8$areaSettings = _ref8.areaSettings, connectNulls = _ref8$areaSettings.connectNulls, itemBaseValue = _ref8$areaSettings.baseValue, dataKey = _ref8$areaSettings.dataKey, stackedData = _ref8.stackedData, layout = _ref8.layout, chartBaseValue = _ref8.chartBaseValue, xAxis = _ref8.xAxis, yAxis = _ref8.yAxis, displayedData = _ref8.displayedData, dataStartIndex = _ref8.dataStartIndex, xAxisTicks = _ref8.xAxisTicks, yAxisTicks = _ref8.yAxisTicks, bandSize = _ref8.bandSize, stackDataKeys = _ref8.stackDataKeys;
    var hasStack = stackedData && stackedData.length;
    var baseValue = getBaseValue(layout, chartBaseValue, itemBaseValue, xAxis, yAxis);
    var isHorizontalLayout = layout === 'horizontal';
    var isRange = false;
    var points = displayedData.map((entry, index)=>{
        var _valueAsArray$, _valueAsArray, _xAxis$scale$map;
        var valueAsArray;
        if (hasStack) {
            valueAsArray = stackedData[dataStartIndex + index];
        } else {
            var _rawValue = (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getValueByDataKey */ .kr)(entry, dataKey);
            if (!Array.isArray(_rawValue)) {
                valueAsArray = [
                    baseValue,
                    _rawValue
                ];
            } else {
                valueAsArray = _rawValue;
                isRange = true;
            }
        }
        var value1 = (_valueAsArray$ = (_valueAsArray = valueAsArray) === null || _valueAsArray === void 0 ? void 0 : _valueAsArray[1]) !== null && _valueAsArray$ !== void 0 ? _valueAsArray$ : null;
        var rawValue = (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getValueByDataKey */ .kr)(entry, dataKey);
        /*
     * A null in one series of a stack is rendered as zero contribution so the series above keep their offsets.
     * When every series in the stack is null, there is no offset to preserve,
     * so the point is a gap that connectNulls is allowed to connect across.
     */ var wholeStackIsNull = hasStack && rawValue == null && stackDataKeys != null && stackDataKeys.length > 0 && stackDataKeys.every((key)=>(0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getValueByDataKey */ .kr)(entry, key) == null);
        var isBreakPoint = value1 == null || hasStack && !connectNulls && rawValue == null || wholeStackIsNull;
        if (isHorizontalLayout) {
            var _yAxis$scale$map;
            return {
                x: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getCateCoordinateOfLine */ .nb)({
                    axis: xAxis,
                    ticks: xAxisTicks,
                    bandSize,
                    entry,
                    index
                }),
                y: isBreakPoint ? null : (_yAxis$scale$map = yAxis.scale.map(value1)) !== null && _yAxis$scale$map !== void 0 ? _yAxis$scale$map : null,
                value: valueAsArray,
                payload: entry
            };
        }
        return {
            x: isBreakPoint ? null : (_xAxis$scale$map = xAxis.scale.map(value1)) !== null && _xAxis$scale$map !== void 0 ? _xAxis$scale$map : null,
            y: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getCateCoordinateOfLine */ .nb)({
                axis: yAxis,
                ticks: yAxisTicks,
                bandSize,
                entry,
                index
            }),
            value: valueAsArray,
            payload: entry
        };
    });
    var baseLine;
    if (hasStack || isRange) {
        baseLine = points.map((entry)=>{
            var _xAxis$scale$map2;
            var x = Array.isArray(entry.value) ? entry.value[0] : null;
            if (isHorizontalLayout) {
                var _yAxis$scale$map2;
                return {
                    x: entry.x,
                    y: x != null && entry.y != null ? (_yAxis$scale$map2 = yAxis.scale.map(x)) !== null && _yAxis$scale$map2 !== void 0 ? _yAxis$scale$map2 : null : null,
                    payload: entry.payload
                };
            }
            return {
                x: x != null ? (_xAxis$scale$map2 = xAxis.scale.map(x)) !== null && _xAxis$scale$map2 !== void 0 ? _xAxis$scale$map2 : null : null,
                y: entry.y,
                payload: entry.payload
            };
        });
    } else {
        baseLine = isHorizontalLayout ? yAxis.scale.map(baseValue) : xAxis.scale.map(baseValue);
    }
    return {
        points,
        baseLine: baseLine !== null && baseLine !== void 0 ? baseLine : 0,
        isRange
    };
}
function AreaFn(outsideProps) {
    var props = (0,_util_resolveDefaultProps__WEBPACK_IMPORTED_MODULE_27__/* .resolveDefaultProps */ .e)(outsideProps, defaultAreaProps);
    var isPanorama = (0,_context_PanoramaContext__WEBPACK_IMPORTED_MODULE_23__/* .useIsPanorama */ .r)();
    // Report all props to Redux store first, before calling hooks, to avoid circular dependencies.
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_context_RegisterGraphicalItemId__WEBPACK_IMPORTED_MODULE_28__/* .RegisterGraphicalItemId */ .x, {
        id: props.id,
        type: "area"
    }, (id)=>/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_state_SetLegendPayload__WEBPACK_IMPORTED_MODULE_29__/* .SetLegendPayload */ .A, {
            legendPayload: computeLegendPayloadFromAreaData(props)
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(SetAreaTooltipEntrySettings, {
            dataKey: props.dataKey,
            data: props.data,
            stroke: props.stroke,
            strokeWidth: props.strokeWidth,
            fill: props.fill,
            name: props.name,
            hide: props.hide,
            unit: props.unit,
            formatter: props.formatter,
            tooltipType: props.tooltipType,
            id: id
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_state_SetGraphicalItem__WEBPACK_IMPORTED_MODULE_30__/* .SetCartesianGraphicalItem */ .p, {
            type: "area",
            id: id,
            data: props.data,
            dataKey: props.dataKey,
            xAxisId: props.xAxisId,
            yAxisId: props.yAxisId,
            zAxisId: 0,
            stackId: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getNormalizedStackId */ .$8)(props.stackId),
            hide: props.hide,
            barSize: undefined,
            baseValue: props.baseValue,
            isPanorama: isPanorama,
            connectNulls: props.connectNulls
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaImpl, _extends({}, props, {
            id: id
        }))));
}
/**
 * @provides LabelListContext
 * @consumes CartesianChartContext
 */ var Area = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.memo(AreaFn, _util_propsAreEqual__WEBPACK_IMPORTED_MODULE_31__/* .propsAreEqual */ .P);
// @ts-expect-error we need to set the displayName for debugging purposes
Area.displayName = 'Area';


/***/ }),

/***/ 90639:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ AreaChart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95295);
/* harmony import */ var _CartesianChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80598);




var allowedTooltipTypes = [
    'axis'
];
/**
 * @consumes ResponsiveContainerContext
 * @provides CartesianViewBoxContext
 * @provides CartesianChartContext
 */ var AreaChart = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref)=>{
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CartesianChart__WEBPACK_IMPORTED_MODULE_1__/* .CartesianChart */ .P, {
        chartName: "AreaChart",
        defaultTooltipEventType: "axis",
        validateTooltipEventTypes: allowedTooltipTypes,
        tooltipPayloadSearcher: _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__/* .arrayTooltipSearcher */ .uN,
        categoricalChartProps: props,
        ref: ref
    });
});


/***/ }),

/***/ 91766:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ getChildKey),
/* harmony export */   i: () => (/* binding */ onlyElements)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


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

/***/ 92571:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LoaderCircle)
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

/***/ 93954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ TrendingUp)
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
    name: "trending-up",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M16 7h6v6",
                key: "box55l"
            }
        ],
        [
            "path",
            {
                d: "m22 7-8.5 8.5-5-5L2 17",
                key: "1t1m79"
            }
        ]
    ]
};
__iconData.node;
const TrendingUp = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=trending-up.mjs.map


/***/ }),

/***/ 94774:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChartColumn)
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

/***/ 94890:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleX)
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
    name: "circle-x",
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
                d: "m15 9-6 6",
                key: "1uzhvr"
            }
        ],
        [
            "path",
            {
                d: "m9 9 6 6",
                key: "z0biqf"
            }
        ]
    ],
    aliases: [
        "x-circle"
    ]
};
__iconData.node;
const CircleX = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=circle-x.mjs.map


/***/ }),

/***/ 98261:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ selectArea)
/* harmony export */ });
/* unused harmony export selectGraphicalItemStackedData */
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2842);
/* harmony import */ var _cartesian_Area__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(90123);
/* harmony import */ var _axisSelectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63477);
/* harmony import */ var _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65372);
/* harmony import */ var _dataSelectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(57346);
/* harmony import */ var _util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(88559);
/* harmony import */ var _util_DataUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92191);
/* harmony import */ var _util_stacks_getStackSeriesIdentifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(62082);
/* harmony import */ var _rootPropsSelectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(90744);
/* harmony import */ var _graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76592);










var selectXAxisWithScale = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectAxisWithScale */ .Gx)(state, 'xAxis', (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectXAxisIdFromGraphicalItemId */ .W)(state, graphicalItemId), isPanorama);
var selectXAxisTicks = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectTicksOfGraphicalItem */ .CR)(state, 'xAxis', (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectXAxisIdFromGraphicalItemId */ .W)(state, graphicalItemId), isPanorama);
var selectYAxisWithScale = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectAxisWithScale */ .Gx)(state, 'yAxis', (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectYAxisIdFromGraphicalItemId */ .B)(state, graphicalItemId), isPanorama);
var selectYAxisTicks = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectTicksOfGraphicalItem */ .CR)(state, 'yAxis', (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectYAxisIdFromGraphicalItemId */ .B)(state, graphicalItemId), isPanorama);
var selectBandSize = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_3__/* .selectChartLayout */ .fz,
    selectXAxisWithScale,
    selectYAxisWithScale,
    selectXAxisTicks,
    selectYAxisTicks
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks)=>{
    if ((0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__/* .isCategoricalAxis */ ._L)(layout, 'xAxis')) {
        return (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__/* .getBandSizeOfAxis */ .Hj)(xAxis, xAxisTicks, false);
    }
    return (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__/* .getBandSizeOfAxis */ .Hj)(yAxis, yAxisTicks, false);
});
var pickAreaId = (_state, id)=>id;
/*
 * There is a race condition problem because we read some data from props and some from the state.
 * The state is updated through a dispatch and is one render behind,
 * and so we have this weird one tick render where the displayedData in one selector have the old dataKey
 * but the new dataKey in another selector.
 *
 * A proper fix is to either move everything into the state, or read the dataKey always from props
 * - but this is a smaller change.
 */ var selectSynchronisedAreaSettings = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    _axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectUnfilteredCartesianItems */ .ld,
    pickAreaId
], (graphicalItems, id)=>graphicalItems.filter((item)=>item.type === 'area').find((item)=>item.id === id));
var selectNumericalAxisType = (state)=>{
    var layout = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_3__/* .selectChartLayout */ .fz)(state);
    var isXAxisCategorical = (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__/* .isCategoricalAxis */ ._L)(layout, 'xAxis');
    return isXAxisCategorical ? 'yAxis' : 'xAxis';
};
var selectNumericalAxisIdFromGraphicalItemId = (state, graphicalItemId)=>{
    var axisType = selectNumericalAxisType(state);
    if (axisType === 'yAxis') {
        return (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectYAxisIdFromGraphicalItemId */ .B)(state, graphicalItemId);
    }
    return (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectXAxisIdFromGraphicalItemId */ .W)(state, graphicalItemId);
};
var selectNumericalAxisStackGroups = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectStackGroups */ .TC)(state, selectNumericalAxisType(state), selectNumericalAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectGraphicalItemStackedData = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    selectSynchronisedAreaSettings,
    selectNumericalAxisStackGroups
], (areaSettings, stackGroups)=>{
    var _stackGroups$stackId;
    if (areaSettings == null || stackGroups == null) {
        return undefined;
    }
    var stackId = areaSettings.stackId;
    var stackSeriesIdentifier = (0,_util_stacks_getStackSeriesIdentifier__WEBPACK_IMPORTED_MODULE_5__/* .getStackSeriesIdentifier */ .x)(areaSettings);
    if (stackId == null || stackSeriesIdentifier == null) {
        return undefined;
    }
    var groups = (_stackGroups$stackId = stackGroups[stackId]) === null || _stackGroups$stackId === void 0 ? void 0 : _stackGroups$stackId.stackedData;
    var found = groups === null || groups === void 0 ? void 0 : groups.find((v)=>v.key === stackSeriesIdentifier);
    if (found == null) {
        return undefined;
    }
    return found.map((item)=>[
            item[0],
            item[1]
        ]);
});
/*
 * All dataKeys of the stack group that this graphical item belongs to.
 * computeArea needs them to tell apart data points where only this series is null
 * (rendered as zero contribution to keep the stack consistent)
 * from data points where the whole stack is null
 * (a break point that connectNulls may connect across).
 */ var selectStackDataKeys = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    selectSynchronisedAreaSettings,
    selectNumericalAxisStackGroups
], (areaSettings, stackGroups)=>{
    if (areaSettings == null || areaSettings.stackId == null || stackGroups == null) {
        return undefined;
    }
    var group = stackGroups[areaSettings.stackId];
    if (group == null) {
        return undefined;
    }
    return group.graphicalItems.map((item)=>item.dataKey).filter(_util_DataUtils__WEBPACK_IMPORTED_MODULE_6__/* .isNotNil */ .n9);
});
var selectArea = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_3__/* .selectChartLayout */ .fz,
    selectXAxisWithScale,
    selectYAxisWithScale,
    selectXAxisTicks,
    selectYAxisTicks,
    selectGraphicalItemStackedData,
    _dataSelectors__WEBPACK_IMPORTED_MODULE_7__/* .selectChartDataWithIndexesIfNotInPanoramaPosition3 */ .rN,
    selectBandSize,
    selectSynchronisedAreaSettings,
    _rootPropsSelectors__WEBPACK_IMPORTED_MODULE_8__/* .selectChartBaseValue */ .vm,
    selectStackDataKeys
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, _ref, bandSize, areaSettings, chartBaseValue, stackDataKeys)=>{
    var chartData = _ref.chartData, dataStartIndex = _ref.dataStartIndex, dataEndIndex = _ref.dataEndIndex;
    if (areaSettings == null || layout !== 'horizontal' && layout !== 'vertical' || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null) {
        return undefined;
    }
    var data = areaSettings.data;
    var displayedData;
    if (data && data.length > 0) {
        displayedData = data;
    } else {
        displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
    }
    if (displayedData == null) {
        return undefined;
    }
    return (0,_cartesian_Area__WEBPACK_IMPORTED_MODULE_9__/* .computeArea */ .Vf)({
        layout,
        xAxis,
        yAxis,
        xAxisTicks,
        yAxisTicks,
        dataStartIndex,
        areaSettings,
        stackedData,
        displayedData,
        chartBaseValue,
        bandSize,
        stackDataKeys
    });
});


/***/ }),

/***/ 98993:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ DollarSign)
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
    name: "dollar-sign",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 3v18",
                key: "108xh3"
            }
        ],
        [
            "path",
            {
                d: "M17 5H9.5a1 1 0 000 7h5a1 1 0 010 7H6",
                key: "pwzcbw"
            }
        ]
    ]
};
__iconData.node;
const DollarSign = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=dollar-sign.mjs.map


/***/ })

}]);