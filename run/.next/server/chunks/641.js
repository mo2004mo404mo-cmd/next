exports.id = 641;
exports.ids = [641];
exports.modules = {

/***/ 73142:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(773895).style;


/***/ }),

/***/ 179899:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleCheckBig)
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
    name: "circle-check-big",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21.801 10A10 10 0 1 1 17 3.335",
                key: "yps3ct"
            }
        ],
        [
            "path",
            {
                d: "m9 11 3 3L22 4",
                key: "1pflzl"
            }
        ]
    ],
    aliases: [
        "check-circle"
    ]
};
__iconData.node;
const CircleCheckBig = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=circle-check-big.mjs.map


/***/ }),

/***/ 185448:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 749663:
/***/ (() => {



/***/ }),

/***/ 753053:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Star)
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
    name: "star",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
                key: "r04s7s"
            }
        ]
    ]
};
__iconData.node;
const Star = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=star.mjs.map


/***/ }),

/***/ 773895:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_require__(749663);
var React = __webpack_require__(367484);
function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
        'default': e
    };
}
var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/ function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var isProd = typeof process !== "undefined" && process.env && "production" === "production";
var isString = function(o) {
    return Object.prototype.toString.call(o) === "[object String]";
};
var StyleSheet = /*#__PURE__*/ function() {
    function StyleSheet(param) {
        var ref = param === void 0 ? {} : param, _name = ref.name, name = _name === void 0 ? "stylesheet" : _name, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? isProd : _optimizeForSpeed;
        invariant$1(isString(name), "`name` must be a string");
        this._name = name;
        this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
        invariant$1(typeof optimizeForSpeed === "boolean", "`optimizeForSpeed` must be a boolean");
        this._optimizeForSpeed = optimizeForSpeed;
        this._serverSheet = undefined;
        this._tags = [];
        this._injected = false;
        this._rulesCount = 0;
        var node =  false && 0;
        this._nonce = node ? node.getAttribute("content") : null;
    }
    var _proto = StyleSheet.prototype;
    _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
        invariant$1(typeof bool === "boolean", "`setOptimizeForSpeed` accepts a boolean");
        invariant$1(this._rulesCount === 0, "optimizeForSpeed cannot be when rules have already been inserted");
        this.flush();
        this._optimizeForSpeed = bool;
        this.inject();
    };
    _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
        return this._optimizeForSpeed;
    };
    _proto.inject = function inject() {
        var _this = this;
        invariant$1(!this._injected, "sheet already injected");
        this._injected = true;
        if (false) {}
        this._serverSheet = {
            cssRules: [],
            insertRule: function(rule, index) {
                if (typeof index === "number") {
                    _this._serverSheet.cssRules[index] = {
                        cssText: rule
                    };
                } else {
                    _this._serverSheet.cssRules.push({
                        cssText: rule
                    });
                }
                return index;
            },
            deleteRule: function(index) {
                _this._serverSheet.cssRules[index] = null;
            }
        };
    };
    _proto.getSheetForTag = function getSheetForTag(tag) {
        if (tag.sheet) {
            return tag.sheet;
        }
        // this weirdness brought to you by firefox
        for(var i = 0; i < document.styleSheets.length; i++){
            if (document.styleSheets[i].ownerNode === tag) {
                return document.styleSheets[i];
            }
        }
    };
    _proto.getSheet = function getSheet() {
        return this.getSheetForTag(this._tags[this._tags.length - 1]);
    };
    _proto.insertRule = function insertRule(rule, index) {
        invariant$1(isString(rule), "`insertRule` accepts only strings");
        if (true) {
            if (typeof index !== "number") {
                index = this._serverSheet.cssRules.length;
            }
            this._serverSheet.insertRule(rule, index);
            return this._rulesCount++;
        }
        if (this._optimizeForSpeed) {
            var sheet = this.getSheet();
            if (typeof index !== "number") {
                index = sheet.cssRules.length;
            }
            // this weirdness for perf, and chrome's weird bug
            // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if (!isProd) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                return -1;
            }
        } else {
            var insertionPoint = this._tags[index];
            this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
        }
        return this._rulesCount++;
    };
    _proto.replaceRule = function replaceRule(index, rule) {
        if (this._optimizeForSpeed || "undefined" === "undefined") {
            var sheet =  false ? 0 : this._serverSheet;
            if (!rule.trim()) {
                rule = this._deletedRulePlaceholder;
            }
            if (!sheet.cssRules[index]) {
                // @TBD Should we throw an error?
                return index;
            }
            sheet.deleteRule(index);
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if (!isProd) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                // In order to preserve the indices we insert a deleteRulePlaceholder
                sheet.insertRule(this._deletedRulePlaceholder, index);
            }
        } else { var tag; }
        return index;
    };
    _proto.deleteRule = function deleteRule(index) {
        if (true) {
            this._serverSheet.deleteRule(index);
            return;
        }
        if (this._optimizeForSpeed) {
            this.replaceRule(index, "");
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "rule at index `" + index + "` not found");
            tag.parentNode.removeChild(tag);
            this._tags[index] = null;
        }
    };
    _proto.flush = function flush() {
        this._injected = false;
        this._rulesCount = 0;
        if (false) {} else {
            // simpler on server
            this._serverSheet.cssRules = [];
        }
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        if (true) {
            return this._serverSheet.cssRules;
        }
        return this._tags.reduce(function(rules, tag) {
            if (tag) {
                rules = rules.concat(Array.prototype.map.call(_this.getSheetForTag(tag).cssRules, function(rule) {
                    return rule.cssText === _this._deletedRulePlaceholder ? null : rule;
                }));
            } else {
                rules.push(null);
            }
            return rules;
        }, []);
    };
    _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
        if (cssString) {
            invariant$1(isString(cssString), "makeStyleTag accepts only strings as second parameter");
        }
        var tag = document.createElement("style");
        if (this._nonce) tag.setAttribute("nonce", this._nonce);
        tag.type = "text/css";
        tag.setAttribute("data-" + name, "");
        if (cssString) {
            tag.appendChild(document.createTextNode(cssString));
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        if (relativeToTag) {
            head.insertBefore(tag, relativeToTag);
        } else {
            head.appendChild(tag);
        }
        return tag;
    };
    _createClass(StyleSheet, [
        {
            key: "length",
            get: function get() {
                return this._rulesCount;
            }
        }
    ]);
    return StyleSheet;
}();
function invariant$1(condition, message) {
    if (!condition) {
        throw new Error("StyleSheet: " + message + ".");
    }
}
function hash(str) {
    var _$hash = 5381, i = str.length;
    while(i){
        _$hash = _$hash * 33 ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */ return _$hash >>> 0;
}
var stringHash = hash;
var sanitize = function(rule) {
    return rule.replace(/\/style/gi, "\\/style");
};
var cache = {};
/**
 * computeId
 *
 * Compute and memoize a jsx id from a basedId and optionally props.
 */ function computeId(baseId, props) {
    if (!props) {
        return "jsx-" + baseId;
    }
    var propsToString = String(props);
    var key = baseId + propsToString;
    if (!cache[key]) {
        cache[key] = "jsx-" + stringHash(baseId + "-" + propsToString);
    }
    return cache[key];
}
/**
 * computeSelector
 *
 * Compute and memoize dynamic selectors.
 */ function computeSelector(id, css) {
    var selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    // Sanitize SSR-ed CSS.
    // Client side code doesn't need to be sanitized since we use
    // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
    if (true) {
        css = sanitize(css);
    }
    var idcss = id + css;
    if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
    }
    return cache[idcss];
}
function mapRulesToStyle(cssRules, options) {
    if (options === void 0) options = {};
    return cssRules.map(function(args) {
        var id = args[0];
        var css = args[1];
        return /*#__PURE__*/ React__default["default"].createElement("style", {
            id: "__" + id,
            // Avoid warnings upon render with a key
            key: "__" + id,
            nonce: options.nonce ? options.nonce : undefined,
            dangerouslySetInnerHTML: {
                __html: css
            }
        });
    });
}
var StyleSheetRegistry = /*#__PURE__*/ function() {
    function StyleSheetRegistry(param) {
        var ref = param === void 0 ? {} : param, _styleSheet = ref.styleSheet, styleSheet = _styleSheet === void 0 ? null : _styleSheet, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? false : _optimizeForSpeed;
        this._sheet = styleSheet || new StyleSheet({
            name: "styled-jsx",
            optimizeForSpeed: optimizeForSpeed
        });
        this._sheet.inject();
        if (styleSheet && typeof optimizeForSpeed === "boolean") {
            this._sheet.setOptimizeForSpeed(optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    }
    var _proto = StyleSheetRegistry.prototype;
    _proto.add = function add(props) {
        var _this = this;
        if (undefined === this._optimizeForSpeed) {
            this._optimizeForSpeed = Array.isArray(props.children);
            this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        if (false) {}
        var ref = this.getIdAndRules(props), styleId = ref.styleId, rules = ref.rules;
        // Deduping: just increase the instances count.
        if (styleId in this._instancesCounts) {
            this._instancesCounts[styleId] += 1;
            return;
        }
        var indices = rules.map(function(rule) {
            return _this._sheet.insertRule(rule);
        }) // Filter out invalid rules
        .filter(function(index) {
            return index !== -1;
        });
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
    };
    _proto.remove = function remove(props) {
        var _this = this;
        var styleId = this.getIdAndRules(props).styleId;
        invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
        this._instancesCounts[styleId] -= 1;
        if (this._instancesCounts[styleId] < 1) {
            var tagFromServer = this._fromServer && this._fromServer[styleId];
            if (tagFromServer) {
                tagFromServer.parentNode.removeChild(tagFromServer);
                delete this._fromServer[styleId];
            } else {
                this._indices[styleId].forEach(function(index) {
                    return _this._sheet.deleteRule(index);
                });
                delete this._indices[styleId];
            }
            delete this._instancesCounts[styleId];
        }
    };
    _proto.update = function update(props, nextProps) {
        this.add(nextProps);
        this.remove(props);
    };
    _proto.flush = function flush() {
        this._sheet.flush();
        this._sheet.inject();
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function(styleId) {
            return [
                styleId,
                _this._fromServer[styleId]
            ];
        }) : [];
        var cssRules = this._sheet.cssRules();
        return fromServer.concat(Object.keys(this._indices).map(function(styleId) {
            return [
                styleId,
                _this._indices[styleId].map(function(index) {
                    return cssRules[index].cssText;
                }).join(_this._optimizeForSpeed ? "" : "\n")
            ];
        }) // filter out empty rules
        .filter(function(rule) {
            return Boolean(rule[1]);
        }));
    };
    _proto.styles = function styles(options) {
        return mapRulesToStyle(this.cssRules(), options);
    };
    _proto.getIdAndRules = function getIdAndRules(props) {
        var css = props.children, dynamic = props.dynamic, id = props.id;
        if (dynamic) {
            var styleId = computeId(id, dynamic);
            return {
                styleId: styleId,
                rules: Array.isArray(css) ? css.map(function(rule) {
                    return computeSelector(styleId, rule);
                }) : [
                    computeSelector(styleId, css)
                ]
            };
        }
        return {
            styleId: computeId(id),
            rules: Array.isArray(css) ? css : [
                css
            ]
        };
    };
    /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */ _proto.selectFromServer = function selectFromServer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
        return elements.reduce(function(acc, element) {
            var id = element.id.slice(2);
            acc[id] = element;
            return acc;
        }, {});
    };
    return StyleSheetRegistry;
}();
function invariant(condition, message) {
    if (!condition) {
        throw new Error("StyleSheetRegistry: " + message + ".");
    }
}
var StyleSheetContext = /*#__PURE__*/ React.createContext(null);
StyleSheetContext.displayName = "StyleSheetContext";
function createStyleRegistry() {
    return new StyleSheetRegistry();
}
function StyleRegistry(param) {
    var configuredRegistry = param.registry, children = param.children;
    var rootRegistry = React.useContext(StyleSheetContext);
    var ref = React.useState(function() {
        return rootRegistry || configuredRegistry || createStyleRegistry();
    }), registry = ref[0];
    return /*#__PURE__*/ React__default["default"].createElement(StyleSheetContext.Provider, {
        value: registry
    }, children);
}
function useStyleRegistry() {
    return React.useContext(StyleSheetContext);
}
// Opt-into the new `useInsertionEffect` API in React 18, fallback to `useLayoutEffect`.
// https://github.com/reactwg/react-18/discussions/110
var useInsertionEffect = React__default["default"].useInsertionEffect || React__default["default"].useLayoutEffect;
var defaultRegistry =  false ? 0 : undefined;
function JSXStyle(props) {
    var registry = defaultRegistry ? defaultRegistry : useStyleRegistry();
    // If `registry` does not exist, we do nothing here.
    if (!registry) {
        return null;
    }
    if (true) {
        registry.add(props);
        return null;
    }
    useInsertionEffect(function() {
        registry.add(props);
        return function() {
            registry.remove(props);
        };
    // props.children can be string[], will be striped since id is identical
    }, [
        props.id,
        String(props.dynamic)
    ]);
    return null;
}
JSXStyle.dynamic = function(info) {
    return info.map(function(tagInfo) {
        var baseId = tagInfo[0];
        var props = tagInfo[1];
        return computeId(baseId, props);
    }).join(" ");
};
__webpack_unused_export__ = StyleRegistry;
__webpack_unused_export__ = createStyleRegistry;
exports.style = JSXStyle;
__webpack_unused_export__ = useStyleRegistry;


/***/ }),

