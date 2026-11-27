(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[94209],{

/***/ 16857:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ buildLucideIconForReact)
/* harmony export */ });
/* harmony import */ var _buildLucideIconNode_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91963);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
function buildLucideIconForReact(icon, params = {}) {
    return (0,_buildLucideIconNode_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(icon, {
        ...params,
        attributeNames: {
            ...params.attributeNames,
            class: "className",
            "stroke-width": "strokeWidth",
            "stroke-linecap": "strokeLinecap",
            "stroke-linejoin": "strokeLinejoin",
            "vector-effect": "vectorEffect"
        }
    });
}
 //# sourceMappingURL=buildLucideIconForReact.mjs.map


/***/ }),

/***/ 23963:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ useLucideContext)
/* harmony export */ });
/* unused harmony export LucideProvider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ LucideProvider,useLucideContext auto */ 
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const LucideContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
function LucideProvider({ children, size, color, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className }) {
    const value = useMemo(()=>({
            size,
            color,
            strokeWidth,
            absoluteStrokeWidth,
            nonScalingStroke,
            className
        }), [
        size,
        color,
        strokeWidth,
        absoluteStrokeWidth,
        nonScalingStroke,
        className
    ]);
    return /*#__PURE__*/ createElement(LucideContext.Provider, {
        value
    }, children);
}
const useLucideContext = ()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(LucideContext);
 //# sourceMappingURL=context.mjs.map


/***/ }),

/***/ 30071:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _shared_src_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30907);
/* harmony import */ var _shared_src_build_buildLucideIconForReact_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16857);
/* harmony import */ var _shared_src_utils_hasA11yProp_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31388);
/* harmony import */ var _context_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23963);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 




const Icon = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({ color, size, width, height, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className = "", children, iconNode = [], icon = {
    node: iconNode,
    aliases: [],
    size: 24
}, ...rest }, ref)=>{
    const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, nonScalingStroke: contextNonScalingStroke = false, color: contextColor = "currentColor", className: contextClass = "" } = (0,_context_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useLucideContext */ .T)() ?? {};
    const hasAccessibleProp = Boolean(children) || (0,_shared_src_utils_hasA11yProp_mjs__WEBPACK_IMPORTED_MODULE_2__/* .hasA11yProp */ .m)(rest);
    const [name, svgAttributes, builtIconNode = []] = (0,_shared_src_build_buildLucideIconForReact_mjs__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(icon, {
        color: color ?? contextColor,
        width: width ?? size ?? contextSize,
        height: height ?? size ?? contextSize,
        strokeWidth: strokeWidth ?? contextStrokeWidth,
        absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
        nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
        className: (0,_shared_src_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_4__/* .mergeClasses */ .z)(contextClass, className),
        hasA11yProp: hasAccessibleProp,
        attributes: rest
    });
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(name, {
        ref,
        ...svgAttributes
    }, [
        ...builtIconNode.map(([tag, attrs])=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]);
});
 //# sourceMappingURL=Icon.mjs.map


/***/ }),

/***/ 30907:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ mergeClasses)
/* harmony export */ });
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
 //# sourceMappingURL=mergeClasses.mjs.map


/***/ }),

/***/ 31388:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ hasA11yProp)
/* harmony export */ });
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
    return false;
};
 //# sourceMappingURL=hasA11yProp.mjs.map


/***/ }),

/***/ 52800:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
};
 //# sourceMappingURL=defaultAttributes.mjs.map


/***/ }),

/***/ 55869:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 30071));


/***/ }),

/***/ 91963:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ buildLucideIconNode)
/* harmony export */ });
/* harmony import */ var _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52800);
/* harmony import */ var _utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30907);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 

function isDefined(value) {
    return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
    const attributeNames = params.attributeNames ?? {};
    const getAttributeName = (attributeName)=>attributeNames[attributeName] ?? attributeName;
    const viewBoxWidth = icon.size ?? icon.width ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["width"];
    const viewBoxHeight = icon.size ?? icon.height ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["height"];
    const aliasClassNames = icon.aliases?.filter((alias)=>typeof alias === "string" && alias.trim() !== "").map((alias)=>`lucide-${alias}`) ?? [];
    const iconClassNames = [
        ...icon.name ? [
            `lucide-${icon.name}`
        ] : [],
        ...aliasClassNames
    ];
    const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
    const className = params.includeDefaultClasses === false ? (0,_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mergeClasses */ .z)(...classNamesFromClassName) : (0,_utils_mergeClasses_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mergeClasses */ .z)("lucide", ...iconClassNames, ...classNamesFromClassName);
    const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["stroke-width"]) * Number(icon.size ?? icon.width ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["width"]) / Number(params.size ?? params.width ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["width"]) : params.strokeWidth ?? _defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A["stroke-width"];
    const attributes = {
        ...Object.entries(_defaultAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A).reduce((attrs, [attrName, value])=>{
            attrs[getAttributeName(attrName)] = value;
            return attrs;
        }, {}),
        ..."color" in params && params.color && {
            [getAttributeName("stroke")]: params.color
        },
        ..."size" in params && isDefined(params.size) && {
            [getAttributeName("width")]: params.size,
            [getAttributeName("height")]: params.size
        },
        ..."width" in params && isDefined(params.width) && {
            [getAttributeName("width")]: params.width
        },
        ..."height" in params && isDefined(params.height) && {
            [getAttributeName("height")]: params.height
        },
        [getAttributeName("stroke-width")]: calculatedStrokeWidth,
        ...className && {
            [getAttributeName("class")]: className
        },
        [getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
        ...params.hasA11yProp === false ? {
            [getAttributeName("aria-hidden")]: "true"
        } : {},
        ..."attributes" in params && params.attributes
    };
    return [
        "svg",
        attributes,
        icon.node.map((child)=>{
            const [name, attrs, children] = child;
            const nextAttrs = params.nonScalingStroke ? {
                [getAttributeName("vector-effect")]: "non-scaling-stroke",
                ...attrs
            } : attrs;
            return children ? [
                name,
                nextAttrs,
                children
            ] : [
                name,
                nextAttrs
            ];
        })
    ];
}
 //# sourceMappingURL=buildLucideIconNode.mjs.map


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [28441,93794,77358], () => (__webpack_exec__(55869)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);