/***/ 870641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExamCountdownTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73142);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(456052);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35214);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(464571);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24950);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(504635);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(190498);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(569473);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(998808);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(673097);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(954171);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(179899);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(346633);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(849543);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(159361);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(239041);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(347352);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(144730);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(289824);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(120759);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(967254);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(185448);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(269627);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(753053);
/* harmony import */ var _barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(541290);
/* __next_internal_client_entry_do_not_use__ default auto */ 



// ── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'medq-exam-countdown';
const MAX_EXAMS = 3;
const EXAM_PRESETS = {
    USMLE: {
        label: 'USMLE Step 1',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        subjects: [
            'Anatomy',
            'Physiology',
            'Biochemistry',
            'Pathology',
            'Pharmacology',
            'Microbiology',
            'Immunology',
            'Behavioral Science',
            'Genetics'
        ]
    },
    PLAB: {
        label: 'PLAB 1',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        subjects: [
            'Medicine',
            'Surgery',
            'Paediatrics',
            'Obstetrics & Gynaecology',
            'Psychiatry',
            'General Practice',
            'Emergency Medicine'
        ]
    },
    MCAT: {
        label: 'MCAT',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        subjects: [
            'Biology',
            'General Chemistry',
            'Organic Chemistry',
            'Physics',
            'Psychology',
            'Sociology',
            'Critical Analysis'
        ]
    },
    NEET_PG: {
        label: 'NEET PG',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        subjects: [
            'Anatomy',
            'Physiology',
            'Biochemistry',
            'Pharmacology',
            'Pathology',
            'Microbiology',
            'Forensic Medicine',
            'PSM',
            'Medicine',
            'Surgery',
            'OBG',
            'Paediatrics',
            'Ophthalmology',
            'ENT',
            'Dermatology',
            'Psychiatry',
            'Radiology',
            'Anaesthesia'
        ]
    },
    FMGE: {
        label: 'FMGE',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        subjects: [
            'Anatomy',
            'Physiology',
            'Biochemistry',
            'Pathology',
            'Pharmacology',
            'Microbiology',
            'Medicine',
            'Surgery',
            'OBG',
            'Paediatrics',
            'Ophthalmology',
            'ENT',
            'PSM'
        ]
    },
    MRCP: {
        label: 'MRCP',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        subjects: [
            'Cardiology',
            'Respiratory',
            'Gastroenterology',
            'Neurology',
            'Endocrinology',
            'Nephrology',
            'Haematology',
            'Rheumatology',
            'Infectious Disease',
            'Oncology'
        ]
    },
    custom: {
        label: 'Custom Exam',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        subjects: [
            'Subject 1',
            'Subject 2',
            'Subject 3',
            'Subject 4',
            'Subject 5'
        ]
    }
};
const MOTIVATIONAL_QUOTES = [
    "The expert in anything was once a beginner. — Helen Hayes",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
    "Medicine is a science of uncertainty and an art of probability. — William Osler",
    "The good physician treats the disease; the great physician treats the patient. — William Osler",
    "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible. — Richard Feynman",
    "It does not matter how slowly you go as long as you do not stop. — Confucius",
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Believe you can and you're halfway there. — Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
    "Education is the most powerful weapon which you can use to change the world. — Nelson Mandela",
    "Hardships often prepare ordinary people for an extraordinary destiny. — C.S. Lewis",
    "A little knowledge that acts is worth infinitely more than much knowledge that is idle. — Khalil Gibran",
    "The beautiful thing about learning is that nobody can take it away from you. — B.B. King",
    "Wherever the art of medicine is loved, there is also a love of humanity. — Hippocrates",
    "He who studies medicine without books sails an uncharted sea. — William Osler"
];
// ── Helper Functions ─────────────────────────────────────────────────────────
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function getDaysUntil(dateStr) {
    const now = new Date();
    const target = new Date(dateStr);
    const diff = target.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
function getCountdown(dateStr) {
    const now = new Date().getTime();
    const target = new Date(dateStr).getTime();
    const diff = Math.max(0, target - now);
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor(diff % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor(diff % (1000 * 60) / 1000)
    };
}
function getUrgencyColor(daysLeft) {
    if (daysLeft > 30) return '#00e5a0';
    if (daysLeft > 14) return '#f59e0b';
    if (daysLeft > 7) return '#ff8c00';
    return '#ff5757';
}
function getUrgencyLabel(daysLeft) {
    if (daysLeft > 30) return 'On Track';
    if (daysLeft > 14) return 'Heads Up';
    if (daysLeft > 7) return 'Getting Close';
    if (daysLeft > 0) return 'Crunch Time!';
    return 'Exam Day!';
}
function getDailyQuote() {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
}
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function formatTimer(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}
function generateStudyDays(exam, subjects) {
    const daysLeft = getDaysUntil(exam.examDate);
    const today = new Date();
    const days = [];
    for(let i = 0; i < daysLeft; i++){
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        // Distribute subjects cyclically
        const subjectIndex = i % subjects.length;
        const subjectsForDay = [
            subjects[subjectIndex]
        ];
        if (subjects.length > 1) {
            subjectsForDay.push(subjects[(subjectIndex + Math.floor(subjects.length / 2)) % subjects.length]);
        }
        // Vary hours slightly: less on weekends, more midweek
        const dayOfWeek = date.getDay();
        const hourModifier = dayOfWeek === 0 ? 0.6 : dayOfWeek === 6 ? 0.75 : 1;
        const plannedHours = Math.round(exam.targetHoursPerDay * hourModifier * 10) / 10;
        days.push({
            date: dateStr,
            plannedHours,
            actualHours: 0,
            subjects: subjectsForDay,
            completed: false,
            checklist: subjectsForDay.map((s, idx)=>({
                    id: `${dateStr}-${idx}`,
                    text: `Review ${s}`,
                    completed: false
                }))
        });
    }
    return days;
}
function generateWeeklyMilestones(exam, subjects) {
    const daysLeft = getDaysUntil(exam.examDate);
    const weeksLeft = Math.ceil(daysLeft / 7);
    const today = new Date();
    const milestones = [];
    for(let w = 0; w < weeksLeft; w++){
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() + w * 7);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        const subjectsForWeek = subjects.slice(w * 2 % subjects.length, Math.min(w * 2 % subjects.length + 3, subjects.length));
        const targetSubject = subjectsForWeek.length > 0 ? subjectsForWeek[0] : 'Review';
        milestones.push({
            weekNumber: w + 1,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            target: `Master ${targetSubject} ${subjectsForWeek.length > 1 ? '+ ' + (subjectsForWeek.length - 1) + ' more' : ''}`,
            completed: false
        });
    }
    return milestones;
}
function loadState() {
    if (true) {
        return {
            exams: [],
            studyDays: {},
            weeklyMilestones: {},
            streaks: {},
            lastStudyDate: {}
        };
    }
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            return JSON.parse(raw);
        }
    } catch  {
    // ignore parse errors
    }
    return {
        exams: [],
        studyDays: {},
        weeklyMilestones: {},
        streaks: {},
        lastStudyDate: {}
    };
}
function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch  {
    // ignore storage errors
    }
}
// ── Sub-Components ───────────────────────────────────────────────────────────
function FlipCard({ value, label, color }) {
    const displayValue = value.toString().padStart(2, '0');
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center gap-1.5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative w-16 sm:w-20 md:w-24 h-18 sm:h-22 md:h-26 rounded-xl flex items-center justify-center overflow-hidden",
                style: {
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${color}22`,
                    boxShadow: `0 0 20px ${color}08, inset 0 1px 0 rgba(255,255,255,0.06)`,
                    minHeight: '72px'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute left-0 right-0 top-1/2 h-px",
                        style: {
                            background: 'rgba(0,0,0,0.3)'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-wider",
                        style: {
                            color
                        },
                        children: displayValue
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-[10px] sm:text-xs font-medium text-[#5a6478] uppercase tracking-wider",
                children: label
            })
        ]
    });
}
function ExamSetupForm({ onSubmit, onCancel, initialExam }) {
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(initialExam?.name ?? '');
    const [examType, setExamType] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(initialExam?.examType ?? 'USMLE');
    const [examDate, setExamDate] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(initialExam?.examDate ?? '');
    const [targetHours, setTargetHours] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(initialExam?.targetHoursPerDay ?? 6);
    const handleSubmit = ()=>{
        if (!name.trim() || !examDate) return;
        onSubmit({
            name: name.trim(),
            examType,
            examDate,
            targetHoursPerDay: targetHours
        });
    };
    const minDate = new Date().toISOString().split('T')[0];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-2xl border p-5 sm:p-6 space-y-5",
        style: {
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.06)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                        className: "w-5 h-5 text-[#00e5a0]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                        className: "text-sm font-bold text-[#e8ecf4]",
                        children: initialExam ? 'Edit Exam' : 'Add New Exam'
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium text-[#8b95a8]",
                        children: "Exam Type"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
                        children: Object.keys(EXAM_PRESETS).map((type)=>{
                            const preset = EXAM_PRESETS[type];
                            const isActive = examType === type;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>{
                                    setExamType(type);
                                    if (type !== 'custom' && !initialExam) {
                                        setName(preset.label);
                                    }
                                },
                                className: "flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
                                style: {
                                    background: isActive ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${isActive ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                    color: isActive ? '#00e5a0' : '#8b95a8'
                                },
                                children: [
                                    preset.icon,
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "truncate",
                                        children: preset.label
                                    })
                                ]
                            }, type);
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium text-[#8b95a8]",
                        children: "Exam Name"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        type: "text",
                        value: name,
                        onChange: (e)=>setName(e.target.value),
                        placeholder: "e.g., USMLE Step 1",
                        className: "w-full px-4 py-2.5 rounded-xl text-sm text-[#e8ecf4] placeholder-[#3a4055] outline-none transition-all focus:ring-1 focus:ring-[#00e5a0]/40",
                        style: {
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)'
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium text-[#8b95a8]",
                        children: "Exam Date"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        type: "date",
                        value: examDate,
                        onChange: (e)=>setExamDate(e.target.value),
                        min: minDate,
                        className: "w-full px-4 py-2.5 rounded-xl text-sm text-[#e8ecf4] outline-none transition-all focus:ring-1 focus:ring-[#00e5a0]/40",
                        style: {
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            colorScheme: 'dark'
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        className: "text-xs font-medium text-[#8b95a8]",
                        children: [
                            "Target Study Hours/Day: ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[#00e5a0] font-bold",
                                children: [
                                    targetHours,
                                    "h"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        type: "range",
                        min: 1,
                        max: 14,
                        step: 0.5,
                        value: targetHours,
                        onChange: (e)=>setTargetHours(Number(e.target.value)),
                        className: "w-full accent-[#00e5a0] h-1.5 rounded-full appearance-none cursor-pointer",
                        style: {
                            background: `linear-gradient(to right, #00e5a0 0%, #00e5a0 ${(targetHours - 1) / 13 * 100}%, rgba(255,255,255,0.06) ${(targetHours - 1) / 13 * 100}%, rgba(255,255,255,0.06) 100%)`
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-between text-[10px] text-[#3a4055]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: "1h"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: "7h"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: "14h"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3 pt-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: handleSubmit,
                        disabled: !name.trim() || !examDate,
                        className: "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed",
                        style: {
                            background: '#00e5a0',
                            color: '#0c0e14'
                        },
                        children: initialExam ? 'Save Changes' : 'Add Exam'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: onCancel,
                        className: "px-4 py-2.5 rounded-xl text-sm font-medium text-[#8b95a8] hover:text-[#e8ecf4] transition-all",
                        style: {
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)'
                        },
                        children: "Cancel"
                    })
                ]
            })
        ]
    });
}
function StudySessionTimer({ examId, onSessionComplete }) {
    const [isRunning, setIsRunning] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [elapsed, setElapsed] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const intervalRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const startTimeRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(0);
    const elapsedRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(0);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        elapsedRef.current = elapsed;
    }, [
        elapsed
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (isRunning) {
            startTimeRef.current = Date.now();
            const startElapsed = elapsedRef.current;
            intervalRef.current = setInterval(()=>{
                const now = Date.now();
                const newElapsed = startElapsed + Math.floor((now - startTimeRef.current) / 1000);
                setElapsed(newElapsed);
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return ()=>{
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [
        isRunning
    ]);
    const handlePlayPause = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        setIsRunning((prev)=>!prev);
    }, []);
    const handleReset = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        setIsRunning(false);
        setElapsed(0);
    }, []);
    const handleComplete = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        setIsRunning(false);
        onSessionComplete(examId, elapsed);
        setElapsed(0);
    }, [
        examId,
        elapsed,
        onSessionComplete
    ]);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor(elapsed % 3600 / 60);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-xl border p-4 space-y-3",
        style: {
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.06)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                        className: "w-4 h-4 text-[#4fc3f7]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs font-semibold text-[#e8ecf4]",
                        children: "Study Session"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-3xl sm:text-4xl font-bold font-mono tracking-wider",
                        style: {
                            color: isRunning ? '#4fc3f7' : '#e8ecf4'
                        },
                        children: formatTimer(elapsed)
                    }),
                    elapsed > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-[10px] text-[#5a6478] mt-1",
                        children: [
                            hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
                            " recorded"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: handlePlayPause,
                        className: "flex items-center justify-center w-10 h-10 rounded-xl transition-all active:scale-95",
                        style: {
                            background: isRunning ? 'rgba(79,195,247,0.15)' : 'rgba(0,229,160,0.15)',
                            color: isRunning ? '#4fc3f7' : '#00e5a0'
                        },
                        "aria-label": isRunning ? 'Pause' : 'Start',
                        children: isRunning ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                            className: "w-5 h-5"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                            className: "w-5 h-5 ml-0.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: handleReset,
                        className: "flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] transition-all active:scale-95",
                        "aria-label": "Reset",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                            className: "w-4 h-4"
                        })
                    }),
                    elapsed > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: handleComplete,
                        className: "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95",
                        style: {
                            background: 'rgba(0,229,160,0.15)',
                            color: '#00e5a0'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Log"
                        ]
                    })
                ]
            })
        ]
    });
}
// ── Main Component ───────────────────────────────────────────────────────────
function ExamCountdownTab() {
    // ── State ────────────────────────────────────────────────────────────────
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(()=>loadState());
    const [activeExamId, setActiveExamId] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(()=>{
        const loaded = loadState();
        return loaded.exams.length > 0 ? loaded.exams[0].id : null;
    });
    const [showSetup, setShowSetup] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [editingExam, setEditingExam] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const [countdown, setCountdown] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [showSchedule, setShowSchedule] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [showMilestones, setShowMilestones] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [showWeeklySummary, setShowWeeklySummary] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const saveTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    // ── Save to localStorage (debounced) ────────────────────────────────────
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(()=>{
            saveState(state);
        }, 300);
        return ()=>{
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        };
    }, [
        state
    ]);
    // ── Countdown tick ──────────────────────────────────────────────────────
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const tick = ()=>{
            const activeExam = state.exams.find((e)=>e.id === activeExamId);
            if (activeExam) {
                setCountdown(getCountdown(activeExam.examDate));
            }
        };
        tick();
        const interval = setInterval(tick, 1000);
        return ()=>clearInterval(interval);
    }, [
        state.exams,
        activeExamId
    ]);
    // ── Derived data ────────────────────────────────────────────────────────
    const activeExam = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>state.exams.find((e)=>e.id === activeExamId) ?? null, [
        state.exams,
        activeExamId
    ]);
    const daysLeft = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>activeExam ? getDaysUntil(activeExam.examDate) : 0, [
        activeExam
    ]);
    const urgencyColor = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>getUrgencyColor(daysLeft), [
        daysLeft
    ]);
    const urgencyLabel = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>getUrgencyLabel(daysLeft), [
        daysLeft
    ]);
    const dailyQuote = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>getDailyQuote(), []);
    const studyDaysForExam = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>activeExam ? state.studyDays[activeExam.id] ?? [] : [], [
        state.studyDays,
        activeExam
    ]);
    const milestonesForExam = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>activeExam ? state.weeklyMilestones[activeExam.id] ?? [] : [], [
        state.weeklyMilestones,
        activeExam
    ]);
    const streak = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>activeExam ? state.streaks[activeExam.id] ?? 0 : 0, [
        state.streaks,
        activeExam
    ]);
    const todayPlan = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>{
        if (!activeExam) return null;
        const today = getTodayStr();
        return studyDaysForExam.find((d)=>d.date === today) ?? null;
    }, [
        activeExam,
        studyDaysForExam
    ]);
    // Study progress calculations
    const progressData = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>{
        if (!activeExam || studyDaysForExam.length === 0) {
            return {
                totalPlanned: 0,
                totalActual: 0,
                percentComplete: 0,
                daysStudied: 0,
                avgHoursPerDay: 0
            };
        }
        const totalPlanned = studyDaysForExam.reduce((sum, d)=>sum + d.plannedHours, 0);
        const totalActual = studyDaysForExam.reduce((sum, d)=>sum + d.actualHours, 0);
        const daysStudied = studyDaysForExam.filter((d)=>d.actualHours > 0).length;
        const percentComplete = totalPlanned > 0 ? Math.min(100, Math.round(totalActual / totalPlanned * 100)) : 0;
        const avgHoursPerDay = daysStudied > 0 ? Math.round(totalActual / daysStudied * 10) / 10 : 0;
        return {
            totalPlanned,
            totalActual,
            percentComplete,
            daysStudied,
            avgHoursPerDay
        };
    }, [
        activeExam,
        studyDaysForExam
    ]);
    // Weekly summary data
    const weeklySummaryData = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>{
        if (!activeExam || studyDaysForExam.length === 0) return null;
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const startStr = startOfWeek.toISOString().split('T')[0];
        const thisWeekDays = studyDaysForExam.filter((d)=>d.date >= startStr && d.date <= getTodayStr());
        const plannedThisWeek = thisWeekDays.reduce((s, d)=>s + d.plannedHours, 0);
        const actualThisWeek = thisWeekDays.reduce((s, d)=>s + d.actualHours, 0);
        const completedDaysThisWeek = thisWeekDays.filter((d)=>d.actualHours > 0).length;
        return {
            plannedThisWeek: Math.round(plannedThisWeek * 10) / 10,
            actualThisWeek: Math.round(actualThisWeek * 10) / 10,
            completedDaysThisWeek,
            totalDaysThisWeek: thisWeekDays.length,
            weeklyProgress: plannedThisWeek > 0 ? Math.min(100, Math.round(actualThisWeek / plannedThisWeek * 100)) : 0
        };
    }, [
        activeExam,
        studyDaysForExam
    ]);
    // ── Handlers ────────────────────────────────────────────────────────────
    const handleAddExam = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((data)=>{
        const newExam = {
            ...data,
            id: generateId(),
            createdAt: new Date().toISOString()
        };
        const subjects = EXAM_PRESETS[data.examType].subjects;
        const studyDays = generateStudyDays(newExam, subjects);
        const milestones = generateWeeklyMilestones(newExam, subjects);
        setState((prev)=>({
                ...prev,
                exams: [
                    ...prev.exams,
                    newExam
                ],
                studyDays: {
                    ...prev.studyDays,
                    [newExam.id]: studyDays
                },
                weeklyMilestones: {
                    ...prev.weeklyMilestones,
                    [newExam.id]: milestones
                },
                streaks: {
                    ...prev.streaks,
                    [newExam.id]: 0
                },
                lastStudyDate: {
                    ...prev.lastStudyDate,
                    [newExam.id]: ''
                }
            }));
        setActiveExamId(newExam.id);
        setShowSetup(false);
    }, []);
    const handleEditExam = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((data)=>{
        if (!editingExam) return;
        const updatedExam = {
            ...editingExam,
            ...data
        };
        const subjects = EXAM_PRESETS[data.examType].subjects;
        const studyDays = generateStudyDays(updatedExam, subjects);
        const milestones = generateWeeklyMilestones(updatedExam, subjects);
        setState((prev)=>({
                ...prev,
                exams: prev.exams.map((e)=>e.id === editingExam.id ? updatedExam : e),
                studyDays: {
                    ...prev.studyDays,
                    [editingExam.id]: studyDays
                },
                weeklyMilestones: {
                    ...prev.weeklyMilestones,
                    [editingExam.id]: milestones
                }
            }));
        setEditingExam(null);
    }, [
        editingExam
    ]);
    const handleDeleteExam = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((examId)=>{
        setState((prev)=>{
            const newStudyDays = {
                ...prev.studyDays
            };
            const newMilestones = {
                ...prev.weeklyMilestones
            };
            const newStreaks = {
                ...prev.streaks
            };
            const newLastStudy = {
                ...prev.lastStudyDate
            };
            delete newStudyDays[examId];
            delete newMilestones[examId];
            delete newStreaks[examId];
            delete newLastStudy[examId];
            return {
                ...prev,
                exams: prev.exams.filter((e)=>e.id !== examId),
                studyDays: newStudyDays,
                weeklyMilestones: newMilestones,
                streaks: newStreaks,
                lastStudyDate: newLastStudy
            };
        });
        if (activeExamId === examId) {
            const remaining = state.exams.filter((e)=>e.id !== examId);
            setActiveExamId(remaining.length > 0 ? remaining[0].id : null);
        }
    }, [
        activeExamId,
        state.exams
    ]);
    const handleToggleChecklist = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((examId, dayDate, itemId)=>{
        setState((prev)=>{
            const days = prev.studyDays[examId] ?? [];
            const updatedDays = days.map((d)=>{
                if (d.date !== dayDate) return d;
                const updatedChecklist = d.checklist.map((item)=>item.id === itemId ? {
                        ...item,
                        completed: !item.completed
                    } : item);
                const allComplete = updatedChecklist.every((item)=>item.completed);
                return {
                    ...d,
                    checklist: updatedChecklist,
                    completed: allComplete
                };
            });
            return {
                ...prev,
                studyDays: {
                    ...prev.studyDays,
                    [examId]: updatedDays
                }
            };
        });
    }, []);
    const handleToggleMilestone = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((examId, weekNumber)=>{
        setState((prev)=>{
            const milestones = prev.weeklyMilestones[examId] ?? [];
            const updatedMilestones = milestones.map((m)=>m.weekNumber === weekNumber ? {
                    ...m,
                    completed: !m.completed
                } : m);
            return {
                ...prev,
                weeklyMilestones: {
                    ...prev.weeklyMilestones,
                    [examId]: updatedMilestones
                }
            };
        });
    }, []);
    const handleSessionComplete = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((examId, seconds)=>{
        const hoursLogged = Math.round(seconds / 3600 * 10) / 10;
        const today = getTodayStr();
        setState((prev)=>{
            const days = prev.studyDays[examId] ?? [];
            const updatedDays = days.map((d)=>d.date === today ? {
                    ...d,
                    actualHours: Math.round((d.actualHours + hoursLogged) * 10) / 10
                } : d);
            // Update streak
            const lastDate = prev.lastStudyDate[examId] ?? '';
            let currentStreak = prev.streaks[examId] ?? 0;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            if (lastDate === yesterdayStr) {
                currentStreak += 1;
            } else if (lastDate !== today) {
                currentStreak = 1;
            }
            return {
                ...prev,
                studyDays: {
                    ...prev.studyDays,
                    [examId]: updatedDays
                },
                streaks: {
                    ...prev.streaks,
                    [examId]: currentStreak
                },
                lastStudyDate: {
                    ...prev.lastStudyDate,
                    [examId]: today
                }
            };
        });
    }, []);
    const handleRegenerateSchedule = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        if (!activeExam) return;
        const subjects = EXAM_PRESETS[activeExam.examType].subjects;
        const studyDays = generateStudyDays(activeExam, subjects);
        const milestones = generateWeeklyMilestones(activeExam, subjects);
        setState((prev)=>({
                ...prev,
                studyDays: {
                    ...prev.studyDays,
                    [activeExam.id]: studyDays
                },
                weeklyMilestones: {
                    ...prev.weeklyMilestones,
                    [activeExam.id]: milestones
                }
            }));
    }, [
        activeExam
    ]);
    // ── Render: No Exams ────────────────────────────────────────────────────
    if (state.exams.length === 0 && !showSetup) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex flex-col items-center justify-center py-16 px-4",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl border p-8 sm:p-12 text-center max-w-md w-full",
                style: {
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.06)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center",
                        style: {
                            background: 'rgba(0,229,160,0.1)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                            className: "w-8 h-8 text-[#00e5a0]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-lg font-bold text-[#e8ecf4] mb-2",
                        children: "Exam Countdown"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#8b95a8] mb-6",
                        children: "Set up your upcoming medical exam and get a personalized study schedule with countdown timer, daily plans, and progress tracking."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setShowSetup(true),
                        className: "flex items-center gap-2 mx-auto px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]",
                        style: {
                            background: '#00e5a0',
                            color: '#0c0e14'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            "Add Your First Exam"
                        ]
                    })
                ]
            })
        });
    }
    // ── Render: Setup Form ──────────────────────────────────────────────────
    if (showSetup) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "max-w-xl mx-auto px-4 py-6",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ExamSetupForm, {
                onSubmit: handleAddExam,
                onCancel: ()=>setShowSetup(false)
            })
        });
    }
    if (editingExam) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "max-w-xl mx-auto px-4 py-6",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ExamSetupForm, {
                onSubmit: handleEditExam,
                onCancel: ()=>setEditingExam(null),
                initialExam: editingExam
            })
        });
    }
    // ── Render: Main View ───────────────────────────────────────────────────
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "jsx-bf75193cd96befc1" + " " + "space-y-4 pb-6",
        children: [
            state.exams.length > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide",
                children: state.exams.map((exam)=>{
                    const days = getDaysUntil(exam.examDate);
                    const color = getUrgencyColor(days);
                    const isActive = exam.id === activeExamId;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setActiveExamId(exam.id),
                        style: {
                            background: isActive ? `${color}15` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${isActive ? `${color}33` : 'rgba(255,255,255,0.06)'}`,
                            color: isActive ? color : '#8b95a8'
                        },
                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            exam.name,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                style: {
                                    background: `${color}20`,
                                    color
                                },
                                className: "jsx-bf75193cd96befc1" + " " + "px-1.5 py-0.5 rounded-md text-[10px] font-bold",
                                children: [
                                    days,
                                    "d"
                                ]
                            })
                        ]
                    }, exam.id);
                })
            }),
            activeExam && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: 'rgba(255,255,255,0.06)'
                        },
                        className: "jsx-bf75193cd96befc1" + " " + "rounded-2xl border p-5 sm:p-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "jsx-bf75193cd96befc1" + " " + "flex items-start justify-between mb-5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-3 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    background: `${urgencyColor}15`
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                                children: EXAM_PRESETS[activeExam.examType].icon
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "jsx-bf75193cd96befc1" + " " + "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-base sm:text-lg font-bold text-[#e8ecf4] truncate",
                                                        children: activeExam.name
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2 mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                                className: "w-3 h-3 text-[#5a6478]"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "jsx-bf75193cd96befc1" + " " + "text-xs text-[#8b95a8]",
                                                                children: formatDate(activeExam.examDate)
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                style: {
                                                                    background: `${urgencyColor}18`,
                                                                    color: urgencyColor
                                                                },
                                                                className: "jsx-bf75193cd96befc1" + " " + "text-[10px] px-2 py-0.5 rounded-full font-semibold",
                                                                children: urgencyLabel
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-1 flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>setEditingExam(activeExam),
                                                "aria-label": "Edit exam",
                                                className: "jsx-bf75193cd96befc1" + " " + "p-2 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>handleDeleteExam(activeExam.id),
                                                "aria-label": "Delete exam",
                                                className: "jsx-bf75193cd96befc1" + " " + "p-2 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "jsx-bf75193cd96befc1" + " " + "flex items-center justify-center gap-2 sm:gap-4 mb-5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FlipCard, {
                                        value: countdown.days,
                                        label: "Days",
                                        color: urgencyColor
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-2xl font-bold text-[#3a4055] mt-[-20px]",
                                        children: ":"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FlipCard, {
                                        value: countdown.hours,
                                        label: "Hours",
                                        color: urgencyColor
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-2xl font-bold text-[#3a4055] mt-[-20px]",
                                        children: ":"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FlipCard, {
                                        value: countdown.minutes,
                                        label: "Mins",
                                        color: urgencyColor
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-2xl font-bold text-[#3a4055] mt-[-20px]",
                                        children: ":"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FlipCard, {
                                        value: countdown.seconds,
                                        label: "Secs",
                                        color: urgencyColor
                                    })
                                ]
                            }),
                            daysLeft > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "jsx-bf75193cd96befc1" + " " + "space-y-2 mb-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center justify-between text-[10px]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "jsx-bf75193cd96befc1" + " " + "text-[#5a6478]",
                                                children: "Study progress"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                style: {
                                                    color: urgencyColor
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "font-semibold",
                                                children: [
                                                    progressData.percentComplete,
                                                    "%"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            background: 'rgba(255,255,255,0.06)'
                                        },
                                        className: "jsx-bf75193cd96befc1" + " " + "w-full h-2.5 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                width: `${progressData.percentComplete}%`,
                                                background: `linear-gradient(90deg, ${urgencyColor}, ${urgencyColor}88)`,
                                                boxShadow: `0 0 10px ${urgencyColor}40`
                                            },
                                            className: "jsx-bf75193cd96befc1" + " " + "h-full rounded-full transition-all duration-500"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center justify-between text-[10px] text-[#5a6478]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "jsx-bf75193cd96befc1",
                                                children: [
                                                    progressData.totalActual,
                                                    "h studied"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "jsx-bf75193cd96befc1",
                                                children: [
                                                    progressData.totalPlanned,
                                                    "h planned"
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.04)'
                                },
                                className: "jsx-bf75193cd96befc1" + " " + "rounded-xl p-3 text-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center justify-center gap-1.5 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                className: "w-3 h-3 text-[#f59e0b]"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "jsx-bf75193cd96befc1" + " " + "text-[10px] font-semibold text-[#f59e0b] uppercase tracking-wider",
                                                children: "Daily Motivation"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-xs text-[#8b95a8] italic leading-relaxed",
                                        children: dailyQuote
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "jsx-bf75193cd96befc1" + " " + "grid grid-cols-2 sm:grid-cols-4 gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: 'rgba(255,255,255,0.06)'
                                },
                                className: "jsx-bf75193cd96befc1" + " " + "rounded-xl border p-3 text-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-1",
                                        style: {
                                            color: streak > 0 ? '#ff6b35' : '#3a4055'
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-lg font-bold text-[#e8ecf4]",
                                        children: streak
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                        children: "Day Streak"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: 'rgba(255,255,255,0.06)'
                                },
                                className: "jsx-bf75193cd96befc1" + " " + "rounded-xl border p-3 text-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-1 text-[#4fc3f7]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-lg font-bold text-[#e8ecf4]",
                                        children: progressData.daysStudied
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                        children: "Days Studied"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: 'rgba(255,255,255,0.06)'
                                },
                                className: "jsx-bf75193cd96befc1" + " " + "rounded-xl border p-3 text-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-1 text-[#00e5a0]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-lg font-bold text-[#e8ecf4]",
                                        children: [
                                            progressData.avgHoursPerDay,
                                            "h"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                        children: "Avg/Day"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: 'rgba(255,255,255,0.06)'
                                },
                                className: "jsx-bf75193cd96befc1" + " " + "rounded-xl border p-3 text-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-1 text-[#f59e0b]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-lg font-bold text-[#e8ecf4]",
                                        children: [
                                            milestonesForExam.filter((m)=>m.completed).length,
                                            "/",
                                            milestonesForExam.length
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                        children: "Milestones"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "jsx-bf75193cd96befc1" + " " + "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: 'rgba(255,255,255,0.06)'
                                },
                                className: "jsx-bf75193cd96befc1" + " " + "rounded-xl border p-4 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#00e5a0]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-xs font-semibold text-[#e8ecf4]",
                                                        children: "Today's Plan"
                                                    })
                                                ]
                                            }),
                                            todayPlan && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    background: todayPlan.completed ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.06)',
                                                    color: todayPlan.completed ? '#00e5a0' : '#8b95a8'
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "text-[10px] px-2 py-0.5 rounded-full font-semibold",
                                                children: todayPlan.completed ? 'Done!' : `${todayPlan.plannedHours}h planned`
                                            })
                                        ]
                                    }),
                                    todayPlan ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "jsx-bf75193cd96befc1" + " " + "flex flex-wrap gap-1.5",
                                                children: todayPlan.subjects.map((subject)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        style: {
                                                            background: 'rgba(79,195,247,0.1)',
                                                            color: '#4fc3f7'
                                                        },
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] px-2 py-1 rounded-lg font-medium",
                                                        children: subject
                                                    }, subject))
                                            }),
                                            todayPlan.checklist.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "jsx-bf75193cd96befc1" + " " + "space-y-1.5",
                                                children: todayPlan.checklist.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        onClick: ()=>handleToggleChecklist(activeExam.id, todayPlan.date, item.id),
                                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2 w-full text-left group",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                style: {
                                                                    background: item.completed ? '#00e5a0' : 'rgba(255,255,255,0.06)',
                                                                    border: item.completed ? 'none' : '1px solid rgba(255,255,255,0.1)'
                                                                },
                                                                className: "jsx-bf75193cd96befc1" + " " + "w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all",
                                                                children: item.completed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3 text-[#0c0e14]"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "jsx-bf75193cd96befc1" + " " + `text-xs transition-all ${item.completed ? 'text-[#5a6478] line-through' : 'text-[#8b95a8] group-hover:text-[#e8ecf4]'}`,
                                                                children: item.text
                                                            })
                                                        ]
                                                    }, item.id))
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "jsx-bf75193cd96befc1" + " " + "text-xs text-[#5a6478]",
                                                children: "No tasks for today. Enjoy your rest!"
                                            }),
                                            todayPlan.actualHours > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#00e5a0]",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                        className: "w-3 h-3 inline mr-1"
                                                    }),
                                                    todayPlan.actualHours,
                                                    "h logged today"
                                                ]
                                            })
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-xs text-[#5a6478]",
                                        children: "No study plan for today. The exam may have passed or not started yet."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StudySessionTimer, {
                                examId: activeExam.id,
                                onSessionComplete: handleSessionComplete
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: 'rgba(255,255,255,0.06)'
                        },
                        className: "jsx-bf75193cd96befc1" + " " + "rounded-2xl border overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "jsx-bf75193cd96befc1" + " " + "w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>setShowSchedule(!showSchedule),
                                        "aria-expanded": showSchedule,
                                        "aria-controls": "exam-study-schedule",
                                        className: "jsx-bf75193cd96befc1" + " " + "flex flex-1 items-center justify-between text-left",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#4fc3f7]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-xs font-semibold text-[#e8ecf4]",
                                                        children: "Study Schedule"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#5a6478]",
                                                        children: [
                                                            studyDaysForExam.length,
                                                            " days"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            showSchedule ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#5a6478]"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#5a6478]"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2 ml-2",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            onClick: handleRegenerateSchedule,
                                            "aria-label": "Regenerate schedule",
                                            className: "jsx-bf75193cd96befc1" + " " + "p-1.5 rounded-lg text-[#5a6478] hover:text-[#4fc3f7] hover:bg-white/[0.06] transition-all",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            })
                                        })
                                    })
                                ]
                            }),
                            showSchedule && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                id: "exam-study-schedule",
                                className: "jsx-bf75193cd96befc1" + " " + "px-4 pb-4 max-h-96 overflow-y-auto custom-scrollbar",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "jsx-bf75193cd96befc1" + " " + "space-y-2",
                                    children: [
                                        studyDaysForExam.slice(0, 30).map((day)=>{
                                            const isToday = day.date === getTodayStr();
                                            const isPast = day.date < getTodayStr();
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    background: isToday ? 'rgba(0,229,160,0.06)' : isPast && day.completed ? 'rgba(255,255,255,0.02)' : 'transparent',
                                                    borderLeft: isToday ? '2px solid #00e5a0' : '2px solid transparent'
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-3 p-2.5 rounded-lg transition-all",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "w-16 text-[10px] text-[#5a6478] flex-shrink-0",
                                                        children: isToday ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "jsx-bf75193cd96befc1" + " " + "text-[#00e5a0] font-semibold",
                                                            children: "Today"
                                                        }) : new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "flex-1 min-w-0",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "jsx-bf75193cd96befc1" + " " + "flex flex-wrap gap-1",
                                                            children: day.subjects.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "jsx-bf75193cd96befc1" + " " + "text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[#8b95a8]",
                                                                    children: s
                                                                }, s))
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2 flex-shrink-0",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "jsx-bf75193cd96befc1" + " " + "text-right",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                                                    children: day.actualHours > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "jsx-bf75193cd96befc1" + " " + "text-[#00e5a0]",
                                                                        children: [
                                                                            day.actualHours,
                                                                            "h"
                                                                        ]
                                                                    }) : `${day.plannedHours}h`
                                                                })
                                                            }),
                                                            day.completed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5 text-[#00e5a0] flex-shrink-0"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }, day.date);
                                        }),
                                        studyDaysForExam.length > 30 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478] text-center py-2",
                                            children: [
                                                "Showing next 30 days of ",
                                                studyDaysForExam.length,
                                                " total"
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: 'rgba(255,255,255,0.06)'
                        },
                        className: "jsx-bf75193cd96befc1" + " " + "rounded-2xl border overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setShowMilestones(!showMilestones),
                                className: "jsx-bf75193cd96befc1" + " " + "w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#f59e0b]"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "jsx-bf75193cd96befc1" + " " + "text-xs font-semibold text-[#e8ecf4]",
                                                children: "Weekly Milestones"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "jsx-bf75193cd96befc1" + " " + "text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#5a6478]",
                                                children: [
                                                    milestonesForExam.filter((m)=>m.completed).length,
                                                    "/",
                                                    milestonesForExam.length
                                                ]
                                            })
                                        ]
                                    }),
                                    showMilestones ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#5a6478]"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#5a6478]"
                                    })
                                ]
                            }),
                            showMilestones && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "jsx-bf75193cd96befc1" + " " + "px-4 pb-4 max-h-72 overflow-y-auto custom-scrollbar",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "jsx-bf75193cd96befc1" + " " + "space-y-2",
                                    children: milestonesForExam.map((milestone)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: ()=>handleToggleMilestone(activeExam.id, milestone.weekNumber),
                                            className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-white/[0.02] transition-all text-left",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    style: {
                                                        background: milestone.completed ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                                                        color: milestone.completed ? '#f59e0b' : '#5a6478'
                                                    },
                                                    className: "jsx-bf75193cd96befc1" + " " + "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold",
                                                    children: milestone.completed ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                        className: "w-3.5 h-3.5"
                                                    }) : milestone.weekNumber
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "jsx-bf75193cd96befc1" + " " + "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "jsx-bf75193cd96befc1" + " " + `text-xs font-medium ${milestone.completed ? 'text-[#f59e0b] line-through' : 'text-[#e8ecf4]'}`,
                                                            children: [
                                                                "Week ",
                                                                milestone.weekNumber,
                                                                ": ",
                                                                milestone.target
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                                            children: [
                                                                new Date(milestone.startDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                }),
                                                                ' — ',
                                                                new Date(milestone.endDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                milestone.completed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 text-[#f59e0b] flex-shrink-0"
                                                })
                                            ]
                                        }, milestone.weekNumber))
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: 'rgba(255,255,255,0.06)'
                        },
                        className: "jsx-bf75193cd96befc1" + " " + "rounded-2xl border overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setShowWeeklySummary(!showWeeklySummary),
                                className: "jsx-bf75193cd96befc1" + " " + "w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#b388ff]"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "jsx-bf75193cd96befc1" + " " + "text-xs font-semibold text-[#e8ecf4]",
                                                children: "Weekly Summary"
                                            })
                                        ]
                                    }),
                                    showWeeklySummary ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#5a6478]"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#5a6478]"
                                    })
                                ]
                            }),
                            showWeeklySummary && weeklySummaryData && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "jsx-bf75193cd96befc1" + " " + "px-4 pb-4 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "jsx-bf75193cd96befc1" + " " + "flex items-center justify-between text-[10px] mb-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-[#8b95a8]",
                                                        children: "This week's progress"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-[#b388ff] font-semibold",
                                                        children: [
                                                            weeklySummaryData.weeklyProgress,
                                                            "%"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    background: 'rgba(255,255,255,0.06)'
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "w-full h-2 rounded-full overflow-hidden",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    style: {
                                                        width: `${weeklySummaryData.weeklyProgress}%`,
                                                        background: weeklySummaryData.weeklyProgress >= 80 ? '#00e5a0' : weeklySummaryData.weeklyProgress >= 50 ? '#f59e0b' : '#ff5757'
                                                    },
                                                    className: "jsx-bf75193cd96befc1" + " " + "h-full rounded-full transition-all duration-500"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-bf75193cd96befc1" + " " + "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    background: 'rgba(255,255,255,0.02)'
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "rounded-lg p-2.5 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-sm font-bold text-[#00e5a0]",
                                                        children: [
                                                            weeklySummaryData.actualThisWeek,
                                                            "h"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                                        children: "Studied"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    background: 'rgba(255,255,255,0.02)'
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "rounded-lg p-2.5 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-sm font-bold text-[#4fc3f7]",
                                                        children: [
                                                            weeklySummaryData.plannedThisWeek,
                                                            "h"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                                        children: "Planned"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    background: 'rgba(255,255,255,0.02)'
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "rounded-lg p-2.5 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-sm font-bold text-[#f59e0b]",
                                                        children: weeklySummaryData.completedDaysThisWeek
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                                        children: "Days Active"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    background: 'rgba(255,255,255,0.02)'
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "rounded-lg p-2.5 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-sm font-bold text-[#b388ff]",
                                                        children: [
                                                            weeklySummaryData.totalDaysThisWeek > 0 ? Math.round(weeklySummaryData.completedDaysThisWeek / weeklySummaryData.totalDaysThisWeek * 100) : 0,
                                                            "%"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#5a6478]",
                                                        children: "Consistency"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid rgba(255,255,255,0.04)'
                                        },
                                        className: "jsx-bf75193cd96befc1" + " " + "rounded-lg p-3 text-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "jsx-bf75193cd96befc1" + " " + "text-[10px] text-[#8b95a8]",
                                            children: weeklySummaryData.weeklyProgress >= 80 ? '🔥 Excellent progress this week! Keep up the great work!' : weeklySummaryData.weeklyProgress >= 50 ? '💪 Good progress! Try to squeeze in a few more study sessions.' : '📚 Falling behind schedule. Consider increasing your daily study time.'
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: 'rgba(255,255,255,0.06)'
                        },
                        className: "jsx-bf75193cd96befc1" + " " + "rounded-2xl border p-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#4fc3f7]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "jsx-bf75193cd96befc1" + " " + "text-xs font-semibold text-[#e8ecf4]",
                                        children: "Subject Distribution"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "jsx-bf75193cd96befc1" + " " + "flex flex-wrap gap-2",
                                children: EXAM_PRESETS[activeExam.examType].subjects.map((subject, idx)=>{
                                    const colors = [
                                        '#00e5a0',
                                        '#4fc3f7',
                                        '#f59e0b',
                                        '#ff5757',
                                        '#b388ff',
                                        '#ff6b35',
                                        '#8b5cf6',
                                        '#06b6d4',
                                        '#ec4899'
                                    ];
                                    const color = colors[idx % colors.length];
                                    const hoursAllocated = Math.round(activeExam.targetHoursPerDay / 2 * 10) / 10;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            background: `${color}10`,
                                            color,
                                            border: `1px solid ${color}20`
                                        },
                                        className: "jsx-bf75193cd96befc1" + " " + "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    background: color
                                                },
                                                className: "jsx-bf75193cd96befc1" + " " + "w-1.5 h-1.5 rounded-full"
                                            }),
                                            subject,
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "jsx-bf75193cd96befc1" + " " + "opacity-60",
                                                children: [
                                                    "~",
                                                    hoursAllocated,
                                                    "h/wk"
                                                ]
                                            })
                                        ]
                                    }, subject);
                                })
                            })
                        ]
                    })
                ]
            }),
            state.exams.length > 0 && state.exams.length < MAX_EXAMS && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: ()=>setShowSetup(true),
                style: {
                    borderColor: 'rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.01)'
                },
                className: "jsx-bf75193cd96befc1" + " " + "flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed text-xs font-medium text-[#5a6478] hover:text-[#00e5a0] hover:border-[#00e5a0]/30 transition-all",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_BarChart3_BookOpen_Brain_Calendar_CheckCircle_ChevronDown_ChevronUp_Clock_Edit3_Flame_GraduationCap_Pause_Play_Plus_RotateCcw_Sparkles_Star_Stethoscope_Target_Timer_Trash2_TrendingUp_Trophy_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                        className: "w-4 h-4"
                    }),
                    "Add Another Exam (",
                    MAX_EXAMS - state.exams.length,
                    " slot",
                    MAX_EXAMS - state.exams.length !== 1 ? 's' : '',
                    " left)"
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default()), {
                id: "bf75193cd96befc1",
                children: ".custom-scrollbar::-webkit-scrollbar{width:4px}.custom-scrollbar::-webkit-scrollbar-track{background:transparent}.custom-scrollbar::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.15)}.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}"
            })
        ]
    });
}


/***/ })

};
;